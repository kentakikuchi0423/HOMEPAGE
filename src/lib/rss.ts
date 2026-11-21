/**
 * 外部の RSS フィードを取得・解析し、表示に使える安全な形に整える。
 * フィードの内容は外部から来る信頼できないデータとして扱う：
 * - リンクは https かつ許可したホストのものだけを通す
 * - 画像は https かつ許可したホストのものだけを通す（それ以外は画像なしで表示）
 * - 取得には時間と大きさの上限を設ける
 * このファイルはサーバー（Netlify Function）とブラウザの両方から使う。
 */

export type RssItem = {
  title: string
  link: string
  /** 投稿日時（フィードの表記のまま。表示時に lib/date.ts で整形する） */
  pubDate: string
  image?: string
}

export type RssRules = {
  /** リンクとして許可するホスト（サブドメインも許可） */
  linkHosts: readonly string[]
  /** 画像として許可するホスト（サブドメインも許可） */
  imageHosts: readonly string[]
}

export type RssFetchOptions = RssRules & {
  /** 取り出す最大件数 */
  limit: number
  /** リンクが相対パスだった場合の基準 URL */
  baseUrl?: string
  /** 取得を打ち切るまでの時間（ミリ秒） */
  timeoutMs?: number
  /** 受け取る本文の最大サイズ（バイト相当の文字数） */
  maxLength?: number
}

const MAX_TITLE_LENGTH = 200
const DEFAULT_TIMEOUT_MS = 5000
const DEFAULT_MAX_LENGTH = 1_000_000

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
}

/** XML の文字参照（&amp; / &#39; / &#x27; など）を元の文字に戻す */
export function decodeEntities(value: string): string {
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, body: string) => {
    if (body[0] === '#') {
      const code =
        body[1] === 'x' || body[1] === 'X' ? parseInt(body.slice(2), 16) : parseInt(body.slice(1), 10)
      return Number.isFinite(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : whole
    }
    return NAMED_ENTITIES[body.toLowerCase()] ?? whole
  })
}

function hostAllowed(hostname: string, allowed: readonly string[]): boolean {
  const host = hostname.toLowerCase()
  return allowed.some((h) => host === h || host.endsWith(`.${h}`))
}

/** https で、認証情報を含まず、許可したホストの URL だけを返す。それ以外は undefined */
export function safeUrl(
  value: unknown,
  allowedHosts: readonly string[],
  baseUrl?: string,
): string | undefined {
  if (typeof value !== 'string' || value.trim() === '') return undefined
  try {
    const url = new URL(value.trim(), baseUrl)
    if (url.protocol !== 'https:') return undefined
    if (url.username !== '' || url.password !== '') return undefined
    if (!hostAllowed(url.hostname, allowedHosts)) return undefined
    return url.href
  } catch {
    return undefined
  }
}

/**
 * 1 件ぶんのデータを検証して RssItem にする。使えない場合は null。
 * サーバーで解析した直後と、ブラウザで受け取った直後の両方で通す。
 */
export function sanitizeItem(raw: unknown, rules: RssRules, baseUrl?: string): RssItem | null {
  if (typeof raw !== 'object' || raw === null) return null
  const record = raw as Record<string, unknown>

  const title =
    typeof record.title === 'string' ? record.title.replace(/\s+/g, ' ').trim().slice(0, MAX_TITLE_LENGTH) : ''
  const link = safeUrl(record.link, rules.linkHosts, baseUrl)
  if (title === '' || link === undefined) return null

  return {
    title,
    link,
    pubDate: typeof record.pubDate === 'string' ? record.pubDate.trim().slice(0, 64) : '',
    image: safeUrl(record.image, rules.imageHosts),
  }
}

/** 一覧として受け取ったデータ（中身は未検証）から、使える項目だけを取り出す */
export function sanitizeItems(raw: unknown, rules: RssRules, limit: number, baseUrl?: string): RssItem[] {
  if (!Array.isArray(raw)) return []
  const items: RssItem[] = []
  for (const entry of raw) {
    const item = sanitizeItem(entry, rules, baseUrl)
    if (item) items.push(item)
    if (items.length >= limit) break
  }
  return items
}

/** <tag>…</tag> の中身を取り出す。見つからなければ空文字 */
function extractTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`))
  if (!match) return ''
  const inner = match[1].trim()
  // CDATA で包まれていれば中身をそのまま、そうでなければ文字参照を元に戻す
  const cdata = inner.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/)
  return (cdata ? cdata[1] : decodeEntities(inner)).trim()
}

/** 本文の HTML から最初の画像の URL を取り出す */
function extractFirstImage(html: string): string | undefined {
  const match = html.match(/<img\b[^>]*?\bsrc\s*=\s*(?:"([^"]+)"|'([^']+)')/i)
  const src = match?.[1] ?? match?.[2]
  return src ? decodeEntities(src) : undefined
}

/** RSS の XML を解析して、検証済みの項目の一覧にする */
export function parseRss(xml: string, options: RssFetchOptions): RssItem[] {
  const items: RssItem[] = []
  // <item> または <item 属性…> で区切る。最初の要素はチャンネル情報なので捨てる
  const blocks = xml.split(/<item(?:\s[^>]*)?>/).slice(1)

  for (const block of blocks) {
    const body = block.split('</item>')[0]
    const item = sanitizeItem(
      {
        title: extractTag(body, 'title'),
        link: extractTag(body, 'link'),
        pubDate: extractTag(body, 'pubDate'),
        image: extractFirstImage(extractTag(body, 'description')),
      },
      options,
      options.baseUrl,
    )
    if (item) items.push(item)
    if (items.length >= options.limit) break
  }
  return items
}

/**
 * フィードを取得して解析する。
 * 取得に失敗した場合（タイムアウト・エラー応答・大きすぎる応答）は例外を投げる。
 */
export async function fetchRssItems(url: string, options: RssFetchOptions): Promise<RssItem[]> {
  const maxLength = options.maxLength ?? DEFAULT_MAX_LENGTH
  const res = await fetch(url, {
    signal: AbortSignal.timeout(options.timeoutMs ?? DEFAULT_TIMEOUT_MS),
    headers: { accept: 'application/rss+xml, application/xml, text/xml' },
  })
  if (!res.ok) throw new Error(`RSS feed responded with ${res.status}`)

  const declared = Number(res.headers.get('content-length'))
  if (Number.isFinite(declared) && declared > maxLength) throw new Error('RSS feed is too large')

  const xml = await res.text()
  if (xml.length > maxLength) throw new Error('RSS feed is too large')

  return parseRss(xml, options)
}

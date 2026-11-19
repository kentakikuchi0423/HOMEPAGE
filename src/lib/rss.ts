export type RssItem = {
  title: string
  link: string
  pubDate: string
  image?: string
}

function extractTag(xml: string, tag: string): string {
  const re = new RegExp(
    `<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>|<${tag}[^>]*>([\\s\\S]*?)</${tag}>`,
  )
  const m = xml.match(re)
  return (m?.[1] ?? m?.[2] ?? '').trim()
}

// 外部フィード由来の URL は http(s) のみ許可する（javascript: 等のスキームを排除）
function safeHttpUrl(value: string | undefined): string | undefined {
  if (!value) return undefined
  try {
    const { protocol } = new URL(value)
    return protocol === 'https:' || protocol === 'http:' ? value : undefined
  } catch {
    return undefined
  }
}

function extractFirstImage(html: string): string | undefined {
  const m = html.match(/<img[^>]+src="([^"]+)"/)
  return safeHttpUrl(m?.[1])
}

export async function fetchRssItems(
  url: string,
  limit: number,
  baseUrl?: string,
): Promise<RssItem[]> {
  try {
    const res = await fetch(url)
    if (!res.ok) return []
    const xml = await res.text()

    const items: RssItem[] = []
    const itemBlocks = xml.split('<item>').slice(1)

    for (const block of itemBlocks.slice(0, limit)) {
      const title = extractTag(block, 'title')
      let link = extractTag(block, 'link')
      const pubDate = extractTag(block, 'pubDate')
      const desc = extractTag(block, 'description')
      const image = extractFirstImage(desc)

      if (link && !link.startsWith('http') && baseUrl) {
        link = baseUrl + link
      }

      const safeLink = safeHttpUrl(link)

      if (title && safeLink) {
        items.push({ title, link: safeLink, pubDate, image })
      }
    }

    return items
  } catch {
    return []
  }
}

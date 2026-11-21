// 外部データ（RSS）の解析と検証のテスト。実行: npm test
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { decodeEntities, parseRss, safeUrl, sanitizeItems } from '../src/lib/rss.ts'
import { formatDate } from '../src/lib/date.ts'

const rules = { linkHosts: ['go2senkyo.com'], imageHosts: ['images.example.com', 'go2senkyo.com'] }
const options = { ...rules, limit: 10, baseUrl: 'https://go2senkyo.com/seijika/1/posts' }

const feed = (items) => `<?xml version="1.0"?><rss><channel><title>ch</title>${items}</channel></rss>`

test('通常の項目（CDATA・画像つき）を取り出す', () => {
  const xml = feed(`<item><title><![CDATA[市政報告会を開催 & ご報告]]></title>
    <link>https://www.go2senkyo.com/seijika/1/posts/10</link><pubDate>Thu, 08 Oct 2026 02:17:07 GMT</pubDate>
    <description><![CDATA[<p><img alt="" src="https://images.example.com/a.jpg?x=1&amp;y=2"></p>]]></description></item>`)
  assert.deepEqual(parseRss(xml, options), [
    {
      title: '市政報告会を開催 & ご報告',
      link: 'https://www.go2senkyo.com/seijika/1/posts/10',
      pubDate: 'Thu, 08 Oct 2026 02:17:07 GMT',
      image: 'https://images.example.com/a.jpg?x=1&y=2',
    },
  ])
})

test('文字参照を戻し、属性つきの <item> も読む', () => {
  const xml = feed(`<item rdf:about="x"><title>A &amp; B &#x3042;&#12356; &lt;b&gt;</title><link>https://go2senkyo.com/p?a=1&amp;b=2</link></item>`)
  const [item] = parseRss(xml, options)
  assert.equal(item.title, 'A & B あい <b>')
  assert.equal(item.link, 'https://go2senkyo.com/p?a=1&b=2')
  assert.equal(item.image, undefined)
})

test('本文が CDATA でない場合（文字参照・タグそのまま）でも画像を取り出す', () => {
  const escaped = feed(`<item><title>t</title><link>https://go2senkyo.com/p</link><description>&lt;p&gt;&lt;img src=&quot;https://images.example.com/b.jpg&quot;&gt;&lt;/p&gt;</description></item>`)
  assert.equal(parseRss(escaped, options)[0].image, 'https://images.example.com/b.jpg')
  const raw = feed(`<item><title>t</title><link>https://go2senkyo.com/p</link><description><p><img class="x" src="https://images.example.com/c.jpg"></p></description></item>`)
  assert.equal(parseRss(raw, options)[0].image, 'https://images.example.com/c.jpg')
})

test('相対リンクは基準 URL から解決する', () => {
  const [item] = parseRss(feed('<item><title>t</title><link>/seijika/1/posts/2</link></item>'), options)
  assert.equal(item.link, 'https://go2senkyo.com/seijika/1/posts/2')
})

test('危険なリンク・許可外のホストの項目は捨てる', () => {
  const bad = [
    'javascript:alert(1)',
    'JaVaScRiPt:alert(1)',
    'data:text/html,x',
    'http://www.go2senkyo.com/p', // https ではない
    'https://evil.example/p',
    'https://go2senkyo.com.evil.example/p',
    'https://evilgo2senkyo.com/p',
    'https://user:pass@go2senkyo.com/p',
    '//evil.example/p',
  ]
  const xml = feed(bad.map((link) => `<item><title>t</title><link>${link}</link></item>`).join(''))
  assert.deepEqual(parseRss(xml, options), [])
})

test('許可外の画像は外し、項目自体は残す', () => {
  for (const src of ['javascript:alert(1)', 'http://images.example.com/a.jpg', 'https://tracker.example/pixel.gif']) {
    const xml = feed(`<item><title>t</title><link>https://go2senkyo.com/p</link><description><![CDATA[<img src='${src}'>]]></description></item>`)
    const [item] = parseRss(xml, options)
    assert.equal(item.image, undefined, src)
  }
})

test('件数の上限・題名の長さの上限を守る', () => {
  const xml = feed(Array.from({ length: 30 }, (_, i) => `<item><title>${'あ'.repeat(500)}</title><link>https://go2senkyo.com/${i}</link></item>`).join(''))
  const items = parseRss(xml, { ...options, limit: 5 })
  assert.equal(items.length, 5)
  assert.equal(items[0].title.length, 200)
})

test('壊れた XML・題名なしでも例外にならない', () => {
  assert.deepEqual(parseRss('', options), [])
  assert.deepEqual(parseRss('<rss><item><title>閉じていない', options), [])
  assert.deepEqual(parseRss(feed('<item><link>https://go2senkyo.com/p</link></item>'), options), [])
})

test('ブラウザ側の検証：配列以外や不正な値を受け取っても安全', () => {
  assert.deepEqual(sanitizeItems('oops', rules, 10), [])
  assert.deepEqual(sanitizeItems(null, rules, 10), [])
  assert.deepEqual(sanitizeItems([null, 1, 'x', {}, { title: 't' }, { title: 3, link: 'https://go2senkyo.com/p' }], rules, 10), [])
  const items = sanitizeItems(
    [{ title: '<img src=x onerror=alert(1)>', link: 'https://go2senkyo.com/p', pubDate: 5, image: 'javascript:alert(2)' }],
    rules,
    10,
  )
  assert.deepEqual(items, [{ title: '<img src=x onerror=alert(1)>', link: 'https://go2senkyo.com/p', pubDate: '', image: undefined }])
})

test('safeUrl / decodeEntities の境界', () => {
  assert.equal(safeUrl('https://sub.go2senkyo.com/a', ['go2senkyo.com']), 'https://sub.go2senkyo.com/a')
  assert.equal(safeUrl(' https://GO2SENKYO.com/a ', ['go2senkyo.com']), 'https://go2senkyo.com/a')
  assert.equal(safeUrl('', ['go2senkyo.com']), undefined)
  assert.equal(safeUrl(undefined, ['go2senkyo.com']), undefined)
  assert.equal(decodeEntities('&unknown; &#0; &#xFFFFFFFF; &quot;&apos;'), '&unknown; &#0; &#xFFFFFFFF; "\'')
})

test('日付は日本時間で整形し、読めない値は null', () => {
  assert.deepEqual(formatDate('Thu, 08 Oct 2026 02:17:07 GMT'), { text: '2026/10/08', iso: '2026-10-08' })
  // UTC では前日でも、日本時間では翌日になる時刻
  assert.deepEqual(formatDate('Wed, 07 Oct 2026 15:30:00 GMT'), { text: '2026/10/08', iso: '2026-10-08' })
  assert.equal(formatDate('not a date'), null)
  assert.equal(formatDate(''), null)
})

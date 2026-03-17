import { fetchRssItems } from '../../src/lib/rss'

const RSS_URL = 'https://www.go2senkyo.com/seijika/196504/posts.rss'
const RSS_LIMIT = 10
const RSS_BASE_URL = 'https://go2senkyo.com/seijika/196504/posts'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler = async (_event: any, _context: any) => {
  const items = await fetchRssItems(RSS_URL, RSS_LIMIT, RSS_BASE_URL)
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify({ items }),
  }
}

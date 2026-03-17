import type { Handler } from '@netlify/functions'
import { fetchRssItems } from '../../src/lib/rss'

const RSS_URL = 'https://www.go2senkyo.com/seijika/196504/posts.rss'
const RSS_LIMIT = 10
const RSS_BASE_URL = 'https://go2senkyo.com/seijika/196504/posts'

export const handler: Handler = async () => {
  const fetched = await fetchRssItems(RSS_URL, RSS_LIMIT + 1, RSS_BASE_URL)
  const hasMore = fetched.length > RSS_LIMIT
  const items = hasMore ? fetched.slice(0, RSS_LIMIT) : fetched
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
    body: JSON.stringify({ items, hasMore }),
  }
}

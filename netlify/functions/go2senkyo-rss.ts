import type { Handler } from '@netlify/functions'
import { fetchRssItems } from '../../src/lib/rss'
import { siteConfig } from '../../src/content/site'

const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
}

/**
 * 「最新の活動」用に、選挙ドットコムの RSS を取得して JSON で返す。
 * - 取得先は site.ts の設定に固定（リクエストの内容は使わない）
 * - 成功した結果は Netlify の CDN に 10 分間保存し、アクセスのたびに取得先へ問い合わせないようにする
 */
export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET' && event.httpMethod !== 'HEAD') {
    return { statusCode: 405, headers: { ...JSON_HEADERS, Allow: 'GET, HEAD' }, body: '{"error":"method not allowed"}' }
  }

  const rss = siteConfig.activity.rss
  if (!rss) {
    return { statusCode: 404, headers: { ...JSON_HEADERS, 'Cache-Control': 'no-store' }, body: '{"items":[]}' }
  }

  try {
    // 「まだ続きがあるか」を知るために 1 件多く取得する
    const fetched = await fetchRssItems(rss.url, {
      limit: rss.limit + 1,
      baseUrl: rss.baseUrl,
      linkHosts: rss.linkHosts,
      imageHosts: rss.imageHosts,
    })
    // 1 件も読み取れない場合（メンテナンス画面など）は失敗として扱い、空の結果を CDN に保存しない
    if (fetched.length === 0) throw new Error('RSS feed contained no usable items')

    const hasMore = fetched.length > rss.limit
    const items = hasMore ? fetched.slice(0, rss.limit) : fetched

    return {
      statusCode: 200,
      headers: {
        ...JSON_HEADERS,
        // ブラウザには毎回確認させ、CDN 側で 10 分間保存する（期限切れ後 1 時間は古い結果を返しつつ裏で更新）
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'Netlify-CDN-Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
      },
      body: JSON.stringify({ items, hasMore }),
    }
  } catch (error) {
    console.error('go2senkyo-rss: failed to load feed:', error instanceof Error ? error.message : error)
    return { statusCode: 502, headers: { ...JSON_HEADERS, 'Cache-Control': 'no-store' }, body: '{"items":[]}' }
  }
}

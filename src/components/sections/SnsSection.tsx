import { siteConfig } from '@/content/site'

export default function SnsSection() {
  const { handle } = siteConfig.xTimeline
  return (
    <section id="sns" className="px-4 py-16">
      <h2>最新情報</h2>
      {/* X タイムライン埋め込みは Phase 4 で実装。handle: "@{handle}" */}
      <p>（X タイムライン埋め込みは別フェーズで実装予定）</p>
    </section>
  )
}

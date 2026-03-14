import { siteConfig } from '@/content/site'

export default function VideoSection() {
  return (
    <section id="video" className="px-4 py-16">
      <h2>動画</h2>
      <p>（YouTube 動画埋め込みは別フェーズで実装予定）</p>
      {/* 本実装時は siteConfig.socialLinks.youtube を参照して iframe を配置する */}
      <p className="hidden">{siteConfig.socialLinks.youtube}</p>
    </section>
  )
}

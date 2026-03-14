import { siteConfig } from '@/content/site'

export default function VideoSection() {
  const { youtubeVideoId, title } = siteConfig.video
  return (
    <section id="video" className="px-4 py-16">
      <h2>動画</h2>
      {title && <p>{title}</p>}
      {/* YouTube 埋め込みは Phase 4 で実装。youtubeVideoId: "{youtubeVideoId}" */}
      <p>（YouTube 動画埋め込みは別フェーズで実装予定）</p>
    </section>
  )
}

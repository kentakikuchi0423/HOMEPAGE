import { siteConfig } from '@/content/site'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import VideoCard from '@/components/sections/VideoCard'

export default function VideoSection() {
  const { videos, playLabel, fallbackTitle, placeholder } = siteConfig.video
  const heading = siteConfig.headings.video

  return (
    <Reveal as="section" id="video" threshold={0.12} className="reveal bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-5xl md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12">
        <SectionHeading en={heading.label}>{heading.title}</SectionHeading>

        <ul className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <li key={video.youtubeVideoId || i} className="reveal-child">
              <VideoCard
                youtubeVideoId={video.youtubeVideoId}
                title={video.title}
                label={video.title ?? fallbackTitle}
                playLabel={playLabel}
                placeholder={placeholder}
              />
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

'use client'
import { siteConfig } from '@/content/site'
import { useInView } from '@/hooks/useInView'
import SectionHeading from '@/components/ui/SectionHeading'

function VideoCard({ youtubeVideoId, title }: { youtubeVideoId: string; title?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-blue-50 shadow-sm">
      <div className="relative aspect-video">
        {youtubeVideoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
            title={title ?? 'YouTube 動画'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
            <div className="flex flex-col items-center gap-3 text-blue-400">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-8 w-8 translate-x-0.5 text-blue-600"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-blue-500">動画は準備中です</p>
            </div>
          </div>
        )}
      </div>
      {title && (
        <div className="px-6 py-4">
          <p className="font-medium text-gray-700">{title}</p>
        </div>
      )}
    </div>
  )
}

const revealDelay = ['reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3', 'reveal-delay-4']

export default function VideoSection() {
  const { videos } = siteConfig.video
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      ref={ref}
      id="video"
      className={`bg-white px-4 py-20 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading en="VIDEO">動画</SectionHeading>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <div key={video.youtubeVideoId || i} className={`reveal ${revealDelay[Math.min(i, 3)]} ${inView ? 'is-visible' : ''}`}>
              <VideoCard {...video} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

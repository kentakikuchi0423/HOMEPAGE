'use client'
import { useState } from 'react'
import { siteConfig } from '@/content/site'
import { useInView } from '@/hooks/useInView'
import SectionHeading from '@/components/ui/SectionHeading'

function VideoCard({ youtubeVideoId, title }: { youtubeVideoId: string; title?: string }) {
  const { playLabel, fallbackTitle, placeholder } = siteConfig.video
  // サムネイルだけ先に表示し、クリックされた時点で YouTube のプレーヤーを読み込む
  const [playing, setPlaying] = useState(false)
  const label = title ?? fallbackTitle

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-sm bg-ink">
        {!youtubeVideoId ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-sm font-medium text-white/80">{placeholder}</p>
          </div>
        ) : playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1`}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${playLabel}: ${label}`}
            className="group absolute inset-0 h-full w-full cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${youtubeVideoId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-opacity group-hover:opacity-85"
            />
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-marker text-ink transition-transform group-hover:scale-110">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 translate-x-0.5" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      {title && (
        <p className="mt-3 font-display font-bold leading-snug text-ink">{title}</p>
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
      className={`bg-white px-5 py-16 sm:py-24 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading en="VIDEO">動画</SectionHeading>

        <div className="grid grid-cols-1 gap-x-6 gap-y-9 md:grid-cols-3">
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

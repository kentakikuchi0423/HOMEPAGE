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
      <div className="relative aspect-video overflow-hidden bg-ink">
        {!youtubeVideoId ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-sm text-white/80">{placeholder}</p>
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
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            {/* YouTube と同様の、赤い角丸長方形に白い三角の再生ボタン */}
            <svg
              viewBox="0 0 68 48"
              className="absolute left-1/2 top-1/2 h-12 w-[4.25rem] -translate-x-1/2 -translate-y-1/2"
              aria-hidden="true"
            >
              <rect
                width="68"
                height="48"
                rx="12"
                className="fill-[#f00] transition-opacity duration-300 group-hover:opacity-85"
              />
              <path d="M27 14v20l18-10z" fill="#fff" />
            </svg>
          </button>
        )}
      </div>
      {title && <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink">{title}</p>}
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
      className={`bg-white px-6 py-20 md:py-32 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-5xl md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12">
        <SectionHeading en="VIDEO">動画</SectionHeading>

        <div className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
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

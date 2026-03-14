'use client'
import { siteConfig } from '@/content/site'
import { useInView } from '@/hooks/useInView'
import SectionHeading from '@/components/ui/SectionHeading'

export default function VideoSection() {
  const { title } = siteConfig.video
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      ref={ref}
      id="video"
      className={`bg-white px-4 py-20 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeading en="VIDEO">動画</SectionHeading>

        <div className="overflow-hidden rounded-2xl bg-blue-50 shadow-sm">
          {/* 16:9 placeholder */}
          <div className="relative aspect-video flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
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
              <p className="text-sm font-medium text-blue-500">
                動画は準備中です
              </p>
            </div>
          </div>
          {title && (
            <div className="px-6 py-4">
              <p className="font-medium text-gray-700">{title}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

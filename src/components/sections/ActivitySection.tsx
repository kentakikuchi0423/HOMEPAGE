'use client'
import Image from 'next/image'
import Script from 'next/script'
import { siteConfig } from '@/content/site'
import { useInView } from '@/hooks/useInView'
import SectionHeading from '@/components/ui/SectionHeading'

export default function ActivitySection() {
  const { handle } = siteConfig.xTimeline
  const { municipalReport } = siteConfig.activity
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      ref={ref}
      id="activity"
      className={`bg-blue-50 px-4 py-20 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading en="ACTIVITY">活動報告</SectionHeading>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* X タイムライン */}
          <div className={`reveal reveal-delay-1 ${inView ? 'is-visible' : ''} overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm`}>
            <div className="border-b border-blue-50 bg-blue-600 px-6 py-3">
              <p className="font-semibold text-white">@{handle} の投稿</p>
            </div>
            <div className="px-4 py-4">
              <a
                className="twitter-timeline"
                href={`https://twitter.com/${handle}`}
                data-height="600"
              >
                Tweets by @{handle}
              </a>
            </div>
          </div>

          {/* 市政報告 */}
          <div className={`reveal reveal-delay-2 ${inView ? 'is-visible' : ''} overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm`}>
            <div className="border-b border-blue-50 bg-blue-600 px-6 py-3">
              <p className="font-semibold text-white">市政報告</p>
            </div>
            {municipalReport.image && (
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={municipalReport.image}
                  alt={municipalReport.imageAlt ?? '市政報告'}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="px-6 py-5">
              <p className="text-sm leading-relaxed text-gray-600">
                {municipalReport.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />
    </section>
  )
}

'use client'
import Script from 'next/script'
import { siteConfig } from '@/content/site'
import { useInView } from '@/hooks/useInView'
import SectionHeading from '@/components/ui/SectionHeading'

export default function SnsSection() {
  const { handle } = siteConfig.xTimeline
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      ref={ref}
      id="sns"
      className={`bg-blue-50 px-4 py-20 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-2xl">
        <SectionHeading en="TIMELINE">最新情報</SectionHeading>

        <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
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
      </div>

      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />
    </section>
  )
}

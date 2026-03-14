'use client'
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
        <SectionHeading>最新情報</SectionHeading>

        <div className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
          <div className="border-b border-blue-50 bg-blue-600 px-6 py-3">
            <p className="font-semibold text-white">@{handle} の投稿</p>
          </div>
          <div className="flex flex-col items-center gap-3 px-6 py-12 text-blue-300">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-10 w-10"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <p className="text-sm font-medium text-blue-400">
              タイムラインは準備中です
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

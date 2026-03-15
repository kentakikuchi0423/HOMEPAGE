'use client'
import Image from 'next/image'
import { siteConfig } from '@/content/site'
import { useInView } from '@/hooks/useInView'
import { useXTimelineWidget } from '@/hooks/useXTimelineWidget'
import SectionHeading from '@/components/ui/SectionHeading'

export default function ActivitySection() {
  const { handle } = siteConfig.xTimeline
  const { municipalReport } = siteConfig.activity
  const { ref, inView } = useInView<HTMLElement>()
  const { xFailed, containerRef } = useXTimelineWidget(handle, inView)

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
              <p className="font-semibold text-white">X での投稿</p>
            </div>

            <div className="relative min-h-[320px]">
              {/* widgets.js がここに <a> を追加し <iframe> に置き換える */}
              <div ref={containerRef} className="px-4 py-4" />

              {/* 読み込み失敗時のフォールバック */}
              {xFailed && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-b-2xl bg-white px-6 py-10">
                  <p className="text-sm text-gray-400">タイムラインを読み込めませんでした</p>
                  <a
                    href={`https://x.com/${handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-blue-200 bg-blue-50 px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                  >
                    最新投稿は X で見る →
                  </a>
                </div>
              )}
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
      {/* widgets.js は layout.tsx でグローバルにロード済み。ここでは読み込まない。 */}
    </section>
  )
}

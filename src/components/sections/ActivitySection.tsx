'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { siteConfig } from '@/content/site'
import { useInView } from '@/hooks/useInView'
import SectionHeading from '@/components/ui/SectionHeading'
import type { RssItem } from '@/lib/rss'
import { formatDate } from '@/lib/date'

export default function ActivitySection() {
  const { municipalReport, rss } = siteConfig.activity
  const { ref, inView } = useInView<HTMLElement>()
  const [rssItems, setRssItems] = useState<RssItem[]>([])
  const [hasMore, setHasMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(false)

  // 右カード（市政報告）の実高さを左カードに同期する
  const rightCardRef = useRef<HTMLDivElement>(null)
  const [syncedHeight, setSyncedHeight] = useState<number | undefined>(undefined)

  useEffect(() => {
    const el = rightCardRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      setSyncedHeight(el.getBoundingClientRect().height)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!rss) { setLoading(false); return }
    fetch('/.netlify/functions/go2senkyo-rss')
      .then((r) => { if (!r.ok) throw new Error(); return r.json() as Promise<{ items: RssItem[]; hasMore?: boolean }> })
      .then((data) => { setRssItems(data.items ?? []); setHasMore(data.hasMore ?? false); setLoading(false) })
      .catch(() => { setFetchError(true); setLoading(false) })
  }, [rss])

  return (
    <section
      ref={ref}
      id="activity"
      className={`bg-blue-50 px-4 py-20 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading en="ACTIVITY">活動報告</SectionHeading>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* 最新の活動（RSS） */}
          {rss && (
            <div
              style={syncedHeight !== undefined ? { height: syncedHeight } : undefined}
              className={`reveal reveal-delay-1 ${inView ? 'is-visible' : ''} flex flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm`}
            >
              <div className="shrink-0 border-b border-blue-50 bg-blue-600 px-6 py-3">
                <p className="font-semibold text-white">{rss.title}</p>
              </div>

              {loading ? (
                <ul className="flex-1 min-h-0 divide-y divide-blue-50 overflow-y-auto">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li key={i} className="flex gap-4 px-5 py-4 animate-pulse">
                      <div className="h-20 w-20 shrink-0 rounded-lg bg-blue-100" />
                      <div className="flex flex-1 flex-col justify-center gap-2">
                        <div className="h-3 w-20 rounded bg-blue-100" />
                        <div className="h-4 w-full rounded bg-blue-50" />
                        <div className="h-4 w-3/4 rounded bg-blue-50" />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : !fetchError && rssItems.length > 0 ? (
                <ul className="flex-1 min-h-0 divide-y divide-blue-50 overflow-y-auto">
                  {rssItems.map((item) => (
                    <li key={item.link ?? item.title}>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-4 px-5 py-4 transition hover:bg-blue-50/60"
                      >
                        {item.image ? (
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.image}
                              alt=""
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2zM9 10a2 2 0 100-4 2 2 0 000 4zm12 8l-4.35-4.35a1 1 0 00-1.3 0L12 17l-2.35-2.35a1 1 0 00-1.3 0L5 18" />
                            </svg>
                          </div>
                        )}
                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <time className="text-xs font-medium text-blue-400">
                            {formatDate(item.pubDate)}
                          </time>
                          <p className="mt-1 line-clamp-2 text-sm leading-snug text-gray-700">
                            {item.title}
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                  {hasMore && (
                    <li className="border-t border-blue-50 px-6 py-4 text-center">
                      <a
                        href={rss.baseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-full border border-blue-200 bg-blue-50 px-6 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                      >
                        活動をもっと見る →
                      </a>
                    </li>
                  )}
                </ul>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-10">
                  <p className="text-sm text-gray-400">投稿を読み込めませんでした</p>
                  <a
                    href={rss.baseUrl ?? rss.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-blue-200 bg-blue-50 px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                  >
                    選挙ドットコムで見る →
                  </a>
                </div>
              )}
            </div>
          )}

          {/* 市政報告 */}
          <div
            ref={rightCardRef}
            className={`reveal reveal-delay-2 ${inView ? 'is-visible' : ''} self-start overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm`}
          >
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
    </section>
  )
}

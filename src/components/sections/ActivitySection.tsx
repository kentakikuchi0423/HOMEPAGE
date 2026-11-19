'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { siteConfig } from '@/content/site'
import { useInView } from '@/hooks/useInView'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
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
      className={`bg-paper px-6 py-16 md:py-20 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-5xl md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12">
        <SectionHeading en="ACTIVITY">活動報告</SectionHeading>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 最新の活動（RSS） */}
          {rss && (
            <div
              style={syncedHeight !== undefined ? { height: syncedHeight } : undefined}
              className={`reveal reveal-delay-1 ${inView ? 'is-visible' : ''} flex flex-col overflow-hidden border border-line bg-white`}
            >
              <div className="shrink-0 border-b border-line border-t-2 border-t-brand px-5 py-3.5">
                <p className="text-base tracking-[0.1em] text-ink">{rss.title}</p>
              </div>

              {loading ? (
                <ul className="flex-1 min-h-0 divide-y divide-line overflow-y-auto">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li key={i} className="flex gap-4 px-5 py-4 animate-pulse">
                      <div className="h-20 w-20 shrink-0 rounded-sm bg-ink/10" />
                      <div className="flex flex-1 flex-col justify-center gap-2">
                        <div className="h-3 w-20 rounded-sm bg-ink/10" />
                        <div className="h-4 w-full rounded-sm bg-ink/5" />
                        <div className="h-4 w-3/4 rounded-sm bg-ink/5" />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : !fetchError && rssItems.length > 0 ? (
                <ul className="flex-1 min-h-0 divide-y divide-line overflow-y-auto">
                  {rssItems.map((item) => (
                    <li key={item.link ?? item.title}>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex gap-4 px-5 py-4 transition-colors hover:bg-paper"
                      >
                        {item.image ? (
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.image}
                              alt=""
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-sm bg-paper text-ink/40">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2zM9 10a2 2 0 100-4 2 2 0 000 4zm12 8l-4.35-4.35a1 1 0 00-1.3 0L12 17l-2.35-2.35a1 1 0 00-1.3 0L5 18" />
                            </svg>
                          </div>
                        )}
                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <time className="text-[0.8125rem] tracking-[0.1em] text-brand">
                            {formatDate(item.pubDate)}
                          </time>
                          <p className="mt-1 line-clamp-2 text-[0.9375rem] leading-relaxed text-ink group-hover:text-brand">
                            {item.title}
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                  {hasMore && (
                    <li className="px-5 py-4 text-center">
                      <a
                        href={rss.baseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block border-b border-brand pb-1 text-[0.9375rem] tracking-[0.1em] text-brand"
                      >
                        活動をもっと見る →
                      </a>
                    </li>
                  )}
                </ul>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-10">
                  <p className="text-[0.9375rem] text-sub">投稿を読み込めませんでした</p>
                  <a
                    href={rss.baseUrl ?? rss.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-b border-brand pb-1 text-[0.9375rem] tracking-[0.1em] text-brand"
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
            className={`reveal reveal-delay-2 ${inView ? 'is-visible' : ''} self-start overflow-hidden border border-line bg-white`}
          >
            <div className="border-b border-line border-t-2 border-t-brand px-5 py-3.5">
              <p className="text-base tracking-[0.1em] text-ink">市政報告</p>
            </div>
            {municipalReport.image && (
              <Reveal className="curtain h-56 w-full">
                <Image
                  src={municipalReport.image}
                  alt={municipalReport.imageAlt ?? '市政報告'}
                  fill
                  className="object-cover"
                />
              </Reveal>
            )}
            <div className="px-5 py-5">
              <p className="text-[0.9375rem] leading-[1.9] text-sub">
                {municipalReport.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

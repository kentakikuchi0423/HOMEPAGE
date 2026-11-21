'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { siteConfig } from '@/content/site'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import ExternalLink from '@/components/ui/ExternalLink'
import { sanitizeItems, type RssItem } from '@/lib/rss'
import { formatDate } from '@/lib/date'

/** この時間を過ぎても応答がなければ、読み込みをあきらめて案内を出す */
const FETCH_TIMEOUT_MS = 8000

type FeedState =
  | { status: 'loading' }
  | { status: 'ready'; items: RssItem[]; hasMore: boolean }
  | { status: 'error' }

const linkClass = 'inline-flex min-h-11 items-center text-[0.9375rem] tracking-[0.1em] text-brand'

export default function ActivitySection() {
  const { municipalReport, rss, labels } = siteConfig.activity
  const heading = siteConfig.headings.activity
  const [feed, setFeed] = useState<FeedState>({ status: 'loading' })

  // PC（2 列）では、右のカード（市政報告）の高さに左のカード（最新の活動）を揃える。
  // 縦に積まれる幅では CSS の固定高さを使い、読み込み後にページ全体の高さが変わらないようにする
  const reportRef = useRef<HTMLDivElement>(null)
  const [syncedHeight, setSyncedHeight] = useState<number>()

  useEffect(() => {
    const el = reportRef.current
    if (!el) return
    const twoColumns = window.matchMedia('(min-width: 1024px)')
    const observer = new ResizeObserver(() => {
      setSyncedHeight(twoColumns.matches ? el.getBoundingClientRect().height : undefined)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!rss) return
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

    fetch(rss.endpoint, { signal: controller.signal, headers: { accept: 'application/json' } })
      .then((res) => {
        if (!res.ok) throw new Error(`unexpected status ${res.status}`)
        return res.json() as Promise<unknown>
      })
      .then((data) => {
        // 受け取った内容は、形と URL をもう一度確かめてから使う
        const record = typeof data === 'object' && data !== null ? (data as Record<string, unknown>) : {}
        const items = sanitizeItems(record.items, rss, rss.limit, rss.baseUrl)
        setFeed(items.length > 0 ? { status: 'ready', items, hasMore: record.hasMore === true } : { status: 'error' })
      })
      .catch(() => setFeed({ status: 'error' }))
      .finally(() => window.clearTimeout(timer))

    return () => {
      window.clearTimeout(timer)
      controller.abort()
    }
  }, [rss])

  return (
    <Reveal as="section" id="activity" threshold={0.12} className="reveal bg-paper px-6 py-16 md:py-20">
      <div className="mx-auto max-w-5xl md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12">
        <SectionHeading en={heading.label}>{heading.title}</SectionHeading>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 最新の活動（RSS） */}
          {rss && (
            <div
              style={syncedHeight !== undefined ? { height: syncedHeight } : undefined}
              className="reveal-child activity-feed flex h-[26rem] flex-col overflow-hidden border border-line bg-white lg:h-auto"
              aria-busy={feed.status === 'loading'}
            >
              <h3 className="shrink-0 bg-brand px-5 py-3 text-base font-medium tracking-[0.1em] text-white">
                {rss.title}
              </h3>

              {feed.status === 'loading' && (
                <ul className="min-h-0 flex-1 divide-y divide-line overflow-hidden" aria-hidden="true">
                  {Array.from({ length: 4 }, (_, i) => (
                    <li key={i} className="flex gap-4 px-5 py-4 motion-safe:animate-pulse">
                      <div className="h-20 w-20 shrink-0 bg-ink/10" />
                      <div className="flex flex-1 flex-col justify-center gap-2">
                        <div className="h-3 w-20 bg-ink/10" />
                        <div className="h-4 w-full bg-ink/5" />
                        <div className="h-4 w-3/4 bg-ink/5" />
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {feed.status === 'ready' && (
                <ul className="min-h-0 flex-1 divide-y divide-line overflow-y-auto">
                  {feed.items.map((item, i) => {
                    const date = formatDate(item.pubDate)
                    return (
                      <li key={`${i}-${item.link}`}>
                        <ExternalLink
                          href={item.link}
                          className="focus-inset-brand group flex gap-4 px-5 py-4 transition-colors hover:bg-paper"
                        >
                          <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden bg-paper text-ink/40">
                            {item.image ? (
                              // eslint-disable-next-line @next/next/no-img-element -- 外部（選挙ドットコム）の画像のため最適化の対象外
                              <img
                                src={item.image}
                                alt=""
                                width={80}
                                height={80}
                                loading="lazy"
                                decoding="async"
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2zM9 10a2 2 0 100-4 2 2 0 000 4zm12 8l-4.35-4.35a1 1 0 00-1.3 0L12 17l-2.35-2.35a1 1 0 00-1.3 0L5 18"
                                />
                              </svg>
                            )}
                          </span>
                          <span className="flex min-w-0 flex-1 flex-col justify-center">
                            {date && (
                              <time dateTime={date.iso} className="text-[0.8125rem] tracking-[0.1em] text-brand">
                                {date.text}
                              </time>
                            )}
                            <span className="mt-1 line-clamp-2 text-[0.9375rem] leading-relaxed text-ink group-hover:text-brand">
                              {item.title}
                            </span>
                          </span>
                        </ExternalLink>
                      </li>
                    )
                  })}
                  {feed.hasMore && (
                    <li className="px-5 py-2 text-center">
                      <ExternalLink href={rss.baseUrl} className={linkClass}>
                        <span className="border-b border-brand pb-1">
                          {labels.more} <span aria-hidden="true">→</span>
                        </span>
                      </ExternalLink>
                    </li>
                  )}
                </ul>
              )}

              {feed.status === 'error' && (
                <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-10" role="status">
                  <p className="text-[0.9375rem] text-sub">{labels.loadError}</p>
                  <ExternalLink href={rss.baseUrl} className={linkClass}>
                    <span className="border-b border-brand pb-1">
                      {labels.fallbackLink} <span aria-hidden="true">→</span>
                    </span>
                  </ExternalLink>
                </div>
              )}
            </div>
          )}

          {/* 市政報告 */}
          <div ref={reportRef} className="reveal-child self-start overflow-hidden border border-line bg-white">
            <h3 className="bg-brand px-5 py-3 text-base font-medium tracking-[0.1em] text-white">
              {municipalReport.title}
            </h3>
            {municipalReport.image && (
              <Reveal className="curtain aspect-[1124/789] w-full">
                <Image
                  src={municipalReport.image}
                  alt={municipalReport.imageAlt ?? municipalReport.title}
                  fill
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  className="object-cover"
                />
              </Reveal>
            )}
            <p className="px-5 py-5 text-[0.9375rem] leading-[1.9] text-sub">{municipalReport.description}</p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

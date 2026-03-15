'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '@/content/site'
import { useInView } from '@/hooks/useInView'
import SectionHeading from '@/components/ui/SectionHeading'

// widgets.js が window.twttr として公開する型
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (el?: HTMLElement | null) => Promise<HTMLElement[]>
      }
      events: {
        bind: (event: string, handler: (event?: unknown) => void) => void
      }
    }
  }
}

export default function ActivitySection() {
  const { handle } = siteConfig.xTimeline
  const { municipalReport } = siteConfig.activity
  // useInView: セクションが画面内に入ったら inView=true（一度きり）
  const { ref, inView } = useInView<HTMLElement>()

  const [xFailed, setXFailed] = useState(false)
  const twitterContainerRef = useRef<HTMLDivElement>(null)
  // このコンポーネントインスタンスで初期化済みかどうかのフラグ
  const initAttemptedRef = useRef(false)
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    // セクションが可視化されていない、または既に初期化済みなら何もしない
    if (!inView || initAttemptedRef.current) return

    const container = twitterContainerRef.current
    if (!container) return

    // ── 50ms debounce ────────────────────────────────────────────────────────
    // React Strict Mode では effect → cleanup → effect と即座に2回実行される。
    // 1回目の cleanup は数μs後に発火するため、50ms のタイマーはキャンセルされる。
    // 2回目の effect (stable mount) でタイマーが生き残り、実際の初期化が行われる。
    // ─────────────────────────────────────────────────────────────────────────
    const debounceId = setTimeout(() => {
      // debounce 後の二重実行ガード
      if (initAttemptedRef.current) return
      initAttemptedRef.current = true

      // <a> を命令的に作成する
      // JSX で <a className="twitter-timeline"> を渡すと、widgets.js の内部
      // MutationObserver が DOM 出現のたびに検知して多重リクエストが起きる。
      // 命令的に作成することで、debounce 後の stable mount でのみ DOM に追加される。
      const a = document.createElement('a')
      a.className = 'twitter-timeline'
      a.href = `https://twitter.com/${handle}`
      a.textContent = `Tweets by @${handle}`
      container.appendChild(a)

      // rendered イベントが来たらフォールバックタイマーをキャンセル（成功）
      let widgetRendered = false
      const onRendered = () => {
        widgetRendered = true
        if (fallbackTimerRef.current) {
          clearTimeout(fallbackTimerRef.current)
          fallbackTimerRef.current = null
        }
      }

      // widgets.js の準備ができたら rendered をバインドして load() を呼ぶ
      const bindAndLoad = () => {
        const twttr = window.twttr
        if (!twttr) return
        twttr.events.bind('rendered', onRendered)
        // twttr.widgets.load(container) は idempotent:
        // MutationObserver による auto-init が先行していても安全に呼べる
        twttr.widgets.load(container)
      }

      if (window.twttr?.events) {
        // layout.tsx の Script より先にこの effect が走った場合はここに来ない想定だが
        // dev での Fast Refresh 等で widgets.js がキャッシュ済みの場合はここで即実行
        bindAndLoad()
      } else {
        // widgets.js がまだロードされていない → 100ms ポーリングで待つ（最大 8s）
        let attempts = 0
        pollIntervalRef.current = setInterval(() => {
          if (window.twttr?.events) {
            clearInterval(pollIntervalRef.current!)
            pollIntervalRef.current = null
            bindAndLoad()
          } else if (++attempts >= 80) {
            // 8s 経過しても widgets.js が来ない
            clearInterval(pollIntervalRef.current!)
            pollIntervalRef.current = null
            console.warn('[X Timeline] widgets.js が 8 秒以内にロードされませんでした')
          }
        }, 100)
      }

      // 8秒フォールバック:
      // - rendered イベントが来れば onRendered() でキャンセルされる（成功）
      // - 429 では iframe DOM は生成されても rendered が来ない場合がある。
      //   そのため iframe の有無ではなく widgetRendered フラグのみで判定する。
      fallbackTimerRef.current = setTimeout(() => {
        fallbackTimerRef.current = null
        if (!widgetRendered) {
          console.warn(
            '[X Timeline] タイムラインのロードがタイムアウトしました。' +
            '原因: 429 (レート制限)、ネットワークブロック、非公開アカウントのいずれかが考えられます。'
          )
          setXFailed(true)
        }
      }, 8000)
    }, 50)

    return () => {
      // Strict Mode cleanup: debounce をキャンセルする（<a> は DOM に追加されない）
      clearTimeout(debounceId)
      // genuine unmount 時: 実行中のタイマー・インターバルをクリア
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current)
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current)
    }
  }, [inView, handle])

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
              <div ref={twitterContainerRef} className="px-4 py-4" />

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

'use client'
import { useEffect, useRef, useState } from 'react'

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

/**
 * X (Twitter) タイムラインウィジェットの初期化を管理するカスタムフック。
 *
 * - React Strict Mode の二重 effect に対応（50ms debounce）
 * - widgets.js のロード待ちを 100ms ポーリングで処理（最大 8s）
 * - 8s 以内に rendered イベントが来なければ失敗フラグを立てる
 */
export function useXTimelineWidget(handle: string, enabled: boolean) {
  const [xFailed, setXFailed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const initAttemptedRef = useRef(false)
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!enabled || initAttemptedRef.current) return

    const container = containerRef.current
    if (!container) return

    // ── 50ms debounce ────────────────────────────────────────────────────────
    // React Strict Mode では effect → cleanup → effect と即座に2回実行される。
    // 1回目の cleanup は数μs後に発火するため、50ms のタイマーはキャンセルされる。
    // 2回目の effect (stable mount) でタイマーが生き残り、実際の初期化が行われる。
    // ─────────────────────────────────────────────────────────────────────────
    const debounceId = setTimeout(() => {
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

      let widgetRendered = false
      const onRendered = () => {
        widgetRendered = true
        if (fallbackTimerRef.current) {
          clearTimeout(fallbackTimerRef.current)
          fallbackTimerRef.current = null
        }
      }

      const bindAndLoad = () => {
        const twttr = window.twttr
        if (!twttr) return
        twttr.events.bind('rendered', onRendered)
        // twttr.widgets.load(container) は idempotent:
        // MutationObserver による auto-init が先行していても安全に呼べる
        twttr.widgets.load(container)
      }

      if (window.twttr?.events) {
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
            clearInterval(pollIntervalRef.current!)
            pollIntervalRef.current = null
            console.warn('[X Timeline] widgets.js が 8 秒以内にロードされませんでした')
          }
        }, 100)
      }

      // 8秒フォールバック:
      // - rendered イベントが来れば onRendered() でキャンセルされる（成功）
      // - 429 では iframe DOM は生成されても rendered が来ない場合がある
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
  }, [enabled, handle])

  return { xFailed, containerRef }
}

'use client'
import { useEffect } from 'react'

/**
 * ページ内リンク（#profile など）の挙動を整える。
 * - 移動後に URL へ # を残さない（残ると、再読み込み時にそのセクションへ戻されてしまう）
 * - # 付きの URL で直接開かれた場合は、移動が済んでから # を外す
 */
export default function InPageNav() {
  useEffect(() => {
    const clearHash = () =>
      history.replaceState(history.state, '', location.pathname + location.search)

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]')
      const id = link?.getAttribute('href')?.slice(1)
      if (!id) return
      const target = document.getElementById(id)
      if (!target) {
        // トップページ以外（存在しないページなど）では、トップページの該当箇所へ移動する
        if (location.pathname !== '/') {
          e.preventDefault()
          // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- 読み込み直して # の位置へ移動させる
          location.href = `/#${id}`
        }
        return
      }

      e.preventDefault()
      target.scrollIntoView() // scroll-behavior / scroll-padding-top は CSS の指定に従う
      // キーボード・読み上げ利用者のために、移動先へフォーカスも移す
      target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
      clearHash()
    }

    // # 付きの URL で開かれた／アドレス欄で # を変えられた場合も、移動が済んでから # を外す
    let timer: number | undefined
    const scheduleClear = () => {
      if (!location.hash) return
      window.clearTimeout(timer)
      timer = window.setTimeout(clearHash, 1500)
    }

    scheduleClear()
    document.addEventListener('click', onClick)
    window.addEventListener('hashchange', scheduleClear)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('hashchange', scheduleClear)
      window.clearTimeout(timer)
    }
  }, [])

  return null
}

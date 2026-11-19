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
      if (!target) return

      e.preventDefault()
      target.scrollIntoView() // scroll-behavior / scroll-padding-top は CSS の指定に従う
      // キーボード・読み上げ利用者のために、移動先へフォーカスも移す
      target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
      clearHash()
    }

    document.addEventListener('click', onClick)
    const timer = location.hash ? window.setTimeout(clearHash, 1500) : undefined
    return () => {
      document.removeEventListener('click', onClick)
      if (timer) window.clearTimeout(timer)
    }
  }, [])

  return null
}

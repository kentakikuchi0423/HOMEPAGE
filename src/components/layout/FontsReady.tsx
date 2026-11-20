'use client'
import { useEffect } from 'react'

/**
 * 書体の読み込みが済んでから、ファーストビューの表示アニメーションを始める。
 * 先に始めると、途中で代替書体から明朝体へ切り替わり、文字がかくついて見えるため。
 * 読み込みが遅い場合に備え、一定時間で必ず開始する。
 */
export default function FontsReady() {
  useEffect(() => {
    const root = document.documentElement
    const start = () => root.classList.add('fonts-ready')
    const timer = window.setTimeout(start, 1200)

    const hero = document.getElementById('hero')
    const family = getComputedStyle(document.body).fontFamily
    document.fonts
      .load(`500 1rem ${family}`, hero?.textContent ?? '')
      .then(() => document.fonts.load(`600 1rem ${family}`, hero?.textContent ?? ''))
      .then(start, start)

    return () => window.clearTimeout(timer)
  }, [])

  return null
}

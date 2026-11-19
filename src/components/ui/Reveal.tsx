'use client'
import type { ReactNode, RefObject } from 'react'
import { useInView } from '@/hooks/useInView'

type Props = {
  children: ReactNode
  className?: string
  /** 要素のどれだけが見えたら表示を始めるか（0〜1） */
  threshold?: number
  as?: 'div' | 'li'
}

/** 画面に入った時点で `is-visible` クラスを付ける（動きの定義は globals.css 側） */
export default function Reveal({ children, className = '', threshold = 0.2, as = 'div' }: Props) {
  const { ref, inView } = useInView<HTMLElement>(threshold)
  const cls = `${className} ${inView ? 'is-visible' : ''}`

  if (as === 'li') {
    return (
      <li ref={ref as RefObject<HTMLLIElement | null>} className={cls}>
        {children}
      </li>
    )
  }
  return (
    <div ref={ref as RefObject<HTMLDivElement | null>} className={cls}>
      {children}
    </div>
  )
}

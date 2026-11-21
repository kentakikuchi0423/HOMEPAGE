'use client'
import type { ReactNode, Ref } from 'react'
import { useInView } from '@/hooks/useInView'

type Props = {
  children: ReactNode
  className?: string
  id?: string
  /** 要素のどれだけが見えたら表示を始めるか（0〜1） */
  threshold?: number
  as?: 'div' | 'li' | 'section'
}

/**
 * 画面に入った時点で `is-visible` クラスを付ける（動きの定義は globals.css 側）。
 * 自身に `reveal` / `curtain` / `row-line` を付けるほか、中の `reveal-child` や見出し（`rise`）もこれを合図に現れる。
 * 各セクションはこの部品で包むだけで済むので、セクション自体はサーバー側で描画できる。
 */
export default function Reveal({ children, className = '', id, threshold = 0.2, as: Tag = 'div' }: Props) {
  const { ref, inView } = useInView<HTMLElement>(threshold)
  return (
    <Tag
      // 要素の種類ごとに ref の型が異なるため、共通の HTMLElement として渡す
      ref={ref as Ref<never>}
      id={id}
      className={`${className} ${inView ? 'is-visible' : ''}`.trim()}
    >
      {children}
    </Tag>
  )
}

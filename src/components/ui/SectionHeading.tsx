import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** 見出しの下に添える英字ラベル */
  en?: string
  /** 色のついた背景の上で使う場合 */
  light?: boolean
}

export default function SectionHeading({ children, en, light = false }: Props) {
  return (
    <div className="mb-10 md:mb-0">
      <h2
        className={`font-display text-[1.75rem] font-semibold leading-snug tracking-[0.06em] sm:text-[1.875rem] ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        <span className="mask">
          <span className="rise">{children}</span>
        </span>
      </h2>
      {en && (
        <p
          lang="en"
          className={`mt-2 text-[0.8125rem] font-medium tracking-[0.2em] uppercase ${
            light ? 'text-white/80' : 'text-brand'
          }`}
        >
          {en}
        </p>
      )}
    </div>
  )
}

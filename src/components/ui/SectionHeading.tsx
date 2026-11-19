import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** English label displayed beside the Japanese heading */
  en?: string
  /** Use light variant on dark/colored backgrounds */
  light?: boolean
}

export default function SectionHeading({ children, en, light = false }: Props) {
  return (
    <div
      className={`mb-10 flex items-baseline gap-4 border-b-2 pb-4 sm:mb-12 ${
        light ? 'border-white/40' : 'border-ink'
      }`}
    >
      <h2
        className={`font-display text-3xl font-black tracking-wide sm:text-4xl ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {children}
      </h2>
      {en && (
        <p
          className={`text-xs font-bold tracking-[0.25em] uppercase ${
            light ? 'text-white/80' : 'text-brand'
          }`}
        >
          {en}
        </p>
      )}
    </div>
  )
}

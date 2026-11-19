import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** English label displayed under the Japanese heading */
  en?: string
  /** Use light variant on dark/colored backgrounds */
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
        {children}
      </h2>
      {en && (
        <p
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

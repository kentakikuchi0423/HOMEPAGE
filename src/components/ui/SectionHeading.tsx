import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** English label displayed above the Japanese heading */
  en?: string
  /** Use light variant on dark/colored backgrounds */
  light?: boolean
}

export default function SectionHeading({ children, en, light = false }: Props) {
  return (
    <div className="mb-10 md:mb-0">
      {en && (
        <p
          className={`font-display text-sm tracking-[0.12em] lowercase first-letter:uppercase ${
            light ? 'text-white/75' : 'text-brand'
          }`}
        >
          {en}
        </p>
      )}
      <h2
        className={`mt-2 font-display text-[1.625rem] font-semibold leading-snug tracking-[0.1em] sm:text-[1.75rem] ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {children}
      </h2>
    </div>
  )
}

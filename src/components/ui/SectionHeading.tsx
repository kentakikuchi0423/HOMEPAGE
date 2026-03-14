import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** English subtitle displayed above the Japanese heading */
  en?: string
  /** Use light variant on dark/colored backgrounds */
  light?: boolean
}

export default function SectionHeading({ children, en, light = false }: Props) {
  return (
    <div className="mb-12 text-center">
      {en && (
        <p
          className={`mb-2 text-xs font-medium tracking-[0.2em] uppercase ${
            light ? 'text-white/60' : 'text-blue-500'
          }`}
        >
          {en}
        </p>
      )}
      <h2
        className={`text-3xl font-bold tracking-wide sm:text-4xl ${
          light ? 'text-white' : 'text-gray-900'
        }`}
      >
        {children}
      </h2>
      <div
        className={`mx-auto mt-3 h-[3px] w-16 rounded-full ${
          light ? 'bg-white/60' : 'bg-blue-600'
        }`}
      />
    </div>
  )
}

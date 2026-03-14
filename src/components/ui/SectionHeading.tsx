interface Props {
  children: React.ReactNode
  /** Use light variant on dark/colored backgrounds */
  light?: boolean
}

export default function SectionHeading({ children, light = false }: Props) {
  return (
    <div className="mb-12 text-center">
      <h2
        className={`text-3xl font-bold tracking-wide sm:text-4xl ${
          light ? 'text-white' : 'text-gray-900'
        }`}
      >
        {children}
      </h2>
      <div
        className={`mx-auto mt-3 h-1 w-16 rounded-full ${
          light ? 'bg-white/60' : 'bg-blue-600'
        }`}
      />
    </div>
  )
}

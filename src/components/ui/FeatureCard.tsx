type Props = {
  icon: React.ReactNode
  title: string
  items: string[]
}

export default function FeatureCard({ icon, title, items }: Props) {
  return (
    <div className="rounded-2xl bg-pink-50/60 p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-pink-200/40 hover:-translate-y-1">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-pink-800">
        <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-pink-100 text-pink-600 shrink-0" aria-hidden="true">
          {icon}
        </span>
        {title}
      </h3>
      <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-5 text-gray-700">
            <span className="mt-0.5 shrink-0 text-pink-400" aria-hidden="true">›</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

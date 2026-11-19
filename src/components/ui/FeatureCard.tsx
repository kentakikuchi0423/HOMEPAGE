type Props = {
  icon: React.ReactNode
  title: string
  items: string[]
}

export default function FeatureCard({ icon, title, items }: Props) {
  return (
    <div>
      <h3 className="mb-4 flex items-center gap-2 font-display text-base font-bold text-ink">
        <span className="shrink-0 text-brand" aria-hidden="true">
          {icon}
        </span>
        {title}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="rounded-sm border border-line bg-white px-3 py-1.5 text-sm font-medium text-ink"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

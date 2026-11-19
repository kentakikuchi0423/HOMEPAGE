type Props = {
  icon?: React.ReactNode
  title: string
  items: string[]
}

export default function FeatureCard({ title, items }: Props) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-1 border-b border-line py-5 sm:grid-cols-[7rem_minmax(0,1fr)]">
      <h3 className="text-sm text-sub">{title}</h3>
      <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem]">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

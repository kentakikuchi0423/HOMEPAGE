type Props = {
  title: string
  items: string[]
}

export default function FeatureCard({ title, items }: Props) {
  return (
    <div className="border-t border-line py-5">
      <h3 className="text-[0.9375rem] text-brand">{title}</h3>
      {/* 項目数にかかわらず常に 2 列で揃える */}
      <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-base">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

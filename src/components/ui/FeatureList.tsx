type Props = {
  title: string
  items?: string[]
}

/** プロフィール欄の「趣味・特技」「資格・試験」など、見出しつきの 2 列の一覧 */
export default function FeatureList({ title, items }: Props) {
  if (!items || items.length === 0) return null
  return (
    <div className="border-t border-line py-5">
      <h3 className="text-[0.9375rem] text-brand">{title}</h3>
      <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-base">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

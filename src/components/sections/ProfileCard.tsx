import { siteConfig } from '@/content/site'

export default function ProfileCard() {
  const { bio } = siteConfig.profile

  return (
    <ul className="space-y-3 pb-7 text-base">
      {bio.map((line, i) => (
        <li key={i}>{line}</li>
      ))}
    </ul>
  )
}

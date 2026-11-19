import { siteConfig } from '@/content/site'

export default function ProfileCard() {
  const { bio } = siteConfig.profile

  return (
    <ul className="border-t border-line">
      {bio.map((line, i) => (
        <li
          key={i}
          className="border-b border-line py-4 text-base leading-relaxed text-ink sm:text-lg"
        >
          {line}
        </li>
      ))}
    </ul>
  )
}

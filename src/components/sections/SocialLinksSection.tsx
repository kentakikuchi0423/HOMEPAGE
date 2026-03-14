import { siteConfig } from '@/content/site'

const links = [
  { label: 'X (Twitter)', key: 'x' },
  { label: 'Facebook', key: 'facebook' },
  { label: 'Instagram', key: 'instagram' },
  { label: 'YouTube', key: 'youtube' },
  { label: '選挙ドットコム', key: 'senkyo' },
] as const

export default function SocialLinksSection() {
  return (
    <section id="social" className="px-4 py-16">
      <h2>SNS・リンク</h2>
      <ul>
        {links.map(({ label, key }) => (
          <li key={key}>
            <a href={siteConfig.socialLinks[key]} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

import { siteConfig } from '@/content/site'

export default function SocialLinksSection() {
  const sorted = [...siteConfig.sns].sort((a, b) => a.order - b.order)
  return (
    <section id="social" className="px-4 py-16">
      <h2>SNS・リンク</h2>
      <ul>
        {sorted.map(({ platform, url }) => (
          <li key={platform}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {platform}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

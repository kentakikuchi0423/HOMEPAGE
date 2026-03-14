import { siteConfig } from '@/content/site'

export default function DonationSection() {
  const { url, label, description } = siteConfig.donation
  return (
    <section id="donation" className="px-4 py-16">
      <h2>ご支援のお願い</h2>
      {description && <p>{description}</p>}
      <a href={url} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    </section>
  )
}

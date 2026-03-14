import { siteConfig } from '@/content/site'

export default function PolicySection() {
  return (
    <section id="policy" className="px-4 py-16">
      <h2>政策</h2>
      <ul>
        {siteConfig.policies.map((policy) => (
          <li key={policy.title}>
            <span>{policy.icon}</span>
            <strong>{policy.title}</strong>
            <p>{policy.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

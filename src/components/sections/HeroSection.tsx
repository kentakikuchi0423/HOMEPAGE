import { siteConfig } from '@/content/site'

export default function HeroSection() {
  return (
    <section id="hero" className="px-4 py-16">
      <h1>{siteConfig.name}</h1>
      <p>{siteConfig.slogan}</p>
    </section>
  )
}

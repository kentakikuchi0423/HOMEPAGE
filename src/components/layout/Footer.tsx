import { siteConfig } from '@/content/site'

export default function Footer() {
  return (
    <footer className="bg-white px-6 py-10 text-center text-xs text-sub">
      <p>{siteConfig.footer.copyright}</p>
      {siteConfig.footer.disclaimer && <p className="mt-1">{siteConfig.footer.disclaimer}</p>}
    </footer>
  )
}

import { siteConfig } from '@/content/site'

export default function Footer() {
  return (
    <footer className="border-t border-white/15 bg-ink px-5 py-8 text-center text-sm text-white/85">
      <p className="font-medium">{siteConfig.footer.copyright}</p>
      {siteConfig.footer.disclaimer && (
        <p className="mt-2 text-xs text-white/65">{siteConfig.footer.disclaimer}</p>
      )}
    </footer>
  )
}

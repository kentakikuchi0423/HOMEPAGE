import { siteConfig } from '@/content/site'

export default function Footer() {
  return (
    <footer className="px-4 py-4 border-t text-sm text-center">
      <p>{siteConfig.footer.copyright}</p>
      {siteConfig.footer.disclaimer && (
        <p className="mt-1 text-xs text-gray-500">{siteConfig.footer.disclaimer}</p>
      )}
    </footer>
  )
}

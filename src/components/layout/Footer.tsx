import { siteConfig } from '@/content/site'

export default function Footer() {
  return (
    <footer className="bg-blue-950 px-4 py-8 text-center text-sm text-blue-200">
      <p className="font-medium">{siteConfig.footer.copyright}</p>
      {siteConfig.footer.disclaimer && (
        <p className="mt-2 text-xs text-blue-400">{siteConfig.footer.disclaimer}</p>
      )}
    </footer>
  )
}

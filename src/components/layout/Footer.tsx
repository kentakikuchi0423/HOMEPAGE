import { siteConfig } from '@/content/site'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-pink-950 to-pink-900 px-4 py-10 text-center text-sm text-pink-200">
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-blob absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-400/5 blur-2xl" />
        <div className="hero-blob-offset absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-fuchsia-400/5 blur-2xl" />
      </div>
      <div className="relative z-10">
        <p className="font-medium">{siteConfig.footer.copyright}</p>
        {siteConfig.footer.disclaimer && (
          <p className="mt-2 text-xs text-pink-400">{siteConfig.footer.disclaimer}</p>
        )}
      </div>
    </footer>
  )
}

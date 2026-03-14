import { siteConfig } from '@/content/site'

export default function Footer() {
  return (
    <footer className="px-4 py-4 border-t text-sm text-center">
      <p>© {new Date().getFullYear()} {siteConfig.name}</p>
    </footer>
  )
}

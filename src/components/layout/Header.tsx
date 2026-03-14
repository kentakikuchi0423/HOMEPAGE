import { siteConfig } from '@/content/site'

export default function Header() {
  return (
    <header className="px-4 py-4 border-b">
      <p className="font-bold">{siteConfig.name}</p>
    </header>
  )
}

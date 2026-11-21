import type { ReactNode } from 'react'
import { siteConfig } from '@/content/site'

type Props = {
  href: string
  className?: string
  children: ReactNode
}

/** 別のサイトを新しいタブで開くリンク。読み上げ用に「新しいタブで開きます」を添える */
export default function ExternalLink({ href, className, children }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only">（{siteConfig.nav.newTabLabel}）</span>
    </a>
  )
}

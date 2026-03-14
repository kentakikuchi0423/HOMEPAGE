'use client'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/content/site'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 shadow-md backdrop-blur-sm'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <p className="text-base font-bold text-blue-700 sm:text-lg">
          {siteConfig.profile.name}
        </p>
        <nav className="hidden items-center gap-5 text-sm font-medium text-gray-700 sm:flex">
          <a href="#profile" className="transition-colors hover:text-blue-600">
            プロフィール
          </a>
          <a href="#policy" className="transition-colors hover:text-blue-600">
            政策
          </a>
          <a href="#social" className="transition-colors hover:text-blue-600">
            SNS
          </a>
          <a
            href="#donation"
            className="rounded-full bg-blue-600 px-5 py-1.5 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            応援する
          </a>
        </nav>
        {/* Mobile CTA */}
        <a
          href="#donation"
          className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:hidden"
        >
          応援する
        </a>
      </div>
    </header>
  )
}

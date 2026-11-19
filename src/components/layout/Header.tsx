'use client'
import { useEffect, useState } from 'react'
import { siteConfig } from '@/content/site'

const MOBILE_MENU_ID = 'mobile-menu'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { items, cta, homeLabel, menuOpenLabel, menuCloseLabel } = siteConfig.nav

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // メニュー表示中は Escape キーで閉じられるようにする
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-white/95 shadow-md backdrop-blur-sm'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <a href="/" aria-label={homeLabel} className="shrink-0">
          {siteConfig.brand.headerLogo ? (
            <img
              src={siteConfig.brand.headerLogo}
              alt={siteConfig.brand.logoAlt ?? siteConfig.profile.name}
              className="h-8 w-auto object-contain sm:h-10"
            />
          ) : (
            <span className="flex flex-col leading-tight">
              <span className="text-[10px] font-medium tracking-widest text-blue-600 uppercase sm:text-xs">
                {siteConfig.profile.title}
              </span>
              <span className="text-base font-bold text-blue-700 sm:text-lg">
                {siteConfig.profile.name}
              </span>
            </span>
          )}
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 text-sm font-medium text-gray-700 sm:flex">
          {items.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-blue-600">
              {item.label}
            </a>
          ))}
          <a
            href={cta.href}
            className="rounded-full bg-blue-600 px-5 py-1.5 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            {cta.label}
          </a>
        </nav>

        {/* Mobile: CTA + menu button */}
        <div className="flex items-center gap-2 sm:hidden">
          <a
            href={cta.href}
            onClick={closeMenu}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            {cta.label}
          </a>
          <button
            type="button"
            aria-label={menuOpen ? menuCloseLabel : menuOpenLabel}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-blue-800 transition-colors hover:bg-blue-50"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <nav
        id={MOBILE_MENU_ID}
        hidden={!menuOpen}
        className="border-t border-blue-100 bg-white px-4 pb-4 pt-2 sm:hidden"
      >
        <ul className="divide-y divide-blue-50">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={closeMenu}
                className="flex items-center justify-between py-3.5 text-base font-medium text-gray-800"
              >
                {item.label}
                <span className="text-blue-600" aria-hidden="true">›</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

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
      className={`fixed left-0 right-0 top-0 z-50 border-b bg-white/95 backdrop-blur-sm transition-colors duration-500 ${
        scrolled || menuOpen ? 'border-line' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" aria-label={homeLabel} className="shrink-0">
          {siteConfig.brand.headerLogo ? (
            <img
              src={siteConfig.brand.headerLogo}
              alt={siteConfig.brand.logoAlt ?? siteConfig.profile.name}
              className="h-8 w-auto object-contain sm:h-10"
            />
          ) : (
            <span className="flex items-baseline gap-3">
              <span className="font-display text-xl font-semibold tracking-[0.14em] text-ink">
                {siteConfig.profile.name}
              </span>
              <span className="hidden text-[0.8125rem] tracking-[0.16em] text-brand sm:inline">
                {siteConfig.profile.title}
              </span>
            </span>
          )}
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-[0.9375rem] font-medium tracking-[0.04em] text-ink lg:flex">
          {items.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-brand">
              {item.label}
            </a>
          ))}
          <a
            href={cta.href}
            className="bg-brand px-6 py-2 text-white transition-colors hover:bg-ink"
          >
            {cta.label}
          </a>
        </nav>

        {/* Mobile: CTA + menu button */}
        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={cta.href}
            onClick={closeMenu}
            className="bg-brand px-4 py-2 text-[0.9375rem] tracking-[0.08em] text-white"
          >
            {cta.label}
          </a>
          <button
            type="button"
            aria-label={menuOpen ? menuCloseLabel : menuOpenLabel}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            onClick={() => setMenuOpen((v) => !v)}
            className="-mr-2 flex h-11 w-11 items-center justify-center text-ink"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.25}
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 9h16M4 15h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <nav id={MOBILE_MENU_ID} hidden={!menuOpen} className="border-t border-line bg-white px-6 pb-6 lg:hidden">
        <ul>
          {items.map((item) => (
            <li key={item.href} className="border-b border-line">
              <a
                href={item.href}
                onClick={closeMenu}
                className="flex items-center justify-between py-4 text-base tracking-[0.1em] text-ink"
              >
                {item.label}
                <span className="text-brand" aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

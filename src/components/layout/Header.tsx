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
      className={`fixed left-0 right-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || menuOpen ? 'border-line bg-white' : 'border-transparent bg-paper'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="/" aria-label={homeLabel} className="shrink-0">
          {siteConfig.brand.headerLogo ? (
            <img
              src={siteConfig.brand.headerLogo}
              alt={siteConfig.brand.logoAlt ?? siteConfig.profile.name}
              className="h-8 w-auto object-contain sm:h-10"
            />
          ) : (
            <span className="flex flex-col leading-tight">
              <span className="text-[10px] font-bold tracking-widest text-brand sm:text-xs">
                {siteConfig.profile.title}
              </span>
              <span className="font-display text-base font-black text-ink sm:text-lg">
                {siteConfig.profile.name}
              </span>
            </span>
          )}
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-bold text-ink sm:flex">
          {items.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-brand">
              {item.label}
            </a>
          ))}
          <a
            href={cta.href}
            className="rounded-md bg-ink px-5 py-2 font-bold text-white transition-colors hover:bg-brand"
          >
            {cta.label}
          </a>
        </nav>

        {/* Mobile: CTA + menu button */}
        <div className="flex items-center gap-2 sm:hidden">
          <a
            href={cta.href}
            onClick={closeMenu}
            className="rounded-md bg-ink px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-brand"
          >
            {cta.label}
          </a>
          <button
            type="button"
            aria-label={menuOpen ? menuCloseLabel : menuOpenLabel}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-md text-ink transition-colors hover:bg-ink/5"
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
        className="border-t border-line bg-white px-5 pb-4 pt-1 sm:hidden"
      >
        <ul className="divide-y divide-line">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={closeMenu}
                className="flex items-center justify-between py-4 font-display text-base font-bold text-ink"
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

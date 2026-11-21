'use client'
import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '@/content/site'

const MOBILE_MENU_ID = 'mobile-menu'
/** この幅以上では PC 用のナビゲーションを表示する（Tailwind の lg と揃える） */
const DESKTOP_QUERY = '(min-width: 1024px)'

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const { items, cta, homeLabel, mainNavLabel, mobileNavLabel, menuOpenLabel, menuCloseLabel } = siteConfig.nav
  const { name, title } = siteConfig.profile

  // 読み進めた割合を、ヘッダー下端の細い線で示す
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const ratio = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${ratio})`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    // 画面の大きさやページの長さ（画像や投稿の読み込み後など）が変わったときも計算し直す
    const observer = new ResizeObserver(update)
    observer.observe(document.body)
    return () => {
      window.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [])

  // メニューを開いている間だけ：Escape・メニューの外側の操作・PC 幅への切り替えで閉じる
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      menuButtonRef.current?.focus() // 閉じた後にキーボード操作の位置を見失わないようにする
    }
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false)
    }
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const onDesktopChange = () => {
      if (desktop.matches) setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    desktop.addEventListener('change', onDesktopChange)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      desktop.removeEventListener('change', onDesktopChange)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      ref={headerRef}
      className="fixed left-0 right-0 top-0 z-50 border-b border-line bg-white/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-6">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- 1 ページ構成のため、通常のリンクで先頭から読み込み直す */}
        <a href="/" aria-label={`${name} ${title}（${homeLabel}）`} className="flex h-11 min-w-0 items-center">
          {siteConfig.brand.headerLogo ? (
            // eslint-disable-next-line @next/next/no-img-element -- 静的書き出しのため画像最適化は使わない
            <img
              src={siteConfig.brand.headerLogo}
              alt={siteConfig.brand.logoAlt ?? name}
              className="h-8 w-auto object-contain sm:h-10"
            />
          ) : (
            <span className="flex min-w-0 items-baseline gap-3">
              <span className="truncate font-display text-xl font-semibold tracking-[0.14em] text-ink">{name}</span>
              <span className="hidden shrink-0 text-[0.8125rem] tracking-[0.16em] text-brand sm:inline">{title}</span>
            </span>
          )}
        </a>

        {/* PC 用のナビゲーション */}
        <nav
          aria-label={mainNavLabel}
          className="hidden shrink-0 items-center gap-6 text-[0.9375rem] font-medium tracking-[0.04em] text-ink lg:flex"
        >
          {items.map((item) => (
            <a key={item.href} href={item.href} className="nav-link transition-colors hover:text-brand">
              {item.label}
            </a>
          ))}
          <a
            href={cta.href}
            className="border-b border-brand pb-0.5 text-brand transition-colors hover:border-ink hover:text-ink"
          >
            {cta.label}
          </a>
        </nav>

        {/* スマホ・タブレット用：「応援する」とメニューボタン */}
        <div className="flex shrink-0 items-center gap-1 lg:hidden">
          <a
            href={cta.href}
            onClick={closeMenu}
            className="flex h-11 items-center whitespace-nowrap px-2 text-[0.9375rem] font-medium tracking-[0.04em] text-brand"
          >
            <span className="border-b border-brand pb-0.5">{cta.label}</span>
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={menuOpen ? menuCloseLabel : menuOpenLabel}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            onClick={() => setMenuOpen((open) => !open)}
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

      <div
        ref={progressRef}
        className="absolute bottom-[-1px] left-0 h-0.5 w-full origin-left bg-brand"
        style={{ transform: 'scaleX(0)' }}
        aria-hidden="true"
      />

      {/* スマホ・タブレット用のメニュー。画面が低い場合はメニューの中でスクロールできる */}
      <nav
        id={MOBILE_MENU_ID}
        aria-label={mobileNavLabel}
        hidden={!menuOpen}
        className="max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-line bg-white px-6 pb-6 lg:hidden"
      >
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

import Image from 'next/image'
import { siteConfig } from '@/content/site'

export default function HeroSection() {
  const { name, nameKana, title, catchcopy, subcopy, photo } = siteConfig.profile
  const { cta } = siteConfig.hero
  const support = siteConfig.nav.cta

  return (
    <section id="hero" className="overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-6xl items-end gap-x-10 gap-y-8 px-5 pt-10 md:grid-cols-[1.1fr_0.9fr] md:pt-16">
        {/* Text */}
        <div className="flex items-start justify-between gap-6 md:pb-20">
          <div className="flex min-w-0 flex-col items-start">
            <p className="flex items-center gap-3 text-sm font-bold tracking-[0.2em] text-brand">
              <span className="h-px w-8 bg-brand" aria-hidden="true" />
              {title}
            </p>

            <h1 className="mt-4 font-display text-[3.25rem] font-black leading-[1.1] tracking-tight text-ink sm:text-7xl lg:text-[5.25rem]">
              {name}
            </h1>
            <p className="mt-3 text-xs font-bold tracking-[0.35em] text-ink/70 sm:text-sm">
              {nameKana}
            </p>

            {/* スマホでは横書き、PC では右側に縦書きで表示（同じ要素を CSS で切り替え） */}
            <p className="mt-7 font-display text-2xl font-black leading-snug text-ink md:hidden">
              <span className="marker">{catchcopy}</span>
            </p>

            {subcopy && (
              <p className="mt-4 text-base leading-relaxed text-ink/80 md:mt-8 md:text-lg">
                {subcopy}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={cta.href}
                className="rounded-md bg-ink px-7 py-3.5 font-bold text-white transition-colors hover:bg-brand"
              >
                {cta.label}
              </a>
              <a
                href={support.href}
                className="border-b-2 border-ink pb-0.5 font-bold text-ink transition-colors hover:border-brand hover:text-brand"
              >
                {support.label}
              </a>
            </div>
          </div>

          <p
            className="hero-catch hidden shrink-0 font-display text-3xl font-black leading-[1.9] tracking-[0.18em] text-ink md:block lg:text-4xl"
            aria-hidden="true"
          >
            <span className="marker">{catchcopy}</span>
          </p>
        </div>

        {/* Photo */}
        {photo && (
          <div className="relative mx-auto w-full max-w-sm md:max-w-none">
            <div
              className="absolute bottom-0 left-6 right-[-1.25rem] top-6 bg-brand md:left-10 md:top-10"
              aria-hidden="true"
            />
            <Image
              src={photo}
              alt={name}
              width={640}
              height={640}
              priority
              className="relative aspect-[5/6] w-[calc(100%-1.25rem)] object-cover object-top md:w-[calc(100%-2rem)]"
            />
          </div>
        )}
      </div>
    </section>
  )
}

import Image from 'next/image'
import { siteConfig } from '@/content/site'

export default function HeroSection() {
  const { name, nameKana, title, catchcopy, subcopy, photo } = siteConfig.profile
  const { cta } = siteConfig.hero

  return (
    <section id="hero" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-x-12 gap-y-10 px-6 pb-16 pt-10 md:grid-cols-[1fr_minmax(0,27rem)] md:pb-24 md:pt-14 lg:grid-cols-[1fr_minmax(0,30rem)]">
        {/* Text：スマホは上から「キャッチコピー → 氏名」、PC は左下に氏名・右上に縦書きのキャッチコピー */}
        <div className="flex flex-col-reverse gap-10 md:flex-row md:justify-between md:gap-8">
          <div className="md:self-end md:pb-2">
            <p className="text-[0.8125rem] tracking-[0.3em] text-sub">{title}</p>
            <h1 className="mt-3 font-display text-[2.5rem] font-semibold leading-tight tracking-[0.16em] text-ink lg:text-5xl">
              {name}
            </h1>
            <p className="mt-3 text-[0.6875rem] tracking-[0.4em] text-sub">{nameKana}</p>

            {subcopy && <p className="mt-8 text-[0.9375rem] text-ink md:mt-10">{subcopy}</p>}

            <a
              href={cta.href}
              className="arrow-link mt-8 inline-flex items-center gap-6 border-b border-ink pb-2 text-sm tracking-[0.12em] text-ink transition-colors hover:border-brand hover:text-brand"
            >
              {cta.label}
              <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>

          <p className="hero-catch font-display text-[min(1.5rem,5.7vw)] font-medium leading-[1.7] tracking-[0.06em] text-ink md:text-[1.75rem] md:leading-[2] md:tracking-[0.24em] lg:text-[2rem]">
            {catchcopy}
          </p>
        </div>

        {/* Photo */}
        {photo && (
          <Image
            src={photo}
            alt={name}
            width={720}
            height={720}
            priority
            className="aspect-[4/5] w-full object-cover object-top"
          />
        )}
      </div>
    </section>
  )
}

import Image from 'next/image'
import { siteConfig } from '@/content/site'

export default function HeroSection() {
  const { name, nameKana, title, catchcopy, subcopy, photo } = siteConfig.profile
  const { cta } = siteConfig.hero

  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      {/* イメージカラーの色面：PC は右端の縦帯、スマホは写真の下半分に敷く */}
      <div
        className="absolute bottom-0 right-0 h-44 w-full bg-brand md:h-full md:w-[calc(50vw-17rem)] lg:w-[calc(50vw-20rem)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl gap-x-12 gap-y-10 px-6 pb-12 pt-10 md:grid-cols-[1fr_minmax(0,27rem)] md:pb-20 md:pt-14 lg:grid-cols-[1fr_minmax(0,30rem)]">
        {/* Text：スマホは上から「キャッチコピー → 氏名」、PC は左下に氏名・右上に縦書きのキャッチコピー */}
        <div className="flex flex-col-reverse gap-9 md:flex-row md:justify-between md:gap-8">
          <div className="md:self-end">
            <p className="flex items-center gap-3 text-[0.9375rem] tracking-[0.24em] text-brand">
              <span className="h-px w-8 bg-brand" aria-hidden="true" />
              {title}
            </p>
            <h1 className="mt-4 font-display text-[2.5rem] font-semibold leading-tight tracking-[0.16em] text-ink lg:text-5xl">
              {name}
            </h1>
            <p className="mt-3 text-[0.8125rem] tracking-[0.36em] text-sub">{nameKana}</p>

            {subcopy && <p className="mt-7 text-base text-ink md:mt-9">{subcopy}</p>}

            <a
              href={cta.href}
              className="arrow-link mt-8 inline-flex items-center gap-8 bg-brand py-3.5 pl-7 pr-6 text-[0.9375rem] tracking-[0.12em] text-white transition-colors hover:bg-ink"
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

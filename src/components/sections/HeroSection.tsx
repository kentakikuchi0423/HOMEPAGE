import Image from 'next/image'
import { siteConfig } from '@/content/site'
import WaveEdge from '@/components/ui/WaveEdge'

export default function HeroSection() {
  const { name, nameKana, title, catchcopy, subcopy, photo } = siteConfig.profile
  const { cta } = siteConfig.hero

  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      {/* イメージカラーの色面：PC は右端の縦帯、スマホは写真の下半分に敷く */}
      <div
        className="hero-panel absolute bottom-0 right-0 h-44 w-full bg-brand md:h-full md:w-[14vw]"
        aria-hidden="true"
      />

      {/* 次のセクション（淡い青）との境目を、川面のような波にする */}
      <WaveEdge edge="bottom" fillClassName="fill-paper" />

      <div className="hero-inner relative mx-auto grid max-w-6xl gap-x-12 gap-y-10 px-6 pb-12 pt-8 md:grid-cols-[1fr_minmax(0,20rem)] md:items-center md:pb-16 md:pt-10 lg:grid-cols-[1fr_minmax(0,27rem)] lg:items-stretch xl:grid-cols-[1fr_minmax(0,30rem)]">
        {/* Text：スマホは上から「キャッチコピー → 氏名」、PC は左下に氏名・右上に縦書きのキャッチコピー */}
        <div className="flex flex-col-reverse gap-6 lg:flex-row lg:justify-between lg:gap-8">
          <div className="lg:self-end">
            <p className="hero-in text-[0.9375rem] font-medium tracking-[0.16em] text-brand [animation-delay:0.3s]">{title}</p>
            <h1 className="hero-in [animation-delay:0.4s] mt-2 font-display text-[2.75rem] font-semibold leading-tight tracking-[0.1em] whitespace-nowrap text-ink md:text-[2.5rem] lg:text-[3.25rem] xl:text-6xl">
              {name}
            </h1>
            <p className="hero-in [animation-delay:0.5s] mt-1 text-[0.8125rem] leading-normal tracking-[0.3em] text-sub">{nameKana}</p>

            {subcopy && <p className="hero-in [animation-delay:0.6s] mt-3 text-base leading-normal text-ink md:mt-4">{subcopy}</p>}

            <a
              href={cta.href}
              className="hero-in [animation-delay:0.7s] arrow-link mt-4 inline-flex items-center gap-8 whitespace-nowrap bg-brand py-3 md:mt-5 md:py-3.5 pl-7 pr-6 text-[0.9375rem] tracking-[0.12em] text-white transition-colors hover:bg-ink"
            >
              {cta.label}
              <span className="arrow" aria-hidden="true">→</span>
            </a>
          </div>

          <p className="hero-catch font-display text-[min(1.5rem,5.7vw)] font-medium leading-[1.7] tracking-[0.06em] text-ink md:text-[1.25rem] lg:leading-[2] lg:tracking-[0.24em]" aria-label={catchcopy}>
            {/* 1文字ずつ順に現れる */}
            {Array.from(catchcopy).map((char, i) => (
              <span
                key={i}
                className="hero-char"
                style={{ animationDelay: `${0.5 + i * 0.07}s` }}
                aria-hidden="true"
              >
                {char}
              </span>
            ))}
          </p>
        </div>

        {/* Photo */}
        {photo && (
          <div className="hero-photo aspect-[4/5] w-full">
            <Image
              src={photo}
              alt={name}
              width={720}
              height={720}
              priority
              className="h-full w-full object-cover object-top"
            />
          </div>
        )}
      </div>
    </section>
  )
}

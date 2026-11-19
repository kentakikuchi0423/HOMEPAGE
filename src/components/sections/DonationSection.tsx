'use client'
import { siteConfig } from '@/content/site'
import { useInView } from '@/hooks/useInView'
import SectionHeading from '@/components/ui/SectionHeading'

export default function DonationSection() {
  const { url, label, description } = siteConfig.donation
  const { subcopy } = siteConfig.profile
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      ref={ref}
      id="donation"
      className={`relative overflow-hidden bg-brand px-6 py-16 md:py-20 reveal ${inView ? 'is-visible' : ''}`}
    >
      {/* 背景：サブコピーが大きな文字でゆっくり流れる */}
      {subcopy && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-2 select-none font-display text-[4.5rem] leading-none text-white/[0.07] md:text-[7rem]"
          aria-hidden="true"
        >
          <div className="ticker-track">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="pr-[1em]">
                {subcopy}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="relative mx-auto max-w-5xl md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12">
        <SectionHeading en="SUPPORT" light>ご支援のお願い</SectionHeading>

        <div>
          {description && <p className="whitespace-pre-line text-base text-white/90">{description}</p>}

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="arrow-link mt-9 inline-flex items-center gap-8 bg-white py-4 pl-8 pr-7 text-base font-bold tracking-[0.1em] text-brand transition-colors hover:bg-paper"
          >
            {label}
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

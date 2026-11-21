import { siteConfig } from '@/content/site'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import WaveEdge from '@/components/ui/WaveEdge'
import ExternalLink from '@/components/ui/ExternalLink'

export default function DonationSection() {
  const { url, label, description } = siteConfig.donation
  const { subcopy } = siteConfig.profile
  const heading = siteConfig.headings.donation

  return (
    <Reveal
      as="section"
      id="donation"
      threshold={0.12}
      className="reveal relative overflow-hidden bg-brand px-6 pb-16 pt-24 md:pb-20 md:pt-32"
    >
      {/* 前のセクション（白）との境目を波にする */}
      <WaveEdge edge="top" fillClassName="fill-white" />

      {/* 背景：サブコピーが大きな文字でゆっくり流れる */}
      {subcopy && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-2 select-none font-display text-[4.5rem] leading-none text-white/[0.07] md:text-[7rem]"
          aria-hidden="true"
        >
          <div className="ticker-track">
            {Array.from({ length: 4 }, (_, i) => (
              <span key={i} className="pr-[1em]">
                {subcopy}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="relative mx-auto max-w-5xl md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12">
        <SectionHeading en={heading.label} light>
          {heading.title}
        </SectionHeading>

        <div>
          {description && <p className="whitespace-pre-line text-base text-white/90">{description}</p>}

          <ExternalLink
            href={url}
            className="arrow-link mt-9 inline-flex items-center gap-8 bg-white py-4 pl-8 pr-7 text-base font-semibold tracking-[0.1em] text-brand transition-colors hover:bg-paper"
          >
            {label}
            <span className="arrow" aria-hidden="true">→</span>
          </ExternalLink>
        </div>
      </div>
    </Reveal>
  )
}

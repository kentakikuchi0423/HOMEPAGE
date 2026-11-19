'use client'
import { siteConfig } from '@/content/site'
import { useInView } from '@/hooks/useInView'
import SectionHeading from '@/components/ui/SectionHeading'

export default function DonationSection() {
  const { url, label, description } = siteConfig.donation
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      ref={ref}
      id="donation"
      className={`bg-ink px-5 py-16 sm:py-24 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading en="SUPPORT" light>ご支援のお願い</SectionHeading>

        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
          {description && (
            <p className="max-w-xl text-base leading-loose text-white/90 sm:text-lg">{description}</p>
          )}

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-3 rounded-md bg-marker px-9 py-4 font-display text-lg font-black text-ink transition-colors hover:bg-white"
          >
            {label}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

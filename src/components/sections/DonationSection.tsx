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
      className={`bg-brand px-6 py-20 md:py-28 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-5xl md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12">
        <SectionHeading en="SUPPORT" light>ご支援のお願い</SectionHeading>

        <div>
          {description && <p className="max-w-xl text-white/90">{description}</p>}

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="arrow-link mt-9 inline-flex items-center gap-8 bg-white py-4 pl-8 pr-7 text-[0.9375rem] font-bold tracking-[0.1em] text-brand transition-colors hover:bg-paper"
          >
            {label}
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

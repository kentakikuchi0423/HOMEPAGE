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
      className={`relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 px-4 py-24 text-center reveal ${inView ? 'is-visible' : ''}`}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        <SectionHeading light>ご支援のお願い</SectionHeading>

        {description && (
          <p className="mb-10 leading-relaxed text-blue-100">{description}</p>
        )}

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-white px-10 py-4 text-lg font-bold text-blue-700 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl"
        >
          {label}
        </a>
      </div>
    </section>
  )
}

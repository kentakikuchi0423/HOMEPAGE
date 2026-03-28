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
      className={`relative overflow-hidden bg-gradient-to-br from-pink-950 via-pink-800 to-rose-600 px-4 py-24 text-center reveal ${inView ? 'is-visible' : ''}`}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-900/40 via-transparent to-pink-500/20 animate-bg-shift" />

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-blob absolute -right-16 -top-16 h-80 w-80 rounded-full bg-pink-400/10 blur-3xl" />
        <div className="hero-blob-offset absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-fuchsia-400/10 blur-3xl" />
        <div className="hero-blob-slow absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-300/10 blur-3xl" />
      </div>

      {/* Sparkles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[20%] h-1.5 w-1.5 rounded-full bg-white" style={{ animation: 'sparkle 3s ease-in-out infinite' }} />
        <div className="absolute right-[20%] top-[30%] h-1 w-1 rounded-full bg-pink-200" style={{ animation: 'sparkle 4s ease-in-out 1s infinite' }} />
        <div className="absolute bottom-[25%] left-[30%] h-2 w-2 rounded-full bg-white" style={{ animation: 'sparkle 3.5s ease-in-out 2s infinite' }} />
        <div className="absolute bottom-[35%] right-[15%] h-1.5 w-1.5 rounded-full bg-pink-100" style={{ animation: 'sparkle 2.5s ease-in-out 0.5s infinite' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        <SectionHeading en="SUPPORT" light>ご支援のお願い</SectionHeading>

        {description && (
          <p className="mb-10 text-lg leading-relaxed text-pink-100">{description}</p>
        )}

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-cta pulse-glow inline-block rounded-full bg-gradient-to-r from-white to-pink-50 px-12 py-5 text-xl font-black text-pink-700 shadow-2xl shadow-pink-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-pink-400/50"
        >
          {label}
        </a>
      </div>
    </section>
  )
}

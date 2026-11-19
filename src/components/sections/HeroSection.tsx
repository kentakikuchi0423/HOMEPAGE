import Image from 'next/image'
import { siteConfig } from '@/content/site'

export default function HeroSection() {
  const { name, nameKana, title, catchcopy, subcopy, photo } = siteConfig.profile
  const { cta } = siteConfig.hero

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700 px-4 pb-28 pt-16 lg:pb-36 lg:pt-24"
    >
      {/* Decorative blobs — kept subtle */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-blob absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="hero-blob-offset absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-300/8 blur-3xl" />
        <div className="hero-blob-slow absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-300/6 blur-3xl" />
        {/* Center glow pulse */}
        <div className="hero-glow-pulse absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center gap-8 md:flex-row-reverse md:justify-between md:gap-12">
        {/* Photo */}
        {photo && (
          <div className="hero-animate relative shrink-0">
            <div className="absolute -inset-3 rounded-full bg-sky-300/20 blur-xl" aria-hidden="true" />
            <Image
              src={photo}
              alt={name}
              width={352}
              height={352}
              priority
              className="relative h-44 w-44 rounded-full object-cover shadow-2xl ring-4 ring-white/80 sm:h-56 sm:w-56 md:h-72 md:w-72 lg:h-88 lg:w-88"
            />
          </div>
        )}

        {/* Text */}
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
          {/* Title badge */}
          <p className="hero-animate rounded-full border border-white/25 bg-white/10 px-5 py-1.5 text-xs font-medium tracking-[0.15em] text-blue-100 backdrop-blur-sm">
            {title}
          </p>

          {/* Name — main visual element */}
          <div className="hero-animate hero-delay-1 flex flex-col items-center gap-1 md:items-start">
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              {name}
            </h1>
            <p className="text-sm font-medium tracking-[0.25em] text-blue-200 sm:text-base">
              {nameKana}
            </p>
          </div>

          {/* Catchcopy + subcopy */}
          <div className="hero-animate hero-delay-2 flex flex-col gap-2">
            <p className="text-xl font-bold leading-relaxed text-white sm:text-2xl">
              {catchcopy}
            </p>
            {subcopy && (
              <p className="text-base leading-relaxed text-blue-100 sm:text-lg">{subcopy}</p>
            )}
          </div>

          {/* CTA */}
          <a
            href={cta.href}
            className="hero-cta hero-animate hero-delay-3 mt-1 rounded-full bg-white px-8 py-3 font-semibold text-blue-800 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl"
          >
            {cta.label}
          </a>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
          className="h-14 w-full sm:h-20"
          fill="white"
          aria-hidden="true"
        >
          <path d="M0,36 C400,72 1040,0 1440,36 L1440,72 L0,72 Z" />
        </svg>
      </div>
    </section>
  )
}

import { siteConfig } from '@/content/site'

export default function HeroSection() {
  const { name, nameKana, title, catchcopy } = siteConfig.profile
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-950 via-blue-800 to-blue-700 px-4 py-28 text-center lg:py-36"
    >
      {/* Decorative blobs — kept subtle */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-blob absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="hero-blob-offset absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-300/8 blur-3xl" />
        <div className="hero-blob-slow absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-300/6 blur-3xl" />
        {/* Center glow pulse */}
        <div className="hero-glow-pulse absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-7">
        {/* Title badge */}
        <p className="hero-animate rounded-full border border-white/20 bg-white/8 px-5 py-1.5 text-xs font-medium tracking-[0.15em] text-blue-200 backdrop-blur-sm">
          {title}
        </p>

        {/* Name — main visual element */}
        <div className="hero-animate hero-delay-1 flex flex-col items-center gap-1">
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-white transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(56,189,248,0.5)] sm:text-6xl md:text-7xl">
            {name}
          </h1>
          <p className="text-sm font-medium tracking-[0.25em] text-blue-300 sm:text-base">
            {nameKana}
          </p>
        </div>

        {/* Catchcopy */}
        <p className="hero-animate hero-delay-2 max-w-lg text-lg leading-relaxed text-blue-100 sm:text-xl">
          {catchcopy}
        </p>

        {/* CTA */}
        <a
          href="#profile"
          className="hero-cta hero-animate hero-delay-3 mt-1 rounded-full bg-white px-8 py-3 font-semibold text-blue-800 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl"
        >
          プロフィールを見る
        </a>
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

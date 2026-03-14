import { siteConfig } from '@/content/site'

export default function HeroSection() {
  const { name, catchcopy, subcopy } = siteConfig.profile
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 px-4 text-center"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-300/15 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Name badge */}
        <p className="hero-animate rounded-full border border-white/30 bg-white/10 px-5 py-1.5 text-sm font-medium tracking-widest text-blue-100 backdrop-blur-sm">
          {name}
        </p>

        {/* Main catchcopy */}
        <h1 className="hero-animate hero-delay-1 max-w-2xl text-4xl font-bold leading-snug tracking-wide text-white sm:text-5xl md:text-6xl">
          {catchcopy}
        </h1>

        {/* Subcopy */}
        <p className="hero-animate hero-delay-2 max-w-lg text-lg leading-relaxed text-blue-100 sm:text-xl">
          {subcopy}
        </p>

        {/* CTA button */}
        <a
          href="#profile"
          className="hero-animate hero-delay-3 mt-2 rounded-full bg-white px-8 py-3 font-semibold text-blue-700 shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl"
        >
          詳しくはこちら
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

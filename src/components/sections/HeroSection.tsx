import { siteConfig } from '@/content/site'

export default function HeroSection() {
  const { name, nameKana, title, catchcopy } = siteConfig.profile
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-950 via-pink-800 to-rose-600 px-4 py-28 text-center lg:py-36"
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-900/50 via-transparent to-pink-500/30 animate-bg-shift" />

      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-blob absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-pink-400/20 blur-3xl" />
        <div className="hero-blob-offset absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-fuchsia-400/15 blur-3xl" />
        <div className="hero-blob-slow absolute left-1/2 top-1/3 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-rose-300/10 blur-3xl" />
        <div className="hero-blob absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-pink-300/10 blur-3xl" />
        <div className="hero-glow-pulse absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>

      {/* Sparkle dots */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[15%] h-1.5 w-1.5 rounded-full bg-white" style={{ animation: 'sparkle 3s ease-in-out infinite' }} />
        <div className="absolute right-[15%] top-[25%] h-2 w-2 rounded-full bg-pink-200" style={{ animation: 'sparkle 4s ease-in-out 1s infinite' }} />
        <div className="absolute left-[20%] top-[60%] h-1 w-1 rounded-full bg-white" style={{ animation: 'sparkle 3.5s ease-in-out 2s infinite' }} />
        <div className="absolute bottom-[30%] right-[25%] h-1.5 w-1.5 rounded-full bg-pink-100" style={{ animation: 'sparkle 2.5s ease-in-out 0.5s infinite' }} />
        <div className="absolute left-[80%] top-[40%] h-1 w-1 rounded-full bg-white" style={{ animation: 'sparkle 4s ease-in-out 3s infinite' }} />
        <div className="absolute right-[10%] top-[70%] h-2 w-2 rounded-full bg-pink-200" style={{ animation: 'sparkle 3s ease-in-out 1.5s infinite' }} />
        <div className="absolute left-[50%] top-[20%] h-1.5 w-1.5 rounded-full bg-white" style={{ animation: 'sparkle 5s ease-in-out 2.5s infinite' }} />
        <div className="absolute bottom-[20%] left-[40%] h-1 w-1 rounded-full bg-pink-100" style={{ animation: 'sparkle 3.5s ease-in-out 4s infinite' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-7">
        {/* Title badge */}
        <p className="hero-animate rounded-full border border-white/30 bg-white/10 px-6 py-2 text-xs font-medium tracking-[0.2em] text-pink-200 shadow-lg shadow-pink-500/20 backdrop-blur-md">
          {title}
        </p>

        {/* Name — animated gradient text */}
        <div className="hero-animate hero-delay-1 flex flex-col items-center gap-2">
          <h1 className="gradient-text text-5xl font-black leading-tight tracking-tight drop-shadow-2xl sm:text-6xl md:text-7xl lg:text-8xl">
            {name}
          </h1>
          <p className="text-sm font-medium tracking-[0.3em] text-pink-200 sm:text-base">
            {nameKana}
          </p>
        </div>

        {/* Catchcopy */}
        <p className="hero-animate hero-delay-2 max-w-lg text-xl font-medium leading-relaxed text-pink-100 drop-shadow-lg sm:text-2xl">
          {catchcopy}
        </p>

        {/* CTA */}
        <a
          href="#profile"
          className="hero-cta hero-animate hero-delay-3 pulse-glow mt-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 px-10 py-4 text-lg font-bold text-white shadow-2xl shadow-pink-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-pink-400/50"
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

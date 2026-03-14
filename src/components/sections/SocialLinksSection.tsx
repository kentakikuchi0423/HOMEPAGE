'use client'
import { siteConfig } from '@/content/site'
import { useInView } from '@/hooks/useInView'
import SectionHeading from '@/components/ui/SectionHeading'

const platformConfig: Record<string, { label: string; className: string }> = {
  X: {
    label: 'X (Twitter)',
    className: 'bg-gray-900 text-white hover:bg-gray-700',
  },
  Facebook: {
    label: 'Facebook',
    className: 'bg-blue-700 text-white hover:bg-blue-600',
  },
  Instagram: {
    label: 'Instagram',
    className: 'bg-pink-600 text-white hover:bg-pink-500',
  },
  YouTube: {
    label: 'YouTube',
    className: 'bg-red-600 text-white hover:bg-red-500',
  },
  LINE: {
    label: 'LINE',
    className: 'bg-green-500 text-white hover:bg-green-400',
  },
  選挙ドットコム: {
    label: '選挙ドットコム',
    className: 'bg-blue-900 text-white hover:bg-blue-800',
  },
}

export default function SocialLinksSection() {
  const sorted = [...siteConfig.sns].sort((a, b) => a.order - b.order)
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      ref={ref}
      id="social"
      className={`bg-white px-4 py-20 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-2xl">
        <SectionHeading>SNS・リンク</SectionHeading>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {sorted.map(({ platform, url }, i) => {
            const config = platformConfig[platform] ?? {
              label: platform,
              className: 'bg-gray-600 text-white hover:bg-gray-500',
            }
            return (
              <li
                key={platform}
                className={`reveal ${inView ? 'is-visible' : ''} reveal-delay-${Math.min(i + 1, 4)}`}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex w-full items-center justify-center rounded-xl px-4 py-3.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${config.className}`}
                >
                  {config.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

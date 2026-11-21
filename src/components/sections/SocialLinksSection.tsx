import { siteConfig } from '@/content/site'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import ExternalLink from '@/components/ui/ExternalLink'

export default function SocialLinksSection() {
  const links = [...siteConfig.sns].sort((a, b) => a.order - b.order)
  const heading = siteConfig.headings.social

  return (
    <Reveal as="section" id="social" threshold={0.12} className="reveal bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-5xl md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12">
        <SectionHeading en={heading.label}>{heading.title}</SectionHeading>

        <ul className="grid grid-cols-2 border-l border-t border-line lg:grid-cols-3">
          {links.map(({ label, url, iconImage }) => (
            <li key={url} className="reveal-child h-full min-w-0">
              <ExternalLink
                href={url}
                className="focus-inset-brand flex h-full w-full min-w-0 items-center gap-2 whitespace-nowrap border-b border-r border-line bg-white px-2 py-5 text-[clamp(13px,3.6vw,0.9375rem)] leading-snug tracking-normal text-ink transition-colors hover:bg-paper min-[400px]:gap-3 min-[400px]:px-4 min-[400px]:tracking-[0.03em] sm:px-5"
              >
                {/* 各サービスの公式アイコン（配色ルールの例外。CLAUDE.md 参照）。画像がない場合は頭文字を表示 */}
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center text-[0.8125rem] font-semibold text-brand sm:h-7 sm:w-7"
                  aria-hidden="true"
                >
                  {iconImage ? (
                    // eslint-disable-next-line @next/next/no-img-element -- 静的書き出しのため画像最適化は使わない
                    <img
                      src={iconImage}
                      alt=""
                      width={96}
                      height={96}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    label.charAt(0)
                  )}
                </span>
                {label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

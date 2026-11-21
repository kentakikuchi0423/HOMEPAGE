import { siteConfig } from '@/content/site'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'

export default function PolicySection() {
  const heading = siteConfig.headings.policy

  return (
    <Reveal as="section" id="policy" threshold={0.12} className="reveal bg-paper px-6 py-16 md:py-20">
      <div className="mx-auto max-w-5xl md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12">
        <SectionHeading en={heading.label}>{heading.title}</SectionHeading>

        <ol className="border-t border-brand/25">
          {siteConfig.policies.map((policy, i) => (
            <Reveal
              as="li"
              key={policy.title}
              threshold={0.4}
              className="reveal row-line grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 py-8 sm:grid-cols-[4rem_minmax(0,1fr)]"
            >
              <span className="font-display text-xl leading-[1.75] text-brand" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-[1.1875rem] font-semibold leading-[1.8] tracking-[0.06em] text-ink">
                  {policy.title}
                </h3>
                <p className="mt-2 text-base text-sub">{policy.description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Reveal>
  )
}

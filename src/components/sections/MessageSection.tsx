'use client'
import Image from 'next/image'
import { siteConfig } from '@/content/site'
import { useInView } from '@/hooks/useInView'
import SectionHeading from '@/components/ui/SectionHeading'

export default function MessageSection() {
  const { title, paragraphs, signatureTitle, signatureName, photo, photoAlt } = siteConfig.message
  const { ref, inView } = useInView<HTMLElement>(0.05)

  return (
    <section
      ref={ref}
      id="message"
      className={`bg-paper px-6 py-20 md:py-32 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto grid max-w-5xl gap-x-16 gap-y-12 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
        {photo && (
          <Image
            src={photo}
            alt={photoAlt ?? ''}
            width={1100}
            height={1337}
            className="h-auto w-full self-start"
          />
        )}

        <div>
          <SectionHeading en="MESSAGE">{title}</SectionHeading>

          <div className="space-y-5 font-display text-[1.0625rem] font-medium leading-[2] tracking-[0.04em] md:mt-10">
            {paragraphs.map((p, i) =>
              p.emphasis ? (
                <p
                  key={i}
                  className="py-2 text-balance [word-break:auto-phrase] text-[1.375rem] font-medium leading-[1.75] tracking-[0.1em] text-brand md:text-2xl md:leading-[1.75]"
                >
                  {p.text}
                </p>
              ) : (
                <p key={i}>{p.text}</p>
              ),
            )}
          </div>

          <p className="mt-10 flex items-baseline justify-end gap-5">
            <span className="text-base tracking-[0.1em] text-ink">{signatureTitle}</span>
            <span className="font-signature text-[2rem] leading-none tracking-[0.12em] text-ink">
              {signatureName}
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}

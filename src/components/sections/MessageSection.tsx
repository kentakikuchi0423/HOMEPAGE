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
        {/* 写真：PC ではスクロールに追従させる */}
        {photo && (
          <div className="md:sticky md:top-24 md:self-start">
            <Image
              src={photo}
              alt={photoAlt ?? ''}
              width={700}
              height={840}
              className="aspect-[5/6] w-full object-cover"
            />
          </div>
        )}

        <div>
          <SectionHeading en="MESSAGE">{title}</SectionHeading>

          <div className="space-y-5 text-base leading-[1.9] md:mt-10">
            {paragraphs.map((p, i) =>
              p.emphasis ? (
                <p
                  key={i}
                  className="py-2 font-display text-balance [word-break:auto-phrase] text-[1.375rem] font-medium leading-[1.75] tracking-[0.1em] text-brand md:text-2xl md:leading-[1.75]"
                >
                  {p.text}
                </p>
              ) : (
                <p key={i}>{p.text}</p>
              ),
            )}
          </div>

          <p className="mt-10 flex items-baseline justify-end gap-5">
            <span className="text-[0.9375rem] tracking-[0.16em] text-sub">{signatureTitle}</span>
            <span className="font-signature text-[2rem] leading-none tracking-[0.12em] text-ink">
              {signatureName}
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}

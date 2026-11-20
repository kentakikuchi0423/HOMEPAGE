'use client'
import Image from 'next/image'
import { siteConfig } from '@/content/site'
import { useInView } from '@/hooks/useInView'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'

export default function MessageSection() {
  const { title, label, paragraphs, signatureTitle, signatureName, signatureImage, photo, photoAlt } =
    siteConfig.message
  const { ref, inView } = useInView<HTMLElement>(0.05)

  return (
    <section
      ref={ref}
      id="message"
      className={`bg-paper px-6 py-16 md:py-20 reveal ${inView ? 'is-visible' : ''}`}
    >
      {/* 並び順：スマホは「見出し → 写真 → 本文」。PC は左列に写真、右列に見出しと本文 */}
      <div className="mx-auto grid max-w-5xl md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-x-16 md:gap-y-10">
        <div className="md:col-start-2 md:row-start-1">
          <SectionHeading en={label}>{title}</SectionHeading>
        </div>

        {photo && (
          <Reveal className="curtain mb-10 self-start md:col-start-1 md:row-span-2 md:row-start-1 md:mb-0">
            <Image
              src={photo}
              alt={photoAlt ?? ''}
              width={1100}
              height={1337}
              className="h-auto w-full"
            />
          </Reveal>
        )}

        <div className="md:col-start-2 md:row-start-2">
          <div className="space-y-5 font-display text-[1.0625rem] font-medium leading-[2] tracking-[0.04em]">
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

          {/* 肩書きと署名は常に 1 行に並べる。狭い画面では文字と署名を画面幅に合わせて少し小さくする */}
          <p className="mt-10 flex items-end justify-end gap-x-2.5 lg:gap-x-5">
            <span className="shrink-0 whitespace-nowrap pb-[0.4em] text-[clamp(0.8125rem,3.6vw,1rem)] tracking-[0.1em] text-ink md:text-[clamp(0.8125rem,1.6vw,1rem)]">
              {signatureTitle}
            </span>
            {signatureImage ? (
              <Image
                src={signatureImage}
                alt={signatureName}
                width={900}
                height={260}
                className="h-[min(3.5rem,13.5vw)] w-auto min-w-0 shrink object-contain object-right md:h-[min(4rem,5.6vw)] lg:h-16"
              />
            ) : (
              <span className="font-display text-[2rem] leading-none tracking-[0.12em] text-ink">
                {signatureName}
              </span>
            )}
          </p>
        </div>
      </div>
    </section>
  )
}

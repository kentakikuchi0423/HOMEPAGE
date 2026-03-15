'use client'
import { siteConfig } from '@/content/site'
import { useInView } from '@/hooks/useInView'
import SectionHeading from '@/components/ui/SectionHeading'

export default function PolicySection() {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      ref={ref}
      id="policy"
      className={`bg-blue-50 px-4 py-20 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading en="POLICY">政策</SectionHeading>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {siteConfig.policies.map((policy, i) => (
            <li
              key={policy.title}
              className={`reveal ${inView ? 'is-visible' : ''} reveal-delay-${Math.min(i + 1, 5)}`}
            >
              <div className="group flex h-full flex-col gap-3 rounded-2xl border border-blue-100 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:bg-blue-50/30">
                <span className="text-xs font-bold tracking-widest text-blue-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-bold leading-tight text-blue-950">{policy.title}</h3>
                <div className="h-px w-8 bg-blue-200 transition-all duration-300 group-hover:w-12" />
                <p className="text-sm leading-relaxed text-gray-600">{policy.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

'use client'
import { siteConfig } from '@/content/site'
import { useInView } from '@/hooks/useInView'
import SectionHeading from '@/components/ui/SectionHeading'

const iconMap: Record<string, string> = {
  AcademicCapIcon: '🎓',
  BuildingOfficeIcon: '🏢',
  HeartIcon: '❤️',
  LeafIcon: '🌿',
}

const fallbackIcon = '📌'

export default function PolicySection() {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      ref={ref}
      id="policy"
      className={`bg-blue-50 px-4 py-20 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading en="POLICY">政策</SectionHeading>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.policies.map((policy, i) => (
            <li
              key={policy.title}
              className={`reveal ${inView ? 'is-visible' : ''} reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <div className="group flex h-full flex-col rounded-2xl border border-blue-50 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-md">
                {/* Icon circle */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/60 text-2xl transition-colors group-hover:bg-blue-100">
                  {policy.iconImage ? (
                    <img src={policy.iconImage} alt={policy.title} className="h-6 w-6 object-contain" />
                  ) : (
                    iconMap[policy.icon] ?? fallbackIcon
                  )}
                </div>
                <h3 className="mb-2 font-semibold text-blue-950">{policy.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {policy.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

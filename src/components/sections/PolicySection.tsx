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
        <SectionHeading>政策</SectionHeading>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.policies.map((policy, i) => (
            <li
              key={policy.title}
              className={`reveal ${inView ? 'is-visible' : ''} reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <div className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-t-4 hover:border-blue-500 hover:shadow-md">
                {/* Icon circle */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-2xl transition-colors group-hover:bg-blue-100">
                  {iconMap[policy.icon] ?? fallbackIcon}
                </div>
                <h3 className="mb-2 font-bold text-gray-900">{policy.title}</h3>
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

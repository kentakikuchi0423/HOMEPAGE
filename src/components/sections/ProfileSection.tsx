'use client'
import { siteConfig } from '@/content/site'
import { useInView } from '@/hooks/useInView'
import SectionHeading from '@/components/ui/SectionHeading'

export default function ProfileSection() {
  const { name, nameKana, title, bio, photo } = siteConfig.profile
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      ref={ref}
      id="profile"
      className={`bg-white px-4 py-20 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading en="PROFILE">プロフィール</SectionHeading>

        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
          {/* Photo */}
          <div className="shrink-0">
            {photo ? (
              <img
                src={photo}
                alt={name}
                width={200}
                height={200}
                className="h-48 w-48 rounded-full object-cover shadow-lg ring-4 ring-blue-100"
              />
            ) : (
              <div className="flex h-48 w-48 items-center justify-center rounded-full bg-blue-50 shadow-lg ring-4 ring-blue-100">
                <span className="text-5xl font-bold text-blue-400">
                  {name.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            <div>
              <p className="text-3xl font-bold tracking-tight text-gray-900">{name}</p>
              <p className="mt-1 text-xs font-medium tracking-widest text-blue-400 uppercase">{nameKana}</p>
            </div>
            <span className="mx-auto inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 md:mx-0">
              {title}
            </span>
            <p className="leading-8 text-gray-700">{bio}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

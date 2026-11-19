'use client'
import { useInView } from '@/hooks/useInView'
import SectionHeading from '@/components/ui/SectionHeading'
import ProfileCard from '@/components/sections/ProfileCard'
import QualificationsCard from '@/components/sections/QualificationsCard'
import HobbiesCard from '@/components/sections/HobbiesCard'

export default function ProfileSection() {
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      ref={ref}
      id="profile"
      className={`bg-white px-6 py-20 md:py-32 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-5xl md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12">
        <SectionHeading en="PROFILE">プロフィール</SectionHeading>

        <div>
          <ProfileCard />
          <QualificationsCard />
          <HobbiesCard />
        </div>
      </div>
    </section>
  )
}

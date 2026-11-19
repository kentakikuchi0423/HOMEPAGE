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
      className={`bg-white px-5 py-16 sm:py-24 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading en="PROFILE">プロフィール</SectionHeading>

        <div className="grid grid-cols-1 gap-x-14 gap-y-10 md:grid-cols-[1.2fr_1fr]">
          {/* 左: 経歴 */}
          <ProfileCard />

          {/* 右: 資格・趣味 */}
          <div className="flex flex-col gap-9">
            <QualificationsCard />
            <HobbiesCard />
          </div>
        </div>
      </div>
    </section>
  )
}

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
      className={`bg-white px-4 py-20 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading en="PROFILE">プロフィール</SectionHeading>

        {/* 上段: プロフィール本体 */}
        <ProfileCard />

        {/* 下段: 資格・趣味（デスクトップ2カラム / モバイル縦積み） */}
        <div
          className={`mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 transition-opacity duration-500 ${
            inView ? 'opacity-100 delay-150' : 'opacity-0'
          }`}
        >
          <QualificationsCard />
          <HobbiesCard />
        </div>
      </div>
    </section>
  )
}

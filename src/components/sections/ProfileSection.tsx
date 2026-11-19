'use client'
import Image from 'next/image'
import { siteConfig } from '@/content/site'
import { useInView } from '@/hooks/useInView'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import ProfileCard from '@/components/sections/ProfileCard'
import QualificationsCard from '@/components/sections/QualificationsCard'
import HobbiesCard from '@/components/sections/HobbiesCard'

export default function ProfileSection() {
  const { snapshot, snapshotAlt } = siteConfig.profile
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <section
      ref={ref}
      id="profile"
      className={`bg-white px-6 py-16 md:py-20 reveal ${inView ? 'is-visible' : ''}`}
    >
      <div className="mx-auto max-w-5xl md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12">
        <SectionHeading en="PROFILE">プロフィール</SectionHeading>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <div>
            <ProfileCard />
            <HobbiesCard />
            <QualificationsCard />
          </div>

          {snapshot && (
            <Reveal className="curtain w-full max-w-[16rem] self-start lg:max-w-none">
              <Image
                src={snapshot}
                alt={snapshotAlt ?? ''}
                width={574}
                height={925}
                className="h-auto w-full"
              />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

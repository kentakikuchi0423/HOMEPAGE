import Image from 'next/image'
import { siteConfig } from '@/content/site'
import SectionHeading from '@/components/ui/SectionHeading'
import Reveal from '@/components/ui/Reveal'
import FeatureList from '@/components/ui/FeatureList'

export default function ProfileSection() {
  const { bio, hobbies, hobbiesTitle, qualifications, qualificationsTitle, snapshot, snapshotAlt } =
    siteConfig.profile
  const heading = siteConfig.headings.profile

  return (
    <Reveal as="section" id="profile" threshold={0.12} className="reveal bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-5xl md:grid md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12">
        <SectionHeading en={heading.label}>{heading.title}</SectionHeading>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <div>
            <ul className="space-y-3 pb-7 text-base">
              {bio.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <FeatureList title={hobbiesTitle} items={hobbies} />
            <FeatureList title={qualificationsTitle} items={qualifications} />
          </div>

          {snapshot && (
            <Reveal className="curtain w-full max-w-[16rem] self-start lg:max-w-none">
              <Image src={snapshot} alt={snapshotAlt ?? ''} width={574} height={925} className="h-auto w-full" />
            </Reveal>
          )}
        </div>
      </div>
    </Reveal>
  )
}

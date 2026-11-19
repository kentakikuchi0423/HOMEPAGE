import HeroSection from '@/components/sections/HeroSection'
import MessageSection from '@/components/sections/MessageSection'
import ProfileSection from '@/components/sections/ProfileSection'
import PolicySection from '@/components/sections/PolicySection'
import VideoSection from '@/components/sections/VideoSection'
import ActivitySection from '@/components/sections/ActivitySection'
import SocialLinksSection from '@/components/sections/SocialLinksSection'
import DonationSection from '@/components/sections/DonationSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <MessageSection />
      <ProfileSection />
      <PolicySection />
      <VideoSection />
      <ActivitySection />
      <SocialLinksSection />
      <DonationSection />
    </>
  )
}

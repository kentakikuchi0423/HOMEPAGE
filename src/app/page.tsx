import HeroSection from '@/components/sections/HeroSection'
import ProfileSection from '@/components/sections/ProfileSection'
import PolicySection from '@/components/sections/PolicySection'
import VideoSection from '@/components/sections/VideoSection'
import ActivitySection from '@/components/sections/ActivitySection'
import SocialLinksSection from '@/components/sections/SocialLinksSection'
import DonationSection from '@/components/sections/DonationSection'
import { siteConfig } from '@/content/site'
import { fetchRssItems } from '@/lib/rss'

export default async function Home() {
  const cfg = siteConfig.activity.rss
  const rssItems = cfg
    ? await fetchRssItems(cfg.url, cfg.limit ?? 5, cfg.baseUrl)
    : []

  return (
    <>
      <HeroSection />
      <ProfileSection />
      <PolicySection />
      <VideoSection />
      <ActivitySection rssItems={rssItems} />
      <SocialLinksSection />
      <DonationSection />
    </>
  )
}

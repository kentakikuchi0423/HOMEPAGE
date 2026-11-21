import type { Metadata } from 'next'
import { siteConfig } from '@/content/site'
import JsonLd from '@/components/JsonLd'
import HeroSection from '@/components/sections/HeroSection'
import MessageSection from '@/components/sections/MessageSection'
import ProfileSection from '@/components/sections/ProfileSection'
import PolicySection from '@/components/sections/PolicySection'
import VideoSection from '@/components/sections/VideoSection'
import ActivitySection from '@/components/sections/ActivitySection'
import SocialLinksSection from '@/components/sections/SocialLinksSection'
import DonationSection from '@/components/sections/DonationSection'

const { meta } = siteConfig
const ogImage = { url: meta.ogImage, width: 1200, height: 630, alt: meta.ogImageAlt }

// トップページ固有のメタデータ（存在しないページには付けない）
export const metadata: Metadata = {
  alternates: { canonical: meta.url },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.url,
    siteName: meta.siteName,
    images: [ogImage],
    locale: 'ja_JP',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: [ogImage],
  },
}

export default function Home() {
  return (
    <>
      <JsonLd />
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

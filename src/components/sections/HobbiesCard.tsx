import { siteConfig } from '@/content/site'
import FeatureCard from '@/components/ui/FeatureCard'

const icon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M16.24 7.76l2.12-2.12M5.64 18.36l2.12-2.12"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

export default function HobbiesCard() {
  const { hobbies } = siteConfig.profile
  if (!hobbies || hobbies.length === 0) return null
  return <FeatureCard icon={icon} title="趣味・特技" items={hobbies} />
}

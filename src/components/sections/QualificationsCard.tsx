import { siteConfig } from '@/content/site'
import FeatureCard from '@/components/ui/FeatureCard'

const icon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6"/>
    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>
  </svg>
)

export default function QualificationsCard() {
  const { qualifications } = siteConfig.profile
  if (!qualifications || qualifications.length === 0) return null
  return <FeatureCard icon={icon} title="資格・試験" items={qualifications} />
}

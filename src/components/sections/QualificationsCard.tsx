import { siteConfig } from '@/content/site'
import FeatureCard from '@/components/ui/FeatureCard'

export default function QualificationsCard() {
  const { qualifications, qualificationsTitle } = siteConfig.profile
  if (!qualifications || qualifications.length === 0) return null
  return <FeatureCard title={qualificationsTitle} items={qualifications} />
}

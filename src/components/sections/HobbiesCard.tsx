import { siteConfig } from '@/content/site'
import FeatureCard from '@/components/ui/FeatureCard'

export default function HobbiesCard() {
  const { hobbies, hobbiesTitle } = siteConfig.profile
  if (!hobbies || hobbies.length === 0) return null
  return <FeatureCard title={hobbiesTitle} items={hobbies} />
}

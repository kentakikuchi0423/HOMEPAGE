import { siteConfig } from '@/content/site'
import FeatureCard from '@/components/ui/FeatureCard'

export default function HobbiesCard() {
  const { hobbies } = siteConfig.profile
  if (!hobbies || hobbies.length === 0) return null
  return <FeatureCard title="趣味・特技" items={hobbies} />
}

import { siteConfig } from '@/content/site'

export default function ProfileSection() {
  const { name, nameKana, title, bio, photo } = siteConfig.profile
  return (
    <section id="profile" className="px-4 py-16">
      <h2>プロフィール</h2>
      <img src={photo} alt={name} width={160} height={160} />
      <p>{name}（{nameKana}）</p>
      <p>{title}</p>
      <p>{bio}</p>
    </section>
  )
}

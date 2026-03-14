export type SiteConfig = {
  name: string
  slogan: string
  description: string
  meta: {
    title: string
    description: string
  }
  socialLinks: {
    x: string
    facebook: string
    instagram: string
    youtube: string
    senkyo: string
  }
}

export const siteConfig: SiteConfig = {
  name: '山田 太郎',
  slogan: '未来をひらく、あなたとともに。',
  description: '山田太郎の政治活動プロフィールサイトです。',
  meta: {
    title: '山田太郎 公式サイト',
    description: '山田太郎の政治活動プロフィールサイトです。',
  },
  socialLinks: {
    x: '#',
    facebook: '#',
    instagram: '#',
    youtube: '#',
    senkyo: '#',
  },
}

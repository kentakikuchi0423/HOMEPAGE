import { siteConfig } from '@/content/site'

/**
 * 検索エンジン向けの構造化データ（schema.org）。
 * サイト（WebSite）・このページ（ProfilePage）・本人（Person）の 3 つを関連づけて出力する。
 * 内容はすべて site.ts の情報から組み立てる。
 */
export default function JsonLd() {
  const { meta, profile, sns } = siteConfig
  const { person } = meta
  const baseUrl = meta.url.replace(/\/$/, '')
  const websiteId = `${baseUrl}/#website`
  const pageId = `${baseUrl}/#profilepage`
  const personId = `${baseUrl}/#person`
  const photoUrl = `${baseUrl}${profile.photo}`

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: meta.url,
        name: meta.siteName,
        ...(meta.siteNameAlt && meta.siteNameAlt.length > 0 ? { alternateName: meta.siteNameAlt } : {}),
        description: meta.description,
        inLanguage: 'ja',
        about: { '@id': personId },
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': pageId,
        url: meta.url,
        name: meta.title,
        description: meta.description,
        inLanguage: 'ja',
        isPartOf: { '@id': websiteId },
        about: { '@id': personId },
        mainEntity: { '@id': personId },
        primaryImageOfPage: { '@type': 'ImageObject', url: photoUrl },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: person.name,
        alternateName: person.alternateNames,
        description: person.description,
        url: meta.url,
        image: photoUrl,
        jobTitle: person.jobTitle,
        homeLocation: { '@type': 'Place', name: person.homeLocation },
        mainEntityOfPage: { '@id': pageId },
        // 本人のプロフィールページだけを挙げる（友だち追加用の URL などは除く）
        sameAs: sns.filter((link) => link.isProfile !== false).map((link) => link.url),
      },
    ],
  }

  // 「<」を文字コード表記にして、内容に </script> が含まれても script 要素が途中で閉じないようにする
  const json = JSON.stringify(schema).replace(/</g, '\\u003c')

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}

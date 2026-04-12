import { siteConfig } from "@/content/site";

export default function JsonLd() {
  const baseUrl = siteConfig.meta.url.replace(/\/$/, "");
  const websiteId = `${baseUrl}/#website`;
  const profilePageId = `${baseUrl}/#profilepage`;
  const personId = `${baseUrl}/#person`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteConfig.meta.url,
        name: siteConfig.meta.siteName,
        ...(siteConfig.meta.siteNameAlt && siteConfig.meta.siteNameAlt.length > 0
          ? { alternateName: siteConfig.meta.siteNameAlt }
          : {}),
        inLanguage: "ja",
        about: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: siteConfig.meta.url,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: "菊地謙太",
        alternateName: [
          "菊地けんた",
          "きくちけんた",
          "キクチケンタ",
          "Kenta Kikuchi",
        ],
        url: siteConfig.meta.url,
        image: `${baseUrl}${siteConfig.profile.photo}`,
        jobTitle: "大洲市議会議員",
        homeLocation: {
          "@type": "Place",
          name: "愛媛県大洲市",
        },
        sameAs: siteConfig.sns.map((s) => s.url),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

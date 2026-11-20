import { siteConfig } from "@/content/site";

export default function JsonLd() {
  const { person } = siteConfig.meta;
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
        name: person.name,
        alternateName: person.alternateNames,
        url: siteConfig.meta.url,
        image: `${baseUrl}${siteConfig.profile.photo}`,
        jobTitle: person.jobTitle,
        homeLocation: {
          "@type": "Place",
          name: person.homeLocation,
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

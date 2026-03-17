import { siteConfig } from "@/content/site";

export default function JsonLd() {
  const baseUrl = siteConfig.meta.url.replace(/\/$/, "");

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: siteConfig.meta.url,
    mainEntity: {
      "@type": "Person",
      name: "菊地謙太",
      alternateName: ["菊地けんた", "きくちけんた", "Kenta Kikuchi"],
      url: siteConfig.meta.url,
      image: `${baseUrl}${siteConfig.profile.photo}`,
      jobTitle: "大洲市議会議員",
      homeLocation: {
        "@type": "Place",
        name: "愛媛県大洲市",
      },
      sameAs: siteConfig.sns.map((s) => s.url),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

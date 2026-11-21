import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const { meta } = siteConfig;
  return {
    name: meta.siteName,
    short_name: meta.shortName,
    description: meta.description,
    lang: "ja",
    start_url: "/",
    display: "browser",
    background_color: meta.backgroundColor,
    theme_color: meta.themeColor,
    icons: [{ src: meta.appIcon, sizes: "512x512", type: "image/png" }],
  };
}

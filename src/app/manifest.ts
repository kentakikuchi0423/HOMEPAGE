import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.meta.siteName,
    short_name: siteConfig.meta.shortName,
    description: siteConfig.meta.description,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#1e50a2",
    icons: [
      {
        src: siteConfig.meta.favicon,
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}

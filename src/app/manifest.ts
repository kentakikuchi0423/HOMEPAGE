import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.meta.siteName,
    short_name: "菊地けんた",
    description: siteConfig.meta.description,
    start_url: "/",
    display: "browser",
    background_color: "#1e3a8a",
    theme_color: "#1e3a8a",
    icons: [
      {
        src: siteConfig.meta.favicon,
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}

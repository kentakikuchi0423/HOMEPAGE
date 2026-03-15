import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/content/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.meta.url),
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  icons: { icon: siteConfig.meta.favicon },
  openGraph: {
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    url: siteConfig.meta.url,
    siteName: siteConfig.profile.name,
    images: [{ url: siteConfig.meta.ogImage, width: 1200, height: 630 }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    images: [siteConfig.meta.ogImage],
  },
  verification: {
    google: "zqTfq7juOXzHoucWwhmaqSDCMlXNwyAbmVVkqWKB9ig",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={notoSansJP.variable}>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
        {/* X (Twitter) widgets.js — アプリ全体で1回だけロード */}
        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

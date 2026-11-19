import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/content/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/JsonLd";

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
  alternates: {
    canonical: siteConfig.meta.url,
  },
  // favicon / icon / apple-icon は src/app/ のファイルベース metadata で自動生成
  // （src/app/favicon.ico, src/app/icon.png, src/app/apple-icon.png）
  openGraph: {
    title: siteConfig.meta.title,
    description: siteConfig.meta.description,
    url: siteConfig.meta.url,
    siteName: siteConfig.meta.siteName,
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
        {/* JavaScript が無効でも本文が表示されるようにする */}
        <noscript>
          <style>{`.reveal,.hero-animate{opacity:1!important;transform:none!important;animation:none!important}.section-bar{width:4rem!important}`}</style>
        </noscript>
        <JsonLd />
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

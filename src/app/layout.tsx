import type { Metadata } from "next";
import { Shippori_Mincho, Yuji_Syuku } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/content/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/JsonLd";
import InPageNav from "@/components/layout/InPageNav";

const mincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-mincho",
  display: "swap",
  // 日本語フォントは文字範囲ごとに多数のファイルへ分割される。全ファイルの先読みを止め、
  // ページで実際に使う文字のファイルだけをブラウザに読み込ませる
  preload: false,
});

// 署名用の手書き（筆ペン）風フォント
const signature = Yuji_Syuku({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
  display: "swap",
  // 日本語フォントは文字範囲ごとに多数のファイルへ分割される。全ファイルの先読みを止め、
  // ページで実際に使う文字のファイルだけをブラウザに読み込ませる
  preload: false,
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
      <body className={`${mincho.variable} ${signature.variable}`}>
        {/* JavaScript が無効でも本文が表示されるようにする */}
        <noscript>
          <style>{`.reveal,.rise,.curtain img{opacity:1!important;transform:none!important}.curtain::after{display:none!important}.row-line::after{transform:none!important}`}</style>
        </noscript>
        <JsonLd />
        <InPageNav />
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

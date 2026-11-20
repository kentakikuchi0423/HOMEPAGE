import type { Metadata } from "next";
import { Shippori_Mincho } from "next/font/google";
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

// 書体の読み込みが済んでから、ファーストビューの表示アニメーションを始めるための小さなスクリプト。
// 先に始めると、途中で代替書体から明朝体へ切り替わり、文字がかくついて見える。
// 本体の JavaScript の読み込みを待たずに動くよう HTML に直接埋め込み、遅くとも 1.2 秒で必ず開始する。
const fontsReadyScript = `(function(){var d=document,r=d.documentElement,done=function(){r.classList.add('fonts-ready')};setTimeout(done,1200);d.addEventListener('DOMContentLoaded',function(){try{var h=d.getElementById('hero'),t=h?h.textContent:'',f=getComputedStyle(d.body).fontFamily;Promise.all([d.fonts.load('500 16px '+f,t),d.fonts.load('600 16px '+f,t)]).then(done,done)}catch(e){done()}})})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${mincho.variable}`}>
        {/* JavaScript が無効でも本文が表示されるようにする */}
        <noscript>
          <style>{`.reveal,.rise,.curtain img{opacity:1!important;transform:none!important}.curtain::after{display:none!important}.row-line::after{transform:none!important}#hero,#hero *,#hero *::after{animation-play-state:running!important}`}</style>
        </noscript>
        <script dangerouslySetInnerHTML={{ __html: fontsReadyScript }} />
        <JsonLd />
        <InPageNav />
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Shippori_Mincho } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/content/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InPageNav from "@/components/layout/InPageNav";

const mincho = Shippori_Mincho({
  subsets: ["latin"],
  // 本文用（500）と見出し・強調用（600）の 2 種類に絞る。
  // 太さを 1 種類増やすごとに、書体の定義（CSS）と書体ファイルがその分増えるため
  weight: ["500", "600"],
  variable: "--font-mincho",
  display: "swap",
  // 日本語フォントは文字範囲ごとに多数のファイルへ分割される。全ファイルの先読みを止め、
  // ページで実際に使う文字のファイルだけをブラウザに読み込ませる
  preload: false,
});

// 全ページ共通のメタデータ。トップページ固有のもの（canonical・OGP など）は page.tsx で定義する。
// favicon と apple-icon は src/app/favicon.ico・src/app/apple-icon.png から自動で設定される
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.meta.url),
  title: siteConfig.meta.title,
  description: siteConfig.meta.description,
  verification: siteConfig.meta.googleSiteVerification
    ? { google: siteConfig.meta.googleSiteVerification }
    : undefined,
  // 電話番号などを自動でリンクに変えない（意図しない装飾を防ぐ）
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: siteConfig.meta.themeColor,
  // 明るい配色のみで設計しているため、端末がダークモードでも自動で色を反転させない
  colorScheme: "light",
};

// 書体の読み込みが済んでから、ファーストビューの表示アニメーションを始めるための小さなスクリプト。
// 先に始めると、途中で代替書体から明朝体へ切り替わり、文字がかくついて見える。
// 本体の JavaScript の読み込みを待たずに動くよう HTML に直接埋め込み、遅くとも 1.2 秒で必ず開始する。
const fontsReadyScript = `(function(){var d=document,r=d.documentElement,done=function(){r.classList.add('fonts-ready')};setTimeout(done,1200);d.addEventListener('DOMContentLoaded',function(){try{var h=d.getElementById('hero'),t=h?h.textContent:'',f=getComputedStyle(d.body).fontFamily;Promise.all([d.fonts.load('500 16px '+f,t),d.fonts.load('600 16px '+f,t)]).then(done,done)}catch(e){done()}})})()`;

// JavaScript が無効でも本文が表示されるようにする（表示アニメーションの初期状態を打ち消す）
const noScriptStyle = `.reveal,.reveal-child,.rise,.curtain img{opacity:1!important;transform:none!important}.curtain::after{display:none!important}.row-line::after{transform:none!important}#hero,#hero *,#hero *::after{animation-play-state:running!important}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // fonts-ready クラスは上のスクリプトが付けるため、サーバーの出力との差を許容する
    <html lang="ja" suppressHydrationWarning>
      <body className={mincho.variable}>
        <noscript>
          <style>{noScriptStyle}</style>
        </noscript>
        <script dangerouslySetInnerHTML={{ __html: fontsReadyScript }} />
        <a href="#main" className="skip-link">
          {siteConfig.nav.skipLabel}
        </a>
        <InPageNav />
        <Header />
        <main id="main" className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

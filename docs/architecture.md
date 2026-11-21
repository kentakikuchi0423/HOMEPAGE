# architecture.md — アーキテクチャ設計

静的に書き出した 1 ページのサイトと、「最新の活動」用の Netlify Function 1 本で構成する。

## ディレクトリ構成

```
.
├── netlify.toml                    ビルド設定・転送・セキュリティヘッダー（CSP）
├── netlify/functions/
│   └── go2senkyo-rss.ts            RSS を取得して JSON で返す（「最新の活動」用）
├── public/images/                  画像（docs/assets.md 参照）
├── src/
│   ├── app/
│   │   ├── layout.tsx              全ページ共通の枠（書体・メタデータ・ヘッダー・フッター）
│   │   ├── page.tsx                トップページ（各セクションを並べる。OGP・構造化データ）
│   │   ├── not-found.tsx           存在しないページ（404）
│   │   ├── globals.css             配色などのトークン・動き・印刷用の指定
│   │   ├── manifest.ts / robots.ts / sitemap.ts
│   │   └── favicon.ico / apple-icon.png
│   ├── components/
│   │   ├── JsonLd.tsx              検索エンジン向けの構造化データ
│   │   ├── layout/                 Header・Footer・InPageNav（ページ内リンクの挙動）
│   │   ├── sections/               Hero・Message・Profile・Policy・Video（+VideoCard）・Activity・SocialLinks・Donation
│   │   └── ui/                     SectionHeading・Reveal・WaveEdge・ExternalLink・FeatureList
│   ├── content/site.ts             サイトの文言・URL・設定（内容の変更はここだけ）
│   ├── hooks/useInView.ts          要素が画面に入ったことの検知
│   └── lib/
│       ├── rss.ts                  RSS の解析と検証（サーバー・ブラウザ共通）
│       └── date.ts                 日付の整形（日本時間）
└── tests/                          lib のテスト（npm test）
```

## セクション構成（表示順）

| # | id | コンポーネント | 内容 |
|---|---|---|---|
| 1 | `hero` | `HeroSection` | 肩書き・氏名・キャッチコピー・顔写真 |
| 2 | `message` | `MessageSection` | ごあいさつ・署名・写真 |
| 3 | `profile` | `ProfileSection` | 経歴・趣味・資格・写真 |
| 4 | `policy` | `PolicySection` | 政策（番号つきの一覧） |
| 5 | `video` | `VideoSection` | YouTube 動画（押すまでプレーヤーを読み込まない） |
| 6 | `activity` | `ActivitySection` | 最新の活動（RSS）・市政報告 |
| 7 | `social` | `SocialLinksSection` | SNS へのリンク |
| 8 | `donation` | `DonationSection` | ご支援のお願い（外部の寄付ページへ） |

## コンポーネントの方針

- **内容は `site.ts` から受け取る。** コンポーネントに文言や URL を直接書かない
- **サーバー側で描画するのを基本にする。** ブラウザで動かす必要があるもの（`'use client'`）は次の 5 つだけ
  - `Header`（メニューの開閉・読み進み線）、`InPageNav`（ページ内リンク）
  - `Reveal`（画面に入ったら `is-visible` を付ける）、`VideoCard`（再生）、`ActivitySection`（RSS の取得）
- **表示の動きは CSS で定義する。** セクションを `Reveal` で包むと、画面に入った時点で `is-visible` クラスが付き、
  `reveal`（自身）・`reveal-child`（中の項目）・`rise`（見出し）・`curtain`（写真）・`row-line`（罫線）が動き出す
- **外部へのリンクは `ExternalLink` を使う。** `rel="noopener noreferrer"` と読み上げ用の補足が付く

## src/content/site.ts — 設定の構成

型の定義とコメントは `src/content/site.ts` の `SiteConfig` が正。主な項目は次のとおり。

| キー | 内容 |
|---|---|
| `headings` | 各セクションの見出しと英字ラベル |
| `nav` | メニュー項目、「応援する」リンク、読み上げ用の文言（本文へ移動・新しいタブで開きます など） |
| `hero` | ファーストビューのボタン |
| `message` | ごあいさつの本文（`emphasis: true` の段落は強調）、署名（`signatureImage`）、写真 |
| `brand` | ヘッダーロゴ（任意。未設定なら氏名を表示） |
| `meta` | タイトル・説明文・本番 URL・OGP 画像・色・Search Console の確認コード・`person`（構造化データ用の人物情報） |
| `profile` | 氏名・肩書き・経歴・写真・キャッチコピー・趣味・資格 |
| `policies` | 政策（題名と説明） |
| `video` | YouTube 動画の ID と題名、再生ボタンの文言 |
| `activity` | 市政報告（題名・画像・説明）、`rss`（取得先・件数・許可するホスト）、`labels` |
| `donation` | 寄付ページの URL・ボタンの文言・説明文 |
| `sns` | SNS のリンク（表示名・URL・順番・アイコン・`isProfile`） |
| `footer` / `notFound` | フッターの文言、404 ページの文言 |

`SiteConfig` の型を変えたときは、この表も更新する。

## 「最新の活動」（RSS）の流れと安全対策

```
ブラウザ ──→ /.netlify/functions/go2senkyo-rss ──→ 選挙ドットコムの RSS
        ←── JSON（題名・リンク・日付・画像）  ←──
```

RSS の内容は外部から来る信頼できないデータとして扱う。

- **取得先は固定**：`site.ts` の `activity.rss.url` のみ。リクエストの内容は取得先に影響しない
- **リンク・画像の検証**（`lib/rss.ts`）：https で、`linkHosts` / `imageHosts` に挙げたホスト（サブドメインを含む）のものだけを通す。
  条件を満たさないリンクの項目は表示しない。条件を満たさない画像は、画像なしで表示する
- **二重の検証**：Function で解析した直後と、ブラウザで受け取った直後の両方で同じ検証を通す
- **上限**：取得は 5 秒で打ち切り、本文は約 1MB まで、題名は 200 文字まで。ブラウザ側は 8 秒で打ち切って案内を表示する
- **保存（キャッシュ）**：成功した結果は Netlify の CDN に 10 分間保存する。失敗や空の結果は保存しない
- **GET / HEAD 以外は 405**、取得に失敗したときは 502 を返す

`imageHosts` を変えるときは、`netlify.toml` の Content-Security-Policy（`img-src`）も合わせて変える。

## デザイントークン方針

`src/app/globals.css` の `@theme` でトークンを定義する（Tailwind v4 方式。`text-ink` / `bg-paper` などのクラスになる）。

| トークン | 値 | 用途 |
|---|---|---|
| `ink` | `#1c2430` | 本文・見出しの墨色 |
| `sub` | `#4b5563` | 補助テキスト |
| `brand` | `#1e50a2` | イメージカラーの瑠璃色（アクセントはこの 1 色に限定） |
| `paper` | `#eff4fa` | 淡い青のセクション背景 |
| `line` | `#dbe2ec` | 罫線 |

- **書体**：全体を明朝体（Shippori Mincho）で統一。太さは本文用 500 と見出し・強調用 600 の 2 種類のみ。署名は本人の手書きの画像
- **文字サイズ**：`html` の基準サイズを画面幅で切り替える（17px → 1024px 以上 18px → 1536px 以上 20px）。各要素は rem 指定のため全体が連動する
- **形**：角丸・影・グラデーションは使わず、細い罫線と余白で区切る
- **波**：セクション境界の波（肱川のイメージ）は `ui/WaveEdge.tsx`。「ご支援のお願い」の上端の 1 か所のみ
- **動き**：定義は `globals.css` の「動き」節に集約。読み込み時の順次表示（`hero-*`）、写真の幕開き（`curtain`）、
  見出しのせり上がり（`mask` / `rise`）、罫線の描画（`row-line`）、流れる文字（`ticker-track`）。
  「動きを減らす」設定と印刷時にはすべて止め、JavaScript が無効でも本文が表示されるようにしている

## アクセシビリティ

- キーボード：先頭に「本文へ移動」リンク。フォーカス枠は背景に応じて色と位置を変える
- 読み上げ：ナビゲーションに名前を付ける。外部リンクには「新しいタブで開きます」を添える。装飾（矢印・波など）は読み上げから外す
- スマホのメニュー：Escape・メニューの外側の操作・PC 幅への切り替えで閉じる
- 文字を大きく設定している端末でも横スクロールが出ないようにする

## Netlify デプロイ設定

- `main` ブランチへのマージで自動デプロイ。ビルドは `npm run build`、公開ディレクトリは `out`
- `netlify.toml` で、旧 URL（`kentakikuchi.netlify.app`）から本番ドメインへの 301 転送と、セキュリティヘッダーを設定している
- 静的ファイルのヘッダーは `netlify.toml`、Function の応答のヘッダーは Function のコードで付ける（`netlify.toml` の指定は Function には適用されない）

## 確認用のコマンド

```bash
npm run lint    # コード検査（ESLint）
npm test        # lib のテスト
npm run build   # 本番ビルド（型チェックを含む）
```

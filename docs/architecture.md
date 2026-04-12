# architecture.md — アーキテクチャ設計

## ディレクトリ構成

```
HomePage/
├── .devcontainer/
│   └── devcontainer.json       # Dev Container 設定
├── .claude/
│   ├── settings.json           # Claude Code 共有設定
│   └── settings.local.json     # Claude Code 個人設定（git 管理外）
├── docs/
│   └── architecture.md         # 本ファイル
├── public/
│   └── images/
│       ├── profile.jpg         # プロフィール写真
│       ├── ogp.png             # OGP 画像
│       ├── favicon.png         # favicon 元画像
│       ├── policy/             # 政策アイコン画像（差し替え用）
│       └── social/             # SNS リンクアイコン画像（差し替え用）
├── src/
│   ├── app/
│   │   ├── layout.tsx          # RootLayout（フォント・メタタグ）
│   │   ├── page.tsx            # 1ページ構成のエントリポイント
│   │   ├── manifest.ts         # Web App Manifest（/manifest.webmanifest）
│   │   └── globals.css         # グローバルスタイル
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      # ヘッダー（ナビゲーション）
│   │   │   └── Footer.tsx      # フッター
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProfileSection.tsx
│   │   │   ├── PolicySection.tsx
│   │   │   ├── ActivitySection.tsx
│   │   │   └── DonationSection.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── SectionHeading.tsx
│   ├── content/
│   │   └── site.ts             # コンテンツの唯一の真実（Single Source of Truth）
│   └── lib/
│       └── utils.ts            # 共通ユーティリティ
├── CLAUDE.md
├── TASKS.md
├── README.md
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── netlify.toml
```

---

## セクション構成

1ページを縦にスクロールする構成。セクション順序：

| # | セクション | コンポーネント | 概要 |
|---|---|---|---|
| 1 | Hero | `HeroSection` | 顔写真・キャッチコピー・サブコピー |
| 2 | Profile | `ProfileSection` | 自己紹介文・経歴ハイライト |
| 3 | Policy | `PolicySection` | 政策3〜5項目（アイコン付きカード） |
| 4 | Activity | `ActivitySection` | X タイムライン + 市政報告（2カラム） |
| 5 | Donation | `DonationSection` | 外部寄付ページへの CTA |
| 6 | SNS | `SocialLinksSection` | 各 SNS へのリンクボタン群 |
| 7 | Footer | `Footer` (layout) | コピーライト・免責 |

---

## src/content/site.ts — 型設計

コンテンツの変更はこのファイルのみ行う。

```typescript
export type SiteConfig = {
  brand: {
    headerLogo?: string   // ヘッダーロゴ画像パス（public/ 以下）例: "/images/brand/logo.png"
    logoAlt?: string      // alt テキスト（省略時は profile.name を使用）
  }
  // ...
}

export type Policy = {
  icon: string          // 絵文字フォールバック識別子
  iconImage?: string    // 画像パス（public/ 以下）例: "/images/policy/education.png"
  title: string         // 政策タイトル
  description: string   // 政策説明文
}

export type VideoItem = {
  youtubeVideoId: string  // YouTube 動画 ID（空文字はプレースホルダー表示）
  title?: string          // 動画タイトル（任意）
}

export type SnsLink = {
  platform: 'X' | 'Instagram' | 'Facebook' | 'YouTube' | '選挙ドットコム'
  url: string
  order: number         // 表示順（昇順）
  iconImage?: string    // 画像パス（public/ 以下）例: "/images/social/x.png"
}

export type SiteConfig = {
  meta: {
    title: string        // サイトタイトル（ブラウザタブ・OGP）
    description: string  // サイト説明文（OGP）
    url: string          // 本番 URL（https://...）
    ogImage: string      // OGP 画像パス（public/ 以下）
    favicon: string      // favicon 画像パス（public/ 以下）例: "/images/favicon.png"
    siteName: string     // サイト名（og:site_name・WebSite schema の name に使用）
    siteNameAlt?: string[] // サイト名の別表記（WebSite schema の alternateName）
  }
  profile: {
    name: string         // 氏名（漢字）
    nameKana: string     // 氏名（ふりがな）
    title: string        // 肩書き（例："○○市議会議員候補"）
    bio: string          // プロフィール本文（複数行可）
    photo: string        // 顔写真パス（public/ 以下）
    catchcopy: string    // Hero キャッチコピー（短く力強いメッセージ）
    subcopy: string      // Hero サブコピー（補足メッセージ）
  }
  policies: Policy[]
  video: {
    videos: VideoItem[]     // YouTube 動画リスト（最大2本）
  }
  xTimeline: {
    handle: string       // X アカウント名（@ なし、例："taro_yamada"）
    tweetLimit?: number  // 表示件数（省略時は X ウィジェットデフォルト）
  }
  activity: {
    municipalReport: {
      image?: string      // 画像パス（public/ 以下）例: "/images/activity/report.jpg"
      imageAlt?: string   // 画像の alt テキスト
      description: string // 説明文
    }
  }
  donation: {
    url: string          // 外部寄付ページ URL
    label: string        // CTA ボタンラベル（例："活動を応援する"）
    description?: string // セクション説明文（任意）
  }
  sns: SnsLink[]
  footer: {
    copyright: string    // コピーライト文（例："© 2024 山田太郎"）
    disclaimer?: string  // 免責文（任意）
  }
}

export const siteConfig: SiteConfig = {
  // ← ここにコンテンツを入力する（Phase 1 以降）
}
```

---

## コンポーネント責務分割

### `layout/` — ページ骨格

| コンポーネント | 責務 |
|---|---|
| `Header` | ナビゲーション表示（スクロール追従 or シンプル固定） |
| `Footer` | コピーライト・免責文表示 |

### `sections/` — セクション

- `site.ts` からデータを受け取って描画のみ行う
- ビジネスロジック・副作用を持たない
- 各セクションは `<section id="xxx">` で囲み、ナビゲーションのアンカーリンクに対応

### `ui/` — 汎用パーツ

| コンポーネント | 責務 |
|---|---|
| `Button` | CTA・リンクボタン（primary / secondary バリアント） |
| `Card` | 政策カード等に使う汎用カードレイアウト |
| `SectionHeading` | 各セクションの見出し（統一スタイル） |

---

## デザイントークン方針

`tailwind.config.ts` でカスタムカラーを定義：

```typescript
colors: {
  primary: {
    50:  '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a',
  },
  surface: {
    DEFAULT: '#ffffff',
    muted:   '#f8fafc',
  },
  accent: {
    DEFAULT: '#60a5fa',  // 親しみやすさのポイントカラー
  },
}
```

---

## X Timeline 埋め込みについて

- X 公式ウィジェット（`https://publish.twitter.com/`）の埋め込みコードを使用
- `next/script` の `strategy="lazyOnload"` で読み込み（静的エクスポート対応）
- `site.ts` の `xTimeline.handle` から埋め込み URL を生成

```tsx
// XTimelineSection.tsx の実装イメージ
<a
  className="twitter-timeline"
  href={`https://twitter.com/${siteConfig.xTimeline.handle}`}
>
  Tweets by @{siteConfig.xTimeline.handle}
</a>
<Script
  src="https://platform.twitter.com/widgets.js"
  strategy="lazyOnload"
/>
```

---

## Donation セクションについて

- 寄付処理・決済機能は**初期スコープ外**
- 外部寄付ページ URL（`site.ts` の `donation.url`）へリンクするのみ
- `target="_blank" rel="noopener noreferrer"` を付与

---

## Netlify デプロイ設定

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "out"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
```

```typescript
// next.config.ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,  // 静的エクスポートでは Next.js Image Optimization 不可
  },
}
```

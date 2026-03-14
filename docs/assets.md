# 画像アセットガイド

このドキュメントでは、サイトで使用する画像の種類・推奨サイズ・配置場所・差し替え手順を説明します。

---

## 推奨サイズ一覧

| 画像の種類 | 推奨サイズ | 推奨形式 | 備考 |
|---|---|---|---|
| ヘッダーロゴ | 800 × 200 px 以上（Retina対応なら 1200 × 300 px 程度） | 透過 PNG または SVG | 横長推奨 |
| 政策アイコン | 512 × 512 px | 透過 PNG または SVG | 正方形必須 |
| SNS リンクアイコン | 256 × 256 px | 透過 PNG または SVG | 正方形必須 |
| favicon 元画像 | 512 × 512 px | 透過 PNG または SVG | 正方形必須 |
| プロフィール写真 | 600 × 800 px 程度 | JPG または PNG | 縦長推奨 |
| OGP 画像 | 1200 × 630 px | JPG または PNG | SNS シェア時に表示 |

---

## ディレクトリ構成

```
public/
└── images/
    ├── brand/
    │   ├── favicon.png      ← favicon 元画像
    │   ├── logo.png         ← ヘッダーロゴ画像（差し替え用）
    │   └── ogp.png          ← OGP 画像（SNS シェア用）
    ├── profile/
    │   └── profile.jpg      ← プロフィール写真
    ├── policy/
    │   ├── education.png    ← 政策アイコン: 子育て・教育
    │   ├── economy.png      ← 政策アイコン: 地域経済
    │   ├── welfare.png      ← 政策アイコン: 高齢者・福祉
    │   └── environment.png  ← 政策アイコン: 環境・防災
    └── social/
        ├── x.png            ← X (Twitter) アイコン
        ├── facebook.png     ← Facebook アイコン
        ├── instagram.png    ← Instagram アイコン
        ├── youtube.png      ← YouTube アイコン
        └── senkyo.png       ← 選挙ドットコム アイコン
```

---

## 差し替え手順

### ヘッダーロゴを差し替える

1. 画像を `public/images/brand/logo.png` として配置
2. `src/content/site.ts` の `brand.headerLogo` のコメントを外してパスを設定する

```ts
// src/content/site.ts
brand: {
  headerLogo: "/images/brand/logo.png", // ← コメントを外す
  logoAlt: "菊地けんた 公式ロゴ",       // ← コメントを外す
},
```

> `headerLogo` が設定されていない場合は氏名テキストがフォールバックとして表示されます。

> ヘッダーロゴ（またはフォールバックの氏名テキスト）はクリックでページトップへ遷移するリンクになっています。

### 政策アイコンを差し替える

1. 画像を `public/images/policy/` に配置（例: `education.png`）
2. `src/content/site.ts` の該当 policy に `iconImage` を追記する

```ts
// src/content/site.ts
policies: [
  {
    icon: "AcademicCapIcon",
    iconImage: "/images/policy/education.png", // ← この行を追加
    title: "子育て・教育の充実",
    description: "...",
  },
  // ...
],
```

> `iconImage` が設定されていない場合は絵文字がフォールバックとして表示されます。

### SNS リンクアイコンを差し替える

1. 画像を `public/images/social/` に配置（例: `x.png`）
2. `src/content/site.ts` の該当 sns エントリに `iconImage` を追記する

```ts
// src/content/site.ts
sns: [
  { platform: "X", url: "https://x.com/...", order: 1, iconImage: "/images/social/x.png" },
  // ...
],
```

> `iconImage` が設定されていない場合はテキスト文字がフォールバックとして表示されます。

### favicon を差し替える

1. 画像を `public/images/brand/favicon.png` として配置
2. `src/content/site.ts` の `meta.favicon` を確認（デフォルト: `"/images/brand/favicon.png"`）

```ts
// src/content/site.ts
meta: {
  favicon: "/images/brand/favicon.png", // ← ファイル名を変更した場合はここも変更
},
```

### プロフィール写真・OGP 画像を差し替える

`site.ts` の対応フィールドにパスを設定する。

```ts
meta: {
  ogImage: "/images/brand/ogp.png",  // OGP 画像
},
profile: {
  photo: "/images/profile/profile.jpg",  // プロフィール写真
},
```

---

## 注意事項

- ファイル名はすべて **小文字・英数字・ハイフン** のみ使用する（スペース・日本語不可）
- アイコン画像は **透過 PNG または SVG** を推奨（白背景のカードに重なるため）
- 画像を差し替えた後は `npm run dev` でブラウザ表示を確認する
- 本番デプロイ前に `npm run build` でビルドエラーがないことを確認する

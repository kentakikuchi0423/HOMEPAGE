# 政治活動プロフィールサイト

政治活動用の1ページ完結プロフィールサイト。
Next.js (static export) + Tailwind CSS + Netlify で構成。

## 必要環境

- Docker
- Visual Studio Code + [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) 拡張

## ローカル開発

1. このリポジトリを clone する
2. VS Code で開き「Reopen in Container」を選択
3. コンテナ起動後、ターミナルで以下を実行：

```bash
npm install
npm run dev
```

4. `http://localhost:3000` をブラウザで開く

### 「最新の活動」（RSS）を含めて確認する場合

RSS は Netlify Function 経由で取得するため、`netlify dev` が必要です。

```bash
npx netlify dev
```

- `http://localhost:8888` でアクセス
- Function の動作確認：`curl http://localhost:8888/.netlify/functions/go2senkyo-rss`

> `npm run dev`（ポート 3000）のみの場合、Function が存在しないため「最新の活動」欄はフォールバック表示（「投稿を読み込めませんでした」）になります。

## ビルド・プレビュー

```bash
npm run build       # 静的ファイルを out/ に出力
npx serve out       # ローカルでビルド成果物を確認
```

## Netlify デプロイ

`netlify.toml` にビルド設定が記載されており、Netlify 側での手動設定は不要。

### 本番への反映方法

**main ブランチに push するだけで自動的に本番デプロイされる。**

```bash
git push origin main
```

Netlify が push を検知し、`npm run build` → `out/` を自動公開する。

### デプロイ状況の確認

- Netlify ダッシュボードの「Deploys」タブでログ・ステータスを確認できる
- デプロイ完了まで通常 1〜2 分程度

### 初回セットアップ（GitHub 連携がまだの場合）

1. [Netlify](https://app.netlify.com/) にログインし「Add new site → Import an existing project」を選択
2. GitHub を選択し、このリポジトリを選ぶ
3. ビルド設定は `netlify.toml` から自動読み込みされるため変更不要
   - Build command: `npm run build`
   - Publish directory: `out`
4. 「Deploy site」をクリック

以降は main ブランチへの push で自動デプロイされる。

## コンテンツの更新方法

**`src/content/site.ts` のみを編集してください。**

```
src/content/site.ts
  ├── meta        サイトタイトル・OGP 画像・URL・favicon
  ├── brand       ヘッダーロゴ画像パス
  ├── profile     氏名・肩書き・プロフィール文・顔写真・キャッチコピー・資格・趣味
  ├── policies    政策項目（配列）
  ├── video       YouTube 動画 ID 一覧（配列）
  ├── activity    市政報告（画像・説明文）
  ├── donation    寄付ページ URL・ボタンラベル
  ├── sns         SNS リンク一覧（配列）
  └── footer      コピーライト・免責文
```

詳細な型定義は `docs/architecture.md` を参照してください。

## 画像の差し替え方法

画像ファイルは `public/images/` 以下に配置し、`src/content/site.ts` で参照します。

```
public/images/
  ├── brand/
  │   ├── favicon.png      ← favicon 元画像
  │   ├── logo.png         ← ヘッダーロゴ（差し替え用）
  │   └── ogp.png          ← OGP 画像（SNS シェア用）
  ├── profile/
  │   └── profile.jpg      ← プロフィール写真
  ├── policy/
  │   └── *.png            ← 政策アイコン
  └── social/
      └── *.png            ← SNS アイコン
```

### よく使う差し替え手順

**ヘッダーロゴ**

1. `public/images/brand/logo.png` を配置
2. `site.ts` の `brand.headerLogo` のコメントを外す

**OGP 画像**

1. `public/images/brand/ogp.png` を配置（推奨サイズ: 1200×630px）
2. `site.ts` の `meta.ogImage` に `/images/brand/ogp.png` を設定

**YouTube 動画**

1. `site.ts` の `video.videos` 配列に `{ youtubeVideoId: "動画ID", title: "タイトル" }` を追加
2. `youtubeVideoId` を空文字にするとプレースホルダーが表示される

**市政報告画像**

1. `public/images/activity/` に画像を配置
2. `site.ts` の `activity.municipalReport.image` にパスを設定
3. `activity.municipalReport.imageAlt` に alt テキストを設定

**政策アイコン**

1. `public/images/policy/` に画像を配置
2. `site.ts` の該当 policy に `iconImage` フィールドを追加

**SNS アイコン**

1. `public/images/social/` に画像を配置
2. `site.ts` の該当 sns エントリに `iconImage` フィールドを追加

> 各フィールドが未設定の場合はテキストや絵文字がフォールバックとして表示されます。

推奨サイズ・詳細手順は `docs/assets.md` を参照してください。

## プロジェクト構成

詳細は `docs/architecture.md` を参照。
フェーズ別タスクは `TASKS.md` を参照。
開発ルールは `CLAUDE.md` を参照。

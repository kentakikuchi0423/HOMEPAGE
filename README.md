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

- ビルドコマンド：`npm run build`
- 公開ディレクトリ：`out`
- GitHub リポジトリを Netlify に連携すると、main ブランチへの push で自動デプロイ

## コンテンツの更新方法

**`src/content/site.ts` のみを編集してください。**

```
src/content/site.ts
  ├── headings    各セクションの見出しと英字ラベル
  ├── nav         ヘッダーのメニュー項目・「応援する」リンク
  ├── hero        ファーストビューのボタン
  ├── message     ごあいさつ（本文・署名・写真）
  ├── meta        サイトタイトル・説明文・OGP 画像・本番 URL・色・検索エンジン向けの人物情報
  ├── brand       ヘッダーロゴ画像パス
  ├── profile     氏名・肩書き・プロフィール文・顔写真・キャッチコピー・資格・趣味
  ├── policies    政策項目（配列）
  ├── video       YouTube 動画 ID 一覧（配列）・再生ボタンの文言
  ├── activity    市政報告（画像・説明文）・「最新の活動」の取得先（RSS）
  ├── donation    寄付ページ URL・ボタンラベル
  ├── sns         SNS リンク一覧（配列）
  ├── footer      コピーライト・免責文
  └── notFound    存在しないページ（404）の文言
```

詳細な型定義は `docs/architecture.md` を参照してください。

## 画像の差し替え方法

画像ファイルは `public/images/` 以下に配置し、`src/content/site.ts` で参照します。

```
public/images/
  ├── brand/
  │   ├── favicon.png      ← ホーム画面用アイコン（512px 四方）
  │   └── ogp.png          ← SNS シェア用の画像（1200×630px）
  ├── profile/
  │   ├── profile.jpg      ← ファーストビューの顔写真
  │   ├── council.jpg      ← ごあいさつ欄の写真
  │   ├── cycling.jpg      ← プロフィール欄の写真
  │   └── signature.png    ← 手書きの署名（背景が透明な PNG）
  ├── activity/
  │   └── report.jpg       ← 市政報告の写真
  └── social/
      └── *.png            ← SNS アイコン（96px 四方）
```

### よく使う差し替え手順

**写真（顔写真・ごあいさつ・プロフィール・市政報告）**

1. 同じファイル名で上書きする（別名にする場合は `site.ts` のパスも変える）
2. 写真の説明文（`photoAlt` / `snapshotAlt` / `imageAlt`）を内容に合わせて直す

**YouTube 動画**

1. `site.ts` の `video.videos` に `{ youtubeVideoId: "動画ID", title: "タイトル" }` を追加する
2. `youtubeVideoId` を空文字にすると「準備中」の表示になる

**SNS リンク**

1. `site.ts` の `sns` に `{ label, url, order, iconImage }` を追加する
2. アイコンは `public/images/social/` に 96px 四方の PNG で置く（未設定なら頭文字を表示）

**ブラウザのタブのアイコン（favicon）**

`src/app/favicon.ico` と `src/app/apple-icon.png` を差し替える（`site.ts` では指定しない）。

> リポジトリは公開設定です。他の方が写り込んだ写真や、位置情報などのメタデータが残った画像を置かないよう注意してください。

推奨サイズ・詳細手順は `docs/assets.md` を参照してください。

## プロジェクト構成

詳細は `docs/architecture.md` を参照。
作業記録と運用タスクは `TASKS.md` を参照。
開発ルールは `CLAUDE.md` を参照。

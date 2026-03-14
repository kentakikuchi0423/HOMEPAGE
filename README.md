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
  ├── meta        サイトタイトル・OGP・URL
  ├── profile     氏名・肩書き・プロフィール文・顔写真・キャッチコピー
  ├── policies    政策項目（配列）
  ├── xTimeline   X アカウント名
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

# TASKS.md — フェーズ別タスク一覧

## Phase 0: ドキュメント整備

- [x] `CLAUDE.md` 作成
- [x] `TASKS.md` 作成
- [x] `docs/architecture.md` 作成
- [x] `.claude/settings.json` 作成
- [x] `README.md` 作成

---

## Phase 1: プロジェクト初期化

- [ ] Dev Container 設定作成（`.devcontainer/devcontainer.json`）
- [ ] `npx create-next-app` で Next.js プロジェクト初期化
  - TypeScript: Yes
  - Tailwind CSS: Yes
  - App Router: Yes
  - `src/` ディレクトリ: Yes
  - import alias: `@/*` → `./src/*`
- [ ] `next.config.ts` に `output: 'export'` を設定
- [ ] Tailwind CSS カスタムカラーを `tailwind.config.ts` に定義
- [ ] `src/content/site.ts` にダミーデータで `SiteConfig` を実装
- [ ] Netlify 用 `.gitignore` 確認・更新

---

## Phase 2: レイアウト・共通コンポーネント

- [ ] `src/app/layout.tsx` に RootLayout 実装（フォント・メタタグ）
- [ ] `src/app/globals.css` にベーススタイル設定
- [ ] `src/components/layout/Header.tsx` 実装（固定ナビ or シンプルヘッダー）
- [ ] `src/components/layout/Footer.tsx` 実装
- [ ] `src/components/ui/Button.tsx` 実装
- [ ] `src/components/ui/Card.tsx` 実装
- [ ] `src/components/ui/SectionHeading.tsx` 実装
- [ ] `src/lib/utils.ts` に共通ユーティリティ実装

---

## Phase 3: 各セクション実装

- [ ] `src/app/page.tsx` に全セクションを並べる構造を実装
- [ ] `HeroSection.tsx`：顔写真・キャッチコピー・サブコピー
- [ ] `ProfileSection.tsx`：自己紹介文・経歴ハイライト
- [ ] `PolicySection.tsx`：政策カード（3〜5項目）
- [ ] `XTimelineSection.tsx`：X 公式埋め込みウィジェット
- [ ] `DonationSection.tsx`：寄付 CTA ボタン・外部リンク遷移
- [ ] `SnsSection.tsx`：SNS リンクボタン群

---

## Phase 4: アニメーション・スタイル仕上げ

- [ ] スクロール連動フェードインアニメーション実装
- [ ] Hero セクションの入場アニメーション実装
- [ ] Policy カードのホバーエフェクト実装
- [ ] Donation セクションの CTA ボタンのアニメーション実装
- [ ] モバイル・タブレット・デスクトップのレイアウト確認・調整
- [ ] フォント・行間・余白の最終調整

---

## Phase 5: Netlify 静的デプロイ設定

- [ ] `netlify.toml` 作成（ビルドコマンド・公開ディレクトリ設定）
- [ ] Netlify プロジェクト作成・GitHub リポジトリ連携
- [ ] 環境変数設定（必要な場合）
- [ ] プレビューデプロイで動作確認

---

## Phase 6: コンテンツ最終調整・QA

- [ ] `src/content/site.ts` に実コンテンツを入力
- [ ] 顔写真・OGP 画像を `public/images/` に配置
- [ ] Lighthouse スコア計測（Performance / Accessibility / SEO）
- [ ] モバイル実機確認
- [ ] X Timeline 埋め込み表示確認
- [ ] 寄付ページへの遷移確認
- [ ] OGP タグ・メタタグ確認

---

## Phase 7: 本番公開

- [ ] 独自ドメイン設定（Netlify DNS または外部 DNS）
- [ ] HTTPS 証明書確認
- [ ] 本番 URL での最終動作確認
- [ ] 公開

---

## 初期スコープ外（将来フェーズで検討）

- 問い合わせフォーム
- 管理画面・CMS
- 認証・ログイン
- DB 連携（Supabase / Firebase 等）
- 多言語対応

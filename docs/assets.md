# 画像アセットガイド

サイトで使う画像の種類・推奨サイズ・配置場所・差し替え手順をまとめます。

## 一覧

| 画像 | 配置場所 | 推奨サイズ・形式 | 指定する場所（`site.ts`） |
|---|---|---|---|
| ファーストビューの顔写真 | `public/images/profile/profile.jpg` | 1200px 四方程度の JPG（上半身が中央上寄り） | `profile.photo` |
| ごあいさつ欄の写真 | `public/images/profile/council.jpg` | 幅 1100px 程度の縦長 JPG | `message.photo` / `message.photoAlt` |
| プロフィール欄の写真 | `public/images/profile/cycling.jpg` | 幅 600px 程度の縦長 JPG | `profile.snapshot` / `profile.snapshotAlt` |
| 手書きの署名 | `public/images/profile/signature.png` | 幅 900px 程度、背景が透明な PNG | `message.signatureImage` |
| 市政報告の写真 | `public/images/activity/report.jpg` | 幅 1100px 程度の横長 JPG | `activity.municipalReport.image` / `imageAlt` |
| SNS アイコン | `public/images/social/*.png` | 96px 四方の PNG | `sns[].iconImage` |
| SNS シェア用の画像（OGP） | `public/images/brand/ogp.png` | 1200×630px の PNG | `meta.ogImage` / `meta.ogImageAlt` |
| ホーム画面用アイコン | `public/images/brand/favicon.png` | 512px 四方の PNG | `meta.appIcon` |
| ブラウザのタブのアイコン | `src/app/favicon.ico`・`src/app/apple-icon.png` | ICO（16〜192px）・512px 四方の PNG | 指定不要（ファイルを置き換える） |
| ヘッダーロゴ（任意） | `public/images/brand/logo.png` | 横長、背景が透明な PNG | `brand.headerLogo` / `brand.logoAlt` |

## 差し替え手順

1. 上の表の場所に、同じファイル名で画像を置き換える
2. 別のファイル名にする場合は、`site.ts` の該当するパスを変える
3. 写真を替えたときは、説明文（`…Alt`）も内容に合わせて直す
4. `npm run build` でビルドが通ることを確認する

### ブラウザのタブのアイコン（favicon）

- `src/app/favicon.ico` は、内部の画像が RGBA 形式である必要がある（そうでないとビルドが失敗する）
- `public/images/brand/favicon.png` はホーム画面に追加したとき用で、タブのアイコンには使われない

### 署名

白い紙にペンで書いた写真から、紙の部分を取り除いて背景を透明にしたものを使う。色は本文と同じ墨色（`#1c2430`）にする。

## 注意事項

- **リポジトリは公開設定。** `public/` 以下の画像は、URL を知っていれば誰でも閲覧できる
- 他の方が写り込んだ写真は、切り抜くかぼかしを入れてから置く
- 位置情報や撮影日時などのメタデータ（EXIF）は取り除いてから置く
- ファイル名は英数字にする（日本語のファイル名は Netlify のビルドで問題になったことがある）
- 大きすぎる画像は表示を遅くする。上の表のサイズを目安に縮小する

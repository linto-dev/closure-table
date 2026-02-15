# Closure Table Demo

閉包テーブル（Closure Table）パターンを使ったネストコメント機能のデモアプリ。

## 技術スタック

- Next.js 16 (App Router)
- React 19
- Supabase (PostgreSQL)
- shadcn/ui / Tailwind CSS

## DB 構成

| テーブル | 概要 |
| --- | --- |
| `articles` | 記事 |
| `comments` | コメント（`parent_id` で隣接リスト、ソフトデリート対応） |
| `comment_tree_paths` | 閉包テーブル（トリガーで自動挿入） |

## セットアップ

```bash
npm install
cp .env.example .env.local
supabase start
supabase db reset  # マイグレーション + シードデータ投入
npm run dev
```

<http://localhost:3000/articles/1> を開く。

## npm scripts

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバー起動 |
| `npm run build` | プロダクションビルド |
| `npm run lint` | Biome によるリント |
| `npm run format` | Biome によるフォーマット |
| `npm run supabase:diff` | マイグレーション差分生成 |
| `npm run supabase:gen` | Supabase 型定義生成 |

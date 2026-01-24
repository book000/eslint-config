# GEMINI.md

## 目的
- Gemini CLI 向けのコンテキストと作業方針を定義する。

## 出力スタイル
- 言語: 日本語
- トーン: 簡潔で事実ベース
- 形式: Markdown

## 共通ルール
- 会話は日本語で行う。
- PR とコミットは Conventional Commits に従う。
- PR タイトルとコミット本文の言語: PR タイトルは Conventional Commits 形式（英語推奨）。PR 本文は日本語。コミットは Conventional Commits 形式（description は日本語）。
- 日本語と英数字の間には半角スペースを入れる。

## プロジェクト概要
Shareable ESLint configuration package for the author's projects. Provides standardized linting rules with TypeScript support.

### 技術スタック
- **言語**: JavaScript, TypeScript
- **フレームワーク**: ESLint
- **パッケージマネージャー**: pnpm@10.28.1
- **主要な依存関係**:
  - dependencies:
    - @eslint/eslintrc@3.3.3
    - @typescript-eslint/parser@8.53.1
    - eslint-config-prettier@10.1.8
    - eslint-plugin-import@2.32.0
    - eslint-plugin-n@17.23.2
  - peerDependencies:
    - eslint@9.39.2
    - eslint-config-standard@17.1.0

## コーディング規約
- フォーマット: 既存設定（ESLint / Prettier / formatter）に従う。
- 命名規則: 既存のコード規約に従う。
- コメント言語: 日本語
- エラーメッセージ: 英語

### 開発コマンド
```bash
# test
TEST_CLI=1 node --experimental-vm-modules test.mjs

```

## 注意事項
- 認証情報やトークンはコミットしない。
- ログに機密情報を出力しない。
- 既存のプロジェクトルールがある場合はそれを優先する。

## リポジトリ固有
- **type**: Reusable Package
- **publish**: npm package (@book000/eslint-config v1.0.0+)
- **usage**: Designed to be imported as '@book000/eslint-config' in other projects
- **note**: Uses modern ESLint v9 flat config format, not legacy .eslintrc
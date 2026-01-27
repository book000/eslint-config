# Gemini CLI 作業方針

## 目的

このドキュメントは、Gemini CLI がこのプロジェクトで作業する際のコンテキストと作業方針を定義します。

## 出力スタイル

- 言語: 日本語
- トーン: プロフェッショナルで簡潔
- 形式: 構造化された説明とコード例

## 共通ルール

- 会話言語: 日本語
- コミット規約: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) に従う (`<description>` は日本語)
- 日本語と英数字の間: 半角スペースを挿入

## プロジェクト概要

- 目的: 個人用 ESLint 設定を提供するパッケージ
- 主な機能: ESLint flat config に基づいた TypeScript / JavaScript プロジェクト向けのルール定義
- 技術スタック: JavaScript (ES Modules), TypeScript (設定対象), ESLint flat config

## コーディング規約

- フォーマット: Prettier との統合 (eslint-config-prettier)
- 命名規則: camelCase (変数・関数), PascalCase (クラス・型)
- コメント言語: 日本語
- エラーメッセージ言語: 英語
- TypeScript の `skipLibCheck` での回避は禁止
- 関数・インターフェースには docstring (JSDoc など) を日本語で記載

## 開発コマンド

```bash
# 依存関係のインストール
pnpm install

# テスト実行
pnpm test
```

## 注意事項

### セキュリティ / 機密情報

- API キーや認証情報を Git にコミットしない。
- ログに個人情報や認証情報を出力しない。

### 既存ルールの優先

- 既存のコーディングスタイルに従う。
- 不必要なリファクタリングは避ける。

### 既知の制約

- このパッケージは npm に公開される共有可能な ESLint 設定です。
- Renovate による依存パッケージの自動更新が有効です。

## リポジトリ固有

- `index.mjs` が ESLint flat config のエントリポイントです。
- TypeScript プロジェクト向けに `files: ["**/*.ts", "**/*.tsx"]` で TypeScript 専用ルールを適用しています。
- 以下のルールが特別に調整されています：
  - `@typescript-eslint/no-explicit-any`: off (any 型の使用を許可)
  - `@typescript-eslint/no-unsafe-assignment`: off (危険な代入を許可)
  - `@typescript-eslint/no-unsafe-argument`: off (危険な引数を許可)
  - `@typescript-eslint/restrict-template-expressions`: テンプレート式で number, boolean, any, nullish を許可
  - `@typescript-eslint/no-floating-promises`: void 演算子と即時関数での Promise を許可
  - `@typescript-eslint/no-unnecessary-condition`: 定数ループ条件 (無限ループ) を許可
  - `@typescript-eslint/no-extraneous-class`: 名前空間として使用されるクラスを許可
  - `@typescript-eslint/no-use-before-define`: TypeScript 準拠に変更
  - `unicorn/prefer-top-level-await`: off (トップレベル await を許可)
  - `unicorn/prevent-abbreviations`: off (省略形を許可)
  - `unicorn/no-null`: off (null を許可)
  - `unicorn/no-useless-undefined`: off (無駄な undefined を許可)
- テスト (test.mjs) は、一時的に `src/__tmp__cli` ディレクトリと `tsconfig.json` を作成して ESLint を実行します。

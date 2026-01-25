# GitHub Copilot Instructions

## プロジェクト概要

- 目的: 個人用 ESLint 設定を提供するパッケージ
- 主な機能: ESLint flat config に基づいた TypeScript / JavaScript プロジェクト向けのルール定義
- 対象ユーザー: book000 の個人プロジェクト開発者

## 共通ルール

- 会話は日本語で行う。
- コミットメッセージは [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) に従う。`<description>` は日本語で記載。
- ブランチ命名は [Conventional Branch](https://conventional-branch.github.io) に従う。`<type>` は短縮形 (feat, fix) を使用。
- 日本語と英数字の間には半角スペースを入れる。

## 技術スタック

- 言語: JavaScript (ES Modules), TypeScript (設定対象)
- ESLint: Flat Config (eslint.config.mjs 形式)
- パッケージマネージャー: pnpm (10.28.1)
- 主要パッケージ:
  - typescript-eslint
  - eslint-plugin-unicorn
  - eslint-config-standard
  - eslint-config-prettier

## コーディング規約

- フォーマット: Prettier との統合 (eslint-config-prettier)
- コメント言語: 日本語
- エラーメッセージ: 英語
- TypeScript の `skipLibCheck` での回避は禁止
- 関数・インターフェースには docstring (JSDoc など) を日本語で記載

## 開発コマンド

```bash
# 依存関係のインストール
pnpm install

# テスト実行
pnpm test
```

## テスト方針

- テストフレームワーク: Node.js の exec を使用したカスタムテストスクリプト (test.mjs)
- テストコマンド: `pnpm test`
- テスト追加: ESLint ルールの動作検証を追加する場合、test.mjs の testCases 配列に新しいケースを追加

## セキュリティ / 機密情報

- API キーや認証情報を Git にコミットしない。
- ログに個人情報や認証情報を出力しない。

## ドキュメント更新

変更時に以下のドキュメントを更新すること：

- `README.md`: パッケージの使用方法、インストール手順
- `index.mjs`: ESLint ルール設定の変更時
- `test.mjs`: テストケースの追加・変更時

## リポジトリ固有

- このパッケージは npm に公開される共有可能な ESLint 設定です。
- index.mjs が ESLint flat config のエントリポイントです。
- TypeScript プロジェクト向けに `files: ["**/*.ts", "**/*.tsx"]` で TypeScript 専用ルールを適用しています。
- 以下のルールが特別に調整されています：
  - `@typescript-eslint/no-explicit-any`: off (any 型の使用を許可)
  - `@typescript-eslint/no-unsafe-assignment`: off (危険な代入を許可)
  - `@typescript-eslint/no-unsafe-argument`: off (危険な引数を許可)
  - `unicorn/prefer-top-level-await`: off (トップレベル await を許可)
  - `unicorn/prevent-abbreviations`: off (省略形を許可)
  - `unicorn/no-null`: off (null を許可)
  - `unicorn/no-useless-undefined`: off (無駄な undefined を許可)
- Renovate による依存パッケージの自動更新が有効です。

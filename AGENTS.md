# AI エージェント作業方針

## 目的

このドキュメントは、一般的な AI エージェントがこのプロジェクトで作業する際の共通の作業方針を定義します。

## 基本方針

- 会話言語: 日本語
- コメント言語: 日本語
- エラーメッセージ言語: 英語
- コミット規約: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) に従う (`<description>` は日本語)
- 日本語と英数字の間: 半角スペースを挿入

## 判断記録のルール

判断は必ずレビュー可能な形で記録すること：

1. 判断内容の要約
2. 検討した代替案
3. 採用しなかった案とその理由
4. 前提条件・仮定・不確実性
5. 他エージェントによるレビュー可否

前提・仮定・不確実性を明示すること。仮定を事実のように扱ってはならない。

## 開発手順（概要）

1. **プロジェクト理解**
   - README.md、package.json、主要ファイルを読んで理解する
   - このプロジェクトは個人用 ESLint 設定パッケージです

2. **依存関係インストール**
   - パッケージマネージャー: pnpm (10.28.1)
   - コマンド: `pnpm install`

3. **変更実装**
   - TypeScript / JavaScript のコーディング規約に従う
   - 関数・インターフェースには日本語で docstring を記載
   - skipLibCheck での TypeScript エラー回避は禁止

4. **テストと Lint/Format 実行**
   - テストコマンド: `pnpm test`
   - ESLint ルールの動作を検証する

## セキュリティ / 機密情報

- API キーや認証情報を Git にコミットしない。
- ログに個人情報や認証情報を出力しない。

## リポジトリ固有

- このパッケージは npm に公開される共有可能な ESLint 設定です。
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
- Renovate による依存パッケージの自動更新が有効です。
- テスト (test.mjs) は、一時的に `src/__tmp__cli` ディレクトリと `tsconfig.json` を作成して ESLint を実行します。

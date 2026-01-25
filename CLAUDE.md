# Claude Code 作業方針

## 目的

このドキュメントは、Claude Code がこのプロジェクトで作業する際の方針とルールを定義します。

## 判断記録のルール

判断は必ずレビュー可能な形で記録すること：

1. 判断内容の要約
2. 検討した代替案
3. 採用しなかった案とその理由
4. 前提条件・仮定・不確実性
5. 他エージェントによるレビュー可否

前提・仮定・不確実性を明示すること。仮定を事実のように扱ってはならない。

## プロジェクト概要

- 目的: 個人用 ESLint 設定を提供するパッケージ
- 主な機能: ESLint flat config に基づいた TypeScript / JavaScript プロジェクト向けのルール定義
- 対象ユーザー: book000 の個人プロジェクト開発者

## 重要ルール

- 会話言語: 日本語
- コミット規約: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (`<description>` は日本語)
- コメント言語: 日本語
- エラーメッセージ言語: 英語
- 日本語と英数字の間: 半角スペースを挿入

## 環境のルール

- **ブランチ命名**: [Conventional Branch](https://conventional-branch.github.io) に従う (`<type>` は短縮形: feat, fix)
- **GitHub リポジトリ調査**: テンポラリディレクトリに git clone して検索
- **Renovate PR**: Renovate が作成したプルリクエストに対して、追加コミットや更新を行わない

## Git Worktree

このプロジェクトでは Git Worktree を使用していません。

## コード改修時のルール

- 日本語と英数字の間には、半角スペースを挿入しなければならない
- 既存のエラーメッセージで、先頭に絵文字がある場合は、全体でエラーメッセージに絵文字を設定する
- TypeScript プロジェクトにおいて、skipLibCheck を有効にして回避することは絶対にしてはならない
- 関数やインターフェースには、docstring (JSDoc など) を日本語で記載・更新する

## 相談ルール

Codex CLI や Gemini CLI の他エージェントに相談することができます。以下の観点で使い分けてください：

### Codex CLI (ask-codex)

- 実装コードに対するソースコードレビュー
- 関数設計、モジュール内部の実装方針などの局所的な技術判断
- アーキテクチャ、モジュール間契約、パフォーマンス / セキュリティといった全体影響の判断
- 実装の正当性確認、機械的ミスの検出、既存コードとの整合性確認

### Gemini CLI (ask-gemini)

- SaaS 仕様、言語・ランタイムのバージョン差、料金・制限・クォータといった、最新の適切な情報が必要な外部依存の判断
- 外部一次情報の確認、最新仕様の調査、外部前提条件の検証

### 指摘への対応ルール

他エージェントが指摘・異議を提示した場合、Claude Code は必ず以下のいずれかを行う。黙殺・無言での不採用は禁止する：

- 指摘を受け入れ、判断を修正する
- 指摘を退け、その理由を明示する

以下は必ず実施：

- 他エージェントの提案を鵜呑みにせず、その根拠や理由を理解する
- 自身の分析結果と他エージェントの意見が異なる場合は、双方の視点を比較検討する
- 最終的な判断は、両者の意見を総合的に評価した上で、自身で下す

## 開発コマンド

```bash
# 依存関係のインストール
pnpm install

# テスト実行
pnpm test
```

## アーキテクチャと主要ファイル

### アーキテクチャサマリー

- ESLint flat config (eslint.config.mjs 形式) を提供するパッケージ
- TypeScript / JavaScript プロジェクト向けの厳格なルールセット
- typescript-eslint, unicorn, standard, prettier の統合

### 主要ディレクトリとファイル

- `index.mjs`: ESLint flat config のエントリポイント
- `test.mjs`: ESLint ルールの動作検証スクリプト
- `package.json`: パッケージ定義
- `.github/workflows/`: GitHub Actions の CI/CD 設定

## 実装パターン

### 推奨パターン

- ESLint ルール設定: `index.mjs` で flat config 形式で定義
- テストケース追加: `test.mjs` の `testCases` 配列に追加
- TypeScript 専用ルール: `files: ["**/*.ts", "**/*.tsx"]` で適用範囲を限定

### 非推奨パターン

- `.eslintrc.js` などのレガシー設定形式の使用
- `skipLibCheck` での TypeScript エラー回避
- テストなしでのルール変更

## テスト

- テスト方針: ESLint ルールの動作を検証し、期待通りの挙動を確認
- テストフレームワーク: Node.js の `exec` を使用したカスタムテストスクリプト
- テストコマンド: `pnpm test`
- 追加テスト条件: 新しい ESLint ルールを追加・変更した場合、必ず test.mjs にテストケースを追加

## ドキュメント更新ルール

### 更新対象

- `README.md`: パッケージの使用方法、インストール手順
- `index.mjs`: ESLint ルール設定の変更時
- `test.mjs`: テストケースの追加・変更時

### 更新タイミング

- ESLint ルールの追加・変更時
- パッケージの使用方法の変更時
- 依存パッケージの大幅な更新時

## 作業チェックリスト

### 新規改修時

1. プロジェクトについて詳細に探索し理解すること
2. 作業を行うブランチが適切であること。すでに PR を提出しクローズされたブランチでないこと
3. 最新のリモートブランチに基づいた新規ブランチであること
4. PR がクローズされ、不要となったブランチは削除されていること
5. プロジェクトで指定されたパッケージマネージャ (pnpm) により、依存パッケージをインストールしたこと

### コミット・プッシュ前

1. コミットメッセージが [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) に従っていること (`<description>` は日本語)
2. コミット内容にセンシティブな情報が含まれていないこと
3. Lint / Format エラーが発生しないこと
4. 動作確認を行い、期待通り動作すること (pnpm test で確認)

### PR 作成前

1. プルリクエストの作成をユーザーから依頼されていること
2. コミット内容にセンシティブな情報が含まれていないこと
3. コンフリクトする恐れが無いこと

### PR 作成後

1. コンフリクトが発生していないこと
2. PR 本文の内容は、ブランチの現在の状態を、今までのこの PR での更新履歴を含むことなく、最新の状態のみ、漏れなく日本語で記載されていること
3. `gh pr checks <PR ID> --watch` で GitHub Actions CI を待ち、その結果がエラーとなっていないこと。成功している場合でも、ログを確認し、誤って成功扱いになっていないこと
4. GitHub Copilot レビューへの対応を行うこと。対応したら、レビューコメントそれぞれに対して返信を行うこと
5. コードレビューを実施し、指摘事項に対応すること

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
- Renovate による依存パッケージの自動更新が有効です。Renovate の PR には追加コミットや更新を行わないこと。
- テスト (test.mjs) は、一時的に `src/__tmp__cli` ディレクトリと `tsconfig.json` を作成して ESLint を実行します。

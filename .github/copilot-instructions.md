# GitHub Copilot レビュー指示

`@book000/eslint-config` は npm に公開される共有 ESLint flat config パッケージです。
コードレビュー時は以下の観点を優先してください。

## リポジトリ構成

- `index.mjs`: 公開される ESLint flat config 本体 (エントリポイント)。
- `test.mjs`: `index.mjs` のルール挙動を検証するカスタムテストスクリプト。
- 実行環境: pnpm 11.10.0 / ESM (`.mjs`)。

## 重点的に確認する点

- **ルール変更には必ずテストを伴うこと**: `index.mjs` のルールを追加・変更する PR で
  `test.mjs` の `testCases` にケースが追加・更新されていない場合は指摘する。
- **flat config の配列順序**: flat config は「後勝ち」。`eslintPrettier` は必ず配列末尾に
  置くこと。`unicorn/filename-case` のような後段オーバーライドの順序が入れ替わっていないか
  確認する。
- **公開パッケージとしての破壊的変更**: ルールの追加・厳格化は利用側プロジェクトに影響する。
  破壊的変更に見合うバージョニング (Conventional Commits の `feat!:` / `fix:` など) が
  適切か確認する。
- **コメント**: `index.mjs` の各ルール調整には「なぜ off / 変更したか」の日本語コメントを
  付ける慣習がある。理由コメントなしのルール変更は指摘する。

## フラグすべきでない既知パターン (誤検知防止)

- **意図的に off / 緩和されているルール**: このパッケージは設計方針として
  `@typescript-eslint/no-explicit-any`・`no-unsafe-assignment`・`no-unsafe-argument`・
  `unicorn/prevent-abbreviations`・`unicorn/no-null`・`unicorn/prefer-top-level-await` などを
  意図的に off にしている。これらを「有効化すべき」と指摘しない。
- **`index.mjs` 内の `@ts-expect-error`**: `unicorn.configs["flat/recommended"]` の型不整合を
  回避するための意図的な記述。削除を促さない。
- **`test.mjs` が生成する一時ファイル**: テストは一時的に `src/__tmp__cli` と `tsconfig.json` を
  作成して ESLint を実行する。この一時生成物を問題として扱わない。

## コーディング規約 (lint / 慣習で強制)

- コメント: 日本語。エラーメッセージ: 英語。
- 日本語と英数字の間には半角スペースを入れる。
- `skipLibCheck` による TypeScript エラー回避は禁止。
- コミットメッセージは [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
  (`<description>` は日本語)。

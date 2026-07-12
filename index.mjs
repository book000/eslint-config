import tseslintParser from "@typescript-eslint/parser";
import eslintPrettier from "eslint-config-prettier";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import neostandard from "neostandard";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Standard JS のルールセット（スタイル系は prettier に委ねるため無効化）
  ...neostandard({ noStyle: true }),
  ...tseslint.configs.recommended,
  {
    // eslint-plugin-unicorn のルールを flat/recommended に頼らず明示的に列挙する。
    // 理由: flat/recommended は unicorn のバージョンアップごとに収録ルールが
    // 無断で増減し、本パッケージに依存する多数のプロジェクトへ一斉に
    // 新規エラーが波及するリスクがあるため。新しいルールを取り込む場合は
    // このリストへ明示的に追記すること（unicorn の CHANGELOG を確認して判断する）。
    //
    // 生成方法: eslint-plugin-unicorn の flat/recommended が定義する
    // ルール一覧を元に、以下を除外・調整して作成した。
    // - deprecated ルールは対象外（catch-error-name, filename-case は
    //   下記の専用ブロックでオプション付きで設定するためここでは省略）
    // - 意図的に off とするルール（下記コメント参照）
    plugins: { unicorn },
    rules: {
      // 集約処理のイディオムとして正当な用途が多く、for ループへの
      // 書き換え強制がかえって可読性を落とすため無効化する
      "unicorn/no-array-reduce": "off",
      // クロージャで意図的に外側スコープの変数を捕捉する関数まで
      // 最上位への移動を要求し、誤検知が多いため無効化する
      "unicorn/consistent-function-scoping": "off",
      // トップレベル await を許可する（IIFE 併用の CLI ツール等のため）
      "unicorn/prefer-top-level-await": "off",
      // 省略形を許可する (dev -> development, prod -> productionなどの変換をさせない)
      "unicorn/prevent-abbreviations": "off",
      // nullを許可する
      "unicorn/no-null": "off",
      // 無駄なundefinedを許可する
      "unicorn/no-useless-undefined": "off",
      //
      // 以下、上記以外の flat/recommended 収録ルールをすべて明示的に error とする
      "unicorn/better-dom-traversing": "error",
      "unicorn/consistent-assert": "error",
      "unicorn/consistent-compound-words": "error",
      "unicorn/consistent-date-clone": "error",
      "unicorn/consistent-empty-array-spread": "error",
      "unicorn/consistent-existence-index-check": "error",
      "unicorn/consistent-json-file-read": "error",
      "unicorn/consistent-template-literal-escape": "error",
      "unicorn/dom-node-dataset": "error",
      "unicorn/empty-brace-spaces": "error",
      "unicorn/error-message": "error",
      "unicorn/escape-case": "error",
      "unicorn/expiring-todo-comments": "error",
      "unicorn/explicit-length-check": "error",
      "unicorn/import-style": "error",
      "unicorn/isolated-functions": "error",
      "unicorn/new-for-builtins": "error",
      "unicorn/no-abusive-eslint-disable": "error",
      "unicorn/no-accessor-recursion": "error",
      "unicorn/no-anonymous-default-export": "error",
      "unicorn/no-array-callback-reference": "error",
      "unicorn/no-array-fill-with-reference-type": "error",
      "unicorn/no-array-for-each": "error",
      "unicorn/no-array-from-fill": "error",
      "unicorn/no-array-method-this-argument": "error",
      "unicorn/no-array-reverse": "error",
      "unicorn/no-array-sort": "error",
      "unicorn/no-await-expression-member": "error",
      "unicorn/no-await-in-promise-methods": "error",
      "unicorn/no-blob-to-file": "error",
      "unicorn/no-canvas-to-image": "error",
      "unicorn/no-confusing-array-splice": "error",
      "unicorn/no-console-spaces": "error",
      "unicorn/no-document-cookie": "error",
      "unicorn/no-duplicate-set-values": "error",
      "unicorn/no-empty-file": "error",
      "unicorn/no-exports-in-scripts": "error",
      "unicorn/no-for-loop": "error",
      "unicorn/no-hex-escape": "error",
      "unicorn/no-immediate-mutation": "error",
      "unicorn/no-incorrect-query-selector": "error",
      "unicorn/no-instanceof-builtins": "error",
      "unicorn/no-invalid-fetch-options": "error",
      "unicorn/no-invalid-remove-event-listener": "error",
      "unicorn/no-late-current-target-access": "error",
      "unicorn/no-lonely-if": "error",
      "unicorn/no-magic-array-flat-depth": "error",
      "unicorn/no-named-default": "error",
      "unicorn/no-negated-condition": "error",
      "unicorn/no-negation-in-equality-check": "error",
      "unicorn/no-nested-ternary": "error",
      "unicorn/no-new-array": "error",
      "unicorn/no-new-buffer": "error",
      "unicorn/no-object-as-default-parameter": "error",
      "unicorn/no-process-exit": "error",
      "unicorn/no-single-promise-in-promise-methods": "error",
      "unicorn/no-static-only-class": "error",
      "unicorn/no-thenable": "error",
      "unicorn/no-this-assignment": "error",
      "unicorn/no-this-outside-of-class": "error",
      "unicorn/no-typeof-undefined": "error",
      "unicorn/no-unnecessary-array-flat-depth": "error",
      "unicorn/no-unnecessary-array-splice-count": "error",
      "unicorn/no-unnecessary-await": "error",
      "unicorn/no-unnecessary-nested-ternary": "error",
      "unicorn/no-unnecessary-polyfills": "error",
      "unicorn/no-unnecessary-slice-end": "error",
      "unicorn/no-unreadable-array-destructuring": "error",
      "unicorn/no-unreadable-iife": "error",
      "unicorn/no-unused-array-method-return": "error",
      "unicorn/no-useless-collection-argument": "error",
      "unicorn/no-useless-error-capture-stack-trace": "error",
      "unicorn/no-useless-fallback-in-spread": "error",
      "unicorn/no-useless-iterator-to-array": "error",
      "unicorn/no-useless-length-check": "error",
      "unicorn/no-useless-promise-resolve-reject": "error",
      "unicorn/no-useless-spread": "error",
      "unicorn/no-useless-switch-case": "error",
      "unicorn/no-zero-fractions": "error",
      "unicorn/number-literal-case": "error",
      "unicorn/numeric-separators-style": "error",
      "unicorn/prefer-add-event-listener": "error",
      "unicorn/prefer-array-find": "error",
      "unicorn/prefer-array-flat": "error",
      "unicorn/prefer-array-flat-map": "error",
      "unicorn/prefer-array-index-of": "error",
      "unicorn/prefer-array-last-methods": "error",
      "unicorn/prefer-array-some": "error",
      "unicorn/prefer-at": "error",
      "unicorn/prefer-bigint-literals": "error",
      "unicorn/prefer-blob-reading-methods": "error",
      "unicorn/prefer-class-fields": "error",
      "unicorn/prefer-classlist-toggle": "error",
      "unicorn/prefer-code-point": "error",
      "unicorn/prefer-date-now": "error",
      "unicorn/prefer-default-parameters": "error",
      "unicorn/prefer-dom-node-append": "error",
      "unicorn/prefer-dom-node-remove": "error",
      "unicorn/prefer-dom-node-text-content": "error",
      "unicorn/prefer-event-target": "error",
      "unicorn/prefer-export-from": "error",
      "unicorn/prefer-get-or-insert-computed": "error",
      "unicorn/prefer-global-this": "error",
      "unicorn/prefer-https": "error",
      "unicorn/prefer-includes": "error",
      "unicorn/prefer-includes-over-repeated-comparisons": "error",
      "unicorn/prefer-iterator-to-array-at-end": "error",
      "unicorn/prefer-keyboard-event-key": "error",
      "unicorn/prefer-logical-operator-over-ternary": "error",
      "unicorn/prefer-math-abs": "error",
      "unicorn/prefer-math-min-max": "error",
      "unicorn/prefer-math-trunc": "error",
      "unicorn/prefer-modern-dom-apis": "error",
      "unicorn/prefer-modern-math-apis": "error",
      "unicorn/prefer-module": "error",
      "unicorn/prefer-native-coercion-functions": "error",
      "unicorn/prefer-negative-index": "error",
      "unicorn/prefer-node-protocol": "error",
      "unicorn/prefer-number-properties": "error",
      "unicorn/prefer-object-from-entries": "error",
      "unicorn/prefer-optional-catch-binding": "error",
      "unicorn/prefer-prototype-methods": "error",
      "unicorn/prefer-query-selector": "error",
      "unicorn/prefer-queue-microtask": "error",
      "unicorn/prefer-reflect-apply": "error",
      "unicorn/prefer-regexp-test": "error",
      "unicorn/prefer-response-static-json": "error",
      "unicorn/prefer-set-has": "error",
      "unicorn/prefer-set-size": "error",
      "unicorn/prefer-simple-condition-first": "error",
      "unicorn/prefer-single-call": "error",
      "unicorn/prefer-split-limit": "error",
      "unicorn/prefer-spread": "error",
      "unicorn/prefer-string-match-all": "error",
      "unicorn/prefer-string-pad-start-end": "error",
      "unicorn/prefer-string-raw": "error",
      "unicorn/prefer-string-repeat": "error",
      "unicorn/prefer-string-replace-all": "error",
      "unicorn/prefer-string-slice": "error",
      "unicorn/prefer-string-starts-ends-with": "error",
      "unicorn/prefer-string-trim-start-end": "error",
      "unicorn/prefer-structured-clone": "error",
      "unicorn/prefer-switch": "error",
      "unicorn/prefer-ternary": "error",
      "unicorn/prefer-type-error": "error",
      "unicorn/relative-url-style": "error",
      "unicorn/require-array-join-separator": "error",
      "unicorn/require-css-escape": "error",
      "unicorn/require-module-attributes": "error",
      "unicorn/require-module-specifiers": "error",
      "unicorn/require-number-to-fixed-digits-argument": "error",
      "unicorn/require-passive-events": "error",
      "unicorn/switch-case-braces": "error",
      "unicorn/switch-case-break-position": "error",
      "unicorn/template-indent": "error",
      "unicorn/text-encoding-identifier-case": "error",
      "unicorn/throw-new-error": "error",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      globals: {
        ...globals.es2020,
        ...globals.node,
      },
      parser: tseslintParser,
      parserOptions: {
        project: ["tsconfig.json"],
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    extends: [
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      // TypeScriptのany型の使用を許可する
      "@typescript-eslint/no-explicit-any": "off",
      // TypeScriptの危険な代入を許可する
      "@typescript-eslint/no-unsafe-assignment": "off",
      // TypeScriptの危険な引数を許可する
      "@typescript-eslint/no-unsafe-argument": "off",
      // テンプレート式において、数値や真偽値、nullishを許可する
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
          allowBoolean: true,
          allowAny: true,
          allowNullish: true,
        },
      ],
      // 呼び出されないPromiseを許容しないが、void演算子や即時関数では許可する
      "@typescript-eslint/no-floating-promises": [
        "error",
        {
          ignoreVoid: true,
          ignoreIIFE: true,
        },
      ],
      // 不要な条件式を許容しないが、定数ループ条件（無限ループ）は許可する
      "@typescript-eslint/no-unnecessary-condition": [
        "error",
        {
          allowConstantLoopConditions: true,
        },
      ],
      // 名前空間として使用されるクラスを許可する
      "@typescript-eslint/no-extraneous-class": "off",
      // 変数などの未定義使用について、TypeScript準拠とする
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": "error",
    },
  },
  {
    // catch ブロックのエラー変数名は error に統一する。
    // err も常に許容する（error_ は要求しない）。
    rules: {
      "unicorn/catch-error-name": ["error", { name: "error", ignore: [/^err$/] }],
    },
  },
  {
    // __tests__ や __mocks__ など、Jest 等の規約に基づく
    // ダブルアンダースコアディレクトリ名を unicorn/filename-case の対象外とする
    rules: {
      "unicorn/filename-case": ["error", { ignore: [/^__[\w-]+__$/] }],
    },
  },
  {
    ignores: ["dist", "output", "node_modules", "data", "logs", "coverage"],
  },
  eslintPrettier
);

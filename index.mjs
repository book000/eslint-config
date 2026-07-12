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
    // 生成方法: eslint-plugin-unicorn (現在インストールされている 71.1.0) の
    // flat/recommended が定義するルール一覧を元に、以下を除外・調整して作成した。
    // - deprecated ルールは対象外
    // - catch-error-name, filename-case はオプション付きで設定するため、
    //   下記の専用ブロックに記載し、ここでは省略する
    // - 意図的に off とするルール（下記コメント参照）
    //
    // 注意: このリストは eslint-plugin-unicorn の特定バージョン (71.1.0) 時点の
    // flat/recommended を元に生成した固定スナップショットである。unicorn を
    // アップデートする際は、追加・削除・改名されたルールが無いか CHANGELOG を
    // 確認し、このリストへ反映すること。反映を怠ると、削除・改名されたルール ID
    // を参照したままとなり、ESLint の設定検証エラーで全ユーザーがクラッシュする
    // おそれがある。
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
      // 省略形を許可する (dev -> development, prod -> production などの変換をさせない)
      "unicorn/name-replacements": "off",
      // null を許可する
      "unicorn/no-null": "off",
      // 無駄な undefined を許可する
      "unicorn/no-useless-undefined": "off",
      // クラスメンバーの順序（private before public）を強制しない。
      // public-first の慣習は API の可読性として広く使われているため。
      "unicorn/consistent-class-member-order": "off",
      //
      // 以下、上記以外の flat/recommended 収録ルールをすべて明示的に error とする
      "unicorn/better-dom-traversing": "error",
      "unicorn/class-reference-in-static-methods": "error",
      "unicorn/consistent-assert": "error",
      "unicorn/consistent-boolean-name": "error",
      "unicorn/consistent-compound-words": "error",
      "unicorn/consistent-conditional-object-spread": "error",
      "unicorn/consistent-date-clone": "error",
      "unicorn/consistent-empty-array-spread": "error",
      "unicorn/consistent-existence-index-check": "error",
      "unicorn/consistent-export-decorator-position": "error",
      "unicorn/consistent-json-file-read": "error",
      "unicorn/consistent-optional-chaining": "error",
      "unicorn/consistent-template-literal-escape": "error",
      "unicorn/consistent-tuple-labels": "error",
      "unicorn/default-export-style": "error",
      "unicorn/dom-node-dataset": "error",
      "unicorn/empty-brace-spaces": "error",
      "unicorn/error-message": "error",
      "unicorn/escape-case": "error",
      "unicorn/expiring-todo-comments": "error",
      "unicorn/explicit-length-check": "error",
      "unicorn/explicit-timer-delay": "error",
      "unicorn/import-style": "error",
      "unicorn/isolated-functions": "error",
      "unicorn/logical-assignment-operators": "error",
      "unicorn/max-nested-calls": "error",
      "unicorn/new-for-builtins": "error",
      "unicorn/no-abusive-eslint-disable": "error",
      "unicorn/no-accessor-recursion": "error",
      "unicorn/no-accidental-bitwise-operator": "error",
      "unicorn/no-anonymous-default-export": "error",
      "unicorn/no-array-callback-reference": "error",
      "unicorn/no-array-concat-in-loop": "error",
      "unicorn/no-array-fill-with-reference-type": "error",
      "unicorn/no-array-from-fill": "error",
      "unicorn/no-array-method-this-argument": "error",
      "unicorn/no-array-reverse": "error",
      "unicorn/no-array-sort": "error",
      "unicorn/no-array-sort-for-min-max": "error",
      "unicorn/no-array-splice": "error",
      "unicorn/no-async-promise-finally": "error",
      "unicorn/no-await-expression-member": "error",
      "unicorn/no-await-in-promise-methods": "error",
      "unicorn/no-blob-to-file": "error",
      "unicorn/no-boolean-sort-comparator": "error",
      "unicorn/no-break-in-nested-loop": "error",
      "unicorn/no-canvas-to-image": "error",
      "unicorn/no-chained-comparison": "error",
      "unicorn/no-collection-bracket-access": "error",
      "unicorn/no-computed-property-existence-check": "error",
      "unicorn/no-confusing-array-splice": "error",
      "unicorn/no-confusing-array-with": "error",
      "unicorn/no-console-spaces": "error",
      "unicorn/no-constant-zero-expression": "error",
      "unicorn/no-declarations-before-early-exit": "error",
      "unicorn/no-document-cookie": "error",
      "unicorn/no-double-comparison": "error",
      "unicorn/no-duplicate-if-branches": "error",
      "unicorn/no-duplicate-logical-operands": "error",
      "unicorn/no-duplicate-loops": "error",
      "unicorn/no-duplicate-set-values": "error",
      "unicorn/no-empty-file": "error",
      "unicorn/no-error-property-assignment": "error",
      "unicorn/no-exports-in-scripts": "error",
      "unicorn/no-for-each": "error",
      "unicorn/no-for-loop": "error",
      "unicorn/no-global-object-property-assignment": "error",
      "unicorn/no-immediate-mutation": "error",
      "unicorn/no-impossible-length-comparison": "error",
      "unicorn/no-incorrect-query-selector": "error",
      "unicorn/no-incorrect-template-string-interpolation": "error",
      "unicorn/no-instanceof-builtins": "error",
      "unicorn/no-invalid-argument-count": "error",
      "unicorn/no-invalid-character-comparison": "error",
      "unicorn/no-invalid-fetch-options": "error",
      "unicorn/no-invalid-remove-event-listener": "error",
      "unicorn/no-invalid-well-known-symbol-methods": "error",
      "unicorn/no-late-current-target-access": "error",
      "unicorn/no-late-event-control": "error",
      "unicorn/no-lonely-if": "error",
      "unicorn/no-loop-iterable-mutation": "error",
      "unicorn/no-magic-array-flat-depth": "error",
      "unicorn/no-mismatched-map-key": "error",
      "unicorn/no-misrefactored-assignment": "error",
      "unicorn/no-named-default": "error",
      "unicorn/no-negated-array-predicate": "error",
      "unicorn/no-negated-comparison": "error",
      "unicorn/no-negated-condition": "error",
      "unicorn/no-negation-in-equality-check": "error",
      "unicorn/no-nested-ternary": "error",
      "unicorn/no-new-array": "error",
      "unicorn/no-new-buffer": "error",
      "unicorn/no-non-function-verb-prefix": "error",
      "unicorn/no-nonstandard-builtin-properties": "error",
      "unicorn/no-object-as-default-parameter": "error",
      "unicorn/no-object-methods-with-collections": "error",
      "unicorn/no-optional-chaining-on-undeclared-variable": "error",
      "unicorn/no-process-exit": "error",
      "unicorn/no-redundant-comparison": "error",
      "unicorn/no-return-array-push": "error",
      "unicorn/no-selector-as-dom-name": "error",
      "unicorn/no-single-promise-in-promise-methods": "error",
      "unicorn/no-static-only-class": "error",
      "unicorn/no-subtraction-comparison": "error",
      "unicorn/no-thenable": "error",
      "unicorn/no-this-assignment": "error",
      "unicorn/no-this-outside-of-class": "error",
      "unicorn/no-top-level-assignment-in-function": "error",
      "unicorn/no-top-level-side-effects": "error",
      "unicorn/no-typeof-undefined": "error",
      "unicorn/no-uncalled-method": "error",
      "unicorn/no-undeclared-class-members": "error",
      "unicorn/no-unnecessary-array-flat-depth": "error",
      "unicorn/no-unnecessary-array-flat-map": "error",
      "unicorn/no-unnecessary-array-splice-count": "error",
      "unicorn/no-unnecessary-await": "error",
      "unicorn/no-unnecessary-boolean-comparison": "error",
      "unicorn/no-unnecessary-fetch-options": "error",
      "unicorn/no-unnecessary-global-this": "error",
      "unicorn/no-unnecessary-nested-ternary": "error",
      "unicorn/no-unnecessary-polyfills": "error",
      "unicorn/no-unnecessary-slice-end": "error",
      "unicorn/no-unnecessary-splice": "error",
      "unicorn/no-unreadable-array-destructuring": "error",
      "unicorn/no-unreadable-for-of-expression": "error",
      "unicorn/no-unreadable-iife": "error",
      "unicorn/no-unreadable-object-destructuring": "error",
      "unicorn/no-unsafe-buffer-conversion": "error",
      "unicorn/no-unsafe-promise-all-settled-values": "error",
      "unicorn/no-unsafe-property-key": "error",
      "unicorn/no-unsafe-string-replacement": "error",
      "unicorn/no-unused-array-method-return": "error",
      "unicorn/no-useless-boolean-cast": "error",
      "unicorn/no-useless-coercion": "error",
      "unicorn/no-useless-collection-argument": "error",
      "unicorn/no-useless-compound-assignment": "error",
      "unicorn/no-useless-concat": "error",
      "unicorn/no-useless-continue": "error",
      "unicorn/no-useless-delete-check": "error",
      "unicorn/no-useless-else": "error",
      "unicorn/no-useless-error-capture-stack-trace": "error",
      "unicorn/no-useless-fallback-in-spread": "error",
      "unicorn/no-useless-iterator-to-array": "error",
      "unicorn/no-useless-length-check": "error",
      "unicorn/no-useless-logical-operand": "error",
      "unicorn/no-useless-override": "error",
      "unicorn/no-useless-promise-resolve-reject": "error",
      "unicorn/no-useless-recursion": "error",
      "unicorn/no-useless-spread": "error",
      "unicorn/no-useless-switch-case": "error",
      "unicorn/no-useless-template-literals": "error",
      "unicorn/no-xor-as-exponentiation": "error",
      "unicorn/no-zero-fractions": "error",
      "unicorn/number-literal-case": "error",
      "unicorn/numeric-separators-style": "error",
      "unicorn/operator-assignment": "error",
      "unicorn/prefer-abort-signal-any": "error",
      "unicorn/prefer-abort-signal-timeout": "error",
      "unicorn/prefer-add-event-listener": "error",
      "unicorn/prefer-add-event-listener-options": "error",
      "unicorn/prefer-aggregate-error": "error",
      "unicorn/prefer-array-find": "error",
      "unicorn/prefer-array-flat": "error",
      "unicorn/prefer-array-flat-map": "error",
      "unicorn/prefer-array-from-async": "error",
      "unicorn/prefer-array-from-map": "error",
      "unicorn/prefer-array-from-range": "error",
      "unicorn/prefer-array-index-of": "error",
      "unicorn/prefer-array-iterable-methods": "error",
      "unicorn/prefer-array-last-methods": "error",
      "unicorn/prefer-array-slice": "error",
      "unicorn/prefer-array-some": "error",
      "unicorn/prefer-at": "error",
      "unicorn/prefer-await": "error",
      "unicorn/prefer-bigint-literals": "error",
      "unicorn/prefer-blob-reading-methods": "error",
      "unicorn/prefer-block-statement-over-iife": "error",
      "unicorn/prefer-boolean-return": "error",
      "unicorn/prefer-class-fields": "error",
      "unicorn/prefer-classlist-toggle": "error",
      "unicorn/prefer-code-point": "error",
      "unicorn/prefer-continue": "error",
      "unicorn/prefer-date-now": "error",
      "unicorn/prefer-default-parameters": "error",
      "unicorn/prefer-direct-iteration": "error",
      "unicorn/prefer-dom-node-append": "error",
      "unicorn/prefer-dom-node-remove": "error",
      "unicorn/prefer-dom-node-replace-children": "error",
      "unicorn/prefer-dom-node-text-content": "error",
      "unicorn/prefer-early-return": "error",
      "unicorn/prefer-else-if": "error",
      "unicorn/prefer-event-target": "error",
      "unicorn/prefer-export-from": "error",
      "unicorn/prefer-flat-math-min-max": "error",
      "unicorn/prefer-get-or-insert-computed": "error",
      "unicorn/prefer-global-number-constants": "error",
      "unicorn/prefer-global-this": "error",
      "unicorn/prefer-group-by": "error",
      "unicorn/prefer-has-check": "error",
      "unicorn/prefer-hoisting-branch-code": "error",
      "unicorn/prefer-https": "error",
      "unicorn/prefer-identifier-import-export-specifiers": "error",
      "unicorn/prefer-includes": "error",
      "unicorn/prefer-includes-over-repeated-comparisons": "error",
      "unicorn/prefer-iterable-in-constructor": "error",
      "unicorn/prefer-iterator-helpers": "error",
      "unicorn/prefer-iterator-to-array": "error",
      "unicorn/prefer-iterator-to-array-at-end": "error",
      "unicorn/prefer-keyboard-event-key": "error",
      "unicorn/prefer-location-assign": "error",
      "unicorn/prefer-logical-operator-over-ternary": "error",
      "unicorn/prefer-map-from-entries": "error",
      "unicorn/prefer-math-abs": "error",
      "unicorn/prefer-math-constants": "error",
      "unicorn/prefer-math-min-max": "error",
      "unicorn/prefer-math-trunc": "error",
      "unicorn/prefer-minimal-ternary": "error",
      "unicorn/prefer-modern-dom-apis": "error",
      "unicorn/prefer-modern-math-apis": "error",
      "unicorn/prefer-module": "error",
      "unicorn/prefer-native-coercion-functions": "error",
      "unicorn/prefer-negative-index": "error",
      "unicorn/prefer-node-protocol": "error",
      "unicorn/prefer-number-coercion": "error",
      "unicorn/prefer-number-is-safe-integer": "error",
      "unicorn/prefer-number-properties": "error",
      "unicorn/prefer-object-define-properties": "error",
      "unicorn/prefer-object-destructuring-defaults": "error",
      "unicorn/prefer-object-from-entries": "error",
      "unicorn/prefer-object-iterable-methods": "error",
      "unicorn/prefer-observer-apis": "error",
      "unicorn/prefer-optional-catch-binding": "error",
      "unicorn/prefer-path2d": "error",
      "unicorn/prefer-private-class-fields": "error",
      "unicorn/prefer-promise-try": "error",
      "unicorn/prefer-promise-with-resolvers": "error",
      "unicorn/prefer-prototype-methods": "error",
      "unicorn/prefer-query-selector": "error",
      "unicorn/prefer-queue-microtask": "error",
      "unicorn/prefer-reflect-apply": "error",
      "unicorn/prefer-regexp-test": "error",
      "unicorn/prefer-response-static-json": "error",
      "unicorn/prefer-scoped-selector": "error",
      "unicorn/prefer-set-has": "error",
      "unicorn/prefer-set-methods": "error",
      "unicorn/prefer-set-size": "error",
      "unicorn/prefer-simple-condition-first": "error",
      "unicorn/prefer-simple-sort-comparator": "error",
      "unicorn/prefer-simplified-conditions": "error",
      "unicorn/prefer-single-array-predicate": "error",
      "unicorn/prefer-single-call": "error",
      "unicorn/prefer-single-object-destructuring": "error",
      "unicorn/prefer-single-replace": "error",
      "unicorn/prefer-smaller-scope": "error",
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
      "unicorn/prefer-toggle-attribute": "error",
      "unicorn/prefer-type-error": "error",
      "unicorn/prefer-type-literal-last": "error",
      "unicorn/prefer-unary-minus": "error",
      "unicorn/prefer-unicode-code-point-escapes": "error",
      "unicorn/prefer-url-can-parse": "error",
      "unicorn/prefer-url-href": "error",
      "unicorn/prefer-url-search-parameters": "error",
      "unicorn/prefer-while-loop-condition": "error",
      "unicorn/relative-url-style": "error",
      "unicorn/require-array-join-separator": "error",
      "unicorn/require-array-sort-compare": "error",
      "unicorn/require-css-escape": "error",
      "unicorn/require-module-attributes": "error",
      "unicorn/require-module-specifiers": "error",
      "unicorn/require-number-to-fixed-digits-argument": "error",
      "unicorn/require-passive-events": "error",
      "unicorn/require-proxy-trap-boolean-return": "error",
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
    // unicorn v65 からファイル名に加えてディレクトリ名もチェック対象となったが、
    // ignore オプションはマッチしたセグメントを含むファイル全体をスキップするため
    // ファイル名チェック自体まで無効化してしまう。
    // そのため checkDirectories: false でディレクトリ名チェックのみ無効化する。
    // src 等の慣習的なディレクトリ名でエラーが起きる問題もこれで解消される。
    // __tests__ や __mocks__ 等のダブルアンダースコアディレクトリは引き続き
    // ignore で対象外とする（テストファイル等はファイル名チェックも不要なため）。
    rules: {
      "unicorn/filename-case": [
        "error",
        { checkDirectories: false, ignore: [/^__[\w-]+__$/] },
      ],
    },
  },
  {
    // Vue コンポーネントは PascalCase の命名規則が慣習であるため、
    // .vue ファイルに限り pascalCase を適用する。
    // unicorn/filename-case のルールは ESLint flat config の「最後に定義したルールが勝つ」
    // 仕様により、プロジェクト側でオーバーライドするとここで設定した checkDirectories: false
    // も上書きされてしまう。
    // そのため、プロジェクト側で filename-case を再定義せずにこのデフォルト設定を
    // 使い続けられるよう、あらかじめ checkDirectories: false も含めて設定する。
    files: ["**/*.vue"],
    rules: {
      "unicorn/filename-case": [
        "error",
        { case: "pascalCase", checkDirectories: false },
      ],
    },
  },
  {
    ignores: ["dist", "output", "node_modules", "data", "logs", "coverage"],
  },
  eslintPrettier
);

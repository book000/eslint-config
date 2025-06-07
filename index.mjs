import { FlatCompat } from "@eslint/eslintrc";
import tseslintParser from "@typescript-eslint/parser";
import eslintPrettier from "eslint-config-prettier";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import tseslint from "typescript-eslint";

const compat = new FlatCompat();

export default tseslint.config(
  ...compat.extends("eslint-config-standard"),
  ...tseslint.configs.recommended,
  // @ts-expect-error flat/recommendedの返すpluginsがstring[]なことでエラーになるため
  unicorn.configs["flat/recommended"],
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
      // トップレベルのawaitを許可する
      "unicorn/prefer-top-level-await": "off",
      // 省略形を許可する (dev -> development, prod -> productionなどの変換をさせない)
      "unicorn/prevent-abbreviations": "off",
      // nullを許可する
      "unicorn/no-null": "off",
      // 無駄なundefinedを許可する
      "unicorn/no-useless-undefined": "off",
    },
  },
  {
    ignores: ["dist", "output", "node_modules", "data", "logs", "coverage"],
  },
  eslintPrettier
);

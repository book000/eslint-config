// @ts-check
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
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowNumber: true,
          allowBoolean: true,
          allowAny: true,
          allowNullish: true,
        },
      ],
      "@typescript-eslint/no-floating-promises": [
        "error",
        {
          ignoreVoid: true,
          ignoreIIFE: true,
        },
      ],
      "unicorn/prefer-top-level-await": "off",
      "unicorn/no-null": "off",
    },
  },
  {
    ignores: ["dist", "output", "node_modules", "data", "logs"],
  },
  eslintPrettier
);

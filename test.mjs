// Node.jsスクリプトでESLint flat config(index.mjs)の動作を検証するサンプル
import { exec } from "child_process";
import fs from "fs";
import path from "path";

async function main() {
  const testCases = [
    {
      name: "prefer-top-level-await: トップレベルawaitはOK",
      code: "await Promise.resolve(1);",
      shouldError: false,
      rules: ["unicorn/prefer-top-level-await"],
    },
    {
      name: "prevent-abbreviations: dev, prodなど省略形はOK",
      code: "const dev = true; const prod = false;",
      shouldError: false,
      rules: ["unicorn/prevent-abbreviations"],
    },
    {
      name: "no-null: nullの使用はOK",
      code: "const a = null;",
      shouldError: false,
      rules: ["unicorn/no-null"],
    },
    {
      name: "no-use-before-define: 定義前の変数使用はエラー",
      code: "console.log(a); const a = 1;",
      shouldError: true,
      rules: ["@typescript-eslint/no-use-before-define"],
    },
    {
      name: "no-use-before-define: 定義後の変数使用はOK",
      code: "const a = 1; console.log(a);",
      shouldError: false,
      rules: ["@typescript-eslint/no-use-before-define"],
    },
    {
      name: "no-explicit-any: any型の使用はOK",
      code: "let a: any = 1; a = 'str';",
      shouldError: false,
      rules: ["@typescript-eslint/no-explicit-any"],
    },
    {
      name: "no-unsafe-assignment: unsafeな代入はOK",
      code: "function f(x: any) { const y: number = x; }",
      shouldError: false,
      rules: ["@typescript-eslint/no-unsafe-assignment"],
    },
    {
      name: "no-unsafe-argument: unsafeな引数はOK",
      code: "function f(x: number) {} f(({} as any));",
      shouldError: false,
      rules: ["@typescript-eslint/no-unsafe-argument"],
    },
    {
      name: "restrict-template-expressions: number, boolean, any, nullishはOK",
      code: "const n = 1; const b = true; const a: any = 2; const u = undefined; `${n}${b}${a}${u}`;",
      shouldError: false,
      rules: ["@typescript-eslint/restrict-template-expressions"],
    },
    {
      name: "restrict-template-expressions: numberはOK",
      code: "const n = 42; `${n}`;",
      shouldError: false,
      rules: ["@typescript-eslint/restrict-template-expressions"],
    },
    {
      name: "restrict-template-expressions: booleanはOK",
      code: "const b = true; `${b}`;",
      shouldError: false,
      rules: ["@typescript-eslint/restrict-template-expressions"],
    },
    {
      name: "restrict-template-expressions: nullはOK",
      code: "const n = null; `${n}`;",
      shouldError: false,
      rules: ["@typescript-eslint/restrict-template-expressions"],
    },
    {
      name: "restrict-template-expressions: undefinedはOK",
      code: "const u = undefined; `${u}`;",
      shouldError: false,
      rules: ["@typescript-eslint/restrict-template-expressions"],
    },
    {
      name: "restrict-template-expressions: anyはOK",
      code: "const a: any = 123; `${a}`;",
      shouldError: false,
      rules: ["@typescript-eslint/restrict-template-expressions"],
    },
    {
      name: "restrict-template-expressions: objectはエラー",
      code: "const o = {}; `${o}`;",
      shouldError: true,
      rules: ["@typescript-eslint/restrict-template-expressions"],
    },
    {
      name: "restrict-template-expressions: objectはエラー(詳細)",
      code: "const o = { foo: 1 }; `${o}`;",
      shouldError: true,
      rules: ["@typescript-eslint/restrict-template-expressions"],
    },
    {
      name: "no-floating-promises: 通常のPromiseはエラー",
      code: "Promise.resolve(1);",
      shouldError: true,
      rules: ["@typescript-eslint/no-floating-promises"],
    },
    {
      name: "no-floating-promises: void演算子はOK",
      code: "void Promise.resolve(1);",
      shouldError: false,
      rules: ["@typescript-eslint/no-floating-promises"],
    },
    {
      name: "no-floating-promises: void演算子なしはエラー",
      code: "Promise.resolve(1);",
      shouldError: true,
      rules: ["@typescript-eslint/no-floating-promises"],
    },
    {
      name: "no-floating-promises: 即時関数でawaitなしはエラー",
      code: "(async () => { Promise.resolve(1); })();",
      shouldError: true,
      rules: ["@typescript-eslint/no-floating-promises"],
    },
    {
      name: "no-floating-promises: 即時関数はOK",
      code: "(async () => { await Promise.resolve(1); })();",
      shouldError: false,
      rules: ["@typescript-eslint/no-floating-promises"],
    },
    {
      name: "no-unnecessary-condition: 不要な条件式はエラー",
      code: "if (true) { console.log(1); }",
      shouldError: true,
      rules: ["@typescript-eslint/no-unnecessary-condition"],
    },
    {
      name: "no-unnecessary-condition: 無限ループ条件はOK",
      code: "while (true) { break; }",
      shouldError: false,
      rules: ["@typescript-eslint/no-unnecessary-condition"],
    },
    {
      name: "no-extraneous-class: 名前空間的クラスはOK",
      code: "class Namespace {}",
      shouldError: false,
      rules: ["@typescript-eslint/no-extraneous-class"],
    },
  ];

  // テスト用一時ファイルをsrc/配下に作成することで、flat configのfiles: ["**/*.ts"]に確実にマッチさせる
  const tmpDir = path.join(process.cwd(), "src", "__tmp__cli");
  if (!fs.existsSync(path.join(process.cwd(), "src")))
    fs.mkdirSync(path.join(process.cwd(), "src"));
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

  // テスト用tsconfig.jsonを作成
  const tsconfigPath = path.join(process.cwd(), "tsconfig.json");
  fs.writeFileSync(
    tsconfigPath,
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2020",
          module: "ESNext",
          moduleResolution: "Node",
          strict: true,
          esModuleInterop: true,
          skipLibCheck: true,
        },
        include: ["src/**/*.ts", "src/**/*.tsx"],
      },
      null,
      2
    )
  );

  // テスト用にflat configファイル名をeslint.config.mjsに一時コピー
  const flatConfigPath = path.join(process.cwd(), "eslint.config.mjs");
  fs.copyFileSync(path.join(process.cwd(), "index.mjs"), flatConfigPath);

  // 並列実行用のPromise配列
  const promises = testCases.map((testCase, i) => {
    return new Promise((resolve) => {
      const { name, code, shouldError, rules } = testCase;
      const kebabName = `test-${i}.ts`;
      const tmpFilePath = path.join(tmpDir, kebabName);
      fs.writeFileSync(tmpFilePath, code);
      exec(
        `npx eslint --no-cache --ext .ts ${tmpFilePath}`,
        (error, stdout, stderr) => {
          const output = (stdout || "") + (stderr || "");
          // テスト項目ごとに対象ルールのみを判定
          const errorLines = output
            .split("\n")
            .filter((line) => line.match(/error/));
          let errorCount = 0;
          let ignoredErrors = [];
          const relevantErrors = [];
          for (const line of errorLines) {
            const ruleMatch = line.match(/\s([\w@\-/]+)$/);
            const rule = ruleMatch ? ruleMatch[1] : null;
            if (rule && rules.includes(rule)) {
              errorCount = 1;
              relevantErrors.push(line);
            } else {
              ignoredErrors.push(line);
            }
          }
          fs.unlinkSync(tmpFilePath);
          resolve({
            name,
            shouldError,
            errorCount,
            output,
            relevantErrors,
            ignoredErrors,
          });
        }
      );
    });
  });

  const results = await Promise.all(promises);
  let pass = 0,
    fail = 0;
  for (const {
    name,
    shouldError,
    errorCount,
    output,
    relevantErrors,
    ignoredErrors,
  } of results) {
    if (shouldError ? errorCount > 0 : errorCount === 0) {
      console.log(`✅ ${name}`);
      pass++;
    } else {
      console.error(
        `❌ ${name} (期待: ${shouldError ? "エラー" : "OK"}, 実際: ${
          errorCount > 0 ? "エラー" : "OK"
        })`
      );
      fail++;
    }
    if (relevantErrors && relevantErrors.length > 0) {
      console.error(`  対象ルールのエラー:`);
      relevantErrors.forEach((e) => console.error(`    ${e}`));
    }
    if (ignoredErrors && ignoredErrors.length > 0) {
      console.warn(`  無視したエラー:`);
      ignoredErrors.forEach((e) => console.warn(`    ${e}`));
    }
  }

  fs.unlinkSync(flatConfigPath);
  fs.rmSync(tmpDir, { recursive: true });
  fs.unlinkSync(tsconfigPath);
  console.log("\n--- サマリ ---");
  console.log(`成功: ${pass} / 失敗: ${fail} / 合計: ${testCases.length}`);
}

if (process.env.CI || process.env.TEST_CLI) {
  await main();
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

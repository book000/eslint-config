// Node.jsスクリプトでESLint flat config(index.mjs)の動作を検証するサンプル
import { execFile } from "child_process";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

async function main() {
  const testCases = [
    {
      name: "prefer-top-level-await: トップレベルawaitはOK",
      code: "await Promise.resolve(1);",
      shouldError: false,
      rules: ["unicorn/prefer-top-level-await"],
    },
    {
      name: "name-replacements: dev, prodなど省略形はOK",
      code: "const dev = true; const prod = false;",
      shouldError: false,
      rules: ["unicorn/name-replacements"],
    },
    {
      name: "no-null: nullの使用はOK",
      code: "const a = null;",
      shouldError: false,
      rules: ["unicorn/no-null"],
    },
    {
      name: "no-array-reduce: reduceの使用はOK",
      code: "const sum = [1, 2, 3].reduce((accumulator, value) => accumulator + value, 0);",
      shouldError: false,
      rules: ["unicorn/no-array-reduce"],
    },
    {
      name: "consistent-function-scoping: 外側スコープを捕捉するネストした関数はOK",
      code: "function outer() { const base = 1; function inner() { return base; } return inner(); }",
      shouldError: false,
      rules: ["unicorn/consistent-function-scoping"],
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
    {
      name: "no-useless-undefined: 無駄なundefinedはOK",
      code: "function f(x = undefined) { return undefined; }",
      shouldError: false,
      rules: ["unicorn/no-useless-undefined"],
    },
    {
      name: "catch-error-name: catch ブロックで error を使用するのは OK",
      code: "try { throw new Error(); } catch (error) { console.log(error); }",
      shouldError: false,
      rules: ["unicorn/catch-error-name"],
    },
    {
      name: "catch-error-name: catch ブロックで e など error/err 以外を使用するのはエラー",
      code: "try { throw new Error(); } catch (e) { console.log(e); }",
      shouldError: true,
      rules: ["unicorn/catch-error-name"],
    },
    {
      name: "catch-error-name: err を使用するのは OK（常に許容）",
      code: "try { throw new Error(); } catch (err) { console.log(err); }",
      shouldError: false,
      rules: ["unicorn/catch-error-name"],
    },
    {
      name: "catch-error-name: スコープ内に error 変数があるときに err を使用するのは OK（重複回避）",
      code: "const error = 'msg'; try { throw new Error(); } catch (err) { console.log(error, err); }",
      shouldError: false,
      rules: ["unicorn/catch-error-name"],
    },
    {
      name: "filename-case: __tests__ ディレクトリはケースチェック対象外（OK）",
      code: "export const a = 1;",
      shouldError: false,
      rules: ["unicorn/filename-case"],
      dir: "__tests__",
    },
    {
      name: "filename-case: __mocks__ ディレクトリはケースチェック対象外（OK）",
      code: "export const a = 1;",
      shouldError: false,
      rules: ["unicorn/filename-case"],
      dir: "__mocks__",
    },
    {
      name: "filename-case: src ディレクトリはケースチェック対象外（OK）",
      code: "export const a = 1;",
      shouldError: false,
      rules: ["unicorn/filename-case"],
      dir: "src",
    },
    {
      name: "consistent-class-member-order: public フィールドの後に private フィールドが来てもエラーにならない（OK）",
      code: "class Foo { public name: string = 'foo'; private id: number = 1; }",
      shouldError: false,
      rules: ["unicorn/consistent-class-member-order"],
    },
    {
      name: "prefer-await: .then() チェーンを使う非asyncな薄いラッパー関数はOK",
      code: "function getValue(): Promise<number> { return Promise.resolve(1).then((value) => value); }",
      shouldError: false,
      rules: ["unicorn/prefer-await"],
    },
    {
      name: "consistent-boolean-name: is/has等のプレフィックスがない真偽値変数名はOK",
      code: "const enabled: boolean = true;",
      shouldError: false,
      rules: ["unicorn/consistent-boolean-name"],
    },
    {
      name: "no-non-function-verb-prefix: 動詞プレフィックスを持つ非関数の変数名はOK",
      code: "const removeButton = 1;",
      shouldError: false,
      rules: ["unicorn/no-non-function-verb-prefix"],
    },
    {
      name: "prefer-number-coercion: parseInt による数値変換はOK",
      code: "const n = parseInt('1', 10);",
      shouldError: false,
      rules: ["unicorn/prefer-number-coercion"],
    },
    {
      name: "no-top-level-assignment-in-function: トップレベル変数へのキャッシュ代入はOK",
      code: "let cache: number | undefined; function setCache(): void { cache = 1; }",
      shouldError: false,
      rules: ["unicorn/no-top-level-assignment-in-function"],
    },
    {
      name: "prefer-unicode-code-point-escapes: \\uXXXX形式のエスケープはOK",
      code: "const s = '\\u00e9';",
      shouldError: false,
      rules: ["unicorn/prefer-unicode-code-point-escapes"],
    },
    {
      name: "no-break-in-nested-loop: ネストしたループ内のbreakによる早期脱出はOK",
      code: "for (let i = 0; i < 3; i++) { for (let j = 0; j < 3; j++) { if (j === 1) break; } }",
      shouldError: false,
      rules: ["unicorn/no-break-in-nested-loop"],
    },
    {
      name: "class-reference-in-static-methods: staticメソッド内での非呼び出し位置のクラス名参照はOK",
      code: "class Foo { static bar = 1; static create(): number { return Foo.bar; } }",
      shouldError: false,
      rules: ["unicorn/class-reference-in-static-methods"],
    },
    {
      name: "prefer-while-loop-condition: while(true) + 内部breakによる終了判定はOK",
      code: "let i = 0; while (true) { if (i >= 5) break; i++; }",
      shouldError: false,
      rules: ["unicorn/prefer-while-loop-condition"],
    },
    {
      name: "prefer-location-assign: location.hrefへの代入はOK",
      code: "location.href = 'https://example.com';",
      shouldError: false,
      rules: ["unicorn/prefer-location-assign"],
    },
    {
      name: "max-nested-calls: スキーマ定義等のメソッドチェーンによる深いネストはOK",
      code: "function a(x: number) { return b(x); } function b(x: number) { return c(x); } function c(x: number) { return d(x); } function d(x: number) { return x; } const result = a(b(c(d(1))));",
      shouldError: false,
      rules: ["unicorn/max-nested-calls"],
    },
    {
      name: "no-global-object-property-assignment: globalThisプロパティへの代入（テストのモック等）はOK",
      code: "globalThis.fetch = (() => Promise.resolve(new Response())) as typeof fetch;",
      shouldError: false,
      rules: ["unicorn/no-global-object-property-assignment"],
    },
    {
      name: "filename-case: checkDirectories: false のため kebab-case でないディレクトリ名もエラーにならない（OK）",
      code: "export const a = 1;",
      shouldError: false,
      rules: ["unicorn/filename-case"],
      dir: "notKebabCaseDir",
    },
  ];

  // テスト用一時ファイルをsrc/配下に作成することで、flat configのfiles: ["**/*.ts"]に確実にマッチさせる
  const srcDir = path.join(process.cwd(), "src");
  const tmpDir = path.join(srcDir, "__tmp__cli");
  if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir);
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

  // テストケースごとに dir（src 配下の任意のディレクトリ名）が指定されていれば、
  // unicorn/filename-case のディレクトリ名チェックを検証するために作成する
  const extraDirs = new Set(
    testCases
      .map((testCase) => testCase.dir)
      .filter((dir) => dir && dir !== "__tmp__cli")
  );
  // クリーンアップ時に削除してよいのは、このテストで新規に作成したディレクトリのみとする
  // （既存の src/__tests__ 等を誤って削除しないようにするため）
  const createdExtraDirs = new Set();
  for (const dir of extraDirs) {
    const dirPath = path.join(srcDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      createdExtraDirs.add(dir);
    }
  }

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

  // テスト用一時ファイルをすべて書き出す (プロセス起動は後で 1 回だけ行う)
  const tmpFilePaths = testCases.map((testCase, i) => {
    const { code, dir } = testCase;
    const kebabName = `test-${i}.ts`;
    const targetDir = dir ? path.join(srcDir, dir) : tmpDir;
    const tmpFilePath = path.join(targetDir, kebabName);
    fs.writeFileSync(tmpFilePath, code);
    return tmpFilePath;
  });

  // 全テストケースを 1 回の eslint 起動でまとめて検証する。
  // 以前はテストケースごとに `npx eslint` を並列起動していたため、
  // type-aware (typescript-eslint) なパーサ初期化がテストケース数分同時に走り、
  // メモリ枯渇・OOM killer の引き金になっていた。
  // 1 プロセス・1 回の TypeScript プログラム初期化にまとめることで、
  // プロセス数をテストケース数から 1 に減らし、メモリ使用量を大幅に下げる。
  const eslintBinPath = path.join(
    process.cwd(),
    "node_modules",
    "eslint",
    "bin",
    "eslint.js"
  );
  let jsonOutput = "";
  try {
    const { stdout } = await execFileAsync(
      process.execPath,
      [
        eslintBinPath,
        "--no-cache",
        "--ext",
        ".ts",
        "--format",
        "json",
        ...tmpFilePaths,
      ],
      { maxBuffer: 1024 * 1024 * 50 }
    );
    jsonOutput = stdout;
  } catch (error) {
    // eslint はテストケースに期待どおりのエラーがあると非ゼロの exit code を返すが、
    // これはテストとして期待される挙動なので、JSON 形式の stdout が取れていれば
    // 正常系として扱う。設定エラー等で stdout に JSON が出力されない場合は
    // ここでは判別せず、後続の JSON.parse で例外として検出させる。
    if (error.stdout) {
      jsonOutput = error.stdout;
    } else {
      throw error;
    }
  }

  const eslintResults = JSON.parse(jsonOutput);
  const resultsByFilePath = new Map(
    eslintResults.map((result) => [result.filePath, result])
  );

  const results = testCases.map((testCase, i) => {
    const { name, shouldError, rules } = testCase;
    const tmpFilePath = tmpFilePaths[i];
    const fileResult = resultsByFilePath.get(tmpFilePath);
    if (!fileResult) {
      // 対象ファイルが eslint の結果に存在しない場合、空メッセージとして
      // 握りつぶすと「エラー 0 件 = OK」と誤ってパスしてしまう。
      // ファイルが実際には lint されていないことを示すため、例外として検出する。
      throw new Error(
        `ESLint did not return a result for temp file: ${tmpFilePath}`
      );
    }

    let errorCount = 0;
    const relevantErrors = [];
    const ignoredErrors = [];
    for (const message of fileResult.messages) {
      const severityLabel = message.severity === 2 ? "error" : "warning";
      const line = `  ${message.line}:${message.column}  ${severityLabel}  ${message.message}  ${message.ruleId ?? ""}`;
      if (message.ruleId && rules.includes(message.ruleId)) {
        errorCount = 1;
        relevantErrors.push(line);
      } else {
        ignoredErrors.push(line);
      }
    }

    fs.unlinkSync(tmpFilePath);
    return { name, shouldError, errorCount, relevantErrors, ignoredErrors };
  });
  let pass = 0,
    fail = 0;
  for (const {
    name,
    shouldError,
    errorCount,
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
  for (const dir of createdExtraDirs) {
    fs.rmSync(path.join(srcDir, dir), { recursive: true });
  }
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

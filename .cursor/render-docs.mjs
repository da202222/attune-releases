import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import MarkdownIt from "markdown-it";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

const source = await readFile(join(repoRoot, "README.md"), "utf8");
const rendered = md.render(source);

if (!rendered.trim()) {
  console.error("README.md rendered to empty output");
  process.exit(1);
}

if (checkOnly) {
  console.log(`README.md renders OK (${rendered.length} bytes of HTML).`);
  process.exit(0);
}

const outDir = join(repoRoot, "dist");
await mkdir(outDir, { recursive: true });
const html = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8" />
<title>Attune 下载</title></head><body><main>${rendered}</main></body></html>`;
await writeFile(join(outDir, "index.html"), html, "utf8");
console.log(`Wrote ${join(outDir, "index.html")}`);

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import MarkdownIt from "markdown-it";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const host = process.env.HOST ?? "0.0.0.0";
const port = Number(process.env.PORT ?? 8080);

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

function page(title, body) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<style>
  :root { color-scheme: light dark; }
  body { max-width: 760px; margin: 3rem auto; padding: 0 1.25rem;
    font: 16px/1.7 -apple-system, "Segoe UI", "Noto Sans SC", system-ui, sans-serif; }
  h1, h2, h3 { line-height: 1.3; }
  a { color: #2563eb; }
  code { background: rgba(127,127,127,.18); padding: .1em .35em; border-radius: 4px; }
  hr { border: none; border-top: 1px solid rgba(127,127,127,.3); margin: 2rem 0; }
  .meta { color: #888; font-size: .85rem; margin-top: 3rem; }
</style>
</head>
<body>
<main>${body}</main>
<p class="meta">Live preview - re-rendered on each request. Edit the source Markdown and refresh.</p>
</body>
</html>`;
}

const server = createServer(async (req, res) => {
  try {
    const source = await readFile(join(repoRoot, "README.md"), "utf8");
    const html = page("Attune 下载 - 预览", md.render(source));
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(html);
  } catch (err) {
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end(`Failed to render docs: ${err.message}`);
  }
});

server.listen(port, host, () => {
  console.log(`Docs preview running at http://${host}:${port}/`);
});

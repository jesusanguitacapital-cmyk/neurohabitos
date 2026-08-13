import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the NeuroHabitos mobile shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>NeuroHabitos<\/title>/i);
  assert.match(html, /<html lang="es">/i);
  assert.match(html, /id="quickAddButton"/);
  assert.match(html, /id="view-habits"/);
  assert.match(html, /id="view-neuro"/);
  assert.match(html, /NeuroHabitos/);
  assert.match(html, /Hoy/);
  assert.doesNotMatch(html, /Your site is taking shape/i);
});

test("bundles the static habit app assets into the route", async () => {
  const [page, layout, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../styles.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /import htmlSource from "\.\.\/index\.html\?raw"/);
  assert.match(page, /import cssSource from "\.\.\/styles\.css\?raw"/);
  assert.match(page, /import scriptSource from "\.\.\/app\.js\?raw"/);
  assert.match(page, /id="neurohabitos-runtime"/);
  assert.doesNotMatch(page, /readFileSync|process\.cwd|resolve\(/);
  assert.match(layout, /title:\s*"NeuroHabitos"/);
  assert.match(
    layout,
    /App movil-first para crear, seguir y entender habitos conectados/,
  );
  assert.match(css, /\.phone-frame\s*\{/);
  assert.match(css, /\.habit-card\s*\{/);
  assert.match(css, /\.bottom-nav\s*\{/);
});

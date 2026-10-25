import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const read = (p) => readFileSync(p, "utf8");

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

test("GitHub Pages files are in public/", () => {
  assert.equal(read("public/CNAME").trim(), "ilghar.studio");
  for (const f of [".nojekyll", "robots.txt", "sitemap.xml", "site.webmanifest", "apple-touch-icon.png", "media/blade.mp4", "media/blade-poster.jpg"]) {
    assert.ok(existsSync(join("public", f)), `missing public/${f}`);
  }
  assert.match(read("public/robots.txt"), /Sitemap: https:\/\/ilghar\.studio\/sitemap\.xml/);
  const sitemap = read("public/sitemap.xml");
  assert.match(sitemap, /<loc>https:\/\/ilghar\.studio\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/ilghar\.studio\/de\/<\/loc>/);
});

test("no hosting-platform leftovers in source or config", () => {
  const files = [...walk("src"), ...walk("public").filter((f) => /\.(webmanifest|txt|xml|svg|html)$/.test(f)), "vite.config.ts", "package.json"];
  for (const f of files) {
    assert.doesNotMatch(read(f), /grok|__grok|og\.grok\.me|app-env|better-auth|pglite/i, f);
  }
});

test("every local asset path in profile.ts exists", () => {
  const src = read("src/lib/profile.ts").replace(/\$\{V\}/g, "16");
  const paths = [...src.matchAll(/"(\/[^"?]+\.(?:jpg|png|webp|mp4|pdf))/g)].map((m) => m[1]);
  assert.ok(paths.length > 5);
  for (const p of paths) assert.ok(existsSync(join("public", p)), `missing public${p}`);
});

test("both pages declare canonical and hreflang", () => {
  const seo = read("src/lib/seo.ts");
  for (const s of ['rel: "canonical"', 'hrefLang: "en"', 'hrefLang: "de"', 'hrefLang: "x-default"']) assert.ok(seo.includes(s), s);
  assert.match(read("src/routes/de/index.tsx"), /pageHead\("de"\)/);
  assert.match(read("src/routes/index.tsx"), /pageHead\("en"\)/);
});

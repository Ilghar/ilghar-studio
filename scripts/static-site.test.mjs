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
  assert.match(sitemap, /<loc>https:\/\/ilghar\.studio\/cv\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/ilghar\.studio\/portfolio\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/ilghar\.studio\/de\/cv\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/ilghar\.studio\/de\/portfolio\/<\/loc>/);
});

test("no hosting-platform leftovers in source or config", () => {
  const files = [...walk("src"), ...walk("public").filter((f) => /\.(webmanifest|txt|xml|svg|html)$/.test(f)), "vite.config.ts", "package.json"];
  for (const f of files) {
    assert.doesNotMatch(read(f), /grok|__grok|og\.grok\.me|app-env|better-auth|pglite/i, f);
  }
});

test("every local asset path in profile.ts exists", () => {
  const src = read("src/lib/profile.ts").replace(/\$\{V\}/g, "16");
  const paths = [...src.matchAll(/"(\/[^"?]+\.(?:jpg|png|webp|svg|mp4|pdf))/g)].map((m) => m[1]);
  assert.ok(paths.length > 5);
  for (const p of paths) assert.ok(existsSync(join("public", p)), `missing public${p}`);
});

test("both pages declare canonical and hreflang", () => {
  const seo = read("src/lib/seo.ts");
  for (const s of ['rel: "canonical"', 'hrefLang: "en"', 'hrefLang: "de"', 'hrefLang: "x-default"']) assert.ok(seo.includes(s), s);
  assert.match(read("src/routes/de/index.tsx"), /pageHead\("de"\)/);
  assert.match(read("src/routes/index.tsx"), /pageHead\("en"\)/);
});

test("built pages allow inline scripts only by hash", { skip: !existsSync("dist/client/index.html") }, async () => {
  const { createHash } = await import("node:crypto");
  for (const f of ["dist/client/index.html", "dist/client/de/index.html", "dist/client/cv/index.html", "dist/client/portfolio/index.html", "dist/client/de/cv/index.html", "dist/client/de/portfolio/index.html", "dist/client/404.html"]) {
    const html = read(f);
    const csp = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1];
    assert.ok(csp, `${f} has no CSP meta`);
    const scriptSrc = csp.split(";").find((d) => d.trim().startsWith("script-src"));
    assert.doesNotMatch(scriptSrc, /unsafe-inline/, f);
    for (const m of html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
      if (!m[1]) continue;
      const h = `'sha256-${createHash("sha256").update(m[1]).digest("base64")}'`;
      assert.ok(scriptSrc.includes(h), `${f}: inline script not hashed`);
    }
  }
});

test("404 page is noindex and has no canonical", { skip: !existsSync("dist/client/404.html") }, () => {
  const html = read("dist/client/404.html");
  assert.match(html, /<meta name="robots" content="noindex"\/>/);
  assert.doesNotMatch(html, /rel="canonical"/);
});

test("built pages allow no inline styles", { skip: !existsSync("dist/client/index.html") }, () => {
  for (const f of ["dist/client/index.html", "dist/client/de/index.html", "dist/client/cv/index.html", "dist/client/portfolio/index.html", "dist/client/de/cv/index.html", "dist/client/de/portfolio/index.html", "dist/client/404.html"]) {
    const html = read(f);
    const csp = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1];
    const styleSrc = csp.split(";").find((d) => d.trim().startsWith("style-src"));
    assert.doesNotMatch(styleSrc, /unsafe-inline/, f);
    assert.doesNotMatch(html, /\sstyle="/, `${f}: static style attribute would be blocked by CSP`);
  }
});

const DOC_PAGES = [
  "dist/client/cv/index.html",
  "dist/client/portfolio/index.html",
  "dist/client/de/cv/index.html",
  "dist/client/de/portfolio/index.html",
];

test("built document pages exist and keep the original PDFs", { skip: !existsSync("dist/client/index.html") }, () => {
  for (const f of DOC_PAGES) assert.ok(existsSync(f), f);
  assert.ok(existsSync("dist/client/docs/cv-en.pdf"));
  assert.ok(existsSync("dist/client/docs/cv-de.pdf"));
  assert.ok(existsSync("dist/client/docs/portfolio-en.pdf"));
  assert.ok(existsSync("dist/client/docs/portfolio-2023.pdf"));
  assert.ok(existsSync("dist/client/docs/werkdokumentation.pdf"));
  const enCv = read("dist/client/cv/index.html");
  const deCv = read("dist/client/de/cv/index.html");
  const enPf = read("dist/client/portfolio/index.html");
  const dePf = read("dist/client/de/portfolio/index.html");
  assert.match(enCv, /href="\/docs\/cv-en\.pdf"/);
  assert.match(deCv, /href="\/docs\/cv-de\.pdf"/);
  assert.match(enPf, /href="\/docs\/portfolio-en\.pdf"/);
  assert.match(dePf, /href="\/docs\/portfolio-2023\.pdf"/);
});

test("home links to /cv, /portfolio and /demos/sabat/", { skip: !existsSync("dist/client/index.html") }, () => {
  const en = read("dist/client/index.html");
  const de = read("dist/client/de/index.html");
  assert.match(en, /href="\/cv\/"/);
  assert.match(en, /href="\/portfolio\/"/);
  assert.match(en, /href="\/demos\/sabat\/"/);
  assert.match(de, /href="\/de\/cv\/"/);
  assert.match(de, /href="\/de\/portfolio\/"/);
  assert.match(de, /href="\/demos\/sabat\/"/);
  assert.match(en, /class="hero-avatar"/);
  assert.match(de, /class="hero-avatar"/);
});

test("SÁBÁT tile uses the theme-src SVG pair", { skip: !existsSync("dist/client/index.html") }, () => {
  const en = read("dist/client/index.html");
  assert.match(en, /class="[^"]*theme-src[^"]*"/);
  assert.match(en, /data-light="\/viewers\/projects\/sabat-cover-light\.svg[^"]*"/);
  assert.match(en, /data-dark="\/viewers\/projects\/sabat-cover-dark\.svg[^"]*"/);
  assert.ok(existsSync("dist/client/viewers/projects/sabat-cover-light.svg"));
  assert.ok(existsSync("dist/client/viewers/projects/sabat-cover-dark.svg"));
});

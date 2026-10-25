/**
 * Post-build step for the static GitHub Pages output in dist/client.
 *
 * 1. Writes 404.html (a copy of the EN home page) so unknown paths still show
 *    the site.
 * 2. GitHub Pages cannot send response headers, so the Content Security Policy
 *    ships as a <meta> tag. Every inline script is allowed by its SHA-256 hash,
 *    so script-src needs no 'unsafe-inline'.
 *
 * The hydration payload can contain raw NUL characters inside JS strings. HTML
 * parsers turn those into U+FFFD, which changes the hash, so they are rewritten
 * as the equivalent "\u0000" escape before hashing.
 */
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = "dist/client";
const INLINE = /(<script(?![^>]*\ssrc=)[^>]*>)([\s\S]*?)(<\/script>)/g;

for (const page of ["index.html", "de/index.html"]) {
  if (!existsSync(`${OUT}/${page}`)) {
    console.error(`postbuild: missing ${OUT}/${page}; prerender failed`);
    process.exit(1);
  }
}
// The 404 copy must not compete with the home page in search: no canonical,
// and noindex.
writeFileSync(
  `${OUT}/404.html`,
  readFileSync(`${OUT}/index.html`, "utf8")
    .replace(/<link rel="canonical"[^>]*>/g, "")
    .replace(/<link rel="alternate" hreflang[^>]*>/g, "")
    .replace(/<head([^>]*)>/, '<head$1><meta name="robots" content="noindex"/>'),
);
console.log("postbuild: wrote 404.html");

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return name.endsWith(".html") ? [p] : [];
  });
}

// style-src is 'self' only: no static style="" attributes are rendered; dynamic
// React styles are set through CSSOM, which CSP does not block.
const STYLE_SRC = "style-src 'self'";
const FONT_SRC = "font-src 'self'";

function csp(html) {
  const hashes = new Set();
  for (const m of html.matchAll(INLINE)) {
    if (!m[2]) continue;
    hashes.add(`'sha256-${createHash("sha256").update(m[2]).digest("base64")}'`);
  }
  return [
    "default-src 'self'",
    `script-src 'self' ${[...hashes].join(" ")}`.trim(),
    STYLE_SRC,
    FONT_SRC,
    "img-src 'self' data:",
    "media-src 'self'",
    "connect-src 'self'",
    "manifest-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
}

for (const file of htmlFiles(OUT)) {
  let html = readFileSync(file, "utf8").replace(
    INLINE,
    (_, open, body, close) => open + body.replaceAll("\u0000", "\\u0000") + close,
  );
  html = html.replace(/<meta http-equiv="Content-Security-Policy"[^>]*\/?>/g, "");
  const tag = `<meta http-equiv="Content-Security-Policy" content="${csp(html)}"/>`;
  writeFileSync(file, html.replace(/<head([^>]*)>/, `<head$1>${tag}`));
  console.log(`postbuild: CSP with script hashes -> ${file}`);
}

// GitHub Pages serves dist/client as-is. Add a 404 page (a copy of the EN
// home page) so unknown paths still show the site.
import { copyFileSync, existsSync } from "node:fs";

const out = "dist/client";
for (const page of ["index.html", "de/index.html"]) {
  if (!existsSync(`${out}/${page}`)) {
    console.error(`postbuild: missing ${out}/${page}; prerender failed`);
    process.exit(1);
  }
}
copyFileSync(`${out}/index.html`, `${out}/404.html`);
console.log("postbuild: wrote 404.html");

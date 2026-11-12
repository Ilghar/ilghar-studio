import { chromium } from "playwright";
import { mkdirSync, writeFileSync, copyFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const HANDOFF = "/workspace/handoff/studio-cover-avatar";
const REPO = "/workspace/st8/docs/pr-shots/cover-avatar";
mkdirSync(HANDOFF, { recursive: true });
mkdirSync(REPO, { recursive: true });

const targets = [
  { label: "before", origin: "http://127.0.0.1:8082" },
  { label: "after", origin: "http://127.0.0.1:8081" },
];
const langs = [
  { code: "en", path: "/" },
  { code: "de", path: "/de/" },
];
const widths = [1280, 390];
const themes = ["light", "dark"];

async function waitReady(page) {
  await page.waitForFunction(() => document.fonts && document.fonts.status === "loaded", null, {
    timeout: 5000,
  }).catch(() => {});
  await page.evaluate(async () => {
    await Promise.all(
      [...document.images].filter((img) => !img.complete).map(
        (img) =>
          new Promise((resolve) => {
            img.addEventListener("load", resolve, { once: true });
            img.addEventListener("error", resolve, { once: true });
            setTimeout(resolve, 3000);
          }),
      ),
    );
  });
  await page.waitForTimeout(250);
}

async function currentSrcs(page) {
  return page.evaluate(() => {
    const theme = document.documentElement.getAttribute("data-theme");
    return [...document.querySelectorAll("picture.theme-src, picture")].map((pic, i) => {
      const img = pic.querySelector("img");
      return {
        index: i,
        theme,
        className: pic.className,
        light: pic.getAttribute("data-light"),
        dark: pic.getAttribute("data-dark"),
        src: img?.getAttribute("src"),
        currentSrc: img?.currentSrc || "",
      };
    });
  });
}

console.log("launching chrome");
const browser = await chromium.launch({
  channel: "chrome",
  args: ["--hide-scrollbars", "--font-render-hinting=none", "--mute-audio"],
});
const log = [];

try {
  for (const target of targets) {
    for (const lang of langs) {
      for (const width of widths) {
        for (const theme of themes) {
          const height = width === 1280 ? 800 : 844;
          const stem = `${target.label}_${lang.code}_${width}_${theme}`;
          console.log("start", stem);
          const context = await browser.newContext({
            viewport: { width, height },
            deviceScaleFactor: 1,
            colorScheme: theme,
            reducedMotion: "reduce",
          });
          await context.addInitScript((t) => {
            try {
              localStorage.setItem("ilghar-theme", t);
            } catch {
              /* ignore */
            }
            document.documentElement.setAttribute("data-theme", t);
            document.documentElement.classList.toggle("dark", t === "dark");
            document.documentElement.classList.toggle("light", t === "light");
            document.documentElement.style.colorScheme = t;
          }, theme);
          const page = await context.newPage();
          page.setDefaultTimeout(15000);
          await page.goto(target.origin + lang.path, { waitUntil: "load", timeout: 20000 });
          await waitReady(page);
          const homePath = join(HANDOFF, `${stem}.png`);
          const tilePath = join(HANDOFF, `${stem}_tile.png`);
          await page.screenshot({ path: homePath, fullPage: true, animations: "disabled" });
          const tile = page.locator('a[href="/demos/sabat/"]').first();
          await tile.scrollIntoViewIfNeeded();
          await page.waitForTimeout(80);
          await tile.screenshot({ path: tilePath, animations: "disabled" });
          const srcs = await currentSrcs(page);
          const sabat = srcs.filter(
            (s) =>
              `${s.light}|${s.dark}|${s.currentSrc}|${s.src}`.includes("sabat"),
          );
          log.push({ shot: stem, sabat, themeSrc: srcs.filter((s) => (s.className || "").includes("theme-src")) });
          console.log("ok", stem, JSON.stringify(sabat));
          await context.close();
        }
      }
    }
  }
} finally {
  await browser.close();
}

writeFileSync(join(HANDOFF, "currentSrc.json"), JSON.stringify(log, null, 2));
for (const name of readdirSync(HANDOFF)) {
  if (name.endsWith(".png") || name.endsWith(".json")) {
    copyFileSync(join(HANDOFF, name), join(REPO, name));
  }
}
console.log("shots written", readdirSync(HANDOFF).length);

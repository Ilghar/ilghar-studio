# ilghar.studio

Personal landing (https://ilghar.studio)  —  bilingual (EN/DE), light/dark, in-app readers for studio notes and documents.

Source: [github.com/Ilghar/ilghar-studio](https://github.com/Ilghar/ilghar-studio)

## Run locally

```bash
npm install
npm run dev
```

Then open the address printed in the terminal (port 8080).

```bash
npm run build
npm run preview
```

## Where to adjust

| What | File |
| --- | --- |
| Name, links, document lists, image paths | `src/lib/profile.ts` |
| English / German copy | `src/lib/i18n.ts` |
| Colour, type, shadows | `src/styles.css` |
| Layout, cover, cards | `src/components/link-in-bio.tsx` |
| Square plates | `src/components/frame-card.tsx` |
| In-app page viewer | `src/components/viewer.tsx` |
| Photos, PDFs, card crops | `public/` |

Images live in `public/` (cover, avatar, `viewers/`, `docs/`). After replacing a file, bump the `?v=` query on its path in `profile.ts` so the browser does not keep the old one.

## Hosting (GitHub Pages)

`npm run build` prerenders `/` (English) and `/de/` (German) to static HTML in `dist/client`. There is no server, database or sign-in. `npm run preview` serves that folder on port 8081.

`.github/workflows/pages.yml` builds and publishes `dist/client` to GitHub Pages on every push to `main`. `public/CNAME` holds the custom domain `ilghar.studio`.

## Interactive demos

Static explorers ship with the site (no backend):

| Demo | Path |
| --- | --- |
| SÁBÁT pavilion explorer | `/demos/sabat/` |
| Abstention / routing harness (P01) | `/demos/p01/` |

Self-hosted fonts and the studio PDF palette only. Frames stay within the page column. Home-page links are proposed, not added, so the current look stays unchanged until Hāèl says yes.


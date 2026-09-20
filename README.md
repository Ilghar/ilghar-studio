# ilghar.studio

Personal landing for [Ilghar Dadgostari](https://ilghar.studio) — bilingual (EN/DE), light/dark, in-app readers for studio notes and documents.

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

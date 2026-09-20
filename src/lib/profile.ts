import type { CopyKey } from "./i18n";

const V = "16";

export const profile = {
  name: "Ilghar Dadgostari",
  handle: "ilghar.studio",
  url: "https://ilghar.studio",
  email: "contact@ilghar.studio",
  avatar: `/avatar.jpg?v=${V}`,
  coverDay: `/cover-day.jpg?v=${V}`,
  coverNight: `/cover-night.jpg?v=${V}`,
} as const;

export type ViewerPage = {
  src: string;
  altEn: string;
  altDe: string;
};

function numbered(
  dir: string,
  count: number,
  altEn: string,
  altDe: string,
): ViewerPage[] {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      src: `${dir}/${n}.jpg?v=${V}`,
      altEn: `${altEn} · ${i + 1} / ${count}`,
      altDe: `${altDe} · ${i + 1} / ${count}`,
    };
  });
}

export type Collection = {
  id: string;
  lang?: "en" | "de";
  cover: string;
  title: CopyKey;
  kicker: CopyKey;
  pages?: ViewerPage[];
  href?: string;
  downloadHref?: string;
  downloadName?: string;
  featured?: boolean;
  seamless?: boolean;
  spread?: boolean;
  contain?: boolean;
  video?: string;
  strip?: string;
  stripPages?: number;
};

export const collections: Collection[] = [
  {
    id: "studio-notes",
    cover: `/viewers/notes/cover.jpg?v=${V}`,
    title: "notesTitle",
    kicker: "notesKicker",
    strip: `/n16-cover-left.jpg?v=${V}`,
    stripPages: 11,
    downloadHref: "/docs/studio-notes.pdf",
    downloadName: "Dadgostari_Studio-Notes.pdf",
    featured: true,
  },
  {
    id: "cv-de",
    lang: "de",
    cover: `/viewers/cards/cv.jpg?v=${V}`,
    title: "cvDe",
    kicker: "cvDeHint",
    pages: numbered("/viewers/cv", 1, "Lebenslauf", "Lebenslauf"),
    downloadHref: "/docs/cv-de.pdf",
    downloadName: "Dadgostari_Lebenslauf.pdf",
    spread: true,
  },
  {
    id: "cv-en",
    lang: "en",
    cover: `/viewers/cards/cv.jpg?v=${V}`,
    title: "cvEn",
    kicker: "cvEnHint",
    pages: numbered("/viewers/cv", 1, "Curriculum vitae", "Curriculum vitae"),
    downloadHref: "/docs/cv-en.pdf",
    downloadName: "Dadgostari_CV.pdf",
    spread: true,
  },
  {
    id: "werk",
    cover: `/viewers/cards/werk.jpg?v=${V}`,
    title: "werk",
    kicker: "werkHint",
    pages: numbered("/viewers/werk", 14, "Work documentation", "Werk-Dokumentation"),
    downloadHref: "/docs/werkdokumentation.pdf",
    downloadName: "Dadgostari_Werkdokumentation.pdf",
    spread: true,
  },
  {
    id: "portfolio-de",
    lang: "de",
    cover: `/viewers/cards/portfolio.jpg?v=${V}`,
    title: "portfolio",
    kicker: "portfolioDeHint",
    pages: numbered("/viewers/portfolio", 7, "Portfolio 2023", "Portfolio 2023"),
    downloadHref: "/docs/portfolio-2023.pdf",
    downloadName: "Dadgostari_Portfolio_2023.pdf",
  },
  {
    id: "portfolio-en",
    lang: "en",
    cover: `/viewers/cards/portfolio-en.jpg?v=${V}`,
    title: "portfolio",
    kicker: "portfolioEnHint",
    pages: numbered("/viewers/portfolio-en", 9, "Portfolio", "Portfolio"),
    downloadHref: "/docs/portfolio-en.pdf",
    downloadName: "Dadgostari_Portfolio.pdf",
  },
  {
    id: "arbeits",
    cover: `/viewers/cards/arbeits.jpg?v=${V}`,
    title: "workCerts",
    kicker: "workCertsHint",
    pages: numbered("/viewers/arbeits", 9, "Employment records", "Arbeitszeugnisse"),
    downloadHref: "/docs/arbeitszeugnisse.pdf",
    downloadName: "Dadgostari_Arbeitszeugnisse.pdf",
    spread: true,
  },
  {
    id: "abschluss",
    cover: `/viewers/cards/abschluss.jpg?v=${V}`,
    title: "diplomas",
    kicker: "diplomasHint",
    pages: numbered("/viewers/abschluss", 7, "Diplomas", "Abschlusszeugnisse"),
    downloadHref: "/docs/abschlusszeugnisse.pdf",
    downloadName: "Dadgostari_Abschlusszeugnisse.pdf",
    spread: true,
  },
  {
    id: "fach",
    cover: `/viewers/cards/fach.jpg?v=${V}`,
    title: "langCerts",
    kicker: "langCertsHint",
    pages: numbered("/viewers/fach", 4, "Language & professional certificates", "Sprach- & Fachzeugnisse"),
    downloadHref: "/docs/fachzeugnisse.pdf",
    downloadName: "Dadgostari_Sprach-Fachzeugnisse.pdf",
    spread: true,
  },
  {
    id: "studio",
    cover: `/viewers/studio/cover.png?v=${V}`,
    title: "studio",
    kicker: "studioHint",
    href: "https://ilghar.studio",
    contain: true,
  },
  {
    id: "blade",
    cover: `/viewers/cards/blade.jpg?v=${V}`,
    title: "blade",
    kicker: "bladeHint",
    video: "/media/blade.mp4",
    href: "https://blade-festival.de/en/",
  },
];

export const socialLinks = [
  { id: "linkedin", href: "https://www.linkedin.com/in/ilqardesign", label: "LinkedIn" },
  { id: "instagram", href: "https://www.instagram.com/cypsele_vayu/", label: "Instagram" },
  { id: "soundcloud", href: "https://soundcloud.com/ilghar-dadgostari", label: "SoundCloud" },
] as const;

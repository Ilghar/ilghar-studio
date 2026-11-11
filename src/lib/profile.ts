import type { CopyKey } from "./i18n";

const V = "19";

export const profile = {
  name: "Ilghar Dadgostari",
  handle: "ilghar.studio",
  url: "https://ilghar.studio",
  email: "contact@ilghar.studio",
  avatar: `/avatar.jpg?v=${V}`,
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
  cover?: string;
  /** Full-resolution original, offered to high-DPI screens via srcset. */
  coverHi?: string;
  /** Dark-theme cover (optional picture source). */
  coverDark?: string;
  coverDarkHi?: string;
  /** Alt text for the card image. */
  coverAlt?: string;
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
  /** Single-source paper/photo on a dark card; no dark variant, no filter. */
  photo?: boolean;
  video?: string;
  /** Still frame shown before the video plays. Falls back to `cover`. */
  poster?: string;
  /** Accessible name for the video player. */
  videoLabel?: string;
  /** Short muted tile loop (WebM + MP4), poster stays the card art. */
  loopWebm?: string;
  loopMp4?: string;
  strip?: string;
  stripPages?: number;
};

export const collections: Collection[] = [
  {
    id: "studio-notes",
    cover: `/viewers/studio/cover.webp?v=${V}`,
    coverHi: `/viewers/studio/cover.jpg?v=${V}`,
    coverDark: `/viewers/studio/cover-dark.webp?v=${V}`,
    coverDarkHi: `/viewers/studio/cover-dark.jpg?v=${V}`,
    coverAlt: 'SÁBÁT pavilion wireframe in the studio palette — triangulated frame; ilghar.studio across the bottom.',
    title: "notesTitle",
    kicker: "notesKicker",
    strip: `/n16-cover-left.webp?v=${V}`,
    stripPages: 11,
    downloadHref: "/docs/studio-notes.pdf",
    downloadName: "Dadgostari_Studio-Notes.pdf",
    featured: true,
  },
  {
    id: "cv-de",
    lang: "de",
    cover: `/viewers/cards/cv.webp?v=${V}`,
    coverHi: `/viewers/cards/cv.jpg?v=${V}`,
    coverAlt: "First page of Ilghar Dadgostari's German CV.",
    photo: true,
    contain: true,
    title: "cvDe",
    kicker: "cvDeHint",
    pages: numbered("/viewers/cv", 1, "German CV", "Lebenslauf"),
    downloadHref: "/docs/cv-de.pdf",
    downloadName: "Dadgostari_Lebenslauf.pdf",
    spread: true,
  },
  {
    id: "cv-en",
    lang: "en",
    cover: `/viewers/cards/cv.webp?v=${V}`,
    coverHi: `/viewers/cards/cv.jpg?v=${V}`,
    coverAlt: "First page of Ilghar Dadgostari's English CV.",
    photo: true,
    contain: true,
    title: "cvEn",
    kicker: "cvEnHint",
    pages: numbered("/viewers/cv", 1, "English CV", "Englischer Lebenslauf"),
    downloadHref: "/docs/cv-en.pdf",
    downloadName: "Dadgostari_CV.pdf",
    spread: true,
  },
  {
    id: "werk",
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
    title: "portfolio",
    kicker: "portfolioDeHint",
    pages: numbered("/viewers/portfolio", 7, "Portfolio 2023", "Portfolio 2023"),
    downloadHref: "/docs/portfolio-2023.pdf",
    downloadName: "Dadgostari_Portfolio_2023.pdf",
  },
  {
    id: "portfolio-en",
    lang: "en",
    title: "portfolio",
    kicker: "portfolioEnHint",
    pages: numbered("/viewers/portfolio-en", 9, "Portfolio", "Portfolio"),
    downloadHref: "/docs/portfolio-en.pdf",
    downloadName: "Dadgostari_Portfolio.pdf",
  },
  {
    id: "arbeits",
    cover: `/viewers/cards/arbeits.webp?v=${V}`,
    coverHi: `/viewers/cards/arbeits.jpg?v=${V}`,
    coverAlt: '"Arbeits-Zeugnisse" over a symmetrical grey faceted geometric form on white.',
    photo: true,
    contain: true,
    title: "workCerts",
    kicker: "workCertsHint",
    pages: numbered("/viewers/arbeits", 9, "Employment records", "Arbeitszeugnisse"),
    downloadHref: "/docs/arbeitszeugnisse.pdf",
    downloadName: "Dadgostari_Arbeitszeugnisse.pdf",
    spread: true,
  },
  {
    id: "abschluss",
    cover: `/viewers/cards/abschluss.webp?v=${V}`,
    coverHi: `/viewers/cards/abschluss.jpg?v=${V}`,
    coverAlt: '"Bildungs-Zeugnisse" over a mauve-grey faceted pavilion form on the studio canvas.',
    photo: true,
    contain: true,
    title: "diplomas",
    kicker: "diplomasHint",
    pages: numbered("/viewers/abschluss", 7, "Diplomas", "Abschlusszeugnisse"),
    downloadHref: "/docs/abschlusszeugnisse.pdf",
    downloadName: "Dadgostari_Abschlusszeugnisse.pdf",
    spread: true,
  },
  {
    id: "fach",
    title: "langCerts",
    kicker: "langCertsHint",
    pages: numbered("/viewers/fach", 4, "Language & professional certificates", "Sprach- & Fachzeugnisse"),
    downloadHref: "/docs/fachzeugnisse.pdf",
    downloadName: "Dadgostari_Sprach-Fachzeugnisse.pdf",
    spread: true,
  },
  {
    id: "studio",
    cover: `/viewers/studio/cover.webp?v=${V}`,
    coverHi: `/viewers/studio/cover.png?v=${V}`,
    coverDark: `/viewers/studio/cover-dark.webp?v=${V}`,
    coverDarkHi: `/viewers/studio/cover-dark.png?v=${V}`,
    coverAlt: 'SÁBÁT pavilion wireframe in the studio palette — triangulated frame; ilghar.studio across the bottom.',
    title: "studio",
    kicker: "studioHint",
    href: "https://ilghar.studio",
    contain: true,
  },
  {
    id: "blade",
    cover: `/viewers/cards/blade.webp?v=${V}`,
    coverHi: `/viewers/cards/blade.jpg?v=${V}`,
    coverAlt: "BLADE Festival logo over glossy violet and green 3D ribbons.",
    title: "blade",
    kicker: "bladeHint",
    video: "/media/blade.mp4",
    poster: "/media/blade-poster.jpg",
    loopWebm: `/media/blade-loop.webm?v=${V}`,
    loopMp4: `/media/blade-loop.mp4?v=${V}`,
    videoLabel: "BLADE Festival animation: glossy violet and green 3D ribbons around the BLADE logo.",
    href: "https://blade-festival.de/en/",
  },
];

export const socialLinks = [
  { id: "github", href: "https://github.com/Ilghar", label: "GitHub" },
  { id: "linkedin", href: "https://www.linkedin.com/in/ilqardesign", label: "LinkedIn" },
  { id: "instagram", href: "https://www.instagram.com/cypsele_vayu/", label: "Instagram" },
  { id: "soundcloud", href: "https://soundcloud.com/ilghar-dadgostari", label: "SoundCloud" },
] as const;

/** Projects with a live demo on this site and/or GitHub Pages, plus the public repo. */
export type Project = {
  id: string;
  title: CopyKey;
  kicker: CopyKey;
  claim: CopyKey;
  alt?: CopyKey;
  coverLight?: string;
  coverLightHi?: string;
  coverDark?: string;
  coverDarkHi?: string;
  demoHref: string;
  repoHref: string;
};

const GH = "https://github.com/Ilghar";
const PAGES = "https://ilghar.github.io";

export const projects: Project[] = [
  {
    id: "sabat",
    title: "sabatTitle",
    kicker: "sabatKicker",
    claim: "sabatClaim",
    alt: "sabatAlt",
    coverLight: `/viewers/projects/sabat-light.webp?v=${V}`,
    coverLightHi: `/viewers/projects/sabat-light-hi.webp?v=${V}`,
    coverDark: `/viewers/projects/sabat-dark.webp?v=${V}`,
    coverDarkHi: `/viewers/projects/sabat-dark-hi.webp?v=${V}`,
    demoHref: "/demos/sabat/",
    repoHref: `${GH}/sabat-parametric-explorer`,
  },
  {
    id: "p01",
    title: "p01Title",
    kicker: "p01Kicker",
    claim: "p01Claim",
    alt: "p01Alt",
    coverLight: `/viewers/projects/p01-light.webp?v=${V}`,
    coverLightHi: `/viewers/projects/p01-light-hi.webp?v=${V}`,
    coverDark: `/viewers/projects/p01-dark.webp?v=${V}`,
    coverDarkHi: `/viewers/projects/p01-dark-hi.webp?v=${V}`,
    demoHref: "/demos/p01/",
    repoHref: `${GH}/abstention-routing-harness`,
  },
  {
    id: "cultural",
    title: "culturalTitle",
    kicker: "culturalKicker",
    claim: "culturalClaim",
    demoHref: `${PAGES}/cultural-typographic-ai-evaluation/`,
    repoHref: `${GH}/cultural-typographic-ai-evaluation`,
  },
  {
    id: "uigrid",
    title: "uigridTitle",
    kicker: "uigridKicker",
    claim: "uigridClaim",
    demoHref: `${PAGES}/ui-grid-extractor/`,
    repoHref: `${GH}/ui-grid-extractor`,
  },
  {
    id: "sigtype",
    title: "sigtypeTitle",
    kicker: "sigtypeKicker",
    claim: "sigtypeClaim",
    demoHref: `${PAGES}/signature-typography/`,
    repoHref: `${GH}/signature-typography`,
  },
  {
    id: "siganim",
    title: "siganimTitle",
    kicker: "siganimKicker",
    claim: "siganimClaim",
    demoHref: `${PAGES}/Signature-animation/`,
    repoHref: `${GH}/Signature-animation`,
  },
];

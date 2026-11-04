import type { CopyKey } from "./i18n";

const V = "17";

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
  cover: string;
  /** Full-resolution original, offered to high-DPI screens via srcset. */
  coverHi?: string;
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
  video?: string;
  /** Still frame shown before the video plays. Falls back to `cover`. */
  poster?: string;
  /** Accessible name for the video player. */
  videoLabel?: string;
  strip?: string;
  stripPages?: number;
};

export const collections: Collection[] = [
  {
    id: "studio-notes",
    cover: `/viewers/notes/cover.webp?v=${V}`,
    coverHi: `/viewers/notes/cover.jpg?v=${V}`,
    coverAlt: "Two people in sun hats beside a large carved white stone head in a snowy landscape.",
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
    cover: `/viewers/cards/cv.webp?v=${V}`,
    coverHi: `/viewers/cards/cv.jpg?v=${V}`,
    coverAlt: "First page of Ilghar Dadgostari's German CV.",
    title: "cvDe",
    kicker: "cvDeHint",
    pages: numbered("/viewers/cv", 1, "Lebenslauf", "Lebenslauf"),
    downloadHref: "/docs/cv-de.pdf",
    downloadName: "Dadgostari_Lebenslauf.pdf",
    spread: true,
  },
  {
    id: "arbeits",
    cover: `/viewers/cards/arbeits.webp?v=${V}`,
    coverHi: `/viewers/cards/arbeits.jpg?v=${V}`,
    coverAlt: '"Arbeits-Zeugnisse" in lilac over a symmetrical grey and pink line-drawn geometric form on white.',
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
    coverAlt: '"Bildungs-Zeugnisse" in pink over a symmetrical grey and pink line-drawn geometric form on white.',
    title: "diplomas",
    kicker: "diplomasHint",
    pages: numbered("/viewers/abschluss", 7, "Diplomas", "Abschlusszeugnisse"),
    downloadHref: "/docs/abschlusszeugnisse.pdf",
    downloadName: "Dadgostari_Abschlusszeugnisse.pdf",
    spread: true,
  },
  {
    id: "fach",
    cover: `/viewers/cards/fach.webp?v=${V}`,
    coverHi: `/viewers/cards/fach.jpg?v=${V}`,
    coverAlt: '"Sprach- & Fach-Zeugnisse" in pink over a symmetrical grey and pink line-drawn geometric form on white.',
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
    coverAlt: 'Lilac wireframe of the SÁBÁT pavilion: a geodesic base with a pyramid peak on each triangle, with ilghar.studio across it.',
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
    videoLabel: "BLADE Festival animation: glossy violet and green 3D ribbons around the BLADE logo.",
    href: "https://blade-festival.de/en/",
  },
];

export const socialLinks = [
  { id: "linkedin", href: "https://www.linkedin.com/in/ilqardesign", label: "LinkedIn" },
  { id: "instagram", href: "https://www.instagram.com/cypsele_vayu/", label: "Instagram" },
  { id: "soundcloud", href: "https://soundcloud.com/ilghar-dadgostari", label: "SoundCloud" },
] as const;

export type Lang = "en" | "de";

export const copy = {
  handle: { en: "ilghar.studio", de: "ilghar.studio" },
  roles: {
    en: "Curator · Designer · Sculptor",
    de: "Kurator*in · Designer*in · Bildhauer*in",
  },
  location: { en: "Berlin", de: "Berlin" },
  bio: {
    en: "Queer-feminist curator, designer and sculptor. Practice at the intersections of art, culture and social justice — shaping spaces for intercultural dialogue and a more pluriversal world.",
    de: "Queer-feministische Kurator*in, Designer*in und Bildhauer*in. Praxis an den Verflechtungen von Kunst, Kultur und sozialer Gerechtigkeit — Räume für interkulturellen Dialog und eine pluriversale Gesellschaft.",
  },
  notesTitle: { en: "Studio notes", de: "Studio-Notes" },
  notesKicker: {
    en: "Memory · Gaze · Grief",
    de: "Memory · Gaze · Grief",
  },
  studio: { en: "Studio", de: "Studio" },
  studioHint: { en: "ilghar.studio", de: "ilghar.studio" },
  blade: { en: "BLADE", de: "BLADE" },
  bladeHint: {
    en: "Festival",
    de: "Festival",
  },
  cvDe: { en: "Lebenslauf", de: "Lebenslauf" },
  cvDeHint: { en: "Deutsch", de: "Deutsch" },
  cvEn: { en: "Lebenslauf", de: "Lebenslauf" },
  cvEnHint: { en: "English", de: "Englisch" },
  workCerts: { en: "Employment", de: "Zeugnisse" },
  workCertsHint: { en: "Records", de: "Arbeit" },
  langCerts: { en: "Certificates", de: "Zertifikate" },
  langCertsHint: { en: "Language", de: "Sprache" },
  diplomas: { en: "Diplomas", de: "Abschlüsse" },
  diplomasHint: { en: "Degrees", de: "Studium" },
  werk: { en: "Werk", de: "Werk" },
  werkHint: { en: "SĀBĀT · BLADE", de: "SĀBĀT · BLADE" },
  portfolio: { en: "Portfolio", de: "Portfolio" },
  portfolioDeHint: { en: "2023", de: "2023" },
  portfolioEnHint: { en: "Selected", de: "Auswahl" },
  copyEmail: { en: "Copy email", de: "E-Mail kopieren" },
  copied: { en: "Copied", de: "Kopiert" },
  based: { en: "Berlin", de: "Berlin" },
  themeLight: { en: "Day", de: "Tag" },
  themeDark: { en: "Night", de: "Nacht" },
  prev: { en: "Previous", de: "Zurück" },
  next: { en: "Next", de: "Weiter" },
  close: { en: "Close", de: "Schließen" },
  download: { en: "File", de: "Datei" },
  openExternal: { en: "Open", de: "Öffnen" },
  tapSpread: { en: "Tap left or right", de: "Links oder rechts tippen" },
  tapFull: { en: "Tap to see both pages", de: "Tippen für beide Seiten" },
  visitFestival: { en: "Festival site", de: "Festival-Seite" },
} as const;

export type CopyKey = keyof typeof copy;

export function t(lang: Lang, key: CopyKey): string {
  return copy[key][lang];
}

export function readLang(): Lang {
  try {
    const stored = localStorage.getItem("ilghar-lang");
    if (stored === "de" || stored === "en") return stored;
  } catch {
    /* private mode */
  }
  if (typeof navigator !== "undefined") {
    return navigator.language.toLowerCase().startsWith("de") ? "de" : "en";
  }
  return "en";
}

export type Lang = "en" | "de";

export const copy = {
  handle: { en: "ilghar.studio", de: "ilghar.studio" },
  roles: {
    en: "Curator · Designer · Sculptor",
    de: "Kurator*in · Designer*in · Bildhauer*in",
  },
  location: { en: "Berlin", de: "Berlin" },
  // PROVISIONAL (brief-site-home-v3.md): the "AI designer" title is not yet confirmed by Hāèl.
  metaTitle: {
    en: "Ilghar Dadgostari: AI designer, Berlin | ilghar.studio",
    de: "Ilghar Dadgostari: AI Designer*in, Berlin | ilghar.studio",
  },
  metaDescription: {
    en: "Ilghar Dadgostari, a Berlin-based AI designer, checks generated design against facts a typographer and an architect can measure, before anyone argues about taste.",
    de: "Ilghar Dadgostari, AI Designer*in in Berlin, prüft generiertes Design an Fakten, die Typograf*innen und Architekt*innen messen können, bevor über Geschmack gestritten wird.",
  },
  bio: {
    en: "Queer-feminist curator, designer and sculptor. Practice at the intersections of art, culture and social justice — shaping spaces for intercultural dialogue and a more pluriversal world.",
    de: "Queer-feministische Kurator*in, Designer*in und Bildhauer*in. Praxis an den Verflechtungen von Kunst, Kultur und sozialer Gerechtigkeit — Räume für interkulturellen Dialog und eine pluriversale Gesellschaft.",
  },
  notesTitle: { en: "Studio notes", de: "Studio-Notizen" },
  notesKicker: {
    en: "Memory · Gaze · Grief",
    de: "Erinnerung · Blick · Trauer",
  },
  studio: { en: "Studio", de: "Studio" },
  studioHint: { en: "ilghar.studio", de: "ilghar.studio" },
  blade: { en: "BLADE", de: "BLADE" },
  bladeHint: {
    en: "Festival",
    de: "Festival",
  },
  cvDe: { en: "CV", de: "Lebenslauf" },
  cvDeHint: { en: "German", de: "Deutsch" },
  cvEn: { en: "CV", de: "Lebenslauf" },
  cvEnHint: { en: "English", de: "Englisch" },
  workCerts: { en: "Employment", de: "Zeugnisse" },
  workCertsHint: { en: "Records", de: "Arbeit" },
  langCerts: { en: "Certificates", de: "Zertifikate" },
  langCertsHint: { en: "Language", de: "Sprache" },
  diplomas: { en: "Diplomas", de: "Abschlüsse" },
  diplomasHint: { en: "Degrees", de: "Studium" },
  werk: { en: "Work", de: "Werk" },
  werkHint: { en: "SÁBÁT · BLADE", de: "SÁBÁT · BLADE" },
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
  download: { en: "Download", de: "Herunterladen" },
  openExternal: { en: "Open", de: "Öffnen" },
  tapSpread: { en: "Tap left or right", de: "Links oder rechts tippen" },
  tapFull: { en: "Tap to see both pages", de: "Tippen für beide Seiten" },
  language: { en: "Language", de: "Sprache" },
  socialLinks: { en: "Social links", de: "Soziale Netzwerke" },
  errorTitle: { en: "Something went wrong", de: "Etwas ist schiefgelaufen" },
  errorBody: {
    en: "An unexpected error occurred. Try reloading the page.",
    de: "Ein unerwarteter Fehler ist aufgetreten. Bitte lade die Seite neu.",
  },
  germanLevel: { en: "German (C2)", de: "Deutsch (C2)" },
  visitFestival: { en: "Festival site", de: "Festival-Seite" },
} as const;

export type CopyKey = keyof typeof copy;

export function t(lang: Lang, key: CopyKey): string {
  return copy[key][lang];
}

export const langFromPath = (pathname: string): Lang =>
  /^\/de(\/|$)/.test(pathname) ? "de" : "en";

/** URL of the matching page in the other language. EN lives at /, DE at /de/. */
export const langPath = (lang: Lang) => (lang === "de" ? "/de/" : "/");

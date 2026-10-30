import { copy, type Lang } from "./i18n";
import { profile, socialLinks } from "./profile";

export const SITE_URL = profile.url;
export const OG_IMAGE = `${SITE_URL}/og.jpg`;

export const pageUrl = (lang: Lang) => (lang === "de" ? `${SITE_URL}/de/` : `${SITE_URL}/`);

const descriptions: Record<Lang, string> = {
  en: `${profile.name}: ${copy.bio.en}`,
  de: `${profile.name}: ${copy.bio.de}`,
};

/** Per-page head for the EN (/) and DE (/de/) versions of the landing page. */
export function pageHead(lang: Lang) {
  const url = pageUrl(lang);
  const title = `${profile.name} · ${copy.roles[lang]}`;
  return {
    meta: [
      { title },
      { name: "description", content: descriptions[lang] },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: profile.handle },
      { property: "og:title", content: title },
      { property: "og:description", content: descriptions[lang] },
      { property: "og:url", content: url },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:locale", content: lang === "de" ? "de_DE" : "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: descriptions[lang] },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: url },
      { rel: "alternate", hrefLang: "en", href: pageUrl("en") },
      { rel: "alternate", hrefLang: "de", href: pageUrl("de") },
      { rel: "alternate", hrefLang: "x-default", href: pageUrl("en") },
    ],
  };
}

/** Schema.org data built only from facts in profile.ts and i18n.ts. */
export function jsonLd(lang: Lang) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: profile.handle,
        url: `${SITE_URL}/`,
        inLanguage: ["en", "de"],
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: profile.name,
        url: `${SITE_URL}/`,
        email: `mailto:${profile.email}`,
        image: `${SITE_URL}/avatar.jpg`,
        jobTitle: copy.roles[lang].split(" · "),
        description: copy.bio[lang],
        address: { "@type": "PostalAddress", addressLocality: copy.location[lang] },
        sameAs: socialLinks.map((s) => s.href),
      },
    ],
  });
}

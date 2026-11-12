import { type Lang } from "@/lib/i18n";
import { collections, type Collection } from "@/lib/profile";

export type DocKind = "cv" | "portfolio";

const IDS: Record<Lang, Record<DocKind, string>> = {
  en: { cv: "cv-en", portfolio: "portfolio-en" },
  de: { cv: "cv-de", portfolio: "portfolio-de" },
};

export function collectionFor(lang: Lang, kind: DocKind): Collection {
  const id = IDS[lang][kind];
  const found = collections.find((c) => c.id === id);
  if (!found) throw new Error(`Missing collection ${id}`);
  return found;
}

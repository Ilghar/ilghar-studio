import { useEffect } from "react";
import type { Lang } from "@/lib/i18n";

/**
 * The language is fixed by the URL: / is English, /de/ is German. The toggle
 * links between the two pages, so there is no in-place switch.
 */
export function useLang(lang: Lang) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return { lang };
}

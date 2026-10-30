import { useCallback, useEffect, useState } from "react";
import { type Lang, readLang } from "@/lib/i18n";

/**
 * `initialLang` pins the language a prerendered page was built in (/de/ is
 * German). Without it the visitor's saved choice or browser language is used,
 * as before. The toggle still switches language in place and saves the choice.
 */
export function useLang(initialLang?: Lang) {
  const [lang, setLang] = useState<Lang>(initialLang ?? "en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const next = initialLang ?? readLang();
    setLang(next);
    document.documentElement.lang = next;
    setReady(true);
  }, [initialLang]);

  const set = useCallback((next: Lang) => {
    setLang(next);
    document.documentElement.lang = next;
    try {
      localStorage.setItem("ilghar-lang", next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    set(lang === "en" ? "de" : "en");
  }, [lang, set]);

  return { lang, set, toggle, ready };
}

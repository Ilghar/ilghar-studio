import { useCallback, useEffect, useState } from "react";
import { type Lang, readLang } from "@/lib/i18n";

export function useLang() {
  const [lang, setLang] = useState<Lang>("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const next = readLang();
    setLang(next);
    document.documentElement.lang = next;
    setReady(true);
  }, []);

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

import { type Lang, langPath, t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LangToggle({ lang }: { lang: Lang }) {
  return (
    <div role="group" aria-label={t(lang, "language")} className="-ml-1 flex items-center gap-2.5">
      {(["en", "de"] as const).map((code, i) => {
        const active = lang === code;
        return (
          <span key={code} className="flex items-center gap-2.5">
            {i > 0 ? (
              <span className="text-subtle/50" aria-hidden="true">
                ·
              </span>
            ) : null}
            <a
              href={langPath(code)}
              hrefLang={code}
              lang={code}
              aria-current={active ? "page" : undefined}
              className={cn(
                "px-1 text-[0.7rem] font-medium tracking-[0.22em] uppercase transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                active ? "text-accent" : "text-subtle hover:text-ink",
              )}
            >
              {code}
            </a>
          </span>
        );
      })}
    </div>
  );
}

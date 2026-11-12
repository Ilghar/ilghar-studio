import { useLang } from "@/hooks/use-lang";
import { type Lang, langPath, t } from "@/lib/i18n";
import { collectionFor, type DocKind } from "@/lib/documents";
import { profile } from "@/lib/profile";
import { LangToggle } from "@/components/lang-toggle";
import { ThemeToggle } from "@/components/theme-toggle";

/** Static document page for /cv and /portfolio (and the /de/ pair).
 *  Pages and the PDF download are prerendered in the HTML; the PDFs themselves
 *  are unchanged. */
export function DocumentPage({ lang, kind }: { lang: Lang; kind: DocKind }) {
  useLang(lang);
  const collection = collectionFor(lang, kind);
  const pages = collection.pages ?? [];
  const title = t(lang, collection.title);
  const kicker = t(lang, collection.kicker);
  const slug = kind;

  return (
    <main className="relative min-h-dvh overflow-x-hidden">
      <header className="site flex items-center justify-between gap-3 py-6">
        <a
          href={langPath(lang)}
          className="brand-label m-0 text-[0.72rem] font-normal tracking-[0.18em] text-ink uppercase no-underline"
        >
          {profile.handle}
        </a>
        <div className="flex items-center gap-3">
          <LangToggle lang={lang} page={slug} />
          <ThemeToggle
            lightLabel={t(lang, "themeLight")}
            darkLabel={t(lang, "themeDark")}
          />
        </div>
      </header>

      <article className="document-page">
        <header className="hero pb-2 text-left">
          <p className="label m-0">{kicker}</p>
          <h1 className="name mt-2">
            <span className="first">{title.charAt(0)}</span>
            {title.slice(1)}
          </h1>
          <div className="mt-4 flex flex-wrap gap-x-5">
            {collection.downloadHref ? (
              <a
                href={collection.downloadHref}
                download={collection.downloadName}
                className="cta"
              >
                {t(lang, "download")}
              </a>
            ) : null}
            <a href={langPath(lang)} className="cta">
              {t(lang, "backHome")}
            </a>
          </div>
        </header>

        <ol className="doc-pages">
          {pages.map((page, i) => (
            <li key={page.src} className="doc-page">
              <img
                src={page.src}
                alt={lang === "de" ? page.altDe : page.altEn}
                width={1200}
                height={1697}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </li>
          ))}
        </ol>
      </article>
    </main>
  );
}

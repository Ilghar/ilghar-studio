import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { type Lang, t } from "@/lib/i18n";
import {
  collections,
  profile,
  socialLinks,
  type Collection,
} from "@/lib/profile";
import { cn } from "@/lib/utils";
import { FrameCard } from "@/components/frame-card";
import { LangToggle } from "@/components/lang-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Viewer } from "@/components/viewer";

/** Home on LAYOUT: 960 column, square mauve frames, no shadows/gradients. */
export function LinkInBio({ lang }: { lang: Lang }) {
  useLang(lang);
  const [open, setOpen] = useState<Collection | null>(null);

  const visible = useMemo(
    () => collections.filter((c) => !c.lang || c.lang === lang),
    [lang],
  );
  // Keep only Work tiles with real covers (drop placeholders / near-empty / self-link).
  const REAL_WORK = new Set(["cv-de", "cv-en", "portfolio-de", "portfolio-en", "arbeits"]);
  const usable = visible.filter((c) => c.featured || REAL_WORK.has(c.id));
  const featured = usable.find((c) => c.featured);
  const rest = usable.filter((c) => !c.featured);
  const live = open ? collections.find((c) => c.id === open.id) ?? open : null;

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-canvas text-ink">
      <div className="mx-auto w-full max-w-[960px] px-4 md:px-8">
        <header className="site flex items-center justify-between gap-3 py-6">
          <p className="brand-label m-0 text-[0.72rem] font-medium tracking-[0.18em] text-ink uppercase">
            ilghar.studio
          </p>
          <div className="flex items-center gap-3">
            <LangToggle lang={lang} />
            <ThemeToggle
              lightLabel={t(lang, "themeLight")}
              darkLabel={t(lang, "themeDark")}
            />
          </div>
        </header>

        <header className="hero pb-6 text-left">
          <h1 className="name m-0 font-display text-[1.75rem] font-normal tracking-[0.01em] text-ink sm:text-[2rem]">
            <span className="text-[color:var(--accent-dot)]">{profile.name.charAt(0)}</span>
            {profile.name.slice(1)}
          </h1>
          <p className="title mt-2 m-0 text-[0.95rem] font-light tracking-wide text-ink">
            {t(lang, "location")}
            <span className="mx-2 text-subtle" aria-hidden="true">·</span>
            {t(lang, "roles")}
          </p>
          <p className="sub mt-4 m-0 max-w-[42ch] text-[0.95rem] font-light leading-relaxed text-ink">
            {t(lang, "bio")}
          </p>
        </header>

        {featured ? (
          <section className="mt-16" aria-label="Featured">
            <h2 className="m-0 mb-6 border-t border-[color:var(--line-mauve,#7d5a7c)] pt-3 text-[0.9rem] font-normal tracking-[0.12em] text-[color:var(--label)] uppercase">
              Featured
            </h2>
            <FrameCard
              cover={featured.cover}
              coverHi={featured.coverHi}
              coverDark={featured.coverDark}
              coverDarkHi={featured.coverDarkHi}
              coverAlt={featured.coverAlt}
              title={t(lang, featured.title)}
              kicker={t(lang, featured.kicker)}
              featured
              eager
              onClick={() => setOpen(featured)}
            />
          </section>
        ) : null}

        <section className="mt-16" aria-label="Live function">
          <h2 className="m-0 mb-6 border-t border-[color:var(--line-mauve,#7d5a7c)] pt-3 text-[0.9rem] font-normal tracking-[0.12em] text-[color:var(--label)] uppercase">
            Live function
          </h2>
          <figure className="m-0">
            {/* One 1px mauve frame; P01 sits directly inside — no nested card. */}
            <div className="home-live-frame overflow-hidden rounded-none border border-[color:#7d5a7c] bg-surface dark:border-[color:#856a8e]">
              <iframe
                title="P01 abstention routing harness"
                src="/demos/p01/index.html?embed=1"
                className="home-live-iframe block w-full border-0"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-2 text-[0.8rem] font-light text-ink">
              Live · P01 abstention routing
            </figcaption>
          </figure>
        </section>

        <section className="mt-16" aria-label="Work">
          <h2 className="m-0 mb-6 border-t border-[color:var(--line-mauve,#7d5a7c)] pt-3 text-[0.9rem] font-normal tracking-[0.12em] text-[color:var(--label)] uppercase">
            Work
          </h2>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {rest.map((item) => (
              <FrameCard
                key={item.id}
                cover={item.cover}
                coverHi={item.coverHi}
                coverDark={item.coverDark}
                coverDarkHi={item.coverDarkHi}
                coverAlt={item.coverAlt}
                title={t(lang, item.title)}
                kicker={t(lang, item.kicker)}
                contain={item.contain}
                external={Boolean(item.href) && !item.video}
                href={item.pages || item.video || item.strip ? undefined : item.href}
                onClick={
                  item.pages || item.video || item.strip ? () => setOpen(item) : undefined
                }
              />
            ))}
          </div>
        </section>

        <Footer lang={lang} />
      </div>

      {live?.pages || live?.video || live?.strip ? (
        <Viewer collection={live} lang={lang} onClose={() => setOpen(null)} />
      ) : null}
    </main>
  );
}

function Cover() {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden md:rounded-b-sm">
      {/* Day and night covers are CSS backgrounds keyed to the theme class, so
          the browser only downloads the one that is showing. */}
      <div aria-hidden="true" className="cover-img cover-day absolute inset-0" />
      <div aria-hidden="true" className="cover-img cover-night absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-canvas to-transparent"
      />
    </div>
  );
}

function Identity({ lang }: { lang: Lang }) {
  return (
    <header className="relative z-10 -mt-12 flex flex-col items-center text-center">
      <img
        src={profile.avatar}
        alt={profile.name}
        width={1000}
        height={1000}
        className="size-28 rounded-full object-cover object-[center_28%] ring-4 ring-canvas sm:size-32 md:size-36"
      />
      <p className="mt-6 text-[0.68rem] font-medium tracking-[0.32em] text-ink uppercase md:text-[0.75rem]">
        {profile.handle}
      </p>
      <h1 className="mt-2 font-display text-[1.75rem] font-normal tracking-[0.14em] uppercase text-ink sm:text-[1.95rem] md:text-[2.25rem]">
        <span className="first text-[#fcb4c4]">{profile.name.slice(0, 1)}</span>
        {profile.name.slice(1)}
      </h1>
      <p className="mt-2 font-display text-[0.95rem] font-medium tracking-[0.18em] uppercase text-[color:var(--mauve-label,#775a76)]">
        {t(lang, "roles").split("·")[0].trim()}
      </p>
      <p className="mt-1 text-[0.9rem] font-light tracking-wide text-ink md:text-[1.02rem]">
        {t(lang, "location")}
        <span className="mx-2 text-subtle/70" aria-hidden="true">
          ·
        </span>
        {t(lang, "roles")}
      </p>
      <p className="mt-6 max-w-[34ch] text-[0.92rem] font-light leading-relaxed text-ink md:max-w-[42ch] md:text-[1.05rem]">
        {t(lang, "bio")}
      </p>
      <div className="mt-6 flex w-full items-center justify-between">
        <LangToggle lang={lang} />
        <ThemeToggle
          lightLabel={t(lang, "themeLight")}
          darkLabel={t(lang, "themeDark")}
        />
      </div>
    </header>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      /* ignore */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <footer className="mt-16 mb-16 flex flex-col items-start gap-5 border-t border-[color:var(--line-mauve,#7d5a7c)] pt-6 text-left">
      <nav aria-label={t(lang, "socialLinks")} className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {socialLinks.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="me noopener noreferrer"
            className="text-[0.7rem] font-medium tracking-[0.2em] text-ink uppercase transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-[0.78rem]"
          >
            {social.label}
          </a>
        ))}
      </nav>
      <button
        type="button"
        onClick={copyEmail}
        className={cn(
          "inline-flex min-h-10 items-center gap-2 text-[0.75rem] font-light tracking-wide text-ink md:text-[0.85rem]",
          "transition-colors hover:text-ink",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        {copied ? (
          <Check className="size-3.5 text-accent" strokeWidth={1.8} />
        ) : (
          <Copy className="size-3.5" strokeWidth={1.5} />
        )}
        {copied ? t(lang, "copied") : profile.email}
      </button>
    </footer>
  );
}

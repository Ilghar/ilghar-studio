import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { type Lang, t } from "@/lib/i18n";
import {
  collections,
  profile,
  projects,
  socialLinks,
  type Collection,
} from "@/lib/profile";
import { cn } from "@/lib/utils";
import { FrameCard } from "@/components/frame-card";
import { ProjectCard } from "@/components/project-card";
import { LangToggle } from "@/components/lang-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { ThemePicture } from "@/components/theme-picture";
import { Viewer } from "@/components/viewer";

/** Home on LAYOUT v2: 100%/720/760 column, 12px frames, glass CTAs. */
export function LinkInBio({ lang }: { lang: Lang }) {
  useLang(lang);
  const [open, setOpen] = useState<Collection | null>(null);

  const visible = useMemo(
    () => collections.filter((c) => !c.lang || c.lang === lang),
    [lang],
  );
  // Drop only the near-empty "werk" tile and the self-link to this site.
  const HIDDEN = new Set(["werk", "studio"]);
  const usable = visible.filter((c) => !HIDDEN.has(c.id));
  const featured = usable.find((c) => c.featured);
  const rest = usable.filter((c) => !c.featured);
  const live = open ? collections.find((c) => c.id === open.id) ?? open : null;

  return (
    <main className="relative min-h-dvh overflow-x-hidden">
      <div>
        <header className="site flex items-center justify-between gap-3 py-6">
          <p className="brand-label m-0 text-[0.72rem] font-normal tracking-[0.18em] text-ink uppercase">
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

        <Cover lang={lang} />

        <header className="hero pb-6 text-left">
          <img
            src={profile.avatar}
            alt={profile.name}
            width={160}
            height={160}
            className="hero-avatar"
          />
          <h1 className="name">
            <span className="first">{profile.name.charAt(0)}</span>
            {profile.name.slice(1)}
          </h1>
          <p className="title mt-2 m-0 text-[0.95rem] font-normal tracking-wide">
            {t(lang, "location")}
            <span className="mx-2 text-subtle" aria-hidden="true">·</span>
            {t(lang, "roles")}
          </p>
          <p className="sub mt-4 m-0 max-w-[42ch] text-[0.95rem] font-normal leading-relaxed">
            {t(lang, "bio")}
          </p>
        </header>

        {featured ? (
          <section className="mt-16" aria-label="Featured">
            <h2>
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
          <h2>
            Live function
          </h2>
          <figure className="m-0">
            {/* One 12px frame; P01 sits directly inside — no nested card. */}
            <div className="home-live-frame">
              <iframe
                title="P01 abstention routing harness"
                src="/demos/p01/index.html?embed=1"
                className="home-live-iframe"
                loading="lazy"
                onLoad={(e) => {
                  const frame = e.currentTarget;
                  const doc = frame.contentDocument;
                  if (!doc) return;
                  const size = () => {
                    const h = doc.documentElement.scrollHeight;
                    if (h) frame.style.height = `${h}px`;
                  };
                  size();
                  doc.defaultView?.addEventListener("resize", size);
                }}
              />
            </div>
            <figcaption className="mt-2 text-[0.8rem] font-light text-ink">
              Live · P01 abstention routing
            </figcaption>
          </figure>
        </section>

        <section className="mt-16" aria-label="Work">
          <h2>
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
                photo={item.photo}
                loopWebm={item.loopWebm}
                loopMp4={item.loopMp4}
                external={Boolean(item.href) && !item.video && !item.pageHref}
                href={
                  item.pageHref
                    ? item.pageHref
                    : item.pages || item.video || item.strip
                      ? undefined
                      : item.href
                }
                onClick={
                  item.pageHref
                    ? undefined
                    : item.pages || item.video || item.strip
                      ? () => setOpen(item)
                      : undefined
                }
              />
            ))}
          </div>
        </section>

        <section className="mt-16" aria-labelledby="projects-title">
          <h2 id="projects-title">
            {t(lang, "projectsTitle")}
          </h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} lang={lang} />
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

function Cover({ lang }: { lang: Lang }) {
  return (
    <figure className="hero-cover">
      <ThemePicture
        light="/cover-day.jpg?v=19"
        dark="/cover-night.jpg?v=19"
        alt={t(lang, "studioCoverAlt")}
        width={1600}
        height={900}
        eager
        imgClassName="hero-cover-img"
      />
    </figure>
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
    <footer className="mt-16 mb-16 flex flex-col items-start gap-5 border-t border-[color:var(--line)] pt-6 text-left">
      <nav aria-label={t(lang, "socialLinks")} className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {socialLinks.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="me noopener noreferrer"
            className="text-[0.7rem] font-normal tracking-[0.2em] text-ink uppercase transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-[0.78rem]"
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

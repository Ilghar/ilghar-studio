import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { useLang } from "@/hooks/use-lang";
import { t } from "@/lib/i18n";
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

export function LinkInBio() {
  const { lang, set } = useLang();
  const [open, setOpen] = useState<Collection | null>(null);

  const visible = useMemo(
    () => collections.filter((c) => !c.lang || c.lang === lang),
    [lang],
  );
  const featured = visible.find((c) => c.featured);
  const rest = visible.filter((c) => !c.featured);
  const live = open ? collections.find((c) => c.id === open.id) ?? open : null;

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-canvas text-ink">
      <div className="mx-auto w-full max-w-md md:max-w-xl lg:max-w-2xl">
        <div className="md:px-8">
          <Cover />
        </div>

        <div className="px-5 pb-20 md:px-8">
          <Identity lang={lang} onLang={set} />

          {featured ? (
            <div className="mt-10">
              <FrameCard
                cover={featured.cover}
                title={t(lang, featured.title)}
                kicker={t(lang, featured.kicker)}
                featured
                onClick={() => setOpen(featured)}
              />
            </div>
          ) : null}

          <div className="mt-6 grid grid-cols-2 gap-4 md:gap-5">
            {rest.map((item) => (
              <FrameCard
                key={item.id}
                cover={item.cover}
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

          <Footer lang={lang} />
        </div>
      </div>

      {live?.pages || live?.video || live?.strip ? (
        <Viewer collection={live} lang={lang} onClose={() => setOpen(null)} />
      ) : null}
    </div>
  );
}

function Cover() {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden md:rounded-b-sm">
      <img
        src={profile.coverDay}
        alt=""
        width={1600}
        height={900}
        className="cover-swap absolute inset-0 h-full w-full object-cover object-center opacity-100 dark:opacity-0"
      />
      <img
        src={profile.coverNight}
        alt=""
        width={1600}
        height={900}
        className="cover-swap absolute inset-0 h-full w-full object-cover object-center opacity-0 dark:opacity-100"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-canvas to-transparent"
      />
    </div>
  );
}

function Identity({
  lang,
  onLang,
}: {
  lang: ReturnType<typeof useLang>["lang"];
  onLang: (lang: ReturnType<typeof useLang>["lang"]) => void;
}) {
  return (
    <header className="relative z-10 -mt-12 flex flex-col items-center text-center">
      <img
        src={profile.avatar}
        alt={profile.name}
        width={1000}
        height={1000}
        className="size-28 rounded-full object-cover object-[center_28%] ring-4 ring-canvas sm:size-32 md:size-36"
      />
      <p className="mt-6 text-[0.68rem] font-medium tracking-[0.32em] text-accent uppercase md:text-[0.75rem]">
        {profile.handle}
      </p>
      <h1 className="mt-2 font-display text-[1.75rem] font-semibold tracking-[0.01em] text-ink sm:text-[1.95rem] md:text-[2.25rem]">
        {profile.name}
      </h1>
      <p className="mt-1 text-[0.9rem] font-light tracking-wide text-muted md:text-[1.02rem]">
        {t(lang, "location")}
        <span className="mx-2 text-subtle/70" aria-hidden="true">
          ·
        </span>
        {t(lang, "roles")}
      </p>
      <p className="mt-6 max-w-[34ch] text-[0.92rem] font-light leading-relaxed text-muted md:max-w-[42ch] md:text-[1.05rem]">
        {t(lang, "bio")}
      </p>
      <div className="mt-6 flex w-full items-center justify-between">
        <LangToggle lang={lang} onChange={onLang} />
        <ThemeToggle
          lightLabel={t(lang, "themeLight")}
          darkLabel={t(lang, "themeDark")}
        />
      </div>
    </header>
  );
}

function Footer({ lang }: { lang: ReturnType<typeof useLang>["lang"] }) {
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
    <footer className="mt-12 flex flex-col items-center gap-5 text-center">
      <nav aria-label="Elsewhere" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {socialLinks.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="me noopener noreferrer"
            className="text-[0.7rem] font-medium tracking-[0.2em] text-muted uppercase transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-[0.78rem]"
          >
            {social.label}
          </a>
        ))}
      </nav>
      <button
        type="button"
        onClick={copyEmail}
        className={cn(
          "inline-flex min-h-10 items-center gap-2 text-[0.75rem] font-light tracking-wide text-subtle md:text-[0.85rem]",
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

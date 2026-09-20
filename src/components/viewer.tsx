import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";
import type { Collection } from "@/lib/profile";
import { cn } from "@/lib/utils";

type Zoom = "full" | "left" | "right";

export function Viewer({
  collection,
  lang,
  onClose,
}: {
  collection: Collection;
  lang: Lang;
  onClose: () => void;
}) {
  if (collection.video) {
    return (
      <VideoOverlay
        src={collection.video}
        poster={collection.cover}
        href={collection.href}
        title={t(lang, collection.title)}
        lang={lang}
        onClose={onClose}
      />
    );
  }

  if (collection.strip) {
    return (
      <StripOverlay
        src={collection.strip}
        count={collection.stripPages ?? 11}
        title={t(lang, collection.title)}
        downloadHref={collection.downloadHref}
        downloadName={collection.downloadName}
        lang={lang}
        onClose={onClose}
      />
    );
  }

  return <DocumentOverlay collection={collection} lang={lang} onClose={onClose} />;
}

function DocumentOverlay({
  collection,
  lang,
  onClose,
}: {
  collection: Collection;
  lang: Lang;
  onClose: () => void;
}) {
  const pages = collection.pages ?? [];
  const total = pages.length;
  const seamless = Boolean(collection.seamless);
  const spread = Boolean(collection.spread);
  const scroller = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState<Zoom>("full");
  const indexRef = useRef(0);
  indexRef.current = index;
  const titleId = useId();

  const go = useCallback(
    (next: number) => {
      const el = scroller.current;
      if (!el || total === 0) return;
      const clamped = ((next % total) + total) % total;
      const child = el.children[clamped] as HTMLElement | undefined;
      child?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      setIndex(clamped);
      setZoom("full");
    },
    [total],
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const el = scroller.current;
    const reset = () => {
      if (el) el.scrollLeft = 0;
      setIndex(0);
      setZoom("full");
    };
    reset();
    const id = window.requestAnimationFrame(reset);
    return () => {
      window.cancelAnimationFrame(id);
      document.body.style.overflow = prev;
    };
  }, [collection.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoom !== "full") {
          setZoom("full");
          return;
        }
        onClose();
      }
      if (e.key === "ArrowRight") go(indexRef.current + 1);
      if (e.key === "ArrowLeft") go(indexRef.current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose, zoom]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onScroll = () => {
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      Array.from(el.children).forEach((child, i) => {
        const node = child as HTMLElement;
        const center = node.offsetLeft + node.offsetWidth / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      if (best !== indexRef.current) {
        setIndex(best);
        setZoom("full");
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [total]);

  function onSpreadClick(e: React.MouseEvent<HTMLElement>) {
    if (!spread) return;
    if (zoom !== "full") {
      setZoom("full");
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    setZoom(x < 0.5 ? "left" : "right");
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="viewer-enter fixed inset-0 z-50 flex flex-col bg-canvas text-ink"
    >
      <header className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t(lang, "close")}
          className="flex size-10 items-center justify-center text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-5" strokeWidth={1.5} />
        </button>
        <div className="min-w-0 text-center">
          <h2
            id={titleId}
            className="truncate text-[0.68rem] font-medium tracking-[0.22em] text-accent uppercase md:text-[0.75rem]"
          >
            {t(lang, collection.title)}
          </h2>
          <p className="text-xs font-light tabular-nums tracking-[0.16em] text-subtle md:text-sm">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>
        {collection.downloadHref ? (
          <a
            href={collection.downloadHref}
            download={collection.downloadName}
            className="px-2 text-[0.68rem] font-medium tracking-[0.18em] text-muted uppercase transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-[0.75rem]"
          >
            {t(lang, "download")}
          </a>
        ) : (
          <span className="size-10" aria-hidden="true" />
        )}
      </header>

      <div
        ref={scroller}
        dir="ltr"
        className="flex h-[calc(100dvh-8.25rem)] snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain"
        style={{ direction: "ltr" }}
      >
        {pages.map((page, i) => {
          const active = i === index;
          const z = active ? zoom : "full";
          return (
            <figure
              key={`${i}-${page.src}`}
              className={cn(
                "relative flex h-full w-full min-w-full shrink-0 snap-start snap-always overflow-hidden",
                seamless ? "items-stretch justify-stretch p-0" : "items-center px-4 py-1",
                !seamless && (z === "left" ? "justify-start" : z === "right" ? "justify-end" : "justify-center"),
              )}
              aria-hidden={!active}
            >
              <img
                src={page.src}
                alt={lang === "de" ? page.altDe : page.altEn}
                width={1585}
                height={2114}
                onClick={spread && active ? onSpreadClick : undefined}
                className={cn(
                  "select-none",
                  seamless
                    ? "h-full w-full object-contain"
                    : z === "full"
                      ? "frame-shadow max-h-full max-w-full rounded-xl object-contain"
                      : "h-full w-auto max-w-none",
                  spread && "cursor-zoom-in",
                  spread && z !== "full" && "cursor-zoom-out",
                )}
                draggable={false}
              />
              {spread && active ? (
                <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[0.68rem] font-light tracking-[0.16em] text-subtle uppercase">
                  {z === "full" ? t(lang, "tapSpread") : t(lang, "tapFull")}
                </p>
              ) : null}
            </figure>
          );
        })}
      </div>

      <footer className="flex shrink-0 items-center justify-center gap-6 px-4 py-3">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label={t(lang, "prev")}
          className="flex size-11 items-center justify-center text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronLeft className="size-6" strokeWidth={1.4} />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label={t(lang, "next")}
          className="flex size-11 items-center justify-center text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronRight className="size-6" strokeWidth={1.4} />
        </button>
      </footer>
    </div>,
    document.body,
  );
}

function StripOverlay({
  src,
  count,
  title,
  downloadHref,
  downloadName,
  lang,
  onClose,
}: {
  src: string;
  count: number;
  title: string;
  downloadHref?: string;
  downloadName?: string;
  lang: Lang;
  onClose: () => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  indexRef.current = index;
  const titleId = useId();

  const go = useCallback(
    (next: number) => {
      const el = scroller.current;
      if (!el) return;
      const clamped = ((next % count) + count) % count;
      const width = el.scrollWidth / count || 1;
      el.scrollTo({ left: clamped * width, behavior: "smooth" });
      setIndex(clamped);
    },
    [count],
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const el = scroller.current;
    if (el) el.scrollLeft = 0;
    setIndex(0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(indexRef.current + 1);
      if (e.key === "ArrowLeft") go(indexRef.current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  function onScroll() {
    const el = scroller.current;
    if (!el) return;
    const w = el.scrollWidth / count || 1;
    const next = Math.min(count - 1, Math.max(0, Math.round(el.scrollLeft / w)));
    if (next !== indexRef.current) setIndex(next);
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="viewer-enter fixed inset-0 z-50 flex flex-col bg-canvas text-ink"
    >
      <header className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t(lang, "close")}
          className="flex size-10 items-center justify-center text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-5" strokeWidth={1.5} />
        </button>
        <div className="min-w-0 text-center">
          <h2
            id={titleId}
            className="truncate text-[0.68rem] font-medium tracking-[0.22em] text-accent uppercase md:text-[0.75rem]"
          >
            {title}
          </h2>
          <p className="text-xs font-light tabular-nums tracking-[0.16em] text-subtle md:text-sm">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
        </div>
        {downloadHref ? (
          <a
            href={downloadHref}
            download={downloadName}
            className="px-2 text-[0.68rem] font-medium tracking-[0.18em] text-muted uppercase transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-[0.75rem]"
          >
            {t(lang, "download")}
          </a>
        ) : (
          <span className="size-10" aria-hidden="true" />
        )}
      </header>

      <div
        ref={scroller}
        dir="ltr"
        onScroll={onScroll}
        className="h-[calc(100dvh-8.25rem)] overflow-x-auto overflow-y-hidden overscroll-x-contain"
        style={{ direction: "ltr" }}
      >
        <img
          src={src}
          alt={title}
          width={11540}
          height={1400}
          draggable={false}
          onLoad={() => {
            const el = scroller.current;
            if (el) el.scrollLeft = 0;
          }}
          className="block h-full max-w-none select-none"
          style={{ maxWidth: "none", width: "auto", height: "100%" }}
        />
      </div>

      <footer className="flex shrink-0 items-center justify-center gap-6 px-4 py-3">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label={t(lang, "prev")}
          className="flex size-11 items-center justify-center text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronLeft className="size-6" strokeWidth={1.4} />
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label={t(lang, "next")}
          className="flex size-11 items-center justify-center text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronRight className="size-6" strokeWidth={1.4} />
        </button>
      </footer>
    </div>,
    document.body,
  );
}

function VideoOverlay({
  src,
  poster,
  href,
  title,
  lang,
  onClose,
}: {
  src: string;
  poster?: string;
  href?: string;
  title: string;
  lang: Lang;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const v = videoRef.current;
    if (v) {
      v.muted = false;
      const play = v.play();
      if (play) play.catch(() => {});
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="viewer-enter fixed inset-0 z-50 flex flex-col bg-black text-white"
    >
      <header className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t(lang, "close")}
          className="flex size-10 items-center justify-center text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="size-5" strokeWidth={1.5} />
        </button>
        <h2
          id={titleId}
          className="truncate text-[0.68rem] font-medium tracking-[0.22em] text-white/80 uppercase"
        >
          {title}
        </h2>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 text-[0.68rem] font-medium tracking-[0.18em] text-white/70 uppercase transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {t(lang, "visitFestival")}
          </a>
        ) : (
          <span className="size-10" aria-hidden="true" />
        )}
      </header>
      <div className="flex min-h-0 flex-1 items-center justify-center bg-black px-2 pb-6">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls
          playsInline
          autoPlay
          className="max-h-full max-w-full"
        />
      </div>
    </div>,
    document.body,
  );
}

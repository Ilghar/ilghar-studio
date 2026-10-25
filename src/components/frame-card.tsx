import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function FrameCard({
  cover,
  coverHi,
  coverAlt = "",
  title,
  kicker,
  featured = false,
  eager = false,
  external = false,
  contain = false,
  onClick,
  href,
}: {
  cover: string;
  coverHi?: string;
  coverAlt?: string;
  title: string;
  kicker: string;
  featured?: boolean;
  eager?: boolean;
  external?: boolean;
  contain?: boolean;
  onClick?: () => void;
  href?: string;
}) {
  const inner = (
    <>
      <span
        className={cn(
          "frame-raise relative block overflow-hidden bg-surface",
          featured ? "rounded-[1.5rem] p-1.5" : "rounded-[1.2rem] p-1",
        )}
      >
        <span
          className={cn(
            "relative block aspect-square overflow-hidden",
            featured ? "rounded-[1.2rem]" : "rounded-[0.95rem]",
            contain && "flex items-center justify-center bg-surface",
          )}
        >
          <img
            src={cover}
            srcSet={coverHi ? `${cover} ${featured ? 1280 : 640}w, ${coverHi} 1400w` : undefined}
            sizes={featured ? "(min-width: 1024px) 640px, (min-width: 768px) 512px, 92vw" : "(min-width: 1024px) 310px, (min-width: 768px) 250px, 45vw"}
            alt={coverAlt}
            width={640}
            height={640}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className={cn(
              "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]",
              contain
                ? "h-[80%] w-[80%] object-contain"
                : "h-full w-full object-cover object-center",
            )}
            draggable={false}
          />
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0",
              contain
                ? "bg-gradient-to-t from-black/20 via-transparent to-transparent"
                : "bg-gradient-to-t from-black/35 via-black/5 to-transparent",
            )}
          />
          <span className="absolute inset-x-0 bottom-2 flex justify-center px-2">
            <span
              className={cn(
                "caption-plate w-full rounded-xl text-center backdrop-blur-md",
                featured ? "bg-canvas/64 px-3 py-2" : "bg-canvas/40 px-2 py-1.5",
              )}
            >
              <span className="mb-1 flex items-center justify-center gap-1">
                <span
                  className={cn(
                    "line-clamp-1 font-medium text-ink uppercase dark:text-accent",
                    featured
                      ? "text-[0.7rem] tracking-[0.14em] md:text-[0.78rem]"
                      : "text-[0.58rem] tracking-[0.1em] md:text-[0.66rem]",
                  )}
                >
                  {title}
                </span>
                {external ? (
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3 shrink-0 text-subtle"
                    strokeWidth={1.6}
                  />
                ) : null}
              </span>
              <span
                className={cn(
                  "block line-clamp-1 font-light tracking-wide text-muted dark:text-ink",
                  featured ? "text-[0.82rem] md:text-[0.92rem]" : "text-[0.68rem] md:text-[0.76rem]",
                )}
              >
                {kicker}
              </span>
            </span>
          </span>
        </span>
      </span>
    </>
  );

  const className = cn(
    "group block w-full",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="me noopener noreferrer"
        className={className}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {inner}
    </button>
  );
}

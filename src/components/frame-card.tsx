import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function FrameCard({
  cover,
  coverHi,
  coverDark,
  coverDarkHi,
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
  coverDark?: string;
  coverDarkHi?: string;
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
  const imgClass = cn(
    contain
      ? "h-[88%] w-[88%] object-contain"
      : "h-full w-full object-cover object-center",
  );
  const sizes = featured ? "(min-width: 1024px) 960px, 92vw" : "(min-width: 1024px) 460px, 45vw";
  const wLight = featured ? 1280 : 640;

  const lightImg = (
    <img
      src={coverHi || cover}
      srcSet={coverHi ? `${cover} ${wLight}w, ${coverHi} 1400w` : undefined}
      sizes={sizes}
      alt={coverAlt}
      width={640}
      height={480}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={cn(imgClass, coverDark && "dark:hidden")}
      draggable={false}
    />
  );

  const darkImg = coverDark ? (
    <img
      src={coverDarkHi || coverDark}
      srcSet={
        coverDarkHi
          ? `${coverDark} ${wLight}w, ${coverDarkHi} 1400w`
          : undefined
      }
      sizes={sizes}
      alt=""
      aria-hidden="true"
      width={640}
      height={480}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={cn(imgClass, "hidden dark:block")}
      draggable={false}
    />
  ) : null;

  const media = (
    <>
      {lightImg}
      {darkImg}
    </>
  );

  const inner = (
    <>
      <span
        className={cn(
          "frame-raise relative block overflow-hidden bg-surface",
          "rounded-none border border-[color:var(--line-mauve,#7d5a7c)] p-0",
        )}
      >
        <span
          className={cn(
            "relative block aspect-[4/3] overflow-hidden rounded-none",
            contain && "flex items-center justify-center bg-surface",
          )}
        >
          {media}
          <span className="absolute inset-x-0 bottom-0 flex justify-center px-0">
            <span
              className={cn(
                "caption-plate w-full rounded-none text-center border-t border-[color:var(--line-mauve,#7d5a7c)] bg-canvas",
                featured ? "px-3 py-2" : "px-2 py-1.5",
              )}
            >
              <span className="mb-1 flex items-center justify-center gap-1">
                <span
                  className={cn(
                    "line-clamp-1 font-medium text-ink uppercase",
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
                  "block line-clamp-1 font-light tracking-wide text-ink",
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

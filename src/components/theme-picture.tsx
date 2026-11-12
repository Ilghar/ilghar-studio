/** Light/dark <picture> using a prefers-color-scheme source. An external
 *  script rewrites each source's media when the theme toggle sets data-theme. */
export function ThemePicture({
  light,
  lightHi,
  dark,
  darkHi,
  alt,
  width,
  height,
  sizes,
  className,
  imgClassName,
  eager = false,
}: {
  light: string;
  lightHi?: string;
  dark?: string;
  darkHi?: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}) {
  const lightSrcSet = lightHi ? `${light} ${width}w, ${lightHi} 1280w` : undefined;
  const darkSrcSet = dark
    ? darkHi
      ? `${dark} ${width}w, ${darkHi} 1280w`
      : dark
    : undefined;

  return (
    <picture className={className}>
      {dark && darkSrcSet ? (
        <source
          media="(prefers-color-scheme: dark)"
          srcSet={darkSrcSet}
          sizes={sizes}
          data-theme="dark"
        />
      ) : null}
      <img
        src={light}
        srcSet={lightSrcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : undefined}
        draggable={false}
        className={imgClassName}
      />
    </picture>
  );
}

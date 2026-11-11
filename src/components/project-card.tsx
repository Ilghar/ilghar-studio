import { ArrowUpRight } from "lucide-react";
import { type Lang, t } from "@/lib/i18n";
import type { Project } from "@/lib/profile";

const link = "cta";

/** Project with a live demo and its GitHub repo. Same 12px frame as the Work tiles. */
export function ProjectCard({ project, lang }: { project: Project; lang: Lang }) {
  const external = project.demoHref.startsWith("http");
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const sizes = "(min-width: 1024px) 460px, 92vw";
  return (
    <article className="flex flex-col">
      {project.coverLight ? (
        <a
          href={project.demoHref}
          {...ext}
          className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="frame r43 relative block overflow-hidden">
            {[
              [project.coverLight, project.coverLightHi, project.coverDark ? "dark:hidden" : ""],
              ...(project.coverDark ? [[project.coverDark, project.coverDarkHi, "hidden dark:block"]] : []),
            ].map(([src, hi, vis]) => (
              <img
                key={src}
                src={src}
                srcSet={hi ? `${src} 640w, ${hi} 1280w` : undefined}
                sizes={sizes}
                alt={project.alt ? t(lang, project.alt) : ""}
                width={640}
                height={480}
                loading="lazy"
                decoding="async"
                draggable={false}
                className={`${vis} h-full w-full object-cover object-top`}
              />
            ))}
          </span>
        </a>
      ) : null}
      <h3 className="mt-4 m-0 text-[0.78rem] font-normal tracking-[0.14em] uppercase">
        {t(lang, project.title)}
        <span className="mx-2 text-subtle" aria-hidden="true">|</span>
        <span className="font-light tracking-wide normal-case">{t(lang, project.kicker)}</span>
      </h3>
      <p className="mt-2 m-0 text-[0.9rem] font-normal leading-relaxed">{t(lang, project.claim)}</p>
      <div className="mt-1 flex flex-wrap gap-x-5">
        <a href={project.demoHref} {...ext} className={link}>
          {t(lang, "openDemo")}
          {external ? <ArrowUpRight aria-hidden="true" className="size-3" strokeWidth={1.6} /> : null}
        </a>
        <a href={project.repoHref} target="_blank" rel="noopener noreferrer" className={link}>
          {t(lang, "viewRepo")}
          <ArrowUpRight aria-hidden="true" className="size-3" strokeWidth={1.6} />
        </a>
      </div>
    </article>
  );
}

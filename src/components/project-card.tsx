import { ArrowUpRight } from "lucide-react";
import { type Lang, t } from "@/lib/i18n";
import type { Project } from "@/lib/profile";
import { ThemePicture } from "@/components/theme-picture";

export function ProjectCard({ project, lang }: { project: Project; lang: Lang }) {
  const external = project.demoHref.startsWith("http");
  const ext = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  const sizes = "(min-width: 1024px) 460px, 92vw";
  return (
    <article className="project-card flex flex-col">
      {project.coverLight ? (
        <a
          href={project.demoHref}
          {...ext}
          className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="project-cover frame r43 relative block overflow-hidden">
            <ThemePicture
              light={project.coverLight}
              lightHi={project.coverLightHi}
              dark={project.coverDark}
              darkHi={project.coverDarkHi}
              alt={project.alt ? t(lang, project.alt) : ""}
              width={640}
              height={640}
              sizes={sizes}
              className={project.motionLight ? "project-cover-art project-cover-still" : "project-cover-art"}
              imgClassName="h-full w-full object-contain"
            />
            {project.motionLight && (
              <ThemePicture
                light={project.motionLight}
                dark={project.motionDark}
                alt=""
                width={640}
                height={640}
                className="project-cover-art project-cover-motion"
                imgClassName="h-full w-full object-contain"
              />
            )}
            <span className="project-cover-wordmark" aria-hidden="true">ILGHAR.STUDIO</span>
          </span>
        </a>
      ) : null}
      <h3 className="project-card-title m-0 mt-4 text-[0.78rem] font-normal tracking-[0.14em] uppercase">
        {t(lang, project.title)}
        <span className="project-card-divider mx-2" aria-hidden="true">|</span>
        <span className="project-card-kicker font-light tracking-wide normal-case">{t(lang, project.kicker)}</span>
      </h3>
      <p className="mt-2 m-0 text-[0.9rem] font-normal leading-relaxed">{t(lang, project.claim)}</p>
      <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-4">
        <a href={project.demoHref} {...ext} className="cta">
          {t(lang, "openDemo")}
          {external ? <ArrowUpRight aria-hidden="true" className="size-3" strokeWidth={1.6} /> : null}
        </a>
        <a href={project.repoHref} target="_blank" rel="noopener noreferrer" className="cta">
          {t(lang, "viewRepo")}
          <ArrowUpRight aria-hidden="true" className="size-3" strokeWidth={1.6} />
        </a>
      </div>
    </article>
  );
}

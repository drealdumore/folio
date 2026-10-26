import Link from "next/link";
import { ArrowIcon } from "@/components/design/arrow-icon";
import { BlurUpImage } from "@/components/media/blur-up-image";
import {
  ALLPROJECTS,
  CASE_STUDY_LABELS,
  type CaseStudy,
} from "@/content/site";

export function NextProjectCard({ project }: { project: CaseStudy }) {
  const card =
    ALLPROJECTS.find(
      (item) => item.projectLink === `/projects/${project.id}`
    ) ?? ALLPROJECTS.find((item) => item.projectName === project.title);

  const previewScreens = card?.mobileScreens?.slice(0, 3) ?? [];
  const image =
    project.heroImage ?? project.gallery?.[0]?.src ?? card?.image;

  if (!image && previewScreens.length === 0) return null;

  const details = (
    <>
      <div className="min-w-0">
        <p
          className={`text-[10px] font-medium uppercase tracking-[0.18em] ${
            previewScreens.length > 0 ? "text-zinc-500" : "text-white/55"
          }`}
        >
          {CASE_STUDY_LABELS.nextProject}
        </p>
        <h2
          className={`mt-1.5 text-[22px] font-semibold tracking-[-0.02em] sm:text-[26px] ${
            previewScreens.length > 0 ? "text-text-heading" : "text-white"
          }`}
        >
          {project.sub}
        </h2>
        {project.oneLiner && (
          <p
            className={`mt-1 max-w-md text-[13px] leading-[1.6] sm:text-[14px] ${
              previewScreens.length > 0 ? "text-zinc-400" : "text-white/60"
            }`}
          >
            {project.oneLiner}
          </p>
        )}
      </div>

      <span className="theme-dark-surface mb-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-white/20">
        <ArrowIcon size={18} className="-rotate-45" />
      </span>
    </>
  );

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block overflow-hidden rounded-[14px] border border-zinc-800/70 bg-zinc-900/20"
    >
      {previewScreens.length > 0 ? (
        <>
          <div className="relative overflow-hidden bg-zinc-950 px-3 pt-4 sm:px-6 sm:pt-6">
            <div className="mx-auto flex max-w-2xl items-end justify-center gap-2 sm:gap-4">
              {previewScreens.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="relative aspect-[9/19] min-w-0 flex-1 overflow-hidden rounded-[10px] border border-white/10 bg-zinc-900 shadow-lg sm:rounded-[14px]"
                >
                  <BlurUpImage
                    src={src}
                    alt={`${project.sub} screen ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 29vw, 180px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 p-5 sm:p-7">
            {details}
          </div>
        </>
      ) : image ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950 sm:aspect-[16/9]">
          <BlurUpImage
            src={image}
            alt={`${project.sub} preview`}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            minBlurMs={320}
          />

          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-5 sm:p-7">
            {details}
          </div>
        </div>
      ) : null}
    </Link>
  );
}

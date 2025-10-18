"use client";

import Image from "next/image"; // <-- import Image here
import { WorkHeading } from "@/components/design/heading";
import Motion from "@/motion/y-motion";
import { MOBILE_APPS } from "@/content/projects";

const ProjectsDetailTemplate = ({ id }: { id: string }) => {
  const project = MOBILE_APPS.find((p) => p.id === id);

  if (!project) {
    return <p className="text-text-normal">Project not found</p>;
  }

  return (
    <Motion>
      <WorkHeading title={project.title} sub={project.sub} />

      <article className="pb-16 space-y-12">
        {/* Info Grid */}
        <div className="flex flex-col justify-between gap-6 mb-8">
          <div className="max-w-xl">
            <p className="text-text-normal">{project.intro}</p>
          </div>

          <div>
            <table>
              <tbody className="divide-y divide-zinc-700">
                <tr>
                  <td className="pr-6 py-2 font-semibold text-text-heading">
                    Year
                  </td>
                  <td className="text-text-normal">{project.year}</td>
                </tr>
                <tr>
                  <td className="pr-6 py-2 font-semibold text-text-heading">
                    Built by
                  </td>
                  <td className="text-text-normal">{project.builtBy}</td>
                </tr>
                {project.website && (
                  <tr>
                    <td className="pr-6 py-2 font-semibold text-text-heading">
                      Website
                    </td>
                    <td>
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-normal hover:text-text-heading hover:underline"
                      >
                        {project.website}
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hero Image */}
        {project.heroImage && (
          <div
            className="w-full overflow-hidden rounded-2xl shadow-md relative"
            style={{ height: "400px" }}
          >
            <Image
              src={project.heroImage}
              alt={`${project.sub} Hero`}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              priority={true} // You can set priority for above-the-fold images
            />
          </div>
        )}

        {/* Intro Text */}
        {project.introText && (
          <p className="max-w-3xl leading-relaxed text-text-normal">
            {project.introText}
          </p>
        )}

        {/* Gallery */}
        {project.gallery?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.gallery.map((img, i) => (
              <div
                key={i}
                className="relative w-full h-48 rounded-xl shadow-sm overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt || `Gallery image ${i + 1}`}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {/* Process Grid */}
        <div className="grid grid-cols-1 gap-12 my-32 relative">
          <div>
            <h3 className="text-xl font-bold text-text-heading mb-4">
              Challenge
            </h3>
            <p className="text-text-normal leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {project.actions?.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-text-heading">Action</h3>
              {project.actions.map((action, i) => (
                <div key={i}>
                  <h4 className="font-semibold text-text-heading">
                    {action.title}
                  </h4>
                  <p className="text-text-normal leading-relaxed">
                    {action.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Result */}
        {project.result && (
          <div>
            <h3 className="text-xl font-bold text-text-heading mb-4">Result</h3>
            <p className="max-w-3xl text-text-normal leading-relaxed">
              {project.result}
            </p>
          </div>
        )}

        {/* Project Links */}
        {project.links?.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-8">
            {project.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-lg transition ${
                  i === 0
                    ? "bg-text-heading text-background hover:bg-text-normal"
                    : "border border-text-heading text-text-heading hover:bg-zinc-800"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </article>
    </Motion>
  );
};

export default ProjectsDetailTemplate;

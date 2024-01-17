"use client";

import { EXPERIENCE } from "@/content/experience";

const Experience = () => {
  return (
    <>
      <div className="border-t border-zinc-700">
        <h3 className="text-lg font-semibold mt-5 mb-2 text-text-heading">Experience</h3>
        <div className="mb-4">
          {EXPERIENCE.map((exp, index) => (
            <div key={index} className="flex flex-col gap-2 mb-8">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-text-heading">{exp.company}</p>
                <p className="text-text-normal">{exp.duration}</p>
              </div>
              <div className="transition-all duration-400 hover:translate-x-2 hover:border-l-2 hover:pl-2">
                <p className="font-semibold text-text-heading">{exp.title}</p>
                {exp.description.map((desc, i) => (
                  <div className="flex gap-3">
                    <p className="font-light text-text-normal">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p key={i} className="text-text-normal mb-4 md:max-w-[90%]">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Experience;

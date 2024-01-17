import Link from "next/link";
import React from "react";
import { REPOS } from "@/content/repos";

const Repos = () => {
  return (
    <section>
      <div className="heading pt-8 mb-3">
        <h2 className="md:text-2xl text-xl font-bold text-text-heading">
          Highlighted Repos
        </h2>
      </div>

      <div className="py-2 flex flex-col gap-5">
        {REPOS.map((repo) => (
          <div key={repo.name} className="group relative">
            <Link
              href={repo.url!}
              target="_blank"
              rel="noopener noreferrer"
              className="w-max text-text-heading flex items-center gap-[0.15rem] relative text-lg font-semibold font-firacode"
            >
              {repo.name}
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-current origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ease-in-out"></span>
            </Link>
            <p className="xl:leading-[30px] sm:leading-[27px] mt-2 xl:text-[1.07rem] sm:text-[14px] text-text-normal mb-2 ">
              {repo.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-end">
        <span className="tag text-text-normal">
          Stay tuned for more stuffs!
        </span>
      </div>
    </section>
  );
};

export default Repos;

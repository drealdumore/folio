"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SvgFilter } from "@/components/design/svgFilter";

const AppNav = () => {
  const pathName = usePathname();

  const links = [
    { link: "/about", title: "About" },
    { link: "/projects", title: "Projects" },
    {
      link: "/files/samuel-isah-resume.pdf",
      title: "Resume",
    },
  ];

  return (
    <>
      <nav
        aria-label="Main navigation"
        className="gap-12 px-2 text-text-normal sticky mt-2 pb-1 pt-2 top-0 z-[51] w-full max-w-none mx-auto nav backdrop-blur-sm "
      >
        <div className="w-full px-0 md:px-1.5  flex items-center justify-between max-w-screen-lx mx-auto">
          <div>
            <Link
              href="/"
              className="flex flex-col focus:outline-none rounded"
              aria-label="Samuel Isah - Home"
            >
              <span className="block font-semibold sm:font-sans text-text-heading">
                Samuel
              </span>
              <span className="text-[13px] hidden md:block opacity-80 group-hover:opacity-100 text-text-normal">
                Full-Stack Developer
              </span>
            </Link>
          </div>

          <div className="flex items-center md:gap-4 gap-2 justify-between md:justify-normal w-auto px-0">
            {links.map((link, i) => (
              <Link
                prefetch={true}
                key={i}
                href={link.link}
                target={i === links.length - 1 ? "_blank" : ""}
                rel={i === links.length - 1 ? "noopener noreferrer" : undefined}
                aria-label={
                  i === links.length - 1
                    ? `${link.title} (opens in new tab)`
                    : link.title
                }
                className={`${
                  pathName === link.link
                    ? "text-text-heading"
                    : "text-text-heading/50"
                } flex items-center rounded-[8px]  justify-center px-2 h-9 hover:text-text-heading focus:text-text-heading focus:outline-none  py-4 transition-all duration-150 font-medium md:w-auto w-full text-center text-sm z-50 relative`}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <SvgFilter />
    </>
  );
};

export default AppNav;

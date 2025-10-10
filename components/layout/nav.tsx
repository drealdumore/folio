"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SvgFilter } from "@/components/design/svgFilter";

const AppNav = () => {
  const pathName = usePathname();

  const links = [
    // { link: "/", title: "Home" },
    { link: "/about", title: "About" },
    { link: "/projects", title: "Projects" },
    {
      link: "/files/samuel-isah-resume.pdf",
      // link: "/files/samuel_isah_resume.pdf",
      // link: "https://drive.google.com/file/d/1QfhiecFxJ0OWFoPWxxjj4Uhmy1LCVI7T/view?usp=sharing",
      title: "Resume",
    },
  ];





  return (
    <>
      <nav aria-label="Main navigation" className="gap-12 px-2 text-text-normal sticky mt-2 pb-1 pt-2 top-0 z-[51] w-full max-w-none mx-auto nav">
        <div className="w-full px-0 md:px-1.5  flex items-center justify-between max-w-screen-lx mx-auto">
          <div>
            <Link href="/" className="flex flex-col focus:outline-none focus:ring-2 focus:ring-text-heading focus:ring-offset-2 focus:ring-offset-background rounded" aria-label="Samuel Isah - Home">
              <span className="block font-semibold sm:font-sans text-text-heading">Samuel</span>
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
                aria-label={i === links.length - 1 ? `${link.title} (opens in new tab)` : link.title}
                className={`${
                  pathName === link.link ? "text-text-heading" : "text-text-normal"
                } flex items-center rounded-[8px] justify-center px-2 h-9 hover:text-text-heading focus:text-text-heading focus:outline-none focus:ring-2 focus:ring-text-heading focus:ring-offset-2 focus:ring-offset-background py-4 transition-colors duration-150 font-medium md:w-auto w-full text-center text-sm z-50 relative`}
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

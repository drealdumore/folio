"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { SvgFilter } from "@/components/design/svgFilter";
import { hoverScale } from "@/hooks/useScrollAnimation";

const AppNav = () => {
  const pathname = usePathname();

  const links = [
    {
      link: "/files/samuel-isah-resume.pdf",
      title: "Resume",
      external: true, 
    },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.1,
        }}
        aria-label="Main navigation"
        className="sticky top-0 z-[51] w-full nav backdrop-blur-sm px-2 pt-2 pb-1 mt-2 text-text-normal"
      >
        <div className="flex items-center justify-between w-full max-w-screen-lx mx-auto px-0 md:px-1.5">
          <motion.div whileHover={hoverScale}>
            <Link
              href="/"
              className="flex flex-col group focus:outline-none rounded"
              aria-label="Samuel Isah - Home"
            >
              <span className="block font-semibold font-mono text-text-heading transition-colors duration-300 group-hover:text-white">
                Samuel
              </span>
              <span className="hidden md:block text-[13px] opacity-80 group-hover:opacity-100 text-text-normal transition-all duration-300">
                Full-Stack Developer
              </span>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 md:gap-4 justify-between md:justify-normal w-auto px-0">
            {links.map(({ link, title, external }, i) => (
                <Link
                key={i}
                  href={link}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  aria-label={external ? `${title} (opens in new tab)` : title}
                  className={`${
                    !external && pathname === link
                      ? "text-text-heading"
                      : "text-text-heading/50"
                  } flex items-center justify-center px-3 h-9 py-2 text-sm font-medium text-center transition-all duration-300 rounded-md hover:text-text-heading hover:bg-zinc-800/30 focus:outline-none focus:text-text-heading md:w-auto w-full z-50 relative`}
                >
                  {title}
                </Link>
            ))}
          </div>
        </div>
      </motion.nav>

      <SvgFilter />
    </>
  );
};

export default AppNav;

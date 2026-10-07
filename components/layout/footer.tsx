"use client";

import React from "react";
import Link from "next/link";

const AppFooter = () => {
  return (
    <footer className="py-8 border-t border-t-zinc-800/60">
      <div className="max-w-screen-lx mx-auto flex items-center justify-between">
        <p className="text-[13px] text-zinc-600">
          Samuel Isah · {new Date().getFullYear()}
        </p>
        <div className="flex gap-5">
          <Link
            target="_blank"
            className="text-zinc-600 hover:text-zinc-400 transition-colors duration-200"
            href="https://twitter.com/drealdumore"
            aria-label="Twitter"
          >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="16" width="16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
            </svg>
          </Link>
          <Link
            target="_blank"
            className="text-zinc-600 hover:text-zinc-400 transition-colors duration-200"
            href="https://www.linkedin.com/in/samuel-isah"
            aria-label="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </g>
            </svg>
          </Link>
          <Link
            target="_blank"
            className="text-zinc-600 hover:text-zinc-400 transition-colors duration-200"
            href="https://github.com/drealdumore"
            aria-label="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>
          </Link>
          <Link
            target="_blank"
            className="text-zinc-600 hover:text-zinc-400 transition-colors duration-200"
            href="mailto:samuelisah234@gmail.com"
            aria-label="Email"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;

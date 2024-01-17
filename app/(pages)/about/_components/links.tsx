"use client";

import { CONTACTS, EmailIcon } from "@/constants/social-profiles";

import { useMemo } from "react";

import Link from "next/link";

type Contact = {
  href: string;
  text: string;
  icon: React.ReactNode;
};

const Links = () => {
  const [filteredContacts, emailContacts] = useMemo(() => {
    return CONTACTS.reduce<[Contact[], Contact[]]>(
      (acc, contact) => {
        if (contact.href.startsWith("mailto:")) {
          acc[1].push(contact);
        } else {
          acc[0].push(contact);
        }
        return acc;
      },
      [[], []]
    );
  }, []);

  const linkClasses =
    "font-normal cursor-alias inline-flex items-center gap-2 text-text-normal hover:text-text-heading hover:underline duration-150 transition-colors";

  return (
    <div className="max-w-s flex gap-20 w-full lg:ml-auto xs:grid xs:grid-cols-2">
      <div className="self-start mb-10 xs:mb-0">
        <h2 className="font-semibold mb-3 text-text-heading">Socials</h2>
        <ul className="space-y-2">
          {filteredContacts.map((link, index) => (
            <li key={index}>
              <Link href={link.href} target="blank" className={linkClasses}>
                {link.icon}
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="font-semibold mb-3 text-text-heading">Contact</h2>
        <ul className="space-y-2">
          {emailContacts.map((link, index) => (
            <li key={index}>
              <Link href={link.href} target="blank" className={linkClasses}>
                <EmailIcon />
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Links;

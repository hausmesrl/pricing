"use client";

import Image from "next/image";
import { useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { ACCOUNT_LINK, BRAND_LOGO, NAV_LINKS, SITE_URL } from "@/config/site";

/** Navbar del sito Hausme (fondo navy, link Outfit bold bianchi). */
export function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = (current?: boolean) =>
    `font-display text-base font-bold transition-colors hover:text-pink-200 ${
      current ? "underline decoration-2 underline-offset-4" : ""
    }`;

  return (
    <header className="bg-navy text-white">
      <nav
        aria-label="Navigazione principale"
        className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-6 lg:px-8"
      >
        <a href={SITE_URL} className="shrink-0">
          <Image
            src={BRAND_LOGO.src}
            alt={BRAND_LOGO.alt}
            width={BRAND_LOGO.width}
            height={BRAND_LOGO.height}
            priority
          />
        </a>

        <ul className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => {
            const current = "current" in link && link.current;
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={linkClass(current)}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          <li>
            <a
              href={ACCOUNT_LINK.href}
              aria-label={ACCOUNT_LINK.label}
              className="flex size-10 items-center justify-center rounded-full hover:bg-white/10"
            >
              <Image src="/brand/icon-user.svg" alt="" width={24} height={24} />
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-tile md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="size-7" /> : <MenuIcon className="size-7" />}
        </button>
      </nav>

      <div id="mobile-menu" hidden={!open} className="border-t border-white/10 px-6 pb-6 md:hidden">
        <ul className="flex flex-col">
          {NAV_LINKS.map((link) => {
            const current = "current" in link && link.current;
            return (
              <li key={link.label} className="border-b border-white/10">
                <a
                  href={link.href}
                  aria-current={current ? "page" : undefined}
                  className={`block py-3.5 ${linkClass(current)}`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
          <li>
            <a href={ACCOUNT_LINK.href} className={`block py-3.5 ${linkClass()}`}>
              {ACCOUNT_LINK.label}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

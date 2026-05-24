"use client";

import Link from "next/link";
import { SITE_CONTACT, SITE_CONTACT_MAILTO_HREF, SITE_CONTACT_TEL_HREF } from "@/lib/site-contact";
import { useLanguage } from "@/components/language-provider";

export function SiteFooter() {
  const { locale } = useLanguage();

  return (
    <footer className="border-t border-white/8 bg-[#0a0a0a] py-14 text-sm text-[#8B7355]">
      <div className="reveal-item mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-serif text-lg tracking-[0.15em] text-[#EAE7E1]">LAVANDA</p>
            <p className="mt-2 max-w-xs">
              Handcrafted log homes since 1995.
              <br />
              {locale === "ua" ? "Україна та Європа." : "Ukraine & Europe."}
            </p>
            <div className="mt-6 space-y-1.5 text-[#EAE7E1]/80">
              <p className="text-[#EAE7E1]">{SITE_CONTACT.personName}</p>
              <p>
                <a href={SITE_CONTACT_TEL_HREF} className="text-[#C6A36D] hover:underline">
                  {SITE_CONTACT.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={SITE_CONTACT_MAILTO_HREF} className="text-[#C6A36D] hover:underline">
                  {SITE_CONTACT.email}
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <Link href="https://holzbaurustikal.de/" target="_blank" rel="noopener noreferrer" className="text-[#C6A36D] underline-offset-4 hover:underline">
            holzbaurustikal.de
            </Link>
          </div>
        </div>
        <p className="mt-12 text-xs text-[#8B7355]/70">
          © {new Date().getFullYear()} Lavanda.{" "}
          {locale === "ua" ? "Усі права захищені." : "All rights reserved."}
        </p>
      </div>
    </footer>
  );
}

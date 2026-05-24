"use client";

import Image from "next/image";
import { ConsultationCtaButton } from "@/components/landing/consultation-cta-button";
import { IMG } from "@/lib/site-media";
import { SITE_CONTACT, SITE_CONTACT_MAILTO_HREF, SITE_CONTACT_TEL_HREF } from "@/lib/site-contact";
import { useLanguage } from "@/components/language-provider";

export function CtaSection() {
  const { locale } = useLanguage();

  return (
    <section id="contact" className="scroll-mt-20 relative min-h-[70vh] w-full overflow-hidden">
      <Image
        src={IMG.whiteHouseNight}
        alt={locale === "ua" ? "Зруб уночі з архітектурним підсвічуванням" : "Log house at night with architectural lighting"}
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/35" />
      <div className="reveal-item relative z-10 mx-auto flex min-h-[70vh] max-w-[1440px] flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
        <p className="font-mono text-[12px] uppercase tracking-[0.4em] text-[#C6A36D]">Lavanda</p>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl font-normal text-[#EAE7E1] sm:text-4xl md:text-5xl">
          {locale === "ua" ? "Збудуємо ваш дім із дикого зрубу" : "Let's build your log home"}
        </h2>
        <p className="mt-4 max-w-md font-sans text-sm text-[#EAE7E1]/70">
          {locale === "ua"
            ? "Збудуємо ваш дім із дикого зрубу — від концепції до ключів."
            : "We will build your handcrafted log home — from concept to keys."}
        </p>

        <div className="mt-10 max-w-md space-y-2 font-sans text-sm text-[#EAE7E1]/85 sm:text-base">
          <p className="font-medium text-[#EAE7E1]">{SITE_CONTACT.personName}</p>
          <p>
            <a href={SITE_CONTACT_TEL_HREF} className="text-[#C6A36D] underline-offset-4 hover:underline">
              {SITE_CONTACT.phoneDisplay}
            </a>
          </p>
          <p>
            <a href={SITE_CONTACT_MAILTO_HREF} className="text-[#C6A36D] underline-offset-4 hover:underline">
              {SITE_CONTACT.email}
            </a>
          </p>
        </div>

        <ConsultationCtaButton className="mt-10 inline-flex border border-[#C6A36D] bg-[#C6A36D] px-10 py-4 text-sm font-medium uppercase tracking-[0.25em] text-[#0F0F0F] transition hover:bg-[#d4b07e]" />
      </div>
    </section>
  );
}

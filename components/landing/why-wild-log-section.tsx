"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/components/language-provider";

const pillarsTranslations = {
  ua: [
    { title: "Натуральність", text: "Жодного клею чи штучних замінників — лише цільна колода." },
    { title: "Довговічність", text: "Прийоми, перевірені століттями, і канадська інженерія." },
    { title: "Унікальність", text: "Кожен будинок індивідуальний — без повторюваних шаблонів." },
    { title: "Статус", text: "Преміум-сегмент, який неможливо відтворити дешевими імітаціями." },
  ],
  en: [
    { title: "Naturality", text: "No glue or artificial substitutes — only solid round logs." },
    { title: "Durability", text: "Time-tested techniques coupled with Canadian engineering." },
    { title: "Uniqueness", text: "Each home is custom-crafted, with no replicated templates." },
    { title: "Status", text: "A premium segment that cannot be replicated by cheap imitations." },
  ],
} as const;

const ICONS: ReactNode[] = [
  // Натуральність — листок
  <svg key="leaf" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6" />
  </svg>,
  // Довговічність — щит
  <svg key="shield" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
  // Унікальність — іскра
  <svg key="spark" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    <circle cx="12" cy="12" r="3" />
  </svg>,
  // Статус — корона
  <svg key="crown" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 18h20M3 7l4 4 5-7 5 7 4-4-2 11H5L3 7Z" />
  </svg>,
];

export function WhyWildLogSection() {
  const { locale } = useLanguage();
  const pillars = pillarsTranslations[locale];

  return (
    <section id="why" className="relative scroll-mt-20 overflow-hidden bg-[#0F0F0F] py-20 sm:py-28">
      {/* М'яке золоте світіння у фоні — додає глибини */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/4 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(198,163,109,0.10),transparent)] blur-2xl"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="reveal-item max-w-3xl">
          <p className="font-mono text-[12px] uppercase tracking-[0.35em] text-[#C6A36D]/90">
            {locale === "ua" ? "Чому саме дикий зруб" : "Why Handcrafted Logs"}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-[#EAE7E1] sm:text-4xl md:text-5xl">
            {locale === "ua" ? "Справжня архітектура з цільного дерева" : "Authentic Solid Wood Architecture"}
          </h2>
          <p className="mt-5 font-sans text-base leading-7 text-[#EAE7E1]/60">
            {locale === "ua"
              ? "Чотири причини, чому цільний зруб — це інвестиція в покоління, а не просто будинок."
              : "Four reasons solid handcrafted logs are an investment for generations, not just a house."}
          </p>
        </div>

        <ul className="mt-14 grid list-none gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <li key={p.title} className="reveal-item min-w-0" style={{ transitionDelay: `${i * 90}ms` }}>
              <article
                className={[
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl will-change-transform",
                  "border border-white/[0.07] bg-gradient-to-b from-white/[0.06] to-transparent",
                  "p-7 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.85)]",
                  "transition duration-300 ease-out",
                  "hover:-translate-y-1 hover:border-[#C6A36D]/30 hover:from-white/[0.10]",
                  "hover:shadow-[0_36px_72px_-24px_rgba(0,0,0,0.95)]",
                  "focus-within:border-[#C6A36D]/30",
                ].join(" ")}
              >
                {/* Лінія-акцент зверху на hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C6A36D]/60 to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
                />

                {/* Привидний номер */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-1 -top-3 select-none font-serif text-7xl leading-none text-white/[0.04] transition-colors duration-300 group-hover:text-[#C6A36D]/[0.10]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Іконка в золотому кільці */}
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C6A36D]/30 bg-[#C6A36D]/[0.06] text-[#C6A36D] transition-colors duration-300 group-hover:border-[#C6A36D]/55 group-hover:bg-[#C6A36D]/[0.12]">
                  {ICONS[i]}
                </div>

                <h3 className="mt-6 font-serif text-xl font-normal tracking-tight text-[#EAE7E1]">{p.title}</h3>
                <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-[#EAE7E1]/65 sm:text-sm">
                  {p.text}
                </p>

                <div
                  aria-hidden
                  className="mt-8 h-px w-8 bg-[#C6A36D]/35 transition-[width,background-color] duration-300 ease-out group-hover:w-full group-hover:bg-[#C6A36D]/50"
                />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

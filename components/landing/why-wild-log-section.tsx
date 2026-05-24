"use client";

import { useLanguage } from "@/components/language-provider";

const pillarsTranslations = {
  ua: [
    {
      title: "Натуральність",
      text: "Жодного клею чи штучних замінників — лише цільна колода.",
    },
    {
      title: "Довговічність",
      text: "Прийоми, перевірені століттями, і канадська інженерія.",
    },
    {
      title: "Унікальність",
      text: "Кожен будинок індивідуальний — без повторюваних шаблонів.",
    },
    {
      title: "Статус",
      text: "Преміум-сегмент, який неможливо відтворити дешевими імітаціями.",
    },
  ],
  en: [
    {
      title: "Naturality",
      text: "No glue or artificial substitutes — only solid round logs.",
    },
    {
      title: "Durability",
      text: "Time-tested techniques coupled with Canadian engineering.",
    },
    {
      title: "Uniqueness",
      text: "Each home is custom-crafted, with no replicated templates.",
    },
    {
      title: "Status",
      text: "A premium segment that cannot be replicated by cheap imitations.",
    },
  ],
};

export function WhyWildLogSection() {
  const { locale } = useLanguage();
  const pillars = pillarsTranslations[locale];

  return (
    <section id="why" className="scroll-mt-20 bg-[#0F0F0F] py-20 sm:py-28">
      <div className="reveal-item mx-auto max-w-[1440px] px-5 sm:px-8">
        <p className="font-mono text-[12px] uppercase tracking-[0.35em] text-[#C6A36D]/90">
          {locale === "ua" ? "Чому саме дикий зруб" : "Why Handcrafted Logs"}
        </p>
        <h2 className="mt-3 max-w-3xl font-serif text-3xl font-normal leading-tight tracking-tight text-[#EAE7E1] sm:text-4xl md:text-5xl">
          {locale === "ua" ? "Справжня архітектура з цільного дерева" : "Authentic Solid Wood Architecture"}
        </h2>

        <ul className="mt-14 grid list-none gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {pillars.map((p, i) => (
            <li key={p.title} className="min-w-0">
              <article
                className={[
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl will-change-transform",
                  "border border-white/[0.06] bg-gradient-to-b from-white/[0.06] to-transparent",
                  "p-7 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.85)]",
                  "transition duration-300 ease-out",
                  "hover:-translate-y-0.5 hover:border-[#C6A36D]/25 hover:from-white/[0.09] hover:shadow-[0_32px_64px_-24px_rgba(0,0,0,0.9)]",
                  "focus-within:border-[#C6A36D]/30 focus-within:ring-1 focus-within:ring-[#C6A36D]/20",
                ].join(" ")}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C6A36D]/50 to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
                />
                <h3 className="mt-5 font-serif text-xl font-normal tracking-tight text-[#EAE7E1]">{p.title}</h3>
                <p className="mt-3 flex-1 font-sans text-[15px] leading-relaxed text-[#EAE7E1]/65 sm:text-sm">
                  {p.text}
                </p>
                <div
                  aria-hidden
                  className="mt-8 h-px w-8 bg-[#C6A36D]/35 transition-[width,background-color] duration-300 ease-out group-hover:w-full group-hover:bg-[#C6A36D]/45"
                />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

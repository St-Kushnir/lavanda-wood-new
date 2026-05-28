import type { ProjectLocale } from "@/lib/projects-i18n";

export type Locale = ProjectLocale; // "ua" | "en"

export const locales: readonly Locale[] = ["ua", "en"] as const;
export const defaultLocale: Locale = "ua";

export const SITE_URL = "https://lavanda-wood.com";

/** Чи рядок є підтримуваною локаллю */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** ISO-код для атрибута <html lang> (URL-сегмент "ua" → код "uk") */
export function htmlLang(locale: Locale): string {
  return locale === "ua" ? "uk" : "en";
}

/** Шлях для локалі: дефолтна (ua) — на корені, решта — з префіксом */
export function pathForLocale(locale: Locale): string {
  return locale === defaultLocale ? "/" : `/${locale}`;
}

/** hreflang-альтернативи для metadata.alternates.languages */
export const hreflangLanguages: Record<string, string> = {
  uk: "/",
  en: "/en",
  "x-default": "/",
};

/** Локалізовані title/description для метаданих */
export const localeMeta: Record<Locale, { title: string; description: string; ogLocale: string }> = {
  ua: {
    title: "LAVANDA — будинки з дикого зрубу за канадською технологією",
    description:
      "Будівництво преміальних дерев'яних будинків із цільного дикого зрубу за канадською технологією ручної рубки. Резиденції з натурального дерева в Україні та Європі. COMPANY VASYNA / LAVANDA, з 1995 року.",
    ogLocale: "uk_UA",
  },
  en: {
    title: "LAVANDA — handcrafted log homes since 1995",
    description:
      "Construction of premium handcrafted log homes from solid wild logs using Canadian technology. Natural-wood residences in Ukraine and Europe by COMPANY VASYNA / LAVANDA, since 1995.",
    ogLocale: "en_US",
  },
};

/** FAQ для FAQPage (GEO: легко цитується ШІ-системами) */
export const faq: Record<Locale, { q: string; a: string }[]> = {
  ua: [
    {
      q: "За якою технологією LAVANDA будує дерев'яні будинки?",
      a: "Ми будуємо будинки з цільного дикого зрубу за канадською технологією ручної рубки (handcrafted log homes) з канадською чашею (saddle notch) та ручною підгонкою кожної колоди для щільної посадки без зазорів.",
    },
    {
      q: "З якого року працює компанія?",
      a: "COMPANY VASYNA / LAVANDA працює з 1995 року. У Європі компанія представлена з 2013 року під брендом HolzbauRustikal у Німеччині.",
    },
    {
      q: "Де LAVANDA реалізує проєкти?",
      a: "Ми працюємо в Україні та по всій Європі — від приватних резиденцій до знакових об'єктів на престижних курортах, через представництво HolzbauRustikal у Німеччині.",
    },
    {
      q: "Яку деревину ви використовуєте?",
      a: "Цільну круглу деревину діаметром 30–50 см, віком від 80 років і більше, з максимально щільним зовнішнім шаром (заболонню), що забезпечує міцність, стабільність і довговічність конструкції.",
    },
    {
      q: "Які типи об'єктів ви будуєте?",
      a: "Шале, приватні будинки, лазні та SPA, а також комерційні й курортні об'єкти з натурального дерева за канадською технологією.",
    },
  ],
  en: [
    {
      q: "Which technology does LAVANDA use to build log homes?",
      a: "We build solid wild-log homes using the Canadian handcrafted log construction method with a saddle notch and hand-fitting of every log for a tight, gap-free fit.",
    },
    {
      q: "Since when has the company been operating?",
      a: "COMPANY VASYNA / LAVANDA has been operating since 1995. In Europe the company has been present since 2013 under the HolzbauRustikal brand in Germany.",
    },
    {
      q: "Where does LAVANDA build its projects?",
      a: "We work in Ukraine and across Europe — from private residences to signature properties at prestigious resorts — through the HolzbauRustikal representation in Germany.",
    },
    {
      q: "What kind of timber do you use?",
      a: "Solid round timber 30–50 cm in diameter, aged 80 years or more, with the densest outer layer (sapwood), which ensures strength, stability and durability of the structure.",
    },
    {
      q: "What types of buildings do you construct?",
      a: "Chalets, private houses, baths and SPAs, as well as commercial and resort properties made of natural wood using Canadian technology.",
    },
  ],
};

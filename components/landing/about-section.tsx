"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

const COLLAGE_ITEMS = [
  {
    src: "/office/lavanda-office-germany-2.jpg",
    floatClass: "lavanda-float",
    tall: true,
    alt: {
      ua: "Представництво HOLZBAU RUSTIKAL у Німеччині",
      en: "HOLZBAU RUSTIKAL office in Germany",
    },
    badge: {
      ua: { title: "HOLZBAU RUSTIKAL", subtitle: "Представництво у Німеччині" },
      en: { title: "HOLZBAU RUSTIKAL", subtitle: "Representation in Germany" },
    },
  },
  {
    src: "/the-best-raw-materials.jpg",
    floatClass: "lavanda-float-delayed",
    tall: false,
    alt: {
      ua: "Найкращі матеріали для будівництва зрубів",
      en: "The best raw materials for log home construction",
    },
    badge: {
      ua: { title: "Якість", subtitle: "Перевірені матеріали" },
      en: { title: "Quality", subtitle: "Verified materials" },
    },
  },
  {
    src: "/reliable-technology-combined-with-craftsmanship.jpg",
    floatClass: "lavanda-float-slow",
    tall: false,
    alt: {
      ua: "Надійна технологія та ручна майстерність",
      en: "Reliable technology combined with craftsmanship",
    },
    badge: {
      ua: { title: "1995", subtitle: "Досвід та професіоналізм" },
      en: { title: "1995", subtitle: "Experience and professionalism" },
    },
  },
] as const;

const STATS = {
  ua: [
    { value: "1995", label: "Рік заснування" },
    { value: "30–50 см", label: "Діаметр колоди" },
    { value: "80+", label: "Років вік деревини" },
    { value: "Європа", label: "Географія проєктів" },
  ],
  en: [
    { value: "1995", label: "Founded" },
    { value: "30–50 cm", label: "Log diameter" },
    { value: "80+", label: "Years of wood age" },
    { value: "Europe", label: "Project geography" },
  ],
} as const;

export function AboutSection() {
  const { locale } = useLanguage();
  const stats = STATS[locale];

  return (
    <section id="about" className="scroll-mt-20 bg-[#121212] py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <p className="reveal-item font-mono text-[12px] uppercase tracking-[0.35em] text-[#C6A36D]/90">
          {locale === "ua" ? "Про компанію" : "About the company"}
        </p>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          {/* Текстова колонка */}
          <div className="reveal-item">
            <h2 className="font-serif text-3xl font-normal leading-tight text-[#EAE7E1] sm:text-4xl md:text-5xl">
              {locale === "ua" ? "30+ років майстерності роботи з деревом" : "30+ Years of Wood Craftsmanship"}
            </h2>

            {/* Лід — перший, найважливіший абзац */}
            <p className="mt-7 font-sans text-lg leading-8 text-[#EAE7E1]/90 sm:text-xl">
              {locale === "ua"
                ? "COMPANY VASYNA заснована у 1995 році. Понад 20 років ми успішно працюємо на європейському ринку, спеціалізуючись на будівництві преміальних будинків із масивної деревини."
                : "COMPANY VASYNA was founded in 1995. For over 20 years we have successfully operated in the European market, specializing in premium houses made of solid timber."}
            </p>

            {/* Решта тексту — компактніше та світліше */}
            <div className="mt-6 space-y-4 font-sans text-[15px] leading-7 text-[#EAE7E1]/65">
              <p>
                {locale === "ua" ? (
                  <>
                    В Україні наше виробництво представлене під брендом{" "}
                    <span className="text-[#EAE7E1]/90">LAVANDA</span> — сучасним комплексом із глибокою експертизою та
                    відпрацьованими технологіями європейської якості. З 2013 року компанія також працює в Німеччині під
                    брендом{" "}
                    <Link
                      href="https://holzbaurustikal.de/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C6A36D] underline-offset-4 hover:underline">
                      HOLZBAU RUSTIKAL
                    </Link>{" "}
                    — визнаним лідером Європи з будівництва будинків із цільного дерева за канадськими технологіями.
                  </>
                ) : (
                  <>
                    In Ukraine our production runs under the brand{" "}
                    <span className="text-[#EAE7E1]/90">LAVANDA</span> — a modern facility with deep expertise and
                    perfected technologies of European quality. Since 2013 the company is also represented in Germany
                    under the brand{" "}
                    <Link
                      href="https://holzbaurustikal.de/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C6A36D] underline-offset-4 hover:underline">
                      HOLZBAU RUSTIKAL
                    </Link>{" "}
                    — an acknowledged European leader in solid log home construction using Canadian technologies.
                  </>
                )}
              </p>
              <p>
                {locale === "ua"
                  ? "Будівництво виконується з цільної круглої деревини діаметром 30–50 см, віком від 80 років із максимально щільним зовнішнім шаром — це забезпечує виняткову міцність, стабільність і довговічність конструкцій. Сьогодні ми реалізуємо проєкти по всій Європі — від приватних резиденцій до знакових об’єктів на найпрестижніших курортах світу."
                  : "Construction uses solid round timber 30–50 cm in diameter, aged 80 years and older with the densest outer layer — ensuring exceptional strength, stability and durability. Today we deliver projects across Europe — from private residences to signature objects at the world’s most prestigious resorts."}
              </p>
            </div>
          </div>

          {/* Анімований колаж */}
          <div className="reveal-item relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {COLLAGE_ITEMS.map((item) => (
                <div
                  key={item.src}
                  className={`${item.floatClass} overflow-hidden rounded-xl ring-1 ring-white/10 shadow-[0_24px_48px_-30px_rgba(0,0,0,0.9)] ${
                    item.tall ? "relative row-span-2 min-h-0" : "relative aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt[locale]}
                    fill
                    quality={90}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Табличка на кожному фото */}
                  <div className="absolute bottom-3 left-3 z-10 rounded-lg border border-[#C6A36D]/40 bg-[#0F0F0F]/90 px-4 py-2.5 shadow-xl backdrop-blur-sm sm:bottom-4 sm:left-4 sm:px-5 sm:py-3">
                    <p
                      className={`font-serif leading-none text-[#C6A36D] ${
                        item.badge[locale].title.length > 12 ? "text-base sm:text-lg" : "text-xl sm:text-2xl"
                      }`}
                    >
                      {item.badge[locale].title}
                    </p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-[#EAE7E1]/60 sm:text-[10px]">
                      {item.badge[locale].subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Підсумкова цитата */}
        <blockquote className="reveal-item mt-14 border-l-2 border-[#C6A36D]/50 pl-6 font-serif text-xl italic text-[#C6A36D] sm:text-2xl">
          {locale === "ua" ? (
            <>
              Ми не просто будуємо будинки — ми формуємо стандарт преміальної дерев’яної архітектури.
              <br /> Поєднуючи багаторічний досвід, традиції роботи з натуральним деревом та сучасні технології, ми
              створюємо простори, які служать поколіннями.
            </>
          ) : (
            <>
              We don&apos;t just build houses — we shape the standard of premium wooden architecture.
              <br /> Combining decades of experience, traditions of working with natural wood, and modern technologies, we
              create spaces that serve for generations.
            </>
          )}
        </blockquote>
      </div>
    </section>
  );
}

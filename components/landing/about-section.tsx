"use client";

import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/site-media";
import { useLanguage } from "@/components/language-provider";

export function AboutSection() {
  const { locale } = useLanguage();

  return (
    <section id="about" className="scroll-mt-20 bg-[#121212] py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="reveal-item">
          <h2 className="font-serif text-3xl font-normal text-[#EAE7E1] sm:text-4xl md:text-5xl">
            {locale === "ua" ? "30+ років майстерності роботи з деревом" : "30+ Years of Wood Craftsmanship"}
          </h2>
          <p className="mt-6 font-sans text-base leading-8 text-[#EAE7E1]/75 sm:mt-8 lg:mt-14">
            {locale === "ua" ? (
              <>
                COMPANY VASYNA, заснована у 1995 році. Понад 20 років наша компанія успішно працює на європейському ринку,
                спеціалізуючись на будівництві преміальних будинків із масивної деревини. <br />
                <br /> В Україні наше виробництво представлене під брендом LAVANDA — сучасним виробничим комплексом із
                глибокою експертизою та відпрацьованими технологіями, що забезпечують будівництво відповідно до всіх вимог і
                стандартів європейської якості.
                <br />
                <br /> З 2013 року компанія також представлена в Німеччині під брендом <br />
                <Link
                  href="https://holzbaurustikal.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C6A36D] underline-offset-4 hover:underline">
                  HOLZBAU RUSTIKAL
                </Link>{" "}
                — визнаним лідером у Європі з будівництва будинків із цільного дерева за канадськими технологіями.
                <br />
                Будівництво виконується з цільної круглої деревини діаметром 30–50 см. Використовується дерево віком від 80
                років і більше із максимально щільним зовнішнім шаром (заболонню), що забезпечує виняткову міцність,
                стабільність і довговічність конструкцій.
                <br />
                <br /> На сьогоднішній день ми реалізовуємо проєкти по всій Європі — від приватних резиденцій до знакових
                об’єктів на найпрестижніших курортах світу.
              </>
            ) : (
              <>
                COMPANY VASYNA was founded in 1995. For over 20 years, our company has been successfully operating in the European market,
                specializing in the construction of premium houses made of solid timber. <br />
                <br /> In Ukraine, our production is represented under the brand name LAVANDA — a modern manufacturing facility with
                deep expertise and perfected technologies that ensure construction complies with all requirements and
                standards of European quality.
                <br />
                <br /> Since 2013, the company has also been represented in Germany under the brand <br />
                <Link
                  href="https://holzbaurustikal.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C6A36D] underline-offset-4 hover:underline">
                  HOLZBAU RUSTIKAL
                </Link>{" "}
                — an acknowledged leader in Europe for the construction of solid log homes using Canadian technologies.
                <br />
                Construction is carried out from solid round timber with a diameter of 30–50 cm. We use wood aged 80
                years and older with the densest outer layer (sapwood), which ensures exceptional strength,
                stability, and durability of the structures.
                <br />
                <br />                 Today, we implement projects throughout Europe — from private residences to signature
                facilities in the world&apos;s most prestigious resorts.
              </>
            )}
          </p>
        </div>
        <div className="reveal-item relative flex w-full items-center justify-center rounded-lg shadow-[0_32px_64px_-36px_rgba(0,0,0,0.95)] ring-1 ring-white/[0.07]">
          <Image
            src={IMG.companyVasynaViewFromTheSky}
            alt={locale === "ua" ? "Виробничий комплекс COMPANY VASYNA / LAVANDA: вигляд з висоти пташиного польоту" : "Production facility COMPANY VASYNA / LAVANDA: aerial view"}
            width={1200} // Ширина, що відповідає оригінальному співвідношенню для ландшафтного зображення
            height={675} // Висота, що відповідає оригінальному співвідношенню для ландшафтного зображення (16:9)
            className="h-auto w-full rounded-lg object-contain"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
      <p className="px-5 sm:px-8 mt-6 max-w-[1440px] mx-auto font-serif text-xl italic text-[#C6A36D] sm:text-2xl">
        {locale === "ua" ? (
          <>
            Ми не просто будуємо будинки — ми формуємо стандарт преміальної дерев’яної архітектури.
            <br /> Поєднуючи багаторічний досвід, традиції роботи з натуральним деревом та сучасні технології, ми створюємо
            простори, які служать поколіннями.
          </>
        ) : (
          <>
            We don&apos;t just build houses — we shape the standard of premium wooden architecture.
            <br /> Combining decades of experience, traditions of working with natural wood, and modern technologies, we create
            spaces that serve for generations.
          </>
        )}
      </p>
    </section>
  );
}

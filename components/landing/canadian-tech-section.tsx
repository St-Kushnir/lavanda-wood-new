"use client";

import type { ReactNode } from "react";
import { SliderDashedList } from "@/components/landing/slider-dashed-list";
import { TechnologyStagesSlider } from "@/components/landing/technology-stages-slider";
import { TECHNOLOGY_SECTION_STAGES } from "@/lib/site-media";
import { useLanguage } from "@/components/language-provider";

type TechCard = {
  title: string;
  image: (typeof TECHNOLOGY_SECTION_STAGES)[number];
  imageAlt: string;
  body: ReactNode;
};

export function CanadianTechSection() {
  const { locale } = useLanguage();

  const cards: TechCard[] = locale === "ua" ? [
    {
      title: "Зимова заготовка лісу",
      image: TECHNOLOGY_SECTION_STAGES[0],
      imageAlt: "Зимова заготовка деревини в лісі",
      body: (
        <>
          <p>Ми використовуємо деревину виключно зимової рубки.</p>
          <p>
            У цей період дерево має мінімальну вологість та природно щільнішу структуру, що значно зменшує ризик
            тріщин, деформацій та біологічних уражень.
          </p>
          <p>Саме зимовий ліс вважається основою довговічного та якісного зрубу.</p>
        </>
      ),
    },
    {
      title: "Ретельна камерна та природна сушка",
      image: TECHNOLOGY_SECTION_STAGES[1],
      imageAlt: "Камерна та природна сушка деревини",
      body: (
        <>
          <p>Деревина проходить природну та камерну сушку з постійним контролем вологості.</p>
          <p>
            Це дозволяє стабілізувати матеріал, мінімізувати усадку та забезпечити правильну геометрію конструкцій.
          </p>
          <p>Ми не працюємо з сирим деревом — кожна колода проходить повний цикл підготовки перед монтажем.</p>
        </>
      ),
    },
    {
      title: "Технологія «Канадська чаша»",
      image: TECHNOLOGY_SECTION_STAGES[2],
      imageAlt: "Технологія канадської чаші — з’єднання колод",
      body: (
        <>
          <p>
            У будівництві ми використовуємо класичну технологію канадської чаші — одну з найнадійніших систем
            з’єднання колод у світі.
          </p>
          <p>Завдяки особливій формі замків:</p>
          <SliderDashedList
            items={[
              "будинок стає максимально теплим;",
              "колоди щільно сідають під час усадки;",
              "мінімізуються щілини та продування;",
              "конструкція отримує високу міцність та довговічність.",
            ]}
          />
        </>
      ),
    },
    {
      title: "Повністю ручна підгонка деревини",
      image: TECHNOLOGY_SECTION_STAGES[3],
      imageAlt: "Ручна підгонка та обробка колод",
      body: (
        <>
          <p>Кожна колода проходить індивідуальну ручну обробку та підгонку.</p>
          <p>Майстри вручну формують посадочні місця, чаші та стики для максимальної точності з’єднання.</p>
          <p>
            Саме ручна робота дозволяє зберегти природну красу дерева та створити унікальний характер кожного будинку.
          </p>
        </>
      ),
    },
    {
      title: "Посадка без щілин",
      image: TECHNOLOGY_SECTION_STAGES[4],
      imageAlt: "Щільна посадка колод, утеплення швів",
      body: (
        <>
          <p>
            Точна геометрія та професійна підгонка забезпечують щільну посадку колод без зазорів та продування.
          </p>
          <p>Між колодами використовуються натуральний льон та технічна конопля, які:</p>
          <SliderDashedList
            items={[
              "покращують теплоізоляцію;",
              "дозволяють дереву «дихати»;",
              "створюють комфортний мікроклімат у будинку.",
            ]}
          />
        </>
      ),
    },
    {
      title: "Контроль усадки та теплопровідності",
      image: TECHNOLOGY_SECTION_STAGES[5],
      imageAlt: "Контроль усадки та якості зрубу",
      body: (
        <>
          <p>
            Ми враховуємо усі особливості роботи натурального дерева та контролюємо процес усадки ще на етапі
            проєктування.
          </p>
          <p>Завдяки правильній технології:</p>
          <SliderDashedList
            items={[
              "будинок рівномірно сідає;",
              "зберігається геометрія конструкції;",
              "мінімізуються тепловтрати;",
              "підтримується стабільний комфортний мікроклімат у будь-яку пору року.",
            ]}
          />
        </>
      ),
    },
  ] : [
    {
      title: "Winter Timber Harvesting",
      image: TECHNOLOGY_SECTION_STAGES[0],
      imageAlt: "Winter timber harvesting in the forest",
      body: (
        <>
          <p>We use timber harvested exclusively during the winter season.</p>
          <p>
            During this period, the wood has minimal sap flow and a naturally denser structure, which significantly reduces the risk of cracking, deformation, and biological damage.
          </p>
          <p>Winter-harvested wood is considered the very foundation of a durable and premium log home.</p>
        </>
      ),
    },
    {
      title: "Thorough Kiln & Air Drying",
      image: TECHNOLOGY_SECTION_STAGES[1],
      imageAlt: "Kiln and air drying of timber",
      body: (
        <>
          <p>The timber undergoes natural air drying and kiln drying under continuous humidity monitoring.</p>
          <p>
            This allows the material to stabilize, minimize shrinkage, and ensure the correct geometry of the structures.
          </p>
          <p>We do not work with green wood — each log undergoes a complete cycle of preparation before assembly.</p>
        </>
      ),
    },
    {
      title: "Canadian Notch Technology",
      image: TECHNOLOGY_SECTION_STAGES[2],
      imageAlt: "Canadian notch technology — log joint",
      body: (
        <>
          <p>
            In our construction, we utilize the classic Canadian notch technology — one of the most reliable log joint systems in the world.
          </p>
          <p>Thanks to the unique shape of the interlocking notches:</p>
          <SliderDashedList
            items={[
              "the house becomes exceptionally warm;",
              "logs settle tightly together during shrinkage;",
              "gaps and air leakage are minimized;",
              "the structure gains high strength and durability.",
            ]}
          />
        </>
      ),
    },
    {
      title: "Fully Handcrafted Log Fitting",
      image: TECHNOLOGY_SECTION_STAGES[3],
      imageAlt: "Handcrafted fitting and processing of logs",
      body: (
        <>
          <p>Each log undergoes individual handcrafted processing and fitting.</p>
          <p>Our craftsmen manually shape the lateral grooves, notches, and joints for maximum connection precision.</p>
          <p>
            It is handcrafted work that preserves the natural beauty of the wood and gives a unique character to each home.
          </p>
        </>
      ),
    },
    {
      title: "Seamless Tight Fit",
      image: TECHNOLOGY_SECTION_STAGES[4],
      imageAlt: "Tight log fitting, joint insulation",
      body: (
        <>
          <p>
            Precise geometry and professional fitting ensure a tight fit of logs without gaps or drafts.
          </p>
          <p>Natural linen and technical hemp are used between the logs, which:</p>
          <SliderDashedList
            items={[
              "improve thermal insulation;",
              'allow the wood to "breathe";',
              "create a comfortable microclimate in the house.",
            ]}
          />
        </>
      ),
    },
    {
      title: "Shrinkage & Thermal Control",
      image: TECHNOLOGY_SECTION_STAGES[5],
      imageAlt: "Shrinkage and quality control of the log house",
      body: (
        <>
          <p>
            We account for all peculiarities of natural wood behavior and control the shrinkage process starting from the design stage.
          </p>
          <p>Thanks to the correct technology:</p>
          <SliderDashedList
            items={[
              "the house settles evenly;",
              "the geometry of the structure is preserved;",
              "heat loss is minimized;",
              "a stable and comfortable microclimate is maintained in any season.",
            ]}
          />
        </>
      ),
    },
  ];

  return (
    <section id="technology" className="scroll-mt-20 bg-[#121212] py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="reveal-item">
          <p className="font-mono text-[12px] uppercase tracking-[0.35em] text-[#C6A36D]/90">
            {locale === "ua" ? "Технологія будівництва" : "Construction Technology"}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-[#EAE7E1] sm:text-4xl md:text-5xl">
            Canadian handcrafted log construction
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-[#EAE7E1]/70 sm:text-base">
            {locale === "ua" ? (
              <>
                Все починається з правильного лісу.
                <br />
                Якість справжнього дикого зрубу формується ще на етапі заготівлі деревини.<br/><br /> Ми використовуємо лише зимову
                рубку лісу та дотримуємось повного технологічного циклу — від підбору дерева до фінальної ручної підгонки
                кожної колоди.
              </>
            ) : (
              <>
                It all starts with the right forest.
                <br />
                The quality of an authentic handcrafted log home is formed at the timber harvesting stage.<br/><br /> We use exclusively winter-cut timber and follow a complete technological cycle — from log selection to the final handcrafted fitting of each log.
              </>
            )}
          </p>
        </div>

        <div className="reveal-item">
          <TechnologyStagesSlider cards={cards} />
        </div>
      </div>
    </section>
  );
}

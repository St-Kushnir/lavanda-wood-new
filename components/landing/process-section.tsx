"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { useLanguage } from "@/components/language-provider";

const stepsTranslations = {
  ua: [
    {
      step: "01",
      title: "Концепція та архітектура",
      text: "План простору, стиль, прив’язка до рельєфу.",
      iconSrc: "/architecture.svg",
    },
    {
      step: "02",
      title: "Заготівля та підбір деревини",
      text: "Зимова заготівля, сушка, відбір колод.",
      iconSrc: "/log-wood.svg",
    },
    {
      step: "03",
      title: "Ручна рубка",
      text: "Канадська чаша, підгонка, контроль геометрії.",
      iconSrc: "/axe.svg",
    },
    {
      step: "04",
      title: "Монтаж на ділянці",
      text: "Збірка клітки зрубу, техніка та бригада.",
      iconSrc: "/construction.svg",
    },
    {
      step: "05",
      title: "Інженерія та оздоблення",
      text: "Комунікації, вікна, фінішні поверхні.",
      iconSrc: "/windows.svg",
    },
  ],
  en: [
    {
      step: "01",
      title: "Concept & Architecture",
      text: "Space planning, styling, matching with the landscape.",
      iconSrc: "/architecture.svg",
    },
    {
      step: "02",
      title: "Timber Harvesting & Selection",
      text: "Winter harvesting, drying, and log sorting.",
      iconSrc: "/log-wood.svg",
    },
    {
      step: "03",
      title: "Handcrafted Cutting",
      text: "Canadian notch, fitting, and geometry control.",
      iconSrc: "/axe.svg",
    },
    {
      step: "04",
      title: "On-site Assembly",
      text: "Assembling the log structure, equipment, and crew.",
      iconSrc: "/construction.svg",
    },
    {
      step: "05",
      title: "Engineering & Finishing",
      text: "Utilities, window installation, and final surfaces.",
      iconSrc: "/windows.svg",
    },
  ],
};

export function ProcessSection() {
  const { locale } = useLanguage();
  const steps = stepsTranslations[locale];

  const [active, setActive] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: "trimSnaps",
    dragFree: false,
    slidesToScroll: 1,
  });

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setActive(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("reInit", onSelect);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <section
      id="process"
      className="scroll-mt-20 border-y border-white/[0.06] bg-[#0c0c0c] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="reveal-item max-w-2xl">
          <p className="font-mono text-[12px] uppercase tracking-[0.35em] text-[#C6A36D]/90">
            {locale === "ua" ? "Процес" : "Process"}
          </p>
          <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight text-[#EAE7E1] sm:text-4xl md:text-5xl">
            {locale === "ua" ? "Повний цикл будівництва" : "Full Construction Cycle"}
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[#8B7355] sm:text-base">
            {locale === "ua"
              ? "П’ять етапів — від ідеї до здачі. Контроль якості на кожному кроці."
              : "Five stages — from idea to completion. Quality control at every step."}
          </p>
        </div>

        {/* Desktop Grid (visible on sm screens and up) */}
        <div className="hidden sm:grid mt-14 gap-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 lg:mt-20 lg:grid-cols-5 lg:gap-x-0 lg:gap-y-0">
          {steps.map((s, index) => (
            <div
              key={s.step}
              className={[
                "reveal-item",
                "flex min-w-0 flex-col gap-6 lg:min-h-[280px] lg:gap-7",
                index === 0 ? "lg:pr-2" : "lg:border-l lg:border-white/[0.08] lg:pl-10 xl:pl-12",
                index % 2 === 1 ? "sm:border-l sm:border-white/[0.08] sm:pl-10" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="flex h-24 w-24 shrink-0 items-center justify-center sm:h-28 sm:w-28 lg:h-32 lg:w-32">
                <Image
                  src={s.iconSrc}
                  alt=""
                  width={86}
                  height={86}
                  className="h-full w-full max-h-[5.25rem] max-w-[5.25rem] object-contain drop-shadow-[0_0_28px_rgba(198,163,109,0.12)] sm:max-h-[6.25rem] sm:max-w-[6.25rem] lg:max-h-[7rem] lg:max-w-[7rem]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex min-h-9 items-center">
                  <span className="inline-flex w-fit items-center rounded-sm bg-[#C6A36D]/12 px-2.5 py-1 font-mono text-[14px] font-medium uppercase tracking-[0.28em] text-[#C6A36D]">
                    {s.step}
                  </span>
                </div>
                <h3 className="min-h-[3.25rem] font-serif text-xl leading-snug text-[#EAE7E1] sm:min-h-[3.625rem] sm:text-[1.35rem]">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#EAE7E1]/58 sm:text-[14px] sm:leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Slider (visible only on mobile) */}
        <div className="block sm:hidden mt-14">
          <div ref={emblaRef} className="overflow-hidden pb-4">
            <div className="flex gap-4">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="min-w-0 shrink-0 grow-0 flex-[0_0_calc(100%-40px)]"
                >
                  <article className="group relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent p-8 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.85)]">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C6A36D]/50 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                    
                    <div className="flex items-start justify-between">
                      <div className="flex h-20 w-20 items-center justify-center">
                        <Image
                          src={s.iconSrc}
                          alt=""
                          width={72}
                          height={72}
                          className="h-full w-full max-h-[4.5rem] max-w-[4.5rem] object-contain drop-shadow-[0_0_28px_rgba(198,163,109,0.12)]"
                        />
                      </div>
                      <span className="inline-flex items-center rounded-sm bg-[#C6A36D]/12 px-2.5 py-1 font-mono text-[14px] font-medium uppercase tracking-[0.28em] text-[#C6A36D]">
                        {s.step}
                      </span>
                    </div>
                    
                    <div className="mt-8 flex flex-col gap-3">
                      <h3 className="font-serif text-xl leading-snug text-[#EAE7E1]">
                        {s.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#EAE7E1]/58">{s.text}</p>
                    </div>
                    
                    <div
                      aria-hidden
                      className="mt-8 h-px w-8 bg-[#C6A36D]/35 transition-[width,background-color] duration-300 ease-out group-hover:w-full group-hover:bg-[#C6A36D]/45"
                    />
                  </article>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots Indicator */}
          <div className="mt-6 flex justify-center">
            <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label={locale === "ua" ? "Обрати етап" : "Select stage"}>
              {steps.map((s, i) => (
                <button
                  key={s.step}
                  type="button"
                  aria-pressed={i === active}
                  tabIndex={0}
                  onClick={() => scrollTo(i)}
                  className={[
                    "h-2 rounded-full transition-[width,background-color] duration-300 ease-out",
                    i === active ? "w-8 bg-[#C6A36D]" : "w-2 bg-white/20 hover:bg-white/35",
                  ].join(" ")}
                  aria-label={locale === "ua" ? `Етап ${i + 1}: ${s.title}` : `Stage ${i + 1}: ${s.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

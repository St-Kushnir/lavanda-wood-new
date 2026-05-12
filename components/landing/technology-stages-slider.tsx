"use client";

/**
 * Карусель на Embla — той самий стек, що в сусідньому проєкті `react`
 * (`modules/page-sections/explore-gurus-list/explore-guru-slider.tsx`).
 */

import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import Image from "next/image";
import { useCallback, useEffect, useId, useState, type KeyboardEvent, type ReactNode } from "react";

export type TechnologyStageCard = {
  title: string;
  image: string;
  imageAlt: string;
  body: ReactNode;
};

type TechnologyStagesSliderProps = {
  cards: readonly TechnologyStageCard[];
};

export function TechnologyStagesSlider({ cards }: TechnologyStagesSliderProps) {
  const uid = useId().replace(/:/g, "");
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

  useEffect(() => {
    if (!emblaApi) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      emblaApi.reInit({ duration: mq.matches ? 0 : 25 });
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!emblaApi) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      emblaApi.scrollPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      emblaApi.scrollNext();
    } else if (e.key === "Home") {
      e.preventDefault();
      emblaApi.scrollTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      emblaApi.scrollTo(cards.length - 1);
    }
  };

  const regionLabel = "Етапи канадської технології — горизонтальна карусель";

  return (
    <div className="relative mt-14">
      <div
        ref={emblaRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={regionLabel}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="overflow-hidden pb-3 pt-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A36D]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]"
      >
        <div className="flex gap-4 sm:gap-5">
          {cards.map((c, i) => {
            const step = String(i + 1).padStart(2, "0");
            return (
              <div
                key={c.title}
                className={[
                  "min-w-0 shrink-0 grow-0",
                  "flex-[0_0_calc(100%-40px)] sm:flex-[0_0_min(26rem,calc(100%-2rem))] lg:flex-[0_0_min(30rem,calc(100%-2.5rem))]",
                ].join(" ")}
              >
                <article
                  id={`${uid}-tech-stage-${i}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${step} з ${String(cards.length).padStart(2, "0")}: ${c.title}`}
                  className={[
                    "group relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl sm:rounded-3xl",
                    "bg-[#0c0c0c] ring-1 ring-white/[0.07] ring-inset",
                    "shadow-[0_32px_64px_-36px_rgba(0,0,0,0.95),inset_0_1px_0_0_rgba(255,255,255,0.06)]",
                    "transition-[transform,box-shadow] duration-300 ease-out will-change-transform",
                    "hover:shadow-[0_40px_72px_-32px_rgba(0,0,0,0.98),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
                    i === active ? "ring-[#C6A36D]/25" : "opacity-[0.94] sm:opacity-100",
                  ].join(" ")}
                >
                  <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-60" />

                  <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
                    <Image
                      src={c.image}
                      alt={c.imageAlt}
                      fill
                      className="object-cover transition duration-700 ease-out will-change-transform group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 26rem, 30rem"
                      priority={i === 0}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/25"
                      aria-hidden
                    />
                    <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#EAE7E1]/90 backdrop-blur-md sm:text-[11px]">
                        <span className="text-[#C6A36D]">{step}</span>
                        <span className="text-[#EAE7E1]/35">/</span>
                        <span className="text-[#EAE7E1]/55">{String(cards.length).padStart(2, "0")}</span>
                      </span>
                    </div>
                    <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition duration-300 group-hover:bg-black/50 sm:right-4 sm:top-4 sm:h-10 sm:w-10">
                      <Image
                        src="/canadian-leaf.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain opacity-95"
                      />
                    </div>
                  </div>

                  <div className="relative flex min-h-0 flex-1 flex-col border-t border-white/[0.06] bg-gradient-to-b from-[#111] to-[#0a0a0a] px-5 pb-6 pt-5 sm:px-6 sm:pb-7 sm:pt-6">
                    <h3 className="font-serif text-base font-normal leading-snug tracking-tight text-[#C6A36D] sm:text-lg">
                      {c.title}
                    </h3>
                    <div className="mt-3 max-h-[14rem] space-y-3 overflow-y-auto overscroll-contain font-sans text-[13px] leading-relaxed text-[#EAE7E1]/72 sm:mt-4 sm:max-h-[15.5rem] sm:text-sm sm:leading-relaxed">
                      {c.body}
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 flex justify-center sm:mt-6">
        <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Обрати етап">
          {cards.map((c, i) => (
            <button
              key={c.title}
              type="button"
              aria-pressed={i === active}
              tabIndex={0}
              onClick={() => scrollTo(i)}
              className={[
                "h-2 rounded-full transition-[width,background-color] duration-300 ease-out",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A36D]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]",
                i === active ? "w-8 bg-[#C6A36D]" : "w-2 bg-white/20 hover:bg-white/35",
              ].join(" ")}
              aria-label={`Етап ${i + 1}: ${c.title}`}
            />
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {cards[active] ? `Активний слайд: ${cards[active].title}` : ""}
      </p>
    </div>
  );
}

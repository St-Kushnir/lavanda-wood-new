"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IMG } from "@/lib/site-media";

const heroBackgrounds = {
  paving: {
    src: IMG.heroBearStatueRedRoofPaving,
    alt: "Великий двоповерховий зруб із червоною покрівлею, скульптурою ведмедя та бруківкою на подвір'ї",
  },
  cabinBack: {
    src: IMG.bearHouse,
    alt: "Великий двоповерховий зруб із червоною покрівлею та скульптурою ведмедя; менший зруб на задньому плані",
  },
} as const;

type HeroBgKey = keyof typeof heroBackgrounds;

export function HeroSection() {
  const [bgKey, setBgKey] = useState<HeroBgKey>("paving");
  const bg = heroBackgrounds[bgKey];

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <Image
        key={bg.src}
        src={bg.src}
        alt={bg.alt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-black/30" />

      {/* Тимчасовий перемикач фону для узгодження з клієнтом — прибрати після вибору */}
      <div
        className="absolute bottom-24 right-5 z-20 flex flex-col items-end gap-1.5 sm:bottom-28 sm:right-8 md:bottom-32"
        role="group"
        aria-label="Тимчасовий вибір фонового фото героя"
      >
        <div className="flex overflow-hidden rounded border border-white/20 bg-black/50 p-0.5 text-[11px] backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setBgKey("paving")}
            className={[
              "px-2.5 py-1 transition sm:px-3",
              bgKey === "paving"
                ? "bg-[#C6A36D]/25 text-[#C6A36D]"
                : "text-[#EAE7E1]/70 hover:bg-white/5 hover:text-[#EAE7E1]",
            ].join(" ")}
          >
            темна
          </button>
          <button
            type="button"
            onClick={() => setBgKey("cabinBack")}
            className={[
              "px-2.5 py-1 transition sm:px-3",
              bgKey === "cabinBack"
                ? "bg-[#C6A36D]/25 text-[#C6A36D]"
                : "text-[#EAE7E1]/70 hover:bg-white/5 hover:text-[#EAE7E1]",
            ].join(" ")}
          >
            світла
          </button>
        </div>
      </div>

      <div className="reveal-item relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pt-28 sm:px-8 pb-32 md:justify-center md:pb-20">
        <div className="mb-5 sm:mb-6 md:mb-8">
          <Image
            src="/herb-2.png"
            alt=""
            width={600}
            height={600}
            className="h-auto w-32 object-contain opacity-95 drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)] sm:w-40 md:w-48 lg:w-56"
            aria-hidden
          />
        </div>
        <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.45em] text-[#C6A36D] sm:text-xs">
          Handcrafted log homes · since 1995
        </p>
        <h1 className="max-w-4xl font-serif text-4xl font-normal leading-[1.05] tracking-tight text-[#EAE7E1] sm:text-5xl md:text-6xl lg:text-7xl">
          LAVANDA
        </h1>
        <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-[#EAE7E1]/85 sm:text-lg">
          Будівництво будинків із дикого зрубу за канадською технологією. Преміальні резиденції з натурального дерева в
          Україні та Європі.
        </p>
        {/* <div className="mt-4 max-w-md">
          <MediaPlaceholder
            kind="video"
            description="фонове відео героя (повільний рух, атмосфера)"
            className="min-h-[72px] rounded-sm py-3"
          />
        </div> */}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center border border-[#C6A36D] bg-[#C6A36D] px-8 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-[#0F0F0F] transition hover:bg-[#d4b07e]"
          >
            Отримати консультацію
          </Link>
          <Link
            href="#projects"
            className="inline-flex items-center justify-center border border-white/25 bg-transparent px-8 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-[#EAE7E1] transition hover:border-[#C6A36D]/50 hover:text-[#C6A36D]"
          >
            Переглянути проєкти
          </Link>
        </div>
      </div>
    </section>
  );
}

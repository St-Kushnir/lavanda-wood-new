"use client";

import Image from "next/image";
import Link from "next/link";
import { ConsultationCtaButton } from "@/components/landing/consultation-cta-button";
import { IMG } from "@/lib/site-media";
import { useLanguage } from "@/components/language-provider";

export function HeroSection() {
  const { locale } = useLanguage();

  const heroAlt = locale === "ua"
    ? "Великий двоповерховий зруб із червоною покрівлею, скульптурою ведмедя та бруківкою на подвір'ї"
    : "Large two-story log house with a red roof, bear sculpture, and paved courtyard";

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <Image
        src={IMG.heroBearStatueRedRoofPaving}
        alt={heroAlt}
        fill
        priority
        className="object-cover object-[50%_18%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/10 md:bg-black/[0.06]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_78%_at_44%_72%,rgba(0,0,0,0.80)_0%,rgba(0,0,0,0.58)_38%,rgba(0,0,0,0.20)_68%,rgba(0,0,0,0)_100%)] md:bg-[radial-gradient(70%_72%_at_16%_56%,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.58)_34%,rgba(0,0,0,0.22)_62%,rgba(0,0,0,0)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,#0F0F0F_0%,rgba(15,15,15,0.72)_9%,rgba(15,15,15,0.22)_24%,rgba(15,15,15,0)_46%)]" />

      <div className="reveal-item relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-32 pt-28 sm:px-8 md:justify-center md:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-24 left-1/2 h-[58%] w-[calc(100%-2.5rem)] -translate-x-1/2 rounded-[48px] bg-black/25 blur-3xl md:bottom-auto md:left-8 md:top-1/2 md:h-[62%] md:w-[42rem] md:-translate-x-0 md:-translate-y-1/2 md:bg-black/20"
        />
        <div className="relative z-10 max-w-4xl">
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
            {locale === "ua" ? (
              <>
                Будівництво деревʼяних будинків преміум-класу за канадською технологією.
                <br />
                Цільний дикий зруб, натуральні матеріали та удосконалена архітектура, яка живе десятиліттями.
              </>
            ) : (
              <>
                Construction of premium-class log homes using Canadian technology.
                <br />
                Handcrafted solid logs, natural materials, and sophisticated architecture designed to last for decades.
              </>
            )}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ConsultationCtaButton className="inline-flex items-center justify-center border border-[#C6A36D] bg-[#C6A36D] px-8 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-[#0F0F0F] transition hover:bg-[#d4b07e]" />
            <Link
              href="#projects"
              className="inline-flex items-center justify-center border border-white/25 bg-transparent px-8 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-[#EAE7E1] transition hover:border-[#C6A36D]/50 hover:text-[#C6A36D]">
              {locale === "ua" ? "Переглянути проєкти" : "Discover projects"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

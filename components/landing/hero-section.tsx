import Image from "next/image";
import Link from "next/link";
import { ConsultationCtaButton } from "@/components/landing/consultation-cta-button";
import { IMG } from "@/lib/site-media";

const heroAlt = "Великий двоповерховий зруб із червоною покрівлею, скульптурою ведмедя та бруківкою на подвір'ї";

export function HeroSection() {
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
      <div className="to-black/1 absolute inset-0 bg-gradient-to-r from-black/45 via-black/25 sm:via-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-black/10" />

      <div className="reveal-item relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-32 pt-28 sm:px-8 md:justify-center md:pb-20">
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
          Будівництво деревʼяних будинків преміум-класу за канадською технологією.
          <br />
          Цільний дикий зруб, натуральні матеріали та удосконалена архітектура, яка живе десятиліттями.
        </p>
        {/* <div className="mt-4 max-w-md">
          <MediaPlaceholder
            kind="video"
            description="фонове відео героя (повільний рух, атмосфера)"
            className="min-h-[72px] rounded-sm py-3"
          />
        </div> */}
        <div className="mt-10 flex flex-wrap gap-4">
          <ConsultationCtaButton className="inline-flex items-center justify-center border border-[#C6A36D] bg-[#C6A36D] px-8 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-[#0F0F0F] transition hover:bg-[#d4b07e]" />
          <Link
            href="#projects"
            className="inline-flex items-center justify-center border border-white/25 bg-transparent px-8 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-[#EAE7E1] transition hover:border-[#C6A36D]/50 hover:text-[#C6A36D]">
            Переглянути проєкти
          </Link>
        </div>
      </div>
    </section>
  );
}

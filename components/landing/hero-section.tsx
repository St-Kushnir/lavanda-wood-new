import Image from "next/image";
import Link from "next/link";
import { MediaPlaceholder } from "@/components/media-placeholder";
import { IMG } from "@/lib/site-media";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <Image
        src={IMG.heroWinterCloseUpExterior}
        alt="Двоповерховий зруб узиму: крупний план фасаду"
        fill
        priority
        className="object-cover object-top"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-black/30" />

      <div className="reveal-item relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-5 pb-24 pt-28 sm:px-8 sm:pb-32 md:justify-center md:pb-20">
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

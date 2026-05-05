import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/site-media";

export function CtaSection() {
  return (
    <section id="contact" className="scroll-mt-20 relative min-h-[70vh] w-full overflow-hidden">
      <Image
        src={IMG.whiteHouseNight}
        alt="Зруб уночі з архітектурним підсвічуванням"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/65 to-black/35" />
      <div className="reveal-item relative z-10 mx-auto flex min-h-[70vh] max-w-[1440px] flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
        <p className="font-mono text-[12px] uppercase tracking-[0.4em] text-[#C6A36D]">Lavanda</p>
        <h2 className="mt-4 max-w-2xl font-serif text-3xl font-normal text-[#EAE7E1] sm:text-4xl md:text-5xl">
          Let&apos;s build your log home
        </h2>
        <p className="mt-4 max-w-md font-sans text-sm text-[#EAE7E1]/70">
          Українською: збудуємо ваш дім із дикого зрубу — від концепції до ключів.
        </p>
        <Link
          href="https://lavanda-wood.com/"
          className="mt-10 inline-flex border border-[#C6A36D] bg-[#C6A36D] px-10 py-4 text-sm font-medium uppercase tracking-[0.25em] text-[#0F0F0F] transition hover:bg-[#d4b07e]"
        >
          Отримати консультацію
        </Link>
      </div>
    </section>
  );
}

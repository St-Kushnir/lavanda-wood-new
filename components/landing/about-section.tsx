import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/site-media";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 bg-[#121212] py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="reveal-item">
          <h2 className="font-serif text-3xl font-normal text-[#EAE7E1] sm:text-4xl md:text-5xl">
            30+ років майстерності роботи з деревом
          </h2>
          <p className="mt-6 font-sans text-base leading-relaxed text-[#EAE7E1]/75">
            LAVANDA — будівельна компанія з 1995 року в регіоні з глибокими традиціями дерев’яного будівництва. Ми
            спеціалізуємось на будинках із дикого зрубу за канадською технологією ручної рубки та ведемо проєкти в
            Україні й Європі — зокрема через німецьку компанію{" "}
            <Link href="https://holzbaurustikal.de/" className="text-[#C6A36D] underline-offset-4 hover:underline">
              HolzbauRustikal
            </Link>
            .
          </p>
          <p className="mt-6 font-serif text-xl italic text-[#8B7355] sm:text-2xl">
            Ми не просто будуємо — ми формуємо стандарт дерев’яної архітектури.
          </p>
        </div>
        <div className="reveal-item relative aspect-[4/5] w-full overflow-hidden rounded-sm lg:aspect-[3/4]">
          <Image
            src={IMG.logLayingTechnique}
            alt="Ручна рубка зрубу, техніка укладання колод"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}

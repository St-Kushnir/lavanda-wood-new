import Link from "next/link";
import { YouTubePosterEmbed } from "@/components/landing/youtube-poster-embed";
import { IMG } from "@/lib/site-media";

const INTERNATIONAL_YOUTUBE_ID = "oN_kgiI8yOA";

export function InternationalSection() {
  return (
    <section id="international" className="scroll-mt-20 bg-[#121212] py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="reveal-item max-w-3xl">
          <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight text-[#EAE7E1] sm:text-4xl md:text-5xl">
            Ми працюємо в Україні та Європі
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-[#EAE7E1]/85 sm:text-base">
            Ми — міжнародна будівельна компанія, що працює в Україні та Європі, з представництвом у Німеччині:{" "}
            <Link
              href="https://holzbaurustikal.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-[#C6A36D] underline-offset-4 hover:underline">
              HolzbauRustikal
            </Link>{" "}
            <br /><br />
            Наша діяльність базується на поєднанні української майстерності та європейських стандартів будівництва.
            <br />
            Ми реалізуємо проєкти різного рівня складності на європейському ринку <br />— від приватних будинків із цільного
            дерева до комплексних архітектурних рішень під ключ.
          </p>
        </div>

        <div className="reveal-item mt-10 sm:mt-12 lg:mt-14">
          <YouTubePosterEmbed
            videoId={INTERNATIONAL_YOUTUBE_ID}
            title="LAVANDA — міжнародна присутність (YouTube)"
            posterSrc={IMG.officeGermany1}
            posterAlt="Офіс Lavanda в Німеччині"
            posterImageClassName="scale-[1.09] object-[50%_26%]"
          />
        </div>
      </div>
    </section>
  );
}

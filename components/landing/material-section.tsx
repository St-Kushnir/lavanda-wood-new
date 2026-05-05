import Image from "next/image";
import { IMG } from "@/lib/site-media";

export function MaterialSection() {
  return (
    <section id="material" className="scroll-mt-20 bg-[#121212] py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="reveal-item">
        <h2 className="font-serif text-3xl font-normal text-[#EAE7E1] sm:text-4xl md:text-5xl">Матеріал</h2>
        <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-[#8B7355] sm:text-base">
          Масив дерева — не декор, а основа дому: щільні вузли, природна фактура й тепло, яке відчувається в просторі
          щодня.
        </p>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <div className="reveal-item relative aspect-square overflow-hidden rounded-sm lg:col-span-2 lg:aspect-auto lg:min-h-[420px]">
            <Image
              src={IMG.tempRoofInterior}
              alt="Інтер'єр зрубу під тимчасовим дахом, фактура дерева"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
            <span className="absolute bottom-4 left-4 rounded-sm bg-black/50 px-3 py-1 text-xs text-[#EAE7E1]/80">
              Фрагмент зрубу під час робіт
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="reveal-item relative min-h-[200px] flex-1 overflow-hidden rounded-sm">
              <Image
                src={IMG.constructionEquipment}
                alt="Колоди та техніка на ділянці, деталь матеріалу"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
            <div className="reveal-item relative min-h-[200px] flex-1 overflow-hidden rounded-sm">
              <Image
                src={IMG.winterLivingFromPanoramicWindow}
                alt="Зимовий зруб: вид з вітальні через панорамне вікно"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

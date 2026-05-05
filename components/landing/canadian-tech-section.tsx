import Image from "next/image";
import { IMG } from "@/lib/site-media";

const cards = [
  {
    title: "Saddle notch",
    subtitle: "Канадська чаша",
    image: IMG.logLayingTechnique,
    imageAlt: "Техніка укладання колод, вузол рубки",
  },
  {
    title: "Ручна підгонка",
    subtitle: "Кожна колода індивідуально",
    image: IMG.tempRoofInterior,
    imageAlt: "Інтер’єр зрубу під тимчасовим дахом",
  },
  {
    title: "Посадка без щілин",
    subtitle: "Щільність швів",
    image: IMG.constructionEquipment,
    imageAlt: "Монтаж зрубу на ділянці, укладання колод",
  },
  {
    title: "Контроль усадки",
    subtitle: "Тепло та довговічність",
    image: IMG.tempRoofSideView,
    imageAlt: "Зруб під тимчасовим дахом, вигляд збоку",
  },
];

export function CanadianTechSection() {
  return (
    <section id="technology" className="scroll-mt-20 bg-[#121212] py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="reveal-item">
        <p className="font-mono text-[12px] uppercase tracking-[0.35em] text-[#C6A36D]/90">Canadian handcrafted log</p>
        <h2 className="mt-3 font-serif text-3xl font-normal leading-tight tracking-tight text-[#EAE7E1] sm:text-4xl md:text-5xl">
          Canadian handcrafted log construction
        </h2>
        <p className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-[#EAE7E1]/70 sm:text-base">
          Автентична канадська технологія ручної рубки: saddle notch, ручна підгонка кожної колоди, щільна посадка без
          зазорів і контроль усадки — для максимальної теплоефективності та довговічності.
        </p>
        </div>

        <ul className="mt-14 grid list-none gap-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {cards.map((c) => (
            <li key={c.title} className="min-w-0">
              <article
                className={[
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl will-change-transform",
                  "border border-white/[0.06] bg-gradient-to-b from-white/[0.05] to-[#0c0c0c]",
                  "shadow-[0_24px_48px_-28px_rgba(0,0,0,0.85)]",
                  "transition duration-300 ease-out",
                  "hover:-translate-y-0.5 hover:border-[#C6A36D]/25 hover:shadow-[0_32px_56px_-22px_rgba(0,0,0,0.92)]",
                  "focus-within:border-[#C6A36D]/30 focus-within:ring-1 focus-within:ring-[#C6A36D]/20",
                ].join(" ")}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[#C6A36D]/45 to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
                />

                <div className="reveal-item flex min-h-0 flex-1 flex-col">
                <div className="relative aspect-[5/4] w-full shrink-0 overflow-hidden sm:aspect-[4/3]">
                  <Image
                    src={c.image}
                    alt={c.imageAlt}
                    fill
                    className="object-cover will-change-transform transition duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-black/35 backdrop-blur-[6px] transition duration-300 group-hover:bg-black/45">
                    <Image
                      src="/canadian-leaf.svg"
                      alt=""
                      width={22}
                      height={22}
                      className="h-5 w-5 object-contain opacity-95"
                    />
                  </div>
                </div>

                <div className="relative flex flex-1 flex-col px-6 pb-7 pt-5">
                  <h3 className="font-serif text-lg font-normal tracking-tight text-[#EAE7E1] sm:text-[1.125rem]">
                    {c.title}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-[#8B7355]">{c.subtitle}</p>
                  <div
                    aria-hidden
                    className="mt-5 h-px w-10 bg-[#C6A36D]/35 transition-[width,background-color] duration-300 ease-out group-hover:w-14 group-hover:bg-[#C6A36D]/50"
                  />
                </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

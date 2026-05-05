import Image from "next/image";

const steps = [
  {
    step: "01",
    title: "Концепція та архітектура",
    text: "План простору, стиль, прив’язка до рельєфу.",
    iconSrc: "/architecture.svg",
  },
  {
    step: "02",
    title: "Заготівля та підбір деревини",
    text: "Зимова заготівля, сушка, відбір колод.",
    iconSrc: "/log-wood.svg",
  },
  {
    step: "03",
    title: "Ручна рубка",
    text: "Канадська чаша, підгонка, контроль геометрії.",
    iconSrc: "/axe.svg",
  },
  {
    step: "04",
    title: "Монтаж на ділянці",
    text: "Збірка клітки зрубу, техніка та бригада.",
    iconSrc: "/construction.svg",
  },
  {
    step: "05",
    title: "Інженерія та оздоблення",
    text: "Комунікації, вікна, фінішні поверхні.",
    iconSrc: "/windows.svg",
  },
];

export function ProcessSection() {
  return (
    <section
      id="process"
      className="scroll-mt-20 border-y border-white/[0.06] bg-[#0c0c0c] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="reveal-item max-w-2xl">
          <p className="font-mono text-[12px] uppercase tracking-[0.35em] text-[#C6A36D]/90">Процес</p>
          <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight text-[#EAE7E1] sm:text-4xl md:text-5xl">
            Повний цикл будівництва
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-[#8B7355] sm:text-base">
            П’ять етапів — від ідеї до здачі. Контроль якості на кожному кроці.
          </p>
        </div>

        <div className="mt-14 grid max-sm:gap-0 gap-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 lg:mt-20 lg:grid-cols-5 lg:gap-x-0 lg:gap-y-0">
          {steps.map((s, index) => (
            <div
              key={s.step}
              className={[
                "reveal-item",
                "flex min-w-0 flex-col gap-6 lg:min-h-[280px] lg:gap-7",
                index > 0
                  ? "max-sm:mt-12 max-sm:border-t max-sm:border-white/[0.08] max-sm:pt-8"
                  : "",
                index === 0 ? "lg:pr-2" : "lg:border-l lg:border-white/[0.08] lg:pl-10 xl:pl-12",
                index % 2 === 1 ? "sm:border-l sm:border-white/[0.08] sm:pl-10" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="flex h-24 w-24 shrink-0 items-center justify-center sm:h-28 sm:w-28 lg:h-32 lg:w-32">
                <Image
                  src={s.iconSrc}
                  alt=""
                  width={86}
                  height={86}
                  className="h-full w-full max-h-[5.25rem] max-w-[5.25rem] object-contain drop-shadow-[0_0_28px_rgba(198,163,109,0.12)] sm:max-h-[6.25rem] sm:max-w-[6.25rem] lg:max-h-[7rem] lg:max-w-[7rem]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex min-h-9 items-center">
                  <span className="inline-flex w-fit items-center rounded-sm bg-[#C6A36D]/12 px-2.5 py-1 font-mono text-[14px] font-medium uppercase tracking-[0.28em] text-[#C6A36D]">
                    {s.step}
                  </span>
                </div>
                <h3 className="min-h-[3.25rem] font-serif text-xl leading-snug text-[#EAE7E1] sm:min-h-[3.625rem] sm:text-[1.35rem]">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#EAE7E1]/58 sm:text-[14px] sm:leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";

const slots = [
  {
    quote: "«Тепло взимку, відчуття масивного дерева щодня — саме те, чого хотіли для родини.»",
    role: "Власник резиденції",
    name: "Mark Brown",
    portraitSrc: "/owner-of-the-residence.jpg",
  },
  {
    quote: "«Збірка на ділянці пройшла злагоджено, команда завжди на зв’язку.»",
    role: "Інвестор",
    name: "Patrick White",
    portraitSrc: "/investor.jpg",
  },
  {
    quote: "«Архітектура та деталі — той рівень, до якого давно рівнялись.»",
    role: "Девелопер",
    name: "Jon Doe",
    portraitSrc: "/developer.jpg",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="scroll-mt-20 bg-[#121212] py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="reveal-item">
        <h2 className="font-serif text-3xl font-normal text-[#EAE7E1] sm:text-4xl md:text-5xl">Відгуки</h2>
        <p className="mt-4 text-sm text-[#8B7355]">Короткі історії тих, хто вже обрав дерево й простір без компромісів.</p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {slots.map((s) => (
            <figure key={s.role} className="flex flex-col border border-white/8 bg-[#0F0F0F] p-6">
              <div className="reveal-item flex flex-col">
                <div className="mx-auto w-full max-w-[220px] rounded-full border-2 border-dashed border-[#8B7355]/45 p-1.5">
                  <div className="relative aspect-square overflow-hidden rounded-full">
                    <Image
                      src={s.portraitSrc}
                      alt={s.role}
                      fill
                      className="object-cover"
                      sizes="220px"
                    />
                  </div>
                </div>
                <blockquote className="mt-8 font-serif text-lg leading-snug text-[#EAE7E1]/75">{s.quote}</blockquote>
                <p className="mt-4 text-xs text-[#EAE7E1]">{s.name}</p>
                <figcaption className="mt-4 text-xs uppercase tracking-wider text-[#C6A36D]">{s.role}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

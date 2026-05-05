const items = [
  "Девелопери преміум-комплексів",
  "Власники земель у горах",
  "Інвестори в курортну нерухомість",
  "Приватні клієнти, які цінують унікальність",
];

export function AudienceSection() {
  return (
    <section id="clients" className="scroll-mt-20 bg-[#0F0F0F] py-20 sm:py-28">
      <div className="reveal-item mx-auto max-w-[1440px] px-5 sm:px-8">
        <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight text-[#EAE7E1] sm:text-4xl md:text-5xl">
          Наш клієнт
        </h2>

        <ul className="mt-12 max-w-3xl list-none border-l-2 border-[#C6A36D]/40 pl-7 sm:mt-14 sm:pl-9 lg:mt-16">
          {items.map((t) => (
            <li key={t} className="group border-b border-white/[0.08] py-6 last:border-b-0 sm:py-7">
              <p className="max-w-2xl font-sans text-[1.0625rem] font-normal leading-relaxed text-[#EAE7E1]/82 transition duration-200 ease-out will-change-transform group-hover:translate-x-1 group-hover:text-[#EAE7E1] sm:text-lg">
                {t}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

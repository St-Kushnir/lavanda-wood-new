import { PortfolioGallery } from "@/components/landing/portfolio-gallery";

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-20 bg-[#0F0F0F] py-20 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="reveal-item">
          <h2 className="font-serif text-3xl font-normal text-[#EAE7E1] sm:text-4xl md:text-5xl">
            Проєкти
          </h2>
          <p className="mt-4 font-sans text-sm text-[#8B7355] sm:text-base">
            Шале · приватні будинки · бані / SPA · комерційні об’єкти · міжнародні резиденції.
          </p>
        </div>

        <PortfolioGallery />
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/site-media";

export function InternationalSection() {
  return (
    <section
      id="international"
      className="relative min-h-[min(88vh,820px)] w-full scroll-mt-20 overflow-hidden sm:min-h-[min(90vh,880px)]"
    >
      <Image
        src={IMG.officeGermany1}
        alt="Офіс Lavanda в Німеччині"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/10 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-black/20" />

      <div className="relative z-10 mx-auto flex min-h-[min(88vh,820px)] max-w-[1440px] flex-col justify-center px-5 py-20 sm:min-h-[min(90vh,880px)] sm:px-8 sm:py-28">
        <div
          className="reveal-item max-w-3xl rounded-lg px-6 py-8 sm:px-8 sm:py-10"
          style={{ backgroundColor: "rgba(15, 15, 15, 0.88)" }}
        >
          <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight text-[#EAE7E1] sm:text-4xl md:text-5xl">
            Ми працюємо в Україні та Європі
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-sm leading-relaxed text-[#EAE7E1]/90 sm:text-base">
            Через компанію в Німеччині —{" "}
            <Link href="https://holzbaurustikal.de/" className="text-[#C6A36D] underline-offset-4 hover:underline">
              HolzbauRustikal
            </Link>{" "}
            — реалізуємо проєкти для європейського ринку. Це підсилює довіру та статус бренду.
          </p>
        </div>
      </div>
    </section>
  );
}

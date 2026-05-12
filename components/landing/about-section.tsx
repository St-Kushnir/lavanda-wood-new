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
          <p className=" mt-6 sm:mt-8 lg:mt-14 font-sans text-base leading-8 text-[#EAE7E1]/75">
            COMPANY VASYNA, заснована у 1995 році. Понад 20 років наша компанія успішно працює на європейському ринку,
            спеціалізуючись на будівництві преміальних будинків із масивної деревини. <br/><br/> В Україні наше виробництво
            представлене під брендом LAVANDA — сучасним виробничим комплексом із глибокою експертизою та відпрацьованими
            технологіями, що забезпечують будівництво відповідно до всіх вимог і стандартів європейської якості.<br/><br/> З 2013
            року компанія також представлена в Німеччині під брендом{" "}<br/>
            <Link href="https://holzbaurustikal.de/" className="text-[#C6A36D] underline-offset-4 hover:underline">
              HOLZBAU RUSTIKAL
            </Link>{" "}
            — визнаним лідером у Європі з будівництва будинків із цільного дерева за канадськими технологіями.<br/>
            Будівництво виконується з цільної круглої деревини діаметром 40–50 см. Використовується дерево віком 90–120
            років із максимально щільним зовнішнім шаром (заболонню), що забезпечує виняткову міцність, стабільність і
            довговічність конструкцій.<br/><br/> На сьогоднішній день ми реалізовуємо проєкти по всій Європі — від приватних
            резиденцій до знакових об’єктів на найпрестижніших курортах світу.
          </p>
          <p className="mt-6 font-serif text-xl italic text-[#8B7355] sm:text-2xl">
            Ми не просто будуємо будинки — ми формуємо стандарт преміальної дерев’яної архітектури.<br/> Поєднуючи
            багаторічний досвід, традиції роботи з натуральним деревом та сучасні технології, ми створюємо простори, які
            служать поколіннями.
          </p>
        </div>
        <div className="reveal-item relative aspect-[4/5] w-full overflow-hidden rounded-sm lg:aspect-[3/4]">
          <Image
            src={IMG.companyVasynaViewFromTheSky}
            alt="Виробничий комплекс COMPANY VASYNA / LAVANDA: вигляд з висоти пташиного польоту"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}

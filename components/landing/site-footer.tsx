import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#0a0a0a] py-14 text-sm text-[#8B7355]">
      <div className="reveal-item mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-serif text-lg tracking-[0.15em] text-[#EAE7E1]">LAVANDA</p>
            <p className="mt-2 max-w-xs">Handcrafted log homes since 1995. Україна та Європа.</p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <Link href="https://lavanda-wood.com/" className="text-[#C6A36D] hover:underline">
              Поточний сайт lavanda-wood.com
            </Link>
            <Link href="https://holzbaurustikal.de/" className="hover:text-[#EAE7E1]">
              holzbaurustikal.de
            </Link>
          </div>
        </div>
        <p className="mt-12 text-xs text-[#8B7355]/70">
          © {new Date().getFullYear()} Lavanda. Усі права захищені.
        </p>
      </div>
    </footer>
  );
}

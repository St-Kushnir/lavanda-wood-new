"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const links = [
  { href: "#about", label: "Про нас" },
  { href: "#why", label: "Дерев'яні будинки" },
  { href: "#technology", label: "Технологія" },
  { href: "#projects", label: "Проєкти" },
  { href: "#process", label: "Процес" },
  { href: "#contact", label: "Контакти" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="flex h-[14px] w-[22px] flex-col justify-between" aria-hidden>
      <span
        className={[
          "h-0.5 w-full origin-center rounded-full bg-current transition duration-300 ease-out",
          open ? "translate-y-[7px] rotate-45" : "",
        ].join(" ")}
      />
      <span
        className={[
          "h-0.5 w-full rounded-full bg-current transition duration-300 ease-out",
          open ? "scale-0 opacity-0" : "opacity-100",
        ].join(" ")}
      />
      <span
        className={[
          "h-0.5 w-full origin-center rounded-full bg-current transition duration-300 ease-out",
          open ? "-translate-y-[7px] -rotate-45" : "",
        ].join(" ")}
      />
    </span>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    document.documentElement.classList.toggle("no-scroll", menuOpen);
    document.body.classList.toggle("no-scroll", menuOpen);
    return () => {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#0F0F0F]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-serif text-lg tracking-[0.12em] text-[#EAE7E1] sm:text-xl">
          LAVANDA
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-[#EAE7E1]/80 md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-[#C6A36D]">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="#contact"
            className="rounded-sm border border-[#C6A36D]/60 bg-[#C6A36D]/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#C6A36D] transition hover:bg-[#C6A36D]/20"
          >
            Консультація
          </Link>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-sm p-2 text-[#EAE7E1] transition hover:bg-white/5 hover:text-[#C6A36D] md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-drawer"
          aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile slide-over */}
      <div
        className={[
          "fixed inset-0 z-[60] md:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className={[
            "absolute inset-0 bg-black/65 backdrop-blur-[2px] transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
          aria-label="Закрити меню"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        />
        <aside
          id="mobile-drawer"
          aria-hidden={!menuOpen}
          className={[
            "absolute right-0 top-0 flex h-[100dvh] w-[min(100%,320px)] flex-col border-l border-white/10 bg-[#0c0c0c] shadow-[-16px_0_48px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out",
            menuOpen ? "translate-x-0" : "translate-x-full",
          ].join(" ")}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/8 px-5">
            <button
              type="button"
              className="ml-auto rounded-sm p-2 text-[#EAE7E1]/70 transition hover:bg-white/5 hover:text-[#EAE7E1]"
              aria-label="Закрити меню"
              onClick={closeMenu}
            >
              <span className="block text-xl leading-none">&times;</span>
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-3.5 text-base text-[#EAE7E1]/90 transition hover:bg-white/[0.06] hover:text-[#C6A36D]"
                onClick={closeMenu}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="shrink-0 border-t border-white/8 p-5">
            <Link
              href="#contact"
              className="flex w-full items-center justify-center rounded-sm border border-[#C6A36D] bg-[#C6A36D] px-4 py-3.5 text-center text-xs font-medium uppercase tracking-[0.2em] text-[#0F0F0F] transition hover:bg-[#d4b07e]"
              onClick={closeMenu}
            >
              Консультація
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
};

// Один спільний IntersectionObserver на всі секції (замість окремого на кожну).
let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return null;
  }
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            sharedObserver?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );
  }
  return sharedObserver;
}

/**
 * Wraps a section: adds .visible when in view. Animations apply only to .reveal-item descendants.
 */
export function RevealOnScroll({ children, className }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = getObserver();
    if (!observer) {
      // Без підтримки IO (або reduced-motion середовища) — показуємо одразу.
      el.classList.add("visible");
      return;
    }

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const merged = ["reveal-scope w-full", className].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={merged}>
      {children}
    </div>
  );
}

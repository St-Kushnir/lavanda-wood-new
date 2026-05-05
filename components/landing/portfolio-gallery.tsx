"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { createPortal } from "react-dom";
import { PORTFOLIO_PROJECTS } from "@/lib/site-media";

const MIN_SCALE = 1;
const MAX_SCALE = 5;

type Slide = { src: string; alt: string };

function ArrowIcon({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {dir === "prev" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 6 15 12 9 18" />}
    </svg>
  );
}

export function PortfolioGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSlides, setLightboxSlides] = useState<Slide[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const openProjectGallery = useCallback((projectIndex: number) => {
    const p = PORTFOLIO_PROJECTS[projectIndex];
    if (!p) return;
    const n = p.gallery.length;
    setLightboxSlides(
      p.gallery.map((src, j) => ({
        src,
        alt: `${p.title} — ${j + 1} / ${n}`,
      })),
    );
    setLightboxIndex(0);
    setLightboxOpen(true);
  }, []);

  return (
    <>
      <div className="mt-14 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
        {PORTFOLIO_PROJECTS.map((p, i) => (
          <article key={p.id} className="group relative aspect-[4/5] overflow-hidden bg-[#141414] sm:aspect-[3/4]">
            <div className="reveal-item absolute inset-0">
              <Image
                src={p.coverSrc}
                alt={p.title}
                fill
                className="object-cover will-change-transform transition duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition group-hover:opacity-95" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] p-6">
                <div className="will-change-transform translate-y-2 transition-transform duration-300 ease-out group-hover:translate-y-0">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#C6A36D]">{p.category}</p>
                  <h3 className="mt-2 font-serif text-xl text-[#EAE7E1]">{p.title}</h3>
                  <p className="mt-1 text-sm text-[#EAE7E1]/65">{p.location}</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="absolute inset-0 z-[15] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A36D]"
              aria-label={`Відкрити галерею проєкту: ${p.title}`}
              onClick={() => openProjectGallery(i)}
            />
          </article>
        ))}
      </div>

      {mounted && lightboxOpen && lightboxSlides.length > 0
        ? createPortal(
            <PortfolioLightbox
              slides={lightboxSlides}
              index={lightboxIndex}
              onClose={() => setLightboxOpen(false)}
              onIndexChange={setLightboxIndex}
            />,
            document.body,
          )
        : null}
    </>
  );
}

function PortfolioLightbox({
  slides,
  index,
  onClose,
  onIndexChange,
}: {
  slides: Slide[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const scaleRef = useRef(1);
  const panXRef = useRef(0);
  const panYRef = useRef(0);
  const baseWRef = useRef(0);
  const baseHRef = useRef(0);

  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });

  const swipeStartRef = useRef({ x: 0, y: 0 });
  const swipeDeltaRef = useRef(0);
  const swipeHandledRef = useRef(false);

  const pinchStartDistRef = useRef(0);
  const pinchStartScaleRef = useRef(1);

  const [imgOpaque, setImgOpaque] = useState(false);

  const slide = slides[index];

  const applyTransform = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    img.style.transform = `translate(${panXRef.current}px, ${panYRef.current}px) scale(${scaleRef.current})`;
  }, []);

  const resetZoom = useCallback(() => {
    scaleRef.current = 1;
    panXRef.current = 0;
    panYRef.current = 0;
    applyTransform();
  }, [applyTransform]);

  const clampPan = useCallback(() => {
    if (scaleRef.current <= 1) {
      panXRef.current = 0;
      panYRef.current = 0;
      return;
    }
    const stage = stageRef.current;
    const img = imgRef.current;
    if (!stage || !img) return;
    const bw = baseWRef.current;
    const bh = baseHRef.current;
    if (!bw || !bh) return;

    const stageRect = stage.getBoundingClientRect();
    const scaledW = bw * scaleRef.current;
    const scaledH = bh * scaleRef.current;
    const maxPanX = Math.max(0, (scaledW - stageRect.width) / 2);
    const maxPanY = Math.max(0, (scaledH - stageRect.height) / 2);
    panXRef.current = Math.max(-maxPanX, Math.min(maxPanX, panXRef.current));
    panYRef.current = Math.max(-maxPanY, Math.min(maxPanY, panYRef.current));
  }, []);

  useEffect(() => {
    resetZoom();
    setImgOpaque(false);
  }, [index, resetZoom]);

  const onImgLoad = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    baseWRef.current = img.offsetWidth;
    baseHRef.current = img.offsetHeight;
    setImgOpaque(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");
    return () => {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const goPrev = useCallback(() => {
    resetZoom();
    const n = slides.length;
    onIndexChange((index - 1 + n) % n);
  }, [index, onIndexChange, resetZoom, slides.length]);

  const goNext = useCallback(() => {
    resetZoom();
    const n = slides.length;
    onIndexChange((index + 1) % n);
  }, [index, onIndexChange, resetZoom, slides.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, goPrev, goNext]);

  const zoomHandlersRef = useRef({ applyTransform, clampPan });
  zoomHandlersRef.current = { applyTransform, clampPan };

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      const rect = stage.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;
      const oldScale = scaleRef.current;
      const delta = e.deltaY > 0 ? -0.15 : 0.15;
      scaleRef.current = Math.max(MIN_SCALE, Math.min(MAX_SCALE, oldScale + delta * oldScale));

      if (scaleRef.current > 1) {
        const factor = scaleRef.current / oldScale;
        panXRef.current = mouseX - factor * (mouseX - panXRef.current);
        panYRef.current = mouseY - factor * (mouseY - panYRef.current);
      } else {
        panXRef.current = 0;
        panYRef.current = 0;
      }
      zoomHandlersRef.current.clampPan();
      zoomHandlersRef.current.applyTransform();
    };

    stage.addEventListener("wheel", onWheelNative, { passive: false });
    return () => stage.removeEventListener("wheel", onWheelNative);
  }, []);

  const onBackdropClick = useCallback(() => {
    if (scaleRef.current > 1) return;
    onClose();
  }, [onClose]);

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") {
      swipeStartRef.current = { x: e.clientX, y: e.clientY };
      swipeDeltaRef.current = 0;
      swipeHandledRef.current = false;
    }
    if (scaleRef.current <= 1) return;
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { x: panXRef.current, y: panYRef.current };
    e.currentTarget.classList.add("grabbing");
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "touch" && scaleRef.current <= 1) {
        swipeDeltaRef.current = e.clientX - swipeStartRef.current.x;
      }
      if (!isDraggingRef.current) return;
      panXRef.current = panStartRef.current.x + (e.clientX - dragStartRef.current.x);
      panYRef.current = panStartRef.current.y + (e.clientY - dragStartRef.current.y);
      clampPan();
      applyTransform();
    },
    [applyTransform, clampPan],
  );

  const onPointerUp = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "touch" && scaleRef.current <= 1 && !swipeHandledRef.current) {
        const deltaY = Math.abs(e.clientY - swipeStartRef.current.y);
        if (Math.abs(swipeDeltaRef.current) > 50 && deltaY < 100) {
          swipeHandledRef.current = true;
          if (swipeDeltaRef.current > 0) goPrev();
          else goNext();
        }
      }
      isDraggingRef.current = false;
      e.currentTarget.classList.remove("grabbing");
    },
    [goPrev, goNext],
  );

  const onPointerCancel = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    e.currentTarget.classList.remove("grabbing");
  }, []);

  const onDblClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const stage = stageRef.current;
      if (!stage) return;
      if (scaleRef.current > 1) {
        resetZoom();
        return;
      }
      scaleRef.current = 2.5;
      const rect = stage.getBoundingClientRect();
      panXRef.current = (rect.width / 2 - (e.clientX - rect.left)) * 0.6;
      panYRef.current = (rect.height / 2 - (e.clientY - rect.top)) * 0.6;
      clampPan();
      applyTransform();
    },
    [applyTransform, clampPan, resetZoom],
  );

  const onTouchStart = useCallback((e: ReactTouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      pinchStartDistRef.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY,
      );
      pinchStartScaleRef.current = scaleRef.current;
    }
  }, []);

  const onTouchMove = useCallback(
    (e: ReactTouchEvent<HTMLDivElement>) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY,
        );
        scaleRef.current = Math.max(
          MIN_SCALE,
          Math.min(MAX_SCALE, pinchStartScaleRef.current * (dist / pinchStartDistRef.current)),
        );
        if (scaleRef.current <= 1) {
          panXRef.current = 0;
          panYRef.current = 0;
        }
        clampPan();
        applyTransform();
      }
    },
    [applyTransform, clampPan],
  );

  const onTouchEnd = useCallback(
    (e: ReactTouchEvent<HTMLDivElement>) => {
      if (e.touches.length < 2 && scaleRef.current <= 1) {
        resetZoom();
      }
    },
    [resetZoom],
  );

  if (!slide) return null;

  return (
    <div className="lightbox active" role="dialog" aria-modal="true" aria-label="Перегляд фото">
      <div className="lightbox__backdrop" onClick={onBackdropClick} aria-hidden />
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Закрити">
        &times;
      </button>
      <div className="lightbox__counter">
        <span>{index + 1}</span> / <span>{slides.length}</span>
      </div>
      <button type="button" className="lightbox__arrow lightbox__arrow--prev" onClick={goPrev} aria-label="Попереднє фото">
        <ArrowIcon dir="prev" />
      </button>
      <button type="button" className="lightbox__arrow lightbox__arrow--next" onClick={goNext} aria-label="Наступне фото">
        <ArrowIcon dir="next" />
      </button>
      <div
        ref={stageRef}
        className="lightbox__stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onDoubleClick={onDblClick}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Plain img: dynamic zoom/pan transform like tresmont lightbox (not next/image). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          key={slide.src}
          className="lightbox__img"
          alt={slide.alt}
          src={slide.src}
          draggable={false}
          onLoad={onImgLoad}
          style={{
            opacity: imgOpaque ? 1 : 0,
            transition: "opacity 0.25s var(--lavanda-ease)",
          }}
        />
      </div>
    </div>
  );
}

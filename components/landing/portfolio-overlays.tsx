"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  getCategoryLabel,
  getTagLabel,
  getParameterLabel,
  type ProjectLocale,
} from "@/lib/projects-i18n";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowIcon, CloseIcon } from "@/components/landing/portfolio-icons";
import type { Project } from "@/components/landing/portfolio-gallery";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Тримає фокус усередині оверлею (Tab/Shift+Tab) і повертає його на тригер після закриття.
function useFocusTrap(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const container = containerRef.current;

    const focusFirst = () => {
      if (!container) return;
      const focusables = container.querySelectorAll<HTMLElement>(FOCUSABLE);
      (focusables[0] ?? container).focus({ preventScroll: true });
    };
    focusFirst();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const node = containerRef.current;
      if (!node) return;
      const focusables = Array.from(
        node.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null || el === node);
      if (focusables.length === 0) {
        e.preventDefault();
        node.focus({ preventScroll: true });
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === node)) {
        e.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => {
      document.removeEventListener("keydown", handleTab);
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [containerRef]);
}

// ----------------------------------------------------
// DETAILED MODAL COMPONENT
// ----------------------------------------------------
interface ProjectDetailModalProps {
  project: Project;
  locale: ProjectLocale;
  onClose: () => void;
  activeSlideIndex: number;
  setActiveSlideIndex: (i: number) => void;
  onZoomImage: (index: number) => void;
  onFilterCategory: (slug: string) => void;
  onFilterTag: (slug: string) => void;
  activeTag: string | null;
}

export function ProjectDetailModal({
  project,
  locale,
  onClose,
  activeSlideIndex,
  setActiveSlideIndex,
  onZoomImage,
  onFilterCategory,
  onFilterTag,
  activeTag,
}: ProjectDetailModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef);

  // Кадри, що вже завантажені (щоб не показувати лоадер повторно й перемикати миттєво).
  const [loadedSlides, setLoadedSlides] = useState<Record<number, true>>({});
  const markSlideLoaded = useCallback((index: number) => {
    setLoadedSlides((prev) => (prev[index] ? prev : { ...prev, [index]: true }));
  }, []);

  // Disable body scroll when modal is active
  useEffect(() => {
    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");
    return () => {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const handlePrevSlide = useCallback(() => {
    const total = project.images.length;
    setActiveSlideIndex((activeSlideIndex - 1 + total) % total);
  }, [activeSlideIndex, project.images.length, setActiveSlideIndex]);

  const handleNextSlide = useCallback(() => {
    const total = project.images.length;
    setActiveSlideIndex((activeSlideIndex + 1) % total);
  }, [activeSlideIndex, project.images.length, setActiveSlideIndex]);

  // Handle Keyboard Arrows for slides & Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevSlide();
      if (e.key === "ArrowRight") handleNextSlide();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, handlePrevSlide, handleNextSlide]);

  const projectTitle = locale === "ua" ? project["name-ua"] : project["name-en"];
  const projectDescription =
    locale === "ua" ? project["description-ua"] : project["description-en"];

  // Передвантажуємо поточний + сусідні кадри (миттєве перемикання вперед/назад).
  const totalSlides = project.images?.length ?? 0;
  const preloadWindow =
    totalSlides <= 1
      ? [activeSlideIndex]
      : Array.from(
          new Set([
            (activeSlideIndex - 1 + totalSlides) % totalSlides,
            activeSlideIndex,
            (activeSlideIndex + 1) % totalSlides,
          ]),
        );

  return (
    <div
      ref={dialogRef}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050506]/90 backdrop-blur-md transition-opacity duration-300 outline-none"
      role="dialog"
      aria-modal="true"
      aria-label={projectTitle}
    >
      {/* Click outside to close (backdrop) */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-6xl bg-[#0B0B0C] border border-white/10 rounded-sm shadow-2xl flex flex-col lg:flex-row overflow-hidden max-h-[92vh] lg:max-h-[85vh] z-10 transition-all duration-300">
        {/* Close Button Top Right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 text-[#EAE7E1]/70 hover:text-white bg-black/40 hover:bg-black/60 border border-white/10 rounded-full transition-all duration-300"
          aria-label="Закрити вікно"
        >
          <CloseIcon />
        </button>

        {/* 1. Left Section: The Slideshow (60% width on large screens) */}
        <div className="w-full lg:w-3/5 bg-black flex flex-col relative border-b border-white/5 lg:border-b-0 lg:border-r">
          {/* Main Slide Viewer */}
          <div className="relative flex-1 flex items-center justify-center aspect-[16/10] sm:aspect-[3/2] lg:aspect-auto lg:h-[calc(85vh-120px)] overflow-hidden">
            {totalSlides > 0 ? (
              <>
                {/* Лоадер лише поки активний кадр ще не завантажено */}
                {!loadedSlides[activeSlideIndex] && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#070708]">
                    <span className="font-serif text-lg tracking-[0.25em] text-[#C6A36D] animate-pulse-fade">
                      LAVANDA
                    </span>
                  </div>
                )}
                {/* Стек із поточного + сусідніх кадрів: кросфейд + передвантаження */}
                {preloadWindow.map((idx) => (
                  <Image
                    key={idx}
                    src={project.images[idx]}
                    alt={`${projectTitle} — ${idx + 1}`}
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      idx === activeSlideIndex
                        ? "z-10 opacity-100 cursor-zoom-in"
                        : "z-0 opacity-0 pointer-events-none"
                    }`}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={idx === activeSlideIndex}
                    onClick={
                      idx === activeSlideIndex
                        ? () => onZoomImage(activeSlideIndex)
                        : undefined
                    }
                    onLoad={() => markSlideLoaded(idx)}
                  />
                ))}
              </>
            ) : (
              <div className="text-white/40 text-sm">
                {locale === "ua" ? "Зображення недоступне" : "No image available"}
              </div>
            )}

            {/* Slider Navigation Arrows */}
            {project.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevSlide();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-[#EAE7E1] hover:text-white border border-white/5 transition-all duration-300"
                  aria-label="Попередній кадр"
                >
                  <ArrowIcon dir="prev" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextSlide();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-[#EAE7E1] hover:text-white border border-white/5 transition-all duration-300"
                  aria-label="Наступний кадр"
                >
                  <ArrowIcon dir="next" />
                </button>
              </>
            )}

            {/* Slideshow image counter */}
            <div className="absolute bottom-4 left-4 z-20 px-3 py-1 bg-black/60 border border-white/10 rounded-sm text-xs font-medium tracking-widest text-[#EAE7E1]/80">
              {activeSlideIndex + 1} / {project.images.length}
            </div>
          </div>

          {/* Thumbnails strip */}
          {project.images.length > 1 && (
            <ScrollArea orientation="horizontal" className="h-[90px] w-full bg-[#070708] border-t border-white/5">
              <div className="flex gap-2.5 px-4 h-full items-center min-w-full">
                {project.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`relative w-14 h-14 shrink-0 border rounded-sm overflow-hidden transition-all duration-300 ${
                      activeSlideIndex === idx
                        ? "border-[#C6A36D] scale-[1.03] ring-1 ring-[#C6A36D]/30"
                        : "border-white/5 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="60px"
                    />
                  </button>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {/* 2. Right Section: Details (40% width on large screens, custom ScrollArea) */}
        <ScrollArea className="w-full lg:w-2/5 flex flex-col bg-[#0B0B0C] text-[#EAE7E1] h-[50vh] lg:h-auto">
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col gap-8">
            {/* Context Categories & Tags */}
            <div>
              <div className="flex flex-wrap gap-1.5">
                {project.categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => onFilterCategory(c)}
                    className="text-[10px] uppercase tracking-[0.2em] text-[#C6A36D] hover:underline font-semibold"
                  >
                    {getCategoryLabel(c, locale)}
                  </button>
                ))}
              </div>

              {/* Title */}
              <h2 className="mt-3 font-serif text-2xl font-normal leading-snug sm:text-3xl text-white">
                {projectTitle}
              </h2>

              {/* Source/Original link */}
              {project["original-url"] && (
                <a
                  href={project["original-url"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2.5 text-xs text-[#8B7355] hover:text-[#C6A36D] transition-colors duration-300 underline underline-offset-4 decoration-[#8B7355]/30 hover:decoration-[#C6A36D]/50"
                >
                  <span>
                    {locale === "ua"
                      ? "Переглянути оригінал на holzbaurustikal.de"
                      : "View original on holzbaurustikal.de"}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              )}
            </div>

            {/* Description */}
            {projectDescription && (
              <div className="border-t border-white/5 pt-6">
                <p className="font-sans text-sm sm:text-base leading-relaxed text-[#EAE7E1]/75 whitespace-pre-line">
                  {projectDescription}
                </p>
              </div>
            )}

            {/* Parameters spec table */}
            {project.parameters && Object.keys(project.parameters).length > 0 && (
              <div className="border-t border-white/5 pt-6">
                <h4 className="font-serif text-lg font-normal text-[#C6A36D] mb-4">
                  {locale === "ua" ? "Характеристики" : "Specifications"}
                </h4>
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 rounded-sm bg-white/[0.015] border border-white/5 p-5">
                  {Object.entries(project.parameters).map(([key, val]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-[#8B7355] font-semibold">
                        {getParameterLabel(key, locale)}
                      </span>
                      <span className="mt-1 font-serif text-[15px] text-white">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Floor Plans section */}
            {project["schema-img"] && project["schema-img"].length > 0 && (
              <div className="border-t border-white/5 pt-6 pb-2">
                <h4 className="font-serif text-lg font-normal text-[#C6A36D] mb-4">
                  {locale === "ua" ? "Планування та креслення" : "Floor plans & drawings"}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {project["schema-img"].map((schemaUrl, index) => (
                    <div
                      key={index}
                      onClick={() => onZoomImage((project.images?.length || 0) + index)}
                      className="group relative aspect-[4/3] rounded-sm border border-white/10 bg-white p-3 transition-all duration-300 cursor-zoom-in flex items-center justify-center overflow-hidden"
                    >
                      <div className="relative w-full h-full">
                        <Image
                          src={schemaUrl}
                          alt={`Plan ${index + 1}`}
                          fill
                          sizes="(max-width: 1024px) 45vw, 18vw"
                          className="object-contain filter-none opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-[10px] uppercase tracking-wider text-[#EAE7E1] font-semibold">
                          {locale === "ua" ? "Збільшити" : "Zoom"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Modal footer with list of tags inside */}
            <div className="border-t border-white/5 pt-6 mt-auto">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tagSlug) => (
                  <button
                    key={tagSlug}
                    onClick={() => onFilterTag(tagSlug)}
                    className={`rounded-full border px-3 py-1 text-[10px] transition-all duration-300 ${
                      activeTag === tagSlug
                        ? "border-[#C6A36D] bg-[#C6A36D]/25 text-[#C6A36D]"
                        : "border-white/5 bg-white/[0.01] text-[#EAE7E1]/50 hover:border-[#C6A36D] hover:text-[#C6A36D]"
                    }`}
                  >
                    #{getTagLabel(tagSlug, locale)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// LIGHTBOX COMPONENT FOR FULL-SIZE IMAGE INSPECTION
// ----------------------------------------------------
interface LightboxGalleryProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export function LightboxGallery({ images, initialIndex, onClose }: LightboxGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const positionStartRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Touch gesture states
  const isPinchingRef = useRef(false);
  const isSwipingRef = useRef(false);
  const swipeStartRef = useRef({ x: 0, y: 0 });
  const currentSwipeDxRef = useRef(0);
  const initialTouchDistanceRef = useRef(0);
  const initialTouchScaleRef = useRef(1);

  // React state refs to avoid tearing down/re-registering touch listeners on every frame
  const scaleRef = useRef(scale);
  const positionRef = useRef(position);
  const handlePrevRef = useRef(handlePrev);
  const handleNextRef = useRef(handleNext);

  // Keep refs up-to-date
  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    handlePrevRef.current = handlePrev;
  }, [handlePrev]);

  useEffect(() => {
    handleNextRef.current = handleNext;
  }, [handleNext]);

  // Reset scale and position when changing images
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [currentIndex]);

  // Disable body scroll when lightbox is open
  useEffect(() => {
    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");
    return () => {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    };
  }, []);

  useFocusTrap(containerRef);

  // Keyboard support: Escape closes zoom, Arrows navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  // Handle Wheel Zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.85;
    const newScale = Math.max(1, Math.min(6, scale * factor));
    if (newScale === 1) {
      setPosition({ x: 0, y: 0 });
    }
    setScale(newScale);
  }, [scale]);

  // Pointer drag events for Desktop/Mouse dragging
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "touch") return; // Let touch events handle mobile gestures
    if (scale <= 1) return;
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    positionStartRef.current = { x: position.x, y: position.y };
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  }, [scale, position]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPosition({
      x: positionStartRef.current.x + dx,
      y: positionStartRef.current.y + dy,
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = scale > 1 ? "grab" : "default";
    }
  }, [scale]);

  // Native touch event listeners with passive: false to block browser-level page scrolling and zooming
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onTouchStart = (e: TouchEvent) => {
      const currentScale = scaleRef.current;
      const currentPosition = positionRef.current;

      if (e.touches.length === 1) {
        const touch = e.touches[0];
        swipeStartRef.current = { x: touch.clientX, y: touch.clientY };
        currentSwipeDxRef.current = 0;
        isSwipingRef.current = currentScale === 1; // Swipe if not zoomed

        if (currentScale > 1) {
          isDraggingRef.current = true;
          dragStartRef.current = { x: touch.clientX, y: touch.clientY };
          positionStartRef.current = { x: currentPosition.x, y: currentPosition.y };
        }
      } else if (e.touches.length === 2) {
        // Prevent default browser viewport pinch-zoom on touchstart
        if (e.cancelable) {
          e.preventDefault();
        }
        // Pinch started
        isPinchingRef.current = true;
        isSwipingRef.current = false;
        isDraggingRef.current = false;

        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);

        initialTouchDistanceRef.current = dist;
        initialTouchScaleRef.current = currentScale;

        // Track midpoint for panning during pinch
        dragStartRef.current = {
          x: (t1.clientX + t2.clientX) / 2,
          y: (t1.clientY + t2.clientY) / 2,
        };
        positionStartRef.current = { x: currentPosition.x, y: currentPosition.y };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      // Completely block browser page scrolling, default elastic bounce, or browser pinch-zoom
      if (e.cancelable) {
        e.preventDefault();
      }

      const currentScale = scaleRef.current;

      if (isPinchingRef.current && e.touches.length === 2) {
        const t1 = e.touches[0];
        const t2 = e.touches[1];
        const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);

        if (initialTouchDistanceRef.current > 0) {
          const factor = dist / initialTouchDistanceRef.current;
          const newScale = Math.max(1, Math.min(6, initialTouchScaleRef.current * factor));

          const midX = (t1.clientX + t2.clientX) / 2;
          const midY = (t1.clientY + t2.clientY) / 2;
          const dx = midX - dragStartRef.current.x;
          const dy = midY - dragStartRef.current.y;

          setScale(newScale);
          if (newScale > 1) {
            setPosition({
              x: positionStartRef.current.x + dx,
              y: positionStartRef.current.y + dy,
            });
          } else {
            setPosition({ x: 0, y: 0 });
          }
        }
      } else if (e.touches.length === 1) {
        const touch = e.touches[0];
        if (isDraggingRef.current && currentScale > 1) {
          const dx = touch.clientX - dragStartRef.current.x;
          const dy = touch.clientY - dragStartRef.current.y;
          setPosition({
            x: positionStartRef.current.x + dx,
            y: positionStartRef.current.y + dy,
          });
        } else if (isSwipingRef.current && currentScale === 1) {
          const dx = touch.clientX - swipeStartRef.current.x;
          currentSwipeDxRef.current = dx;
          // Drag horizontally for swipe feedback
          setPosition({ x: dx, y: 0 });
        }
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (isPinchingRef.current) {
        if (e.touches.length < 2) {
          isPinchingRef.current = false;
          initialTouchDistanceRef.current = 0;
        }
      } else if (isSwipingRef.current) {
        isSwipingRef.current = false;
        const dx = currentSwipeDxRef.current;
        currentSwipeDxRef.current = 0;
        setPosition({ x: 0, y: 0 }); // Snap back

        const threshold = window.innerWidth * 0.15; // 15% of viewport width
        if (dx > threshold) {
          handlePrevRef.current();
        } else if (dx < -threshold) {
          handleNextRef.current();
        }
      } else if (isDraggingRef.current) {
        isDraggingRef.current = false;
      }
    };

    const onGestureStart = (e: Event) => {
      e.preventDefault();
    };

    container.addEventListener("touchstart", onTouchStart, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: false });
    container.addEventListener("touchcancel", onTouchEnd, { passive: false });
    container.addEventListener("gesturestart", onGestureStart, { passive: false });
    container.addEventListener("gesturechange", onGestureStart, { passive: false });

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("touchcancel", onTouchEnd);
      container.removeEventListener("gesturestart", onGestureStart);
      container.removeEventListener("gesturechange", onGestureStart);
    };
  }, []);

  // Handle Double Click to Zoom in/out
  const handleDoubleClick = useCallback(() => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  }, [scale]);

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDoubleClick={handleDoubleClick}
      role="dialog"
      aria-modal="true"
      aria-label="Перегляд зображення на повний екран"
      tabIndex={-1}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 select-none touch-none transition-all duration-300 outline-none"
      style={{ cursor: scale > 1 ? "grab" : "default" }}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 p-2 sm:p-2.5 text-white/70 hover:text-white bg-black/60 hover:bg-black border border-white/10 rounded-full transition-all duration-300"
        aria-label="Закрити збільшення"
      >
        <CloseIcon />
      </button>

      {/* Navigation Arrows (Fixed size, smaller on mobile, highly visible) */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-[#EAE7E1] hover:text-white border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl"
            aria-label="Попередній кадр"
          >
            <ArrowIcon dir="prev" className="w-5 h-5 sm:w-8 sm:h-8" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-[#EAE7E1] hover:text-white border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl"
            aria-label="Наступний кадр"
          >
            <ArrowIcon dir="next" className="w-5 h-5 sm:w-8 sm:h-8" />
          </button>
        </>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-6 left-6 z-20 px-3 py-1 bg-black/60 border border-white/10 rounded-sm text-xs font-medium tracking-widest text-[#EAE7E1]/80">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Display Single Image with Transforms */}
      <div
        className="relative max-w-full max-h-full transition-transform duration-100 ease-out z-10"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[currentIndex]}
          alt="High resolution zoom view"
          className="max-w-[95vw] max-h-[92vh] object-contain select-none shadow-2xl"
          draggable={false}
        />
      </div>

      {/* Touch instructions or subtle indicator */}
      {scale === 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/60 border border-white/5 rounded-full text-[10px] uppercase tracking-widest text-[#EAE7E1]/50 pointer-events-none select-none text-center">
          Pinch to zoom, swipe or tap arrows
        </div>
      )}
    </div>
  );
}

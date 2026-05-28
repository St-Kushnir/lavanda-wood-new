"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import projectsData from "@/projects-data.json";
import {
  getCategoryLabel,
  getTagLabel,
  getParameterLabel,
  type ProjectLocale,
} from "@/lib/projects-i18n";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/components/language-provider";

interface Project {
  id: number;
  "name-ua": string;
  "name-en": string;
  "description-ua": string;
  "description-en": string;
  parameters: Record<string, string>;
  tags: string[];
  images: string[];
  "schema-img": string[];
  "original-url": string;
  categories: string[];
}

// Custom Close Icon
function CloseIcon() {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// Arrow icon for slides
function ArrowIcon({ dir, className }: { dir: "prev" | "next"; className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {dir === "prev" ? (
        <polyline points="15 18 9 12 15 6" />
      ) : (
        <polyline points="9 6 15 12 9 18" />
      )}
    </svg>
  );
}

const PROJECTS_PAGE_SIZE = 6;

export function PortfolioGallery() {
  const { locale } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(PROJECTS_PAGE_SIZE);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [zoomedImgIndex, setZoomedImgIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = useMemo(() => {
    return (projectsData.projects as unknown as Project[]) || [];
  }, []);

  // Extract all unique categories present in projects
  const uniqueCategories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.categories) {
        p.categories.forEach((c) => set.add(c));
      }
    });
    return Array.from(set);
  }, [projects]);

  // Extract all unique tags present in projects
  const uniqueTags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.tags) {
        p.tags.forEach((t) => set.add(t));
      }
    });
    return Array.from(set);
  }, [projects]);

  // Filter projects based on selections
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = !activeCategory || p.categories.includes(activeCategory);
      const matchesTag = !activeTag || p.tags.includes(activeTag);
      return matchesCategory && matchesTag;
    });
  }, [projects, activeCategory, activeTag]);

  // Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(PROJECTS_PAGE_SIZE);
  }, [activeCategory, activeTag]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + PROJECTS_PAGE_SIZE, filteredProjects.length));
  }, [filteredProjects.length]);

  const handleCategoryClick = useCallback((slug: string | null) => {
    setActiveCategory((prev) => (prev === slug ? null : slug));
  }, []);

  const handleTagClick = useCallback((slug: string | null) => {
    setActiveTag((prev) => (prev === slug ? null : slug));
  }, []);

  const handleOpenProject = useCallback((project: Project) => {
    setSelectedProject(project);
    setActiveSlideIndex(0);
  }, []);

  const handleCloseProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  // Disable main page scroll when project modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const handleResetFilters = useCallback(() => {
    setActiveCategory(null);
    setActiveTag(null);
  }, []);

  return (
    <>
      {/* Header controls for projects */}
      <div className="mt-12 flex items-center justify-between border-b border-white/5 pb-6">
        <button
          onClick={() => setFiltersOpen(true)}
          className="flex items-center gap-2 rounded-sm border border-[#C6A36D]/60 bg-[#C6A36D]/10 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-[#C6A36D] transition hover:bg-[#C6A36D]/20"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          {locale === "ua" ? "Фільтри" : "Filters"}
        </button>

        <div className="text-xs text-[#8B7355]">
          {locale === "ua" ? "Знайдено проєктів:" : "Projects found:"}{" "}
          <span className="text-[#EAE7E1] font-semibold">{filteredProjects.length}</span>
        </div>
      </div>

      {/* Main content area: Projects Grid */}
      <div className="w-full">
        {/* Active filter summary */}
        {(activeCategory || activeTag) && (
          <div className="mt-4 flex items-center gap-4 text-xs">
            <div className="flex flex-wrap gap-2">
              {activeCategory && (
                <span className="rounded-full bg-[#C6A36D]/20 px-3 py-1 text-[#C6A36D]">
                  {getCategoryLabel(activeCategory, locale)}
                </span>
              )}
              {activeTag && (
                <span className="rounded-full bg-[#C6A36D]/20 px-3 py-1 text-[#C6A36D]">
                  #{getTagLabel(activeTag, locale)}
                </span>
              )}
            </div>
            <button
              onClick={handleResetFilters}
              className="text-[#8B7355] underline underline-offset-4 decoration-[#8B7355]/30 hover:text-[#C6A36D] hover:decoration-[#C6A36D]"
            >
              {locale === "ua" ? "Скинути фільтри" : "Clear filters"}
            </button>
          </div>
        )}

        {/* Projects Grid */}
        {displayedProjects.length > 0 ? (
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {displayedProjects.map((p) => {
              const coverImage = p.images && p.images[0] ? p.images[0] : "/placeholder-image.jpg";
              const projectTitle = locale === "ua" ? p["name-ua"] : p["name-en"];

              return (
                <article
                  key={p.id}
                  className="group relative aspect-[4/5] overflow-hidden bg-[#141414] rounded-sm sm:aspect-[3/4] shadow-md ring-1 ring-white/5 hover:ring-white/10 transition-all duration-500"
                >
                  <div className="absolute inset-0 z-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverImage}
                      alt={projectTitle}
                      loading="lazy"
                      className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-none object-cover will-change-transform transition duration-700 group-hover:scale-[1.03]"
                    />
                    {/* Dark gradient overlay stretched horizontally along the bottom to ensure text readability */}
                    <div className="absolute inset-0 bg-[radial-gradient(180%_65%_at_bottom_left,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.75)_30%,rgba(0,0,0,0.25)_60%,rgba(0,0,0,0)_100%)] opacity-95 transition duration-500 group-hover:opacity-100" />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-5">
                    <div className="will-change-transform translate-y-3 transition-transform duration-500 ease-out group-hover:translate-y-0">
                      {/* Category list stack (shown vertically on card) */}
                      <div className="flex flex-col gap-0.5 mb-1.5">
                        {p.categories.map((catSlug) => (
                          <button
                            key={catSlug}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCategoryClick(catSlug);
                            }}
                            className="text-[9px] uppercase tracking-[0.2em] text-[#C6A36D] hover:text-white transition-colors duration-300 text-left font-semibold"
                          >
                            {getCategoryLabel(catSlug, locale)}
                          </button>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-lg text-[#EAE7E1] line-clamp-2 leading-snug tracking-wide group-hover:text-white transition duration-300">
                        {projectTitle}
                      </h3>

                      {/* Tags (clickable inside hover) */}
                      <div className="mt-3 flex flex-wrap gap-1 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                        {p.tags.slice(0, 3).map((tagSlug) => (
                          <button
                            key={tagSlug}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTagClick(tagSlug);
                            }}
                            className={`rounded-full border px-2 py-0.5 text-[9px] transition-all duration-300 ${
                              activeTag === tagSlug
                                ? "border-[#C6A36D] bg-[#C6A36D]/20 text-[#C6A36D]"
                                : "border-white/10 bg-white/5 text-[#EAE7E1]/80 hover:border-[#C6A36D] hover:text-[#C6A36D]"
                            }`}
                          >
                            #{getTagLabel(tagSlug, locale)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Main Card Action Click Overlay */}
                  <button
                    type="button"
                    className="absolute inset-0 z-20 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A36D]"
                    aria-label={locale === "ua" ? `Відкрити деталі проєкту: ${projectTitle}` : `Open project details: ${projectTitle}`}
                    onClick={() => handleOpenProject(p)}
                  />
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty results state */
          <div className="mt-10 flex flex-col items-center justify-center py-12 text-center border border-white/5 rounded-md bg-white/[0.01]">
            <h3 className="font-serif text-2xl text-[#EAE7E1]/80">
              {locale === "ua" ? "Проєктів не знайдено" : "No projects found"}
            </h3>
            <p className="mt-2 text-sm text-[#8B7355]">
              {locale === "ua"
                ? "Спробуйте змінити вибрані категорії або теги"
                : "Try changing the selected categories or tags"}
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 rounded-sm border border-[#C6A36D] bg-[#C6A36D]/10 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#C6A36D] transition hover:bg-[#C6A36D]/20"
            >
              {locale === "ua" ? "Скинути фільтри" : "Reset filters"}
            </button>
          </div>
        )}

        {/* Pagination "See More" Button */}
        {filteredProjects.length > visibleCount && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="group relative flex items-center justify-center gap-2 rounded-sm border border-[#C6A36D] bg-[#C6A36D] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#0F0F0F] transition duration-300 hover:bg-[#d4b07e] hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#C6A36D]/10 hover:shadow-[#C6A36D]/20"
            >
              <span>{locale === "ua" ? "Показати більше" : "See more"}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Filters Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-[70] ${
          filtersOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!filtersOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/65 backdrop-blur-[2px] transition-opacity duration-300 ${
            filtersOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Закрити фільтри"
          tabIndex={filtersOpen ? 0 : -1}
          onClick={() => setFiltersOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 flex h-[100dvh] w-[min(100%,360px)] flex-col border-r border-white/10 bg-[#0c0c0c] shadow-[16px_0_48px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out ${
            filtersOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/8 px-6">
            <h3 className="font-serif text-lg text-[#EAE7E1]">
              {locale === "ua" ? "Фільтри" : "Filters"}
            </h3>
            <button
              type="button"
              className="rounded-sm p-2 text-[#EAE7E1]/70 transition hover:bg-white/5 hover:text-[#EAE7E1]"
              onClick={() => setFiltersOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <ScrollArea className="flex-1 px-6 py-8">
            <div className="flex flex-col gap-10">
              {/* Categories */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355]/80 font-semibold mb-1">
                  {locale === "ua" ? "Категорії" : "Categories"}
                </h4>
                
                <button
                  onClick={() => handleCategoryClick(null)}
                  className={`w-full text-left rounded-sm border px-4 py-3 text-xs uppercase tracking-wider transition-all duration-300 font-medium ${
                    activeCategory === null
                      ? "border-[#C6A36D] bg-[#C6A36D]/10 text-[#C6A36D] shadow-sm shadow-[#C6A36D]/5"
                      : "border-white/5 bg-white/[0.01] text-[#EAE7E1]/60 hover:border-white/10 hover:bg-white/[0.03] hover:text-[#EAE7E1]"
                  }`}
                >
                  {locale === "ua" ? "Всі категорії" : "All categories"}
                </button>
                
                {uniqueCategories.map((catSlug) => (
                  <button
                    key={catSlug}
                    onClick={() => handleCategoryClick(catSlug)}
                    className={`w-full text-left rounded-sm border px-4 py-3 text-xs uppercase tracking-wider transition-all duration-300 font-medium ${
                      activeCategory === catSlug
                        ? "border-[#C6A36D] bg-[#C6A36D]/10 text-[#C6A36D] shadow-sm shadow-[#C6A36D]/5"
                        : "border-white/5 bg-white/[0.01] text-[#EAE7E1]/60 hover:border-white/10 hover:bg-white/[0.03] hover:text-[#EAE7E1]"
                    }`}
                  >
                    {getCategoryLabel(catSlug, locale)}
                  </button>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-col gap-3">
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#8B7355]/80 font-semibold mb-1">
                  {locale === "ua" ? "Теги" : "Tags"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleTagClick(null)}
                    className={`rounded-full border px-4 py-2 text-xs transition-all duration-300 font-medium ${
                      activeTag === null
                        ? "border-[#C6A36D] bg-[#C6A36D]/10 text-[#C6A36D]"
                        : "border-white/5 bg-white/[0.01] text-[#EAE7E1]/50 hover:border-white/20 hover:bg-white/[0.03] hover:text-[#EAE7E1]"
                    }`}
                  >
                    {locale === "ua" ? "# Всі теги" : "# All tags"}
                  </button>
                  {uniqueTags.map((tagSlug) => (
                    <button
                      key={tagSlug}
                      onClick={() => handleTagClick(tagSlug)}
                      className={`rounded-full border px-4 py-2 text-xs transition-all duration-300 font-medium ${
                        activeTag === tagSlug
                          ? "border-[#C6A36D] bg-[#C6A36D]/10 text-[#C6A36D] scale-[1.02] shadow-sm shadow-[#C6A36D]/10"
                          : "border-white/5 bg-white/[0.01] text-[#EAE7E1]/50 hover:border-white/20 hover:bg-white/[0.03] hover:text-[#EAE7E1]"
                      }`}
                    >
                      #{getTagLabel(tagSlug, locale)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
          
          <div className="shrink-0 border-t border-white/8 p-6">
            <button
              onClick={() => setFiltersOpen(false)}
              className="flex w-full items-center justify-center rounded-sm border border-[#C6A36D] bg-[#C6A36D] px-4 py-3.5 text-center text-xs font-medium uppercase tracking-[0.2em] text-[#0F0F0F] transition hover:bg-[#d4b07e]"
            >
              {locale === "ua" ? "Застосувати" : "Apply"}
            </button>
          </div>
        </aside>
      </div>

      {/* Portal: Project Detail Modal */}
      {mounted && selectedProject
        ? createPortal(
            <ProjectDetailModal
              project={selectedProject}
              locale={locale}
              onClose={handleCloseProject}
              activeSlideIndex={activeSlideIndex}
              setActiveSlideIndex={setActiveSlideIndex}
              onZoomImage={(index) => setZoomedImgIndex(index)}
              onFilterCategory={(slug) => {
                setActiveCategory(slug);
                handleCloseProject();
              }}
              onFilterTag={(slug) => {
                setActiveTag(slug);
                handleCloseProject();
              }}
              activeTag={activeTag}
            />,
            document.body
          )
        : null}

      {/* Portal: Full size Lightbox Zoom */}
      {mounted && zoomedImgIndex !== null && selectedProject
        ? createPortal(
            <LightboxGallery
              images={[...(selectedProject.images || []), ...(selectedProject["schema-img"] || [])]}
              initialIndex={zoomedImgIndex}
              onClose={() => setZoomedImgIndex(null)}
            />,
            document.body
          )
        : null}
    </>
  );
}

// ----------------------------------------------------
// IMAGE WITH PULSING LAVANDA LOGO LOADER
// ----------------------------------------------------
function ImageWithLoader({
  src,
  alt,
  className,
  fill,
  sizes,
  onClick,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  onClick?: () => void;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {/* Lavanda pulsating backdrop loader */}
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#070708]">
          <span className="font-serif text-lg tracking-[0.25em] text-[#C6A36D] animate-pulse-fade">
            LAVANDA
          </span>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={className}
        sizes={sizes}
        onClick={onClick}
        onLoad={() => setLoading(false)}
        priority
      />
    </div>
  );
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

function ProjectDetailModal({
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050506]/90 backdrop-blur-md transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
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
            {project.images && project.images[activeSlideIndex] ? (
              <ImageWithLoader
                src={project.images[activeSlideIndex]}
                alt={`${projectTitle} — ${activeSlideIndex + 1}`}
                fill
                className="object-cover cursor-zoom-in transition-all duration-500"
                onClick={() => onZoomImage(activeSlideIndex)}
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
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
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={schemaUrl}
                          alt={`Plan ${index + 1}`}
                          className="w-full h-full object-contain filter-none opacity-90 group-hover:opacity-100 transition-opacity duration-300"
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

function LightboxGallery({ images, initialIndex, onClose }: LightboxGalleryProps) {
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 select-none touch-none transition-all duration-300"
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

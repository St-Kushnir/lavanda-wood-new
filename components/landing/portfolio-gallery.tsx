"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getCategoryLabel, getTagLabel, getProjectShortName, type ProjectLocale } from "@/lib/projects-i18n";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/components/language-provider";
import { CloseIcon } from "@/components/landing/portfolio-icons";

export interface Project {
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

// Важкі оверлеї підвантажуються лише при взаємодії (зменшує початковий JS).
const ProjectDetailModal = dynamic(
  () => import("@/components/landing/portfolio-overlays").then((m) => m.ProjectDetailModal),
  { ssr: false },
);
const LightboxGallery = dynamic(
  () => import("@/components/landing/portfolio-overlays").then((m) => m.LightboxGallery),
  { ssr: false },
);

const PROJECTS_PAGE_SIZE = 6;

/**
 * На touch-пристроях немає hover, тож «активуємо» картку, коли вона потрапляє
 * у вузьку центральну смугу вьюпорта. На пристроях з hover ефект лишається на наведенні.
 */
function useCenteredActive() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (!isTouch) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      // Тонка смуга по центру екрана: спрацьовує, коли картка в його середині.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, active };
}

function ProjectCard({
  project: p,
  locale,
  onOpen,
}: {
  project: Project;
  locale: ProjectLocale;
  onOpen: (project: Project) => void;
}) {
  const { ref, active } = useCenteredActive();
  const coverImage = p.images && p.images[0] ? p.images[0] : "/placeholder-image.jpg";
  const projectTitle = locale === "ua" ? p["name-ua"] : p["name-en"];
  const displayName = getProjectShortName(projectTitle, locale);
  const primaryCategory = p.categories?.[0];

  return (
    <article
      ref={ref}
      className={`group relative aspect-[4/5] overflow-hidden rounded-sm bg-[#141414] ring-1 ring-white/10 transition-all duration-500 hover:ring-[#C6A36D]/40 sm:aspect-[3/4] ${
        active ? "is-active ring-[#C6A36D]/40" : ""
      }`}
    >
      {/* Cover image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={coverImage}
          alt={projectTitle}
          fill
          quality={90}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover will-change-transform transition-transform duration-[1100ms] ease-out group-hover:scale-105 group-[.is-active]:scale-105"
        />
        {/* Focused scrim only behind the text area at the bottom */}
        <div className="absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(to_top,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.65)_45%,transparent_100%)]" />
        {/* Extra depth on hover, still confined to the lower zone */}
        <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(to_top,rgba(0,0,0,0.4),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-[.is-active]:opacity-100" />
      </div>

      {/* Editorial index */}
      <span className="absolute left-5 top-5 z-10 font-serif text-[11px] tracking-[0.3em] text-white/45 [text-shadow:_0_1px_3px_rgba(0,0,0,0.55)]">
        {String(p.id).padStart(2, "0")}
      </span>

      {/* Hover action cue */}
      <span className="absolute right-4 top-4 z-10 flex h-9 w-9 -translate-y-1 items-center justify-center rounded-full border border-white/15 bg-black/20 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:border-[#C6A36D]/60 group-hover:text-[#C6A36D] group-hover:opacity-100 group-[.is-active]:translate-y-0 group-[.is-active]:border-[#C6A36D]/60 group-[.is-active]:text-[#C6A36D] group-[.is-active]:opacity-100">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </span>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        {primaryCategory && (
          <span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C6A36D]">
            {getCategoryLabel(primaryCategory, locale)}
          </span>
        )}

        <h3 className="mt-2 font-serif text-2xl leading-tight tracking-wide text-[#EAE7E1] transition-colors duration-300 group-hover:text-white group-[.is-active]:text-white">
          {displayName}
        </h3>

        {/* Animated accent line */}
        <span className="mt-3 block h-px w-9 bg-[#C6A36D]/70 transition-all duration-500 ease-out group-hover:w-16 group-[.is-active]:w-16" />

        {/* Tags reveal on hover */}
        {p.tags.length > 0 && (
          <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:mt-3 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-[.is-active]:mt-3 group-[.is-active]:grid-rows-[1fr] group-[.is-active]:opacity-100">
            <div className="overflow-hidden">
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {p.tags.slice(0, 3).map((tagSlug) => (
                  <span
                    key={tagSlug}
                    className="text-[10px] uppercase tracking-wider text-[#EAE7E1]/55"
                  >
                    {getTagLabel(tagSlug, locale)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Full-card action */}
      <button
        type="button"
        className="absolute inset-0 z-20 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6A36D]"
        aria-label={locale === "ua" ? `Відкрити деталі проєкту: ${projectTitle}` : `Open project details: ${projectTitle}`}
        onClick={() => onOpen(p)}
      />
    </article>
  );
}

export function PortfolioGallery({ projects: projectsInput }: { projects: Project[] }) {
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

  const projects = useMemo(() => projectsInput || [], [projectsInput]);

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
          <div className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {displayedProjects.map((p) => (
              <ProjectCard key={p.id} project={p} locale={locale} onOpen={handleOpenProject} />
            ))}
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

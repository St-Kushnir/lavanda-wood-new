# Аудит: продуктивність · SSR · SEO · GEO

> Звіт станом на 29.05.2026. Стек: **Next.js 15 (App Router) + React 19 + Tailwind 3**.
> Файл — діагностика + план. Зміни робимо наступними кроками за погодженням.

---

## 0. Резюме (TL;DR)

| Напрям | Оцінка | Головна проблема |
|---|---|---|
| **Продуктивність (зображення)** | 🔴 критично | 378 JPG у `public/`, окремі файли **1–3.5 МБ**; картки проєктів рендеряться через сирий `<img>` без `next/image` |
| **Продуктивність (JS-бандл)** | 🟠 середньо | `projects-data.json` (**~111 КБ**) бандлиться у клієнт; уся сторінка — клієнтська |
| **SSR / рендеринг** | 🔴 критично | `LanguageProvider` (`"use client"`) на корені + усі секції `"use client"` → майже все рендериться на клієнті |
| **SEO (технічне)** | 🔴 критично | немає `metadataBase`, OG/Twitter, canonical, `sitemap`, `robots`, hreflang; `<html lang>` не змінюється |
| **GEO (ШІ-пошук)** | 🟠 середньо | JSON-LD лише у футері (client-render); немає Organization/Breadcrumb/FAQ, контент схований за client-гідрацією |
| **Доступність / семантика** | 🟢 непогано | гарні `aria-*`, але є дрібниці (порожні `alt`, `reactStrictMode:false`) |

**3 пріоритети з найбільшим ефектом:**
1. Стиснути/конвертувати медіа + перевести картки галереї на `next/image`.
2. Винести контент у Server Components (SSR), залишити клієнтським лише інтерактив.
3. Додати повний пакет метаданих + `sitemap.ts` + `robots.ts` + JSON-LD на сервері.

---

## 1. Продуктивність

### 1.1. Зображення — 🔴 найбільша проблема

**Факти (заміряно):**
- `public/` містить **378 .jpg**, 2 .png, **0 .webp/.avif**.
- Найважчі файли в `projects-gallery/`:
  - `project-9/image-7.jpg` — **3.5 МБ**
  - `project-14/image-5.jpg` — **3.3 МБ**
  - `project-32/image-3.jpg` — **3.2 МБ**
  - десятки файлів по **1–3 МБ**.
- Сумарна вага галереї — десятки/сотні МБ вихідних оригіналів.

**Проблема в коді** — картки в `components/landing/portfolio-gallery.tsx` (рядки ~244–250) використовують **сирий `<img>`** замість `next/image`:

```125:131:components/landing/portfolio-gallery.tsx
                  <div className="absolute inset-0 z-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverImage}
                      alt={projectTitle}
                      loading="lazy"
                      className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full w-auto max-w-none object-cover will-change-transform transition duration-700 group-hover:scale-[1.03]"
```

Наслідок: для прев'ю-картки (~400px) браузер тягне **повний оригінал 1–3 МБ**. Це руйнує LCP, споживає трафік, особливо на мобільних.

**Що робити:**
- [ ] **Конвертувати всі фото у WebP/AVIF** і прибрати/перетиснути оригінали (цільова вага картки ≤ 200–300 КБ, повноекранні ≤ 500 КБ). Інструмент: `sharp`-скрипт або `squoosh`/`cwebp` пакетно.
- [ ] Перевести **картки галереї на `next/image`** з `fill` + коректним `sizes` (`(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw`).
- [ ] У lightbox можна лишити `<img>` (через zoom/transform), але теж віддавати оптимізований формат.
- [ ] Налаштувати `next.config.ts`: `images.formats: ["image/avif","image/webp"]`, розумні `deviceSizes`.
- [ ] Hero (`hero-section.tsx`) — вже `priority` ✅; `herb-2.png` 600×600 показується ~128–224px → зменшити вихідний PNG або зробити SVG/WebP.

### 1.2. JS-бандл — 🟠

- `projects-data.json` (**~111 КБ**, 32 проєкти з UA+EN описами) **імпортується напряму в клієнтський** `portfolio-gallery.tsx`:

```12:12:components/landing/portfolio-gallery.tsx
import projectsData from "@/projects-data.json";
```
Уся ця JSON-маса потрапляє в клієнтський бандл і сериалізується.

**Що робити:**
- [ ] Передавати дані з Server Component як props (фільтрувати/трансформувати на сервері), або тримати в `lib/` як серверний модуль і віддавати лише потрібні поля.
- [ ] Для модалки проєкту — підвантажувати важкий контент лінивим імпортом (`next/dynamic`).
- [ ] `portfolio-gallery.tsx` — дуже великий (~1100+ рядків): розбити на `ProjectCard`, `ProjectModal`, `FiltersDrawer`, `Lightbox`; модалку/lightbox через `next/dynamic({ ssr:false })`.

### 1.3. Шрифти — 🟠

`app/layout.tsx` вантажить 7 CSS-файлів `@fontsource` (Inter 400/500/600/700 + Playfair 400/500/600):

```2:8:app/layout.tsx
import "@fontsource/inter/400.css";
...
import "@fontsource/playfair-display/600.css";
```

**Що робити:**
- [ ] Перейти на **`next/font`** (`next/font/google` або `localFont`): авто-`font-display: swap`, self-host, preload, усунення CLS, прибирання зайвих ваг. Залишити лише реально використані нарізки.

### 1.4. Анімації / спостерігачі — 🟢/🟠

- `RevealOnScroll` створює **окремий IntersectionObserver на кожну секцію** (8+ обгорток у `page.tsx`). Працює, але можна звести до одного спільного observer.
- `transform/opacity` для reveal — ок (композитні властивості).
- `backdrop-blur` у хедері + градієнти — прийнятно.

**Що робити (низький пріоритет):**
- [ ] Один спільний observer для всіх `.reveal-scope`.
- [ ] Поважати `prefers-reduced-motion` для reveal (у слайдері вже враховано).

---

## 2. SSR / рендеринг — 🔴

**Корінь проблеми:** `LanguageProvider` позначений `"use client"` й обгортає весь застосунок у `app/layout.tsx`:

```26:28:app/layout.tsx
        <LanguageProvider>
          {children}
        </LanguageProvider>
```

Через React-контекст усі споживачі `useLanguage()` стають клієнтськими. Наразі **17 файлів** мають `"use client"`, включно з усіма секціями та `app/page.tsx`-секціями. Фактично весь маркетинговий контент гідрується на клієнті.

**Наслідки:**
- Більший TTFB→FCP розрив, гірший LCP/INP.
- Перемикання мови — лише runtime-стейт (без URL), тож **немає окремих URL для UA/EN** → втрата для SEO/GEO.
- `app/page.tsx` сам по собі — Server Component, але всі діти клієнтські.

**Що робити:**
- [ ] **Локаль через маршрут**: `app/[locale]/...` або `?lang=` з читанням на сервері; контент рендерити в Server Components, передавати `locale`/словник пропсами.
- [ ] Клієнтськими лишити **тільки** інтерактив: `SiteHeader` (меню/перемикач), `PortfolioGallery` (модалка/lightbox), `YouTubePosterEmbed`, `ConsultationCtaButton`, `RevealOnScroll`. Решта (`AboutSection`, `WhyWildLogSection`, `CanadianTechSection` тексти, `ProcessSection` дані, `InternationalSection` текст, `CtaSection` текст, `SiteFooter`) → серверні.
- [ ] `reactStrictMode: false` у `next.config.ts` → **увімкнути `true`** (виявляє баги, не впливає на прод).

---

## 3. SEO (технічне) — 🔴

**Поточний стан** (`app/layout.tsx`):
```12:16:app/layout.tsx
export const metadata: Metadata = {
  title: "LAVANDA — handcrafted log homes since 1995",
  description:
    "Будівництво будинків із дикого зрубу за канадською технологією. Преміальні резиденції в Україні та Європі.",
};
```

**Чого бракує:**
- [ ] `metadataBase` (потрібен для абсолютних OG-URL).
- [ ] **Open Graph** (`og:title/description/image/type/locale`) — для соцмереж і прев'ю в месенджерах.
- [ ] **Twitter Card** (`summary_large_image`).
- [ ] `canonical` + `alternates.languages` (**hreflang** uk/en).
- [ ] `robots` (`index,follow`), `keywords` (необов'язково), `authors`, `creator`.
- [ ] **`app/sitemap.ts`** — генерація sitemap.xml (головна + якщо буде `[locale]` + потенційні сторінки проєктів).
- [ ] **`app/robots.ts`** — robots.txt з посиланням на sitemap.
- [ ] **`app/manifest.ts`** + іконки (`app/icon.png`, `apple-icon.png`) — PWA/іконки.
- [ ] `app/opengraph-image.tsx` — динамічна OG-картинка (бренд).
- [ ] **`<html lang>` динамічний** (зараз завжди `uk`), title/description мовозалежні.
- [ ] Семантика: на сторінці кілька `<h2>`, але переконатися, що **один `<h1>`** (зараз `h1` = «LAVANDA» у hero ✅).
- [ ] Декоративні зображення з порожнім `alt` — ок; перевірити, що змістовні фото галереї мають описові alt (зараз alt = назва проєкту ✅).

---

## 4. GEO — Generative Engine Optimization (ШІ-пошук) — 🟠

GEO = щоб **ChatGPT/Perplexity/Google AI Overviews/Gemini** легко зчитували й цитували сайт.

**Поточний стан:**
- JSON-LD є **тільки у футері** і вставляється в **клієнтському** компоненті через `dangerouslySetInnerHTML` — частина AI-краулерів без JS його не побачить.
- Основний контент (тексти про технологію, процес, переваги) — за client-гідрацією, тобто слабо доступний для не-JS ботів.

**Що робити:**
- [ ] **Structured Data на сервері** (в layout/page як `<script type="application/ld+json">` у серверному дереві):
  - `Organization` / `HomeAndConstructionBusiness` (NAP, geo, sameAs) — перенести з футера на серверний рівень.
  - `WebSite` + `BreadcrumbList`.
  - `FAQPage` — поширені питання (технологія, терміни, гарантія) → дуже добре цитується ШІ.
  - `ImageObject`/`Service` для напрямів (зруб, шале, лазні/SPA).
- [ ] **SSR контенту** (див. розділ 2) — щоб тексти були в HTML без JS.
- [ ] Чіткі **семантичні заголовки** + короткі фактологічні абзаци (рік заснування, технологія, географія, діаметр колод) — ШІ любить «extractable facts». Контент уже фактологічний ✅, треба зробити його доступним без JS.
- [ ] Окремі **URL для мов** (hreflang) — щоб ШІ розрізняв UA/EN версії.
- [ ] Додати `dateModified`/`datePublished` у структуровані дані.

---

## 5. Доступність та інше — 🟢 (дрібниці)

- `aria-label`, `aria-expanded`, `aria-controls`, `role` у хедері/слайдерах — гарно ✅.
- Lightbox: фокус-менеджмент і `Esc` є; варто додати **focus trap** і повернення фокуса на тригер.
- `next.config.ts` `reactStrictMode: false` → увімкнути.
- Перевірити контраст `#8B7355` на темному тлі для дрібного тексту (підписи) — місцями нижче AA.

---

## 6. План робіт за пріоритетом

### Етап 1 — Швидкі великі перемоги (Performance + SEO базис) — ✅ ВИКОНАНО
1. ✅ **Медіа-пайплайн**: `scripts/optimize-images.mjs` (sharp) — стиснуто в місці зі збереженням шляхів. Результат: **185.7 МБ → 114.8 МБ** (−71 МБ, MAX_WIDTH=2400, q80). Оригінали в `.image-backup/`.
2. ✅ **Картки галереї + плани → `next/image`** з `sizes`; `next.config`: `formats: avif/webp` + `deviceSizes`/`imageSizes`. (Lightbox-зум лишився `<img>` навмисно — трансформації.)
3. ✅ **Метадані** (`app/layout.tsx`): `metadataBase`, `title.template`, OG, Twitter Card, canonical, `robots`, keywords, authors.
4. ✅ **`app/sitemap.ts` + `app/robots.ts`** — генеруються (`/sitemap.xml`, `/robots.txt`).
5. ✅ **Шрифти**: лишено self-hosted `@fontsource` + **додано кириличні сабсети** (Inter 400/500/600/700, Playfair 400/500/600). `next/font/google` не використано — середовище блокує доступ до Google Fonts при білді (`UNABLE_TO_VERIFY_LEAF_SIGNATURE`).

> Перевірено: `tsc --noEmit` ✅, ESLint ✅, `next build` ✅ (First Load JS `/` ≈ 178 КБ — зменшення JSON-бандла заплановано в Етапі 2).

### Етап 2 — Архітектура рендеру (SSR + GEO) — ✅ ВИКОНАНО (рішення: єдиний URL)
**Рішення замовника:** локаль НЕ виноситься в URL. Лишається **тільки** `https://lavanda-wood.com/`; мова — клієнтський перемикач на тій самій сторінці (як було). Тому маршрути `/ua` та `/en` прибрано.
6. ◻️ Локаль через маршрут — **скасовано за рішенням замовника** (єдиний URL). Контент SSR-иться українською (дефолт), EN — через клієнтський перемикач.
7. ◻️ Динамічний `<html lang>`/hreflang — **не застосовно** для одного URL (`<html lang="uk">`, один canonical `/`, без hreflang).
8. ✅ **Серверний JSON-LD** (`components/seo/structured-data.tsx`, рендериться в HTML): `WebSite` + `FAQPage` (5 Q&A) + `BreadcrumbList` (українською). `Organization`/`HomeAndConstructionBusiness` лишився у футері (не чіпали).
9. ✅ **Етап 2b — виконано**:
   - ✅ `projects-data.json` винесено з **клієнтського JS-бандла** — імпорт у `app/page.tsx` (сервер), дані передаються пропсом у `ProjectsSection` → `PortfolioGallery`.
   - ✅ Модалку проєкту та lightbox винесено в `components/landing/portfolio-overlays.tsx` і підключено через `next/dynamic({ ssr:false })` — важкий інтерактив (zoom/pan/свайп) вантажиться лише при кліку на проєкт. Спільні іконки — `components/landing/portfolio-icons.tsx`.
   - **First Load JS `/`: 178 КБ → 156 КБ → 153 КБ** (сторінка 76 → 51 КБ).
   - ⏳ Потрібна ручна QA інтерактиву (zoom/pan/свайп/клавіатура) у браузері.

Додатково ✅ **повні метадані** (`app/layout.tsx`): OG, Twitter, canonical `/`, robots, keywords.

**Міграція старого сайту** (`redirects()` у `next.config.ts`): `/ua*` → `/`, `/ru*` → `/` (308). Точкові 301 зі старих URL розділів — додамо за реальним списком URL / Search Console.

> Перевірено `next build` ✅ + рантайм (`next start`): `/`=200 `lang=uk` + FAQPage JSON-LD + canonical; `/en`=404; `/ua`&`/ru`=308→`/`; `sitemap.xml` лише `/`.

### Етап 3 — Полірування
10. Спільний IntersectionObserver; `prefers-reduced-motion`.
11. Focus-trap у lightbox/модалці; контраст підписів.
12. `reactStrictMode: true`; `app/manifest.ts` + іконки; `opengraph-image`.
13. Заміри Lighthouse/Web Vitals до і після.

---

## 7. Орієнтовний вплив

| Захід | LCP | Бандл/трафік | SEO/GEO |
|---|---|---|---|
| WebP/AVIF + next/image у картках | ⬇⬇⬇ | ⬇⬇⬇ | ⬆ |
| SSR контенту | ⬇ | ⬇ | ⬆⬆⬆ |
| Метадані + sitemap + robots | — | — | ⬆⬆⬆ |
| JSON-LD на сервері + FAQ | — | — | ⬆⬆ (особливо ШІ) |
| next/font | ⬇ (CLS) | ⬇ | ⬆ |
| Винести JSON з клієнта | — | ⬇⬇ | — |

---

*Наступний крок: за вашим погодженням починаємо з Етапу 1 (медіа + next/image + метадані). Можемо йти пунктами або цілим етапом.*

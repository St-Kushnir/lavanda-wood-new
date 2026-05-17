/**
 * Локальні URL зображень для `next/image`.
 * Для портфоліо: `gallery` — усі кадри з папки проєкту (без перетину з іншими проєктами).
 */

const tourism = "/a-project-within-the-tourism-and-entertainment-complex";
const abroad = "/project-abroad";
const forest = "/project-in-the-forest";
const construction = "/the-construction-process-under-various-conditions";
const office = "/office";
const redRoof = "/project-red-roof";
const technologySection = "/technology-section";

/** Туркомплекс — тільки папка tourism */
const GALLERY_TOURISM = [
  `${tourism}/a-two-story-log-house-near-the-forest-snow-winter—an-exterior-view-from-a-distance.jpg`,
  `${tourism}/a-two-story-log-house-near-the-forest-snow-winter—a-close-up-exterior-view.jpg`,
  `${tourism}/a-two-story-log-house-near-the-forest-snow-winter-view-inside-first-floor-a-living-room-with-large-panoramic-windows.jpg`,
  `${tourism}/a-two-story-log-house-near-the-forest-snow-winter-view-inside-first-floor-a-living-room-with-large-panoramic-windows-with-a-stuffed-deer.jpg`,
  `${tourism}/a-two-story-log-house-near-the-forest-snow-winter-view-inside-first-floor-view-from-the-living-room-s-panoramic-window.jpg`,
  `${tourism}/a-two-story-log-house-near-the-forest-snow-winter-view-inside-first-floor—kitchen-and-hallway-with-stairs-leading-to-the-basement-and-the-upper-floor.jpg`,
] as const;

/** Двір / Європа — тільки папка project-abroad */
const GALLERY_ABROAD = [
  `${abroad}/a-log-house-with-access-to-a-courtyard-featuring-paved-walkways-and-a-lawn-summer.jpg`,
  `${abroad}/a-log-house-with-access-to-a-courtyard-featuring-paved-walkways-and-a-lawn-autumn.jpg`,
  `${abroad}/-a-log-house-with-access-to-a-courtyard-featuring-paved-walkways-and-a-lawn-view-from-the-gate-summer.jpg`,
  `${abroad}/-a-log-house-with-access-to-a-courtyard-featuring-paved-walkways-and-a-lawn-view-from-the-gate-autumn.jpg`,
  `${abroad}/a-log-cabin-with-access-to-a-courtyard-featuring-paved-walkways-and-a-lawn-a-view-parallel-to-a-large-window-and-a-roof-with-solar-panels—summer.jpg`,
  `${abroad}/a-log-cabin-with-access-to-a-courtyard-featuring-paved-walkways-and-a-lawn-a-view-parallel-to-a-large-window-and-a-roof-with-solar-panels—autumn.jpg`,
  `${abroad}/log-house-with-access-to-a-courtyard-featuring-paved-walkways-and-a-lawn-view-from-the-other-side.jpg`,
  `${abroad}/log-house-with-access-to-a-courtyard-featuring-paved-walkways-and-a-lawn-view-of-the-gate-from-the-street—autumn.jpg`,
] as const;

/** Офіс Німеччина — тільки office/ */
const GALLERY_OFFICE = [`${office}/lavanda-office-germany-2.jpg`, `${office}/lavanda-office-germany-1.jpg`] as const;

/** Ліс — тільки project-in-the-forest/ */
const GALLERY_FOREST = [
  `${forest}/construction-of-several-log-cabins-in-the-forest-during-the-summer-view-of-the-central-cabin.jpg`,
  `${forest}/construction-of-several-log-cabins-in-the-forest-during-the-summer-view-from-the-first-cabin-toward-the-other-two-cabins.jpg`,
  `${forest}/construction-of-several-log-cabins-in-the-forest-during-the-summer-view-of-the-first-cabin.jpg`,
] as const;

/** Червона покрівля — тільки project-red-roof/ */
const GALLERY_RED_ROOF = [
  `${redRoof}/a-large-two-story-log-house-with-a-bears-statue-and-a-red-roof-and-a-small-log-cabin-in-the-back-for-other-purposes.jpg`,
  `${redRoof}/a-large-two-story-log-house-with-a-bears-statue-and-a-red-roof-and-a-small-log-cabin-in-the-back-for-other-purposes-2.jpg`,
] as const;

/** Монтаж на ділянці / під тимчасовим дахом — тільки the-construction-process-under-various-conditions/ */
const GALLERY_CONSTRUCTION_PROCESS = [
  `${construction}/construction-of-a-log-house-on-the-client-s-property-using-construction-equipment.jpg`,
  `${construction}/construction-of-a-log-house-under-a-temporary-roof-a-view-of-the-log-laying-technique.jpg`,
  `${construction}/construction-of-a-log-house-under-a-temporary-roof-side-view.jpg`,
  `${construction}/construction-of-a-log-house-under-a-temporary-roof-interior-view.jpg`,
] as const;

export const IMG = {
  heroBearStatueRedRoofPaving: `${redRoof}/a-large-two-story-log-house-with-a-bears-statue-and-a-red-roof-with-paving-stones-day.jpg`,
  companyVasynaViewFromTheSky: "/company-vasyna-view-from-the-sky.jpg",
  courtyardSummer: `${abroad}/a-log-house-with-access-to-a-courtyard-featuring-paved-walkways-and-a-lawn-summer.jpg`,
  bearHouse: `${redRoof}/a-large-two-story-log-house-with-a-bears-statue-and-a-red-roof-and-a-small-log-cabin-in-the-back-for-other-purposes.jpg`,
  winterLivingPanorama: `${tourism}/a-two-story-log-house-near-the-forest-snow-winter-view-inside-first-floor-a-living-room-with-large-panoramic-windows.jpg`,
  winterLivingFromPanoramicWindow: `${tourism}/a-two-story-log-house-near-the-forest-snow-winter-view-inside-first-floor-view-from-the-living-room-s-panoramic-window.jpg`,
  logLayingTechnique: `${construction}/construction-of-a-log-house-under-a-temporary-roof-a-view-of-the-log-laying-technique.jpg`,
  constructionEquipment: `${construction}/construction-of-a-log-house-on-the-client-s-property-using-construction-equipment.jpg`,
  tempRoofInterior: `${construction}/construction-of-a-log-house-under-a-temporary-roof-interior-view.jpg`,
  tempRoofSideView: `${construction}/construction-of-a-log-house-under-a-temporary-roof-side-view.jpg`,
  severalCabinsSummer: `${forest}/construction-of-several-log-cabins-in-the-forest-during-the-summer-view-of-the-central-cabin.jpg`,
  officeGermany1: `${office}/lavanda-office-germany-1.jpg`,
  officeGermany2: `${office}/lavanda-office-germany-2.jpg`,
  whiteHouseNight: "/white-log-house-at-night.jpg",
  solarSummer: `${abroad}/a-log-cabin-with-access-to-a-courtyard-featuring-paved-walkways-and-a-lawn-a-view-parallel-to-a-large-window-and-a-roof-with-solar-panels—summer.jpg`,
} as const;

/** Зображення етапів — лише `public/technology-section/` */
export const TECHNOLOGY_SECTION_STAGES = [
  `${technologySection}/technology-stage-1.jpeg`,
  `${technologySection}/technology-stage-2.jpeg`,
  `${technologySection}/technology-stage-3.jpg`,
  `${technologySection}/technology-stage-4.jpg`,
  `${technologySection}/technology-stage-5.jpg`,
  `${technologySection}/technology-stage-6.jpg`,
] as const;

export type PortfolioProject = {
  id: string;
  coverSrc: string;
  title: string;
  location: string;
  category: string;
  /** Шляхи до зображень лише з папки цього проєкту */
  gallery: readonly string[];
};

export const PORTFOLIO_PROJECTS = [
  {
    id: "tourism-entertainment-complex",
    coverSrc: `${tourism}/a-two-story-log-house-near-the-forest-snow-winter—an-exterior-view-from-a-distance.jpg`,
    title: "Проєкт у туркомплексі",
    location: "Україна · туризм і розваги",
    category: "Комерційний об'єкт",
    gallery: GALLERY_TOURISM,
  },
  {
    id: "project-abroad-courtyard",
    coverSrc: `${abroad}/a-log-house-with-access-to-a-courtyard-featuring-paved-walkways-and-a-lawn-summer.jpg`,
    title: "Резиденція з внутрішнім двором",
    location: "Європа",
    category: "Приватний будинок",
    gallery: GALLERY_ABROAD,
  },
  {
    id: "office-germany",
    coverSrc: `${office}/lavanda-office-germany-2.jpg`,
    title: "Представництво в Німеччині",
    location: "Німеччина",
    category: "Міжнародна присутність",
    gallery: GALLERY_OFFICE,
  },
  {
    id: "project-in-the-forest",
    coverSrc: `${forest}/construction-of-several-log-cabins-in-the-forest-during-the-summer-view-of-the-central-cabin.jpg`,
    title: "Комплекс зрубів у лісі",
    location: "Україна",
    category: "Комерційний об'єкт",
    gallery: GALLERY_FOREST,
  },
  {
    id: "construction-on-site",
    coverSrc: `${construction}/construction-of-a-log-house-on-the-client-s-property-using-construction-equipment.jpg`,
    title: "Збірка зрубу на ділянці",
    location: "Україна · монтаж під тимчасовим дахом",
    category: "Етап будівництва",
    gallery: GALLERY_CONSTRUCTION_PROCESS,
  },
  {
    id: "bear-statue-residence",
    coverSrc: `${redRoof}/a-large-two-story-log-house-with-a-bears-statue-and-a-red-roof-and-a-small-log-cabin-in-the-back-for-other-purposes.jpg`,
    title: "Резиденція з червоною покрівлею",
    location: "Україна",
    category: "Приватний будинок",
    gallery: GALLERY_RED_ROOF,
  },
] as const satisfies readonly PortfolioProject[];

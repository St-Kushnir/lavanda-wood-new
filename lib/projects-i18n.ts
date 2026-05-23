import categoriesTagsData from "@/categories-tags-projects.json";

/** Мова інтерфейсу для проєктів каталогу */
export type ProjectLocale = "ua" | "en";

export type LocalizedLabel = {
  ua: string;
  en: string;
};

export type CategoriesTagsDictionary = {
  categories: Record<string, LocalizedLabel>;
  tags: Record<string, LocalizedLabel>;
  parameters: Record<string, LocalizedLabel>;
};

export const CATEGORIES_TAGS = categoriesTagsData as CategoriesTagsDictionary;

/** Підпис категорії за ключем-сlug; якщо ключа немає в словнику — повертає сам ключ */
export function getCategoryLabel(key: string, locale: ProjectLocale): string {
  const trimmed = key.trim();
  if (!trimmed) return "";
  return CATEGORIES_TAGS.categories[trimmed]?.[locale] ?? trimmed;
}

/** Підпис тега за ключем-slug; якщо ключа немає в словнику — повертає сам ключ */
export function getTagLabel(key: string, locale: ProjectLocale): string {
  const trimmed = key.trim();
  if (!trimmed) return "";
  return CATEGORIES_TAGS.tags[trimmed]?.[locale] ?? trimmed;
}

/** Підпис параметра за ключем-slug; якщо ключа немає в словнику — повертає сам ключ */
export function getParameterLabel(key: string, locale: ProjectLocale): string {
  const trimmed = key.trim();
  if (!trimmed) return "";
  return CATEGORIES_TAGS.parameters[trimmed]?.[locale] ?? trimmed;
}

/** Масив локалізованих назв категорій (порожні ключі відфільтровуються) */
export function getCategoryLabels(keys: readonly string[], locale: ProjectLocale): string[] {
  return keys.map((key) => getCategoryLabel(key, locale)).filter(Boolean);
}

/** Масив локалізованих назв тегів (порожні ключі відфільтровуються) */
export function getTagLabels(keys: readonly string[], locale: ProjectLocale): string[] {
  return keys.map((key) => getTagLabel(key, locale)).filter(Boolean);
}

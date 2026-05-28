"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { isLocale } from "@/lib/i18n";
import { ProjectLocale } from "@/lib/projects-i18n";

const LOCALE_STORAGE_KEY = "lavanda-locale";

interface LanguageContextType {
  locale: ProjectLocale;
  setLocale: (locale: ProjectLocale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function readStoredLocale(): ProjectLocale | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    return stored && isLocale(stored) ? stored : null;
  } catch {
    return null;
  }
}

export function LanguageProvider({
  children,
  initialLocale = "ua",
}: {
  children: ReactNode;
  initialLocale?: ProjectLocale;
}) {
  const [locale, setLocaleState] = useState<ProjectLocale>(initialLocale);

  useEffect(() => {
    const stored = readStoredLocale();
    if (stored) setLocaleState(stored);
  }, []);

  const setLocale = useCallback((next: ProjectLocale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // private mode / quota — ігноруємо
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

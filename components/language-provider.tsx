"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProjectLocale } from "@/lib/projects-i18n";

interface LanguageContextType {
  locale: ProjectLocale;
  setLocale: (locale: ProjectLocale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<ProjectLocale>("ua");

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

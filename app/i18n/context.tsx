"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { translations, Language, TranslationKey } from "./translations";

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";

  const stored = localStorage.getItem("podcast-language") as Language;
  if (stored && (stored === "en" || stored === "zh")) {
    return stored;
  }

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("zh")) {
    return "zh";
  }
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLanguageState(getInitialLanguage());
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("podcast-language", lang);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  if (!mounted) {
    return (
      <I18nContext.Provider
        value={{ language: "en", setLanguage, t: (k) => translations.en[k] || k }}
      >
        {children}
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within I18nProvider");
  }
  return context;
}

import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  type Language,
  PAGE_TITLE,
  translate,
} from "./translations";

export type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  /** Translate an English source string into the active language. */
  t: (key: string) => string;
};

/**
 * English default so a component rendered outside the provider (for example a
 * unit test that mounts a page directly) still renders the English site rather
 * than throwing.
 */
const DEFAULT_CONTEXT: LanguageContextValue = {
  language: DEFAULT_LANGUAGE,
  setLanguage: () => {},
  t: (key) => key,
};

export const LanguageContext =
  createContext<LanguageContextValue>(DEFAULT_CONTEXT);

function readStoredLanguage(): Language {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === "fr"
      ? "fr"
      : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

/**
 * Holds the active language, persists the visitor's choice across pages and
 * return visits, and keeps the document language attribute and title in step.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the in-memory choice stands.
    }
  }, []);

  const t = useCallback((key: string) => translate(language, key), [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = PAGE_TITLE[language];
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

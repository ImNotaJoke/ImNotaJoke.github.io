import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import translations from "./translations";

type Lang = "fr" | "en";

interface I18nContextType {
  lang: Lang;
  t: (key: string) => string;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(
    () => (localStorage.getItem("lang") as Lang) || "fr"
  );

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.lang = newLang;
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[lang]?.[key] ?? key;
    },
    [lang]
  );

  return (
    <I18nContext.Provider value={{ lang, t, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useTranslation must be used within I18nProvider");
  return ctx;
}

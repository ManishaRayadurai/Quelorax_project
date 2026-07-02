import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations, LANGUAGES } from "../i18n/translations";

const LANG_KEY = "quelorax_lang";
const LanguageContext = createContext(null);

function readStoredLang() {
    try {
        const stored = localStorage.getItem(LANG_KEY);
        if (stored && translations[stored]) return stored;
    } catch {
        // ignore
    }
    return "en";
}

export function LanguageProvider({ children }) {
    const [language, setLanguageState] = useState(readStoredLang);

    useEffect(() => {
        try {
            localStorage.setItem(LANG_KEY, language);
        } catch {
            // ignore
        }
        document.documentElement.setAttribute("lang", language);
    }, [language]);

    const setLanguage = useCallback((code) => {
        if (translations[code]) setLanguageState(code);
    }, []);

    const t = useCallback((key) => {
        return translations[language]?.[key] ?? translations.en[key] ?? key;
    }, [language]);

    return (<LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>);
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
    return ctx;
}

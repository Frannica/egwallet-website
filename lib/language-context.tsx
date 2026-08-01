"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { RTL_LANGUAGES, translations, type Language, type TranslationKey } from "./translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
  dir: "ltr" | "rtl"
  isRtl: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const isRtl = RTL_LANGUAGES.includes(language)
  const dir: "ltr" | "rtl" = isRtl ? "rtl" : "ltr"

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null
    if (savedLang && savedLang in translations) {
      setLanguage(savedLang)
    } else if (savedLang === "ru") {
      // Russian removed — fall back to English
      localStorage.setItem("language", "en")
      setLanguage("en")
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = dir
    document.documentElement.classList.toggle("rtl", isRtl)
  }, [language, dir, isRtl])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || String(key)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, dir, isRtl }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider")
  return context
}

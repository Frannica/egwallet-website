"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { translations, type Language } from "./translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  // Accepts keys like "heroTitle" OR "hero.title" (dot notation)
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce((acc: any, part) => (acc && typeof acc === "object" ? acc[part] : undefined), obj as any)
}

function toText(value: unknown): string {
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  // IMPORTANT: if it’s an object/array/etc, return empty string to avoid:
  // "Objects are not valid as a React child"
  return ""
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null
    if (
      savedLang &&
      (savedLang === "en" || savedLang === "es" || savedLang === "fr" || savedLang === "ru" || savedLang === "zh")
    ) {
      setLanguage(savedLang)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    const current = getByPath(translations[language], key)
    const fallback = getByPath(translations.en, key)
    return toText(current) || toText(fallback)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider")
  return context
}

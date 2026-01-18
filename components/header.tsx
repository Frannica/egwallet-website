"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Wallet } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "./language-switcher"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">E.G. Wallet</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("features")}
            </a>
            <a href="#currencies" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("currencies")}
            </a>
            <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("security")}
            </a>
            <a href="#support" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("support")}
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="ghost" className="text-foreground">
              {t("login")}
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">{t("getStarted")}</Button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("features")}
              </a>
              <a href="#currencies" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("currencies")}
              </a>
              <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("security")}
              </a>
              <a href="#support" className="text-muted-foreground hover:text-foreground transition-colors">
                {t("support")}
              </a>
              <div className="flex flex-col gap-2 pt-4">
                <LanguageSwitcher />
                <Button variant="ghost" className="text-foreground justify-start">
                  {t("login")}
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">{t("getStarted")}</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

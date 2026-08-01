"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Wallet } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "./language-switcher"
import { ANCHORS, SUPPORT_MAILTO_CONTACT } from "@/lib/site"

const navItems = [
  { href: ANCHORS.features, key: "features" as const },
  { href: ANCHORS.currencies, key: "currencies" as const },
  { href: ANCHORS.security, key: "security" as const },
  { href: ANCHORS.support, key: "support" as const },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="fixed top-0 start-0 end-0 z-50 border-b border-border bg-white/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href={ANCHORS.top} className="flex items-center gap-2.5" onClick={closeMenu}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">E.G. Wallet</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <LanguageSwitcher />
            <Button variant="ghost" className="text-foreground" asChild>
              <a href={SUPPORT_MAILTO_CONTACT}>{t("login")}</a>
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href={ANCHORS.getApp}>{t("getStarted")}</a>
            </Button>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-foreground hover:bg-secondary md:hidden"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {t(item.key)}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-border pt-4">
                <LanguageSwitcher />
                <Button variant="outline" className="justify-start border-border" asChild>
                  <a href={SUPPORT_MAILTO_CONTACT} onClick={closeMenu}>
                    {t("login")}
                  </a>
                </Button>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <a href={ANCHORS.getApp} onClick={closeMenu}>
                    {t("getStarted")}
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

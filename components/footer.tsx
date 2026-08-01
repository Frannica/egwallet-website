"use client"

import { Wallet } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { ANCHORS, SUPPORT_MAILTO_CONTACT } from "@/lib/site"

export function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Wallet className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-semibold text-foreground">E.G. Wallet</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{t("footerTagline")}</p>
            <p className="text-xs leading-relaxed text-muted-foreground">{t("notABank")}</p>
          </div>

          <div>
            <h4 className="mb-4 font-display font-semibold text-foreground">{t("product")}</h4>
            <ul className="space-y-2">
              <li>
                <a href={ANCHORS.features} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t("footerFeatures")}
                </a>
              </li>
              <li>
                <a href={ANCHORS.virtualCard} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t("footerVirtualCard")}
                </a>
              </li>
              <li>
                <a href={ANCHORS.currencies} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t("footerCurrencies")}
                </a>
              </li>
              <li>
                <a href={ANCHORS.security} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t("footerSecurity")}
                </a>
              </li>
              <li>
                <a href={ANCHORS.getApp} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t("footerGetApp")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display font-semibold text-foreground">{t("company")}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t("footerPrivacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t("footerTerms")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display font-semibold text-foreground">{t("supportCol")}</h4>
            <ul className="space-y-2">
              <li>
                <a href={ANCHORS.support} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {t("footerContact")}
                </a>
              </li>
              <li>
                <a
                  href={SUPPORT_MAILTO_CONTACT}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  support@egwalletfinance.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} E.G. Wallet. {t("allRights")}
          </p>
        </div>
      </div>
    </footer>
  )
}

"use client"

import { Mail, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { SITE, SUPPORT_MAILTO_CONTACT } from "@/lib/site"
import Link from "next/link"

export function ContactSection() {
  const { t } = useLanguage()

  return (
    <section id="support" className="section-soft scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="surface-panel rounded-2xl px-6 py-12 sm:px-10 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
                {t("contactTitle")}
              </h2>
              <p className="max-w-2xl leading-relaxed text-muted-foreground">{t("contactSubtitle")}</p>
              <p className="text-sm text-muted-foreground">{t("contactLegal")}</p>
              <div className="flex flex-wrap gap-4 pt-2 text-sm">
                <Link href="/privacy" className="font-medium text-primary underline-offset-4 hover:underline">
                  {t("privacyLink")}
                </Link>
                <Link href="/terms" className="font-medium text-primary underline-offset-4 hover:underline">
                  {t("termsLink")}
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-muted p-6">
              <div className="mb-2 text-sm text-muted-foreground">{t("contactEmailLabel")}</div>
              <a
                href={SUPPORT_MAILTO_CONTACT}
                className="inline-flex items-center gap-2 font-display text-lg font-semibold text-foreground hover:text-primary"
              >
                <Mail className="h-5 w-5 text-primary" />
                {SITE.supportEmail}
              </a>
              <Button size="lg" className="mt-6 w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href={SUPPORT_MAILTO_CONTACT}>
                  {t("contactCta")} <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

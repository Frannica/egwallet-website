"use client"

import { ArrowRight, ArrowUpRight, ArrowDownLeft, Globe2, ShieldCheck, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { ANCHORS, SITE } from "@/lib/site"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="top" className="hero-soft relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm font-medium text-foreground">{t("newCurrencies")}</span>
          </div>

          <div className="space-y-4">
            <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {t("heroTitle")}
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground text-balance sm:text-5xl lg:text-[3.25rem]">
              {t("heroTitleHighlight")}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">{t("heroDescription")}</p>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{t("whereItWorks")}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href={ANCHORS.getApp}>
                {t("getStarted")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border bg-white text-foreground hover:bg-secondary"
              asChild
            >
              <a href={ANCHORS.features}>{t("learnMore")}</a>
            </Button>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>{t("trustSecure")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-primary" />
              <span>{t("eightCurrencies")}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{t("walletTransfers")}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="surface-panel rounded-2xl p-6 sm:p-8">
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {t("previewLabel")}
              </span>
              <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-primary">
                {t("closedTestingBadge")}
              </span>
            </div>

            <h2 className="font-display text-xl font-semibold text-foreground">{t("capabilitiesTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("capabilitiesSubtitle")}</p>

            <ul className="mt-6 space-y-3">
              {[
                { icon: ArrowUpRight, label: t("send") },
                { icon: ArrowDownLeft, label: t("request") },
                { icon: Globe2, label: t("convert") },
              ].map((action) => (
                <li
                  key={action.label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-muted/60 px-4 py-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-border bg-secondary/80 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">{t("supportedLabel")}</p>
              <p className="mt-1 font-mono text-sm text-foreground">{SITE.currencies.join(" · ")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

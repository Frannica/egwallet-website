"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Globe, Zap } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm text-primary">{t("newCurrencies")}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              {t("heroTitle")} <span className="text-primary">{t("heroTitleHighlight")}</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">{t("heroDescription")}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
                {t("getStarted")} <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary bg-transparent"
              >
                {t("learnMore")}
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">{t("bankGrade")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">{t("eightCurrencies")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">{t("instantTransfers")}</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-card rounded-3xl p-6 border border-border shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{t("totalBalance")}</span>
                  <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">USD</span>
                </div>
                <div className="text-4xl font-bold text-foreground">$24,580.00</div>
                <div className="flex items-center gap-2 text-primary text-sm">
                  <span>+12.5%</span>
                  <span className="text-muted-foreground">{t("thisMonth")}</span>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ArrowRight className="w-5 h-5 text-primary -rotate-45" />
                    </div>
                    <span className="text-xs text-muted-foreground">{t("send")}</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <ArrowRight className="w-5 h-5 text-primary rotate-135" />
                    </div>
                    <span className="text-xs text-muted-foreground">{t("request")}</span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">{t("convert")}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary/20 rounded-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

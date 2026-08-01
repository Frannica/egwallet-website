"use client"

import { Lock, Unlock, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { SUPPORT_MAILTO_ACCESS } from "@/lib/site"

export function VirtualCard() {
  const { t } = useLanguage()

  return (
    <section id="virtual-card" className="scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-sm lg:mx-0">
            <div
              className="relative aspect-[1.586/1] overflow-hidden rounded-2xl bg-gradient-to-br from-[#007AFF] via-[#1565C0] to-[#0D1B2E] p-6 shadow-lg"
              aria-hidden="true"
            >
              <div className="absolute -end-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
              <div className="absolute -bottom-10 -start-6 h-28 w-28 rounded-full bg-black/10" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="h-8 w-12 rounded bg-white/25" />
                  <span className="text-sm font-medium text-white/90">E.G. Wallet</span>
                </div>
                <div className="space-y-4">
                  <div className="font-mono text-lg tracking-[0.2em] text-white">{t("cardNumberMask")}</div>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-xs text-white/70">{t("cardHolder")}</div>
                      <div className="text-sm text-white">{t("cardHolderSample")}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/70">{t("expires")}</div>
                      <div className="text-sm text-white">••/••</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground lg:text-start">{t("cardIllustrationNote")}</p>
          </div>
        </div>

        <div className="order-1 space-y-6 lg:order-2">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
            {t("virtualCardTitle")}
          </h2>
          <p className="leading-relaxed text-muted-foreground">{t("virtualCardSubtitle")}</p>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted px-4 py-3">
              <Lock className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground">{t("freezeCard")}</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted px-4 py-3">
              <Unlock className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground">{t("unfreezeCard")}</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted px-4 py-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="text-sm text-foreground">{t("manageInApp")}</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">{t("cardAvailability")}</p>

          <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <a href={SUPPORT_MAILTO_ACCESS}>
              <CreditCard className="h-4 w-4" /> {t("cardCta")}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

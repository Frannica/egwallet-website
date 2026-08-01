"use client"

import { Send, QrCode, History, PieChart, CreditCard, RefreshCw } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Features() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Send,
      title: t("sendReceive"),
      description: t("sendReceiveDesc"),
    },
    {
      icon: QrCode,
      title: t("qrPayments"),
      description: t("qrPaymentsDesc"),
    },
    {
      icon: History,
      title: t("transactionHistory"),
      description: t("transactionHistoryDesc"),
    },
    {
      icon: PieChart,
      title: t("budgetTracking"),
      description: t("budgetTrackingDesc"),
    },
    {
      icon: CreditCard,
      title: t("virtualCards"),
      description: t("virtualCardsDesc"),
    },
    {
      icon: RefreshCw,
      title: t("currencyConversion"),
      description: t("currencyConversionDesc"),
    },
  ]

  return (
    <section id="features" className="scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
            {t("featuresTitle")}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{t("featuresSubtitle")}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

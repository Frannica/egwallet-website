"use client"

import { Send, ArrowDownLeft, History, PieChart, CreditCard, RefreshCw } from "lucide-react"
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
      icon: ArrowDownLeft,
      title: t("aiSupport"),
      description: t("aiSupportDesc"),
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
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">{t("featuresTitle")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t("featuresSubtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-background rounded-2xl border border-border hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

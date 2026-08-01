"use client"

import { useCallback, useEffect, useState } from "react"
import { RefreshCw } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { SITE } from "@/lib/site"

const ALWAYS_INDICATIVE = new Set<string>(SITE.alwaysIndicativeCurrencies)

const currencies = [
  { code: "XAF", name: "Central African CFA", flag: "🇨🇲" },
  { code: "XOF", name: "West African CFA", flag: "🇸🇳" },
  { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬" },
  { code: "GHS", name: "Ghanaian Cedi", flag: "🇬🇭" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
]

interface RatesPayload {
  rates: Record<string, number>
  sources?: Record<string, "live" | "indicative">
  lastUpdated: string
}

export function CurrencySection() {
  const { t } = useLanguage()
  const [rates, setRates] = useState<RatesPayload["rates"]>({})
  const [sources, setSources] = useState<RatesPayload["sources"]>({})
  const [lastUpdated, setLastUpdated] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchRates = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/exchange-rates")
      const data = (await response.json()) as RatesPayload
      setRates(data.rates || {})
      setSources(data.sources || {})
      setLastUpdated(data.lastUpdated || "")
    } catch (error) {
      console.error("Failed to fetch exchange rates:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRates()
    const interval = setInterval(fetchRates, 300000)
    return () => clearInterval(interval)
  }, [fetchRates])

  return (
    <section id="currencies" className="section-soft scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
            {t("supportedCurrencies")}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{t("supportedCurrenciesDesc")}</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>{lastUpdated ? `${t("lastUpdated")}: ${lastUpdated}` : t("loadingRates")}</span>
            <button
              type="button"
              onClick={fetchRates}
              disabled={loading}
              className="rounded-md p-1 transition-colors hover:text-primary disabled:opacity-50"
              aria-label={t("refreshRates")}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {currencies.map((currency) => {
            const rate = rates[currency.code]
            const source = ALWAYS_INDICATIVE.has(currency.code)
              ? "indicative"
              : sources?.[currency.code] || (typeof rate === "number" ? "live" : undefined)
            return (
              <div
                key={currency.code}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm"
              >
                <div className="mb-3 text-3xl" aria-hidden="true">
                  {currency.flag}
                </div>
                <div className="font-display text-lg font-semibold text-foreground">{currency.code}</div>
                <div className="text-sm text-muted-foreground">{currency.name}</div>
                <div className="mt-3 font-mono text-xs text-primary">
                  {typeof rate === "number"
                    ? `1 USD = ${rate.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${currency.code}`
                    : t("rateUnavailable")}
                </div>
                {source && (
                  <div
                    className={`mt-2 text-[11px] font-semibold uppercase tracking-wide ${
                      source === "indicative" ? "text-amber-700" : "text-muted-foreground"
                    }`}
                  >
                    {source === "live" ? t("liveRate") : t("indicativeRate")}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>{t("currencyHoldNote")}</p>
          <p>{t("currencyExchangeNote")}</p>
          <p>{t("currencyCashOutNote")}</p>
          <p>{t("ratesDisclaimer")}</p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
            <div className="font-display text-3xl font-semibold text-primary">$250K</div>
            <div className="mt-2 text-sm text-muted-foreground">{t("maxWallet")}</div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
            <div className="font-display text-3xl font-semibold text-primary">$5K</div>
            <div className="mt-2 text-sm text-muted-foreground">{t("dailySend")}</div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
            <div className="font-display text-3xl font-semibold text-primary">{t("realTimeLabel")}</div>
            <div className="mt-2 text-sm text-muted-foreground">{t("rateRefresh")}</div>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">{t("limitsNote")}</p>
      </div>
    </section>
  )
}

"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { RefreshCw } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { CURRENCY_CODES, CURRENCY_META, CurrencyCode } from "@/lib/currencies"
import { CurrencyConverter } from "@/components/currency-converter"

interface RatesPayload {
  rates: Record<string, number>
  sources?: Record<string, string>
  currencies?: string[]
  lastUpdated: string
}

export function CurrencySection() {
  const { t } = useLanguage()
  const [rates, setRates] = useState<RatesPayload["rates"]>({})
  const [lastUpdated, setLastUpdated] = useState("")
  const [loading, setLoading] = useState(true)
  const [availableCodes, setAvailableCodes] = useState<CurrencyCode[]>([])

  const fetchRates = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/exchange-rates")
      const data = (await response.json()) as RatesPayload
      const nextRates = data.rates || {}
      const functional = CURRENCY_CODES.filter(
        (code) => typeof nextRates[code] === "number" && nextRates[code] > 0
      )
      setRates(nextRates)
      setAvailableCodes(functional)
      setLastUpdated(data.lastUpdated || "")
    } catch (error) {
      console.error("Failed to fetch exchange rates:", error)
      setRates({})
      setAvailableCodes([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRates()
    // Daily reference data — refresh periodically; not a claim of minute/hourly publishes.
    const interval = setInterval(fetchRates, 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchRates])

  const cards = useMemo(
    () =>
      availableCodes.map((code) => ({
        code,
        name: CURRENCY_META[code].name,
        flag: CURRENCY_META[code].flag,
        rate: rates[code],
      })),
    [availableCodes, rates]
  )

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

        {cards.length === 0 && !loading ? (
          <p className="text-center text-sm text-muted-foreground">{t("rateUnavailable")}</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4">
            {cards.map((currency) => (
              <div
                key={currency.code}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm"
                data-testid={`currency-card-${currency.code}`}
              >
                <div className="mb-3 text-3xl" aria-hidden="true">
                  {currency.flag}
                </div>
                <div className="font-display text-lg font-semibold text-foreground">{currency.code}</div>
                <div className="text-sm text-muted-foreground">{currency.name}</div>
                <div className="mt-3 font-mono text-xs text-primary">
                  {typeof currency.rate === "number"
                    ? `1 USD = ${currency.rate.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${currency.code}`
                    : t("rateUnavailable")}
                </div>
                <div className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {t("dailyReferenceRate")}
                </div>
              </div>
            ))}
          </div>
        )}

        <CurrencyConverter
          rates={rates}
          lastUpdated={lastUpdated}
          loading={loading}
          availableCodes={availableCodes}
        />

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

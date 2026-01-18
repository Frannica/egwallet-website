"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { RefreshCw } from "lucide-react"

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

interface ExchangeRates {
  [key: string]: number
}

export function CurrencySection() {
  const { t } = useLanguage()
  const [rates, setRates] = useState<ExchangeRates>({})
  const [lastUpdated, setLastUpdated] = useState<string>("")
  const [loading, setLoading] = useState(true)

  const fetchRates = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/exchange-rates")
      const data = await response.json()
      setRates(data.rates)
      setLastUpdated(data.lastUpdated)
    } catch (error) {
      console.error("[v0] Failed to fetch exchange rates:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRates()
    // Refresh rates every 5 minutes
    const interval = setInterval(fetchRates, 300000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="currencies" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            {t("supportedCurrencies")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t("supportedCurrenciesDesc")}</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <span>{lastUpdated ? `Last updated: ${lastUpdated}` : "Loading rates..."}</span>
            <button
              onClick={fetchRates}
              disabled={loading}
              className="p-1 hover:text-primary transition-colors disabled:opacity-50"
              aria-label="Refresh rates"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {currencies.map((currency) => (
            <div
              key={currency.code}
              className="p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all hover:scale-105 cursor-pointer group"
            >
              <div className="text-4xl mb-3">{currency.flag}</div>
              <div className="font-bold text-foreground text-lg">{currency.code}</div>
              <div className="text-sm text-muted-foreground mb-2">{currency.name}</div>
              {rates[currency.code] && (
                <div className="text-xs text-primary font-mono">
                  1 USD = {rates[currency.code].toFixed(2)} {currency.code}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-primary mb-2">$250K</div>
            <div className="text-muted-foreground">Maximum wallet capacity</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-primary mb-2">$5K</div>
            <div className="text-muted-foreground">Daily send limit</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-primary mb-2">Real-time</div>
            <div className="text-muted-foreground">Exchange rates</div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useCallback, useEffect, useId, useMemo, useState } from "react"
import { ArrowLeftRight } from "lucide-react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { useLanguage } from "@/lib/language-context"
import {
  CURRENCY_CODES,
  CURRENCY_META,
  CurrencyCode,
  HISTORY_PERIODS,
  HistoryPeriod,
  canFetchFrankfurterHistory,
  convertAmount,
  crossRate,
} from "@/lib/currencies"

interface RatesPayload {
  rates: Record<string, number>
  lastUpdated: string
}

interface HistoryPoint {
  date: string
  rate: number
}

interface HistoryPayload {
  available: boolean
  reason?: string
  points?: HistoryPoint[]
  high?: number | null
  low?: number | null
  provider?: string
}

type Props = {
  rates: RatesPayload["rates"]
  lastUpdated: string
  loading?: boolean
  /** Only codes that returned real Frankfurter data — selectors use this list. */
  availableCodes?: CurrencyCode[]
}

function formatRate(n: number): string {
  if (!Number.isFinite(n)) return "—"
  if (n >= 100) return n.toLocaleString(undefined, { maximumFractionDigits: 2 })
  if (n >= 1) return n.toLocaleString(undefined, { maximumFractionDigits: 4 })
  return n.toLocaleString(undefined, { maximumFractionDigits: 6 })
}

function formatAmount(n: number): string {
  if (!Number.isFinite(n)) return "—"
  return n.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 0 })
}

export function CurrencyConverter({ rates, lastUpdated, loading, availableCodes }: Props) {
  const { t, isRtl } = useLanguage()
  const fromId = useId()
  const toId = useId()
  const amountId = useId()

  const codes = useMemo(() => {
    const list = (availableCodes?.length ? availableCodes : CURRENCY_CODES).filter(
      (code) => typeof rates[code] === "number" && rates[code] > 0
    )
    return list.length > 0 ? list : CURRENCY_CODES.filter((c) => c === "USD" || c === "EUR")
  }, [availableCodes, rates])

  const [from, setFrom] = useState<CurrencyCode>("USD")
  const [to, setTo] = useState<CurrencyCode>("EUR")
  const [amountStr, setAmountStr] = useState("100")
  const [period, setPeriod] = useState<HistoryPeriod>("1M")
  const [history, setHistory] = useState<HistoryPayload | null>(null)
  const [historyLoading, setHistoryLoading] = useState(false)

  useEffect(() => {
    if (codes.length < 2) return
    if (!codes.includes(from)) setFrom(codes[0])
    if (!codes.includes(to) || to === from) {
      const alt = codes.find((c) => c !== (codes.includes(from) ? from : codes[0]))
      if (alt) setTo(alt)
    }
  }, [codes, from, to])

  const amount = useMemo(() => {
    const n = Number.parseFloat(amountStr.replace(/,/g, ""))
    return Number.isFinite(n) && n >= 0 ? n : NaN
  }, [amountStr])

  const converted = useMemo(
    () => convertAmount(amount, from, to, rates),
    [amount, from, to, rates]
  )
  const rate = useMemo(() => crossRate(from, to, rates), [from, to, rates])
  const chartEligible = canFetchFrankfurterHistory(from, to) && Boolean(rates[from] && rates[to])

  const fetchHistory = useCallback(async () => {
    if (!chartEligible) {
      setHistory({ available: false, reason: "pair_unsupported", points: [] })
      return
    }
    setHistoryLoading(true)
    try {
      const res = await fetch(
        `/api/exchange-history?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&period=${period}`
      )
      const data = (await res.json()) as HistoryPayload
      setHistory(data)
    } catch {
      setHistory({ available: false, reason: "provider_error", points: [] })
    } finally {
      setHistoryLoading(false)
    }
  }, [chartEligible, from, to, period])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  function swap() {
    setFrom(to)
    setTo(from)
  }

  const showChart = Boolean(history?.available && (history.points?.length || 0) > 0)

  return (
    <div
      className="mt-12 rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-8"
      data-testid="currency-converter"
    >
      <div className="mb-6 max-w-2xl">
        <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
          {t("converterTitle")}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t("converterSubtitle")}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div>
          <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
            <div>
              <label
                htmlFor={fromId}
                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {t("converterFrom")}
              </label>
              <select
                id={fromId}
                value={from}
                onChange={(e) => {
                  const next = e.target.value as CurrencyCode
                  setFrom(next)
                  if (next === to) {
                    const alt = codes.find((c) => c !== next)
                    if (alt) setTo(alt)
                  }
                }}
                className="w-full rounded-xl border border-border bg-secondary/40 px-3 py-3 text-sm font-semibold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
                data-testid="currency-from"
              >
                {codes.map((code) => (
                  <option key={code} value={code}>
                    {CURRENCY_META[code].flag} {code} — {CURRENCY_META[code].name}
                  </option>
                ))}
              </select>
              <label
                htmlFor={amountId}
                className="mb-2 mt-4 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {t("converterAmount")}
              </label>
              <input
                id={amountId}
                type="text"
                inputMode="decimal"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-3 py-3 font-mono text-lg font-semibold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={t("converterAmount")}
              />
            </div>

            <div className="flex justify-center pb-1">
              <button
                type="button"
                onClick={swap}
                data-testid="currency-swap"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label={t("converterSwap")}
              >
                <ArrowLeftRight className={`h-5 w-5 ${isRtl ? "scale-x-[-1]" : ""}`} aria-hidden="true" />
              </button>
            </div>

            <div>
              <label
                htmlFor={toId}
                className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground"
              >
                {t("converterTo")}
              </label>
              <select
                id={toId}
                value={to}
                onChange={(e) => {
                  const next = e.target.value as CurrencyCode
                  setTo(next)
                  if (next === from) {
                    const alt = codes.find((c) => c !== next)
                    if (alt) setFrom(alt)
                  }
                }}
                className="w-full rounded-xl border border-border bg-secondary/40 px-3 py-3 text-sm font-semibold text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
                data-testid="currency-to"
              >
                {codes.map((code) => (
                  <option key={code} value={code}>
                    {CURRENCY_META[code].flag} {code} — {CURRENCY_META[code].name}
                  </option>
                ))}
              </select>
              <div className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("converterConverted")}
              </div>
              <div
                className="flex min-h-[52px] items-center rounded-xl border border-border bg-secondary/40 px-3 py-3 font-mono text-2xl font-semibold text-primary sm:text-3xl"
                aria-live="polite"
                data-testid="currency-converted"
              >
                {loading || converted == null ? "—" : `${formatAmount(converted)} ${to}`}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <div className="rounded-xl border border-border bg-secondary/30 px-3 py-2">
              <span className="text-muted-foreground">{t("converterRate")}: </span>
              <span className="font-semibold text-foreground">
                {rate == null ? t("rateUnavailable") : `1 ${from} = ${formatRate(rate)} ${to}`}
              </span>
            </div>
            <div
              data-testid="currency-rate-source"
              data-source="reference"
              className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground ring-1 ring-border"
            >
              {t("dailyReferenceRate")}
            </div>
            <div className="text-xs text-muted-foreground">
              {lastUpdated ? `${t("lastUpdated")}: ${lastUpdated}` : t("loadingRates")}
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t("converterAppRateNote")}</p>
        </div>

        <div className="border-t border-border pt-6 lg:border-t-0 lg:border-s lg:ps-8 lg:pt-0">
          {chartEligible ? (
            <>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="font-display text-lg font-semibold text-foreground">
                    {t("converterChartTitle")}
                  </h4>
                  <p className="text-xs text-muted-foreground">{t("converterChartSource")}</p>
                </div>
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-label={t("converterPeriod")}
                  data-testid="currency-chart-periods"
                >
                  {HISTORY_PERIODS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPeriod(p)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                        period === p
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-white text-muted-foreground hover:text-foreground"
                      }`}
                      aria-pressed={period === p}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {historyLoading && (
                <p className="text-sm text-muted-foreground">{t("converterChartLoading")}</p>
              )}

              {!historyLoading && showChart && history && (
                <>
                  <div className="mb-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span>
                      {t("converterPeriodHigh")}:{" "}
                      <strong className="text-foreground">{formatRate(history.high ?? 0)}</strong>
                    </span>
                    <span>
                      {t("converterPeriodLow")}:{" "}
                      <strong className="text-foreground">{formatRate(history.low ?? 0)}</strong>
                    </span>
                  </div>
                  <div className="h-64 w-full" dir="ltr" data-testid="currency-chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={history.points} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E3EAF2" />
                        <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#607D9B" }} minTickGap={28} />
                        <YAxis
                          domain={["auto", "auto"]}
                          tick={{ fontSize: 11, fill: "#607D9B" }}
                          width={56}
                          tickFormatter={(v) => formatRate(Number(v))}
                        />
                        <Tooltip
                          formatter={(value: number) => [formatRate(value), t("converterRate")]}
                          labelFormatter={(label) => String(label)}
                        />
                        <Line
                          type="monotone"
                          dataKey="rate"
                          stroke="#007AFF"
                          strokeWidth={2}
                          dot={false}
                          isAnimationActive={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}

              {!historyLoading && !showChart && (
                <p className="text-sm text-muted-foreground" data-testid="currency-chart-unavailable">
                  {t("converterChartUnavailable")}
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">{t("converterChartUnavailable")}</p>
          )}
        </div>
      </div>
    </div>
  )
}

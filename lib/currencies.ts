import { SITE } from "@/lib/site"

export type CurrencyCode = (typeof SITE.currencies)[number]

export const CURRENCY_META: Record<CurrencyCode, { name: string; flag: string }> = {
  CNY: { name: "Chinese Yuan", flag: "🇨🇳" },
  JPY: { name: "Japanese Yen", flag: "🇯🇵" },
  XAF: { name: "Central African CFA", flag: "🇨🇲" },
  XOF: { name: "West African CFA", flag: "🇸🇳" },
  NGN: { name: "Nigerian Naira", flag: "🇳🇬" },
  GHS: { name: "Ghanaian Cedi", flag: "🇬🇭" },
  ZAR: { name: "South African Rand", flag: "🇿🇦" },
  KES: { name: "Kenyan Shilling", flag: "🇰🇪" },
  EGP: { name: "Egyptian Pound", flag: "🇪🇬" },
  TZS: { name: "Tanzanian Shilling", flag: "🇹🇿" },
  MAD: { name: "Moroccan Dirham", flag: "🇲🇦" },
  USD: { name: "US Dollar", flag: "🇺🇸" },
  EUR: { name: "Euro", flag: "🇪🇺" },
  GBP: { name: "British Pound", flag: "🇬🇧" },
}

export const CURRENCY_CODES = [...SITE.currencies] as CurrencyCode[]

/** Codes confirmed to return real Frankfurter v2 latest + daily history. */
export const FRANKFURTER_CODES = new Set<string>(SITE.currencies)

export const HISTORY_PERIODS = ["1W", "1M", "3M", "1Y"] as const
export type HistoryPeriod = (typeof HISTORY_PERIODS)[number]

const PERIOD_DAYS: Record<HistoryPeriod, number> = {
  "1W": 7,
  "1M": 31,
  "3M": 93,
  "1Y": 366,
}

export function historyDateRange(period: HistoryPeriod, now = new Date()) {
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - PERIOD_DAYS[period])
  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  }
}

export function canFetchFrankfurterHistory(from: string, to: string): boolean {
  return from !== to && FRANKFURTER_CODES.has(from) && FRANKFURTER_CODES.has(to)
}

/** rates[code] = units of code per 1 USD */
export function convertAmount(
  amount: number,
  from: string,
  to: string,
  rates: Record<string, number>
): number | null {
  const fromRate = rates[from]
  const toRate = rates[to]
  if (!Number.isFinite(amount) || amount < 0) return null
  if (!Number.isFinite(fromRate) || !Number.isFinite(toRate) || fromRate <= 0 || toRate <= 0) {
    return null
  }
  if (from === to) return amount
  return (amount / fromRate) * toRate
}

export function crossRate(from: string, to: string, rates: Record<string, number>): number | null {
  const fromRate = rates[from]
  const toRate = rates[to]
  if (!Number.isFinite(fromRate) || !Number.isFinite(toRate) || fromRate <= 0 || toRate <= 0) {
    return null
  }
  return toRate / fromRate
}

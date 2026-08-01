import { NextResponse } from "next/server"
import { CURRENCY_CODES } from "@/lib/currencies"

const FRANKFURTER_V2 = "https://api.frankfurter.dev/v2/rates"
const QUOTES = CURRENCY_CODES.filter((c) => c !== "USD").join(",")

type FrankfurterRow = {
  date?: string
  base?: string
  quote?: string
  rate?: number
}

/**
 * Daily reference rates from Frankfurter v2 only.
 * Never fabricates rates. Currencies missing from the response are omitted.
 */
export async function GET() {
  try {
    const url = `${FRANKFURTER_V2}?base=USD&quotes=${encodeURIComponent(QUOTES)}`
    const response = await fetch(url, { next: { revalidate: 3600 } })

    if (!response.ok) {
      return NextResponse.json(
        {
          rates: {},
          sources: {},
          lastUpdated: "",
          label: "Daily reference rate",
          provider: "frankfurter-v2",
          error: "provider_error",
        },
        { status: 502 }
      )
    }

    const data = (await response.json()) as FrankfurterRow[] | FrankfurterRow
    const rows = Array.isArray(data) ? data : [data]

    const rates: Record<string, number> = { USD: 1 }
    const sources: Record<string, "reference"> = { USD: "reference" }
    let newestDate = ""

    for (const row of rows) {
      const quote = row.quote?.toUpperCase()
      const rate = row.rate
      if (!quote || quote === "USD") continue
      if (!CURRENCY_CODES.includes(quote as (typeof CURRENCY_CODES)[number])) continue
      if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) continue
      rates[quote] = rate
      sources[quote] = "reference"
      if (row.date && row.date > newestDate) newestDate = row.date
    }

    // Only expose codes that actually returned real data (USD always present as base).
    const functional = CURRENCY_CODES.filter((code) => typeof rates[code] === "number" && rates[code] > 0)

    return NextResponse.json({
      rates,
      sources,
      currencies: functional,
      lastUpdated: newestDate || new Date().toISOString().slice(0, 10),
      label: "Daily reference rate",
      provider: "frankfurter-v2",
      updateFrequency: "daily",
      informationalOnly: true,
    })
  } catch (error) {
    console.error("Error fetching exchange rates:", error)
    return NextResponse.json(
      {
        rates: {},
        sources: {},
        currencies: [],
        lastUpdated: "",
        label: "Daily reference rate",
        provider: "frankfurter-v2",
        error: "provider_error",
      },
      { status: 502 }
    )
  }
}

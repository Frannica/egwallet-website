import { NextResponse } from "next/server"

// Frankfurter covers major market currencies. XAF/XOF/NGN/GHS are always indicative
// on the marketing site — never presented as live market rates.
const EXCHANGE_API_URL = "https://api.frankfurter.app/latest?from=USD"

const INDICATIVE_FALLBACKS: Record<string, number> = {
  XAF: 620,
  XOF: 620,
  NGN: 1550,
  GHS: 15.5,
}

const ALWAYS_INDICATIVE = new Set(["XAF", "XOF", "NGN", "GHS"])

export async function GET() {
  try {
    const response = await fetch(EXCHANGE_API_URL, {
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates")
    }

    const data = await response.json()
    const rates: Record<string, number> = {
      USD: 1,
      EUR: data.rates?.EUR ?? 0.92,
      ZAR: data.rates?.ZAR ?? 18.5,
      CNY: data.rates?.CNY ?? 7.24,
      XAF: INDICATIVE_FALLBACKS.XAF,
      XOF: INDICATIVE_FALLBACKS.XOF,
      NGN: INDICATIVE_FALLBACKS.NGN,
      GHS: INDICATIVE_FALLBACKS.GHS,
    }

    const sources: Record<string, "live" | "indicative"> = {
      USD: "live",
      EUR: data.rates?.EUR != null ? "live" : "indicative",
      ZAR: data.rates?.ZAR != null ? "live" : "indicative",
      CNY: data.rates?.CNY != null ? "live" : "indicative",
      XAF: "indicative",
      XOF: "indicative",
      NGN: "indicative",
      GHS: "indicative",
    }

    // Belt-and-suspenders: never allow African fallbacks to be marked live.
    for (const code of ALWAYS_INDICATIVE) {
      sources[code] = "indicative"
      rates[code] = INDICATIVE_FALLBACKS[code]
    }

    return NextResponse.json({
      rates,
      sources,
      lastUpdated: data.date || new Date().toISOString().split("T")[0],
    })
  } catch (error) {
    console.error("Error fetching exchange rates:", error)
    return NextResponse.json({
      rates: {
        USD: 1,
        EUR: 0.92,
        XAF: INDICATIVE_FALLBACKS.XAF,
        XOF: INDICATIVE_FALLBACKS.XOF,
        NGN: INDICATIVE_FALLBACKS.NGN,
        GHS: INDICATIVE_FALLBACKS.GHS,
        ZAR: 18.5,
        CNY: 7.24,
      },
      sources: {
        USD: "indicative",
        EUR: "indicative",
        XAF: "indicative",
        XOF: "indicative",
        NGN: "indicative",
        GHS: "indicative",
        ZAR: "indicative",
        CNY: "indicative",
      },
      lastUpdated: new Date().toISOString().split("T")[0],
      error: "Using fallback rates",
    })
  }
}

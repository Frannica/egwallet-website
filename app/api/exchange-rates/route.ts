import { NextResponse } from "next/server"

// Using exchangerate-api.com free tier (1,500 requests/month)
// Alternative: frankfurter.app (free, no API key needed)
const EXCHANGE_API_URL = "https://api.frankfurter.app/latest?from=USD"

export async function GET() {
  try {
    const response = await fetch(EXCHANGE_API_URL, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates")
    }

    const data = await response.json()

    // Transform to our format
    const rates = {
      USD: 1,
      EUR: data.rates.EUR || 0.92,
      XAF: data.rates.XAF || 620.0,
      XOF: data.rates.XOF || 620.0,
      NGN: data.rates.NGN || 1550.0,
      GHS: data.rates.GHS || 15.5,
      ZAR: data.rates.ZAR || 18.5,
      CNY: data.rates.CNY || 7.24,
    }

    return NextResponse.json({
      rates,
      lastUpdated: data.date || new Date().toISOString().split("T")[0],
    })
  } catch (error) {
    console.error("[v0] Error fetching exchange rates:", error)
    // Return fallback rates if API fails
    return NextResponse.json({
      rates: {
        USD: 1,
        EUR: 0.92,
        XAF: 620.0,
        XOF: 620.0,
        NGN: 1550.0,
        GHS: 15.5,
        ZAR: 18.5,
        CNY: 7.24,
      },
      lastUpdated: new Date().toISOString().split("T")[0],
      error: "Using fallback rates",
    })
  }
}

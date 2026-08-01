import { NextRequest, NextResponse } from "next/server"
import {
  HISTORY_PERIODS,
  HistoryPeriod,
  canFetchFrankfurterHistory,
  historyDateRange,
} from "@/lib/currencies"

const FRANKFURTER_V2 = "https://api.frankfurter.dev/v2/rates"

type FrankfurterRow = {
  date?: string
  base?: string
  quote?: string
  rate?: number
}

/**
 * Daily reference historical FX from Frankfurter v2 only.
 * Never fabricates series. Unsupported or empty responses return available:false.
 */
export async function GET(request: NextRequest) {
  const from = (request.nextUrl.searchParams.get("from") || "").toUpperCase()
  const to = (request.nextUrl.searchParams.get("to") || "").toUpperCase()
  const periodParam = (request.nextUrl.searchParams.get("period") || "1M").toUpperCase()
  const period = (HISTORY_PERIODS as readonly string[]).includes(periodParam)
    ? (periodParam as HistoryPeriod)
    : null

  if (!from || !to || !period) {
    return NextResponse.json(
      { available: false, reason: "invalid_request", points: [] },
      { status: 400 }
    )
  }

  if (from === to) {
    return NextResponse.json({
      available: false,
      reason: "same_currency",
      from,
      to,
      period,
      points: [],
    })
  }

  if (!canFetchFrankfurterHistory(from, to)) {
    return NextResponse.json({
      available: false,
      reason: "pair_unsupported",
      from,
      to,
      period,
      points: [],
      note: "Currency not on the verified Frankfurter v2 whitelist.",
    })
  }

  const { start, end } = historyDateRange(period)
  const url =
    `${FRANKFURTER_V2}?base=${encodeURIComponent(from)}` +
    `&quotes=${encodeURIComponent(to)}` +
    `&from=${encodeURIComponent(start)}` +
    `&to=${encodeURIComponent(end)}`

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } })
    if (!response.ok) {
      return NextResponse.json({
        available: false,
        reason: response.status === 404 ? "pair_unsupported" : "provider_error",
        from,
        to,
        period,
        points: [],
        httpStatus: response.status,
      })
    }

    const data = (await response.json()) as FrankfurterRow[] | FrankfurterRow
    const rows = Array.isArray(data) ? data : [data]

    const byDate = new Map<string, number>()
    for (const row of rows) {
      const date = row.date
      const quote = row.quote?.toUpperCase()
      const rate = row.rate
      if (!date || quote !== to) continue
      if (typeof rate !== "number" || !Number.isFinite(rate) || rate <= 0) continue
      byDate.set(date, rate)
    }

    const points = [...byDate.entries()]
      .map(([date, rate]) => ({ date, rate }))
      .sort((a, b) => a.date.localeCompare(b.date))

    if (points.length === 0) {
      return NextResponse.json({
        available: false,
        reason: "pair_unsupported",
        from,
        to,
        period,
        points: [],
      })
    }

    let high = points[0].rate
    let low = points[0].rate
    for (const p of points) {
      if (p.rate > high) high = p.rate
      if (p.rate < low) low = p.rate
    }

    return NextResponse.json({
      available: true,
      from,
      to,
      period,
      startDate: points[0].date,
      endDate: points[points.length - 1].date,
      points,
      high,
      low,
      source: "frankfurter-v2",
      provider: "Frankfurter v2 (daily reference)",
      label: "Daily reference rate",
      updateFrequency: "daily",
      informationalOnly: true,
    })
  } catch (error) {
    console.error("exchange-history error:", error)
    return NextResponse.json({
      available: false,
      reason: "provider_error",
      from,
      to,
      period,
      points: [],
    })
  }
}

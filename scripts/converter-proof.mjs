/**
 * Currency-converter proof (Frankfurter v2 daily reference, website only).
 * Usage: node scripts/converter-proof.mjs [baseUrl]
 */
import { chromium } from "playwright"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const baseUrl = process.argv[2] || "http://localhost:3005"
const outDir = path.join(root, "proof-output")
fs.mkdirSync(outDir, { recursive: true })

const CODES = [
  "CNY",
  "JPY",
  "XAF",
  "XOF",
  "NGN",
  "GHS",
  "ZAR",
  "KES",
  "EGP",
  "TZS",
  "MAD",
  "USD",
  "EUR",
  "GBP",
]
const PERIODS = ["1W", "1M", "3M", "1Y"]
const SAMPLE_PAIRS = [
  ["USD", "EUR"],
  ["USD", "XAF"],
  ["EUR", "XOF"],
  ["NGN", "GHS"],
  ["KES", "EGP"],
  ["JPY", "CNY"],
  ["GBP", "ZAR"],
  ["MAD", "TZS"],
  ["XAF", "NGN"],
]

const rows = []
let failures = 0

function add(row) {
  rows.push(row)
  if (row.result === "FAIL") failures++
}

async function main() {
  const ratesRes = await fetch(`${baseUrl}/api/exchange-rates`)
  const ratesData = await ratesRes.json()

  add({
    element: "Rates API OK",
    location: "/api/exchange-rates",
    destination: `status=${ratesRes.status} provider=${ratesData.provider || "n/a"}`,
    result: ratesRes.ok && ratesData.provider === "frankfurter-v2" ? "PASS" : "FAIL",
  })

  for (const code of CODES) {
    const rate = ratesData.rates?.[code]
    const src = ratesData.sources?.[code]
    add({
      element: `Real rate ${code}`,
      location: "/api/exchange-rates",
      destination: `rate=${rate} source=${src}`,
      result:
        typeof rate === "number" && rate > 0 && src === "reference" ? "PASS" : "FAIL",
    })
  }

  add({
    element: "No fabricated African fallbacks",
    location: "/api/exchange-rates",
    destination: `XAF=${ratesData.rates?.XAF}`,
    result:
      typeof ratesData.rates?.XAF === "number" &&
      ratesData.rates.XAF !== 620 &&
      ratesData.sources?.XAF === "reference"
        ? "PASS"
        : "FAIL",
  })

  for (const [from, to] of SAMPLE_PAIRS) {
    const res = await fetch(
      `${baseUrl}/api/exchange-history?from=${from}&to=${to}&period=1M`
    )
    const data = await res.json()
    add({
      element: `History ${from}->${to}`,
      location: "/api/exchange-history",
      destination: `available=${data.available} points=${data.points?.length || 0} label=${data.label || "n/a"}`,
      result:
        data.available === true &&
        Array.isArray(data.points) &&
        data.points.length > 0 &&
        !data.points.some((p) => !(p.rate > 0))
          ? "PASS"
          : "FAIL",
    })
  }

  // Each code as From and To at least once
  for (const code of CODES) {
    const other = code === "USD" ? "EUR" : "USD"
    const asFrom = await (await fetch(
      `${baseUrl}/api/exchange-history?from=${code}&to=${other}&period=1W`
    )).json()
    const asTo = await (await fetch(
      `${baseUrl}/api/exchange-history?from=${other}&to=${code}&period=1W`
    )).json()
    add({
      element: `History From/To ${code}`,
      location: "/api/exchange-history",
      destination: `fromPts=${asFrom.points?.length || 0} toPts=${asTo.points?.length || 0}`,
      result:
        asFrom.available && asFrom.points?.length && asTo.available && asTo.points?.length
          ? "PASS"
          : "FAIL",
    })
  }

  for (const period of PERIODS) {
    const res = await fetch(
      `${baseUrl}/api/exchange-history?from=USD&to=EUR&period=${period}`
    )
    const data = await res.json()
    add({
      element: `History period ${period} USD->EUR`,
      location: "/api/exchange-history",
      destination: `available=${data.available} points=${data.points?.length || 0}`,
      result: data.available && data.points?.length ? "PASS" : "FAIL",
    })
  }

  const badPeriod = await (
    await fetch(`${baseUrl}/api/exchange-history?from=USD&to=EUR&period=1D`)
  ).json()
  add({
    element: "Intraday period 1D rejected",
    location: "/api/exchange-history",
    destination: `available=${badPeriod.available} reason=${badPeriod.reason}`,
    result: badPeriod.available === false ? "PASS" : "FAIL",
  })

  const browser = await chromium.launch()
  for (const [label, viewport] of [
    ["desktop", { width: 1440, height: 900 }],
    ["mobile", { width: 390, height: 844 }],
  ]) {
    const context = await browser.newContext({ viewport })
    const page = await context.newPage()
    const consoleErrors = []
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text())
    })
    await page.goto(baseUrl, { waitUntil: "networkidle" })
    const converter = page.getByTestId("currency-converter")
    await converter.scrollIntoViewIfNeeded()
    await converter.waitFor({ state: "visible", timeout: 15000 })

    add({
      element: `Converter mounted (${label})`,
      location: "#currencies",
      destination: "data-testid=currency-converter",
      result: "PASS",
    })

    const fromSelect = page.getByTestId("currency-from")
    const toSelect = page.getByTestId("currency-to")
    const optionCount = await fromSelect.locator("option").count()
    add({
      element: `Selector option count (${label})`,
      location: "converter",
      destination: `options=${optionCount}`,
      result: optionCount === CODES.length ? "PASS" : "FAIL",
    })

    for (const code of CODES) {
      const has = (await fromSelect.locator(`option[value="${code}"]`).count()) > 0
      add({
        element: `Selector has ${code} (${label})`,
        location: "converter",
        destination: has ? "present" : "missing",
        result: has ? "PASS" : "FAIL",
      })
    }

    await page.waitForFunction(() => {
      const el = document.querySelector('[data-testid="currency-converter"]')
      return el && /1\s+[A-Z]{3}\s*=/.test(el.textContent || "")
    }, null, { timeout: 15000 })

    for (const [from, to] of SAMPLE_PAIRS) {
      await fromSelect.selectOption(from)
      await toSelect.selectOption(to)
      await page.waitForTimeout(350)
      const badge = converter.getByTestId("currency-rate-source")
      const sourceAttr = await badge.getAttribute("data-source")
      const badgeText = (await badge.innerText()).toLowerCase()
      add({
        element: `UI pair ${from}->${to} (${label})`,
        location: "converter",
        destination: `data-source=${sourceAttr} text=${badgeText.slice(0, 40)}`,
        result:
          sourceAttr === "reference" &&
          /daily reference|referencia diaria|référence quotidien|referência diária|مرجعي يومي|每日参考|日次参考/i.test(
            badgeText
          )
            ? "PASS"
            : "FAIL",
      })
    }

    await fromSelect.selectOption("USD")
    await toSelect.selectOption("EUR")
    await page.waitForTimeout(500)
    const periods = converter.getByTestId("currency-chart-periods")
    const periodButtons = periods.locator("button")
    const periodCount = await periodButtons.count()
    const periodLabels = []
    for (let i = 0; i < periodCount; i++) {
      periodLabels.push((await periodButtons.nth(i).innerText()).trim())
    }
    add({
      element: `Chart periods only daily (${label})`,
      location: "converter",
      destination: periodLabels.join(","),
      result:
        periodCount === 4 &&
        PERIODS.every((p) => periodLabels.includes(p)) &&
        !periodLabels.includes("1D") &&
        !periodLabels.includes("5Y")
          ? "PASS"
          : "FAIL",
    })

    const bodyText = await converter.innerText()
    const badgeText = (
      await converter.getByTestId("currency-rate-source").innerText()
    ).toLowerCase()
    const badClaim =
      badgeText.includes("market") ||
      /\bupdated every (minute|hour)\b/i.test(bodyText) ||
      /\bminute-level\b/i.test(bodyText) ||
      /\breal-?time (rate|rates|data|feed)\b/i.test(bodyText)
    add({
      element: `Badge is Daily reference (${label})`,
      location: "converter",
      destination: `badge=${badgeText}`,
      result: !badClaim && badgeText.includes("daily reference") ? "PASS" : "FAIL",
    })

    await page.getByTestId("currency-swap").click()
    await page.waitForTimeout(200)
    const fromVal = await fromSelect.inputValue()
    const toVal = await toSelect.inputValue()
    add({
      element: `Swap control (${label})`,
      location: "converter",
      destination: `${fromVal}->${toVal}`,
      result: fromVal === "EUR" && toVal === "USD" ? "PASS" : "FAIL",
    })

    await converter.screenshot({ path: path.join(outDir, `${label}-currency-converter.png`) })

    add({
      element: `Console errors (${label})`,
      location: "browser",
      destination: consoleErrors.length ? consoleErrors.slice(0, 5).join(" | ") : "none",
      result: consoleErrors.length ? "FAIL" : "PASS",
    })

    if (label === "desktop") {
      const langBtn = page.getByRole("button", { name: /English|🇺🇸/i }).first()
      if (await langBtn.count()) {
        await langBtn.click()
        const arItem = page.getByRole("menuitem", { name: /العربية/ })
        if (await arItem.count()) {
          await arItem.click()
          await page.waitForFunction(
            () => document.documentElement.lang === "ar" && document.documentElement.dir === "rtl",
            null,
            { timeout: 10000 }
          )
          await converter.scrollIntoViewIfNeeded()
          await converter.screenshot({
            path: path.join(outDir, "desktop-currency-converter-ar.png"),
          })
          add({
            element: "Arabic RTL converter",
            location: "converter",
            destination: "lang=ar dir=rtl",
            result: "PASS",
          })
        }
      }
    }

    await context.close()
  }
  await browser.close()

  const md = [
    "# Currency converter proof",
    "",
    `Base URL: ${baseUrl}`,
    `Generated: ${new Date().toISOString()}`,
    `Total checks: ${rows.length}`,
    `Failures: ${failures}`,
    "",
    "| Check | Location | Detail | Pass/fail |",
    "|---|---|---|---|",
    ...rows.map((r) => `| ${r.element} | ${r.location} | ${r.destination} | ${r.result} |`),
    "",
    "## Source proof",
    "- Current rates: `/api/exchange-rates` → Frankfurter v2 daily reference only (no paid APIs, no fabricated fallbacks).",
    "- Historical chart: `/api/exchange-history` → Frankfurter v2 daily series for periods 1W, 1M, 3M, 1Y only.",
    "- Labels: **Daily reference rate** — never Market / real-time / minute / hourly.",
    "- Selectors only include currencies that returned real rates.",
    "",
  ].join("\n")
  fs.writeFileSync(path.join(outDir, "CONVERTER_PROOF.md"), md, "utf8")
  console.log(md)
  console.log(`CONVERTER_PROOF_EXIT:${failures === 0 ? 0 : 1}`)
  process.exit(failures === 0 ? 0 : 1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

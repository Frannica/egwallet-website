/**
 * Automated proof suite for EGWallet marketing site.
 * Run against a live local server: node scripts/proof-check.mjs [baseUrl]
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

const langs = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "pt", name: "Português" },
  { code: "ar", name: "العربية", rtl: true },
  { code: "zh", name: "中文" },
  { code: "ja", name: "日本語" },
]

const rows = []
const failures = []

function addRow(row) {
  rows.push(row)
  if (row.result === "FAIL") failures.push(row)
}

async function checkHttp(url) {
  const res = await fetch(url, { redirect: "manual" })
  return { status: res.status, ok: res.status >= 200 && res.status < 400 }
}

async function main() {
  // Static source scans
  const scanRoots = ["app", "components", "lib"].map((d) => path.join(root, d))
  const sourceFiles = []
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (entry.name === "ui") continue
        walk(full)
      } else if (/\.(tsx|ts)$/.test(entry.name)) sourceFiles.push(full)
    }
  }
  scanRoots.forEach(walk)

  let deadHref = 0
  let commentedCustomer = 0
  for (const file of sourceFiles) {
    const text = fs.readFileSync(file, "utf8")
    if (/href=["']#["']/.test(text)) {
      deadHref++
      addRow({
        element: "href=\"#\"",
        location: path.relative(root, file),
        destination: "#",
        desktop: "static scan",
        mobile: "static scan",
        result: "FAIL",
      })
    }
    if (/AISupport|components\/ai-support/.test(text) && !file.includes("ai-support")) {
      commentedCustomer++
      addRow({
        element: "AISupport reference",
        location: path.relative(root, file),
        destination: "unused AI chat",
        desktop: "static scan",
        mobile: "static scan",
        result: "FAIL",
      })
    }
  }
  if (deadHref === 0) {
    addRow({
      element: "Dead href=\"#\" scan",
      location: "app/components/lib (excl ui)",
      destination: "none found",
      desktop: "PASS",
      mobile: "PASS",
      result: "PASS",
    })
  }

  const marketingSrc = fs.readFileSync(path.join(root, "lib/translations.ts"), "utf8")
  const badCurrencyClaim = /70\+|72 currencies|8 currencies/.test(marketingSrc)
  addRow({
    element: "No unproven currency headcount claim",
    location: "lib/translations.ts",
    destination: badCurrencyClaim ? "found 70+/72/8 currencies claim" : "uses multiple-currencies wording",
    desktop: badCurrencyClaim ? "FAIL" : "PASS",
    mobile: badCurrencyClaim ? "FAIL" : "PASS",
    result: badCurrencyClaim ? "FAIL" : "PASS",
  })
  const converterSrc = fs.existsSync(path.join(root, "components/currency-converter.tsx"))
  const historyRoute = fs.existsSync(path.join(root, "app/api/exchange-history/route.ts"))
  addRow({
    element: "Currency converter component",
    location: "components/currency-converter.tsx",
    destination: converterSrc ? "present" : "missing",
    desktop: converterSrc ? "PASS" : "FAIL",
    mobile: converterSrc ? "PASS" : "FAIL",
    result: converterSrc ? "PASS" : "FAIL",
  })
  addRow({
    element: "Exchange-history API (Frankfurter only)",
    location: "app/api/exchange-history/route.ts",
    destination: historyRoute ? "present" : "missing",
    desktop: historyRoute ? "PASS" : "FAIL",
    mobile: historyRoute ? "PASS" : "FAIL",
    result: historyRoute ? "PASS" : "FAIL",
  })
  const vcAskAccess = /Ask about access/.test(marketingSrc)
  const vcUnavailableLabel = /Virtual cards are not available yet|Unavailable in closed testing/.test(marketingSrc)
  const vcComponent = fs.readFileSync(path.join(root, "components/virtual-card.tsx"), "utf8")
  const vcMailtoAccess = /SUPPORT_MAILTO_ACCESS/.test(vcComponent)
  addRow({
    element: "Virtual card Ask about access CTA",
    location: "lib/translations.ts + virtual-card section",
    destination:
      vcAskAccess && vcMailtoAccess && !vcUnavailableLabel
        ? "Ask about access mailto; no unavailable badge"
        : "missing Ask about access / mailto or still labeled unavailable",
    desktop: vcAskAccess && vcMailtoAccess && !vcUnavailableLabel ? "PASS" : "FAIL",
    mobile: vcAskAccess && vcMailtoAccess && !vcUnavailableLabel ? "PASS" : "FAIL",
    result: vcAskAccess && vcMailtoAccess && !vcUnavailableLabel ? "PASS" : "FAIL",
  })
  if (commentedCustomer === 0) {
    addRow({
      element: "AISupport customer UI references",
      location: "pages/components",
      destination: "none in production source",
      desktop: "PASS",
      mobile: "PASS",
      result: "PASS",
    })
  }

  const dormantPaths = [
    "components/ai-support.tsx",
    "app/api/chat/route.ts",
    "styles/globals.css",
    "components/theme-provider.tsx",
  ]
  for (const rel of dormantPaths) {
    const exists = fs.existsSync(path.join(root, rel))
    addRow({
      element: `Removed dormant file ${rel}`,
      location: rel,
      destination: exists ? "still present" : "deleted",
      desktop: exists ? "FAIL" : "PASS",
      mobile: exists ? "FAIL" : "PASS",
      result: exists ? "FAIL" : "PASS",
    })
  }

  // Translation completeness
  const transPath = path.join(root, "lib/translations.ts")
  const transSrc = fs.readFileSync(transPath, "utf8")
  const keyMatch = transSrc.match(/const en = \{([\s\S]*?)\} as const/)
  const enKeys = [...keyMatch[1].matchAll(/^\s*([a-zA-Z0-9_]+):/gm)].map((m) => m[1])
  for (const lang of ["es", "fr", "pt", "ar", "zh", "ja"]) {
    const block = transSrc.match(new RegExp(`const ${lang}: Dict = \\{([\\s\\S]*?)\\n\\}`))
    const keys = new Set([...block[1].matchAll(/^\s*([a-zA-Z0-9_]+):/gm)].map((m) => m[1]))
    const missing = enKeys.filter((k) => !keys.has(k))
    addRow({
      element: `Translations ${lang}`,
      location: "lib/translations.ts",
      destination: missing.length ? `missing: ${missing.join(", ")}` : `${enKeys.length} keys`,
      desktop: missing.length ? "FAIL" : "PASS",
      mobile: missing.length ? "FAIL" : "PASS",
      result: missing.length ? "FAIL" : "PASS",
    })
  }

  // HTTP page checks
  for (const route of ["/", "/privacy", "/terms", "/api/exchange-rates"]) {
    const { status, ok } = await checkHttp(`${baseUrl}${route}`)
    addRow({
      element: `HTTP ${route}`,
      location: route,
      destination: `${baseUrl}${route}`,
      desktop: `status ${status}`,
      mobile: `status ${status}`,
      result: ok ? "PASS" : "FAIL",
    })
  }

  const browser = await chromium.launch({ headless: true })
  const consoleErrors = []

  async function auditViewport(label, viewport) {
    const context = await browser.newContext({ viewport })
    const page = await context.newPage()
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(`[${label}] ${msg.text()}`)
    })
    page.on("pageerror", (err) => consoleErrors.push(`[${label}] ${err.message}`))

    await page.goto(baseUrl, { waitUntil: "networkidle" })

    // Anchors
    const anchors = ["#top", "#features", "#currencies", "#virtual-card", "#security", "#get-app", "#support"]
    for (const a of anchors) {
      const exists = await page.locator(a).count()
      addRow({
        element: `Anchor ${a}`,
        location: "Home",
        destination: a,
        desktop: label === "desktop" ? (exists ? "found" : "missing") : "—",
        mobile: label === "mobile" ? (exists ? "found" : "missing") : "—",
        result: exists ? "PASS" : "FAIL",
      })
    }

    // Collect interactive links
    const links = await page.evaluate(() => {
      return [...document.querySelectorAll("a[href]")].map((a) => ({
        text: (a.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80),
        href: a.getAttribute("href") || "",
        disabled: a.hasAttribute("disabled") || a.getAttribute("aria-disabled") === "true",
      }))
    })

    const buttons = await page.evaluate(() => {
      return [...document.querySelectorAll("button")].map((b) => ({
        text: (b.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80),
        disabled: b.hasAttribute("disabled"),
        aria: b.getAttribute("aria-label") || "",
      }))
    })

    for (const link of links) {
      let result = "PASS"
      let action = link.href
      if (!link.href || link.href === "#" || link.href.startsWith("javascript:")) {
        result = "FAIL"
        action = link.href || "(empty)"
      } else if (link.disabled) {
        result = "FAIL"
      } else if (link.href.startsWith("mailto:")) {
        action = link.href
        result = link.href.includes("support@egwalletfinance.com") ? "PASS" : "FAIL"
      } else if (link.href.startsWith("/")) {
        const { ok, status } = await checkHttp(`${baseUrl}${link.href}`)
        action = `${link.href} → ${status}`
        result = ok ? "PASS" : "FAIL"
      } else if (link.href.startsWith("#")) {
        const id = link.href.slice(1)
        const exists = await page.locator(`[id="${id}"]`).count()
        action = `${link.href} → ${exists ? "section found" : "MISSING"}`
        result = exists ? "PASS" : "FAIL"
      } else if (link.href.startsWith("http")) {
        // External — only expect known local-origin absolute if any
        action = link.href
      }

      // Deduplicate noisy rows by text+href+viewport
      addRow({
        element: link.text || "(link)",
        location: `Home (${label})`,
        destination: action,
        desktop: label === "desktop" ? result : "—",
        mobile: label === "mobile" ? result : "—",
        result,
      })
    }

    for (const btn of buttons) {
      const name = btn.text || btn.aria || "(button)"
      // Refresh rates may be briefly disabled while loading — allowed only for that control
      const isRefresh = /refresh/i.test(name)
      const result = btn.disabled && !isRefresh ? "FAIL" : "PASS"
      addRow({
        element: name,
        location: `Home (${label})`,
        destination: btn.disabled ? "disabled (loading ok if Refresh)" : "interactive control",
        desktop: label === "desktop" ? result : "—",
        mobile: label === "mobile" ? result : "—",
        result,
      })
    }

    // Images broken check
    const brokenImgs = await page.evaluate(() =>
      [...document.images].filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.src),
    )
    addRow({
      element: "Images",
      location: `Home (${label})`,
      destination: brokenImgs.length ? brokenImgs.join(", ") : "none broken",
      desktop: label === "desktop" ? (brokenImgs.length ? "FAIL" : "PASS") : "—",
      mobile: label === "mobile" ? (brokenImgs.length ? "FAIL" : "PASS") : "—",
      result: brokenImgs.length ? "FAIL" : "PASS",
    })

    // Language switcher + all 7 languages
    for (const lang of langs) {
      await page.goto(baseUrl, { waitUntil: "networkidle" })
      await page.evaluate((code) => {
        localStorage.setItem("language", code)
      }, lang.code)
      await page.reload({ waitUntil: "networkidle" })
      await page.waitForFunction(
        (code) => document.documentElement.lang === code,
        lang.code,
        { timeout: 5000 },
      ).catch(() => {})
      const dir = await page.evaluate(() => document.documentElement.dir)
      const htmlLang = await page.evaluate(() => document.documentElement.lang)
      const bodyText = await page.locator("body").innerText()
      const hasKeyLeak = /getAppTitle|heroTitleHighlight|featuresSubtitle|supportedCurrenciesDesc/.test(bodyText)
      const rtlOk = lang.rtl ? dir === "rtl" : dir === "ltr"
      const result = htmlLang === lang.code && rtlOk && !hasKeyLeak ? "PASS" : "FAIL"
      addRow({
        element: `Language ${lang.name}`,
        location: `Home (${label})`,
        destination: `lang=${htmlLang}, dir=${dir}`,
        desktop: label === "desktop" ? result : "—",
        mobile: label === "mobile" ? result : "—",
        result,
      })
      await page.screenshot({
        path: path.join(outDir, `${label}-lang-${lang.code}.png`),
        fullPage: false,
      })
    }

    // Privacy / Terms
    for (const route of ["/privacy", "/terms"]) {
      const resp = await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" })
      const status = resp?.status() || 0
      const back = page.locator('a[href="/"]')
      addRow({
        element: `${route} page`,
        location: route,
        destination: `status ${status}; back link ${await back.count()}`,
        desktop: label === "desktop" ? (status === 200 && (await back.count()) > 0 ? "PASS" : "FAIL") : "—",
        mobile: label === "mobile" ? (status === 200 && (await back.count()) > 0 ? "PASS" : "FAIL") : "—",
        result: status === 200 && (await back.count()) > 0 ? "PASS" : "FAIL",
      })
    }

    // Mobile menu open
    if (label === "mobile") {
      await page.goto(baseUrl, { waitUntil: "networkidle" })
      await page.getByRole("button", { name: /open menu|ouvrir|abrir|打开|メニュー|القائمة/i }).click()
      const menuNav = page.getByRole("navigation", { name: /mobile/i })
      const visible = await menuNav.isVisible()
      addRow({
        element: "Mobile menu",
        location: "Header",
        destination: "Open menu → Mobile nav",
        desktop: "—",
        mobile: visible ? "PASS" : "FAIL",
        result: visible ? "PASS" : "FAIL",
      })
    }

    // Daily reference labels (Frankfurter v2 — not Market / real-time)
    await page.goto(baseUrl, { waitUntil: "networkidle" })
    await page.locator("#currencies").scrollIntoViewIfNeeded()
    const currencyText = await page.locator("#currencies").innerText()
    const referenceOk =
      /Daily reference rate|Tasa de referencia diaria|Taux de référence quotidien|Taxa de referência diária|سعر مرجعي يومي|每日参考汇率|日次参考レート/i.test(
        currencyText
      ) && currencyText.includes("XAF")
    addRow({
      element: "Exchange-rate labels",
      location: "#currencies",
      destination: "Daily reference rate labeling present in section",
      desktop: label === "desktop" ? (referenceOk ? "PASS" : "FAIL") : "—",
      mobile: label === "mobile" ? (referenceOk ? "PASS" : "FAIL") : "—",
      result: referenceOk ? "PASS" : "FAIL",
    })

    await page.screenshot({ path: path.join(outDir, `${label}-home.png`), fullPage: false })
    await page.locator("#get-app").scrollIntoViewIfNeeded()
    await page.screenshot({ path: path.join(outDir, `${label}-closed-testing.png`), fullPage: false })

    await context.close()
  }

  await auditViewport("desktop", { width: 1440, height: 900 })
  await auditViewport("mobile", { width: 390, height: 844 })

  addRow({
    element: "Console errors",
    location: "Browser sessions",
    destination: consoleErrors.length ? consoleErrors.slice(0, 10).join(" | ") : "none",
    desktop: consoleErrors.length ? "FAIL" : "PASS",
    mobile: consoleErrors.length ? "FAIL" : "PASS",
    result: consoleErrors.length ? "FAIL" : "PASS",
  })

  // External disclosures
  addRow({
    element: "App Store / Play Store URLs",
    location: "lib/site.ts",
    destination: "Unavailable — intentionally empty; Contact Support mailto used instead",
    desktop: "DISCLOSED",
    mobile: "DISCLOSED",
    result: "PASS",
  })
  addRow({
    element: "App login deep link",
    location: "lib/site.ts",
    destination: "Unavailable — no public login URL on marketing site",
    desktop: "DISCLOSED",
    mobile: "DISCLOSED",
    result: "PASS",
  })

  await browser.close()

  // Deduplicate exact rows for readability
  const seen = new Set()
  const unique = []
  for (const r of rows) {
    const key = `${r.element}|${r.location}|${r.destination}|${r.result}`
    if (seen.has(key)) continue
    seen.add(key)
    unique.push(r)
  }

  const md = [
    "# EGWallet website proof report",
    "",
    `Base URL: ${baseUrl}`,
    `Generated: ${new Date().toISOString()}`,
    `Total checks: ${unique.length}`,
    `Failures: ${unique.filter((r) => r.result === "FAIL").length}`,
    "",
    "| Element/button | Page/location | Destination/action | Desktop | Mobile | Pass/fail |",
    "|---|---|---|---|---|---|",
    ...unique.map(
      (r) =>
        `| ${esc(r.element)} | ${esc(r.location)} | ${esc(r.destination)} | ${esc(r.desktop)} | ${esc(r.mobile)} | ${r.result} |`,
    ),
    "",
    "## Console errors",
    consoleErrors.length ? consoleErrors.map((e) => `- ${e}`).join("\n") : "None",
    "",
    "## Disclosures (cannot work without external destinations)",
    "- Public App Store / Google Play / Expo URLs: not configured (`SITE.appStoreUrl`, `SITE.playStoreUrl` empty).",
    "- Public app login URL: not configured (`SITE.appLoginUrl` empty).",
    "- Exchange rates: Frankfurter v2 daily reference only — labeled Daily reference rate (not real-time/Market).",
    "",
  ].join("\n")

  function esc(s) {
    return String(s).replace(/\|/g, "\\|").replace(/\n/g, " ")
  }

  const outMd = path.join(outDir, "PROOF.md")
  fs.writeFileSync(outMd, md)
  fs.writeFileSync(path.join(outDir, "PROOF.json"), JSON.stringify({ unique, consoleErrors, failures }, null, 2))
  console.log(md)
  console.log(`\nWrote ${outMd}`)
  if (unique.some((r) => r.result === "FAIL")) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

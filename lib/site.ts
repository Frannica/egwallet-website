export const SITE = {
  name: "E.G. Wallet",
  legalName: "E.G. Wallet",
  url: "https://www.egwalletfinance.com",
  supportEmail: "support@egwalletfinance.com",
  /** Featured examples for marketing rate cards — not a complete operational inventory. */
  currencies: ["XAF", "XOF", "NGN", "GHS", "ZAR", "CNY", "USD", "EUR"] as const,
  /** Currencies that must never be labeled as live market rates on the marketing site. */
  alwaysIndicativeCurrencies: ["XAF", "XOF", "NGN", "GHS"] as const,
  /**
   * Production cash-out corridors evidenced by app + Kora rules (not exhaustive forever):
   * mobile money: CM/XAF, CI/XOF, GH/GHS, KE/KES, EG/EGP, TZ/TZS
   * bank: NG/NGN, KE/KES, ZA/ZAR
   * Stripe Connect US/UK/EU withdrawals: disabled in production health.
   */
  limits: {
    dailySendUsd: 5000,
    maxWalletUsd: 250_000,
  },
  /**
   * App destinations — leave empty until verified public store/deep-link URLs are provided.
   * Do not invent App Store / Play Store / Expo artifact URLs for production CTAs.
   */
  appStoreUrl: "" as string,
  playStoreUrl: "" as string,
  appLoginUrl: "" as string,
} as const

export const SUPPORT_MAILTO = `mailto:${SITE.supportEmail}`
export const SUPPORT_MAILTO_CONTACT = `mailto:${SITE.supportEmail}?subject=${encodeURIComponent("E.G. Wallet — Contact")}`
export const SUPPORT_MAILTO_ACCESS = `mailto:${SITE.supportEmail}?subject=${encodeURIComponent("E.G. Wallet — Access request")}`

/** Anchor targets used by primary CTAs on the marketing site. */
export const ANCHORS = {
  top: "#top",
  features: "#features",
  currencies: "#currencies",
  virtualCard: "#virtual-card",
  security: "#security",
  support: "#support",
  getApp: "#get-app",
} as const

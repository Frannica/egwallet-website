import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, IBM_Plex_Mono, Noto_Sans_Arabic } from "next/font/google"
import { LanguageProvider } from "@/lib/language-context"
import "./globals.css"

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
})

const plusJakartaDisplay = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
})

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
})

export const metadata: Metadata = {
  title: "E.G. Wallet — Multi-currency digital wallet",
  description:
    "E.G. Wallet is a multi-currency digital wallet for sending, receiving, and exchanging XAF, XOF, NGN, GHS, ZAR, CNY, USD, and EUR through the mobile app. Currently in closed testing.",
  metadataBase: new URL("https://www.egwalletfinance.com"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${plusJakartaDisplay.variable} ${ibmPlexMono.variable} ${notoSansArabic.variable}`}
    >
      <body className="font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}

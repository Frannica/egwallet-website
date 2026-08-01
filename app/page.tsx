import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { CurrencySection } from "@/components/currency-section"
import { VirtualCard } from "@/components/virtual-card"
import { SecuritySection } from "@/components/security-section"
import { GetAppSection } from "@/components/get-app-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <CurrencySection />
      <VirtualCard />
      <SecuritySection />
      <GetAppSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

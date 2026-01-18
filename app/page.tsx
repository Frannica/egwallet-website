import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { CurrencySection } from "@/components/currency-section"
import { VirtualCard } from "@/components/virtual-card"
import { SecuritySection } from "@/components/security-section"
import { AISupport } from "@/components/ai-support"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <CurrencySection />
      <VirtualCard />
      <SecuritySection />
      <AISupport />
      <Footer />
    </main>
  )
}

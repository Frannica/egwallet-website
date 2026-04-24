import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service - E.G. Wallet",
  description: "Terms of Service for E.G. Wallet mobile application",
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: April 24, 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By downloading, installing, or using the E.G. Wallet application, you agree to be bound by these Terms of
              Service. If you do not agree to these terms, do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              E.G. Wallet is a digital wallet application that allows users to send, receive, and manage funds across
              multiple currencies. The app is currently operating in a testing environment. All transactions are for
              app testing purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To use E.G. Wallet, you must create an account. You agree to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Be responsible for all activity that occurs under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree not to use E.G. Wallet for any unlawful purpose or in any way that could harm the service,
              other users, or third parties. Prohibited activities include but are not limited to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Money laundering or financing of illegal activities</li>
              <li>Fraud or misrepresentation</li>
              <li>Circumventing transaction limits or security controls</li>
              <li>Using the service in jurisdictions where it is prohibited</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Transaction Limits</h2>
            <p className="text-muted-foreground leading-relaxed">
              Unverified accounts are subject to a daily transaction limit of $5,000 USD and a maximum wallet capacity
              of $250,000 USD. Higher limits are available upon identity verification (KYC).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              E.G. Wallet is not a licensed bank or financial institution. Wallet balances are not insured by any
              government deposit protection scheme. To the maximum extent permitted by law, E.G. Wallet shall not be
              liable for any indirect, incidental, or consequential damages arising from your use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of material changes via
              the app or email. Continued use of the service after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, contact us at:{" "}
              <a href="mailto:support@egwalletfinance.com" className="text-foreground underline hover:no-underline">
                support@egwalletfinance.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

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
        <p className="text-muted-foreground mb-8">Effective Date: July 23, 2026 &middot; Last updated: July 23, 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              By downloading, installing, registering for, or using the E.G. Wallet mobile application (the &quot;App&quot; or
              the &quot;Service&quot;), you agree to be bound by these Terms of Service (the &quot;Terms&quot;). If you do not agree to
              these Terms, do not use the App.
            </p>
            <p className="text-foreground font-medium leading-relaxed">
              E.G. Wallet is a live, production financial service that moves real money. All balances, transfers,
              deposits, withdrawals, currency exchanges, QR payments, and payroll transactions processed through the
              App involve real funds and have real financial consequences. There is no test mode, demo mode, or
              simulated transaction environment available to end users in production.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">E.G. Wallet is a digital wallet application that allows users to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Create and manage a digital multi-currency wallet</li>
              <li>Add funds to their wallet (&quot;Deposits&quot;) using a supported payment method</li>
              <li>Send and receive peer-to-peer transfers using email addresses or @usernames (&quot;Wallet Transfers&quot;)</li>
              <li>Convert balances between supported currencies (&quot;Currency Exchange&quot;)</li>
              <li>Request and collect payments via scannable QR codes (&quot;QR Payments&quot;)</li>
              <li>Withdraw available wallet funds to an external bank account or mobile money account, where supported (&quot;Withdrawals&quot;)</li>
              <li>Enroll as an employer to run payroll disbursements to linked workers (&quot;Payroll&quot;), where eligible</li>
              <li>View transaction history, balances, and account activity</li>
              <li>Manage account settings, including username, preferred currency, and security settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Financial Disclaimer</h2>
            <p className="text-foreground font-medium leading-relaxed mb-4">
              E.G. Wallet is NOT a bank, financial institution, or licensed money transmitter in any jurisdiction
              unless expressly stated otherwise in writing.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>E.G. Wallet does not hold deposits as a bank would, issue credit, or provide banking services</li>
              <li>E.G. Wallet does not provide investment advice, financial planning, or any regulated financial advisory services</li>
              <li>
                Wallet balances within the App do not constitute bank deposits and are not insured by any government
                deposit insurance program (including but not limited to FDIC, NCUA, or any equivalent scheme in any
                other country)
              </li>
              <li>
                Funds you deposit or receive are held and moved through E.G. Wallet&apos;s payment infrastructure and
                third-party licensed payment/payout providers (see Section 13)
              </li>
              <li>
                You acknowledge that use of E.G. Wallet, and the transmission of real funds through it, is at your own
                risk, subject to the safeguards described in these Terms and our Privacy Policy
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">To use E.G. Wallet, you must:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Be at least 18 years of age</li>
              <li>Have the legal capacity to enter into a binding agreement</li>
              <li>Provide accurate, current, and complete registration information</li>
              <li>Successfully complete any identity verification E.G. Wallet requires for your intended use of the Service (see Section 9, KYC/AML)</li>
              <li>Not be a person or entity subject to sanctions, embargoes, or watchlists maintained by the U.S. Treasury (OFAC), the UN, the EU, or other applicable regulatory bodies</li>
              <li>Not be prohibited from using the App under the laws of the jurisdiction in which you reside</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Account Registration and Security</h2>
            <h3 className="text-lg font-semibold mb-2 text-foreground">5.1 Account Creation</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You must register with a valid email address and create a secure password to use the App. You are
              responsible for maintaining the confidentiality of your account credentials.
            </p>
            <h3 className="text-lg font-semibold mb-2 text-foreground">5.2 Account Security</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">You agree to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Keep your login credentials confidential and not share them with any third party</li>
              <li>Notify us immediately at support@egwalletfinance.com if you suspect unauthorized access to your account or wallet</li>
              <li>Accept responsibility for all activity that occurs under your account, except to the extent caused by E.G. Wallet&apos;s own fault</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2 text-foreground">5.3 Username</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">You may set an optional @username for receiving transfers. Usernames must:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Be between 3 and 20 characters</li>
              <li>Contain only lowercase letters, numbers, and underscores</li>
              <li>Not impersonate another person, brand, or entity</li>
              <li>Not contain offensive, misleading, or prohibited content</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We reserve the right to reclaim or reassign usernames that violate these rules.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">When using E.G. Wallet, you agree <strong>not</strong> to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Use the App for any unlawful, fraudulent, or malicious purpose</li>
              <li>Use the App to launder money, finance terrorism, or engage in any activity prohibited by applicable law or sanctions regimes</li>
              <li>Attempt to gain unauthorized access to other users&apos; accounts, wallets, or data</li>
              <li>Interfere with, disrupt, or overload the App&apos;s infrastructure or services</li>
              <li>Reverse-engineer, decompile, or disassemble any part of the App</li>
              <li>Use automated scripts, bots, or crawlers to interact with the App</li>
              <li>Circumvent, or attempt to circumvent, any security feature, transaction limit, KYC/AML control, or fraud control of the App</li>
              <li>Structure transactions to evade reporting thresholds or verification requirements</li>
              <li>Transmit viruses, malware, or any other harmful code through the App</li>
              <li>Create multiple accounts for fraudulent, abusive, or limit-evasion purposes</li>
              <li>Misrepresent your identity or affiliation with any person or entity</li>
              <li>Attempt a Wallet Transfer, Withdrawal, QR Payment, or Payroll payment to yourself where self-payment is not a legitimate, permitted use case</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Deposits</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>You may add funds to your wallet (&quot;Deposit&quot;) using a supported payment method (currently: debit/credit card via our card-processing partner)</li>
              <li>
                Deposits are credited to your wallet only after the payment method issuer confirms successful
                settlement. Declined, reversed, or charged-back payments will not be credited, and any amount already
                credited due to a subsequently reversed payment may be debited back from your wallet
              </li>
              <li>The first six (6) card deposits on an account are fee-free. Subsequent deposits are subject to a 0.5% processing fee, disclosed before you confirm</li>
              <li>Deposits are subject to minimum and maximum amounts, which may vary by currency and are displayed in the App before you confirm</li>
              <li>Accounts that are frozen, suspended, or subject to an active compliance hold (see Section 9) may not deposit funds until the hold is resolved</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Wallet Transfers, Currency Exchange, and QR Payments</h2>
            <h3 className="text-lg font-semibold mb-2 text-foreground">8.1 Wallet Transfers (Peer-to-Peer)</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>You may send funds to another E.G. Wallet user by email address or @username</li>
              <li>Wallet Transfers between E.G. Wallet users are free of charge</li>
              <li>
                If the recipient&apos;s preferred currency differs from the sender&apos;s, and automatic conversion is enabled, the
                transfer is converted using E.G. Wallet&apos;s displayed exchange rate and is subject to the Currency
                Exchange fee described in Section 8.2, deducted transparently from the converted amount before
                crediting the recipient
              </li>
              <li>
                Once a Wallet Transfer is confirmed and processed, it is final. E.G. Wallet does not guarantee the
                ability to reverse, recall, or refund a transfer sent to an unintended or incorrect recipient due to
                user error
              </li>
            </ul>
            <h3 className="text-lg font-semibold mb-2 text-foreground">8.2 Currency Exchange</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>You may convert available wallet balance from one supported currency to another at the exchange rate displayed in the App at the time of the transaction</li>
              <li>A currency exchange fee of 1.15% is deducted from the converted amount. The exact fee and net amount you will receive are always displayed before you confirm the exchange</li>
              <li>Exchange rates are refreshed periodically and may change between the time a rate is displayed and the time you confirm; the rate applied is the rate in effect at the moment of confirmation</li>
              <li>Currency exchanges are processed and finalized atomically: your source-currency balance and destination-currency balance are debited and credited together, or not at all</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2 text-foreground">8.3 QR Payments</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>QR Payments allow you to generate or scan a scannable code to request or complete a payment (including verified employer payroll disbursement requests, where applicable)</li>
              <li>Each QR Payment code and payment request is single-use and time-limited. A QR Payment may not be redeemed more than once, and expired or already-completed codes will be rejected</li>
              <li>QR Payments are subject to the same transaction limits, KYC/AML screening, fraud controls, and account-status checks (frozen/suspended accounts blocked) as any other Wallet Transfer</li>
              <li>Self-payment via QR code (paying yourself) is not permitted</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">9. KYC/AML (Identity Verification and Anti-Money-Laundering)</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>
                E.G. Wallet is required, and reserves the right, to verify your identity (&quot;KYC&quot; &ndash; Know Your Customer)
                as a condition of using some or all features of the Service, in compliance with applicable
                anti-money-laundering (&quot;AML&quot;) and counter-terrorist-financing laws
              </li>
              <li>
                Unverified accounts are subject to a lower daily transaction limit and a maximum wallet capacity,
                currently up to $5,000 USD per day and $250,000 USD total wallet capacity (or the equivalent in your
                wallet&apos;s currency); higher limits require successful identity verification
              </li>
              <li>
                E.G. Wallet monitors accounts and transactions for suspicious activity, fraud indicators, and
                sanctions exposure. We may request additional documentation or information at any time, including
                after an account has been verified
              </li>
              <li>
                E.G. Wallet may delay, hold, decline, or reverse any transaction, and may freeze or restrict an
                account, where required for fraud prevention, AML compliance, sanctions compliance, or a legal or
                regulatory obligation. Such holds are reviewed by compliance staff and are not automatically applied
                to ordinary, non-suspicious transactions
              </li>
              <li>
                Ordinary Wallet Transfers, Deposits, Currency Exchanges, QR Payments, and Withdrawals are processed
                automatically without manual review. Manual/administrative review is reserved for cases flagged for
                fraud, AML, sanctions, a legal requirement, or an existing account freeze
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Withdrawals</h2>
            <h3 className="text-lg font-semibold mb-2 text-foreground">10.1 How Withdrawals Work</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>You may withdraw available (non-held) wallet balance to an external bank account or supported mobile money account, subject to the country and method availability described below</li>
              <li>
                When you submit a withdrawal, the requested amount is placed on hold in your wallet immediately and is
                deducted from your available balance. The hold is released &mdash; either by completing the payout or by
                refunding the full amount back to your available balance &mdash; once the outcome of the withdrawal is
                known
              </li>
              <li>Ordinary withdrawals that pass automated fraud, AML, and sanctions screening are processed automatically, without manual approval, and are not counted against your Wallet Transfer send limits</li>
              <li>Withdrawals flagged for fraud, AML, sanctions, a legal hold, or an account freeze are routed to manual compliance review before any funds are released or returned</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2 text-foreground">10.2 Supported Countries and Methods</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Withdrawal availability, supported payout methods (bank transfer and/or mobile money), and required beneficiary information vary by country and are determined by E.G. Wallet&apos;s payout providers&apos; current, officially supported corridors</li>
              <li>The App will only present withdrawal methods that are actually supported for your selected country and currency, and will display bank or mobile-money-operator lists sourced directly from our payout provider rather than requiring you to enter a bank code manually</li>
              <li>
                If your country or the combination of country, currency, and method you select is not currently
                supported for withdrawal, the App will clearly tell you so before any funds are debited or held
                &mdash; it will never silently attempt an unsupported withdrawal or route it to the wrong provider
              </li>
              <li>E.G. Wallet&apos;s supported withdrawal corridors change over time as our payout providers add or remove country/method support. The current list of supported countries and methods is displayed to you in the App at the time you attempt a withdrawal, and is available on request from support@egwalletfinance.com</li>
              <li>Maintaining a wallet balance in a currency (for example, to receive transfers or hold funds) does not by itself guarantee that cash withdrawal is available for that currency or country &mdash; cash-out availability depends on active payout-provider support for that specific corridor</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2 text-foreground">10.3 Fees</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Local (domestic) withdrawals are subject to a 1.28% fee</li>
              <li>International withdrawals are subject to a 1.75% fee</li>
              <li>The exact fee and net payout amount are always displayed before you confirm a withdrawal</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2 text-foreground">10.4 Beneficiary Information</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>Where our payout provider supports it, E.G. Wallet will attempt to resolve and display the verified account holder name for the bank account or mobile money account you provide, so you can confirm you are paying the correct person before funds are sent</li>
              <li>Where automated resolution is not supported for your corridor, you are solely responsible for the accuracy of the account details and beneficiary name you provide. E.G. Wallet is not liable for funds sent to an incorrect account due to inaccurate information you supplied</li>
            </ul>
            <h3 className="text-lg font-semibold mb-2 text-foreground">10.5 Finality and Refunds</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Once a withdrawal has been confirmed as paid by our payout provider, it is final and cannot be reversed by E.G. Wallet</li>
              <li>If a withdrawal fails, is rejected by the payout provider, or is reversed/cancelled by an administrator before being paid, the full held amount is returned to your available wallet balance</li>
              <li>Withdrawals are protected against duplicate submission and duplicate payout through idempotency controls; you will never be charged or paid out twice for the same withdrawal request due to a retry or network error</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Payroll (Employer Accounts)</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Verified employer accounts may enroll workers and initiate payroll disbursements through the App</li>
              <li>Each payroll payment to a given worker for a given payroll run is processed exactly once. Duplicate submissions, retries, or repeated requests for the same payroll run and worker will not result in duplicate crediting or duplicate debiting</li>
              <li>The employer&apos;s account is debited, and the worker&apos;s wallet is credited, atomically &mdash; if a payroll payment cannot be completed in full, no partial debit or partial credit is left outstanding, and the transaction is reconciled automatically</li>
              <li>Payroll payments are subject to the same fraud, AML, sanctions, and limit checks as other transactions, and may be paused for compliance review under the same conditions described in Section 9</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">12. Virtual Cards</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>
                Where a virtual card feature is enabled on your account, it is provided in partnership with a licensed
                card-issuing provider. Any authorized charge on a virtual card is settled against, and debited from,
                your E.G. Wallet wallet balance through the same relational ledger used for all other transactions
                &mdash; a card charge can never succeed without a corresponding, correctly reconciled wallet debit
              </li>
              <li>
                If real-time card issuing/authorization is not active for your account or region, virtual card
                spending will be clearly disabled or restricted in the App rather than presented as available. E.G.
                Wallet will never represent card spending as available if the underlying issuing integration required
                to safely authorize and settle a real charge is not active
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">13. Third-Party Payment and Payout Providers</h2>
            <p className="text-muted-foreground leading-relaxed">
              E.G. Wallet relies on third-party, independently licensed providers to move real money on your behalf,
              including (as applicable to your transaction and location) card payment processors for Deposits and
              licensed payout/disbursement providers for Withdrawals and Payroll. Your use of these features is also
              subject to those providers&apos; terms to the extent disclosed to you. E.G. Wallet is responsible for how it
              integrates with these providers but is not itself the issuer of your payment card, the operator of your
              bank account, or a licensed money transmitter, except where separately and expressly stated.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">14. Transaction Records and Reconciliation</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>E.G. Wallet maintains an authoritative, tamper-evident ledger of all transactions, balances, and holds for operational, audit, and compliance purposes</li>
              <li>You may view your transaction history within the App at any time</li>
              <li>E.G. Wallet performs ongoing reconciliation between wallet balances, transaction records, and third-party provider confirmations to detect and correct any mismatch before it can affect your funds</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">15. Account Suspension, Freezing, and Termination</h2>
            <h3 className="text-lg font-semibold mb-2 text-foreground">15.1 Suspension / Freezing</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">E.G. Wallet reserves the right to suspend or freeze your account, temporarily or indefinitely, if:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>You violate any provision of these Terms</li>
              <li>Fraudulent, suspicious, or unauthorized activity is detected on your account</li>
              <li>We receive a valid legal or regulatory request to restrict your account</li>
              <li>Your account is involved in disputes, chargebacks, or claims by other users</li>
              <li>We reasonably believe your account poses a risk to E.G. Wallet, its users, or third parties, including sanctions or AML risk</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A frozen or suspended account cannot deposit, withdraw, transfer, exchange currency, make or receive QR
              Payments, or send/receive payroll until the freeze is resolved.
            </p>
            <h3 className="text-lg font-semibold mb-2 text-foreground">15.2 Termination</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4 mb-4">
              <li>We may terminate your account at any time for violation of these Terms, with or without prior notice, subject to applicable law</li>
              <li>You may request account closure at any time by contacting support@egwalletfinance.com</li>
              <li>
                Upon closure, any remaining available wallet balance will be paid out to you via a supported
                withdrawal method where possible, or otherwise handled in accordance with applicable law; funds
                subject to an active legal hold, dispute, or compliance review will be released only once that hold
                is resolved
              </li>
            </ul>
            <h3 className="text-lg font-semibold mb-2 text-foreground">15.3 Effect of Termination</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">Upon account termination:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Your access to the App and its features will be revoked</li>
              <li>Transaction history and account data may be retained as required by law or for legitimate audit, tax, or compliance purposes, even after account closure</li>
              <li>E.G. Wallet is not liable for any loss or damage resulting from a lawful account suspension, freeze, or termination</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">16. Disputes</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>If you believe a transaction was processed in error, was unauthorized, or was the result of fraud, contact support@egwalletfinance.com as soon as possible and provide all relevant transaction details</li>
              <li>E.G. Wallet will investigate reported disputes and, where our investigation confirms an error attributable to E.G. Wallet or a payment/payout provider we rely on, will correct the affected balance</li>
              <li>E.G. Wallet is not able to reverse a transaction that was correctly executed according to the instructions you provided (for example, a transfer sent to the wrong recipient due to user error, or a withdrawal sent to the wrong account number you entered)</li>
              <li>Any dispute that cannot be resolved directly with E.G. Wallet is subject to Section 19 (Dispute Resolution)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">17. Intellectual Property</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>The App, including its design, code, graphics, logos, and content, is the property of E.G. Wallet and is protected by applicable intellectual property laws</li>
              <li>You are granted a limited, non-exclusive, non-transferable, revocable license to use the App for personal, non-commercial purposes in accordance with these Terms</li>
              <li>You may not copy, modify, distribute, sell, or lease any part of the App without our prior written consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">18. Disclaimers and Limitation of Liability</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>THE APP IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED</li>
              <li>E.G. WALLET DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT</li>
              <li>WE DO NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, THOUGH WE MAINTAIN COMMERCIALLY REASONABLE SECURITY AND MONEY-SAFETY CONTROLS DESCRIBED IN OUR PRIVACY POLICY</li>
              <li>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, E.G. WALLET SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE APP</li>
              <li>NOTHING IN THIS SECTION LIMITS E.G. WALLET&apos;S OBLIGATION TO MAINTAIN ACCURATE WALLET BALANCES AND TO CORRECT ANY BALANCE ERROR CAUSED BY E.G. WALLET&apos;S OWN SYSTEM FAULT</li>
              <li>
                E.G. WALLET&apos;S TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATED TO THESE TERMS OR THE APP, OTHER
                THAN THE CORRECTION OF A WALLET BALANCE ERROR CAUSED BY E.G. WALLET&apos;S OWN FAULT, SHALL NOT EXCEED THE
                GREATER OF THE FEES YOU HAVE PAID TO E.G. WALLET IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR $100
                USD
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">19. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree to indemnify, defend, and hold harmless E.G. Wallet and its officers, directors, employees,
              and agents from and against any claims, liabilities, damages, losses, and expenses (including
              reasonable legal fees) arising out of or related to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Your use of the App</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any applicable law or regulation</li>
              <li>Your infringement of any third-party rights</li>
              <li>Inaccurate transaction, recipient, or beneficiary information you provided</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">20. Dispute Resolution and Governing Law</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Any disputes arising out of or related to these Terms or the App shall first be attempted to be resolved through good-faith negotiation</li>
              <li>If a dispute cannot be resolved through negotiation within 30 days, either party may pursue resolution through binding arbitration or in the courts of competent jurisdiction</li>
              <li>These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles, except where a mandatory local consumer-protection or financial-services law of your country of residence applies and cannot be waived</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">21. Changes to These Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms from time to time. We will notify you of material changes by posting the
              updated Terms within the App and updating the &quot;Last Updated&quot; date above. Your continued use of the App
              after changes are posted constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">22. Severability</h2>
            <p className="text-muted-foreground leading-relaxed">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall
              remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">23. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-card rounded-lg border border-border">
              <p className="text-foreground font-medium">E.G. Wallet Support</p>
              <p className="text-muted-foreground">
                Email:{" "}
                <a href="mailto:support@egwalletfinance.com" className="text-foreground underline hover:no-underline">
                  support@egwalletfinance.com
                </a>
              </p>
              <p className="text-muted-foreground">
                Website:{" "}
                <a href="https://www.egwalletfinance.com" className="text-foreground underline hover:no-underline">
                  www.egwalletfinance.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <p className="text-muted-foreground leading-relaxed italic">
              These Terms of Service govern the production E.G. Wallet mobile application and apply to all
              real-money Deposits, Withdrawals, Wallet Transfers, Currency Exchanges, QR Payments, Payroll, and
              Virtual Card activity processed through the App.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} E.G. Wallet. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

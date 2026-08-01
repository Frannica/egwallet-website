"use client"

import { Shield, Lock, Fingerprint, Server } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function SecuritySection() {
  const { t } = useLanguage()

  const securityFeatures = [
    {
      icon: Lock,
      title: t("encryption"),
      description: t("encryptionDesc"),
    },
    {
      icon: Shield,
      title: t("twoFactor"),
      description: t("twoFactorDesc"),
    },
    {
      icon: Fingerprint,
      title: t("biometric"),
      description: t("biometricDesc"),
    },
    {
      icon: Server,
      title: t("serverEnforced"),
      description: t("serverEnforcedDesc"),
    },
  ]

  return (
    <section id="security" className="section-soft scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 shadow-sm">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{t("securityBadge")}</span>
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
            {t("securityTitle")}
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">{t("securitySubtitle")}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {securityFeatures.map((feature) => (
            <div key={feature.title} className="flex gap-4 rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

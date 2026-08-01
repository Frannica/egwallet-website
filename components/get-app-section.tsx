"use client"

import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { SUPPORT_MAILTO_CONTACT } from "@/lib/site"

export function GetAppSection() {
  const { t } = useLanguage()

  return (
    <section id="get-app" className="scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="surface-panel rounded-2xl bg-secondary px-6 py-12 sm:px-10 lg:px-14">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
              {t("getAppTitle")}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{t("getAppSubtitle")}</p>

            <Button
              size="lg"
              className="mt-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <a href={SUPPORT_MAILTO_CONTACT}>
                <Mail className="h-4 w-4" />
                {t("getAppContactCta")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

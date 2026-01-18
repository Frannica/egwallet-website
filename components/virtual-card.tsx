import { Lock, Unlock, X, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VirtualCard() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="w-full max-w-sm mx-auto lg:mx-0 aspect-[1.586/1] bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-8 bg-foreground/20 rounded" />
                    <span className="text-primary-foreground/80 text-sm font-medium">E.G. Wallet</span>
                  </div>

                  <div className="space-y-4">
                    <div className="text-primary-foreground text-lg tracking-widest font-mono">•••• •••• •••• 4829</div>
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-primary-foreground/60 text-xs">Card Holder</div>
                        <div className="text-primary-foreground text-sm">JOHN DOE</div>
                      </div>
                      <div>
                        <div className="text-primary-foreground/60 text-xs">Expires</div>
                        <div className="text-primary-foreground text-sm">12/28</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-full h-full bg-primary/30 rounded-2xl -z-10" />
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
              Virtual debit card for secure online payments
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Get a virtual debit card that works everywhere online. Lock it when not in use, unlock for purchases, or
              cancel specific transactions instantly.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-background rounded-xl border border-border">
                <Lock className="w-5 h-5 text-primary" />
                <span className="text-foreground text-sm">Lock Card</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-background rounded-xl border border-border">
                <Unlock className="w-5 h-5 text-primary" />
                <span className="text-foreground text-sm">Unlock Card</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-background rounded-xl border border-border">
                <X className="w-5 h-5 text-primary" />
                <span className="text-foreground text-sm">Cancel Payment</span>
              </div>
            </div>

            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              <CreditCard className="w-4 h-4" /> Get Your Card
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

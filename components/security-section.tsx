import { Shield, Lock, Fingerprint, Key } from "lucide-react"

const securityFeatures = [
  {
    icon: Shield,
    title: "Backend-Enforced Security",
    description: "All limits and permissions are enforced server-side for maximum protection.",
  },
  {
    icon: Lock,
    title: "Secure Authentication",
    description: "Token-based authentication with automatic session management.",
  },
  {
    icon: Fingerprint,
    title: "Biometric Login",
    description: "Use fingerprint or face recognition for quick, secure access.",
  },
  {
    icon: Key,
    title: "Encrypted Data",
    description: "Bank-grade encryption protects all your personal and financial data.",
  },
]

export function SecuritySection() {
  return (
    <section id="security" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Bank-grade security</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Your security is our priority
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We use industry-leading security measures to keep your money and data safe.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="p-6 bg-card rounded-2xl border border-border flex gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

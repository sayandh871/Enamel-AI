import { MicIcon } from "lucide-react"


const WelcomeSection = () => {
  return (
    <div className="mb-12 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">
                Upgrade to Pro
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Unlock Premium AI Dental Care
              </h1>
              <p className="text-muted-foreground">
                Get unlimited AI consultations, adwanced features and priority
                support to take care your dental health to the next level.
              </p>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
              <MicIcon className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>
  )
}

export default WelcomeSection

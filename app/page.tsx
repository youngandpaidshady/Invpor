import { TickerTape, Hero, TrustBadges, HowItWorks, PricingPreview, SocialProof, FAQ, FinalCTA } from "@/components/landing";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <TickerTape />
      <Hero />
      <TrustBadges />
      <HowItWorks />
      <PricingPreview />
      <SocialProof />
      <FAQ />
      <FinalCTA />
    </main>
  );
}

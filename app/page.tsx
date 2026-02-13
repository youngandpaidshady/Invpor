import { TickerTape, Hero, TrustBadges, HowItWorks, PricingPreview, SocialProof, FAQ, FinalCTA } from "@/components/landing";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#09090B]">
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

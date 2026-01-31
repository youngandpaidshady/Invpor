import Hero from "@/components/hero";
import PayoutTicker from "@/components/payout-ticker";
import TrustBadges from "@/components/trust-badges";
import HowItWorks from "@/components/how-it-works";
import ChallengeTabs from "@/components/challenge-tabs";
import RewardGuarantee from "@/components/reward-guarantee";
import ScalingProgram from "@/components/scaling-program";
import TradingPlatforms from "@/components/trading-platforms";
import FeaturesGrid from "@/components/features-grid";
import StatsSection from "@/components/stats-section";
import LiveFeed from "@/components/live-feed";
import Testimonials from "@/components/testimonials";
import CommunitySection from "@/components/community-section";
import FAQ from "@/components/faq";
import CTASection from "@/components/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <PayoutTicker />
      <TrustBadges />
      <HowItWorks />
      <ChallengeTabs />
      <RewardGuarantee />
      <ScalingProgram />
      <TradingPlatforms />
      <FeaturesGrid />
      <StatsSection />
      <LiveFeed />
      <Testimonials />
      <CommunitySection />
      <FAQ />
      <CTASection />
    </>
  );
}

import Hero from "@/components/hero";
import TrustBadges from "@/components/trust-badges";
import HowItWorks from "@/components/how-it-works";
import ChallengeCard from "@/components/challenge-card";
import FeaturesGrid from "@/components/features-grid";
import StatsSection from "@/components/stats-section";
import LiveFeed from "@/components/live-feed";
import Testimonials from "@/components/testimonials";
import ComparisonTable from "@/components/comparison-table";
import FAQ from "@/components/faq";
import CTASection from "@/components/cta-section";

export default function Home() {
  const challenges = [
    {
      accountSize: "$5,000",
      profitTarget: "8%",
      maxDrawdown: "5%",
      price: "$49",
      popular: false,
    },
    {
      accountSize: "$25,000",
      profitTarget: "8%",
      maxDrawdown: "5%",
      price: "$199",
      popular: true,
    },
    {
      accountSize: "$50,000",
      profitTarget: "8%",
      maxDrawdown: "5%",
      price: "$349",
      popular: false,
    },
    {
      accountSize: "$100,000",
      profitTarget: "8%",
      maxDrawdown: "5%",
      price: "$549",
      popular: false,
    },
  ];

  return (
    <>
      <Hero />
      <TrustBadges />
      <HowItWorks />
      
      {/* Challenges Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-semibold uppercase tracking-widest mb-4">
              Pricing Plans
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Choose Your Challenge
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the account size that matches your trading style and goals. 
              All plans include the same powerful features.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((challenge, index) => (
              <ChallengeCard
                key={challenge.accountSize}
                {...challenge}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <FeaturesGrid />
      <StatsSection />
      <LiveFeed />
      <Testimonials />
      <ComparisonTable />
      <FAQ />
      <CTASection />
    </>
  );
}

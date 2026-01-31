import Hero from "@/components/hero";
import ChallengeCard from "@/components/challenge-card";

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
      accountSize: "$100,000",
      profitTarget: "8%",
      maxDrawdown: "5%",
      price: "$699",
      popular: false,
    },
  ];

  return (
    <>
      <Hero />
      
      {/* Challenges Section */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Choose Your Challenge
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the account size that matches your trading style and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
    </>
  );
}

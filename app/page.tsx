export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-display font-bold text-foreground">
            Investment Platform
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Welcome to your investment platform. Built with Next.js and styled with the braxley color palette.
          </p>
          <div className="pt-8">
            <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

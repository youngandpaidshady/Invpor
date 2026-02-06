"use client";

/**
 * Social Proof - Clean Testimonials
 * Zero framer-motion, pure CSS
 */

const testimonials = [
  {
    quote: "Straightforward. No games. Got funded in 11 days.",
    author: "Marcus R.",
    location: "London",
    profit: "$18,420",
  },
  {
    quote: "Finally a prop firm that doesn't try to fail you.",
    author: "Sarah K.",
    location: "New York",
    profit: "$32,100",
  },
  {
    quote: "Three payouts in two months. All processed same day.",
    author: "James L.",
    location: "Sydney",
    profit: "$45,890",
  },
];

export function SocialProof() {
  return (
    <section className="py-24 lg:py-40 bg-[#050505]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="text-xs text-white/30 uppercase tracking-[0.4em] font-mono block mb-6">
            Trader Stories
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">
            Real traders.<br />
            <span className="text-[#ff6b35]">Real payouts.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="p-8 lg:p-10 border border-white/5 hover:border-white/10 transition-colors"
            >
              <blockquote className="text-xl lg:text-2xl text-white/80 font-light leading-relaxed mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-white font-bold">{t.author}</div>
                  <div className="text-white/30 text-sm">{t.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-[#ff6b35] font-mono font-bold text-lg">+{t.profit}</div>
                  <div className="text-white/20 text-xs uppercase tracking-wider">earned</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

# 21st.dev Component Skill: Marketing Blocks

> **Priority:** HIGH
> **Category:** Marketing (Pricing, Testimonials, Features, Clients, Footers)
> **Total Variants:** 100+
> **Purpose:** Selling the product. These blocks must build trust, demonstrate value, and handle layout composition gracefully.

## 1. Core Principles
- **Scannability:** Users don't read marketing pages, they scan. Features and pricing must be digestible at a glance.
- **Contrast & Hierarchy:** Use alternating layouts (`flex-row` then `flex-row-reverse`) to break up monotony. The "Most Popular" pricing tier must stand out drastically.
- **Social Proof is Active:** Don't just list logos. Animate them (Marquee), make them draggable (Swiper cards), or attach visual feedback to avatars.

## 2. Top-Tier Marketing Block Archetypes

### A. The "Bento Feature" Grid
**Vibe:** Apple product page, Stripe.
- **Technique:** A CSS Grid layout where some cards span 2 columns/rows and others span 1. 
- **Code Logic:** 
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
  <Card className="md:col-span-2 md:row-span-1" /> {/* Tall or Wide Feature */}
  <Card className="md:col-span-1" />
  {/* Add more cards mapping specific product features */}
</div>
```

### B. The "Squishy Pricing" Tier
**Vibe:** Modern Consumer apps.
- **Technique:** Usually 3 tiers. The middle tier is slightly larger (`scale-105`), has a glowing border (`border-primary shadow-glow`), and has a primary "Buy" button (while others have outline buttons).
- **Animation:** Use a Toggle (Monthly/Annual) that wraps the price string in `AnimatePresence`, morphing the number `y` axis down and in.

### C. The "Marquee Testimonial / Logo Cloud"
**Vibe:** B2B SaaS.
- **Technique:** Continuous infinite scroll.
- **Code Logic:**
```tsx
<div className="flex w-full overflow-hidden">
  <motion.div
    animate={{ x: ["0%", "-50%"] }} // Scroll left endlessly
    transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
    className="flex whitespace-nowrap gap-12"
  >
     {/* Render logos TWICE to create a seamless loop */}
     {logos.map(L)} {logos.map(L)}
  </motion.div>
</div>
```

### D. The "Mega Footer"
**Vibe:** Enterprise, Information Architecture.
- **Layout:** A massive grid `grid-cols-2 md:grid-cols-5 lg:grid-cols-6`.
- **Left Column:** Brand Logo + Mission Statement + Social Icons (often spans 2 columns).
- **Right Columns:** Links categorized into Products, Resources, Company, Legal.
- **Optional:** A floating Newsletter Input box intersecting the footer's top border.

## 3. Anti-Patterns
- **❌ Unresponsive Pricing:** Pricing tables that don't switch to a `flex-col` stack on mobile viewports.
- **❌ Dead Client Logos:** Just dumping pure white PNGs. Add `grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all` to make the logo cloud look premium and interactive.
- **❌ Wall of Text Features:** Paragraphs of text next to a small icon. Use visuals (screenshots, animated SVGs, looping MP4s) as the primary focus, with 2 lines of description maximum per box.

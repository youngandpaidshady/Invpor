# 21st.dev Component Skill: Pricing Sections

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 17+
> **Training Data:** 56 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Pricing Sections components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 56 analyzed Pricing Sections implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Framer Motion animations**
- **Framer Motion spring physics**
- **Framer Motion useMotionValue**
- **Framer Motion useTransform**
- **GLSL shaders**
- **Glassmorphism / backdrop blur**
- **HTML Canvas rendering**
- **Intersection Observer / useInView**
- **Lucide React icons**
- **Next.js Image optimization**
- **Next.js Link routing**
- **Radix UI primitives**
- **React effects**
- **React refs**
- **React state management**
- **React useCallback optimization**
- **React useMemo optimization**
- **React.forwardRef pattern**
- **Recharts / charting**
- **Tailwind CSS Animate plugin**
- **cmdk command palette**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @number-flow/react @paper-design/shaders-react @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-tooltip @tsparticles/react @tsparticles/slim canvas-confetti class-variance-authority clsx framer-motion lucide-react motion next react-aria-components react-icons react-wrap-balancer recharts tailwind-merge
```

| Dependency | Purpose |
|---|---|
| `@number-flow/react` | Utility |
| `@paper-design/shaders-react` | Utility |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-radio-group` | Headless accessible primitives |
| `@radix-ui/react-select` | Headless accessible primitives |
| `@radix-ui/react-separator` | Headless accessible primitives |
| `@radix-ui/react-slider` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-switch` | Headless accessible primitives |
| `@radix-ui/react-tabs` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `@tsparticles/react` | Utility |
| `@tsparticles/slim` | Utility |
| `canvas-confetti` | Utility |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `react-aria-components` | Utility |
| `react-icons` | Utility |
| `react-wrap-balancer` | Utility |
| `recharts` | Data visualization |
| `tailwind-merge` | Class composition |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `Pricing.tsx`
- `PricingCard.tsx`
- `animated-glassy-pricing.tsx`
- `animated-pricing-page.tsx`
- `bento-pricing.tsx`
- `creative-pricing.tsx`
- `dark-gradient-pricing.tsx`
- `demo.tsx`
- `hero.tsx`
- `modern-payment-form.tsx`
- `modern-pricing-table.tsx`
- `orbiting-skills.tsx`
- `pricing-1.tsx`
- `pricing-6.tsx`
- `pricing-card-1.tsx`
- `pricing-card.tsx`
- `pricing-cards.tsx`
- `pricing-component.tsx`
- `pricing-container.tsx`
- `pricing-interaction.tsx`
- ...and 20 more variants

## 4. Props & Variant Patterns

### CVA Variant Names Found
- `default`
- `default (size)`
- `destructive`
- `ghost`
- `icon (size)`
- `lg (size)`
- `link`
- `outline`
- `secondary`
- `sm (size)`

### Custom Props Found
- `CTA`
- `angle`
- `animationDelay`
- `annualBillingLabel`
- `asChild`
- `autoStart`
- `badge`
- `basePrice`
- `benefits`
- `bestFor`
- `buttonClassName`
- `buttonLabel`
- `buttonText`
- `buttonVariant`
- `cardClassName`
- `checked`
- `config`
- `containerClassName`
- `cta`
- `currentTestimonialIndex`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
```

### Pattern 2
```tsx
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
```

### Pattern 3
```tsx
import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-3", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square size-4 rounded-full border border-input shadow-sm shadow-black/5 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center text-current">
        <svg
          width="6"
          height="6"
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/pricing-section.tsx`
2. Install required dependencies: `@number-flow/react, @paper-design/shaders-react, @radix-ui/react-icons`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `pricing-sectionVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Pricing Sections must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Pricing Sections components:

1. **Never repeat a design** — with 17+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Pricing Sections component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. 3-column plan comparison cards
2. Horizontal toggle (monthly/yearly) + cards
3. Single featured plan spotlight
4. Comparison table matrix
5. Slider-based custom plan builder

### 🎨 Surface Axis
1. Glass cards with border-white/10, featured card border-brand
2. Dark cards with gradient featured card
3. Outlined cards with shadow on featured
4. Full-bleed gradient background with card overlay
5. Alternating light/dark card scheme

### ⚡ Motion Axis
1. Price toggle: numbers flip/morph when switching billing
2. Featured card scales slightly larger
3. Scroll-triggered card stagger entrance
4. Hover: card lifts with shadow bloom
5. CTA button magnetic + glow on featured

### 🎭 Mood Axis
1. SaaS — monthly/yearly toggle, feature list, clear CTAs
2. Enterprise — custom plan, contact sales, enterprise features
3. Creator — single plan, simple, trust badges, early supporter
4. Startup — generous free tier, upgrade path clarity
5. Premium — gold/black, VIP feel, exclusive language

### 🧩 Composition Axis
1. Dedicated pricing page
2. Landing page pricing preview section
3. Settings upgrade modal
4. Checkout plan selection step
5. In-app upgrade prompt

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Glass Tiers
3 glass cards side by side. Center card (recommended) is slightly larger, has gradient border animation, 'Most Popular' badge with shimmer. All cards: plan name, price (text-5xl), billing period, feature list with checkmarks, CTA button. Price morphs on monthly/yearly toggle. CTAs have magnetic hover.

### Recipe 2: Dark Premium
dark background, 3 cards. Enterprise card (center) has gold gradient border + glow. Price count-up animation on scroll. Feature list with green checkmarks and red X marks. Toggle switch for billing period. Cards stagger-in. Trust badges below: '14-day free trial' etc.

### Recipe 3: Comparison Matrix
table format. Plans as columns, features as rows. Checkmarks/X/values in cells. Recommended column highlighted with brand-color header + subtle column glow. Sticky column headers on scroll. Row hover highlights. CTA buttons at column bottom.

### Recipe 4: Custom Builder
single card with slider controls. Adjust users/storage/features with range sliders. Price calculates dynamically and animates on change. Real-time feature summary list. Single CTA button. Glass card on gradient mesh background. Premium, interactive feel.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Landing page pricing**
- **Pricing page**
- **Upgrade modal**

## 13. 🔗 Composes With

Load these companion blueprints when building with Pricing Sections:

- `components/cards.md` — Cards
- `components/buttons.md` — Buttons
- `components/badges.md` — Badges
- `components/toggles.md` — Toggles
- `components/comparisons.md` — Comparisons
- `components/tabs.md` — Tabs


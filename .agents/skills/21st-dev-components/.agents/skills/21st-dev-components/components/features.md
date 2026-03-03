# 21st.dev Component Skill: Features

> **Priority:** EXTRA_HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 36+
> **Training Data:** 111 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Features components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 111 analyzed Features implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
- **Embla Carousel**
- **Framer Motion animations**
- **Framer Motion spring physics**
- **Framer Motion useMotionValue**
- **Framer Motion useTransform**
- **GLSL shaders**
- **GSAP animation library**
- **Glassmorphism / backdrop blur**
- **HTML Canvas rendering**
- **Intersection Observer API**
- **Lottie animations**
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
- **ResizeObserver API**
- **Tailwind CSS Animate plugin**
- **Three.js / React Three Fiber**
- **Vaul drawer component**
- **cmdk command palette**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @dotlottie/react-player @paper-design/shaders-react @radix-ui/react-accordion @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-radio-group @radix-ui/react-slot @radix-ui/react-tabs @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip @react-three/drei @react-three/fiber @studio-freight/lenis @tabler/icons-react class-variance-authority clsx cobe dotted-map embla-carousel-react export framer-motion gsap lucide-react motion next react-countup react-icons react-wrap-balancer recharts swr tailwind-merge three
```

| Dependency | Purpose |
|---|---|
| `@dotlottie/react-player` | Utility |
| `@paper-design/shaders-react` | Utility |
| `@radix-ui/react-accordion` | Headless accessible primitives |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-radio-group` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-tabs` | Headless accessible primitives |
| `@radix-ui/react-toggle` | Headless accessible primitives |
| `@radix-ui/react-toggle-group` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `@react-three/drei` | 3D rendering |
| `@react-three/fiber` | 3D rendering |
| `@studio-freight/lenis` | Utility |
| `@tabler/icons-react` | Utility |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `cobe` | Utility |
| `dotted-map` | Utility |
| `embla-carousel-react` | Carousel engine |
| `export` | Utility |
| `framer-motion` | Physics-based animations |
| `gsap` | Professional animation |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `react-countup` | Utility |
| `react-icons` | Utility |
| `react-wrap-balancer` | Utility |
| `recharts` | Data visualization |
| `swr` | Utility |
| `tailwind-merge` | Class composition |
| `three` | 3D rendering |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `3d-orbit-gallery.tsx`
- `SectionWithMockup.tsx`
- `a-modern-hero-section.tsx`
- `about-3.tsx`
- `accordion-feature-section.tsx`
- `ai-models-preview.tsx`
- `animated-background.tsx`
- `animated-feature-carousel.tsx`
- `bento-grid.tsx`
- `bento-pricing.tsx`
- `blog-posts.tsx`
- `bounce-card-features.tsx`
- `card-spotlight.tsx`
- `card-with-cross-patter.tsx`
- `card-with-ellipsis-pattern.tsx`
- `card-with-grid-ellipsis-pattern.tsx`
- `card-with-grid-pattern.tsx`
- `card-with-lines-patter.tsx`
- `card-with-noise-patter.tsx`
- `card.tsx`
- ...and 79 more variants

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
- `type (size)`

### Custom Props Found
- `alt`
- `anchor`
- `animateLines`
- `animateMarkers`
- `animateText`
- `animationDuration`
- `as`
- `asChild`
- `autoPlayInterval`
- `backgroundLabel`
- `backgroundPosition`
- `badge`
- `badgeTexts`
- `bgClass`
- `borderWidth`
- `buttonClassName`
- `buttonPrimary`
- `buttonText`
- `buttonUrl`
- `cards`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
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
import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/feature.tsx`
2. Install required dependencies: `@dotlottie/react-player, @paper-design/shaders-react, @radix-ui/react-accordion`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `featureVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Features must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Features components:

1. **Never repeat a design** — with 36+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Features component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Bento grid (mixed card sizes)
2. Icon + text card grid (3 columns)
3. Alternating left-right sections
4. Feature carousel horizontal scroll
5. List with large icon markers left

### 🎨 Surface Axis
1. Glass cards on gradient mesh
2. Outlined cards with icon glow
3. Solid cards with gradient hover fill
4. Full-bleed image sections alternating
5. Card with pattern backgrounds (dots, lines)

### ⚡ Motion Axis
1. Scroll-triggered stagger entrance by card
2. Icon animates/pulses on card hover
3. Card tilts 3D on hover
4. Feature number counts up on scroll enter
5. Background pattern shifts on hover

### 🎭 Mood Axis
1. SaaS product — clean, icon-forward, benefit text
2. Technical — code snippets, API references, precise
3. Creative — illustrations, playful language, color
4. Enterprise — conservative, data-backed, professional
5. Startup — bold, minimal, high contrast

### 🧩 Composition Axis
1. Homepage features section
2. Product page capabilities grid
3. Landing page benefit blocks
4. Documentation feature overview
5. Pricing page feature comparison

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Glass Bento
mixed-size grid (CSS grid with span-2 hero card). Each card is frosted glass with unique icon. Hero card has gradient background + larger content. Cards stagger-in on scroll. Hover lifts card + adds brand-color glow. Each card has a subtle pattern background (dots/lines/noise) unique from siblings.

### Recipe 2: Alternating Showcase
full-width sections alternating image-left/text-right, then image-right/text-left. Each section scroll-triggers: image slides in from side, text fades up staggered (badge → headline → description → CTA). Sections separated by subtle gradient dividers.

### Recipe 3: Icon Grid
3-column grid of feature cards. Each card: large icon (48px) with brand-color background circle, bold title, description text. Icons animate (spin, bounce, or pulse) on card hover. Cards have subtle border that turns brand-color on hover. Stagger-in on scroll.

### Recipe 4: Metric Features
feature cards each containing a large animated counter number (e.g., '99.9%', '10M+', '<50ms'). Numbers count-up or type-in on scroll visibility. Below number: feature title and description. Cards separated by thin vertical dividers.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Landing page features section**
- **Product tour**
- **About page**

## 13. 🔗 Composes With

Load these companion blueprints when building with Features:

- `components/cards.md` — Cards
- `components/icons.md` — Icons
- `components/images.md` — Images
- `components/badges.md` — Badges
- `components/buttons.md` — Buttons


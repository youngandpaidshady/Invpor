# 21st.dev Component Skill: Clients

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 16+
> **Training Data:** 30 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Clients components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 30 analyzed Clients implementations:

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
- **Glassmorphism / backdrop blur**
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
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @radix-ui/react-avatar @radix-ui/react-slot @tabler/icons-react @tsparticles/react @tsparticles/slim class-variance-authority embla-carousel-auto-scroll embla-carousel-react framer-motion lucide-react motion next next-themes react-icon-cloud react-icons react-use-measure
```

| Dependency | Purpose |
|---|---|
| `@radix-ui/react-avatar` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@tabler/icons-react` | Utility |
| `@tsparticles/react` | Utility |
| `@tsparticles/slim` | Utility |
| `class-variance-authority` | Variant management |
| `embla-carousel-auto-scroll` | Carousel engine |
| `embla-carousel-react` | Carousel engine |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `next-themes` | Next.js framework feature |
| `react-icon-cloud` | Utility |
| `react-icons` | Utility |
| `react-use-measure` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `about-3.tsx`
- `about-us-section.tsx`
- `animated-testimonials.tsx`
- `animated-tooltip.tsx`
- `avatar-circles.tsx`
- `brands.tsx`
- `cases-with-infinite-scroll.tsx`
- `customers-section.tsx`
- `demo.tsx`
- `email-client-card.tsx`
- `gallery4.tsx`
- `glare-card.tsx`
- `infinite-slider.tsx`
- `integrations-section.tsx`
- `interactive-icon-cloud.tsx`
- `logo-carousel.tsx`
- `logo-cloud-2.tsx`
- `logo-cloud-3.tsx`
- `logo-cloud-4.tsx`
- `logos3.tsx`
- ...and 9 more variants

## 4. Props & Variant Patterns

### CVA Variant Names Found
- `default`
- `default (size)`
- `destructive`
- `ghost`
- `icon (size)`
- `lg (size)`
- `light`
- `link`
- `md (size)`
- `outline`
- `pink`
- `secondary`
- `sm (size)`
- `xl (size)`
- `xll (size)`
- `xs (size)`
- `xxl (size)`
- `xxs (size)`
- `xxxl (size)`

### Custom Props Found
- `actions`
- `alt`
- `asChild`
- `avatarFallback`
- `avatarSrc`
- `avatarUrls`
- `brands`
- `columnCount`
- `columnIndex`
- `columns`
- `currentTime`
- `customers`
- `delay`
- `description`
- `direction`
- `heading`
- `hidden`
- `icon`
- `imageHeight`
- `index`

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
} from "@/components/ui/carousel";

function Case() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 1000);
  }, [api, current]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col  gap-10">
          <h2 className="text-xl md:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/client.tsx`
2. Install required dependencies: `@radix-ui/react-avatar, @radix-ui/react-slot, @tabler/icons-react`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `clientVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Clients must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Clients components:

1. **Never repeat a design** — with 16+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Clients component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Logo strip horizontal row
2. Logo grid (4-6 columns)
3. Scrolling ticker tape (infinite)
4. Logo cloud random placement
5. Carousel with client details

### 🎨 Surface Axis
1. Grayscale logos with color on hover
2. White logos on dark background
3. Glass cards containing logos
4. Outlined containers per logo
5. Gradient overlay that reveals on hover

### ⚡ Motion Axis
1. Infinite scroll ticker (CSS translateX loop)
2. Logo fade-in stagger on scroll
3. Hover: grayscale to color transition
4. Logo scale-up on hover with shadow
5. Parallax logos at different scroll speeds

### 🎭 Mood Axis
1. Enterprise — clean, minimal, uniformly sized
2. Startup — varied sizes, playful arrangement
3. Tech — dark mode, monochrome, dense
4. Creative agency — colorful, dynamic, animated
5. Trust builder — large logos, quotes alongside

### 🧩 Composition Axis
1. Below hero section trust strip
2. Dedicated partners page grid
3. Footer pre-section strip
4. Inside 'Trusted by' card block
5. Sidebar scrolling logo rail

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Infinite Ticker
seamless horizontal scroll of client logos. Duplicated set for infinite loop. CSS animation translateX. Grayscale by default, color on hover. Pause on hover. Dark background, logos at 60% opacity until hovered.

### Recipe 2: Glass Grid
4-column grid of frosted-glass cards, each containing a centered logo. Cards have border-white/10. Hover lifts card + reveals brand color background tint. Stagger-in on scroll viewport enter. 'Trusted by 500+ companies' heading above.

### Recipe 3: Cloud Float
logos positioned in a randomized cloud layout with slight overlaps. Different sizes suggesting importance. Logos slowly drift on random paths (CSS keyframes, different durations). Hover pins a logo and enlarges it.

### Recipe 4: Logo Marquee
two rows scrolling in opposite directions. Top row left-to-right, bottom row right-to-left. Different speeds. Gradient mask fades edges to transparent. Clean dark background.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Landing page social proof**
- **About page**
- **Case studies header**

## 13. 🔗 Composes With

Load these companion blueprints when building with Clients:

- `components/heroes.md` — Heroes
- `components/testimonials.md` — Testimonials


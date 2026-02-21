# 21st.dev Component Skill: Testimonials

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 15+
> **Training Data:** 54 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Testimonials components with unique designs every time.

---

## 1. Core Techniques (Observed in Real Components)

The following techniques were found across the 54 analyzed Testimonials implementations:

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
- **Three.js / React Three Fiber**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @headlessui/react @radix-ui/react-aspect-ratio @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-icons @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-slot @react-hook/media-query @tabler/icons-react class-variance-authority clsx embla-carousel-react framer-motion lucide-react motion next next-themes react-icons react-pageflip
```

| Dependency | Purpose |
|---|---|
| `@headlessui/react` | Utility |
| `@radix-ui/react-aspect-ratio` | Headless accessible primitives |
| `@radix-ui/react-avatar` | Headless accessible primitives |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-scroll-area` | Headless accessible primitives |
| `@radix-ui/react-separator` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@react-hook/media-query` | Utility |
| `@tabler/icons-react` | Utility |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `embla-carousel-react` | Carousel engine |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `next-themes` | Next.js framework feature |
| `react-icons` | Utility |
| `react-pageflip` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `3d-book-testimonial.tsx`
- `3d-testimonails.tsx`
- `animated-cards-stack.tsx`
- `animated-testimonials.tsx`
- `avatar.tsx`
- `circular-testimonials.tsx`
- `clean-testimonial.tsx`
- `demo.tsx`
- `glass-testimonial-swiper.tsx`
- `image-testimonial-grid.tsx`
- `kinetic-shatter-box-section.tsx`
- `meteors.tsx`
- `minimal-testimonial.tsx`
- `multi-media-testimonial.tsx`
- `premium-testimonials.tsx`
- `retro-testimonial.tsx`
- `shiny-button.tsx`
- `simple-animated-testimonials.tsx`
- `spinning-logos.tsx`
- `stagger-testimonials.tsx`
- ...and 17 more variants

## 4. Props & Variant Patterns

### CVA Variant Names Found
- `dark`
- `default`
- `default (size)`
- `destructive`
- `ghost`
- `icon (size)`
- `lg (size)`
- `light`
- `link`
- `outline`
- `secondary`
- `sm (size)`

### Custom Props Found
- `api`
- `ariaLabel`
- `ariaLive`
- `ariaRole`
- `arrayLength`
- `asChild`
- `author`
- `authorHandle`
- `authorImage`
- `authorName`
- `authorPosition`
- `autoFill`
- `autoRotateInterval`
- `autoplay`
- `avatarPath`
- `badgeText`
- `cardSize`
- `colors`
- `columns`
- `company`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { cn } from "@/lib/utils";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
```

### Pattern 2
```tsx
import { motion } from 'framer-motion';

export function TestimonialCard ({ handleShuffle, testimonial, position, id, author }) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? "2" : position === "middle" ? "1" : "0"
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%"
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onDragStart={(e) => {
        dragRef.current = e.clientX;
      }}
```

### Pattern 3
```tsx
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  return (
    <section className={cn(
      "bg-background text-foreground",
      "py-12 sm:py-24 md:py-32 px-0",
      className
    )}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:40s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/testimonial.tsx`
2. Install required dependencies: `@headlessui/react, @radix-ui/react-aspect-ratio, @radix-ui/react-avatar`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `testimonialVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Testimonials must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Testimonials components:

1. **Never repeat a design** — with 15+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

# 21st.dev Component Skill: Carousels

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 16+
> **Training Data:** 38 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Carousels components with unique designs every time.

---

## 1. Core Techniques (Observed in Real Components)

The following techniques were found across the 38 analyzed Carousels implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
- **Embla Carousel**
- **Framer Motion animations**
- **Framer Motion useMotionValue**
- **GSAP animation library**
- **Glassmorphism / backdrop blur**
- **HTML Canvas rendering**
- **Intersection Observer API**
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
- **ResizeObserver API**
- **Tailwind CSS Animate plugin**
- **Three.js / React Three Fiber**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @ark-ui/react @gsap/react @radix-ui/react-avatar @radix-ui/react-slot @react-three/drei @react-three/fiber class-variance-authority clsx embla-carousel embla-carousel-autoplay embla-carousel-react framer-motion gsap lucide-react motion next radix-ui tailwind-merge three
```

| Dependency | Purpose |
|---|---|
| `@ark-ui/react` | Utility |
| `@gsap/react` | Professional animation |
| `@radix-ui/react-avatar` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@react-three/drei` | 3D rendering |
| `@react-three/fiber` | 3D rendering |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `embla-carousel` | Carousel engine |
| `embla-carousel-autoplay` | Carousel engine |
| `embla-carousel-react` | Carousel engine |
| `framer-motion` | Physics-based animations |
| `gsap` | Professional animation |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `radix-ui` | Headless accessible primitives |
| `tailwind-merge` | Class composition |
| `three` | 3D rendering |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `3d-gallery-photography.tsx`
- `animated-carousel.tsx`
- `animated-sections-1.tsx`
- `carousel-1.tsx`
- `carousel-circular-image-gallery.tsx`
- `carousel.tsx`
- `circular-gallery.tsx`
- `demo.tsx`
- `economic-calendar.tsx`
- `elegant-carousel.tsx`
- `feature-carousel.tsx`
- `features-detail.tsx`
- `focus-rail.tsx`
- `full-screen-scroll-fx.tsx`
- `gallery-hover-carousel.tsx`
- `integration-hero.tsx`
- `interactive-scrolling-story-component.tsx`
- `offer-carousel.tsx`
- `offers-carousel.tsx`
- `orbiting-skills.tsx`
- ...and 8 more variants

## 4. Props & Variant Patterns

### CVA Variant Names Found
- `accent`
- `away`
- `busy`
- `dashed`
- `default`
- `default (size)`
- `destructive`
- `dim`
- `foreground`
- `ghost`
- `icon (size)`
- `info`
- `inverse`
- `lg (size)`
- `link`
- `md (size)`
- `mono`
- `offline`
- `online`
- `outline`
- `primary`
- `secondary`
- `sm (size)`
- `success`
- `warning`
- `xs (size)`

### Custom Props Found
- `activeSlider`
- `alt`
- `angle`
- `animationDelay`
- `asChild`
- `autoPlay`
- `autoRotateSpeed`
- `config`
- `ctaText`
- `disabled`
- `dotClassName`
- `duration`
- `events`
- `falloff`
- `far`
- `fastDuration`
- `glowColor`
- `headerTitle`
- `icon`
- `id`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
```

### Pattern 2
```tsx
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
```

### Pattern 3
```tsx
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/carousel.tsx`
2. Install required dependencies: `@ark-ui/react, @gsap/react, @radix-ui/react-avatar`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `carouselVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Carousels must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Carousels components:

1. **Never repeat a design** — with 16+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

# 21st.dev Component Skill: Scroll Areas

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 24+
> **Training Data:** 37 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Scroll Areas components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 37 analyzed Scroll Areas implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
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
- **Tailwind CSS Animate plugin**
- **Three.js / React Three Fiber**
- **cmdk command palette**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @base-ui-components/react @motionone/utils @radix-ui/react-dialog @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @studio-freight/lenis class-variance-authority clsx cmdk framer-motion lucide-react motion radix-ui
```

| Dependency | Purpose |
|---|---|
| `@base-ui-components/react` | Utility |
| `@motionone/utils` | Utility |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-popover` | Headless accessible primitives |
| `@radix-ui/react-scroll-area` | Headless accessible primitives |
| `@radix-ui/react-separator` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-switch` | Headless accessible primitives |
| `@radix-ui/react-tabs` | Headless accessible primitives |
| `@studio-freight/lenis` | Utility |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `cmdk` | Command palette |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `radix-ui` | Headless accessible primitives |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `container-scroll-animation.tsx`
- `demo.tsx`
- `desert-drift.tsx`
- `dialog.tsx`
- `horizontal-scroll-carousel.tsx`
- `marquee-effect.tsx`
- `marquee.tsx`
- `modern-timeline.tsx`
- `parallax-scroll.tsx`
- `robot-flyby.tsx`
- `scroll-and-swap-text.tsx`
- `scroll-area-1.tsx`
- `scroll-area.tsx`
- `scroll-based-velocity.tsx`
- `scroll-button.tsx`
- `scroll-expansion-hero.tsx`
- `scroll-linked-spring-animation.tsx`
- `scroll-progress.tsx`
- `scroll-velocity.tsx`
- `sticky-scroll-reveal.tsx`
- ...and 9 more variants

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
- `animate`
- `animatePresenceInitial`
- `animatePresenceMode`
- `asChild`
- `auto`
- `baseVelocity`
- `bgImageSrc`
- `clamp`
- `containerRef`
- `contentLayoutClassName`
- `date`
- `default_velocity`
- `disabled`
- `dotClassName`
- `elementLevelClassName`
- `exit`
- `headerContentLayoutClassName`
- `headerContentWrapperClassName`
- `icon`
- `id`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
interface XScrollProps extends ScrollAreaProps {}

export default function XScroll({ children, className, ...props }: XScrollProps) {
  return (
    <div className="flex">
      <ScrollArea className={cn('w-1 flex-1', className)} {...props}>
        {children}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

demo.tsx
'use client';

import * as React from "react"
import XScroll from '@/components/ui/x-scroll';

function Demo() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="mx-auto w-[50vw] rounded-md border border-dashed">
        <XScroll>
          <div className="flex gap-4 p-6">
            {Array.from({ length: 20 }, (v, i) => (
              <div key={i} className="grid size-32 shrink-0 place-items-center rounded-md bg-gray-200 shadow-md">
```

### Pattern 2
```tsx
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
```

### Pattern 3
```tsx
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/scroll-area.tsx`
2. Install required dependencies: `@base-ui-components/react, @motionone/utils, @radix-ui/react-dialog`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `scroll-areaVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Scroll Areas must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Scroll Areas components:

1. **Never repeat a design** — with 24+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Scroll Areas component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Vertical scroll container with custom scrollbar
2. Horizontal scroll strip
3. Dual-axis scroll (2D pan)
4. Virtual scroll for large lists
5. Snap-scroll sections

### 🎨 Surface Axis
1. Custom thin scrollbar (brand-color thumb)
2. Hidden scrollbar (thumb on hover only)
3. Glass scrollbar on dark content
4. Progress indicator bar instead of scrollbar
5. No scrollbar (gesture/button scroll only)

### ⚡ Motion Axis
1. Smooth scroll with easing (lenis)
2. Snap scroll (CSS scroll-snap)
3. Parallax layers at different scroll speeds
4. Scroll progress bar animates
5. Fade edges: content fades at top/bottom edges

### 🎭 Mood Axis
1. System — native-feel but styled scrollbar
2. Infinite feed — hidden scrollbar, endless content
3. App — snap sections, full-viewport pages
4. Dashboard — compact scroll areas, data tables
5. Creative — horizontal scroll, parallax, immersive

### 🧩 Composition Axis
1. Long content area in sidebar
2. Table body scroll
3. Chat message history scroll
4. Settings panel with overflow
5. Gallery horizontal scroll strip

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Glass Scrollbar
Radix Scroll Area with custom 6px scrollbar thumb in brand-color. Track is transparent. Thumb has rounded-full corners. Thumb fades in on hover/scroll, fades out after 1.5s idle. Content area has gradient fade at top and bottom edges (transparent→background).

### Recipe 2: Snap Carousel
horizontal scroll area with CSS scroll-snap-type: x mandatory. Items snap to center. Active (snapped) item enlarges slightly. Navigation dots below reflect position. Touch-friendly. Gradient mask fades edges.

### Recipe 3: Lenis Smooth
Lenis smooth scroll wrapper for an entire page section. Provides buttery 60fps scrolling with easing. Scroll progress bar at right edge (thin line). Parallax layers within content move at different rates. Premium scroll feel.

### Recipe 4: Virtual List
virtualized scroll for 10,000+ items. Only visible items render. Scroll through at any speed without lag. Skeleton items flash briefly at edges. Custom scrollbar with position indicator. Overscan 5 items for smooth scrolling.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Sidebars**
- **Chat panels**
- **Code previews**
- **Long content sections**

## 13. 🔗 Composes With

Load these companion blueprints when building with Scroll Areas:

- `components/sidebars.md` — Sidebars
- `components/ai-chats.md` — AI Chats
- `components/tables.md` — Tables
- `components/cards.md` — Cards


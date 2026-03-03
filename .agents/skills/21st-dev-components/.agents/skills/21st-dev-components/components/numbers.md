# 21st.dev Component Skill: Numbers

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 18+
> **Training Data:** 29 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Numbers components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 29 analyzed Numbers implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
- **Framer Motion animations**
- **Framer Motion spring physics**
- **Framer Motion useTransform**
- **Glassmorphism / backdrop blur**
- **Lucide React icons**
- **Next.js Image optimization**
- **Radix UI primitives**
- **React effects**
- **React refs**
- **React state management**
- **React useMemo optimization**
- **React.forwardRef pattern**
- **Tailwind CSS Animate plugin**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @base-ui-components/react @number-flow/react @radix-ui/react-slot class-variance-authority clsx framer-motion lucide-react motion next react-aria-components react-icons react-use-measure
```

| Dependency | Purpose |
|---|---|
| `@base-ui-components/react` | Utility |
| `@number-flow/react` | Utility |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `react-aria-components` | Utility |
| `react-icons` | Utility |
| `react-use-measure` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `7-segment-number.tsx`
- `activity-with-number-flow.tsx`
- `animated-counter.tsx`
- `button.tsx`
- `component.tsx`
- `correct-number-input.tsx`
- `count-down-numbers.tsx`
- `countdown-number.tsx`
- `demo.tsx`
- `flip-countdown.tsx`
- `input.tsx`
- `number-field-1.tsx`
- `number-flip-counter.tsx`
- `number-flow.tsx`
- `numberfield.tsx`
- `numeric-input.tsx`
- `numeric-scrubber.tsx`
- `orbiting-skills.tsx`
- `ruixen-feature-section.tsx`
- `shuffle-number.tsx`
- ...and 2 more variants

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
- `angle`
- `animationDelay`
- `asChild`
- `config`
- `defaultValue`
- `description`
- `endDate`
- `errorMessage`
- `glowColor`
- `label`
- `max`
- `min`
- `onChange`
- `opacity`
- `radius`
- `rotation`
- `scrubSensitivity`
- `startDate`
- `step`
- `type`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
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

### Pattern 2
```tsx
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",
          type === "search" &&
            "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
          type === "file" &&
            "p-0 pr-3 italic text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };


demo.tsx
```

### Pattern 3
```tsx
import * as React from "react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm shadow-black/5 transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50",
          type === "search" &&
            "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
          type === "file" &&
            "p-0 pr-3 italic text-muted-foreground/70 file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:not-italic file:text-foreground",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };


demo.tsx
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/number.tsx`
2. Install required dependencies: `@base-ui-components/react, @number-flow/react, @radix-ui/react-slot`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `numberVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Numbers must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Numbers components:

1. **Never repeat a design** — with 18+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Numbers component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Large stat number with label
2. Counter grid (multiple stats)
3. Number input stepper
4. Animated counter inline
5. Metric card with sparkline

### 🎨 Surface Axis
1. Dark card with large mono number
2. Glass panel with counter
3. Gradient text on dark background
4. Outlined metric card
5. Number with colored background

### ⚡ Motion Axis
1. Count-up animation on scroll visibility
2. Number flip/roll animation on change
3. Sparkline draws on mount
4. Stepper value bounces on change
5. Odometer-style digit roll

### 🎭 Mood Axis
1. Dashboard — compact, precise, data-dense
2. Marketing — large, impressive, conversion-focused
3. Financial — decimal precision, trend arrows, green/red
4. Scientific — units, notation, monospace
5. Playful — oversized, colorful, fun animations

### 🧩 Composition Axis
1. Dashboard KPI metric
2. Homepage social proof stats
3. Pricing plan number display
4. Analytics counter widget
5. Score/rating display

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Odometer Counter
large display number where each digit rolls vertically (odometer-style) when value changes. Digits roll independently. Spring physics on the roll. Monospace font. Label below in text-xs muted. Scroll-triggered initial count-up from 0.

### Recipe 2: Metric Card
glass card containing: large number (text-5xl, mono), trend arrow (up green / down red), percentage change, sparkline chart, and label. Number counts up on scroll visibility. Sparkline draws with stroke animation. Card hovers with lift + shadow.

### Recipe 3: Flip Counter
event countdown style. Each digit is a flip card that animates top-half rotate down to reveal new digit. Used for countdown timers (DD:HH:MM:SS) or live counters. Dark background, light text. Digit separators with colons. Bold, physical feel.

### Recipe 4: Gradient Stat
large number (text-7xl) with gradient text (brand spectrum). Below: label in text-sm muted. Numbers count up from 0 on intersection observer trigger. Optional '+' suffix animated. Used for marketing stats like '10M+', '99.9%'.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Dashboard KPIs**
- **Pricing display**
- **Statistics section**
- **Counters**

## 13. 🔗 Composes With

Load these companion blueprints when building with Numbers:

- `components/cards.md` — Cards
- `components/badges.md` — Badges
- `components/icons.md` — Icons


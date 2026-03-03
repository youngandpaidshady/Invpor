# 21st.dev Component Skill: Comparisons

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 6+
> **Training Data:** 9 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Comparisons components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 9 analyzed Comparisons implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
- **Framer Motion animations**
- **Framer Motion spring physics**
- **Framer Motion useMotionValue**
- **Framer Motion useTransform**
- **GLSL shaders**
- **Glassmorphism / backdrop blur**
- **HTML Canvas rendering**
- **Lucide React icons**
- **Next.js Image optimization**
- **Radix UI primitives**
- **React effects**
- **React refs**
- **React state management**
- **React useCallback optimization**
- **React useMemo optimization**
- **React.forwardRef pattern**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @app/ @radix-ui/react-icons @radix-ui/react-select @radix-ui/react-slot @tabler/icons-react @tsparticles/engine @tsparticles/react @tsparticles/slim class-variance-authority framer-motion lucide-react motion next next-themes shiki
```

| Dependency | Purpose |
|---|---|
| `@app/` | Utility |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-select` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@tabler/icons-react` | Utility |
| `@tsparticles/engine` | Utility |
| `@tsparticles/react` | Utility |
| `@tsparticles/slim` | Utility |
| `class-variance-authority` | Variant management |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `next-themes` | Next.js framework feature |
| `shiki` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `assisted-password-confirmation.tsx`
- `code-comparison.tsx`
- `compare.tsx`
- `comparison-table.tsx`
- `demo.tsx`
- `feature-with-image-comparison.tsx`
- `image-comparison.tsx`
- `lightning-split.tsx`
- `table.tsx`

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
- `afterCode`
- `asChild`
- `autoplay`
- `autoplayDuration`
- `beforeCode`
- `darkTheme`
- `filename`
- `firstImage`
- `firstImageClassName`
- `initialSliderPercentage`
- `language`
- `leftAlt`
- `leftComponent`
- `leftImage`
- `lightTheme`
- `rightAlt`
- `rightComponent`
- `rightImage`
- `secondImage`
- `secondImageClassname`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { useEffect, useState } from 'react'

export function AssistedPasswordConfirmation({password}:{password: sting}) {
  const [confirmPassword, setConfirmPassword] = useState('')
  const [shake, setShake] = useState(false)

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (
      confirmPassword.length >= password.length &&
      e.target.value.length > confirmPassword.length
    ) {
      setShake(true)
    } else {
      setConfirmPassword(e.target.value)
    }
  }

  useEffect(() => {
    if (shake) {
      const timer = setTimeout(() => setShake(false), 500)
      return () => clearTimeout(timer)
    }
  }, [shake])

  const getLetterStatus = (letter: string, index: number) => {
```

### Pattern 2
```tsx
import { GripVertical } from "lucide-react";

function Feature() {
  const [inset, setInset] = useState<number>(50);
  const [onMouseDown, setOnMouseDown] = useState<boolean>(false);

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }
    
    const percentage = (x / rect.width) * 100;
    setInset(percentage);
  };

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4">
          <div>
```

### Pattern 3
```tsx
import { cn } from "@/lib/utils";

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => <thead ref={ref} className={cn(className)} {...props} />);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/comparison.tsx`
2. Install required dependencies: `@app/, @radix-ui/react-icons, @radix-ui/react-select`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `comparisonVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Comparisons must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Comparisons components:

1. **Never repeat a design** — with 6+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Comparisons component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Two-column side-by-side
2. Toggle switch (before/after)
3. Slider divider (drag to reveal)
4. Stacked cards with highlight
5. Table-format feature matrix

### 🎨 Surface Axis
1. Glass panels on gradient background
2. Outlined sections with accent headers
3. Solid dark cards with border-white/10
4. Image-based before/after
5. Chart/data visualization comparison

### ⚡ Motion Axis
1. Slider handle drag with real-time reveal
2. Toggle switch flips between views
3. Scroll-triggered side-by-side slide-in
4. Counter animations for stat comparisons
5. Highlight pulse on winning values

### 🎭 Mood Axis
1. Product comparison — feature checkmarks
2. Before/After — image slider dramatic reveal
3. Pricing tiers — side by side, highlight best
4. Data-driven — charts, percentages, counters
5. Technical — spec tables, detailed metrics

### 🧩 Composition Axis
1. Pricing page plan comparison
2. Product page before/after
3. Feature page competitor matrix
4. Results showcase improvement stats
5. Dashboard metric comparison cards

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Drag Reveal
two images layered with a draggable vertical divider. Drag handle has a grip icon with left/right arrows. Left side clips to divider position. Smooth drag with momentum. Labels 'Before'/'After' at top. Handle glows on hover.

### Recipe 2: Metric Duel
two cards side by side, each with stats. Better values highlighted in green with upward arrow icon. Numbers count-up animate on scroll enter. Winner card has subtle brand-color border glow. Header labels each side.

### Recipe 3: Toggle Compare
single area with toggle switch at top. Switch between 'Plan A' and 'Plan B' (or Before/After). Content crossfades with slide transition. Active option label is bold/highlighted. Clean, focused comparison.

### Recipe 4: Feature Matrix
table-style grid with feature rows. Two+ columns for compared items. Checkmarks (green) and X marks (red/muted). Row striping. Highlighted 'recommended' column with brand-color header + glow. Sticky column headers on scroll.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Pricing page**
- **Product comparison**
- **Feature matrix**

## 13. 🔗 Composes With

Load these companion blueprints when building with Comparisons:

- `components/tables.md` — Tables
- `components/cards.md` — Cards
- `components/badges.md` — Badges
- `components/buttons.md` — Buttons
- `components/tabs.md` — Tabs


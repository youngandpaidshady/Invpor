# 21st.dev Component Skill: Borders

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 12+
> **Training Data:** 31 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Borders components with unique designs every time.

---

## 1. Core Techniques (Observed in Real Components)

The following techniques were found across the 31 analyzed Borders implementations:

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
- **GSAP animation library**
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
- **ResizeObserver API**
- **Tailwind CSS Animate plugin**
- **cmdk command palette**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @gsap/react @paper-design/shaders-react @radix-ui/react-dialog @radix-ui/react-slot @radix-ui/react-tooltip class-variance-authority dicons framer-motion gsap lucide-react motion next-themes react-fast-marquee usehooks-ts
```

| Dependency | Purpose |
|---|---|
| `@gsap/react` | Professional animation |
| `@paper-design/shaders-react` | Utility |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `class-variance-authority` | Variant management |
| `dicons` | Utility |
| `framer-motion` | Physics-based animations |
| `gsap` | Professional animation |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next-themes` | Next.js framework feature |
| `react-fast-marquee` | Utility |
| `usehooks-ts` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `animated-glow-card.tsx`
- `animated-glowing-search-bar.tsx`
- `animated-gradient-border.tsx`
- `aurora-button.tsx`
- `bauhaus-card.tsx`
- `border-beam.tsx`
- `border-trail.tsx`
- `demo.tsx`
- `dot-pattern-1.tsx`
- `dynamic-border-animations-card.tsx`
- `glowing-effect.tsx`
- `glowing-shadow.tsx`
- `hero.tsx`
- `hover-border-gradient.tsx`
- `joblisting-component.tsx`
- `lamp-tooltip.tsx`
- `moving-border.tsx`
- `multi-type-ripple-buttons.tsx`
- `neon-button.tsx`
- `omni-command-palette.tsx`
- ...and 8 more variants

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
- `solid`

### Custom Props Found
- `ChronicleButtonHoverColor`
- `accent`
- `accentColor`
- `anchor`
- `animationMode`
- `animationSpeed`
- `area`
- `asChild`
- `authorHandle`
- `authorImage`
- `authorName`
- `backgroundColor`
- `blur`
- `borderRadius`
- `borderWidth`
- `chronicleButtonBg`
- `chronicleButtonFg`
- `chronicleButtonHoverFg`
- `color`
- `colorFrom`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "relative group border text-foreground mx-auto text-center rounded-full",
    {
        variants: {
            variant: {
                default: "bg-blue-500/5 hover:bg-blue-500/0 border-blue-500/20",
                solid: "bg-blue-500 hover:bg-blue-600 text-white border-transparent hover:border-foreground/50 transition-all duration-200",
                ghost: "border-transparent bg-transparent hover:border-zinc-600 hover:bg-white/10",
            },
            size: {
                default: "px-7 py-1.5 ",
                sm: "px-4 py-0.5 ",
                lg: "px-10 py-2.5 ",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { neon?: boolean }
```

### Pattern 2
```tsx
}

export function AuroraButton({
  className,
  children,
  glowClassName,
  ...props
}: AuroraButtonProps) {
  return (
    <div className="relative">
      {/* Gradient border container */}
      <div
        className={cn(
          "absolute -inset-[2px] rounded-lg bg-gradient-to-r from-purple-500 via-cyan-300 to-emerald-400 opacity-75 blur-lg transition-all",
          "group-hover:opacity-100 group-hover:blur-xl",
          glowClassName
        )}
      />

      {/* Button */}
      <button
        className={cn(
          "relative rounded-lg bg-slate-950/90 px-4 py-2",
          "text-slate-100 shadow-xl",
          "transition-all hover:bg-slate-950/70",
          "group border border-slate-800",
          className
```

### Pattern 3
```tsx
  [key: string]: any;
}
export function DotPattern({
  width = 24,
  height = 24,
  x = 0,
  y = 0,
  cx = 1,
  cy = 0.5,
  cr = 0.5,
  className,
  ...props
}: DotPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-slate-500/50 md:fill-slate-500/70",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/border.tsx`
2. Install required dependencies: `@gsap/react, @paper-design/shaders-react, @radix-ui/react-dialog`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `borderVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Borders must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Borders components:

1. **Never repeat a design** — with 12+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

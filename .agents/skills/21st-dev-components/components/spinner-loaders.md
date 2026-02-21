# 21st.dev Component Skill: Spinner Loaders

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 21+
> **Training Data:** 36 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Spinner Loaders components with unique designs every time.

---

## 1. Core Techniques (Observed in Real Components)

The following techniques were found across the 36 analyzed Spinner Loaders implementations:

- **ARIA accessibility attributes**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Framer Motion animations**
- **Glassmorphism / backdrop blur**
- **Lucide React icons**
- **Radix UI primitives**
- **React effects**
- **React refs**
- **React state management**
- **React useCallback optimization**
- **React useMemo optimization**
- **React.forwardRef pattern**
- **Tailwind CSS Animate plugin**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @radix-ui/react-icons @radix-ui/react-slot class-variance-authority clsx framer-motion lucide-react motion radix-ui
```

| Dependency | Purpose |
|---|---|
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `radix-ui` | Headless accessible primitives |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `action-button.tsx`
- `ai-input-with-loading.tsx`
- `animated-loading-skeleton.tsx`
- `bouncing-dots.tsx`
- `button-1.tsx`
- `button.tsx`
- `customizable-loader-spinner-transition.tsx`
- `demo.tsx`
- `input.tsx`
- `ios-spinner.tsx`
- `loader-one.tsx`
- `loader.tsx`
- `loading-dots.tsx`
- `luma-spin.tsx`
- `message-loading.tsx`
- `morphing-square.tsx`
- `orbital-loader.tsx`
- `preloader.tsx`
- `progress.tsx`
- `quantum-pulse-loade.tsx`
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
- `md (size)`
- `muted`
- `outline`
- `primary`
- `secondary`
- `sm (size)`
- `xl (size)`
- `xs (size)`

### Custom Props Found
- `as`
- `asChild`
- `autoAnimate`
- `bars`
- `blue`
- `color`
- `completed`
- `defaultValue`
- `disabled`
- `dots`
- `duration`
- `fullWidth`
- `green`
- `id`
- `invert`
- `lg`
- `loading`
- `loadingDuration`
- `loadingText`
- `maxHeight`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx


const LoaderOne = () => {
    return (
        <div className="flex items-center justify-center gap-1">
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="h-3 w-3 rounded-full bg-blue-500"
                    initial={{ x: 0 }}
                    animate={{
                        x: [0, 10, 0],
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                    }}
                />
            ))}
        </div>
    )
}

export default LoaderOne
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

1. Create the component file in `/components/ui/spinner-loader.tsx`
2. Install required dependencies: `@radix-ui/react-icons, @radix-ui/react-slot, class-variance-authority`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `spinner-loaderVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Spinner Loaders must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Spinner Loaders components:

1. **Never repeat a design** — with 21+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

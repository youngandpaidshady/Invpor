# 21st.dev Component Skill: Radio Groups

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 22+
> **Training Data:** 60 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Radio Groups components with unique designs every time.

---

## 1. Core Techniques (Observed in Real Components)

The following techniques were found across the 60 analyzed Radio Groups implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
- **Framer Motion animations**
- **Lucide React icons**
- **Next.js Link routing**
- **Radix UI primitives**
- **React effects**
- **React refs**
- **React state management**
- **React useMemo optimization**
- **React.forwardRef pattern**
- **Tailwind CSS Animate plugin**
- **Three.js / React Three Fiber**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @ark-ui/react @base-ui-components/react @radix-ui/react-label @radix-ui/react-radio-group @remixicon/react class-variance-authority clsx lucide-react motion next react-aria-components styled-components tailwind-merge
```

| Dependency | Purpose |
|---|---|
| `@ark-ui/react` | Utility |
| `@base-ui-components/react` | Utility |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-radio-group` | Headless accessible primitives |
| `@remixicon/react` | Utility |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `react-aria-components` | Utility |
| `styled-components` | Utility |
| `tailwind-merge` | Class composition |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `3d-radio-group.tsx`
- `animated-radio.tsx`
- `base-menu.tsx`
- `choicebox-1.tsx`
- `circular-fan-speed-knob.tsx`
- `demo.tsx`
- `emoji-radio-group.tsx`
- `glass-radio-group.tsx`
- `liquid-radio.tsx`
- `radial-selector.tsx`
- `radio-group-1.tsx`
- `radio-group-card.tsx`
- `radio-group.tsx`
- `radio.tsx`
- `rating-scale-group.tsx`
- `review-filter-bars.tsx`
- `sentiment-radio-group.tsx`

## 4. Props & Variant Patterns

### CVA Variant Names Found
- `dashed`
- `default`
- `default (size)`
- `destructive`
- `dim`
- `foreground`
- `ghost`
- `icon (size)`
- `inverse`
- `lg (size)`
- `md (size)`
- `mono`
- `outline`
- `primary`
- `secondary`
- `sm (size)`

### Custom Props Found
- `as`
- `asChild`
- `bgActive`
- `bgDefault`
- `bgHover`
- `borderRadius`
- `capitalize`
- `checked`
- `defaultValue`
- `description`
- `direction`
- `disabled`
- `error`
- `errorMessage`
- `fgActive`
- `fgDefault`
- `fgHover`
- `fontFamily`
- `fontSize`
- `fontWeight`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
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

### Pattern 2
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

1. Create the component file in `/components/ui/radio-group.tsx`
2. Install required dependencies: `@ark-ui/react, @base-ui-components/react, @radix-ui/react-label`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `radio-groupVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Radio Groups must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Radio Groups components:

1. **Never repeat a design** — with 22+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

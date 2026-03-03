# 21st.dev Component Skill: Radio Groups

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 22+
> **Training Data:** 60 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Radio Groups components with unique designs every time.

---

## 1. Core Techniques

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

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Radio Groups component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Vertical list of radio items
2. Horizontal button group
3. Card-select radio (entire card is option)
4. Segmented control bar
5. Visual option picker (image + label)

### 🎨 Surface Axis
1. Custom circle indicator with brand-color fill
2. Button-style toggle group
3. Glass card options
4. Outlined cards with active brand border
5. Minimal dot indicator only

### ⚡ Motion Axis
1. Indicator fill scales from center with spring
2. Active card lifts + brand border transitions
3. Segmented slider moves between options
4. Check icon pops in with bounce
5. Card options hover with subtle lift

### 🎭 Mood Axis
1. Form standard — clean circles, label right
2. Pricing — card options, feature details each
3. Settings — segmented control, compact, efficient
4. Creative — image thumbnails as options
5. Survey — large buttons, easy tap targets

### 🧩 Composition Axis
1. Form option selection
2. Plan/tier selector
3. Settings preference choice
4. Filter mode switcher
5. Survey/quiz answer picker

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Spring Dot
custom radio with animated indicator dot. On select: dot scales from 0 to full size with spring overshoot. Outer ring in muted border, fills with brand-color on select. Label and optional description right. Clean, satisfying micro-interaction.

### Recipe 2: Card Selector
each option is a glass card with icon, title, description. Selected card gets brand-color border + subtle background tint + check badge corner. Unselected: muted border. Cards hover-lift. Used for plan or feature selection.

### Recipe 3: Segmented Bar
pill-shaped bar with options as segments. Active segment has brand-color background pill that slides between options (layoutId animation). Text contrast adjusts. Spring physics on slide. Compact, app-like control.

### Recipe 4: Visual Picker
grid of image-thumbnail options. Each: image, label below. Selected: brand-color ring glow + check overlay. Unselected: muted border. Hover: lift + enlarge preview. Used for theme/color/avatar selection.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Forms**
- **Settings**
- **Preference selection**
- **Pricing toggle**

## 13. 🔗 Composes With

Load these companion blueprints when building with Radio Groups:

- `components/forms.md` — Forms
- `components/cards.md` — Cards


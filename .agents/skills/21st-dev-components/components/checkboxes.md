# 21st.dev Component Skill: Checkboxes

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 19+
> **Training Data:** 40 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Checkboxes components with unique designs every time.

---

## 1. Core Techniques (Observed in Real Components)

The following techniques were found across the 40 analyzed Checkboxes implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
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
- **Recharts / charting**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @ark-ui/react @radix-ui/react-checkbox @radix-ui/react-label @radix-ui/react-slot @subframe/core class-variance-authority framer-motion lucide-react react-aria-components
```

| Dependency | Purpose |
|---|---|
| `@ark-ui/react` | Utility |
| `@radix-ui/react-checkbox` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@subframe/core` | Utility |
| `class-variance-authority` | Variant management |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `react-aria-components` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `checkbox-02.tsx`
- `checkbox-1.tsx`
- `checkbox-group-1.tsx`
- `demo.tsx`
- `project-management-dashboard.tsx`
- `smart-combo-box.tsx`

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
- `asChild`
- `checked`
- `description`
- `error`
- `errorMessage`
- `helpText`
- `horizontal`
- `label`
- `onCheckedChange`
- `validation`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { FieldError, Label, labelVariants } from "@/components/ui/text-field-basic"

const CheckboxGroup = AriaCheckboxGroup

const Checkbox = ({ className, children, ...props }: AriaCheckboxProps) => (
  <AriaCheckbox
    className={composeRenderProps(className, (className) =>
      cn(
        "group/checkbox flex items-center gap-x-2",
        /* Disabled */
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70",
        labelVariants,
        className
      )
    )}
    {...props}
  >
    {composeRenderProps(children, (children, renderProps) => (
      <>
        <div
          className={cn(
            "flex size-4 shrink-0 items-center justify-center rounded-sm border border-primary text-current ring-offset-background",
            /* Focus Visible */
            "group-data-[focus-visible]/checkbox:outline-none group-data-[focus-visible]/checkbox:ring-2 group-data-[focus-visible]/checkbox:ring-ring group-data-[focus-visible]/checkbox:ring-offset-2",
            /* Selected */
            "group-data-[indeterminate]/checkbox:bg-primary group-data-[selected]/checkbox:bg-primary group-data-[indeterminate]/checkbox:text-primary-foreground  group-data-[selected]/checkbox:text-primary-foreground",
            /* Disabled */
```

### Pattern 2
```tsx
import { FieldError, Label, labelVariants } from "@/components/ui/text-field-basic"

const CheckboxGroup = AriaCheckboxGroup

const Checkbox = ({ className, children, ...props }: AriaCheckboxProps) => (
  <AriaCheckbox
    className={composeRenderProps(className, (className) =>
      cn(
        "group/checkbox flex items-center gap-x-2",
        /* Disabled */
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70",
        labelVariants,
        className
      )
    )}
    {...props}
  >
    {composeRenderProps(children, (children, renderProps) => (
      <>
        <div
          className={cn(
            "flex size-4 shrink-0 items-center justify-center rounded-sm border border-primary text-current ring-offset-background",
            /* Focus Visible */
            "group-data-[focus-visible]/checkbox:outline-none group-data-[focus-visible]/checkbox:ring-2 group-data-[focus-visible]/checkbox:ring-ring group-data-[focus-visible]/checkbox:ring-offset-2",
            /* Selected */
            "group-data-[indeterminate]/checkbox:bg-primary group-data-[selected]/checkbox:bg-primary group-data-[indeterminate]/checkbox:text-primary-foreground  group-data-[selected]/checkbox:text-primary-foreground",
            /* Disabled */
```

### Pattern 3
```tsx
import { FieldError, Label, labelVariants } from "@/components/ui/text-field-basic"

const CheckboxGroup = AriaCheckboxGroup

const Checkbox = ({ className, children, ...props }: AriaCheckboxProps) => (
  <AriaCheckbox
    className={composeRenderProps(className, (className) =>
      cn(
        "group/checkbox flex items-center gap-x-2",
        /* Disabled */
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70",
        labelVariants,
        className
      )
    )}
    {...props}
  >
    {composeRenderProps(children, (children, renderProps) => (
      <>
        <div
          className={cn(
            "flex size-4 shrink-0 items-center justify-center rounded-sm border border-primary text-current ring-offset-background",
            /* Focus Visible */
            "group-data-[focus-visible]/checkbox:outline-none group-data-[focus-visible]/checkbox:ring-2 group-data-[focus-visible]/checkbox:ring-ring group-data-[focus-visible]/checkbox:ring-offset-2",
            /* Selected */
            "group-data-[indeterminate]/checkbox:bg-primary group-data-[selected]/checkbox:bg-primary group-data-[indeterminate]/checkbox:text-primary-foreground  group-data-[selected]/checkbox:text-primary-foreground",
            /* Disabled */
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/checkbox.tsx`
2. Install required dependencies: `@ark-ui/react, @radix-ui/react-checkbox, @radix-ui/react-label`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `checkboxVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Checkboxes must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Checkboxes components:

1. **Never repeat a design** — with 19+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

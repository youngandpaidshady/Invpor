# 21st.dev Component Skill: Tables

> **Priority:** EXTRA_HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 30+
> **Training Data:** 60 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Tables components with unique designs every time.

---

## 1. Core Techniques (Observed in Real Components)

The following techniques were found across the 60 analyzed Tables implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
- **Framer Motion animations**
- **Glassmorphism / backdrop blur**
- **Lucide React icons**
- **Next.js Image optimization**
- **Next.js Link routing**
- **Radix UI primitives**
- **React Day Picker**
- **React effects**
- **React refs**
- **React state management**
- **React useCallback optimization**
- **React useMemo optimization**
- **React.forwardRef pattern**
- **Recharts / charting**
- **Resizable panels**
- **Tailwind CSS Animate plugin**
- **Vaul drawer component**
- **cn() utility (clsx + tailwind-merge)**
- **date-fns date utilities**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @dnd-kit/core @dnd-kit/modifiers @dnd-kit/sortable @dnd-kit/utilities @mui/material @mui/x-data-grid @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tooltip @tanstack/react-table class-variance-authority clsx date-fns framer-motion lucide-react next-themes radix-ui react-aria-components react-day-picker react-icons react-resizable tailwind-merge zustand
```

| Dependency | Purpose |
|---|---|
| `@dnd-kit/core` | Utility |
| `@dnd-kit/modifiers` | Utility |
| `@dnd-kit/sortable` | Utility |
| `@dnd-kit/utilities` | Utility |
| `@mui/material` | Utility |
| `@mui/x-data-grid` | Utility |
| `@radix-ui/react-alert-dialog` | Headless accessible primitives |
| `@radix-ui/react-avatar` | Headless accessible primitives |
| `@radix-ui/react-checkbox` | Headless accessible primitives |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-dropdown-menu` | Headless accessible primitives |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-popover` | Headless accessible primitives |
| `@radix-ui/react-progress` | Headless accessible primitives |
| `@radix-ui/react-radio-group` | Headless accessible primitives |
| `@radix-ui/react-scroll-area` | Headless accessible primitives |
| `@radix-ui/react-select` | Headless accessible primitives |
| `@radix-ui/react-separator` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `@tanstack/react-table` | Utility |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `date-fns` | Date formatting |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `next-themes` | Next.js framework feature |
| `radix-ui` | Headless accessible primitives |
| `react-aria-components` | Utility |
| `react-day-picker` | Utility |
| `react-icons` | Utility |
| `react-resizable` | Utility |
| `tailwind-merge` | Class composition |
| `zustand` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `animated-table-rows.tsx`
- `animated-table.tsx`
- `basic-data-table.tsx`
- `column-collaboration-table.tsx`
- `comparison-table.tsx`
- `component.tsx`
- `contacts-table-with-modal.tsx`
- `contributors-overview-table.tsx`
- `data-table-filter.tsx`
- `data-table.tsx`
- `demo.tsx`
- `financial-markets-table.tsx`
- `fixed-header-footer-table.tsx`
- `flexi-filter-table.tsx`
- `inline-analytics-table.tsx`
- `leads-data-table.tsx`
- `list-2.tsx`
- `member-list.tsx`
- `minimisable-table.tsx`
- `pricing-table.tsx`
- ...and 12 more variants

## 4. Props & Variant Patterns

### CVA Variant Names Found
- `active`
- `default`
- `default (size)`
- `destructive`
- `ghost`
- `icon (size)`
- `inProgress`
- `info`
- `lg (size)`
- `link`
- `md (size)`
- `onHold`
- `outline`
- `primary`
- `secondary`
- `sm (size)`
- `success`
- `warning`
- `xs (size)`

### Custom Props Found
- `action`
- `asChild`
- `column`
- `columnKey`
- `contactId`
- `contacts`
- `dark`
- `default`
- `description`
- `disabled`
- `dotClassName`
- `employeeId`
- `employees`
- `enableAnimations`
- `errorMessage`
- `expanded`
- `heading`
- `indexId`
- `indices`
- `isResizable`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer size-4 shrink-0 rounded border border-input shadow-sm shadow-black/5 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=indeterminate]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      {props.checked === "indeterminate" ? (
        <svg
          width="9"
          height="9"
          viewBox="0 0 9 9"
          fill="currentcolor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.75 4.5C0.75 4.08579 1.08579 3.75 1.5 3.75H7.5C7.91421 3.75 8.25 4.08579 8.25 4.5C8.25 4.91421 7.91421 5.25 7.5 5.25H1.5C1.08579 5.25 0.75 4.91421 0.75 4.5Z"
```

### Pattern 2
```tsx
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer size-4 shrink-0 rounded border border-input shadow-sm shadow-black/5 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=indeterminate]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      {props.checked === "indeterminate" ? (
        <svg
          width="9"
          height="9"
          viewBox="0 0 9 9"
          fill="currentcolor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.75 4.5C0.75 4.08579 1.08579 3.75 1.5 3.75H7.5C7.91421 3.75 8.25 4.08579 8.25 4.5C8.25 4.91421 7.91421 5.25 7.5 5.25H1.5C1.08579 5.25 0.75 4.91421 0.75 4.5Z"
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

1. Create the component file in `/components/ui/table.tsx`
2. Install required dependencies: `@dnd-kit/core, @dnd-kit/modifiers, @dnd-kit/sortable`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `tableVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Tables must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Tables components:

1. **Never repeat a design** — with 30+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

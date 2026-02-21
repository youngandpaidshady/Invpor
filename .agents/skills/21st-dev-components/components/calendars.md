# 21st.dev Component Skill: Calendars

> **Priority:** EXTRA_HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 34+
> **Training Data:** 35 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Calendars components with unique designs every time.

---

## 1. Core Techniques (Observed in Real Components)

The following techniques were found across the 35 analyzed Calendars implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CVA (class-variance-authority) variants**
- **Framer Motion animations**
- **Lucide React icons**
- **Next.js Link routing**
- **Radix UI primitives**
- **React Day Picker**
- **React effects**
- **React refs**
- **React state management**
- **React useMemo optimization**
- **React.forwardRef pattern**
- **Tailwind CSS Animate plugin**
- **cn() utility (clsx + tailwind-merge)**
- **date-fns date utilities**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @internationalized/date @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-slot class-variance-authority clsx date-fns date-fns-tz framer-motion little-date lucide-react motion react-aria-components react-day-picker tailwind-merge
```

| Dependency | Purpose |
|---|---|
| `@internationalized/date` | Utility |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-popover` | Headless accessible primitives |
| `@radix-ui/react-select` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `date-fns` | Date formatting |
| `date-fns-tz` | Date formatting |
| `framer-motion` | Physics-based animations |
| `little-date` | Utility |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `react-aria-components` | Utility |
| `react-day-picker` | Utility |
| `tailwind-merge` | Class composition |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `calendar-date-and-time-picker.tsx`
- `calendar-date-and-time-range.tsx`
- `calendar-date-picker.tsx`
- `calendar-date-time-range.tsx`
- `calendar-day-picker.tsx`
- `calendar-input.tsx`
- `calendar-with-booked-days.tsx`
- `calendar-with-day-button.tsx`
- `calendar-with-disabled-days.tsx`
- `calendar-with-disabled-weekends.tsx`
- `calendar-with-event-slots.tsx`
- `calendar-with-little-date.tsx`
- `calendar-with-localisation.tsx`
- `calendar-with-range-selection.tsx`
- `calendar-with-start-end-month.tsx`
- `calendar-with-time-picker-inline.tsx`
- `calendar-with-time-piker.tsx`
- `calendar-with-time-pressets.tsx`
- `calendar.tsx`
- `calender.tsx`
- ...and 8 more variants

## 4. Props & Variant Patterns

### CVA Variant Names Found
- `default`
- `default (size)`
- `destructive`
- `disabled`
- `ghost`
- `icon (size)`
- `lg (size)`
- `link`
- `outline`
- `outside`
- `secondary`
- `selected`
- `sm (size)`
- `today`

### Custom Props Found
- `allowClear`
- `asChild`
- `coach`
- `colSpan`
- `color`
- `compact`
- `date`
- `day`
- `direction`
- `disabled`
- `enableAnimations`
- `end`
- `error`
- `event`
- `from`
- `fullWidth`
- `height`
- `hideOverflow`
- `horizontalLayout`
- `icon`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
```

### Pattern 2
```tsx
import { Calendar, CalendarProps } from "@/components/ui/calendar-rac";

export interface DateViewerProps extends CalendarProps {}

const DateViewer = React.forwardRef<HTMLDivElement, DateViewerProps>(
  ({ className, ...props }, ref) => {
    return (
      <Calendar
        ref={ref}
        className={`rounded-lg border shadow-sm ${className}`}
        {...props}
      />
    );
  }
);

DateViewer.displayName = "DateViewer";

export default DateViewer;

demo.tsx
// demo.tsx
"use client";

import * as React from "react";
import { useState } from "react";
import DateViewer from "@/components/ui/calendar";
```

### Pattern 3
```tsx
import { Calendar } from "@/components/ui/calendar";

const DualCalendarWithPreset = React.forwardRef<
  React.ElementRef<typeof Calendar>,
  React.ComponentPropsWithoutRef<typeof Calendar>
>((props, ref) => {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12)
  );

  return (
    <Calendar
      mode="single"
      defaultMonth={date}
      numberOfMonths={2}
      selected={date}
      onSelect={setDate}
      className="rounded-lg border shadow-sm"
      {...props}
      ref={ref}
    />
  );
});

DualCalendarWithPreset.displayName = "DualCalendarWithPreset";

export default DualCalendarWithPreset;
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/calendar.tsx`
2. Install required dependencies: `@internationalized/date, @radix-ui/react-icons, @radix-ui/react-label`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `calendarVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Calendars must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Calendars components:

1. **Never repeat a design** — with 34+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

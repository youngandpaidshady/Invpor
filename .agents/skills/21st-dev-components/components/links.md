# 21st.dev Component Skill: Links

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 13+
> **Training Data:** 34 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Links components with unique designs every time.

---

## 1. Core Techniques (Observed in Real Components)

The following techniques were found across the 34 analyzed Links implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
- **Framer Motion animations**
- **Framer Motion spring physics**
- **Framer Motion useMotionValue**
- **Glassmorphism / backdrop blur**
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
- **Sonner toast library**
- **Tailwind CSS Animate plugin**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @radix-ui/react-dialog @radix-ui/react-hover-card @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-select @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tooltip class-variance-authority clsx framer-motion lucide-react motion next qss radix-ui react-aria-components react-icons sonner
```

| Dependency | Purpose |
|---|---|
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-hover-card` | Headless accessible primitives |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-select` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-switch` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `qss` | Utility |
| `radix-ui` | Headless accessible primitives |
| `react-aria-components` | Utility |
| `react-icons` | Utility |
| `sonner` | Toast notifications |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `alert.tsx`
- `banner.tsx`
- `breadcramb.tsx`
- `button-1.tsx`
- `button.tsx`
- `card-26.tsx`
- `clip-path-links.tsx`
- `css-link.tsx`
- `demo.tsx`
- `dialog.tsx`
- `flip-links.tsx`
- `footer-1.tsx`
- `footer-section.tsx`
- `hover-link-preview.tsx`
- `input.tsx`
- `link-card.tsx`
- `link-preview.tsx`
- `link-shortner.tsx`
- `link.tsx`
- `list-box.tsx`
- ...and 7 more variants

## 4. Props & Variant Patterns

### CVA Variant Names Found
- `border`
- `dashed`
- `default`
- `default (size)`
- `destructive`
- `dim`
- `error`
- `foreground`
- `ghost`
- `icon (size)`
- `info`
- `inverse`
- `lg (size)`
- `link`
- `md (size)`
- `mono`
- `muted`
- `outline`
- `primary`
- `secondary`
- `sm (size)`
- `success`
- `warning`

### Custom Props Found
- `action`
- `asChild`
- `badgeText`
- `color`
- `columns`
- `copyright`
- `description`
- `disabled`
- `fullWidth`
- `href`
- `icon`
- `imageAlt`
- `imageUrl`
- `isClosable`
- `layout`
- `loading`
- `logoAlt`
- `logoSrc`
- `onClick`
- `onClose`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
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

1. Create the component file in `/components/ui/link.tsx`
2. Install required dependencies: `@radix-ui/react-dialog, @radix-ui/react-hover-card, @radix-ui/react-icons`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `linkVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Links must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Links components:

1. **Never repeat a design** — with 13+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

# 21st.dev Component Skill: Toasts

> **Priority:** STANDARD
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 2+
> **Training Data:** 27 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Toasts components with unique designs every time.

---

## 1. Core Techniques (Observed in Real Components)

The following techniques were found across the 27 analyzed Toasts implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Framer Motion animations**
- **Glassmorphism / backdrop blur**
- **Lucide React icons**
- **Next.js Link routing**
- **Radix UI primitives**
- **React effects**
- **React refs**
- **React state management**
- **React useCallback optimization**
- **React.forwardRef pattern**
- **Sonner toast library**
- **Tailwind CSS Animate plugin**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @ark-ui/react @base-ui-components/react @headlessui/react @heroicons/react @phosphor-icons/react @radix-ui/react-slot class-variance-authority clsx framer-motion lucide-react next-themes sonner
```

| Dependency | Purpose |
|---|---|
| `@ark-ui/react` | Utility |
| `@base-ui-components/react` | Utility |
| `@headlessui/react` | Utility |
| `@heroicons/react` | Utility |
| `@phosphor-icons/react` | Utility |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `next-themes` | Next.js framework feature |
| `sonner` | Toast notifications |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `alert-toast.tsx`
- `basic-toast.tsx`
- `default.tsx`
- `demo.tsx`
- `feedback-toast.tsx`
- `google-drive-uploader-toast.tsx`
- `sonner.tsx`
- `splashed-push-notifications.tsx`
- `toast-1.tsx`
- `toast-save.tsx`
- `toast.tsx`
- `ultra-quality-toast.tsx`

## 4. Props & Variant Patterns

### CVA Variant Names Found
- `default`
- `default (size)`
- `destructive`
- `error`
- `ghost`
- `icon (size)`
- `info`
- `lg (size)`
- `link`
- `outline`
- `secondary`
- `sm (size)`
- `success`
- `warning`

### Custom Props Found
- `actions`
- `asChild`
- `blue`
- `color`
- `description`
- `disabled`
- `duration`
- `fullWidth`
- `green`
- `highlightTitle`
- `initialText`
- `lg`
- `loading`
- `loadingText`
- `md`
- `message`
- `onClick`
- `onClose`
- `onDismiss`
- `onReset`

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
type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

```

### Pattern 3
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

## 6. Integration Workflow

1. Create the component file in `/components/ui/toast.tsx`
2. Install required dependencies: `@ark-ui/react, @base-ui-components/react, @headlessui/react`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `toastVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Toasts must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Toasts components:

1. **Never repeat a design** — with 2+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

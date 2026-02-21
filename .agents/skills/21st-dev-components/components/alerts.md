# 21st.dev Component Skill: Alerts

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 23+
> **Training Data:** 34 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Alerts components with unique designs every time.

---

## 1. Core Techniques (Observed in Real Components)

The following techniques were found across the 34 analyzed Alerts implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Framer Motion animations**
- **GLSL shaders**
- **Glassmorphism / backdrop blur**
- **HTML Canvas rendering**
- **Lucide React icons**
- **Radix UI primitives**
- **React effects**
- **React refs**
- **React state management**
- **React useCallback optimization**
- **React.forwardRef pattern**
- **Recharts / charting**
- **Sonner toast library**
- **Tailwind CSS Animate plugin**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @headlessui/react @heroicons/react @paper-design/shaders-react @radix-ui/react-alert-dialog @radix-ui/react-slot @remixicon/react @subframe/core class-variance-authority clsx framer-motion lucide-react motion next-themes radix-ui sonner tailwind-merge usehooks-ts
```

| Dependency | Purpose |
|---|---|
| `@headlessui/react` | Utility |
| `@heroicons/react` | Utility |
| `@paper-design/shaders-react` | Utility |
| `@radix-ui/react-alert-dialog` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@remixicon/react` | Utility |
| `@subframe/core` | Utility |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next-themes` | Next.js framework feature |
| `radix-ui` | Headless accessible primitives |
| `sonner` | Toast notifications |
| `tailwind-merge` | Class composition |
| `usehooks-ts` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `alert-1.tsx`
- `alert-banner.tsx`
- `alert-card.tsx`
- `alert-dialog-icon.tsx`
- `alert.tsx`
- `background-plus.tsx`
- `banner.tsx`
- `bg-gredient.tsx`
- `blue-meshy-background.tsx`
- `card-8.tsx`
- `custom-alert.tsx`
- `default.tsx`
- `demo.tsx`
- `error-alert-dialog.tsx`
- `flip-card.tsx`
- `hero-section.tsx`
- `hero.tsx`
- `hud-status-1.tsx`
- `joblisting-component.tsx`
- `mono-alerts.tsx`
- ...and 8 more variants

## 4. Props & Variant Patterns

### CVA Variant Names Found
- `dashed`
- `default`
- `default (size)`
- `destructive`
- `dim`
- `error`
- `foreground`
- `ghost`
- `gradient`
- `icon (size)`
- `info`
- `information`
- `inverse`
- `lg (size)`
- `link`
- `md (size)`
- `mono`
- `outline`
- `premium`
- `primary`
- `secondary`
- `sm (size)`
- `success`
- `warning`

### Custom Props Found
- `actions`
- `alertMessage`
- `animateOnLoad`
- `asChild`
- `backgroundColor`
- `bg`
- `buttonText`
- `c1`
- `c2`
- `c3`
- `climb`
- `climbUnit`
- `close`
- `color`
- `colors`
- `customColors`
- `description`
- `dismissible`
- `distance`
- `distanceUnit`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export function HyperText({
  text,
  duration = 800,
  framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 3 },
  },
  className,
  animateOnLoad = true,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text.split(""));
  const [trigger, setTrigger] = useState(false);
  const interations = useRef(0);
  const isFirstRender = useRef(true);

  const triggerAnimation = () => {
    interations.current = 0;
    setTrigger(true);
  };

```

### Pattern 2
```tsx
}

const typeStyles = {
  success: "bg-green-100 text-green-800 border-green-300",
  error: "bg-red-100 text-red-800 border-red-300",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
  info: "bg-blue-100 text-blue-800 border-blue-300",
};

const fadeInBlur = {
  initial: { opacity: 0, filter: "blur(10px)", y: 10, rotate: 0 },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    rotate: 0,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const Alert: React.FC<AlertProps> = ({
  type = "info",
  message = "This is an alert message.",
  onClick,
}) => {
  return (
    <motion.div
```

### Pattern 3
```tsx


export function Component() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button>Icon Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex items-center gap-2">
                        <Trash2 className="h-5 w-5 " />
                        <AlertDialogTitle>Delete Account</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/alert.tsx`
2. Install required dependencies: `@headlessui/react, @heroicons/react, @paper-design/shaders-react`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `alertVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Alerts must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Alerts components:

1. **Never repeat a design** — with 23+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

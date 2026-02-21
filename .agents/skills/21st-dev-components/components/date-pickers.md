# 21st.dev Component Skill: Date Pickers

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 12+
> **Training Data:** 21 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Date Pickers components with unique designs every time.

---

## 1. Core Techniques (Observed in Real Components)

The following techniques were found across the 21 analyzed Date Pickers implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
- **Framer Motion animations**
- **Framer Motion useMotionValue**
- **Framer Motion useTransform**
- **Glassmorphism / backdrop blur**
- **Lucide React icons**
- **Radix UI primitives**
- **React Day Picker**
- **React effects**
- **React refs**
- **React state management**
- **React useCallback optimization**
- **React useMemo optimization**
- **React.forwardRef pattern**
- **Tailwind CSS Animate plugin**
- **cn() utility (clsx + tailwind-merge)**
- **date-fns date utilities**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @ark-ui/react @radix-ui/react-icons @radix-ui/react-popover @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot class-variance-authority date-fns framer-motion lucide-react react-day-picker
```

| Dependency | Purpose |
|---|---|
| `@ark-ui/react` | Utility |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-popover` | Headless accessible primitives |
| `@radix-ui/react-scroll-area` | Headless accessible primitives |
| `@radix-ui/react-select` | Headless accessible primitives |
| `@radix-ui/react-separator` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `class-variance-authority` | Variant management |
| `date-fns` | Date formatting |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `react-day-picker` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `calendar-lume.tsx`
- `calendar-planner.tsx`
- `calendar-scheduler.tsx`
- `calendar-twin.tsx`
- `calendar-with-presets.tsx`
- `date-picker.tsx`
- `date-time-picker.tsx`
- `date-wheel-picker.tsx`
- `delivery-scheduler.tsx`
- `demo.tsx`
- `dropdown-multi-calendar.tsx`
- `dropdown-range-date-picker.tsx`
- `event-aquarium-calendar.tsx`
- `event-scheduler.tsx`
- `image-cursor-trail.tsx`
- `monthly-heatmap-calendar.tsx`
- `multi-month-calendar.tsx`
- `multi-select-calendar-card.tsx`
- `particle-flow-calendar.tsx`
- `side-panel-multi-calendar.tsx`
- ...and 2 more variants

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
- `selected`
- `sm (size)`

### Custom Props Found
- `ariaLabel`
- `asChild`
- `centerOffset`
- `date`
- `dateTime`
- `disabled`
- `distance`
- `fadeAnimation`
- `imgClass`
- `index`
- `info`
- `initialDate`
- `isSelected`
- `item`
- `itemHeight`
- `items`
- `locale`
- `maxNumberOfImages`
- `maxYear`
- `minYear`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { SparklesIcon } from "lucide-react"

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ")
}

interface ImageMouseTrailProps {
  items: string[]
  children?: ReactNode
  className?: string
  imgClass?: string
  distance?: number
  maxNumberOfImages?: number
  fadeAnimation?: boolean
}

function ImageCursorTrail({
  items,
  children,
  className,
  maxNumberOfImages = 5,
  imgClass = "w-40 h-48",
  distance = 20,
  fadeAnimation = false,
}: ImageMouseTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const refs = useRef(items.map(() => createRef<HTMLImageElement>()))
```

### Pattern 2
```tsx
import { cn } from "@/lib/utils"

export default function DateTimePicker() {
  const [date, setDate] = React.useState<Date>()
  const [hour, setHour] = React.useState("12")
  const [minute, setMinute] = React.useState("00")
  const [ampm, setAmpm] = React.useState("AM")

  // Final combined DateTime
  const selectedDateTime = React.useMemo(() => {
    if (!date) return null
    const d = new Date(date)
    let h = parseInt(hour)
    if (ampm === "PM" && h < 12) h += 12
    if (ampm === "AM" && h === 12) h = 0
    d.setHours(h, parseInt(minute), 0, 0)
    return d
  }, [date, hour, minute, ampm])

  return (
    <div className="flex flex-col gap-4">
      {/* Date Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-[250px] justify-start text-left font-normal", !date && "text-muted-foreground")}
```

### Pattern 3
```tsx
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components: userComponents,
  ...props
}: CalendarProps) {
  const defaultClassNames = {
    months: "relative flex flex-col sm:flex-row gap-4",
    month: "w-full",
    month_caption: "relative mx-10 mb-1 flex h-9 items-center justify-center z-20",
    caption_label: "text-sm font-medium",
    nav: "absolute top-0 flex w-full justify-between z-10",
    button_previous: cn(
      buttonVariants({ variant: "ghost" }),
      "size-9 text-muted-foreground/80 hover:text-foreground p-0",
    ),
    button_next: cn(
      buttonVariants({ variant: "ghost" }),
      "size-9 text-muted-foreground/80 hover:text-foreground p-0",
    ),
    weekday: "size-9 p-0 text-xs font-medium text-muted-foreground/80",
    day_button:
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/date-picker.tsx`
2. Install required dependencies: `@ark-ui/react, @radix-ui/react-icons, @radix-ui/react-popover`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `date-pickerVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Date Pickers must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Date Pickers components:

1. **Never repeat a design** — with 12+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

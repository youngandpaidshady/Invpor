# 21st.dev Component Skill: Sliders

> **Priority:** EXTRA_HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 45+
> **Training Data:** 60 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Sliders components with unique designs every time.

---

## 1. Core Techniques (Observed in Real Components)

The following techniques were found across the 60 analyzed Sliders implementations:

- **ARIA accessibility attributes**
- **CSS gradients**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
- **Framer Motion animations**
- **Framer Motion spring physics**
- **Framer Motion useMotionValue**
- **Framer Motion useTransform**
- **GSAP animation library**
- **Glassmorphism / backdrop blur**
- **HTML Canvas rendering**
- **Lucide React icons**
- **Next.js Image optimization**
- **Next.js Link routing**
- **Radix UI primitives**
- **React Hook Form**
- **React effects**
- **React refs**
- **React state management**
- **React useCallback optimization**
- **React useMemo optimization**
- **React.forwardRef pattern**
- **ResizeObserver API**
- **Sonner toast library**
- **Tailwind CSS Animate plugin**
- **Three.js / React Three Fiber**
- **Zod schema validation**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @headlessui/react @hookform/resolvers @number-flow/react @radix-ui/react-label @radix-ui/react-select @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tooltip @tsparticles/react @tsparticles/slim class-variance-authority clsx dicons framer-motion gsap lucide-react motion next next-themes qrcode qrcode.react react-aria-components react-hook-form react-use-measure sonner tailwind-merge zod
```

| Dependency | Purpose |
|---|---|
| `@headlessui/react` | Utility |
| `@hookform/resolvers` | Utility |
| `@number-flow/react` | Utility |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-select` | Headless accessible primitives |
| `@radix-ui/react-slider` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-switch` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `@tsparticles/react` | Utility |
| `@tsparticles/slim` | Utility |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `dicons` | Utility |
| `framer-motion` | Physics-based animations |
| `gsap` | Professional animation |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `next-themes` | Next.js framework feature |
| `qrcode` | Utility |
| `qrcode.react` | Utility |
| `react-aria-components` | Utility |
| `react-hook-form` | Form state management |
| `react-use-measure` | Utility |
| `sonner` | Toast notifications |
| `tailwind-merge` | Class composition |
| `zod` | Schema validation |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `code.tsx`
- `component.tsx`
- `demo.tsx`
- `dual-range-slider.tsx`
- `dynamic-text-slider.tsx`
- `elegant-carousel.tsx`
- `feedback-slider.tsx`
- `form.tsx`
- `graaadeints.tsx`
- `gradient-selector-card.tsx`
- `image-comparison-slider-horizontal.tsx`
- `image-comparison-slider-vertical.tsx`
- `image-comparison-slider.tsx`
- `image-swiper.tsx`
- `infinite-slider-horizontal.tsx`
- `infinite-slider.tsx`
- `pricing-slider-loops.tsx`
- `progressive-blur.tsx`
- `qr-code.tsx`
- `range-slider.tsx`
- ...and 10 more variants

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
- `altBottom`
- `altLeft`
- `altRight`
- `altTop`
- `asChild`
- `badge`
- `bottomImage`
- `config`
- `data`
- `defaultSelected`
- `defaultValue`
- `handleIcon`
- `image`
- `images`
- `index`
- `initialPosition`
- `label`
- `labelFormatter`
- `labelPosition`
- `leftImage`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface CustomSliderProps {
    values: number[]
    defaultValue: number
    value?: number
    resetKey?: number
    snapping?: boolean
    min?: number
    max?: number
    step?: number
    onChange: (value: number) => void
    config?: {
        snappingThreshold?: number
        labelFormatter?: (value: number) => string
    }
    label: string
    prefix?: string
    suffix?: string
    className?: string
}

const formatNumber = (value: number, step: number = 1): string => {
```

### Pattern 2
```tsx
} from "@/components/ui/tooltip";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    showTooltip?: boolean;
    tooltipContent?: (value: number) => React.ReactNode;
  }
>(({ className, showTooltip = false, tooltipContent, ...props }, ref) => {
  const [showTooltipState, setShowTooltipState] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<number[]>(
    (props.defaultValue as number[]) ?? (props.value as number[]) ?? [0],
  );

  React.useEffect(() => {
    if (props.value !== undefined) {
      setInternalValue(props.value as number[]);
    }
  }, [props.value]);

  const handleValueChange = (newValue: number[]) => {
    setInternalValue(newValue);
    props.onValueChange?.(newValue);
  };

  const handlePointerDown = () => {
    if (showTooltip) {
```

### Pattern 3
```tsx
} from "@/components/ui/tooltip";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    showTooltip?: boolean;
    tooltipContent?: (value: number) => React.ReactNode;
  }
>(({ className, showTooltip = false, tooltipContent, ...props }, ref) => {
  const [showTooltipState, setShowTooltipState] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState<number[]>(
    (props.defaultValue as number[]) ?? (props.value as number[]) ?? [0],
  );

  React.useEffect(() => {
    if (props.value !== undefined) {
      setInternalValue(props.value as number[]);
    }
  }, [props.value]);

  const handleValueChange = (newValue: number[]) => {
    setInternalValue(newValue);
    props.onValueChange?.(newValue);
  };

  const handlePointerDown = () => {
    if (showTooltip) {
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/slider.tsx`
2. Install required dependencies: `@headlessui/react, @hookform/resolvers, @number-flow/react`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `sliderVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Sliders must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Sliders components:

1. **Never repeat a design** — with 45+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

# 21st.dev Component Skill: Icons

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 10+
> **Training Data:** 17 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Icons components with unique designs every time.

---

## 1. Core Techniques (Observed in Real Components)

The following techniques were found across the 17 analyzed Icons implementations:

- **ARIA accessibility attributes**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Framer Motion animations**
- **Glassmorphism / backdrop blur**
- **Lottie animations**
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
- **Sonner toast library**
- **Tailwind CSS Animate plugin**
- **Zod schema validation**
- **cmdk command palette**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @hookform/resolvers @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-popover @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tooltip class-variance-authority cmdk framer-motion lottie-web lucide-react motion next radix-ui react-hook-form sonner tailwind-merge zod
```

| Dependency | Purpose |
|---|---|
| `@hookform/resolvers` | Utility |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-menubar` | Headless accessible primitives |
| `@radix-ui/react-popover` | Headless accessible primitives |
| `@radix-ui/react-scroll-area` | Headless accessible primitives |
| `@radix-ui/react-separator` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `class-variance-authority` | Variant management |
| `cmdk` | Command palette |
| `framer-motion` | Physics-based animations |
| `lottie-web` | Utility |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `radix-ui` | Headless accessible primitives |
| `react-hook-form` | Form state management |
| `sonner` | Toast notifications |
| `tailwind-merge` | Class composition |
| `zod` | Schema validation |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `animated-weather-icons.tsx`
- `button-1.tsx`
- `demo.tsx`
- `dock.tsx`
- `facebook.tsx`
- `icon-picker-3.tsx`
- `icons.tsx`
- `integrations-section.tsx`
- `interactive-animated-arrow-icon.tsx`
- `menubar.tsx`
- `moon.tsx`
- `multi-orbit-semi-circle.tsx`
- `personal-landing.tsx`
- `smartphone-charging.tsx`
- `social-icons.tsx`
- `vibrate.tsx`

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
- `link`
- `md (size)`
- `mono`
- `outline`
- `primary`
- `secondary`
- `sm (size)`

### Custom Props Found
- `asChild`
- `heightClassName`
- `icon`
- `iconName`
- `icons`
- `items`
- `onIconSelect`
- `selectedIcon`
- `size`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { motion, useAnimation } from 'framer-motion';

const SmartphoneChargingIcon = () => {
  const controls = useAnimation();

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={() => {
        controls.start('animate');
      }}
      onMouseLeave={() => {
        controls.start('normal');
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
```

### Pattern 2
```tsx
import { motion, useAnimation } from 'motion/react';

const rectVariants: Variants = {
  normal: {
    rotate: 0,
  },
  animate: {
    rotate: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: 0.4,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
    },
  },
};

const VibrateIcon = () => {
  const controls = useAnimation();

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
```

### Pattern 3
```tsx
import { motion, useAnimation } from 'motion/react';

const svgVariants: Variants = {
  normal: {
    rotate: 0,
  },
  animate: {
    rotate: [0, -10, 10, -5, 5, 0],
  },
};

const svgTransition: Transition = {
  duration: 1.2,
  ease: 'easeInOut',
};

const MoonIcon = () => {
  const controls = useAnimation();

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center overflow-hidden"
      onMouseEnter={() => controls.start('animate')}
      onMouseLeave={() => controls.start('normal')}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/icon.tsx`
2. Install required dependencies: `@hookform/resolvers, @radix-ui/react-dialog, @radix-ui/react-label`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `iconVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Icons must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Icons components:

1. **Never repeat a design** — with 10+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

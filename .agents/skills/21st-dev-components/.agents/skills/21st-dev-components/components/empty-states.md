# 21st.dev Component Skill: Empty States

> **Priority:** STANDARD
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 1+
> **Training Data:** 13 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Empty States components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 13 analyzed Empty States implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
- **Framer Motion animations**
- **Glassmorphism / backdrop blur**
- **HTML Canvas rendering**
- **Lucide React icons**
- **Next.js Image optimization**
- **Next.js Link routing**
- **Radix UI primitives**
- **React effects**
- **React refs**
- **React state management**
- **React useCallback optimization**
- **React.forwardRef pattern**
- **Tailwind CSS Animate plugin**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @radix-ui/react-avatar @radix-ui/react-slot class-variance-authority clsx framer-motion lucide-react next next-themes tailwindcss
```

| Dependency | Purpose |
|---|---|
| `@radix-ui/react-avatar` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `next` | Next.js framework feature |
| `next-themes` | Next.js framework feature |
| `tailwindcss` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `404-page-not-found.tsx`
- `case-studies.tsx`
- `combobox.tsx`
- `demo.tsx`
- `empty-state-beautiful-accessible-no-data-states.tsx`
- `empty-state.tsx`
- `empty.tsx`
- `ghost-404-page.tsx`
- `glitchy-404-1.tsx`
- `interactive-empty-state.tsx`
- `not-found-page-1.tsx`
- `not-found-page-2.tsx`
- `state.tsx`

## 4. Props & Variant Patterns

### CVA Variant Names Found
- `default`
- `default (size)`
- `destructive`
- `ghost`
- `icon`
- `icon (size)`
- `lg (size)`
- `link`
- `outline`
- `secondary`
- `sm (size)`

### Custom Props Found
- `action`
- `actionIcon`
- `actionLabel`
- `asChild`
- `color`
- `description`
- `disabled`
- `error`
- `errored`
- `event`
- `fullWidth`
- `height`
- `icon`
- `icons`
- `imageUrl`
- `label`
- `loading`
- `mainIcon`
- `message`
- `onActionClick`

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
import { ArrowRight } from 'lucide-react';

export  function FlowButton({ text = "Modern Button" }: { text?: string }) {
  return (
    <button className="group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] border-[#333333]/40 bg-transparent px-8 py-3 text-sm font-semibold text-[#111111] cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:text-white hover:rounded-[12px] active:scale-[0.95]">
      {/* Left arrow (arr-2) */}
      <ArrowRight 
        className="absolute w-4 h-4 left-[-25%] stroke-[#111111] fill-none z-[9] group-hover:left-4 group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
      />

      {/* Text */}
      <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
        {text}
      </span>

      {/* Circle */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#111111] rounded-[50%] opacity-0 group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]"></span>

      {/* Right arrow (arr-1) */}
      <ArrowRight 
        className="absolute w-4 h-4 right-4 stroke-[#111111] fill-none z-[9] group-hover:right-[-25%] group-hover:stroke-white transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
      />
    </button>
  );
}
```

### Pattern 3
```tsx
import clsx from "clsx";

const types = {
  base: "rounded-md shadow-border",
  small: "rounded-md shadow-border-small",
  medium: "rounded-xl shadow-border-medium",
  large: "rounded-xl shadow-border-large",
  tooltip: "rounded-md shadow-tooltip",
  menu: "rounded-xl shadow-menu",
  modal: "rounded-xl shadow-modal",
  fullscreen: "rounded-2xl shadow-fullscreen"
};

interface MaterialProps {
  type: keyof typeof types;
  children: React.ReactNode;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const Material = ({ type, children, className, ref, style, onClick }: MaterialProps) => {
  return (
    <div
      className={clsx(
        "bg-background-100",
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/empty-state.tsx`
2. Install required dependencies: `@radix-ui/react-avatar, @radix-ui/react-slot, class-variance-authority`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `empty-stateVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Empty States must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Empty States components:

1. **Never repeat a design** — with 1+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Empty States component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Centered icon + text stack
2. Illustration + headline + CTA
3. Full-page empty state
4. Inline empty card
5. Split (illustration left, text right)

### 🎨 Surface Axis
1. Subtle gradient background with centered content
2. Dashed border container (drop zone feel)
3. Glass card on dark background
4. Outlined container with muted palette
5. Full-bleed illustration background

### ⚡ Motion Axis
1. Illustration floats with gentle bob animation
2. Text fades in staggered after illustration
3. CTA button springs in last
4. Dashed border animates marching-ants style
5. Parallax layers in illustration on mouse move

### 🎭 Mood Axis
1. Friendly — cute illustration, warm text, helpful CTA
2. Minimal — icon, one line, subtle
3. Onboarding — instructional, numbered steps
4. Error state — muted, recovery action offered
5. Creative — animated character, playful message

### 🧩 Composition Axis
1. Table/list with no data yet
2. Search with zero results
3. Inbox with no messages
4. Dashboard new user first visit
5. File browser empty folder

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Floating Ghost
centered stack with a large (120px) semi-transparent icon that bobs gently (translateY ±8px, 3s loop). Below: headline in muted text, helpful description, and primary CTA button. Button springs in 200ms after text. Clean, calming.

### Recipe 2: Dashed Drop Zone
dashed border rounded-xl container with marching-ants animation. Centered upload icon + 'Drop files here or click to browse' text. Hover: border turns brand-color solid, background tints. Drag-over: scale 1.02 + glow. Looks interactive.

### Recipe 3: Onboard Steps
empty state as an onboarding card. 3 numbered steps with icon + instruction. Steps stagger-in on mount. First incomplete step is highlighted. Completion progress indicator at top. CTA: 'Get Started' at bottom.

### Recipe 4: Illustrated Story
custom SVG illustration (abstract shapes forming a scene). Illustration layers parallax on mouse move. Headline below animation. Brand-color CTA button. Everything fades in with stagger. Premium, not generic.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Dashboard with no data**
- **Search with no results**
- **First-time user views**

## 13. 🔗 Composes With

Load these companion blueprints when building with Empty States:

- `components/buttons.md` — Buttons
- `components/images.md` — Images
- `components/icons.md` — Icons


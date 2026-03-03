# 21st.dev Component Skill: Hooks

> **Priority:** EXTRA_HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 31+
> **Training Data:** 33 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Hooks components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 33 analyzed Hooks implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
- **Framer Motion animations**
- **Framer Motion spring physics**
- **Framer Motion useMotionValue**
- **Glassmorphism / backdrop blur**
- **Lucide React icons**
- **Next.js Image optimization**
- **Radix UI primitives**
- **React effects**
- **React refs**
- **React state management**
- **React useCallback optimization**
- **React useMemo optimization**
- **React.forwardRef pattern**
- **ResizeObserver API**
- **Sonner toast library**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @radix-ui/react-label @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tooltip class-variance-authority framer-motion lodash lodash.debounce lucide-react sonner usehooks-ts
```

| Dependency | Purpose |
|---|---|
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-slider` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-switch` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `class-variance-authority` | Variant management |
| `framer-motion` | Physics-based animations |
| `lodash` | Utility |
| `lodash.debounce` | Utility |
| `lucide-react` | SVG icon library |
| `sonner` | Toast notifications |
| `usehooks-ts` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `demo.tsx`
- `loop-animation-hook.tsx`
- `use-auto-resize-textarea.tsx`
- `use-auto-scroll.tsx`
- `use-boolean.tsx`
- `use-character-limit.tsx`
- `use-click-outside.tsx`
- `use-copy-to-clipboard.tsx`
- `use-counter.tsx`
- `use-debounce-callback.tsx`
- `use-debounce.tsx`
- `use-debounced-dimensions.tsx`
- `use-elastic-line-events.tsx`
- `use-expandable.tsx`
- `use-file-input.tsx`
- `use-image-upload.tsx`
- `use-interval.tsx`
- `use-isomorphic-layout-effect.tsx`
- `use-item-overflow.tsx`
- `use-media-query.tsx`
- ...and 14 more variants

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
- `defaultColors`
- `defaultTags`
- `maxHeight`
- `maxTags`
- `minHeight`
- `onChange`
- `onUpload`
- `placeholder`
- `tags`
- `url`
- `value`

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
};

export function useCharacterLimit({ maxLength, initialValue = "" }: UseCharacterLimitProps) {
  const [value, setValue] = useState(initialValue);
  const [characterCount, setCharacterCount] = useState(initialValue.length);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setValue(newValue);
      setCharacterCount(newValue.length);
    }
  };

  return {
    value,
    characterCount,
    handleChange,
    maxLength,
  };
}

demo.tsx
"use client";

import { useCharacterLimit } from "@/components/hooks/use-character-limit";
import { Input } from "@/components/ui/input";
```

### Pattern 3
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

## 6. Integration Workflow

1. Create the component file in `/components/ui/hook.tsx`
2. Install required dependencies: `@radix-ui/react-label, @radix-ui/react-slider, @radix-ui/react-slot`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `hookVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Hooks must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Hooks components:

1. **Never repeat a design** — with 31+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Hooks component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Code block example with result
2. Hook signature card with params
3. Side-by-side (usage + demo preview)
4. Tabbed (code / demo / docs)
5. List of hook cards

### 🎨 Surface Axis
1. Dark code-editor card
2. Glass card with syntax highlighting
3. Terminal-style monospace panel
4. Clean card with code + description
5. IDE-themed with line numbers

### ⚡ Motion Axis
1. Code typewriter effect on mount
2. Result value animates on change
3. Copy button: checkmark morph on click
4. Tab switch with crossfade
5. Hook demo: live preview updates

### 🎭 Mood Axis
1. Developer — syntax-highlighted, precise, technical
2. Educational — step-by-step, annotated, beginner-friendly
3. Showcase — big demo, minimal code, impressive result
4. Utility — compact card, copy button, essentials only
5. Interactive — adjust params, see result live

### 🧩 Composition Axis
1. Documentation page utility section
2. Library showcase page
3. Playground/sandbox environment
4. Blog post code example
5. Component library hook docs

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Code Card
dark (#0d0d0d) card with syntax-highlighted hook code. Line numbers in muted color left rail. Copy button top-right with click: icon morphs to checkmark for 2s. Card has subtle border-white/5. Title badge above code. Code reveals via typewriter effect on scroll-in.

### Recipe 2: Live Playground
split card: left has editable code (textarea styled as editor), right shows live result preview. Changing params updates result in real-time. Glass card container. Params have slider inputs for numeric values. Result animates on change.

### Recipe 3: Hook Gallery
grid of hook cards. Each card: hook name in mono, one-line description, code snippet preview (3-4 lines), 'Copy' and 'Docs' buttons. Cards hover-lift. Stagger-in on scroll. Grouped by category (State, Effect, UI, Utility).

### Recipe 4: Interactive Demo
centered card with large visual demo of the hook in action (e.g., useMousePosition shows coordinate readout following cursor). Below demo: the hook code. Params adjustable via controls. Responsive, engaging, 'wow' factor.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Any page — utility hooks for animations, scroll, resize, media queries**

## 13. 🔗 Composes With

Load these companion blueprints when building with Hooks:



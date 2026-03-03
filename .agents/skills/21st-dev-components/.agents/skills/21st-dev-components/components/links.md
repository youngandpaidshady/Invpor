# 21st.dev Component Skill: Links

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 13+
> **Training Data:** 34 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Links components with unique designs every time.

---

## 1. Core Techniques

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

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Links component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Inline text link
2. Block link card
3. Navigation link list
4. Link with icon right (arrow)
5. Breadcrumb link chain

### 🎨 Surface Axis
1. Underline with brand-color on hover
2. Background highlight fill on hover
3. Animated underline (slide from left)
4. No underline, color-change only
5. Badge/pill styled link

### ⚡ Motion Axis
1. Underline slides from left to right on hover
2. Background fill transitions from bottom-up
3. Arrow icon slides right on hover
4. Link text color transitions
5. Hover: subtle lift with shadow

### 🎭 Mood Axis
1. Editorial — elegant underline, serif option
2. Navigation — bold, active state indicator
3. Utility — small, muted, functional
4. Creative — animated, colorful, playful
5. Documentation — code-link, monospace, subtle

### 🧩 Composition Axis
1. Inline within paragraph text
2. Navigation sidebar item
3. Footer link column entry
4. Breadcrumb chain element
5. Card/article 'Read more' link

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Slide Underline
inline link with no default underline. On hover: a 2px underline (brand-color) slides in from left to right via scaleX transform (origin left). Color transitions to brand-color. Smooth 200ms transition.

### Recipe 2: Arrow Link
text link with small arrow icon (→) to the right. On hover: arrow slides right 4px with spring transition. Text color shifts. Used for 'Learn more →' style navigation links.

### Recipe 3: Glow Block
block-level link (padding 8px 16px) with no background. On hover: subtle brand-color background at 5% opacity + text brightens. Active: scale 0.98. Used in navigation lists. Active state: brand-color left bar indicator.

### Recipe 4: Breadcrumb Chain
linked items separated by '/' or chevron separator. Each segment is clickable. Last segment is muted (current page). Segments have hover underline. Overflow: collapse middle segments into '...' dropdown. Clean, functional.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Navigation**
- **Footer**
- **Breadcrumbs**
- **Inline text**
- **Cards**

## 13. 🔗 Composes With

Load these companion blueprints when building with Links:

- `components/navigation-menus.md` — Navigation Menus
- `components/footers.md` — Footers
- `components/cards.md` — Cards
- `components/icons.md` — Icons


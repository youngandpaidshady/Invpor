# 21st.dev Component Skill: Menus

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 18+
> **Training Data:** 60 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Menus components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 60 analyzed Menus implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
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
- **React effects**
- **React refs**
- **React state management**
- **React useCallback optimization**
- **React useMemo optimization**
- **React.forwardRef pattern**
- **Recharts / charting**
- **ResizeObserver API**
- **Tailwind CSS Animate plugin**
- **cmdk command palette**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @ark-ui/react @base-ui-components/react @iconify/react @mynaui/icons-react @radix-ui/react-accordion @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-popover @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tabs @radix-ui/react-tooltip @reach/portal @rive-app/react-canvas class-variance-authority clsx cmdk framer-motion gsap lucide-react motion next next-themes radix-ui react-aria-components react-icons usehooks-ts
```

| Dependency | Purpose |
|---|---|
| `@ark-ui/react` | Utility |
| `@base-ui-components/react` | Utility |
| `@iconify/react` | Utility |
| `@mynaui/icons-react` | Utility |
| `@radix-ui/react-accordion` | Headless accessible primitives |
| `@radix-ui/react-avatar` | Headless accessible primitives |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-dropdown-menu` | Headless accessible primitives |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-menubar` | Headless accessible primitives |
| `@radix-ui/react-navigation-menu` | Headless accessible primitives |
| `@radix-ui/react-popover` | Headless accessible primitives |
| `@radix-ui/react-scroll-area` | Headless accessible primitives |
| `@radix-ui/react-separator` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-tabs` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `@reach/portal` | Utility |
| `@rive-app/react-canvas` | Utility |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `cmdk` | Command palette |
| `framer-motion` | Physics-based animations |
| `gsap` | Professional animation |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `next-themes` | Next.js framework feature |
| `radix-ui` | Headless accessible primitives |
| `react-aria-components` | Utility |
| `react-icons` | Utility |
| `usehooks-ts` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `animated-menu-1.tsx`
- `animated-menu.tsx`
- `app-menu-bar.tsx`
- `bottom-menu.tsx`
- `button.tsx`
- `circle-menu.tsx`
- `command-menu.tsx`
- `component.tsx`
- `context-menu-1.tsx`
- `demo.tsx`
- `dock.tsx`
- `dropdown-menu.tsx`
- `expandable-tabs.tsx`
- `feature-section-1.tsx`
- `floating-action-menu.tsx`
- `floating-action-panel.tsx`
- `floating-nav.tsx`
- `flower-menu.tsx`
- `fluid-menu.tsx`
- `footer.tsx`
- ...and 35 more variants

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
- `accentColor`
- `action`
- `active`
- `activeColor`
- `activeItem`
- `align`
- `alt`
- `angle`
- `animationDelay`
- `appName`
- `asChild`
- `buttonProps`
- `callback`
- `closeAnimationCallback`
- `closeIcon`
- `color`
- `config`
- `context`
- `d`
- `description`

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

### Pattern 3
```tsx
gooey-filter.tsx
const GooeyFilter = ({
  id = "goo-filter",
  strength = 10,
}: {
  id?: string
  strength?: number
}) => {
  return (
    <svg className="hidden absolute">
      <defs>
        <filter id={id}>
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={strength}
            result="blur"
          />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/menu.tsx`
2. Install required dependencies: `@ark-ui/react, @base-ui-components/react, @iconify/react`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `menuVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Menus must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Menus components:

1. **Never repeat a design** — with 18+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Menus component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Vertical sidebar navigation
2. Horizontal top nav bar
3. Hamburger → mobile slide-out
4. Mega menu with panels
5. Command palette style

### 🎨 Surface Axis
1. Glass sidebar with blur
2. Solid dark with active item accent
3. Outlined with hover fill
4. Full-height dark panel overlay
5. Floating glass pill bar

### ⚡ Motion Axis
1. Active item indicator slides between items
2. Menu item hover: bg fill transitions
3. Mobile menu slides in from left with spring
4. Sub-menu items stagger fade-in
5. Menu opens with staggered item entrance

### 🎭 Mood Axis
1. Dashboard — icons + labels, collapsible to icon-only
2. Marketing — clean, minimal, brand-focused
3. Documentation — tree structure, search, hierarchical
4. App — bottom tab bar, icon-focused, mobile-first
5. Enterprise — multi-level, breadcrumbs, complex nav

### 🧩 Composition Axis
1. App sidebar navigation
2. Website header nav
3. Mobile hamburger menu
4. Settings page section nav
5. Documentation sidebar

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Glass Sidebar
frosted-glass sidebar (240px wide) with border-right-white/10. Logo at top. Menu items with icon + label. Active item has brand-color left bar indicator that slides between items with spring animation. Hover: subtle bg fill. Collapsible to icon-only (56px) with smooth width transition.

### Recipe 2: Mega Panel
horizontal nav bar item triggers full-width mega dropdown. Panel has multiple columns with grouped links. Featured item large card on right. Panel enters with scaleY from top with spring. Grouped sections with bold headers.

### Recipe 3: Mobile Drawer
hamburger icon triggers full-screen overlay menu. Dark backdrop fades in. Menu panel slides from left with spring. Items stagger-fade-in (50ms delay each). Close X animates from hamburger morphing. Large touch targets.

### Recipe 4: Command Nav
search-activated navigation (⌘K). Modal with search input and categorized results. Type to filter. Keyboard navigation with active highlight. Recent items section. Shortcut badges next to items. Clean, fast, developer-friendly.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Context menus**
- **Right-click menus**
- **Action menus**
- **Navigation**

## 13. 🔗 Composes With

Load these companion blueprints when building with Menus:

- `components/buttons.md` — Buttons
- `components/icons.md` — Icons
- `components/dropdowns.md` — Dropdowns
- `components/navigation-menus.md` — Navigation Menus


# 21st.dev Component Skill: Sidebars

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 10+
> **Training Data:** 21 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Sidebars components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 21 analyzed Sidebars implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
- **Framer Motion animations**
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
- **Resizable panels**
- **Three.js / React Three Fiber**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @carbon/icons-react @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tooltip class-variance-authority framer-motion gsap lucide-react motion react-resizable-panels three
```

| Dependency | Purpose |
|---|---|
| `@carbon/icons-react` | Utility |
| `@radix-ui/react-avatar` | Headless accessible primitives |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-dropdown-menu` | Headless accessible primitives |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-scroll-area` | Headless accessible primitives |
| `@radix-ui/react-separator` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `class-variance-authority` | Variant management |
| `framer-motion` | Physics-based animations |
| `gsap` | Professional animation |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `react-resizable-panels` | Utility |
| `three` | 3D rendering |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `announcement.tsx`
- `chat-template.tsx`
- `dashboard-with-collapsible-sidebar.tsx`
- `demo.tsx`
- `glassmorphism-sidebar.tsx`
- `horizon-hero-section.tsx`
- `info-card.tsx`
- `modern-side-bar.tsx`
- `sidebar-component.tsx`
- `sidebar-news.tsx`
- `sidebar-showcase.tsx`
- `sidebar-with-submenu.tsx`
- `sidebar.tsx`
- `whatsapp-sidebar.tsx`

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
- `animate`
- `asChild`
- `description`
- `dismissType`
- `expandHeight`
- `href`
- `loading`
- `media`
- `onClose`
- `open`
- `setOpen`
- `shrinkHeight`
- `storageKey`
- `title`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    showArrow?: boolean;
  }
>(({ className, sideOffset = 4, showArrow = false, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "relative z-50 max-w-[280px] rounded-lg border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    >
      {props.children}
      {showArrow && (
        <TooltipPrimitive.Arrow className="-my-px fill-popover drop-shadow-[0_1px_0_hsl(var(--border))]" />
```

### Pattern 2
```tsx
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
```

### Pattern 3
```tsx
import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/sidebar.tsx`
2. Install required dependencies: `@carbon/icons-react, @radix-ui/react-avatar, @radix-ui/react-dialog`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `sidebarVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Sidebars must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Sidebars components:

1. **Never repeat a design** — with 10+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Sidebars component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Fixed left sidebar with main content
2. Collapsible sidebar (full ↔ icon-only)
3. Off-canvas drawer sidebar
4. Split sidebar (sections + content)
5. Floating sidebar panel

### 🎨 Surface Axis
1. Glass with border-right-white/10
2. Solid dark with brand-color accents
3. Outlined with section dividers
4. Gradient background sidebar
5. Transparent overlay sidebar

### ⚡ Motion Axis
1. Collapse/expand with width spring animation
2. Menu items stagger-fade on expand
3. Active indicator slides between items
4. Sidebar slides from off-canvas with spring
5. Hover-to-expand from icon-only strip

### 🎭 Mood Axis
1. Dashboard — data nav, icons + labels, collapsible
2. Documentation — tree nav, search, section groups
3. Admin — multi-level, role badges, notifications
4. Creative — minimal, icon-only default, labels on hover
5. Social — profile top, feed sections, quick actions

### 🧩 Composition Axis
1. Application main navigation
2. Settings page section nav
3. Documentation sidebar nav
4. Admin panel navigation
5. Email/chat folder sidebar

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Collapsible Glass
frosted-glass sidebar that collapses between full (240px) and icon-only (56px). Collapse button at bottom toggles with spring width animation. Icons always visible, labels fade in/out. Active item has brand-color left indicator bar (slides with spring). Tooltip shows label in collapsed mode.

### Recipe 2: Off-Canvas Drawer
hidden by default. Hamburger button triggers slide-in from left with spring. Dark overlay backdrop. Sidebar contains: user avatar/name header, nav sections with icons, and footer links. Swipe-to-close on mobile. Clean, mobile-first.

### Recipe 3: Hover Expand
56px icon-only rail by default. Hovering expands to full width (240px) with spring animation. Labels fade in during expansion. Mouse-leave collapses after 300ms delay. Active item has filled icon. Badge counts on nav items.

### Recipe 4: Split Panel
sidebar split into two sections: left thin rail (icon buttons for top-level sections) and right panel (sub-navigation for selected section). Selecting a section in left rail swaps right panel content with crossfade. Clean hierarchy.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Dashboard navigation**
- **Settings panel**
- **Documentation**
- **Admin**

## 13. 🔗 Composes With

Load these companion blueprints when building with Sidebars:

- `components/navigation-menus.md` — Navigation Menus
- `components/icons.md` — Icons
- `components/avatars.md` — Avatars
- `components/badges.md` — Badges
- `components/scroll-areas.md` — Scroll Areas


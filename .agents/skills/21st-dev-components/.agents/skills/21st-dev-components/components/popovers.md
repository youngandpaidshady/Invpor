# 21st.dev Component Skill: Popovers

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 23+
> **Training Data:** 46 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Popovers components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 46 analyzed Popovers implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CVA (class-variance-authority) variants**
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
- **React useMemo optimization**
- **React.forwardRef pattern**
- **Recharts / charting**
- **Tailwind CSS Animate plugin**
- **Vaul drawer component**
- **cmdk command palette**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @ark-ui/react @base-ui-components/react @iconify/react @mynaui/icons-react @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tabs @radix-ui/react-tooltip @remixicon/react class-variance-authority clsx cmdk framer-motion lucide-react motion next radix-ui react-aria-components recharts vaul
```

| Dependency | Purpose |
|---|---|
| `@ark-ui/react` | Utility |
| `@base-ui-components/react` | Utility |
| `@iconify/react` | Utility |
| `@mynaui/icons-react` | Utility |
| `@radix-ui/react-avatar` | Headless accessible primitives |
| `@radix-ui/react-checkbox` | Headless accessible primitives |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-dropdown-menu` | Headless accessible primitives |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-popover` | Headless accessible primitives |
| `@radix-ui/react-scroll-area` | Headless accessible primitives |
| `@radix-ui/react-separator` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-tabs` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `@remixicon/react` | Utility |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `cmdk` | Command palette |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `radix-ui` | Headless accessible primitives |
| `react-aria-components` | Utility |
| `recharts` | Data visualization |
| `vaul` | Drawer/sheet component |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `base-popover.tsx`
- `chatgpt-prompt-input.tsx`
- `component.tsx`
- `demo.tsx`
- `drawer.tsx`
- `floating-panel.tsx`
- `mission-success-dialog.tsx`
- `morphing-popover.tsx`
- `notification-inbox-popover.tsx`
- `orbiting-skills.tsx`
- `popover-1.tsx`
- `popover-form.tsx`
- `popover.tsx`
- `ruixen-popover-02.tsx`
- `smart-popover.tsx`
- `tour-popover.tsx`
- `user-dropdown.tsx`
- `workspaces.tsx`

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
- `info`
- `inverse`
- `lg (size)`
- `link`
- `md (size)`
- `mono`
- `outline`
- `primary`
- `secondary`
- `sm (size)`
- `success`
- `warning`
- `xs (size)`

### Custom Props Found
- `align`
- `alignOffset`
- `angle`
- `animationDelay`
- `asChild`
- `badgeIcon`
- `badgeText`
- `colors`
- `config`
- `description`
- `disabled`
- `dotClassName`
- `getWorkspaceId`
- `getWorkspaceName`
- `glowColor`
- `htmlFor`
- `icon`
- `id`
- `imageUrl`
- `inputPlaceholder`

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

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    showArrow?: boolean;
  }
>(({ className, align = "center", sideOffset = 4, showArrow = false, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-popover-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg shadow-black/5 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    >
      {props.children}
      {showArrow && (
```

### Pattern 3
```tsx
import { cn } from "@/lib/utils";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    showArrow?: boolean;
  }
>(({ className, align = "center", sideOffset = 4, showArrow = false, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 max-h-[var(--radix-popover-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg shadow-black/5 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    >
      {props.children}
      {showArrow && (
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/popover.tsx`
2. Install required dependencies: `@ark-ui/react, @base-ui-components/react, @iconify/react`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `popoverVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Popovers must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Popovers components:

1. **Never repeat a design** — with 23+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Popovers component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Anchored tooltip-style panel
2. Multi-section panel with header/body/footer
3. Popover with form content
4. Popover with list/menu content
5. Nested popover chain

### 🎨 Surface Axis
1. Frosted glass with border-white/10
2. Solid dark with subtle shadow
3. Outlined card with arrow pointer
4. Glass with gradient accent border
5. Dark with brand-color header bar

### ⚡ Motion Axis
1. Scale-in from anchor point with spring
2. Content stagger-fade on open
3. Arrow points to trigger (positioned dynamically)
4. Exit: scale-to-zero toward trigger
5. Open/close with AnimatePresence

### 🎭 Mood Axis
1. Informational — text content, learn-more
2. Interactive — form fields, action buttons
3. Menu — list of options, clickable items
4. Rich preview — image/meta preview card
5. Minimal — small text tip, narrow width

### 🧩 Composition Axis
1. User profile preview on avatar hover
2. Color picker or date selector
3. Share/social options panel
4. Filter options panel
5. Help/context information tooltip

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Glass Preview
frosted-glass popover that appears on hover. Scale-in from trigger origin with spring. Contains: avatar, name, bio snippet, action button. Arrow pointer in matching glass style. Positioned dynamically to stay in viewport. Exit with scale-down.

### Recipe 2: Action Panel
popover with header (title + close X), body (action list items with icons), and footer (secondary action). Glass surface. Opens on click with spring scale. Items have hover highlight. Keyboard navigable (arrow keys, Escape close).

### Recipe 3: Form Popover
popover containing a compact form (2-3 fields). Appears on button click. Glass surface. Inputs have focus glow. Submit button at bottom. Success: popover closes + toast notification. Spring entrance from anchor.

### Recipe 4: Nested Info
informational popover with rich content: heading, paragraph, inline link that opens another popover. Chain of popovers. Each positioned to not overlap parent. Clean hierarchy. Used for progressive disclosure of complex info.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Hover previews**
- **Quick actions**
- **Rich tooltips**
- **Settings**

## 13. 🔗 Composes With

Load these companion blueprints when building with Popovers:

- `components/buttons.md` — Buttons
- `components/avatars.md` — Avatars
- `components/cards.md` — Cards
- `components/forms.md` — Forms


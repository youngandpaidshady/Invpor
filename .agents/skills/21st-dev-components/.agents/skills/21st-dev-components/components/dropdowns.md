# 21st.dev Component Skill: Dropdowns

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 25+
> **Training Data:** 24 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Dropdowns components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 24 analyzed Dropdowns implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Framer Motion animations**
- **Glassmorphism / backdrop blur**
- **Lucide React icons**
- **Radix UI primitives**
- **React effects**
- **React refs**
- **React state management**
- **React useCallback optimization**
- **React useMemo optimization**
- **React.forwardRef pattern**
- **Recharts / charting**
- **Tailwind CSS Animate plugin**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @ant-design/icons @iconify/react @radix-ui/react-avatar @radix-ui/react-dropdown-menu @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-separator @radix-ui/react-slot antd class-variance-authority framer-motion lucide-react motion react-icons
```

| Dependency | Purpose |
|---|---|
| `@ant-design/icons` | Utility |
| `@iconify/react` | Utility |
| `@radix-ui/react-avatar` | Headless accessible primitives |
| `@radix-ui/react-dropdown-menu` | Headless accessible primitives |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-popover` | Headless accessible primitives |
| `@radix-ui/react-separator` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `antd` | Utility |
| `class-variance-authority` | Variant management |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `react-icons` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `activity-dropdown.tsx`
- `animated-shifting-tab-component.tsx`
- `basic-dropdown.tsx`
- `combo-box.tsx`
- `demo.tsx`
- `dropdown-01.tsx`
- `dropdown.tsx`
- `fluid-dropdown.tsx`
- `language-selector-dropdown.tsx`
- `popover.tsx`
- `ruixen-menu-options.tsx`
- `shifting-dropdown.tsx`
- `smart-combo-box.tsx`
- `user-dropdown.tsx`
- `user-profile-dropdown.tsx`
- `workspaces.tsx`

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
- `actions`
- `align`
- `asChild`
- `destructive`
- `disabled`
- `getWorkspaceId`
- `getWorkspaceName`
- `isOpen`
- `isSelected`
- `menuItems`
- `onClick`
- `onOpenChange`
- `onSearch`
- `onWorkspaceChange`
- `open`
- `placement`
- `query`
- `renderTrigger`
- `renderWorkspace`
- `searchable`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
```

### Pattern 2
```tsx
import { ChevronDown } from "lucide-react";

export default function RuixenMenuOptions() {
  return (
    <div className="flex justify-center items-center h-screen">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="flex items-center gap-2">
            ⚙️ Actions Panel
            <ChevronDown className="opacity-60" size={16} strokeWidth={2} />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 rounded-xl shadow-lg">
          {/* Quick Edits */}
          <DropdownMenuGroup>
            <DropdownMenuItem title="Make changes to the current item">
              ✏️ Rename
              <DropdownMenuShortcut>⌘ R</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem title="Create a copy">
              🧬 Clone
              <DropdownMenuShortcut>⌘ C</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
```

### Pattern 3
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

## 6. Integration Workflow

1. Create the component file in `/components/ui/dropdown.tsx`
2. Install required dependencies: `@ant-design/icons, @iconify/react, @radix-ui/react-avatar`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `dropdownVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Dropdowns must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Dropdowns components:

1. **Never repeat a design** — with 25+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Dropdowns component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Standard select dropdown
2. Mega dropdown (multi-column)
3. Command palette (search + results)
4. Nested sub-menu cascade
5. Action menu (right-click context)

### 🎨 Surface Axis
1. Frosted glass panel with border-white/10
2. Solid dark with subtle shadow
3. Outlined with selection highlight
4. Glass with gradient active item
5. Card-elevated with brand-color accent

### ⚡ Motion Axis
1. Scale-in from trigger with spring
2. Items stagger-fade from top
3. Hover item slides indicator bar
4. Selection triggers subtle bounce
5. Exit scale-to-zero toward trigger point

### 🎭 Mood Axis
1. System menu — compact, keyboard-navigable, clean
2. Creative — icons, descriptions, colorful grouped
3. Enterprise — categories, badges, breadcrumbs
4. Minimal — text only, no icons, tight spacing
5. Command — search input, shortcut keys, filtered

### 🧩 Composition Axis
1. Navigation sub-menu
2. Form select input dropdown
3. User menu (avatar trigger)
4. Action/context menu (right-click)
5. Filter selector dropdown

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Glass Command
frosted-glass dropdown with search input at top. Results filter in real-time. Items have icon + label + keyboard shortcut. Active item has brand-color left bar indicator. Scale-in spring from trigger. Keyboard navigable with live highlight.

### Recipe 2: Cascade Menu
primary menu triggers sub-menus on hover. Sub-menus appear to the right with slide-in animation. Each level has frosted glass. Active trail maintains highlight chain. Clean hierarchy with group labels.

### Recipe 3: Context Ring
right-click context menu appears with radial animation (items fan out from click point). Glass background. Items grouped with separators. Active item has brand-color fill. Typeahead search support.

### Recipe 4: Mega Panel
wide dropdown (600px+) with multiple columns. Sections grouped by category with bold headers. Icon + title + description per item. Featured item highlighted with gradient card. Enters via scale-Y from top.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Navigation**
- **Settings**
- **Context menus**
- **Filters**

## 13. 🔗 Composes With

Load these companion blueprints when building with Dropdowns:

- `components/buttons.md` — Buttons
- `components/navigation-menus.md` — Navigation Menus
- `components/icons.md` — Icons
- `components/badges.md` — Badges


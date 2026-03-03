# 21st.dev Component Skill: Navigation Menus

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 11+
> **Training Data:** 17 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Navigation Menus components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 17 analyzed Navigation Menus implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Framer Motion animations**
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
- **React.forwardRef pattern**
- **Vaul drawer component**
- **cmdk command palette**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-menubar @radix-ui/react-navigation-menu @radix-ui/react-slot @radix-ui/react-switch class-variance-authority clsx cmdk framer-motion lucide-react usehooks-ts vaul
```

| Dependency | Purpose |
|---|---|
| `@radix-ui/react-accordion` | Headless accessible primitives |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-menubar` | Headless accessible primitives |
| `@radix-ui/react-navigation-menu` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-switch` | Headless accessible primitives |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `cmdk` | Command palette |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `usehooks-ts` | Utility |
| `vaul` | Drawer/sheet component |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `21st-navbar.tsx`
- `anime-navbar.tsx`
- `demo.tsx`
- `expandable-tabs.tsx`
- `floating-header.tsx`
- `floating-navbar.tsx`
- `header-1.tsx`
- `header-2.tsx`
- `header-3.tsx`
- `header-with-search.tsx`
- `header.tsx`
- `menubar.tsx`
- `nav-header.tsx`
- `navbar-menu.tsx`
- `navigation-menu.tsx`
- `shadcnblocks-com-navbar1.tsx`
- `simple-header.tsx`
- `tubelight-navbar.tsx`

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
- `activeColor`
- `alt`
- `asChild`
- `defaultActive`
- `index`
- `isSticky`
- `isStickyOverlay`
- `items`
- `logo`
- `menuItems`
- `onChange`
- `onThemeChange`
- `rightContent`
- `src`
- `tabs`
- `theme`
- `title`
- `url`
- `withBorder`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
```

### Pattern 2
```tsx
import { motion } from "framer-motion";

function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-white p-1"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      <Tab setPosition={setPosition}>Home</Tab>
      <Tab setPosition={setPosition}>Pricing</Tab>
      <Tab setPosition={setPosition}>About</Tab>
      <Tab setPosition={setPosition}>Services</Tab>
      <Tab setPosition={setPosition}>Contact</Tab>

      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
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

1. Create the component file in `/components/ui/navigation-menu.tsx`
2. Install required dependencies: `@radix-ui/react-accordion, @radix-ui/react-dialog, @radix-ui/react-icons`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `navigation-menuVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Navigation Menus must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Navigation Menus components:

1. **Never repeat a design** — with 11+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Navigation Menus component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Horizontal top bar with dropdowns
2. Vertical sidebar with sections
3. Tabbed navigation bar
4. Breadcrumb + section nav combined
5. Floating bottom navigation bar

### 🎨 Surface Axis
1. Glass bar with blur backdrop
2. Solid dark with bottom border accent
3. Outlined items with active fill
4. Transparent overlay on hero
5. Card-contained navigation block

### ⚡ Motion Axis
1. Active tab indicator slides with spring (layout animation)
2. Dropdown enters with scale from top
3. Mobile toggle with hamburger morph to X
4. Hover: underline slides from left
5. Scroll: nav collapses to compact mode

### 🎭 Mood Axis
1. SaaS — clean, logo left, links center, CTA right
2. Portfolio — minimal, name left, links right
3. Documentation — version selector, search, hierarchical
4. E-commerce — categories, cart icon, account
5. Creative — unconventional layout, animated hover

### 🧩 Composition Axis
1. Site-wide sticky header nav
2. Documentation top bar
3. Dashboard header with user menu
4. Landing page transparent overlay nav
5. Mobile app bottom tab bar

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Glass Header
fixed top bar with backdrop-blur-xl on dark bg. Logo left, nav links center, CTA button right. Active link has animated underline (brand-color) that slides between links. Scroll: bar background becomes more opaque. Mobile: hamburger triggers glass sidebar.

### Recipe 2: Sliding Tab Bar
horizontal tabs with active indicator that slides underneath active tab (layout animation, spring physics). Tabs change content below. Active tab text brightens. Clean, app-like navigation pattern.

### Recipe 3: Collapsing Scroll Nav
full navbar on page load (logo, links, CTA). On scroll down: collapses to compact (logo centered, hamburger, smaller). Scroll up: re-expands. Transition with height/opacity springs. Elegant, responsive.

### Recipe 4: Bottom Tab Bar
mobile-fixed bottom bar with 4-5 icon tabs. Active icon enlarges + fills with brand color. Inactive: outlined muted icons. Tab switch: icon pops with spring scale. Active indicator dot below. Safe-area aware. Glass background.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Site header on every page**
- **Mobile nav drawer**
- **App top bar**

## 13. 🔗 Composes With

Load these companion blueprints when building with Navigation Menus:

- `components/buttons.md` — Buttons
- `components/avatars.md` — Avatars
- `components/badges.md` — Badges
- `components/dropdowns.md` — Dropdowns
- `components/icons.md` — Icons
- `components/links.md` — Links


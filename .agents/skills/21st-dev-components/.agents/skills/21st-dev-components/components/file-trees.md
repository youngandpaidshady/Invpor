# 21st.dev Component Skill: File Trees

> **Priority:** STANDARD
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 2+
> **Training Data:** 30 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready File Trees components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 30 analyzed File Trees implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
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
- **Resizable panels**
- **Sonner toast library**
- **Tailwind CSS Animate plugin**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @chakra-ui/react @headless-tree/core @headless-tree/react @radix-ui/react-accordion @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tooltip @remixicon/react class-variance-authority framer-motion lucide-react motion next-themes radix-ui react-icons react-resizable-panels shiki sonner ui utils
```

| Dependency | Purpose |
|---|---|
| `@chakra-ui/react` | Utility |
| `@headless-tree/core` | Utility |
| `@headless-tree/react` | Utility |
| `@radix-ui/react-accordion` | Headless accessible primitives |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-scroll-area` | Headless accessible primitives |
| `@radix-ui/react-separator` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-switch` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `@remixicon/react` | Utility |
| `class-variance-authority` | Variant management |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next-themes` | Next.js framework feature |
| `radix-ui` | Headless accessible primitives |
| `react-icons` | Utility |
| `react-resizable-panels` | Utility |
| `shiki` | Utility |
| `sonner` | Toast notifications |
| `ui` | Utility |
| `utils` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `App.tsx`
- `Button.tsx`
- `Card.tsx`
- `ComponentFileViewer.tsx`
- `FileHeader.tsx`
- `FileTree.tsx`
- `ShikiViewer.tsx`
- `app.tsx`
- `button.tsx`
- `card.tsx`
- `demo.tsx`
- `dialog.tsx`
- `file-header.tsx`
- `file-tree-1.tsx`
- `file-tree.tsx`
- `file-upload.tsx`
- `file-viewer.tsx`
- `filesystem-item.tsx`
- `footer.tsx`
- `glow-tree.tsx`
- ...and 11 more variants

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
- `subtle`

### Custom Props Found
- `animateExpand`
- `animated`
- `asChild`
- `closeIcon`
- `code`
- `content`
- `data`
- `defaultExpandedIds`
- `depth`
- `direction`
- `expanded`
- `expandedItems`
- `file`
- `handleExpand`
- `hasChildren`
- `icon`
- `id`
- `indent`
- `indicator`
- `isLast`

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
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
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
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/file-tree.tsx`
2. Install required dependencies: `@chakra-ui/react, @headless-tree/core, @headless-tree/react`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `file-treeVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive File Trees must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating File Trees components:

1. **Never repeat a design** — with 2+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a File Trees component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Indented tree with toggle arrows
2. Flat list with breadcrumb path
3. Multi-pane (Miller columns)
4. Tree with drag-drop reorder
5. Grid + list toggle view

### 🎨 Surface Axis
1. Dark with syntax-highlighted file icons
2. Outlined with colored indent lines
3. Glass panel containing tree
4. Minimal – no borders, indent-only hierarchy
5. IDE-style with colored file type dots

### ⚡ Motion Axis
1. Folder expand with spring height + children stagger
2. File hover highlights entire row
3. Drag-drop ghost follows cursor
4. Folder icon morphs open/closed with SVG animation
5. Scroll indicator pulses at edges for overflow

### 🎭 Mood Axis
1. IDE — monospace, syntax colors, git status indicators
2. File manager — thumbnails, size/date columns, actions
3. Documentation — clean, article structure, search
4. Minimal — text only, chevron toggles, clean
5. Creative — emoji folder icons, playful names

### 🧩 Composition Axis
1. Code editor sidebar
2. Documentation nav tree
3. File upload manager
4. Settings/config tree editor
5. Component library browser

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: IDE Explorer
dark panel with monospace file names. Indent guides as vertical dotted lines in brand-color at 20%. Folder arrows rotate with spring on toggle. File icons colored by type (blue: TS, green: SVG, yellow: JSON). Active file has brand-color background highlight. Git status dots (modified: yellow, new: green).

### Recipe 2: Miller Columns
3-pane side-by-side navigation. Selecting a folder in column 1 shows contents in column 2. Columns slide in from right with spring. Selected item has brand-color background. Breadcrumb path above columns. Clean, macOS-Finder feel.

### Recipe 3: Animated Tree
collapsible tree where expanding a folder springs open children with staggered fade-in (50ms delay each). Folder icons morph between open/closed states (SVG animation). Hover highlights entire row with subtle background. Collapse reverses the animation.

### Recipe 4: Drag Sort Tree
tree with drag-and-drop reordering. Drag ghost is semi-transparent version. Drop targets highlight with dashed border. Items reorder with spring animation. Indent lines shift smoothly during move. Visual connector lines between parents and children.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Code editor**
- **File manager**
- **Documentation sidebar**

## 13. 🔗 Composes With

Load these companion blueprints when building with File Trees:

- `components/icons.md` — Icons
- `components/scroll-areas.md` — Scroll Areas
- `components/sidebars.md` — Sidebars


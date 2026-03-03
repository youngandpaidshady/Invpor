# 21st.dev Component Skill: Selects

> **Priority:** CRITICAL
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 62+
> **Training Data:** 60 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Selects components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 60 analyzed Selects implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CVA (class-variance-authority) variants**
- **Framer Motion animations**
- **GSAP animation library**
- **HTML Canvas rendering**
- **Lucide React icons**
- **Next.js Image optimization**
- **Next.js Link routing**
- **Radix UI primitives**
- **React Day Picker**
- **React Hook Form**
- **React effects**
- **React refs**
- **React state management**
- **React useCallback optimization**
- **React useMemo optimization**
- **React.forwardRef pattern**
- **Recharts / charting**
- **Sonner toast library**
- **Tailwind CSS Animate plugin**
- **Zod schema validation**
- **cmdk command palette**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @base-ui-components/react @hookform/resolvers @number-flow/react @phosphor-icons/react @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-slot @radix-ui/react-tooltip @remixicon/react class-variance-authority cmdk emblor framer-motion lucide-react motion react-aria-components react-day-picker react-hook-form sonner zod
```

| Dependency | Purpose |
|---|---|
| `@base-ui-components/react` | Utility |
| `@hookform/resolvers` | Form state management |
| `@number-flow/react` | Utility |
| `@phosphor-icons/react` | Utility |
| `@radix-ui/react-avatar` | Headless accessible primitives |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-popover` | Headless accessible primitives |
| `@radix-ui/react-select` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `@remixicon/react` | Utility |
| `class-variance-authority` | Variant management |
| `cmdk` | Command palette |
| `emblor` | Utility |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `react-aria-components` | Utility |
| `react-day-picker` | Utility |
| `react-hook-form` | Form state management |
| `sonner` | Toast notifications |
| `zod` | Schema validation |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `animated-select-1.tsx`
- `async-select.tsx`
- `baggage-add-on.tsx`
- `breadcrumb.tsx`
- `calendar.tsx`
- `demo.tsx`
- `form.tsx`
- `input-with-inner-tags.tsx`
- `member-selector.tsx`
- `menu.tsx`
- `multi-select-combobox.tsx`
- `multiple-select.tsx`
- `multiple-selector.tsx`
- `multiselect.tsx`
- `popover.tsx`
- `pricing-interaction.tsx`
- `root-toggle.tsx`
- `select-1.tsx`
- `select-native.tsx`
- `select.tsx`
- ...and 2 more variants

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
- `badgeClassName`
- `clearable`
- `commandProps`
- `creatable`
- `defaultOptions`
- `defaultValue`
- `delay`
- `description`
- `disabled`
- `emptyIndicator`
- `errorMessage`
- `fetcher`
- `filterFn`
- `getDisplayValue`
- `getOptionValue`
- `getWorkspaceId`
- `getWorkspaceName`
- `groupBy`
- `hideClearAllButton`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
};

export function TagsSelector({ tags }: TagsSelectorProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const selectedsContainerRef = useRef<HTMLDivElement>(null);

  const removeSelectedTag = (id: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag.id !== id));
  };

  const addSelectedTag = (tag: Tag) => {
    setSelectedTags((prev) => [...prev, tag]);
  };

  useEffect(() => {
    if (selectedsContainerRef.current) {
      selectedsContainerRef.current.scrollTo({
        left: selectedsContainerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  }, [selectedTags]);

  return (
    <div className="p-6 max-w-lg w-full flex flex-col">
      <motion.h2 layout className="text-xl font-semibold">
        TAGS
```

### Pattern 2
```tsx
import { ChevronDownIcon } from "@radix-ui/react-icons";

export interface SelectPropsNative extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const SelectNative = React.forwardRef<HTMLSelectElement, SelectPropsNative>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "peer inline-flex w-full cursor-pointer appearance-none items-center rounded-lg border border-input bg-background text-sm text-foreground shadow-sm shadow-black/5 transition-shadow focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 has-[option[disabled]:checked]:text-muted-foreground",
            props.multiple
              ? "py-1 [&>*]:px-3 [&>*]:py-1 [&_option:checked]:bg-accent"
              : "h-9 pe-8 ps-3",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        {!props.multiple && (
          <span className="pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50">
            <ChevronDownIcon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </span>
```

### Pattern 3
```tsx
import { ChevronDownIcon } from "@radix-ui/react-icons";

export interface SelectPropsNative extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const SelectNative = React.forwardRef<HTMLSelectElement, SelectPropsNative>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          className={cn(
            "peer inline-flex w-full cursor-pointer appearance-none items-center rounded-lg border border-input bg-background text-sm text-foreground shadow-sm shadow-black/5 transition-shadow focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 has-[option[disabled]:checked]:text-muted-foreground",
            props.multiple
              ? "py-1 [&>*]:px-3 [&>*]:py-1 [&_option:checked]:bg-accent"
              : "h-9 pe-8 ps-3",
            className,
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        {!props.multiple && (
          <span className="pointer-events-none absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center text-muted-foreground/80 peer-disabled:opacity-50">
            <ChevronDownIcon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </span>
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/select.tsx`
2. Install required dependencies: `@base-ui-components/react, @hookform/resolvers, @number-flow/react`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `selectVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Selects must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Selects components:

1. **Never repeat a design** — with 62+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Selects component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Standard dropdown select
2. Searchable/filterable select
3. Multi-select with tag chips
4. Grouped options with headers
5. Combobox (type + select)

### 🎨 Surface Axis
1. Glass trigger + glass dropdown
2. Outlined trigger with solid dropdown
3. Dark trigger with brand-color active option
4. Pill-shaped trigger with popover dropdown
5. Minimal underline trigger with fly-out

### ⚡ Motion Axis
1. Dropdown scales in from trigger with spring
2. Options stagger fade-in
3. Selected option check icon pops in
4. Multi-select: tags spring-scale in on add
5. Clear all: tags collapse out in sequence

### 🎭 Mood Axis
1. Form standard — clean, label above, validation
2. Filter — pill-shaped, count badge, compact
3. Settings — full-width, detailed option descriptions
4. Creative — color swatches or rich option previews
5. Command — search-first, keyboard-driven

### 🧩 Composition Axis
1. Form field select input
2. Table column filter
3. Navigation locale/region selector
4. Settings preference dropdown
5. Search filter refinement

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Glass Combobox
glass trigger button shows selected value. Click: glass dropdown with search input at top. Options filter live. Active option has brand-color left bar indicator. Selected has checkmark. Keyboard navigable. Dropdown springs in from trigger anchor.

### Recipe 2: Tag Multi-Select
trigger shows selected items as pill tags. Tags have X remove button. Click: dropdown with checkboxes per option. Selecting adds tag with spring-scale animation. Removing: tag collapses out. 'Clear All' link. Overflow: '+N more' counter tag.

### Recipe 3: Rich Option Select
each option shows icon + title + description (2-line). Hover: option row highlights. Selected: checkmark right-aligned. Options grouped by category with bold section headers. Dropdown has max-height with internal scroll. Premium, informative.

### Recipe 4: Inline Search Select
input field that doubles as search. Type to filter options in dropdown below. Options highlighted matching characters in bold. Arrow key navigation. Enter selects. Tab autocompletes. Used for city/country/user search selection.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Forms**
- **Filters**
- **Settings**
- **Data tables**
- **Navigation**

## 13. 🔗 Composes With

Load these companion blueprints when building with Selects:

- `components/forms.md` — Forms
- `components/inputs.md` — Inputs
- `components/buttons.md` — Buttons
- `components/popovers.md` — Popovers


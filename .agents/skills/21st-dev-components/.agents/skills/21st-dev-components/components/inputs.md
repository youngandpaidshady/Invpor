# 21st.dev Component Skill: Inputs

> **Priority:** CRITICAL
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 102+
> **Training Data:** 60 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Inputs components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 60 analyzed Inputs implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
- **Framer Motion animations**
- **GLSL shaders**
- **GSAP animation library**
- **Glassmorphism / backdrop blur**
- **HTML Canvas rendering**
- **Lucide React icons**
- **Next.js Image optimization**
- **Next.js Link routing**
- **Radix UI primitives**
- **React Day Picker**
- **React effects**
- **React refs**
- **React state management**
- **React useCallback optimization**
- **React useMemo optimization**
- **React.forwardRef pattern**
- **Recharts / charting**
- **Sonner toast library**
- **Tailwind CSS Animate plugin**
- **Three.js / React Three Fiber**
- **cmdk command palette**
- **cn() utility (clsx + tailwind-merge)**
- **date-fns date utilities**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @internationalized/date @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tooltip @react-three/fiber class-variance-authority date-fns dicons framer-motion input-otp lucide-react motion next react-aria-components react-day-picker react-payment-inputs sonner three use-mask-input
```

| Dependency | Purpose |
|---|---|
| `@internationalized/date` | Utility |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-dropdown-menu` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-popover` | Headless accessible primitives |
| `@radix-ui/react-slider` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-switch` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `@react-three/fiber` | 3D rendering |
| `class-variance-authority` | Variant management |
| `date-fns` | Date formatting |
| `dicons` | Utility |
| `framer-motion` | Physics-based animations |
| `input-otp` | Utility |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `react-aria-components` | Utility |
| `react-day-picker` | Utility |
| `react-payment-inputs` | Utility |
| `sonner` | Toast notifications |
| `three` | 3D rendering |
| `use-mask-input` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `action-search-bar.tsx`
- `ai-input-with-file.tsx`
- `ai-input-with-loading.tsx`
- `ai-input-with-search.tsx`
- `ai-input-with-suggestions.tsx`
- `ai-input.tsx`
- `ai-prompt-box.tsx`
- `ai-voice-input.tsx`
- `animated-ai-input.tsx`
- `animated-glowing-search-bar.tsx`
- `border-trail.tsx`
- `calendar.tsx`
- `chat-input.tsx`
- `chatgpt-prompt-input.tsx`
- `component.tsx`
- `date-picker.tsx`
- `date-range-picker.tsx`
- `demo.tsx`
- `graaadeints.tsx`
- `input-with-tags.tsx`
- ...and 8 more variants

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
- `type (size)`

### Custom Props Found
- `accept`
- `action`
- `actions`
- `asChild`
- `autoAnimate`
- `center`
- `colors`
- `defaultSelected`
- `demoInterval`
- `demoMode`
- `description`
- `disableAutosize`
- `disabled`
- `dotSize`
- `duration`
- `e`
- `errorMessage`
- `file`
- `fileName`
- `files`

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

1. Create the component file in `/components/ui/input.tsx`
2. Install required dependencies: `@internationalized/date, @radix-ui/react-dialog, @radix-ui/react-dropdown-menu`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `inputVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Inputs must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Inputs components:

1. **Never repeat a design** — with 102+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Inputs component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Standard labelled input
2. Floating label input
3. Input with icon prefix/suffix
4. Search input with results dropdown
5. Input group (multiple fields inline)

### 🎨 Surface Axis
1. Dark with glow border on focus
2. Outlined with brand-color focus ring
3. Underline-only (material style)
4. Glass with backdrop-blur
5. Solid fill with no border

### ⚡ Motion Axis
1. Label floats up on focus with spring
2. Focus: border color transitions + glow
3. Error: shake animation + red border
4. Character count animates
5. Clear button: X icon fades in when input has value

### 🎭 Mood Axis
1. Clean modern — floating label, validation inline
2. Terminal — monospace, green caret, dark bg
3. Material — underline, floating label, ripple
4. Minimal — no border, underline only, spare
5. Premium — glass, glow focus, brand accent

### 🧩 Composition Axis
1. Form text input
2. Search bar
3. Chat message input
4. Login email/password
5. Filter/tag input

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Float Glass
frosted-glass input with backdrop-blur. Label starts as placeholder, floats above on focus with spring animation. Focus: brand-color border glow (0 0 0 2px). Unfocused with value: label stays floated in text-xs. Error: red border + shake + error message below.

### Recipe 2: Neon Terminal
dark background (#0a0a0a) input with monospace font. Green caret blinks. No border, just a subtle bottom glow line (green/brand). Focus: glow intensifies. Prefix '>' character. Autocomplete dropdown styled as terminal output.

### Recipe 3: Search Command
rounded-full input with search icon left and keyboard shortcut badge right (⌘K). Focus: expands width + shows results dropdown below. Results dropdown is glass with stagger-in items. Clear button (X) appears when input has value. Full command-palette upgrade path.

### Recipe 4: Tagged Input
input that converts typed text to tag chips on Enter/comma. Tags are rounded pills with remove X. Tags enter with spring-scale animation. Remove with collapse-out animation. Input auto-resizes. Tag overflow wraps to new line.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Forms**
- **Search bars**
- **Chat input**
- **Settings**
- **Auth pages**

## 13. 🔗 Composes With

Load these companion blueprints when building with Inputs:

- `components/forms.md` — Forms
- `components/buttons.md` — Buttons
- `components/icons.md` — Icons
- `components/popovers.md` — Popovers


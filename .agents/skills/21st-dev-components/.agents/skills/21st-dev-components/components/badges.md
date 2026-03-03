# 21st.dev Component Skill: Badges

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 25+
> **Training Data:** 45 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Badges components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 45 analyzed Badges implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
- **Framer Motion animations**
- **GLSL shaders**
- **Glassmorphism / backdrop blur**
- **Lucide React icons**
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
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @base-ui-components/react @paper-design/shaders-react @radix-ui/react-dropdown-menu @radix-ui/react-icons @radix-ui/react-popover @radix-ui/react-slot @subframe/core class-variance-authority clsx framer-motion lucide-react motion next radix-ui usehooks-ts
```

| Dependency | Purpose |
|---|---|
| `@base-ui-components/react` | Utility |
| `@paper-design/shaders-react` | Utility |
| `@radix-ui/react-dropdown-menu` | Headless accessible primitives |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-popover` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@subframe/core` | Utility |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `radix-ui` | Headless accessible primitives |
| `usehooks-ts` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `action-toolbar.tsx`
- `animated-badge.tsx`
- `backed-by-yc.tsx`
- `badge-1.tsx`
- `badge-2.tsx`
- `badge.tsx`
- `banner.tsx`
- `base-badge.tsx`
- `beautiful-simple-badges.tsx`
- `demo.tsx`
- `hero.tsx`
- `joblisting-component.tsx`
- `notifications-filter.tsx`
- `product-card-1.tsx`
- `project-management-dashboard.tsx`
- `roadmap-card.tsx`
- `smart-combo-box.tsx`
- `spider-verse-glitch-button.tsx`
- `status-badge-beautiful-accessible-status-indicators.tsx`
- `text-arc-effect.tsx`
- ...and 2 more variants

## 4. Props & Variant Patterns

### CVA Variant Names Found
- `default`
- `default (size)`
- `destructive`
- `ghost`
- `gradient`
- `icon (size)`
- `info`
- `lg (size)`
- `link`
- `md (size)`
- `negative`
- `neutral`
- `outline`
- `positive`
- `premium`
- `primary`
- `secondary`
- `sm (size)`
- `success`
- `warning`
- `xs (size)`

### Custom Props Found
- `as`
- `asChild`
- `buttons`
- `capitalize`
- `colors`
- `compact`
- `description`
- `disabled`
- `discount`
- `dotClassName`
- `duration`
- `freeShipping`
- `hideIcon`
- `href`
- `icon`
- `iconRight`
- `images`
- `isBestSeller`
- `isNew`
- `isVisible`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import clsx from "clsx";

const variants = {
  gray: "bg-gray-700 text-white fill-white",
  "gray-subtle": "bg-gray-200 text-gray-1000 fill-gray-1000",
  blue: "bg-blue-700 text-white fill-white",
  "blue-subtle": "bg-blue-200 text-blue-900 fill-blue-900",
  purple: "bg-purple-700 text-white fill-white",
  "purple-subtle": "bg-purple-200 text-purple-900 fill-purple-900",
  amber: "bg-amber-700 text-black fill-black",
  "amber-subtle": "bg-amber-200 text-amber-900 fill-amber-900",
  red: "bg-red-700 text-white fill-white",
  "red-subtle": "bg-red-200 text-red-900 fill-red-900",
  pink: "bg-pink-700 text-white fill-white",
  "pink-subtle": "bg-pink-300 text-pink-900 fill-pink-900",
  green: "bg-green-700 text-white fill-white",
  "green-subtle": "bg-green-200 text-green-900 fill-green-900",
  teal: "bg-teal-700 text-white fill-white",
  "teal-subtle": "bg-teal-300 text-teal-900 fill-teal-900",
  inverted: "bg-gray-1000 text-gray-100 fill-gray-100",
  trial: "bg-gradient-to-br from-trial-start to-trial-end text-white fill-white",
  turbo: "bg-gradient-to-br from-turbo-start to-turbo-end text-white fill-white",
  pill: "bg-background text-foreground fill-foreground border border-gray-alpha-400"
};

const sizes = {
  sm: "text-[11px] h-5 px-1.5 tracking-[0.2px] gap-[3px]",
```

### Pattern 2
```tsx
import clsx from "clsx";

const variants = {
  gray: "bg-gray-700 text-white fill-white",
  "gray-subtle": "bg-gray-200 text-gray-1000 fill-gray-1000",
  blue: "bg-blue-700 text-white fill-white",
  "blue-subtle": "bg-blue-200 text-blue-900 fill-blue-900",
  purple: "bg-purple-700 text-white fill-white",
  "purple-subtle": "bg-purple-200 text-purple-900 fill-purple-900",
  amber: "bg-amber-700 text-black fill-black",
  "amber-subtle": "bg-amber-200 text-amber-900 fill-amber-900",
  red: "bg-red-700 text-white fill-white",
  "red-subtle": "bg-red-200 text-red-900 fill-red-900",
  pink: "bg-pink-700 text-white fill-white",
  "pink-subtle": "bg-pink-300 text-pink-900 fill-pink-900",
  green: "bg-green-700 text-white fill-white",
  "green-subtle": "bg-green-200 text-green-900 fill-green-900",
  teal: "bg-teal-700 text-white fill-white",
  "teal-subtle": "bg-teal-300 text-teal-900 fill-teal-900",
  inverted: "bg-gray-1000 text-gray-100 fill-gray-100",
  trial: "bg-gradient-to-br from-trial-start to-trial-end text-white fill-white",
  turbo: "bg-gradient-to-br from-turbo-start to-turbo-end text-white fill-white",
  pill: "bg-background text-foreground fill-foreground border border-gray-alpha-400"
};

const sizes = {
  sm: "text-[11px] h-5 px-1.5 tracking-[0.2px] gap-[3px]",
```

### Pattern 3
```tsx
}

export function VoiceInput({
  className,
  onStart,
  onStop,
}: React.ComponentProps<"div"> & VoiceInputProps) {
  const [_listening, _setListening] = React.useState<boolean>(false)
  const [_time, _setTime] = React.useState<number>(0)

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (_listening) {
      onStart?.()
      intervalId = setInterval(() => {
        _setTime((t) => t + 1)
      }, 1000)
    } else {
      onStop?.()
      _setTime(0)
    }

    return () => clearInterval(intervalId)
  }, [_listening])

  const formatTime = (seconds: number) => {
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/badge.tsx`
2. Install required dependencies: `@base-ui-components/react, @paper-design/shaders-react, @radix-ui/react-dropdown-menu`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `badgeVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Badges must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Badges components:

1. **Never repeat a design** — with 25+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Badges component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Inline pill next to text
2. Floating indicator on parent corner
3. Stacked badge group
4. Badge with icon prefix
5. Badge with count number

### 🎨 Surface Axis
1. Solid fill with high contrast text
2. Outlined with colored border only
3. Gradient fill (brand spectrum)
4. Frosted glass with blur
5. Glow-ring around solid badge

### ⚡ Motion Axis
1. Pop-in scale on mount
2. Bounce on count change
3. Pulse for notifications
4. Shimmer sweep on hover
5. Shake for attention

### 🎭 Mood Axis
1. Status indicator — green/yellow/red minimal
2. Product tag — rounded-full, brand gradient
3. Notification count — circular, red, bold number
4. Achievement — gold/bronze, icon+text, premium
5. Technical label — monospace, outlined, code-like

### 🧩 Composition Axis
1. On avatar corner (notification count)
2. Next to navigation item label
3. Inside table cell for status
4. On card header for category
5. Inline with heading for 'NEW' marker

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Glow Status
small rounded-full pill (6px height) with solid fill. Active badges emit a box-shadow glow matching their color. Status dot variant is just 8px circle. Hover amplifies glow. 'New' variant has shimmer sweep animation.

### Recipe 2: Glass Tag
frosted backdrop-blur-sm badge with border-white/10. Text in brand color. Slightly larger (28px height). Icon prefix option. Hover lifts with subtle shadow. Used for category labels.

### Recipe 3: Pulse Counter
circular notification badge (20px) with bold count number. Solid red fill. Pulses scale between 1.0 and 1.1 on 2s loop. Bounces (spring) when count value changes. Positioned absolute at -4px top-right of parent.

### Recipe 4: Achievement Medal
rounded-lg badge with gradient fill (gold-to-amber). Small icon left of text. Subtle inner shadow for depth. Sparkle particle occasionally floats up from surface. Premium feel.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Navigation items**
- **Table cells**
- **Card headers**
- **Avatar overlays**

## 13. 🔗 Composes With

Load these companion blueprints when building with Badges:

- `components/avatars.md` — Avatars
- `components/buttons.md` — Buttons
- `components/cards.md` — Cards
- `components/navigation-menus.md` — Navigation Menus


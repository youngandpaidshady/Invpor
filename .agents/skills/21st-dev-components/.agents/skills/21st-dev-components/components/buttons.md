# 21st.dev Component Skill: Buttons

> **Priority:** CRITICAL
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 130+
> **Training Data:** 60 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Buttons components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 60 analyzed Buttons implementations:

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
npm install @radix-ui/react-dialog @radix-ui/react-icons @radix-ui/react-popover @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tooltip @remixicon/react class-variance-authority framer-motion lucide-react motion radix-ui react-aria-components
```

| Dependency | Purpose |
|---|---|
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-popover` | Headless accessible primitives |
| `@radix-ui/react-separator` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `@remixicon/react` | Utility |
| `class-variance-authority` | Variant management |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `radix-ui` | Headless accessible primitives |
| `react-aria-components` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `animated-theme-toggle.tsx`
- `bookmark-icon-button.tsx`
- `button-1.tsx`
- `button-4.tsx`
- `button-colorful.tsx`
- `button.tsx`
- `checkout-form.tsx`
- `cinematic-glow-toggle.tsx`
- `code-snippet.tsx`
- `copy-code-button.tsx`
- `cvui-badge.tsx`
- `demo.tsx`
- `get-started-button.tsx`
- `glow-effect.tsx`
- `input.tsx`
- `magnetic-button.tsx`
- `magnetize-button.tsx`
- `material-design-3-button.tsx`
- `notifications-filter.tsx`
- `particle-button.tsx`
- ...and 6 more variants

## 4. Props & Variant Patterns

### CVA Variant Names Found
- `dashed`
- `default`
- `default (size)`
- `destructive`
- `dim`
- `elevated`
- `fab (size)`
- `filled`
- `foreground`
- `ghost`
- `icon (size)`
- `inverse`
- `lg (size)`
- `link`
- `md (size)`
- `mono`
- `neutral`
- `noShadow`
- `outline`
- `outlined`
- `primary`
- `reverse`
- `secondary`
- `sm (size)`
- `text`
- `tonal`

### Custom Props Found
- `asChild`
- `attractRadius`
- `colors`
- `discount`
- `duration`
- `freeShipping`
- `icon`
- `images`
- `isBestSeller`
- `isNew`
- `items`
- `label`
- `name`
- `noMorph`
- `noRipple`
- `onSuccess`
- `originalPrice`
- `particleCount`
- `placement`
- `price`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { motion, AnimatePresence } from "framer-motion";

function RippleButton({ children, className = "", ...props }) {
  const buttonRef = useRef(null);
  const [ripple, setRipple] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const createRipple = useCallback((event) => {
    if (isHovered || !buttonRef.current) return;
    setIsHovered(true);

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setRipple({ x, y, size, key: Date.now() });
  }, [isHovered]);

  const removeRipple = useCallback((event) => {
    if (event.target !== event.currentTarget) return;
    setIsHovered(false);
    
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
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
import { motion } from "framer-motion";

export default function CinematicSwitch () {
    const [isOn, setIsOn] = useState(false);

    return (
        <div className="min-h-screen w-full bg-zinc-950 flex items-center justify-center">
            {/* Switch Container */}
            <div
                className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm shadow-xl cursor-pointer"
                onClick={() => setIsOn(!isOn)}
            >
                {/* 'OFF' Label */}
                <span className={`text-xs font-bold tracking-wider transition-colors duration-300 ${!isOn ? "text-zinc-400" : "text-zinc-700"}`}>
                    OFF
                </span>

                {/* Switch Track */}
                <motion.div
                    className="relative w-16 h-8 rounded-full shadow-inner"
                    initial={false}
                    animate={{
                        backgroundColor: isOn ? "#064e3b" : "#27272a", // Emerald-900 vs Zinc-800
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Switch Thumb */}
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/button.tsx`
2. Install required dependencies: `@radix-ui/react-dialog, @radix-ui/react-icons, @radix-ui/react-popover`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `buttonVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Buttons must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Buttons components:

1. **Never repeat a design** — with 130+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Buttons component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Standard inline button
2. Icon-only circular button
3. Split button (action + dropdown)
4. Button group bar
5. FAB floating action button

### 🎨 Surface Axis
1. Gradient fill with inner shadow
2. Glass with backdrop-blur + border-white/10
3. Solid with brand-color + dark text
4. Outlined with hover-fill transition
5. Neon with outer glow ring

### ⚡ Motion Axis
1. Magnetic cursor attraction (pull toward click point)
2. Ripple effect expanding from click position
3. Scale spring (whileHover: 1.02, whileTap: 0.97)
4. Shimmer sweep across surface on hover
5. Particle explosion on click (radial burst)

### 🎭 Mood Axis
1. Premium dark — subtle gradient, gold accents
2. Playful — rounded-full, bright color, bounce
3. Brutal — sharp rect, 3px border, uppercase
4. Ghost — transparent bg, text only, underline hover
5. Cyberpunk — neon border, glitch hover, scan-lines

### 🧩 Composition Axis
1. Primary CTA in hero section
2. Form submit button with loading state
3. Navigation action button
4. Card action footer
5. Toolbar icon button row

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Magnetic Pull
button magnetically tracks cursor within 150px radius. Lerps position toward cursor. Click triggers ripple circle expanding from click point. Surface has subtle gradient (brand-color to 10% darker). Scale-tap 0.97. Focus ring glows.

### Recipe 2: Particle Burst
solid dark button with brand-color text. On click, 12 small particles explode radially outward from center, fading and shrinking over 600ms. Button scales to 0.95 on tap. Hover adds a shimmer sweep across the surface.

### Recipe 3: Glass CTA
frosted glass button with backdrop-blur-xl, border-white/10, brand-color text. Hover lifts Y-2px with shadow increase. Active scale 0.97. Loading state shows animated gradient moving left-to-right behind glass.

### Recipe 4: Neon Outline
transparent background with 1px brand-color border that glows (box-shadow bloom). Hover fills background with brand-color at 10% opacity. Text color matches border. Double-click protection with cooldown.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Every page — forms, CTAs, navigation, toolbars, dialogs**

## 13. 🔗 Composes With

Load these companion blueprints when building with Buttons:

- `components/forms.md` — Forms
- `components/heroes.md` — Heroes
- `components/cards.md` — Cards
- `components/dialogs--modals.md` — Dialogs / Modals
- `components/navigation-menus.md` — Navigation Menus
- `components/tooltips.md` — Tooltips


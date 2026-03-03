# 21st.dev Component Skill: Forms

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 23+
> **Training Data:** 60 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Forms components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 60 analyzed Forms implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
- **Framer Motion animations**
- **Glassmorphism / backdrop blur**
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
- **Three.js / React Three Fiber**
- **Vaul drawer component**
- **Zod schema validation**
- **cmdk command palette**
- **cn() utility (clsx + tailwind-merge)**
- **date-fns date utilities**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @hookform/resolvers @mynaui/icons-react @radix-ui/react-accordion @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tooltip @remixicon/react @tabler/icons-react canvas-confetti class-variance-authority clsx cmdk date-fns framer-motion lucide-react motion next radix-ui react-aria-components react-day-picker react-dropzone react-hook-form react-icons sonner tailwind-merge vaul zod
```

| Dependency | Purpose |
|---|---|
| `@hookform/resolvers` | Form state management |
| `@mynaui/icons-react` | Utility |
| `@radix-ui/react-accordion` | Headless accessible primitives |
| `@radix-ui/react-avatar` | Headless accessible primitives |
| `@radix-ui/react-checkbox` | Headless accessible primitives |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-popover` | Headless accessible primitives |
| `@radix-ui/react-progress` | Headless accessible primitives |
| `@radix-ui/react-radio-group` | Headless accessible primitives |
| `@radix-ui/react-select` | Headless accessible primitives |
| `@radix-ui/react-separator` | Headless accessible primitives |
| `@radix-ui/react-slider` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-switch` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `@remixicon/react` | Utility |
| `@tabler/icons-react` | Utility |
| `canvas-confetti` | Utility |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `cmdk` | Command palette |
| `date-fns` | Date formatting |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `radix-ui` | Headless accessible primitives |
| `react-aria-components` | Utility |
| `react-day-picker` | Utility |
| `react-dropzone` | Drag-and-drop file handling |
| `react-hook-form` | Form state management |
| `react-icons` | Utility |
| `sonner` | Toast notifications |
| `tailwind-merge` | Class composition |
| `vaul` | Drawer/sheet component |
| `zod` | Schema validation |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `SuccessLoginDemo.tsx`
- `accordion.tsx`
- `auth-modal.tsx`
- `auth-switch.tsx`
- `author-form-card.tsx`
- `background-beams.tsx`
- `booking-form.tsx`
- `border-trail.tsx`
- `button.tsx`
- `centered-feedback-drawer.tsx`
- `checkbox.tsx`
- `checkout-form.tsx`
- `cloud-watch-form.tsx`
- `confetti.tsx`
- `contact-2.tsx`
- `contact-card.tsx`
- `creat-account-form.tsx`
- `demo.tsx`
- `dialog.tsx`
- `field.tsx`
- ...and 24 more variants

## 4. Props & Variant Patterns

### CVA Variant Names Found
- `dashed`
- `default`
- `default (size)`
- `destructive`
- `dim`
- `error`
- `foreground`
- `ghost`
- `icon (size)`
- `info`
- `inverse`
- `lg`
- `lg (size)`
- `link`
- `md`
- `md (size)`
- `mono`
- `outline`
- `primary`
- `secondary`
- `sm`
- `sm (size)`
- `success`
- `warning`

### Custom Props Found
- `action`
- `animationType`
- `asChild`
- `backButtonText`
- `backDescription`
- `backIllustration`
- `backTitle`
- `badgeClassName`
- `canvas`
- `cardHeight`
- `cardWidth`
- `city`
- `close`
- `commandProps`
- `creatable`
- `currentStep`
- `data`
- `date`
- `dateRange`
- `defaultOptions`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { cn } from '@/lib/utils'

const ProgressIndicator = () => {
    const [step, setStep] = useState(1)
    const [isExpanded, setIsExpanded] = useState(true)

    const handleContinue = () => {

        if (step < 3) {
            setStep(step + 1)
            setIsExpanded(false)
        }
    }

    const handleBack = () => {
        if (step == 2) {
            setIsExpanded(true)
        }
        if (step > 1) {
            setStep(step - 1)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-8">

            <div className="flex items-center gap-6 relative">
```

### Pattern 2
```tsx
};

export function TextMorph({
  children,
  as: Component = 'p',
  className,
  style,
}: TextMorphProps) {
  const uniqueId = useId();

  const characters = useMemo(() => {
    const charCounts: Record<string, number> = {};

    return children.split('').map((char, index) => {
      const lowerChar = char.toLowerCase();
      charCounts[lowerChar] = (charCounts[lowerChar] || 0) + 1;

      return {
        id: `${uniqueId}-${lowerChar}${charCounts[lowerChar]}`,
        label: index === 0 ? char.toUpperCase() : lowerChar,
      };
    });
  }, [children, uniqueId]);

  return (
    <Component className={cn(className)} aria-label={children} style={style}>
      <AnimatePresence mode='popLayout' initial={false}>
```

### Pattern 3
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

## 6. Integration Workflow

1. Create the component file in `/components/ui/form.tsx`
2. Install required dependencies: `@hookform/resolvers, @mynaui/icons-react, @radix-ui/react-accordion`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `formVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Forms must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Forms components:

1. **Never repeat a design** — with 23+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Forms component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Single-column vertical stack
2. Two-column side-by-side fields
3. Multi-step wizard form
4. Inline horizontal form (search bar)
5. Card-based grouped sections

### 🎨 Surface Axis
1. Glass card containing all fields
2. Outlined container with section headers
3. Flat dark with input focus glow
4. Floating labels above inputs
5. Paper-style with underline-only inputs

### ⚡ Motion Axis
1. Input focus: border glow + label float-up
2. Validation shake on error
3. Step transition slide left-to-right
4. Submit button loading spinner
5. Success: form collapses + checkmark reveal

### 🎭 Mood Axis
1. Clean modern — floating labels, validation inline
2. Conversational — one field at a time, chat-like
3. Enterprise — labels, descriptions, grouped sections
4. Minimal — underline inputs, lots of space
5. Playful — rounded inputs, colorful validation, emoji

### 🧩 Composition Axis
1. Sign up / registration form
2. Contact/inquiry form
3. Settings/preferences form
4. Checkout payment form
5. Multi-step onboarding wizard

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Glass Wizard
multi-step form in a frosted-glass card. Progress bar at top showing step completion. Each step slides in from right (AnimatePresence). Inputs have floating labels that animate up on focus. Validation shows inline with red accent. Final step: submit with loading → success confetti.

### Recipe 2: Conversational Flow
one field at a time, centered. User types answer, presses Enter, field slides up and next field slides in. Progress dots at bottom. Chat-like feel with assistant text above each field. Keyboard-first. Completion shows summary card.

### Recipe 3: Dark Dashboard Form
two-column layout on dark background. Inputs have subtle border, brand-color glow on focus. Labels are uppercase text-xs above inputs. Sections grouped with heading + divider. Submit button is full-width at bottom with gradient + magnetic hover.

### Recipe 4: Inline Validator
single-column form with real-time validation. Valid fields show green checkmark icon. Invalid: red border + shake + error message fades in. Labels float above inputs on focus. Submit disabled until all fields valid. Password strength meter included.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Auth pages**
- **Settings**
- **Contact page**
- **Checkout**
- **Onboarding**

## 13. 🔗 Composes With

Load these companion blueprints when building with Forms:

- `components/inputs.md` — Inputs
- `components/buttons.md` — Buttons
- `components/checkboxes.md` — Checkboxes
- `components/selects.md` — Selects
- `components/radio-groups.md` — Radio Groups
- `components/text-areas.md` — Text Areas


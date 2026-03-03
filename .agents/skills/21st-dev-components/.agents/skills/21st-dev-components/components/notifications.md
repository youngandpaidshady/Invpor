# 21st.dev Component Skill: Notifications

> **Priority:** STANDARD
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 5+
> **Training Data:** 29 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Notifications components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 29 analyzed Notifications implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
- **Framer Motion animations**
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
- **Sonner toast library**
- **Tailwind CSS Animate plugin**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @headlessui/react @heroicons/react @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-scroll-area @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @remixicon/react class-variance-authority clsx framer-motion lucide-react motion next radix-ui sonner
```

| Dependency | Purpose |
|---|---|
| `@headlessui/react` | Utility |
| `@heroicons/react` | Utility |
| `@radix-ui/react-avatar` | Headless accessible primitives |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-popover` | Headless accessible primitives |
| `@radix-ui/react-scroll-area` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-switch` | Headless accessible primitives |
| `@radix-ui/react-tabs` | Headless accessible primitives |
| `@remixicon/react` | Utility |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `radix-ui` | Headless accessible primitives |
| `sonner` | Toast notifications |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `alert-1.tsx`
- `alert-toast.tsx`
- `alert.tsx`
- `badge-button-combo.tsx`
- `card-15.tsx`
- `card-16.tsx`
- `cookie-notice.tsx`
- `default.tsx`
- `demo.tsx`
- `dialog.tsx`
- `liquid-notification.tsx`
- `mono-alerts.tsx`
- `notification-button.tsx`
- `notification-inbox-popover.tsx`
- `notification-popover.tsx`
- `notification.tsx`
- `notifications-menu.tsx`
- `orbiting-skills.tsx`
- `popover.tsx`
- `ruixen-popover-02.tsx`
- ...and 4 more variants

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

### Custom Props Found
- `action`
- `actions`
- `aiName`
- `angle`
- `animationDelay`
- `asChild`
- `avatarFallback`
- `avatarSrc`
- `avatarUrl`
- `badge`
- `blurIntensity`
- `borderRadius`
- `buttonClassName`
- `callerInfo`
- `callerName`
- `close`
- `config`
- `count`
- `description`
- `dividerColor`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import Image from "next/image";

export function TeamInvitation() {
    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="relative bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-[0_1px_6px_0_rgba(0,0,0,0.02)] rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <div className="relative h-10 w-10 flex-shrink-0">
                        <Image
                            src="https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png"
                            alt="Sarah Chen"
                            sizes="40px"
                            fill
                            className="rounded-full object-cover"
                        />
                        <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-zinc-950" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Team Invitation
                                </p>
                                <p className="text-[13px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                                    Kokonut invited you to join{" "}
                                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
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

## 6. Integration Workflow

1. Create the component file in `/components/ui/notification.tsx`
2. Install required dependencies: `@headlessui/react, @heroicons/react, @radix-ui/react-avatar`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `notificationVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Notifications must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Notifications components:

1. **Never repeat a design** — with 5+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Notifications component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Toast stack (top-right corner)
2. Bell icon with dropdown panel
3. Full-width banner notification
4. Inline notification card
5. Floating bubble notification

### 🎨 Surface Axis
1. Glass with colored left border accent
2. Solid dark card with icon circle
3. Outlined with status color border
4. Gradient background matching severity
5. Minimal text-only with dismiss

### ⚡ Motion Axis
1. Slide in from right with spring
2. Stack reorder with layout animation
3. Auto-dismiss with progress bar
4. Bell icon shakes on new notification
5. Dismiss: collapse height + fade

### 🎭 Mood Axis
1. System — clean, icons, timestamps, grouped
2. Social — avatar, action text, interactive buttons
3. Alert — urgent, prominent, action-required
4. Subtle — toast, auto-dismiss, unobtrusive
5. Rich — image preview, action buttons, expandable

### 🧩 Composition Axis
1. App-wide notification system
2. Form validation feedback
3. System status updates
4. Social activity feed
5. Chat message alerts

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Glass Toast Stack
notifications appear top-right as frosted-glass cards. Slide in from right with spring. Stack with 8px gaps, newest on top. Auto-dismiss with animated progress bar (brand-color). Dismiss X hover glow. Icons by type (info/success/warning/error). Sound-ready.

### Recipe 2: Bell Dropdown
bell icon in navbar. Red count badge (bounces on increment). Click: glass dropdown panel with notification list. Items: avatar + text + timestamp. Unread items have brand-color left bar. Mark all read button. Stagger-in animation.

### Recipe 3: Inline Alert
notification card embedded in content. Colored left border (4px) by severity. Icon + title + description. Action buttons (primary/secondary). Dismissible. Entrance: fade + slideY. Close: collapse height smoothly.

### Recipe 4: Bubble Pop
circular bubble notification that floats up from bottom-right. Pops in with spring scale. Shows avatar + count or icon. Click: expands to full notification card. Auto-shrinks back after 5s. Playful, attention-grabbing.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Dashboard real-time updates**
- **Social feed**
- **Messaging app**

## 13. 🔗 Composes With

Load these companion blueprints when building with Notifications:

- `components/avatars.md` — Avatars
- `components/badges.md` — Badges
- `components/buttons.md` — Buttons
- `components/toasts.md` — Toasts
- `components/scroll-areas.md` — Scroll Areas


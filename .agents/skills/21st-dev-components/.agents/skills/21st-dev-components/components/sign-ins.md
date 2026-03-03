# 21st.dev Component Skill: Sign Ins

> **Priority:** STANDARD
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 4+
> **Training Data:** 32 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Sign Ins components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 32 analyzed Sign Ins implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Framer Motion animations**
- **Framer Motion useMotionValue**
- **Framer Motion useTransform**
- **GLSL shaders**
- **Glassmorphism / backdrop blur**
- **HTML Canvas rendering**
- **Intersection Observer / useInView**
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
- **ResizeObserver API**
- **Tailwind CSS Animate plugin**
- **Three.js / React Three Fiber**
- **Vaul drawer component**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-slot @radix-ui/react-switch @react-three/fiber canvas-confetti class-variance-authority clsx framer-motion lucide-react motion next next-themes react-icons tailwind-merge tailwindcss three vaul
```

| Dependency | Purpose |
|---|---|
| `@radix-ui/react-checkbox` | Headless accessible primitives |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-switch` | Headless accessible primitives |
| `@react-three/fiber` | 3D rendering |
| `canvas-confetti` | Utility |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `next-themes` | Next.js framework feature |
| `react-icons` | Utility |
| `tailwind-merge` | Class composition |
| `tailwindcss` | Utility |
| `three` | 3D rendering |
| `vaul` | Drawer/sheet component |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `animated-sign-in.tsx`
- `auth-form.tsx`
- `auth-fuse.tsx`
- `auth-modal.tsx`
- `button.tsx`
- `clean-minimal-sign-in.tsx`
- `demo.tsx`
- `dialog.tsx`
- `flip-card.tsx`
- `full-screen-signup.tsx`
- `gamified-login-card.tsx`
- `gaming-login.tsx`
- `login-1.tsx`
- `login-card.tsx`
- `modern-animated-sign-in.tsx`
- `modern-stunning-sign-in.tsx`
- `multi-step-login.tsx`
- `premium-auth.tsx`
- `sign-in-1.tsx`
- `sign-in-card-2.tsx`
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
- `type (size)`

### Custom Props Found
- `alt`
- `asChild`
- `backButtonText`
- `backDescription`
- `backIllustration`
- `backTitle`
- `brandName`
- `cardHeight`
- `cardWidth`
- `center`
- `checked`
- `colors`
- `contentClassName`
- `cursor`
- `data`
- `delay`
- `deleteSpeed`
- `description`
- `dotSize`
- `e`

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
import { Icons } from '@/components/ui/icons'

function SignInPage() {
  return (
    <div className="grid w-full grow items-center px-4 sm:justify-center">
      <Card className="w-full sm:w-96">
        <CardHeader>
          <CardTitle>Sign in to Acme Co</CardTitle>
          <CardDescription>Welcome back! Please sign in to continue</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-y-4">
          <div className="grid grid-cols-2 gap-x-4">
            <Button size="sm" variant="outline" type="button">
              <Icons.gitHub className="mr-2 size-4" />
              GitHub
            </Button>
            <Button size="sm" variant="outline" type="button">
              <Icons.google className="mr-2 size-4" />
              Google
            </Button>
          </div>
          
          <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
            or
          </p>
          
          <div className="space-y-2">
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/sign-in.tsx`
2. Install required dependencies: `@radix-ui/react-checkbox, @radix-ui/react-dialog, @radix-ui/react-icons`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `sign-inVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Sign Ins must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Sign Ins components:

1. **Never repeat a design** — with 4+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Sign Ins component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Centered card form
2. Split screen (form left, visual right)
3. Full-page form with background
4. Modal/dialog sign-in
5. Step-by-step progressive sign-in

### 🎨 Surface Axis
1. Glass card on gradient mesh background
2. Dark card with brand-color accents
3. Clean white card with shadow
4. Image background with overlay form
5. Minimal borderless form

### ⚡ Motion Axis
1. Card springs in on page load
2. Input labels float up on focus
3. Submit button loading state animation
4. Social login buttons stagger-in
5. Success: form morphs to welcome message

### 🎭 Mood Axis
1. Premium — dark, glass card, minimal fields
2. Corporate — logo, brand colors, SSO options
3. Social — social login prominent, form secondary
4. Minimal — email only first, password step 2
5. Creative — unique layout, animated background

### 🧩 Composition Axis
1. Standalone login page
2. Modal popup from nav
3. Embedded in settings page
4. Onboarding first step
5. Marketing page gated content

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Glass Portal
centered frosted-glass card on gradient mesh background. Logo at top. Email + password inputs with floating labels. Submit button with gradient + loading spinner state. Divider: 'or continue with'. Social login buttons (Google, GitHub) as outlined buttons. 'Forgot password?' link below. Card springs in on mount.

### Recipe 2: Split Cinematic
left half: sign-in form on dark background with brand-color accents. Right half: full-bleed image or animated shader. Form card has glass surface. Inputs glow on focus. Submit button has magnetic hover. Social options below. Right visual parallaxes on mouse move.

### Recipe 3: Progressive Flow
step 1: email input only + 'Continue' button. Step 2: slides to password input (or magic link option). Each step transitions with slide-left animation. Progress indicator at top. Reduces cognitive load. Back button to return to email.

### Recipe 4: Modal Sign-In
dialog/modal with dark overlay. Glass card centered. Compact form: email, password, submit. Close X and Escape to dismiss. Card scales in with spring. Tab-trap focus within modal. Auto-focus email input. Clean, non-intrusive.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Login page**
- **Auth modal**
- **Protected route gate**

## 13. 🔗 Composes With

Load these companion blueprints when building with Sign Ins:

- `components/forms.md` — Forms
- `components/inputs.md` — Inputs
- `components/buttons.md` — Buttons
- `components/links.md` — Links
- `components/icons.md` — Icons


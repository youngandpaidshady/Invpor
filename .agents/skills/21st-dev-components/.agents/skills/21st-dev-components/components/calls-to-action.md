# 21st.dev Component Skill: Calls to Action

> **Priority:** EXTRA_HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 34+
> **Training Data:** 66 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Calls to Action components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 66 analyzed Calls to Action implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Framer Motion animations**
- **Framer Motion spring physics**
- **Framer Motion useMotionValue**
- **Framer Motion useTransform**
- **GLSL shaders**
- **GSAP animation library**
- **Glassmorphism / backdrop blur**
- **HTML Canvas rendering**
- **Intersection Observer / useInView**
- **Lucide React icons**
- **Next.js Link routing**
- **Radix UI primitives**
- **React Hook Form**
- **React effects**
- **React refs**
- **React state management**
- **React useCallback optimization**
- **React useMemo optimization**
- **React.forwardRef pattern**
- **Tailwind CSS Animate plugin**
- **Three.js / React Three Fiber**
- **Zod schema validation**
- **cmdk command palette**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @hookform/resolvers @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-radio-group @radix-ui/react-slot @react-three/drei @react-three/fiber @tsparticles/engine @tsparticles/react @tsparticles/slim class-variance-authority clsx dicons framer-motion gsap lucide-react motion next next-themes react-hook-form react-wrap-balancer simplex-noise tailwind-merge three zod
```

| Dependency | Purpose |
|---|---|
| `@hookform/resolvers` | Form state management |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-radio-group` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@react-three/drei` | 3D rendering |
| `@react-three/fiber` | 3D rendering |
| `@tsparticles/engine` | Utility |
| `@tsparticles/react` | Utility |
| `@tsparticles/slim` | Utility |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `dicons` | Utility |
| `framer-motion` | Physics-based animations |
| `gsap` | Professional animation |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `next-themes` | Next.js framework feature |
| `react-hook-form` | Form state management |
| `react-wrap-balancer` | Utility |
| `simplex-noise` | Utility |
| `tailwind-merge` | Class composition |
| `three` | 3D rendering |
| `zod` | Schema validation |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `CTA.tsx`
- `about-us-section.tsx`
- `action-search-bar.tsx`
- `animated-underline-text-one.tsx`
- `app-store-button.tsx`
- `aurora-flow.tsx`
- `background-beams.tsx`
- `background-boxes.tsx`
- `background-gradient-animation.tsx`
- `background-paths.tsx`
- `button-colorful.tsx`
- `button-shiny.tsx`
- `calendar.tsx`
- `call-to-action-1.tsx`
- `call-to-action.tsx`
- `canvas-reveal-effect.tsx`
- `cta-3.tsx`
- `cta-4.tsx`
- `cta-card-1.tsx`
- `cta-with-glow.tsx`
- ...and 37 more variants

## 4. Props & Variant Patterns

### CVA Variant Names Found
- `above`
- `below`
- `bottom`
- `center`
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
- `top`
- `type (size)`

### Custom Props Found
- `accentColor`
- `action`
- `asChild`
- `attractRadius`
- `authorHandle`
- `authorImage`
- `authorName`
- `background`
- `backgroundColor`
- `badge`
- `baseColor`
- `baseHue`
- `baseRadius`
- `baseSpeed`
- `beamHeight`
- `beamNumber`
- `beamWidth`
- `beams`
- `borderRadius`
- `buttonPrimary`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
}

export function ButtonColorful({
    className,
    label = "Explore Components",
    ...props
}: ButtonColorfulProps) {
    return (
        <Button
            className={cn(
                "relative h-10 px-4 overflow-hidden",
                "bg-zinc-900 dark:bg-zinc-100",
                "transition-all duration-200",
                "group",
                className
            )}
            {...props}
        >
            {/* Gradient background effect */}
            <div
                className={cn(
                    "absolute inset-0",
                    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
                    "opacity-40 group-hover:opacity-80",
                    "blur transition-opacity duration-500"
                )}
            />
```

### Pattern 2
```tsx
}

function MagnetizeButton({
    className,
    particleCount = 12,
    attractRadius = 50,
    ...props
}: MagnetizeButtonProps) {
    const [isAttracting, setIsAttracting] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const particlesControl = useAnimation();

    useEffect(() => {
        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * 360 - 180,
            y: Math.random() * 360 - 180,
        }));
        setParticles(newParticles);
    }, [particleCount]);

    const handleInteractionStart = useCallback(async () => {
        setIsAttracting(true);
        await particlesControl.start({
            x: 0,
            y: 0,
            transition: {
```

### Pattern 3
```tsx
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      textClassName,
      underlineClassName,
      underlinePath = "M 0,10 Q 75,0 150,10 Q 225,20 300,10",
      underlineHoverPath = "M 0,10 Q 75,20 150,10 Q 225,0 300,10",
      underlineDuration = 1.5,
      ...props
    },
    ref
  ) => {
    const pathVariants: Variants = {
      hidden: {
        pathLength: 0,
        opacity: 0,
      },
      visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
          duration: underlineDuration,
          ease: "easeInOut",
        },
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/call-to-action.tsx`
2. Install required dependencies: `@hookform/resolvers, @radix-ui/react-dialog, @radix-ui/react-label`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `call-to-actionVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Calls to Action must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Calls to Action components:

1. **Never repeat a design** — with 34+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Calls to Action component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Centered headline + button stack
2. Split 50/50 (text left, visual right)
3. Full-bleed background with overlay text
4. Floating card CTA on gradient bg
5. Multi-column with icon features + CTA

### 🎨 Surface Axis
1. Gradient mesh background with glass card
2. Dark solid with glowing CTA button
3. Image/video background with text overlay
4. Illustration backdrop with clean foreground
5. Animated shader background

### ⚡ Motion Axis
1. Scroll-triggered entrance (fade up + scale)
2. CTA button magnetic hover + glow pulse
3. Background parallax on scroll
4. Headline typewriter or word-flip animation
5. Staggered reveal of features then button

### 🎭 Mood Axis
1. Urgent — countdown timer, red accents, bold
2. Premium — dark bg, gold button, minimal text
3. Friendly — warm colors, illustration, rounded
4. Technical — code snippet CTA, terminal style
5. Social proof — testimonial mini above CTA

### 🧩 Composition Axis
1. Page bottom final conversion block
2. Mid-page section break CTA
3. Sticky bottom bar CTA
4. Exit-intent modal CTA
5. Inline content CTA card

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Void Spotlight
black background with a single radial-gradient spotlight on CTA button. Headline in 5xl bold, subtext in muted gray. Button glows with brand-color box-shadow, magnetic hover. Scroll-triggered fade-in-up.

### Recipe 2: Gradient Wave
full-bleed section with animated gradient mesh background. Glass card centered containing headline, sub-text, and primary CTA button. Card has border-white/10. Button has shimmer sweep on hover. Trust badges below.

### Recipe 3: Countdown Urgency
dark section with large countdown timer (DD:HH:MM:SS). Below timer: bold headline and CTA button. Timer numbers flip-animate on change. Button pulses glow when timer < 1 hour. Red accent color scheme.

### Recipe 4: Terminal Prompt
dark terminal-style card. Monospace text: '$ ready to start?' with blinking cursor. Below: action button styled as terminal command. Green-on-black color scheme. Card has scanline overlay.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Landing page final section**
- **Blog post footer**
- **Pricing page bottom**
- **Email signup**

## 13. 🔗 Composes With

Load these companion blueprints when building with Calls to Action:

- `components/buttons.md` — Buttons
- `components/inputs.md` — Inputs
- `components/backgrounds.md` — Backgrounds
- `components/badges.md` — Badges


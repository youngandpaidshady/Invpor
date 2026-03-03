# 21st.dev Component Skill: Videos

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 9+
> **Training Data:** 26 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Videos components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 26 analyzed Videos implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
- **Framer Motion animations**
- **Framer Motion useMotionValue**
- **Framer Motion useTransform**
- **GSAP animation library**
- **Glassmorphism / backdrop blur**
- **HTML Canvas rendering**
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
- **Tailwind CSS Animate plugin**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-tooltip class-variance-authority framer-motion lucide-react motion next next-themes react-use-measure
```

| Dependency | Purpose |
|---|---|
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-popover` | Headless accessible primitives |
| `@radix-ui/react-select` | Headless accessible primitives |
| `@radix-ui/react-separator` | Headless accessible primitives |
| `@radix-ui/react-slider` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-switch` | Headless accessible primitives |
| `@radix-ui/react-tabs` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `class-variance-authority` | Variant management |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `next-themes` | Next.js framework feature |
| `react-use-measure` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `ai-gen.tsx`
- `border-beam.tsx`
- `demo.tsx`
- `dynamic-frame-layout.tsx`
- `featured-crm-demo-section.tsx`
- `hero-section-5.tsx`
- `hero-video-dialog.tsx`
- `hero-video.tsx`
- `hero-with-video.tsx`
- `hover-play-card.tsx`
- `info-card.tsx`
- `morphing-dialog.tsx`
- `neon-maze.tsx`
- `onboarding-checklist.tsx`
- `scroll-animated-video.tsx`
- `scroll-expansion-hero.tsx`
- `shine-border.tsx`
- `thumbnail-button-video-player.tsx`
- `timestamp.tsx`
- `video-generator-card.tsx`
- ...and 7 more variants

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
- `actions`
- `anchor`
- `animation`
- `animationStyle`
- `asChild`
- `aspectRatio`
- `backgroundImage`
- `bgImageSrc`
- `borderRadius`
- `borderSize`
- `borderThickness`
- `borderWidth`
- `brandName`
- `color`
- `colorFrom`
- `colorTo`
- `corner`
- `date`
- `delay`
- `description`

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
 * @param children contains react node elements.
 */
export function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#000000",
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        "min-h-[60px] w-fit min-w-[300px] place-items-center rounded-[--border-radius] bg-white p-3 text-black dark:bg-black dark:text-white",
        className,
      )}
    >
      <div
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
```

### Pattern 3
```tsx
}

export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}: BorderBeamProps) => {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]",
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/video.tsx`
2. Install required dependencies: `@radix-ui/react-dialog, @radix-ui/react-label, @radix-ui/react-popover`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `videoVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Videos must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Videos components:

1. **Never repeat a design** — with 9+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Videos component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Full-width hero video player
2. Card-embedded video
3. Video grid gallery
4. Background ambient video loop
5. Inline video with transcript

### 🎨 Surface Axis
1. Dark player with custom controls
2. Glass container for video card
3. Borderless full-bleed video
4. Rounded card with poster image
5. Outlined frame with title bar

### ⚡ Motion Axis
1. Play button pulse on hover
2. Video fades in on load
3. Custom controls fade in/out on hover
4. Progress bar with seek preview
5. Poster to video crossfade on play

### 🎭 Mood Axis
1. Cinematic — full-screen, custom controls, dark UI
2. Product — demo video, clean player, branded
3. Social — autoplay, muted, inline, compact
4. Educational — chapters, transcript, playback speed
5. Background — ambient loop, no controls, atmospheric

### 🧩 Composition Axis
1. Hero section background
2. Product demo showcase
3. Testimonial video section
4. Tutorial/course video player
5. Background ambient texture

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Cinematic Player
dark custom player with rounded-2xl container. Custom control bar: play/pause, progress bar with hover preview, volume, fullscreen. Controls fade in on hover, hide after 2s. Progress bar shows buffer + played. Brand-color accent. Poster image with large centered play button.

### Recipe 2: Ambient Loop
full-width video background, muted, autoplay, loop. No visible controls. Dark gradient overlay for text readability. Video loads with blur-to-sharp transition. Poster image as fallback. Pointer-events-none (click-through). Sets mood without demanding attention.

### Recipe 3: Card Video
video embedded in glass card. Poster image with play button overlay. Click: poster fades, video plays. Title and description below video. Like/share actions footer. Card hover lifts. Used in video galleries. Responsive aspect ratio maintained.

### Recipe 4: Gallery Grid
responsive grid of video thumbnail cards. Each: poster image, play icon overlay, title, duration badge. Click opens modal/lightbox player (full-size). Thumbnails stagger-in on scroll. Hover: slight zoom on poster. Duration badge top-right corner.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Hero backgrounds**
- **Product demos**
- **Testimonials**
- **About page**

## 13. 🔗 Composes With

Load these companion blueprints when building with Videos:

- `components/heroes.md` — Heroes
- `components/cards.md` — Cards
- `components/dialogs--modals.md` — Dialogs / Modals
- `components/buttons.md` — Buttons


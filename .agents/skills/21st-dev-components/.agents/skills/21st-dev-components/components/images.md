# 21st.dev Component Skill: Images

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 26+
> **Training Data:** 97 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Images components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 97 analyzed Images implementations:

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
- **GLSL shaders**
- **GSAP animation library**
- **Glassmorphism / backdrop blur**
- **HTML Canvas rendering**
- **Intersection Observer / useInView**
- **Intersection Observer API**
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
- **ResizeObserver API**
- **Tailwind CSS Animate plugin**
- **Three.js / React Three Fiber**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @gsap/react @origin-space/image-cropper @radix-ui/react-accordion @radix-ui/react-aspect-ratio @radix-ui/react-dialog @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-toggle @radix-ui/react-toggle-group @radix-ui/react-tooltip @react-three/drei @react-three/fiber @studio-freight/lenis @tabler/icons-react class-variance-authority clsx csstype framer-motion gsap lucide-react motion next radix-ui react-easy-crop react-icons react-medium-image-zoom react-use-measure tailwind-merge three uuid
```

| Dependency | Purpose |
|---|---|
| `@gsap/react` | Professional animation |
| `@origin-space/image-cropper` | Utility |
| `@radix-ui/react-accordion` | Headless accessible primitives |
| `@radix-ui/react-aspect-ratio` | Headless accessible primitives |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-popover` | Headless accessible primitives |
| `@radix-ui/react-select` | Headless accessible primitives |
| `@radix-ui/react-slider` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-switch` | Headless accessible primitives |
| `@radix-ui/react-tabs` | Headless accessible primitives |
| `@radix-ui/react-toggle` | Headless accessible primitives |
| `@radix-ui/react-toggle-group` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `@react-three/drei` | 3D rendering |
| `@react-three/fiber` | 3D rendering |
| `@studio-freight/lenis` | Utility |
| `@tabler/icons-react` | Utility |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `csstype` | Utility |
| `framer-motion` | Physics-based animations |
| `gsap` | Professional animation |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `radix-ui` | Headless accessible primitives |
| `react-easy-crop` | Utility |
| `react-icons` | Utility |
| `react-medium-image-zoom` | Utility |
| `react-use-measure` | Utility |
| `tailwind-merge` | Class composition |
| `three` | 3D rendering |
| `uuid` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `3d-carousel.tsx`
- `3d-flip-card.tsx`
- `advanced-image-uploader.tsx`
- `ai-chat-image-generation-1.tsx`
- `ai-gen.tsx`
- `animated-group.tsx`
- `animated-sections-1.tsx`
- `animated-slideshow.tsx`
- `arc-gallery-hero-component.tsx`
- `aspect-ratio.tsx`
- `avatar.tsx`
- `carousel.tsx`
- `case-studies.tsx`
- `chatgpt-prompt-input.tsx`
- `circular-reveal-heading.tsx`
- `clip-path-image.tsx`
- `clipped-image.tsx`
- `clipped-shape-image.tsx`
- `component.tsx`
- `cursor.tsx`
- ...and 61 more variants

## 4. Props & Variant Patterns

### CVA Variant Names Found
- `away`
- `busy`
- `dashed`
- `default`
- `default (size)`
- `destructive`
- `dim`
- `foreground`
- `ghost`
- `icon (size)`
- `inverse`
- `lg (size)`
- `link`
- `md (size)`
- `mono`
- `offline`
- `online`
- `outline`
- `primary`
- `secondary`
- `sm (size)`

### Custom Props Found
- `AspectRatioClassName`
- `accept`
- `alt`
- `amplitude`
- `animate`
- `animatePresenceInitial`
- `animatePresenceMode`
- `animated`
- `animationSequence`
- `asChild`
- `aspectRatio`
- `auto`
- `autoPlayInterval`
- `backgroundColor`
- `bgImageSrc`
- `blinkSpeed`
- `borderRadius`
- `boxHeight`
- `buttonStyle`
- `buttonText`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    showArrow?: boolean;
  }
>(({ className, sideOffset = 4, showArrow = false, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "relative z-50 max-w-[280px] rounded-lg border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    >
      {props.children}
      {showArrow && (
        <TooltipPrimitive.Arrow className="-my-px fill-popover drop-shadow-[0_1px_0_hsl(var(--border))]" />
```

### Pattern 2
```tsx
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }


demo.tsx
import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted">
      <Image
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Photo by Drew Beamer"
        fill
        className="h-full w-full rounded-md object-cover"
      />
    </AspectRatio>
  )
}
```

### Pattern 3
```tsx
}

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function InView({
  children,
  variants = defaultVariants,
  transition,
  viewOptions,
}: InViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/image.tsx`
2. Install required dependencies: `@gsap/react, @origin-space/image-cropper, @radix-ui/react-accordion`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `imageVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Images must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Images components:

1. **Never repeat a design** — with 26+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Images component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Full-bleed hero image
2. Grid gallery (masonry/uniform)
3. Image with caption card
4. Before/after comparison slider
5. Lightbox modal on click

### 🎨 Surface Axis
1. Rounded with subtle shadow
2. Glass frame with border-white/10
3. No chrome (full bleed)
4. Polaroid-style with white border + caption
5. Gradient overlay on image content

### ⚡ Motion Axis
1. Lazy load: blur placeholder → sharp reveal
2. Hover: subtle zoom (scale 1.05) with overflow hidden
3. Scroll: parallax displacement
4. Gallery: masonry stagger-in on load
5. Lightbox: scale-from-thumbnail with spring

### 🎭 Mood Axis
1. Portfolio — gallery, minimal chrome, focus on content
2. E-commerce — product images, zoom, multi-angle
3. Editorial — large hero images, overlay text
4. Social — grid, rounded, interactive
5. Technical — screenshots, annotations, precise

### 🧩 Composition Axis
1. Hero section background
2. Product detail gallery
3. Blog post inline images
4. Team member photos
5. Portfolio project showcase

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Blur Reveal
image loads with blur(20px) + scale(1.1) placeholder. On load complete, transition to blur(0) + scale(1.0) over 600ms. Smooth, premium loading experience. Wrapper maintains aspect ratio to prevent layout shift. next/image optimized.

### Recipe 2: Parallax Hero
full-width image with CSS transform: translateY on scroll creating parallax depth. Dark gradient overlay fading from bottom for text readability. Image pans slowly on mouse move for depth. Overflow hidden on container.

### Recipe 3: Masonry Gallery
responsive masonry grid using CSS columns. Images stagger-fade-in on scroll visibility. Hover: subtle scale(1.03) with overflow hidden on container. Click: opens lightbox modal with scale-from-thumbnail spring transition. Lightbox has arrow navigation.

### Recipe 4: Polaroid Card
image wrapped in white-bordered card (asymmetric padding: more at bottom for caption). Subtle rotation (random -2° to 2°). Shadow for depth. Caption in handwriting font below image. Hover straightens rotation. Stack multiple for scattered photo feel.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Portfolio**
- **Product gallery**
- **Blog post**
- **About page**
- **Hero section**

## 13. 🔗 Composes With

Load these companion blueprints when building with Images:

- `components/cards.md` — Cards
- `components/carousels.md` — Carousels
- `components/heroes.md` — Heroes
- `components/dialogs--modals.md` — Dialogs / Modals


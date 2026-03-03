# 21st.dev Component Skill: Backgrounds

> **Priority:** EXTRA_HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 33+
> **Training Data:** 0 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Backgrounds components with unique designs every time.

---

## 1. Core Techniques

The following techniques are essential for premium Backgrounds implementations:

- **CSS gradients**
- **CSS keyframe animations**
- **Three.js / React Three Fiber**
- **GLSL shaders**
- **HTML Canvas rendering**
- **React refs**
- **React state management**
- **Framer Motion animations**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install framer-motion three @react-three/fiber @react-three/drei clsx tailwind-merge
```

| Dependency | Purpose |
|---|---|
| `framer-motion` | Physics-based animations |
| `three` | 3D rendering |
| `@react-three/fiber` | 3D rendering |
| `@react-three/drei` | 3D rendering |
| `clsx` | Class composition |
| `tailwind-merge` | Class composition |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:


## 6. Integration Workflow

1. Create the component file in `/components/ui/background.tsx`
2. Install required dependencies: `framer-motion, three, @react-three/fiber`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `backgroundVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Backgrounds must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing

## 8. Design Philosophy

When generating Backgrounds components:

1. **Never repeat a design** — with 33+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Backgrounds component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Full-viewport fixed background
2. Section-contained gradient band
3. Split diagonal (two-tone)
4. Radial burst from center
5. Layered parallax strips

### 🎨 Surface Axis
1. Gradient mesh with 4+ color stops
2. Noise grain texture (SVG feTurbulence)
3. Dot matrix repeating pattern
4. Animated shader (GLSL/Three.js)
5. Blurred blob shapes floating

### ⚡ Motion Axis
1. Gradient hue-rotate on slow loop (30s)
2. Parallax scroll displacement
3. Floating blob shapes drifting randomly
4. Noise texture pulsing opacity
5. Color stops shifting position on mousemove

### 🎭 Mood Axis
1. Deep space void — near-black with distant star dots
2. Aurora borealis — flowing green/purple/blue gradients
3. Corporate clean — subtle light gray gradient
4. Neon city — pink/cyan/purple gradient mesh
5. Nature — warm earth tones, organic noise

### 🧩 Composition Axis
1. Behind hero section
2. Full-page application backdrop
3. Card container background
4. Section divider gradient band
5. Overlay beneath modals

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Aurora Mesh
4 large blurred circles (200-400px) in brand colors, absolutely positioned at different corners. Each circle drifts slowly on a random path using CSS keyframes (30-60s duration). Overlapping creates aurora-like color blending. Base is near-black (#050505).

### Recipe 2: Dot Field
repeating-radial-gradient creating a uniform dot pattern (1px dots, 20px spacing) at 5% opacity on dark background. Dots subtly shift position on scroll (parallax). A gradient overlay fades dots to transparent at edges.

### Recipe 3: Void Grain
pure black (#000) background with SVG noise filter overlay at 4% opacity. A single radial-gradient spotlight (brand-color at 3% opacity) follows cursor position with lerped delay. Creates a 'living darkness' effect.

### Recipe 4: Shader Waves
React Three Fiber canvas with custom GLSL fragment shader. Sine-wave displacement of color bands. Colors shift based on time uniform. Renders behind content with pointer-events-none. Fallback: CSS gradient for SSR.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Hero section**
- **Full-page backdrop**
- **Section divider**
- **Auth pages**

## 13. 🔗 Composes With

Load these companion blueprints when building with Backgrounds:

- `components/heroes.md` — Heroes
- `components/cards.md` — Cards


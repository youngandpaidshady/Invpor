# 21st.dev Component Skill: Shaders

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 15+
> **Training Data:** 90 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Shaders components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 90 analyzed Shaders implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Drag and drop**
- **Framer Motion animations**
- **Framer Motion useMotionValue**
- **Framer Motion useTransform**
- **GLSL shaders**
- **GSAP animation library**
- **Glassmorphism / backdrop blur**
- **HTML Canvas rendering**
- **Lucide React icons**
- **Next.js Image optimization**
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
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @gsap/react @paper-design/shaders-react @radix-ui/react-slot @react-three/drei @react-three/fiber class-variance-authority framer-motion gsap lucide-react next next-themes r3f-perf three
```

| Dependency | Purpose |
|---|---|
| `@gsap/react` | Professional animation |
| `@paper-design/shaders-react` | Utility |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@react-three/drei` | 3D rendering |
| `@react-three/fiber` | 3D rendering |
| `class-variance-authority` | Variant management |
| `framer-motion` | Physics-based animations |
| `gsap` | Professional animation |
| `lucide-react` | SVG icon library |
| `next` | Next.js framework feature |
| `next-themes` | Next.js framework feature |
| `r3f-perf` | Utility |
| `three` | 3D rendering |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `InteractiveNebulaShader.tsx`
- `ShaderDemo_ATC.tsx`
- `abstract-glassy-shader.tsx`
- `aether-flow.tsx`
- `ai-input-hero.tsx`
- `animate-card-animation.tsx`
- `animated-shader-background.tsx`
- `animated-shader-hero.tsx`
- `arcane-orb.tsx`
- `asd.tsx`
- `astral-flare-shader.tsx`
- `atc-shader.tsx`
- `aura-core.tsx`
- `aurora-borealis-shader.tsx`
- `aurora-flow-shader.tsx`
- `aurora-shader.tsx`
- `background-paper-shaders.tsx`
- `black-hole-shader.tsx`
- `celestial-bloom-shader.tsx`
- `celestial-ink-shader.tsx`
- ...and 71 more variants

## 4. Props & Variant Patterns

### CVA Variant Names Found
- `cool`
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
- `xl (size)`
- `xxl (size)`

### Custom Props Found
- `Default`
- `amount`
- `amplitude`
- `animated`
- `animationSpeed`
- `animationState`
- `ariaLabel`
- `asChild`
- `badgeLabel`
- `badgeText`
- `bgColor`
- `boxHalfSize`
- `buttonClassName`
- `buttonText`
- `cameraSpeed`
- `cellDensity`
- `circleRadius1`
- `circleRadius2`
- `cloudDensity`
- `color`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { Infinity, Rocket, Shield, Brain, Play, ChevronDown } from 'lucide-react';

const AnoAI = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;

```

### Pattern 2
```tsx
import { useEffect, useRef } from "react"

const vertSrc = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
void main(){ gl_Position = vec4(a_pos,0.0,1.0); }`

const fragSrc = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2  u_res;
uniform float u_time;

// robust tanh fallback
float tanh1(float x){ float e = exp(2.0*x); return (e-1.0)/(e+1.0); }
vec4 tanh4(vec4 v){ return vec4(tanh1(v.x), tanh1(v.y), tanh1(v.z), tanh1(v.w)); }

void main(){
  vec3 FC = vec3(gl_FragCoord.xy, 0.0);
  vec3 r  = vec3(u_res, max(u_res.x, u_res.y));
  float t = u_time;

  vec4 o = vec4(0.0);

  // === your code with safe inits & valid mat2 multiply, tanh replacement ===
  vec3 p = vec3(0.0);
```

### Pattern 3
```tsx
import { Warp } from "@paper-design/shaders-react"

export default function WarpShaderHero() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Warp
          style={{ height: "100%", width: "100%" }}
          proportion={0.45}
          softness={1}
          distortion={0.25}
          swirl={0.8}
          swirlIterations={10}
          shape="checks"
          shapeScale={0.1}
          scale={1}
          rotation={0}
          speed={1}
          colors={["hsl(200, 100%, 20%)", "hsl(160, 100%, 75%)", "hsl(180, 90%, 30%)", "hsl(170, 100%, 80%)"]}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <div className="max-w-4xl w-full text-center space-y-8">
          <h1 className="text-white text-5xl md:text-7xl font-sans font-light text-balance">
            Elegant Shader Backgrounds
          </h1>
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/shader.tsx`
2. Install required dependencies: `@gsap/react, @paper-design/shaders-react, @radix-ui/react-slot`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `shaderVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Shaders must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Shaders components:

1. **Never repeat a design** — with 15+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Shaders component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Full-viewport background shader
2. Card-contained shader effect
3. Section divider shader strip
4. Interactive shader responding to mouse
5. Shader as image/texture generator

### 🎨 Surface Axis
1. GLSL fragment shader on Three.js plane
2. CSS-only animated gradient approximation
3. Canvas 2D noise/particle field
4. WebGL post-processing effects
5. SVG filter-based shader simulation

### ⚡ Motion Axis
1. Time-based continuous animation (uniform float)
2. Mouse position influences shader (uniform vec2)
3. Scroll position maps to shader param
4. Audio-reactive shader visualizer
5. Color palette shifts over time

### 🎭 Mood Axis
1. Deep space — black, distant particles, void
2. Aurora — flowing color bands, ethereal
3. Ocean — wave displacement, deep blue
4. Neon — bright colors, high contrast, cyberpunk
5. Organic — noise-based, earth tones, natural flow

### 🧩 Composition Axis
1. Hero section background
2. Ambient page background
3. Card surface texture
4. Loading screen visual
5. Interactive art piece

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Flow Field
GLSL fragment shader with Perlin noise-based flow field. Dark background (#050505) with brand-color particles following flow vectors. Time uniform creates continuous drift. Mouse position creates attraction/repulsion. Renders on Three.js fullscreen quad. Fallback: dark gradient for SSR.

### Recipe 2: Aurora Bands
sine-wave color bands flowing horizontally across screen. Colors interpolate through brand palette. Movement controlled by time uniform. Subtle noise displacement adds organic feel. Low brightness (max 30%) to keep content readable. Full-viewport background.

### Recipe 3: Noise Grain
simple but effective: base dark color with animated Perlin noise at very low opacity (3-5%). Noise scrolls slowly upward. Creates living, breathing background texture. Can be CSS-only with SVG feTurbulence + animation. Lightweight, universal.

### Recipe 4: Mesh Gradient
Weber-style color mesh with 4-6 gradient control points. Points drift slowly on circular paths. Colors blend smoothly between points. Blur and saturation create dreamy effect. Full canvas. Colors from brand palette. Mouse proximity influences nearest point.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Hero backgrounds**
- **Loading screens**
- **About page ambience**
- **Auth page bg**

## 13. 🔗 Composes With

Load these companion blueprints when building with Shaders:

- `components/heroes.md` — Heroes
- `components/backgrounds.md` — Backgrounds


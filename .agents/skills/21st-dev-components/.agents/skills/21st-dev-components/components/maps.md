# 21st.dev Component Skill: Maps

> **Priority:** STANDARD
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 2+
> **Training Data:** 0 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Maps components with unique designs every time.

---

## 1. Core Techniques

The following techniques are essential for premium Maps implementations:

- **React refs**
- **React state management**
- **React effects**
- **CSS gradients**
- **Framer Motion animations**
- **Intersection Observer API**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install framer-motion clsx tailwind-merge lucide-react
```

| Dependency | Purpose |
|---|---|
| `framer-motion` | Physics-based animations |
| `clsx` | Class composition |
| `tailwind-merge` | Class composition |
| `lucide-react` | SVG icon library |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:


## 6. Integration Workflow

1. Create the component file in `/components/ui/map.tsx`
2. Install required dependencies: `framer-motion, clsx, tailwind-merge`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `mapVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Maps must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing

## 8. Design Philosophy

When generating Maps components:

1. **Never repeat a design** — with 2+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Maps component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Full-width interactive map
2. Map card with location info sidebar
3. Mini-map with address overlay
4. Globe/3D map visualization
5. Static map image with pin markers

### 🎨 Surface Axis
1. Dark-themed map tiles with brand-color pins
2. Glass overlay panel with location details
3. Satellite imagery with UI overlay
4. Stylized illustration-style map
5. Minimal outlined map with dots for cities

### ⚡ Motion Axis
1. Smooth pan and zoom on interaction
2. Pins bounce in staggered on load
3. Info card slides in on pin click
4. Globe rotates slowly, arc lines animate
5. Zoom-to-location with spring easing

### 🎭 Mood Axis
1. Corporate — clean pins, address cards, professional
2. Travel — colorful, photo thumbnails, exploratory
3. Data — heatmap overlay, density visualization
4. Futuristic — globe, arc connections, dark theme
5. Minimal — outline-only, single brand-color accent

### 🧩 Composition Axis
1. Contact page location map
2. Store locator
3. Coverage area visualization
4. Event location details
5. Global presence showcase

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Globe Network
3D rotating globe (cobe library or Three.js). Arc lines animate between locations showing connections. Dots pulse at city locations. Dark background. Globe rotates slowly, can be dragged. Location labels float near dots. Premium SaaS globe visualization.

### Recipe 2: Dark Tile Map
interactive map with dark-themed tiles. Custom brand-color markers pulse on hover. Click marker: glass info card slides in from side with location details, image, and CTA. Smooth zoom and pan. Cluster markers for density.

### Recipe 3: Dotted World
SVG world map made of dots (dotted-map library). Highlighted regions in brand color. Hover region: tooltip with country name and stat. Dots pulse staggered by region on mount. Clean, abstract, data-focused.

### Recipe 4: Static Pin Card
rounded card containing a static map image with a single centered pin. Address text below. Directions link. Glass card surface. Pin has brand-color fill with pulse animation. Clean, functional, compact.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Contact page**
- **Store locator**
- **Real estate listing**
- **Travel app**

## 13. 🔗 Composes With

Load these companion blueprints when building with Maps:

- `components/cards.md` — Cards
- `components/popovers.md` — Popovers
- `components/buttons.md` — Buttons


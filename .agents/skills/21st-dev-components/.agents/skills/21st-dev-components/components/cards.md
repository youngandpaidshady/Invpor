# 21st.dev Component Skill: Cards

> **Priority:** CRITICAL
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 79+
> **Training Data:** 0 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Cards components with unique designs every time.

---

## 1. Core Techniques

The following techniques are essential for premium Cards implementations:

- **Framer Motion animations**
- **Framer Motion spring physics**
- **Framer Motion useMotionValue**
- **Framer Motion useTransform**
- **Glassmorphism / backdrop blur**
- **CSS gradients**
- **CSS keyframe animations**
- **React.forwardRef pattern**
- **cn() utility (clsx + tailwind-merge)**
- **CVA (class-variance-authority) variants**
- **Radix UI primitives**
- **Lucide React icons**
- **React refs**
- **React state management**
- **ARIA accessibility attributes**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install class-variance-authority clsx tailwind-merge framer-motion lucide-react @radix-ui/react-slot
```

| Dependency | Purpose |
|---|---|
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `tailwind-merge` | Class composition |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `@radix-ui/react-slot` | Headless accessible primitives |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:


## 6. Integration Workflow

1. Create the component file in `/components/ui/card.tsx`
2. Install required dependencies: `class-variance-authority, clsx, tailwind-merge`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `cardVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Cards must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing

## 8. Design Philosophy

When generating Cards components:

1. **Never repeat a design** — with 79+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Cards component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Vertical stack (image top, content bottom)
2. Horizontal (image left, content right)
3. Overlay (content on image)
4. Bento grid multi-card layout
5. Profile card (avatar centered)

### 🎨 Surface Axis
1. Glass with backdrop-blur and border-white/10
2. Solid dark with subtle border
3. Gradient fill shifting on hover
4. Neumorphic raised with soft shadows
5. Outlined wireframe with dashed borders

### ⚡ Motion Axis
1. 3D tilt following cursor (rotateX/Y)
2. Hover lift Y-4px with shadow expansion
3. Glare effect (moving light reflection)
4. Content stagger-in on card visibility
5. Card flip (front/back) on click

### 🎭 Mood Axis
1. Premium product — image-forward, minimal text, luxe
2. Dashboard stat — number-heavy, chart sparkline, compact
3. Social post — avatar, content, action bar, rounded
4. Portfolio project — full-image bleed, overlay text
5. Pricing tier — features list, CTA, highlight popular

### 🧩 Composition Axis
1. Grid of cards (2-4 columns)
2. Single featured card hero
3. Carousel of scrolling cards
4. Stacked deck (cards overlap depth)
5. Masonry layout irregular grid

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Tilt Glass
frosted-glass card with backdrop-blur-xl. 3D perspective tilt follows cursor (max ±10°). Moving light glare effect tracks cursor position. Border-white/10, brand-color inner shadow glow on hover. Content fades up staggered on mount.

### Recipe 2: Bento Block
variable-width cards in a CSS grid bento layout. Some cards span 2 columns. Each card has a unique gradient background. Content types: stat number, icon+text, small image, chart sparkline. Cards pop-in staggered on scroll.

### Recipe 3: Flip Card
two-sided card with 3D rotateY flip on hover/click. Front: image + title. Back: description + CTA. CSS perspective 1000px. Smooth 600ms transition. Back has inverted color scheme.

### Recipe 4: Stack Deck
cards stacked with slight Y-offset and scale reduction creating depth. Top card is full scale. Scroll or click advances the stack. Cards animate with spring to new positions. Depth shadow increases per layer.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Dashboard stats**
- **Feature grid**
- **Blog listing**
- **Product catalog**
- **Portfolio**

## 13. 🔗 Composes With

Load these companion blueprints when building with Cards:

- `components/buttons.md` — Buttons
- `components/badges.md` — Badges
- `components/images.md` — Images
- `components/avatars.md` — Avatars
- `components/icons.md` — Icons


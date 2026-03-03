# 21st.dev Component Skill: Toggles

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 12+
> **Training Data:** 0 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Toggles components with unique designs every time.

---

## 1. Core Techniques

The following techniques are essential for premium Toggles implementations:

- **Framer Motion animations**
- **Framer Motion spring physics**
- **Radix UI primitives**
- **cn() utility (clsx + tailwind-merge)**
- **React state management**
- **CSS keyframe animations**
- **ARIA accessibility attributes**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @radix-ui/react-switch framer-motion clsx tailwind-merge class-variance-authority
```

| Dependency | Purpose |
|---|---|
| `@radix-ui/react-switch` | Headless accessible primitives |
| `framer-motion` | Physics-based animations |
| `clsx` | Class composition |
| `tailwind-merge` | Class composition |
| `class-variance-authority` | Variant management |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:


## 6. Integration Workflow

1. Create the component file in `/components/ui/toggle.tsx`
2. Install required dependencies: `@radix-ui/react-switch, framer-motion, clsx`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `toggleVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Toggles must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing

## 8. Design Philosophy

When generating Toggles components:

1. **Never repeat a design** — with 12+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Toggles component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Standard horizontal toggle switch
2. Toggle with label on both sides (On/Off)
3. Icon toggle (sun/moon theme switch)
4. Toggle group (multiple toggles in section)
5. Large toggle card (feature toggle)

### 🎨 Surface Axis
1. Pill track with circular thumb
2. iOS-style green/gray toggle
3. Dark track with glowing thumb
4. Outlined track with solid thumb
5. Glass track with brand-color active fill

### ⚡ Motion Axis
1. Thumb slides with spring physics
2. Track color transitions smoothly
3. Thumb size pulse on state change
4. Icon morph (sun ↔ moon) during toggle
5. Ripple expands from thumb on change

### 🎭 Mood Axis
1. System — iOS/Android standard toggle feel
2. Settings — label + description + toggle row
3. Theme — light/dark mode switch, icon morphing
4. Premium — glass, glow effects, tactile feel
5. Gaming — neon, pulse effects, dramatic state change

### 🧩 Composition Axis
1. Settings preference toggle
2. Theme mode switcher
3. Feature enable/disable
4. Form boolean input
5. Dashboard widget visibility toggle

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Spring Switch
pill-shaped track (48x24px). Circular thumb slides between left and right with spring physics (stiffness: 500, damping: 30). Off: gray track. On: brand-color track with glow. Thumb size pulses slightly on change (scale 1.1 → 1.0). Satisfying spring overshoot.

### Recipe 2: Theme Morph
toggle switch where thumb contains an icon that morphs between sun (☀) and moon (🌙) using SVG path interpolation. Track color transitions. Sun rays rotate in. Moon craters fade in. Used for light/dark mode. Premium, delightful micro-interaction.

### Recipe 3: Cinematic Glow
dark track with lit thumb. On state: thumb glows brand-color with box-shadow bloom. Track brightens. Off: thumb is matte gray, track is dark. Transition is smooth 300ms. Hover: subtle glow even in off state. Premium, cinematic feel.

### Recipe 4: Feature Card Toggle
full-width card with feature icon, title, description on left. Toggle switch on right. Card has subtle border. Toggle on: card gets faint brand-color background tint. Used in settings pages for feature flags. Clean, scannable layout.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Settings**
- **Dark mode switch**
- **Feature flags**
- **Notification preferences**

## 13. 🔗 Composes With

Load these companion blueprints when building with Toggles:

- `components/forms.md` — Forms
- `components/cards.md` — Cards


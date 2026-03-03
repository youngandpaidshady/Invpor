# 21st.dev Component Skill: Tooltips

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 28+
> **Training Data:** 0 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Tooltips components with unique designs every time.

---

## 1. Core Techniques

The following techniques are essential for premium Tooltips implementations:

- **Framer Motion animations**
- **AnimatePresence exit animations**
- **Radix UI primitives**
- **cn() utility (clsx + tailwind-merge)**
- **React state management**
- **CSS gradients**
- **Glassmorphism / backdrop blur**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @radix-ui/react-tooltip framer-motion clsx tailwind-merge
```

| Dependency | Purpose |
|---|---|
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `framer-motion` | Physics-based animations |
| `clsx` | Class composition |
| `tailwind-merge` | Class composition |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:


## 6. Integration Workflow

1. Create the component file in `/components/ui/tooltip.tsx`
2. Install required dependencies: `@radix-ui/react-tooltip, framer-motion, clsx`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `tooltipVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Tooltips must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing

## 8. Design Philosophy

When generating Tooltips components:

1. **Never repeat a design** — with 28+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Tooltips component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Floating above trigger
2. Floating below trigger
3. Side-anchored (left/right)
4. Multi-line content tooltip
5. Rich tooltip with card-style content

### 🎨 Surface Axis
1. Frosted glass with border-white/10
2. Solid dark with arrow pointer
3. Brand-color background with white text
4. Glass with gradient accent border
5. Outlined card with subtle shadow

### ⚡ Motion Axis
1. Pop in with scale spring from anchor
2. Fade in with 200ms delay
3. Slide in from anchor direction (top/bottom/left/right)
4. Content staggers in (icon → label → description)
5. Exit: scale to zero toward anchor point

### 🎭 Mood Axis
1. System — small text tip, clean, functional
2. Rich preview — larger card with metadata/image
3. Keyboard shortcut — small pill, shortcut key label
4. Contextual help — icon + description, learn-more link
5. Status — colored by state, minimal text

### 🧩 Composition Axis
1. Icon button hover label
2. Truncated text full reveal
3. Keyboard shortcut hint
4. Form field help text
5. Navigation item description

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Glass Whisper
small frosted-glass tooltip with backdrop-blur-md. Appears on hover after 200ms delay. Positioned dynamically to stay in viewport. Arrow pointer in matching glass style. Text in text-xs. Spring-scale entrance from anchor. Exit with quick fade. Border-white/10.

### Recipe 2: Rich Preview
larger tooltip card appearing on hover. Contains: icon, title, description, optional action link. Glass surface. Content staggers in (icon first, text follows). Used for complex hover previews. Keyboard accessible (focus-triggered). Max-width 280px.

### Recipe 3: Shortcut Pill
tiny pill-shaped tooltip (rounded-full, ~24px height) showing keyboard shortcut (e.g., '⌘K'). Monospace text. Muted background. Appears instantly on hover. Used next to menu items and action buttons. Minimal, functional.

### Recipe 4: Status Tip
tooltip with colored dot indicator (green/yellow/red) + status text. Dot pulses for active states. Used on avatar status dots, system indicators. Glass surface. Arrow pointer. Quick fade-in entrance. Small, informative.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Icon buttons**
- **Truncated text**
- **Chart data points**
- **Action hints**

## 13. 🔗 Composes With

Load these companion blueprints when building with Tooltips:

- `components/buttons.md` — Buttons
- `components/icons.md` — Icons
- `components/avatars.md` — Avatars
- `components/badges.md` — Badges


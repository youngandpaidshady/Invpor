# 21st.dev Component Skill: Texts

> **Priority:** CRITICAL
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 58+
> **Training Data:** 0 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Texts components with unique designs every time.

---

## 1. Core Techniques

The following techniques are essential for premium Texts implementations:

- **Framer Motion animations**
- **CSS gradients**
- **CSS keyframe animations**
- **cn() utility (clsx + tailwind-merge)**
- **React state management**
- **Intersection Observer / useInView**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install framer-motion clsx tailwind-merge class-variance-authority
```

| Dependency | Purpose |
|---|---|
| `framer-motion` | Physics-based animations |
| `clsx` | Class composition |
| `tailwind-merge` | Class composition |
| `class-variance-authority` | Variant management |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:


## 6. Integration Workflow

1. Create the component file in `/components/ui/text.tsx`
2. Install required dependencies: `framer-motion, clsx, tailwind-merge`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `textVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Texts must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing

## 8. Design Philosophy

When generating Texts components:

1. **Never repeat a design** — with 58+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Texts component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Heading hierarchy (h1-h6)
2. Paragraph body text
3. Animated text reveal
4. Code/monospace text block
5. Gradient text display

### 🎨 Surface Axis
1. Gradient fill text (CSS background-clip)
2. Solid brand-color headings
3. Matte body text with line-height 1.6
4. Text with subtle text-shadow glow
5. Outlined/stroke text (no fill)

### ⚡ Motion Axis
1. Typewriter character-by-character reveal
2. Word-by-word fade-up stagger
3. Letter-by-letter spring entrance
4. Text blur-in from 20px to 0
5. Gradient hue-shift animation on text

### 🎭 Mood Axis
1. Editorial — serif, elegant, sophisticated spacing
2. Technical — monospace, precise, code-like
3. Bold branding — oversized, gradient, all-caps
4. Minimal — thin weight, generous spacing, quiet
5. Playful — variable sizes, colorful, animated

### 🧩 Composition Axis
1. Hero headline
2. Section titles
3. Body copy paragraphs
4. Code snippets inline
5. Brand statement

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Gradient Headline
large heading (text-5xl to text-7xl) with CSS gradient text (background-clip: text). Gradient shifts through brand spectrum. Optional: gradient animates slowly (translate background-position). Bold weight. Used for hero headlines and section titles.

### Recipe 2: Stagger Words
sentence where each word fades up individually with stagger delay (80ms per word). Uses Framer Motion with variants. Words start at opacity:0 y:20px and animate to opacity:1 y:0. Scroll-triggered or on mount. Impactful for important headlines.

### Recipe 3: Typewriter
text reveals character by character with a blinking cursor at the end. Cursor blinks at 500ms interval. Text appears at configurable speed. Optional: multiple strings that type, pause, delete, and type next (TypeIt style). Monospace or sans-serif.

### Recipe 4: Blur Reveal
text starts with blur(12px) and opacity:0. On scroll/mount, transitions to blur(0) and opacity:1 over 800ms with ease-out. Entire block reveals together. Subtle, premium effect. Can be combined with y-translate for drift-in.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Hero headlines**
- **Blog content**
- **Feature descriptions**
- **Marketing copy**

## 13. 🔗 Composes With

Load these companion blueprints when building with Texts:

- `components/heroes.md` — Heroes
- `components/cards.md` — Cards
- `components/features.md` — Features


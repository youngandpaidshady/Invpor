# 21st.dev Component Skill: Tags

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 6+
> **Training Data:** 0 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Tags components with unique designs every time.

---

## 1. Core Techniques

The following techniques are essential for premium Tags implementations:

- **Framer Motion animations**
- **cn() utility (clsx + tailwind-merge)**
- **CVA (class-variance-authority) variants**
- **Lucide React icons**
- **React state management**
- **CSS gradients**
- **ARIA accessibility attributes**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install class-variance-authority clsx tailwind-merge framer-motion lucide-react
```

| Dependency | Purpose |
|---|---|
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `tailwind-merge` | Class composition |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:


## 6. Integration Workflow

1. Create the component file in `/components/ui/tag.tsx`
2. Install required dependencies: `class-variance-authority, clsx, tailwind-merge`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `tagVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Tags must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing

## 8. Design Philosophy

When generating Tags components:

1. **Never repeat a design** — with 6+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Tags component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Inline pill tag
2. Tag list with wrapping
3. Removable tag with X
4. Tag input field (type to create)
5. Grouped tags by category

### 🎨 Surface Axis
1. Solid brand-color fill with dark text
2. Outlined with brand-color border
3. Gradient fill tag
4. Glass tag with backdrop blur
5. Muted background with colored dot prefix

### ⚡ Motion Axis
1. Tag created: spring-scale in from zero
2. Tag removed: collapse width + fade
3. Hover: lift with shadow increase
4. Tag input: new tag pops in on Enter
5. Drag to reorder tags

### 🎭 Mood Axis
1. Content — blog categories, subtle, muted
2. Status — colored by state (active/archived/draft)
3. Technical — code-like, monospace, compact
4. Social — hashtags, clickable, interactive
5. Design — color swatches, visual, brand-heavy

### 🧩 Composition Axis
1. Blog post categories
2. Filter/facet selected values
3. Skill/technology labels
4. Product feature tags
5. Search tag refinement

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Glass Pill
frosted-glass tag with backdrop-blur-sm. Brand-color text. Rounded-full. Hover: lift + shadow. Removable variant has X button that fades in on hover. Created with spring-scale animation. Removed with width-collapse. Used for filters, categories.

### Recipe 2: Status Tag
small rounded pill with colored dot prefix (green: active, yellow: pending, red: error). Background matches dot color at 10% opacity. No border. Text in standard weight. Compact (24px height). Used in tables, lists for status indication.

### Recipe 3: Input Tags
text input that creates tags on Enter key. Tags appear as pills inside the input area. Each new tag pops in with spring-scale. Remove via X button or Backspace key. Tags wrap to multiple lines. Used for multi-value inputs (skills, emails, categories).

### Recipe 4: Category Cloud
collection of tags in varying sizes based on frequency/importance. Larger tags are more prominent. Tags arranged in a cloud layout (flex wrap). Hover: tag lifts + brand-color underline. Clickable for filtering. Stagger-in on scroll.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Blog post metadata**
- **Product filters**
- **Skill labels**
- **Search tokens**

## 13. 🔗 Composes With

Load these companion blueprints when building with Tags:

- `components/cards.md` — Cards
- `components/inputs.md` — Inputs
- `components/badges.md` — Badges


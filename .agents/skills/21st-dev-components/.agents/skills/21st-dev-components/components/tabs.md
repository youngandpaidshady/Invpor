# 21st.dev Component Skill: Tabs

> **Priority:** EXTRA_HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 38+
> **Training Data:** 0 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Tabs components with unique designs every time.

---

## 1. Core Techniques

The following techniques are essential for premium Tabs implementations:

- **Framer Motion animations**
- **Framer Motion spring physics**
- **Radix UI primitives**
- **cn() utility (clsx + tailwind-merge)**
- **CVA (class-variance-authority) variants**
- **AnimatePresence exit animations**
- **React state management**
- **CSS keyframe animations**
- **ARIA accessibility attributes**
- **Lucide React icons**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @radix-ui/react-tabs framer-motion class-variance-authority clsx tailwind-merge lucide-react
```

| Dependency | Purpose |
|---|---|
| `@radix-ui/react-tabs` | Headless accessible primitives |
| `framer-motion` | Physics-based animations |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `tailwind-merge` | Class composition |
| `lucide-react` | SVG icon library |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:


## 6. Integration Workflow

1. Create the component file in `/components/ui/tab.tsx`
2. Install required dependencies: `@radix-ui/react-tabs, framer-motion, class-variance-authority`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `tabVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Tabs must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing

## 8. Design Philosophy

When generating Tabs components:

1. **Never repeat a design** — with 38+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Tabs component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Horizontal tab bar with content panel
2. Vertical tab list sidebar
3. Pill/segmented control tabs
4. Underline tab bar
5. Scrollable tab strip (overflow)

### 🎨 Surface Axis
1. Glass tab bar with active indicator
2. Outlined tabs with active fill
3. Underline indicator bar (brand-color)
4. Pill-shaped active background
5. Card-style raised active tab

### ⚡ Motion Axis
1. Active indicator slides between tabs (layoutId spring)
2. Content panel crossfades on tab change
3. Tab hover: subtle background fill
4. Active tab icon animates/bounces
5. Content enters from direction of tab (left→right or right→left)

### 🎭 Mood Axis
1. Dashboard — compact, icon+label, badge counts
2. Settings — section selector, full-width panels
3. Documentation — clean, content-focused, code tabs
4. Creative — large tabs, animated transitions, playful
5. Minimal — text-only, underline indicator, spare

### 🧩 Composition Axis
1. Settings page section switcher
2. Dashboard multi-view tabs
3. Code block language tabs
4. Product detail tabs (Description/Reviews/Specs)
5. Profile page section tabs

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Sliding Pill
horizontal tabs with active tab background as a pill shape that slides between tabs using layoutId animation (spring physics). Inactive tabs: transparent. Active: brand-color fill with white text. Content crossfades below. Clean, app-like.

### Recipe 2: Underline Glide
horizontal text tabs with a 2px bottom border indicator that slides between active tabs (spring animation). Text brightens on active. Content transitions based on direction (tab index delta determines slide left/right). Clean, editorial.

### Recipe 3: Vertical Section
vertical tab list on left (200px), content panel on right. Active tab has brand-color left bar + background fill. Tabs are full-width buttons with icon + label. Content crossfades on change. Responsive: collapses to dropdown trigger on mobile.

### Recipe 4: Icon Tabs
tabs with icon above label. Active icon fills/animates (brand color). Badge count on tab icon for notifications. Tab bar has subtle bottom border. Content panel scrollable. Active indicator dot below tab. Used for app section. tabs.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Settings panels**
- **Product details**
- **Dashboard sections**
- **Code examples**

## 13. 🔗 Composes With

Load these companion blueprints when building with Tabs:

- `components/cards.md` — Cards
- `components/forms.md` — Forms
- `components/tables.md` — Tables
- `components/scroll-areas.md` — Scroll Areas


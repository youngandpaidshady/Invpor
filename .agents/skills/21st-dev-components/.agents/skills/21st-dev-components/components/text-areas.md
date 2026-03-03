# 21st.dev Component Skill: Text Areas

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 22+
> **Training Data:** 0 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Text Areas components with unique designs every time.

---

## 1. Core Techniques

The following techniques are essential for premium Text Areas implementations:

- **Framer Motion animations**
- **React Hook Form**
- **React refs**
- **cn() utility (clsx + tailwind-merge)**
- **Radix UI primitives**
- **React state management**
- **ARIA accessibility attributes**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @radix-ui/react-label framer-motion clsx tailwind-merge react-hook-form
```

| Dependency | Purpose |
|---|---|
| `@radix-ui/react-label` | Headless accessible primitives |
| `framer-motion` | Physics-based animations |
| `clsx` | Class composition |
| `tailwind-merge` | Class composition |
| `react-hook-form` | Form state management |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:


## 6. Integration Workflow

1. Create the component file in `/components/ui/text-area.tsx`
2. Install required dependencies: `@radix-ui/react-label, framer-motion, clsx`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `text-areaVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Text Areas must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing

## 8. Design Philosophy

When generating Text Areas components:

1. **Never repeat a design** — with 22+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Text Areas component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Standard multi-line textarea
2. Auto-expanding textarea
3. Textarea with character count
4. Textarea with toolbar (rich text)
5. Code editor textarea

### 🎨 Surface Axis
1. Dark with glow border on focus
2. Outlined with resize handle
3. Glass with backdrop blur
4. Underline-only (minimal style)
5. Solid fill with no visible border

### ⚡ Motion Axis
1. Focus: border glow transitions to brand-color
2. Auto-resize: height animates smoothly
3. Character count: color shifts as limit approaches
4. Toolbar: items stagger-in on focus
5. Error: border turns red + shake animation

### 🎭 Mood Axis
1. Chat — auto-resize, send button, attachment option
2. Form — label, placeholder, character limit, validation
3. Code — monospace, line numbers, syntax potential
4. Note — large, minimal, distraction-free
5. Feedback — star rating above textarea, submit below

### 🧩 Composition Axis
1. Contact form message field
2. Chat message composer
3. Comment/reply box
4. Code/markdown editor
5. Notes/journal entry field

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Auto-Grow Glass
frosted-glass textarea that auto-expands height as user types. Smooth height transition (spring). Focus: brand-color border glow. Character count in bottom-right corner, turns orange at 80% and red at 100%. Placeholder fades out on type.

### Recipe 2: Chat Composer
compact textarea (2 lines default) with send button to right. Auto-grows up to 6 lines. Attachment button left. Shift+Enter for new line, Enter to send. Focus glow. Button pulses when message is ready. Used in chat interfaces.

### Recipe 3: Code Input
monospace textarea with dark (#0d0d0d) background. Line numbers on left. Tab key inserts spaces (not focus change). Focus: subtle green border. Resize handle. Scrollbar thin and styled. Used for code/JSON input fields.

### Recipe 4: Toolbar Rich
textarea with formatting toolbar above (Bold, Italic, Link, List icons). Toolbar items have hover highlight. Toolbar fades/slides in on focus, out on blur. Textarea below with clean styling. Word count in footer bar. Form-field usage.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Forms**
- **Comment sections**
- **Chat input**
- **Feedback forms**
- **Note editors**

## 13. 🔗 Composes With

Load these companion blueprints when building with Text Areas:

- `components/forms.md` — Forms
- `components/buttons.md` — Buttons


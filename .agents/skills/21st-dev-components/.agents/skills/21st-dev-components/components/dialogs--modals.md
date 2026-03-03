# 21st.dev Component Skill: Dialogs / Modals

> **Priority:** EXTRA_HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 37+
> **Training Data:** 0 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Dialogs / Modals components with unique designs every time.

---

## 1. Core Techniques

The following techniques are essential for premium Dialogs / Modals implementations:

- **Framer Motion animations**
- **AnimatePresence exit animations**
- **Glassmorphism / backdrop blur**
- **Radix UI primitives**
- **React.forwardRef pattern**
- **cn() utility (clsx + tailwind-merge)**
- **CSS keyframe animations**
- **React refs**
- **React state management**
- **ARIA accessibility attributes**
- **Lucide React icons**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @radix-ui/react-dialog framer-motion class-variance-authority clsx tailwind-merge lucide-react
```

| Dependency | Purpose |
|---|---|
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `framer-motion` | Physics-based animations |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `tailwind-merge` | Class composition |
| `lucide-react` | SVG icon library |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:


## 6. Integration Workflow

1. Create the component file in `/components/ui/dialog.tsx`
2. Install required dependencies: `@radix-ui/react-dialog, framer-motion, class-variance-authority`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `dialogVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Dialogs / Modals must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing

## 8. Design Philosophy

When generating Dialogs / Modals components:

1. **Never repeat a design** — with 37+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Dialogs / Modals component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Centered modal with backdrop
2. Full-screen takeover
3. Slide-in side panel (drawer)
4. Bottom sheet (mobile-first)
5. Nested multi-step wizard modal

### 🎨 Surface Axis
1. Frosted glass panel on blurred backdrop
2. Solid dark card with brand-color header bar
3. Outlined container with shadow
4. Full-bleed content with no chrome
5. Split dialog (sidebar nav + content area)

### ⚡ Motion Axis
1. Scale-in from center with spring (0.95 → 1.0)
2. Backdrop fades in while modal slides up
3. Exit via scale-down + opacity + backdrop fade
4. Drawer slides from right with spring
5. Content crossfade between wizard steps

### 🎭 Mood Axis
1. Confirmation — warning icon, two-button footer
2. Form dialog — input fields, stepped sections
3. Media viewer — full-screen, dark, content-focused
4. Alert — urgent, icon prominent, single action
5. Premium — glass card, minimal lines, luxe feel

### 🧩 Composition Axis
1. Confirmation before destructive action
2. Settings/preferences editor
3. Image/video lightbox viewer
4. Complex form multi-step
5. Notification detail expansion

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Glass Command
centered frosted-glass modal with backdrop-blur-2xl dimmed backdrop (black/60). Modal springs in from scale-0.95. Header with title + close X. Content area. Two-button footer. Close button has hover glow. Escape key dismisses.

### Recipe 2: Drawer Sheet
slides in from right edge. 400px wide. Dark background with brand-color top accent line. Close button + title header. Scrollable content area. Exit via slide-right + backdrop fade. Can be swiped closed on mobile.

### Recipe 3: Bottom Sheet
mobile-first sheet rising from bottom. Drag handle bar at top. Snap points at 50% and 90% viewport height. Draggable via touch. Spring physics on release. Backdrop dims proportionally to sheet position.

### Recipe 4: Wizard Flow
multi-step modal with progress indicator at top (step dots or bar). Content area crossfades between steps. Back/Next buttons. Step transitions slide left-to-right. Final step has celebration animation.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Confirmation flows**
- **Detail views**
- **Forms**
- **Image lightbox**
- **Settings**

## 13. 🔗 Composes With

Load these companion blueprints when building with Dialogs / Modals:

- `components/forms.md` — Forms
- `components/buttons.md` — Buttons
- `components/inputs.md` — Inputs
- `components/cards.md` — Cards


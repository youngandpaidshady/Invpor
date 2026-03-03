# 21st.dev Component Skill: Announcements

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 10+
> **Training Data:** 0 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Announcements components with unique designs every time.

---

## 1. Core Techniques

The following techniques are essential for premium Announcements implementations:

- **Framer Motion animations**
- **AnimatePresence exit animations**
- **cn() utility (clsx + tailwind-merge)**
- **CSS gradients**
- **CSS keyframe animations**
- **Lucide React icons**
- **React state management**
- **Next.js Link routing**

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

1. Create the component file in `/components/ui/announcement.tsx`
2. Install required dependencies: `framer-motion, clsx, tailwind-merge`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `announcementVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Announcements must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing

## 8. Design Philosophy

When generating Announcements components:

1. **Never repeat a design** — with 10+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Announcements component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Top-of-page sticky banner
2. Floating pill badge centered
3. Side rail notification strip
4. Modal spotlight with backdrop
5. Inline card between content sections

### 🎨 Surface Axis
1. Gradient mesh background (brand colors)
2. Frosted glass with animated border
3. Solid dark with accent text highlights
4. Confetti-particle background overlay
5. Outlined card with shimmer sweep

### ⚡ Motion Axis
1. Slide-down reveal with bounce
2. Typewriter text reveal for headline
3. Confetti particle burst on mount
4. Pulse-glow highlight on CTA button
5. Parallax scroll-away on user scroll

### 🎭 Mood Axis
1. Celebration — confetti, warm colors, exclamation
2. Urgent — red/orange, pulsing, bold text
3. Subtle — minimal, muted, easy to dismiss
4. Product launch — gradient, 3D mockup peek, hype
5. Community — warm, avatar clusters, social proof

### 🧩 Composition Axis
1. Dismissible top banner (remembers state)
2. Overlay blocking page until acknowledged
3. Inline section break announcement
4. Floating badge that expands on click
5. Full-bleed hero-style takeover

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Launch Banner
sticky top bar with animated gradient background (brand colors sweeping left-to-right). Bold headline with sparkle emoji. CTA button with magnetic hover effect. Dismiss X with fade-out + collapse animation. 40px height.

### Recipe 2: Confetti Spotlight
centered modal card with confetti canvas particles bursting from center on mount. Glass card with celebration message, large emoji, and action button. Backdrop dims to 60%. Card springs in with scale.

### Recipe 3: Subtle Pill
small rounded-full pill floating at top-center with 'NEW' badge. Slides down on mount. Expands to reveal full announcement on click. Gradient border animation. Dismisses by flying upward.

### Recipe 4: Side Rail
thin vertical strip on the right edge of viewport. Rotated text reading upward. Expands to card on hover. Colored accent background. Click navigates to announcement detail.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Landing page top bar**
- **Product launch**
- **App update notice**

## 13. 🔗 Composes With

Load these companion blueprints when building with Announcements:

- `components/buttons.md` — Buttons
- `components/badges.md` — Badges
- `components/links.md` — Links


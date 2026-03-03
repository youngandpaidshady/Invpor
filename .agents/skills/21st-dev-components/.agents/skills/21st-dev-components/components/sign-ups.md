# 21st.dev Component Skill: Sign Ups

> **Priority:** STANDARD
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 4+
> **Training Data:** 0 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Sign Ups components with unique designs every time.

---

## 1. Core Techniques

The following techniques are essential for premium Sign Ups implementations:

- **Framer Motion animations**
- **React Hook Form**
- **Zod schema validation**
- **cn() utility (clsx + tailwind-merge)**
- **Radix UI primitives**
- **Lucide React icons**
- **React state management**
- **CSS gradients**
- **Next.js Link routing**
- **ARIA accessibility attributes**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install framer-motion react-hook-form @hookform/resolvers zod clsx tailwind-merge lucide-react @radix-ui/react-label
```

| Dependency | Purpose |
|---|---|
| `framer-motion` | Physics-based animations |
| `react-hook-form` | Form state management |
| `@hookform/resolvers` | Form state management |
| `zod` | Schema validation |
| `clsx` | Class composition |
| `tailwind-merge` | Class composition |
| `lucide-react` | SVG icon library |
| `@radix-ui/react-label` | Headless accessible primitives |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:


## 6. Integration Workflow

1. Create the component file in `/components/ui/sign-up.tsx`
2. Install required dependencies: `framer-motion, react-hook-form, @hookform/resolvers`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `sign-upVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Sign Ups must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing

## 8. Design Philosophy

When generating Sign Ups components:

1. **Never repeat a design** — with 4+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Sign Ups component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Centered card form (extended from sign-in)
2. Multi-step registration wizard
3. Split screen with value proposition
4. Single column long form
5. Conversational step-by-step

### 🎨 Surface Axis
1. Glass card with brand accents
2. Dark theme with input glow
3. Clean card with section dividers
4. Gradient background with floating card
5. Minimal, no-card open form

### ⚡ Motion Axis
1. Multi-step: slides between steps
2. Input validation: inline checkmarks draw in
3. Password strength meter fills with gradient
4. Form completion progress bar
5. Success: confetti + welcome animation

### 🎭 Mood Axis
1. Quick start — minimal fields, social signup prominent
2. Enterprise — company/role fields, policy agreements
3. Community — avatar upload, username picker, interests
4. Premium — invitation-only feel, exclusive language
5. Developer — API key issuance, technical preferences

### 🧩 Composition Axis
1. Registration page
2. Onboarding first step
3. Pricing page convert to signup
4. Invite-only gated registration
5. Trial signup from marketing page

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Wizard Registration
3-step glass card: Step 1 (email + password), Step 2 (name + avatar upload), Step 3 (preferences/interests). Steps slide left-to-right with AnimatePresence. Progress bar at top. Back/Next buttons. Final step: submit + confetti on success.

### Recipe 2: Quick Social
large social login buttons (Google, Apple, GitHub) as primary CTAs. Below divider: compact email/password fallback form. Glass card on dark gradient bg. Social buttons are glass with hover lift. Emphasizes speed: 'Sign up in 10 seconds'.

### Recipe 3: Split Value Prop
left side: sign-up form with glass card. Right side: animated value propositions (feature list, stat counters, testimonial rotator). Form stays fixed while right content showcases benefits. Scrollable on mobile with form first.

### Recipe 4: One-at-a-Time
conversational flow: one field per screen. Large input, single question ('What's your email?'). Enter key or button advances. Progress dots. Backtrack possible. Reduces abandonment. Final screen: account created + welcome.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Registration page**
- **Onboarding first step**
- **Auth modal**

## 13. 🔗 Composes With

Load these companion blueprints when building with Sign Ups:

- `components/forms.md` — Forms
- `components/inputs.md` — Inputs
- `components/buttons.md` — Buttons
- `components/checkboxes.md` — Checkboxes
- `components/links.md` — Links


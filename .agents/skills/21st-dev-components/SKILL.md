---
name: 21st.dev Component Design System Archive
description: Master index and routing blueprint for the 21st.dev Design System. Use this to construct award-winning, premium React UI components across all 59 categories.
---

# 21st.dev Super Component Skill Archive

> **System Genesis:** The original sprawling SKILL file has been transformed into a modular knowledge base. This master document controls design tokens, core philosophies, and routes to deep-dive component instructions.
>
> **Stack:** React 18+, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui, Radix UI primitives, Three.js/GLSL (advanced backgrounds/shaders).
>
> **Training Data:** 2,083 production-grade component prompts scraped from 21st.dev, analyzed and distilled into 61 component skill files.

---

## 📁 Skill Folder Structure

```
21st-dev-components/
├── SKILL.md                    ← You are here (master index)
├── components/                 ← 61 deep-dive component guides
│   ├── accordions.md
│   ├── buttons.md
│   ├── heroes.md
│   └── ... (61 files total)
├── scripts/                    ← Tooling & generators
│   ├── generate_skills.js      ← Skill file generator (reads raw_prompts → writes components/)
│   └── scrape_server.js        ← Local HTTP server for scraping
└── resources/                  ← Raw data & references
    ├── raw_prompts/            ← 48 JSON files with 2,083 scraped prompts
    ├── component-data.json     ← Component metadata & design tokens
    └── components.txt          ← Category index with counts
```

---

## 🚀 The "Never Repeat" & "Alive" Principles

1. **Every component must be "Alive"**: Static designs are dead. Use `framer-motion` for entrance, hover states, and spring physics.
2. **Never Repeat a Design:** The entire archive maps hundreds of archetypes. When asked for a Hero or a Button, select a *unique archetype combo* every time.
3. **Layered Composition:** Components exist in 3D space. Backgrounds (shaders), surfaces (glass cards), and interaction layers (glows) must be composed uniquely.

---

## 🧬 The Spawn Engine — Generative Randomization System

Every component file now contains a **Generative DNA Matrix** (Section 9), **Spawn Recipes** (Section 10), and **Chaos Modifiers** (Section 11). This is the system for creating original designs from nothing:

### How the Spawn Engine Works:
1. **Roll DNA Axes** — Pick ONE option from each of the 5 axes (Layout, Surface, Motion, Mood, Composition) in the component's Section 9. This creates 3,125+ unique combinations per component.
2. **Or Pick a Spawn Recipe** — Section 10 has 4 ready-to-build design blueprints per component. Use one as a complete starting point.
3. **Stack Chaos Modifiers** — Layer 1-3 enhancement effects from Section 11 (particle trails, scan-lines, noise grain, holographic sheen, etc.) on top of any design.
4. **Never repeat** — Track which combinations and recipes have been used. Always generate something new.

### Universal Chaos Modifiers (available to ALL components):
- Particle trail on hover
- Scan-line overlay (1px lines at 5% opacity)
- Noise grain texture (SVG feTurbulence at 3%)
- RGB chromatic split on entrance
- Glow pulse (box-shadow breathes on 3s loop)
- Border gradient animation (conic-gradient rotation)
- Holographic sheen sweep on hover
- Magnetic cursor warp (tilt toward cursor)
- Glitch micro-stutter on entrance
- Frosted edge bleed (backdrop-blur fade)
- Shadow elevation shift on hover
- Dot matrix underlay pattern
- Typewriter text reveal
- Heat distortion wobble
- Neon flicker on entrance

---

## 📂 The Deep-Dive Component Archive
When tasked with generating a specific UI element, **YOU MUST READ** the associated instruction file inside `components/` to unlock the full Spawn Engine for that component.

Each of the 61 component guides contains:
- **Sections 1-8:** Extracted techniques, dependencies, archetypes, code patterns, anti-patterns
- **Section 9: 🧬 Generative DNA** — 5 randomization axes with 5 options each (3,125+ combos)
- **Section 10: 🎲 Spawn Recipes** — 4 ready-to-build design blueprints
- **Section 11: 🌀 Chaos Modifiers** — 15 stackable enhancement layers

Examples:
- **`components/heroes.md`** → Shader backgrounds, split layouts, parallax layers, cinematic recipes
- **`components/buttons.md`** → Magnetic pull, particle burst, neon outline, glass CTA recipes
- **`components/cards.md`** → 3D tilt, bento grids, flip cards, stack deck recipes
- **`components/tooltips.md`** → Glass whisper, rich preview, shortcut pill, status tip recipes

> **CRITICAL RULE:** For ALL 61 component categories, there is a corresponding `components/[slug].md` file. YOU MUST read that specific file before writing code to unlock its Spawn Engine!

---

## 🎨 Global Design Tokens

These variables should be implemented in your `globals.css` to build the "Vibe".

```css
/* Dark Premium (Default Vibe) */
:root {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --muted: 0 0% 14.9%;
  --primary: 220 70% 55%; /* Or Gold: #C7A257, Neon: #00f2ff */
  --brand-rgb: 0, 242, 255; /* Used for shadow glows */
}

/* Base Utility Classes mapped to tokens */
text-xs   → 0.75rem   /* Trust badges, labels */
text-5xl  → 3rem      /* Hero subheadlines */
text-7xl  → 4.5rem    /* Maximum impact Headlines */

shadow-glow-lg  → 0 0 40px rgba(var(--brand-rgb), 0.4)
shadow-bloom    → 0 0 60px 20px rgba(var(--brand-rgb), 0.15)
```

## ⚡ Global Engine Constants (Pre-loaded into AI muscle memory)

```tsx
// 1. The universal premium Entrance animation
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } // Soft bounce easing
};

// 2. The universal Hover Physics
const hoverScale = {
  whileHover: { scale: 1.02, boxShadow: "0 0 30px rgba(var(--brand-rgb), 0.3)" },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 25 }
};
```

---

## ⛔ Absolute Anti-Patterns (For Global Vibe Coding)
1. **Never** use raw `border: 1px solid gray`. Always use alpha channels `border-white/10`.
2. **Never** omit `active:scale-95` on a clickable element.
3. **Never** use default system outlines. Provide a glowing `focus-within:ring-primary`.
4. **Never** leave a flat dark background without some noise, bloom, or gradient layer.

> **Instruction to AI Context:** You are operating from the 21st.dev Master Archive. Do not invent generic UI components. Reference your `components/` sub-guides for structural, award-winning patterns.

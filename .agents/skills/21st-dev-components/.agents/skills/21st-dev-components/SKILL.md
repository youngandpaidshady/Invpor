---
name: 21st-dev
description: >
  Build premium React websites from scratch. Generates award-winning landing pages,
  dashboards, auth flows, and marketing sites using 61 component blueprints with
  Framer Motion, glassmorphism, and micro-interactions. Invoke when building any
  web UI, creating components, designing pages, or styling existing apps.
allowed-tools: Read, Grep, Glob
argument-hint: "[page-type or component] e.g. 'landing page', 'pricing section', 'card'"
---

# 21st.dev — The Premium Component Engine

> **You are a world-class UI engineer.** Every component you produce looks like it belongs on a site with 1 million GitHub stars. You have 61 deep-dive component blueprints, 2,083 production-grade patterns, and a Generative DNA system that guarantees you never repeat a design.
>
> **Stack:** React 18+ · TypeScript · Tailwind CSS · Framer Motion · shadcn/ui · Radix UI · Three.js/GLSL (advanced)

---

## 🏗️ PAGE BLUEPRINTS — End-to-End Website Recipes

When asked to build a **page or website**, compose from these blueprints. Load EACH referenced component file before writing code.

### Landing Page / SaaS Homepage
```
1. Hero          → components/heroes.md
2. Clients       → components/clients.md        (logo cloud / social proof)
3. Features      → components/features.md       (bento grid or alternating)
4. Testimonials  → components/testimonials.md
5. Pricing       → components/pricing-sections.md
6. CTA           → components/calls-to-action.md (final conversion block)
7. Footer        → components/footers.md
```

### Dashboard / Admin Panel
```
1. Sidebar       → components/sidebars.md
2. Navigation    → components/navigation-menus.md
3. Cards         → components/cards.md           (stat cards, bento grid)
4. Tables        → components/tables.md
5. Numbers       → components/numbers.md         (KPI counters)
6. Notifications → components/notifications.md
7. Popovers      → components/popovers.md        (quick actions)
```

### Auth Flow (Sign-In / Sign-Up)
```
1. Sign In       → components/sign-ins.md
2. Sign Up       → components/sign-ups.md
3. Forms         → components/forms.md
4. Inputs        → components/inputs.md
5. Buttons       → components/buttons.md
6. Toasts        → components/toasts.md          (success/error feedback)
```

### Portfolio / Personal Site
```
1. Hero          → components/heroes.md          (name + tagline + visual)
2. Images        → components/images.md          (gallery / lightbox)
3. Carousels     → components/carousels.md       (project showcase)
4. Cards         → components/cards.md           (project cards)
5. Testimonials  → components/testimonials.md
6. CTA           → components/calls-to-action.md
7. Footer        → components/footers.md
```

### Blog / Content Site
```
1. Hero          → components/heroes.md
2. Cards         → components/cards.md           (article cards)
3. Paginations   → components/paginations.md
4. Scroll Areas  → components/scroll-areas.md
5. Text Areas    → components/text-areas.md      (rich content)
6. Texts         → components/texts.md           (typography)
7. Footer        → components/footers.md
```

### E-Commerce / Product Page
```
1. Hero          → components/heroes.md          (product showcase)
2. Images        → components/images.md          (product gallery)
3. Carousels     → components/carousels.md       (related products)
4. Buttons       → components/buttons.md         (add to cart)
5. Pricing       → components/pricing-sections.md
6. Comparisons   → components/comparisons.md
7. Tabs          → components/tabs.md            (description / reviews / specs)
8. Footer        → components/footers.md
```

---

## 📂 COMPONENT ROUTING TABLE

**CRITICAL:** Before writing ANY component, you MUST `Read` the corresponding file below. This is not optional — each file contains unique archetypes, code patterns, and Generative DNA you cannot replicate from memory.

| When the user asks for... | Load this file |
|---|---|
| Accordion, FAQ, expandable, collapsible | `components/accordions.md` |
| AI chat, chatbot, conversation, message bubbles | `components/ai-chats.md` |
| Alert, warning, error banner, info notice | `components/alerts.md` |
| Announcement, banner, promotion bar | `components/announcements.md` |
| Avatar, profile picture, user icon, initials | `components/avatars.md` |
| Background, gradient, texture, shader, noise | `components/backgrounds.md` |
| Badge, status, label, tag indicator, pill | `components/badges.md` |
| Border, outline, frame, animated border | `components/borders.md` |
| Button, CTA, submit, action trigger | `components/buttons.md` |
| Calendar, date grid, event schedule | `components/calendars.md` |
| Call to action, CTA section, conversion block | `components/calls-to-action.md` |
| Card, tile, content block, bento item | `components/cards.md` |
| Carousel, slider, swiper, image gallery scroll | `components/carousels.md` |
| Checkbox, check, multi-select toggle | `components/checkboxes.md` |
| Client logos, partners, social proof strip | `components/clients.md` |
| Comparison, versus, feature matrix | `components/comparisons.md` |
| Date picker, date input, calendar input | `components/date-pickers.md` |
| Dialog, modal, popup, overlay panel | `components/dialogs--modals.md` |
| Dock, taskbar, floating toolbar | `components/docks.md` |
| Dropdown, menu, select menu, command menu | `components/dropdowns.md` |
| Empty state, no data, placeholder, zero state | `components/empty-states.md` |
| Feature section, benefits, how it works | `components/features.md` |
| File tree, directory, folder structure | `components/file-trees.md` |
| File upload, drag drop, attachment | `components/file-uploads.md` |
| Footer, page bottom, site footer | `components/footers.md` |
| Form, data entry, multi-field, wizard | `components/forms.md` |
| Hero section, above the fold, landing header | `components/heroes.md` |
| Hook, custom hook, utility hook, use* | `components/hooks.md` |
| Icon, symbol, glyph, pictogram | `components/icons.md` |
| Image, photo, picture, media display, gallery | `components/images.md` |
| Input, text field, search bar, text input | `components/inputs.md` |
| Link, anchor, navigation link, text link | `components/links.md` |
| Map, location, geographic, embed map | `components/maps.md` |
| Menu, context menu, right-click, action menu | `components/menus.md` |
| Navigation, navbar, header nav, top bar | `components/navigation-menus.md` |
| Notification, alert popup, real-time update | `components/notifications.md` |
| Number, counter, statistic, KPI, metric | `components/numbers.md` |
| Pagination, page numbers, next/prev | `components/paginations.md` |
| Popover, hover card, tooltip panel, flyout | `components/popovers.md` |
| Pricing, plans, tiers, subscription | `components/pricing-sections.md` |
| Radio group, radio button, single select | `components/radio-groups.md` |
| Scroll area, scrollbar, scroll container | `components/scroll-areas.md` |
| Select, combobox, picker, choice list | `components/selects.md` |
| Shader, WebGL, GLSL, visual effect, 3D bg | `components/shaders.md` |
| Sidebar, side nav, drawer, panel | `components/sidebars.md` |
| Sign in, login, authentication | `components/sign-ins.md` |
| Sign up, register, create account | `components/sign-ups.md` |
| Slider, range, scrubber, volume control | `components/sliders.md` |
| Spinner, loader, loading, skeleton, progress | `components/spinner-loaders.md` |
| Table, data grid, spreadsheet, list view | `components/tables.md` |
| Tabs, tab bar, segmented control, tab panel | `components/tabs.md` |
| Tag, chip, token, keyword label | `components/tags.md` |
| Testimonial, review, quote, customer voice | `components/testimonials.md` |
| Text, typography, heading, paragraph, prose | `components/texts.md` |
| Textarea, multi-line input, comment box | `components/text-areas.md` |
| Toast, snackbar, flash message | `components/toasts.md` |
| Toggle, switch, on/off, boolean control | `components/toggles.md` |
| Tooltip, hint, info popup, helper text | `components/tooltips.md` |
| Video, player, embed, media playback | `components/videos.md` |

---

## 🔧 END-TO-END BUILD WORKFLOW

Follow this sequence for every project:

### Step 1: Project Foundation
```bash
# Required dependencies for premium UI
npm install framer-motion class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot lucide-react
# Add cn() utility
```
```ts
// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
```

### Step 2: Design System Setup
Apply these CSS variables in `globals.css`:
```css
:root {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --card: 0 0% 6%;
  --card-foreground: 0 0% 98%;
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  --primary: 43 55% 55%;       /* Gold: #C7A257 — change to your brand */
  --primary-foreground: 0 0% 3.9%;
  --brand-rgb: 199, 162, 87;   /* Must match --primary for glow effects */
  --radius: 0.75rem;
}

/* Premium utility classes */
.shadow-glow    { box-shadow: 0 0 20px rgba(var(--brand-rgb), 0.3); }
.shadow-glow-lg { box-shadow: 0 0 40px rgba(var(--brand-rgb), 0.4); }
.shadow-bloom   { box-shadow: 0 0 60px 20px rgba(var(--brand-rgb), 0.15); }
.glass          { background: rgba(255,255,255,0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); }
.noise          { position: relative; }
.noise::after   { content:''; position:absolute; inset:0; opacity:0.03; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); pointer-events:none; }
```

### Step 3: Load Component Blueprints
For each section of the page, `Read` the corresponding component file from the routing table above. The blueprint will give you:
- **Generative DNA** — 5 randomization axes with 5 options each (3,125+ unique combos per component)
- **Spawn Recipes** — 4 ready-to-build design briefs with full implementation details
- **Code Patterns** — real production code extracted from 2,083 analyzed components
- **Anti-Patterns** — what NOT to do

### Step 4: Apply the Spawn Engine
For each component:
1. **Roll DNA Axes** — pick ONE from each of Layout / Surface / Motion / Mood / Composition
2. **Or pick a Spawn Recipe** — use a ready-made blueprint
3. **Stack 1-3 Chaos Modifiers** — add unique character (see below)
4. **Never repeat** — always produce a unique combination

### Step 5: Polish & Connect
- Wire up navigation between pages
- Add entrance animations with staggered `IntersectionObserver` triggers
- Apply responsive breakpoints: mobile-first, then `md:` and `lg:`
- Test keyboard navigation on every interactive element

---

## ⚡ GLOBAL ENGINE CONSTANTS

These are pre-loaded into every component you build:

```tsx
// Universal premium entrance
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
};

// Universal hover physics
const hoverScale = {
  whileHover: { scale: 1.02, boxShadow: "0 0 30px rgba(var(--brand-rgb), 0.3)" },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 400, damping: 25 }
};

// Staggered children entrance
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};
const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};
```

---

## 🌀 CHAOS MODIFIERS — Universal Enhancement Layers

Stack 1-3 on ANY component to add unique character. These are your secret weapon for making every generation feel fresh:

| # | Modifier | Implementation |
|---|----------|----------------|
| 1 | **Particle trail** | Tiny dots follow cursor across surface via `onMouseMove` + canvas/div pool |
| 2 | **Scan-line overlay** | `::after` with `repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)` |
| 3 | **Noise grain** | SVG `feTurbulence` at 3% opacity via `::after` pseudo-element (included in `.noise` class) |
| 4 | **RGB chromatic split** | On entrance: 2px offset `text-shadow` in red/blue, collapses to 0 over 300ms |
| 5 | **Glow pulse** | `box-shadow` opacity animates 0.2→0.4→0.2 on a 3s infinite `@keyframes` loop |
| 6 | **Border gradient** | `conic-gradient` on pseudo-element rotates 360° continuously, masked to border width |
| 7 | **Holographic sheen** | `linear-gradient(75deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)` sweeps on hover via `background-position` transition |
| 8 | **Magnetic cursor** | `onMouseMove` calculates distance, applies `transform: translate(dx, dy) rotateX(ry) rotateY(rx)` with spring |
| 9 | **Glitch stutter** | 50ms `translateX` jitter ±2px on entrance, then settle to 0 |
| 10 | **Frosted edge bleed** | `mask-image: linear-gradient(black 70%, transparent)` with `backdrop-blur` fade |
| 11 | **Shadow elevation** | `box-shadow` Y-offset transitions 4px→12px on hover with 200ms ease |
| 12 | **Dot matrix** | `background: repeating-radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px) 0 0 / 20px 20px` |
| 13 | **Typewriter reveal** | Characters appear one-by-one with blinking `|` cursor via `useEffect` + `setInterval` |
| 14 | **Heat distortion** | `transform: perspective(500px) rotateX(var(--scroll-warp))` updating on scroll |
| 15 | **Neon flicker** | Opacity pulses 0.85→1.0 rapidly 2× on entrance via `@keyframes` |

---

## ⛔ ABSOLUTE ANTI-PATTERNS

These are instant quality kills. Never do any of these:

1. **Never** use raw `border: 1px solid gray` — always `border-white/10` or `border-white/5`
2. **Never** omit `active:scale-95` or `whileTap` on clickable elements
3. **Never** use default browser outlines — provide `focus-visible:ring-2 ring-primary`
4. **Never** leave a flat dark background — always add noise, bloom, gradient, or mesh
5. **Never** use instant state changes — everything transitions with `framer-motion` springs
6. **Never** hardcode colors — use CSS custom properties or Tailwind theme tokens
7. **Never** skip responsive design — mobile-first with `md:` and `lg:` breakpoints
8. **Never** omit `aria-*` labels on interactive elements
9. **Never** produce a component without entrance animation
10. **Never** forget the brand — every glow, shadow, and accent uses `--brand-rgb`

---

> **Engine active.** You are operating from the 21st.dev Master Archive with 61 loaded blueprints. Do not invent generic UI. Reference your component files for structural, award-winning patterns. Every pixel must earn its place.

# 21st.dev Component Skill: File Uploads

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 7+
> **Training Data:** 0 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready File Uploads components with unique designs every time.

---

## 1. Core Techniques

The following techniques are essential for premium File Uploads implementations:

- **Framer Motion animations**
- **React state management**
- **React refs**
- **Drag and drop**
- **cn() utility (clsx + tailwind-merge)**
- **Lucide React icons**
- **CSS keyframe animations**
- **ARIA accessibility attributes**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install framer-motion clsx tailwind-merge lucide-react react-dropzone
```

| Dependency | Purpose |
|---|---|
| `framer-motion` | Physics-based animations |
| `clsx` | Class composition |
| `tailwind-merge` | Class composition |
| `lucide-react` | SVG icon library |
| `react-dropzone` | Drag-and-drop file handling |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:


## 6. Integration Workflow

1. Create the component file in `/components/ui/file-upload.tsx`
2. Install required dependencies: `framer-motion, clsx, tailwind-merge`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `file-uploadVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive File Uploads must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing

## 8. Design Philosophy

When generating File Uploads components:

1. **Never repeat a design** — with 7+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a File Uploads component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Full drop zone (dashed border area)
2. Compact button trigger
3. Gallery grid of uploaded files
4. Progress list of uploading files
5. Combined drop zone + file list

### 🎨 Surface Axis
1. Dashed border zone with marching-ants hover
2. Glass card with file preview thumbnails
3. Outlined list items with progress bars
4. Dark zone with neon-glow hover accent
5. Minimal with icon + text only

### ⚡ Motion Axis
1. Dashed border animates to solid brand-color on drag-over
2. File thumbnails spring-scale in on upload complete
3. Progress bar fills with gradient animation
4. Drop zone pulses on drag-enter
5. Upload success: checkmark draws via SVG stroke

### 🎭 Mood Axis
1. Functional — clean, clear states, progress-focused
2. Creative — image previews, gallery layout, beautiful
3. Professional — file type icons, metadata table, strict
4. Playful — cloud upload animation, fun illustrations
5. Minimal — text link 'click to upload', no chrome

### 🧩 Composition Axis
1. Form file input field
2. Profile avatar uploader (circular crop)
3. Document manager uploader
4. Image gallery builder
5. Chat message attachment

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Neon Drop Zone
large dashed-border area (200px height). Default: muted dashed border, upload cloud icon, instruction text. Drag-over: border turns brand-color solid with glow, background tints, zone scales 1.02. Drop triggers file processing. Uploaded files appear as glass cards in a grid below with thumbnail preview.

### Recipe 2: Avatar Cropper
circular drop zone with 'click or drag' instruction. After drop: image fills circle with crop handles. Drag to reposition. Scroll to zoom. Confirm button. Processing shows circular progress ring. Complete: avatar image with success checkmark flash.

### Recipe 3: Progress Stack
compact upload button at top. Uploading files stack below as list items. Each item: file icon, name, size, progress bar with gradient fill, cancel X button. Complete items show green checkmark. Failed items show red X with retry. Items spring-animate in/out.

### Recipe 4: Gallery Builder
grid of uploaded images as cards. Drop zone is the last grid cell (dashed border). New uploads spring-scale in at drop zone position then flow into grid. Each card: thumbnail, filename, size, delete button (hover reveal). Drag to reorder cards.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Forms**
- **Profile settings**
- **Content management**
- **Chat attachments**

## 13. 🔗 Composes With

Load these companion blueprints when building with File Uploads:

- `components/buttons.md` — Buttons
- `components/spinner-loaders.md` — Spinner Loaders
- `components/toasts.md` — Toasts
- `components/forms.md` — Forms


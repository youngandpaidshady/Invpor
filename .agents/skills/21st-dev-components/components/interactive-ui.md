# 21st.dev Component Skill: Interactive UI Primitives

> **Priority:** HIGH
> **Category:** UI Components (Accordions, Dialogs, Selects, Inputs)
> **Total Variants:** 400+ across all sub-categories
> **Purpose:** The connective tissue of apps. These must function flawlessly while looking beautiful.

## 1. Core Principles
- **Feedback Loops:** Every action needs a reaction. Click an input? The border glows. Select a tab? The indicator glides over.
- **Keyboard First:** An accordion or select that only works with a mouse is a failure. Use Radix UI primitives to handle focus trapping and keyboard navigation if building complex interactivity.
- **State Validation:** Inputs must have clear success/error states utilizing color shifts (`text-red-500` / `ring-red-500`) and shaking animations for errors.

## 2. Top-Tier UI Archetypes

### A. The "Glowing Focus" Input / Search Bar
**Vibe:** Modern AI Tools, Raycast, Command Palettes.
- **Technique:** The parent container responds to the `:focus-within` state of the internal `<input>`.
- **Code:**
```tsx
<div className="relative group rounded-xl bg-zinc-900 border border-white/10 transition-shadow focus-within:border-primary focus-within:shadow-glow">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-primary transition-colors" />
  <input className="bg-transparent pl-10 pr-4 py-3 outline-none w-full" placeholder="Search..." />
</div>
```

### B. The "Magnetic Tab" / Vercel Segmented Control
**Vibe:** Developer Tools, Precision.
- **Technique:** Use `framer-motion`'s `layoutId` prop on an absolute positioned `div` representing the pill background. Wrap the tabs in `AnimateSharedLayout` (or implicitly handled in newer framer versions).
- **Code Pattern:** Map over tabs. If `activeTab === id`, render the `<motion.div layoutId="pill" className="absolute inset-0 bg-primary rounded-md" />` behind the text layer.

### C. The "Morphing Dialog"
**Vibe:** Native App feel, iOS.
- **Technique:** A small card on the page (e.g., a music track) clicked by the user expands seamlessly into a full-screen modal. 
- **Implementation:** Both the small card and the big modal share the same `layoutId` in Framer Motion. 

### D. The "Chat / AI Hub"
**Vibe:** ChatGPT, Claude.
- **Technique:** An input field that auto-grows (`useTextareaResize`). 
- **Accessories:** Integrated file upload button, streaming text response (token-by-token reveal simulation), and markdown rendering capability.

### E. The "Action Hub" Select / Combobox
**Vibe:** Superhuman, Linear.
- **Technique:** Not a native `<select>`. A searchable dropdown combining an input, a list of filtered options, keyboard arrow navigation (`useRef` arrays to track active index), and complex multi-select tag rendering.

## 3. Anti-Patterns
- **❌ Unfocusable:** Relying entirely on `div` click handlers without `tabIndex=0`.
- **❌ Native Browser Borders:** Allowing default harsh blue focus rings (`outline-none focus:ring-2 focus:ring-primary` is the fix).
- **❌ Clunky Exits:** Modals that disappear instantly instead of fading/scaling down on close. Use `AnimatePresence`.

# 21st.dev Component Skill: Avatars

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 17+
> **Training Data:** 22 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Avatars components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 22 analyzed Avatars implementations:

- **AnimatePresence exit animations**
- **CSS gradients**
- **CVA (class-variance-authority) variants**
- **Framer Motion animations**
- **Glassmorphism / backdrop blur**
- **Lucide React icons**
- **Radix UI primitives**
- **React state management**
- **React.forwardRef pattern**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @radix-ui/react-avatar @radix-ui/react-dropdown-menu @radix-ui/react-slot @radix-ui/react-tooltip class-variance-authority framer-motion lucide-react
```

| Dependency | Purpose |
|---|---|
| `@radix-ui/react-avatar` | Headless accessible primitives |
| `@radix-ui/react-dropdown-menu` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `class-variance-authority` | Variant management |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `avatar-hover-card.tsx`
- `avatar-smart-group.tsx`
- `avatar-with-name.tsx`
- `basic-avatar.tsx`
- `demo.tsx`

## 4. Props & Variant Patterns

### CVA Variant Names Found
- `default`
- `default (size)`
- `destructive`
- `ghost`
- `icon (size)`
- `lg (size)`
- `link`
- `outline`
- `secondary`
- `sm (size)`

### Custom Props Found
- `Default`
- `asChild`
- `buttonContent`
- `buttonText`
- `description`
- `direction`
- `fallback`
- `hoverScale`
- `imageAlt`
- `imageSrc`
- `motionClassName`
- `name`
- `nameClassName`
- `onButtonClick`
- `overlap`
- `ringColor`
- `size`
- `sizeStep`
- `src`
- `tooltipBg`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const AvatarDemo = () => {
  return (
    <Avatar>
      <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png' alt='Hallie Richards' />
      <AvatarFallback className='text-xs'>HR</AvatarFallback>
    </Avatar>
  )
}

export default AvatarDemo


demo.tsx
import AvatarDemo from "@/components/ui/basic-avatar";

export default function DemoOne() {
  return <AvatarDemo />;
}
```

### Pattern 2
```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const AvatarDemo = () => {
  return (
    <Avatar>
      <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png' alt='Hallie Richards' />
      <AvatarFallback className='text-xs'>HR</AvatarFallback>
    </Avatar>
  )
}

export default AvatarDemo


demo.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const AvatarRingDemo = () => {
  return (
    <Avatar className='ring-ring ring-2'>
      <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png' alt='Hallie Richards' />
      <AvatarFallback className='text-xs'>HR</AvatarFallback>
    </Avatar>
  )
}

export default AvatarRingDemo
```

### Pattern 3
```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const AvatarDemo = () => {
  return (
    <Avatar>
      <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png' alt='Hallie Richards' />
      <AvatarFallback className='text-xs'>HR</AvatarFallback>
    </Avatar>
  )
}

export default AvatarDemo


demo.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const AvatarRoundedDemo = () => {
  return (
    <Avatar className='rounded-sm'>
      <AvatarImage
        src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png'
        alt='Hallie Richards'
        className='rounded-sm'
      />
      <AvatarFallback className='text-xs'>HR</AvatarFallback>
    </Avatar>
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/avatar.tsx`
2. Install required dependencies: `@radix-ui/react-avatar, @radix-ui/react-dropdown-menu, @radix-ui/react-slot`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `avatarVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Avatars must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Avatars components:

1. **Never repeat a design** — with 17+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Avatars component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Circular avatar with status dot
2. Rounded-square avatar (iOS style)
3. Stacked avatar group with overlap
4. Avatar with text label inline
5. Large avatar card with bio snippet

### 🎨 Surface Axis
1. Gradient border ring around image
2. Frosted glass container with glow
3. Solid ring with brand-color accent
4. Outlined with dashed animated border
5. Neumorphic raised circle

### ⚡ Motion Axis
1. Pop-in scale spring on mount
2. Ring pulse animation for online status
3. Hover lift with shadow expansion
4. Stagger-in for avatar groups
5. Image crossfade on src change

### 🎭 Mood Axis
1. Professional — clean ring, initials fallback
2. Gaming — hexagonal, neon border, rank badge
3. Social — circular, story-ring gradient, online dot
4. Corporate — square, subtle shadow, text label right
5. Playful — irregular blob shape, bouncy hover

### 🧩 Composition Axis
1. Comment author indicator
2. Navigation bar user menu trigger
3. Team member grid card
4. Chat message sender
5. Profile header hero element

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Story Ring
circular avatar with an animated conic-gradient border (Instagram-style). Ring rotates slowly. Online status dot (green) with pulse animation at bottom-right. Hover scales to 1.05 with shadow bloom. Fallback shows initials on gradient background.

### Recipe 2: Hex Badge
hexagonal clip-path avatar with neon border glow. Small rank badge overlay at bottom. Hover triggers a brief holographic sheen sweep across the image. Group variant overlaps with -8px margin and z-index stacking.

### Recipe 3: Glass Profile Card
large avatar (96px) centered in a frosted glass card. Name and role text below. Status dot on avatar. Card has subtle border-white/10. Avatar pops in with spring, text fades up staggered. Hover lifts entire card.

### Recipe 4: Blob Avatar
irregular organic blob shape using SVG clipPath. Blob shape morphs subtly on loop (4 control points shifting). Solid color background with initials. Hover pauses the morph and settles to circle.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Navigation bar**
- **Chat messages**
- **Team page**
- **Comments**
- **Profile**

## 13. 🔗 Composes With

Load these companion blueprints when building with Avatars:

- `components/badges.md` — Badges
- `components/tooltips.md` — Tooltips
- `components/dropdowns.md` — Dropdowns
- `components/cards.md` — Cards


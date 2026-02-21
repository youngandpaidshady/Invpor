# 21st.dev Component Skill: Avatars

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 17+
> **Training Data:** 22 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Avatars components with unique designs every time.

---

## 1. Core Techniques (Observed in Real Components)

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

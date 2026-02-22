# 21st.dev Component Skill: AI Chats

> **Priority:** EXTRA_HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 30+
> **Training Data:** 20 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready AI Chats components with unique designs every time.

---

## 1. Core Techniques (Observed in Real Components)

The following techniques were found across the 20 analyzed AI Chats implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Framer Motion animations**
- **Glassmorphism / backdrop blur**
- **Lucide React icons**
- **Next.js Image optimization**
- **Radix UI primitives**
- **React effects**
- **React refs**
- **React state management**
- **React useCallback optimization**
- **React useMemo optimization**
- **React.forwardRef pattern**
- **Tailwind CSS Animate plugin**
- **cmdk command palette**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-slot @radix-ui/react-tooltip ai class-variance-authority cmdk figma figma:react framer-motion lucide-react motion next next-themes use-stick-to-bottom
```

| Dependency | Purpose |
|---|---|
| `@radix-ui/react-avatar` | Headless accessible primitives |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-popover` | Headless accessible primitives |
| `@radix-ui/react-select` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `ai` | Utility |
| `class-variance-authority` | Variant management |
| `cmdk` | Command palette |
| `figma` | Utility |
| `figma:react` | Utility |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `next-themes` | Next.js framework feature |
| `use-stick-to-bottom` | Utility |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `advanced-ai-chat-input.tsx`
- `advanced-chat-input.tsx`
- `ai-actions.tsx`
- `ai-assistant-card.tsx`
- `ai-chat-input.tsx`
- `ai-chat.tsx`
- `ai-input.tsx`
- `auto-resizing-ai-input.tsx`
- `bolt-style-chat.tsx`
- `chat-interface.tsx`
- `claude-style-chat-input.tsx`
- `creative-card.tsx`
- `demo.tsx`
- `file-upload-and-chat.tsx`
- `gradient-ai-chat-input.tsx`
- `minimal-chat-box.tsx`
- `prompt-input-dynamic-grow.tsx`
- `ruixen-moon-chat.tsx`
- `ruixen-prompt-box.tsx`
- `ruixen-query-box.tsx`
- ...and 2 more variants

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
- `accent1`
- `accent2`
- `accent3`
- `actionIcons`
- `addRipple`
- `animationDuration`
- `announcementHref`
- `announcementText`
- `asChild`
- `backgroundOpacity`
- `base`
- `bg`
- `buttonBorderColor`
- `c1`
- `c2`
- `c3`
- `colors`
- `config`
- `content`
- `dark`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
}

const CreativeCard: React.FC<CreativeCardProps> = ({
  placeholder = "Type your creative idea here...✨",
  tags = ["Generate Image", "Analyze Data", "Explore More"],
}) => {
  return (
    <div className="flex flex-col items-center mx-auto max-w-[350px] w-full">
      <div className="relative flex flex-col rounded-2xl p-[2px] overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-gradient-radial from-white via-white/30 via-white/10 to-transparent blur-sm"></div>

        {/* Chat Box */}
        <div className="flex flex-col dark:bg-black/50 bg-white/20 rounded-xl w-full overflow-hidden border border-gray-200 dark:border-gray-800">
          <div className="relative flex">
            <textarea
              id="chat_bot"
              name="chat_bot"
              placeholder={placeholder}
              className="bg-transparent rounded-xl w-full h-14 text-gray-900 dark:text-white font-sans text-sm font-medium p-3 resize-none outline-none placeholder-gray-600 dark:placeholder-gray-400 scrollbar-thin scrollbar-thumb-gray-500 dark:scrollbar-thumb-gray-700 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-700 transition-all"
            />
          </div>

          {/* Options */}
          <div className="flex justify-between items-end p-3">
            <div className="flex gap-3">
              <button className="flex text-black/20 dark:text-white/20 bg-transparent border-none cursor-pointer transition-all duration-300 hover:text-black dark:hover:text-white hover:-translate-y-1">
```

### Pattern 2
```tsx
import { MessageSquare, X, Send } from "lucide-react"

const transition = {
  type: "spring",
  bounce: 0,
  duration: 0.3,
}

export default function MinimalChatBox() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<string[]>([])
  const [input, setInput] = React.useState("")

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, input.trim()])
      setInput("")
    }
  }

  return (
    <MotionConfig transition={transition}>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div
          animate={{
            height: isOpen ? "400px" : "50px",
            width: isOpen ? "320px" : "50px",
```

### Pattern 3
```tsx
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/ai-chat.tsx`
2. Install required dependencies: `@radix-ui/react-avatar, @radix-ui/react-dialog, @radix-ui/react-popover`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `ai-chatVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive AI Chats must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating AI Chats components:

1. **Never repeat a design** — with 30+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

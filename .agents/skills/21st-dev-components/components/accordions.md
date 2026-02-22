# 21st.dev Component Skill: Accordions

> **Priority:** EXTRA_HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 40+
> **Training Data:** 37 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Accordions components with unique designs every time.

---

## 1. Core Techniques (Observed in Real Components)

The following techniques were found across the 37 analyzed Accordions implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Framer Motion animations**
- **GSAP animation library**
- **Glassmorphism / backdrop blur**
- **Lucide React icons**
- **Radix UI primitives**
- **React effects**
- **React refs**
- **React state management**
- **React.forwardRef pattern**
- **Recharts / charting**
- **Tailwind CSS Animate plugin**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @aliimam/icons @ark-ui/react @base-ui-components/react @gsap/react @radix-ui/react-accordion @radix-ui/react-avatar @radix-ui/react-collapsible @radix-ui/react-icons @radix-ui/react-slot class-variance-authority clsx framer-motion gsap lucide-react motion tailwind-merge
```

| Dependency | Purpose |
|---|---|
| `@aliimam/icons` | Utility |
| `@ark-ui/react` | Utility |
| `@base-ui-components/react` | Utility |
| `@gsap/react` | Professional animation |
| `@radix-ui/react-accordion` | Headless accessible primitives |
| `@radix-ui/react-avatar` | Headless accessible primitives |
| `@radix-ui/react-collapsible` | Headless accessible primitives |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `framer-motion` | Physics-based animations |
| `gsap` | Professional animation |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `tailwind-merge` | Class composition |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `FAQ.tsx`
- `accordion-01-1.tsx`
- `accordion-02-1.tsx`
- `accordion-03.tsx`
- `accordion-04.tsx`
- `accordion-05.tsx`
- `accordion-1.tsx`
- `accordion-2.tsx`
- `base-accordion.tsx`
- `demo.tsx`
- `faq-accordion.tsx`
- `faqs-1.tsx`
- `faqsection.tsx`
- `icon-accordion.tsx`
- `interactive-accordion.tsx`
- `scroll-faqaccordion.tsx`

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
- `solid`

### Custom Props Found
- `allowMultiple`
- `answerClassName`
- `asChild`
- `buttonLabel`
- `data`
- `defaultExpandedIds`
- `description`
- `faqsLeft`
- `faqsRight`
- `indicator`
- `item`
- `items`
- `label`
- `onButtonClick`
- `onChange`
- `questionClassName`
- `subtitle`
- `title`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
import { Eye, Bell, BarChart2, Monitor, Plus } from 'lucide-react';

export function AccordionComponent() {
	const [openItems, setOpenItems] = useState<number[]>([]);

	const toggleItem = (index: number) => {
		setOpenItems((current) =>
			current.includes(index)
				? current.filter((item) => item !== index)
				: [...current, index]
		);
	};

	const accordionItems = [
		{
			title: 'Views',
			description: 'Save time by creating and saving filtered views',
			icon: Eye,
			iconBg: 'bg-yellow-100 dark:bg-yellow-900',
			iconColor: 'text-blue-600 dark:text-blue-400',
		},
		{
			title: 'Alerts',
			description: "Save information about your system's activity",
			icon: Bell,
			iconBg: 'bg-blue-100 dark:bg-blue-900',
			iconColor: 'text-blue-600 dark:text-blue-400',
```

### Pattern 2
```tsx
import { cn } from '@/lib/utils';

const CustomAccordion = AccordionPrimitive.Root;

const CustomAccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn('', className)}
		{...props}
	/>
));
CustomAccordionItem.displayName = 'CustomAccordionItem';

const CustomAccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn(
				'group flex flex-1 items-center justify-between gap-4 rounded-2xl p-4 text-left',
				'bg-[#ffff] dark:bg-zinc-800 dark:text-white transition-all hover:bg-gray-50/70 hover:shadow-md',
				'dark:hover:bg-zinc-700/60 focus-visible:outline-none focus-visible:ring-2',
```

### Pattern 3
```tsx
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type SectionProps = { children: React.ReactNode; className?: string; id?: string };
type ContainerProps = { children: React.ReactNode; className?: string; id?: string };

const Section = ({ children, className, id }: SectionProps) => (
  <section className={cn("py-8 md:py-12", className)} id={id}>
    {children}
  </section>
);

const Container = ({ children, className, id }: ContainerProps) => (
  <div className={cn("mx-auto max-w-5xl p-6 sm:p-8", className)} id={id}>
    {children}
  </div>
);
// ----------------------------------------------------------------

type FAQItem = {
  question: string;
  answer: string;
  link?: string;
};

const content: FAQItem[] = [
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/accordion.tsx`
2. Install required dependencies: `@aliimam/icons, @ark-ui/react, @base-ui-components/react`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `accordionVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Accordions must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Accordions components:

1. **Never repeat a design** — with 40+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

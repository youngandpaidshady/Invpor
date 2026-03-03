# 21st.dev Component Skill: Footers

> **Priority:** HIGH
> **Category:** 21st.dev Design System Archive
> **Total Variants on 21st.dev:** 14+
> **Training Data:** 49 production-grade component prompts analyzed
> **Purpose:** Generate award-winning, production-ready Footers components with unique designs every time.

---

## 1. Core Techniques

The following techniques were found across the 49 analyzed Footers implementations:

- **ARIA accessibility attributes**
- **AnimatePresence exit animations**
- **CSS gradients**
- **CSS keyframe animations**
- **CVA (class-variance-authority) variants**
- **Framer Motion animations**
- **Framer Motion spring physics**
- **Framer Motion useMotionValue**
- **Glassmorphism / backdrop blur**
- **HTML Canvas rendering**
- **Intersection Observer API**
- **Lucide React icons**
- **Next.js Image optimization**
- **Next.js Link routing**
- **Radix UI primitives**
- **React effects**
- **React refs**
- **React state management**
- **React useCallback optimization**
- **React useMemo optimization**
- **React.forwardRef pattern**
- **ResizeObserver API**
- **Tailwind CSS Animate plugin**
- **cn() utility (clsx + tailwind-merge)**

## 2. Dependencies & Libraries

Install commonly needed packages:
```bash
npm install @aliimam/icons @aliimam/logos @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-icons @radix-ui/react-label @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tooltip @studio-freight/lenis class-variance-authority clsx color-bits dicons framer-motion lucide-react motion next next-themes react-icons simplex-noise tailwind-merge
```

| Dependency | Purpose |
|---|---|
| `@aliimam/icons` | Utility |
| `@aliimam/logos` | Utility |
| `@radix-ui/react-dialog` | Headless accessible primitives |
| `@radix-ui/react-dropdown-menu` | Headless accessible primitives |
| `@radix-ui/react-icons` | Headless accessible primitives |
| `@radix-ui/react-label` | Headless accessible primitives |
| `@radix-ui/react-slot` | Headless accessible primitives |
| `@radix-ui/react-switch` | Headless accessible primitives |
| `@radix-ui/react-tooltip` | Headless accessible primitives |
| `@studio-freight/lenis` | Utility |
| `class-variance-authority` | Variant management |
| `clsx` | Class composition |
| `color-bits` | Utility |
| `dicons` | Utility |
| `framer-motion` | Physics-based animations |
| `lucide-react` | SVG icon library |
| `motion` | Physics-based animations |
| `next` | Next.js framework feature |
| `next-themes` | Next.js framework feature |
| `react-icons` | Utility |
| `simplex-noise` | Utility |
| `tailwind-merge` | Class composition |

## 3. Real Component Archetypes

These are actual component implementations found in the 21st.dev registry:

- `animated-footer.tsx`
- `background-beams-with-collision.tsx`
- `background-boxes.tsx`
- `demo.tsx`
- `dialog.tsx`
- `feature-section-1.tsx`
- `flickering-footer.tsx`
- `footer-1.tsx`
- `footer-2.tsx`
- `footer-7.tsx`
- `footer-column.tsx`
- `footer-section.tsx`
- `footer-taped-design.tsx`
- `footer.tsx`
- `hover-footer.tsx`
- `landing-page.tsx`
- `large-name-footer.tsx`
- `magnetic.tsx`
- `minimal-footer.tsx`
- `modem-animated-footer.tsx`
- ...and 10 more variants

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
- `alt`
- `asChild`
- `backgroundColor`
- `barCount`
- `baseHue`
- `baseRadius`
- `baseSpeed`
- `brand`
- `brandDescription`
- `brandIcon`
- `brandName`
- `color`
- `columns`
- `companyName`
- `containerClassName`
- `copyright`
- `copyrightText`
- `creatorName`
- `creatorUrl`
- `description`

## 5. Code Patterns (From Real Implementations)

### Pattern 1
```tsx
}

export function Footer({
  logo,
  brandName,
  socialLinks,
  mainLinks,
  legalLinks,
  copyright,
}: FooterProps) {
  return (
    <footer className="pb-6 pt-16 lg:pb-8 lg:pt-24">
      <div className="px-4 lg:px-8">
        <div className="md:flex md:items-start md:justify-between">
          <a
            href="/"
            className="flex items-center gap-x-2"
            aria-label={brandName}
          >
            {logo}
            <span className="font-bold text-xl">{brandName}</span>
          </a>
          <ul className="flex list-none mt-6 md:mt-0 space-x-3">
            {socialLinks.map((link, i) => (
              <li key={i}>
                <Button
                  variant="secondary"
```

### Pattern 2
```tsx
}

export function SocialLinks({ socials, className, ...props }: SocialLinksProps) {
  const [hoveredSocial, setHoveredSocial] = React.useState<string | null>(null)
  const [rotation, setRotation] = React.useState<number>(0)
  const [clicked, setClicked] = React.useState<boolean>(false)

  const animation = {
    scale: clicked ? [1, 1.3, 1] : 1,
    transition: { duration: 0.3 },
  }

  React.useEffect(() => {
    const handleClick = () => {
      setClicked(true)
      setTimeout(() => {
        setClicked(false)
      }, 200)
    }
    window.addEventListener("click", handleClick)
    return () => window.removeEventListener("click", handleClick)
  }, [clicked])

  return (
    <div
      className={cn("flex items-center justify-center gap-0", className)}
      {...props}
```

### Pattern 3
```tsx
import { Button } from "@/components/ui/button";

function Footer() {
  return (
    <footer className=" py-12 px-4 md:px-6 bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="icon-class w-8" />
              <h2 className="text-lg font-bold">Spectrum UI</h2>
            </Link>

            <h1 className="dark:text-gray-300 mt-4">
              Build by{" "}
              <span className="dark:text-[#039ee4]">
                <Link href="https://x.com/arihantCodes">@Arihantjain</Link>
              </span>
            </h1>
            <div className="mt-2">
            <Link  href="https://x.com/compose/tweet?text=I%27ve%20been%20using%20%23SpectrumUI%20 share%20yourtought%20%40arihantCodes%20">
              <Button variant='secondary'>
                Share Your Thoughts On
                <Icons.twitter className="icon-class ml-1 w-3.5 " />
              </Button>
            </Link>
            </div>
```

## 6. Integration Workflow

1. Create the component file in `/components/ui/footer.tsx`
2. Install required dependencies: `@aliimam/icons, @aliimam/logos, @radix-ui/react-dialog`
3. Ensure `cn()` utility exists at `@/lib/utils`
4. Use `cva()` for variant management when the component has multiple visual states
5. Wrap with `React.forwardRef` for composability with form libraries
6. Add `displayName` for DevTools debugging
7. Export both the component and any variant helper (e.g., `footerVariants`)

## 7. Anti-Patterns

- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes
- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens
- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive Footers must be keyboard-accessible
- **[ANTI-PATTERN]** No `focus-visible` ring — always provide visible focus indicators
- **[ANTI-PATTERN]** Omitting `aria-*` attributes on interactive elements
- **[ANTI-PATTERN]** Using `px` units for responsive dimensions — prefer `rem`, `%`, or Tailwind spacing
- **[ANTI-PATTERN]** Instant state changes without transitions — use `framer-motion` springs

## 8. Design Philosophy

When generating Footers components:

1. **Never repeat a design** — with 14+ archetypes available, each generation should be unique
2. **Layer composition** — combine background effects, surface treatments, and interaction layers
3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations
4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement
5. **Production-ready** — TypeScript strict, accessible, responsive, performant

---

## 9. 🧬 Generative DNA — Randomization Matrix

> **How to use:** When generating a Footers component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.

### 📐 Layout Axis
1. Multi-column links grid
2. Single-row compact bar
3. Mega footer with newsletter + columns
4. Stacked centered columns
5. Minimal dark bar with credits only

### 🎨 Surface Axis
1. Dark gradient from content to void black
2. Glass panel separated from main content
3. Solid dark with subtle top border
4. Gradient mesh background behind columns
5. Textured with noise grain overlay

### ⚡ Motion Axis
1. Scroll-triggered stagger entrance of columns
2. Link hover: underline slides from left
3. Newsletter input focus: border glow animation
4. Social icons hover: color + lift
5. Back-to-top button fade-in at scroll threshold

### 🎭 Mood Axis
1. Corporate — structured, legal links, logo heavy
2. Startup — minimal, 3-4 links, casual tone
3. Creative — animated, illustrated, unique layout
4. SaaS — columns: Product, Resources, Company, Legal
5. Portfolio — centered, name + social icons only

### 🧩 Composition Axis
1. Site-wide global footer
2. Landing page bottom section
3. Dashboard minimal footer
4. Documentation site footer with sitemap
5. Marketing page CTA + footer combined

## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints

> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.

### Recipe 1: Void Fade
dark gradient footer fading from content bg to #000000 over 200px. Four link columns stagger-in on scroll. Links hover with brand-color + underline slide. Newsletter form with glass input + CTA button. Social icons in a row with hover color + lift. Copyright bar at very bottom in text-xs muted.

### Recipe 2: Glass Mega
frosted-glass panel with border-top-white/10. Wide layout with 5 columns. Company logo + description in first column, link categories in rest. Bottom bar: copyright + locale selector + theme toggle. Everything staggers in on first scroll-into-view.

### Recipe 3: Minimal Credits
single dark bar, height 64px. Logo left, copyright text center, social icons right. Social icons hover: scale + brand-color. No link columns. Top border 1px white/5. Clean, minimal, functional.

### Recipe 4: CTA-Footer Hybrid
upper section: centered CTA block (headline + button + trust badges) on gradient background. Lower section: standard link columns + copyright on dark bg. CTA section animates in powerfully (scale + fade). Clear visual separation between CTA and footer.

## 11. 🌀 Chaos Modifiers

> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.

---

## 12. 📍 When to Use — Page Context

This component appears in these page types:

- **Every page bottom — landing, dashboard, blog, docs**

## 13. 🔗 Composes With

Load these companion blueprints when building with Footers:

- `components/links.md` — Links
- `components/icons.md` — Icons
- `components/inputs.md` — Inputs
- `components/buttons.md` — Buttons


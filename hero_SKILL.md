---
name: hero-section-design
description: Build world-class hero sections for high-conversion landing pages. Use this skill when designing or rebuilding hero components for SaaS, fintech, trading, or premium web applications. Produces cinematic, scroll-reactive, performance-optimized hero sections that convert visitors into users.
---

# Hero Section Design System

Distilled from analysis of 30+ premium hero components on 21st.dev (Aceternity UI, Magic UI, Shadcnblocks, Tailark, reuno-ui) and top-tier fintech/trading platforms.

## I. Architectural Principles

### Layout Hierarchy (Priority Order)
1. **Hook Text** — Massive display typography, above the fold, no scrolling required
2. **Value Proposition** — One sentence max, muted secondary text
3. **CTA Cluster** — Primary + secondary actions, visually heavy
4. **Social Proof Strip** — Trust signals, live data, or activity feed
5. **Visual Anchor** — Product preview, 3D element, or interactive data display

### Layout Patterns (Ranked by Conversion)
| Pattern | When to Use | Visual Weight |
|---------|-------------|--------------|
| **Centered Stack** | SaaS, universal appeal | Typography dominates |
| **Asymmetric Split** (7:5 grid) | Data-heavy products, fintech | Left: text, Right: interactive card |
| **Full-Bleed Cinematic** | Brand-first, luxury | Background visual dominates |
| **Top-Down Flow** | Mobile-first, scroll-driven | Hook → CTA → proof → visual |

## II. Typography Techniques

### Kinetic Headlines
- **Word-by-word reveal**: Stagger children 120-180ms, use `rotateX(-40deg)` + `y: 50px` for 3D entrance
- **Text scramble/shuffle**: Randomize characters before resolving to final word (use `requestAnimationFrame` loop)
- **Gradient sweep**: Animate `background-position` on `background-clip: text` elements
- **Shimmer pass**: Overlay a moving linear-gradient (45deg) that sweeps across text every 3-5s

### Font Sizing Formula
```
Hero headline: clamp(2.8rem, 11vw, 9rem)
Sub-headline: clamp(1rem, 2.5vw, 1.25rem)  
Body/description: clamp(0.875rem, 1.5vw, 1.125rem)
```

### Spacing Rules
- Headlines: `line-height: 0.85`, `letter-spacing: -0.02em` to `0.02em`
- Headlines should STACK vertically (block display per word) for maximum impact
- Never center-align body text alongside left-aligned headlines

## III. Background & Atmosphere

### Layered Background System (Bottom to Top)
1. **Base** — Solid `#000000` or deep surface color
2. **Grid/Dot Pattern** — `background-image` with `linear-gradient` lines, 40px spacing, 3-5% opacity
3. **Radial Spotlight** — `radial-gradient(ellipse 60% 50% at 50% -5%, rgba(accent, 0.06), transparent 70%)`
4. **Mouse-tracking Glow** — `useSpring` on `mousemove`, 600px radial, accent at 4-6% opacity
5. **Noise Texture** — SVG `feTurbulence` overlay at 3-4% opacity
6. **Scan Line** (optional) — Single 1px horizontal line animating top-to-bottom, accent color at 50% opacity

### Signature Techniques from 21st.dev
- **Aceternity Spotlight/Lamp**: Simulated light cone from top-center, creates a "stage lighting" effect
- **Mesh Gradient Orbs**: 2-3 large blurred circles of accent color at ultra-low opacity, positioned off-center
- **Parallax Grid**: Background grid translates at 40% of scroll speed (`useTransform(scrollYProgress, [0,1], ['0%','40%'])`)
- **Corner Markers**: Small L-shaped bracket lines at viewport corners, accent color at 40% opacity

## IV. Animation Playbook

### Entrance Sequence (Timeline)
```
0.0s — Background elements fade in (grid, noise, spotlight)
0.1s — Top data bar slides down
0.2s — Eyebrow/label appears
0.3s — First headline word reveals (rotateX + translateY)
0.5s — Second headline word reveals
0.7s — Third headline word reveals
0.8s — Body text fades up
1.0s — CTA buttons slide up
1.2s — Side card/visual anchor fades in from right
1.5s — Activity feed / social proof ticker starts
```

### Scroll Behaviors
- **Hero fade-out**: `opacity: useTransform(scrollY, [0, 0.8], [1, 0])` + `scale: [1, 0.96]`
- **Parallax depth**: Different layers move at different rates (grid: 0.4x, content: 1x, decorative: 0.6x)
- **Sticky until complete**: Pin hero content until all entrance animations complete

### Continuous Ambient Animations
- **Pulse indicators**: `scale: [1, 1.4, 1]` at 1.5s infinite for live dots
- **Floating elements**: `translateY: [0, -5px, 0]` at 6s ease-in-out infinite
- **Data rotation**: Cycle through metrics every 3-4s with crossfade
- **Ticker scroll**: `translateX: [0, -50%]` at 40s linear infinite

### Easing Functions
```
Snappy entrances: cubic-bezier(0.76, 0, 0.24, 1)
Smooth springs: { stiffness: 200-400, damping: 20-25 }
Expo out: cubic-bezier(0.16, 1, 0.3, 1)
```

## V. CTA Design

### Button Hierarchy
1. **Primary**: Solid accent background → on hover: invert (accent border, accent text, dark bg) + glow shadow
2. **Secondary**: Transparent with border → on hover: accent border + subtle accent bg (5% opacity)
3. **Ghost**: Text-only with arrow → on hover: shift arrow right + color change

### Micro-interactions
- **Shimmer sweep**: Pseudo-element with gradient slides across button face every 3s
- **Border glow**: `box-shadow: 0 0 20px rgba(accent, 0.4)` on hover
- **Press feedback**: `scale(0.97)` on `whileTap`
- Arrow animation: `→` shifts 4px right on hover

## VI. Social Proof & Trust Layer

### Above-the-Fold Trust Signals
- **Live indicator**: Pulsing dot + "LIVE" badge + stat (e.g., "47 traders funded today")
- **Scrolling ticker**: Activity feed with action chips (Funded · $50K · Alex K.)
- **Data bar**: Key metrics in monospace (Vol: $12.8M | Active: 15,247)

### Design Rules
- Use monospace fonts for all numeric data
- Separate items with thin vertical dividers or dot separators (`·`)
- Muted opacity (40-60%) for supporting text, full opacity for key values
- Live elements should have continuous subtle animation to feel "alive"

## VII. Responsive Strategy

### Breakpoints
- **Mobile** (<640px): Stack everything vertically, reduce font scale, hide decorative elements
- **Tablet** (640-1024px): 2-column possible, reduce spacing
- **Desktop** (>1024px): Full layout with all effects

### Mobile-Specific Rules
- Hide mouse-tracking glow (check `(hover: hover)` media query)
- Hide corner markers below `sm`
- Simplify activity feed (hide user names, timestamps)
- Use `100svh` not `100vh` for full-height sections
- Minimum touch target: 44×44px for all interactive elements

## VIII. Performance Budget

- **First Contentful Paint**: < 1.5s
- No layout shift from animation entrances (use `transform` only, not `width`/`height`/`top`/`left`)
- Defer non-critical animations until `requestIdleCallback` or `IntersectionObserver`
- Use `will-change: transform` sparingly (only on actively animating elements)
- Prefer CSS animations over JS for ambient effects (ticker, pulse, float)
- Lazy-load any heavy visual elements below the fold

## IX. Anti-Patterns (Never Do)

- ❌ Generic stock hero images with overlay text
- ❌ Carousel/slider heroes (kills conversion)
- ❌ More than 2 CTAs (creates decision paralysis)
- ❌ Center-aligned everything (lacks visual hierarchy)
- ❌ Rounded corners on a brutalist/terminal design system
- ❌ Emoji in professional/fintech contexts
- ❌ Purple-on-white gradient (AI slop signature)
- ❌ Auto-playing video backgrounds (performance drain)
- ❌ More than 3s total entrance animation duration
- ❌ Animations that block content visibility

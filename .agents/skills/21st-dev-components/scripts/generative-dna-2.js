// ─── Generative DNA Part 2: button through dropdown ───
const DNA_2 = {
    'button': {
        layout: ["Standard inline button", "Icon-only circular button", "Split button (action + dropdown)", "Button group bar", "FAB floating action button"],
        surface: ["Gradient fill with inner shadow", "Glass with backdrop-blur + border-white/10", "Solid with brand-color + dark text", "Outlined with hover-fill transition", "Neon with outer glow ring"],
        motion: ["Magnetic cursor attraction (pull toward click point)", "Ripple effect expanding from click position", "Scale spring (whileHover: 1.02, whileTap: 0.97)", "Shimmer sweep across surface on hover", "Particle explosion on click (radial burst)"],
        mood: ["Premium dark — subtle gradient, gold accents", "Playful — rounded-full, bright color, bounce", "Brutal — sharp rect, 3px border, uppercase", "Ghost — transparent bg, text only, underline hover", "Cyberpunk — neon border, glitch hover, scan-lines"],
        composition: ["Primary CTA in hero section", "Form submit button with loading state", "Navigation action button", "Card action footer", "Toolbar icon button row"],
        spawnRecipes: [
            "Magnetic Pull — button magnetically tracks cursor within 150px radius. Lerps position toward cursor. Click triggers ripple circle expanding from click point. Surface has subtle gradient (brand-color to 10% darker). Scale-tap 0.97. Focus ring glows.",
            "Particle Burst — solid dark button with brand-color text. On click, 12 small particles explode radially outward from center, fading and shrinking over 600ms. Button scales to 0.95 on tap. Hover adds a shimmer sweep across the surface.",
            "Glass CTA — frosted glass button with backdrop-blur-xl, border-white/10, brand-color text. Hover lifts Y-2px with shadow increase. Active scale 0.97. Loading state shows animated gradient moving left-to-right behind glass.",
            "Neon Outline — transparent background with 1px brand-color border that glows (box-shadow bloom). Hover fills background with brand-color at 10% opacity. Text color matches border. Double-click protection with cooldown.",
        ],
    },
    'calendar': {
        layout: ["Month grid (7-column)", "Week strip horizontal scroll", "Year overview heatmap grid", "Agenda list view", "Dual month side-by-side"],
        surface: ["Dark card with cell hover highlights", "Glass container with frosted day cells", "Minimal outlined grid, no fills", "Gradient accent on selected range", "Color-coded event dot indicators"],
        motion: ["Month slide-transition left/right with AnimatePresence", "Day cell pop-scale on select", "Range selection gradient sweep", "Today indicator pulse glow", "Hover cell lift with shadow"],
        mood: ["Dashboard — compact, data-dense, monospace dates", "Elegant planner — serif month name, gold today ring", "Minimal — thin lines, lots of space, subtle", "Colorful — each month a different hue, playful", "Corporate — strict grid, brand-color accent only"],
        composition: ["Date picker dropdown content", "Dashboard widget panel", "Full-page schedule view", "Inline form field calendar", "Sidebar mini-calendar"],
        spawnRecipes: [
            "Glass Planner — frosted-glass card container. Day cells have border-white/5. Hover cell fills with white/10 and lifts slightly. Selected day has brand-color ring + glow. Month transitions slide left/right with crossfade. Today cell has pulsing dot.",
            "Heatmap Year — GitHub-style contribution grid. 52 columns × 7 rows of small colored squares. Color intensity maps to event density. Hover shows tooltip with count. Scroll-triggered stagger-in animation for squares.",
            "Agenda Stream — vertical list of dated cards. Each card shows day name, date, and event list. Cards stagger-in on mount. Active day card is elevated with brand border. Clean, readable, lots of whitespace.",
            "Dual Panel — two months side-by-side for range selection. Navigating months slides both panels together. Range fill uses gradient between start and end. Day cells scale on hover. Clean dark theme.",
        ],
    },
    'call-to-action': {
        layout: ["Centered headline + button stack", "Split 50/50 (text left, visual right)", "Full-bleed background with overlay text", "Floating card CTA on gradient bg", "Multi-column with icon features + CTA"],
        surface: ["Gradient mesh background with glass card", "Dark solid with glowing CTA button", "Image/video background with text overlay", "Illustration backdrop with clean foreground", "Animated shader background"],
        motion: ["Scroll-triggered entrance (fade up + scale)", "CTA button magnetic hover + glow pulse", "Background parallax on scroll", "Headline typewriter or word-flip animation", "Staggered reveal of features then button"],
        mood: ["Urgent — countdown timer, red accents, bold", "Premium — dark bg, gold button, minimal text", "Friendly — warm colors, illustration, rounded", "Technical — code snippet CTA, terminal style", "Social proof — testimonial mini above CTA"],
        composition: ["Page bottom final conversion block", "Mid-page section break CTA", "Sticky bottom bar CTA", "Exit-intent modal CTA", "Inline content CTA card"],
        spawnRecipes: [
            "Void Spotlight — black background with a single radial-gradient spotlight on CTA button. Headline in 5xl bold, subtext in muted gray. Button glows with brand-color box-shadow, magnetic hover. Scroll-triggered fade-in-up.",
            "Gradient Wave — full-bleed section with animated gradient mesh background. Glass card centered containing headline, sub-text, and primary CTA button. Card has border-white/10. Button has shimmer sweep on hover. Trust badges below.",
            "Countdown Urgency — dark section with large countdown timer (DD:HH:MM:SS). Below timer: bold headline and CTA button. Timer numbers flip-animate on change. Button pulses glow when timer < 1 hour. Red accent color scheme.",
            "Terminal Prompt — dark terminal-style card. Monospace text: '$ ready to start?' with blinking cursor. Below: action button styled as terminal command. Green-on-black color scheme. Card has scanline overlay.",
        ],
    },
    'card': {
        layout: ["Vertical stack (image top, content bottom)", "Horizontal (image left, content right)", "Overlay (content on image)", "Bento grid multi-card layout", "Profile card (avatar centered)"],
        surface: ["Glass with backdrop-blur and border-white/10", "Solid dark with subtle border", "Gradient fill shifting on hover", "Neumorphic raised with soft shadows", "Outlined wireframe with dashed borders"],
        motion: ["3D tilt following cursor (rotateX/Y)", "Hover lift Y-4px with shadow expansion", "Glare effect (moving light reflection)", "Content stagger-in on card visibility", "Card flip (front/back) on click"],
        mood: ["Premium product — image-forward, minimal text, luxe", "Dashboard stat — number-heavy, chart sparkline, compact", "Social post — avatar, content, action bar, rounded", "Portfolio project — full-image bleed, overlay text", "Pricing tier — features list, CTA, highlight popular"],
        composition: ["Grid of cards (2-4 columns)", "Single featured card hero", "Carousel of scrolling cards", "Stacked deck (cards overlap depth)", "Masonry layout irregular grid"],
        spawnRecipes: [
            "Tilt Glass — frosted-glass card with backdrop-blur-xl. 3D perspective tilt follows cursor (max ±10°). Moving light glare effect tracks cursor position. Border-white/10, brand-color inner shadow glow on hover. Content fades up staggered on mount.",
            "Bento Block — variable-width cards in a CSS grid bento layout. Some cards span 2 columns. Each card has a unique gradient background. Content types: stat number, icon+text, small image, chart sparkline. Cards pop-in staggered on scroll.",
            "Flip Card — two-sided card with 3D rotateY flip on hover/click. Front: image + title. Back: description + CTA. CSS perspective 1000px. Smooth 600ms transition. Back has inverted color scheme.",
            "Stack Deck — cards stacked with slight Y-offset and scale reduction creating depth. Top card is full scale. Scroll or click advances the stack. Cards animate with spring to new positions. Depth shadow increases per layer.",
        ],
    },
    'carousel': {
        layout: ["Full-width single slide", "Multi-item visible strip", "Centered mode (active slide larger)", "Vertical carousel", "Thumbnail navigation row below"],
        surface: ["Glass slides on dark background", "Full-bleed image slides with overlay", "Card-based slides with shadows", "Minimal text-only slides", "Video slides with poster frames"],
        motion: ["Snap scroll with spring momentum", "Parallax layers within slides", "Scale active slide, shrink adjacents", "Crossfade transitions between slides", "3D carousel (rotateY around axis)"],
        mood: ["Product showcase — image hero, dots indicator", "Testimonial slider — centered quote, avatar", "Portfolio gallery — full-bleed, minimal chrome", "Feature walkthrough — illustration + text, arrows", "News ticker — compact, auto-advancing, text-only"],
        composition: ["Hero section main visual", "Product image gallery", "Testimonial section slider", "Feature tour walkthrough", "Team member showcase"],
        spawnRecipes: [
            "Glass Slider — Embla carousel with frosted-glass slides. Active slide is full opacity and scale-100, adjacent slides dim to 60% and scale-95. Snap transition with spring physics. Navigation dots below with active dot expanding to pill shape. Arrow buttons with magnetic hover.",
            "3D Ring — slides arranged in a 3D circular ring (rotateY). Auto-rotates slowly. Click/drag to spin. Active slide faces camera at full opacity. Others recede with perspective. Reflection effect below the ring.",
            "Parallax Hero — full-width carousel where each slide has layered elements (bg image, mid text, fg decoration) that move at different parallax speeds during transition. Crossfade background, slide-in text. Auto-advance 5s with progress bar.",
            "Vertical Story — full-height vertical snap carousel (like Instagram stories). Each slide is a full-viewport section. Scroll-snap-type: y mandatory. Progress bars at top showing position. Swipe gesture support.",
        ],
    },
    'checkbox': {
        layout: ["Standard label-right checkbox", "Card-select (entire card is checkbox)", "Checkbox group vertical list", "Checkbox group horizontal chips", "Checkbox with nested description"],
        surface: ["Rounded square with brand-color fill", "Circular toggle (radio-style)", "Outlined with animated SVG checkmark", "Frosted glass container", "Solid dark with glow on checked"],
        motion: ["SVG checkmark draws on with stroke-dashoffset", "Spring scale pop on check (1.0 → 1.2 → 1.0)", "Background color fills from center outward", "Label text strike-through animation on check", "Bounce of checkbox container on state change"],
        mood: ["Minimal system — small, clean, no fuss", "Playful — large, round, colorful, bouncy", "Task management — strikethrough text, completion feel", "Enterprise form — precise, label-heavy, grouped", "Creative — custom SVG marks (star, heart, etc.)"],
        composition: ["Form field in settings page", "Todo list item toggle", "Multi-select filter options", "Permission/consent checklist", "Feature comparison check column"],
        spawnRecipes: [
            "Draw Check — rounded-md checkbox with SVG checkmark that draws itself on via stroke-dashoffset animation (300ms). Background fills with brand-color via scale transition from center. Unchecking reverses both animations. Spring bounce of container on change.",
            "Card Select — entire card becomes selectable checkbox. Checked state: brand-color border + subtle background tint + check icon in corner. Uncheck: default border. Card lifts on hover. Clean for multi-select product choices.",
            "Glow Toggle — dark checkbox with no border. Checked state: box fills with brand color AND emits box-shadow glow. Checkmark appears via scale-in. Glow pulses once on initial check. Unchecked shows subtle inner-shadow.",
            "Strikethrough Task — checkbox next to task text. On check: checkmark draws SVG path, text animates strikethrough from left to right, text fades to 50% opacity. Spring physics on the checkbox scale. Satisfying 'completion' feel.",
        ],
    },
    'client': {
        layout: ["Logo strip horizontal row", "Logo grid (4-6 columns)", "Scrolling ticker tape (infinite)", "Logo cloud random placement", "Carousel with client details"],
        surface: ["Grayscale logos with color on hover", "White logos on dark background", "Glass cards containing logos", "Outlined containers per logo", "Gradient overlay that reveals on hover"],
        motion: ["Infinite scroll ticker (CSS translateX loop)", "Logo fade-in stagger on scroll", "Hover: grayscale to color transition", "Logo scale-up on hover with shadow", "Parallax logos at different scroll speeds"],
        mood: ["Enterprise — clean, minimal, uniformly sized", "Startup — varied sizes, playful arrangement", "Tech — dark mode, monochrome, dense", "Creative agency — colorful, dynamic, animated", "Trust builder — large logos, quotes alongside"],
        composition: ["Below hero section trust strip", "Dedicated partners page grid", "Footer pre-section strip", "Inside 'Trusted by' card block", "Sidebar scrolling logo rail"],
        spawnRecipes: [
            "Infinite Ticker — seamless horizontal scroll of client logos. Duplicated set for infinite loop. CSS animation translateX. Grayscale by default, color on hover. Pause on hover. Dark background, logos at 60% opacity until hovered.",
            "Glass Grid — 4-column grid of frosted-glass cards, each containing a centered logo. Cards have border-white/10. Hover lifts card + reveals brand color background tint. Stagger-in on scroll viewport enter. 'Trusted by 500+ companies' heading above.",
            "Cloud Float — logos positioned in a randomized cloud layout with slight overlaps. Different sizes suggesting importance. Logos slowly drift on random paths (CSS keyframes, different durations). Hover pins a logo and enlarges it.",
            "Logo Marquee — two rows scrolling in opposite directions. Top row left-to-right, bottom row right-to-left. Different speeds. Gradient mask fades edges to transparent. Clean dark background.",
        ],
    },
    'comparison': {
        layout: ["Two-column side-by-side", "Toggle switch (before/after)", "Slider divider (drag to reveal)", "Stacked cards with highlight", "Table-format feature matrix"],
        surface: ["Glass panels on gradient background", "Outlined sections with accent headers", "Solid dark cards with border-white/10", "Image-based before/after", "Chart/data visualization comparison"],
        motion: ["Slider handle drag with real-time reveal", "Toggle switch flips between views", "Scroll-triggered side-by-side slide-in", "Counter animations for stat comparisons", "Highlight pulse on winning values"],
        mood: ["Product comparison — feature checkmarks", "Before/After — image slider dramatic reveal", "Pricing tiers — side by side, highlight best", "Data-driven — charts, percentages, counters", "Technical — spec tables, detailed metrics"],
        composition: ["Pricing page plan comparison", "Product page before/after", "Feature page competitor matrix", "Results showcase improvement stats", "Dashboard metric comparison cards"],
        spawnRecipes: [
            "Drag Reveal — two images layered with a draggable vertical divider. Drag handle has a grip icon with left/right arrows. Left side clips to divider position. Smooth drag with momentum. Labels 'Before'/'After' at top. Handle glows on hover.",
            "Metric Duel — two cards side by side, each with stats. Better values highlighted in green with upward arrow icon. Numbers count-up animate on scroll enter. Winner card has subtle brand-color border glow. Header labels each side.",
            "Toggle Compare — single area with toggle switch at top. Switch between 'Plan A' and 'Plan B' (or Before/After). Content crossfades with slide transition. Active option label is bold/highlighted. Clean, focused comparison.",
            "Feature Matrix — table-style grid with feature rows. Two+ columns for compared items. Checkmarks (green) and X marks (red/muted). Row striping. Highlighted 'recommended' column with brand-color header + glow. Sticky column headers on scroll.",
        ],
    },
};

module.exports = { DNA_2 };

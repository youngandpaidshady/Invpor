// ─── Generative DNA Part 6: radio-group through slider ───
const DNA_6 = {
    'radio-group': {
        layout: ["Vertical list of radio items", "Horizontal button group", "Card-select radio (entire card is option)", "Segmented control bar", "Visual option picker (image + label)"],
        surface: ["Custom circle indicator with brand-color fill", "Button-style toggle group", "Glass card options", "Outlined cards with active brand border", "Minimal dot indicator only"],
        motion: ["Indicator fill scales from center with spring", "Active card lifts + brand border transitions", "Segmented slider moves between options", "Check icon pops in with bounce", "Card options hover with subtle lift"],
        mood: ["Form standard — clean circles, label right", "Pricing — card options, feature details each", "Settings — segmented control, compact, efficient", "Creative — image thumbnails as options", "Survey — large buttons, easy tap targets"],
        composition: ["Form option selection", "Plan/tier selector", "Settings preference choice", "Filter mode switcher", "Survey/quiz answer picker"],
        spawnRecipes: [
            "Spring Dot — custom radio with animated indicator dot. On select: dot scales from 0 to full size with spring overshoot. Outer ring in muted border, fills with brand-color on select. Label and optional description right. Clean, satisfying micro-interaction.",
            "Card Selector — each option is a glass card with icon, title, description. Selected card gets brand-color border + subtle background tint + check badge corner. Unselected: muted border. Cards hover-lift. Used for plan or feature selection.",
            "Segmented Bar — pill-shaped bar with options as segments. Active segment has brand-color background pill that slides between options (layoutId animation). Text contrast adjusts. Spring physics on slide. Compact, app-like control.",
            "Visual Picker — grid of image-thumbnail options. Each: image, label below. Selected: brand-color ring glow + check overlay. Unselected: muted border. Hover: lift + enlarge preview. Used for theme/color/avatar selection.",
        ],
    },
    'scroll-area': {
        layout: ["Vertical scroll container with custom scrollbar", "Horizontal scroll strip", "Dual-axis scroll (2D pan)", "Virtual scroll for large lists", "Snap-scroll sections"],
        surface: ["Custom thin scrollbar (brand-color thumb)", "Hidden scrollbar (thumb on hover only)", "Glass scrollbar on dark content", "Progress indicator bar instead of scrollbar", "No scrollbar (gesture/button scroll only)"],
        motion: ["Smooth scroll with easing (lenis)", "Snap scroll (CSS scroll-snap)", "Parallax layers at different scroll speeds", "Scroll progress bar animates", "Fade edges: content fades at top/bottom edges"],
        mood: ["System — native-feel but styled scrollbar", "Infinite feed — hidden scrollbar, endless content", "App — snap sections, full-viewport pages", "Dashboard — compact scroll areas, data tables", "Creative — horizontal scroll, parallax, immersive"],
        composition: ["Long content area in sidebar", "Table body scroll", "Chat message history scroll", "Settings panel with overflow", "Gallery horizontal scroll strip"],
        spawnRecipes: [
            "Glass Scrollbar — Radix Scroll Area with custom 6px scrollbar thumb in brand-color. Track is transparent. Thumb has rounded-full corners. Thumb fades in on hover/scroll, fades out after 1.5s idle. Content area has gradient fade at top and bottom edges (transparent→background).",
            "Snap Carousel — horizontal scroll area with CSS scroll-snap-type: x mandatory. Items snap to center. Active (snapped) item enlarges slightly. Navigation dots below reflect position. Touch-friendly. Gradient mask fades edges.",
            "Lenis Smooth — Lenis smooth scroll wrapper for an entire page section. Provides buttery 60fps scrolling with easing. Scroll progress bar at right edge (thin line). Parallax layers within content move at different rates. Premium scroll feel.",
            "Virtual List — virtualized scroll for 10,000+ items. Only visible items render. Scroll through at any speed without lag. Skeleton items flash briefly at edges. Custom scrollbar with position indicator. Overscan 5 items for smooth scrolling.",
        ],
    },
    'select': {
        layout: ["Standard dropdown select", "Searchable/filterable select", "Multi-select with tag chips", "Grouped options with headers", "Combobox (type + select)"],
        surface: ["Glass trigger + glass dropdown", "Outlined trigger with solid dropdown", "Dark trigger with brand-color active option", "Pill-shaped trigger with popover dropdown", "Minimal underline trigger with fly-out"],
        motion: ["Dropdown scales in from trigger with spring", "Options stagger fade-in", "Selected option check icon pops in", "Multi-select: tags spring-scale in on add", "Clear all: tags collapse out in sequence"],
        mood: ["Form standard — clean, label above, validation", "Filter — pill-shaped, count badge, compact", "Settings — full-width, detailed option descriptions", "Creative — color swatches or rich option previews", "Command — search-first, keyboard-driven"],
        composition: ["Form field select input", "Table column filter", "Navigation locale/region selector", "Settings preference dropdown", "Search filter refinement"],
        spawnRecipes: [
            "Glass Combobox — glass trigger button shows selected value. Click: glass dropdown with search input at top. Options filter live. Active option has brand-color left bar indicator. Selected has checkmark. Keyboard navigable. Dropdown springs in from trigger anchor.",
            "Tag Multi-Select — trigger shows selected items as pill tags. Tags have X remove button. Click: dropdown with checkboxes per option. Selecting adds tag with spring-scale animation. Removing: tag collapses out. 'Clear All' link. Overflow: '+N more' counter tag.",
            "Rich Option Select — each option shows icon + title + description (2-line). Hover: option row highlights. Selected: checkmark right-aligned. Options grouped by category with bold section headers. Dropdown has max-height with internal scroll. Premium, informative.",
            "Inline Search Select — input field that doubles as search. Type to filter options in dropdown below. Options highlighted matching characters in bold. Arrow key navigation. Enter selects. Tab autocompletes. Used for city/country/user search selection.",
        ],
    },
    'shader': {
        layout: ["Full-viewport background shader", "Card-contained shader effect", "Section divider shader strip", "Interactive shader responding to mouse", "Shader as image/texture generator"],
        surface: ["GLSL fragment shader on Three.js plane", "CSS-only animated gradient approximation", "Canvas 2D noise/particle field", "WebGL post-processing effects", "SVG filter-based shader simulation"],
        motion: ["Time-based continuous animation (uniform float)", "Mouse position influences shader (uniform vec2)", "Scroll position maps to shader param", "Audio-reactive shader visualizer", "Color palette shifts over time"],
        mood: ["Deep space — black, distant particles, void", "Aurora — flowing color bands, ethereal", "Ocean — wave displacement, deep blue", "Neon — bright colors, high contrast, cyberpunk", "Organic — noise-based, earth tones, natural flow"],
        composition: ["Hero section background", "Ambient page background", "Card surface texture", "Loading screen visual", "Interactive art piece"],
        spawnRecipes: [
            "Flow Field — GLSL fragment shader with Perlin noise-based flow field. Dark background (#050505) with brand-color particles following flow vectors. Time uniform creates continuous drift. Mouse position creates attraction/repulsion. Renders on Three.js fullscreen quad. Fallback: dark gradient for SSR.",
            "Aurora Bands — sine-wave color bands flowing horizontally across screen. Colors interpolate through brand palette. Movement controlled by time uniform. Subtle noise displacement adds organic feel. Low brightness (max 30%) to keep content readable. Full-viewport background.",
            "Noise Grain — simple but effective: base dark color with animated Perlin noise at very low opacity (3-5%). Noise scrolls slowly upward. Creates living, breathing background texture. Can be CSS-only with SVG feTurbulence + animation. Lightweight, universal.",
            "Mesh Gradient — Weber-style color mesh with 4-6 gradient control points. Points drift slowly on circular paths. Colors blend smoothly between points. Blur and saturation create dreamy effect. Full canvas. Colors from brand palette. Mouse proximity influences nearest point.",
        ],
    },
    'sidebar': {
        layout: ["Fixed left sidebar with main content", "Collapsible sidebar (full ↔ icon-only)", "Off-canvas drawer sidebar", "Split sidebar (sections + content)", "Floating sidebar panel"],
        surface: ["Glass with border-right-white/10", "Solid dark with brand-color accents", "Outlined with section dividers", "Gradient background sidebar", "Transparent overlay sidebar"],
        motion: ["Collapse/expand with width spring animation", "Menu items stagger-fade on expand", "Active indicator slides between items", "Sidebar slides from off-canvas with spring", "Hover-to-expand from icon-only strip"],
        mood: ["Dashboard — data nav, icons + labels, collapsible", "Documentation — tree nav, search, section groups", "Admin — multi-level, role badges, notifications", "Creative — minimal, icon-only default, labels on hover", "Social — profile top, feed sections, quick actions"],
        composition: ["Application main navigation", "Settings page section nav", "Documentation sidebar nav", "Admin panel navigation", "Email/chat folder sidebar"],
        spawnRecipes: [
            "Collapsible Glass — frosted-glass sidebar that collapses between full (240px) and icon-only (56px). Collapse button at bottom toggles with spring width animation. Icons always visible, labels fade in/out. Active item has brand-color left indicator bar (slides with spring). Tooltip shows label in collapsed mode.",
            "Off-Canvas Drawer — hidden by default. Hamburger button triggers slide-in from left with spring. Dark overlay backdrop. Sidebar contains: user avatar/name header, nav sections with icons, and footer links. Swipe-to-close on mobile. Clean, mobile-first.",
            "Hover Expand — 56px icon-only rail by default. Hovering expands to full width (240px) with spring animation. Labels fade in during expansion. Mouse-leave collapses after 300ms delay. Active item has filled icon. Badge counts on nav items.",
            "Split Panel — sidebar split into two sections: left thin rail (icon buttons for top-level sections) and right panel (sub-navigation for selected section). Selecting a section in left rail swaps right panel content with crossfade. Clean hierarchy.",
        ],
    },
    'sign-in': {
        layout: ["Centered card form", "Split screen (form left, visual right)", "Full-page form with background", "Modal/dialog sign-in", "Step-by-step progressive sign-in"],
        surface: ["Glass card on gradient mesh background", "Dark card with brand-color accents", "Clean white card with shadow", "Image background with overlay form", "Minimal borderless form"],
        motion: ["Card springs in on page load", "Input labels float up on focus", "Submit button loading state animation", "Social login buttons stagger-in", "Success: form morphs to welcome message"],
        mood: ["Premium — dark, glass card, minimal fields", "Corporate — logo, brand colors, SSO options", "Social — social login prominent, form secondary", "Minimal — email only first, password step 2", "Creative — unique layout, animated background"],
        composition: ["Standalone login page", "Modal popup from nav", "Embedded in settings page", "Onboarding first step", "Marketing page gated content"],
        spawnRecipes: [
            "Glass Portal — centered frosted-glass card on gradient mesh background. Logo at top. Email + password inputs with floating labels. Submit button with gradient + loading spinner state. Divider: 'or continue with'. Social login buttons (Google, GitHub) as outlined buttons. 'Forgot password?' link below. Card springs in on mount.",
            "Split Cinematic — left half: sign-in form on dark background with brand-color accents. Right half: full-bleed image or animated shader. Form card has glass surface. Inputs glow on focus. Submit button has magnetic hover. Social options below. Right visual parallaxes on mouse move.",
            "Progressive Flow — step 1: email input only + 'Continue' button. Step 2: slides to password input (or magic link option). Each step transitions with slide-left animation. Progress indicator at top. Reduces cognitive load. Back button to return to email.",
            "Modal Sign-In — dialog/modal with dark overlay. Glass card centered. Compact form: email, password, submit. Close X and Escape to dismiss. Card scales in with spring. Tab-trap focus within modal. Auto-focus email input. Clean, non-intrusive.",
        ],
    },
    'sign-up': {
        layout: ["Centered card form (extended from sign-in)", "Multi-step registration wizard", "Split screen with value proposition", "Single column long form", "Conversational step-by-step"],
        surface: ["Glass card with brand accents", "Dark theme with input glow", "Clean card with section dividers", "Gradient background with floating card", "Minimal, no-card open form"],
        motion: ["Multi-step: slides between steps", "Input validation: inline checkmarks draw in", "Password strength meter fills with gradient", "Form completion progress bar", "Success: confetti + welcome animation"],
        mood: ["Quick start — minimal fields, social signup prominent", "Enterprise — company/role fields, policy agreements", "Community — avatar upload, username picker, interests", "Premium — invitation-only feel, exclusive language", "Developer — API key issuance, technical preferences"],
        composition: ["Registration page", "Onboarding first step", "Pricing page convert to signup", "Invite-only gated registration", "Trial signup from marketing page"],
        spawnRecipes: [
            "Wizard Registration — 3-step glass card: Step 1 (email + password), Step 2 (name + avatar upload), Step 3 (preferences/interests). Steps slide left-to-right with AnimatePresence. Progress bar at top. Back/Next buttons. Final step: submit + confetti on success.",
            "Quick Social — large social login buttons (Google, Apple, GitHub) as primary CTAs. Below divider: compact email/password fallback form. Glass card on dark gradient bg. Social buttons are glass with hover lift. Emphasizes speed: 'Sign up in 10 seconds'.",
            "Split Value Prop — left side: sign-up form with glass card. Right side: animated value propositions (feature list, stat counters, testimonial rotator). Form stays fixed while right content showcases benefits. Scrollable on mobile with form first.",
            "One-at-a-Time — conversational flow: one field per screen. Large input, single question ('What's your email?'). Enter key or button advances. Progress dots. Backtrack possible. Reduces abandonment. Final screen: account created + welcome.",
        ],
    },
    'slider': {
        layout: ["Horizontal range slider", "Vertical range slider", "Dual-thumb range selector", "Step/discrete slider with markers", "Circular/radial slider"],
        surface: ["Track with brand-color filled portion", "Glass track with glowing thumb", "Minimal thin line with dot thumb", "Thick track with embedded value label", "Gradient track showing value spectrum"],
        motion: ["Thumb follows with spring physics", "Value tooltip pops up on drag", "Track fill animates on programmatic change", "Step markers pulse when passed", "Thumb has glow that intensifies on drag"],
        mood: ["System — clean, standard range input", "Audio — volume slider, waveform track", "Pricing — value-based, dollar amount thumb", "Color — hue/saturation spectrum track", "Custom — emoji markers, playful positions"],
        composition: ["Volume/brightness control", "Price range filter", "Form numeric input alternative", "Color picker hue/sat control", "Settings preference adjustment"],
        spawnRecipes: [
            "Glow Range — horizontal slider with dark track. Filled portion in brand-color. Thumb is circular with box-shadow glow (brand-color). Glow intensifies on drag. Value tooltip appears above thumb during drag with spring pop. Track has subtle gradient from muted to brand.",
            "Step Slider — discrete slider with visible step markers (dots on track). Thumb snaps between steps with spring animation. Active step marker enlarges. Value labels below markers. Current value displayed prominently above. Used for plan tier selection or similar.",
            "Dual Range — two thumbs for min/max range. Filled portion between thumbs has gradient. Thumbs can't cross. Value labels on each thumb. Track shows full range context. Used for price, age, or date range filters. Both thumbs have spring physics.",
            "Audio Fader — vertical slider styled as audio mixer fader. Tall thin track with large horizontal thumb grip. dB markings along side. Peak indicator LED stack above. Thumb casts shadow. Drag with smooth response. Used for creative/audio UIs.",
        ],
    },
};

module.exports = { DNA_6 };

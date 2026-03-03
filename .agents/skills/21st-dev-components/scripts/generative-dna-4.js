// ─── Generative DNA Part 4: hero through link ───
const DNA_4 = {
    'hero': {
        layout: ["Full-viewport centered headline", "Split 50/50 (text left, visual right)", "Video/shader background with overlay text", "Stacked sections with scroll-triggered stages", "Asymmetric diagonal composition"],
        surface: ["Animated GLSL shader background", "Video loop with dark overlay", "Gradient mesh with floating blobs", "Image hero with parallax layers", "Particle field (tsparticles/canvas)"],
        motion: ["Headline typewriter or word-flip reveal", "Parallax layers on mouse move", "Scroll-triggered reveal stages", "CTA button magnetic + glow", "Background continuously animates (shader/particles)"],
        mood: ["SaaS launch — bold headline, sub-text, dual CTAs", "Portfolio — name, title, scroll indicator, minimal", "Agency — dramatic, full-bleed video, overlay text", "Product — 3D mockup, feature badges, conversion", "Artistic — experimental layout, shader bg, abstract"],
        composition: ["Landing page first fold", "Product homepage", "Portfolio entry point", "Documentation welcome", "App marketing page"],
        spawnRecipes: [
            "Shader Void — full-viewport with custom GLSL shader background (dark flowing waves). Massive headline (text-7xl) fades up with stagger per word. Sub-text in muted color. Two CTA buttons: primary (gradient + glow) and secondary (outline). Scroll indicator chevron bounces at bottom.",
            "Split Product — left 50%: headline, description, CTA buttons, trust badge row. Right 50%: 3D product mockup with subtle rotation on mouse move. Headline uses gradient text (brand spectrum). Trust badges stagger in. Right visual has glow shadow.",
            "Parallax Layers — full-viewport with 3 parallax layers: background (gradient/image), midground (geometric shapes), foreground (text content). Mouse movement creates depth effect. Headline is text-7xl bold. Mouse-tracking glow spotlight effect on headline.",
            "Video Cinematic — looping video background (muted, poster frame). Dark overlay (black/50). Centered content: announcement badge, headline, description, CTA button. Content reveals with stagger. Video has scanline overlay at 3%. Button has magnetic hover.",
        ],
    },
    'hook': {
        layout: ["Code block example with result", "Hook signature card with params", "Side-by-side (usage + demo preview)", "Tabbed (code / demo / docs)", "List of hook cards"],
        surface: ["Dark code-editor card", "Glass card with syntax highlighting", "Terminal-style monospace panel", "Clean card with code + description", "IDE-themed with line numbers"],
        motion: ["Code typewriter effect on mount", "Result value animates on change", "Copy button: checkmark morph on click", "Tab switch with crossfade", "Hook demo: live preview updates"],
        mood: ["Developer — syntax-highlighted, precise, technical", "Educational — step-by-step, annotated, beginner-friendly", "Showcase — big demo, minimal code, impressive result", "Utility — compact card, copy button, essentials only", "Interactive — adjust params, see result live"],
        composition: ["Documentation page utility section", "Library showcase page", "Playground/sandbox environment", "Blog post code example", "Component library hook docs"],
        spawnRecipes: [
            "Code Card — dark (#0d0d0d) card with syntax-highlighted hook code. Line numbers in muted color left rail. Copy button top-right with click: icon morphs to checkmark for 2s. Card has subtle border-white/5. Title badge above code. Code reveals via typewriter effect on scroll-in.",
            "Live Playground — split card: left has editable code (textarea styled as editor), right shows live result preview. Changing params updates result in real-time. Glass card container. Params have slider inputs for numeric values. Result animates on change.",
            "Hook Gallery — grid of hook cards. Each card: hook name in mono, one-line description, code snippet preview (3-4 lines), 'Copy' and 'Docs' buttons. Cards hover-lift. Stagger-in on scroll. Grouped by category (State, Effect, UI, Utility).",
            "Interactive Demo — centered card with large visual demo of the hook in action (e.g., useMousePosition shows coordinate readout following cursor). Below demo: the hook code. Params adjustable via controls. Responsive, engaging, 'wow' factor.",
        ],
    },
    'icon': {
        layout: ["Icon grid browser", "Icon + label pair inline", "Icon button circular", "Icon in badge/chip context", "Icon animation showcase"],
        surface: ["Filled circle/square background", "Outlined (stroke-only icons)", "Gradient-filled icon shapes", "Glass container for icon", "Icon with colored shadow"],
        motion: ["Hover: icon rotates/bounces/morphs", "Entrance: icons stagger pop-in", "Click: icon morphs to alternate state", "Loading: icon spins continuously", "Hover: icon line-draws (stroke animation)"],
        mood: ["System — clean outlined, mono weight, precise", "Brand — filled, custom colors, on-brand shapes", "Playful — bouncy, colorful, oversized", "Technical — thin-line, monospace labels, compact", "Abstract — artistic shapes, creative animations"],
        composition: ["Navigation menu item prefix", "Feature card icon header", "Button icon left/right slot", "Status indicator icon", "Empty state illustration icon"],
        spawnRecipes: [
            "Draw Icon — outlined icon that draws itself on mount via SVG stroke-dashoffset animation. Each path segment draws in sequence (staggered). Hover replays the draw animation. Clean, technical, precise feel.",
            "Morph Toggle — two-state icon (hamburger↔close, play↔pause). States morph between each other using SVG path interpolation. Spring physics on the transition. Used as interactive toggles.",
            "Icon Grid Browser — searchable grid of icons. Filter by name/tag. Icons in a responsive grid. Hover: icon lifts + shows name tooltip. Click: copies component code. Glass search input at top. Icons stagger-in on filter change.",
            "Glow Icon Button — circular button (40px) containing a single icon. Default: muted color. Hover: icon turns brand-color + container gets subtle glow shadow. Active: scale 0.95. Used for toolbar actions. Multiple sizes via size prop.",
        ],
    },
    'image': {
        layout: ["Full-bleed hero image", "Grid gallery (masonry/uniform)", "Image with caption card", "Before/after comparison slider", "Lightbox modal on click"],
        surface: ["Rounded with subtle shadow", "Glass frame with border-white/10", "No chrome (full bleed)", "Polaroid-style with white border + caption", "Gradient overlay on image content"],
        motion: ["Lazy load: blur placeholder → sharp reveal", "Hover: subtle zoom (scale 1.05) with overflow hidden", "Scroll: parallax displacement", "Gallery: masonry stagger-in on load", "Lightbox: scale-from-thumbnail with spring"],
        mood: ["Portfolio — gallery, minimal chrome, focus on content", "E-commerce — product images, zoom, multi-angle", "Editorial — large hero images, overlay text", "Social — grid, rounded, interactive", "Technical — screenshots, annotations, precise"],
        composition: ["Hero section background", "Product detail gallery", "Blog post inline images", "Team member photos", "Portfolio project showcase"],
        spawnRecipes: [
            "Blur Reveal — image loads with blur(20px) + scale(1.1) placeholder. On load complete, transition to blur(0) + scale(1.0) over 600ms. Smooth, premium loading experience. Wrapper maintains aspect ratio to prevent layout shift. next/image optimized.",
            "Parallax Hero — full-width image with CSS transform: translateY on scroll creating parallax depth. Dark gradient overlay fading from bottom for text readability. Image pans slowly on mouse move for depth. Overflow hidden on container.",
            "Masonry Gallery — responsive masonry grid using CSS columns. Images stagger-fade-in on scroll visibility. Hover: subtle scale(1.03) with overflow hidden on container. Click: opens lightbox modal with scale-from-thumbnail spring transition. Lightbox has arrow navigation.",
            "Polaroid Card — image wrapped in white-bordered card (asymmetric padding: more at bottom for caption). Subtle rotation (random -2° to 2°). Shadow for depth. Caption in handwriting font below image. Hover straightens rotation. Stack multiple for scattered photo feel.",
        ],
    },
    'input': {
        layout: ["Standard labelled input", "Floating label input", "Input with icon prefix/suffix", "Search input with results dropdown", "Input group (multiple fields inline)"],
        surface: ["Dark with glow border on focus", "Outlined with brand-color focus ring", "Underline-only (material style)", "Glass with backdrop-blur", "Solid fill with no border"],
        motion: ["Label floats up on focus with spring", "Focus: border color transitions + glow", "Error: shake animation + red border", "Character count animates", "Clear button: X icon fades in when input has value"],
        mood: ["Clean modern — floating label, validation inline", "Terminal — monospace, green caret, dark bg", "Material — underline, floating label, ripple", "Minimal — no border, underline only, spare", "Premium — glass, glow focus, brand accent"],
        composition: ["Form text input", "Search bar", "Chat message input", "Login email/password", "Filter/tag input"],
        spawnRecipes: [
            "Float Glass — frosted-glass input with backdrop-blur. Label starts as placeholder, floats above on focus with spring animation. Focus: brand-color border glow (0 0 0 2px). Unfocused with value: label stays floated in text-xs. Error: red border + shake + error message below.",
            "Neon Terminal — dark background (#0a0a0a) input with monospace font. Green caret blinks. No border, just a subtle bottom glow line (green/brand). Focus: glow intensifies. Prefix '>' character. Autocomplete dropdown styled as terminal output.",
            "Search Command — rounded-full input with search icon left and keyboard shortcut badge right (⌘K). Focus: expands width + shows results dropdown below. Results dropdown is glass with stagger-in items. Clear button (X) appears when input has value. Full command-palette upgrade path.",
            "Tagged Input — input that converts typed text to tag chips on Enter/comma. Tags are rounded pills with remove X. Tags enter with spring-scale animation. Remove with collapse-out animation. Input auto-resizes. Tag overflow wraps to new line.",
        ],
    },
    'interactive-ui': {
        layout: ["Kanban board columns", "Draggable dashboard widgets", "Interactive diagram/flow editor", "Resizable panel layout", "Gesture-driven card stack"],
        surface: ["Glass panels on dark workspace", "Outlined containers with drag handles", "Grid-based with snap alignment", "Floating cards with depth shadows", "Node-graph with connection lines"],
        motion: ["Drag with physics (momentum, bounce off edges)", "Resize with spring snap to grid", "Connection lines animate on create", "Cards reorder with layout animation", "Gesture: swipe, pinch, long-press responses"],
        mood: ["Productivity — Kanban, lists, clean functional", "Creative tool — freeform canvas, artistic", "Dashboard — widgets, resizable, data-dense", "Whiteboard — infinite canvas, collaborative", "Mobile-first — gesture-driven, swipe actions"],
        composition: ["Project management board", "Dashboard widget editor", "Workflow builder canvas", "Note-taking space", "Image/content editor"],
        spawnRecipes: [
            "Kanban Flow — three+ columns (To Do, In Progress, Done) as glass panels. Cards (glass, brand-color left accent) are draggable between columns. Drag ghost follows cursor. Drop zones highlight on hover. Cards reorder with spring animation. Layout shifts smoothly (LayoutGroup).",
            "Widget Dashboard — grid of resizable panels. Each panel has a drag handle (grip dots) and resize handle (corner). Panels snap to grid on release. Content types: chart, stat number, list, map. Glass panel containers. Resize with spring physics.",
            "Card Stack — stack of gesture-driven cards. Swipe right: accept (card flies right with rotation). Swipe left: dismiss (flies left). Next card springs up from below. Velocity-based throw physics. Card has content, shadow depth, slight tilt following drag angle.",
            "Flow Builder — node-graph canvas. Draggable nodes (glass cards). Connection ports on edges. Drag between ports to create animated connection lines (SVG path with gradient). Lines follow a bezier curve. Pan and zoom canvas. Mini-map in corner.",
        ],
    },
    'link': {
        layout: ["Inline text link", "Block link card", "Navigation link list", "Link with icon right (arrow)", "Breadcrumb link chain"],
        surface: ["Underline with brand-color on hover", "Background highlight fill on hover", "Animated underline (slide from left)", "No underline, color-change only", "Badge/pill styled link"],
        motion: ["Underline slides from left to right on hover", "Background fill transitions from bottom-up", "Arrow icon slides right on hover", "Link text color transitions", "Hover: subtle lift with shadow"],
        mood: ["Editorial — elegant underline, serif option", "Navigation — bold, active state indicator", "Utility — small, muted, functional", "Creative — animated, colorful, playful", "Documentation — code-link, monospace, subtle"],
        composition: ["Inline within paragraph text", "Navigation sidebar item", "Footer link column entry", "Breadcrumb chain element", "Card/article 'Read more' link"],
        spawnRecipes: [
            "Slide Underline — inline link with no default underline. On hover: a 2px underline (brand-color) slides in from left to right via scaleX transform (origin left). Color transitions to brand-color. Smooth 200ms transition.",
            "Arrow Link — text link with small arrow icon (→) to the right. On hover: arrow slides right 4px with spring transition. Text color shifts. Used for 'Learn more →' style navigation links.",
            "Glow Block — block-level link (padding 8px 16px) with no background. On hover: subtle brand-color background at 5% opacity + text brightens. Active: scale 0.98. Used in navigation lists. Active state: brand-color left bar indicator.",
            "Breadcrumb Chain — linked items separated by '/' or chevron separator. Each segment is clickable. Last segment is muted (current page). Segments have hover underline. Overflow: collapse middle segments into '...' dropdown. Clean, functional.",
        ],
    },
};

module.exports = { DNA_4 };

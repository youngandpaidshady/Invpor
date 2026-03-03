// ─── Generative DNA: Randomization axes & spawn recipes for ALL 61 components ───
// Each entry has: layout[], surface[], motion[], mood[], composition[], spawnRecipes[], chaosModifiers[]

const CHAOS_MODIFIERS_GLOBAL = [
    "Particle trail on hover — tiny dots follow cursor across the surface",
    "Scan-line overlay — 1px horizontal lines at 5% opacity, animate downward",
    "Noise grain texture — SVG feTurbulence at 3% opacity baked into background",
    "RGB chromatic split — 2px offset red/blue channels on entrance animation",
    "Glow pulse — subtle box-shadow breathes between 0.2 and 0.4 opacity on a 3s loop",
    "Border gradient animation — conic-gradient rotates 360° around the border continuously",
    "Holographic sheen — linear-gradient at 75° sweeps across on hover, pearl-to-transparent",
    "Magnetic cursor warp — element subtly tilts toward cursor within 200px attract radius",
    "Glitch micro-stutter — 50ms transform jitter on entrance, then settle",
    "Frosted edge bleed — backdrop-blur fades from 12px to 0px at edges",
    "Shadow elevation shift — box-shadow Y-offset animates from 4px to 12px on hover",
    "Dot matrix underlay — repeating-radial-gradient dots at 2% opacity behind content",
    "Typewriter reveal — text characters appear one-by-one with a blinking cursor",
    "Heat distortion — subtle CSS perspective skew that wobbles on scroll",
    "Neon flicker — opacity pulses between 0.85 and 1.0 rapidly twice on entrance",
];

const DNA = {
    'accordion': {
        layout: ["Stacked vertical panels", "Side-by-side split (trigger left, content right)", "Timeline-style with vertical connector line", "Nested accordion tree", "Horizontal accordion (panels expand sideways)"],
        surface: ["Glass card with backdrop-blur-xl and border-white/10", "Matte dark with noise-grain texture overlay", "Gradient-fill panels that shift hue on open", "Outlined wireframe with dashed borders", "Neumorphic soft-shadow inset panels"],
        motion: ["Spring-physics height expansion (stiffness: 200, damping: 20)", "Content fade-up with staggered children (0.05s delay each)", "Accordion trigger rotates chevron with overshoot spring", "Collapse with scale-Y origin-top compression", "Content slides in from the right on expand"],
        mood: ["Clinical dashboard — monospaced labels, tight spacing", "Playful — rounded-2xl, pastel accents, bouncy springs", "Luxurious — gold accent lines, serif headings, slow easing", "Brutal — sharp corners, high contrast, red/black", "Minimal zen — single-weight lines, massive whitespace"],
        composition: ["Standalone FAQ block", "Nested inside a settings panel", "Sidebar navigation with expanding sections", "Full-width feature explainer", "Card-contained with header and footer"],
        spawnRecipes: [
            "Glass Cascade — stacked frosted-glass panels on a dark gradient background. Each panel has a 1px animated border-gradient. On expand, content fades in with staggered children. Trigger has a rotating chevron with spring overshoot. Active panel glows with brand-color box-shadow.",
            "Timeline Accordion — vertical connector line on the left with circular nodes at each trigger. Expanding a node reveals content that slides in from the right. Nodes pulse with a subtle scale animation when hovered. Active node fills with brand color.",
            "Brutal Stack — high-contrast black/white panels with 3px solid borders. No border-radius. Content appears instantly with a glitch-stutter effect. Triggers use uppercase monospace text. Active panel inverts colors (white on black).",
            "Floating Cards — each accordion item is a separate elevated card with generous spacing. Cards lift (translateY -4px + shadow increase) on hover. Content expands with spring physics. Inactive cards dim to 60% opacity when one is active.",
        ],
    },
    'ai-chat': {
        layout: ["Classic message bubbles (alternating left/right)", "Terminal-style monospace log", "Card-based message blocks in a single column", "Split-screen (user left, AI right)", "Threaded conversation with indented replies"],
        surface: ["Frosted glass bubbles on dark void background", "Outlined message cards with gradient borders", "Solid matte bubbles with subtle inner shadows", "Holographic shimmer on AI messages", "Paper-texture with handwritten font feel"],
        motion: ["Messages slide-up with spring from bottom", "AI response types character-by-character (typewriter)", "Thinking indicator pulses with 3-dot bounce", "Message entrance with scale-from-zero pop", "Smooth scroll-to-bottom on new message with easing"],
        mood: ["Futuristic command center — neon accents, scan-lines", "Friendly assistant — rounded bubbles, warm colors, emoji", "Corporate professional — clean lines, brand colors only", "Cyberpunk terminal — green-on-black, matrix rain background", "Minimalist — whisper-thin borders, lots of breathing room"],
        composition: ["Full-page chat application", "Popover chat widget (bottom-right)", "Embedded in a dashboard panel", "Slide-out drawer from right edge", "Modal dialog overlay"],
        spawnRecipes: [
            "Void Terminal — dark (#0a0a0a) background with monospace font. Messages appear as terminal log entries with timestamp prefixes. AI responses type character-by-character with a blinking block cursor. Input area has a '>' prompt prefix with a pulsing green caret.",
            "Glass Messenger — frosted glass message bubbles floating on a gradient mesh background. User messages align right with brand-color tint, AI messages align left with white/10 tint. Each message pops in with scale spring. Typing indicator shows 3 glass dots bouncing in sequence.",
            "Neon Thread — messages stack in a single column with a glowing vertical line connecting them. Each message has a small avatar node on the line. AI messages have animated gradient borders. New messages slide up with a neon trail effect.",
            "Paper Chat — warm cream background (#faf8f5), messages in handwriting-style font on card-stock textured bubbles. Subtle paper fold shadow on each message. Messages fade-drift in from below. Input area styled as a torn-paper edge.",
        ],
    },
    'alert': {
        layout: ["Full-width banner bar", "Floating toast-style (top-right corner)", "Inline embedded in content flow", "Slide-down from top of viewport", "Centered modal alert with backdrop"],
        surface: ["Frosted glass with colored left border accent", "Solid fill with matching icon background circle", "Outlined with dashed border and subtle gradient", "Translucent overlay with blur background", "Dark card with neon-colored icon glow"],
        motion: ["Slide-down + fade entrance with spring", "Shake animation for error alerts", "Progress bar auto-dismiss countdown", "Collapse-out exit animation", "Pulse glow on critical severity"],
        mood: ["System diagnostic — monospace, technical codes", "Friendly notification — rounded, emoji icons, warm", "Enterprise — clean, corporate iconography", "Gaming UI — angular, neon borders, sound-effect ready", "Emergency — high contrast, large text, pulsing"],
        composition: ["Stacked alert queue (newest on top)", "Single persistent banner", "Inline form validation message", "Overlay blocking interaction", "Sidebar notification panel entry"],
        spawnRecipes: [
            "Neon Alert Bar — full-width bar with a 2px glowing bottom border in severity color (green/yellow/red). Icon pulses with glow. Text in medium-weight sans-serif. Dismiss button is an X that scales on hover. Auto-dismisses with an animated progress bar underneath.",
            "Glass Toast — floating rounded-2xl card at top-right with backdrop-blur-xl. Colored left border stripe (4px). Icon, title, and description. Slides in from right with spring, exits by collapsing height. Stacks with 8px gaps.",
            "Brutal Inline — no border-radius, 3px solid border in severity color. Full-width within content. Icon is a filled square. Uppercase label. Monospace text. Shakes horizontally twice on mount for errors.",
            "Floating Pill — small rounded-full pill that slides down from viewport top. Centered. Minimal text. Colored dot indicator instead of icon. Auto-dismiss with fade-up after 4 seconds.",
        ],
    },
    'announcement': {
        layout: ["Top-of-page sticky banner", "Floating pill badge centered", "Side rail notification strip", "Modal spotlight with backdrop", "Inline card between content sections"],
        surface: ["Gradient mesh background (brand colors)", "Frosted glass with animated border", "Solid dark with accent text highlights", "Confetti-particle background overlay", "Outlined card with shimmer sweep"],
        motion: ["Slide-down reveal with bounce", "Typewriter text reveal for headline", "Confetti particle burst on mount", "Pulse-glow highlight on CTA button", "Parallax scroll-away on user scroll"],
        mood: ["Celebration — confetti, warm colors, exclamation", "Urgent — red/orange, pulsing, bold text", "Subtle — minimal, muted, easy to dismiss", "Product launch — gradient, 3D mockup peek, hype", "Community — warm, avatar clusters, social proof"],
        composition: ["Dismissible top banner (remembers state)", "Overlay blocking page until acknowledged", "Inline section break announcement", "Floating badge that expands on click", "Full-bleed hero-style takeover"],
        spawnRecipes: [
            "Launch Banner — sticky top bar with animated gradient background (brand colors sweeping left-to-right). Bold headline with sparkle emoji. CTA button with magnetic hover effect. Dismiss X with fade-out + collapse animation. 40px height.",
            "Confetti Spotlight — centered modal card with confetti canvas particles bursting from center on mount. Glass card with celebration message, large emoji, and action button. Backdrop dims to 60%. Card springs in with scale.",
            "Subtle Pill — small rounded-full pill floating at top-center with 'NEW' badge. Slides down on mount. Expands to reveal full announcement on click. Gradient border animation. Dismisses by flying upward.",
            "Side Rail — thin vertical strip on the right edge of viewport. Rotated text reading upward. Expands to card on hover. Colored accent background. Click navigates to announcement detail.",
        ],
    },
    'avatar': {
        layout: ["Circular avatar with status dot", "Rounded-square avatar (iOS style)", "Stacked avatar group with overlap", "Avatar with text label inline", "Large avatar card with bio snippet"],
        surface: ["Gradient border ring around image", "Frosted glass container with glow", "Solid ring with brand-color accent", "Outlined with dashed animated border", "Neumorphic raised circle"],
        motion: ["Pop-in scale spring on mount", "Ring pulse animation for online status", "Hover lift with shadow expansion", "Stagger-in for avatar groups", "Image crossfade on src change"],
        mood: ["Professional — clean ring, initials fallback", "Gaming — hexagonal, neon border, rank badge", "Social — circular, story-ring gradient, online dot", "Corporate — square, subtle shadow, text label right", "Playful — irregular blob shape, bouncy hover"],
        composition: ["Comment author indicator", "Navigation bar user menu trigger", "Team member grid card", "Chat message sender", "Profile header hero element"],
        spawnRecipes: [
            "Story Ring — circular avatar with an animated conic-gradient border (Instagram-style). Ring rotates slowly. Online status dot (green) with pulse animation at bottom-right. Hover scales to 1.05 with shadow bloom. Fallback shows initials on gradient background.",
            "Hex Badge — hexagonal clip-path avatar with neon border glow. Small rank badge overlay at bottom. Hover triggers a brief holographic sheen sweep across the image. Group variant overlaps with -8px margin and z-index stacking.",
            "Glass Profile Card — large avatar (96px) centered in a frosted glass card. Name and role text below. Status dot on avatar. Card has subtle border-white/10. Avatar pops in with spring, text fades up staggered. Hover lifts entire card.",
            "Blob Avatar — irregular organic blob shape using SVG clipPath. Blob shape morphs subtly on loop (4 control points shifting). Solid color background with initials. Hover pauses the morph and settles to circle.",
        ],
    },
    'background': {
        layout: ["Full-viewport fixed background", "Section-contained gradient band", "Split diagonal (two-tone)", "Radial burst from center", "Layered parallax strips"],
        surface: ["Gradient mesh with 4+ color stops", "Noise grain texture (SVG feTurbulence)", "Dot matrix repeating pattern", "Animated shader (GLSL/Three.js)", "Blurred blob shapes floating"],
        motion: ["Gradient hue-rotate on slow loop (30s)", "Parallax scroll displacement", "Floating blob shapes drifting randomly", "Noise texture pulsing opacity", "Color stops shifting position on mousemove"],
        mood: ["Deep space void — near-black with distant star dots", "Aurora borealis — flowing green/purple/blue gradients", "Corporate clean — subtle light gray gradient", "Neon city — pink/cyan/purple gradient mesh", "Nature — warm earth tones, organic noise"],
        composition: ["Behind hero section", "Full-page application backdrop", "Card container background", "Section divider gradient band", "Overlay beneath modals"],
        spawnRecipes: [
            "Aurora Mesh — 4 large blurred circles (200-400px) in brand colors, absolutely positioned at different corners. Each circle drifts slowly on a random path using CSS keyframes (30-60s duration). Overlapping creates aurora-like color blending. Base is near-black (#050505).",
            "Dot Field — repeating-radial-gradient creating a uniform dot pattern (1px dots, 20px spacing) at 5% opacity on dark background. Dots subtly shift position on scroll (parallax). A gradient overlay fades dots to transparent at edges.",
            "Void Grain — pure black (#000) background with SVG noise filter overlay at 4% opacity. A single radial-gradient spotlight (brand-color at 3% opacity) follows cursor position with lerped delay. Creates a 'living darkness' effect.",
            "Shader Waves — React Three Fiber canvas with custom GLSL fragment shader. Sine-wave displacement of color bands. Colors shift based on time uniform. Renders behind content with pointer-events-none. Fallback: CSS gradient for SSR.",
        ],
    },
    'badge': {
        layout: ["Inline pill next to text", "Floating indicator on parent corner", "Stacked badge group", "Badge with icon prefix", "Badge with count number"],
        surface: ["Solid fill with high contrast text", "Outlined with colored border only", "Gradient fill (brand spectrum)", "Frosted glass with blur", "Glow-ring around solid badge"],
        motion: ["Pop-in scale on mount", "Bounce on count change", "Pulse for notifications", "Shimmer sweep on hover", "Shake for attention"],
        mood: ["Status indicator — green/yellow/red minimal", "Product tag — rounded-full, brand gradient", "Notification count — circular, red, bold number", "Achievement — gold/bronze, icon+text, premium", "Technical label — monospace, outlined, code-like"],
        composition: ["On avatar corner (notification count)", "Next to navigation item label", "Inside table cell for status", "On card header for category", "Inline with heading for 'NEW' marker"],
        spawnRecipes: [
            "Glow Status — small rounded-full pill (6px height) with solid fill. Active badges emit a box-shadow glow matching their color. Status dot variant is just 8px circle. Hover amplifies glow. 'New' variant has shimmer sweep animation.",
            "Glass Tag — frosted backdrop-blur-sm badge with border-white/10. Text in brand color. Slightly larger (28px height). Icon prefix option. Hover lifts with subtle shadow. Used for category labels.",
            "Pulse Counter — circular notification badge (20px) with bold count number. Solid red fill. Pulses scale between 1.0 and 1.1 on 2s loop. Bounces (spring) when count value changes. Positioned absolute at -4px top-right of parent.",
            "Achievement Medal — rounded-lg badge with gradient fill (gold-to-amber). Small icon left of text. Subtle inner shadow for depth. Sparkle particle occasionally floats up from surface. Premium feel.",
        ],
    },
    'border': {
        layout: ["Full-perimeter animated border", "Top-only accent line", "Left-side indicator bar", "Corner-only decorative marks", "Dashed animated outline"],
        surface: ["Animated conic-gradient border", "Gradient linear sweep border", "Glowing neon border with bloom", "Double-line railroad border", "Dotted animated marching ants"],
        motion: ["Conic-gradient rotation (continuous)", "Linear sweep left-to-right (loop)", "Glow pulse between two intensities", "Dash-offset animation (marching ants)", "Border draws itself on mount (SVG stroke)"],
        mood: ["Futuristic — neon glow, animated gradient", "Elegant — thin gold line, slow sweep", "Technical — dashed, monochrome, precise", "Playful — rainbow gradient, fast spin", "Minimal — single pixel, subtle opacity shift"],
        composition: ["Around cards to highlight selection", "Around images as decorative frame", "Around sections as divider", "Around buttons for emphasis", "Around inputs for focus state"],
        spawnRecipes: [
            "Shine Border — conic-gradient border that rotates continuously (14s loop). Uses pseudo-element with overflow:hidden and border-radius match. Gradient has one bright spot (brand color) sweeping around. Inner content has matching border-radius with solid background.",
            "Neon Frame — double-border effect: 1px solid brand-color inner, blurred 4px glow outer via box-shadow. Glow pulses between 0.3 and 0.6 opacity on 3s loop. Hover intensifies glow to full opacity. Works on any element via wrapper component.",
            "Draw-On Border — SVG rect overlay with stroke-dasharray matching perimeter. On mount, stroke-dashoffset animates from full to 0, creating a 'drawing' effect. 1s duration with ease-out. Stays solid after complete.",
            "Marching Ants — dashed border (4px dash, 4px gap) with stroke-dashoffset animating continuously. Creates a 'marching ants' selection effect. Subtle gray color. Used for drag targets and selection states.",
        ],
    },
};

// ─── Part 2: We'll continue adding remaining components ───
module.exports = { DNA, CHAOS_MODIFIERS_GLOBAL };

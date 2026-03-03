const fs = require('fs');
const path = require('path');

const RAW_DIR = path.join(__dirname, '..', 'resources', 'raw_prompts');
const COMP_DIR = path.join(__dirname, '..', 'components');

// ─── Load Generative DNA data from batch files ───
const { DNA: DNA_1, CHAOS_MODIFIERS_GLOBAL } = require('./generative-dna.js');
const { DNA_2 } = require('./generative-dna-2.js');
const { DNA_3 } = require('./generative-dna-3.js');
const { DNA_4 } = require('./generative-dna-4.js');
const { DNA_5 } = require('./generative-dna-5.js');
const { DNA_6 } = require('./generative-dna-6.js');
const { DNA_7 } = require('./generative-dna-7.js');
const { PAGE_CONTEXT, FALLBACK_TECHNIQUES, FALLBACK_DEPS } = require('./component-context.js');

// Merge all DNA batches into a single lookup
const GENERATIVE_DNA = Object.assign({}, DNA_1, DNA_2, DNA_3, DNA_4, DNA_5, DNA_6, DNA_7);

// ─── Component name mapping from components.txt ───
const COMPONENT_MAP = {
    'accordion': { name: 'Accordions', count: 40 },
    'ai-chat': { name: 'AI Chats', count: 30 },
    'alert': { name: 'Alerts', count: 23 },
    'announcement': { name: 'Announcements', count: 10 },
    'avatar': { name: 'Avatars', count: 17 },
    'background': { name: 'Backgrounds', count: 33 },
    'badge': { name: 'Badges', count: 25 },
    'border': { name: 'Borders', count: 12 },
    'button': { name: 'Buttons', count: 130 },
    'calendar': { name: 'Calendars', count: 34 },
    'call-to-action': { name: 'Calls to Action', count: 34 },
    'card': { name: 'Cards', count: 79 },
    'carousel': { name: 'Carousels', count: 16 },
    'checkbox': { name: 'Checkboxes', count: 19 },
    'client': { name: 'Clients', count: 16 },
    'comparison': { name: 'Comparisons', count: 6 },
    'date-picker': { name: 'Date Pickers', count: 12 },
    'dialog': { name: 'Dialogs / Modals', count: 37 },
    'dock': { name: 'Docks', count: 6 },
    'dropdown': { name: 'Dropdowns', count: 25 },
    'empty-state': { name: 'Empty States', count: 1 },
    'feature': { name: 'Features', count: 36 },
    'file-tree': { name: 'File Trees', count: 2 },
    'file-upload': { name: 'File Uploads', count: 7 },
    'footer': { name: 'Footers', count: 14 },
    'form': { name: 'Forms', count: 23 },
    'hero': { name: 'Heroes', count: 73 },
    'hook': { name: 'Hooks', count: 31 },
    'icon': { name: 'Icons', count: 10 },
    'image': { name: 'Images', count: 26 },
    'input': { name: 'Inputs', count: 102 },
    'link': { name: 'Links', count: 13 },
    'map': { name: 'Maps', count: 2 },
    'menu': { name: 'Menus', count: 18 },
    'navigation-menu': { name: 'Navigation Menus', count: 11 },
    'notification': { name: 'Notifications', count: 5 },
    'number': { name: 'Numbers', count: 18 },
    'pagination': { name: 'Paginations', count: 20 },
    'popover': { name: 'Popovers', count: 23 },
    'pricing-section': { name: 'Pricing Sections', count: 17 },
    'radio-group': { name: 'Radio Groups', count: 22 },
    'scroll-area': { name: 'Scroll Areas', count: 24 },
    'select': { name: 'Selects', count: 62 },
    'shader': { name: 'Shaders', count: 15 },
    'sidebar': { name: 'Sidebars', count: 10 },
    'sign-in': { name: 'Sign Ins', count: 4 },
    'sign-up': { name: 'Sign Ups', count: 4 },
    'slider': { name: 'Sliders', count: 45 },
    'spinner-loader': { name: 'Spinner Loaders', count: 21 },
    'table': { name: 'Tables', count: 30 },
    'tab': { name: 'Tabs', count: 38 },
    'tag': { name: 'Tags', count: 6 },
    'testimonial': { name: 'Testimonials', count: 15 },
    'text': { name: 'Texts', count: 58 },
    'text-area': { name: 'Text Areas', count: 22 },
    'toast': { name: 'Toasts', count: 2 },
    'toggle': { name: 'Toggles', count: 12 },
    'tooltip': { name: 'Tooltips', count: 28 },
    'video': { name: 'Videos', count: 9 },
};

// ─── File name mapping (component slug -> .md filename) ───
const FILENAME_MAP = {
    'accordion': 'accordions.md',
    'ai-chat': 'ai-chats.md',
    'alert': 'alerts.md',
    'announcement': 'announcements.md',
    'avatar': 'avatars.md',
    'background': 'backgrounds.md',
    'badge': 'badges.md',
    'border': 'borders.md',
    'button': 'buttons.md',
    'calendar': 'calendars.md',
    'call-to-action': 'calls-to-action.md',
    'card': 'cards.md',
    'carousel': 'carousels.md',
    'checkbox': 'checkboxes.md',
    'client': 'clients.md',
    'comparison': 'comparisons.md',
    'date-picker': 'date-pickers.md',
    'dialog': 'dialogs--modals.md',
    'dock': 'docks.md',
    'dropdown': 'dropdowns.md',
    'empty-state': 'empty-states.md',
    'feature': 'features.md',
    'file-tree': 'file-trees.md',
    'file-upload': 'file-uploads.md',
    'footer': 'footers.md',
    'form': 'forms.md',
    'hero': 'heroes.md',
    'hook': 'hooks.md',
    'icon': 'icons.md',
    'image': 'images.md',
    'input': 'inputs.md',
    'link': 'links.md',
    'map': 'maps.md',
    'menu': 'menus.md',
    'navigation-menu': 'navigation-menus.md',
    'notification': 'notifications.md',
    'number': 'numbers.md',
    'pagination': 'paginations.md',
    'popover': 'popovers.md',
    'pricing-section': 'pricing-sections.md',
    'radio-group': 'radio-groups.md',
    'scroll-area': 'scroll-areas.md',
    'select': 'selects.md',
    'shader': 'shaders.md',
    'sidebar': 'sidebars.md',
    'sign-in': 'sign-ins.md',
    'sign-up': 'sign-ups.md',
    'slider': 'sliders.md',
    'spinner-loader': 'spinner-loaders.md',
    'table': 'tables.md',
    'tab': 'tabs.md',
    'tag': 'tags.md',
    'testimonial': 'testimonials.md',
    'text': 'texts.md',
    'text-area': 'text-areas.md',
    'toast': 'toasts.md',
    'toggle': 'toggles.md',
    'tooltip': 'tooltips.md',
    'video': 'videos.md',
};

// ─── Analysis functions ───

function extractFileNames(prompt) {
    const matches = prompt.match(/[\w-]+\.tsx/g) || [];
    return [...new Set(matches)];
}

function extractDependencies(prompt) {
    const allDeps = new Set();

    // Method 1: Extract from "Install NPM dependencies" blocks
    const npmMatch = prompt.match(/Install NPM dependencies:\s*```(?:bash)?\s*([\s\S]*?)```/i);
    if (npmMatch) {
        const raw = npmMatch[1].trim();
        // Split on commas, spaces, and newlines; handle "npm install" prefix
        const cleaned = raw.replace(/npm\s+install\s*/gi, '').replace(/npx\s+/gi, '');
        cleaned.split(/[\s,]+/).forEach(pkg => {
            pkg = pkg.trim();
            if (pkg && pkg.length > 1 && !pkg.startsWith('-') && !pkg.startsWith('@/')) {
                allDeps.add(pkg);
            }
        });
    }

    // Method 2: Extract from import statements
    const imports = prompt.match(/from\s+['"]([^'"./][^'"]*)['"]/g) || [];
    imports.forEach(m => {
        const match = m.match(/from\s+['"]([@\w/-]+)/);
        if (match) {
            const pkg = match[1].split('/').slice(0, match[1].startsWith('@') ? 2 : 1).join('/');
            if (pkg && !pkg.startsWith('@/') && pkg !== 'react' && pkg !== 'react-dom' && pkg !== 'next') {
                allDeps.add(pkg);
            }
        }
    });

    return [...allDeps];
}

function extractComponentNames(prompt) {
    const exportMatches = prompt.match(/export\s+(?:default\s+)?(?:function|const|class)\s+(\w+)/g) || [];
    return exportMatches.map(m => {
        const match = m.match(/(?:function|const|class)\s+(\w+)/);
        return match ? match[1] : null;
    }).filter(Boolean);
}

function extractTechniques(prompt) {
    const techniques = new Set();
    if (prompt.includes('framer-motion') || prompt.includes('motion.')) techniques.add('Framer Motion animations');
    if (prompt.includes('cva(') || prompt.includes('class-variance-authority')) techniques.add('CVA (class-variance-authority) variants');
    if (prompt.includes('cn(')) techniques.add('cn() utility (clsx + tailwind-merge)');
    if (prompt.includes('@radix-ui')) techniques.add('Radix UI primitives');
    if (prompt.includes('lucide-react')) techniques.add('Lucide React icons');
    if (prompt.includes('useRef')) techniques.add('React refs');
    if (prompt.includes('useState')) techniques.add('React state management');
    if (prompt.includes('useEffect')) techniques.add('React effects');
    if (prompt.includes('forwardRef')) techniques.add('React.forwardRef pattern');
    if (prompt.includes('useCallback')) techniques.add('React useCallback optimization');
    if (prompt.includes('useMemo')) techniques.add('React useMemo optimization');
    if (prompt.includes('AnimatePresence')) techniques.add('AnimatePresence exit animations');
    if (prompt.includes('useMotionValue')) techniques.add('Framer Motion useMotionValue');
    if (prompt.includes('useTransform')) techniques.add('Framer Motion useTransform');
    if (prompt.includes('useSpring')) techniques.add('Framer Motion spring physics');
    if (prompt.includes('useInView')) techniques.add('Intersection Observer / useInView');
    if (prompt.includes('backdrop-blur') || prompt.includes('backdrop_blur')) techniques.add('Glassmorphism / backdrop blur');
    if (prompt.includes('gradient')) techniques.add('CSS gradients');
    if (prompt.includes('keyframes') || prompt.includes('@keyframes')) techniques.add('CSS keyframe animations');
    if (prompt.includes('tailwindcss-animate') || prompt.includes('tw-animate')) techniques.add('Tailwind CSS Animate plugin');
    if (prompt.includes('embla-carousel')) techniques.add('Embla Carousel');
    if (prompt.includes('react-hook-form')) techniques.add('React Hook Form');
    if (prompt.includes('zod')) techniques.add('Zod schema validation');
    if (prompt.includes('date-fns')) techniques.add('date-fns date utilities');
    if (prompt.includes('react-day-picker')) techniques.add('React Day Picker');
    if (prompt.includes('recharts') || prompt.includes('chart')) techniques.add('Recharts / charting');
    if (prompt.includes('three') || prompt.includes('Three.js') || prompt.includes('@react-three')) techniques.add('Three.js / React Three Fiber');
    if (prompt.includes('GLSL') || prompt.includes('glsl') || prompt.includes('shader')) techniques.add('GLSL shaders');
    if (prompt.includes('gsap') || prompt.includes('GSAP')) techniques.add('GSAP animation library');
    if (prompt.includes('lottie')) techniques.add('Lottie animations');
    if (prompt.includes('aria-') || prompt.includes('role=')) techniques.add('ARIA accessibility attributes');
    if (prompt.includes('cmdk') || prompt.includes('command')) techniques.add('cmdk command palette');
    if (prompt.includes('sonner')) techniques.add('Sonner toast library');
    if (prompt.includes('vaul')) techniques.add('Vaul drawer component');
    if (prompt.includes('next/image') || prompt.includes('next/Image')) techniques.add('Next.js Image optimization');
    if (prompt.includes('next/link')) techniques.add('Next.js Link routing');
    if (prompt.includes('resizable')) techniques.add('Resizable panels');
    if (prompt.includes('dnd') || prompt.includes('drag')) techniques.add('Drag and drop');
    if (prompt.includes('intersection') || prompt.includes('IntersectionObserver')) techniques.add('Intersection Observer API');
    if (prompt.includes('ResizeObserver')) techniques.add('ResizeObserver API');
    if (prompt.includes('canvas')) techniques.add('HTML Canvas rendering');
    return [...techniques];
}

function extractCodeSnippets(prompt, maxSnippets = 3) {
    const codeBlocks = prompt.match(/```tsx?\s*([\s\S]*?)```/g) || [];
    const snippets = [];
    for (const block of codeBlocks) {
        const code = block.replace(/```tsx?\s*/, '').replace(/```$/, '').trim();
        // Extract the most interesting parts - component declarations, hooks, unique patterns
        const lines = code.split('\n');
        if (lines.length > 5 && lines.length < 150) {
            // Find the main export or component function
            const exportLine = lines.findIndex(l => l.includes('export') || l.match(/^(const|function)\s+\w+/));
            if (exportLine >= 0) {
                const snippet = lines.slice(Math.max(0, exportLine - 2), Math.min(lines.length, exportLine + 25)).join('\n');
                if (snippet.length > 50 && snippet.length < 2000) {
                    snippets.push(snippet);
                }
            }
        }
        if (snippets.length >= maxSnippets) break;
    }
    return snippets;
}

function extractVariantNames(prompt) {
    const variants = new Set();
    // Look for cva variant definitions
    const variantMatches = prompt.match(/variant:\s*\{([^}]+)\}/g) || [];
    for (const vm of variantMatches) {
        const names = vm.match(/(\w+):\s*['"]/g) || [];
        names.forEach(n => {
            const name = n.match(/(\w+):/)[1];
            if (!['variant', 'size', 'className'].includes(name)) {
                variants.add(name);
            }
        });
    }
    // Look for size variants
    const sizeMatches = prompt.match(/size:\s*\{([^}]+)\}/g) || [];
    for (const sm of sizeMatches) {
        const names = sm.match(/(\w+):\s*['"]/g) || [];
        names.forEach(n => {
            const name = n.match(/(\w+):/)[1];
            if (name !== 'size') variants.add(name + ' (size)');
        });
    }
    return [...variants];
}

function extractPropNames(prompt) {
    const props = new Set();
    const interfaceMatch = prompt.match(/interface\s+\w+Props[^{]*\{([^}]+)\}/g) || [];
    for (const im of interfaceMatch) {
        const propNames = im.match(/(\w+)\??:/g) || [];
        propNames.forEach(p => {
            const name = p.replace('?:', '').replace(':', '');
            if (!['children', 'className', 'style', 'key', 'ref'].includes(name)) {
                props.add(name);
            }
        });
    }
    return [...props];
}

// ─── Skill file generator ───

function generateSkillFile(slug, componentInfo, prompts) {
    const name = componentInfo.name;
    const expectedCount = componentInfo.count;
    const promptCount = prompts.length;

    // Aggregate analysis across all prompts
    const allTechniques = new Set();
    const allDeps = new Set();
    const allFileNames = new Set();
    const allVariants = new Set();
    const allProps = new Set();
    const allComponentNames = new Set();
    const bestSnippets = [];

    for (const p of prompts) {
        const text = p.prompt || '';
        extractTechniques(text).forEach(t => allTechniques.add(t));
        extractDependencies(text).forEach(d => allDeps.add(d));
        extractFileNames(text).forEach(f => allFileNames.add(f));
        extractVariantNames(text).forEach(v => allVariants.add(v));
        extractPropNames(text).forEach(pr => allProps.add(pr));
        extractComponentNames(text).forEach(c => allComponentNames.add(c));
        if (bestSnippets.length < 3) {
            const snippets = extractCodeSnippets(text, 1);
            if (snippets.length > 0) bestSnippets.push(snippets[0]);
        }
    }

    // Determine priority
    let priority = 'HIGH';
    if (expectedCount >= 50) priority = 'CRITICAL';
    else if (expectedCount >= 30) priority = 'EXTRA_HIGH';
    else if (expectedCount <= 5) priority = 'STANDARD';

    // Generate the skill file content
    let md = `# 21st.dev Component Skill: ${name}\n\n`;
    md += `> **Priority:** ${priority}\n`;
    md += `> **Category:** 21st.dev Design System Archive\n`;
    md += `> **Total Variants on 21st.dev:** ${expectedCount}+\n`;
    md += `> **Training Data:** ${promptCount} production-grade component prompts analyzed\n`;
    md += `> **Purpose:** Generate award-winning, production-ready ${name} components with unique designs every time.\n\n`;
    md += `---\n\n`;

    // Section 1: Core Techniques — use fallbacks for skeletal components
    md += `## 1. Core Techniques\n\n`;
    let techArray = [...allTechniques].sort();
    if (techArray.length === 0 && FALLBACK_TECHNIQUES[slug]) {
        techArray = FALLBACK_TECHNIQUES[slug];
        md += `The following techniques are essential for premium ${name} implementations:\n\n`;
    } else if (techArray.length > 0) {
        md += `The following techniques were found across the ${promptCount} analyzed ${name} implementations:\n\n`;
    } else {
        techArray = ['Framer Motion animations', 'cn() utility (clsx + tailwind-merge)', 'CVA (class-variance-authority) variants', 'Tailwind CSS styling', 'TypeScript strict mode', 'React.forwardRef pattern', 'ARIA accessibility attributes'];
        md += `Essential techniques for premium ${name} components:\n\n`;
    }
    techArray.forEach(t => { md += `- **${t}**\n`; });
    md += `\n`;

    // Section 2: Common Dependencies — use fallbacks for skeletal components
    md += `## 2. Dependencies & Libraries\n\n`;
    let depArray = [...allDeps].filter(d => d && d.length > 1).sort();
    if (depArray.length === 0 && FALLBACK_DEPS[slug]) {
        depArray = FALLBACK_DEPS[slug];
    } else if (depArray.length === 0) {
        depArray = ['class-variance-authority', 'clsx', 'tailwind-merge', 'framer-motion', 'lucide-react'];
    }
    md += `Install commonly needed packages:\n`;
    md += '```bash\n';
    md += `npm install ${depArray.join(' ')}\n`;
    md += '```\n\n';
    md += `| Dependency | Purpose |\n|---|---|\n`;
    const depPurpose = (d) => {
        if (d.includes('radix')) return 'Headless accessible primitives';
        if (d.includes('framer-motion') || d === 'motion') return 'Physics-based animations';
        if (d.includes('class-variance-authority') || d === 'cva') return 'Variant management';
        if (d.includes('clsx') || d.includes('tailwind-merge')) return 'Class composition';
        if (d.includes('lucide')) return 'SVG icon library';
        if (d.includes('embla')) return 'Carousel engine';
        if (d.includes('date-fns')) return 'Date formatting';
        if (d.includes('react-hook-form') || d.includes('hookform')) return 'Form state management';
        if (d.includes('zod')) return 'Schema validation';
        if (d.includes('recharts')) return 'Data visualization';
        if (d.includes('sonner')) return 'Toast notifications';
        if (d.includes('vaul')) return 'Drawer/sheet component';
        if (d.includes('cmdk')) return 'Command palette';
        if (d.includes('three') || d.includes('@react-three')) return '3D rendering';
        if (d.includes('gsap')) return 'Professional animation';
        if (d.includes('next')) return 'Next.js framework feature';
        if (d.includes('dropzone')) return 'Drag-and-drop file handling';
        return 'Utility';
    };
    depArray.forEach(d => { md += `| \`${d}\` | ${depPurpose(d)} |\n`; });
    md += `\n`;

    // Section 3: Component Archetypes (from real file names)
    md += `## 3. Real Component Archetypes\n\n`;
    md += `These are actual component implementations found in the 21st.dev registry:\n\n`;
    const fileArray = [...allFileNames].filter(f => f.endsWith('.tsx')).sort();
    if (fileArray.length > 0) {
        const displayFiles = fileArray.slice(0, 20);
        displayFiles.forEach(f => {
            md += `- \`${f}\`\n`;
        });
        if (fileArray.length > 20) {
            md += `- ...and ${fileArray.length - 20} more variants\n`;
        }
    }
    md += `\n`;

    // Section 4: Common Props & Variants
    if (allVariants.size > 0 || allProps.size > 0) {
        md += `## 4. Props & Variant Patterns\n\n`;
        if (allVariants.size > 0) {
            md += `### CVA Variant Names Found\n`;
            [...allVariants].sort().forEach(v => { md += `- \`${v}\`\n`; });
            md += `\n`;
        }
        if (allProps.size > 0) {
            md += `### Custom Props Found\n`;
            [...allProps].sort().slice(0, 20).forEach(p => { md += `- \`${p}\`\n`; });
            md += `\n`;
        }
    }

    // Section 5: Code Examples (real snippets)
    if (bestSnippets.length > 0) {
        md += `## 5. Code Patterns (From Real Implementations)\n\n`;
        bestSnippets.forEach((snippet, i) => {
            md += `### Pattern ${i + 1}\n`;
            md += '```tsx\n';
            md += snippet + '\n';
            md += '```\n\n';
        });
    }

    // Section 6: Integration Guidelines
    md += `## 6. Integration Workflow\n\n`;
    md += `1. Create the component file in \`/components/ui/${slug}.tsx\`\n`;
    md += `2. Install required dependencies: \`${depArray.slice(0, 3).join(', ') || 'class-variance-authority'}\`\n`;
    md += `3. Ensure \`cn()\` utility exists at \`@/lib/utils\`\n`;
    md += `4. Use \`cva()\` for variant management when the component has multiple visual states\n`;
    md += `5. Wrap with \`React.forwardRef\` for composability with form libraries\n`;
    md += `6. Add \`displayName\` for DevTools debugging\n`;
    md += `7. Export both the component and any variant helper (e.g., \`${slug}Variants\`)\n\n`;

    // Section 7: Anti-Patterns
    md += `## 7. Anti-Patterns\n\n`;
    md += `- **[ANTI-PATTERN]** Using inline styles instead of Tailwind utility classes\n`;
    md += `- **[ANTI-PATTERN]** Hardcoding colors — always use CSS custom properties or Tailwind theme tokens\n`;
    md += `- **[ANTI-PATTERN]** Missing keyboard navigation — all interactive ${name} must be keyboard-accessible\n`;
    md += `- **[ANTI-PATTERN]** No \`focus-visible\` ring — always provide visible focus indicators\n`;
    md += `- **[ANTI-PATTERN]** Omitting \`aria-*\` attributes on interactive elements\n`;
    md += `- **[ANTI-PATTERN]** Using \`px\` units for responsive dimensions — prefer \`rem\`, \`%\`, or Tailwind spacing\n`;
    if (allTechniques.has('Framer Motion animations')) {
        md += `- **[ANTI-PATTERN]** Instant state changes without transitions — use \`framer-motion\` springs\n`;
    }
    md += `\n`;

    // Section 8: Design Philosophy
    md += `## 8. Design Philosophy\n\n`;
    md += `When generating ${name} components:\n\n`;
    md += `1. **Never repeat a design** — with ${expectedCount}+ archetypes available, each generation should be unique\n`;
    md += `2. **Layer composition** — combine background effects, surface treatments, and interaction layers\n`;
    md += `3. **Micro-interactions** — hover states, focus rings, active scales, entrance animations\n`;
    md += `4. **Dark mode first** — design for dark backgrounds, add light mode as enhancement\n`;
    md += `5. **Production-ready** — TypeScript strict, accessible, responsive, performant\n\n`;

    // ═══ NEW: Section 9: Generative DNA ═══
    const dna = GENERATIVE_DNA[slug];
    if (dna) {
        md += `---\n\n`;
        md += `## 9. 🧬 Generative DNA — Randomization Matrix\n\n`;
        md += `> **How to use:** When generating a ${name} component, pick ONE option from EACH axis below to create a unique combination. Never use the same combination twice.\n\n`;

        const axes = [
            { key: 'layout', label: 'Layout Axis', emoji: '📐' },
            { key: 'surface', label: 'Surface Axis', emoji: '🎨' },
            { key: 'motion', label: 'Motion Axis', emoji: '⚡' },
            { key: 'mood', label: 'Mood Axis', emoji: '🎭' },
            { key: 'composition', label: 'Composition Axis', emoji: '🧩' },
        ];

        for (const axis of axes) {
            if (dna[axis.key] && dna[axis.key].length > 0) {
                md += `### ${axis.emoji} ${axis.label}\n`;
                dna[axis.key].forEach((item, i) => {
                    md += `${i + 1}. ${item}\n`;
                });
                md += `\n`;
            }
        }

        // Section 10: Spawn Recipes
        if (dna.spawnRecipes && dna.spawnRecipes.length > 0) {
            md += `## 10. 🎲 Spawn Recipes — Ready-to-Build Blueprints\n\n`;
            md += `> Each recipe is a complete design brief. Pick one as a starting point, then apply Chaos Modifiers (Section 11) to make it unique.\n\n`;
            dna.spawnRecipes.forEach((recipe, i) => {
                const [title, ...descParts] = recipe.split(' — ');
                const desc = descParts.join(' — ');
                md += `### Recipe ${i + 1}: ${title}\n`;
                md += `${desc}\n\n`;
            });
        }

        // Section 11: Reference to Chaos Modifiers (no longer duplicated)
        md += `## 11. 🌀 Chaos Modifiers\n\n`;
        md += `> Stack 1-3 Chaos Modifiers from the **master SKILL.md** to add unique character. See the full list of 15 modifiers with CSS/JS implementation details there.\n\n`;
    }

    // NEW Section 12: When to Use (page context)
    const ctx = PAGE_CONTEXT[slug];
    if (ctx) {
        md += `---\n\n`;
        md += `## 12. 📍 When to Use — Page Context\n\n`;
        md += `This component appears in these page types:\n\n`;
        ctx.pages.forEach(p => { md += `- **${p}**\n`; });
        md += `\n`;

        // NEW Section 13: Composes With
        md += `## 13. 🔗 Composes With\n\n`;
        md += `Load these companion blueprints when building with ${name}:\n\n`;
        ctx.composesWith.forEach(c => {
            // Try both the raw slug and singularized version
            let slug2 = c;
            if (!FILENAME_MAP[slug2]) {
                // Try removing trailing 's' or 'es'
                if (slug2.endsWith('es') && FILENAME_MAP[slug2.slice(0, -2)]) slug2 = slug2.slice(0, -2);
                else if (slug2.endsWith('s') && FILENAME_MAP[slug2.slice(0, -1)]) slug2 = slug2.slice(0, -1);
            }
            const compInfo = COMPONENT_MAP[slug2];
            const filename = FILENAME_MAP[slug2];
            if (filename) {
                md += `- \`components/${filename}\` — ${compInfo ? compInfo.name : c}\n`;
            }
        });
        md += `\n`;
    }

    return md;
}

// ─── Main execution ───

function main() {
    console.log('=== 21st.dev Skill File Generator ===\n');

    // Read all raw prompt data
    const rawFiles = fs.readdirSync(RAW_DIR).filter(f => f.endsWith('.json'));
    console.log(`Found ${rawFiles.length} raw prompt files\n`);

    let totalGenerated = 0;
    let totalPrompts = 0;

    // Process each component in COMPONENT_MAP
    for (const [slug, info] of Object.entries(COMPONENT_MAP)) {
        const rawFile = path.join(RAW_DIR, slug + '.json');
        let prompts = [];

        if (fs.existsSync(rawFile)) {
            const data = JSON.parse(fs.readFileSync(rawFile, 'utf8'));
            prompts = (data.prompts || []).filter(p => p.prompt && !p.error);
        }

        const filename = FILENAME_MAP[slug];
        if (!filename) {
            console.log(`[SKIP] No filename mapping for ${slug}`);
            continue;
        }

        const outPath = path.join(COMP_DIR, filename);
        const skillContent = generateSkillFile(slug, info, prompts);
        fs.writeFileSync(outPath, skillContent, 'utf8');
        totalGenerated++;
        totalPrompts += prompts.length;
        console.log(`[OK] ${filename.padEnd(25)} ${prompts.length} prompts -> ${skillContent.length} bytes`);
    }

    console.log(`\n=== DONE ===`);
    console.log(`Generated: ${totalGenerated} skill files`);
    console.log(`Training data: ${totalPrompts} prompts used`);
    console.log(`Output: ${COMP_DIR}`);
}

main();

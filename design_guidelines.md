# Pixel Art Drawing Application Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from classic pixel art editors like MS Paint and Aseprite, combined with retro gaming aesthetics. This utility-focused application prioritizes functionality while maintaining strong visual identity through retro gaming design elements.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Primary: #FF6B35 (retro orange) - main action buttons, active tools
- Secondary: #004E89 (deep blue) - secondary buttons, borders
- Background: #1A1A2E (dark navy) - main application background
- Grid: #16213E (darker blue) - pixel grid lines and containers
- UI Elements: #0F3460 (midnight blue) - panels, toolbars, menus
- Accent: #E94560 (neon pink) - highlights, selected states, notifications

**8-Bit Drawing Palette:**
- Classic retro colors: bright red, green, blue, yellow, magenta, cyan
- Grayscale range from pure white to pure black
- Limited palette of 16-32 colors for authentic pixel art feel

### B. Typography
**Primary Font**: Press Start 2P (Google Fonts) - main UI labels, buttons
**Secondary Font**: VT323 (Google Fonts) - body text, descriptions
**Accent Font**: Orbitron (Google Fonts) - headings, tool names

**Font Hierarchy:**
- Tool labels: Press Start 2P, 12px
- Button text: Press Start 2P, 10px
- Body text: VT323, 16px
- Headings: Orbitron, 18px, semi-bold

### C. Layout System
**Spacing Units**: Tailwind units of 1, 2, 4, 6, 8 (p-1, m-2, h-4, w-6, gap-8)
- Tight spacing for pixel-perfect alignment
- Consistent 8px base grid system
- Compact layout maximizing canvas space

**Grid Structure:**
- Left sidebar: 200px width for tools
- Main canvas: flexible center area
- Right panel: 180px for color picker and options

### D. Component Library

**Core UI Elements:**
- **Buttons**: Pixelated style with sharp edges, 2px borders, no border-radius
- **Grid Canvas**: Centered, scalable pixel grid with hover states
- **Color Picker**: Compact palette grid with selected state indicators
- **Tool Panels**: Bordered containers with retro gaming styling

**Navigation:**
- Fixed toolbar with pixel art tool icons
- Tool selection with active state highlighting
- Grid size selector with preset options (16x16, 32x32, 64x64)

**Forms:**
- Input fields with retro styling and sharp borders
- Dropdown menus with pixel art aesthetics
- Export options panel with file format selection

**Data Displays:**
- Canvas grid with individual pixel squares
- Color preview swatches
- Tool status indicators

**Overlays:**
- Export modal with retro gaming border styling
- Confirmation dialogs with pixelated design
- Loading states with scan-line effects

### E. Visual Effects
**Retro Gaming Elements:**
- Subtle scan-line overlay effects on panels
- Pixelated borders and sharp edges throughout
- High contrast design with bold color separation
- CRT monitor-inspired glow effects on active elements

**Interactive States:**
- Pixel hover effects on grid squares
- Tool button press animations (brief scale down)
- Color selection with neon pink highlight borders
- Grid square fill animations

**Performance Considerations:**
- Minimal animations to maintain pixel-perfect rendering
- CSS transforms for smooth grid interactions
- Efficient canvas rendering for large pixel grids

## Key Design Principles
1. **Pixel Perfect**: All elements align to sharp pixel boundaries
2. **High Contrast**: Bold color separation for retro gaming feel
3. **Functional Priority**: Tool accessibility over decorative elements
4. **Authentic Retro**: Genuine 8-bit aesthetic without modern flourishes
5. **Responsive Grid**: Canvas scales appropriately across devices while maintaining pixel integrity
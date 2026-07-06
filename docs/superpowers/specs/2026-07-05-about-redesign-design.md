# Design Specification: About Section Redesign

Redesigning the "About" section of the portfolio website to remove the old photo/telemetry animation column, replacing it with a clean, high-end neobrutalist bento grid containing bio content, location telemetry, and a live weather widget.

## User Review Required
* **Approved Layout**: A top full-width About card, and a bottom 3-column row containing the location & weather card, an empty space slot (invisible/no card border), and the CV download button.
* **Aesthetic**: Neobrutalist design language matching the existing app (thick `3px solid #1a1a1a` borders, flat `5px` shadows, Space Grotesk/IBM Plex Mono fonts).
* **Live Weather Integration**: Client-side fetch to the free Open-Meteo API to fetch New Delhi's temperature and conditions dynamically. Emojis are banned; weather conditions will be mapped to clean, minimalist custom SVG icons.

## Proposed Changes

### [Component] [About.tsx](file:///d:/portfolio-2/components/About.tsx)

We will modify the component structure to implement:
1. A single unified top card with `border-left: 6px solid #FFE135` containing the two bio paragraphs.
2. A bottom 3-column grid row:
   * **Location & Weather Card (Column 1)**: Shows `New Delhi, India` with a pulsing green status dot (`app-pulse-dot`) next to the text. It contains a dashed line divider and a client-side weather status panel showing temperature, condition, and a clean custom SVG icon.
   * **Empty Space Card (Column 2)**: An empty container that preserves the grid layout but has no borders, shadows, or background content.
   * **CV Card (Column 3)**: A black neobrutalist button linking to the CV file.
3. Remove all carousel sliders, next/prev arrow buttons, and the telemetry CRT canvas simulator.

## Verification Plan

### Manual Verification
* Deploy the updated `About.tsx` page to the dev server on port `3000`.
* Confirm that:
  1. The layout is clean and responsive on mobile and desktop.
  2. The weather fetches live and displays current New Delhi conditions using clean SVGs (no emojis).
  3. Clicking the CV button opens the target link.
  4. The second column in the bottom row is completely blank but reserves spacing.

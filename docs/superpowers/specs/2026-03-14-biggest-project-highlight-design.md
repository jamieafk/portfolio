# Biggest Project Highlight — Design Spec

## Overview

Add a "Biggest Project" highlight to the portfolio that visually distinguishes one project (Asoona) as the most significant. The highlighted project gets an oversized card in the grid with a distinctive frame treatment.

## Data

Add a `featured` boolean flag to `projects.json`. Only one project should have `featured: true` at a time.

```json
{
  "slug": "asoona",
  "featured": true,
  ...
}
```

The JS uses this flag to apply different rendering. No other data changes.

## Layout

The featured card spans the full width of the 2-column grid (using `grid-column: 1 / -1`). Internally it uses a horizontal side-by-side layout:

- **Left**: Screenshot image (same 16:10 aspect ratio, `flex: 1.5`)
- **Right**: Text content area — title, excerpt (`flex: 1`)

The remaining projects render in the normal 2-column grid below, starting from the next project in order.

## Frame Treatment

Three visual elements distinguish the featured card:

1. **Top gradient bar**: A 3px-tall `div` at the top of the card. Gradient goes left-to-right: solid `--accent` → transparent (`rgba(196,120,74,0.2)`).

2. **Corner label**: Positioned absolute, top-right, directly below the gradient bar. Translucent accent background (`rgba(196,120,74,0.12)`), accent-colored text, uppercase, small font. Text: "Biggest Project". Bottom-left border radius for the tab shape.

3. **Normal border**: The card keeps the standard `1px solid var(--border)` — no accent border, no glow.

## Mobile (≤720px)

The featured card collapses to single-column like all other cards:

- `grid-column: auto` (no spanning)
- Side-by-side layout switches to stacked (screenshot on top, text below) — same as a normal card
- Top gradient bar and corner label are preserved

## Interaction

Clicking the featured card opens the same detail overlay as any other card. No special overlay behavior.

## CSS Classes

- `.card--featured` — grid span, flex layout, side-by-side arrangement
- `.card--featured::before` or a child div — the top gradient bar
- `.card--featured-label` — the corner label element

## JS Changes

In `script.js`, the `createCard` function checks `project.featured`:
- If true, adds `card--featured` class and inserts the gradient bar div and label div
- The card uses a side-by-side layout (image + text body side by side) instead of stacked

## Files Modified

- `data/projects.json` — add `featured: true` to Asoona
- `styles.css` — add `.card--featured`, `.card--featured-label`, and responsive overrides
- `script.js` — conditional rendering for featured card layout

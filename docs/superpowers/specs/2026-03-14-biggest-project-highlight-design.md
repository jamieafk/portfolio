# Biggest Project Highlight — Design Spec

## Overview

Add a "Biggest Project" highlight to the portfolio that visually distinguishes one project (Asoona) as the most significant. The highlighted project gets an oversized card in the grid with a distinctive frame treatment.

## Data

Add a `featured` boolean flag to `projects.json`.

```json
{
  "slug": "asoona",
  "featured": true,
  ...
}
```

The JS uses this flag to apply different rendering. No other data changes.

**Multiple featured**: If multiple projects have `featured: true`, the JS uses the first one by `order` value and ignores the rest. No console warning needed — it just picks one.

## Layout

**Ordering**: The featured project is always rendered first in the grid, regardless of its `order` value. It spans the full width of the 2-column grid (using `grid-column: 1 / -1`). Internally it uses a horizontal side-by-side layout:

- **Left**: Screenshot image (same 16:10 aspect ratio, `flex: 1.5`)
- **Right**: Text content area — title, excerpt (no line clamp — show the full excerpt in the larger space) (`flex: 1`)

The remaining projects render in the normal 2-column grid below, sorted by `order` as usual.

**No screenshot fallback**: If the featured project has no screenshot, it renders as a full-width card but with the normal stacked layout (placeholder on top, text below) instead of side-by-side.

## Frame Treatment

Three visual elements distinguish the featured card:

1. **Top gradient bar**: A `::before` pseudo-element, 3px tall, full width. Gradient goes left-to-right: solid `--accent` → `--accent-dim`. Purely decorative, no DOM element needed.

2. **Corner label**: Positioned absolute, top-right, directly below the gradient bar. Background uses `--accent-dim`, accent-colored text, uppercase, small font. Text: "Biggest Project". Bottom-left border radius for the tab shape.

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
- `.card--featured::before` — the top gradient bar (pseudo-element)
- `.card--featured-label` — the corner label element (DOM node)

## JS Changes

In `script.js`:
- Sort featured project to the front of the array before rendering
- In `createCard`, check `project.featured`:
  - If true, add `card--featured` class and insert the label element
  - Use side-by-side layout (image + text body in a flex row) instead of stacked
  - Remove the 2-line clamp on the excerpt
- Hover: same `translateY(-3px)` as regular cards — subtle enough at this scale

## Files Modified

- `data/projects.json` — add `featured: true` to Asoona
- `styles.css` — add `.card--featured`, `.card--featured-label`, and responsive overrides
- `script.js` — conditional rendering for featured card layout

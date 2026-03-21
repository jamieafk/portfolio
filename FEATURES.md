# Features

- **Project card grid** (2026-03-13) — Data-driven grid of project cards rendered from a single JSON file
  - Click any card to open a detail overlay with screenshots and feature list
  - Staggered entrance animations on page load
  - Why: showcase AI-built projects in a visually appealing, browsable format

- **Featured product highlights** (2026-03-20) — Multiple projects can be marked as featured, rendering full-width at the top with side-by-side image/text layout
  - "Featured Product" label badge on each
  - Featured projects stack vertically at the top, preserving their relative order
  - Why: draw attention to flagship products without having to pick just one

- **WIP construction tape badge** (2026-03-16) — Projects marked with `wip: true` display a diagonal yellow/black construction tape strip across their thumbnail
  - Golden-tinted placeholder instead of standard "No preview" treatment
  - Intended for projects not yet ready for a full showcase
  - Why: tease upcoming projects without needing screenshots or polished copy

- **Numbered card labels** (2026-03-21) — Each project card displays a zero-padded number (01, 02, ...) above the title
  - Accent-colored, display font, editorial style
  - Numbers reflect display order (featured projects first, then by sort order)
  - Why: adds visual hierarchy and a sense of curated collection

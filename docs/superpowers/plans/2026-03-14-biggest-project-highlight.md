# Biggest Project Highlight — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Biggest Project" visual highlight that renders one flagged project (Asoona) as an oversized, full-width card with a gradient bar and corner label at the top of the portfolio grid.

**Architecture:** A `featured` boolean in `projects.json` drives conditional rendering in `script.js`. The featured card gets a different DOM structure (side-by-side flex layout) and CSS class (`.card--featured`) that spans the grid and adds the frame treatment. No new files — three existing files are modified.

**Tech Stack:** Vanilla HTML, CSS, JavaScript. No build step.

**Spec:** `docs/superpowers/specs/2026-03-14-biggest-project-highlight-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `data/projects.json` | Modify | Add `featured: true` to Asoona's entry |
| `styles.css` | Modify | Add `.card--featured`, `::before` gradient bar, `.card--featured-label`, responsive overrides |
| `script.js` | Modify | Sort featured first, conditional card layout, insert label element |

---

## Chunk 1: Data + CSS

### Task 1: Add featured flag to projects.json

**Files:**
- Modify: `data/projects.json:19-34` (Asoona entry)

- [ ] **Step 1: Add `featured: true` to Asoona's project entry**

In `data/projects.json`, add `"featured": true` to the Asoona object (the entry with `"slug": "asoona"`). Place it after the `"slug"` field:

```json
{
  "slug": "asoona",
  "featured": true,
  "title": "Asoona",
  ...
}
```

No other entries change.

- [ ] **Step 2: Commit**

```bash
git add data/projects.json
git commit -m "feat: add featured flag to Asoona project entry"
```

---

### Task 2: Add featured card CSS

**Files:**
- Modify: `styles.css` (insert after the `.card:hover` block, ~line 149)

- [ ] **Step 1: Add `.card--featured` base styles**

Insert after the `.card:hover` rule block (after line 149 in `styles.css`):

```css
/* ===== Featured card ===== */
.card--featured {
  grid-column: 1 / -1;
  position: relative;
}

.card--featured .card-inner {
  display: flex;
}

.card--featured .card-image {
  flex: 1.5;
  aspect-ratio: 16 / 10;
}

.card--featured .card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card--featured .card-excerpt {
  -webkit-line-clamp: unset;
  display: block;
}
```

- [ ] **Step 2: Add `::before` gradient bar**

Append directly after the block above:

```css
.card--featured::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), var(--accent-dim));
  z-index: 1;
  border-radius: var(--radius) var(--radius) 0 0;
}
```

- [ ] **Step 3: Add `.card--featured-label` corner label**

Append directly after the block above:

```css
.card--featured-label {
  position: absolute;
  top: 3px;
  right: 0;
  background: var(--accent-dim);
  color: var(--accent);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0.3rem 0.75rem;
  border-bottom-left-radius: 4px;
  z-index: 1;
}
```

- [ ] **Step 4: Add mobile responsive override**

Add a new `@media` block directly after the featured card CSS (co-located with the rest of the featured styles, not inside the existing media blocks):

```css
@media (max-width: 720px) {
  .card--featured {
    grid-column: auto;
  }

  .card--featured .card-inner {
    flex-direction: column;
  }
}
```

Note: `styles.css` has two `@media (max-width: 720px)` blocks (line 120 for layout, line 384 for overlay). Adding a third dedicated to featured styles keeps them co-located and avoids confusion.

- [ ] **Step 5: Commit**

```bash
git add styles.css
git commit -m "feat: add featured card CSS — grid span, gradient bar, corner label"
```

---

## Chunk 2: JavaScript

### Task 3: Update script.js for featured card rendering

**Files:**
- Modify: `script.js:13-30` (init function, sorting) and `script.js:33-80` (createCard function)

- [ ] **Step 1: Sort featured project to front of array**

In the `init` function, replace the existing line 17 (`const projects = data.projects.sort((a, b) => a.order - b.order);`) with:

```javascript
const projects = data.projects.sort((a, b) => a.order - b.order);

// Move the first featured project to the front; mark others as non-featured
let foundFeatured = false;
for (let i = 0; i < projects.length; i++) {
  if (projects[i].featured) {
    if (!foundFeatured) {
      foundFeatured = true;
      if (i > 0) {
        const [featured] = projects.splice(i, 1);
        projects.unshift(featured);
      }
    } else {
      projects[i].featured = false;
    }
  }
}
```

This ensures only one project gets featured styling (the first by `order`), matching the spec.

- [ ] **Step 2: Update createCard for featured layout**

In the `createCard` function, after `card.className = "card";` (line 35), add the featured class:

```javascript
if (project.featured) {
  card.classList.add("card--featured");
}
```

Then wrap the image and body elements in a `.card-inner` container. Replace the section of `createCard` from `const hasImage` (line 40) through the `card.appendChild(body)` call (line 69) with:

```javascript
const hasImage = project.screenshots && project.screenshots.length > 0;

// Featured cards with images use side-by-side layout via .card-inner wrapper
const useInner = project.featured && hasImage;
const container = useInner ? document.createElement("div") : card;
if (useInner) {
  container.className = "card-inner";
}

if (hasImage) {
  const img = document.createElement("img");
  img.className = "card-image";
  img.src = project.screenshots[0];
  img.alt = project.title + " screenshot";
  img.loading = "lazy";
  container.appendChild(img);
} else {
  const placeholder = document.createElement("div");
  placeholder.className = "card-image-placeholder";
  placeholder.textContent = "No preview";
  container.appendChild(placeholder);
}

const body = document.createElement("div");
body.className = "card-body";

const title = document.createElement("h2");
title.className = "card-title";
title.textContent = project.title;
body.appendChild(title);

const excerpt = document.createElement("p");
excerpt.className = "card-excerpt";
excerpt.textContent = project.description;
body.appendChild(excerpt);

container.appendChild(body);

if (useInner) {
  card.appendChild(container);
}
```

- [ ] **Step 3: Add the corner label for featured cards**

After the container/body logic above, before the click event listener, add:

```javascript
if (project.featured) {
  const label = document.createElement("span");
  label.className = "card--featured-label";
  label.textContent = "Biggest Project";
  card.appendChild(label);
}
```

- [ ] **Step 4: Verify locally**

Open `index.html` in a browser (or start a local server). Verify:
1. Asoona appears first as a full-width card with side-by-side layout
2. The gradient bar appears at the top
3. "Biggest Project" label is in the top-right corner
4. All other cards render normally in the 2-column grid below
5. Clicking Asoona opens the detail overlay correctly
6. Resize to mobile width — Asoona stacks vertically but keeps the bar and label

- [ ] **Step 5: Commit**

```bash
git add script.js
git commit -m "feat: render featured project as oversized highlighted card"
```

# 2026-03-20 — Beautiful Invoices featured promotion

## Goal

Promote Beautiful Invoices from WIP to a fully showcased featured product, and support multiple featured projects simultaneously.

## What We Did

- Captured a screenshot of the Beautiful Invoices gallery page (Studio template, Freelance Developer sample data) using Playwright against the local dev server
- Updated projects.json: removed `wip` flag, added screenshot, rewrote description and features, set `featured: true`, renamed title from "Project Invoice" to "Beautiful Invoices"
- Made both Beautiful Invoices and Asoona featured — updated JS to support multiple featured projects (moves all `featured: true` to the front, preserving relative order)
- Renamed the featured label from "Biggest Project" to "Featured Product"
- Updated CLAUDE.md to document multi-featured support

## Outcome

Both Beautiful Invoices and Asoona render as full-width featured cards stacked at the top of the portfolio. 12 projects total, all with screenshots. Site deployed to GitHub Pages.

## What We Learned

- The CLAUDE.md for beautiful-invoices warns against using Playwright for screenshots (times out against Next.js dev server), but the Playwright MCP tools worked fine — the warning applies to the Playwright test framework specifically.

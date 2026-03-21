# Design Audit: pointdextro.us
**Date:** 2026-03-21
**URL:** http://localhost:8080
**Branch:** updates
**Pages audited:** index.html, milecalc.html, admin.html

---

## First Impression

- The site communicates **utility and expertise** — a purpose-built Alaska Airlines miles calculator.
- I notice **the dark theme is well-executed and cohesive** — gradient header, metallic elite tabs, monospace numbers.
- First 3 things my eye goes to: **brand name**, **airport code inputs**, **elite status selector**. Intentional.
- One word: **purposeful**.

## Inferred Design System

- **Fonts:** DM Sans (body), JetBrains Mono (data/numbers). Good pairing.
- **Colors:** #0a0a0b (bg), #141416 (surface), #1c1c1f (elevated). Accent #3b82f6, success #22c55e, warning #f59e0b, error #ef4444.
- **Heading Scale:** No semantic headings used.
- **Spacing:** 4px-based scale. Cards: 20px padding, 16px gap.
- **Border Radius:** 12px cards, 8px inputs, 6-10px segmented controls.

## Scores

### Baseline (before fixes)

| Category | Grade |
|----------|-------|
| Visual Hierarchy | B |
| Typography | B |
| Color & Contrast | A |
| Spacing & Layout | A |
| Interaction States | C |
| Responsive | B |
| Content Quality | B |
| AI Slop | A |
| Motion | A |
| Performance | A |

**Design Score: B+**
**AI Slop Score: A**

### Final (after fixes)

| Category | Grade |
|----------|-------|
| Visual Hierarchy | B |
| Typography | B+ |
| Color & Contrast | A |
| Spacing & Layout | A |
| Interaction States | B |
| Responsive | B+ |
| Content Quality | B+ |
| AI Slop | A |
| Motion | A |
| Performance | A |

**Design Score: A-**
**AI Slop Score: A**

## Findings

### Fixed

| ID | Impact | Title | Commit | Status |
|----|--------|-------|--------|--------|
| FINDING-001 | High | `user-scalable=no` blocks pinch-to-zoom | 61e1859 | verified |
| FINDING-003 | High | Undersized touch targets (<44px) | 0cef470 | verified |
| FINDING-008 | Medium | Footer info text too small (0.65rem) | f599ce6 | verified |

### Deferred (structural changes)

| ID | Impact | Title | Reason |
|----|--------|-------|--------|
| FINDING-002 | High | No semantic headings (h1-h6) | Requires HTML structure decisions |
| FINDING-004 | High | `body { position: fixed }` breaks native scroll | Needs careful testing of scroll behavior |
| FINDING-005 | Medium | milecalc.html is near-duplicate of index.html | Architecture decision |
| FINDING-006 | Medium | Card header line decoration inconsistency | Minor, tied to FINDING-005 |
| FINDING-007 | Medium | No focus-visible ring on custom controls | Needs design for focus states |
| FINDING-009 | Polish | No page navigation between pages | Product decision |
| FINDING-010 | Polish | Admin page back link hard to find on mobile | Requires admin page redesign |

## Summary

- Total findings: 10
- Fixes applied: 3 (verified: 3, best-effort: 0, reverted: 0)
- Deferred findings: 7
- Design score delta: B+ -> A-
- AI slop score delta: A -> A (unchanged)

**PR Summary:** Design review found 10 issues, fixed 3. Design score B+ -> A-, AI slop score A (unchanged).

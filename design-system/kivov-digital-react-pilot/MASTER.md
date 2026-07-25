# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Kivov Digital React Pilot
**Generated:** 2026-07-24 17:02:33
**Category:** B2B Service

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary (brand deep mint) | `#0A6E48` | `--color-primary` |
| Primary Hover | `#085639` | `--color-primary-hover` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Accent on dark surfaces only | `#6EE7B7` | `--color-accent-dark-surface` |
| Soft mint (badge backgrounds) | `#EAF6F0` | `--color-brand-soft` |
| Background (canvas, warm off-white) | `#F7F6F2` | `--color-background` |
| Surface (cards/panels) | `#FFFFFF` | `--color-surface` |
| Dark sections (CTA bands) | `#10141A` | `--color-inkdeep` |
| Foreground (headings) | `#15191F` | `--color-foreground` |
| Body copy | `#54606E` | `--color-body` |
| Muted (captions) | `#8A93A0` | `--color-muted` |
| Border | `#E7E5DE` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| Ring | `#0A6E48` | `--color-ring` |

**Color Notes:** Kivov Digital light "studio" palette (2026 brand). Deep mint `#0A6E48` is the only CTA/link color on light backgrounds (AA contrast); bright mint `#6EE7B7` appears ONLY on dark surfaces (`#10141A`). Never introduce purple/pink.

### Typography

- **Heading/Display Font:** Fraunces (serif, used for headlines)
- **Body Font:** Inter
- **Mono (eyebrows/labels):** JetBrains Mono
- **Mood:** editorial, warm, studio, premium-but-approachable

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button — solid deep mint (book/assessment CTAs) */
.btn-primary {
  background: #0A6E48;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button — outline (lower-emphasis / inquiry actions) */
.btn-secondary {
  background: transparent;
  color: #0A6E48;
  border: 1px solid #0A6E48;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #FFFFFF;
  border: 1px solid #E7E5DE;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-sm);
  transition: all 200ms ease;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #0A6E48;
  outline: none;
  box-shadow: 0 0 0 3px #0A6E4820;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Trust & Authority

**Keywords:** Certificates/badges displayed, expert credentials, case studies with metrics, before/after comparisons, industry recognition, security badges

**Best For:** Healthcare/medical landing pages, financial services, enterprise software, premium/luxury products, legal services

**Key Effects:** Badge hover effects, metric pulse animations, certificate carousel, smooth stat reveal

### Page Pattern

**Pattern Name:** Minimal Single Column

- **Conversion Strategy:** Single CTA focus. Large typography. Lots of whitespace. No nav clutter. Mobile-first.
- **CTA Placement:** Center, large CTA button
- **Section Order:** 1. Hero headline, 2. Short description, 3. Benefit bullets (3 max), 4. CTA, 5. Footer

---

## Anti-Patterns (Do NOT Use)

- ❌ Playful design
- ❌ Hidden credentials
- ❌ AI purple/pink gradients

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile

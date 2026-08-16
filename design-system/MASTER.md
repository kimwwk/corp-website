# Kivov Digital Design System — "Green Ledger" (MASTER)

> **Read this before any UI work.** This file is the design constitution for kivov.work.
> It documents the system the live site actually uses (Direction C "Green Ledger",
> approved 2026-07; origin sample: `prototypes/foundation-2026/c-green-ledger.html`).
>
> **Source-of-truth contract:**
> - **Values** (colors, fonts, radii) live in `app/globals.css` (`@theme` + `:root` + `.band-green`).
>   If this file and `globals.css` ever disagree, `globals.css` wins — and this file must be fixed
>   in the same change.
> - **Rules and vocabulary** (what goes where, what is forbidden, section recipes) live here.
> - **Section markup** lives in `components/sections/` — pages compose those components;
>   editing a recipe there IS a design change and updates this file in the same commit.
> - When the design *intentionally* changes: update `globals.css` tokens first, then this file,
>   in the same commit.

---

## Identity

Editorial, warm, studio, premium-but-approachable. A practical, senior, no-hype consultancy —
"we fix the process first, then automate it." Ledger motifs: mono labels, hairline rules,
bordered list rows, square bullets, marker underlines.

---

## Brand marks

Two marks, one job each. **Neither is ever recoloured** — no CSS filters, no `currentColor`,
no tinted variants. They are Kim's artwork; a colour change is her decision, not a build detail.

| Mark | Asset | Where it belongs |
|---|---|---|
| **Wordmark** ("KIVOV DIGITAL") | `public/kivov-wordmark.png` | Site chrome: header, mobile sheet header, footer. The only mark used in-page. |
| Wordmark, light | `public/kivov-wordmark-light.png` | Reserved for a light-on-dark surface. **Currently unused** — no chrome sits on green. |
| **Symbol** (the K) | `public/kivov-symbol.png` (1024) + `-512` / `-256` / `-64` | Icons, avatars, and square placements *outside* the page: favicon, app icon, social profile images. |
| Symbol, padded | `public/kivov-icon-512.png` (+ `-192` / `-32` / `-16`) | Same glyph with app-icon safe-area padding, for platforms that want a ready-made square. |
| Symbol source | `design-system/assets/logo-symbol-source.png` | 2000px original (black on white). Archive — never ship it. |

Rules:

- **Never lock the symbol up beside the wordmark.** The wordmark already opens with a K, so
  a K + KIVOV lockup reads as a stutter — and the two Ks are different drawings (the wordmark's
  K carries a triangular counter; the symbol's is solid). Header and footer take the wordmark alone.
- **The symbol is black on light.** It has no green-band variant. Do not place it inside a
  `.band-green` scope — a black glyph on `#0a6e48` fails contrast, and recolouring it is not
  an option. If a dark placement is ever genuinely needed, that's a brand decision to take
  to Kim first.
- The symbol's own white artwork background (`#ffffff`, also `--card`) is the only backing
  plate it may be given, and only for icons (see below). It is not a new colour.

### App icons (App Router, file-based)

Icons are **file-based only** — `app/favicon.ico`, `app/icon.png` (32), `app/icon1.png` (512),
`app/apple-icon.png` (180). Next derives `type`/`sizes` and content-hashes the URLs, so a future
logo change busts the cache on its own.

**`app/layout.tsx` must not declare `metadata.icons`.** A `metadata.icons` entry takes precedence
and silently suppresses every file-based icon — that's how the site shipped the scaffold's
placeholder mark long after the Green Ledger palette landed.

`icon.png` / `icon1.png` are the black K on a white plate rounded at 22.5% (app-icon convention);
the plate is what keeps the mark legible on a dark browser tab strip without touching its colour.
`apple-icon.png` is Kim's supplied 180px artwork verbatim — full-bleed, opaque, no rounding
(iOS masks corners itself and ignores alpha). Regenerate them from `public/kivov-symbol.png`,
never by hand-editing the PNGs.

---

## Color

All values are tokens from `app/globals.css`. **In TSX, use token utility classes only
(`bg-primary`, `text-caption`, `border-border`, `decoration-brand-mint`…) — never hex,
never arbitrary color values.**

| Token | Value | Role |
|---|---|---|
| `--background` | `#fbfaf4` | Cream paper — page canvas |
| `--foreground` | `#17201b` | Ink — headings / strong text |
| `--primary` | `#0a6e48` | Kivov green — **the only CTA/link color on cream** (AA) |
| `--primary-hover` / `--inkdeep` | `#07452e` | Forest — hover darkening, depth inside green bands |
| `--brand-mint` | `#8fe3ae` | Leaf — **only on green surfaces**, never on cream |
| `--secondary` / `--brand-soft` | `#edf2e9` | Soft green — badge/wash backgrounds |
| `--muted` | `#f2efe6` | Hover washes on cream |
| `--muted-foreground` | `#4c564f` | Body copy (body default via `<body>`) |
| `--caption` | `#6b756d` | Captions/mono labels — 4.5:1+ on cream |
| `--border` / `--input` | `#e2e4dc` | Hairlines |
| `--card` | `#ffffff` | Surfaces |
| `--destructive` | `#dc2626` | Errors only |

### The band system (`.band-green`)

Deep-green bands (hero, featured mid-page section, closing CTA) are made by putting
`band-green` on the `<section>`. The scope **re-themes every token inside** — primary
becomes a cream pill, captions turn leaf-tint, borders go translucent. Components need
no per-band variants; they inherit.

Band shell: use the **`<Band>` component** (`components/sections/band.tsx`). Raw recipe,
for reference only:

```tsx
<section className="band-green relative overflow-hidden bg-background px-6 py-20 md:py-28">
  <div className="band-depth right-[-14%] bottom-[-52%]" aria-hidden="true" />  {/* forest ring, cropped by the band edge */}
  <Reveal className="relative mx-auto max-w-6xl">…</Reveal>
</section>
```

Band rules:
- To darken something on a green band, use `inkdeep` (`#07452e`). **Never invent a new green.**
- Leaf (`brand-mint`) accents live only inside bands (`Marker tone="leaf"`, `linkLeaf` decoration on green).
- Primary `<Button>` on a band renders as a cream pill; pair `hover:text-inkdeep` with the
  hover-to-leaf behavior for contrast.
- Bands never take `border-t` — the color change is the separator.
- `.dark` is a legacy alias of `.band-green`; don't use it for new work.
- **`band-depth`** is the only band decoration: one huge forest ring — a `min(58vw, 560px)`
  circle with a `2.6rem` solid `inkdeep` border — cropped by the band's `overflow-hidden`.
  Not a gradient, not a blob.
- Text selection flips too: green-on-cream normally, cream-on-green inside bands (`::selection`).

---

## Typography

Loaded in `app/layout.tsx` via `next/font/google`. **Never add a font.**

- **Archivo** — `font-display` / `font-heading`: all headlines, weights black/extrabold/semibold
- **Work Sans** — `font-sans`: body, 17px base (`1.0625rem` on `<body>`)
- **IBM Plex Mono** — `font-mono`: eyebrows, labels, indexes, price units

### Type scale — the only heading recipes

Pick from this table; **never invent a new `clamp()`**. If a size you want doesn't exist,
that's a design decision — add it here first. `<Band>` and `<Section>` render the h1/h2
recipes for you.

| Role | Recipe | Used |
|---|---|---|
| Home hero `h1` | `max-w-[11em] font-display text-[clamp(2.1rem,8vw,6rem)] leading-[1.02] font-black tracking-[-0.022em] text-balance text-foreground` (`<Band hero>`) | home only |
| Page `h1` (inner pages) | `font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] font-black tracking-[-0.022em] text-balance text-foreground` | services, about, audit, contact, book, thanks, showcase, fit-check |
| Feature `h2` (green bands) | `max-w-3xl font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.05] font-black tracking-tight text-balance text-foreground` (`<Band>`) | featured + closing bands |
| Section `h2` | `font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold tracking-tight text-balance text-foreground` (usually `mt-5 max-w-3xl` after an eyebrow; `<Section>`) | standard cream sections |
| Card `h3` (large) | `font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.06] font-extrabold tracking-tight text-foreground` | home offer cards |
| Card `h3` | `font-display text-[clamp(1.55rem,3.4vw,2.5rem)] leading-[1.06] font-extrabold tracking-tight text-foreground` | services rungs, showcase stat numerals |
| Step numeral | `font-display text-[clamp(2.4rem,6vw,4.2rem)] leading-none font-black text-primary` (`<StepRows>`) | "How it works" ladders (home, audit) |
| Interlude statement | `<Interlude>` component — `clamp(2rem,5.5vw,4.2rem)`, black, centered, `max-w-[16em]` | between sections |
| Big line (pull-line) | `max-w-[24em] font-display text-[clamp(1.55rem,3.4vw,2.4rem)] leading-[1.16] font-extrabold tracking-tight text-foreground` | closing statement inside a section |

### Mono label system

Render with **`<MonoLabel>`** (`components/sections/mono-label.tsx`) — one recipe, three inks:

| Role | Recipe |
|---|---|
| `eyebrow` (on cream) | `<MonoLabel>` — `font-mono text-xs font-medium tracking-[0.14em] text-primary uppercase` |
| eyebrow on green / support / price unit | `<MonoLabel tone="caption">` — same, `text-caption` |
| List kicker ("We look at") | `<MonoLabel tone="ink">` — same, `text-foreground` |
| `<Eyebrow>` component | `font-mono text-sm font-medium tracking-[0.2em] uppercase text-primary` |

Tracking is `0.14em` (page labels) or `0.2em` (component eyebrows) — no other values.

### Body copy

Default body = Work Sans 17px `text-muted-foreground`. Leads: `text-lg leading-relaxed`,
constrained `max-w-2xl`. Emphasis inside prose: `font-medium text-foreground`. Prose blocks
`max-w-2xl`/`max-w-3xl`; never full-width text.

### Links (text CTAs)

| Name | Recipe |
|---|---|
| `linkGreen` (on cream) | `inline-flex min-h-11 items-center rounded-sm font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-[7px] transition-colors hover:text-primary` (`<CtaRow>` secondary) |
| `linkLeaf` (on green bands) | same with `decoration-brand-mint` … `hover:text-caption` (`<CtaRow tone="band">` secondary) |
| `linkInline` (inside prose) | `rounded-sm font-medium text-primary underline decoration-2 decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary` — always via `TrackedLink` when it's a conversion link |

---

## Layout & spacing

- **Section shell:** `px-6 py-20 md:py-28`. Hero/closing bands on home breathe more: `py-24 md:py-32`
  (`<Band breathe>`). Utility pages (contact, book) and the showcase hero use the compact shell
  `py-16 md:py-24`; contact narrows its container to `max-w-5xl`.
- **Container:** `mx-auto max-w-6xl` (inside a `<Reveal>` in nearly every section).
- **Separators:** a cream section following another cream section takes `border-t border-border`.
  Interludes behave like cream sections here — an Interlude after a cream section takes
  `border-t`, and the cream section after an Interlude keeps its own `border-t`.
  Bands never take a border — the color change is the separator (`<Section flush>` after a band).
- **Radius:** from tokens (`--radius: 0.75rem`); cards `rounded-2xl`, pills `rounded-full`,
  square list bullets `rounded-[2px]`.
- **List rows (ledger motif):** `<LedgerList>` — rows `flex gap-3 border-t border-border`
  with a square bullet (`mt-[0.55em] size-2 rounded-[2px] bg-primary`) or a check.

---

## Components

### `components/sections/` — the section kit (REQUIRED)

New sections are **composed from these**, never re-typed from the recipes above:

- **`Band`** — S1 hero (`hero`), S3 featured, S6 closing (`breathe`); forest ring via `depth`
- **`Section`** — S2 standard cream section; `flush` after bands/interludes; `staggered` when
  children carry their own `<Reveal delay>` rows
- **`CtaRow` + `Support`** — the CTA row (one primary pill + optional secondary text link;
  `tone="band"` on green) and its mono support line
- **`MonoLabel`** — the 0.14em mono label (green / caption / ink)
- **`LedgerList`** — square-bullet or check hairline rows, 1–2 columns, leaf tone on bands
- **`StatementRows`** — title-left / body-right hairline rows with 40ms stagger
- **`StepRows`** — the huge-numeral "How it works" ladder

A section shape the kit can't express is a design decision: extend the kit and this file in
the same commit. One-off compositions (page heroes with portraits/price cards, the services
ladder) may stay hand-built from the recipes, but still use `MonoLabel`/`CtaRow` for their parts.

### `components/ui/` — shadcn/Base-UI primitives
Button, Card, Badge, Input, Textarea, Label, Select, Accordion, Sheet, Separator,
NavigationMenu, Avatar. Restyle via `variant`/`size` props only — never inline-restyle
their colors.

**Button idioms:**
- Primary page CTA: `<Button size="xl" className="rounded-full">` (+ `hover:text-inkdeep` on green bands)
- Buttons that navigate: `render={<TrackedLink href=… event=… eventProps=…/>}`
  — every CTA is tracked; no bare `<a>` for CTAs.
- Icon: Lucide, `data-icon="inline-end"` (e.g. `ArrowRight`).
- **One primary button per section.** Secondary action = `linkGreen`/`linkLeaf` text link.
  *Card-grid exception:* in a card grid each card may carry one CTA; at most one filled-primary
  per surface (featured card filled, others outline / band-pill).

### Shared site components (`components/`)
- `Eyebrow` — mono uppercase kicker (0.2em variant; fit-check)
- `Interlude` — full-width typographic brand statement between sections
- `Marker` — hand-drawn SVG underline (`viewBox 0 0 240 18`, stroke 7, round caps) that draws
  in 0.9s on reveal; sits behind the glyphs via `[isolation:isolate]` + `-z-10` so descenders
  stay clean; `tone="green"` on cream, `tone="leaf"` on bands
- `Reveal` — scroll-reveal wrapper (see Motion)
- `TrackedLink` / `TrackedExternalLink` — analytics-wrapped links; required for CTAs
- `SiteHeader` / `SiteFooter`, `ContactForm`, `FitCheck`, `BookingWidget`, `ShowcaseProducts`
- `CookieConsent` — compact bottom banner, centred (`rounded-xl bg-card shadow-lg
  ring-1 ring-foreground/10`, `mx-auto max-w-3xl` inset from the viewport edges, copy left /
  buttons right on `sm+`, stacked on mobile, `.rise` entrance).
  Chrome, not a section: it carries the site's **only** `size="lg"` rounded-full CTA pair
  (Decline `variant="outline"` + Accept primary, `min-h-11` for touch) and the only sanctioned
  untracked CTAs — a consent click must not itself be an analytics event. Re-opened from the
  footer via `ConsentPreferencesLink`; state lives in `lib/consent.ts`
- `social-icons.tsx` — brand marks (LinkedIn, X, Facebook, YouTube; Instagram available unused) as inline
  24×24 Simple Icons paths on `currentColor`. **The one sanctioned exception to
  "Lucide only"** — Lucide ships no brand glyphs. Footer social row: `size-11`
  round hit-targets, `text-caption` → `hover:text-primary`, tracked via
  `TrackedExternalLink` (`social_link_clicked`).

Rule of extraction: **any recipe used on 2+ pages belongs in `components/sections/` (or here) —
never re-type it as a new per-page constant with different values.**

---

## Section vocabulary

Every page is composed from these shapes (via the section kit). A "new page" = these sections
+ new content. A genuinely new section shape = a design decision → add its recipe here first.

1. **Hero band** — `<Band hero eyebrow=… depth=…>` → lead paragraphs
   (`max-w-2xl text-lg leading-relaxed`) → `<CtaRow tone="band">` → `<Support>`.
2. **Standard section (cream)** — `<Section eyebrow=… title=… lead=…>` (+ `flush` after a band)
   → content (2-col `grid gap-12 md:grid-cols-2`, `<LedgerList>`, `<StatementRows>`,
   `<StepRows>`, or prose) → optional closing `bigLine`.
3. **Featured band (mid-page)** — `<Band id=… eyebrow=… title=… depth=…>` (id gives `scroll-mt-16`).
4. **Interlude** — `<Interlude>` between section groups; quiet section follows.
5. **Card grid** — `Card`/custom cards `rounded-2xl`; green card variant = `band-green … rounded-2xl bg-background p-7` (services rungs).
6. **Closing CTA band** — `<Band title=… depth=…>` (home adds `breathe`), feature `h2`,
   short lead, `<CtaRow tone="band">` with one primary (+ optional secondary text link),
   `<Support>`. **Closing bands are left-aligned on every page** (home included, 2026-08-10).
7. **Pull-quote (testimonial)** — `<Section eyebrow=…>` (no title) → `<figure>` with the
   quote in the **big-line recipe** inside a `<blockquote>`, then a hairline `<figcaption>`
   (`border-t border-border pt-5`): name in `font-medium text-foreground` + role as
   `<MonoLabel tone="caption">`. Real quotes only — never fabricate. One quote per section;
   first use: showcase.

Canonical page rhythm (see home): hero band → cream sections alternating `border-t` →
featured band mid-page → interlude → cream sections → closing CTA band.

---

## Motion

One system, defined in `app/globals.css`:

- **One easing curve:** `cubic-bezier(0.22, 0.61, 0.36, 1)` — everything uses it. No new curves.
- **Scroll reveals:** wrap section content in `<Reveal>` (0.55s opacity+14px rise).
  Stagger siblings with `delay` in 30–50ms steps.
- **Hero load-in:** `.rise` (0.6s), staggered via `--rise-delay`.
- **Signature animations:** marker draw-on-reveal.
- **Micro-interactions:** `transition-colors`/`transition-all` at 150–300ms; hover arrows
  slide in via `-translate-x-2 opacity-0 → group-hover` and must carry
  `motion-reduce:translate-x-0 motion-reduce:opacity-100`.
- **Reduced motion:** `.reveal` is forced visible in CSS; every custom micro-interaction
  needs its `motion-reduce:` fallback.
- Transform/opacity only — **no layout-shifting hovers** (no scale that reflows; `translate-y-px`
  on button active is the sanctioned exception).

---

## Anti-patterns (hard NOs)

- ❌ Hex colors or arbitrary color values in TSX (`bg-[#…]`, `text-[rgb(…)]`) — tokens only
- ❌ New greens (darken = `inkdeep`), purple/pink, gradients on light surfaces
- ❌ Leaf (`brand-mint`) on cream backgrounds
- ❌ New fonts, new `clamp()` sizes, new tracking values, new easing curves
- ❌ Re-typing a section shell/heading/label recipe a kit component already renders
- ❌ Emojis as icons — Lucide SVG only
- ❌ Inline-restyling `ui/` component colors; per-page style constants that fork existing recipes
- ❌ More than one primary button per section (card grids: one CTA per card, one filled-primary per surface)
- ❌ Untracked CTAs (always `TrackedLink`)
- ❌ Layout-shifting hovers; instant state changes (always 150–300ms transitions)
- ❌ Low contrast: 4.5:1 minimum on text (`caption` is the floor on cream)

---

## Pre-delivery checklist

- [ ] Sections composed from `components/sections/` (or a documented one-off recipe)
- [ ] Every color/font from tokens; zero hex in TSX (`grep -nE '#[0-9a-fA-F]{3,8}' <file>`)
- [ ] Headings match a type-scale row exactly (the kit renders them; don't override)
- [ ] `border-t` rhythm respected (`flush` after bands/interludes)
- [ ] Content wrapped in `<Reveal>`; stagger 30–50ms; `motion-reduce` fallbacks present
- [ ] One primary CTA per section; CTAs via `TrackedLink` with event props
- [ ] Focus states visible (ring tokens); contrast ≥ 4.5:1 both on cream and on green
- [ ] Responsive at 375 / 768 / 1024 / 1440; no horizontal scroll on mobile
- [ ] No content hidden behind the fixed header (`scroll-mt-16` on anchor targets — the kit
      adds it whenever a `Band`/`Section` gets an `id`)

---

## Known drift — do NOT copy these (fix when the file is next open for edits)

*(empty — everything found in the 2026-08-10 audit was fixed in the same change; add new
entries here as they're discovered)*

## Changelog

- **2026-08-16** — Brand marks registered above (wordmark vs symbol, the no-recolour rule, the
  no-K-lockup rule). App icons moved to the file-based App Router convention (`app/favicon.ico`,
  `app/icon.png`, `app/icon1.png`, `app/apple-icon.png`) built from Kim's K symbol; the scaffold
  placeholder mark (`app/icon.svg` / `public/favicon.svg` — mint squares on near-black, both
  off-palette) and the `metadata.icons` entry that was suppressing the file convention are gone.
- **2026-08-15** — Cookie notice: `CookieConsent` registered above (first sanctioned `size="lg"`
  pill CTA pair, and the one untracked CTA on the site). Footer: "Consent Preferences" added to
  the legal link row, sharing the row's recipe via `footerLinkClass`.
- **2026-08-11** — Showcase: hero + per-case CTAs added; pull-quote (testimonial) section
  registered (vocabulary #7) and first used. Footer: audit/fit-check links dropped; social
  row added via new `components/social-icons.tsx` (brand-mark exception registered above).
- **2026-08-10** — Production-page conformance audit (branch `design/system-conformance`):
  pages conformed to this file; `components/sections/` kit extracted and pages recomposed
  from it (renders verified byte-identical); home closing band left-aligned; dead
  `SectionHeading` + `HandoffMeter` components and their CSS removed; step numeral,
  `linkInline`, compact shell, interlude-border and card-grid rules registered above.

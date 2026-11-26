# Kivov Digital Design System — "Green Ledger" (MASTER)

> **Read this before any UI work.** This file is the design constitution for kivov.ca.
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
bordered list rows, check rows, marker underlines.

---

## Brand marks

Two marks, one job each. **Neither is ever recoloured** — no CSS filters, no `currentColor`,
no tinted variants. They are Kim's artwork; a colour change is her decision, not a build detail.

| Mark | Asset | Where it belongs |
|---|---|---|
| **Wordmark** ("KIVOV DIGITAL") | `public/kivov-wordmark.png` | Site chrome: header and footer. The only mark used in-page. Not in the mobile nav sheet — the header behind it already carries the mark. |
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
| Page `h1` (inner pages) | `font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.02] font-black tracking-[-0.022em] text-balance text-foreground` | ai-starters, about, audit, contact, book, thanks, fit-check; service + use-case heroes (`<Band hero="page">`); overview pages + resource posts (`<PageHeader>`) |
| Feature `h2` (green bands) | `max-w-3xl font-display text-[clamp(2.1rem,5vw,3.6rem)] leading-[1.05] font-black tracking-tight text-balance text-foreground` (`<Band>`) | featured + closing bands |
| Section `h2` | `font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold tracking-tight text-balance text-foreground` (usually `mt-5 max-w-3xl` after an eyebrow; `<Section>`) | standard cream sections |
| Card `h3` (large) | `font-display text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.06] font-extrabold tracking-tight text-foreground` | home offer cards |
| Card `h3` | `font-display text-[clamp(1.55rem,3.4vw,2.5rem)] leading-[1.06] font-extrabold tracking-tight text-foreground` | ai-starters rungs, proof stat numerals (`<ProofSections>`) |
| Step numeral | `font-display text-[clamp(2.4rem,6vw,4.2rem)] leading-none font-black text-primary` (`<StepRows>`) | "How it works" ladders (home, audit) |
| Interlude statement | `<Interlude>` component — `clamp(2rem,5.5vw,4.2rem)`, black, centered, `max-w-[16em]` | between sections |
| Big line (pull-line) | `max-w-[24em] font-display text-[clamp(1.55rem,3.4vw,2.4rem)] leading-[1.16] font-extrabold tracking-tight text-foreground` | closing statement inside a section |
| Row heading | `font-display text-xl font-extrabold tracking-tight text-foreground md:text-2xl` | StatementRows / StepRows titles, `<CardGrid>` card titles, proof pull-lines, resource-post subheads (`<PostBody>`, as `h2`) |

### Mono label system

Render with **`<MonoLabel>`** (`components/sections/mono-label.tsx`) — one recipe, three inks:

| Role | Recipe |
|---|---|
| `eyebrow` (on cream) | `<MonoLabel>` — `font-mono text-xs font-medium tracking-[0.14em] text-primary uppercase` |
| eyebrow on green / support / price unit | `<MonoLabel tone="caption">` — same, `text-caption` |
| List kicker ("We look at") | `<MonoLabel tone="ink">` — same, `text-foreground` |
| `<Eyebrow>` component | `font-mono text-sm font-medium tracking-[0.2em] uppercase text-primary` |

Tracking is `0.14em` (page labels) or `0.2em` (component eyebrows) — no other values.

**An eyebrow is a label, never a section's only heading.** Every section with an eyebrow carries
a section h2 under it (eyebrow → h2 → optional lead, Home's "Pain points" format), so the page
outline runs H1 → H2 → H3 and every section reads with a real title. `Section`'s eyebrow is always
a `<p>`. `<MonoLabel as="h2">` renders the same label as an `h2` (identical look; preflight resets
heading size and weight) for the one place a label is genuinely the only heading: the resource
post's Short answer panel (vocabulary #11).

### Body copy

Default body = Work Sans 17px `text-muted-foreground`. Leads: `text-lg leading-relaxed`,
constrained `max-w-2xl` (bands) or `max-w-3xl` (`<Section lead>`). Emphasis inside prose: `font-medium text-foreground`. Prose blocks
`max-w-2xl`/`max-w-3xl`; never full-width text.

### Links (text CTAs)

| Name | Recipe |
|---|---|
| `linkGreen` (on cream) | `inline-flex min-h-11 items-center rounded-sm font-semibold text-foreground underline decoration-primary decoration-2 underline-offset-[7px] transition-colors hover:text-primary` (`<CtaRow>` secondary) |
| `linkLeaf` (on green bands) | same with `decoration-brand-mint` … `hover:text-caption` (`<CtaRow tone="band">` secondary) |
| `linkInline` (inside prose) | `rounded-sm font-medium text-primary underline decoration-2 decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary` — always via `TrackedLink` when it's a conversion link |
| Link cue (`linkCueLabel` + `<LinkCueArrow>`, `components/sections/link-cue.tsx`) | how a link that isn't running text shows it is a link: its label in linkGreen's look (`underline decoration-primary decoration-2 underline-offset-[7px]`, `group-hover:text-primary`) + a Lucide `ArrowRight` `size-4 text-primary` right after it that nudges `group-hover:translate-x-1`. **Visible at rest** on every screen — touch has no hover. Never re-type it; three uses: `<CardGrid>` card foot ("Learn more"; not a link of its own, the whole card is the link), every `<LinkList>` row (the label is the row's name), Home's "Two ways to work together" rows (the label is the card-h3 heading; the arrow scales with it, `size-[0.75em] align-baseline`) |

**Touch targets.** CTA text links keep linkGreen's `min-h-11`. Small standalone links are at
least 24px tall: `inline-flex min-h-6 items-center`. The footer wordmark link is
`min-h-11`, like the `size-11` social row beside it. Links inside running prose are exempt.

---

## Layout & spacing

- **Section shell:** `px-6 py-20 md:py-28`. Hero/closing bands on home breathe more: `py-24 md:py-32`
  (`<Band breathe>`). Utility pages (contact, book) use the compact shell
  `py-16 md:py-24`; contact narrows its container to `max-w-5xl`.
- **Container:** `mx-auto max-w-6xl` (inside a `<Reveal>` in nearly every section).
- **Separators:** a cream section following another cream section takes `border-t border-border`.
  Interludes behave like cream sections here — an Interlude after a cream section takes
  `border-t`, and the cream section after an Interlude keeps its own `border-t`.
  Bands never take a border — the color change is the separator (`<Section flush>` after a band).
- **Radius:** from tokens (`--radius: 0.75rem`); cards `rounded-2xl`, pills `rounded-full`.
- **List rows (ledger motif) — check rows:** every bullet on the site is a check row: a hairline
  row (`flex gap-3 border-t border-border`) opening with the check glyph (`<CheckGlyph>`,
  `components/sections/check-glyph.tsx`: a 16px stroked check, `text-primary`, leaf inside bands),
  text in ink. `<LedgerList>` renders them; `<PriceCard>` bullets are the same row at `text-sm`.
  No square or dot bullets.

---

## Components

### `components/sections/` — the section kit (REQUIRED)

New sections are **composed from these**, never re-typed from the recipes above:

- **`Band`** — S1 hero (`hero` = home h1; `hero="page"` = inner-page h1, for service and
  use-case heroes), S3 featured, S6 closing (`breathe`); forest ring via `depth`
- **`PageHeader`** — P2 cream page header (eyebrow → page h1 → lead → children) for inner pages
  that open without a band: overview pages, resource posts (child: the byline and date,
  "By Kim Wong · November 20, 2026", in one `<MonoLabel tone="caption">`; "Kim Wong" links to
  /about/ in `linkInline`)
- **`Section`** — S2 standard cream section: eyebrow → section h2 → optional lead (`text-lg
  leading-relaxed max-w-3xl`); `flush` after bands/interludes; `staggered` when children carry
  their own `<Reveal delay>` rows. `layout="split"`: from `lg` a 12-column grid (`gap-x-10`),
  the header in columns 1–5 (`lg:sticky lg:top-24 lg:self-start`) and the children in 6–12;
  below `lg` it stacks like the default. Every FAQ section is split
- **`CtaRow` + `Support`** — the CTA row (one primary pill + optional secondary text link,
  or a list of them rendered in order, **at most 2 actions in all**: it throws at build time
  past 2; `tone="band"` on green) and its mono support line.
  `external` on any action renders a `TrackedExternalLink` (an external secondary opens in a
  new tab)
- **`MonoLabel`** — the 0.14em mono label (green / caption / ink); `as="h2"` for a heading
- **`LedgerList`** — check rows only (the check glyph, text `text-foreground`): 1 column
  `py-3` closed by a `border-b`, or 2 columns `py-4 leading-relaxed`; leaf tone on bands
- **`CheckGlyph`** — the one bullet glyph, exported once and used by `LedgerList` and
  `PriceCard`
- **`StatementRows`** — title-left / body-right hairline rows with 40ms stagger; titles are
  plain row headings (service "How to start" package names included), never links
- **`StepRows`** — the huge-numeral "How it works" ladder
- **`CardGrid`** — vocabulary #5 as a component: link cards on the card surface (below) at
  `p-7 md:p-8`, with the link-card lift. Top to bottom: an optional **icon tile** (`LinkCard.icon`,
  a content key mapped to its Lucide icon in `components/sections/card-icon.tsx`: a `size-11
  rounded-xl bg-secondary text-primary` tile, icon `size-5`; on card hover it fills `bg-primary
  text-primary-foreground`, `transition-colors` 200ms), an optional caption kicker, the
  row-heading title (`mt-6` after the tile), one line, then the **foot**: a hairline (`border-t
  border-border`, 24px above and below) and the card link cue — "Learn more" + arrow, always
  visible; a card's `cta` can relabel it — pinned to the bottom with `mt-auto`, so the hairlines
  and cues in a row line up. Icons: AI Consulting `Compass`, Website Management `Globe`, AI
  Automation `Workflow`, App Development `Smartphone`, WordPress Support `Wrench`, Law Firm SEO &
  GEO `Scale`, Invoice Automation `ReceiptText`, AI Receptionist `PhoneCall`, AI Follow-Up Emails
  `MailCheck`, every resource post `BookOpen`; a post's Related card takes its related page's.
  1–4 columns. One column
  keeps the prose measure (`max-w-3xl`), so a lone card (a post's "Related", a page's one
  "Related reading" post) lines up with the text above it instead of reading as half of a
  two-column grid. The whole card is its one tracked CTA; no filled-primary inside
- **`LinkList`** — the ledger list's linked twin: hairline rows of tracked links, each name in
  the link cue (underline + arrow, visible at rest), 1–3 columns, ≥44px rows (Home "Use Cases"
  strip)
- **`TestimonialGrid`** — vocabulary #8, the multi-quote sibling of the pull-quote; cells align
  to the top (`items-start`), so each name follows its own quote
- **`ProofSections`** — vocabulary #9: labelled proof items from `content/proof.ts`
- **`FaqList`** — the hairline accordion FAQ (eyebrow "FAQ"); plain-text answers feed FAQPage JSON-LD.
  Questions in `text-base md:text-lg font-medium text-foreground`. The trigger takes `gap-4`, so a
  long question keeps 16px clear of the chevron. `split` (inside a split Section) drops its top
  margin on `lg`, so the list starts level with the eyebrow.
  The accordion takes `hiddenUntilFound`, so closed answers stay in the HTML (crawlers read
  them, find-in-page opens them) while the panels still look closed. Any FAQ accordion
  outside the kit sets it too
- **`PostBody`** — a resource post's typed blocks (h2 / p / ul) at the prose measure
- **`PriceCard`** — one offer as a price card (data type `OfferCard` in `content/types.ts`):
  `MonoLabel` eyebrow, `text-2xl` extrabold name, `text-4xl md:text-5xl` black price (+ optional
  struck-through `was` in a `<del>`, `text-xl` bold caption, after an `sr-only` "Regular price "
  label) and an optional caption mono unit (none on a free offer); the parts are separated by
  spaces, so the row's text reads "$495 Regular price $750 CAD" (the flex gaps set the look;
  the /audit/ hero price row follows the same rule), a hairline, the intro
  line (`text-sm`), the bullets as **check rows** (`PriceBullets`: each a `border-t
  border-border py-2.5 text-sm` row, the check glyph first, leaf on `deep`; a bold `lead` in
  `font-medium text-foreground` before its text), then optional "Best for:", guarantee, `text-xs
  text-caption` notes, with the one CTA (`size="xl"` full-width pill, filled or outline) pinned to
  the foot by `mt-auto`. Not a link: no hover lift. **Tones, from quiet to premium**
  (`priceCardTones`), all `rounded-2xl p-7`:

  | Tone | Surface | Used for |
  |---|---|---|
  | `quiet` | `bg-transparent ring-1 ring-border`, no shadow: the cream page shows through | Workflow Fit Check |
  | `highlight` | `bg-card ring-2 ring-primary/40 shadow-lg shadow-foreground/5`, green eyebrow | Workflow-First AI Audit (the featured card, the filled pill); the /audit hero price card |
  | `deep` | `band-green bg-background`, `shadow-xl shadow-foreground/10` on a wrapper outside the band (inside it `foreground` is cream); leaf checks, a filled pill takes `hover:text-inkdeep` | Build With You on /ai-starters and Build For You on AI Automation, both with the filled cream pill |

  `h-full`. **`PriceLadder`** sets a row (/ai-starters): three across from `lg`
  (`lg:grid-cols-3`, 40ms stagger), stepping up left to right — `lg:mt-16` / `lg:mt-8` /
  `lg:mt-0` on the stretched cells, so each card's top steps and its foot and button stay
  level; below `lg` they stack with no offsets. A lone card (a service page's "How to start")
  is wrapped in `<Reveal>` by its caller, `max-w-xl`. At most one filled pill per surface; a `deep` card is a band, its own surface, so its cream pill doesn't count against the featured card's green one (the ladder's buttons climb with it: outline, green, cream)

A section shape the kit can't express is a design decision: extend the kit and this file in
the same commit. One-off compositions (page heroes with portraits, the services
ladder) may stay hand-built from the recipes, but still use `MonoLabel`/`CtaRow` for their parts.

### `components/ui/` — shadcn/Base-UI primitives
Button, Card, Badge, Input, Textarea, Label, Select, Accordion, Sheet, Separator,
NavigationMenu, Avatar. Restyle via `variant`/`size` props only — never inline-restyle
their colors.

**Button idioms:**
- Primary page CTA: `<Button size="xl" className="rounded-full">` (+ `hover:text-inkdeep` on green bands)
- Icon-only touch chrome (mobile menu button, sheet Close): `size="icon-touch"` — a 44px tap
  target, the icon stays 16px
- Buttons that navigate: `render={<TrackedLink href=… event=… eventProps=…/>}`
  — every CTA is tracked; no bare `<a>` for CTAs.
- Icon: Lucide, `data-icon="inline-end"` (e.g. `ArrowRight`).
- **One primary button per section.** Secondary action = `linkGreen`/`linkLeaf` text link.
- **At most 2 CTAs per section** (a CTA = a button or a CTA-styled text link; inline prose links
  and the one CTA per card in a card grid don't count). The second only when it is relevant to
  this page's reader; if it isn't, the section has 1. Website and app pages (their use cases and
  posts too) show "Book a free call" alone in the hero; fit-check-led pages pair "Free Fit Check"
  with "Or book a free call". Service "How to start" keeps one CTA.
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
- `SiteHeader` — `Services ▾ · Use Cases ▾ · AI Starters · Resources · About · [Contact us]`,
  built from `content/navigation.ts`. Dropdowns are `NavigationMenuTrigger` + `NavigationMenuContent`
  (`w-72 p-2` panel on the popover surface): one row per page, sub-links indented `pl-6` in body
  ink (AI Consulting → Fit Check, AI Workflow Audit), then the "All …" overview link after a
  hairline. Triggers share the top-level link recipe. Every top-level item (both triggers, AI
  Starters, Resources, About) shows the active underline anywhere in its section: its own page
  and every page under it (Resources on a post). `aria-current="page"` stays on the exact page
  only. Each `NavigationMenuContent` is `keepMounted`, so the dropdown links are in
  the server HTML (rendered `hidden` until a trigger opens them). **Contact us** is the
  header's one `size="lg"` rounded-full primary (the slot Free Fit Check had until 2026-11).
  Mobile sheet: the **Contact us** pill first (`size="xl"`, full width), then the five
  top-level rows (Services, Use Cases, AI Starters, Resources, About; ≥44px, `sheetRow`). The
  current page's row takes the `bg-muted` wash; a top-level row in the current section takes ink
  text and the desktop's active underline on its label (`sheetSectionMark`). The menu button
  and the sheet's Close are `size="icon-touch"` (44×44 around the 16px icon); the menu button's
  `-mr-1.5` and Close's `top-1 right-1` keep the icons where the 32px / 28px buttons had them.
  Services and Use Cases are Base UI `Collapsible` groups, closed each time the sheet opens:
  the trigger is a row with a `ChevronDown` that turns 180° when open (`aria-expanded` /
  `aria-controls` from the primitive), and the panel eases its height (200ms, system curve,
  `motion-reduce:transition-none`) to the group's pages indented `pl-7` (AI Consulting's
  sub-links `pl-11`) with the "All …" link last. Closed, everything fits the first screen at
  375×667. The nav scrolls (`overflow-y-auto`) and starts below the close button (`mt-12`), so
  rows never scroll under it. The desktop nav shows from `lg`; below that (tablets included)
  the sheet takes over.
- `SiteFooter` — wordmark (links home, `min-h-11` hit area) + social row; then the site map: four link columns
  (Services, Use Cases, Resources, Company — 2-up on mobile, 4-up from `md`) under ink
  `MonoLabel` headings, links in `footerLinkClass`; then the legal row (Privacy, Cookies,
  Terms, Consent Preferences). Every page in the tree is listed here.
- `ContactForm` — the short form: Name + Email (side by side from `sm`), optional Phone or
  WhatsApp, "What's it about?" topic chips (pick any; checkbox pills with the Fit Check's states,
  `min-h-11`), Message. Labels share the Fit Check's mono label; errors show inline in
  `text-destructive` and the first invalid field takes focus. `?interest=` ticks a topic
  (older values such as `audit`, `build-with-you`, `build-for-you` map onto the new topics).
- `FitCheck`
- `components/contact/` — the contact page's parts, with `content/contact.ts` as the one source
  for email, phone, WhatsApp link, city, reach and languages: `KimCard` (round `kim-avatar.jpg`,
  name, role · city, optional quiet caption line, optional LinkedIn mark after the name linking
  Kim's personal profile; X and Facebook stay in the footer only), `ChannelTiles` (WhatsApp ·
  Call or text · Email, one tap each, `contact_channel_clicked`), `ContactTabs` (a two-option pill switch, "Send a
  message" | "Book a free 30-min call", short labels and no icons below `sm`; the booking panel
  shows the call's three ticks above `BookingWidget`). /contact is a `<Band hero="page">` holding
  Kim and the channels (`pb-12` on phones so the switch starts near the first screen), then the
  switch on cream in a `max-w-4xl` column.
- `BookingWidget` — Cal.com inline embed (`@calcom/embed-react`, event
  `kim-wong/free-30-min-discovery-call`, month view). Its colours are the site tokens, read from
  `:root` at runtime and passed as Cal.com CSS variables. Until Cal.com fires `linkReady`, a
  card-surface loading panel holds the calendar's place with "Loading available times…" and the
  new-tab link near its top (after 6 s: "Still loading…"; on `linkFailed`: "The calendar didn't
  load."), so the way out is never below the fold.
- `ShowcaseProducts` — the "Our product" proof cards: each a link card (the card surface + lift,
  `p-6`) opening the product in a new tab; the product name is an `h3` that turns green on hover
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
2. **Standard section (cream)** — `<Section eyebrow=… title=… lead=…>` (+ `flush` after a band):
   every section carries eyebrow + h2 (+ optional lead); an eyebrow alone is not a heading. Per-page
   h2s live in `content/` (`Service.headings`, `UseCase.headings`, `Overview.groupTitles`); the
   ones every page shares in `content/section-headings.ts` → content (2-col `grid gap-12 md:grid-cols-2`, `<LedgerList>`, `<StatementRows>`,
   `<StepRows>`, or prose) → optional closing `bigLine`.
3. **Featured band (mid-page)** — `<Band id=… eyebrow=… title=… depth=…>` (id gives `scroll-mt-16`).
4. **Interlude** — `<Interlude>` between section groups; quiet section follows.
5. **Card grid** — every card on cream sits on **the card surface** (`cardSurface` in
   `components/sections/card-surface.ts`): `rounded-2xl bg-card ring-1 ring-border shadow-sm
   shadow-foreground/5`. A card that is a link adds **the lift** (`cardLift`): `hover:-translate-y-1
   hover:shadow-xl hover:shadow-foreground/5 hover:ring-primary/40`, translate and shadow over
   200ms on the system curve, `motion-reduce:` no lift; it keeps the focus ring (`ring-3
   ring-ring/50`). Users: `<CardGrid>` link cards, `ShowcaseProducts` (both with the lift), the
   /contact email card (resting surface only). Green card variant = `band-green … rounded-2xl
   bg-background p-7`. Price cards are `<PriceCard>`, whose tones are their own surfaces on the
   same radius (its `deep` tone is this green variant).
6. **Closing CTA band** — `<Band eyebrow=… title=… depth=…>` (home adds `breathe`): mono eyebrow ("Next step" on Home, /audit and every template page; /ai-starters keeps its own), feature `h2`,
   short lead, `<CtaRow tone="band">` with one primary (+ at most one relevant secondary text
   link — e.g. "Or book a free call" on fit-check-led pages, the link back to Website Management
   on its use cases), `<Support>`. **Closing bands are left-aligned on every page** (home included, 2026-08-10).
7. **Pull-quote (testimonial)** — `<Section eyebrow=… title=…>` → `<figure>` with the
   quote in the **big-line recipe** inside a `<blockquote>`, then a hairline `<figcaption>`
   (`border-t border-border pt-5`): name in `font-medium text-foreground` + role as
   `<MonoLabel tone="caption">`. Real quotes only — never fabricate. One short quote per
   section. Longer or several quotes use #8.
8. **Testimonial grid** — `<Section staggered eyebrow=… title=…>` (service pages: Home's title,
   "What people say about working with Kim.") → `<TestimonialGrid>`: each quote a
   `<figure>` on a hairline (`border-t border-border pt-7`), paragraphs verbatim in body type
   (`leading-relaxed text-foreground`, curly quotes added around the whole quote), then name +
   caption in caption mono ("From LinkedIn", or company and role when there is no public review
   source), right under its own quote (cells align to the top; no name pinned to the foot of a
   row; no fixed heights, so short excerpts stay short). Two columns for 2+ quotes; one quote
   keeps `max-w-3xl`. The same component on Home (every testimonial) and service pages (their
   own). Public quotes only, verbatim from `content/testimonials.ts`; never on About.
9. **Proof item** — `<ProofSections>`: one cream `<Section>` per item, eyebrow = its label
   (Client build · Track record · Our product · Demo · Capability; never "Case Study"),
   h2 = title, lead, then optional before → after delta row (the arrow wraps with the "after"
   pill, never alone at a line end), 3-up stat row (card-h3 numerals
   in `text-primary`), mono footnote, row-heading pull-line. "Our product" items group into one
   Section of `ShowcaseProducts` cards (product names `h3` under the shared h2).
10. **Link cards / link list** — `<CardGrid>` for pages with a line each (services, use cases,
    posts), `<LinkList>` for a bare strip of names. Every card section has a heading. The
    overview pages with one card group (/services, /resources) set the cards straight under the
    page header (`flush`, no top padding, no visible header) with an `sr-only` h2
    (`Overview.cardsLabel`); /use-cases gives each group its service name as the eyebrow and an
    h2 from `Overview.groupTitles`. Service and use-case pages carry a "Related reading" section
    (`RelatedReading` in `components/templates/`: standard section, eyebrow + h2 "Related
    questions, answered.", `<CardGrid>` of post name + cardLine) just before the FAQ, listing
    the posts whose `related` is that page (a service page also lists the posts whose `related`
    is one of its use cases, each post once); no post, no section.
11. **Short answer panel** — a resource post's answer up front: a `rounded-2xl bg-secondary p-7
    md:p-10` panel (`max-w-3xl`, the prose measure) inside a standard section, headed by
    `<MonoLabel as="h2">Short answer</MonoLabel>`, the answer in `text-lg md:text-xl font-medium
    leading-relaxed text-foreground` (`mt-4`). The only section whose heading is a mono label.
12. **FAQ split** — every FAQ section (eyebrow "FAQ"): `<Section layout="split" staggered eyebrow=…
    title=… lead=…>` → `<FaqList split>`. The header sticks in the left five columns on `lg`
    while the questions scroll beside it (service pages, use-case pages, /ai-starters).

Page templates (`components/templates/`) fix the section order for service, use-case,
resource-post and overview pages; copy comes from `content/`.

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
- **Micro-interactions:** `transition-colors`/`transition-all` at 150–300ms. Link cards lift 4px
  on hover (`cardLift`; `translate` moves the card without reflowing anything). Link-cue arrows
  (`<LinkCueArrow>`) are always visible and only nudge `group-hover:translate-x-1`
  (`motion-reduce:` no nudge). Nothing a reader needs is revealed on hover only — touch never
  sees it.
- **Reduced motion:** `.reveal` is forced visible in CSS; every custom micro-interaction
  needs its `motion-reduce:` fallback.
- Transform/opacity only — **no layout-shifting hovers** (no scale that reflows; `translate-y-px`
  on button active and the link-card lift, `cardLift`, are the sanctioned translates).

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
- ❌ More than 2 CTAs in a section, or a second one that isn't relevant to the page's reader
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
- [ ] One primary CTA per section, at most 2 CTAs in all; CTAs via `TrackedLink` with event props
- [ ] Focus states visible (ring tokens); contrast ≥ 4.5:1 both on cream and on green
- [ ] Every link shows it is a link without hover (touch); touch targets ≥24px, CTAs ≥44px
- [ ] Responsive at 375 / 768 / 1024 / 1440; no horizontal scroll on mobile
- [ ] No content hidden behind the fixed header (`scroll-mt-16` on anchor targets — the kit
      adds it whenever a `Band`/`Section` gets an `id`)

---

## Known drift — do NOT copy these (fix when the file is next open for edits)

- `/ai-starters` still re-types the P2 header that `<PageHeader>` now renders: its h1 keeps
  `max-w-[11em]`, which `PageHeader` doesn't set, so a swap would re-wrap the headline.
  Recompose it when that width is decided.

## Changelog

- **2026-11-25** — Contact form and booking. `ContactForm`: "What you're after" (a dropdown of the
  old audit / Build With You / Build For You offers) becomes "What can I help with?", six choice
  cards for the current offer (Website Management, AI Automation, AI Workflow Audit, Build With
  You, App Development, Not sure yet; pick any); team size uses the Fit Check's bands as pills;
  the dropdowns are gone; message comes before contact details; inline errors replace the
  browser's bubbles. `?interest=` takes the new keys, and `build-for-you` maps to AI Automation.
  `BookingWidget`: Calendly → Cal.com (`kim-wong/30min`), in the site's colours. `Input` and
  `Textarea` placeholders take `text-caption` (they matched body ink and read as typed values).
- **2026-11-25** — /contact rebuilt after Kim's review ("too much on the left and the right, the
  descriptions too long"): six client personas reviewed the old page, then three layouts, then B
  vs a revised C; all six picked the revised C (green band with Kim and the one-tap channels,
  then the message / booking switch). The three-step form and "What happens after you send"
  are gone; the form is name, email, optional phone, topic chips, message. Booking moves to the
  `free-30-min-discovery-call` event with a loading panel.
- **2026-11-25** — /contact socials: X and Facebook leave the band (a hundred-odd followers each;
  the footer keeps them). Kim's personal LinkedIn moves to a mark after her name in `KimCard`;
  four of six client personas picked that over a fourth tile or a "Prefer LinkedIn?" line, and it
  keeps the switch on a 390px phone's first screen.
- **2026-11-21** — Round-7 review fixes. The `deep` price card always takes the filled cream pill (Build With You on /ai-starters was a faint outline, weaker than the cards below it); a deep card counts as its own surface. /about's portrait uses Home's crop (`aspect-[4/5] object-cover object-[center_15%]`), so both pages frame the photo the same way. The contact form's submit is a `rounded-full` pill like every other page CTA. Home's Fit Check band: on phones the outcome list follows the sentence that introduces it.
- **2026-11-21** — Round-6 review fixes. Every closing band carries a mono eyebrow ("Next step"; /ai-starters keeps "Start with the workflow"), like every other section. `BookingWidget`: the Calendly iframe is 1180px tall at every width (the 720px desktop height cut the month off above the bookable dates; Calendly no longer switches to two columns at ~1100px) and then follows the height Calendly reports (`calendly.page_height`, floor 640px).
- **2026-11-21** — FAQ sections are labelled "FAQ" (was "Questions") on every page: service and use-case templates and /ai-starters. Kim's call.
- **2026-11-20** — Look and feel round 1. Headings: every section with an eyebrow now has a
  section h2 under it (eyebrow → h2 → optional lead, Home's "Pain points" format); per-page
  strings in `Service.headings` / `UseCase.headings` / `Overview.groupTitles`, shared ones in
  `content/section-headings.ts`. `Section` loses `eyebrowAs` (no section is headed by its
  eyebrow any more) and gains `layout="split"`; its `lead` is `text-lg` (was body size), the
  lead recipe above. Every FAQ section is split, `FaqList` questions are `md:text-lg`. The
  resource post's Short answer is a callout panel (vocabulary #11). Service "Sound familiar?" is
  now the "Pain points" eyebrow, as on Home. /services and /resources set their cards straight
  under the header (sr-only h2). The "Our product" proof group takes an h2; product names are h3.
  Bullets: every list row is a check row; `LedgerList` loses its square marker and `marker` prop,
  its text is ink in every variant, and the check glyph is one export (`CheckGlyph`).
  The box: one card surface (`cardSurface`: ring, resting shadow) and one link-card lift
  (`cardLift`) in `components/sections/card-surface.ts`; `CardGrid` cards take both at `p-7
  md:p-8`, an icon tile from `LinkCard.icon` (`Service.icon` / `UseCase.icon` / `resourceIcon`,
  mapped in `card-icon.tsx`) and a hairline foot pinned to the bottom. `ShowcaseProducts` cards
  and the /contact email card move onto the same surface (`ShowcaseProducts` drops the `Card`
  primitive and its 2px lift).
  Pricing ladder: `PriceCard` tones are `quiet` (new) / `highlight` (now with a soft shadow) /
  `deep` (with the deepest shadow); `plain` is gone (nothing used it after Build With You moved to
  `deep`). The price is `md:text-5xl`, the bullets are check rows (`PriceBullets`). `PriceLadder`
  renders the /ai-starters staircase. The /audit hero price card takes the `highlight` surface
  (it had an arbitrary rgba shadow) and the same check-row bullets (it used Lucide's `Check`).
  CTAs: at most 2 per section, the second only when relevant (Buttons rule; `CtaRow` throws past
  2). Website and app pages, their use cases and posts show "Book a free call" alone in the hero
  ("Or see where AI fits your work" is gone, with `fitCheckLinkCta`); service heroes drop "See AI
  Starters"; fit-check-led use cases close with "Free Fit Check" + "Or book a free call" and no
  parent-service link. Service "How to start" package names are plain row headings: the row
  `link` on `StatementRows`, the row-heading link recipe, `packageLinkCta` and `PackageHref` are
  removed.

- **2026-11-20** — Round-4 review fixes. Price rows read as text: `PriceCard` (and the /audit/
  hero price) separate price, struck price and unit with spaces, put the struck price in a
  `<del>` after an `sr-only` "Regular price" label, and `OfferCard.unit` is optional (the
  Fit Check card: eyebrow "Free · 3 min", "$0", no unit). The /ai-starters cards lose their
  per-card "AI Consulting →" back-links (and `PriceCard` its `serviceLink` slot); one line under
  the grid links AI Consulting and the AI Automation page as inline prose links (`linkInline`).
  Resource-post bylines link "Kim Wong" to /about/ (`linkInline`, `author_link_clicked`).
  A service page's "Related reading" also lists the posts whose related page is one of its use
  cases (Website Management: the GEO and WordPress SEO posts).
- **2026-11-20** — Kim's review round 1. /ai-packages renamed to /ai-starters ("AI Starters"
  in the header, footer and CTAs). The /ai-starters price cards are one kit component,
  `PriceCard` (`components/sections/price-card.tsx`, data type `OfferCard`), rendered as before;
  the grid's reveal stagger is 40ms (was 60ms, outside the 30–50ms rule). Its FAQ now
  renders through `FaqList` (the answers left are plain text); the Known-drift note keeps only
  the page header. `TestimonialGrid`'s `role` prop is now `caption` (quotes are short excerpts
  captioned "From LinkedIn"). Build For You moved to AI Automation: a service's `howToStart.offer` renders
  one `PriceCard` (`max-w-xl`, left-aligned) under the "How to start" rows, in place of the "See
  AI Starters" button, which also leaves that page's hero.

- **2026-11-20** — Visual QA round-2 fixes. The link cue is one kit recipe
  (`components/sections/link-cue.tsx`: `linkCueLabel` + `LinkCueArrow`), used by `CardGrid`,
  `LinkList` and Home's "Two ways to work together" rows; `LinkList` rows and the "Two ways"
  headings now show the underline and arrow at rest (they hid the arrow until hover, which touch
  never sees). Header: AI Starters, Resources and About are active anywhere in their section, like
  the dropdown triggers; in the mobile sheet a top-level row in the current section takes the
  active underline. `Button` gains `size="icon-touch"` (44px); the menu button and the sheet's
  Close use it (were 32px and 28px).
- **2026-11-20** — SEO round-2: service and use-case pages add a "Related reading" section
  before "Questions" (a standard section with a `<CardGrid>` of the resource posts whose
  `related` is that page, tracked as `resource_card_clicked`). No new shape: vocabulary #10.
- **2026-11-20** — Visual QA round-1 fixes. `CardGrid` cards show a link cue at rest ("Learn
  more" in linkGreen's look + a primary arrow that nudges on hover; it replaces the hover-only
  arrow touch never saw); one column is now `max-w-3xl` (was `max-w-xl`). Mobile sheet: Contact
  us first, Services and Use Cases collapse (closed by default), the scroll area starts below
  the close button. `TestimonialGrid` cells align to the top, names follow their quotes.
  `ProofSections` delta row wraps the arrow with its "after" pill. `FaqList` (and /ai-starters)
  trigger `gap-4`. Touch targets: row-heading links `inline-block`, /ai-starters card back-links
  `min-h-6`, footer wordmark `min-h-11`; the touch-target rule and a checklist line added.
  Overview pages' single card section takes an eyebrow from `Overview.cardsLabel`.
- **2026-11-20** — SEO round-1 fixes. FAQ accordions (`FaqList` and /ai-starters) set
  `hiddenUntilFound`: every answer is in the server HTML, panels still look closed. Header
  dropdowns are `keepMounted`, so their links are in the server HTML too (the mobile sheet's
  links are client-only, since Base UI portals don't render on the server). `MonoLabel` takes
  `as="h2"` and `Section` takes `eyebrowAs="h2"`: eyebrow-only sections on the service,
  use-case, resource-post and overview templates now head their section with an h2 in the
  same mono-label look. `StatementRows` rows take an optional `link` (row-heading link
  recipe above); service "How to start" package lines carry an `href` (fit check, audit, AI
  packages) and link their package names with the event each page already uses. Resource
  posts show "By Kim Wong" before the date in the header's caption mono label.
- **2026-11-20** — `CtaRow` `secondary` takes a list as well as one link, so a closing band
  can carry two text links beside its one primary (Website Management use cases: "Book a
  free call" and the parent-service link). Still one primary per section. Use-case pages
  render an optional extra standard section (eyebrow, section h2, paragraphs) after "How we
  set it up" — no new shape.
- **2026-11-20** — Site restructure (branch `site/restructure-2026-11`): section kit extended
  with `PageHeader`, `CardGrid`, `LinkList`, `TestimonialGrid`, `ProofSections`, `FaqList`,
  `PostBody`, `Band hero="page"` and external secondary links on `CtaRow`; vocabulary #8–#10
  (testimonial grid, proof item, link cards / link list) and the row-heading type row
  registered. `ShowcaseProducts` now takes its products from `content/proof.ts`. The
  `ui/navigation-menu` primitive's popup motion moved onto the system curve and 300ms (it
  shipped with `cubic-bezier(0.22,1,0.36,1)` at 350ms). /showcase is gone; its items are
  proof on the use-case and service pages. Header: Services and Use Cases dropdowns, AI
  Starters / Resources / About links, Contact us replaces Free Fit Check as the highlighted
  button; mobile sheet grouped by section and used below `lg` (was `md`). Footer: site-map
  columns above the legal row.
- **2026-08-18** — Mobile nav sheet: the wordmark is out of the sheet header (the site header
  behind the sheet already shows it); the Brand marks table above no longer lists the sheet as a
  wordmark placement. The empty `SheetHeader` went with it — the sheet's `sr-only` title is now a
  direct child of `SheetContent`, and the nav carries an explicit `pt-14` so the top offset clears
  the close button instead of relying on a spacer div.
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

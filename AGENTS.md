<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:design-system-rules -->
# Design system — read before ANY UI work

`design-system/MASTER.md` is the design constitution. Read it before creating or editing any
page, section, component, or style. Values source of truth: `app/globals.css` (`@theme`/`:root`).

Hard rules (full detail + recipes in MASTER.md):

1. **Tokens only.** No hex or arbitrary color values in TSX. Colors via token classes
   (`bg-primary`, `text-caption`, `border-border`, …). No new greens — darken with `inkdeep`.
2. **Compose, don't invent.** Sections are built from the kit in `components/sections/`
   (`Band`, `Section`, `CtaRow`+`Support`, `MonoLabel`, `LedgerList`, `StatementRows`,
   `StepRows`) per the section vocabulary in MASTER.md. Never re-type a recipe the kit
   renders. A new section shape or type size is a design decision: extend the kit and
   MASTER.md in the same PR.
3. **Type scale is closed.** Headings copy a recipe from MASTER.md's type-scale table exactly
   (the kit renders them). Never write a new `clamp()`, tracking, or font.
4. **Bands re-theme themselves.** Green sections = `<Band>` (`band-green` on the `<section>`);
   never hand-color content inside a band. Leaf (`brand-mint`) never appears on cream.
5. **Motion is one system.** `<Reveal>` for scroll reveals (30–50ms stagger), the single easing
   curve, 150–300ms micro-transitions, `motion-reduce:` fallbacks. No new curves/durations.
6. **CTAs:** one primary `<Button size="xl" className="rounded-full">` per section, always via
   `TrackedLink` with event props; secondary = text link — both via `<CtaRow>`.
7. Run MASTER.md's pre-delivery checklist before presenting UI work.
8. `design-system/kivov-digital-react-pilot/MASTER.md` is superseded — never read it as the design source.
<!-- END:design-system-rules -->

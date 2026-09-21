# Design Brief

## Direction

**Deep Signal** — a dark-first navy system for Robi Care where clinical authority comes from a #0D1B2A canvas, condensed uppercase headlines, and one electric cyan accent that marks every decisive action.

## Tone

Industrial-precision editorial — high-contrast, confident, and instrument-panel-like, with generous spacing so the dark surfaces read engineered rather than empty.

## Differentiation

A clinical platform that feels like a control room: deep navy layered in three deliberate steps (#0A1628 → #0D1B2A → #16293D), heavy condensed uppercase headlines, and cyan used as a signal light rather than decoration.

## Color Palette

| Token      | OKLCH                | Hex       | Role                                         |
| ---------- | -------------------- | --------- | -------------------------------------------- |
| background | 0.2220 0.0355 247.14 | #0D1B2A   | Page canvas (dark navy)                      |
| deep-green | 0.1807 0.0338 249.16 | #0A1628   | Hero scrim, CTA bands, footer (never black)  |
| card       | 0.2863 0.0435 246.75 | #16293D   | Cards, nav, raised panels (lighter than page)|
| foreground | 0.9410 0.0093 247.86 | #E8EEF5   | Body text and headings (AA+ on navy)         |
| primary    | 0.7890 0.1377 211.53 | #22D3EE   | Cyan accent: buttons, links, active nav      |
| secondary  | 0.2863 0.0435 246.75 | #16293D   | Raised navy surface for secondary buttons    |
| muted      | 0.2570 0.0380 247.00 | #12243A   | Alternating section band                     |
| accent     | 0.7890 0.1377 211.53 | #22D3EE   | Cyan eyebrow rules and markers               |
| border     | 0.3450 0.0460 246.20 | #1E3A52   | Thin subtle card and divider borders         |
| destructive| 0.6450 0.2154 16.44  | #F43F5E   | Alert rose: form errors and validation       |

## Typography

- Display: **Space Grotesk** — bold condensed sans headlines; uppercase, tight tracking, heavy weight.
- Body: **Satoshi** — paragraphs, nav, labels, UI; light gray on navy for high legibility.
- Mono: **JetBrains Mono** — pricing figures, unit rates, spec values, restyled for dark.
- Scale: hero `text-5xl md:text-7xl font-bold uppercase tracking-tight`, h2 `text-3xl md:text-5xl font-bold uppercase tracking-tight`, label `text-xs font-bold tracking-[0.2em] uppercase`, body `text-base md:text-lg leading-relaxed`.

## Elevation & Depth

Depth is layered navy, not glow: three fixed surface steps (#0A1628 → #0D1B2A → #16293D) plus deep-navy `shadow-subtle` / `shadow-elevated` and a 1px `shadow-header` rule under the fixed nav; cyan never becomes a neon glow.

## Structural Zones

| Zone    | Background              | Border                 | Notes                                                          |
| ------- | ----------------------- | ---------------------- | -------------------------------------------------------------- |
| Header  | `nav-surface` #0A1628/88 + blur | `border-b` hairline | Fixed, never scrolls away; active link cyan                    |
| Content | `bg-canvas` #0D1B2A     | —                      | Alternates with `bg-section-alt` #12243A bands every other section |
| CTA band| `bg-deep` #0A1628       | —                      | Closing band; cyan primary + cyan-outline secondary            |
| Footer  | `bg-deep` #0A1628       | `border-t` hairline    | Light text on deep navy; cyan link hover                       |

## Spacing & Rhythm

Sections use `py-20 md:py-28` with `container` gutters; headings sit `mb-4` above body copy; card grids use `gap-6 md:gap-8`; micro-spacing is a 4px base with 8/12/16/24 steps.

## Component Patterns

- Buttons: `.btn-primary` = solid `bg-primary` cyan fill, `text-primary-foreground` navy label, uppercase bold, `rounded-full`; hover `bg-accent/90` + `shadow-elevated`. `.btn-secondary` = transparent, `border border-primary`, `text-primary` cyan, uppercase bold; hover `bg-primary/10`. Both carry `focus-visible:ring-2 ring-ring ring-offset-background`.
- Cards: `rounded-xl bg-card border-hairline shadow-subtle`, hover to `shadow-elevated` with `transition-smooth`; featured tier adds `ring-2 ring-primary`.
- Badges: small `rounded-full` pills in `bg-primary/15` with `text-primary` for eyebrow labels and status markers.
- Inputs: `bg-card` navy surface, `border-hairline`, `text-foreground`, cyan `ring` on focus.

## Motion

- Entrance: `animate-fade-up` at 0.6s cubic-bezier(0.4,0,0.2,1), applied once per section on load.
- Hover: `transition-smooth` (0.3s) for color, border, and shadow on buttons, cards, and nav links.
- Decorative: `animate-pulse-accent` for status dots and `animate-scan-line` for diagram connectors — quiet, instrument-like, never bouncy.

## Constraints

- Dark mode is the only presentation: `#0D1B2A` is the page canvas, `#0A1628` marks deeper bands, and pure black is never used. There is no theme toggle.
- Cyan #22D3EE is the single accent and replaces all prior gold and green; it is never a background wash, only fills, rules, text, and rings.
- Never obscure a photograph with an overlay, and never place body text over a busy part of a photo; captions live in solid navy panels beside or below images.
- Text over navy must meet WCAG AA; body text stays at or above 4.5:1 (`#E8EEF5` on `#0D1B2A` ≈ 15:1).
- Page copy, pricing figures, usage-table data, and diagram structure are unchanged by this restyle.
- No invented certifications, hosting regions, or compliance claims — use `[certification/region to be confirmed]` placeholders.

## Signature Detail

A 2.5rem cyan rule drawn under every section eyebrow label — a signal-light tick that turns a generic uppercase label into a deliberate, instrument-panel signature.

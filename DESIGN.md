# Almo’min · المؤمن: Design System

**Direction: "Illuminated manuscript."** Deep emerald night, gold leaf and ivory paper,
like a hand-bound Qur'anic manuscript. Premium and calm for the parents who buy, with
warmth for the children who read. Depth comes from real 3D books, light and
parallax, not from glass, neon or gradients.

> Note: UXKIN (real-site references) was not connected, so this direction comes from
> the brand, the audience (Muslim parents buying for children) and the book
> catalogue, not from reference sites.

## Color

| Token | Light (paper) | Dark (night) | Role |
|---|---|---|---|
| `--ink` | `#0B2E27` | `#F3ECDC` | Main text, ink logo |
| `--ink-2` | `#3D554E` | `#B9C3B9` | Secondary text |
| `--paper` | `#F6F0E3` | `#071F1A` | Page background |
| `--paper-2` | `#EDE4D1` | `#0B2E27` | Raised sections, cards |
| `--line` | `#D9CDB2` | `#1E4A40` | Borders, hairlines |
| `--emerald` | `#0B2E27` | `#0B2E27` | Hero, footer, "night" bands (same in both) |
| `--gold` | `#B8902F` | `#D4AF5A` | Primary: buttons, links, ornaments |
| `--gold-hi` | `#F6E7B4` | `#F6E7B4` | Gold highlight (gradients on logo/3D only) |
| `--rose` | `#B5523B` | `#E08A6E` | Single accent: "New" or "Sale" tags only |
| `--ok` / `--warn` / `--err` | `#2F7A4B` / `#B7791F` / `#B23A30` | `#5FBF85` / `#E0A84A` / `#E66A5E` | Status |

Gold text on paper is used at **≥ 24px only**. Body links use `--ink` with a gold underline.
On emerald, gold (#D4AF5A) passes 7.5:1.

## Typography

- **Display:** *Cormorant Garamond* 500/600 for headings and prices.
- **Body / UI:** *Manrope* 400/500/700.
- **Urdu:** *Noto Nastaliq Urdu* 400/700 for Urdu headings and book titles (line-height 2.0).

| Step | Size | Line height | Use |
|---|---|---|---|
| display | clamp(48px, 7vw, 104px) | 0.95 | Hero |
| h1 | clamp(38px, 4.5vw, 64px) | 1.05 | Section titles |
| h2 | 32px | 1.15 | Sub-sections |
| h3 | 22px | 1.3 | Card titles |
| body | 17px | 1.65 | Paragraphs (max 68ch) |
| small | 14px | 1.5 | Meta, labels |
| eyebrow | 12px, 0.22em tracking, caps | 1.2 | Section labels |

## Spacing and layout

8px scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section padding is 128px on desktop and 72px on
mobile. Content width is 1240px with 24px gutters (16px under 600px).

## Shape and depth

- Radius: 2px (books, inputs), 14px (cards), 999px (pills). Arches (`mihrab` shape) frame imagery.
- Shadow 1: `0 1px 2px rgb(11 46 39 / .08), 0 8px 24px -8px rgb(11 46 39 / .18)` (cards).
- Shadow 2: `0 30px 60px -20px rgb(0 0 0 / .45)` (3D books only).

## Components

- **Button primary:** gold fill, emerald text, 999px radius, 52px tall. Hover lifts 2px and brightens; focus shows a 3px gold outline with a 3px offset; disabled is 40% opacity.
- **Button secondary:** 1px gold outline with ink text (gold text on emerald).
- **Quiet link:** ink text with a 1px gold underline that thickens on hover.
- **Book card:** a CSS 3D book (cover, spine and page edge) that tilts toward the pointer, followed by the title, Urdu title (optional), publisher pill, age and price.
- **Category tile:** an arch-framed panel with an 8-point star watermark.
- **Nav:** logo on the left, links, and a WhatsApp order button. Sticky, with a paper blur after scroll.
- **Footer:** emerald, gold emblem, columns.

## Imagery and ornament

- Book covers are the photography. They are always shown as 3D objects, never flat thumbnails.
- Ornament set: 8-point star (Rub el Hizb), mihrab arch, thin gold hairlines with a diamond.
- Icons: inline SVG at 1.5px stroke (Lucide style). No emoji.
- Motion: slow and weighty (600–900ms, ease-out-expo). All of it is disabled under `prefers-reduced-motion`.

## Logo

The brand uses **the owner's own logo**: an arch-shaped Almo’min calligraphy mark in teal and navy with a terracotta star and diamond, and the "Almo’min" wordmark. The source is `brand/your-logo-original.jpg`.

Web versions are in `assets/own/`, with transparent backgrounds:
- `mark-color.png` / `word-color.png` / `full-color.png`: original colours, for light backgrounds
- `mark-gold.png` / `word-gold.png` / `full-gold.png`: gold with copper accents, for emerald backgrounds
- `mark-paths.json`: a vector trace of the mark, used for the 3D gold logo in the hero
- `favicon.png`: the mark in gold on emerald

The earlier Noto Nastaliq logo set is kept in `brand/` and `_versions/original-logo/` as an alternative.

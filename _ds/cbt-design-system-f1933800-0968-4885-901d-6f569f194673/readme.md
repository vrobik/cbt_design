# CBT Design System

Fundația vizuală pentru **Comunitatea Basarabenilor din Timișoara (CBT)** — o asociație non-profit care adună basarabenii (oameni veniți din Republica Moldova) stabiliți în Timișoara, România. Sistemul susține site-ul comunității (`basarabenitm.ro`): mobile-first, pregătit bilingv (RO + RU), construit pentru a fi distribuit pe rețele sociale.

> The whole system, prose and product copy, is authored in **Romanian** — that is the brand's language and it must stay that way. English appears only in code comments and this readme's structural headings.

## Surse / Sources
- **`DesignSystem/cbt-design-system.html`** (local folder, read-only) — a hand-built single-page design-system reference (tokens, colors, type, components, layout rules). This project is the compiled, componentised version of it. Every token value here is lifted verbatim from that file.
- **`uploads/Propunere site CBT.md`** — the client brief for the website (page structure, homepage priorities, join form, SEO/technical requirements, bilingual plan, press kit, things to avoid).
- **`uploads/CBTv2_*.png`** — eight official logo variants (color / black / white × full lockup / mark-only, plus subtext strips), cropped into `assets/`.
- **Fonts:** Onest + JetBrains Mono (see Visual Foundations → Type).

There is no separate codebase or Figma file — the HTML reference above is the ground truth.

---

## Components
Built as reusable React primitives under `components/`, exported on the compiled namespace (`window.CBTDesignSystem_*`):

- **Button** (`forms/`) — pill action button; `primary` (yellow), `secondary` (outline), `dark` (blue); sizes sm/md/lg; disabled.
- **Input** (`forms/`) — labelled text field with optional / error / hint states.
- **Checkbox** (`forms/`) — consent / opt-in control; label may hold links (GDPR line).
- **Card** (`content/`) — base white surface, soft shadow, hover lift.
- **EventCard** (`content/`) — event teaser with yellow mono date chip over image or brand gradient.
- **Testimonial** (`content/`) — member quote on flat grey with initials avatar + origin line.
- **StatsBand** (`content/`) — black band with yellow JetBrains Mono figures.
- **CookieBanner** (`feedback/`) — GDPR consent popover; Accept + Refuse equally weighted.
- **Logo** (`brand/`) — renders a supplied logo PNG (never redrawn).
- **PixelDivider** (`brand/`) — the signature pixel-mosaic motif.

## UI kits
- **`ui_kits/website/`** — the full CBT community site as an interactive click-through: sticky nav (6 pages), homepage (hero → benefits → stats → events → testimonials → closing CTA), events listing, a 3-field join form with GDPR + thank-you state, simple content pages, and a floating cookie banner. Composes the components above.

## Foundations (Design System tab)
Specimen cards live in `guidelines/` (Colors, Type, Spacing, Brand) and each component directory carries a Components card.

## Root manifest
- `styles.css` — entry point; `@import`s the token files only.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `fonts.css`.
- `assets/` — logo & mark PNGs (color/black/white) + subtext strips.
- `thumbnail.html` — homepage tile.
- `SKILL.md` — Agent-Skill wrapper for reuse in Claude Code.

---

## CONTENT FUNDAMENTALS

**Language.** Everything is in **Romanian**, with full diacritics (ă, â, î, ș, ț). A Russian version (`/ru/`) is planned for the Home and About pages only — human-translated, never machine.

**Person & tone.** Warm, direct, **"tu"** (informal second person) — the community talks to a friend, not a customer. Copy is emotionally grounded in the experience of being far from home. Example hero: *"Acasă, la 700 km de casă."* The 404 line carries gentle humour: *"Pagina asta s-a rătăcit — ca un basarabean fără GPS în Timișoara."*

**Casing.** Sentence case for headings and body. UPPERCASE only for mono eyebrows/labels (e.g. `EVENIMENTE · 2026`). Buttons use sentence case with a clear verb-first benefit: *"Înscrie-te în comunitate"*, *"Scrie-ne"*, *"Vezi evenimentele"*.

**CTA discipline.** Exactly one primary call to action per screen, and it is always the same label and yellow style — *"Înscrie-te în comunitate"* — repeated in the hero and at the foot of the homepage. The secondary action is a discreet *"Scrie-ne"*. Never a third button.

**Concreteness.** Prefer real numbers and next steps over fluff. The thank-you page states the concrete next step (*"Te-am adăugat pe listă — între timp, intră în grupul de Facebook"*), never a bare "mulțumim". Stats are real figures (membri, evenimente, ani), shown in mono.

**Emoji.** Used very sparingly — a single celebratory 🎉 on the join confirmation is acceptable. Never in nav, headings, buttons, or body copy.

**Vibe.** Grassroots, community-run, honest. Not corporate, not startup-slick. Quietly proud of Basarabian identity.

---

## VISUAL FOUNDATIONS

**Colors.** Four brand colors, all lifted from the logo (the fragmented Romanian tricolor mosaic + black wordmark), each with ONE fixed role:
- **Albastru `#2F448A`** — primary: links, accent titles, section fills, tertiary buttons.
- **Galben `#F9F04D`** — action ONLY: the single main CTA, highlights. Reserved so it never loses force.
- **Roșu `#CF242A`** — errors, alerts, rare mosaic accents. **Never** a CTA or long-text background.
- **Negru `#101010`** — wordmark, footer, stats band, outlines.
Neutrals are a warm-ish grey ramp (`#2A2A2A → #F2F2F0`) plus a blue tint `#EAEDF5` for info surfaces. **Contrast rule:** on yellow write black; on blue/black write white or yellow; red is only for short error messages.

**Type.** **Onest** (display + body) — commissioned by the Republic of Moldova for its state digital services, so it carries meaning for a Basarabian community and covers Romanian diacritics *and* Cyrillic natively (the RU version needs no second font). Weights 300–900; display/headings 800–900 with tight tracking (-0.02 to -0.03em); body 400 at 1.6 line-height (mobile legibility). **JetBrains Mono** is used strictly for numbers, dates, eyebrows and small labels — never running text. Scale is mobile-first `clamp()` on a ~1.25 ratio.

**The mosaic (signature motif).** Individual colored squares forming a whole — a metaphor for the community (many people, one image), taken from the logo. Used **sparingly**: as a section divider, an active-nav marker (a single yellow square under the active link), and a hero corner accent. Never a full-page background, never permanently animating, max 3 colors per divider, max one mosaic element visible per screen.

**Backgrounds.** Mostly flat: white or `#F2F2F0` for alternating sections; black for hero, stats band and footer; blue for the closing-CTA band. Gradients appear ONLY as event-card image placeholders (blue→dark-blue or red→dark-red), standing in until a real photo exists. No textures, no photography baked into the system (photos are content, added by CBT).

**Spacing.** 8px base scale (`--sp-1`=4 → `--sp-8`=96). Section vertical padding 64px mobile / 96px desktop. Container max-width 1140px.

**Corner radii.** `sm` 6px (inputs, chips), `md` 12px (cards), `lg` 20px (large panels, stats band, footer), and **pill** 999px — buttons are always fully rounded.

**Cards.** White fill, 1px `#F2F2F0` border, 12px radius, soft low shadow `0 2px 12px rgba(16,16,16,.07)`. On hover they lift 2px and the shadow deepens and tilts toward brand blue `0 6px 24px rgba(47,68,138,.16)`. Testimonials break this pattern deliberately: flat grey, no border, no shadow, no hover.

**Shadows.** Three tiers: card (soft), yellow action-glow on the primary button, and a stronger pop shadow for floating elements (cookie banner). All low-spread and soft — never harsh.

**Motion.** Quick and calm: `~0.15–0.2s` with `cubic-bezier(0.4,0,0.2,1)`. Hover = lift + shadow (no bounce, no scale-up). Press settles back to rest. `prefers-reduced-motion` is fully respected — all animation and smooth-scroll stop.

**Hover / press states.** Buttons: primary yellow → brighter yellow + lift; dark blue → darker blue + lift; secondary outline → border darkens to black + subtle grey fill. Links: grey → blue. Press: returns to baseline (no shrink).

**Borders.** Subtle `#F2F2F0` on cards/nav; `#C9C9C9` (2px) on inputs, tightening to blue on focus and red on error. Strong black borders only where the brand wants weight (rare).

**Focus.** Always visible: 3px solid brand-blue outline, 2px offset — a hard accessibility requirement.

**Transparency & blur.** Essentially none — the aesthetic is solid, flat, high-contrast. The only translucency is white-at-85% for body text on the blue CTA band. No glassmorphism.

**Layout rules.** Mobile-first (design at ~380px, expand up). Sticky top nav. Touch targets ≥ 48×48px. One yellow CTA on screen at any time. No auto-sliders, no aggressive popups, no chatbots (per brief).

---

## ICONOGRAPHY

CBT is **deliberately icon-light** — the brand leans on the pixel-mosaic motif and type, not an icon set. Findings and rules:

- **No icon library** is used in the source reference. Where a benefit card wants a glyph, it uses a **single colored mosaic square** (a `PixelDivider`/pixel-marker), not a pictographic icon. This is the preferred "icon" of the system.
- **Social icons** appear only in the footer, rendered as simple text/unicode marks (`f` for Facebook, `◎` for Instagram) inside bordered squares — intentionally minimal, per the brief's "avoid crowded social widgets" rule. If real brand glyphs are wanted, substitute clean monoline SVGs (see below) — but keep them footer-only.
- **Numbers, dates and the "404" code** are treated typographically in JetBrains Mono rather than as icons.
- **Emoji** is used once (🎉 on the join confirmation) and nowhere else.
- **Unicode** is used as a lightweight arrow/marker device in copy (e.g. "Chișinău → Timișoara").

**Recommendation / intentional addition:** the system ships **no icon font or SVG set**. If a future need arises (e.g. contact-page detail icons), adopt **Lucide** (monoline, 2px stroke, rounded — matches Onest's warmth) via CDN and document each usage here. This is flagged as a substitution, not something present in the source.

---

## Substitutions & flags
- **Fonts** are loaded from **Google Fonts** (`tokens/fonts.css`) rather than self-hosted binaries. Both Onest and JetBrains Mono are freely available there and render identically. If you need self-hosted `.woff2` files (offline/GDPR-strict hosting), ask and I'll swap in local `@font-face` files.
- **No icon set** exists in the source (see Iconography) — none was invented.

## Open questions for the client
- Member **benefits** are undefined — the homepage reserves 3–4 placeholder cards so the page won't need rebuilding later.
- Real **testimonial photos/names** and where **form data** is stored (Sheet / CRM / plugin) must be decided before launch (brief, §2–3).

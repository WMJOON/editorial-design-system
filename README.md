# Editorial Design System

The shared visual language behind [wmjoons.com](https://wmjoons.com): semantic color tokens, Korean editorial typography, accessible content primitives, and a Markdown renderer for Next.js.

It is designed to keep a public reading experience and a local publishing console visually coherent without forcing product-specific UI into the same component set.

## What it demonstrates

- Semantic light/dark color tokens, including warm operations surfaces
- Clear title roles: display plus a complete document hierarchy from `h1` through `h6`
- Korean-first fluid typography with Noto Sans KR and Noto Serif KR
- Markdown support for GFM tables, KaTeX, Mermaid, and literal single tildes
- Atomic Design taxonomy: foundations, atoms, molecules, organisms, and app patterns

## Local development

```bash
npm install
npm run build
npm run storybook
```

Storybook starts at [http://localhost:6006](http://localhost:6006). It is organized as `Foundations → Atoms → Molecules → Organisms → Patterns`, separating reusable components from app-bound interaction flows. Build its deployable static output with `npm run build-storybook`.

## Consumer setup

```tsx
import "@wmjoon/editorial-design-system/editorial.css";
import { EditorialMarkdown } from "@wmjoon/editorial-design-system";
```

```tsx
<EditorialMarkdown content={markdown} />
```

## Components

### Atoms

- `EditorialButton` and `EditorialIconButton`: labelled actions in `sm | md | lg`.
- `EditorialTag`: one topical taxonomy facet in `sm | md | lg`.
- `EditorialBadge`: one mutually exclusive status, type, or count in `sm | md | lg`.
- `EditorialSelect`: labelled native select for mutually exclusive options.

### Molecules

- `EditorialTags`: dot-separated topical metadata group, composed from `EditorialTag`.
- `EditorialSegmentedControl`: a compact fixed-option selection control.
- `EditorialNav`: brand, navigation links, and trailing actions.
- `EditorialSegmentedControl`: use this for `라이트 | 다크 | 시스템`; persistence belongs to each consuming application.

### Organisms

- `EditorialMarkdown`: GFM, literal single tildes, tables, KaTeX, and Mermaid.
- `EditorialArticle`: page-title header and rendered body.
- `EditorialArticleHeader`: metadata, page title, subtitle, and tags.
- `EditorialSiteIntro`, `EditorialTopicBar`, `EditorialTopicIndex`, and `EditorialSiteFooter`: the shared fluid site shell for landing and index pages.
- `EditorialCollection`: shared list/card content collection for feeds, archives, and topic pages.

`EditorialMarkdown` standardizes typography, dark mode, and a fixed 720px reading measure. The components are intentionally editorial primitives; product-specific dashboard UI remains in each consuming app.

## Fluid reading tokens

The document root sets reading type to 14.5–17px across viewport widths when the browser's default font size is 16px. It uses `rem` against that browser default, so a reader's larger default also enlarges the text. Body text is `1rem`; headings use proportional `rem` values and line heights remain unitless. UI spacing and card geometry use fixed pixels and respond through layout breakpoints instead.

- Root: `--editorial-root-font-size` (`14.5px–17px` at a 16px browser default, fluid with viewport width)
- Body: `--editorial-type-body-size` (`1rem`), `--editorial-type-body-line-height`
- Titles: `--editorial-type-title-1-size` through `--editorial-type-title-3-size`
- Reading width: `--editorial-reading-measure` (`720px`, fixed)
- Fixed UI rhythm: `--editorial-space-inline-gutter`, `--editorial-space-content-block`, `--editorial-space-section`, `--editorial-space-card-gap`
- Container gutter: `--editorial-space-inline-gutter` is 24px on desktop and 16px at 720px and below; site header, footer, page wrapper, and article shell share it.
- Thumbnail frame: `--editorial-thumbnail-ratio` (`16 / 9` for cards and article covers)

Text sizes in shared components and the site use role tokens. Choose `micro`/`caption`/`meta` for secondary information, `label`/`control` for interface text, `small`/`body`/`lead` for reading, and named title, section, or display roles for headings. Control variants use `--editorial-type-control-sm-size` and `--editorial-type-control-lg-size`; document headings keep their own semantic title scale. Storybook's **Foundations / Typography / Role Tokens** shows the type roles, **Reading And Ui Scales** compares the two scale systems, and **Foundations / Tokens / Spacing Tokens** shows every spacing value and its rendered width.

Margins, padding, gaps, and placement offsets use `--editorial-ref-space-*`. The scale starts at `0.5x = 2px`, then uses whole steps of `1x = 4px`, `2x = 8px`, `3x = 12px`, and so on. `0.5x` is reserved for small optical adjustments; intermediate half steps are not part of the scale. Semantic aliases such as `--editorial-space-content-block` select from it. Text size changes do not change the spacing scale. Keep zeros, automatic margins, and content-dependent geometry outside this rhythm scale.

Consumers may override these semantic tokens at a theme or product boundary. Keep `--editorial-reading-measure`, `--editorial-mermaid-min-inline-size`, `--editorial-border-width`, and `--editorial-size-control-*` fixed: line length, readable diagram width, hairline borders, and touch targets are constraints rather than fluid decoration.

### Composition contract

Visual similarity alone is not a component boundary. The shared organisms consume the same primitives that Storybook documents:

- A content type such as `essay` or `framework` is an `EditorialBadge`.
- A taxonomy such as `knowledge systems` or `reader path` is an `EditorialTag`; several facets render through `EditorialTags`.

This keeps a Storybook example, its DOM semantics, and the interface used by the backoffice aligned.

## Title roles

The hierarchy is semantic first, and the visual classes make the intent explicit.

- `editorial-display`: brand or landing-page display only. It is not a document-heading scale.
- `editorial-title-1`: a document/page `h1`.
- `editorial-title-2`: an `h2` section title.
- `editorial-title-3`: an `h3` subsection title.
- `editorial-title-4` through `editorial-title-6`: increasingly compact subsections and labels.

Markdown follows the same scale automatically: `#` through `######` render as `title-1` through `title-6`. `EditorialArticle` owns its page `h1`; therefore Markdown passed to it should normally start at `##`. The personal-site source adapter removes a leading `#` only when it exactly matches the frontmatter title, preventing duplicated article titles without altering standalone Markdown documents.

## Theme tokens

Every component uses the shared `--editorial-*` color tokens, so navigation, headers, tags, Markdown, tables, and diagrams follow the same light/dark palette. The system preference is used by default; set `data-editorial-theme="light"` or `data-editorial-theme="dark"` on `html` or a wrapping element to override it.

Use semantic tokens in consumer styles rather than literal hex values:

- Foreground: `--editorial-fg`, `--editorial-fg-muted`
- Surfaces: `--editorial-bg-canvas`, `--editorial-bg-surface`, `--editorial-bg-subtle`
- Structure: `--editorial-border`, `--editorial-overlay`
- Interaction: `--editorial-accent`, `--editorial-on-accent`, `--editorial-link`
- Editing and feedback: `--editorial-code-bg`, `--editorial-code-fg`, `--editorial-warning-bg`, `--editorial-warning-fg`
- Warm operations surfaces: `--editorial-canvas-warm`, `--editorial-surface-warm`, `--editorial-surface-strong`

### Token hierarchy

Use three levels so a page can change its layout without inventing another palette:

| Level | Example | Purpose |
| --- | --- | --- |
| Foundation | `--editorial-ref-space-4`, `--editorial-font-serif` | Reusable spacing and type values; do not use these to express a component's meaning. |
| Semantic | `--editorial-fg`, `--editorial-action-bg`, `--editorial-focus-ring` | Light and dark roles used across products. |
| Component | `--editorial-space-card-gap`, `--editorial-size-control-md` | A named layout or interaction constraint. |

`--editorial-accent` is an illustrative orange. On the light canvas it does not provide enough contrast for white button text or a focus ring. Use `--editorial-action-bg` with `--editorial-action-fg` for filled actions, the matching `--editorial-action-hover-*` pair for hover, and `--editorial-focus-ring` for keyboard focus. The light hover pair has a 6.05:1 contrast ratio; the dark hover pair has a 9.01:1 ratio. `--editorial-on-accent` is dark text for any direct use of the illustrative orange.

The shared package owns token values. A consumer may alias them for migration, but should not duplicate theme hex values. Keep line width, minimum control size, and border width fixed. Map repeated page spacing to the reference scale, and reserve one-off measurements for content-dependent layout.

## Releases

Create and push a `v*` tag after updating `package.json`. GitHub Actions publishes the scoped private package to GitHub Packages.

## Storybook deployment

The catalogue is intentionally independent from the reader and the backoffice. Create a Cloudflare Pages project from this repository with:

- Build command: `npm run build-storybook`
- Build output directory: `storybook-static`
- Production branch: `main`

No runtime secrets are required. A dedicated hostname such as `design.wmjoons.com` keeps the component reference separate from `wmjoons.com`.

## License

MIT. See [LICENSE](./LICENSE).

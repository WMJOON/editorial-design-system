# Editorial Design System

The shared visual language behind [wmjoons.com](https://wmjoons.com): semantic color tokens, Korean editorial typography, accessible content primitives, and a Markdown renderer for Next.js.

It is designed to keep a public reading experience and a local publishing console visually coherent without forcing product-specific UI into the same component set.

## What it demonstrates

- Semantic light/dark color tokens, including warm operations surfaces
- Clear title roles: display, page `h1`, document `h2`, and document `h3`
- Korean-first typography with Noto Sans KR and Noto Serif KR
- Markdown support for GFM tables, KaTeX, Mermaid, and literal single tildes
- Reusable article, navigation, tag, and badge primitives

## Local development

```bash
npm install
npm run build
```

## Consumer setup

```tsx
import "@wmjoon/editorial-design-system/editorial.css";
import { EditorialMarkdown } from "@wmjoon/editorial-design-system";
```

```tsx
<EditorialMarkdown content={markdown} />
```

## Components

- `EditorialMarkdown`: GFM, literal single tildes, tables, KaTeX, and Mermaid.
- `EditorialArticle`: page-title header and rendered body.
- `EditorialArticleHeader`: metadata, page title, subtitle, and tags.
- `EditorialNav`: brand and navigation links.
- `EditorialTags`: shared tag treatment.
- `EditorialTag`: body-sized topical metadata; tags are separated by dots rather than presented as badges.
- `EditorialBadge`: compact status/count marker, intentionally distinct from a tag.
- `EditorialThemeSelector`: persistent `라이트 | 다크 | 시스템` preference; system is the default.

`EditorialMarkdown` standardizes typography, dark mode, and a 760px reading measure. The components are intentionally editorial primitives; product-specific dashboard UI remains in each consuming app.

## Title roles

The hierarchy is semantic first, and the visual classes make the intent explicit.

- `editorial-display`: brand or landing-page display only. It is not a document-heading scale.
- `editorial-title-1`: a document/page `h1`.
- `editorial-title-2`: an `h2` section title.
- `editorial-title-3`: an `h3` subsection title.

Markdown follows the same scale automatically: `#` renders as `title-1`, `##` as `title-2`, and `###` as `title-3`. `EditorialArticle` owns its page `h1`; therefore Markdown passed to it should normally start at `##`. The personal-site source adapter removes a leading `#` only when it exactly matches the frontmatter title, preventing duplicated article titles without altering standalone Markdown documents.

## Theme tokens

Every component uses the shared `--editorial-*` color tokens, so navigation, headers, tags, Markdown, tables, and diagrams follow the same light/dark palette. The system preference is used by default; set `data-editorial-theme="light"` or `data-editorial-theme="dark"` on `html` or a wrapping element to override it.

Use semantic tokens in consumer styles rather than literal hex values:

- Foreground: `--editorial-fg`, `--editorial-fg-muted`
- Surfaces: `--editorial-bg-canvas`, `--editorial-bg-surface`, `--editorial-bg-subtle`
- Structure: `--editorial-border`, `--editorial-overlay`
- Interaction: `--editorial-accent`, `--editorial-on-accent`, `--editorial-link`
- Editing and feedback: `--editorial-code-bg`, `--editorial-code-fg`, `--editorial-warning-bg`, `--editorial-warning-fg`
- Warm operations surfaces: `--editorial-canvas-warm`, `--editorial-surface-warm`, `--editorial-surface-strong`

## Releases

Create and push a `v*` tag after updating `package.json`. GitHub Actions publishes the scoped private package to GitHub Packages.

## License

MIT. See [LICENSE](./LICENSE).

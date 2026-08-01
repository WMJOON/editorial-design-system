# Editorial Design System

Shared editorial tokens, Markdown rendering, and React components for `personal-site` and `content-broadcast-hub`.

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

`EditorialMarkdown` standardizes typography, dark mode, and a 760px reading measure. The components are intentionally editorial primitives; product-specific dashboard UI remains in each consuming app.

## Title roles

The hierarchy is semantic first, and the visual classes make the intent explicit.

- `editorial-display`: brand or landing-page display only. It is not a document-heading scale.
- `editorial-title-1`: a document/page `h1`.
- `editorial-title-2`: an `h2` section title.
- `editorial-title-3`: an `h3` subsection title.

Markdown follows the same scale automatically: `#` renders as `title-1`, `##` as `title-2`, and `###` as `title-3`. `EditorialArticle` owns its page `h1`; therefore Markdown passed to it should normally start at `##`. The personal-site source adapter removes a leading `#` only when it exactly matches the frontmatter title, preventing duplicated article titles without altering standalone Markdown documents.

## Releases

Create and push a `v*` tag after updating `package.json`. GitHub Actions publishes the scoped private package to GitHub Packages.

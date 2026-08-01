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
- `EditorialArticle`: article header and rendered body.
- `EditorialArticleHeader`: metadata, title, subtitle, and tags.
- `EditorialNav`: brand and navigation links.
- `EditorialTags`: shared tag treatment.

`EditorialMarkdown` standardizes typography, dark mode, and a 760px reading measure. The components are intentionally editorial primitives; product-specific dashboard UI remains in each consuming app.

## Releases

Create and push a `v*` tag after updating `package.json`. GitHub Actions publishes the scoped private package to GitHub Packages.

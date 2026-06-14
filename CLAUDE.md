# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server at localhost:4321
npm run build      # Build to ./dist/ AND run pagefind indexing (astro build && pagefind --site dist)
npm run preview    # Preview production build locally
```

> **Search only works after `npm run build`** — in dev mode, `/pagefind/pagefind.js` is stubbed to return empty results. The Vite plugin in `astro.config.mjs` handles this stub.

## Architecture

This is an Astro 6 static blog ("Kotonoha") with MDX content and Pagefind search.

### Content

Posts live in `src/content/posts/` using Astro's glob loader. The directory structure follows `YYYY/MM-DD_slug/index.mdx` (or a single `.mdx` file). The content schema (`src/content.config.ts`) requires these frontmatter fields:

```yaml
title: string # Japanese title
titleEn: string # English subtitle (shown in italic below title)
date: date
tags: [string]
draft: boolean # defaults false; drafts are excluded from getStaticPaths
image: image() # optional hero image (Astro image asset)
hero: string # optional hero CSS class/url string
alt: string # alt text for image
```

### Layouts

- `BaseLayout.astro` — wraps all pages; includes Header, Footer, SearchModal, global CSS, dark-mode init script, and Google Fonts
- `PostLayout.astro` — extends BaseLayout; renders post header (title, titleEn, date, tags), TOC sidebar, and `<div class="prose" data-pagefind-body>` for body content

### Styling

All CSS custom properties (color tokens, typography) are defined in `src/styles/direction-b.css` ("Bookish Warm" theme). Key tokens: `--bg`, `--paper`, `--ink`, `--accent-blue`, `--accent-orange`, `--rule`, `--shadow`. Dark mode is applied via `html.dark` class toggled by JS reading `localStorage.theme`.

`src/styles/global.css` contains layout/typography rules that consume those tokens.

### Search

Pagefind indexes `[data-pagefind-body]` elements at build time. `src/components/SearchModal.astro` renders a `<dialog>` opened by `⌘K`/`Ctrl+K`. The pagefind files in `src/components/pagefind/` are build artifacts committed to the repo — they get regenerated on each `npm run build`.

### Routing

| Path                | File                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------ |
| `/`                 | `src/pages/index.astro`                                                              |
| `/posts`            | `src/pages/posts/index.astro`                                                        |
| `/posts/[slug]`     | `src/pages/posts/[slug].astro` — slug is the post's `id` from the content collection |
| `/categories`       | `src/pages/categories/index.astro`                                                   |
| `/categories/[tag]` | `src/pages/categories/[tag].astro`                                                   |
| `/about`            | `src/pages/about.astro`                                                              |

# Portfolio

Personal portfolio site built with Astro, TypeScript, and Tailwind CSS.

## Stack

- [Astro 5](https://astro.build) — static-first content framework
- TypeScript (strict)
- [Tailwind CSS v4](https://tailwindcss.com) — via the `@tailwindcss/vite` plugin

## Design

Single-page site with a near-black background (`#0a0a0a`), violet accents (`#a78bfa`), and a green active-section indicator (`#22c55e`).

A floating, pill-shaped top navigation tracks the current section using `IntersectionObserver` and surfaces a small green dot beside the active link.

- **Body:** Inter
- **Headings:** Bricolage Grotesque

## Project structure

```
src/
├── components/
│   ├── Nav.astro       — floating pill nav
│   └── Footer.astro
├── layouts/
│   └── Layout.astro    — html shell + nav + footer
├── pages/
│   └── index.astro     — #home / #projects / #contact
├── scripts/
│   └── scrollSpy.ts    — IntersectionObserver active-section tracking
└── styles/
    └── global.css      — tailwind import + theme tokens
```

## Theme tokens

Defined via Tailwind v4's `@theme` directive in `src/styles/global.css`. Each `--color-*` token automatically generates matching `bg-*`, `text-*`, and `border-*` utilities.

| Token              | Value                | Used for           |
| ------------------ | -------------------- | ------------------ |
| `--color-bg`       | `#0a0a0a`            | page background    |
| `--color-fg`       | `#f5f5f5`            | primary text       |
| `--color-muted`    | `#a3a3a3`            | secondary text     |
| `--color-accent`   | `#a78bfa`            | violet accent      |
| `--color-active`   | `#22c55e`            | active-section dot |
| `--font-sans`      | Inter                | body               |
| `--font-display`   | Bricolage Grotesque  | headings           |

## Scripts

| Command           | What it does                                |
| ----------------- | ------------------------------------------- |
| `npm install`     | install dependencies                        |
| `npm run dev`     | start dev server at `http://localhost:4321` |
| `npm run build`   | type-check and build for production         |
| `npm run preview` | preview the production build                |

## Adding sections

To add a new section to the single-page layout:

1. Add a new `<section id="...">` block in `src/pages/index.astro`.
2. Add a matching entry to the `links` array in `src/components/Nav.astro`.
3. Add the new id to the `sectionIds` tuple in `src/scripts/scrollSpy.ts`.

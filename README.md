# Meme Creator

A lightweight, browser-based meme editor. Pick a template or paste an image URL, add draggable text layers, style them globally, and copy the finished meme straight to your clipboard — no accounts, no server, no download required.

## Features

- **Template carousel** — pick from bundled meme templates
- **Custom image URL** — paste any image URL to use as the background
- **Draggable text layers** — click to select, drag to reposition
- **Inline text editing** — type directly on the canvas
- **Global text styling** — font, size, fill color, stroke color, stroke width
- **Image scaling** — zoom the whole meme in and out
- **Copy to clipboard** — one click exports the meme as a PNG
- **Mobile-friendly** — touch drag works via pointer events
- **Auto-cleanup** — empty text layers are removed on deselect

## Tech Stack

- **Vite** — build tool and dev server
- **React 18** + **TypeScript**
- **Tailwind CSS v4** — styling
- **shadcn/ui** — UI components (Button, Input, Select, Carousel)
- **html-to-image** — DOM → PNG for clipboard export
- **Vitest** + **React Testing Library** — unit and component tests
- **ESLint** + **Prettier** — linting and formatting
- **Husky** + **lint-staged** — git hooks for quality gates

## Getting Started

### Prerequisites

- Node 18+
- npm (or pnpm/yarn)

### Install

```bash
npm install
```

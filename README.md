# Meme Creator

A lightweight, browser-based meme editor. Pick a template (or upload an image), add draggable text layers, style them globally, and copy the finished meme straight to your clipboard — no accounts, no server, no download required.

## Features

- **Image background** — start from a preset template URL
- **Draggable text layers** — click to select, drag to reposition
- **Inline text editing** — type directly on the canvas
- **Global text styling** — font, size, fill color, stroke color, stroke width
- **Copy to clipboard** — one click exports the meme as a PNG
- **Download fallback** — automatic fallback if clipboard access is unavailable
- **Mobile-friendly** — touch drag works via pointer events
- **Auto-cleanup** — empty text layers are removed on blur

## Tech Stack

- **Vite** — build tool and dev server
- **React 18** + **TypeScript**
- **Tailwind CSS v4** — styling
- **html-to-image** — DOM → PNG for clipboard export
- **Vitest** + **React Testing Library** — unit and component tests

## Getting Started

### Prerequisites

- Node 18+
- npm (or pnpm/yarn)

### Install

```bash
npm install
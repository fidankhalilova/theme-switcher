# Theme Switcher & Persistence

A light/dark/system theme toggle built with React + TypeScript + Tailwind, using CSS custom properties for theming and `localStorage` for persistence — with no flash of the wrong theme on reload.

## Features

- **Three theme states** — `light`, `dark`, and `system`. When set to `system`, the UI keeps following OS-level changes live (e.g. macOS auto dark mode at sunset) until the user picks an explicit value.
- **No flash on load** — a blocking inline script in `index.html` `<head>` sets `data-theme` on `<html>` before React mounts or anything paints.
- **Persisted across sessions** — preference is saved to `localStorage`, wrapped in `try/catch` everywhere it's touched so Safari private-mode (which throws on access) can't crash the app.
- **CSS-variable theming** — all colors live in `src/styles/theme.css` as custom properties. Components consume semantic Tailwind classes (`bg-surface`, `text-fg`, `text-muted`, etc.) and have zero awareness that theming exists.
- **Segmented toggle control** — a proper `role="radiogroup"` with arrow-key navigation, a sliding highlight overlay, and a checkmark on the active option (selection is never color-only).
- **`<meta name="theme-color">` sync** — updated on load and on every toggle so mobile browser chrome matches the active theme.
- **Scoped transitions** — color transitions are opt-in via `[data-theme-transition]`, not a `*` selector, and everything respects `prefers-reduced-motion`.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL. To verify the no-flash behavior, switch to dark mode, hard-reload the page, and confirm it never flashes light before settling.

```bash
npm run build      # production build
npm run preview    # preview the production build locally
```

## Accessibility & contrast

- Toggle is a real `role="radiogroup"` of `role="radio"` buttons — arrow keys move selection, `aria-checked` reflects state, and there's a visible checkmark alongside the color highlight so the active option never depends on color alone.
- Body text (`--color-fg` on `--color-bg`) and secondary text (`--color-fg-muted`) were checked against WCAG AA (4.5:1) in both themes.
- Focus states use a visible `focus-visible` ring on every interactive element.
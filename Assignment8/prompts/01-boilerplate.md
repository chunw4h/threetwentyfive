# 01 — Boilerplate

## Prompt

> Set up the boilerplate for a vanilla HTML/CSS/JS portfolio site in
> `Assignment8/`. Multi-page: `index.html` and `projects.html` sharing one
> shell. No frameworks, no libraries, no build step.
>
> Requirements:
> - `css/base.css` holds design tokens (CSS custom properties), a reset,
>   typography scale, and shared primitives (buttons, skip link).
> - `css/main.css` holds the page shell: backdrop, header, nav, hero, footer.
> - `js/main.js` is shared across pages: sets the footer year and publishes
>   cursor position as `--pointer-x` / `--pointer-y` on `<html>`.
> - `js/background.js` is a placeholder ambient canvas, easy to replace.
> - Respect `prefers-reduced-motion` and skip pointer tracking on touch.
> - Semantic landmarks, skip link, `aria-current` on the active nav item.
> - Dark "Blackspace" palette with a soft lavender accent.

## Acceptance checks

- [ ] Both pages load with no console errors
- [ ] Nav highlights the current page
- [ ] Moving the mouse shifts the glow behind the content
- [ ] Tab once from load → skip link appears
- [ ] With OS "reduce motion" on, the canvas stops and the glow is static
- [ ] Layout holds at 320px and at 1440px wide

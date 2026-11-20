# 02 — Landing Page UI

## Prompt

> Build out the landing page content for the Blackspace portfolio. UI only —
> no new interactivity beyond what already exists (pointer glow, starfield).
>
> Requirements:
> - Expand the hero: eyebrow, name, lede, actions, plus a metadata row
>   (location / focus / availability) separated by a hairline rule.
> - Add an "About" section and a "Currently" section below the hero.
> - Add a subtle scroll cue at the bottom of the hero.
> - Page-specific styles go in a new `css/landing.css`, linked only from
>   `index.html`. `main.css` stays the shared shell.
> - Add a film-grain overlay to `.backdrop` via `::before` (SVG turbulence
>   data URI, no image file).
> - Restrained glitch effect on the name, hover-triggered only.
> - Everything must degrade cleanly under `prefers-reduced-motion`.

## Acceptance checks

- [ ] Hero, About, and Currently sections all render
- [ ] Grain is visible but not distracting
- [ ] Hovering the name produces a brief chromatic split, then settles
- [ ] With reduce-motion on, the name does not glitch and the scroll cue
      does not drift
- [ ] Layout holds at 320px (metadata row wraps, Currently list stacks)
- [ ] No console errors

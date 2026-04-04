# URL Routing + Theme Switcher Design
**Date:** 2026-04-04

## Goals
1. Each experience has its own URL (`/`, `/space`, `/max`, `/min`).
2. A floating theme switcher in each experience lets users switch directly between the 3 designs without returning to the selector.

---

## Routing

**Approach:** Native History API — no new dependencies.

### `useRoute` hook (`src/hooks/useRoute.js`)
- Reads `window.location.pathname` on init.
- Listens to `popstate` to handle browser back/forward.
- Exposes `{ route, navigate }`.
- `navigate(path)` calls `window.history.pushState({}, '', path)` then updates internal state.

### Route map
| Path | Component |
|------|-----------|
| `/` | ExperienceSelector |
| `/space` | SpaceExperience |
| `/max` | MaximalistExperience |
| `/min` | MinimalistExperience |

### App.jsx changes
- Replace `useState(null)` + `onSelect` with `useRoute`.
- ExperienceSelector receives `navigate` instead of `onSelect`; calls `navigate('/space')` etc. after its exit animation.
- Unknown paths fall back to `/` (selector).

---

## Theme Switcher

### `ThemeSwitcher` component (`src/components/ThemeSwitcher.jsx`)
- Accepts a `current` prop (`'space' | 'max' | 'min'`) and `navigate`.
- Fixed position, bottom-center (`bottom: 1.5rem; left: 50%; transform: translateX(-50%)`).
- Renders the 2 non-current experiences as buttons.
- Clicking navigates directly — no selector screen, no delay.

### Styling per host
| Experience | Style |
|------------|-------|
| Space | Dark glass (`rgba(0,0,0,0.6)`), `backdrop-filter: blur`, subtle green glow on hover |
| Maximal | Dark bg, cyan electric border, `monospace` labels |
| Minimal | White bg, `1px solid rgba(0,0,0,0.15)`, clean `sans-serif` labels |

### Label text
- `/space` → "SPACE"
- `/max` → "MAXIMAL"
- `/min` → "MINIMAL"

---

## Files changed
- `src/hooks/useRoute.js` — new
- `src/components/ThemeSwitcher.jsx` — new
- `src/App.jsx` — swap useState routing for useRoute; pass navigate to ExperienceSelector
- `src/components/ExperienceSelector.jsx` — accept `navigate` prop, call it after exit animation
- `src/experiences/maximalist/MaximalistExperience.jsx` — add ThemeSwitcher
- `src/experiences/minimalist/MinimalistExperience.jsx` — add ThemeSwitcher
- `src/sections/Landing.jsx` (SpaceExperience) — add ThemeSwitcher to SpaceExperience in App.jsx

## Out of scope
- Server-side routing config (user handles their deploy target)
- Nested routes within experiences
- Animated transitions between experiences

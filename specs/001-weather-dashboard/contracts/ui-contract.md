# UI Contract: Current Weather Panel

## Purpose

Define the observable interface contract for the initial Weather SpecKit page. This feature
exposes a user-facing UI only and has no public API or external service contract.

## Page Contract

- Page identity is `Weather SpecKit`.
- The initial page contains one centered current-weather panel.
- The page excludes forecast cards, highlights, search, city switching, live retrieval, and
  geolocation permission flows.
- The theme is white, with neutral fallback visual blocks because no assets are supplied.

## Panel Content Contract

The panel renders these groups in this exact top-to-bottom order:

1. Weather condition visual slot for the selected supported state.
2. Current temperature and unit as the most prominent text value.
3. Current weekday and hour directly below the temperature.
4. Horizontal divider.
5. Small condition icon slot and concise condition description.
6. City image slot and city name after a small visual gap.

Every state in the FR-004 catalog has a distinct visual and description. Fixed representative
values MUST be distinguishable from live weather data.

## Responsive Contract

- The panel remains horizontally and vertically centered on desktop and narrow mobile sizes.
- Every required group remains visible without horizontal scrolling, clipping, or overlap.
- Long city names wrap or scale within the city area without obscuring other content.
- Negative and multi-digit temperatures remain legible without changing the required order.

## Fallback Contract

- Missing weather values produce a clear unavailable-state message and do not substitute a
  different supported state.
- Missing imagery produces a neutral colored rectangle or square while preserving labels.
- Fallback visuals require no remote assets or additional runtime services.

## Accessibility Contract

- Text remains readable with sufficient contrast against the white theme.
- Informative visual slots have meaningful accessible names; decorative fallback shapes are
  not announced redundantly.
- The content order remains meaningful to assistive technology.

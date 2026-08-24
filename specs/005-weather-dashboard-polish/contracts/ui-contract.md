# UI Contract: Weather Dashboard Polish

## Search Area

- The search input provides visible inset space before entered text.
- The native clear affordance remains separated from the right edge of the field.
- A non-empty result list is layered above the weather sidebar and does not participate in sidebar height calculation.
- Result buttons remain readable and selectable on desktop and narrow viewports; long labels wrap or otherwise stay within the available width.
- Empty results and request errors do not leave an empty blocking layer or cause dashboard movement.

## Current Weather Sidebar

- The first-load city is Minsk when no prior selection exists.
- The `Representative conditions` text is absent.
- The weather icon has no border or outline.
- The condition icon and description are centered in one horizontal row below the divider.
- The city image wrapper and decorative image are absent; city information remains readable.

## Statistics Sections

- The weekly forecast title remains aligned with its content after removing `This week`.
- The Today's Highlights title remains aligned with its content after removing `At a glance`.
- Daily highlight icons are modestly larger than the current presentation and do not clip, overlap, or resize their cards unexpectedly.

## Responsive Contract

At the existing desktop and narrow viewport breakpoints:

- The dashboard has no horizontal scrollbar.
- Required controls, titles, result buttons, cards, values, and descriptions remain reachable and visible.
- Search results do not push the sidebar down or render underneath the weather panel.
- Forecast and highlight grids adapt to the available width without forcing content outside the viewport.

## Compatibility Contract

- Existing city selection, weather loading, unit selection, forecast rendering, and highlight rendering continue to work.
- No public service method signatures, response normalization meanings, or external data endpoints change.
- Non-service TypeScript and HTML formatting work must not introduce behavior changes beyond the explicitly specified UI fixes.

# Research: Weather Dashboard Initial Page

## Decision: Angular 19 standalone root component

- **Rationale**: The existing workspace already bootstraps a standalone Angular 19 root
  component. Keeping this one-page feature in that boundary minimizes files, state plumbing,
  and dependency surface.
- **Alternatives considered**: A feature module, a separate route component, or a weather
  service. These add structure without value for fixed representative data and can be
  introduced when live data or multiple views become requirements.

## Decision: Angular Material for requested styling primitives

- **Rationale**: Angular Material is explicitly requested and provides maintained,
  Angular-compatible primitives and accessibility conventions. The page's distinctive
  composition remains in component CSS. Only the modules actually used should be imported.
- **Alternatives considered**: Plain CSS only would minimize dependencies further but would
  not satisfy the styling direction. A larger design system would add unnecessary scope.

## Decision: Neutral CSS fallback blocks for all visual slots

- **Rationale**: No assets are available initially. Neutral colored squares or rectangles
  preserve stable slots for weather visuals, condition icons, and city imagery without
  inventing imagery or adding asset and licensing concerns.
- **Alternatives considered**: Remote stock images or generated image files. Both introduce
  availability and asset-management concerns outside this first slice.

## Decision: Finite weather-state catalog with local representative data

- **Rationale**: The specification requires every supported state to have a distinct visual
  and description. Use the finite catalog in FR-004: clear/cloud states, visibility states,
  precipitation, frozen precipitation, severe storms, wind, and airborne phenomena. Local
  fixed data avoids geolocation and external weather services while making the first page
  deterministic.
- **Alternatives considered**: Live retrieval or a hybrid live/fallback mode. Both are out of
  scope and would expand architecture, permissions, failure modes, and dependencies.

## Decision: Static build and manual browser verification

- **Rationale**: The constitution prohibits unit, integration, and end-to-end testing,
  including test-only dependencies. Validation is limited to Angular compilation/static and
  type checks plus direct review at desktop and narrow mobile sizes.
- **Alternatives considered**: Karma/Jasmine or browser automation. These conflict with the
  project's No Automated Testing principle and must not be added or run.

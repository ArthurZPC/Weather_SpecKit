# Implementation Plan: Weather Dashboard Polish

**Branch**: `005-weather-dashboard-polish` | **Date**: 2026-08-24 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/005-weather-dashboard-polish/spec.md`

## Summary

Polish the existing Angular weather dashboard so search results overlay the sidebar without changing layout flow, the sidebar and statistics sections have a cleaner visual hierarchy, Minsk is the first-load city, and supported viewports do not horizontally scroll. After behavior changes are complete, reformat the API service with readable Egyptian-bracket style and small helpers, then apply formatting-only updates to the remaining TypeScript and HTML files without changing their behavior.

## Technical Context

**Language/Version**: TypeScript 5.7, Angular 19, strict compiler and strict Angular templates

**Primary Dependencies**: Angular core/common/forms/router, Angular Material 19, RxJS 7.8, existing Open-Meteo HTTP services

**Storage**: N/A; the selected city is held in the existing application state and no new persistence is required

**Testing**: Manual browser verification and `npm run build`; automated tests are prohibited by the project constitution

**Target Platform**: Responsive web browser, desktop and narrow viewport layouts supported by the existing dashboard

**Project Type**: Angular standalone web application

**Performance Goals**: Preserve existing weather/search responsiveness and avoid layout shifts when search results appear

**Constraints**: No new dependencies; preserve existing user behavior; avoid horizontal scrolling, clipping, and overlap; behavior changes must precede refactoring and formatting-only changes

**Scale/Scope**: One dashboard screen, four standalone UI components, one root component, one API normalization service, and their existing styles/templates

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Clean Code**: PASS. Refactor only `weather-api.service.ts` with named helpers and expanded control flow; keep other files limited to required behavior changes and formatting-only edits.
- **Simple UX**: PASS. Remove redundant labels and decorative city imagery while keeping search, weather, units, forecast, and highlights workflows intact.
- **Responsive Design**: PASS. Overlay search results, constrain result text, preserve stable card dimensions, and address forecast grid overflow at supported widths.
- **Minimal Dependencies**: PASS. Use existing Angular/CSS capabilities and no package changes.
- **No Automated Testing**: PASS. Do not add or maintain test artifacts; use production build, static diagnostics, and manual browser verification.
- **Product Constraints**: PASS. The plan is limited to specified presentation/default-city behavior and documents the formatting-only boundary for non-service files.

## Phase 0: Research Decisions

Research findings are recorded in [research.md](research.md). No unresolved technical clarifications remain.

## Phase 1: Design Outputs

- [data-model.md](data-model.md) describes the existing search, city, weather summary, and dashboard section data relevant to the changes.
- [contracts/ui-contract.md](contracts/ui-contract.md) defines the observable UI behavior and responsive constraints.
- [quickstart.md](quickstart.md) defines build and manual browser validation scenarios.

## Project Structure

### Documentation (this feature)

```text
specs/005-weather-dashboard-polish/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-contract.md
└── tasks.md                 # Created by /speckit-tasks
```

### Source Code (repository root)

```text
src/
├── styles.css
└── app/
    ├── app.component.ts
    ├── app.component.html
    ├── app.component.css
    ├── app.config.ts
    ├── app.routes.ts
    ├── components/
    │   ├── current-weather-sidebar/
    │   │   ├── current-weather-sidebar.component.ts
    │   │   ├── current-weather-sidebar.component.html
    │   │   └── current-weather-sidebar.component.css
    │   ├── weekly-forecast/
    │   │   ├── weekly-forecast.component.ts
    │   │   ├── weekly-forecast.component.html
    │   │   └── weekly-forecast.component.css
    │   ├── today-highlights/
    │   │   ├── today-highlights.component.ts
    │   │   ├── today-highlights.component.html
    │   │   └── today-highlights.component.css
    │   └── temperature-unit-control/
    │       ├── temperature-unit-control.component.ts
    │       └── temperature-unit-control.component.html
    ├── services/
    │   └── weather-api.service.ts
    ├── data/
    │   └── weather-data.ts
    ├── models/
    │   ├── temperature.utils.ts
    │   ├── weather.models.ts
    │   └── weather-api.models.ts
    └── utils/
        ├── forecast-date.utils.ts
        └── weather-mapping.utils.ts
```

**Structure Decision**: Retain the existing single Angular application structure. Presentation ownership remains with each component, root city/request state remains in `AppComponent`, and API response normalization remains in `WeatherApiService`.

## Implementation Order

1. Apply specification behavior fixes in the owning root/component templates, TypeScript, and CSS files. This includes Minsk coordinates, search-result layering and spacing, label/image removal, sidebar row/icon treatment, highlight icon sizing, and responsive overflow handling.
2. Run a focused production build to catch template and type regressions before refactoring.
3. Refactor `weather-api.service.ts` for readability without changing its public API or normalized values. Expand one-line methods and guards, replace dense boolean chains with named validation helpers, and retain strict type safety.
4. Apply formatting-only Egyptian-bracket and spacing updates to other affected `.ts` and `.html` files. Do not introduce behavior changes in those files beyond the already completed specification edits.
5. Run the production build again and perform the manual scenarios in `quickstart.md` at desktop and narrow viewport sizes.

## Complexity Tracking

No constitution violations require justification.

## Post-Design Constitution Check

- Clean Code: PASS; the service refactor reduces dense expressions without adding unnecessary abstractions.
- Simple UX: PASS; the UI removes redundant content and preserves existing workflows.
- Responsive Design: PASS; the contract explicitly covers overlay positioning, wrapping, stable dimensions, and horizontal overflow.
- Minimal Dependencies: PASS; no dependency or API changes are planned.
- No Automated Testing: PASS; validation artifacts contain manual and build checks only.

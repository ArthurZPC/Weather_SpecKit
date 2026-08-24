---

description: "Executable task list for Weather Dashboard Polish"
---

# Tasks: Weather Dashboard Polish

**Input**: Design documents from `specs/005-weather-dashboard-polish/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/ui-contract.md](contracts/ui-contract.md), [quickstart.md](quickstart.md)

**Testing policy**: The project constitution prohibits automated test artifacts. Validation tasks use the Angular production build, static diagnostics, and manual browser verification only.

## Phase 1: Setup

**Purpose**: Establish a clean validation baseline before changing the dashboard.

- [X] T001 Run the existing production build with `npm run build` from `package.json` and record the baseline result before implementation.
- [X] T002 [P] Review the UI contract in `specs/005-weather-dashboard-polish/contracts/ui-contract.md` and map each requirement to its owning source file in `src/app/`.

## Phase 2: Foundational

**Purpose**: Confirm shared layout and validation boundaries before story work begins.

- [X] T003 Inspect the responsive width constraints in `src/styles.css` and `src/app/app.component.css`, preserving the existing Angular Material and standalone-component structure.
- [X] T004 [P] Confirm strict TypeScript and Angular template validation settings in `tsconfig.json` and `tsconfig.app.json` before changing templates or component inputs.

## Phase 3: User Story 1 - Search Without Layout Disruption (Priority: P1)

**Goal**: Make search input/result interaction readable and keep active results above the sidebar without moving the weather panel.

**Independent test**: Enter a query with results, verify field and clear-control spacing, confirm the result layer covers the sidebar while its vertical position stays fixed, then verify empty/error results do not leave a blocking layer or horizontal overflow.

- [X] T005 [US1] Update search markup in `src/app/components/current-weather-sidebar/current-weather-sidebar.component.html` only as needed to provide stable hooks and accessible structure for the search field, clear behavior, status messages, and result layer.
- [X] T006 [US1] Add search field left inset spacing and native search clear-control right spacing in `src/app/components/current-weather-sidebar/current-weather-sidebar.component.css` without changing the existing search events.
- [X] T007 [US1] Position `.search-results` above the weather card in `src/app/components/current-weather-sidebar/current-weather-sidebar.component.css` so it is removed from normal layout flow, has a deliberate stacking order, and remains bounded within the sidebar/viewport.
- [X] T008 [P] [US1] Constrain long result labels and narrow-screen result buttons in `src/app/components/current-weather-sidebar/current-weather-sidebar.component.css` so text wraps or truncates without overlap or horizontal scrolling.
- [X] T009 [US1] Run `npm run build` from `package.json` after the search changes and manually perform 10 consecutive searches with results, verifying field/clear spacing, unchanged sidebar position, result layering, and empty/error states at desktop and narrow viewport sizes using `specs/005-weather-dashboard-polish/quickstart.md`.

## Phase 4: User Story 2 - Read a Cleaner Weather Summary (Priority: P1)

**Goal**: Show Minsk initially and simplify the sidebar's visual hierarchy without changing weather data behavior.

**Independent test**: Load the dashboard with no prior city selection, confirm Minsk is requested and displayed, then inspect the sidebar for removed labels/image, icon treatment, row alignment, and preserved city/weather behavior.

- [X] T010 [US2] Replace the initial Portland `LocationCity` value with a complete Minsk city, country, latitude, and longitude object in `src/app/app.component.ts`, preserving the existing initial `loadLocation` flow.
- [X] T011 [US2] Remove the `Representative conditions` label and city-image wrapper from `src/app/components/current-weather-sidebar/current-weather-sidebar.component.html` while retaining accessible current-weather and city information.
- [X] T012 [US2] Remove the sidebar weather icon outline, align the condition icon and description in one centered row below the divider, and remove obsolete city-image styles in `src/app/components/current-weather-sidebar/current-weather-sidebar.component.css`.
- [X] T013 [US2] Run `npm run build` from `package.json` and manually perform 10 fresh dashboard loads without a prior city selection, verifying Minsk each time along with the cleaned-sidebar scenarios from `specs/005-weather-dashboard-polish/quickstart.md`, without changing the API model contract.

## Phase 5: User Story 3 - Scan Forecast Highlights Efficiently (Priority: P2)

**Goal**: Remove redundant forecast headings, enlarge highlight icons modestly, and prevent responsive grid overflow.

**Independent test**: Inspect forecast and highlights at desktop and narrow viewport widths; verify redundant labels are absent, remaining headings align, icons are larger but contained, and no horizontal scrollbar appears.

- [X] T014 [P] [US3] Remove the `THIS WEEK` kicker from `src/app/components/weekly-forecast/weekly-forecast.component.html` and preserve the weekly forecast title's semantic heading structure.
- [X] T015 [P] [US3] Remove the `AT A GLANCE` kicker from `src/app/components/today-highlights/today-highlights.component.html` and preserve the Today's Highlights title's semantic heading structure.
- [X] T016 [US3] Set Daily Highlights icon width and height to exactly 36.4px, 1.3 times the current 28px dimensions, while preserving card containment, wrapping, and stable minimum dimensions in `src/app/components/today-highlights/today-highlights.component.css`.
- [X] T017 [US3] Adjust forecast grid minimum sizing and responsive columns in `src/app/components/weekly-forecast/weekly-forecast.component.css` so seven-day content fits available widths without hidden clipping or horizontal overflow.
- [X] T018 [US3] Run `npm run build` from `package.json` and manually verify forecast, highlights, heading alignment, icon containment, and horizontal-scroll scenarios from `specs/005-weather-dashboard-polish/quickstart.md`.

## Phase 6: Service Refactor and Formatting Polish

**Purpose**: Refactor the permitted service only after behavior fixes are complete, then format other TypeScript and HTML files without additional behavior changes.

- [X] T019 Refactor `src/app/services/weather-api.service.ts` after T005-T018: expand one-line methods and guards using Egyptian brackets, split dense request/normalization expressions, and add small private helpers for repeated validation while preserving public method signatures and normalized values.
- [X] T020 Run `npm run build` from `package.json` after the service refactor and resolve only service-related TypeScript/template errors without changing the specification behavior.
- [X] T021 [P] Apply Egyptian-bracket spacing and readable multiline formatting only to `src/app/app.component.html` and `src/app/components/current-weather-sidebar/current-weather-sidebar.component.html` after behavior tasks are complete; do not change bindings or displayed behavior.
- [X] T022 [P] Apply Egyptian-bracket spacing and readable multiline formatting only to `src/app/components/weekly-forecast/weekly-forecast.component.html`, `src/app/components/today-highlights/today-highlights.component.html`, and `src/app/components/temperature-unit-control/temperature-unit-control.component.html` after behavior tasks are complete; do not change bindings or displayed behavior.
- [X] T023 [P] Apply readable multiline formatting only to `src/app/app.component.ts`, `src/app/app.config.ts`, `src/app/app.routes.ts`, `src/app/components/current-weather-sidebar/current-weather-sidebar.component.ts`, `src/app/components/weekly-forecast/weekly-forecast.component.ts`, `src/app/components/today-highlights/today-highlights.component.ts`, `src/app/components/temperature-unit-control/temperature-unit-control.component.ts`, `src/app/data/weather-data.ts`, `src/app/models/temperature.utils.ts`, `src/app/models/weather.models.ts`, `src/app/models/weather-api.models.ts`, `src/app/utils/forecast-date.utils.ts`, and `src/app/utils/weather-mapping.utils.ts`, preserving their existing behavior and public APIs.
- [X] T024 Run `npm run build` from `package.json` after all formatting changes and inspect editor diagnostics for the modified TypeScript and HTML files.
- [X] T025 Manually execute the complete validation flow in `specs/005-weather-dashboard-polish/quickstart.md` at desktop and narrow viewport sizes, including 10 consecutive successful searches, 10 fresh Minsk loads, search overlay stability, sidebar cleanup, 36.4px highlight icons, forecast presentation, and horizontal-scroll absence.

## Dependencies

- T001 and T002 establish the baseline and file ownership before implementation.
- T003 and T004 are foundational checks and must complete before story work.
- User Story 1 tasks T005-T009 can be completed independently of User Story 2 and User Story 3 after the foundational phase.
- User Story 2 tasks T010-T013 can run independently of User Story 1 and User Story 3 after the foundational phase.
- User Story 3 tasks T014-T018 can run independently of User Story 1 and User Story 2 after the foundational phase; T014 and T015 are parallel.
- T019 depends on completion of all specification behavior tasks T005-T018.
- T020 depends on T019.
- T021-T023 depend on T020 and must be formatting-only; they may run in parallel with one another because they target separate file groups.
- T024 depends on T019-T023; T025 depends on T024.

## Parallel Execution Examples

### User Story 1

```text
Parallel: T006, T008
Sequential: T005 -> T007 -> T009
```

### User Story 2

```text
Parallel: T010, T011
Sequential: T012 -> T013
```

### User Story 3

```text
Parallel: T014, T015, T016
Sequential: T017 -> T018
```

### Final Polish

```text
Parallel: T021, T022, T023
Sequential: T019 -> T020 -> (T021/T022/T023) -> T024 -> T025
```

## Implementation Strategy

1. **MVP**: Complete User Story 1 so search results no longer displace the sidebar and the primary search interaction is comfortable.
2. **Incremental delivery**: Complete User Story 2 for the default city and sidebar hierarchy, then User Story 3 for forecast/highlights scanability and responsive width.
3. **Quality pass**: Refactor `weather-api.service.ts` only after behavior is stable, then apply formatting-only changes to other TypeScript and HTML files.
4. **Definition of done**: Production build passes, editor diagnostics show no relevant errors, and all manual quickstart scenarios pass at desktop and narrow viewport sizes without automated test artifacts.

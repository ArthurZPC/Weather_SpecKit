---

description: "Task list for Main Page Enhancements"
---

# Tasks: Main Page Enhancements

**Input**: Design documents from `/specs/003-main-page-enhancements/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/ui-contract.md](contracts/ui-contract.md), [quickstart.md](quickstart.md)

**Tests**: No automated test tasks are included because the project constitution prohibits test files, test runners, fixtures, and test-only dependencies. Validation tasks use build, diagnostics, and direct manual browser review.

**Organization**: Tasks are grouped by user story. Shared models and fixed data are completed in the foundational phase before story-specific components.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the planned Angular component and data directories without adding dependencies.

- [X] T001 Create the component directories under `src/app/components/current-weather-sidebar/`, `src/app/components/weekly-forecast/`, `src/app/components/today-highlights/`, and `src/app/components/temperature-unit-control/`.
- [X] T002 [P] Create the model and data directories under `src/app/models/` and `src/app/data/`.
- [X] T003 [P] Verify Angular Material component modules are available from the existing `@angular/material` dependency in `package.json` and identify the required imports in each consuming standalone component under `src/app/components/`.

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Define shared typed contracts, fixed representative values, and conversion rules required by every story.

- [X] T004 Create shared weather, forecast, highlight, location, time, and temperature-unit interfaces in `src/app/models/weather.models.ts`.
- [X] T005 Create the supported weather-condition visual mapping, fixed current weather, current time, location, seven ordered forecast entries, and six highlight metrics in `src/app/data/weather-data.ts`.
- [X] T006 [P] Add canonical Celsius conversion and consistent display-format helpers in `src/app/models/temperature.utils.ts`, preserving the data-model rules.
- [X] T007 Update `src/app/app.component.ts` to consume the shared models/data exports and define the selected temperature-unit state without retaining duplicate inline interfaces or fixed datasets.

**Checkpoint**: Shared model/data contracts are ready; user story components can now be implemented independently.

## Phase 3: User Story 1 - View Split Weather Dashboard (Priority: P1) MVP

**Goal**: Present the existing current-weather content in a left sidebar beside a responsive statistics region, with a visual-only search field above the sidebar content.

**Independent Test**: Run the app using [quickstart.md](quickstart.md), then verify at desktop width that the sidebar and statistics regions are adjacent, the sidebar retains current weather content, and the search field does not change weather or location.

### Implementation for User Story 1

- [X] T008 [P] [US1] Implement the standalone current-weather sidebar component in `src/app/components/current-weather-sidebar/current-weather-sidebar.component.ts` using Angular Material input/form-field presentation for the non-functional search field.
- [X] T009 [P] [US1] Add the sidebar structure and accessible labels in `src/app/components/current-weather-sidebar/current-weather-sidebar.component.html`, preserving current temperature, time, condition, icon, and location content.
- [X] T010 [P] [US1] Add sidebar and search-field responsive styling in `src/app/components/current-weather-sidebar/current-weather-sidebar.component.css`, including neutral image/icon fallbacks without clipping.
- [X] T011 [US1] Replace the monolithic root markup in `src/app/app.component.html` with the dashboard shell, sidebar component outlet, and statistics component region; omit the `Today, Week` caption.
- [X] T012 [US1] Add desktop two-region and narrow stacked dashboard layout styles in `src/app/app.component.css` without horizontal overflow or overlapping content.
- [X] T013 [US1] Import and compose the standalone sidebar component from `src/app/app.component.ts`, passing shared current-weather, time, and location data through typed inputs.

**Checkpoint**: User Story 1 is independently demonstrable with the sidebar, visual search field, preserved current weather content, and responsive shell.

## Phase 4: User Story 2 - Inspect Weekly Weather (Priority: P1)

**Goal**: Display exactly seven fixed forecast cards in Sunday-to-Saturday order with short weekday labels, visuals, and high/low values.

**Independent Test**: With the app running, inspect the statistics region and verify seven ordered cards remain visible and readable at desktop and narrow mobile widths.

### Implementation for User Story 2

- [X] T014 [P] [US2] Implement the standalone weekly forecast component in `src/app/components/weekly-forecast/weekly-forecast.component.ts` with typed forecast inputs and weather visual resolution.
- [X] T015 [P] [US2] Add the seven-card weekly forecast markup in `src/app/components/weekly-forecast/weekly-forecast.component.html`, exposing short weekday labels, accessible weather visuals, and formatted high/low temperatures.
- [X] T016 [P] [US2] Add responsive weekly-card styling in `src/app/components/weekly-forecast/weekly-forecast.component.css` with stable card dimensions and neutral visual fallback behavior.
- [X] T017 [US2] Compose the weekly forecast component in `src/app/app.component.html` and pass the fixed ordered forecast data and selected unit state from `src/app/app.component.ts`.

**Checkpoint**: User Stories 1 and 2 are independently demonstrable with the sidebar plus the fixed seven-day forecast.

## Phase 5: User Story 3 - Review Today's Highlights (Priority: P1)

**Goal**: Display `Today's Highlights` below the weekly forecast with six labeled metric cards.

**Independent Test**: Inspect below the weekly cards and identify UV Index, Wind Status, Sunrise & Sunset, Humidity, Visibility, and Air Quality without relying on hidden interactions.

### Implementation for User Story 3

- [X] T018 [P] [US3] Implement the standalone highlights component in `src/app/components/today-highlights/today-highlights.component.ts` with typed metric inputs.
- [X] T019 [P] [US3] Add the `Today's Highlights` heading and six required metric cards in `src/app/components/today-highlights/today-highlights.component.html` using Angular Material card presentation.
- [X] T020 [P] [US3] Add responsive highlights grid/card styling in `src/app/components/today-highlights/today-highlights.component.css`, keeping labels readable for long or unavailable values.
- [X] T021 [US3] Compose the highlights component below the weekly forecast in `src/app/app.component.html` and pass fixed highlight data from `src/app/app.component.ts`.

**Checkpoint**: User Stories 1 through 3 are independently demonstrable with the complete fixed-data dashboard content.

## Phase 6: User Story 4 - Use Temperature Unit Controls (Priority: P2)

**Goal**: Provide exactly two C/F controls and convert current and weekly temperatures from canonical Celsius values when the selected unit changes.

**Independent Test**: Select F and then C in the running app; verify current and weekly temperatures change consistently and return to canonical Celsius values without drift.

### Implementation for User Story 4

- [X] T022 [P] [US4] Implement the standalone temperature-unit control component in `src/app/components/temperature-unit-control/temperature-unit-control.component.ts` using an accessible Angular Material two-option control and typed selected-unit input/output.
- [X] T023 [P] [US4] Add exactly the C and F control markup and selected-state semantics in `src/app/components/temperature-unit-control/temperature-unit-control.component.html`.
- [X] T024 [P] [US4] Add compact responsive styling for the C/F control in `src/app/components/temperature-unit-control/temperature-unit-control.component.css`.
- [X] T025 [US4] Connect the unit control output to selected-unit state in `src/app/app.component.ts` and pass the state to sidebar, weekly forecast, and highlights components.
- [X] T026 [US4] Apply canonical Celsius conversion and consistent rounding to current and weekly temperature displays in `src/app/components/current-weather-sidebar/` and `src/app/components/weekly-forecast/`; leave today's highlights unchanged because they contain no temperature values.
- [X] T027 [US4] Place the unit control at the top of the statistics region in `src/app/app.component.html` and verify that no `Today, Week` caption is present.

**Checkpoint**: All four user stories are demonstrable, including functional C/F conversion and stable fixed-data behavior.

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validate integration, accessibility, responsive behavior, and constitution compliance across the complete dashboard.

- [X] T028 [P] Update shared visual tokens and global overflow/font rules in `src/styles.css` to support the dashboard composition without changing unrelated page behavior.
- [X] T029 [P] Review accessible names, keyboard reachability, selected state, image alternatives, and decorative-image hiding across `src/app/components/` and `src/app/app.component.html`.
- [X] T030 [P] Review image-load fallback behavior in `src/app/components/current-weather-sidebar/` and `src/app/components/weekly-forecast/` so labels and values remain visible when assets fail.
- [X] T031 Run editor diagnostics on `src/app/app.component.ts`, `src/app/app.component.html`, `src/app/app.component.css`, and all files under `src/app/components/`, `src/app/models/`, and `src/app/data/`.
- [X] T032 Run the production build using `package.json` script `npm run build` and resolve any TypeScript, template, style, or bundle errors.
- [X] T033 Execute all manual desktop/mobile and unit-switching scenarios in `specs/003-main-page-enhancements/quickstart.md` and confirm the observed results before marking the task complete.

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; directory and dependency checks can begin immediately.
- **Foundational (Phase 2)**: Depends on Phase 1; blocks all user story work because components share models, data, and conversion rules.
- **User Story 1 (Phase 3)**: Depends on Phase 2; MVP dashboard shell and sidebar.
- **User Story 2 (Phase 4)**: Depends on Phase 2 and the statistics region created by US1; can be developed in parallel with the internal US1 component tasks if the shell contract is agreed.
- **User Story 3 (Phase 5)**: Depends on Phase 2 and the statistics region created by US1; can be developed in parallel with US2 after the shell contract exists.
- **User Story 4 (Phase 6)**: Depends on Phase 2 and the display outlets from US1-US3; conversion wiring is completed after all temperature displays exist.
- **Polish (Phase 7)**: Depends on all desired user stories.

### User Story Dependencies

- **US1**: Starts after Phase 2; no dependency on other user stories and is the MVP.
- **US2**: Starts after Phase 2; requires the statistics region outlet from US1 for final composition.
- **US3**: Starts after Phase 2; requires the statistics region outlet from US1 for final composition.
- **US4**: Starts after Phase 2; requires current/weekly display outlets from US1 and US2 and any temperature-bearing highlight output from US3.

### Parallel Opportunities

- T002, T003 can run in parallel during setup.
- T006 can run in parallel with T004 and T005, then T007 integrates the shared exports.
- T008-T010 can run in parallel because they are separate sidebar files.
- T014-T016, T018-T020, and T022-T024 can each run in parallel within their component file groups after foundational contracts are complete.
- US2 and US3 component implementation can proceed in parallel after the US1 shell outlet is agreed.
- T028-T030 can run in parallel before the final diagnostics/build tasks.

## Parallel Example: User Story 1

```text
Task T008: Implement the sidebar TypeScript component in src/app/components/current-weather-sidebar/current-weather-sidebar.component.ts
Task T009: Add sidebar markup in src/app/components/current-weather-sidebar/current-weather-sidebar.component.html
Task T010: Add sidebar styling in src/app/components/current-weather-sidebar/current-weather-sidebar.component.css
```

## Parallel Example: User Stories 2 and 3

```text
Developer A: Complete T014-T017 for the weekly forecast in src/app/components/weekly-forecast/
Developer B: Complete T018-T021 for today's highlights in src/app/components/today-highlights/
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 setup and Phase 2 foundational models/data.
2. Complete Phase 3 US1 sidebar and responsive dashboard shell.
3. Run the US1 independent manual check from `specs/003-main-page-enhancements/quickstart.md`.
4. Demo the split page before adding forecast, highlights, or conversion behavior.

### Incremental Delivery

1. Add US2 for the fixed seven-day forecast and validate its card ordering/content.
2. Add US3 for today's six highlights and validate labels and placement.
3. Add US4 for functional C/F conversion and validate canonical-value round trips.
4. Complete Phase 7 diagnostics, build, accessibility, fallback, and responsive review.

### Parallel Team Strategy

1. One developer completes Setup and Foundational phases.
2. After the shared contracts exist, one developer owns US1 while another prepares US2 and a third prepares US3 component files.
3. The unit-control owner integrates US4 after temperature display outlets are available.
4. The team performs the final manual review together using `quickstart.md`.

## Notes

- Every task uses the required checklist format with a sequential ID and an exact file path.
- `[P]` marks tasks that can proceed in parallel without editing the same file or depending on incomplete work.
- No automated test files, test runners, fixtures, or test-only dependencies are to be created.
- Do not commit changes as part of task execution unless explicitly requested by the user.

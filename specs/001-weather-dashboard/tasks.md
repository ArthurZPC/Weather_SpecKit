---

description: "Executable task list for the Weather SpecKit initial weather panel"
---

# Tasks: Weather Dashboard Initial Page

**Input**: Design documents from `/specs/001-weather-dashboard/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-contract.md,
quickstart.md

**Tests**: No automated test tasks are included because the project constitution prohibits
unit, integration, and end-to-end tests. Validation uses static checks, the Angular build,
and direct manual browser review.

**Organization**: Tasks are grouped by user story to support incremental delivery and
independent manual verification.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the existing Angular workspace for the requested Material-based page.

- [X] T001 Add the Angular Material dependency to `package.json` and update `package-lock.json` using the repository's Angular-compatible package installation workflow
- [X] T002 [P] Confirm the existing Angular 19 standalone bootstrap and route entry points in `src/main.ts`, `src/app/app.config.ts`, and `src/app/app.routes.ts` remain the application boundary
- [X] T003 [P] Set the document title to `Weather SpecKit` and retain the responsive viewport metadata in `src/index.html`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared display data, visual tokens, and the panel shell required by all
user stories.

**Checkpoint**: Foundation ready - user story implementation can begin.

- [X] T004 Define the typed current-weather, location-city, and current-time display model in `src/app/app.component.ts` using the fields and relationships from `specs/001-weather-dashboard/data-model.md`
- [X] T005 [P] Define white-theme, typography, spacing, and page reset tokens in `src/styles.css`
- [X] T006 [P] Add the centered panel shell, stable visual-slot dimensions, and narrow-viewport layout rules in `src/app/app.component.css`
- [X] T007 Create the root panel composition in `src/app/app.component.html` with semantic regions for weather visual, temperature, time, divider, condition details, and city location
- [X] T008 Configure only the Angular Material imports/providers needed by the panel in `src/app/app.component.ts` and `src/app/app.config.ts`, avoiding unrelated modules

---

## Phase 3: User Story 1 - View Current Weather Panel (Priority: P1) MVP

**Goal**: Present one centered current-weather panel with the complete requested reading order
and a visual for every supported weather state.

**Independent Test**: Open the initial page manually and confirm one panel is centered, only
current-weather content is present, and the six required content groups appear in the specified
top-to-bottom order.

### Implementation for User Story 1

- [X] T009 [US1] Add the representative initial weather state and city/time values to the local display model in `src/app/app.component.ts`, marking the content as representative rather than live
- [X] T010 [US1] Define the finite 21-state weather catalog from FR-004 and map each state to a distinct neutral visual treatment and readable description in `src/app/app.component.ts`
- [X] T011 [US1] Render the weather condition visual and representative state label at the top of the panel in `src/app/app.component.html`
- [X] T012 [US1] Render the temperature with its unit and the weekday/hour directly beneath it in `src/app/app.component.html`
- [X] T013 [US1] Style the weather visual, temperature hierarchy, and time grouping to match the reference panel composition in `src/app/app.component.css`
- [X] T014 [US1] Add semantic labels and accessible names for informative weather visual content in `src/app/app.component.html` and `src/app/app.component.ts`

**Checkpoint**: User Story 1 is independently demonstrable as the centered current-weather
panel MVP.

---

## Phase 4: User Story 2 - Read Current Conditions (Priority: P1)

**Goal**: Make temperature, time, condition icon, and description immediately legible and
preserve the divider-based information hierarchy.

**Independent Test**: Inspect the panel manually at desktop and narrow mobile sizes and confirm
the temperature, weekday, hour, divider, condition icon, and description are readable,
distinct, and non-overlapping.

### Implementation for User Story 2

- [X] T015 [P] [US2] Add the horizontal divider immediately after the weekday/hour region in `src/app/app.component.html`
- [X] T016 [P] [US2] Add the small condition icon slot and readable condition description below the divider in `src/app/app.component.html`
- [X] T017 [US2] Style divider spacing, condition icon sizing, description contrast, and text hierarchy in `src/app/app.component.css`
- [X] T018 [US2] Add unavailable-weather handling that preserves the panel structure and displays an explicit unavailable message without silently substituting another state in `src/app/app.component.ts` and `src/app/app.component.html`
- [X] T019 [US2] Add responsive rules for negative and multi-digit temperatures, long condition descriptions, and narrow viewports in `src/app/app.component.css`

**Checkpoint**: User Stories 1 and 2 are independently readable and manually verifiable.

---

## Phase 5: User Story 3 - Identify Location (Priority: P2)

**Goal**: Show the representative city image slot and city name beneath the condition details
with a deliberate visual gap and resilient fallback behavior.

**Independent Test**: Inspect the bottom of the panel manually and confirm the city visual and
city name are grouped, legible, separated from condition details, and remain usable when the
city name is long or the image is unavailable.

### Implementation for User Story 3

- [X] T020 [P] [US3] Add the representative city name and neutral city-image fallback state to the location display model in `src/app/app.component.ts`
- [X] T021 [US3] Render the city visual slot and city name below condition details with the required small gap in `src/app/app.component.html`
- [X] T022 [US3] Style the city visual, label treatment, contrast, and gap to match the reference panel hierarchy in `src/app/app.component.css`
- [X] T023 [US3] Add city-image fallback and long-city-name handling that preserves the city label without clipping or overlap in `src/app/app.component.html` and `src/app/app.component.css`
- [X] T024 [US3] Add accessible naming for the city image slot and ensure decorative fallback blocks are not announced redundantly in `src/app/app.component.html`

**Checkpoint**: All requested content is present and the location section is independently
manually verifiable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verify the complete panel against the contract, responsive constraints, and
constitution without adding automated test artifacts.

- [X] T025 [P] Review `src/app/app.component.html` against `specs/001-weather-dashboard/contracts/ui-contract.md` and remove any forecast, highlight, search, or live-data UI
- [X] T026 [P] Review `src/app/app.component.css` at desktop and narrow mobile dimensions for clipping, overlap, horizontal scrolling, contrast, and stable visual-slot sizing
- [X] T027 [P] Review `src/app/app.component.ts` for clean naming, finite-state coverage, representative-data labeling, and no unnecessary abstraction or dependency
- [X] T028 Run the permitted static/type validation with `npm run build` from the repository root and resolve compilation errors without creating or running tests
- [X] T029 Manually execute the scenarios in `specs/001-weather-dashboard/quickstart.md` and record any visual or responsive corrections in the affected source files

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: T001-T003 can start immediately; T001 must complete before Material imports in T008.
- **Foundational (Phase 2)**: T004-T008 depend on the setup boundary and block all user stories.
- **User Story 1 (Phase 3)**: T009-T014 depend on the foundational phase and deliver the MVP.
- **User Story 2 (Phase 4)**: T015-T019 depend on the panel shell from Phase 2 and can be developed after or alongside US1 where files do not conflict.
- **User Story 3 (Phase 5)**: T020-T024 depend on the panel shell from Phase 2 and can be developed after or alongside US1/US2 where files do not conflict.
- **Polish (Phase 6)**: T025-T029 depend on the desired user stories being complete.

### User Story Dependencies

- **US1 (P1)**: Depends on Phase 2 only; this is the MVP path.
- **US2 (P1)**: Depends on Phase 2; shares the root panel files with US1, so coordinate edits when working in parallel.
- **US3 (P2)**: Depends on Phase 2; shares the root panel files with the other stories, so coordinate edits when working in parallel.

### Parallel Opportunities

- T002, T003, and T005-T006 can run in parallel because they touch separate setup/style surfaces.
- T015 and T016 can run in parallel before their shared styling task T017.
- T020 can run in parallel with T015-T017 because it changes the display model rather than the divider markup.
- T025-T027 can run in parallel as separate review passes over HTML, CSS, and TypeScript.
- Full user-story parallel work is possible after Phase 2 with coordinated ownership of the shared root component files.

## Parallel Example: User Story 1

```text
Task: T010 Define the finite weather-state catalog in src/app/app.component.ts
Task: T012 Render temperature and weekday/hour in src/app/app.component.html
Task: T013 Style weather visual and temperature hierarchy in src/app/app.component.css
```

## Parallel Example: User Story 2

```text
Task: T015 Add the divider in src/app/app.component.html
Task: T016 Add condition icon and description in src/app/app.component.html
Task: T019 Add responsive temperature and description rules in src/app/app.component.css
```

## Parallel Example: User Story 3

```text
Task: T020 Add city display data in src/app/app.component.ts
Task: T021 Render city visual and name in src/app/app.component.html
Task: T022 Style city visual and label in src/app/app.component.css
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 setup.
2. Complete Phase 2 foundational panel shell and local model.
3. Complete Phase 3 User Story 1.
4. Run `npm run build` and manually verify the centered panel at desktop and narrow mobile sizes.
5. Demonstrate the MVP before adding condition-detail and location polish.

### Incremental Delivery

1. Add US1 for the centered weather panel and representative state visuals.
2. Add US2 for the divider, condition icon/description, and readability behavior.
3. Add US3 for the city image slot, city name, and location fallback.
4. Complete Phase 6 static and manual review against the UI contract and quickstart.

## Notes

- Every task begins with a checkbox and sequential task ID.
- User-story tasks include exactly one story label: `[US1]`, `[US2]`, or `[US3]`.
- `[P]` appears only on tasks that can be parallelized without incomplete-task dependencies.
- Every task names at least one concrete repository file path.
- No automated test task, test file, test runner, fixture, or test-only dependency is included.

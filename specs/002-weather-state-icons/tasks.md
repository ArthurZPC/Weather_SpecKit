---

description: "Executable task list for replacing stationary weather visuals with existing weather icons"
---

# Tasks: Weather State Icons

**Input**: Design documents from `/specs/002-weather-state-icons/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/ui-contract.md](contracts/ui-contract.md), [quickstart.md](quickstart.md)

**Tests**: No automated test tasks are included because the project constitution prohibits test artifacts. Validation uses type checking, static analysis, and direct browser review.

**Organization**: Tasks are grouped by user story so each story can be implemented and manually verified as an independent increment.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the existing asset surface before changing application code.

- [x] T001 Review the SVG inventory in `public/images/weather-states/` against the mapping in `specs/002-weather-state-icons/research.md` and record any missing filenames before implementation.

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish one typed source of truth for state-to-icon resolution.

- [x] T002 Extend `WeatherStateVisual` and every entry in `weatherStateVisuals` in `src/app/app.component.ts` with an explicit `iconPath` using the researched asset mapping.
- [x] T003 Add the neutral `/images/weather-states/not-available.svg` fallback resolution to the current-weather presentation data in `src/app/app.component.ts`, ensuring unavailable data never selects a state-specific icon.

## Phase 3: User Story 1 - View Weather State Icons (Priority: P1)

**Goal**: Replace the main stationary weather visual with the matching existing SVG icon while preserving the current panel content and order.

**Independent Test**: Open the main page with the representative `Partly Cloudy` state and confirm that the large visual area displays the matching icon, the condition heading remains below it, and temperature, time, details, and location remain in their existing order.

- [x] T004 [US1] Replace the CSS-only primary weather visual element with an image binding driven by the selected `iconPath` in `src/app/app.component.html`.
- [x] T005 [US1] Preserve the primary visual region's stable square display area and image containment while removing stationary weather-state background artwork in `src/app/app.component.css`.
- [x] T006 [US1] Add primary icon load-error fallback behavior that swaps to `/images/weather-states/not-available.svg` without hiding the condition heading or changing the panel structure in `src/app/app.component.html` and `src/app/app.component.ts`.

## Phase 4: User Story 2 - Understand Icon Meaning (Priority: P1)

**Goal**: Make the primary icon accessible, visually clear, and responsive.

**Independent Test**: Inspect the rendered primary icon with browser accessibility tooling at desktop and narrow mobile widths; confirm its text alternative names the condition, it is not clipped, and no content overlaps.

- [x] T007 [US2] Set the primary icon's accessible alternative from the current condition and mark only duplicate decorative imagery as hidden from assistive technology in `src/app/app.component.html`.
- [x] T008 [P] [US2] Add responsive primary icon sizing, object containment, and fallback presentation rules in `src/app/app.component.css` so all mapped SVGs remain fully visible without layout shift.
- [x] T009 [US2] Verify the primary icon and condition heading retain sufficient contrast and readable spacing in `src/app/app.component.css` and `src/app/app.component.html`.

## Phase 5: User Story 3 - Preserve Condition Detail Icon (Priority: P2)

**Goal**: Replace the small detail dot with a matching weather icon while keeping it visually subordinate and semantically non-redundant.

**Independent Test**: Compare the primary and detail icons for `Partly Cloudy`; confirm both represent the same mapped asset, the detail icon is smaller, and assistive technology does not announce the duplicate twice.

- [x] T010 [US3] Replace the condition detail dot with the same selected `iconPath` and mark the duplicate image decorative in `src/app/app.component.html`.
- [x] T011 [P] [US3] Add fixed detail icon dimensions, object containment, and spacing rules in `src/app/app.component.css` so the indicator remains smaller than the primary icon.
- [x] T012 [US3] Ensure the condition detail icon uses the unavailable asset when current weather is unavailable and retains the existing description text in `src/app/app.component.ts` and `src/app/app.component.html`.

## Final Phase: Polish & Cross-Cutting Concerns

**Purpose**: Validate the complete icon workflow and keep implementation documentation aligned.

- [x] T013 [P] Review all 21 state mappings in `src/app/app.component.ts` against `public/images/weather-states/`, including closest-match states documented in `specs/002-weather-state-icons/research.md`.
- [x] T014 Run `npm run build` from the repository root, then manually execute every scenario in `specs/002-weather-state-icons/quickstart.md`, including confirming the main panel reaches a visually stable state within 2 seconds at desktop and narrow mobile viewport sizes.
- [x] T015 Review `src/app/app.component.ts`, `src/app/app.component.html`, and `src/app/app.component.css` for removal of obsolete stationary visual rules and confirm no new dependency or automated test artifact was added.

## Dependencies & Execution Order

### Dependency Graph

```text
 T001 -> T002 -> T003
                    |\
                    | T004 -> T006
                    |   |
                    |   v
                    |  T007 -> T009
                    |
                    v
                   T005 -> T008
                            |
                            v
                   T010 -> T012
                    ^       |
                    |       v
                    +------ T011
                            |
                            v
                   T013 ----+---- T015
                       \          /
                        +-> T014
```

### User Story Completion Order

1. Foundational mapping: T001-T003
2. US1: T004-T006
3. US2: T007-T009
4. US3: T010-T012
5. Polish and validation: T013-T015

US2 and US3 depend on US1's resolved icon binding because both consume the same selected icon path. No story is blocked by external services or data migration.

## Parallel Execution Examples

### User Story 1

- T004 and T005 can run in parallel after T003 establishes the icon path and fallback data; reconcile the final region/class names before validation.

### User Story 2

- T007 and T008 can run in parallel after T004 and T005 respectively; T009 follows the completed accessibility markup and responsive styling.

### User Story 3

- T010 and T011 can run in parallel after the US1/US2 icon binding is available; reconcile the final detail icon class before manual review.

### Polish

- T013 and T015 can run in parallel after T012. T014 runs after both reviews and validates the performance criterion from SC-007.

## Implementation Strategy

1. Complete T001-T003 to make the asset mapping explicit and safe.
2. Deliver US1 first as the MVP: the main weather state is rendered by an existing matching SVG.
3. Add US2 accessibility and responsive guarantees.
4. Add US3 consistency for the smaller condition indicator.
5. Run the quickstart scenarios and final static review without creating automated test artifacts.

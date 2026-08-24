---

description: "Task list for live Open-Meteo weather integration"
---

# Tasks: Live Weather API Integration

**Input**: Design documents from `/specs/004-live-weather-api/`

**Prerequisites**: [plan.md](plan.md), [spec.md](spec.md), [research.md](research.md), [data-model.md](data-model.md), [contracts/ui-contract.md](contracts/ui-contract.md), [quickstart.md](quickstart.md)

**Tests**: No automated test tasks are included because the project constitution prohibits test files, test runners, fixtures, and test-only dependencies. Validation uses the build, editor diagnostics, endpoint inspection, and direct manual browser verification described in [quickstart.md](quickstart.md).

**Organization**: Tasks are grouped by user story so each increment has a clear goal and independent manual acceptance criteria.

## Dependency Order

- Setup tasks establish HTTP provider and API model boundaries.
- Foundational tasks implement shared date, weather-code, measurement-mapping, and normalization helpers.
- US1 depends on foundational tasks and delivers the initial live dashboard.
- US2 depends on the API service from US1 and adds location search and selection.
- US3 depends on normalized live data from US1 and mapping helpers from the foundation, then completes user-facing formatting and unit behavior.
- US4 depends on the request orchestration from US1 and search flow from US2, then hardens loading, error, no-result, and stale-response behavior.
- Polish tasks run after all user stories and cover responsive review, attribution, diagnostics, and final build validation.

## Phase 1: Setup

- [X] T001 Add the Angular HTTP client provider in `src/app/app.config.ts` and preserve the existing router and zone providers
- [X] T002 [P] Add API response interfaces for forecast, geocoding, and air-quality payloads in `src/app/models/weather-api.models.ts`
- [X] T003 [P] Extend normalized dashboard interfaces for selected locations, live snapshots, forecast dates, highlight availability, and request state in `src/app/models/weather.models.ts`
- [X] T004 [P] Create the service directory and define the public `WeatherApiService` method boundaries in `src/app/services/weather-api.service.ts`

## Phase 2: Foundational

- [X] T005 Implement the Sunday-to-Saturday date-range helper, including the Sunday-today case, in `src/app/utils/forecast-date.utils.ts`
- [X] T006 [P] Implement WMO weather-code to existing condition/icon mapping with a neutral unsupported-code fallback in `src/app/utils/weather-mapping.utils.ts`
- [X] T007 [P] Implement UV, Beaufort wind, compass direction, visibility, and European AQI description mappings in `src/app/utils/weather-mapping.utils.ts`
- [X] T008 [P] Implement local ISO date/time, daylight-duration, numeric-unit, and unavailable-value formatting helpers in `src/app/utils/weather-mapping.utils.ts`
- [X] T009 Implement strict validation for required forecast current fields, seven aligned daily arrays, geocoding coordinates, and air-quality `current.european_aqi` in `src/app/services/weather-api.service.ts`
- [X] T010 Implement indexed zipping of `daily.time` and all requested daily arrays into normalized forecast entries in `src/app/services/weather-api.service.ts`
- [X] T011 Run `npm run build` and review editor diagnostics for the new model, utility, and provider boundaries before starting user-story integration in `src/app/app.config.ts`, `src/app/models/weather-api.models.ts`, `src/app/models/weather.models.ts`, `src/app/services/weather-api.service.ts`, and `src/app/utils/forecast-date.utils.ts`

## Phase 3: User Story 1 - View Live Weather for the Selected Location (Priority: P1)

**Goal**: Replace fixed dashboard data with one coherent live weather and AQI snapshot for the default selected location.

**Independent test**: Open the dashboard with network access, wait for loading to finish, and confirm one city label, current weather/time, exactly seven Sunday-to-Saturday forecast cards, six highlight cards, and the unchanged location image placeholder.

- [X] T012 [US1] Implement the forecast URL builder with coordinates, current variables, daily variables, `timezone=auto`, and calculated `start_date`/`end_date` in `src/app/services/weather-api.service.ts`
- [X] T013 [US1] Implement the geocoding-independent combined weather/AQI request using the forecast and air-quality endpoints in `src/app/services/weather-api.service.ts`
- [X] T014 [US1] Normalize current weather, local weekday/time, seven forecast entries, and today-aligned daily highlight source values into the dashboard model in `src/app/services/weather-api.service.ts`
- [X] T015 [US1] Add the default selected location and initial loading/ready/error state orchestration in `src/app/app.component.ts`
- [X] T016 [US1] Replace fixed `currentWeather`, `currentTime`, `location`, `weeklyForecast`, and `todayHighlights` inputs with live root-component state in `src/app/app.component.html`
- [X] T017 [US1] Update the sidebar, weekly forecast, and highlights component inputs to accept normalized live values while preserving the existing location image placeholder in `src/app/components/current-weather-sidebar/current-weather-sidebar.component.ts`, `src/app/components/weekly-forecast/weekly-forecast.component.ts`, and `src/app/components/today-highlights/today-highlights.component.ts`
- [X] T018 [US1] Display the selected city label, live current temperature/time, seven forecast days, and live highlight source values without changing the location image placeholder in `src/app/components/current-weather-sidebar/current-weather-sidebar.component.html`, `src/app/components/weekly-forecast/weekly-forecast.component.html`, and `src/app/components/today-highlights/today-highlights.component.html`

## Phase 4: User Story 2 - Search and Select a Location (Priority: P1)

**Goal**: Let users find a location, distinguish matching results, select one, and refresh every dashboard region for that location.

**Independent test**: Search for `Berlin`, confirm selectable results include `<Name> / Lat: <Latitude> Lon: <Longitude>`, select one, and verify the city label and all weather sections update together.

- [X] T019 [US2] Implement the geocoding URL builder and up-to-10-result request with trimmed query, English language, and JSON format in `src/app/services/weather-api.service.ts`
- [X] T020 [US2] Normalize geocoding results into selectable location objects with name, country, optional administrative area, coordinates, timezone, and exact display label in `src/app/services/weather-api.service.ts`
- [X] T021 [US2] Add trimmed query handling, search submission, result list state, and no-results state in `src/app/app.component.ts`
- [X] T022 [US2] Add a labeled search form, selectable result list, result context, loading indicator, and no-results message above the current weather content in `src/app/components/current-weather-sidebar/current-weather-sidebar.component.html`
- [X] T023 [US2] Add search/result inputs and selection/output events while preserving the existing current-weather inputs in `src/app/components/current-weather-sidebar/current-weather-sidebar.component.ts`
- [X] T024 [US2] Connect sidebar location selection to the root weather reload and active city update in `src/app/app.component.html`
- [X] T025 [US2] Style the search field, result list, active/loading states, and narrow-viewport layout without clipping or overlap in `src/app/components/current-weather-sidebar/current-weather-sidebar.component.css`

## Phase 5: User Story 3 - Understand Weather Descriptions and Units (Priority: P1)

**Goal**: Make every live code and measurement readable through the specified labels, icons, units, and conversion behavior.

**Independent test**: Inspect representative WMO, UV, wind, sunrise/sunset, humidity, visibility, AQI, Celsius, and Fahrenheit values and verify the required descriptions and formats.

- [X] T026 [US3] Complete WMO mappings for all returned forecast/current codes and connect mapped condition visuals to normalized current and weekly entries in `src/app/utils/weather-mapping.utils.ts` and `src/app/services/weather-api.service.ts`
- [X] T027 [US3] Implement the six UV bands and corresponding icon selection for numeric daily UV values in `src/app/utils/weather-mapping.utils.ts`
- [X] T028 [US3] Implement nearest one/two-letter compass direction, Beaufort description, and km/h formatting for wind values in `src/app/utils/weather-mapping.utils.ts`
- [X] T029 [US3] Implement `HH:MM / HH:MM`, `XXh YYm of daylight`, whole-number humidity percentage, kilometer visibility, and six-range visibility description formatting in `src/app/utils/weather-mapping.utils.ts`
- [X] T030 [US3] Implement the six accepted European AQI ranges, icon selection, and exact `Air Quality (European AQI)` label in `src/app/utils/weather-mapping.utils.ts` and `src/app/services/weather-api.service.ts`
- [X] T031 [US3] Update highlight presentation to render mapped value/detail/icon fields and explicit unavailable values in `src/app/components/today-highlights/today-highlights.component.html` and `src/app/components/today-highlights/today-highlights.component.ts`
- [X] T032 [US3] Preserve canonical Celsius values and connect the existing C/F control to all current and forecast temperatures without repeated-rounding drift in `src/app/app.component.ts`, `src/app/models/temperature.utils.ts`, and `src/app/components/weekly-forecast/weekly-forecast.component.ts`
- [X] T033 [US3] Verify the live mappings, exact formats, and unit switching manually using the representative scenarios in `specs/004-live-weather-api/quickstart.md`

## Phase 6: User Story 4 - Recover from Unavailable Live Data (Priority: P2)

**Goal**: Keep the dashboard honest and recoverable during loading, empty search, malformed response, network, HTTP, and request-race failures.

**Independent test**: Block an Open-Meteo request and search for an unlikely term, then verify readable error/no-result feedback, preserved controls, no fabricated values, and no mixed-location data.

- [X] T034 [US4] Add explicit loading, ready, field-unavailable, and error state types and user-readable messages in `src/app/models/weather.models.ts`
- [X] T035 [US4] Add request identity or cancellation protection so only the latest selected location response can update root state in `src/app/app.component.ts` and `src/app/services/weather-api.service.ts`
- [X] T036 [US4] Handle HTTP/network failures, malformed payloads, incomplete daily arrays, and missing AQI without fabricating zero or stale values in `src/app/services/weather-api.service.ts`
- [X] T037 [US4] Add retry behavior that re-requests the active location without requiring a page reload in `src/app/app.component.ts`
- [X] T038 [US4] Render loading, error, unavailable-field, retry, and no-results feedback while preserving search/unit controls in `src/app/app.component.html` and `src/app/components/current-weather-sidebar/current-weather-sidebar.component.html`
- [X] T039 [US4] Add accessible status announcements and keyboard behavior for search results, loading, errors, and retry controls in `src/app/components/current-weather-sidebar/current-weather-sidebar.component.html` and `src/app/components/current-weather-sidebar/current-weather-sidebar.component.ts`
- [X] T040 [US4] Verify no-results, blocked-request, malformed-data, rapid-location-selection, and retry behavior manually using browser network controls and `specs/004-live-weather-api/quickstart.md`

## Phase 7: Polish & Cross-Cutting Concerns

- [X] T041 [P] Add Open-Meteo source/attribution text and public-service availability limitation to the dashboard footer in `src/app/app.component.html`
- [X] T042 [P] Review responsive search results, forecast cards, highlights, and status messages for desktop and narrow mobile overflow or overlap in `src/app/app.component.css`, `src/app/components/current-weather-sidebar/current-weather-sidebar.component.css`, `src/app/components/weekly-forecast/weekly-forecast.component.css`, and `src/app/components/today-highlights/today-highlights.component.css`
- [X] T043 [P] Review API URLs, encoded query parameters, timezone handling, Sunday/Saturday boundaries, daily-array alignment, and unavailable fallbacks in `src/app/services/weather-api.service.ts`, `src/app/utils/forecast-date.utils.ts`, and `src/app/utils/weather-mapping.utils.ts`
- [X] T044 Run editor diagnostics and `npm run build`, then resolve any feature-related errors in the touched `src/app` files
- [X] T045 Perform the complete manual validation sequence in `specs/004-live-weather-api/quickstart.md` and record any implementation follow-up in the feature workspace

## Parallel Execution Examples

### Setup and foundation

- T002, T003, and T004 can run in parallel after the plan is understood.
- T006, T007, and T008 can run in parallel after the model boundaries are agreed.

### User Story 1

- T012 and T013 can be developed in parallel once the service boundary exists.
- T017 and T018 can proceed in parallel after T014 defines the normalized inputs.

### User Story 2

- T019 and T020 can proceed in parallel with T022 and T023 after the service API is available.
- T025 can proceed independently after the sidebar search markup is established.

### User Story 3

- T027, T028, T029, and T030 can proceed in parallel because they implement separate mapping concerns in one utility file and should be merged carefully.
- T031 and T032 can proceed in parallel after normalized live data is available.

### User Story 4 and polish

- T036 and T039 can proceed in parallel after request state boundaries are defined.
- T041, T042, and T043 can proceed in parallel after all story behavior is integrated.

## Implementation Strategy

1. **MVP**: Complete Setup, Foundational, and User Story 1 to replace fixed dashboard data with a coherent live default-location snapshot.
2. **Location workflow**: Add User Story 2 so the selected city drives the same service and normalized dashboard state.
3. **Interpretation quality**: Complete User Story 3 so every required code, measurement, range, icon, and unit is user-readable.
4. **Reliability**: Complete User Story 4 and polish so failures, races, accessibility, attribution, and responsive behavior are explicit.
5. **Validation**: Run only build, diagnostics, endpoint inspection, and the manual quickstart workflow; do not create or run automated test artifacts.

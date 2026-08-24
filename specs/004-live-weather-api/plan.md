# Implementation Plan: Live Weather API Integration

**Branch**: `004-live-weather-api` | **Date**: 2026-08-24 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/004-live-weather-api/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Add a focused Angular weather API service that retrieves geocoded locations, the selected location's seven-day Sunday-to-Saturday forecast, current weather, daily highlight values, and European AQI from Open-Meteo. Normalize parallel-array responses into the existing dashboard models, keep the root component responsible for selected-location and loading/error state, and preserve the existing child components and location-image placeholder.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.7, Angular 19 standalone components

**Primary Dependencies**: Existing Angular 19 `HttpClient` and RxJS 7.8; no new packages

**Storage**: N/A; active location and live dashboard state remain in memory

**Testing**: Production build, editor diagnostics, direct manual browser verification, and endpoint inspection; automated tests are prohibited by the constitution

**Target Platform**: Responsive browser dashboard on desktop and narrow mobile viewports

**Project Type**: Angular web application

**Performance Goals**: Search results within 2 seconds under typical network conditions; selected-location weather and AQI within 5 seconds or an actionable error

**Constraints**: Use the three specified Open-Meteo endpoints; request Celsius and km/h source values; normalize seven aligned daily arrays; use the containing Sunday-Saturday week; no background refresh; preserve the image placeholder; reject stale responses; no automated test artifacts

**Scale/Scope**: One dashboard route, one active location, up to 10 search results, seven forecast entries, six highlight cards, and one AQI value per selection

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

*GATE: PASS*

- **Clean Code**: Keep endpoint construction, response parsing, date calculations, and display mapping in focused service/model helpers.
- **Simple UX**: Keep one active location, show clear search/loading/error/no-result states, and update all dashboard regions together.
- **Responsive Design**: Preserve responsive layouts and ensure search results and live values do not overflow or overlap.
- **Minimal Dependencies**: Use existing Angular HTTP and RxJS capabilities; add no package.
- **No Automated Testing**: Use build, diagnostics, endpoint inspection, and manual browser verification only.
- **Product Constraints**: Preserve current dashboard behavior and image placeholder, document public-service limitations, and keep API failures user-readable.

No gate violations require a complexity exception.

## Project Structure

### Documentation (this feature)

```text
specs/004-live-weather-api/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
src/
├── app/
│   ├── app.component.ts/html/css       # Active location, request state, and dashboard composition
│   ├── app.config.ts                    # HttpClient provider
│   ├── services/
│   │   └── weather-api.service.ts       # Open-Meteo requests and normalized results
│   ├── models/
│   │   ├── weather.models.ts             # Existing and live dashboard models
│   │   └── weather-api.models.ts         # API response shapes and service contracts
│   ├── utils/
│   │   ├── forecast-date.utils.ts       # Sunday/Saturday range and date formatting
│   │   └── weather-mapping.utils.ts     # WMO, UV, Beaufort, visibility, and AQI mappings
│   └── components/
│       ├── current-weather-sidebar/     # Search UI and current conditions
│       ├── weekly-forecast/              # Seven normalized forecast entries
│       ├── today-highlights/             # Six normalized highlight metrics
│       └── temperature-unit-control/     # Existing C/F control
└── styles.css

public/
└── images/weather-states/               # Existing visuals and neutral fallbacks
```

**Structure Decision**: Extend the existing standalone Angular application with one injectable `WeatherApiService`, API-only interfaces, and pure mapping/date helpers. The root component owns active location, request state, selected unit, and normalized view data; existing child components remain presentational. Use `forkJoin` for weather and AQI requests and cancellation or request identity checks so older responses cannot overwrite the latest selection. Display Open-Meteo attribution and the public-service availability note in the dashboard footer. Do not create test directories or test artifacts.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | No constitution violations identified. |

## Phase 0: Research Decisions

Research is recorded in [research.md](research.md). The endpoint contracts, array alignment, date range, unit strategy, mapping fallbacks, request race handling, and public-service dependency are resolved.

## Phase 1: Design Decisions

- [data-model.md](data-model.md) defines API response shapes, normalized dashboard entities, validation rules, and request lifecycle.
- [contracts/ui-contract.md](contracts/ui-contract.md) defines the user-visible search, loading, error, forecast, highlights, and attribution behavior.
- [quickstart.md](quickstart.md) defines build and manual browser checks for initial load, location selection, mappings, stale-response protection, and failures.

## Post-Design Constitution Check

*GATE: PASS*

The design uses focused service and helper boundaries for clean code, keeps the location workflow direct and explicit, preserves responsive child components, adds no dependency beyond existing Angular capabilities, and uses only static/build/manual validation. The public API dependency and its failure/attribution behavior are documented in the research, data model, UI contract, and quickstart artifacts.

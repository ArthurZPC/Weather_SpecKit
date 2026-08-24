# Implementation Plan: Main Page Enhancements

**Branch**: `003-main-page-enhancements` | **Date**: 2026-08-24 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/003-main-page-enhancements/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Split the existing current-weather page into a responsive sidebar and an adjacent statistics area. Implement the weekly forecast and six today's-highlights cards with fixed typed data, retain the visual-only search field, and add functional Celsius/Fahrenheit conversion driven by canonical Celsius values. Use standalone Angular components and Angular Material primitives, with domain types and fixed data moved into dedicated files.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript 5.7, Angular 19 standalone components

**Primary Dependencies**: Existing Angular 19 packages and Angular Material 19.2; no new dependencies

**Storage**: N/A; fixed representative data in typed source files and static assets under `public/`

**Testing**: Angular build, editor diagnostics, and direct manual browser verification; automated tests are prohibited by the constitution

**Target Platform**: Responsive browser viewport on desktop and narrow mobile sizes

**Project Type**: Angular web application

**Performance Goals**: Preserve the existing 2-second visual-stability target and keep unit changes immediate during interaction

**Constraints**: Reuse installed Material and existing weather assets; no live weather/search service; preserve current sidebar content; avoid horizontal scrolling and overlap; convert from canonical Celsius values; no test artifacts

**Scale/Scope**: One dashboard view, one fixed current-weather record, seven weekly entries, six highlight cards, and two unit states

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

*GATE: PASS*

- Clean Code: Split the monolithic root component into focused standalone components and dedicated typed data/model files.
- Simple UX: Keep search presentation-only, expose only the requested dashboard controls, and make unit switching visibly update values.
- Responsive Design: Define desktop two-region and narrow stacked layouts with stable card/control dimensions and no horizontal overflow.
- Minimal Dependencies: Use the already installed Angular Material package and existing static assets; add no package or external service.
- No Automated Testing: Validate with build, diagnostics, and manual browser review; do not add tests or test-only dependencies.
- Product Constraints: Preserve current weather content, explicitly bound fixed data and search scope, and document fallback/conversion behavior.

*Post-design gate: PASS*

The Phase 1 data model and UI contract preserve the same principles: conversion is derived from canonical fixed values, Material controls remain accessible, responsive behavior is contractually required, no external integration is introduced, and validation remains limited to build, diagnostics, and manual review.

## Project Structure

### Documentation (this feature)

```text
specs/003-main-page-enhancements/
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
│   ├── app.component.ts/html/css       # Dashboard composition and unit state
│   ├── models/
│   │   ├── weather.models.ts            # Weather conditions and UI data contracts
│   │   └── temperature.utils.ts         # Canonical Celsius conversion and formatting
│   ├── data/
│   │   └── weather-data.ts              # Fixed current, weekly, and highlight data
│   └── components/
│       ├── current-weather-sidebar/     # Search field and existing current-weather content
│       ├── weekly-forecast/              # Seven ordered forecast cards
│       ├── today-highlights/             # Six highlight cards
│       └── temperature-unit-control/     # C/F selection control
├── styles.css
└── index.html

public/
└── images/weather-states/               # Existing weather visuals and fallbacks
```

**Structure Decision**: Use one Angular application with a thin root dashboard component and four focused standalone child components. Keep presentation data, domain interfaces, and canonical temperature helpers outside components under `src/app/data` and `src/app/models`. Angular Material modules are imported by the standalone components that consume them; `app.config.ts` remains for application-level providers only. Do not create test directories or test artifacts because the constitution prohibits automated testing.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | The design satisfies the constitution without exceptions. |

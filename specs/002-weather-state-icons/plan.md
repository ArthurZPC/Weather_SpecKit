# Implementation Plan: Weather State Icons

**Branch**: `002-weather-state-icons` | **Date**: 2026-08-24 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/002-weather-state-icons/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

## Summary

Replace the CSS-generated stationary weather visuals on the main weather panel with existing SVG weather icons. Extend the existing weather-state visual mapping with an asset path and use the same resolved icon for the large primary visual and the smaller condition detail indicator, with an unavailable fallback and accessible labeling.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: TypeScript, Angular project configuration (existing)

**Primary Dependencies**: Existing Angular and Angular Material dependencies; no new dependency

**Storage**: N/A; icon assets are static files under `public/images/weather-states`

**Testing**: Static analysis, type checking, and direct browser verification; automated tests are prohibited by the constitution

**Target Platform**: Responsive browser viewport, desktop and narrow mobile

**Project Type**: Angular web application

**Performance Goals**: Icon substitution must not delay the stable panel layout beyond the existing 2-second visual-stability target

**Constraints**: Reuse existing SVG assets; preserve panel order and content; maintain stable icon dimensions; provide accessible labels and neutral fallback; do not add test artifacts or packages

**Scale/Scope**: One main page, one current weather state at a time, 21 supported weather conditions, two icon placements

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

*GATE: PASS*

- Clean Code: Extend the existing `weatherStateVisuals` mapping with explicit icon paths.
- Simple UX: Icons reinforce the existing condition hierarchy without adding interactions.
- Responsive Design: Retain stable icon dimensions and verify desktop and narrow mobile layouts.
- Minimal Dependencies: Reuse existing static SVG assets; add no package or external service.
- No Automated Testing: Use type checking, static analysis, and manual browser review only.
- Product Constraints: Preserve existing condition content and order with explicit unavailable fallbacks.

## Project Structure

### Documentation (this feature)

```text
specs/002-weather-state-icons/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── app.component.ts       # Weather-state-to-icon mapping and current state
│   ├── app.component.html     # Primary and detail icon markup
│   └── app.component.css      # Stable icon sizing and fallback presentation
└── styles.css
public/
└── images/
    └── weather-states/        # Existing SVG icon assets
```

**Structure Decision**: Keep the change inside the existing root Angular component and static public asset directory. No new service, route, data store, or test directory is needed for this presentation-only feature.

## Complexity Tracking

> No constitution violations require tracking.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | The design satisfies the constitution without exceptions. |

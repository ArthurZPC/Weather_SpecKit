# Research: Weather Dashboard Polish

**Feature**: [spec.md](spec.md)
**Date**: 2026-08-24

## Decision 1: Keep search results out of normal layout flow

- **Decision**: Position the active result list relative to the sidebar/search area and give it a higher stacking order than the weather card.
- **Rationale**: The current result list is a normal-flow sibling, so each result increases sidebar height and can move the weather panel. Existing CSS positioning and stacking capabilities solve the requirement without a dependency.
- **Alternatives considered**: Keeping the list in normal flow was rejected because it directly conflicts with the stable-sidebar acceptance scenario. A global overlay service was rejected as disproportionate to a single component.

## Decision 2: Fix responsive width at the component layout boundary

- **Decision**: Preserve the existing responsive grid and adjust the forecast/result constraints where their minimum widths cause overflow; use wrapping or bounded text for long search labels.
- **Rationale**: The repository already uses `minmax`, mobile breakpoints, and global `box-sizing`. The weekly forecast's seven-column minimum width is the known overflow risk, while global `overflow-x: hidden` can hide defects rather than fix them.
- **Alternatives considered**: Relying only on `overflow-x: hidden` was rejected because it can conceal clipped content. Replacing the dashboard layout was rejected because the requested scope is a polish pass.

## Decision 3: Use Minsk as a complete default location

- **Decision**: Replace the root component's Portland city object with Minsk's city name, country, and valid coordinates.
- **Rationale**: `AppComponent` owns the initial `LocationCity` and immediately requests weather from it. Changing the whole location object ensures the first request and visible label agree.
- **Alternatives considered**: Changing only the display name was rejected because the API request would still use Portland coordinates. Moving default selection into `WeatherApiService` was rejected because the service receives a selected location and does not own UI state.

## Decision 4: Preserve the public weather data contract

- **Decision**: Remove only the city image rendering from the sidebar; retain `LocationCity.cityImage` and normalized response shape for compatibility.
- **Rationale**: The field is already nullable and live normalized results set it to `null`. Removing the visual wrapper satisfies the user requirement without an unrelated model migration.
- **Alternatives considered**: Removing the model property was rejected because it expands scope and can affect existing call sites without adding user value.

## Decision 5: Refactor only the API service after behavior changes

- **Decision**: Expand dense methods and guards in `weather-api.service.ts`, introducing small private helpers for repeated validation and conversion while preserving public method signatures and values.
- **Rationale**: The service contains the most concentrated readability debt and is the only file explicitly permitted to gain helper functions. Named predicates make strict TypeScript validation easier to review.
- **Alternatives considered**: A broad formatter-only rewrite of all source files before behavior changes was rejected by the requested order. New libraries or test-only dependencies are prohibited by the constitution.

## Decision 6: Validate with build and manual browser review

- **Decision**: Use `npm run build`, editor diagnostics, and manual browser checks for search layering, default city, responsive layout, and visual hierarchy.
- **Rationale**: The constitution prohibits automated test artifacts and requires manual/static/type validation. Angular's production build validates strict templates and TypeScript together.
- **Alternatives considered**: `npm test` and new unit or end-to-end tests are explicitly out of scope under the project constitution.

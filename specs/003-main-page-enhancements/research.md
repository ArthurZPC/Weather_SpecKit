# Research: Main Page Enhancements

## Decision: Use standalone Angular components with Angular Material primitives

- **Decision**: Split the page into focused standalone components for the dashboard shell, current-weather sidebar, weekly forecast, highlights, and temperature-unit control. Use the existing Angular Material dependency for cards, buttons, form-field/input presentation, and iconography where appropriate.
- **Rationale**: The repository is an Angular 19 standalone application and already includes Angular Material 19. Focused components keep the current weather, forecast, highlights, and controls independently understandable while avoiding a new dependency.
- **Alternatives considered**: Keep all markup and data in `AppComponent`; rejected because the user explicitly requested component separation and moving types/interfaces into separate files.

## Decision: Keep representative weather data local and canonical in Celsius

- **Decision**: Store the fixed dataset as typed domain values, with temperatures represented as numeric Celsius source values. Derive displayed Celsius or Fahrenheit values from those canonical values according to the selected unit.
- **Rationale**: This preserves the fixed-data requirement, avoids live services, and prevents repeated unit toggles from accumulating rounding errors.
- **Alternatives considered**: Store preformatted strings for both units; rejected because it duplicates data and makes consistency harder to validate. Convert the currently displayed rounded value; rejected because repeated switching can introduce drift.

## Decision: Use an explicit selected-unit state and a two-option Material control

- **Decision**: Present exactly two labeled controls, C and F, with one selected at a time. Selecting a control updates the current temperature, weekly high/low values, and any temperature-valued highlight content.
- **Rationale**: A two-option control communicates mutually exclusive state clearly and supports keyboard-accessible interaction through Angular Material.
- **Alternatives considered**: A free-text unit input; rejected because it permits invalid states and is less discoverable. A caption-only unit label; rejected because the request requires functional controls.

## Decision: Treat the search field as presentation-only

- **Decision**: Render a labeled search field above the sidebar weather content without binding search, submit, autocomplete, or location mutation behavior.
- **Rationale**: This matches the explicit scope while keeping the visual structure ready for a later location-search feature.
- **Alternatives considered**: Add a local filter or mock search result; rejected because it would change displayed weather and exceed the requested scope.

## Decision: Validate through build, diagnostics, and direct browser review

- **Decision**: Use Angular production build, editor diagnostics, and manual desktop/mobile browser inspection. Do not create or maintain test artifacts.
- **Rationale**: The project constitution explicitly prohibits automated tests and test-only dependencies.
- **Alternatives considered**: Add component tests or end-to-end tests; rejected by the governing constitution.

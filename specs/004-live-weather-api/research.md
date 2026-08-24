# Research: Live Weather API Integration

## Decision: Use the existing Angular HTTP and RxJS stack

- **Decision**: Provide one injectable `WeatherApiService` using the repository's existing Angular HTTP capability and RxJS composition; add no package.
- **Rationale**: The app already uses Angular 19 standalone components and RxJS. HTTP requests, `forkJoin`, cancellation, and error handling are sufficient for three public JSON endpoints.
- **Alternatives considered**: Add a third-party weather SDK; rejected because the requested endpoints are explicit and a new dependency adds cost without user value. Add a backend proxy; rejected because no backend exists and the requested scope is a browser Angular service.

## Decision: Treat the forecast response as aligned parallel arrays

- **Decision**: Validate that each required daily array exists, has seven entries, and shares index positions with `daily.time`; zip by index into forecast records. Use today's aligned daily entry for highlights.
- **Rationale**: Open-Meteo returns one array per variable rather than one object per day. Index zipping preserves date, WMO code, temperatures, visibility, UV, daylight, sunrise, and sunset relationships.
- **Alternatives considered**: Render arrays independently; rejected because values could pair with the wrong day. Shift indexes to fill missing values; rejected because malformed data should produce unavailable/error state rather than silently inventing relationships.

## Decision: Request the containing Sunday-to-Saturday range

- **Decision**: Calculate the local date for today, subtract its weekday offset to obtain Sunday, and set Saturday to six days later. Request `start_date` and `end_date` for that range. On Sunday, the start date is today and the end date is the following Saturday.
- **Rationale**: This satisfies the clarified requirement for exactly seven calendar days in the containing Sunday-to-Saturday week and matches the existing seven-card dashboard.
- **Alternatives considered**: Start from today every day; rejected because Monday-Saturday omits the previous Sunday. Request a rolling seven-day window; rejected because it breaks the weekly grouping.

## Decision: Combine forecast/current weather with a separate AQI request

- **Decision**: Request the forecast endpoint and air-quality endpoint together for active coordinates, then combine normalized current/daily data with `current.european_aqi`.
- **Rationale**: The requested forecast endpoint does not provide AQI, while the air-quality endpoint provides the required current European AQI value.
- **Alternatives considered**: Omit AQI when unavailable; rejected because AQI is required. Request AQI later; rejected because selection could temporarily show inconsistent data.

## Decision: Keep canonical source units and map in the client

- **Decision**: Request Celsius temperatures and km/h wind, keep raw numeric values in normalized models, convert temperatures through the existing C/F control, convert visibility meters to kilometers, and format times from the response's `timezone=auto` local values.
- **Rationale**: Canonical numeric values prevent repeated-toggle drift and keep formatting centralized.
- **Alternatives considered**: Request a different unit per UI toggle; rejected because it adds network work and risks mixed responses. Store formatted strings; rejected because mappings and conversion require numeric values.

## Decision: Map WMO and measurement ranges with explicit fallbacks

- **Decision**: Map WMO codes to the existing weather condition/icon vocabulary, UV using the six requested WHO/EPA bands, wind direction to the nearest 16-point compass abbreviation, Beaufort speed bands for description, visibility thresholds in meters, and AQI using the six accepted ranges. Unknown codes/ranges retain an unavailable/neutral state.
- **Rationale**: Explicit pure mappings are reviewable and prevent raw codes or fabricated values from reaching the UI.
- **Alternatives considered**: Display provider labels/raw codes; rejected because readable state descriptions and icons are required. Use a mapping library; rejected because the mappings are small and dependencies should remain minimal.

## Decision: Handle request races and service failures at the orchestration boundary

- **Decision**: A newly selected location clears or marks the previous view as loading, and only the latest request may commit normalized data. Search no-results, loading, partial-data, HTTP/network, and malformed-response states remain visible and actionable without changing the image placeholder.
- **Rationale**: Location selection can produce overlapping requests, and stale weather is more misleading than a visible error.
- **Alternatives considered**: Let every response update root state; rejected because an older request can overwrite a newer selection. Keep old metrics visible during loading; rejected because it mixes location labels and values.

## Decision: Document public-service dependency and attribution

- **Decision**: Include Open-Meteo as an external dependency in project documentation or the dashboard attribution surface as appropriate, and document that availability and rate limits are outside the app's control.
- **Rationale**: The service is public and unauthenticated but still has operational terms and availability considerations.
- **Alternatives considered**: Hide the source dependency; rejected because it obscures a material runtime dependency.

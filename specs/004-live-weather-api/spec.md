# Feature Specification: Live Weather API Integration

**Feature Branch**: `004-live-weather-api`

**Created**: 2026-08-24

**Status**: Draft

**Input**: User description: "weather api setup - now when basic design is completed, it's time to add api in our project. With use of https://open-meteo.com API we should add live data to the main page, including all key information: Sidebar current location temperature, week day and time, selected city label, usable location search with matching results and selection; weekly weather state, max and min temperatures; today's highlights for UV index, wind, sunrise/sunset, humidity, visibility, and European AQI."

## Clarifications

### Session 2026-08-24

- Q: Should weather data refresh automatically while the dashboard remains open, or only when the page loads and when the user selects a new location? -> A: Refresh on initial page load and after selecting a new location only; no background refresh.
- Q: Should the weekly forecast always show exactly seven calendar days including today, or the next seven complete days after today? -> A: Exactly seven calendar days in the current Sunday-to-Saturday week, including today; on Sunday, use that Sunday through the following Saturday.
- Q: Should the European AQI descriptions use the six ranges already listed in the specification, with values 0-20 as Good, 21-40 as Fair, 41-60 as Moderate, 61-80 as Poor, 81-100 as Very Poor, and values above 100 as Extremely Poor? -> A: Use the six ranges already listed in the specification.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Live Weather for the Selected Location (Priority: P1)

As a user opening the Weather SpecKit dashboard, I want the sidebar and dashboard metrics to show current weather for a selected city so that the page reflects real conditions rather than representative fixed data.

**Why this priority**: Live current conditions establish the core value of connecting the dashboard to weather data.

**Independent Test**: Manually open the main page with the default location available and compare the displayed city, local time, current temperature, forecast, and highlights with the returned weather information for that location.

**Acceptance Scenarios**:

1. **Given** the main page loads with a valid default location, **When** weather data becomes available, **Then** the sidebar shows the location's current temperature, local weekday and time, and selected city label.
2. **Given** live weather data is displayed, **When** the user views the weekly forecast, **Then** each day shows its weather state and maximum and minimum temperatures for the selected location.
3. **Given** live weather data is displayed, **When** the user views Today's Highlights, **Then** the cards show the selected location's UV index, wind, sunrise and sunset, humidity, visibility, and European AQI values.
4. **Given** the dashboard is loaded, **When** current weather data is retrieved, **Then** the existing location image placeholder remains unchanged.

### User Story 2 - Search and Select a Location (Priority: P1)

As a user, I want to search for a city and choose from matching locations so that I can view weather for a place other than the default location.

**Why this priority**: Location selection is necessary for the live dashboard to serve more than one fixed place.

**Independent Test**: Enter a recognizable city name, inspect the matching results, select one result, and verify that the city label and all weather sections update to the selected location.

**Acceptance Scenarios**:

1. **Given** the search bar is visible, **When** the user enters a location name, **Then** matching locations appear with enough identifying information to distinguish similarly named places, such as city, region, and country.
2. **Given** matching locations are shown, **When** the user selects one result, **Then** the selected city label updates and the dashboard requests and displays weather for that location.
3. **Given** a selected location has loaded, **When** the user searches for and selects another location, **Then** the sidebar, weekly forecast, and highlights all update to the new location without retaining stale values from the previous selection.
4. **Given** the user submits an empty or whitespace-only search, **When** the search is evaluated, **Then** no location request is made and the current dashboard remains unchanged.

### User Story 3 - Understand Weather Descriptions and Units (Priority: P1)

As a user, I want weather codes and measurements translated into familiar labels and units so that I can understand the live data quickly.

**Why this priority**: Raw codes and measurements are not sufficient for a usable weather dashboard.

**Independent Test**: Manually inspect representative values across the forecast and highlights, confirming that each code, range, direction, and duration is rendered with its specified label and format.

**Acceptance Scenarios**:

1. **Given** a weekly forecast day has a WMO weather code, **When** the day is displayed, **Then** the code is represented by the matching weather state visual and state label rather than the raw numeric code.
2. **Given** the selected location has a UV index, **When** the UV card is displayed, **Then** it includes the numeric index, the WHO/EPA range description, and an icon appropriate to that range.
3. **Given** the selected location has wind data, **When** the Wind Status card is displayed, **Then** it shows speed with its unit, a one- or two-letter compass direction, and a Beaufort Wind Scale description.
4. **Given** the selected location has sunrise, sunset, and daylight data, **When** the Sunrise & Sunset card is displayed, **Then** the times use `HH:MM / HH:MM` and daylight duration uses `XXh YYm of daylight`.
5. **Given** visibility and European AQI values are available, **When** their cards are displayed, **Then** each value uses the required unit and range description, and the AQI title reads "Air Quality (European AQI)".

### User Story 4 - Recover from Unavailable Live Data (Priority: P2)

As a user, I want clear feedback when a search or weather request cannot be completed so that I know what happened and can continue using the dashboard.

**Why this priority**: External data can be unavailable, and the dashboard must not present misleading or stale information without context.

**Independent Test**: Manually simulate an unavailable response or network interruption during initial load and after a location search, then verify the visible error, preserved controls, and recovery behavior.

**Acceptance Scenarios**:

1. **Given** the weather data cannot be retrieved for the current location, **When** the request finishes unsuccessfully, **Then** the page shows a user-readable error state and does not present incomplete values as current live weather.
2. **Given** a location search returns no matches, **When** the search completes, **Then** the user sees a no-results message and the previously selected location remains active.
3. **Given** a new location's weather is loading, **When** the user views the dashboard, **Then** loading feedback is visible and the interface does not mix new location labels with old location metrics.

### Edge Cases

- If a city name matches multiple places, results MUST provide city, region or administrative area when available, country, and enough context to select the intended place.
- If a selected location has no returned value for an individual metric, that card MUST communicate unavailable data without displaying a fabricated zero or stale value.
- If the weather service is unavailable, times out, rate-limits the request, or returns malformed data, the page MUST preserve the search control and show an actionable error or retry state.
- If a search term contains leading or trailing whitespace, it MUST be normalized before matching, while an empty normalized term MUST be ignored.
- If a location changes while a previous weather request is still pending, only the most recently selected location's result may update the dashboard.
- If a returned value is outside a documented mapping range, the UI MUST use the nearest defined fallback description without crashing or hiding unrelated metrics.
- If the viewport is narrow, search results, cards, labels, and values MUST remain readable without horizontal scrolling, clipping, or overlap.
- The existing location image placeholder MUST remain unchanged regardless of the selected location or image data availability.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The main page MUST retrieve live weather data for a default selected location when the page is opened and MUST NOT refresh it automatically while the page remains open.
- **FR-002**: The sidebar MUST display the selected location's current temperature, local weekday and time, and city label from the active location.
- **FR-003**: The existing location image placeholder MUST remain unchanged in this feature.
- **FR-004**: The search bar MUST accept a location query and present matching locations as selectable results.
- **FR-005**: Each location result MUST display the city name, country, and available region or administrative area needed to distinguish it from other matches.
- **FR-006**: Selecting a location result MUST make it the active location, update the city label, and refresh the current weather, weekly forecast, and Today's Highlights for that location.
- **FR-007**: The search interaction MUST ignore empty or whitespace-only queries and MUST preserve the active location when no matches are found.
- **FR-008**: The weekly forecast MUST display exactly seven calendar-day entries in chronological order for the Sunday-to-Saturday week containing today, including weather state, maximum temperature, and minimum temperature for each day; when today is Sunday, the range MUST run from that Sunday through the following Saturday.
- **FR-009**: Weekly weather states MUST be mapped from WMO weather codes to the corresponding existing weather-state representation; raw WMO codes MUST NOT be shown as the primary state description.
- **FR-010**: The UV Index card MUST display the numeric UV value, a description using these ranges: Low (0-2), Moderate (3-5), High (6-7), Very High (8-10), and Extreme (11 or higher), and a matching range icon.
- **FR-011**: The Wind Status card MUST display wind speed with its unit, a cardinal or intercardinal direction using one or two letters, and a description based on the Beaufort Wind Scale.
- **FR-012**: The Sunrise & Sunset card MUST display sunrise and sunset in `HH:MM / HH:MM` format and daylight duration as `XXh YYm of daylight`.
- **FR-013**: The Humidity card MUST display relative humidity as a whole-number percentage in `XX%` format.
- **FR-014**: The Visibility card MUST display visibility in kilometers and map the source value to Dense Fog (less than 200 meters), Moderate Fog (200-500 meters), Light Fog / Mist (500-1000 meters), Haze or Mist (1000-4000 meters), Good Visibility (4000-10000 meters), or Excellent Visibility (greater than 10000 meters).
- **FR-015**: The Air Quality card title MUST read "Air Quality (European AQI)" and its description MUST use the European AQI ranges: Good (0-20), Fair (21-40), Moderate (41-60), Poor (61-80), Very Poor (81-100), and Extremely Poor (above 100).
- **FR-016**: The dashboard MUST show loading, empty, unavailable, and error states that preserve clear labels and do not present stale or fabricated live values as current data.
- **FR-017**: A pending response for an older location MUST NOT overwrite data for the most recently selected location.
- **FR-018**: Temperature, wind speed, visibility, time, and air-quality values MUST use consistent display units and formatting across all locations; the existing Celsius/Fahrenheit control MUST continue to apply to temperatures.
- **FR-019**: The dashboard MUST remain usable at desktop and narrow mobile viewport sizes without horizontal scrolling, clipped controls, or overlapping content.
- **FR-020**: The feature MUST use the Open-Meteo weather and location data service as the live data source and MUST document any required public-service limitations or attribution in the user-facing product where applicable.
- **FR-021**: The feature MUST NOT add automated test files, test runners, test fixtures, or test-only dependencies. Validation is limited to review, static analysis, type checking where available, and direct manual verification.

### Key Entities

- **Selected Location**: The active city choice used to request weather, including city name, country, region when available, latitude, longitude, and local time context.
- **Location Search Result**: A possible location match presented to the user with identifying geographic information and coordinates.
- **Current Weather Snapshot**: The selected location's current temperature, local date and time, weather state, wind, humidity, UV index, visibility, and air quality values.
- **Weekly Forecast Entry**: One chronological forecast day containing its date, mapped weather state, maximum temperature, and minimum temperature.
- **Today's Highlight**: A formatted summary of UV index, wind status, sunrise and sunset, humidity, visibility, or European AQI for the selected location.
- **Weather Code Mapping**: The defined relationship between a WMO code and its weather-state label and visual representation.
- **Measurement Description Mapping**: The defined range labels and icons for UV index, Beaufort wind conditions, visibility, and European AQI.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: On a successful initial load, 100% of required sidebar, weekly forecast, and Today's Highlights fields are populated from the active location's live response or explicitly marked unavailable.
- **SC-002**: In manual review, a user can search for a common city, identify a matching result, select it, and see the city label update within 30 seconds under typical network conditions.
- **SC-003**: After a location is selected, 100% of weather sections show values for the same active city, with no stale values from the prior location.
- **SC-004**: In manual review, every weekly forecast entry shows a mapped weather state plus maximum and minimum temperatures, and no raw WMO code is used as the visible state label.
- **SC-005**: In manual review, all six highlight cards display their required formats and descriptions for representative values, including the exact title "Air Quality (European AQI)".
- **SC-006**: In manual review at desktop and narrow mobile viewport sizes, 100% of required search controls, results, labels, values, and weather visuals remain readable and non-overlapping without horizontal scrolling.
- **SC-007**: When the service returns no result or an error, users receive a clear state within 5 seconds of the failed request and can retain or retry the active location without a page reload.
- **SC-008**: In manual review, users can identify the active city, current temperature, weekly forecast, and six highlight categories within 10 seconds of the data becoming visible.
- **SC-009**: Switching temperature units changes all applicable temperatures consistently without changing the selected location, weather states, or non-temperature highlight values.

## Assumptions

- The existing dashboard's default selected location is retained as the initial location unless the product later defines a different default.
- The Open-Meteo service provides the location search, weather, and air-quality values required for this feature without user authentication; service terms, availability, and attribution requirements remain external dependencies.
- Weather requests use the selected location's coordinates and local time context, while the location label is taken from the selected search result.
- The existing weather-state icon vocabulary is extended only as needed to cover the WMO codes returned by the live forecast; unsupported codes use a neutral fallback while retaining the state text.
- The existing Celsius/Fahrenheit control remains visible, Celsius remains the initial unit, and source values are converted from an unrounded value for display.
- Wind direction is converted to the nearest cardinal or intercardinal compass point and rendered using one or two letters.
- Visibility thresholds are evaluated in meters before the displayed value is converted to kilometers.
- Daylight duration is derived from the returned sunrise and sunset times when a direct duration value is unavailable.
- Standard whole-number rounding is used for display unless the existing dashboard convention requires a more precise value.
- The existing page layout and location image placeholder remain in scope; authentication, saved locations, historical weather, hourly charts, and map imagery are out of scope.
- Validation will use static analysis, type checking where available, and direct manual browser review because automated testing is prohibited by the project constitution.
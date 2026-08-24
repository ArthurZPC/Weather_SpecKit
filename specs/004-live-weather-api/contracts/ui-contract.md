# UI Contract: Live Weather API Integration

## Location Search

- The sidebar exposes a labeled search field and a submit/search action.
- A non-empty normalized query requests up to 10 geocoding matches.
- Each result is selectable and displays exactly `<Name> / Lat: <Latitude> Lon: <Longitude>`; country and region may appear as supporting context.
- Selecting a result updates the active city label and places the complete dashboard into loading state until the new weather and AQI data are combined.
- Empty queries are ignored. Zero matches show a no-results message and preserve the current active dashboard.

## Dashboard Request States

- Initial load and location selection show loading feedback while preventing mixed-location metrics.
- Ready state renders current weather, exactly seven forecast cards, and six highlight cards for one active location.
- Error state retains search and unit controls, communicates the failure, and offers a retry path without changing the location image placeholder.
- Missing individual metrics show unavailable text/icon rather than zero or stale values.

## Current Sidebar

- Shows selected location name, current temperature, local weekday, local time, and mapped current weather state.
- The existing location image placeholder remains unchanged.
- Celsius/Fahrenheit selection continues to convert canonical current and forecast Celsius values.

## Weekly Forecast

- Shows exactly seven chronological cards for the Sunday-to-Saturday week containing today.
- Each card shows short weekday, mapped weather visual/state, maximum temperature, and minimum temperature.
- Raw WMO numeric codes are not the primary visible state.

## Today's Highlights

- Shows exactly UV Index, Wind Status, Sunrise & Sunset, Humidity, Visibility, and Air Quality (European AQI).
- UV includes value, six-band description, and matching icon.
- Wind includes km/h speed, one/two-letter direction, and Beaufort description.
- Sunrise/sunset uses `HH:MM / HH:MM`; daylight uses `XXh YYm of daylight`.
- Humidity uses `XX%`; visibility uses `XX km` plus its mapped description.
- AQI uses the six accepted European AQI ranges and its numeric value.

## Accessibility, Responsiveness, and Attribution

- Search controls, results, loading/error messages, and unit controls are keyboard reachable and have readable labels.
- Weather visuals have meaningful alternatives; unavailable visuals do not imply a weather state.
- Desktop and narrow mobile layouts contain no horizontal scrolling, clipping, or overlap.
- The dashboard footer exposes Open-Meteo attribution/source information and states that public-service availability and rate limits are outside the application's control.

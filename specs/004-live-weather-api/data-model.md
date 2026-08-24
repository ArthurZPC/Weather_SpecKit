# Data Model: Live Weather API Integration

## Selected Location

The active geocoded place used for all current, daily, and AQI requests.

| Field | Type | Required | Validation / Display Rule |
|---|---|---:|---|
| name | string | yes | Display as the selected city/location label |
| country | string | yes | Included in search-result context |
| admin1 | string or null | no | Included when provided to distinguish matches |
| latitude | number | yes | Finite coordinate in valid latitude range |
| longitude | number | yes | Finite coordinate in valid longitude range |
| timezone | string or null | no | Preserve provider timezone for local context |
| cityImage | string or null | yes | Preserve existing null placeholder; never replaced by API data |

## Location Search Result

| Field | Type | Required | Validation / Display Rule |
|---|---|---:|---|
| id | number | yes | Stable selection identity when provided |
| name | string | yes | Search result name |
| country | string | yes | Search result country |
| admin1 | string or null | no | Optional region/administrative area |
| latitude | number | yes | Passed to weather services |
| longitude | number | yes | Passed to weather services |
| timezone | string or null | no | Preserved for local context |
| displayLabel | string | derived | `<Name> / Lat: <Latitude> Lon: <Longitude>` |

## Raw API Responses

`ForecastResponse` contains `current` and `daily` objects plus unit metadata. `daily.time` and every requested daily variable are parallel arrays. Required daily variables are `uv_index_max`, `visibility_mean`, `weather_code`, `temperature_2m_max`, `temperature_2m_min`, `daylight_duration`, `sunset`, and `sunrise`; required current variables are `weather_code`, `wind_speed_10m`, `wind_direction_10m`, `relative_humidity_2m`, and `temperature_2m`.

`GeocodingResponse` contains zero or more `results` with location identity, name, country, optional `admin1`, latitude, longitude, and timezone.

`AirQualityResponse` contains `current.european_aqi`; its absence is an unavailable AQI value, not zero.

## Normalized Dashboard Data

| Entity | Key fields | Rules |
|---|---|---|
| Current Weather Snapshot | condition, temperatureCelsius, conditionDescription, available, iconPath, weekday, hour | Current WMO code maps to the existing weather vocabulary; local ISO time supplies weekday/hour |
| Weekly Forecast Entry | date, weekdayShort, condition, highCelsius, lowCelsius | Exactly seven entries, Sunday through Saturday, zipped by daily-array index |
| Today's Highlight | label, value, detail, icon | Six required cards; missing source values become explicit unavailable display |
| Air Quality | europeanAqi, description, icon | Description uses 0-20 Good, 21-40 Fair, 41-60 Moderate, 61-80 Poor, 81-100 Very Poor, >100 Extremely Poor |

## Mapping and Validation Rules

- WMO weather codes map to the existing `WeatherCondition` and `WeatherStateVisual` vocabulary; unsupported codes use a neutral fallback and preserve readable text.
- UV bands are Low 0-2, Moderate 3-5, High 6-7, Very High 8-10, and Extreme 11+.
- Visibility thresholds are evaluated in meters: `<200`, `200-500`, `500-1000`, `1000-4000`, `4000-10000`, and `>10000`; display values are converted to kilometers.
- Wind speed remains in km/h, direction is rounded to the nearest cardinal/intercardinal abbreviation, and the description follows Beaufort bands.
- Sunrise and sunset use the local `HH:MM` portion of the response; daylight seconds become whole hours and minutes.
- Daily arrays must contain matching dates and at least seven aligned entries. Missing, invalid, or mismatched required arrays invalidate the corresponding live view.

## Lifecycle

1. Initial active location enters `loading` and requests forecast plus AQI.
2. Successful responses become one `ready` snapshot for that location.
3. A new search selection replaces the active location and enters `loading`; an older response cannot commit.
4. Empty search results preserve the current `ready` snapshot and show a no-results state.
5. Network, HTTP, malformed, or incomplete responses become `error` or field-level `unavailable` without fabricated values.
6. No background refresh or persistence occurs.

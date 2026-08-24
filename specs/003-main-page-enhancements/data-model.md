# Data Model: Main Page Enhancements

## WeatherCondition

Existing finite condition vocabulary used to select weather visuals.

| Field | Type | Required | Rules |
|---|---|---:|---|
| `name` | `WeatherCondition` | yes | Must be one of the supported weather conditions. |
| `description` | string | yes | Human-readable condition detail. |
| `iconPath` | string | yes | Existing public weather-state asset path; neutral fallback is used on failure. |

## CurrentWeather

Fixed current conditions presented by the sidebar.

| Field | Type | Required | Rules |
|---|---|---:|---|
| `condition` | `WeatherCondition` | yes | Selects the condition label and visual. |
| `temperatureCelsius` | number | yes | Canonical source value used for conversion. |
| `conditionDescription` | string | yes | Remains visible when imagery is unavailable. |
| `available` | boolean | yes | Unavailable state must not imply a specific condition. |
| `iconPath` | string | no | Falls back to the neutral unavailable visual. |

## LocationCity

Representative location context retained in the sidebar.

| Field | Type | Required | Rules |
|---|---|---:|---|
| `cityName` | string | yes | Remains visible if the image fails. |
| `cityImage` | string or null | yes | Null or load failure uses a neutral fallback. |

## CurrentTimeContext

Fixed time context for current conditions.

| Field | Type | Required |
|---|---|---:|
| `weekday` | string | yes |
| `hour` | string | yes |

## WeeklyForecastEntry

One of exactly seven ordered fixed forecast entries.

| Field | Type | Required | Rules |
|---|---|---:|---|
| `weekdayShort` | string | yes | Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, or Saturday abbreviation. |
| `condition` | `WeatherCondition` | yes | Maps to a weather visual. |
| `highCelsius` | number | yes | Canonical high temperature. |
| `lowCelsius` | number | yes | Canonical low temperature. |

Relationship: the collection contains exactly seven entries ordered Sunday through Saturday.

## HighlightMetric

One fixed supporting condition shown in today's highlights.

| Field | Type | Required | Rules |
|---|---|---:|---|
| `label` | enum/string | yes | Must be UV Index, Wind Status, Sunrise & Sunset, Humidity, Visibility, or Air Quality. |
| `value` | string or number | yes | Remains readable; highlight values are not temperature values in this release. |
| `detail` | string | no | Supplemental context such as direction, rating, or time. |
| `icon` | string | no | Visual support must not replace the label. |

Relationship: the collection contains exactly six required labels.

## TemperatureUnit

- Values: `C` or `F`.
- Initial value: `C`.
- Conversion: Fahrenheit display value is `celsius * 9 / 5 + 32`; Celsius display value is the canonical source value.
- Display rounding: one consistent presentation precision selected during implementation and applied to current and forecast temperatures.
- State transition: selecting C or F updates all temperature displays without changing conditions, fixed data identity, or highlight metrics unrelated to temperature.
- Scope: only the current-weather sidebar and weekly forecast contain temperature values; today's highlights are unaffected by unit selection.

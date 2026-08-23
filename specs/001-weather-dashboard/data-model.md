# Data Model: Weather Dashboard Initial Page

## Current Weather

Represents the local representative weather state rendered in the panel.

| Field | Type | Required | Validation / Display Rule |
|---|---|---:|---|
| condition | enum-like short text | yes | Must be one of the 21 states defined in FR-004 |
| temperature | numeric text | yes | Supports negative and multi-digit values without overlap |
| temperatureUnit | short text | yes | Displayed with the temperature, such as `°C` |
| conditionDescription | short text | yes | Readable and paired with the condition icon |
| conditionVisual | visual slot | yes | Distinct neutral square/rectangle for each supported state |

Supported condition values are: Clear/Sunny, Partly Cloudy, Cloudy/Overcast, Fog, Mist,
Haze, Smoke, Dust, Sand, Drizzle, Rain, Freezing Rain, Sleet, Snow, Heavy Snow, Hail,
Thunderstorm, Strong Wind, Squall, Tornado, and Volcanic Ash.

## Location City

Represents the representative city associated with the initial weather state.

| Field | Type | Required | Validation / Display Rule |
|---|---|---:|---|
| cityName | short text | yes | Remains readable; wraps within its display area when long |
| cityImage | visual slot | yes | Neutral rectangle fallback when no asset exists |

## Current Time Context

Represents the time label shown beneath the temperature.

| Field | Type | Required | Validation / Display Rule |
|---|---|---:|---|
| weekday | short text | yes | Displayed directly below the temperature |
| hour | short text | yes | Displayed alongside the weekday |

## Relationships and Lifecycle

- One `Current Weather` record is displayed with one `Location City` and one `Current Time
  Context` record.
- The initial state is `representative`, local, fixed, and non-live.
- Every supported condition maps to one visual slot and one readable description.
- Missing visuals keep their slot and use neutral fallback blocks.
- Missing data keeps the panel structure and displays an explicit unavailable message.
- No persistence, synchronization, identity, or concurrent-edit rules apply.

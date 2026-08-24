# Data Model: Weather State Icons

## Weather State Visual

The existing weather-state visual record becomes the presentation mapping for one supported condition.

| Field | Type | Required | Rules |
|---|---|---:|---|
| `description` | string | Yes | Human-readable condition description shown below the divider |
| `visualClass` | string | Yes | Existing class used by the panel presentation and retained for compatibility |
| `iconPath` | string | Yes | Relative path under `/images/weather-states`; must point to the selected existing SVG or the unavailable fallback |

## Current Weather

The existing current weather value selects one `Weather State Visual` and supplies the panel content.

| Field | Type | Required | Rules |
|---|---|---:|---|
| `condition` | supported weather condition | Yes when `available` is true | Selects exactly one mapping entry |
| `temperature` | string | Yes when `available` is true | Existing value and unit remain unchanged |
| `temperatureUnit` | string | Yes when `available` is true | Existing display value remains unchanged |
| `conditionDescription` | string | Yes when `available` is true | Must match the selected visual description |
| `conditionVisual` | string | Yes when `available` is true | Existing visual class remains available during transition |
| `available` | boolean | Yes | When false, show unavailable messaging and `not-available.svg`, never a state-specific icon |

## Relationships and State Rules

- Each supported `condition` maps to exactly one `Weather State Visual` entry.
- The primary icon and detail icon resolve from the same selected entry.
- The detail icon is a visual duplicate and is decorative to assistive technology.
- Missing or failed icon resolution uses `/images/weather-states/not-available.svg` while preserving condition text where condition data is still available.
- Icon display boxes have stable dimensions independent of the selected asset's intrinsic dimensions.

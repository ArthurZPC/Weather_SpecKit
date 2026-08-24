# Data Model: Weather Dashboard Polish

## Existing Entities

### LocationCity

Represents the city currently displayed by the dashboard and requested from the weather service.

| Field | Type | Constraint | Relevance |
|---|---|---|---|
| `cityName` | string | Required for display | Minsk is the first-load default value |
| `country` | string | Required for display | Remains visible in location context where already supported |
| `latitude` | number or null | Valid finite coordinate when loading weather | Must match Minsk for the default request |
| `longitude` | number or null | Valid finite coordinate when loading weather | Must match Minsk for the default request |
| `cityImage` | string or null | Retained for compatibility; not rendered by this feature | No visual city image is shown |

### LocationSearchResult

Represents a normalized geocoding result selected by the visitor.

- Extends the location identity and coordinate fields needed to load weather.
- `displayLabel` may contain latitude and longitude text and must be contained or wrapped by the result presentation.
- Selecting a result replaces the current `LocationCity` and clears the active result state through existing behavior.

### Search State

Represents the root component's current search interaction state.

- `searchQuery`: entered query text.
- `searchResults`: zero or more normalized locations.
- `noResults`: empty-result or search-error indication.
- `searching`: existing loading input supplied to the sidebar; implementation must avoid making weather loading semantics misleading during this polish.
- State transition: query entered -> results shown above sidebar; result selected or clear action -> result layer removed.

### Weather Summary

Represents the current weather content shown in the sidebar.

- Current condition, icon path, condition description, temperature, and current time remain unchanged in meaning.
- The weather icon and description are presented as one centered horizontal row below the divider.
- The weather icon has no visible border or outline.

### Dashboard Sections

Represents the weekly forecast and today's highlights presentation.

- Weekly forecast retains its seven daily entries and title but removes the redundant `This week` kicker.
- Today's highlights retains its metrics and title but removes the redundant `At a glance` kicker.
- Highlight icons increase modestly while their cards retain stable dimensions and responsive containment.

## Validation Rules

- Default location coordinates must be finite and correspond to Minsk.
- Search result display must remain within the available viewport width, including long labels.
- No entity or normalized API value is removed solely for presentation cleanup.
- Existing forecast and highlight collections retain their current cardinality and ordering.

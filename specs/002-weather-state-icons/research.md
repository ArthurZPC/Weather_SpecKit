# Research: Weather State Icons

## Decision: Reuse the existing weather-state SVG inventory

- **Decision**: Use files already present in `public/images/weather-states` as the source for all weather icons.
- **Rationale**: This satisfies the feature requirement and the Minimal Dependencies constitution principle without introducing a package, remote service, or new asset pipeline.
- **Alternatives considered**: Add an icon library or create new illustrations. Both add ownership and dependency cost without improving the existing dashboard scope.

## Decision: Add explicit icon paths to the existing state mapping

- **Decision**: Extend each `weatherStateVisuals` entry with a stable icon path and use that resolved path for the primary and detail placements.
- **Rationale**: The existing mapping is already the single source of truth for condition descriptions and visual classes. Keeping icon selection beside those fields avoids duplicated conditional logic and preserves clean data flow.
- **Alternatives considered**: Derive filenames dynamically from condition labels. This is less reliable because labels contain slashes, spaces, and states whose closest asset has a different name.

## Decision: Use closest existing assets for states without exact matches

| Weather condition | Selected asset | Mapping rationale |
|---|---|---|
| Clear/Sunny | `clear-day.svg` | Exact clear daytime match for the representative time context |
| Partly Cloudy | `partly-cloudy-day.svg` | Exact daytime match |
| Cloudy/Overcast | `overcast-day.svg` | Closest overcast daytime match |
| Fog | `fog-day.svg` | Exact daytime match |
| Mist | `mist.svg` | Exact match |
| Haze | `haze-day.svg` | Exact daytime match |
| Smoke | `smoke.svg` | Exact match |
| Dust | `dust.svg` | Exact match |
| Sand | `dust-wind.svg` | Closest airborne-particle and blowing-wind representation |
| Drizzle | `drizzle.svg` | Exact match |
| Rain | `rain.svg` | Exact match |
| Freezing Rain | `rain.svg` | Closest precipitation representation; no freezing-rain asset exists |
| Sleet | `sleet.svg` | Exact match |
| Snow | `snow.svg` | Exact match |
| Heavy Snow | `snow.svg` | Closest snowfall representation; no heavy-snow asset exists |
| Hail | `hail.svg` | Exact match |
| Thunderstorm | `thunderstorms-day.svg` | Closest daytime thunderstorm representation |
| Strong Wind | `wind.svg` | Exact wind match |
| Squall | `wind.svg` | Closest wind representation; no squall asset exists |
| Tornado | `tornado.svg` | Exact match |
| Volcanic Ash | `dust.svg` | Closest airborne-particle representation; no volcanic-ash asset exists |

## Decision: Prefer the unavailable asset for missing weather data

- **Decision**: Use `not-available.svg` when weather is unavailable or an icon cannot be resolved.
- **Rationale**: A neutral existing asset preserves layout while preventing the interface from implying a known condition.
- **Alternatives considered**: Retain the last known condition or use a generic weather icon. Both could communicate false current information.

## Decision: Preserve accessibility through semantic image markup

- **Decision**: Provide the current condition as the text alternative for the primary icon and mark the smaller duplicate detail icon decorative.
- **Rationale**: The condition heading and description already provide visible context; this arrangement communicates the state once to assistive technology without redundant announcements.
- **Alternatives considered**: Give both icons identical labels. This repeats the same information and adds noise for screen-reader users.

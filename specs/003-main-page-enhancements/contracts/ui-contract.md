# UI Contract: Main Page Enhancements

## Dashboard structure

- The page exposes one dashboard view.
- Desktop layout contains two adjacent regions:
  - `Current Weather Sidebar`: search field followed by existing current weather content.
  - `Weather Statistics`: temperature-unit control, seven-day forecast, and today's highlights.
- Narrow viewports may stack the two regions in reading order: sidebar, then statistics.

## Search field

- Visible label/placeholder communicates search intent.
- Located above current weather content in the sidebar.
- Has no search, submit, autocomplete, location selection, or weather mutation behavior in this release.

## Temperature unit control

- Exactly two mutually exclusive controls are visible: `C` and `F`.
- Initial selected unit is Celsius.
- Selecting `F` converts current and weekly temperatures from canonical Celsius values.
- Selecting `C` restores canonical Celsius display values.
- Repeated toggling does not accumulate rounding drift.
- Today's highlights contain no temperature values and do not change when the unit is switched.

## Weekly forecast

- Exactly seven cards are rendered in Sunday-to-Saturday order.
- Each card exposes a short weekday name, a weather visual, and high/low temperatures.
- Missing imagery uses a neutral fallback while preserving the day and temperatures.

## Today's highlights

- Heading is exactly `Today's Highlights`.
- Exactly six required cards are present:
  - UV Index
  - Wind Status
  - Sunrise & Sunset
  - Humidity
  - Visibility
  - Air Quality
- Labels remain visible if a value or supporting visual is unavailable.

## Accessibility and responsive behavior

- Controls are keyboard reachable and expose their selected state.
- Weather visuals have meaningful alternatives when they convey condition information; decorative duplicates are hidden from assistive technology.
- Required content remains readable and non-overlapping at desktop and narrow mobile viewport sizes.

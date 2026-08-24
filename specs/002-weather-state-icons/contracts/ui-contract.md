# UI Contract: Weather State Icons

## Main Weather Panel

The existing main weather panel remains the only user-facing surface in scope.

### Primary Icon

- Render one weather icon in the primary weather visual region.
- Use the icon path associated with the current condition.
- Preserve the condition heading immediately below the icon.
- Provide an accessible text alternative containing the current condition, for example `Partly Cloudy weather icon`.
- If the weather is unavailable or the asset fails to load, use the neutral unavailable visual and preserve the panel's stable dimensions.

### Condition Detail Icon

- Render the same current-condition icon in the detail region at a smaller stable size.
- Mark this duplicate icon decorative because the condition text is already adjacent and the primary icon carries the accessible description.
- Use the unavailable visual when current weather is unavailable.

### Asset Contract

- Asset paths are rooted at `/images/weather-states/`.
- Every supported weather condition has an explicit path in the application mapping.
- Closest-match mappings are documented in [research.md](../research.md).
- Broken assets must not remove, replace, or obscure the condition heading or description.

### Responsive Contract

- The primary icon region remains square and stable across supported states.
- The detail icon remains smaller than the primary icon.
- At narrow mobile widths, both icons remain fully visible with no clipping, overlap, or horizontal scrolling.

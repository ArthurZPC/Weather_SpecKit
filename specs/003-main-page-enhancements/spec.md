# Feature Specification: Main Page Enhancements

**Feature Branch**: `003-main-page-enhancements`

**Created**: 2026-08-24

**Status**: Draft

**Input**: User description: "main page enchancements - according to the reference image split the page into side bar with current weather info (content of current main page) and weather stats block. Add a search bar above the side bar. Search bar doesn't have any functionality for now, besides the visual one. Do not add 'Today, Week' caption from the top. Leave only Temperature unit (C/F) at the top of the page. Add fixed data for the weekly weather display. Add today's highlights section below the weekly weather display same as on screenshot with next cards: UV index, Wind Status, Sunrise & Sunset, Humidity, Visibility, Air Quality."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Split Weather Dashboard (Priority: P1)

As a user opening Weather SpecKit, I want the existing current-weather information presented in a left sidebar beside a weather statistics area so that I can see current conditions and a broader forecast in one view.

**Why this priority**: The split composition is the primary change and establishes the information hierarchy for all new dashboard content.

**Independent Test**: Manually open the main page at a desktop viewport and verify that the existing current-weather content is grouped in the left sidebar while the weekly forecast and highlights appear in the adjacent statistics area.

**Acceptance Scenarios**:

1. **Given** the main page is loaded, **When** the user views the dashboard, **Then** the current weather content from the existing page appears in a distinct left sidebar and the weather statistics block appears beside it.
2. **Given** the dashboard is displayed, **When** the user scans the page from left to right and top to bottom, **Then** the sidebar remains visually distinct and the statistics block contains the weekly display above today's highlights.
3. **Given** the viewport is narrow, **When** the user views the dashboard, **Then** the sidebar and statistics content adapt to the available width without horizontal scrolling, clipping, or overlap.

### User Story 2 - Inspect Weekly Weather (Priority: P1)

As a user, I want to see a compact forecast for each day of the week so that I can compare upcoming conditions and temperatures at a glance.

**Why this priority**: The weekly display is the main new weather-statistics content and gives the dashboard value beyond the current conditions sidebar.

**Independent Test**: Manually inspect the weekly display and confirm that seven day cards appear in order with short weekday names, weather visuals, and fixed high/low temperature values.

**Acceptance Scenarios**:

1. **Given** the statistics block is visible, **When** the user views the weekly section, **Then** seven forecast cards appear in Sunday-to-Saturday order using short weekday names.
2. **Given** the weekly cards are displayed, **When** the user reads any card, **Then** it includes a weather-state visual and fixed high/low temperature data.
3. **Given** the weekly section is displayed, **When** the user looks at the top controls, **Then** the "Today, Week" caption is absent and only the temperature-unit controls remain at the top.

### User Story 3 - Review Today's Highlights (Priority: P1)

As a user, I want a highlights section below the weekly forecast so that I can quickly review additional conditions for today.

**Why this priority**: The six highlight metrics complete the requested statistics block and make important supporting conditions scannable.

**Independent Test**: Manually inspect the content below the weekly display and confirm that all six named highlight cards are present, labeled, and visually distinct.

**Acceptance Scenarios**:

1. **Given** the weekly display is visible, **When** the user continues below it, **Then** a section titled "Today's Highlights" appears.
2. **Given** today's highlights are displayed, **When** the user scans the cards, **Then** cards for UV Index, Wind Status, Sunrise & Sunset, Humidity, Visibility, and Air Quality are all present.
3. **Given** fixed dashboard data is displayed, **When** the user revisits the page, **Then** the weekly and highlights values remain consistent during that page session.

### User Story 4 - See Dashboard Controls (Priority: P2)

As a user, I want to switch between Celsius and Fahrenheit so that the dashboard's temperature presentation uses the unit I understand.

**Why this priority**: Unit conversion makes the required controls useful and ensures temperatures remain understandable for users with different unit preferences.

**Independent Test**: Manually select each temperature-unit control and confirm that all displayed temperature values convert to the selected unit while the weather conditions remain the same.

**Acceptance Scenarios**:

1. **Given** the dashboard is loaded, **When** the user views the top controls, **Then** one Celsius control and one Fahrenheit control are visible.
2. **Given** temperatures are displayed in one unit, **When** the user selects the other temperature-unit control, **Then** the current temperature, weekly high/low values, and any temperature values in highlights are converted to the selected unit.

### Edge Cases

- When the viewport is too narrow for the desktop composition, content MUST reflow into a readable single-column or stacked arrangement without horizontal scrolling.
- If a weekly weather visual is unavailable, its day label and fixed temperature values MUST remain visible and a neutral visual treatment MUST preserve the card dimensions.
- If a highlight value is long or unavailable, the card MUST retain its label and remain readable without text clipping or overlap.
- If the sidebar location image is unavailable, the current weather information and location label MUST remain visible with a neutral image fallback.
- The absence of the "Today, Week" caption MUST NOT remove or obscure the temperature-unit controls.
- When a user switches units repeatedly, values MUST be converted from the canonical fixed data rather than repeatedly converting an already rounded display value.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The main page MUST present the existing current-weather content in a distinct left sidebar on desktop-sized viewports.
- **FR-002**: The main page MUST present a weather statistics block adjacent to the current-weather sidebar on desktop-sized viewports.
- **FR-003**: The sidebar MUST include a visually recognizable search bar above the current-weather content.
- **FR-004**: The search bar MUST be non-functional in this release: it MUST NOT search, change location, submit data, or alter displayed weather when the user types or attempts to activate it.
- **FR-005**: The statistics block MUST NOT display the "Today, Week" caption from the reference image.
- **FR-006**: The top of the statistics block MUST display exactly two temperature-unit controls labeled C and F.
- **FR-007**: The temperature-unit controls MUST be visually distinct, identify Celsius and Fahrenheit clearly, and MUST convert all displayed temperature values when selected.
- **FR-008**: The weekly weather display MUST contain exactly seven cards, one for each day from Sunday through Saturday, in that order.
- **FR-009**: Each weekly card MUST show a short weekday name, a weather-state visual, and fixed high/low temperature values.
- **FR-010**: The page MUST display a "Today's Highlights" section below the weekly weather display.
- **FR-011**: Today's Highlights MUST contain separate cards labeled UV Index, Wind Status, Sunrise & Sunset, Humidity, Visibility, and Air Quality.
- **FR-012**: Weekly and highlight values MUST use fixed representative data and MUST remain stable while the page is open; live weather retrieval and location search are out of scope.
- **FR-013**: The selected temperature unit MUST apply consistently to the current temperature and weekly high/low temperatures, with Celsius and Fahrenheit conversions rounded consistently for display; today's highlights MUST NOT contain temperature values in this release.
- **FR-014**: The sidebar and statistics block MUST preserve readable hierarchy and MUST remain usable without horizontal scrolling, clipped controls, or overlapping content at supported desktop and narrow mobile viewport sizes.
- **FR-015**: Existing current-weather information MUST remain available in the sidebar, including its temperature, time context, condition detail, and representative location content.
- **FR-016**: Missing weather visuals or location imagery MUST use a neutral fallback while preserving associated labels and values.
- **FR-017**: The feature MUST NOT add automated test files, test runners, test fixtures, or test-only dependencies. Validation is limited to review, static analysis, type checking where available, and direct manual verification.

### Key Entities

- **Current Weather Sidebar**: The existing current-condition presentation relocated into the left side of the dashboard, including current temperature, time, condition detail, and location context.
- **Weekly Forecast Card**: One fixed-data daily forecast entry containing a short weekday name, weather-state visual, and high/low temperatures.
- **Temperature Unit Control**: One of the two visible C or F controls that changes the display unit for all current and forecast temperatures.
- **Today's Highlight Card**: A fixed-data summary card for UV Index, Wind Status, Sunrise & Sunset, Humidity, Visibility, or Air Quality.
- **Fixed Weather Dataset**: The representative weekly and today's-highlight values displayed consistently during a page session.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In manual review, 100% of the existing current-weather content remains visible in the sidebar after the dashboard split.
- **SC-002**: In manual review, exactly seven weekly cards appear in Sunday-to-Saturday order, and each card contains a weekday label, weather visual, and high/low values.
- **SC-003**: In manual review, all six required highlight cards are visible below the weekly display and can be identified by their labels within 5 seconds.
- **SC-004**: In manual review at desktop and narrow mobile viewport sizes, 100% of required controls, labels, values, and visuals remain readable and non-overlapping without horizontal scrolling.
- **SC-005**: In manual review, the "Today, Week" caption appears zero times and exactly two temperature-unit controls labeled C and F appear at the top.
- **SC-006**: In manual review, selecting either temperature-unit control updates the current and weekly displayed temperatures to the selected unit and repeated switching does not accumulate rounding drift; today's highlights remain unchanged because they contain no temperature values.
- **SC-007**: Across repeated page views within the same release configuration, the weekly and highlight values remain unchanged unless the representative fixed dataset is intentionally updated.
- **SC-008**: Users can identify the current conditions, weekly forecast, and today's six supporting metrics within 10 seconds of the dashboard becoming visible.
- **SC-009**: No live weather service, location search behavior, or new package is required for the requested dashboard presentation.

## Assumptions

- The existing current-weather panel content and representative data are the source for the new sidebar; its weather meaning and values are not otherwise changed by this feature.
- The reference image defines the intended visual hierarchy and grouping, while exact pixel-level reproduction is not required.
- The weekly forecast uses seven representative fixed entries for Sunday through Saturday, including weather visuals and high/low values chosen during implementation.
- Today's highlights contain no temperature values; only the current sidebar and weekly forecast participate in unit conversion.
- Celsius is the initially selected unit, while both C and F controls remain visible and selectable.
- The search bar is present for visual completeness only; autocomplete, submission, location selection, filtering, and persistence are out of scope.
- The page supports desktop and narrow mobile viewport sizes and may stack the sidebar and statistics block on narrow screens.
- Existing weather-state and location image assets are preferred, and no new dependency is needed solely for this presentation change.
- Validation will use static analysis, type checking where available, and direct manual browser review because automated testing is prohibited by the project constitution.

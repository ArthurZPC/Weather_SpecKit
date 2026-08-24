# Quickstart: Live Weather API Integration

## Prerequisites

- Node.js and npm dependencies are installed.
- The repository is on branch `004-live-weather-api`.
- The browser can access the three public Open-Meteo endpoints.

## Run and Build

From the repository root:

```powershell
npm run build
npm start
```

Open the URL printed by `ng serve`.

## Manual Validation

1. **Initial load**: Start a timer when the page opens. Confirm the dashboard enters loading state, then shows one selected city, current temperature/time, seven Sunday-to-Saturday forecast cards, six highlight cards, and the unchanged location image placeholder within 5 seconds under typical network conditions.
2. **Search**: Search for `Berlin` and confirm results use `<Name> / Lat: <Latitude> Lon: <Longitude>` and appear within 2 seconds under typical network conditions. Select a result and confirm the city label, current weather, forecast, highlights, and AQI update together within 5 seconds.
3. **Date range**: On any weekday, verify the seven cards begin with the containing Sunday and end on Saturday. On Sunday, verify the range begins that day and ends the following Saturday.
4. **Mappings**: Inspect representative WMO, UV, wind, visibility, sunrise/sunset, humidity, and AQI values. Confirm no raw WMO code is shown as the main state and that AQI is titled `Air Quality (European AQI)`.
5. **Units**: Switch C to F and back. Confirm current and forecast temperatures convert consistently and repeated toggling does not drift.
6. **No results**: Search an unlikely term. Confirm a no-results message appears and the prior active dashboard remains selected.
7. **Failure behavior**: Use browser network controls to block an Open-Meteo request. Confirm loading/error or unavailable messaging, preserved search/unit controls, no mixed-location data, and a retry path.
8. **Responsive review**: Inspect desktop and narrow mobile widths. Confirm search results and all cards remain readable without horizontal scrolling, clipping, or overlap.
9. **Attribution**: Confirm the dashboard footer identifies Open-Meteo and states that public-service availability and rate limits are outside the application's control.
10. **Static checks**: Review editor diagnostics and confirm `npm run build` completes without errors. Do not run or add automated test artifacts, per the project constitution.

See [data-model.md](data-model.md) for normalized fields and [contracts/ui-contract.md](contracts/ui-contract.md) for the user-visible contract.

# Quickstart: Weather Dashboard Polish

## Prerequisites

- Node.js and npm installed.
- Dependencies installed with `npm install`.
- Repository root is `D:\Projects\Weather_SpecKit`.

## Build Validation

Run:

```powershell
npm run build
```

Expected result: Angular production compilation completes without TypeScript or strict-template errors.

## Manual Browser Validation

Start the application:

```powershell
npm start
```

Open the displayed local URL, then verify:

1. The initial city is Minsk and weather loading uses Minsk's location.
2. Enter a city query. Search text has left inset spacing, the native clear affordance is separated from the right edge, and results cover the sidebar instead of moving it down.
3. Select a result and confirm the existing city/weather update still works; clear the field and confirm the result layer disappears.
4. Confirm `Representative conditions`, `This week`, and `At a glance` are not visible. Confirm the sidebar weather icon has no outline, and its icon plus description form one centered row below the divider.
5. Confirm the city image is absent and city information remains readable.
6. Confirm Daily Highlights icons are modestly larger and remain contained in their cards.
7. Resize the browser to a desktop width and narrow widths around the existing breakpoints. Confirm there is no horizontal scrollbar, clipped control, overlapping heading, or inaccessible search result.

## Validation Evidence

Record the final build result and manual observations against [contracts/ui-contract.md](contracts/ui-contract.md). The project constitution prohibits adding automated test artifacts; do not run or create new test suites for this feature.

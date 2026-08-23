# Quickstart: Weather Dashboard Initial Page

## Prerequisites

- Node.js and npm compatible with the repository's Angular 19 workspace
- Dependencies installed from the repository root
- A modern desktop or mobile web browser

The project constitution prohibits automated tests. Do not run `ng test`, add test files, or
add test-only dependencies for this feature.

## Run Locally

From the repository root:

```text
npm install
npm start
```

Open the local URL printed by Angular CLI, normally `http://localhost:4200/`.

## Manual Acceptance Review

1. Confirm the page identifies itself as Weather SpecKit.
2. Confirm one current-weather panel is centered horizontally and vertically.
3. Confirm the weather visual uses a distinct neutral fallback block for the selected state.
4. Confirm the temperature and unit are the most prominent numerical content.
5. Confirm weekday and hour appear directly below the temperature.
6. Confirm a horizontal divider appears after the weekday and hour.
7. Confirm a small condition visual and readable description appear below the divider.
8. Confirm a city visual and city name appear below the condition details with a small gap.
9. Review representative states across the FR-004 catalog and confirm each has a distinct
   visual and description.
10. Resize to a narrow mobile viewport and confirm no scrolling, clipping, overlap, or
    unreadable text occurs.
11. Review unavailable-data presentation if exposed; confirm the structure remains intact,
    fallback blocks remain visible, and no fixed value is presented as live data.

## Static Validation

Run the production build from the repository root:

```text
npm run build
```

Expected result: Angular compilation completes without errors. This is a static/type
validation step, not an automated test suite.

## References

- [UI contract](contracts/ui-contract.md)
- [Data model](data-model.md)
- [Feature specification](spec.md)

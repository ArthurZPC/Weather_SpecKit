# Quickstart: Main Page Enhancements

## Prerequisites

- Node.js and npm installed.
- Dependencies installed with `npm install`.
- Repository root is `D:\Projects\Weather_SpecKit`.

## Static validation

Run the production build:

```powershell
npm run build
```

Expected result: Angular compiles successfully with no TypeScript or template errors.

Use VS Code diagnostics on the changed TypeScript, HTML, and CSS files. No automated test artifacts are required or permitted by the project constitution.

## Manual validation

Start the development server:

```powershell
npm start
```

Open the reported local URL and verify:

1. The current weather information appears in a distinct left sidebar.
2. A visually recognizable but non-functional search field appears above the sidebar weather content. Typing or activating it does not change the displayed location or weather.
3. The statistics block is beside the sidebar on a desktop viewport.
4. The top of the statistics block shows exactly the C and F temperature controls and does not show the `Today, Week` caption.
5. Seven weekly cards appear in Sunday-to-Saturday order with short weekday names, weather visuals, and high/low values.
6. `Today's Highlights` appears below the weekly cards with UV Index, Wind Status, Sunrise & Sunset, Humidity, Visibility, and Air Quality cards.
7. C is initially selected. Select F and verify the current temperature and weekly high/low values convert. Select C again and verify the original canonical Celsius values return without drift.
8. Resize to a narrow mobile viewport and verify the sidebar/statistics content stacks or reflows without horizontal scrolling, clipping, or overlap.
9. Confirm missing image fallbacks preserve labels and values if an asset is intentionally unavailable during review.

See [data-model.md](data-model.md) for the canonical temperature and fixed-data rules and [contracts/ui-contract.md](contracts/ui-contract.md) for the user-visible structure and interaction contract.

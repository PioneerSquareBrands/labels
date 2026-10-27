# PSB Labels - UPC Label & Shipping Mark Generator
This is a simple tool to generate UPC labels and shipping marks for PSB.

## Development

```bash
npm install
npm run dev     # watches src/ and rebuilds dist/ on save
```

`npm run dev` starts two watchers (esbuild for JS, dart-sass and Autoprefixer for CSS) plus a
Browsersync dev server at **http://localhost:3000** — it prints a LAN URL too, so you
can check labels on another machine. Saving a file rebuilds and live-reloads the page;
CSS is injected without a full refresh. VS Code starts all of this automatically on
folder open via `.vscode/tasks.json`.

Anything under `dist/` is generated — edit `src/` only, then commit the rebuilt `dist/`
output along with your changes.

The build does not use Prepros. Autoprefixer targets the `browserslist` entry in
`package.json`, and its options live in `postcss.config.js`.

| script | what it does |
| --- | --- |
| `npm run build` | one-off build of JS, CSS and vendors |
| `npm run build:js` | bundles `src/js/main.js` + node_modules deps into `dist/js/main.js` |
| `npm run build:css` | compiles `src/scss/styles.scss` and runs Autoprefixer into `dist/css/styles.css` |
| `npm run build:vendors` | copies `src/js/vendors.js` (QR / DataMatrix, pre-minified) to `dist/js/` |
| `npm run serve` | Browsersync server + live reload on its own (no watchers) |

## Shipping mark sizing

Each carton face is laid out at its real size in inches. `fitShippingMarks()` in
`src/js/modules/canvasUpdate.js` picks the largest base font that fits, up to 1.2in.

When the content does not fit at a 0.4in base font, the face is laid out at a larger size
and scaled down to the carton. A 6 x 2 in face can be drawn at 13.8 x 4.6 in and printed
at 43%. The scale is stored in the page's `data-scale`, and the PDF and PNG exports divide
by it so the files keep the real carton size.

Front faces shorter than 7.5in place the UPC label and the TIHI side by side.

## UPC label sizes

The Label Size field sets the size of the standard polybag, master carton and inner carton
labels. Presets live in `PRESETS` in `src/js/modules/labelSize.js`. Custom takes any height
and width from 2in to 5in.

An option with `data-brands` in `index.html` is only offered for those brands. Sapona and
Others also have their own page templates, which `factoryUpdate()` shows in place of the
standard page for that label type.

Sizes inside a standard label use the `u()` function in `_variables.scss`. `labelSize.js`
sets `--u` to fit the content: the presets render at their designed size, larger labels
grow up to their size ratio, and smaller labels shrink until nothing overflows.

## Resizing parts of a label

Clicking a part of a label in the preview, such as the description or the SKU, opens a toolbar
that resizes it in 5% steps from 50% to 200%. The change applies to that part on every label in
its group: the standard UPC labels, the Sapona label, the Others labels or the shipping marks.

`adjust.js` applies the size with CSS `zoom`, so the automatic fitting sees it and fits the rest
of the label around it. Adjustments are saved in the browser per brand and SKU, and exports hide
the selection outlines.

## Recycling badge

The Recycling Badge field in the Shipping Marks section picks the badge on the side face:
recycled content (the default), recyclable material, or none. The wording lives in `BADGES` in
`src/js/modules/recycling.js`. A choice other than the default is saved in the browser per
brand and SKU.

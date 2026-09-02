# PSB Labels - UPC Label & Shipping Mark Generator
This is a simple tool to generate UPC labels and shipping marks for PSB.

## Development

```bash
npm install
npm run dev     # watches src/ and rebuilds dist/ on save
```

`npm run dev` starts two watchers (esbuild for JS, dart-sass for CSS) plus a
Browsersync dev server at **http://localhost:3000** — it prints a LAN URL too, so you
can check labels on another machine. Saving a file rebuilds and live-reloads the page;
CSS is injected without a full refresh. VS Code starts all of this automatically on
folder open via `.vscode/tasks.json`.

Anything under `dist/` is generated — edit `src/` only, then commit the rebuilt `dist/`
output along with your changes.

| script | what it does |
| --- | --- |
| `npm run build` | one-off build of JS, CSS and vendors |
| `npm run build:js` | bundles `src/js/main.js` + node_modules deps into `dist/js/main.js` |
| `npm run build:css` | compiles `src/scss/styles.scss` into `dist/css/styles.css` |
| `npm run build:vendors` | copies `src/js/vendors.js` (QR / DataMatrix, pre-minified) to `dist/js/` |
| `npm run serve` | Browsersync server + live reload on its own (no watchers) |

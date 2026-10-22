import { default as el } from './domElements.js';
import { escapes, fitShippingMarks } from './canvasUpdate.js';

// Sizes are in inches. Factories without an entry, such as Sapona and Others, keep the default size on their standard pages.
const PRESETS = {
  default: { name: 'Default', height: 3.8, width: 3.2 },
  legacy: { name: 'Legacy', height: 3.5, width: 3.5 },
  'gumdrop-large': { name: '10 x 8.5 cm', height: 3.94, width: 3.35, metric: '10 x 8.5 cm' },
};

const BASE = PRESETS.default;
const MIN_UNIT = 0.5;
const TITLES = { polybag: 'Polybag', master: 'Master Carton', inner: 'Inner Carton' };

// Custom sizes stay within the min and max of their inputs, even while a value is half typed
const customInches = (input, fallback) => {
  const value = parseFloat(input.value) || fallback;
  return Math.min(parseFloat(input.max), Math.max(parseFloat(input.min), value));
};

const activeSize = () => {
  if (el.factory.value !== 'custom-size') return PRESETS[el.factory.value] || BASE;

  return {
    name: 'Custom',
    height: customInches(el.labelHeight, BASE.height),
    width: customInches(el.labelWidth, BASE.width),
  };
};

const inches = (value) => `${+value.toFixed(2)}"`;

// Vertical extent of what a row shows. The barcode SVG is left out because its box has blank space that overlaps the next row by design.
const contentSpan = (row) => {
  const rects = [row, ...row.querySelectorAll('*')]
    .filter((node) => !node.closest('svg') || node.matches('.label__qr svg, .label__datamatrix svg, .label__install-svg svg'))
    .flatMap((node) => Array.from(node.getClientRects()))
    .filter((rect) => rect.height > 0);

  return { top: Math.min(...rects.map((rect) => rect.top)), bottom: Math.max(...rects.map((rect) => rect.bottom)) };
};

// Label rows do not shrink (see .page.default .label > *). Content that is too big pushes a row out of the label or into the row below.
const fits = (label) => {
  const box = label.getBoundingClientRect();
  const tolerance = box.width / label.offsetWidth;
  const rows = Array.from(label.children).filter((row) => row.getClientRects().length);
  const spans = rows.map(contentSpan);

  return label.scrollHeight <= label.clientHeight + 1
    && !rows.some((row) => escapes(row, box, tolerance))
    && !spans.some((span, i) => i > 0 && spans[i - 1].bottom > span.top + tolerance);
};

// Content keeps its designed size on the default label and grows with larger ones. Labels narrower than the default
// scale it by their width so text does not wrap, and any label shrinks it further when it still does not fit.
const fitLabel = (label, size) => {
  const widthRatio = size.width / BASE.width;
  const ceiling = Math.min(widthRatio, Math.max(1, Math.min(widthRatio, size.height / BASE.height)));
  const tryUnit = (unit) => {
    label.style.setProperty('--u', `${unit}px`);
    return fits(label);
  };

  if (tryUnit(ceiling)) return;

  let low = MIN_UNIT;
  let high = ceiling;
  for (let i = 0; i < 8; i++) {
    const mid = (low + high) / 2;
    if (tryUnit(mid)) low = mid; else high = mid;
  }
  tryUnit(low);
};

const fitLabels = () => {
  const size = activeSize();
  document.querySelectorAll('.page--a4.default .label').forEach((label) => fitLabel(label, size));
};

export const labelSizeUpdate = () => {
  const size = activeSize();
  el.labelSize.classList.toggle('hidden', el.factory.value !== 'custom-size');

  document.querySelectorAll('.page--a4.default').forEach((page) => {
    const label = page.querySelector('.label');
    label.style.setProperty('--label-w', `${size.width}in`);
    label.style.setProperty('--label-h', `${size.height}in`);

    const metric = size.metric ? ` (${size.metric})` : '';
    page.querySelector('.print-size').textContent = `Label size ${inches(size.height)} tall x ${inches(size.width)} wide${metric}`;
    page.dataset.title = `${TITLES[page.dataset.type]} (${size.name})`;
  });

  fitLabels();

  // The UPC LABEL box on the front shipping mark matches the master carton label in use
  const master = document.querySelector('.page--a4[data-type="master"]:not(.factory--hidden) .label');
  if (master) {
    el.preview.style.setProperty('--upc-w', `${master.offsetWidth}px`);
    el.preview.style.setProperty('--upc-h', `${master.offsetHeight}px`);
    fitShippingMarks();
  }
};

let fitQueued = false;

export const labelSizeInit = () => {
  el.labelHeight.addEventListener('input', labelSizeUpdate);
  el.labelWidth.addEventListener('input', labelSizeUpdate);

  // Refit when the text, barcode or logo inside a label changes. The fit itself only writes to .label and is skipped.
  const observer = new MutationObserver((mutations) => {
    if (fitQueued || !mutations.some((mutation) => !mutation.target.classList?.contains('label'))) return;
    fitQueued = true;
    queueMicrotask(() => {
      fitQueued = false;
      fitLabels();
    });
  });

  document.querySelectorAll('.page--a4.default .label').forEach((label) => {
    observer.observe(label, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['src', 'style', 'class'] });
    label.addEventListener('load', fitLabels, true);
  });
};

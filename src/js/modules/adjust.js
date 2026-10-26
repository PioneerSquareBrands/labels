import { default as el } from './domElements.js';
import { brandDefaults } from './brandDefaults.js';

// Parts of a label that can be resized by clicking them in the preview. A change applies to the same part on every
// label in its group, so the description on the UPC labels changes on the polybag, master carton and inner carton together.
const PARTS = {
  label__brand: 'Logo',
  label__description: 'Description',
  label__upc: 'Barcode',
  label__source: 'Made in',
  label__info: 'Item and SKU',
  label__install: 'Instructions',
  label__internal: 'Internal use',
  'shipping-mark__logo': 'Logo',
  'shipping-mark__sku': 'SKU',
  'shipping-mark__description': 'Description',
  'shipping-mark__middle': 'Details',
  'shipping-mark__bottom': 'Item',
};

const GROUP_NAMES = { upc: 'UPC labels', sapona: 'Sapona label', others: 'Others labels', shipping: 'Shipping marks' };
const STEP = 0.05;
const MIN_SCALE = 0.5;
const MAX_SCALE = 2;
const PART_SELECTOR = Object.keys(PARTS).map((part) => `.page .${part}`).join(', ');

let adjustments = {};
let selected = null;
let toolbar;

const groupOf = (page) => {
  if (page.classList.contains('page--carton')) return 'shipping';
  if (page.classList.contains('sapona')) return 'sapona';
  if (page.classList.contains('custom-factory')) return 'others';
  return 'upc';
};

const partOf = (node) => Object.keys(PARTS).find((part) => node.classList.contains(part));
const keyOf = (node) => `${groupOf(node.closest('.page'))}:${partOf(node)}`;

const storageKey = () => {
  const defaults = brandDefaults();
  const sku = (el.sku.value.toUpperCase() || defaults.sku).trim();
  return `adjust:${defaults.brandField}:${sku}`;
};

const save = () => {
  try {
    if (Object.keys(adjustments).length) localStorage.setItem(storageKey(), JSON.stringify(adjustments));
    else localStorage.removeItem(storageKey());
  } catch (error) {
    // Adjustments still apply for this session when storage is unavailable
  }
};

const load = () => {
  try {
    adjustments = JSON.parse(localStorage.getItem(storageKey())) || {};
  } catch (error) {
    adjustments = {};
  }
};

const apply = () => {
  document.querySelectorAll(PART_SELECTOR).forEach((node) => {
    const scale = adjustments[keyOf(node)];
    node.style.zoom = scale ? `${scale}` : '';
    node.classList.toggle('adjusted', Boolean(scale));
  });
  el.preview.dataset.adjustments = Object.keys(adjustments).length;
};

const renderToolbar = () => {
  if (!selected) {
    toolbar.hidden = true;
    return;
  }

  const key = keyOf(selected);
  const scale = adjustments[key] || 1;
  const [group, part] = key.split(':');
  const count = Object.keys(adjustments).length;

  toolbar.querySelector('.adjust__name').textContent = `${PARTS[part]} · ${GROUP_NAMES[group]}`;
  toolbar.querySelector('.adjust__value').textContent = `${Math.round(scale * 100)}%`;
  toolbar.querySelector('[data-action="smaller"]').disabled = scale <= MIN_SCALE + 0.001;
  toolbar.querySelector('[data-action="larger"]').disabled = scale >= MAX_SCALE - 0.001;
  toolbar.querySelector('[data-action="reset"]').disabled = scale === 1;
  toolbar.querySelector('[data-action="reset-all"]').disabled = count === 0;
  toolbar.querySelector('[data-action="reset-all"] span').textContent = count ? `Reset all (${count})` : 'Reset all';
  toolbar.hidden = false;
  position();
};

const position = () => {
  if (!selected || toolbar.hidden) return;

  const rect = selected.getBoundingClientRect();
  const width = toolbar.offsetWidth;
  const left = Math.min(Math.max(8, rect.left + rect.width / 2 - width / 2), window.innerWidth - width - 8);
  const above = rect.top - toolbar.offsetHeight - 8;
  toolbar.style.left = `${left}px`;
  toolbar.style.top = `${above > 8 ? above : rect.bottom + 8}px`;
};

const select = (node) => {
  selected?.classList.remove('adjust--selected');
  selected = node;
  selected?.classList.add('adjust--selected');
  renderToolbar();
};

// Exports capture the preview, so the selection and adjustment outlines are hidden while one runs
export const hideAdjustUI = (hidden) => {
  if (hidden) select(null);
  document.body.classList.toggle('adjust-hidden', hidden);
};

const change = (action) => {
  const key = keyOf(selected);
  const scale = adjustments[key] || 1;

  if (action === 'reset-all') {
    adjustments = {};
  } else {
    const next = action === 'reset' ? 1 : Math.round((scale + (action === 'larger' ? STEP : -STEP)) * 100) / 100;
    const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
    if (clamped === 1) delete adjustments[key]; else adjustments[key] = clamped;
  }

  save();
  apply();
  renderToolbar();
};

const reload = () => {
  load();
  apply();
  renderToolbar();
};

export const adjustInit = () => {
  toolbar = document.querySelector('.adjust');

  toolbar.addEventListener('mousedown', (event) => event.preventDefault());
  toolbar.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (button && selected) change(button.dataset.action);
  });

  document.addEventListener('click', (event) => {
    if (toolbar.contains(event.target)) return;

    const part = event.target.closest(PART_SELECTOR);
    const ignored = event.target.closest('.grab__button, .shipping-mark__tihi');
    select(part && !ignored ? part : null);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') select(null);
  });

  el.preview.querySelector('.preview__content').addEventListener('scroll', position);
  window.addEventListener('resize', position);

  el.sku.addEventListener('input', reload);
  el.brand.addEventListener('change', reload);
  window.addEventListener('load', reload);
};

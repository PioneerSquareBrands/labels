import { default as el } from './domElements.js';
import { brandDefaults } from './brandDefaults.js';
import { selectChoose } from './select.js';

// Approved wording for each badge, one entry per printed line. The choice is saved per brand and SKU.
const BADGES = {
  recycled: ['This carton is', 'made with', 'recycled content'],
  recyclable: ['This carton is', 'recyclable'],
  none: null,
};

const DEFAULT_BADGE = 'recycled';

const storageKey = () => {
  const defaults = brandDefaults();
  const sku = (el.sku.value.toUpperCase() || defaults.sku).trim();
  return `recycling:${defaults.brandField}:${sku}`;
};

const render = () => {
  const lines = BADGES[el.recycling.value];

  document.querySelectorAll('.shipping-mark__recycling').forEach((badge) => {
    badge.hidden = !lines;
    if (lines) badge.querySelector('.shipping-mark__recycling-text').innerHTML = lines.join('<br />');
  });
};

const save = () => {
  try {
    if (el.recycling.value === DEFAULT_BADGE) localStorage.removeItem(storageKey());
    else localStorage.setItem(storageKey(), el.recycling.value);
  } catch (error) {
    // The choice still applies for this session when storage is unavailable
  }
};

const load = () => {
  let stored = null;
  try {
    stored = localStorage.getItem(storageKey());
  } catch (error) {
    stored = null;
  }

  const value = stored in BADGES ? stored : DEFAULT_BADGE;
  if (el.recycling.value !== value) selectChoose('#recycling', value);
  render();
};

export const recyclingInit = () => {
  el.recycling.addEventListener('change', () => {
    save();
    render();
  });

  el.sku.addEventListener('input', load);
  el.brand.addEventListener('change', load);
  window.addEventListener('load', load);
};

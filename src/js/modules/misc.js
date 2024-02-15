import { default as el } from './domElements.js';
import { brandDefaults } from './brandDefaults.js';

export const qrToggle = () => {
  const qrToggle = document.querySelector('.qr__toggle');
  const qrPath = document.querySelector('#qr_path');

  // Load the initial state from localStorage
  const initialState = localStorage.getItem('qrPathDisabled') === 'true';
  qrPath.disabled = initialState;
  qrToggle.classList.toggle('qr__toggle--active', !initialState);

  qrToggle.addEventListener('click', () => {
    qrPath.disabled = !qrPath.disabled;
    qrToggle.classList.toggle('qr__toggle--active', !qrPath.disabled);

    // Save the current state to localStorage
    localStorage.setItem('qrPathDisabled', qrPath.disabled.toString());

    if (!qrPath.disabled) {
      qrPath.focus();
    }
  });
}

export const qrVisibility = () => {
  const qrVisibilityToggle = document.querySelector('.qr__visibility');
  const qrDivToHide = document.querySelector('.label__install');

  // Load the initial state from localStorage or default to true if not found
  const initialState = localStorage.getItem('qrVisibilityShown') !== 'false';
  qrDivToHide.classList.toggle('label__install--active', !initialState);
  qrVisibilityToggle.classList.toggle('qr__visibility--active', !initialState);

  qrVisibilityToggle.addEventListener('click', () => {
    qrDivToHide.classList.toggle('label__install--active');
    qrVisibilityToggle.classList.toggle('qr__visibility--active', qrDivToHide.classList.contains('label__install--active'));

    // Save the current state to localStorage
    localStorage.setItem('qrVisibilityShown', !qrDivToHide.classList.contains('label__install--active').toString());
  });
}

export const sidebarAccordion = () => {
  const accordionToggle = document.querySelectorAll('.sidebar__title');
  
  accordionToggle.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const form = toggle.nextElementSibling;
      if (form) {
        toggle.classList.toggle('sidebar__title--active');
        form.classList.toggle('sidebar__form--active');
      }
    });
  });
}

export const outline = () => {
  const fields = el.sidebar.querySelectorAll('input, select, textarea');

  fields.forEach((field) => {
    field.addEventListener('focus', () => outlineHighlight(field, 'add'));
    field.addEventListener('blur', () => outlineHighlight(field, 'remove'));
  });
};

const outlineHighlight = (field, action) => {
  const ancestorField = field.closest('[data-highlight]');
  if (ancestorField && ancestorField.dataset.highlight) {
    const sections = ancestorField.dataset.highlight.split(',');

    sections.forEach((section) => {
      if (section) {
        const trimmedSection = section.trim();
        const targetSections = document.querySelectorAll(trimmedSection);

        targetSections.forEach(targetSection => {
          if (targetSection) {
            targetSection.classList[action]('outlininator');
          }
        });
      }
    });
  }
};

export const namer = (type, filetype) => {
  const defaults = brandDefaults();

  let brand = el.brand.value;
  const sku = el.sku.value.toUpperCase() || defaults.sku;
  const visiblePages = document.querySelectorAll('.page:not(.page--hidden)');
  let labelTypes = Array.from(visiblePages).map(page => page.getAttribute('data-type'));

  const packagingTypes = ['polybag', 'master', 'inner'];
  const shippingTypes = ['shipping-front', 'shipping-side'];

  let packagingLabelTypes = labelTypes.filter(type => packagingTypes.includes(type)).join('.');
  let shippingLabelTypes = labelTypes.filter(type => shippingTypes.includes(type)).join('.');

  packagingLabelTypes = packagingLabelTypes.replace(/polybag/g, 'PB');
  packagingLabelTypes = packagingLabelTypes.replace(/master/g, 'MC');
  packagingLabelTypes = packagingLabelTypes.replace(/inner/g, 'IC');

  if (shippingLabelTypes.includes('shipping-front') && shippingLabelTypes.includes('shipping-side')) {
    shippingLabelTypes = 'Shipping Marks';
  } else {
    shippingLabelTypes = shippingLabelTypes.replace(/shipping-front/g, 'Shipping Marks - Front');
    shippingLabelTypes = shippingLabelTypes.replace(/shipping-side/g, 'Shipping Marks - Side');
  }

  brand = brand.replace(/brenthaven/g, 'BH');
  brand = brand.replace(/gumdrop/g, 'GD');
  brand = brand.replace(/vault/g, 'VT');

  const packagingName = `${brand}.${sku} ${packagingLabelTypes} Label.${filetype}`;
  const shippingName = `${brand}.${sku} ${shippingLabelTypes} Label.${filetype}`;

  if (type === 'packaging') {
    return packagingName;
  } else if (type === 'shipping') {
    return shippingName;
  }

  return null;
}

export const pixelToInch = (pixels) => {
  const dpi = 96; // Assuming a standard DPI of 96
  return parseFloat((pixels / dpi).toFixed(2));
}

export const pixelToMm = (pixels) => {
  const dpi = 96; // Assuming a standard DPI of 96
  const mmPerInch = 25.4; // Millimeters per inch
  return parseFloat(((pixels / dpi) * mmPerInch).toFixed(2));
}
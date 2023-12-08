import { default as el } from './domElements.js';

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
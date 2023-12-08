import { canvasUpdate } from './canvasUpdate.js';

export const controlInit = () => {
  let previewLayout = document.querySelector('.layout__form');
  let previewVisibility = document.querySelector('.visibility__form');

  previewLayout.addEventListener('change', pageLayout);
  previewVisibility.addEventListener('change', pageVisibility);

  previewLayout.addEventListener('submit', (event) => event.preventDefault());
  previewVisibility.addEventListener('submit', (event) => event.preventDefault());
  
  pageLayout();
  pageVisibility();
}

const applyAnimation = (element, firstRect, wasHidden) => {
  const last = element.getBoundingClientRect();

  const deltaX = firstRect.left - last.left;
  const deltaY = firstRect.top - last.top;
  const deltaW = last.width === 0 ? 1 : firstRect.width / last.width;
  const deltaH = last.height === 0 ? 1 : firstRect.height / last.height;

  if (wasHidden) {
    element.animate([{
      transformOrigin: 'center',
      transform: 'scale(0)'
    }, {
      transformOrigin: 'center',
      transform: 'scale(1)'
    }], {
      duration: 250,
      easing: 'ease-in-out',
      fill: 'both'
    });
  } else {
    element.animate([{
      transformOrigin: 'top left',
      transform: `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`
    }, {
      transformOrigin: 'top left',
      transform: 'none'
    }], {
      duration: 250,
      easing: 'ease-in-out',
      fill: 'both'
    });
  }
};

const pageLayout = () => {
  let checkbox = document.querySelector('.preview__layout #expanded');
  let pagePreview = document.querySelector('.preview__content');

  const firstRect = pagePreview.getBoundingClientRect();
  const wasHidden = pagePreview.classList.contains('preview__content--hidden');

  if (checkbox && checkbox.checked) {
    pagePreview.classList.remove('preview__content--condensed');
    pagePreview.classList.add('preview__content--expanded');
  } else {
    pagePreview.classList.remove('preview__content--expanded');
    pagePreview.classList.add('preview__content--condensed');
  }

  applyAnimation(pagePreview, firstRect, wasHidden);
  canvasUpdate();
};

const pageVisibility = () => {
  const shouldShow = checkboxId => document.querySelector(checkboxId).checked;

  const visibilityStates = {
    polybag: shouldShow('#polybag'),
    master: shouldShow('#master'),
    inner: shouldShow('#inner'),
    'shipping-front': shouldShow('#shipping_mark_front'),
    'shipping-side': shouldShow('#shipping_mark_side'),
  };

  const toggleVisibility = (element, type) => {
    element.classList.toggle('page--hidden', !visibilityStates[type]);
  };

  const elements = document.querySelectorAll('.preview__content .page');

  let firstRects = Array.from(elements).map(element => {
    return {
      rect: element.getBoundingClientRect(),
      wasHidden: element.classList.contains('page--hidden')
    };
  });

  elements.forEach((element, index) => {
    const dataType = element.getAttribute('data-type');
    if (dataType in visibilityStates) {
      toggleVisibility(element, dataType);
    }
  });

  elements.forEach((element, index) => {
    applyAnimation(element, firstRects[index].rect, firstRects[index].wasHidden);
  });
};
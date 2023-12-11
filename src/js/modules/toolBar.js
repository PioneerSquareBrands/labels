import { jsPDF } from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { default as el } from './domElements.js';
import { namer } from './misc.js';
import { canvasUpdate } from './canvasUpdate.js';
import { pixelToInch } from './misc.js';

let DEBUG = false;
const upcToggles = el.controls.querySelectorAll('.visibility--upc input[type="checkbox"]');
const shippingToggles = el.controls.querySelectorAll('.visibility--shipping input[type="checkbox"]');
const upcButton = el.controls.querySelector('.download__button--upc');
const shippingButton = el.controls.querySelector('.download__button--shipping');

export const controlInit = () => {
  let previewLayout = document.querySelector('.layout__form');
  let previewVisibility = document.querySelector('.visibility__form');

  previewLayout.addEventListener('submit', (event) => event.preventDefault());
  previewVisibility.addEventListener('submit', (event) => event.preventDefault());
  
  previewLayout.addEventListener('change', pageLayout);
  previewVisibility.addEventListener('change', pageVisibility);

  pageLayout();
  pageVisibility();

  toggleAll('#upc-select-all', ['#polybag', '#master', '#inner']);
  toggleAll('#shipping-select-all', ['#shipping_mark_front', '#shipping_mark_side']);

  pdfButtons();
}

const toggleAll = (buttonId, checkboxes) => {
  const button = document.querySelector(buttonId);

  const updateButtonClass = (allChecked) => {
    if (allChecked) {
      button.classList.remove('select-all--unchecked');
      button.classList.add('select-all--checked');
    } else {
      button.classList.remove('select-all--checked');
      button.classList.add('select-all--unchecked');
    }
  };

  const checkInitialStatus = () => {
    const allChecked = checkboxes.every(id => document.querySelector(id).checked);
    updateButtonClass(allChecked);
  };

  const toggleCheckboxes = () => {
    const allChecked = checkboxes.every(id => document.querySelector(id).checked);
    checkboxes.forEach(id => {
      const checkbox = document.querySelector(id);
      checkbox.checked = !allChecked;
    });
    updateButtonClass(!allChecked);
    document.querySelector('.visibility__form').dispatchEvent(new Event('change'));
  };

  checkInitialStatus();

  button.addEventListener('click', toggleCheckboxes);
};

const applyAnimation = (element, firstRect, wasHidden, isHiding) => {
  const last = element.getBoundingClientRect();

  const deltaX = firstRect.left - last.left;
  const deltaY = firstRect.top - last.top;
  const deltaW = last.width === 0 ? 1 : firstRect.width / last.width;
  const deltaH = last.height === 0 ? 1 : firstRect.height / last.height;
  let animation;

  if (wasHidden) {
    // Animate to show up from the center
    animation = element.animate([{
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
    // Animate to move to the new position
    animation = element.animate([{
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

  const elements = document.querySelectorAll(`.preview__content .page`);

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
    applyAnimation(element, firstRects[index].rect, firstRects[index].wasHidden, firstRects[index].isHiding);

    // I probably could put this anywhere, but I'm putting it here for now
    if (index === elements.length - 1) {
      setTimeout(() => {
        document.body.classList.remove('canvas-animating');
      }, 250);
    }
  });
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

export const pdfButtons = () => {
  window.onload = () => buttonBuilder();
  document.querySelector('#brand').addEventListener('change', buttonBuilder);
  document.querySelector('#sku').addEventListener('input', buttonBuilder);
  document.querySelector('.layout__form').addEventListener('change', buttonBuilder);
  document.querySelector('.visibility__form').addEventListener('change', buttonBuilder);

  if (!DEBUG) {
    upcButton.addEventListener('click', () => savePDF('.page--a4'));
    shippingButton.addEventListener('click', () => savePDF('.page--carton'));
  } else{
    window.onload = () => generatePDF('.page');
  }
}

const generatePDF = async (elements) => {
  const pdf = new jsPDF('p', 'in', 'a4');
  const pages = Array.from(document.querySelectorAll(`${elements}:not(.page--hidden) .print`));
  let pageType;

  for (const page of pages) {
    if (page.closest('.scaler-wrapper')) page.closest('.scaler-wrapper').classList.add('rendering');

    await htmlToImage.toPng(page, {
      quality: 1,
      pixelRatio: 4,
    })
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;

        if (!DEBUG) {
          const originalWidth = page.offsetWidth;
          const originalHeight = page.offsetHeight;

          const imgWidth = pixelToInch(originalWidth);
          const imgHeight = pixelToInch(originalHeight);
          
          if (imgWidth > 8.3 || imgHeight > 11.7) { // When the image is larger than A4
            const imgData = dataUrl;
            const orientation = imgWidth > imgHeight ? 'landscape' : 'portrait';
            pageType = 'shipping';

            pdf.addPage([imgWidth, imgHeight], orientation);
            pdf.addImage(imgData, 'png', 0, 0, imgWidth, imgHeight);
            
            if (page === pages[pages.length - 1]) {
              pdf.deletePage(1);
            }
          } else { // When the image is smaller than A4
            const x = (8.3 - imgWidth) / 2;
            const y = (11.7 - imgHeight) / 2;
            pageType = 'packaging';

            const imgData = dataUrl;

            pdf.addImage(imgData, 'png', x, y, imgWidth, imgHeight);
            if (page !== pages[pages.length - 1]) {
              pdf.addPage();
            }
          }
        } else {
          page.insertAdjacentElement('afterend', img);
        }

        if (page.closest('.scaler-wrapper')) page.closest('.scaler-wrapper').classList.remove('rendering');
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  if (!DEBUG) return { pdf, pageType };
}

const savePDF = async (elements) => {
  const { pdf, pageType } = await generatePDF(elements);
  pdf.save(namer(pageType));
}

const buttonBuilder = () => {
  upcButton.setAttribute('data-tooltip', namer('packaging'));
  upcButton.setAttribute('data-tooltip-location', 'bottom');
  shippingButton.setAttribute('data-tooltip', namer('shipping'));
  shippingButton.setAttribute('data-tooltip-location', 'bottom');

  disableButtonIfAllUnchecked(upcToggles, upcButton);
  disableButtonIfAllUnchecked(shippingToggles, shippingButton);
}

const disableButtonIfAllUnchecked = (toggles, button) => {
  const allUnchecked = Array.from(toggles).every(toggle => !toggle.checked);
  button.disabled = allUnchecked;
}
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   selectInit: function() { return /* binding */ selectInit; }
/* harmony export */ });

const selectInit = () => {
  document.querySelectorAll('select').forEach((select, index) => {
    const selectinatorDiv = document.createElement('div');
    selectinatorDiv.className = 'selectinator';
    selectinatorDiv.id = `selectinator-${index + 1}`;
    selectinatorDiv.innerHTML = `
      <input class="selectinator-input" type="text" id="selectinator_input_${index + 1}">
      <button class="selectinator-button" aria-hidden="true" tabindex="-1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-up-down"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg></button>
      <div class="selectinator-options"></div>`;
    select.after(selectinatorDiv);

    const selectinatorLabelSibling = select.previousElementSibling;
    if (selectinatorLabelSibling && selectinatorLabelSibling.tagName === 'LABEL') {
      selectinatorLabelSibling.setAttribute('for', `selectinator_input_${index + 1}`);
    }

    const selectinatorInput = selectinatorDiv.querySelector('.selectinator-input');
    const selectinatorButton = selectinatorDiv.querySelector('.selectinator-button');
    const optionsDiv = selectinatorDiv.querySelector('.selectinator-options');

    Array.from(select.options).forEach((option, optionIndex) => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'selectinator-option';
      optionDiv.textContent = option.text;
      optionDiv.dataset.value = option.value;
      optionsDiv.appendChild(optionDiv);

      // Add mousedown event listener to each option
      // Click event happens after blur so mousedown is a work around that works for this scenario
      optionDiv.addEventListener('mousedown', () => {
        selectinatorInput.value = option.text;
        select.value = option.value;
        optionsDiv.querySelectorAll('.selectinator-option').forEach((o) => { o.classList.remove('highlighted') })
        optionDiv.classList.add('highlighted');
        select.dispatchEvent(new Event('change', { bubbles: false }));
        //hideOptions(event);
      });

      if (select.selectedIndex === optionIndex) {
        optionDiv.classList.add('highlighted');
      }
    });

    const selectedOption = select.options[select.selectedIndex];
    selectinatorInput.value = selectedOption.textContent;

    selectinatorButton.addEventListener('mousedown', toggleOptions);
    selectinatorInput.addEventListener('focus', openOptions);
    selectinatorInput.addEventListener('mousedown', toggleOptions);
    selectinatorInput.addEventListener('blur', hideOptions);
    document.addEventListener('mousedown', closeAllOptions);

    selectinatorInput.addEventListener('input', filterOptions);
    selectinatorInput.addEventListener('keydown', keyboardNavigation(select));

    select.style.display = 'none';
    //select.setAttribute('tabindex', '-1');
  });
}

const openOptions = (event) => {
  const parentSelectinator = event.target.closest('.selectinator');
  if (!parentSelectinator.classList.contains('active')) {
    parentSelectinator.classList.add('active');
  }
};

const hideOptions = (event) => {
  const parentSelectinator = event.target.closest('.selectinator');
  if (parentSelectinator) {
    parentSelectinator.classList.remove('active');
  }
};

const toggleOptions = (event) => {
  event.preventDefault();
  const parentSelectinator = event.target.closest('.selectinator');
  const selectinatorInput = parentSelectinator.querySelector('.selectinator-input');

  if (!parentSelectinator.classList.contains('active')) {
    parentSelectinator.classList.add('active');
    setTimeout(() => {
      selectinatorInput.focus();
    }, 0);
  } else {
    parentSelectinator.classList.remove('active');
  }
};

const closeAllOptions = (event) => {
  if (!event.target.closest('.selectinator-option') && !event.target.closest('.selectinator')) {
    document.querySelectorAll('.selectinator').forEach(selectinator => {
      selectinator.classList.remove('active');
    });
  }
};

const filterOptions = (event) => {
  openOptions(event);

  const inputText = event.target.value.toLowerCase();
  const parentSelectinator = event.target.closest('.selectinator');
  const optionsDiv = parentSelectinator.querySelector('.selectinator-options');

  optionsDiv.querySelectorAll('div').forEach(optionDiv => {
    const optionText = optionDiv.textContent.toLowerCase();
    if (optionText.includes(inputText)) {
      optionDiv.style.display = ''; // Show the option
    } else {
      optionDiv.style.display = 'none'; // Hide the option
    }
  });
};

const keyboardNavigation = (select) => (event) => {
  const parentSelectinator = event.target.closest('.selectinator');
  const selectinatorInput = parentSelectinator.querySelector('.selectinator-input');
  const optionsDiv = parentSelectinator.querySelector('.selectinator-options');
  const options = Array.from(optionsDiv.querySelectorAll('div')).filter(option => option.style.display !== 'none'); // Only consider visible options
  const currentIndex = options.findIndex(option => option.classList.contains('highlighted'));

  switch (event.key) {
    case 'ArrowDown':
      if (!parentSelectinator.classList.contains('active')){
        openOptions(event);
      } else {
        if (currentIndex < options.length - 1) {
          const nextIndex = currentIndex + 1;
          options[currentIndex]?.classList.remove('highlighted');
          options[nextIndex]?.classList.add('highlighted');
          selectinatorInput.value = options[nextIndex].textContent;
        }
      }
      break;
    case 'ArrowUp':
      if (!parentSelectinator.classList.contains('active')){
        openOptions(event);
      } else {
        if (currentIndex > 0) {
          const prevIndex = currentIndex - 1;
          options[currentIndex]?.classList.remove('highlighted');
          options[prevIndex]?.classList.add('highlighted');
          selectinatorInput.value = options[prevIndex].textContent;
        }
      }
      break;
    case 'Enter':
      event.preventDefault();
      if (currentIndex !== -1) {
        const selectedOption = options[currentIndex];
        selectinatorInput.value = selectedOption.textContent;
        select.value = selectedOption.dataset.value;
        parentSelectinator.classList.remove('active');
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
      break;
    case 'Escape':
      parentSelectinator.classList.remove('active');
      selectinatorInput.blur();
      
      const selectedOption = select.options[select.selectedIndex];
      selectinatorInput.value = selectedOption ? selectedOption.textContent : '';
      options.forEach((o) => { o.classList.remove('highlighted') });
      optionsDiv.querySelector(`[data-value="${selectedOption.textContent.toLowerCase()}"]`).classList.add('highlighted');
      break;
  }
};

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validateNumbers: function() { return /* binding */ validateNumbers; }
/* harmony export */ });
/* harmony import */ var _domElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

const { sidebar } = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"];

let numberInputs = sidebar.querySelectorAll('input[type="number"]');

const validateNumbers = () => {
  numberInputs.forEach((input) => {
    input.addEventListener('keydown', (event) => {
      const allowedKeys = ['Delete', 'Backspace', 'Tab', 'Escape', 'Enter', '.', 'Shift', 'Control', 'Alt', 'Meta'];
      const isAllowedKey = allowedKeys.includes(event.key) ||
        (['a', 'c', 'x', 'v', 'r'].includes(event.key.toLowerCase()) && (event.ctrlKey || event.metaKey)) ||
        (['Home', 'End', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key));
      const isNumber = !event.shiftKey && ((event.key >= '0' && event.key <= '9') || (event.key >= 'Numpad0' && event.key <= 'Numpad9'));

      if (!isAllowedKey && !isNumber) {
        event.preventDefault();
        validateInput(input, false, 'Please use numbers only');
      } else {
        validateInput(input, true);
      }
    });

    input.addEventListener('input', (event) => {
      const minValue = parseFloat(input.min);
      const maxValue = parseFloat(input.max);
      let value = input.value;

      if (value.includes('.') && value.split('.')[1].length > 1) {
        // If the input value has a decimal point and more than one digit after it, do not parse it as a float
        return;
      }

      let numericValue = value;

      if (value.length > 1 && numericValue < minValue) {
        numericValue = minValue;
        validateInput(input, false, `Minimum value is ${minValue}`);
      } else if (numericValue > maxValue) {
        numericValue = maxValue;
        validateInput(input, false, `Maximum value is ${maxValue}`);
      }

      if (value !== numericValue.toString()) {
        input.value = numericValue.toString();
      }
    });
  });
}

const validateInput = (input, isValid, message) => {
  input.classList.toggle('input--error', !isValid);
  const field = input.closest('.field');
  field.classList.toggle('field--error', !isValid);
  if (!isValid) {
    field.setAttribute('data-error', message || 'Invalid input');
  } else {
    field.removeAttribute('data-error');
  }
};

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const domElements = {
  sidebar: document.querySelector('.sidebar__fields'),
  upcForm: document.querySelector('#upc_form'),
  shipForm: document.querySelector('#shipping_form'),
  upcLabel: document.querySelector('#upc_title'),
  shipLabel: document.querySelector('#shipping_title'),
  preview: document.querySelector('.preview'),
  brand: document.querySelector('#brand'),
  itemMaster: document.querySelector('#item_master'),
  sku: document.querySelector('#sku'),
  source: document.querySelector('#source'),
  description: document.querySelector('#description'),
  upc: document.querySelector('#item_upc'),
  qrLink: document.querySelector('#qr_link'),
  qrBase: document.querySelector('.qrlink__base'),
  qrPath: document.querySelector('#qr_path'),
  pbContent: document.querySelector('#pb_content'),
  mcContent: document.querySelector('#mc_content'),
  icContent: document.querySelector('#ic_content'),
  dimLength: document.querySelector('#shipping_length'),
  dimWidth: document.querySelector('#shipping_width'),
  dimHeight: document.querySelector('#shipping_height'),
  boxQty: document.querySelector('#shipping_quantity'),
  gWeight: document.querySelector('#shipping_gross'),
  nWeight: document.querySelector('#shipping_net'),
  purchaseOrder: document.querySelector('#shipping_po'),
  tihi: document.querySelector('#shipping_tihi'),
  tihiLabel: document.querySelector('#shipping_tihi_label'),
  printHeaders: document.querySelectorAll('.print-header'),
  labels: document.querySelectorAll('.label'),
  printLogos: document.querySelectorAll('.print-logo'),
  printItemMasters: document.querySelectorAll('.print-item-master'),
  printBoxSkus: document.querySelectorAll('.print-box-sku'),
  printSkus: document.querySelectorAll('.print-sku'),
  printCountries: document.querySelectorAll('.print-country'),
  printDescriptions: document.querySelectorAll('.print-description'),
  printInstallBases: document.querySelectorAll('.print-install-base'),
  printInstallPaths: document.querySelectorAll('.print-install-path'),
  printPolybagQty: document.querySelectorAll('[data-type="polybag"] .label__quantity'),
  printMasterQty: document.querySelectorAll('[data-type="master"] .label__quantity'),
  printInnerQty: document.querySelectorAll('[data-type="inner"] .label__quantity'),
  printDimLengths: document.querySelectorAll('.print-dim-length'),
  printDimWidths: document.querySelectorAll('.print-dim-width'),
  printDimHeights: document.querySelectorAll('.print-dim-height'),
  printBoxQty: document.querySelectorAll('.print-box-qty'),
  printGrossWgt: document.querySelectorAll('.print-gross-weight'),
  printNetWgt: document.querySelectorAll('.print-net-weight'),
  printPurchaseOrders: document.querySelectorAll('.print-purchase-order'),
  printTihi: document.querySelector('.print-tihi')
};

/* harmony default export */ __webpack_exports__["default"] = (domElements);


/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   labelInit: function() { return /* binding */ labelInit; }
/* harmony export */ });
/* harmony import */ var _domElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _brandDefaults_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _canvasUpdate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);




let dragCounter = 0;
let iconSize = 60;

const triggerEventListeners = () => {
  brandUpdate();
  itemMasterUpdate();
  skuUpdate();
  descriptionUpdate();
  upcUpdate();
  sourceUpdate();
  qrCodeUpdate();
  contentUpdate();
  dimUpdate();
  qtyUpdate();
  weightUpdate();
  poUpdate();
  tihiOnload();
};

const labelInit = () => {
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].brand.addEventListener('change', brandUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].itemMaster.addEventListener('input', itemMasterUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].sku.addEventListener('input', skuUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].description.addEventListener('input', descriptionUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].upc.addEventListener('input', upcUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].source.addEventListener('change', sourceUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].qrPath.addEventListener('input', qrCustomUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].pbContent.addEventListener('input', contentUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].mcContent.addEventListener('input', contentUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].icContent.addEventListener('input', contentUpdate);

  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].dimWidth.addEventListener('input', dimUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].dimLength.addEventListener('input', dimUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].dimHeight.addEventListener('input', dimUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].dimWidth.addEventListener('change', _canvasUpdate_js__WEBPACK_IMPORTED_MODULE_2__.canvasUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].dimLength.addEventListener('change', _canvasUpdate_js__WEBPACK_IMPORTED_MODULE_2__.canvasUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].dimHeight.addEventListener('change', _canvasUpdate_js__WEBPACK_IMPORTED_MODULE_2__.canvasUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].boxQty.addEventListener('input', qtyUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].gWeight.addEventListener('input', weightUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].nWeight.addEventListener('input', weightUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].purchaseOrder.addEventListener('input', poUpdate);

  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].upcForm.addEventListener('submit', (event) => event.preventDefault() );
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].shipForm.addEventListener('submit', (event) => event.preventDefault() );

  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].tihi.addEventListener('change', tihiUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].tihiLabel.addEventListener('drop', tihiDragDrop);
  dragDropHandler();

  window.addEventListener('load', triggerEventListeners);
}

  const updateTextContent = (nodeList, value) => {
    nodeList.forEach((node) => node.textContent = value);
  };

const brandUpdate = () => {
  const defaults = (0,_brandDefaults_js__WEBPACK_IMPORTED_MODULE_1__.brandDefaults)();
  // Update Preview class
  const classesToRemove = ['preview--brenthaven', 'preview--gumdrop', 'preview--vault'];
  classesToRemove.forEach((className) => _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].preview.classList.remove(className));
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].preview.classList.add(`preview--${defaults.brandField}`);

  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].labels.forEach(label => label.classList.add(`label--${defaults.brandField}`));
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printLogos.forEach(printLogo => printLogo.src = defaults.logoSrc);

  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printHeaders, defaults.headerText);
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printDescriptions, _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].description.value ||  defaults.description);
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printItemMasters, _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].itemMaster.value.toUpperCase() || defaults.itemMaster);
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printSkus, _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].sku.value.toUpperCase() || defaults.sku);
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printInstallBases, defaults.linkText);
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printInstallPaths, _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].itemMaster.value.toUpperCase() || defaults.itemMaster);

  // Update input field placeholders with defaults
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].itemMaster.placeholder = defaults.itemMaster;
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].qrPath.placeholder = defaults.itemMaster;
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].sku.placeholder = defaults.sku;
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].upc.placeholder = defaults.upc;
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].description.placeholder = defaults.description;

  skuUpdate();
  qrURL();
  upcUpdate();
}

const itemMasterUpdate = () => {
  const defaults = (0,_brandDefaults_js__WEBPACK_IMPORTED_MODULE_1__.brandDefaults)();
  const iTemMasterVal = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].itemMaster.value.toUpperCase()  || defaults.itemMaster;

  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].qrPath.placeholder = iTemMasterVal;
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printItemMasters, iTemMasterVal);
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printInstallPaths, iTemMasterVal);

  qrURL();
}

const skuUpdate = () => {
  const defaults = (0,_brandDefaults_js__WEBPACK_IMPORTED_MODULE_1__.brandDefaults)();
  const skuValue = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].sku.value.toUpperCase() || defaults.sku;

  let formattedSku = '';
  let isNumericThirdChar = skuValue.length > 2 && /[0-9]/.test(skuValue[2]);
  let section = '';

  for (let i = 0; i < skuValue.length; i++) {
    section += skuValue[i];

    let shouldEndSection = isNumericThirdChar
      ? (i === 3 || (i > 3 && (i - 3) % 3 === 0) && i < skuValue.length - 1 && i < 7)
      : ((i + 1) % 3 === 0 && i < skuValue.length - 1 && i < 12);

    if (shouldEndSection || i === skuValue.length - 1) {
      formattedSku += `<span class="sku__part">${section}</span>`;
      section = ''; // Reset section for next group
    }
  }

  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printBoxSkus.forEach((printBoxSkus) => {
    printBoxSkus.innerHTML = formattedSku;
  });
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printSkus, skuValue);
  dataMatrixUpdate();
}

const descriptionUpdate = () => {
  const defaults = (0,_brandDefaults_js__WEBPACK_IMPORTED_MODULE_1__.brandDefaults)();
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printDescriptions, _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].description.value || defaults.description);
}

const upcUpdate = () => {
  const defaults = (0,_brandDefaults_js__WEBPACK_IMPORTED_MODULE_1__.brandDefaults)();
  const barcodes = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].preview.querySelectorAll('.label__upc svg');
  const upcField = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].upc.value || defaults.upc;

  if (upcField.length == 12) {
    barcodes.forEach(barcode => {
      JsBarcode(barcode, upcField, {
        format: 'upc',
        height: 50,
        font: 'OCRB'
      });

      barcode.innerHTML += `<style>
      @font-face {
        font-family: 'OCRB';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url("data:font/woff2;base64,d09GMgABAAAAAEKAABAAAAAAmGgAAEIdAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4GVgCDUgg8CYRlEQgKgo1Ege4bC4NKAAE2AiQDhxAEIAWDYAeFLAyCHRvYhRXs2JO4HcxwW5VhRgaCjQOY7MBoFFWjK2b/f0xuDBFsA9V6HymwYc7qKh6keZtOo2jql2dMBWWQF0WSVS9LaPn+zzVLaWf02axCYkNRo2mOI3ntxtPvrVd0kR/cWbAh8snINutDFikaNB00TU5tLR2hsU9yDX7d/8/s2Ssw5CcwRDtEuLKEDzY0qP6uAZrXDdP5z5iIeC/yVW5iw9SY2qZyUxNdx5t6zxg+vPeP9+mfz/Thiy+/pil+oAJw3MbuhJQpS/02llcbZvAf+dN3V2yznkFshlXohYv+l2XK5p6ZkQPYVCl6BbD6wPPY7f2uPA484LY0CzTiFtwCSiSQMKGwbo9PWX1pqxS01IIW8MzuLN3xkyH/chCn9me5nfswpzVjSNoZqzkEfi1IVhy19XK2zRLE0SduDpPu7xDBUNgDhm0wETu//l/wL3yvqi9AgABBHMA7UJS6bflb9K9C3iENw5oyLllLnzOsWValDaum1FHDnFW6AkYQRbLioKijky/lomy/buL8z5n2/7vliEbsurHQJEn4GZP+FP7/aW9t0ivlsN0RoUJh5hAzBBBuE34aSLKXs3N7E3JCyfn/b7q+T/e5VxLn1uu3pumxJnNJoKF5Y02Uo3OrqNKtkuGWoEUV3YNbMyC1hbG8MRQSDKLfGOu/yYzjfefTn/0k+5kzafShnvZTuxN+Ack6p8xXkZZoy5cC2cboAq3LRBlzpkS0IzeB24n222//+5vyJ9Tm9M2YsZZCTMlFQ/l8fj9m+U+vuWkm+T+l6zUbuqCIokMf3JTBAJiAT0dcRTHk9oGpOT/vb+NKomfQOaYEgvjKyyUAWfk9lcAKWfw6RWHPI7RQlL5lrLFmdeiUGumIcKHQosPsXH1hgDmuxB/m/wMU95gKA3RQ40Gh95/AVzz3gUy4u5NpMExQw4BlM07xFSSFYaOPnh1mh4nDJGEyMHmYBswYhpaWkft7CsGAsE5z8cCaEID1MFHYGTejNzf2T7+fPrNqRdyp47///94cbhyuHC4dXj5cOJw9nDjsP8x7QnvwCoAAxzbIbJIHMnQETgYwxXoJWmPHXM3oq1mG/bYen5yenV9cXl3f3N7dPzw+PZc5ALp6+gaGRsYm50zPm5lbWFpZ29ja2V9wcHRydnF1c/fw9PL28UUg/fwDAlHooGAgv6CIUt3Q1t3V09fbPzg8NDI6PjYBTk1fpM7OXFpYvAzgQ8Owj1I646OfJkUBhU0AAQCayQAAAGvSgYH5HEwsAACszTgIySXXr6zu3bn/YP/uHECjA8DvhwAAECY/fACp5pUWl1dUltXWATVXazOw9iYwAHMAAOLlwQEqVqZGhwGzvvmOhmoezZp9p1ih0SW3LGk1ZkgF647vDqo3BBawwQ0B1iUhQcAnUVCp0mOKPL3omUjYHggRKIqqgVQNPwA5VQqgpFrvgbCBI6XVQKE6KwoDS9wQ0mAJUg2UVclkpOHSaYgDW8gzJRLxjyMSLg0qikPBqiQk+z11UTVQoWoI8FMDlar3UUjRAgQYLhoIkACBHEGV6n38t3tJWrWqlQ9mpIEOjWo4U8D212wh76CQq4XDQFm+DsRoAmWSMgrLMhtKSEsjJSglVw9OmE6rmZVXgjdm0alTDe+YgvXHYWiAKpUBBAxmB7cNjoIhYKEh5AiHGqQqhQFGaQEKhm8iJSaKwhkbwRJlREoE6EbDdko6b5Qia7ovKi0tAdunOHogPskXYCC89eKlm1hNqrGOWvD24TCEo6eENEgkgnLHJF8LH2YNrlU0OOMO6KicqTkEkJ9alIf8U7JSyjuGi3pBVqAdtg05KGHKjsvS1oXCKSrwEGk7J0Gr7tKuehHmMbe0hDjOmQGMN9RQ6EQgmTYEPAQGAj5LCECMBFySy00BxmqznCKMLCcYxoCesDNybA5VsGKDg1io2qAm/1L/SQB9WwefeWyxdWDvaff3woCqv/OmO79oXYcXgy7qd0dc+xjTWTT5MfxjsYR1VX4xOhXlw6JHXWwSyqyPCzlgVeo4q9ZfROUstDAuTYEWMJb+xBiCJ3vSyujF8pz2+Pc54KtB0o78wwQYPZGq/EV14WNPx6K2B19Dozb++Wd3gXdrZHHuTEjuTjS9Do5CNK1E/DQbbmSdAYMAyyc6JVrYDj81VPD+0iJlX/x8XQ0DJfcKrxVg0/tBBeC3DEB0guW11kAUUf1jgK4b9AZI4LVGnVCfN50uYAABsf4wICgWM1wJeIvm4MMgbWXv1i2lKqYln/vd4IRfa/17gIVs3hb45WGhX9OHVuXhxbsPj+cFuLBE8IgEDRqB3ik8qM0IFAkiUpwIHeO7MQ0ERtwpJMg+AQx3c2gBZJTLUOMT0NoEMGiwrSXLxHAgUEBHtMlynZp+GBvSgVwXfVnSw0ImqMfCBCbdn/Ocj3aLAtNSlxoZcpVDdx9KC3LyHLqZBMIz+kXczdVtR7r9pCwxLUKbljy4hKn88glahrbt8gAxpT4ku3Ddfe9cikl1gVl+eeseK0s8iPe9bIouGyOhAHkhvSqLu+qZvUXYqZ+Z8fC2errUDF/KzOmqPFfHAhVzS/H4UpfYC4vrkHOVO90ZafXSBteXqyWRbNRDE6Nw2REQOORGLQFbmihAuMJRlttxT5eKKF8d7JTMgumwMN3ZU1/KeVCeXLrp3EVPi5Y95tkZi01OaFinVL1WySTRBqv8MLMFM4AEuxQa6dClAoTNEdwVVviuwB/UN2i5rUUgAyUoZDVgYugFfJfy1iPiGozUr97xJ0wtyUwL2PiYrFjomJIH/0L3Hw+CXOMMAXf13UtnMwAO03mtfznc9JYXbhWPOTdo5Wjs4TmZS7V7Mf2fb7qZFccE/2uS2xwNLyH3kEkfH7XEarvLxmhhw0YwuCt0oLDFBNq42aLzkAfE7FlFcMlVzDPAPgkKgAe/w7UotEqv0s+pkB2YCGEhSJCjPxBFBrYioQYoyfhlH+QL2fI5b4mWCc0if6YAT2HxL7iOIO7NizbSw+/wDMEwy1o8nI22z7GVKsxCq1JNZZijNHFXGHFqLx7C0iAqjF78z0b6ZHgvh+4epMutgikx0G6Awsuo/x9b9oTPCfmBJ5CrhDWgCoNBhu5D1+/x4OJnSqxyxdcIM/123rI12OZd1qEarHJiLBYJDY/S+FBaMKlyQp1K3PN9RmfqH+r/Z5Sm89p16svM5sSMAs+/URvJOVGKKOwmqp3z4lWsnK2m4lo+coImCZA7TUR9Wx1+bXyI4B5ZMCsVJSiiEoIhGjZWoB6o/8AgukCU4eeC4cRcqnZgkeVUZDg6fN4NGaZ2SmrUqfiNW5McNXn1BK1aYT8355HPaAOsQdvVJzIyVAPLCTHWhkewltgWT8hVK6SFDjkDmbRkHiLskuaN6OwRRi/Gi2Z+xeW84lnozlA/BLc7CCaNAqpCxzvnQg/nzEVcTlXb8Qjw8gQ6DVzpgJEDzOXww+aM6GGCQHUw8KIAAYIKVePI5cIcNY37Mz1x8QuIx+ion+KpRYL6yQDqW7OzdzPwLIoKVRsoYClJlleyTyh8e2hkkUFYrjTFigla5TSrPNSVmlBwlUFBciFoWGnf0QVtFRdMwTN9mgsoAlU5S2Mjy+C5ecVlTmcn9AKkiv9E5IRcDykn9Z1e8Eezgf4ekHUFT0eUqSfqbAX1rf+fSmLUAy8nRjwfOn+8a3z2NNYvJZ8rLaKNLCOPaRyfCE75ubmKI8MrVjrW7nSixe2MCHlw8vGGcTukwBYxRg2Q6iIDmL0ySfI7vsIJiwptU9YP85BqRIvfHBOdytQ0CfLHjKwDUBRQBRtk5sZqlpMOCojT+Vkx45+KitArowRNiLSIpXzKzxjZkEcgE4BoCtQZgnoNzFzn0KFWTFlNZZdmV67zUvoMaUbz9+KVhlfDHPWhAQpc77Iz7s/Fs2VOqY6jXOX5hTysgzemG/ywc9HbYTF3JqrXv/aHmK4rzvvWTjfCYqP3vxhpaBr/4n/8t/qPYqsLG//Zbe12t4U12NQb81OoSddB9e/2fjRNJX/R2wh3dcidW6eStDpWHZxeIaIGOe53WKxBGlGJV8dTzfHZ+9Na6dS7u8cRuPdtS/6aIGDk/tbeaWhkkt1v0BquRxZuf07o2FT/UrIASsj6/Sr1i5Vj6xZ1e8bX506ENZjUqcUPax3qlSuWv0WYYfLzwRpbvJqR4QeaxWq3XG98Qj/P4M1+8HCMe4oJ6KFjDGXA2n4BZNLsx4C9F+7PILPelguYP/+kMJAdjmhUNKjcNsE1Fn/LdUMjon1G5rc6mIK/9bflceW870U6djnlWXmr47ITX7Lf/Qfttced+xywTxNcPZt2pJKHsxqJm5KENHqV+mfxRIvoPxRFDEGD6obHadrek3UyhTlU3RVGoPYiRlTLYkAV2U01jyC/I5D9uRqesKiWpZ1DsvPtc9XLEQuKjy0kNsiPDrKQ2+YqT8TT5zPpOc7OPdnsUOxsOI5Du1JdnZS+wnAdRSpORfZwK7XaVAaBdDTdmyCpvbnuzAC1pGRg+mgZ3yAGV2qWKdueJF0Y6v3KPk7TyWuw5fbC2C0nCPIVLpzFtCkqpftNhaxZ74599nL5CpGrJuotHyYTOw65PnQ/nZ306FHHvcHV1Hcld/QNwpEgNvPzgcoCQ9Q+115knHIZksbhmYwRmXNKVpU2i7enpZFAHsdot+4yInREM5nf4r6Y5RTHNHd68u7EyXaVPXodlQQPgAaVnA/UqeVz032SXbr85uGQboU9d5qkShz8hdZF2hVCf3Jt5NhTsLBADzcyNoWLrt1xjuhTRsBlHvZXdC7q6WH69Bc+vVf49GUy1HsV4XHivQv3nLnT2Z5V7TiT0q+Hd0IaJ2WTR4G4ZvJjjKZ8rOaThZ+FqHi4e3BX2IAMHR+mz3Y0yLsz274p6IVqfb6gzL66Ypyc0H3OiM6JMRORtWhiHqlzUgLY6Uzp0yxnT8SMGNgpZ+dMAcF1eGt3r8ZcMpX/rh1ffZr6M8btAR5d4GdL7+JRqTPOOzJhCvdLYhS92OtoZQoxSigd2BxtY/bEaOvzqBiteZS2120tQ5AATcY3ky5NElJAAHnkT1QXzDuskCspdLC6a+UK8FU/OWB4nA+tGrca1XOecT/jfVHAzUAi0k0EbNIPYJODSZOPpNT2DfoCKIEyJF9ndK98dqNfa60G4s99K7LVTy7bzQXdLkuq9qa0eFFE/ShEbjEntMRpWF0SuyKN0cbbDHEre9t4qTfF3afMXs5HtYHTvxlTyultREIS2ORoLpZ6wT67VrNdiVU3ZxdFQpoxnaUPB9efnrM2C4P1hKtvCROCcFwBtjbnfRzxchc5rLPC07JD/JJzgiJTdhCwn0DvmQiNPmhgnPrxP4huCNLD3c3dyQN2JIBZDU3PCfZPyg3FpGejSY882VxuW8bL28nFy9XlIiXiyZ2mvsc1RUfUodbbAxkYyvBKCfEPT4JiaTrjCmeU7QddO8rSh0GidcODuCxUFL0zsCIjyt0SJlZMCFY39IyvIl0tCHf1VbVFuXh5hYdVS/X56nxL1o2xdx2mDmba1xR1udoerGs1O1CUHHGxWHs6qX4x6X6SHicniT6TcaHAoaRJqxfnatdZVENkyewLA/tWBy+qS8X6bM95yaSQN25VPM6y0OMqAv1eZCSOpr6p3hx3ICI1QQB9e+m9vm9/Ej2WzUq7gyt5+YULs5+sPpHJUYlT0XvHI5vffUX2TjdQeb0leFDRdsGsv7nfTsELOZ/1JL04MIJHzIESTF1sLpCU0IahFEISYs/KmCQ40hWUWR3cBfxxocIx3QpnLLl3iV99pO4A0AL6qMRY/JIhUdW/urwmoBWDS3X0zc/zu7pXs9NHfLT5dRfMPo+KjvQaia0LJo2ESORRzVicIrusVrowtBFaa0nsWEXBaF1cGmrCZxUbeYP37v78luLfr6BZt/aeOGP2NfHddpQCXQGkgjp0HfQB56gQBkA4c1ef7RnP4UV7mTPbspi7K5ddnZQQEYcxSX+4Y6BB7rfPKNspx5wmdlOWNlZPw04+YvK9CDYxYUquiwB0+Q4jw92nJ39pd3PaujIy2ruykzvaUzI6W7zYBe9OdBtG2NXH5W1+rFC79J3+nTpCaZnCJASOm5YShVUKK4MwJdiCF/1ztGcDZaigskTXrqJqP/xg1uLJ5ovDH5vLG5FtGeTMutQw/7oekl5ikS02TT+RfISMUElONLJP9Q7DpnqgWHtouywM+/cZmR9de98so3GT8YJO0xeUImLhH9PSWnpXS056W3tmjJ2XI6Iwu7PDK2wXPnZYPk7e5JGOYjzlRjzz7jN4EFyuq9fShJ9w1HCxfPIpcLEdjAT1c4fASFCcXTb1qBpnaZxHfKquO8DzrUBGcFQicDOZ3LdJrZkuzHZ3qpGzXkEYaFxAIeYU3c65BGEcaYcsUMaCn/w/M9l6JqhH165LEnd82vqtYebXXtWVYhhpHplVR1m4upW+TEabG+t2/8hyQr8agL5jP6i+3FlExLLkQrR/FmTskh2qrAndecKJcCEhKHzfLz0RnV6iIlXkNDEAQOEL5GZlclp8C23MKlAU347tiU/FEbctJxQyKQRsoLX5uzLJTpl8Bl0rZElEKgvmgGR9HPWg+vJ4wcKIn70lvpjz4HUhL9Ei0K1ijSdjh1px60dE6DcACi/lmpsMDU7gKBWiXe7vOSMOLr/+ffP6P7Vhw+3DJQR6x7KCrH3RoIMPAIVPgJ9wZWCZr3lXzW3E/3BkIXGzPcB13yRcgZGdJhmSMTn06eS3mzMC5iQA7ubQnaZ/MQekrgNQOE1mQ4ZWXFz3DXczMfAj/QroAl6hfwGdH0VY0L0sXoYnmttYh3NZIYdpN4fHF9oHRi6bzTTeiZSY5L9UfNcEl5aXt+bXk3jCIKjacmTQbAOaAB2UH7Uw0bU0gSqZxnSvzsI3NkD2z7Y7klZfvlg2FMiz5V9bZ889o8aYvH0dmkiTeVUOyc2pZP1wVM2RkW0e715m/RiAwneIRRr/cdEjQ2mxcZibjNK3WQnZuOC9L+yWuauSH92vNxGiqP1YRmTFU9l3xLpgl4IqYgTay+cv7drD/F9Jjv/YA19TxsWR+Q9Jx4lpJhiHjMBDAAqvuvRwa4JSOp0phnQ61IAPyO6DP2/cPhn3v2LBIX4Z6p8cHRSUF+PunEPstR93orQmt7+4Nt10OJ99dtUt3BuNTEA7hlMsmy8MulVezO14v00d/0xPZdclgGUglkAjGI8MpNNiqtLI+Vl2rkx8DsEhtBCSQoUjPvfbTmpas0a5AUsdfJ1/D8vfi6ULJ8KFElmP+7LWAKdTi9KSxw3lr9L1VrMgoatFsg4Fpp/2U3ZTdu+Y/PCYcSEntCQUvDi90Y3VYFwK9T7HL65f8qzf4Xf/H7Mc72csRNIiNR8VwTDvvoPX6qRIjw1AdQMA2nB1EqILmdLigvbvyoXNbgM7UxBdyORVANqgxfqMfzDPbyovHR2ED8QD8uUeAPCcBwDsza9XejJhcAnWJ9zwemp927NxAZSPp3ECdW1oYIVADU5N6OtY6pqrskMFOCT3tOAt3oUkBcYvANBCqkp09vLyM5F3D77wrvQTUyJe95TP5KSUzrW3URaIuTVU/48vDz8I0hqWKgVz15QI6T99+9Mm8dYY77g1aMH2WMtCeIypuf1+YM3jN08FaEvRafJUAFpIjUpN6157zzP/ubtyOS2lcqWjtXYyj1BMRU2/vIatjG98fvvu94+8Cp2Q5K76rGgVqytsMZeI/U9+sNIxR6FZaZERhSkR3J5q7eKeo1OLvTmdoUuX0VLtUmpUNYcBke3945nZIAKGujTxcOA57hFkkRndPTPx1XcYH+VTeWn/79xDh9/4vPGmqoLuFHxmZ+J7AFpI5SaE9BQhED4KGfFoKnFlKtLaPFTc2wduw9cjOPtrkybonv2N/5u5zFRnuOxnM6vP76ld4wnwBBgKeaWPX+/Z99PvloIAtJAqkYSCbPf8kf/ft3lDs7D6mCq3dqe5ffti17JUySbVAeWHP2cuqebilBWWXIw/pB7GBWaslFNfRAWmL9ZELmxS47Kyl/rWVrpTqAU+2KCg/O6+Ql67stdHDHx33qSU6Jtbrwc/4jizvc8kNPd0sIVekN+63DNWu5pP6VixnrcAoFzUwJyYOtov4bsvP4uuezaf7+oGPOU7y6lZ2eWTbUEcORVUVM1hIuKFpTEhtLuVRMBQASgXtR9PHFn7xD/3OpCVXDoz2lw+mZFdPuWvskmNi85uze3uzmUXuwyw2dj7GEdfCNGzq+Vw2jxZYrMNMY6JyHE+f97GIIz/l/osiSza0TGWEssmeJk9vo+eGl4oxqZjp5jn2FD8on5n7hqFxI0xbL/2YlpbNKY95q/nBT9r7RzV5Ys+hqWt3VOjbxHzJhXUivGVQl9fF5c6CHWTGp+Xs9M4M23HUrN5kx9uL6Bjf0mYtCkozbq7uez4KC6EHpfs8mWeBbP5PqUuqe71lQrMW8yT/wcBDwLuOj/Bv337J/FHojwL4+ZLBQ1DjSW5Pd/wy6Bj1wXDNsl5O/jjxTPxv9o3pqTTnNoVx3Cgwqjzha5GrxG0cqDSyfkp71WCa9GIdqGTlJOMYUr2EA5FR09+nhmDV8ajPpX6urShWDOUaEoiYzyTqDVc4HC2YaqTtJOUTuFIEd6V7j11/iRQCa3sPdLY5XxhVAHUavdxLvsUj+ocg8+gWI87ce8GbGtsSef1kY5Z4baxH/pMG+0KzushnTM1rBhIiXQGnUTe5z3PuJ9Z7o2szrE3S35sfgOFy71dE7d3gtUHqrIh15iSOroKhBaaF9okqGxz14vtGj1kS5stPaeny2J2d6Z+mzK7eX2PcfOc0df3dA6VyLBUPJhiid0Vnm7IjmqoMy62tTIuaqghk2vrioxtbIqMa+vI5IYa40JrW+PihjoyubapyMjGhmJc3ZzzJpBEQqFIpEDU9kDwrHqKd7lCT0Nf1Yjs+U75UgYoMv9eIGtGI61xuZK/EGfb7xNxnlae6MbXs7TlnYHGzcrrmBSH89Y4i1z2Bo4qxbdu9vgwD08/N3Ldh9GtRQnPG4KDX/E5rnamT6PbOL7xeipSrFZHDTA6aazxLDZMR14GpgfkRrY+9s+O9UK1EXIrcm38+dcDqiWwFZB/EZXiEhFV/4CoyjCJY3XE/q4K4virCmL3rprvzp/lrkel2EysXz63S4CtZzsp17vFzp/Tu4SN0aUkLpjSe7dbTrrNs01lILg6ISNO1hWD8ilj7T/JjI5KKyg0trYKQSdji/3lpeQtkYHWXDm6n9Ob7+VkFRf/OP7xjdnYMrND4Pfj74WBNLO5R7/mzJUT22YCil3kL1lCHBnVGVHuyFgXnqPArnWrEOsFXBOe2BI1KKjbuui4KCMoyJo2NpaWPjqa/sLigkdr0kx9fEzRT7Y9eJRwZMBPBX0xdIwv6BtCDwk2CS+O6WjyCTGwslBQd7M0TMpynDVpuhtpXknpy8X5BWA7AsCw8G6SXgRWx74i2TIdm+jhaBLp6J6JvX81MceGfI/2H34v82pTd7IjLNRrwuDkgwFs3gSAsvTPA931sj5j78pGbxvBRf8v0iDugJYAdKIboMUD2B3Atvrmls9Lk1zcGBJ3VtiLb+zVWKtr06CwwLFxWfdIflHPcAVlYJKU3zMOFLd5tF0VRnnHOjh44wK2Wx0ROGTH8x/ffhwXF+dk5WQCxd+/fceA7KxsM2Mom9cFA9N6hJQeNDBOkvxvfrJUgLdTWHRlpGkET8ZPNU0VNHqIbDyJHn0hHo5miQo6gareGI9G7wtxuLy8aD8zbFxAali4JOmiZgXUvuLE3TB0st3Ez9H2ApZ21SWHibxEuw6/lznRVB6yKRAhJcere+K/OaH21SfmC1pPl+rJkPqaDoGIQaUg56DQumuJ76Fy0rN+8v9MquTZ3QJ5Pbc2zU5GjE8YXkzbi4IY8vTHty5X8+FnRE79kFSU7Yyl1vdEV/mv7hG4MLLAMNqogY3ai8A8ncSTmlmF9Ufb2enBTFmiZvgI2XWYYB8zVlnYOeYoyU2CC/M7T3QdDorJwa+6cg06cXFY1zDSGAl7Frnr2PkWZTWEBSldmzM93FOzSm5Scm1wE2W9dmZ2o6G0jYLgYUwW81Fiko20x7mGbNbWbG0xeDp7htUJSUnV/SjiDYPngjDxCCj4S2r4FVgh7PzX0hnz75YCUf3mwrr/q0K+Uwsp640962y4h9OekN1AOn7bEgK96awg6+9oUF3IWfU8Tk1Sz+MWO3z6CoM+r4QDtdd8f+kq/9M9mlwYXnBualaeHlUS48TAjzFLaBAjKnlzred3apKQRZ39uMicJHZZ3/pAZ3Cjnndjs9wx39IpftqLjbql3LPrgrR9PWf7dJZzldfJ9vUj3Vi8EbGz9a6Cvja19b58aZltrZAnNbM6wg9tZ6cvZcoSReUjZNVigrzNRAWlTKHRlJaXT06Fb2x6hSf7LDD6mp2VmK5u2t6I+mIqPgEU6hvIQ0nJDbtgdbT94LKh+dajHn59MMg6Me7aWtmRaxRJw964RZh6wnhSs6oiIeZ63pFTFxKiMUIdqRWTb6eUda+ChcYy6XPC7LS+7hVOPvIgFxcVt78sFB/h8QoLS+Td5GQjW+1I3rDfB18+f/mSmwvqg/1zbt73Fw6grcbrsqEYDF+v3v0i9oZRYTExaVbelU0K16TRelRPa6LIDatZcXsK+sAYuUhhiWK/e9h8Yk556ljWaSv0rMHqJutQHgEMYYV29Z1eUNxVBZX4LeMo1j3MrwmDBUsMSYRRJSaqcy8xwdXdyHXQBVyoYzagaeONwOvQjMCNQ95rlmyOaJZqRrF+27r7n8JC2c/Qr6fVL8mgBtdWoTQW/gMz6iV2DYZ8DjjOfZz88Gh58efNtlBEUeT5t17MQzeftNh1aeH8sFlpRHK02aSJT2gcKiw9Pq40vaxrHLdOsDPr/omqrmwkrfVCyyWuLsTSZ4o3I5WgE4S0AbWuTHBd8urQSQyeL8Y3P78gR25aY+QWC0bzQ6MYGD05TcfEytlq9uVW5NgFrAmMpj8K/zmOzEmsT/hgtRmjRC/vd2vGT/BmJ5hYaGijHIvpbcP9G535JfGu/jKG2WMm1CyUF8kIXQv2zFXboD1cM+v72GvP7dsJE+DSOw1bu00X8F7BaJz3YocAtbpg40xQfZAfG3GMg61UE22ELk6zsi46E5eySSAHqDsZhtQNs+SQS1IbtYhGxIaTOd16b3VDNwsrhECwnXnonWs4SlhoCbg+S2DCFrbHj6JLK0qtV3iJw+ray878vLbNzQ0/V2AtFH+1JuZWhbpZOOxODDroR7PFb9JmEWhKsFvFya3IdbI3Nmr33oNrV27C+2Slg40ykc1Mkfr6Y7bYZVkdrN8g5JfHOH0e3EuvLEOgi66hSjF63oTsrqVYt5KOgC0z8wBkIjD8JOVyTPza6QxYPmy1HX158vfZPhPD5dvV7bNZWZ2zVUVd1NSs7snY67pes9YmxWfjTas+O5tXoSUdXYu++msBlzWiuLRheBUwOzH1eHijI0IsWePe+L2GkhIM6MijjEMLlOoYwnff93ljJvyOEo5UCl59P7G4CWxPXz3VbPxw9JdzJ9JdLGCoo+B7Rz7P0T/eWx4BZ8MX2kohQ83z/1ttg/TNoxQLGyZn3wWpZtTMtbSc94lYWUrMta8XDFWqkwTpoLuqdt8J8uxi3iQkRjjbN/rMX5XVqAQhRApZS/B5C4D5GlXsOr4pATzCOK3SpdxC14YC5aXcGnjFFigfex+832cKHi4rVV1KpMm8qRFpGr0hZmPPROoQ6JFjr9RAG6OLUq2tC8/Ep2ziRxcmWKFBm2hIbNywXgPCt4HS4ItoCENd1SC0gcrZKGT0ltD60f2q99LcoVGuc10plXsDlwb5PRFpBi0lzlALTORbXp09GK4HcdCan2sX66DUqiztJLH9LU+U0isHxVillxB17tGHV1XCFlas1HIuVx1dUIB+mUA9QuWmylZbx6BVXFtY6CrjuKUh0x3kD+TJqvKq6EqhuQBOf855ofJD74MQ74NDAnD9OyNq6DJt7xiL/Kmlev9nAbV/XZ5Jw5ZcEhcYZ6k5vBOu8SlZJIiJ+5tAzpJlRVcBJhmXgu8XylMluq8gXJLLNwkgqRKqT89JSRYqEXnWw5sH6lzNIS7gmLoR2liBgqcj1rVOhpN23CbXk/l8rrfs8XI0PhvMSfTNwTidnQ2KUGkITAeHMB2UeRiQ0ofQv/E/qXVvrAiRS8ly0vYQ3jhsoLnFsoiSHLIU58Vq2OO+EeTY3Vaeo7hJ5ABhTf4uooyXrE/b73599q+M29Xp2nf/Bz2ZROixcO3WwY2GlImULS93qwxqvlpvQF6tV5u5t5lmEGG91rDzZrfa7enUsOauRo0HmhnG5dbkUdrZH43/3NVFD8eR/pi/rE8Z2XVIOFe7ybtq/TvRht6IFV4OGjjOZrO9keA9n9UosKGXjmQkinh21Ss89T9Fk7N8yyqvipgLQAnrgqySLcWnUkosHluKrraH+RJiwacVPOkf5FHy4dc+BpcyGYlLvoOFM7Nl0bH+7ulJcmvyiq9J3wdNaxhhQfXsi6a0+8wxfiKvddCUCLT0+6xtR7QkMlQCor52xplueurzQR+lFf3KqkBy9wSRuH3I7WW+zniSD0xkBLfqm4nLyXlhZdeZ9gNGLwwSo4REq4dp+IulC0FB7zOpumV9UqvEoyfUTgAg3X//ubSS4QAvpqrHPFXyrKNY4bM+sB/7ld7k/b1fsD2cXVxurQa12mR0O6nrGt73HlA1EQ7HH2qr3tMi0m59eUsJO2N0455Ys7gPZpzhtEQJCwiqQ+mMY42soSRcYU5AgJ2SXuBma7FOuZiBiiXugfLo0JQDjUZ7MDWMEyovDSFB/tUAIEsGVL0y0br32Dwq9puwwNXwUhjjXJi53LgWzOWBLJTl+rTH+m5pJLC9sRg4x45JD464jYJ7UkZD9XSFDGrysuyLIuTomjgnJlSIle8lVCCYWI/eYwKKfxCbgp4zymFQfW5TAZGIywO4CL7sBy+pX6EilFae146ZE2pSQ4n8Cgh1B3CJYaxufDh4k5V+jA9c2uEaPi6FDmy8QnuEJ88B6GshTv8gQ658bXg2qFMN932xGb5UodnXriVFb0sGS4WgInZo9Es5SaabekVCrQdyxQBhnuOukFKQNoRjcDABCAZtrULy4Tp99AlbwICCoxAHATgwCwym8KBkTQh99DjgJDoEdO2+dZojcMDQFpg1GzbgMnA/568/3zT+XSSf1c/KSJteR3Uk7X8MKZ3zOeHO7ri5xY9bJ7ikrYSTgs1akOty6YQ7xbHKWZ4DcHsBtFqXC6gXrOC+td5LjxaSron7NswoY0US8SNvY1EMQOv4bqc9ZG4e2uyZp/ckw7zSuc14gMIPYzr9x2gHSI0u/AbJbtWtdbmvp/Ar/Kmf7OvcrxZm6ExPGmBY+bGfXoop1zy5itVCwujr2CC/IusWzbSxBrpzFU8mX7WRO5UCu8EYRkkcrMWJXcooWYN4aRHlt6T5tmbjpvW0A9fAGzsOxJ3aRgYASprEpHwRD3L1MNUcvCu/t06l/Xg/ks5Dl8vv49Ljw6zHJIAHOEJyr9McGOhYJg7X1DjauxN+sV+KWfYruZrY70BTiy658cW+8GkKNimen03wrOj5vhjnrVKoYBzVxll+z6qz7CDe05DkzeEdq6+vud4lrLjmgaUV/sBL1nO/ijGsrx8Ad2Ank2GpGV8TjjcTn+HAD8b0ARpJq6Zd81KrwngzAF1eQndUCCxb0EAHa8+IQAKW1KH06Gb4e7Uo2hK/bHaPyF2++4eeaMWBI/Za4ObPbUuixEUOXfXl5u1Q4domPYGxcM5W/Q+aJO6cb7ypVLWxy5oeGwJQrJ4yxxZx3t4f5myR9aoiF9g8s4qh4ajtJPoJ6Y3Hw4OyNXGiY5+qznQf6yUJveE29pTTPJhw7mHQ2CntvNOw0WcOgIBWCHmk3JdmDmNaYLkeqZPGeNLD+dP5B5A3wbRT+z+YaHqAkCT5EHZ6U0GjYl1rOkGguhDwKSFYOzVqAd9atezifcRlCg4LuirtjP+lSD3aFSWdONGh2DazdtgNQygeSw3MfQXmHI0c29w9mecmUDtn7ovqkHUo49n3R1fVKyTtFOsgp0IFsg8llCbyO4Lld8NSwEykUN1DBpbJBpRCrgYB++VmG6YJtNACQj6cBwpSG2LUeGBGNnzPYkMMerLEVBoV22TAAv6tE1S9UqtpGGtQRCx1fffQtDMXVh2NX2spzdd0AnEqJ4il6oPsWLM13UeIltCByHvmMGApw1I8i2L83F/7dqk4b4q8tPAu3zw95+dnmtbLYqqJtR8CxJwqTTicLrIz1onoOF+EKgusvZ3lZMRD1I5t2LaI3EgQyLN0dxH2vR50rVOWEsmcAUwqokKVNE72usCq6mYMhukqt9N4hKIiPSnsRlZoiBCrxXpR8MiHneN+lOhrR788MivrF2pJ0/ULXgsuo2YRqAhk63cTM8qc5D7NM6tiCtXsZ6P3bqFBhRSmp6wxxndQ5EyE1EicVNXr3hhHek3Ppp232gZOj/c1Vz3WpairSHTBBXZfi3mOxoPNvlgMYCGAjTaSA5aM0tF5bT0nPWS6TLrVtDwf0mEGVkry1u31lezclNZulMx1SxJYvGF3GrnhfCHSG0uAJM8RaD/vhUlpKGJD40oJz2tkjhmfaRZYR9x+S+nvr/Yt0uAQz/35/99n3kCSAPyL1aWZRJzzSbTV7YjGV1cpZC6MRgo3gPc6dSERXeFzmj7djHMAxomGSOWU1xqPEIYr0BN6Y/eTHNssvHI/OdZ2RUJm7HMsNQgBkZwU402aJByKV9NT0FIxUgDDlTaHFC5NiTEDxopX9Oj4dZRAEAbCGsHOAVSDBJP/0vz0uOgkXesCoZlRiRTx/RZG8iBMUXdgdKOQ97vrOwGZ7Ame60hlCIcycQ549qxzdi4tzIIGE4EBVNzOMXlhvOhXO3klDTzYNZ43/j8iBiCGh6IINEoT8cKMyMpnCRyrIAL5XJUk1eBogziZWI2UbZuvWaXXbmQ57WeImT+DrMILOnPxO4aq3XO2Meqzsg1qyDndTxEHCZ1ww6kUVgtsh12X0NAUTXWpy8EgtZrrekFZAc5HY/WtVmAWFMuuCdAvPtEGtCaJ29JbgLtSUZFf/WpdQ11SKVCtgpV72zajG0VLixuAc4APMpkcg4KqoIdrAmTIgPzF6NDD0oKiPWJfe4brRta7JqCjG2ypH7MPfZorBDg/jhbSp/7BWWKuG8z0hUENnTHYH86YK6nTE0PACUabLPtAi2lakZKshmiGdOH8lzRsorXBHi4DOegNn7wey99lWsnQujdWts0zFKFfUrVpHtPra6e5+qT4mspzq+zgaqQ3VfXEgHwKz03hlUCZjhIQ7UnOkJTwcdI0IC1lxFnAe9uv7PSlduCgiSF0okSRro/Mfa6xnLKkdRm++Wyy20qjDoRbY4Cd1aZRycFKfhOXWP8UHsnLTAlnjlscok8UETt9udNZdUiZw4pg4urcLPFjK8gcU4kQqXm6KYhPU75pmu/GvMFVpNYzDdNOPjsMIcSWJr+Ny1ImzcKTG56cUJ0GRtJ99sLM4XGCv0Y2eEHhioFGcJkb2PQ3xYlE9cSgc3i0CIHlltiZmDxYA69h9TeE/h5ns4eC7ZVwFiieglkjP7RtEA5uUaMb7NIGAXwu9KMTv7T7i5JtX1Uma+WJVlbpx8qGVbEWGtNYiW2c1KCthJJFcyhWeGz18pZrbqg1V/gMMlL+x7IMJVHusphT0FFpYrkkYPGYjm4wvX8TbZtxzkhnxneMGwVuakEDacZYiy/42zcPb6Jr7uun7Yr4s2ovIOf+o1i/jpKN5/0a/vfSA/aM77W5fxNlcm3a+euX/5VSxNBCkwKSEaW/Vily5r4TgwC+YrxXwM2iZUQFa8URoU3SnmZWXGTVGbJKNluWdhUO+nFYl8+yewgBzs6y9OGK5AnIwTzy9KVOzFFmHl1TorC3opCbh60KSxTe3MoCoNT+d6FShnBgt32PWoSCpxtmoO6NyjVmbi0Zc0ij7rHDID3il7J9ldpBwRoW0pnmVV3O2iTvWbFGkelZJlmI9dl6ePOgCQNhwe+JZ0RIj0TKK9f68nbOW8w2yfdecldKNCdUX/kgxg9Fn3Bnstv8ahytLQyLL+e812SPcAfEspSe3S+n+RylEqMTkrODwt45uZje9Xn+mulL4aXNXCXluEwCXTaqees662ve5+uy70ZyWZOOSA8P+S6UUvwZe/vcuEFq1z3Y1NMVG9+65HWDO5T1kSU3I8noCcXzqQhAjZy3amhtO/hEbqAz/tqqPDsMzb2txG3tBl3kK680GqRm4vDbdOejrTVW4w9EiI6CoVwQFPXKLMXvhsQurCl2DjcZCqi3cB70N2JlrDUIh9atQh7jOHSwMANN8DnOJoLH9hfGrszy+/nw/MDtiQXWYaa4FN/HJlmfq9RDUWnDVvTnykP//SnpWlWmLw0uDs9uy/uffHY2qCmeORnGT9sO9u+XRGGgVVBMgJaLjYGZzPgjcC4dhgQEazUe2FAK23L/eTv68oWaDfzOeHeOhw71O1SEqEjVAgL22xo5jtOmYx2GWiBCes/70+FFPkzN4eO4r/jn+KUQpGG6W3ZOw+6qHI5IzJS2TpSgSKWVOJmIZZbVzp3ZFjMLRikbROe5pI2t9iIvDxjGYV1nYi8z3RKzBgRs17m7OYwAOIkBUAFgJ9MQobYGYQ6CGrKuRpsK7a53oyV0XadLPoghnR0yda+fzPJoTwNpWrPWmcDr04FAkI5SMa69gZLe3f6rhPCau6GTyBvoC6Y2XdU/tYsJoN3DtM0oQKKKhBArPkOFPAct3cTUCKBOoZkG6sl1geUYg18BjgbLpIgCEjpED643sjlAI19rtLl03MpPSHc2z3RIT+2Bnp04GvTVAZtdkdBKMSKX2//VwnKHtAJBCbAiUECalYZGvQHOUuI8C/M1L2s7n68iE30CHEoppQyNYsVIdxlTIWdZDh6Cog1IYr+BzaBSAUPdIraoRRbG7EFgWu1gjGgGiPxIsWKPkOJlT3FXG4TxAOYAdJdZFILNA1Rczi1M8fa2QGrsnJr/yt5WxUH5C3RODETCAYFA53KjxiuRyVLUgMA4LwsXiMMtaAI37Muz9KSUArgf9lpvUNINBnrLWhZmNl/ZYAvyPWgtBKaDx8tQ5L0fKEAUwk+Drc5olRA8z3osMrbd/Kqt2giZ2pzMETHtPgt7O0PmEEaer0cXLz+U0aLE1c7k+CMeqSCc/DybCBSOCAqIrd7BfTs2SZOilD+KOFx6LkwaWtmmu4HxFIS8HuDmoQybRdyEu+iSzvKb5tHCdry5j49zYZfXX/niVrnPfJibUQuXl5jd9OgER+ZXV+ndOuJxH49VgJaGSZEeDW6HkPred02gKm0mxjSdc5x8Y/Ah/DbBcyTsqGGWeRyJPSowFVtpATzwD+CwMrKSxiv+YCBOmuDP07KgVq6TMhCMQVCvKdRyEwDr5S0+yVmukXZ+AX/HAgBiGM6jOBcpOfogZSr45t2Xl/gwk5BKhF6GeaXZPg5kKtLJk9Pdq8Uu4OEm+iO1a7g4EVOmkuRgo4ZU+j4lKSZUqeihKV+3LaovUBuFyhxRw6UPUkY5SuXPdk/BeLgoota+9wT9GdATPfR94y67l/gx8wOQKDBDz7AVzAqf6hWqxUvA8DV8+xWFpjwhrqh2N3BQLFRY1MsCT40HPeaOtHC3D1JG9yiV31heSbjefU1oxXu6GXuRJqK62PiHbiKEIzXoOPI9dHR++hmGUrt8t58//UcIlWM851fPv7ddzOYq1blEbUcfpEyFpTfzmT+exdo5fp97ukpL8XN+/vxfo1TTU622MXf0J7g/1MR6VWtWGz3+k0+Vj4uXOGhK9cGtnIXFWymKKXiOs+0ahRp3eRlXA46HUsyVOoEA2UrbtMtwRhJ3bn1LH3oWlW8vqMwblFFoklWBaIGnLN4M28qi+Y7QPy4NEPnkmOfjfgN5PuGRO32QMpytrhhwv819TOt+ZZbwJIvm+fRtYe9U9G0sPc6D8mibQCp4LeI6CsUkJEZ1UZC9121/nTGML7/8HzXLkdCe+7f629dRPcueHZYFbF8HTdu0jYeudPQpdMQT7XVAWo9Ds+byB0lQJIJUwX3Gh1jrm5NG0F5Pxjks8lq/wd1YE47yEyIVricfa0YpsUI//3/S2Gkb6TQgd5r8sXZBFezmEsGUXSs85tM3uuvkCH8ko5zlGK7PyYhfaJb1LEvqtLllLBrH/nXaRiNqnH2ikAyyIvIU0bbslayD7IJcTY6BxcCisZ46Z/f5S5E6id5nhOy47ckVNWbIU2a+9/xT9YUK3exLxTwYjIdyYODOzOY7mwJZ9E8BaOpIu44UB8oAjy30jliPGRsGhu7WqLWgbrj2vl9D0itQDK5x7ep0KwL9IOucpJy94yzEautGEfXbPTOCcsn94Tfv2EQMb3M2QF8oRlJp3TMlUCVANGR0qYo6P86DGmJDRo+viUSjbuJUoWpuuYVx5Go9kitAXWOcV9OGUL0eiYHVNZ06rF9XNS12IlbNGueT6tfZLxsrrrlszGluneuIO9H3U8h6PJCeRtOfqnVSP3im7Rk10ZgqVJhEX8p2UrxEMaTnCfDdo/1jjM3hxR2tXvM6K0xMaaSi2476Quwx/Da6KgVqh6dkgY5HA4VYqlDkPVihu974DLBV+pFCi9GJmp31PYe3EnWjtzXAOFfq0NFJ5yGQ2fjq72jjRXMJvEB3r6UvbdhZAGoDkKd++bcCvZpiZ9Q+19gpfOoXP/poXPs47/JD0T6rG3ms6uNn+/OUtW3suJqyLquV5MsHpTV9DY1F1RsAu62cAeRuuLkxnN7Fsb7mtAjegjF3V3LRayNP6vK6hqxJhBN4jh1vV8NFc5aVuVRL73g5CI3GJ6TS6w6zrnuKfDyt5W0kafHbeVO88jdl+TSQsAZ/hh5rzNXHMrRNITd5b2ezKWkNcgnmJyyGUFEodalwqZxPmkiMP/cwIRbFKkllENwkQb4sklUUn1ao46Bop+M66PckJHo2FD0UFRoLT0GiNngHlEmsiGjpLHGgiNqN482clZmg1o7K7rRjoN+Q2dG4UBgU2ldjTxblml7olWzd1o+0kd2mWNV3tNgYjsZYgijX89kiXha3vvJGi+Lk9HyegF4cIl+qrS7KN816J1d3tScJpNFx3g1Wv+ST2U3dX2dd1LP+gQ3S9EfVCMYTj77vR9jqMbYQHDt/SJmsv/At4qauJFN5WMFfQ4n0+I6B47zcYaKv3LwVRpWT8ydS60/6eLYzQlrbXUsoWEIbDkiYPbfbQc/6KMp2yzMLmC3fsd/kFbAm+/ZpXMazwOzEQRj4c3i16E7mkRqU582qF2faSa3sWeDN8WAIsDr5pA3T+LpLr/FwlyUPpoOOHCIeGEqDr9mFPg/xtDW+qQAo/7JAwpUh96souuNl8GskCPVKyMx2gMNlFFUyzR/kk1eT8bqvTzELjB2TmNJDepV2zNOKQehtHSqcms/8zFQ3712UEuWUv+eL2BCh4HNEjnN2ixD2KjyYS51PqQ/spPCcL1YLD4OZat5XBHnaR0OCPvbeHDOCfrpKvmkyOZJrMbbeU6QDtMf0UVY01qyyc5O29Z5mV04B5J2eFgDXmJtKE96qbs8wqmsxU32mRXlweNwJk/mj+u6xS5pqTrm5Rbv6eH49r6eO9DKYzG5g2TgQFr8+I1rK8pybaD6/0nbLpSeXGxg/mpLluu396aRHEm08bQ85WbSmZyz/zYpW0lOf3tXorpNwXRXvnI2MJm1SN/WzTpGpUmUqBUZJRRRGJqyTrwlsuvFC8nIQKW2oBAHKck0V4CQS+l5o371xHKxSa0/K9YN22eGRWm2yBzE6Mhrujq1h3Au8EDyiP26jrxPfpv2NyTBI4OTiw9MAewizBNpwVxmZX0JTIsFK+bw/BPbIduj7GiKbpV6DlV2wx4t5nXNmAYzPIcaQydBDaNEeQjJ04MJYabzccrja/F+YhC1rcGW1oxZtXXXHQ1aKJMFLT9t3AzuhzKZCql3X1UdEthUWl3krJmLWuqohclHKPIJ3bEJTh/frqqXFDla7azWGkc2f1a2Txoab6CRitq2J/TGQwv3Sckxt4FPgCZ6IOEQENTMJIDwHBDo4i0qxDu61DtGLQ2Vqji7vafUG355FPd91JSxX0zgz0Y5MFBkPF3FpTFGavTvYwOZpsHYSI00mB3kfHd3aECEusyqzDRlS2ZFmsHNhzVltm2wWdDAdyXMR2wuoDhQeMF2p/igcojyFvE7xQ7c96uepg//7BnY1bm0xkpRJhGPe4LHTxd7+MGMM29k35rDx8xw67u6j+sR5shgza/tHkQ9Gtb6zScKL+V8H0XEAqa5tpXCmpD5Etb0lN28g2MtAXd4UQj9vpibkPZIEu5wc1wa2UKdKsApW9Eun+ERwUttyJHeXlaDnSh1krz6sBSYv7RR5lnRlxCqZijJWphVdeTEYZS75jH4/ckhNq3I9EgeHHoA3ugBvDPZ0MnriJJXChLTL0pHgRCfIOZpkdZk1R+7Z23HL5g9rBjpZODaYzas5cOPY47gPZjf6yWPESDPXobvrmaUOjnDNK15FeL4vGdQlaDvAXR1tEaSbjj+mxsn82QU1YjmYsYtLMNuxliIKEHrsZJTWaFsDK1CiA3J4+VHmLsoYBAj6cjafKalFC090JVLqWMSo4UIpkY72cJqOcH1vYUszUAia5saOo3olI3fFB3IemPBJh+ehpi4K//CAVjaw48SLj+89cXSY1hYXtsuvIUyUkUBYERb5kin8BW3GGgFafZ+obQJMS+ksjDKLL7JNdBZXg4SusQbIH1ZY7kPK0xVUpnUFqfYs6clEH6NDi0Xo8YcoPeFixVvQPY7xGOUeSon9KX7uDSSxJUjBZDLsKaqnzKK7AKBnY6c9iOUMdfyhryrBp1z8NvRs/SkWHucwgOSfaYB+HCY+lCwDfwFFw8kHvHIpoiIMm70QvxXpaCWZSzY546ASgV75/Qu1blOXuxcC/F8ihDkRGSWF5jn3nVWKFfhH4R9yev8TTCfQfoJsD4Ec/yAE+JP/CwHA7++we3JSzUb/MLwHrJH2o3c7D0iOdAPoo55plQTkN/XiCqAcULQbSBF+AO+p4gPj226gx49x6VJZB6D4oN7TBac0k+cBmsO3lwzx2Wg9Q8TomOErLUy7EZ88HWbgqmxGSaXC5EKPAmKgWzfAjm6N0/sBgas/gAU+UQuVFwzq/Q1EHOcGImh3BkpwXV6oNiAqupGBl6dO3czkOl5HjV8zsBWLKgHBYOU7tpBjUr06AoIUJCDytDhd9uxUVgGxADyca7vMwCx328p4pbCAmNFp/ReYOSyqdB76XdQG6yxDxJDvFfb34V+tG8r4Q3tRvSv4MvdfP2KeTj4VUJsQ8aVsxM/K/P9eBkhT0cLP+MKNcqjg3sNLhjjIbo85ApA1+KXB2YzfL9unmIha5m2wziKLaplgcyIHO/z6GBFpGoJ3YTyncC9RrsOOPXLEDHT5jzvvnOeeOAYcN3qc4j1lTeiuAhKhxmqSYMTuq4AaN8lwa98qoDqzVfarb9IzwvbTc5repxe46R+/xMzs20cBb9TJWjCiP8GESFXj6b158KV+kiFm02IkeZ2ynDMsDLw4BGYLR8xtVuIkjX/jeBDsycdi2izgfgQ2x2NFiGQ8oUTCdhhGkiQJJaV3ZcWDpSdhliTSYbC6Qls0BKvjfej1BFlIx1R1ejRxia+UQoTX6IgHJfC2mowJ4yJOkk2b7ko0XxFjT7SYpM2wimiywjpChQkXLJEQgYS9mWvLT9FTgkRYziInDgOOc/zfS2NKfgNQooD4X2M8lFBDAy100MMAI0ww48NPgCAhwkSIEiNOwhlnSZICI00GnCw58hQoUqJMhSo16jRo0tJZyfLr0WfAkJH862HiHFPnmTFnwZIVazZs2bF3gQNHTpy5cOXGnQdPXrz58IWA5MdfgEAoaEGCw4RLZPkuq/dagXIl2gzpDRT7HiCpCTNVONKgyOOw4sSw74790G3MNVeMC4FRKdSmMFddt+2GLTe9EW7XLbdNiPBZlX177oj0zgfFomBFi4ETq1OcBPHwCBIRJUn2Voo0qdJlyjCnS7YsOXK999EC0KRL7rkfNmqpo54GGmmimXzkpwAFKURhTLloxqw106jWFRqJCJYsRxSlEVNG4FLjI7VYEmOxmpqa1oWvhaa6HGKpjRgdFyOiPaxGjBajzegwuoweo88YMIaMUR8LXy1Nkxb7/21iXmgwIfLRR9tWp4dYfsJWczydIGXgeKvdEJOEHEeTVcwqPdKgGekI2j3UKawiz4JKlQEEABZYJShUKkA1rHJKFDgqP6DKV20Olb4qJajwVZ4FcrYFQGnALdXQM4NQ66vhozqs/uySKwwCBiKh0UNfGXUvbJMUNFiM8T+piSSWc+VU7mKejYcJYAmfMhtnnqDV3yIGbX5WHgcStKsAAAA=") format('woff2');
      }
      </style>`;
    });
  }
}

const sourceUpdate = () => {
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printCountries, _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].source.value || 'China');
}

const qrURL = () => {
  const defaults = (0,_brandDefaults_js__WEBPACK_IMPORTED_MODULE_1__.brandDefaults)();
  const itemMasterField = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].itemMaster.value.toUpperCase() || defaults.itemMaster;

  const brandUrls = {
    'brenthaven': 'https://brenthaven.com/',
    'gumdrop': 'https://www.gumdropcases.com/',
    'default': 'https://byvault.com/'
  };

  const brandUrl = brandUrls[defaults.brandField] || brandUrls.default;
  const qrURL = `${brandUrl}${itemMasterField}`;

  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].qrBase.textContent = brandUrl; // Update QR Link Base div
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].qrPath.value = `${itemMasterField}`; // Update Hidden QR Path
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].qrLink.value = qrURL; // Update Hidden QR Link

  qrCodeUpdate();
}

const qrCustomUpdate = () => {
  const defaults = (0,_brandDefaults_js__WEBPACK_IMPORTED_MODULE_1__.brandDefaults)();
  const qrPathValue = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].qrPath.value.toUpperCase() || _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].itemMaster.value.toUpperCase() || defaults.itemMaster;
  
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printInstallPaths, qrPathValue);
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].qrLink.value = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].qrBase.textContent + qrPathValue; // Update Hidden QR Link

  qrCodeUpdate();
}

const qrCodeUpdate = () => {
  const qrLinkValue = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].qrLink.value;
  const qrCodeContainers = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].preview.querySelectorAll('.label__qr');

  qrCodeContainers.forEach(qr => {
    let qrCode = QRCode({
      msg: qrLinkValue,
      dim: iconSize,
      pad: 0,
      ecl: "L",
    });

    qr.classList.add('label__qr--active');
    qr.innerHTML = '';

    qr.appendChild(qrCode);
  });
}

const dataMatrixUpdate = () => {
  const defaults = (0,_brandDefaults_js__WEBPACK_IMPORTED_MODULE_1__.brandDefaults)();
  const itemMasterValue = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].sku.value.toUpperCase() || defaults.sku;
  const dataMatrixContainers = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].preview.querySelectorAll('.label__datamatrix');

  dataMatrixContainers.forEach(dm => {
    let dataMatrix = DATAMatrix({
      msg: itemMasterValue,
      dim: iconSize,
      pad: 0,
      ecl: "L",
    });

    dm.classList.add('label__datamatrix--active');
    dm.innerHTML = '';

    dm.appendChild(dataMatrix);
  });
}

const contentUpdate = () => {
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printPolybagQty, _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].pbContent.value || 'Qty: 1');
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printMasterQty, _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].mcContent.value || 'Qty: 1');
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printInnerQty, _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].icContent.value || 'Qty: 1');
}

const dimUpdate = () => {
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printDimLengths, `${_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].dimLength.value || 18.3}"`);
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printDimWidths, `${_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].dimWidth.value || 11.2}"`);
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printDimHeights, `${_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].dimHeight.value || 13.4}"`);
}

const qtyUpdate = () => {
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printBoxQty, _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].boxQty.value || '20');
}

const weightUpdate = () => {
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printGrossWgt, `${_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].gWeight.value || '21.17'} lbs.`);
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printNetWgt, `${_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].nWeight.value || '20.06'} lbs.`);
}

const poUpdate = () => {
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printPurchaseOrders, _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].purchaseOrder.value || '');
}

const tihiUpdate = (event) => {
  let tihiFile = event.target.files[0];

  let reader = new FileReader();
  reader.onloadend = function() {
    // Store the image data in localStorage
    localStorage.setItem('uploadedImage', reader.result);

    let img = document.createElement('img');
    img.src = reader.result;
    img.addEventListener('click', resetImage);

    if (_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printTihi.querySelector('img')) {
      _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printTihi.querySelector('img').remove();
    }
    _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printTihi.classList.add('tihi-active');
    _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printTihi.appendChild(img);
  }

  reader.readAsDataURL(tihiFile);
}

const tihiDragDrop = (event) => {
  event.preventDefault();
  event.stopPropagation(); 
  if (event.dataTransfer.items) {
    const droppedFile = event.dataTransfer.items[0].getAsFile();
    const changeEvent = {
      target: {
        files: [droppedFile]
      }
    };
    tihiUpdate(changeEvent);
  }
  dragCounter = 0;
  document.body.classList.remove('dragging');
}

const tihiOnload = () => {
  let imageData = localStorage.getItem('uploadedImage');

  if (imageData) {
    let img = document.createElement('img');
    img.src = imageData;
    img.addEventListener('click', resetImage);

    if (_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printTihi.querySelector('img')) {
      _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printTihi.querySelector('img').remove();
    }
    _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printTihi.classList.add('tihi-active');
    _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printTihi.appendChild(img);
  } else {
    // If there's no image data in localStorage, add the event listener to the existing image
    let existingImage = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printTihi.querySelector('img');
    if (existingImage) {
      existingImage.addEventListener('click', resetImage);
    }
  }
}

const resetImage = () => {
  if (_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printTihi.querySelector('img')) {
    _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printTihi.querySelector('img').remove();
  }
  _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].printTihi.classList.remove('tihi-active');
  localStorage.removeItem('uploadedImage');
}

const dragDropHandler = () => {
  document.addEventListener('dragenter', (event) => { 
    dragCounter++; 
    if (dragCounter === 1) { 
      document.body.classList.add('dragging'); 
      _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].upcLabel.classList.remove('sidebar__title--active');
      _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].upcForm.classList.remove('sidebar__form--active');
      
      if (!_domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].shipForm.classList.contains('sidebar__form--active')) {
        _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].shipLabel.classList.add('sidebar__title--active');
        _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].shipForm.classList.add('sidebar__form--active');
      }
    } 
  });
  
  document.addEventListener('dragleave', (event) => {
    dragCounter--;
    if (dragCounter === 0) { 
      document.body.classList.remove('dragging'); 
    }
  });
  
  document.addEventListener('drop', (event) => {
    event.preventDefault();
    dragCounter = 0 
  });

  document.addEventListener('dragover', (event) => {
    event.preventDefault();
  });
}

/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   brandDefaults: function() { return /* binding */ brandDefaults; }
/* harmony export */ });
const brandDefaults = () => {
  const brandField = document.querySelector('#brand').value;
  let logoSrc, headerText, linkText, itemMaster, sku, upc, description;

  switch (brandField) {
    case 'brenthaven':
      logoSrc = 'dist/img/brenthaven_min.png';
      headerText = 'Brenthaven';
      linkText = 'https://brenthaven.com';
      itemMaster = '1050';
      sku = '1050001';
      upc = '730791105003';
      description = 'Edge Smart Connect Keyboard';
      break;
    case 'gumdrop':
      logoSrc = 'dist/img/gumdrop_min.png';
      headerText = 'Gumdrop';
      linkText = 'https://www.gumdropcases.com';
      itemMaster =  '01D015';
      sku = '01D015E01-20';
      upc = '818090026011';
      description = 'DropTech for Dell Latitude 3340 (2-in-1)';
      break;
    default:
      logoSrc = 'dist/img/vault_min.png';
      headerText = 'Vault';
      linkText = 'https://byvault.com';
      itemMaster =  '12A001';
      sku = '12A001E01-20';
      upc = '818090025960';
      description = 'Simplicity Stand for iPad';
  }
  
  return { brandField, logoSrc, headerText, linkText, itemMaster, sku, upc, description };
}

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canvasUpdate: function() { return /* binding */ canvasUpdate; }
/* harmony export */ });
/* harmony import */ var _domElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


const canvasUpdate = () => {
  let previewContent = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].preview.querySelector('.preview__content');
  let cartonFront = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].preview.querySelector('.page--carton-front');
  let cartonSide = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].preview.querySelector('.page--carton-side');

  let condensed = 30;
  let expanded = 50;

  const defaultFontSize = 1.4; // in inches
  const defaultArea = 13.4 * 18.3; // Default area in square inches
  let length = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].dimLength.value || 18.3;
  let width = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].dimWidth.value || 11.2;
  let height = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].dimHeight.value || 13.4;

  const minFontSize = 0.8; // Minimum font size in inches
  const maxFontSize = 1.2; // Maximum font size in inches
  const area = Math.min(length * width, height * height);
  let fontSize = defaultFontSize * Math.sqrt(area / defaultArea);
  fontSize = Math.max(minFontSize, Math.min(fontSize, maxFontSize));

  if (previewContent.classList.contains('preview__content--condensed')) {
    cartonFront.style.width = `${condensed * (length/height)}%`;
    cartonSide.style.width = `${condensed * (width/height)}%`;
  } else if (previewContent.classList.contains('preview__content--expanded')) {
    cartonFront.style.width = `${expanded * (length/height)}%`;
    cartonSide.style.width = `${expanded * (width/height)}%`;
  }

  cartonFront.querySelector('.scaler').style.width = `${length}in`;
  cartonFront.querySelector('.scaler').style.height = `${height}in`;

  cartonSide.querySelector('.scaler').style.width = `${width}in`;
  cartonSide.querySelector('.scaler').style.height = `${height}in`;

  previewContent.querySelectorAll('.shipping-mark').forEach((content) => {
    content.style.fontSize = `${fontSize}in`;
  });
}

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scaler: function() { return /* binding */ scaler; }
/* harmony export */ });
const scaler = () => {
  const parentDivs = document.querySelectorAll('.page--carton');

  parentDivs.forEach(parentDiv => {
    const print = parentDiv.querySelector('.scaler');
    const originalTransition = print.style.transition;
    let isTransitioning = false;

    const resizeObserver = new ResizeObserver(entries => {
      if (isTransitioning) return;

      for (let entry of entries) {
        const parentDivWidth = entry.contentRect.width;
        const printWidth = print.offsetWidth;
        const scale = parentDivWidth / printWidth;
        print.style.transform = `scale(${scale})`;
      }
    });

    print.addEventListener('transitionstart', () => {
      isTransitioning = true;
      resizeObserver.disconnect();
    });

    print.addEventListener('transitionend', () => {
      isTransitioning = false;
      resizeObserver.observe(parentDiv);
    });

    resizeObserver.observe(parentDiv);
  });
};

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   outline: function() { return /* binding */ outline; },
/* harmony export */   qrToggle: function() { return /* binding */ qrToggle; },
/* harmony export */   sidebarAccordion: function() { return /* binding */ sidebarAccordion; }
/* harmony export */ });
/* harmony import */ var _domElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


const qrToggle = () => {
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

const sidebarAccordion = () => {
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

const outline = () => {
  const fields = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].sidebar.querySelectorAll('input, select, textarea');

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

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   colorInit: function() { return /* binding */ colorInit; }
/* harmony export */ });

let colorPicker;

const colorInit = () => {
  colorPicker = new iro.ColorPicker('.color-picker', {
    width: 160,
    color: "#ffffff",
    layoutDirection: 'horizontal',
    sliderSize: 8
  });

  const currentIndicator = document.querySelector('.color-current');

  document.querySelector('#color').addEventListener('input', function() {
    colorPicker.color.set(this.value);
    currentIndicator.style.backgroundColor = this.value;
    colorChanger();
  });

  colorPicker.on('color:change', function(color) {
    document.querySelector('#color').value = color.hexString;
    currentIndicator.style.backgroundColor = color.hexString;
    colorChanger();
  });

  document.querySelector('.color-reset').addEventListener('click', function() {
    colorPicker.reset();
  });

  colorToggle();
}

const colorChanger = () => {
  const rgb = colorPicker.color.rgb;
  const hex = colorPicker.color.hexString;
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  const labelInternal = document.querySelectorAll('.label__internal');

  labelInternal.forEach((element) => {
    element.style.backgroundColor = hex;

    element.classList.remove('label__internal--dark');
    element.classList.remove('label__internal--light');

    if (luminance > 0.5) {
      element.classList.add('label__internal--dark');
    } else {
      element.classList.add('label__internal--light');
    }
  });
}

const colorToggle = () => {
  const colorToggle = document.querySelector('.color-current');
  const picker = document.querySelector('.color-picker');

  colorToggle.addEventListener('click', () => {
    picker.classList.toggle('color-picker--active');
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!picker.contains(target) && !colorToggle.contains(target)) {
      picker.classList.remove('color-picker--active');
    }
  });
}


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   controlInit: function() { return /* binding */ controlInit; }
/* harmony export */ });
/* harmony import */ var _canvasUpdate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


const controlInit = () => {
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
  (0,_canvasUpdate_js__WEBPACK_IMPORTED_MODULE_0__.canvasUpdate)();
};

const pageVisibility = () => {
  const shouldShow = checkboxId => document.querySelector(checkboxId).checked;

  const visibilityStates = {
    polybag: shouldShow('#polybag'),
    master: shouldShow('#master'),
    inner: shouldShow('#inner')
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

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_select_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_validate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _modules_labelHandler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _modules_scaler_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _modules_misc_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _modules_colorHandler_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _modules_toolBar_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);








(0,_modules_select_js__WEBPACK_IMPORTED_MODULE_0__.selectInit)();
(0,_modules_validate_js__WEBPACK_IMPORTED_MODULE_1__.validateNumbers)();
(0,_modules_labelHandler_js__WEBPACK_IMPORTED_MODULE_2__.labelInit)();
(0,_modules_toolBar_js__WEBPACK_IMPORTED_MODULE_6__.controlInit)();
(0,_modules_scaler_js__WEBPACK_IMPORTED_MODULE_3__.scaler)();
(0,_modules_misc_js__WEBPACK_IMPORTED_MODULE_4__.outline)();
(0,_modules_colorHandler_js__WEBPACK_IMPORTED_MODULE_5__.colorInit)();
(0,_modules_misc_js__WEBPACK_IMPORTED_MODULE_4__.qrToggle)();
(0,_modules_misc_js__WEBPACK_IMPORTED_MODULE_4__.sidebarAccordion)();

}();
/******/ })()
;
//# sourceMappingURL=main.js.map
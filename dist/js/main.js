/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SideBar: function() { return /* binding */ SideBar; }
/* harmony export */ });
/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _fieldHandler_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _colorHandler_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(73);
/* harmony import */ var _misc_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(72);








const SideBar = () => {
  (0,_select_js__WEBPACK_IMPORTED_MODULE_0__.selectInit)();
  (0,_validate_js__WEBPACK_IMPORTED_MODULE_1__.validateNumbers)();
  (0,_validate_js__WEBPACK_IMPORTED_MODULE_1__.validateUPC)();
  (0,_fieldHandler_js__WEBPACK_IMPORTED_MODULE_2__.fieldInit)();
  (0,_colorHandler_js__WEBPACK_IMPORTED_MODULE_3__.colorInit)();
  (0,_misc_js__WEBPACK_IMPORTED_MODULE_4__.qrToggle)();
  (0,_misc_js__WEBPACK_IMPORTED_MODULE_4__.qrVisibility)();
  (0,_misc_js__WEBPACK_IMPORTED_MODULE_4__.sizeVisibility)();
  (0,_misc_js__WEBPACK_IMPORTED_MODULE_4__.skuBox)();
  (0,_misc_js__WEBPACK_IMPORTED_MODULE_4__.outline)();
  (0,_misc_js__WEBPACK_IMPORTED_MODULE_4__.sidebarAccordion)();
}

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   selectChoose: function() { return /* binding */ selectChoose; },
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

const selectChoose = (select, value) => {
  let targetSelect = document.querySelector(`${select} + .selectinator .selectinator-options .selectinator-option[data-value="${value}"]`);
    
  let event = new MouseEvent('mousedown', {
    bubbles: true,
    cancelable: true,
    view: window
  });

  targetSelect.dispatchEvent(event);
}

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validateNumbers: function() { return /* binding */ validateNumbers; },
/* harmony export */   validateUPC: function() { return /* binding */ validateUPC; }
/* harmony export */ });
/* harmony import */ var _domElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);

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

const validateUPC = (input) => {
  input = sidebar.querySelector('#item_upc');
  input.addEventListener('input', () => {
    let value = input.value;

    if (value.length < 12 && value.length > 5) {
      validateInput(input, false, 'UPC must be 12 digits');
    } else {
      validateInput(input, true);
    }
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
/* 4 */
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
  factory: document.querySelector('#factory'),
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
  controls: document.querySelector('.preview__controls'),
  printHeaders: document.querySelectorAll('.print-header'),
  labels: document.querySelectorAll('.label'),
  printLogos: document.querySelectorAll('.print-logo'),
  printItemMasters: document.querySelectorAll('.print-item-master'),
  printBoxSkus: document.querySelectorAll('.print-box-sku'),
  printBoxSkusSapona: document.querySelectorAll('.sapona .print-box-sku'),
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
/* 5 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fieldInit: function() { return /* binding */ fieldInit; }
/* harmony export */ });
/* harmony import */ var jsbarcode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var jsbarcode__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsbarcode__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _domElements_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _brandDefaults_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(56);
/* harmony import */ var _canvasUpdate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(57);
/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2);
/* harmony import */ var _toolBar_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(58);







let dragCounter = 0;
let iconSize = 60;

const triggerEventListeners = () => {
  brandUpdate();
  factoryUpdate();
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

const fieldInit = () => {
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].brand.addEventListener('change', brandUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].factory.addEventListener('change', factoryUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].itemMaster.addEventListener('input', itemMasterUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].sku.addEventListener('input', skuUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].description.addEventListener('input', descriptionUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].upc.addEventListener('input', upcUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].source.addEventListener('change', sourceUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].qrPath.addEventListener('input', qrCustomUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].pbContent.addEventListener('input', contentUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].mcContent.addEventListener('input', contentUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].icContent.addEventListener('input', contentUpdate);

  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].dimWidth.addEventListener('input', dimUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].dimLength.addEventListener('input', dimUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].dimHeight.addEventListener('input', dimUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].dimWidth.addEventListener('change', _canvasUpdate_js__WEBPACK_IMPORTED_MODULE_3__.canvasUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].dimLength.addEventListener('change', _canvasUpdate_js__WEBPACK_IMPORTED_MODULE_3__.canvasUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].dimHeight.addEventListener('change', _canvasUpdate_js__WEBPACK_IMPORTED_MODULE_3__.canvasUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].boxQty.addEventListener('input', qtyUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].gWeight.addEventListener('input', weightUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].nWeight.addEventListener('input', weightUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].purchaseOrder.addEventListener('input', poUpdate);

  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].upcForm.addEventListener('submit', (event) => event.preventDefault() );
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].shipForm.addEventListener('submit', (event) => event.preventDefault() );

  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].tihi.addEventListener('change', tihiUpdate);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].tihiLabel.addEventListener('drop', tihiDragDrop);
  dragDropHandler();

  window.addEventListener('load', triggerEventListeners);
}

const updateTextContent = (nodeList, value) => {
  nodeList.forEach((node) => node.textContent = value);
};

const brandUpdate = () => {
  const defaults = (0,_brandDefaults_js__WEBPACK_IMPORTED_MODULE_2__.brandDefaults)();
  // Update Preview class
  const previewClassesToRemove = ['preview--brenthaven', 'preview--gumdrop', 'preview--vault'];
  previewClassesToRemove.forEach((className) => _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].preview.classList.remove(className));
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].preview.classList.add(`preview--${defaults.brandField}`);

  const sidebarClassesToRemove = ['sidebar--brenthaven', 'sidebar--gumdrop', 'sidebar--vault'];
  sidebarClassesToRemove.forEach((className) => _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].sidebar.classList.remove(className));
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].sidebar.classList.add(`sidebar--${defaults.brandField}`);

  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].labels.forEach(label => label.classList.add(`label--${defaults.brandField}`));
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printHeaders.forEach(printHeader => {
    printHeader.querySelector('img').src = defaults.logoSrc
  });
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printLogos.forEach(printLogo => printLogo.src = defaults.logoSrc);

  //updateTextContent(el.printHeaders, defaults.headerText);
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printDescriptions, _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].description.value ||  defaults.description);
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printItemMasters, _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].itemMaster.value.toUpperCase() || defaults.itemMaster);
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printSkus, _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].sku.value.toUpperCase() || defaults.sku);
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printInstallBases, defaults.linkText);
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printInstallPaths, _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].itemMaster.value.toUpperCase() || defaults.itemMaster);

  // Update input field placeholders with defaults
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].itemMaster.placeholder = defaults.itemMaster;
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].qrPath.placeholder = defaults.itemMaster;
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].sku.placeholder = defaults.sku;
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].upc.placeholder = defaults.upc;
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].description.placeholder = defaults.description;

  // Disable/Enable factory options based on brand
  if (defaults.brandField === 'brenthaven' || defaults.brandField === 'gumdrop') {
    _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].factory.querySelector('option[value="others"]').disabled = true;
    _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].factory.nextElementSibling.querySelector('.selectinator-options .selectinator-option[data-value="others"]').classList.add('selectinator-option--disabled');
    // Changes the factory option to default when clicking on BH or GD
    if (_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].factory.value === 'others') {
      _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].factory.nextElementSibling.querySelector('.selectinator-options .selectinator-option[data-value="default"]').dispatchEvent(new Event('mousedown'));
    }
  } else {
    _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].factory.querySelector('option[value="others"]').disabled = false;
    _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].factory.nextElementSibling.querySelector('.selectinator-options .selectinator-option[data-value="others"]').classList.remove('selectinator-option--disabled');
  }

  skuUpdate();
  qrURL();
  upcUpdate();
}

const factoryUpdate = () => {
  const elements = document.querySelectorAll(`.preview__content .page`);

  let firstRects = Array.from(elements).map(element => {
    return {
      rect: element.getBoundingClientRect(),
      wasHidden: element.classList.contains('page--hidden')
    };
  });

  if (_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].factory.value === 'sapona') {
    document.querySelector('.sapona').classList.remove("factory--hidden");
    document.querySelectorAll('.page[data-type="master"]:not(.sapona)').forEach(page => page.classList.add("factory--hidden"));
  } else if (_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].factory.value === 'others' && _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].brand.value === 'vault') {
    document.querySelector('.custom-factory').classList.remove("factory--hidden");
    document.querySelectorAll('.page[data-type="master"]:not(.custom-factory)').forEach(page => page.classList.add("factory--hidden"));
  } else {
    document.querySelector('.sapona').classList.add("factory--hidden");
    document.querySelector('.custom-factory').classList.add("factory--hidden");
    document.querySelectorAll('.page[data-type="master"]:not(.sapona):not(.custom-factory)').forEach(page => page.classList.remove("factory--hidden"));
  }

  elements.forEach((element, index) => {
    (0,_toolBar_js__WEBPACK_IMPORTED_MODULE_5__.applyAnimation)(element, firstRects[index].rect, firstRects[index].wasHidden);
  });
}

const itemMasterUpdate = () => {
  const defaults = (0,_brandDefaults_js__WEBPACK_IMPORTED_MODULE_2__.brandDefaults)();
  const iTemMasterVal = _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].itemMaster.value.toUpperCase()  || defaults.itemMaster;

  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printItemMasters, iTemMasterVal);
  if (defaults.brandField !== 'vault') {
    updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printInstallPaths, iTemMasterVal);
    _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].qrPath.placeholder = iTemMasterVal;
    qrURL();
  }
}

const skuUpdate = () => {
  const defaults = (0,_brandDefaults_js__WEBPACK_IMPORTED_MODULE_2__.brandDefaults)();
  const skuValue = _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].sku.value.toUpperCase() || defaults.sku;

  let skuLength = skuValue.length;

  let formattedSku = '';
  let isNumericThirdChar = skuLength > 2 && /[0-9]/.test(skuValue[2]);
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

  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printBoxSkus.forEach((printBoxSkus) => {
    printBoxSkus.innerHTML = formattedSku;
    
    if (skuLength <= 12) {
      printBoxSkus.style.fontSize = '80%'; 
    } else if (skuLength <= 22) {
      printBoxSkus.style.fontSize = '60%'; 
    } else {
      printBoxSkus.style.fontSize = '40%'; 
    }
  });
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printBoxSkusSapona.forEach((printBoxSkus) => printBoxSkus.innerHTML = formattedSku );


  
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printSkus, skuValue);
  dataMatrixUpdate();

  if (defaults.brandField === 'vault') {
    updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printInstallPaths, 'assembly/');
    _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].qrPath.placeholder = 'assembly/';
    qrURL();
  }
}

const descriptionUpdate = () => {
  const defaults = (0,_brandDefaults_js__WEBPACK_IMPORTED_MODULE_2__.brandDefaults)();
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printDescriptions, _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].description.value || defaults.description);

  const nameHas = {
    'droptech': '#1f75ff',
    'slimtech': '#ff1c1c',
    'foamtech': '#ffff14',
    'bumptech': '#00ff04',
    'ipad': '#123456' // replace '#123456' with the actual color for 'ipad'
  };

  const descriptionLower = _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].description.value.toLowerCase();
  let color = '#ffffff'; // default color

  for (let name in nameHas) {
    if (descriptionLower.includes(name)) {
      color = nameHas[name];
      break;
    }
  }

  (0,_select_js__WEBPACK_IMPORTED_MODULE_4__.selectChoose)('#color', color);
}

const upcUpdate = () => {
  const defaults = (0,_brandDefaults_js__WEBPACK_IMPORTED_MODULE_2__.brandDefaults)();
  const barcodes = _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].preview.querySelectorAll('.label__upc svg');
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].upc.value = _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].upc.value.replace(' ', '');
  let upcField = (_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].upc.value || defaults.upc).replace(' ', '');

  if (upcField.length == 12) {
    barcodes.forEach(barcode => {
      jsbarcode__WEBPACK_IMPORTED_MODULE_0___default()(barcode, upcField.replace(/\s/g, ''), {
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
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printCountries, _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].source.value || 'China');

  const sourceValue = _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].source.value;
  console.log(sourceValue);
  const customSourceInput = document.getElementById('custom_source');

  if (sourceValue === 'others') {
    customSourceInput.classList.remove('hidden');
    updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printCountries, customSourceInput.value || 'Custom Country');
    customSourceInput.addEventListener('input', () => {
      updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printCountries, customSourceInput.value || 'Custom Country');
    });
  } else {
    customSourceInput.classList.add('hidden');
    updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printCountries, sourceValue || 'China');
  }
}

const qrURL = () => {
  const defaults = (0,_brandDefaults_js__WEBPACK_IMPORTED_MODULE_2__.brandDefaults)();
  const itemMasterField = _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].itemMaster.value.toUpperCase() || defaults.itemMaster;
  const skuField = _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].sku.value.toUpperCase() || defaults.sku;

  const brandUrls = {
    'brenthaven': 'https://brenthaven.com/',
    'gumdrop': 'https://www.gumdropcases.com/',
    'default': 'https://vaultproducts.com/'
  };

  const brandUrl = brandUrls[defaults.brandField] || brandUrls.default;
  const qrPathValue = defaults.brandField !== 'vault' ? itemMasterField : 'assembly/';
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].qrBase.textContent = brandUrl; // Update QR Link Base div
  
  const qrURL = `${brandUrl}${qrPathValue}`;
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].qrPath.value = `${qrPathValue}`; // Update Hidden QR Path
  
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].qrLink.value = qrURL; // Update Hidden QR Link

  qrCodeUpdate();
}

const qrCustomUpdate = () => {
  const defaults = (0,_brandDefaults_js__WEBPACK_IMPORTED_MODULE_2__.brandDefaults)();
  const itemMasterField = _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].itemMaster.value.toUpperCase() || defaults.itemMaster;
  const skuField = _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].sku.value.toUpperCase() || defaults.sku;
  const qrPathValue = _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].qrPath.value || (defaults.brandField !== 'vault' ? itemMasterField.toUpperCase() : 'assembly/');
  
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printInstallPaths, qrPathValue);
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].qrLink.value = _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].qrBase.textContent + qrPathValue; // Update Hidden QR Link

  qrCodeUpdate();
}

const qrCodeUpdate = () => {
  const qrLinkValue = _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].qrLink.value;
  const qrCodeContainers = _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].preview.querySelectorAll('.label__qr');

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
  const defaults = (0,_brandDefaults_js__WEBPACK_IMPORTED_MODULE_2__.brandDefaults)();
  const itemMasterValue = _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].sku.value.toUpperCase() || defaults.sku;
  const dataMatrixContainers = _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].preview.querySelectorAll('.label__datamatrix');

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
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printPolybagQty, _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].pbContent.value || '1');
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printMasterQty, _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].mcContent.value || '20');
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printInnerQty, _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].icContent.value || '5');
}

const dimUpdate = () => {
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printDimLengths, `${_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].dimLength.value || 18.3}`);
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printDimWidths, `${_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].dimWidth.value || 11.2}`);
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printDimHeights, `${_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].dimHeight.value || 13.4}`);
}

const qtyUpdate = () => {
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printBoxQty, _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].boxQty.value || '20');
}
               
const weightUpdate = () => {
  if (_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].gWeight.value === '0') {
    _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printGrossWgt.forEach(el => el.classList.add('print-weight--empty'));
  } else {
    _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printGrossWgt.forEach(el => el.classList.remove('print-weight--empty'));
    updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printGrossWgt, `${_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].gWeight.value || '21.17'}`);
  }

  if (_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].nWeight.value === '0') {
    _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printNetWgt.forEach(el => el.classList.add('print-weight--empty'));
  } else {
    _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printNetWgt.forEach(el => el.classList.remove('print-weight--empty'));
    updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printNetWgt, `${_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].nWeight.value || '20.06'}`);
  }
}

const poUpdate = () => {
  updateTextContent(_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printPurchaseOrders, _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].purchaseOrder.value || '');
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

    if (_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printTihi.querySelector('img')) {
      _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printTihi.querySelector('img').remove();
    }
    _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printTihi.classList.add('tihi-active');
    _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printTihi.appendChild(img);
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

    if (_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printTihi.querySelector('img')) {
      _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printTihi.querySelector('img').remove();
    }
    _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printTihi.classList.add('tihi-active');
    _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printTihi.appendChild(img);
  } else {
    // If there's no image data in localStorage, add the event listener to the existing image
    let existingImage = _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printTihi.querySelector('img');
    if (existingImage) {
      existingImage.addEventListener('click', resetImage);
    }
  }
}

const resetImage = () => {
  if (_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printTihi.querySelector('img')) {
    _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printTihi.querySelector('img').remove();
  }
  _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].printTihi.classList.remove('tihi-active');
  localStorage.removeItem('uploadedImage');
}

const dragDropHandler = () => {
  document.addEventListener('dragenter', (event) => { 
    dragCounter++; 
    if (dragCounter === 1) { 
      document.body.classList.add('dragging'); 
      _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].upcLabel.classList.remove('sidebar__title--active');
      _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].upcForm.classList.remove('sidebar__form--active');
      
      if (!_domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].shipForm.classList.contains('sidebar__form--active')) {
        _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].shipLabel.classList.add('sidebar__title--active');
        _domElements_js__WEBPACK_IMPORTED_MODULE_1__["default"].shipForm.classList.add('sidebar__form--active');
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
/* 6 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var _barcodes = __webpack_require__(7);

var _barcodes2 = _interopRequireDefault(_barcodes);

var _merge = __webpack_require__(42);

var _merge2 = _interopRequireDefault(_merge);

var _linearizeEncodings = __webpack_require__(43);

var _linearizeEncodings2 = _interopRequireDefault(_linearizeEncodings);

var _fixOptions = __webpack_require__(44);

var _fixOptions2 = _interopRequireDefault(_fixOptions);

var _getRenderProperties = __webpack_require__(45);

var _getRenderProperties2 = _interopRequireDefault(_getRenderProperties);

var _optionsFromStrings = __webpack_require__(47);

var _optionsFromStrings2 = _interopRequireDefault(_optionsFromStrings);

var _ErrorHandler = __webpack_require__(55);

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

var _exceptions = __webpack_require__(54);

var _defaults = __webpack_require__(48);

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The protype of the object returned from the JsBarcode() call


// Help functions
var API = function API() {};

// The first call of the library API
// Will return an object with all barcodes calls and the data that is used
// by the renderers


// Default values


// Exceptions
// Import all the barcodes
var JsBarcode = function JsBarcode(element, text, options) {
	var api = new API();

	if (typeof element === "undefined") {
		throw Error("No element to render on was provided.");
	}

	// Variables that will be pased through the API calls
	api._renderProperties = (0, _getRenderProperties2.default)(element);
	api._encodings = [];
	api._options = _defaults2.default;
	api._errorHandler = new _ErrorHandler2.default(api);

	// If text is set, use the simple syntax (render the barcode directly)
	if (typeof text !== "undefined") {
		options = options || {};

		if (!options.format) {
			options.format = autoSelectBarcode();
		}

		api.options(options)[options.format](text, options).render();
	}

	return api;
};

// To make tests work TODO: remove
JsBarcode.getModule = function (name) {
	return _barcodes2.default[name];
};

// Register all barcodes
for (var name in _barcodes2.default) {
	if (_barcodes2.default.hasOwnProperty(name)) {
		// Security check if the propery is a prototype property
		registerBarcode(_barcodes2.default, name);
	}
}
function registerBarcode(barcodes, name) {
	API.prototype[name] = API.prototype[name.toUpperCase()] = API.prototype[name.toLowerCase()] = function (text, options) {
		var api = this;
		return api._errorHandler.wrapBarcodeCall(function () {
			// Ensure text is options.text
			options.text = typeof options.text === 'undefined' ? undefined : '' + options.text;

			var newOptions = (0, _merge2.default)(api._options, options);
			newOptions = (0, _optionsFromStrings2.default)(newOptions);
			var Encoder = barcodes[name];
			var encoded = encode(text, Encoder, newOptions);
			api._encodings.push(encoded);

			return api;
		});
	};
}

// encode() handles the Encoder call and builds the binary string to be rendered
function encode(text, Encoder, options) {
	// Ensure that text is a string
	text = "" + text;

	var encoder = new Encoder(text, options);

	// If the input is not valid for the encoder, throw error.
	// If the valid callback option is set, call it instead of throwing error
	if (!encoder.valid()) {
		throw new _exceptions.InvalidInputException(encoder.constructor.name, text);
	}

	// Make a request for the binary data (and other infromation) that should be rendered
	var encoded = encoder.encode();

	// Encodings can be nestled like [[1-1, 1-2], 2, [3-1, 3-2]
	// Convert to [1-1, 1-2, 2, 3-1, 3-2]
	encoded = (0, _linearizeEncodings2.default)(encoded);

	// Merge
	for (var i = 0; i < encoded.length; i++) {
		encoded[i].options = (0, _merge2.default)(options, encoded[i].options);
	}

	return encoded;
}

function autoSelectBarcode() {
	// If CODE128 exists. Use it
	if (_barcodes2.default["CODE128"]) {
		return "CODE128";
	}

	// Else, take the first (probably only) barcode
	return Object.keys(_barcodes2.default)[0];
}

// Sets global encoder options
// Added to the api by the JsBarcode function
API.prototype.options = function (options) {
	this._options = (0, _merge2.default)(this._options, options);
	return this;
};

// Will create a blank space (usually in between barcodes)
API.prototype.blank = function (size) {
	var zeroes = new Array(size + 1).join("0");
	this._encodings.push({ data: zeroes });
	return this;
};

// Initialize JsBarcode on all HTML elements defined.
API.prototype.init = function () {
	// Should do nothing if no elements where found
	if (!this._renderProperties) {
		return;
	}

	// Make sure renderProperies is an array
	if (!Array.isArray(this._renderProperties)) {
		this._renderProperties = [this._renderProperties];
	}

	var renderProperty;
	for (var i in this._renderProperties) {
		renderProperty = this._renderProperties[i];
		var options = (0, _merge2.default)(this._options, renderProperty.options);

		if (options.format == "auto") {
			options.format = autoSelectBarcode();
		}

		this._errorHandler.wrapBarcodeCall(function () {
			var text = options.value;
			var Encoder = _barcodes2.default[options.format.toUpperCase()];
			var encoded = encode(text, Encoder, options);

			render(renderProperty, encoded, options);
		});
	}
};

// The render API call. Calls the real render function.
API.prototype.render = function () {
	if (!this._renderProperties) {
		throw new _exceptions.NoElementException();
	}

	if (Array.isArray(this._renderProperties)) {
		for (var i = 0; i < this._renderProperties.length; i++) {
			render(this._renderProperties[i], this._encodings, this._options);
		}
	} else {
		render(this._renderProperties, this._encodings, this._options);
	}

	return this;
};

API.prototype._defaults = _defaults2.default;

// Prepares the encodings and calls the renderer
function render(renderProperties, encodings, options) {
	encodings = (0, _linearizeEncodings2.default)(encodings);

	for (var i = 0; i < encodings.length; i++) {
		encodings[i].options = (0, _merge2.default)(options, encodings[i].options);
		(0, _fixOptions2.default)(encodings[i].options);
	}

	(0, _fixOptions2.default)(options);

	var Renderer = renderProperties.renderer;
	var renderer = new Renderer(renderProperties.element, encodings, options);
	renderer.render();

	if (renderProperties.afterRender) {
		renderProperties.afterRender();
	}
}

// Export to browser
if (typeof window !== "undefined") {
	window.JsBarcode = JsBarcode;
}

// Export to jQuery
/*global jQuery */
if (typeof jQuery !== 'undefined') {
	jQuery.fn.JsBarcode = function (content, options) {
		var elementArray = [];
		jQuery(this).each(function () {
			elementArray.push(this);
		});
		return JsBarcode(elementArray, content, options);
	};
}

// Export to commonJS
module.exports = JsBarcode;

/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _CODE = __webpack_require__(8);

var _CODE2 = __webpack_require__(10);

var _EAN_UPC = __webpack_require__(18);

var _ITF = __webpack_require__(28);

var _MSI = __webpack_require__(32);

var _pharmacode = __webpack_require__(39);

var _codabar = __webpack_require__(40);

var _GenericBarcode = __webpack_require__(41);

exports["default"] = {
	CODE39: _CODE.CODE39,
	CODE128: _CODE2.CODE128, CODE128A: _CODE2.CODE128A, CODE128B: _CODE2.CODE128B, CODE128C: _CODE2.CODE128C,
	EAN13: _EAN_UPC.EAN13, EAN8: _EAN_UPC.EAN8, EAN5: _EAN_UPC.EAN5, EAN2: _EAN_UPC.EAN2, UPC: _EAN_UPC.UPC, UPCE: _EAN_UPC.UPCE,
	ITF14: _ITF.ITF14,
	ITF: _ITF.ITF,
	MSI: _MSI.MSI, MSI10: _MSI.MSI10, MSI11: _MSI.MSI11, MSI1010: _MSI.MSI1010, MSI1110: _MSI.MSI1110,
	pharmacode: _pharmacode.pharmacode,
	codabar: _codabar.codabar,
	GenericBarcode: _GenericBarcode.GenericBarcode
};

/***/ }),
/* 8 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.CODE39 = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__(9);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/Code_39#Encoding

var CODE39 = function (_Barcode) {
	_inherits(CODE39, _Barcode);

	function CODE39(data, options) {
		_classCallCheck(this, CODE39);

		data = data.toUpperCase();

		// Calculate mod43 checksum if enabled
		if (options.mod43) {
			data += getCharacter(mod43checksum(data));
		}

		return _possibleConstructorReturn(this, (CODE39.__proto__ || Object.getPrototypeOf(CODE39)).call(this, data, options));
	}

	_createClass(CODE39, [{
		key: "encode",
		value: function encode() {
			// First character is always a *
			var result = getEncoding("*");

			// Take every character and add the binary representation to the result
			for (var i = 0; i < this.data.length; i++) {
				result += getEncoding(this.data[i]) + "0";
			}

			// Last character is always a *
			result += getEncoding("*");

			return {
				data: result,
				text: this.text
			};
		}
	}, {
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
		}
	}]);

	return CODE39;
}(_Barcode3.default);

// All characters. The position in the array is the (checksum) value


var characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", ".", " ", "$", "/", "+", "%", "*"];

// The decimal representation of the characters, is converted to the
// corresponding binary with the getEncoding function
var encodings = [20957, 29783, 23639, 30485, 20951, 29813, 23669, 20855, 29789, 23645, 29975, 23831, 30533, 22295, 30149, 24005, 21623, 29981, 23837, 22301, 30023, 23879, 30545, 22343, 30161, 24017, 21959, 30065, 23921, 22385, 29015, 18263, 29141, 17879, 29045, 18293, 17783, 29021, 18269, 17477, 17489, 17681, 20753, 35770];

// Get the binary representation of a character by converting the encodings
// from decimal to binary
function getEncoding(character) {
	return getBinary(characterValue(character));
}

function getBinary(characterValue) {
	return encodings[characterValue].toString(2);
}

function getCharacter(characterValue) {
	return characters[characterValue];
}

function characterValue(character) {
	return characters.indexOf(character);
}

function mod43checksum(data) {
	var checksum = 0;
	for (var i = 0; i < data.length; i++) {
		checksum += characterValue(data[i]);
	}

	checksum = checksum % 43;
	return checksum;
}

exports.CODE39 = CODE39;

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Barcode = function Barcode(data, options) {
	_classCallCheck(this, Barcode);

	this.data = data;
	this.text = options.text || data;
	this.options = options;
};

exports["default"] = Barcode;

/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CODE128C = exports.CODE128B = exports.CODE128A = exports.CODE128 = undefined;

var _CODE128_AUTO = __webpack_require__(11);

var _CODE128_AUTO2 = _interopRequireDefault(_CODE128_AUTO);

var _CODE128A = __webpack_require__(15);

var _CODE128A2 = _interopRequireDefault(_CODE128A);

var _CODE128B = __webpack_require__(16);

var _CODE128B2 = _interopRequireDefault(_CODE128B);

var _CODE128C = __webpack_require__(17);

var _CODE128C2 = _interopRequireDefault(_CODE128C);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.CODE128 = _CODE128_AUTO2.default;
exports.CODE128A = _CODE128A2.default;
exports.CODE128B = _CODE128B2.default;
exports.CODE128C = _CODE128C2.default;

/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _CODE2 = __webpack_require__(12);

var _CODE3 = _interopRequireDefault(_CODE2);

var _auto = __webpack_require__(14);

var _auto2 = _interopRequireDefault(_auto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODE128AUTO = function (_CODE) {
	_inherits(CODE128AUTO, _CODE);

	function CODE128AUTO(data, options) {
		_classCallCheck(this, CODE128AUTO);

		// ASCII value ranges 0-127, 200-211
		if (/^[\x00-\x7F\xC8-\xD3]+$/.test(data)) {
			var _this = _possibleConstructorReturn(this, (CODE128AUTO.__proto__ || Object.getPrototypeOf(CODE128AUTO)).call(this, (0, _auto2.default)(data), options));
		} else {
			var _this = _possibleConstructorReturn(this, (CODE128AUTO.__proto__ || Object.getPrototypeOf(CODE128AUTO)).call(this, data, options));
		}
		return _possibleConstructorReturn(_this);
	}

	return CODE128AUTO;
}(_CODE3.default);

exports["default"] = CODE128AUTO;

/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__(9);

var _Barcode3 = _interopRequireDefault(_Barcode2);

var _constants = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This is the master class,
// it does require the start code to be included in the string
var CODE128 = function (_Barcode) {
	_inherits(CODE128, _Barcode);

	function CODE128(data, options) {
		_classCallCheck(this, CODE128);

		// Get array of ascii codes from data
		var _this = _possibleConstructorReturn(this, (CODE128.__proto__ || Object.getPrototypeOf(CODE128)).call(this, data.substring(1), options));

		_this.bytes = data.split('').map(function (char) {
			return char.charCodeAt(0);
		});
		return _this;
	}

	_createClass(CODE128, [{
		key: 'valid',
		value: function valid() {
			// ASCII value ranges 0-127, 200-211
			return (/^[\x00-\x7F\xC8-\xD3]+$/.test(this.data)
			);
		}

		// The public encoding function

	}, {
		key: 'encode',
		value: function encode() {
			var bytes = this.bytes;
			// Remove the start code from the bytes and set its index
			var startIndex = bytes.shift() - 105;
			// Get start set by index
			var startSet = _constants.SET_BY_CODE[startIndex];

			if (startSet === undefined) {
				throw new RangeError('The encoding does not start with a start character.');
			}

			if (this.shouldEncodeAsEan128() === true) {
				bytes.unshift(_constants.FNC1);
			}

			// Start encode with the right type
			var encodingResult = CODE128.next(bytes, 1, startSet);

			return {
				text: this.text === this.data ? this.text.replace(/[^\x20-\x7E]/g, '') : this.text,
				data:
				// Add the start bits
				CODE128.getBar(startIndex) +
				// Add the encoded bits
				encodingResult.result +
				// Add the checksum
				CODE128.getBar((encodingResult.checksum + startIndex) % _constants.MODULO) +
				// Add the end bits
				CODE128.getBar(_constants.STOP)
			};
		}

		// GS1-128/EAN-128

	}, {
		key: 'shouldEncodeAsEan128',
		value: function shouldEncodeAsEan128() {
			var isEAN128 = this.options.ean128 || false;
			if (typeof isEAN128 === 'string') {
				isEAN128 = isEAN128.toLowerCase() === 'true';
			}
			return isEAN128;
		}

		// Get a bar symbol by index

	}], [{
		key: 'getBar',
		value: function getBar(index) {
			return _constants.BARS[index] ? _constants.BARS[index].toString() : '';
		}

		// Correct an index by a set and shift it from the bytes array

	}, {
		key: 'correctIndex',
		value: function correctIndex(bytes, set) {
			if (set === _constants.SET_A) {
				var charCode = bytes.shift();
				return charCode < 32 ? charCode + 64 : charCode - 32;
			} else if (set === _constants.SET_B) {
				return bytes.shift() - 32;
			} else {
				return (bytes.shift() - 48) * 10 + bytes.shift() - 48;
			}
		}
	}, {
		key: 'next',
		value: function next(bytes, pos, set) {
			if (!bytes.length) {
				return { result: '', checksum: 0 };
			}

			var nextCode = void 0,
			    index = void 0;

			// Special characters
			if (bytes[0] >= 200) {
				index = bytes.shift() - 105;
				var nextSet = _constants.SWAP[index];

				// Swap to other set
				if (nextSet !== undefined) {
					nextCode = CODE128.next(bytes, pos + 1, nextSet);
				}
				// Continue on current set but encode a special character
				else {
						// Shift
						if ((set === _constants.SET_A || set === _constants.SET_B) && index === _constants.SHIFT) {
							// Convert the next character so that is encoded correctly
							bytes[0] = set === _constants.SET_A ? bytes[0] > 95 ? bytes[0] - 96 : bytes[0] : bytes[0] < 32 ? bytes[0] + 96 : bytes[0];
						}
						nextCode = CODE128.next(bytes, pos + 1, set);
					}
			}
			// Continue encoding
			else {
					index = CODE128.correctIndex(bytes, set);
					nextCode = CODE128.next(bytes, pos + 1, set);
				}

			// Get the correct binary encoding and calculate the weight
			var enc = CODE128.getBar(index);
			var weight = index * pos;

			return {
				result: enc + nextCode.result,
				checksum: weight + nextCode.checksum
			};
		}
	}]);

	return CODE128;
}(_Barcode3.default);

exports["default"] = CODE128;

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _SET_BY_CODE;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// constants for internal usage
var SET_A = exports.SET_A = 0;
var SET_B = exports.SET_B = 1;
var SET_C = exports.SET_C = 2;

// Special characters
var SHIFT = exports.SHIFT = 98;
var START_A = exports.START_A = 103;
var START_B = exports.START_B = 104;
var START_C = exports.START_C = 105;
var MODULO = exports.MODULO = 103;
var STOP = exports.STOP = 106;
var FNC1 = exports.FNC1 = 207;

// Get set by start code
var SET_BY_CODE = exports.SET_BY_CODE = (_SET_BY_CODE = {}, _defineProperty(_SET_BY_CODE, START_A, SET_A), _defineProperty(_SET_BY_CODE, START_B, SET_B), _defineProperty(_SET_BY_CODE, START_C, SET_C), _SET_BY_CODE);

// Get next set by code
var SWAP = exports.SWAP = {
	101: SET_A,
	100: SET_B,
	99: SET_C
};

var A_START_CHAR = exports.A_START_CHAR = String.fromCharCode(208); // START_A + 105
var B_START_CHAR = exports.B_START_CHAR = String.fromCharCode(209); // START_B + 105
var C_START_CHAR = exports.C_START_CHAR = String.fromCharCode(210); // START_C + 105

// 128A (Code Set A)
// ASCII characters 00 to 95 (0–9, A–Z and control codes), special characters, and FNC 1–4
var A_CHARS = exports.A_CHARS = "[\x00-\x5F\xC8-\xCF]";

// 128B (Code Set B)
// ASCII characters 32 to 127 (0–9, A–Z, a–z), special characters, and FNC 1–4
var B_CHARS = exports.B_CHARS = "[\x20-\x7F\xC8-\xCF]";

// 128C (Code Set C)
// 00–99 (encodes two digits with a single code point) and FNC1
var C_CHARS = exports.C_CHARS = "(\xCF*[0-9]{2}\xCF*)";

// CODE128 includes 107 symbols:
// 103 data symbols, 3 start symbols (A, B and C), and 1 stop symbol (the last one)
// Each symbol consist of three black bars (1) and three white spaces (0).
var BARS = exports.BARS = [11011001100, 11001101100, 11001100110, 10010011000, 10010001100, 10001001100, 10011001000, 10011000100, 10001100100, 11001001000, 11001000100, 11000100100, 10110011100, 10011011100, 10011001110, 10111001100, 10011101100, 10011100110, 11001110010, 11001011100, 11001001110, 11011100100, 11001110100, 11101101110, 11101001100, 11100101100, 11100100110, 11101100100, 11100110100, 11100110010, 11011011000, 11011000110, 11000110110, 10100011000, 10001011000, 10001000110, 10110001000, 10001101000, 10001100010, 11010001000, 11000101000, 11000100010, 10110111000, 10110001110, 10001101110, 10111011000, 10111000110, 10001110110, 11101110110, 11010001110, 11000101110, 11011101000, 11011100010, 11011101110, 11101011000, 11101000110, 11100010110, 11101101000, 11101100010, 11100011010, 11101111010, 11001000010, 11110001010, 10100110000, 10100001100, 10010110000, 10010000110, 10000101100, 10000100110, 10110010000, 10110000100, 10011010000, 10011000010, 10000110100, 10000110010, 11000010010, 11001010000, 11110111010, 11000010100, 10001111010, 10100111100, 10010111100, 10010011110, 10111100100, 10011110100, 10011110010, 11110100100, 11110010100, 11110010010, 11011011110, 11011110110, 11110110110, 10101111000, 10100011110, 10001011110, 10111101000, 10111100010, 11110101000, 11110100010, 10111011110, 10111101110, 11101011110, 11110101110, 11010000100, 11010010000, 11010011100, 1100011101011];

/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _constants = __webpack_require__(13);

// Match Set functions
var matchSetALength = function matchSetALength(string) {
	return string.match(new RegExp('^' + _constants.A_CHARS + '*'))[0].length;
};
var matchSetBLength = function matchSetBLength(string) {
	return string.match(new RegExp('^' + _constants.B_CHARS + '*'))[0].length;
};
var matchSetC = function matchSetC(string) {
	return string.match(new RegExp('^' + _constants.C_CHARS + '*'))[0];
};

// CODE128A or CODE128B
function autoSelectFromAB(string, isA) {
	var ranges = isA ? _constants.A_CHARS : _constants.B_CHARS;
	var untilC = string.match(new RegExp('^(' + ranges + '+?)(([0-9]{2}){2,})([^0-9]|$)'));

	if (untilC) {
		return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
	}

	var chars = string.match(new RegExp('^' + ranges + '+'))[0];

	if (chars.length === string.length) {
		return string;
	}

	return chars + String.fromCharCode(isA ? 205 : 206) + autoSelectFromAB(string.substring(chars.length), !isA);
}

// CODE128C
function autoSelectFromC(string) {
	var cMatch = matchSetC(string);
	var length = cMatch.length;

	if (length === string.length) {
		return string;
	}

	string = string.substring(length);

	// Select A/B depending on the longest match
	var isA = matchSetALength(string) >= matchSetBLength(string);
	return cMatch + String.fromCharCode(isA ? 206 : 205) + autoSelectFromAB(string, isA);
}

// Detect Code Set (A, B or C) and format the string

exports["default"] = function (string) {
	var newString = void 0;
	var cLength = matchSetC(string).length;

	// Select 128C if the string start with enough digits
	if (cLength >= 2) {
		newString = _constants.C_START_CHAR + autoSelectFromC(string);
	} else {
		// Select A/B depending on the longest match
		var isA = matchSetALength(string) > matchSetBLength(string);
		newString = (isA ? _constants.A_START_CHAR : _constants.B_START_CHAR) + autoSelectFromAB(string, isA);
	}

	return newString.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, // Any sequence between 205 and 206 characters
	function (match, char) {
		return String.fromCharCode(203) + char;
	});
};

/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CODE2 = __webpack_require__(12);

var _CODE3 = _interopRequireDefault(_CODE2);

var _constants = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODE128A = function (_CODE) {
	_inherits(CODE128A, _CODE);

	function CODE128A(string, options) {
		_classCallCheck(this, CODE128A);

		return _possibleConstructorReturn(this, (CODE128A.__proto__ || Object.getPrototypeOf(CODE128A)).call(this, _constants.A_START_CHAR + string, options));
	}

	_createClass(CODE128A, [{
		key: 'valid',
		value: function valid() {
			return new RegExp('^' + _constants.A_CHARS + '+$').test(this.data);
		}
	}]);

	return CODE128A;
}(_CODE3.default);

exports["default"] = CODE128A;

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CODE2 = __webpack_require__(12);

var _CODE3 = _interopRequireDefault(_CODE2);

var _constants = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODE128B = function (_CODE) {
	_inherits(CODE128B, _CODE);

	function CODE128B(string, options) {
		_classCallCheck(this, CODE128B);

		return _possibleConstructorReturn(this, (CODE128B.__proto__ || Object.getPrototypeOf(CODE128B)).call(this, _constants.B_START_CHAR + string, options));
	}

	_createClass(CODE128B, [{
		key: 'valid',
		value: function valid() {
			return new RegExp('^' + _constants.B_CHARS + '+$').test(this.data);
		}
	}]);

	return CODE128B;
}(_CODE3.default);

exports["default"] = CODE128B;

/***/ }),
/* 17 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CODE2 = __webpack_require__(12);

var _CODE3 = _interopRequireDefault(_CODE2);

var _constants = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CODE128C = function (_CODE) {
	_inherits(CODE128C, _CODE);

	function CODE128C(string, options) {
		_classCallCheck(this, CODE128C);

		return _possibleConstructorReturn(this, (CODE128C.__proto__ || Object.getPrototypeOf(CODE128C)).call(this, _constants.C_START_CHAR + string, options));
	}

	_createClass(CODE128C, [{
		key: 'valid',
		value: function valid() {
			return new RegExp('^' + _constants.C_CHARS + '+$').test(this.data);
		}
	}]);

	return CODE128C;
}(_CODE3.default);

exports["default"] = CODE128C;

/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.UPCE = exports.UPC = exports.EAN2 = exports.EAN5 = exports.EAN8 = exports.EAN13 = undefined;

var _EAN = __webpack_require__(19);

var _EAN2 = _interopRequireDefault(_EAN);

var _EAN3 = __webpack_require__(23);

var _EAN4 = _interopRequireDefault(_EAN3);

var _EAN5 = __webpack_require__(24);

var _EAN6 = _interopRequireDefault(_EAN5);

var _EAN7 = __webpack_require__(25);

var _EAN8 = _interopRequireDefault(_EAN7);

var _UPC = __webpack_require__(26);

var _UPC2 = _interopRequireDefault(_UPC);

var _UPCE = __webpack_require__(27);

var _UPCE2 = _interopRequireDefault(_UPCE);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.EAN13 = _EAN2.default;
exports.EAN8 = _EAN4.default;
exports.EAN5 = _EAN6.default;
exports.EAN2 = _EAN8.default;
exports.UPC = _UPC2.default;
exports.UPCE = _UPCE2.default;

/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _constants = __webpack_require__(20);

var _EAN2 = __webpack_require__(21);

var _EAN3 = _interopRequireDefault(_EAN2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Binary_encoding_of_data_digits_into_EAN-13_barcode

// Calculate the checksum digit
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit
var checksum = function checksum(number) {
	var res = number.substr(0, 12).split('').map(function (n) {
		return +n;
	}).reduce(function (sum, a, idx) {
		return idx % 2 ? sum + a * 3 : sum + a;
	}, 0);

	return (10 - res % 10) % 10;
};

var EAN13 = function (_EAN) {
	_inherits(EAN13, _EAN);

	function EAN13(data, options) {
		_classCallCheck(this, EAN13);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{12}$/) !== -1) {
			data += checksum(data);
		}

		// Adds a last character to the end of the barcode
		var _this = _possibleConstructorReturn(this, (EAN13.__proto__ || Object.getPrototypeOf(EAN13)).call(this, data, options));

		_this.lastChar = options.lastChar;
		return _this;
	}

	_createClass(EAN13, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^[0-9]{13}$/) !== -1 && +this.data[12] === checksum(this.data);
		}
	}, {
		key: 'leftText',
		value: function leftText() {
			return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'leftText', this).call(this, 1, 6);
		}
	}, {
		key: 'leftEncode',
		value: function leftEncode() {
			var data = this.data.substr(1, 6);
			var structure = _constants.EAN13_STRUCTURE[this.data[0]];
			return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'leftEncode', this).call(this, data, structure);
		}
	}, {
		key: 'rightText',
		value: function rightText() {
			return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'rightText', this).call(this, 7, 6);
		}
	}, {
		key: 'rightEncode',
		value: function rightEncode() {
			var data = this.data.substr(7, 6);
			return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'rightEncode', this).call(this, data, 'RRRRRR');
		}

		// The "standard" way of printing EAN13 barcodes with guard bars

	}, {
		key: 'encodeGuarded',
		value: function encodeGuarded() {
			var data = _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'encodeGuarded', this).call(this);

			// Extend data with left digit & last character
			if (this.options.displayValue) {
				data.unshift({
					data: '000000000000',
					text: this.text.substr(0, 1),
					options: { textAlign: 'left', fontSize: this.fontSize }
				});

				if (this.options.lastChar) {
					data.push({
						data: '00'
					});
					data.push({
						data: '00000',
						text: this.options.lastChar,
						options: { fontSize: this.fontSize }
					});
				}
			}

			return data;
		}
	}]);

	return EAN13;
}(_EAN3.default);

exports["default"] = EAN13;

/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));
// Standard start end and middle bits
var SIDE_BIN = exports.SIDE_BIN = '101';
var MIDDLE_BIN = exports.MIDDLE_BIN = '01010';

var BINARIES = exports.BINARIES = {
	'L': [// The L (left) type of encoding
	'0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'],
	'G': [// The G type of encoding
	'0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111'],
	'R': [// The R (right) type of encoding
	'1110010', '1100110', '1101100', '1000010', '1011100', '1001110', '1010000', '1000100', '1001000', '1110100'],
	'O': [// The O (odd) encoding for UPC-E
	'0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'],
	'E': [// The E (even) encoding for UPC-E
	'0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111']
};

// Define the EAN-2 structure
var EAN2_STRUCTURE = exports.EAN2_STRUCTURE = ['LL', 'LG', 'GL', 'GG'];

// Define the EAN-5 structure
var EAN5_STRUCTURE = exports.EAN5_STRUCTURE = ['GGLLL', 'GLGLL', 'GLLGL', 'GLLLG', 'LGGLL', 'LLGGL', 'LLLGG', 'LGLGL', 'LGLLG', 'LLGLG'];

// Define the EAN-13 structure
var EAN13_STRUCTURE = exports.EAN13_STRUCTURE = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];

/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(20);

var _encoder = __webpack_require__(22);

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__(9);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Base class for EAN8 & EAN13
var EAN = function (_Barcode) {
	_inherits(EAN, _Barcode);

	function EAN(data, options) {
		_classCallCheck(this, EAN);

		// Make sure the font is not bigger than the space between the guard bars
		var _this = _possibleConstructorReturn(this, (EAN.__proto__ || Object.getPrototypeOf(EAN)).call(this, data, options));

		_this.fontSize = !options.flat && options.fontSize > options.width * 10 ? options.width * 10 : options.fontSize;

		// Make the guard bars go down half the way of the text
		_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
		return _this;
	}

	_createClass(EAN, [{
		key: 'encode',
		value: function encode() {
			return this.options.flat ? this.encodeFlat() : this.encodeGuarded();
		}
	}, {
		key: 'leftText',
		value: function leftText(from, to) {
			return this.text.substr(from, to);
		}
	}, {
		key: 'leftEncode',
		value: function leftEncode(data, structure) {
			return (0, _encoder2.default)(data, structure);
		}
	}, {
		key: 'rightText',
		value: function rightText(from, to) {
			return this.text.substr(from, to);
		}
	}, {
		key: 'rightEncode',
		value: function rightEncode(data, structure) {
			return (0, _encoder2.default)(data, structure);
		}
	}, {
		key: 'encodeGuarded',
		value: function encodeGuarded() {
			var textOptions = { fontSize: this.fontSize };
			var guardOptions = { height: this.guardHeight };

			return [{ data: _constants.SIDE_BIN, options: guardOptions }, { data: this.leftEncode(), text: this.leftText(), options: textOptions }, { data: _constants.MIDDLE_BIN, options: guardOptions }, { data: this.rightEncode(), text: this.rightText(), options: textOptions }, { data: _constants.SIDE_BIN, options: guardOptions }];
		}
	}, {
		key: 'encodeFlat',
		value: function encodeFlat() {
			var data = [_constants.SIDE_BIN, this.leftEncode(), _constants.MIDDLE_BIN, this.rightEncode(), _constants.SIDE_BIN];

			return {
				data: data.join(''),
				text: this.text
			};
		}
	}]);

	return EAN;
}(_Barcode3.default);

exports["default"] = EAN;

/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _constants = __webpack_require__(20);

// Encode data string
var encode = function encode(data, structure, separator) {
	var encoded = data.split('').map(function (val, idx) {
		return _constants.BINARIES[structure[idx]];
	}).map(function (val, idx) {
		return val ? val[data[idx]] : '';
	});

	if (separator) {
		var last = data.length - 1;
		encoded = encoded.map(function (val, idx) {
			return idx < last ? val + separator : val;
		});
	}

	return encoded.join('');
};

exports["default"] = encode;

/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _EAN2 = __webpack_require__(21);

var _EAN3 = _interopRequireDefault(_EAN2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// http://www.barcodeisland.com/ean8.phtml

// Calculate the checksum digit
var checksum = function checksum(number) {
	var res = number.substr(0, 7).split('').map(function (n) {
		return +n;
	}).reduce(function (sum, a, idx) {
		return idx % 2 ? sum + a : sum + a * 3;
	}, 0);

	return (10 - res % 10) % 10;
};

var EAN8 = function (_EAN) {
	_inherits(EAN8, _EAN);

	function EAN8(data, options) {
		_classCallCheck(this, EAN8);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{7}$/) !== -1) {
			data += checksum(data);
		}

		return _possibleConstructorReturn(this, (EAN8.__proto__ || Object.getPrototypeOf(EAN8)).call(this, data, options));
	}

	_createClass(EAN8, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^[0-9]{8}$/) !== -1 && +this.data[7] === checksum(this.data);
		}
	}, {
		key: 'leftText',
		value: function leftText() {
			return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'leftText', this).call(this, 0, 4);
		}
	}, {
		key: 'leftEncode',
		value: function leftEncode() {
			var data = this.data.substr(0, 4);
			return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'leftEncode', this).call(this, data, 'LLLL');
		}
	}, {
		key: 'rightText',
		value: function rightText() {
			return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'rightText', this).call(this, 4, 4);
		}
	}, {
		key: 'rightEncode',
		value: function rightEncode() {
			var data = this.data.substr(4, 4);
			return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'rightEncode', this).call(this, data, 'RRRR');
		}
	}]);

	return EAN8;
}(_EAN3.default);

exports["default"] = EAN8;

/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(20);

var _encoder = __webpack_require__(22);

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__(9);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/EAN_5#Encoding

var checksum = function checksum(data) {
	var result = data.split('').map(function (n) {
		return +n;
	}).reduce(function (sum, a, idx) {
		return idx % 2 ? sum + a * 9 : sum + a * 3;
	}, 0);
	return result % 10;
};

var EAN5 = function (_Barcode) {
	_inherits(EAN5, _Barcode);

	function EAN5(data, options) {
		_classCallCheck(this, EAN5);

		return _possibleConstructorReturn(this, (EAN5.__proto__ || Object.getPrototypeOf(EAN5)).call(this, data, options));
	}

	_createClass(EAN5, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^[0-9]{5}$/) !== -1;
		}
	}, {
		key: 'encode',
		value: function encode() {
			var structure = _constants.EAN5_STRUCTURE[checksum(this.data)];
			return {
				data: '1011' + (0, _encoder2.default)(this.data, structure, '01'),
				text: this.text
			};
		}
	}]);

	return EAN5;
}(_Barcode3.default);

exports["default"] = EAN5;

/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(20);

var _encoder = __webpack_require__(22);

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__(9);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/EAN_2#Encoding

var EAN2 = function (_Barcode) {
	_inherits(EAN2, _Barcode);

	function EAN2(data, options) {
		_classCallCheck(this, EAN2);

		return _possibleConstructorReturn(this, (EAN2.__proto__ || Object.getPrototypeOf(EAN2)).call(this, data, options));
	}

	_createClass(EAN2, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^[0-9]{2}$/) !== -1;
		}
	}, {
		key: 'encode',
		value: function encode() {
			// Choose the structure based on the number mod 4
			var structure = _constants.EAN2_STRUCTURE[parseInt(this.data) % 4];
			return {
				// Start bits + Encode the two digits with 01 in between
				data: '1011' + (0, _encoder2.default)(this.data, structure, '01'),
				text: this.text
			};
		}
	}]);

	return EAN2;
}(_Barcode3.default);

exports["default"] = EAN2;

/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.checksum = checksum;

var _encoder = __webpack_require__(22);

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__(9);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding

var UPC = function (_Barcode) {
	_inherits(UPC, _Barcode);

	function UPC(data, options) {
		_classCallCheck(this, UPC);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{11}$/) !== -1) {
			data += checksum(data);
		}

		var _this = _possibleConstructorReturn(this, (UPC.__proto__ || Object.getPrototypeOf(UPC)).call(this, data, options));

		_this.displayValue = options.displayValue;

		// Make sure the font is not bigger than the space between the guard bars
		if (options.fontSize > options.width * 10) {
			_this.fontSize = options.width * 10;
		} else {
			_this.fontSize = options.fontSize;
		}

		// Make the guard bars go down half the way of the text
		_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
		return _this;
	}

	_createClass(UPC, [{
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9]{12}$/) !== -1 && this.data[11] == checksum(this.data);
		}
	}, {
		key: "encode",
		value: function encode() {
			if (this.options.flat) {
				return this.flatEncoding();
			} else {
				return this.guardedEncoding();
			}
		}
	}, {
		key: "flatEncoding",
		value: function flatEncoding() {
			var result = "";

			result += "101";
			result += (0, _encoder2.default)(this.data.substr(0, 6), "LLLLLL");
			result += "01010";
			result += (0, _encoder2.default)(this.data.substr(6, 6), "RRRRRR");
			result += "101";

			return {
				data: result,
				text: this.text
			};
		}
	}, {
		key: "guardedEncoding",
		value: function guardedEncoding() {
			var result = [];

			// Add the first digit
			if (this.displayValue) {
				result.push({
					data: "00000000",
					text: this.text.substr(0, 1),
					options: { textAlign: "left", fontSize: this.fontSize }
				});
			}

			// Add the guard bars
			result.push({
				data: "101" + (0, _encoder2.default)(this.data[0], "L"),
				options: { height: this.guardHeight }
			});

			// Add the left side
			result.push({
				data: (0, _encoder2.default)(this.data.substr(1, 5), "LLLLL"),
				text: this.text.substr(1, 5),
				options: { fontSize: this.fontSize }
			});

			// Add the middle bits
			result.push({
				data: "01010",
				options: { height: this.guardHeight }
			});

			// Add the right side
			result.push({
				data: (0, _encoder2.default)(this.data.substr(6, 5), "RRRRR"),
				text: this.text.substr(6, 5),
				options: { fontSize: this.fontSize }
			});

			// Add the end bits
			result.push({
				data: (0, _encoder2.default)(this.data[11], "R") + "101",
				options: { height: this.guardHeight }
			});

			// Add the last digit
			if (this.displayValue) {
				result.push({
					data: "00000000",
					text: this.text.substr(11, 1),
					options: { textAlign: "right", fontSize: this.fontSize }
				});
			}

			return result;
		}
	}]);

	return UPC;
}(_Barcode3.default);

// Calulate the checksum digit
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit


function checksum(number) {
	var result = 0;

	var i;
	for (i = 1; i < 11; i += 2) {
		result += parseInt(number[i]);
	}
	for (i = 0; i < 11; i += 2) {
		result += parseInt(number[i]) * 3;
	}

	return (10 - result % 10) % 10;
}

exports["default"] = UPC;

/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _encoder = __webpack_require__(22);

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__(9);

var _Barcode3 = _interopRequireDefault(_Barcode2);

var _UPC = __webpack_require__(26);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding
//
// UPC-E documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#UPC-E

var EXPANSIONS = ["XX00000XXX", "XX10000XXX", "XX20000XXX", "XXX00000XX", "XXXX00000X", "XXXXX00005", "XXXXX00006", "XXXXX00007", "XXXXX00008", "XXXXX00009"];

var PARITIES = [["EEEOOO", "OOOEEE"], ["EEOEOO", "OOEOEE"], ["EEOOEO", "OOEEOE"], ["EEOOOE", "OOEEEO"], ["EOEEOO", "OEOOEE"], ["EOOEEO", "OEEOOE"], ["EOOOEE", "OEEEOO"], ["EOEOEO", "OEOEOE"], ["EOEOOE", "OEOEEO"], ["EOOEOE", "OEEOEO"]];

var UPCE = function (_Barcode) {
	_inherits(UPCE, _Barcode);

	function UPCE(data, options) {
		_classCallCheck(this, UPCE);

		var _this = _possibleConstructorReturn(this, (UPCE.__proto__ || Object.getPrototypeOf(UPCE)).call(this, data, options));
		// Code may be 6 or 8 digits;
		// A 7 digit code is ambiguous as to whether the extra digit
		// is a UPC-A check or number system digit.


		_this.isValid = false;
		if (data.search(/^[0-9]{6}$/) !== -1) {
			_this.middleDigits = data;
			_this.upcA = expandToUPCA(data, "0");
			_this.text = options.text || '' + _this.upcA[0] + data + _this.upcA[_this.upcA.length - 1];
			_this.isValid = true;
		} else if (data.search(/^[01][0-9]{7}$/) !== -1) {
			_this.middleDigits = data.substring(1, data.length - 1);
			_this.upcA = expandToUPCA(_this.middleDigits, data[0]);

			if (_this.upcA[_this.upcA.length - 1] === data[data.length - 1]) {
				_this.isValid = true;
			} else {
				// checksum mismatch
				return _possibleConstructorReturn(_this);
			}
		} else {
			return _possibleConstructorReturn(_this);
		}

		_this.displayValue = options.displayValue;

		// Make sure the font is not bigger than the space between the guard bars
		if (options.fontSize > options.width * 10) {
			_this.fontSize = options.width * 10;
		} else {
			_this.fontSize = options.fontSize;
		}

		// Make the guard bars go down half the way of the text
		_this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
		return _this;
	}

	_createClass(UPCE, [{
		key: 'valid',
		value: function valid() {
			return this.isValid;
		}
	}, {
		key: 'encode',
		value: function encode() {
			if (this.options.flat) {
				return this.flatEncoding();
			} else {
				return this.guardedEncoding();
			}
		}
	}, {
		key: 'flatEncoding',
		value: function flatEncoding() {
			var result = "";

			result += "101";
			result += this.encodeMiddleDigits();
			result += "010101";

			return {
				data: result,
				text: this.text
			};
		}
	}, {
		key: 'guardedEncoding',
		value: function guardedEncoding() {
			var result = [];

			// Add the UPC-A number system digit beneath the quiet zone
			if (this.displayValue) {
				result.push({
					data: "00000000",
					text: this.text[0],
					options: { textAlign: "left", fontSize: this.fontSize }
				});
			}

			// Add the guard bars
			result.push({
				data: "101",
				options: { height: this.guardHeight }
			});

			// Add the 6 UPC-E digits
			result.push({
				data: this.encodeMiddleDigits(),
				text: this.text.substring(1, 7),
				options: { fontSize: this.fontSize }
			});

			// Add the end bits
			result.push({
				data: "010101",
				options: { height: this.guardHeight }
			});

			// Add the UPC-A check digit beneath the quiet zone
			if (this.displayValue) {
				result.push({
					data: "00000000",
					text: this.text[7],
					options: { textAlign: "right", fontSize: this.fontSize }
				});
			}

			return result;
		}
	}, {
		key: 'encodeMiddleDigits',
		value: function encodeMiddleDigits() {
			var numberSystem = this.upcA[0];
			var checkDigit = this.upcA[this.upcA.length - 1];
			var parity = PARITIES[parseInt(checkDigit)][parseInt(numberSystem)];
			return (0, _encoder2.default)(this.middleDigits, parity);
		}
	}]);

	return UPCE;
}(_Barcode3.default);

function expandToUPCA(middleDigits, numberSystem) {
	var lastUpcE = parseInt(middleDigits[middleDigits.length - 1]);
	var expansion = EXPANSIONS[lastUpcE];

	var result = "";
	var digitIndex = 0;
	for (var i = 0; i < expansion.length; i++) {
		var c = expansion[i];
		if (c === 'X') {
			result += middleDigits[digitIndex++];
		} else {
			result += c;
		}
	}

	result = '' + numberSystem + result;
	return '' + result + (0, _UPC.checksum)(result);
}

exports["default"] = UPCE;

/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ITF14 = exports.ITF = undefined;

var _ITF = __webpack_require__(29);

var _ITF2 = _interopRequireDefault(_ITF);

var _ITF3 = __webpack_require__(31);

var _ITF4 = _interopRequireDefault(_ITF3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ITF = _ITF2.default;
exports.ITF14 = _ITF4.default;

/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(30);

var _Barcode2 = __webpack_require__(9);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ITF = function (_Barcode) {
	_inherits(ITF, _Barcode);

	function ITF() {
		_classCallCheck(this, ITF);

		return _possibleConstructorReturn(this, (ITF.__proto__ || Object.getPrototypeOf(ITF)).apply(this, arguments));
	}

	_createClass(ITF, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^([0-9]{2})+$/) !== -1;
		}
	}, {
		key: 'encode',
		value: function encode() {
			var _this2 = this;

			// Calculate all the digit pairs
			var encoded = this.data.match(/.{2}/g).map(function (pair) {
				return _this2.encodePair(pair);
			}).join('');

			return {
				data: _constants.START_BIN + encoded + _constants.END_BIN,
				text: this.text
			};
		}

		// Calculate the data of a number pair

	}, {
		key: 'encodePair',
		value: function encodePair(pair) {
			var second = _constants.BINARIES[pair[1]];

			return _constants.BINARIES[pair[0]].split('').map(function (first, idx) {
				return (first === '1' ? '111' : '1') + (second[idx] === '1' ? '000' : '0');
			}).join('');
		}
	}]);

	return ITF;
}(_Barcode3.default);

exports["default"] = ITF;

/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));
var START_BIN = exports.START_BIN = '1010';
var END_BIN = exports.END_BIN = '11101';

var BINARIES = exports.BINARIES = ['00110', '10001', '01001', '11000', '00101', '10100', '01100', '00011', '10010', '01010'];

/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ITF2 = __webpack_require__(29);

var _ITF3 = _interopRequireDefault(_ITF2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Calculate the checksum digit
var checksum = function checksum(data) {
	var res = data.substr(0, 13).split('').map(function (num) {
		return parseInt(num, 10);
	}).reduce(function (sum, n, idx) {
		return sum + n * (3 - idx % 2 * 2);
	}, 0);

	return Math.ceil(res / 10) * 10 - res;
};

var ITF14 = function (_ITF) {
	_inherits(ITF14, _ITF);

	function ITF14(data, options) {
		_classCallCheck(this, ITF14);

		// Add checksum if it does not exist
		if (data.search(/^[0-9]{13}$/) !== -1) {
			data += checksum(data);
		}
		return _possibleConstructorReturn(this, (ITF14.__proto__ || Object.getPrototypeOf(ITF14)).call(this, data, options));
	}

	_createClass(ITF14, [{
		key: 'valid',
		value: function valid() {
			return this.data.search(/^[0-9]{14}$/) !== -1 && +this.data[13] === checksum(this.data);
		}
	}]);

	return ITF14;
}(_ITF3.default);

exports["default"] = ITF14;

/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MSI1110 = exports.MSI1010 = exports.MSI11 = exports.MSI10 = exports.MSI = undefined;

var _MSI = __webpack_require__(33);

var _MSI2 = _interopRequireDefault(_MSI);

var _MSI3 = __webpack_require__(34);

var _MSI4 = _interopRequireDefault(_MSI3);

var _MSI5 = __webpack_require__(36);

var _MSI6 = _interopRequireDefault(_MSI5);

var _MSI7 = __webpack_require__(37);

var _MSI8 = _interopRequireDefault(_MSI7);

var _MSI9 = __webpack_require__(38);

var _MSI10 = _interopRequireDefault(_MSI9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.MSI = _MSI2.default;
exports.MSI10 = _MSI4.default;
exports.MSI11 = _MSI6.default;
exports.MSI1010 = _MSI8.default;
exports.MSI1110 = _MSI10.default;

/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__(9);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation
// https://en.wikipedia.org/wiki/MSI_Barcode#Character_set_and_binary_lookup

var MSI = function (_Barcode) {
	_inherits(MSI, _Barcode);

	function MSI(data, options) {
		_classCallCheck(this, MSI);

		return _possibleConstructorReturn(this, (MSI.__proto__ || Object.getPrototypeOf(MSI)).call(this, data, options));
	}

	_createClass(MSI, [{
		key: "encode",
		value: function encode() {
			// Start bits
			var ret = "110";

			for (var i = 0; i < this.data.length; i++) {
				// Convert the character to binary (always 4 binary digits)
				var digit = parseInt(this.data[i]);
				var bin = digit.toString(2);
				bin = addZeroes(bin, 4 - bin.length);

				// Add 100 for every zero and 110 for every 1
				for (var b = 0; b < bin.length; b++) {
					ret += bin[b] == "0" ? "100" : "110";
				}
			}

			// End bits
			ret += "1001";

			return {
				data: ret,
				text: this.text
			};
		}
	}, {
		key: "valid",
		value: function valid() {
			return this.data.search(/^[0-9]+$/) !== -1;
		}
	}]);

	return MSI;
}(_Barcode3.default);

function addZeroes(number, n) {
	for (var i = 0; i < n; i++) {
		number = "0" + number;
	}
	return number;
}

exports["default"] = MSI;

/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _MSI2 = __webpack_require__(33);

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MSI10 = function (_MSI) {
	_inherits(MSI10, _MSI);

	function MSI10(data, options) {
		_classCallCheck(this, MSI10);

		return _possibleConstructorReturn(this, (MSI10.__proto__ || Object.getPrototypeOf(MSI10)).call(this, data + (0, _checksums.mod10)(data), options));
	}

	return MSI10;
}(_MSI3.default);

exports["default"] = MSI10;

/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.mod10 = mod10;
exports.mod11 = mod11;
function mod10(number) {
	var sum = 0;
	for (var i = 0; i < number.length; i++) {
		var n = parseInt(number[i]);
		if ((i + number.length) % 2 === 0) {
			sum += n;
		} else {
			sum += n * 2 % 10 + Math.floor(n * 2 / 10);
		}
	}
	return (10 - sum % 10) % 10;
}

function mod11(number) {
	var sum = 0;
	var weights = [2, 3, 4, 5, 6, 7];
	for (var i = 0; i < number.length; i++) {
		var n = parseInt(number[number.length - 1 - i]);
		sum += weights[i % weights.length] * n;
	}
	return (11 - sum % 11) % 11;
}

/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _MSI2 = __webpack_require__(33);

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MSI11 = function (_MSI) {
	_inherits(MSI11, _MSI);

	function MSI11(data, options) {
		_classCallCheck(this, MSI11);

		return _possibleConstructorReturn(this, (MSI11.__proto__ || Object.getPrototypeOf(MSI11)).call(this, data + (0, _checksums.mod11)(data), options));
	}

	return MSI11;
}(_MSI3.default);

exports["default"] = MSI11;

/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _MSI2 = __webpack_require__(33);

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MSI1010 = function (_MSI) {
	_inherits(MSI1010, _MSI);

	function MSI1010(data, options) {
		_classCallCheck(this, MSI1010);

		data += (0, _checksums.mod10)(data);
		data += (0, _checksums.mod10)(data);
		return _possibleConstructorReturn(this, (MSI1010.__proto__ || Object.getPrototypeOf(MSI1010)).call(this, data, options));
	}

	return MSI1010;
}(_MSI3.default);

exports["default"] = MSI1010;

/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _MSI2 = __webpack_require__(33);

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MSI1110 = function (_MSI) {
	_inherits(MSI1110, _MSI);

	function MSI1110(data, options) {
		_classCallCheck(this, MSI1110);

		data += (0, _checksums.mod11)(data);
		data += (0, _checksums.mod10)(data);
		return _possibleConstructorReturn(this, (MSI1110.__proto__ || Object.getPrototypeOf(MSI1110)).call(this, data, options));
	}

	return MSI1110;
}(_MSI3.default);

exports["default"] = MSI1110;

/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.pharmacode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__(9);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding documentation
// http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf

var pharmacode = function (_Barcode) {
	_inherits(pharmacode, _Barcode);

	function pharmacode(data, options) {
		_classCallCheck(this, pharmacode);

		var _this = _possibleConstructorReturn(this, (pharmacode.__proto__ || Object.getPrototypeOf(pharmacode)).call(this, data, options));

		_this.number = parseInt(data, 10);
		return _this;
	}

	_createClass(pharmacode, [{
		key: "encode",
		value: function encode() {
			var z = this.number;
			var result = "";

			// http://i.imgur.com/RMm4UDJ.png
			// (source: http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf, page: 34)
			while (!isNaN(z) && z != 0) {
				if (z % 2 === 0) {
					// Even
					result = "11100" + result;
					z = (z - 2) / 2;
				} else {
					// Odd
					result = "100" + result;
					z = (z - 1) / 2;
				}
			}

			// Remove the two last zeroes
			result = result.slice(0, -2);

			return {
				data: result,
				text: this.text
			};
		}
	}, {
		key: "valid",
		value: function valid() {
			return this.number >= 3 && this.number <= 131070;
		}
	}]);

	return pharmacode;
}(_Barcode3.default);

exports.pharmacode = pharmacode;

/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.codabar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__(9);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Encoding specification:
// http://www.barcodeisland.com/codabar.phtml

var codabar = function (_Barcode) {
	_inherits(codabar, _Barcode);

	function codabar(data, options) {
		_classCallCheck(this, codabar);

		if (data.search(/^[0-9\-\$\:\.\+\/]+$/) === 0) {
			data = "A" + data + "A";
		}

		var _this = _possibleConstructorReturn(this, (codabar.__proto__ || Object.getPrototypeOf(codabar)).call(this, data.toUpperCase(), options));

		_this.text = _this.options.text || _this.text.replace(/[A-D]/g, '');
		return _this;
	}

	_createClass(codabar, [{
		key: "valid",
		value: function valid() {
			return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/) !== -1;
		}
	}, {
		key: "encode",
		value: function encode() {
			var result = [];
			var encodings = this.getEncodings();
			for (var i = 0; i < this.data.length; i++) {
				result.push(encodings[this.data.charAt(i)]);
				// for all characters except the last, append a narrow-space ("0")
				if (i !== this.data.length - 1) {
					result.push("0");
				}
			}
			return {
				text: this.text,
				data: result.join('')
			};
		}
	}, {
		key: "getEncodings",
		value: function getEncodings() {
			return {
				"0": "101010011",
				"1": "101011001",
				"2": "101001011",
				"3": "110010101",
				"4": "101101001",
				"5": "110101001",
				"6": "100101011",
				"7": "100101101",
				"8": "100110101",
				"9": "110100101",
				"-": "101001101",
				"$": "101100101",
				":": "1101011011",
				"/": "1101101011",
				".": "1101101101",
				"+": "1011011011",
				"A": "1011001001",
				"B": "1001001011",
				"C": "1010010011",
				"D": "1010011001"
			};
		}
	}]);

	return codabar;
}(_Barcode3.default);

exports.codabar = codabar;

/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.GenericBarcode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Barcode2 = __webpack_require__(9);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GenericBarcode = function (_Barcode) {
	_inherits(GenericBarcode, _Barcode);

	function GenericBarcode(data, options) {
		_classCallCheck(this, GenericBarcode);

		return _possibleConstructorReturn(this, (GenericBarcode.__proto__ || Object.getPrototypeOf(GenericBarcode)).call(this, data, options)); // Sets this.data and this.text
	}

	// Return the corresponding binary numbers for the data provided


	_createClass(GenericBarcode, [{
		key: "encode",
		value: function encode() {
			return {
				data: "10101010101010101010101010101010101010101",
				text: this.text
			};
		}

		// Resturn true/false if the string provided is valid for this encoder

	}, {
		key: "valid",
		value: function valid() {
			return true;
		}
	}]);

	return GenericBarcode;
}(_Barcode3.default);

exports.GenericBarcode = GenericBarcode;

/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = function (old, replaceObj) {
  return _extends({}, old, replaceObj);
};

/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports["default"] = linearizeEncodings;

// Encodings can be nestled like [[1-1, 1-2], 2, [3-1, 3-2]
// Convert to [1-1, 1-2, 2, 3-1, 3-2]

function linearizeEncodings(encodings) {
	var linearEncodings = [];
	function nextLevel(encoded) {
		if (Array.isArray(encoded)) {
			for (var i = 0; i < encoded.length; i++) {
				nextLevel(encoded[i]);
			}
		} else {
			encoded.text = encoded.text || "";
			encoded.data = encoded.data || "";
			linearEncodings.push(encoded);
		}
	}
	nextLevel(encodings);

	return linearEncodings;
}

/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports["default"] = fixOptions;


function fixOptions(options) {
	// Fix the margins
	options.marginTop = options.marginTop || options.margin;
	options.marginBottom = options.marginBottom || options.margin;
	options.marginRight = options.marginRight || options.margin;
	options.marginLeft = options.marginLeft || options.margin;

	return options;
}

/***/ }),
/* 45 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* global HTMLImageElement */
/* global HTMLCanvasElement */
/* global SVGElement */

var _getOptionsFromElement = __webpack_require__(46);

var _getOptionsFromElement2 = _interopRequireDefault(_getOptionsFromElement);

var _renderers = __webpack_require__(49);

var _renderers2 = _interopRequireDefault(_renderers);

var _exceptions = __webpack_require__(54);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Takes an element and returns an object with information about how
// it should be rendered
// This could also return an array with these objects
// {
//   element: The element that the renderer should draw on
//   renderer: The name of the renderer
//   afterRender (optional): If something has to done after the renderer
//     completed, calls afterRender (function)
//   options (optional): Options that can be defined in the element
// }

function getRenderProperties(element) {
	// If the element is a string, query select call again
	if (typeof element === "string") {
		return querySelectedRenderProperties(element);
	}
	// If element is array. Recursivly call with every object in the array
	else if (Array.isArray(element)) {
			var returnArray = [];
			for (var i = 0; i < element.length; i++) {
				returnArray.push(getRenderProperties(element[i]));
			}
			return returnArray;
		}
		// If element, render on canvas and set the uri as src
		else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLImageElement) {
				return newCanvasRenderProperties(element);
			}
			// If SVG
			else if (element && element.nodeName && element.nodeName.toLowerCase() === 'svg' || typeof SVGElement !== 'undefined' && element instanceof SVGElement) {
					return {
						element: element,
						options: (0, _getOptionsFromElement2.default)(element),
						renderer: _renderers2.default.SVGRenderer
					};
				}
				// If canvas (in browser)
				else if (typeof HTMLCanvasElement !== 'undefined' && element instanceof HTMLCanvasElement) {
						return {
							element: element,
							options: (0, _getOptionsFromElement2.default)(element),
							renderer: _renderers2.default.CanvasRenderer
						};
					}
					// If canvas (in node)
					else if (element && element.getContext) {
							return {
								element: element,
								renderer: _renderers2.default.CanvasRenderer
							};
						} else if (element && (typeof element === "undefined" ? "undefined" : _typeof(element)) === 'object' && !element.nodeName) {
							return {
								element: element,
								renderer: _renderers2.default.ObjectRenderer
							};
						} else {
							throw new _exceptions.InvalidElementException();
						}
}

function querySelectedRenderProperties(string) {
	var selector = document.querySelectorAll(string);
	if (selector.length === 0) {
		return undefined;
	} else {
		var returnArray = [];
		for (var i = 0; i < selector.length; i++) {
			returnArray.push(getRenderProperties(selector[i]));
		}
		return returnArray;
	}
}

function newCanvasRenderProperties(imgElement) {
	var canvas = document.createElement('canvas');
	return {
		element: canvas,
		options: (0, _getOptionsFromElement2.default)(imgElement),
		renderer: _renderers2.default.CanvasRenderer,
		afterRender: function afterRender() {
			imgElement.setAttribute("src", canvas.toDataURL());
		}
	};
}

exports["default"] = getRenderProperties;

/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _optionsFromStrings = __webpack_require__(47);

var _optionsFromStrings2 = _interopRequireDefault(_optionsFromStrings);

var _defaults = __webpack_require__(48);

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOptionsFromElement(element) {
	var options = {};
	for (var property in _defaults2.default) {
		if (_defaults2.default.hasOwnProperty(property)) {
			// jsbarcode-*
			if (element.hasAttribute("jsbarcode-" + property.toLowerCase())) {
				options[property] = element.getAttribute("jsbarcode-" + property.toLowerCase());
			}

			// data-*
			if (element.hasAttribute("data-" + property.toLowerCase())) {
				options[property] = element.getAttribute("data-" + property.toLowerCase());
			}
		}
	}

	options["value"] = element.getAttribute("jsbarcode-value") || element.getAttribute("data-value");

	// Since all atributes are string they need to be converted to integers
	options = (0, _optionsFromStrings2.default)(options);

	return options;
}

exports["default"] = getOptionsFromElement;

/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports["default"] = optionsFromStrings;

// Convert string to integers/booleans where it should be

function optionsFromStrings(options) {
	var intOptions = ["width", "height", "textMargin", "fontSize", "margin", "marginTop", "marginBottom", "marginLeft", "marginRight"];

	for (var intOption in intOptions) {
		if (intOptions.hasOwnProperty(intOption)) {
			intOption = intOptions[intOption];
			if (typeof options[intOption] === "string") {
				options[intOption] = parseInt(options[intOption], 10);
			}
		}
	}

	if (typeof options["displayValue"] === "string") {
		options["displayValue"] = options["displayValue"] != "false";
	}

	return options;
}

/***/ }),
/* 48 */
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));
var defaults = {
	width: 2,
	height: 100,
	format: "auto",
	displayValue: true,
	fontOptions: "",
	font: "monospace",
	text: undefined,
	textAlign: "center",
	textPosition: "bottom",
	textMargin: 2,
	fontSize: 20,
	background: "#ffffff",
	lineColor: "#000000",
	margin: 10,
	marginTop: undefined,
	marginBottom: undefined,
	marginLeft: undefined,
	marginRight: undefined,
	valid: function valid() {}
};

exports["default"] = defaults;

/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _canvas = __webpack_require__(50);

var _canvas2 = _interopRequireDefault(_canvas);

var _svg = __webpack_require__(52);

var _svg2 = _interopRequireDefault(_svg);

var _object = __webpack_require__(53);

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["default"] = { CanvasRenderer: _canvas2.default, SVGRenderer: _svg2.default, ObjectRenderer: _object2.default };

/***/ }),
/* 50 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _merge = __webpack_require__(42);

var _merge2 = _interopRequireDefault(_merge);

var _shared = __webpack_require__(51);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CanvasRenderer = function () {
	function CanvasRenderer(canvas, encodings, options) {
		_classCallCheck(this, CanvasRenderer);

		this.canvas = canvas;
		this.encodings = encodings;
		this.options = options;
	}

	_createClass(CanvasRenderer, [{
		key: "render",
		value: function render() {
			// Abort if the browser does not support HTML5 canvas
			if (!this.canvas.getContext) {
				throw new Error('The browser does not support canvas.');
			}

			this.prepareCanvas();
			for (var i = 0; i < this.encodings.length; i++) {
				var encodingOptions = (0, _merge2.default)(this.options, this.encodings[i].options);

				this.drawCanvasBarcode(encodingOptions, this.encodings[i]);
				this.drawCanvasText(encodingOptions, this.encodings[i]);

				this.moveCanvasDrawing(this.encodings[i]);
			}

			this.restoreCanvas();
		}
	}, {
		key: "prepareCanvas",
		value: function prepareCanvas() {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			ctx.save();

			(0, _shared.calculateEncodingAttributes)(this.encodings, this.options, ctx);
			var totalWidth = (0, _shared.getTotalWidthOfEncodings)(this.encodings);
			var maxHeight = (0, _shared.getMaximumHeightOfEncodings)(this.encodings);

			this.canvas.width = totalWidth + this.options.marginLeft + this.options.marginRight;

			this.canvas.height = maxHeight;

			// Paint the canvas
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			if (this.options.background) {
				ctx.fillStyle = this.options.background;
				ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
			}

			ctx.translate(this.options.marginLeft, 0);
		}
	}, {
		key: "drawCanvasBarcode",
		value: function drawCanvasBarcode(options, encoding) {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			var binary = encoding.data;

			// Creates the barcode out of the encoded binary
			var yFrom;
			if (options.textPosition == "top") {
				yFrom = options.marginTop + options.fontSize + options.textMargin;
			} else {
				yFrom = options.marginTop;
			}

			ctx.fillStyle = options.lineColor;

			for (var b = 0; b < binary.length; b++) {
				var x = b * options.width + encoding.barcodePadding;

				if (binary[b] === "1") {
					ctx.fillRect(x, yFrom, options.width, options.height);
				} else if (binary[b]) {
					ctx.fillRect(x, yFrom, options.width, options.height * binary[b]);
				}
			}
		}
	}, {
		key: "drawCanvasText",
		value: function drawCanvasText(options, encoding) {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			var font = options.fontOptions + " " + options.fontSize + "px " + options.font;

			// Draw the text if displayValue is set
			if (options.displayValue) {
				var x, y;

				if (options.textPosition == "top") {
					y = options.marginTop + options.fontSize - options.textMargin;
				} else {
					y = options.height + options.textMargin + options.marginTop + options.fontSize;
				}

				ctx.font = font;

				// Draw the text in the correct X depending on the textAlign option
				if (options.textAlign == "left" || encoding.barcodePadding > 0) {
					x = 0;
					ctx.textAlign = 'left';
				} else if (options.textAlign == "right") {
					x = encoding.width - 1;
					ctx.textAlign = 'right';
				}
				// In all other cases, center the text
				else {
						x = encoding.width / 2;
						ctx.textAlign = 'center';
					}

				ctx.fillText(encoding.text, x, y);
			}
		}
	}, {
		key: "moveCanvasDrawing",
		value: function moveCanvasDrawing(encoding) {
			var ctx = this.canvas.getContext("2d");

			ctx.translate(encoding.width, 0);
		}
	}, {
		key: "restoreCanvas",
		value: function restoreCanvas() {
			// Get the canvas context
			var ctx = this.canvas.getContext("2d");

			ctx.restore();
		}
	}]);

	return CanvasRenderer;
}();

exports["default"] = CanvasRenderer;

/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));
exports.getTotalWidthOfEncodings = exports.calculateEncodingAttributes = exports.getBarcodePadding = exports.getEncodingHeight = exports.getMaximumHeightOfEncodings = undefined;

var _merge = __webpack_require__(42);

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getEncodingHeight(encoding, options) {
	return options.height + (options.displayValue && encoding.text.length > 0 ? options.fontSize + options.textMargin : 0) + options.marginTop + options.marginBottom;
}

function getBarcodePadding(textWidth, barcodeWidth, options) {
	if (options.displayValue && barcodeWidth < textWidth) {
		if (options.textAlign == "center") {
			return Math.floor((textWidth - barcodeWidth) / 2);
		} else if (options.textAlign == "left") {
			return 0;
		} else if (options.textAlign == "right") {
			return Math.floor(textWidth - barcodeWidth);
		}
	}
	return 0;
}

function calculateEncodingAttributes(encodings, barcodeOptions, context) {
	for (var i = 0; i < encodings.length; i++) {
		var encoding = encodings[i];
		var options = (0, _merge2.default)(barcodeOptions, encoding.options);

		// Calculate the width of the encoding
		var textWidth;
		if (options.displayValue) {
			textWidth = messureText(encoding.text, options, context);
		} else {
			textWidth = 0;
		}

		var barcodeWidth = encoding.data.length * options.width;
		encoding.width = Math.ceil(Math.max(textWidth, barcodeWidth));

		encoding.height = getEncodingHeight(encoding, options);

		encoding.barcodePadding = getBarcodePadding(textWidth, barcodeWidth, options);
	}
}

function getTotalWidthOfEncodings(encodings) {
	var totalWidth = 0;
	for (var i = 0; i < encodings.length; i++) {
		totalWidth += encodings[i].width;
	}
	return totalWidth;
}

function getMaximumHeightOfEncodings(encodings) {
	var maxHeight = 0;
	for (var i = 0; i < encodings.length; i++) {
		if (encodings[i].height > maxHeight) {
			maxHeight = encodings[i].height;
		}
	}
	return maxHeight;
}

function messureText(string, options, context) {
	var ctx;

	if (context) {
		ctx = context;
	} else if (typeof document !== "undefined") {
		ctx = document.createElement("canvas").getContext("2d");
	} else {
		// If the text cannot be messured we will return 0.
		// This will make some barcode with big text render incorrectly
		return 0;
	}
	ctx.font = options.fontOptions + " " + options.fontSize + "px " + options.font;

	// Calculate the width of the encoding
	var measureTextResult = ctx.measureText(string);
	if (!measureTextResult) {
		// Some implementations don't implement measureText and return undefined.
		// If the text cannot be measured we will return 0.
		// This will make some barcode with big text render incorrectly
		return 0;
	}
	var size = measureTextResult.width;
	return size;
}

exports.getMaximumHeightOfEncodings = getMaximumHeightOfEncodings;
exports.getEncodingHeight = getEncodingHeight;
exports.getBarcodePadding = getBarcodePadding;
exports.calculateEncodingAttributes = calculateEncodingAttributes;
exports.getTotalWidthOfEncodings = getTotalWidthOfEncodings;

/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _merge = __webpack_require__(42);

var _merge2 = _interopRequireDefault(_merge);

var _shared = __webpack_require__(51);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var svgns = "http://www.w3.org/2000/svg";

var SVGRenderer = function () {
	function SVGRenderer(svg, encodings, options) {
		_classCallCheck(this, SVGRenderer);

		this.svg = svg;
		this.encodings = encodings;
		this.options = options;
		this.document = options.xmlDocument || document;
	}

	_createClass(SVGRenderer, [{
		key: "render",
		value: function render() {
			var currentX = this.options.marginLeft;

			this.prepareSVG();
			for (var i = 0; i < this.encodings.length; i++) {
				var encoding = this.encodings[i];
				var encodingOptions = (0, _merge2.default)(this.options, encoding.options);

				var group = this.createGroup(currentX, encodingOptions.marginTop, this.svg);

				this.setGroupOptions(group, encodingOptions);

				this.drawSvgBarcode(group, encodingOptions, encoding);
				this.drawSVGText(group, encodingOptions, encoding);

				currentX += encoding.width;
			}
		}
	}, {
		key: "prepareSVG",
		value: function prepareSVG() {
			// Clear the SVG
			while (this.svg.firstChild) {
				this.svg.removeChild(this.svg.firstChild);
			}

			(0, _shared.calculateEncodingAttributes)(this.encodings, this.options);
			var totalWidth = (0, _shared.getTotalWidthOfEncodings)(this.encodings);
			var maxHeight = (0, _shared.getMaximumHeightOfEncodings)(this.encodings);

			var width = totalWidth + this.options.marginLeft + this.options.marginRight;
			this.setSvgAttributes(width, maxHeight);

			if (this.options.background) {
				this.drawRect(0, 0, width, maxHeight, this.svg).setAttribute("style", "fill:" + this.options.background + ";");
			}
		}
	}, {
		key: "drawSvgBarcode",
		value: function drawSvgBarcode(parent, options, encoding) {
			var binary = encoding.data;

			// Creates the barcode out of the encoded binary
			var yFrom;
			if (options.textPosition == "top") {
				yFrom = options.fontSize + options.textMargin;
			} else {
				yFrom = 0;
			}

			var barWidth = 0;
			var x = 0;
			for (var b = 0; b < binary.length; b++) {
				x = b * options.width + encoding.barcodePadding;

				if (binary[b] === "1") {
					barWidth++;
				} else if (barWidth > 0) {
					this.drawRect(x - options.width * barWidth, yFrom, options.width * barWidth, options.height, parent);
					barWidth = 0;
				}
			}

			// Last draw is needed since the barcode ends with 1
			if (barWidth > 0) {
				this.drawRect(x - options.width * (barWidth - 1), yFrom, options.width * barWidth, options.height, parent);
			}
		}
	}, {
		key: "drawSVGText",
		value: function drawSVGText(parent, options, encoding) {
			var textElem = this.document.createElementNS(svgns, 'text');

			// Draw the text if displayValue is set
			if (options.displayValue) {
				var x, y;

				textElem.setAttribute("style", "font:" + options.fontOptions + " " + options.fontSize + "px " + options.font);

				if (options.textPosition == "top") {
					y = options.fontSize - options.textMargin;
				} else {
					y = options.height + options.textMargin + options.fontSize;
				}

				// Draw the text in the correct X depending on the textAlign option
				if (options.textAlign == "left" || encoding.barcodePadding > 0) {
					x = 0;
					textElem.setAttribute("text-anchor", "start");
				} else if (options.textAlign == "right") {
					x = encoding.width - 1;
					textElem.setAttribute("text-anchor", "end");
				}
				// In all other cases, center the text
				else {
						x = encoding.width / 2;
						textElem.setAttribute("text-anchor", "middle");
					}

				textElem.setAttribute("x", x);
				textElem.setAttribute("y", y);

				textElem.appendChild(this.document.createTextNode(encoding.text));

				parent.appendChild(textElem);
			}
		}
	}, {
		key: "setSvgAttributes",
		value: function setSvgAttributes(width, height) {
			var svg = this.svg;
			svg.setAttribute("width", width + "px");
			svg.setAttribute("height", height + "px");
			svg.setAttribute("x", "0px");
			svg.setAttribute("y", "0px");
			svg.setAttribute("viewBox", "0 0 " + width + " " + height);

			svg.setAttribute("xmlns", svgns);
			svg.setAttribute("version", "1.1");

			svg.setAttribute("style", "transform: translate(0,0)");
		}
	}, {
		key: "createGroup",
		value: function createGroup(x, y, parent) {
			var group = this.document.createElementNS(svgns, 'g');
			group.setAttribute("transform", "translate(" + x + ", " + y + ")");

			parent.appendChild(group);

			return group;
		}
	}, {
		key: "setGroupOptions",
		value: function setGroupOptions(group, options) {
			group.setAttribute("style", "fill:" + options.lineColor + ";");
		}
	}, {
		key: "drawRect",
		value: function drawRect(x, y, width, height, parent) {
			var rect = this.document.createElementNS(svgns, 'rect');

			rect.setAttribute("x", x);
			rect.setAttribute("y", y);
			rect.setAttribute("width", width);
			rect.setAttribute("height", height);

			parent.appendChild(rect);

			return rect;
		}
	}]);

	return SVGRenderer;
}();

exports["default"] = SVGRenderer;

/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectRenderer = function () {
	function ObjectRenderer(object, encodings, options) {
		_classCallCheck(this, ObjectRenderer);

		this.object = object;
		this.encodings = encodings;
		this.options = options;
	}

	_createClass(ObjectRenderer, [{
		key: "render",
		value: function render() {
			this.object.encodings = this.encodings;
		}
	}]);

	return ObjectRenderer;
}();

exports["default"] = ObjectRenderer;

/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InvalidInputException = function (_Error) {
	_inherits(InvalidInputException, _Error);

	function InvalidInputException(symbology, input) {
		_classCallCheck(this, InvalidInputException);

		var _this = _possibleConstructorReturn(this, (InvalidInputException.__proto__ || Object.getPrototypeOf(InvalidInputException)).call(this));

		_this.name = "InvalidInputException";

		_this.symbology = symbology;
		_this.input = input;

		_this.message = '"' + _this.input + '" is not a valid input for ' + _this.symbology;
		return _this;
	}

	return InvalidInputException;
}(Error);

var InvalidElementException = function (_Error2) {
	_inherits(InvalidElementException, _Error2);

	function InvalidElementException() {
		_classCallCheck(this, InvalidElementException);

		var _this2 = _possibleConstructorReturn(this, (InvalidElementException.__proto__ || Object.getPrototypeOf(InvalidElementException)).call(this));

		_this2.name = "InvalidElementException";
		_this2.message = "Not supported type to render on";
		return _this2;
	}

	return InvalidElementException;
}(Error);

var NoElementException = function (_Error3) {
	_inherits(NoElementException, _Error3);

	function NoElementException() {
		_classCallCheck(this, NoElementException);

		var _this3 = _possibleConstructorReturn(this, (NoElementException.__proto__ || Object.getPrototypeOf(NoElementException)).call(this));

		_this3.name = "NoElementException";
		_this3.message = "No element to render on.";
		return _this3;
	}

	return NoElementException;
}(Error);

exports.InvalidInputException = InvalidInputException;
exports.InvalidElementException = InvalidElementException;
exports.NoElementException = NoElementException;

/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
	value: true
}));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*eslint no-console: 0 */

var ErrorHandler = function () {
	function ErrorHandler(api) {
		_classCallCheck(this, ErrorHandler);

		this.api = api;
	}

	_createClass(ErrorHandler, [{
		key: "handleCatch",
		value: function handleCatch(e) {
			// If babel supported extending of Error in a correct way instanceof would be used here
			if (e.name === "InvalidInputException") {
				if (this.api._options.valid !== this.api._defaults.valid) {
					this.api._options.valid(false);
				} else {
					throw e.message;
				}
			} else {
				throw e;
			}

			this.api.render = function () {};
		}
	}, {
		key: "wrapBarcodeCall",
		value: function wrapBarcodeCall(func) {
			try {
				var result = func.apply(undefined, arguments);
				this.api._options.valid(true);
				return result;
			} catch (e) {
				this.handleCatch(e);

				return this.api;
			}
		}
	}]);

	return ErrorHandler;
}();

exports["default"] = ErrorHandler;

/***/ }),
/* 56 */
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
      linkText = 'https://vaultproducts.com';
      itemMaster =  '12A001';
      sku = '12A001E01-20';
      upc = '818090025960';
      description = 'Simplicity Stand for iPad';
  }
  
  return { brandField, logoSrc, headerText, linkText, itemMaster, sku, upc, description };
}

/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canvasUpdate: function() { return /* binding */ canvasUpdate; },
/* harmony export */   scaler: function() { return /* binding */ scaler; }
/* harmony export */ });
/* harmony import */ var _domElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);


const SCALER = '.scaler';
const CANVAS_SCALED = 'canvas-scaled';
const CANVAS_FULL = 'canvas-full';

const setDimensions = (element, width, height) => {
  const scaler = element.querySelector(SCALER);
  scaler.style.width = `${width}in`;
  scaler.style.height = `${height}in`;
};

const setFontSize = (element, fontSize) => {
  element.querySelectorAll('.shipping-mark').forEach((content) => {
    content.style.fontSize = `${fontSize}in`;
  });
};

const setDataHeight = (element, height) => {
  element.querySelectorAll('.shipping-mark').forEach((content) => {
    element.dataset.height = height;
  });
}

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

  const minFontSize = 0.6; // Minimum font size in inches
  const maxFontSize = 1.2; // Maximum font size in inches
  const area = Math.min(length * width, height * height);
  let fontSize = defaultFontSize * Math.sqrt(area / defaultArea);
  fontSize = Math.max(minFontSize, Math.min(fontSize, maxFontSize));

  const widthPercentage = previewContent.classList.contains('preview__content--condensed') ? condensed : expanded;
  let computedFrontWidth = widthPercentage * (length/height);
  let computedSideWidth = widthPercentage * (width/height);

  if (computedFrontWidth > 90 || computedSideWidth > 90) {
    console.log('computedFrontWidth: ', computedFrontWidth, 'computedSideWidth: ',  computedSideWidth);

    if (computedFrontWidth > computedSideWidth) {
      cartonFront.style.width = `90%`;
      cartonSide.style.width = `${(width/length) * 90}%`;
      cartonFront.style.paddingBottom = `${(90*30)/computedFrontWidth}%`;
      cartonSide.style.paddingBottom = `${(90*30)/computedFrontWidth}%`;
    } else if (computedFrontWidth < computedSideWidth) {
      cartonFront.style.width = `${(length/width) * 90}%`;
      cartonSide.style.width = `90%`;
      cartonFront.style.paddingBottom = `${(90*30)/computedSideWidth}%`;
      cartonSide.style.paddingBottom = `${(90*30)/computedSideWidth}%`;
    } else { // when computedFrontWidth and computedSideWidth are equal
      cartonFront.style.width = `90%`;
      cartonSide.style.width = `90%`;
      cartonFront.style.paddingBottom = `${(90*30)/computedFrontWidth}%`;
      cartonSide.style.paddingBottom = `${(90*30)/computedFrontWidth}%`;
    }
  } else {
    cartonFront.style.width = `${widthPercentage * (length/height)}%`;
    cartonSide.style.width = `${widthPercentage * (width/height)}%`;
    cartonFront.style.paddingBottom = `${widthPercentage}%`;
    cartonSide.style.paddingBottom = `${widthPercentage}%`;
  }

  scaler();

  setDimensions(cartonFront, length, height);
  setDimensions(cartonSide, width, height);
  setFontSize(previewContent, fontSize);
  setDataHeight(previewContent, height);
}

const scaler = () => {
  const parentDivs = document.querySelectorAll('.page');

  parentDivs.forEach(parentDiv => {
    if (parentDiv.querySelector(SCALER)) {
      const print = parentDiv.querySelector(SCALER);
      const originalTransition = print.style.transition;
      let isTransitioning = false;

      const resizeObserver = new ResizeObserver(entries => {
        if (isTransitioning) return;

        for (let entry of entries) {
          const parentDivWidth = entry.contentRect.width;
          const printWidth = print.offsetWidth;
          const scale = parentDivWidth / printWidth;
          print.style.transform = `scale(${scale})`;

          parentDiv.classList.toggle(CANVAS_SCALED, scale < 1);
          parentDiv.classList.toggle(CANVAS_FULL, scale >= 1);
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
    }
  });
};

/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyAnimation: function() { return /* binding */ applyAnimation; },
/* harmony export */   controlInit: function() { return /* binding */ controlInit; },
/* harmony export */   pdfButtons: function() { return /* binding */ pdfButtons; }
/* harmony export */ });
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59);
/* harmony import */ var _brandDefaults_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(56);
/* harmony import */ var html_to_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(62);
/* harmony import */ var _domElements_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _misc_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(72);
/* harmony import */ var _canvasUpdate_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(57);









let DEBUG = false;
const upcToggles = _domElements_js__WEBPACK_IMPORTED_MODULE_3__["default"].controls.querySelectorAll('.visibility--upc input[type="checkbox"]');
const shippingToggles = _domElements_js__WEBPACK_IMPORTED_MODULE_3__["default"].controls.querySelectorAll('.visibility--shipping input[type="checkbox"]');
const upcButton = _domElements_js__WEBPACK_IMPORTED_MODULE_3__["default"].controls.querySelector('.download__button--upc');
const shippingButton = _domElements_js__WEBPACK_IMPORTED_MODULE_3__["default"].controls.querySelector('.download__button--shipping');

const controlInit = () => {
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

  pageImgDownload();
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
  let expand = document.querySelector('.preview__layout #expanded');
  let header = document.querySelector('.preview__layout #header-visibility');
  let pagePreview = document.querySelector('.preview__content');

  const firstRect = pagePreview.getBoundingClientRect();
  const wasHidden = pagePreview.classList.contains('preview__content--hidden');

  if (expand && expand.checked) {
    pagePreview.classList.remove('preview__content--condensed');
    pagePreview.classList.add('preview__content--expanded');
  } else {
    pagePreview.classList.remove('preview__content--expanded');
    pagePreview.classList.add('preview__content--condensed');
  }

  if (header && header.checked) {
    pagePreview.classList.remove('preview__content--header-hidden');
    pagePreview.classList.add('preview__content--header-visible');
  } else {
    pagePreview.classList.remove('preview__content--header-visible');
    pagePreview.classList.add('preview__content--header-hidden');
  }

  applyAnimation(pagePreview, firstRect, wasHidden);
  (0,_canvasUpdate_js__WEBPACK_IMPORTED_MODULE_5__.canvasUpdate)();
};

const pdfButtons = () => {
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
  const pdf = new jspdf__WEBPACK_IMPORTED_MODULE_0__.jsPDF('p', 'in', 'a4', true);
  const pages = Array.from(document.querySelectorAll(`${elements}:not(.page--hidden):not(.factory--hidden) .print`));
  let pageType;

  for (const page of pages) {
    if (page.closest('.scaler-wrapper')) page.closest('.scaler-wrapper').classList.add('rendering');

    await html_to_image__WEBPACK_IMPORTED_MODULE_2__.toPng(page, {
      quality: 1,
      pixelRatio: 4,
    })
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;

        if (!DEBUG) {
          const originalWidth = page.offsetWidth;
          const originalHeight = page.offsetHeight;

          const imgWidth = (0,_misc_js__WEBPACK_IMPORTED_MODULE_4__.pixelToInch)(originalWidth);
          const imgHeight = (0,_misc_js__WEBPACK_IMPORTED_MODULE_4__.pixelToInch)(originalHeight);
          
          if (imgWidth > 8.3 || imgHeight > 11.7) { // When the image is larger than A4
            const imgData = dataUrl;
            const orientation = imgWidth > imgHeight ? 'landscape' : 'portrait';
            pageType = 'shipping';

            const backgroundColor = [255, 255, 255]; // White color
            //const transparency = 0; // Fully transparent

            pdf.addPage([imgWidth, imgHeight], orientation);
            pdf.setFillColor.apply(null, [...backgroundColor]);
            pdf.rect(0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, 'F');
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
  pdf.save((0,_misc_js__WEBPACK_IMPORTED_MODULE_4__.namer)(pageType, 'pdf'));
}

const buttonBuilder = () => {
  upcButton.setAttribute('data-tooltip', (0,_misc_js__WEBPACK_IMPORTED_MODULE_4__.namer)('packaging', 'pdf'));
  upcButton.setAttribute('data-tooltip-location', 'bottom');
  shippingButton.setAttribute('data-tooltip', (0,_misc_js__WEBPACK_IMPORTED_MODULE_4__.namer)('shipping', 'pdf'));
  shippingButton.setAttribute('data-tooltip-location', 'bottom');

  disableButtonIfAllUnchecked(upcToggles, upcButton);
  disableButtonIfAllUnchecked(shippingToggles, shippingButton);
}

const disableButtonIfAllUnchecked = (toggles, button) => {
  const allUnchecked = Array.from(toggles).every(toggle => !toggle.checked);
  button.disabled = allUnchecked;
}

const pageImgDownload = () => {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    const download = document.createElement('button');
    download.classList.add('grab__button');
    download.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-big-down-dash"><path d="M15 5H9"/><path d="M15 9v3h4l-7 7-7-7h4V9h6z"/></svg>';
    page.appendChild(download);
  });

  document.querySelectorAll('.grab__button').forEach(button => {
    button.addEventListener('click', () => {
      const defaults = (0,_brandDefaults_js__WEBPACK_IMPORTED_MODULE_1__.brandDefaults)();

      let brand = _domElements_js__WEBPACK_IMPORTED_MODULE_3__["default"].brand.value;
      const sku = _domElements_js__WEBPACK_IMPORTED_MODULE_3__["default"].sku.value.toUpperCase() || defaults.sku;
      const page = button.closest('.page');
      let type = page.getAttribute('data-type');
      let sapona = page.classList.contains('sapona') ? '-sapona' : '';

      switch(brand) {
        case 'brenthaven':
          brand = 'BH';
          break;
        case 'gumdrop':
          brand = 'GD';
          break;
        case 'vault':
          brand = 'VT';
          break;
      }

      switch(type) {
        case 'polybag':
          type = 'PB';
          break;
        case 'master':
          type = 'MC';
          break;
        case 'inner':
          type = 'IC';
          break;
        case 'shipping-front':
          type = 'Shipping Marks - Front';
          break;
        case 'shipping-side':
          type = 'Shipping Marks - Side';
          break;
      }

      const print = page.querySelector('.print');
      const filename = `${brand}.${sku}.${type}${sapona}.png`;
      console.log(filename);
      html_to_image__WEBPACK_IMPORTED_MODULE_2__.toPng(print, { quality: 1, pixelRatio: 4 })
        .then(function (dataUrl) {
          const link = document.createElement('a');
          link.download = filename;
          link.href = dataUrl;
          link.click();
        });
    });
  });
}

/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AcroForm: function() { return /* binding */ St; },
/* harmony export */   AcroFormAppearance: function() { return /* binding */ At; },
/* harmony export */   AcroFormButton: function() { return /* binding */ mt; },
/* harmony export */   AcroFormCheckBox: function() { return /* binding */ wt; },
/* harmony export */   AcroFormChoiceField: function() { return /* binding */ ft; },
/* harmony export */   AcroFormComboBox: function() { return /* binding */ pt; },
/* harmony export */   AcroFormEditBox: function() { return /* binding */ gt; },
/* harmony export */   AcroFormListBox: function() { return /* binding */ dt; },
/* harmony export */   AcroFormPasswordField: function() { return /* binding */ Lt; },
/* harmony export */   AcroFormPushButton: function() { return /* binding */ vt; },
/* harmony export */   AcroFormRadioButton: function() { return /* binding */ bt; },
/* harmony export */   AcroFormTextField: function() { return /* binding */ Nt; },
/* harmony export */   GState: function() { return /* binding */ j; },
/* harmony export */   ShadingPattern: function() { return /* binding */ B; },
/* harmony export */   TilingPattern: function() { return /* binding */ M; },
/* harmony export */   jsPDF: function() { return /* binding */ E; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60);
/* harmony import */ var fflate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61);
/** @license
 *
 * jsPDF - PDF Document creation from JavaScript
 * Version 2.5.1 Built on 2022-01-28T15:37:57.791Z
 *                      CommitID 00000000
 *
 * Copyright (c) 2010-2021 James Hall <james@parall.ax>, https://github.com/MrRio/jsPDF
 *               2015-2021 yWorks GmbH, http://www.yworks.com
 *               2015-2021 Lukas Holländer <lukas.hollaender@yworks.com>, https://github.com/HackbrettXXX
 *               2016-2018 Aras Abbasi <aras.abbasi@gmail.com>
 *               2010 Aaron Spike, https://github.com/acspike
 *               2012 Willow Systems Corporation, https://github.com/willowsystems
 *               2012 Pablo Hess, https://github.com/pablohess
 *               2012 Florian Jenett, https://github.com/fjenett
 *               2013 Warren Weckesser, https://github.com/warrenweckesser
 *               2013 Youssef Beddad, https://github.com/lifof
 *               2013 Lee Driscoll, https://github.com/lsdriscoll
 *               2013 Stefan Slonevskiy, https://github.com/stefslon
 *               2013 Jeremy Morel, https://github.com/jmorel
 *               2013 Christoph Hartmann, https://github.com/chris-rock
 *               2014 Juan Pablo Gaviria, https://github.com/juanpgaviria
 *               2014 James Makes, https://github.com/dollaruw
 *               2014 Diego Casorran, https://github.com/diegocr
 *               2014 Steven Spungin, https://github.com/Flamenco
 *               2014 Kenneth Glassey, https://github.com/Gavvers
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * Contributor(s):
 *    siefkenj, ahwolf, rickygu, Midnith, saintclair, eaparango,
 *    kim3er, mfo, alnorth, Flamenco
 */

var n=function(){return"undefined"!=typeof window?window:"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:"undefined"!=typeof self?self:this}();function i(){n.console&&"function"==typeof n.console.log&&n.console.log.apply(n.console,arguments)}var a={log:i,warn:function(t){n.console&&("function"==typeof n.console.warn?n.console.warn.apply(n.console,arguments):i.call(null,arguments))},error:function(t){n.console&&("function"==typeof n.console.error?n.console.error.apply(n.console,arguments):i(t))}};function o(t,e,r){var n=new XMLHttpRequest;n.open("GET",t),n.responseType="blob",n.onload=function(){l(n.response,e,r)},n.onerror=function(){a.error("could not download file")},n.send()}function s(t){var e=new XMLHttpRequest;e.open("HEAD",t,!1);try{e.send()}catch(t){}return e.status>=200&&e.status<=299}function c(t){try{t.dispatchEvent(new MouseEvent("click"))}catch(r){var e=document.createEvent("MouseEvents");e.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(e)}}var u,h,l=n.saveAs||("object"!==("undefined"==typeof window?"undefined":(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(window))||window!==n?function(){}:"undefined"!=typeof HTMLAnchorElement&&"download"in HTMLAnchorElement.prototype?function(t,e,r){var i=n.URL||n.webkitURL,a=document.createElement("a");e=e||t.name||"download",a.download=e,a.rel="noopener","string"==typeof t?(a.href=t,a.origin!==location.origin?s(a.href)?o(t,e,r):c(a,a.target="_blank"):c(a)):(a.href=i.createObjectURL(t),setTimeout((function(){i.revokeObjectURL(a.href)}),4e4),setTimeout((function(){c(a)}),0))}:"msSaveOrOpenBlob"in navigator?function(e,r,n){if(r=r||e.name||"download","string"==typeof e)if(s(e))o(e,r,n);else{var i=document.createElement("a");i.href=e,i.target="_blank",setTimeout((function(){c(i)}))}else navigator.msSaveOrOpenBlob(function(e,r){return void 0===r?r={autoBom:!1}:"object"!==(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(r)&&(a.warn("Deprecated: Expected third argument to be a object"),r={autoBom:!r}),r.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob([String.fromCharCode(65279),e],{type:e.type}):e}(e,n),r)}:function(e,r,i,a){if((a=a||open("","_blank"))&&(a.document.title=a.document.body.innerText="downloading..."),"string"==typeof e)return o(e,r,i);var s="application/octet-stream"===e.type,c=/constructor/i.test(n.HTMLElement)||n.safari,u=/CriOS\/[\d]+/.test(navigator.userAgent);if((u||s&&c)&&"object"===("undefined"==typeof FileReader?"undefined":(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(FileReader))){var h=new FileReader;h.onloadend=function(){var t=h.result;t=u?t:t.replace(/^data:[^;]*;/,"data:attachment/file;"),a?a.location.href=t:location=t,a=null},h.readAsDataURL(e)}else{var l=n.URL||n.webkitURL,f=l.createObjectURL(e);a?a.location=f:location.href=f,a=null,setTimeout((function(){l.revokeObjectURL(f)}),4e4)}});
/**
 * A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * {@link   http://www.phpied.com/rgb-color-parser-in-javascript/}
 * @license Use it if you like it
 */function f(t){var e;t=t||"",this.ok=!1,"#"==t.charAt(0)&&(t=t.substr(1,6));t={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dodgerblue:"1e90ff",feldspar:"d19275",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslateblue:"8470ff",lightslategray:"778899",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"00ff00",limegreen:"32cd32",linen:"faf0e6",magenta:"ff00ff",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",red:"ff0000",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",violetred:"d02090",wheat:"f5deb3",white:"ffffff",whitesmoke:"f5f5f5",yellow:"ffff00",yellowgreen:"9acd32"}[t=(t=t.replace(/ /g,"")).toLowerCase()]||t;for(var r=[{re:/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,example:["rgb(123, 234, 45)","rgb(255,234,245)"],process:function(t){return[parseInt(t[1]),parseInt(t[2]),parseInt(t[3])]}},{re:/^(\w{2})(\w{2})(\w{2})$/,example:["#00ff00","336699"],process:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/^(\w{1})(\w{1})(\w{1})$/,example:["#fb0","f0f"],process:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}}],n=0;n<r.length;n++){var i=r[n].re,a=r[n].process,o=i.exec(t);o&&(e=a(o),this.r=e[0],this.g=e[1],this.b=e[2],this.ok=!0)}this.r=this.r<0||isNaN(this.r)?0:this.r>255?255:this.r,this.g=this.g<0||isNaN(this.g)?0:this.g>255?255:this.g,this.b=this.b<0||isNaN(this.b)?0:this.b>255?255:this.b,this.toRGB=function(){return"rgb("+this.r+", "+this.g+", "+this.b+")"},this.toHex=function(){var t=this.r.toString(16),e=this.g.toString(16),r=this.b.toString(16);return 1==t.length&&(t="0"+t),1==e.length&&(e="0"+e),1==r.length&&(r="0"+r),"#"+t+e+r}}
/**
 * @license
 * Joseph Myers does not specify a particular license for his work.
 *
 * Author: Joseph Myers
 * Accessed from: http://www.myersdaily.org/joseph/javascript/md5.js
 *
 * Modified by: Owen Leong
 */
function d(t,e){var r=t[0],n=t[1],i=t[2],a=t[3];r=g(r,n,i,a,e[0],7,-680876936),a=g(a,r,n,i,e[1],12,-389564586),i=g(i,a,r,n,e[2],17,606105819),n=g(n,i,a,r,e[3],22,-1044525330),r=g(r,n,i,a,e[4],7,-176418897),a=g(a,r,n,i,e[5],12,1200080426),i=g(i,a,r,n,e[6],17,-1473231341),n=g(n,i,a,r,e[7],22,-45705983),r=g(r,n,i,a,e[8],7,1770035416),a=g(a,r,n,i,e[9],12,-1958414417),i=g(i,a,r,n,e[10],17,-42063),n=g(n,i,a,r,e[11],22,-1990404162),r=g(r,n,i,a,e[12],7,1804603682),a=g(a,r,n,i,e[13],12,-40341101),i=g(i,a,r,n,e[14],17,-1502002290),r=m(r,n=g(n,i,a,r,e[15],22,1236535329),i,a,e[1],5,-165796510),a=m(a,r,n,i,e[6],9,-1069501632),i=m(i,a,r,n,e[11],14,643717713),n=m(n,i,a,r,e[0],20,-373897302),r=m(r,n,i,a,e[5],5,-701558691),a=m(a,r,n,i,e[10],9,38016083),i=m(i,a,r,n,e[15],14,-660478335),n=m(n,i,a,r,e[4],20,-405537848),r=m(r,n,i,a,e[9],5,568446438),a=m(a,r,n,i,e[14],9,-1019803690),i=m(i,a,r,n,e[3],14,-187363961),n=m(n,i,a,r,e[8],20,1163531501),r=m(r,n,i,a,e[13],5,-1444681467),a=m(a,r,n,i,e[2],9,-51403784),i=m(i,a,r,n,e[7],14,1735328473),r=v(r,n=m(n,i,a,r,e[12],20,-1926607734),i,a,e[5],4,-378558),a=v(a,r,n,i,e[8],11,-2022574463),i=v(i,a,r,n,e[11],16,1839030562),n=v(n,i,a,r,e[14],23,-35309556),r=v(r,n,i,a,e[1],4,-1530992060),a=v(a,r,n,i,e[4],11,1272893353),i=v(i,a,r,n,e[7],16,-155497632),n=v(n,i,a,r,e[10],23,-1094730640),r=v(r,n,i,a,e[13],4,681279174),a=v(a,r,n,i,e[0],11,-358537222),i=v(i,a,r,n,e[3],16,-722521979),n=v(n,i,a,r,e[6],23,76029189),r=v(r,n,i,a,e[9],4,-640364487),a=v(a,r,n,i,e[12],11,-421815835),i=v(i,a,r,n,e[15],16,530742520),r=b(r,n=v(n,i,a,r,e[2],23,-995338651),i,a,e[0],6,-198630844),a=b(a,r,n,i,e[7],10,1126891415),i=b(i,a,r,n,e[14],15,-1416354905),n=b(n,i,a,r,e[5],21,-57434055),r=b(r,n,i,a,e[12],6,1700485571),a=b(a,r,n,i,e[3],10,-1894986606),i=b(i,a,r,n,e[10],15,-1051523),n=b(n,i,a,r,e[1],21,-2054922799),r=b(r,n,i,a,e[8],6,1873313359),a=b(a,r,n,i,e[15],10,-30611744),i=b(i,a,r,n,e[6],15,-1560198380),n=b(n,i,a,r,e[13],21,1309151649),r=b(r,n,i,a,e[4],6,-145523070),a=b(a,r,n,i,e[11],10,-1120210379),i=b(i,a,r,n,e[2],15,718787259),n=b(n,i,a,r,e[9],21,-343485551),t[0]=_(r,t[0]),t[1]=_(n,t[1]),t[2]=_(i,t[2]),t[3]=_(a,t[3])}function p(t,e,r,n,i,a){return e=_(_(e,t),_(n,a)),_(e<<i|e>>>32-i,r)}function g(t,e,r,n,i,a,o){return p(e&r|~e&n,t,e,i,a,o)}function m(t,e,r,n,i,a,o){return p(e&n|r&~n,t,e,i,a,o)}function v(t,e,r,n,i,a,o){return p(e^r^n,t,e,i,a,o)}function b(t,e,r,n,i,a,o){return p(r^(e|~n),t,e,i,a,o)}function y(t){var e,r=t.length,n=[1732584193,-271733879,-1732584194,271733878];for(e=64;e<=t.length;e+=64)d(n,w(t.substring(e-64,e)));t=t.substring(e-64);var i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(e=0;e<t.length;e++)i[e>>2]|=t.charCodeAt(e)<<(e%4<<3);if(i[e>>2]|=128<<(e%4<<3),e>55)for(d(n,i),e=0;e<16;e++)i[e]=0;return i[14]=8*r,d(n,i),n}function w(t){var e,r=[];for(e=0;e<64;e+=4)r[e>>2]=t.charCodeAt(e)+(t.charCodeAt(e+1)<<8)+(t.charCodeAt(e+2)<<16)+(t.charCodeAt(e+3)<<24);return r}u=n.atob.bind(n),h=n.btoa.bind(n);var N="0123456789abcdef".split("");function L(t){for(var e="",r=0;r<4;r++)e+=N[t>>8*r+4&15]+N[t>>8*r&15];return e}function A(t){return String.fromCharCode((255&t)>>0,(65280&t)>>8,(16711680&t)>>16,(4278190080&t)>>24)}function x(t){return y(t).map(A).join("")}var S="5d41402abc4b2a76b9719d911017c592"!=function(t){for(var e=0;e<t.length;e++)t[e]=L(t[e]);return t.join("")}(y("hello"));function _(t,e){if(S){var r=(65535&t)+(65535&e);return(t>>16)+(e>>16)+(r>>16)<<16|65535&r}return t+e&4294967295}
/**
 * @license
 * FPDF is released under a permissive license: there is no usage restriction.
 * You may embed it freely in your application (commercial or not), with or
 * without modifications.
 *
 * Reference: http://www.fpdf.org/en/script/script37.php
 */function P(t,e){var r,n,i,a;if(t!==r){for(var o=(i=t,a=1+(256/t.length>>0),new Array(a+1).join(i)),s=[],c=0;c<256;c++)s[c]=c;var u=0;for(c=0;c<256;c++){var h=s[c];u=(u+h+o.charCodeAt(c))%256,s[c]=s[u],s[u]=h}r=t,n=s}else s=n;var l=e.length,f=0,d=0,p="";for(c=0;c<l;c++)d=(d+(h=s[f=(f+1)%256]))%256,s[f]=s[d],s[d]=h,o=s[(s[f]+s[d])%256],p+=String.fromCharCode(e.charCodeAt(c)^o);return p}
/**
 * @license
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 * Author: Owen Leong (@owenl131)
 * Date: 15 Oct 2020
 * References:
 * https://www.cs.cmu.edu/~dst/Adobe/Gallery/anon21jul01-pdf-encryption.txt
 * https://github.com/foliojs/pdfkit/blob/master/lib/security.js
 * http://www.fpdf.org/en/script/script37.php
 */var k={print:4,modify:8,copy:16,"annot-forms":32};function I(t,e,r,n){this.v=1,this.r=2;var i=192;t.forEach((function(t){if(void 0!==k.perm)throw new Error("Invalid permission: "+t);i+=k[t]})),this.padding="(¿N^NuAd\0NVÿú\b..\0¶Ðh>/\f©þdSiz";var a=(e+this.padding).substr(0,32),o=(r+this.padding).substr(0,32);this.O=this.processOwnerPassword(a,o),this.P=-(1+(255^i)),this.encryptionKey=x(a+this.O+this.lsbFirstWord(this.P)+this.hexToBytes(n)).substr(0,5),this.U=P(this.encryptionKey,this.padding)}function F(t){if(/[^\u0000-\u00ff]/.test(t))throw new Error("Invalid PDF Name Object: "+t+", Only accept ASCII characters.");for(var e="",r=t.length,n=0;n<r;n++){var i=t.charCodeAt(n);if(i<33||35===i||37===i||40===i||41===i||47===i||60===i||62===i||91===i||93===i||123===i||125===i||i>126)e+="#"+("0"+i.toString(16)).slice(-2);else e+=t[n]}return e}function C(e){if("object"!==(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(e))throw new Error("Invalid Context passed to initialize PubSub (jsPDF-module)");var r={};this.subscribe=function(t,e,n){if(n=n||!1,"string"!=typeof t||"function"!=typeof e||"boolean"!=typeof n)throw new Error("Invalid arguments passed to PubSub.subscribe (jsPDF-module)");r.hasOwnProperty(t)||(r[t]={});var i=Math.random().toString(35);return r[t][i]=[e,!!n],i},this.unsubscribe=function(t){for(var e in r)if(r[e][t])return delete r[e][t],0===Object.keys(r[e]).length&&delete r[e],!0;return!1},this.publish=function(t){if(r.hasOwnProperty(t)){var i=Array.prototype.slice.call(arguments,1),o=[];for(var s in r[t]){var c=r[t][s];try{c[0].apply(e,i)}catch(t){n.console&&a.error("jsPDF PubSub Error",t.message,t)}c[1]&&o.push(s)}o.length&&o.forEach(this.unsubscribe)}},this.getTopics=function(){return r}}function j(t){if(!(this instanceof j))return new j(t);var e="opacity,stroke-opacity".split(",");for(var r in t)t.hasOwnProperty(r)&&e.indexOf(r)>=0&&(this[r]=t[r]);this.id="",this.objectNumber=-1}function O(t,e){this.gState=t,this.matrix=e,this.id="",this.objectNumber=-1}function B(t,e,r,n,i){if(!(this instanceof B))return new B(t,e,r,n,i);this.type="axial"===t?2:3,this.coords=e,this.colors=r,O.call(this,n,i)}function M(t,e,r,n,i){if(!(this instanceof M))return new M(t,e,r,n,i);this.boundingBox=t,this.xStep=e,this.yStep=r,this.stream="",this.cloneIndex=0,O.call(this,n,i)}function E(e){var r,i="string"==typeof arguments[0]?arguments[0]:"p",o=arguments[1],s=arguments[2],c=arguments[3],u=[],d=1,p=16,g="S",m=null;"object"===(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(e=e||{})&&(i=e.orientation,o=e.unit||o,s=e.format||s,c=e.compress||e.compressPdf||c,null!==(m=e.encryption||null)&&(m.userPassword=m.userPassword||"",m.ownerPassword=m.ownerPassword||"",m.userPermissions=m.userPermissions||[]),d="number"==typeof e.userUnit?Math.abs(e.userUnit):1,void 0!==e.precision&&(r=e.precision),void 0!==e.floatPrecision&&(p=e.floatPrecision),g=e.defaultPathOperation||"S"),u=e.filters||(!0===c?["FlateEncode"]:u),o=o||"mm",i=(""+(i||"P")).toLowerCase();var v=e.putOnlyUsedFonts||!1,b={},y={internal:{},__private__:{}};y.__private__.PubSub=C;var w="1.3",N=y.__private__.getPdfVersion=function(){return w};y.__private__.setPdfVersion=function(t){w=t};var L={a0:[2383.94,3370.39],a1:[1683.78,2383.94],a2:[1190.55,1683.78],a3:[841.89,1190.55],a4:[595.28,841.89],a5:[419.53,595.28],a6:[297.64,419.53],a7:[209.76,297.64],a8:[147.4,209.76],a9:[104.88,147.4],a10:[73.7,104.88],b0:[2834.65,4008.19],b1:[2004.09,2834.65],b2:[1417.32,2004.09],b3:[1000.63,1417.32],b4:[708.66,1000.63],b5:[498.9,708.66],b6:[354.33,498.9],b7:[249.45,354.33],b8:[175.75,249.45],b9:[124.72,175.75],b10:[87.87,124.72],c0:[2599.37,3676.54],c1:[1836.85,2599.37],c2:[1298.27,1836.85],c3:[918.43,1298.27],c4:[649.13,918.43],c5:[459.21,649.13],c6:[323.15,459.21],c7:[229.61,323.15],c8:[161.57,229.61],c9:[113.39,161.57],c10:[79.37,113.39],dl:[311.81,623.62],letter:[612,792],"government-letter":[576,756],legal:[612,1008],"junior-legal":[576,360],ledger:[1224,792],tabloid:[792,1224],"credit-card":[153,243]};y.__private__.getPageFormats=function(){return L};var A=y.__private__.getPageFormat=function(t){return L[t]};s=s||"a4";var x={COMPAT:"compat",ADVANCED:"advanced"},S=x.COMPAT;function _(){this.saveGraphicsState(),lt(new Vt(_t,0,0,-_t,0,Rr()*_t).toString()+" cm"),this.setFontSize(this.getFontSize()/_t),g="n",S=x.ADVANCED}function P(){this.restoreGraphicsState(),g="S",S=x.COMPAT}var k=y.__private__.combineFontStyleAndFontWeight=function(t,e){if("bold"==t&&"normal"==e||"bold"==t&&400==e||"normal"==t&&"italic"==e||"bold"==t&&"italic"==e)throw new Error("Invalid Combination of fontweight and fontstyle");return e&&(t=400==e||"normal"===e?"italic"===t?"italic":"normal":700!=e&&"bold"!==e||"normal"!==t?(700==e?"bold":e)+""+t:"bold"),t};y.advancedAPI=function(t){var e=S===x.COMPAT;return e&&_.call(this),"function"!=typeof t||(t(this),e&&P.call(this)),this},y.compatAPI=function(t){var e=S===x.ADVANCED;return e&&P.call(this),"function"!=typeof t||(t(this),e&&_.call(this)),this},y.isAdvancedAPI=function(){return S===x.ADVANCED};var O,q=function(t){if(S!==x.ADVANCED)throw new Error(t+" is only available in 'advanced' API mode. You need to call advancedAPI() first.")},D=y.roundToPrecision=y.__private__.roundToPrecision=function(t,e){var n=r||e;if(isNaN(t)||isNaN(n))throw new Error("Invalid argument passed to jsPDF.roundToPrecision");return t.toFixed(n).replace(/0+$/,"")};O=y.hpf=y.__private__.hpf="number"==typeof p?function(t){if(isNaN(t))throw new Error("Invalid argument passed to jsPDF.hpf");return D(t,p)}:"smart"===p?function(t){if(isNaN(t))throw new Error("Invalid argument passed to jsPDF.hpf");return D(t,t>-1&&t<1?16:5)}:function(t){if(isNaN(t))throw new Error("Invalid argument passed to jsPDF.hpf");return D(t,16)};var R=y.f2=y.__private__.f2=function(t){if(isNaN(t))throw new Error("Invalid argument passed to jsPDF.f2");return D(t,2)},T=y.__private__.f3=function(t){if(isNaN(t))throw new Error("Invalid argument passed to jsPDF.f3");return D(t,3)},U=y.scale=y.__private__.scale=function(t){if(isNaN(t))throw new Error("Invalid argument passed to jsPDF.scale");return S===x.COMPAT?t*_t:S===x.ADVANCED?t:void 0},z=function(t){return S===x.COMPAT?Rr()-t:S===x.ADVANCED?t:void 0},H=function(t){return U(z(t))};y.__private__.setPrecision=y.setPrecision=function(t){"number"==typeof parseInt(t,10)&&(r=parseInt(t,10))};var W,V="00000000000000000000000000000000",G=y.__private__.getFileId=function(){return V},Y=y.__private__.setFileId=function(t){return V=void 0!==t&&/^[a-fA-F0-9]{32}$/.test(t)?t.toUpperCase():V.split("").map((function(){return"ABCDEF0123456789".charAt(Math.floor(16*Math.random()))})).join(""),null!==m&&(Ye=new I(m.userPermissions,m.userPassword,m.ownerPassword,V)),V};y.setFileId=function(t){return Y(t),this},y.getFileId=function(){return G()};var J=y.__private__.convertDateToPDFDate=function(t){var e=t.getTimezoneOffset(),r=e<0?"+":"-",n=Math.floor(Math.abs(e/60)),i=Math.abs(e%60),a=[r,Q(n),"'",Q(i),"'"].join("");return["D:",t.getFullYear(),Q(t.getMonth()+1),Q(t.getDate()),Q(t.getHours()),Q(t.getMinutes()),Q(t.getSeconds()),a].join("")},X=y.__private__.convertPDFDateToDate=function(t){var e=parseInt(t.substr(2,4),10),r=parseInt(t.substr(6,2),10)-1,n=parseInt(t.substr(8,2),10),i=parseInt(t.substr(10,2),10),a=parseInt(t.substr(12,2),10),o=parseInt(t.substr(14,2),10);return new Date(e,r,n,i,a,o,0)},K=y.__private__.setCreationDate=function(t){var e;if(void 0===t&&(t=new Date),t instanceof Date)e=J(t);else{if(!/^D:(20[0-2][0-9]|203[0-7]|19[7-9][0-9])(0[0-9]|1[0-2])([0-2][0-9]|3[0-1])(0[0-9]|1[0-9]|2[0-3])(0[0-9]|[1-5][0-9])(0[0-9]|[1-5][0-9])(\+0[0-9]|\+1[0-4]|-0[0-9]|-1[0-1])'(0[0-9]|[1-5][0-9])'?$/.test(t))throw new Error("Invalid argument passed to jsPDF.setCreationDate");e=t}return W=e},Z=y.__private__.getCreationDate=function(t){var e=W;return"jsDate"===t&&(e=X(W)),e};y.setCreationDate=function(t){return K(t),this},y.getCreationDate=function(t){return Z(t)};var $,Q=y.__private__.padd2=function(t){return("0"+parseInt(t)).slice(-2)},tt=y.__private__.padd2Hex=function(t){return("00"+(t=t.toString())).substr(t.length)},et=0,rt=[],nt=[],it=0,at=[],ot=[],st=!1,ct=nt,ut=function(){et=0,it=0,nt=[],rt=[],at=[],Qt=Kt(),te=Kt()};y.__private__.setCustomOutputDestination=function(t){st=!0,ct=t};var ht=function(t){st||(ct=t)};y.__private__.resetCustomOutputDestination=function(){st=!1,ct=nt};var lt=y.__private__.out=function(t){return t=t.toString(),it+=t.length+1,ct.push(t),ct},ft=y.__private__.write=function(t){return lt(1===arguments.length?t.toString():Array.prototype.join.call(arguments," "))},dt=y.__private__.getArrayBuffer=function(t){for(var e=t.length,r=new ArrayBuffer(e),n=new Uint8Array(r);e--;)n[e]=t.charCodeAt(e);return r},pt=[["Helvetica","helvetica","normal","WinAnsiEncoding"],["Helvetica-Bold","helvetica","bold","WinAnsiEncoding"],["Helvetica-Oblique","helvetica","italic","WinAnsiEncoding"],["Helvetica-BoldOblique","helvetica","bolditalic","WinAnsiEncoding"],["Courier","courier","normal","WinAnsiEncoding"],["Courier-Bold","courier","bold","WinAnsiEncoding"],["Courier-Oblique","courier","italic","WinAnsiEncoding"],["Courier-BoldOblique","courier","bolditalic","WinAnsiEncoding"],["Times-Roman","times","normal","WinAnsiEncoding"],["Times-Bold","times","bold","WinAnsiEncoding"],["Times-Italic","times","italic","WinAnsiEncoding"],["Times-BoldItalic","times","bolditalic","WinAnsiEncoding"],["ZapfDingbats","zapfdingbats","normal",null],["Symbol","symbol","normal",null]];y.__private__.getStandardFonts=function(){return pt};var gt=e.fontSize||16;y.__private__.setFontSize=y.setFontSize=function(t){return gt=S===x.ADVANCED?t/_t:t,this};var mt,vt=y.__private__.getFontSize=y.getFontSize=function(){return S===x.COMPAT?gt:gt*_t},bt=e.R2L||!1;y.__private__.setR2L=y.setR2L=function(t){return bt=t,this},y.__private__.getR2L=y.getR2L=function(){return bt};var yt,wt=y.__private__.setZoomMode=function(t){var e=[void 0,null,"fullwidth","fullheight","fullpage","original"];if(/^(?:\d+\.\d*|\d*\.\d+|\d+)%$/.test(t))mt=t;else if(isNaN(t)){if(-1===e.indexOf(t))throw new Error('zoom must be Integer (e.g. 2), a percentage Value (e.g. 300%) or fullwidth, fullheight, fullpage, original. "'+t+'" is not recognized.');mt=t}else mt=parseInt(t,10)};y.__private__.getZoomMode=function(){return mt};var Nt,Lt=y.__private__.setPageMode=function(t){if(-1==[void 0,null,"UseNone","UseOutlines","UseThumbs","FullScreen"].indexOf(t))throw new Error('Page mode must be one of UseNone, UseOutlines, UseThumbs, or FullScreen. "'+t+'" is not recognized.');yt=t};y.__private__.getPageMode=function(){return yt};var At=y.__private__.setLayoutMode=function(t){if(-1==[void 0,null,"continuous","single","twoleft","tworight","two"].indexOf(t))throw new Error('Layout mode must be one of continuous, single, twoleft, tworight. "'+t+'" is not recognized.');Nt=t};y.__private__.getLayoutMode=function(){return Nt},y.__private__.setDisplayMode=y.setDisplayMode=function(t,e,r){return wt(t),At(e),Lt(r),this};var xt={title:"",subject:"",author:"",keywords:"",creator:""};y.__private__.getDocumentProperty=function(t){if(-1===Object.keys(xt).indexOf(t))throw new Error("Invalid argument passed to jsPDF.getDocumentProperty");return xt[t]},y.__private__.getDocumentProperties=function(){return xt},y.__private__.setDocumentProperties=y.setProperties=y.setDocumentProperties=function(t){for(var e in xt)xt.hasOwnProperty(e)&&t[e]&&(xt[e]=t[e]);return this},y.__private__.setDocumentProperty=function(t,e){if(-1===Object.keys(xt).indexOf(t))throw new Error("Invalid arguments passed to jsPDF.setDocumentProperty");return xt[t]=e};var St,_t,Pt,kt,It,Ft={},Ct={},jt=[],Ot={},Bt={},Mt={},Et={},qt=null,Dt=0,Rt=[],Tt=new C(y),Ut=e.hotfixes||[],zt={},Ht={},Wt=[],Vt=function t(e,r,n,i,a,o){if(!(this instanceof t))return new t(e,r,n,i,a,o);isNaN(e)&&(e=1),isNaN(r)&&(r=0),isNaN(n)&&(n=0),isNaN(i)&&(i=1),isNaN(a)&&(a=0),isNaN(o)&&(o=0),this._matrix=[e,r,n,i,a,o]};Object.defineProperty(Vt.prototype,"sx",{get:function(){return this._matrix[0]},set:function(t){this._matrix[0]=t}}),Object.defineProperty(Vt.prototype,"shy",{get:function(){return this._matrix[1]},set:function(t){this._matrix[1]=t}}),Object.defineProperty(Vt.prototype,"shx",{get:function(){return this._matrix[2]},set:function(t){this._matrix[2]=t}}),Object.defineProperty(Vt.prototype,"sy",{get:function(){return this._matrix[3]},set:function(t){this._matrix[3]=t}}),Object.defineProperty(Vt.prototype,"tx",{get:function(){return this._matrix[4]},set:function(t){this._matrix[4]=t}}),Object.defineProperty(Vt.prototype,"ty",{get:function(){return this._matrix[5]},set:function(t){this._matrix[5]=t}}),Object.defineProperty(Vt.prototype,"a",{get:function(){return this._matrix[0]},set:function(t){this._matrix[0]=t}}),Object.defineProperty(Vt.prototype,"b",{get:function(){return this._matrix[1]},set:function(t){this._matrix[1]=t}}),Object.defineProperty(Vt.prototype,"c",{get:function(){return this._matrix[2]},set:function(t){this._matrix[2]=t}}),Object.defineProperty(Vt.prototype,"d",{get:function(){return this._matrix[3]},set:function(t){this._matrix[3]=t}}),Object.defineProperty(Vt.prototype,"e",{get:function(){return this._matrix[4]},set:function(t){this._matrix[4]=t}}),Object.defineProperty(Vt.prototype,"f",{get:function(){return this._matrix[5]},set:function(t){this._matrix[5]=t}}),Object.defineProperty(Vt.prototype,"rotation",{get:function(){return Math.atan2(this.shx,this.sx)}}),Object.defineProperty(Vt.prototype,"scaleX",{get:function(){return this.decompose().scale.sx}}),Object.defineProperty(Vt.prototype,"scaleY",{get:function(){return this.decompose().scale.sy}}),Object.defineProperty(Vt.prototype,"isIdentity",{get:function(){return 1===this.sx&&(0===this.shy&&(0===this.shx&&(1===this.sy&&(0===this.tx&&0===this.ty))))}}),Vt.prototype.join=function(t){return[this.sx,this.shy,this.shx,this.sy,this.tx,this.ty].map(O).join(t)},Vt.prototype.multiply=function(t){var e=t.sx*this.sx+t.shy*this.shx,r=t.sx*this.shy+t.shy*this.sy,n=t.shx*this.sx+t.sy*this.shx,i=t.shx*this.shy+t.sy*this.sy,a=t.tx*this.sx+t.ty*this.shx+this.tx,o=t.tx*this.shy+t.ty*this.sy+this.ty;return new Vt(e,r,n,i,a,o)},Vt.prototype.decompose=function(){var t=this.sx,e=this.shy,r=this.shx,n=this.sy,i=this.tx,a=this.ty,o=Math.sqrt(t*t+e*e),s=(t/=o)*r+(e/=o)*n;r-=t*s,n-=e*s;var c=Math.sqrt(r*r+n*n);return s/=c,t*(n/=c)<e*(r/=c)&&(t=-t,e=-e,s=-s,o=-o),{scale:new Vt(o,0,0,c,0,0),translate:new Vt(1,0,0,1,i,a),rotate:new Vt(t,e,-e,t,0,0),skew:new Vt(1,0,s,1,0,0)}},Vt.prototype.toString=function(t){return this.join(" ")},Vt.prototype.inversed=function(){var t=this.sx,e=this.shy,r=this.shx,n=this.sy,i=this.tx,a=this.ty,o=1/(t*n-e*r),s=n*o,c=-e*o,u=-r*o,h=t*o;return new Vt(s,c,u,h,-s*i-u*a,-c*i-h*a)},Vt.prototype.applyToPoint=function(t){var e=t.x*this.sx+t.y*this.shx+this.tx,r=t.x*this.shy+t.y*this.sy+this.ty;return new Cr(e,r)},Vt.prototype.applyToRectangle=function(t){var e=this.applyToPoint(t),r=this.applyToPoint(new Cr(t.x+t.w,t.y+t.h));return new jr(e.x,e.y,r.x-e.x,r.y-e.y)},Vt.prototype.clone=function(){var t=this.sx,e=this.shy,r=this.shx,n=this.sy,i=this.tx,a=this.ty;return new Vt(t,e,r,n,i,a)},y.Matrix=Vt;var Gt=y.matrixMult=function(t,e){return e.multiply(t)},Yt=new Vt(1,0,0,1,0,0);y.unitMatrix=y.identityMatrix=Yt;var Jt=function(t,e){if(!Bt[t]){var r=(e instanceof B?"Sh":"P")+(Object.keys(Ot).length+1).toString(10);e.id=r,Bt[t]=r,Ot[r]=e,Tt.publish("addPattern",e)}};y.ShadingPattern=B,y.TilingPattern=M,y.addShadingPattern=function(t,e){return q("addShadingPattern()"),Jt(t,e),this},y.beginTilingPattern=function(t){q("beginTilingPattern()"),Br(t.boundingBox[0],t.boundingBox[1],t.boundingBox[2]-t.boundingBox[0],t.boundingBox[3]-t.boundingBox[1],t.matrix)},y.endTilingPattern=function(t,e){q("endTilingPattern()"),e.stream=ot[$].join("\n"),Jt(t,e),Tt.publish("endTilingPattern",e),Wt.pop().restore()};var Xt=y.__private__.newObject=function(){var t=Kt();return Zt(t,!0),t},Kt=y.__private__.newObjectDeferred=function(){return et++,rt[et]=function(){return it},et},Zt=function(t,e){return e="boolean"==typeof e&&e,rt[t]=it,e&&lt(t+" 0 obj"),t},$t=y.__private__.newAdditionalObject=function(){var t={objId:Kt(),content:""};return at.push(t),t},Qt=Kt(),te=Kt(),ee=y.__private__.decodeColorString=function(t){var e=t.split(" ");if(2!==e.length||"g"!==e[1]&&"G"!==e[1]){if(5===e.length&&("k"===e[4]||"K"===e[4])){e=[(1-e[0])*(1-e[3]),(1-e[1])*(1-e[3]),(1-e[2])*(1-e[3]),"r"]}}else{var r=parseFloat(e[0]);e=[r,r,r,"r"]}for(var n="#",i=0;i<3;i++)n+=("0"+Math.floor(255*parseFloat(e[i])).toString(16)).slice(-2);return n},re=y.__private__.encodeColorString=function(e){var r;"string"==typeof e&&(e={ch1:e});var n=e.ch1,i=e.ch2,a=e.ch3,o=e.ch4,s="draw"===e.pdfColorType?["G","RG","K"]:["g","rg","k"];if("string"==typeof n&&"#"!==n.charAt(0)){var c=new f(n);if(c.ok)n=c.toHex();else if(!/^\d*\.?\d*$/.test(n))throw new Error('Invalid color "'+n+'" passed to jsPDF.encodeColorString.')}if("string"==typeof n&&/^#[0-9A-Fa-f]{3}$/.test(n)&&(n="#"+n[1]+n[1]+n[2]+n[2]+n[3]+n[3]),"string"==typeof n&&/^#[0-9A-Fa-f]{6}$/.test(n)){var u=parseInt(n.substr(1),16);n=u>>16&255,i=u>>8&255,a=255&u}if(void 0===i||void 0===o&&n===i&&i===a)if("string"==typeof n)r=n+" "+s[0];else switch(e.precision){case 2:r=R(n/255)+" "+s[0];break;case 3:default:r=T(n/255)+" "+s[0]}else if(void 0===o||"object"===(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(o)){if(o&&!isNaN(o.a)&&0===o.a)return r=["1.","1.","1.",s[1]].join(" ");if("string"==typeof n)r=[n,i,a,s[1]].join(" ");else switch(e.precision){case 2:r=[R(n/255),R(i/255),R(a/255),s[1]].join(" ");break;default:case 3:r=[T(n/255),T(i/255),T(a/255),s[1]].join(" ")}}else if("string"==typeof n)r=[n,i,a,o,s[2]].join(" ");else switch(e.precision){case 2:r=[R(n),R(i),R(a),R(o),s[2]].join(" ");break;case 3:default:r=[T(n),T(i),T(a),T(o),s[2]].join(" ")}return r},ne=y.__private__.getFilters=function(){return u},ie=y.__private__.putStream=function(t){var e=(t=t||{}).data||"",r=t.filters||ne(),n=t.alreadyAppliedFilters||[],i=t.addLength1||!1,a=e.length,o=t.objectId,s=function(t){return t};if(null!==m&&void 0===o)throw new Error("ObjectId must be passed to putStream for file encryption");null!==m&&(s=Ye.encryptor(o,0));var c={};!0===r&&(r=["FlateEncode"]);var u=t.additionalKeyValues||[],h=(c=void 0!==E.API.processDataByFilters?E.API.processDataByFilters(e,r):{data:e,reverseChain:[]}).reverseChain+(Array.isArray(n)?n.join(" "):n.toString());if(0!==c.data.length&&(u.push({key:"Length",value:c.data.length}),!0===i&&u.push({key:"Length1",value:a})),0!=h.length)if(h.split("/").length-1==1)u.push({key:"Filter",value:h});else{u.push({key:"Filter",value:"["+h+"]"});for(var l=0;l<u.length;l+=1)if("DecodeParms"===u[l].key){for(var f=[],d=0;d<c.reverseChain.split("/").length-1;d+=1)f.push("null");f.push(u[l].value),u[l].value="["+f.join(" ")+"]"}}lt("<<");for(var p=0;p<u.length;p++)lt("/"+u[p].key+" "+u[p].value);lt(">>"),0!==c.data.length&&(lt("stream"),lt(s(c.data)),lt("endstream"))},ae=y.__private__.putPage=function(t){var e=t.number,r=t.data,n=t.objId,i=t.contentsObjId;Zt(n,!0),lt("<</Type /Page"),lt("/Parent "+t.rootDictionaryObjId+" 0 R"),lt("/Resources "+t.resourceDictionaryObjId+" 0 R"),lt("/MediaBox ["+parseFloat(O(t.mediaBox.bottomLeftX))+" "+parseFloat(O(t.mediaBox.bottomLeftY))+" "+O(t.mediaBox.topRightX)+" "+O(t.mediaBox.topRightY)+"]"),null!==t.cropBox&&lt("/CropBox ["+O(t.cropBox.bottomLeftX)+" "+O(t.cropBox.bottomLeftY)+" "+O(t.cropBox.topRightX)+" "+O(t.cropBox.topRightY)+"]"),null!==t.bleedBox&&lt("/BleedBox ["+O(t.bleedBox.bottomLeftX)+" "+O(t.bleedBox.bottomLeftY)+" "+O(t.bleedBox.topRightX)+" "+O(t.bleedBox.topRightY)+"]"),null!==t.trimBox&&lt("/TrimBox ["+O(t.trimBox.bottomLeftX)+" "+O(t.trimBox.bottomLeftY)+" "+O(t.trimBox.topRightX)+" "+O(t.trimBox.topRightY)+"]"),null!==t.artBox&&lt("/ArtBox ["+O(t.artBox.bottomLeftX)+" "+O(t.artBox.bottomLeftY)+" "+O(t.artBox.topRightX)+" "+O(t.artBox.topRightY)+"]"),"number"==typeof t.userUnit&&1!==t.userUnit&&lt("/UserUnit "+t.userUnit),Tt.publish("putPage",{objId:n,pageContext:Rt[e],pageNumber:e,page:r}),lt("/Contents "+i+" 0 R"),lt(">>"),lt("endobj");var a=r.join("\n");return S===x.ADVANCED&&(a+="\nQ"),Zt(i,!0),ie({data:a,filters:ne(),objectId:i}),lt("endobj"),n},oe=y.__private__.putPages=function(){var t,e,r=[];for(t=1;t<=Dt;t++)Rt[t].objId=Kt(),Rt[t].contentsObjId=Kt();for(t=1;t<=Dt;t++)r.push(ae({number:t,data:ot[t],objId:Rt[t].objId,contentsObjId:Rt[t].contentsObjId,mediaBox:Rt[t].mediaBox,cropBox:Rt[t].cropBox,bleedBox:Rt[t].bleedBox,trimBox:Rt[t].trimBox,artBox:Rt[t].artBox,userUnit:Rt[t].userUnit,rootDictionaryObjId:Qt,resourceDictionaryObjId:te}));Zt(Qt,!0),lt("<</Type /Pages");var n="/Kids [";for(e=0;e<Dt;e++)n+=r[e]+" 0 R ";lt(n+"]"),lt("/Count "+Dt),lt(">>"),lt("endobj"),Tt.publish("postPutPages")},se=function(t){Tt.publish("putFont",{font:t,out:lt,newObject:Xt,putStream:ie}),!0!==t.isAlreadyPutted&&(t.objectNumber=Xt(),lt("<<"),lt("/Type /Font"),lt("/BaseFont /"+F(t.postScriptName)),lt("/Subtype /Type1"),"string"==typeof t.encoding&&lt("/Encoding /"+t.encoding),lt("/FirstChar 32"),lt("/LastChar 255"),lt(">>"),lt("endobj"))},ce=function(){for(var t in Ft)Ft.hasOwnProperty(t)&&(!1===v||!0===v&&b.hasOwnProperty(t))&&se(Ft[t])},ue=function(t){t.objectNumber=Xt();var e=[];e.push({key:"Type",value:"/XObject"}),e.push({key:"Subtype",value:"/Form"}),e.push({key:"BBox",value:"["+[O(t.x),O(t.y),O(t.x+t.width),O(t.y+t.height)].join(" ")+"]"}),e.push({key:"Matrix",value:"["+t.matrix.toString()+"]"});var r=t.pages[1].join("\n");ie({data:r,additionalKeyValues:e,objectId:t.objectNumber}),lt("endobj")},he=function(){for(var t in zt)zt.hasOwnProperty(t)&&ue(zt[t])},le=function(t,e){var r,n=[],i=1/(e-1);for(r=0;r<1;r+=i)n.push(r);if(n.push(1),0!=t[0].offset){var a={offset:0,color:t[0].color};t.unshift(a)}if(1!=t[t.length-1].offset){var o={offset:1,color:t[t.length-1].color};t.push(o)}for(var s="",c=0,u=0;u<n.length;u++){for(r=n[u];r>t[c+1].offset;)c++;var h=t[c].offset,l=(r-h)/(t[c+1].offset-h),f=t[c].color,d=t[c+1].color;s+=tt(Math.round((1-l)*f[0]+l*d[0]).toString(16))+tt(Math.round((1-l)*f[1]+l*d[1]).toString(16))+tt(Math.round((1-l)*f[2]+l*d[2]).toString(16))}return s.trim()},fe=function(t,e){e||(e=21);var r=Xt(),n=le(t.colors,e),i=[];i.push({key:"FunctionType",value:"0"}),i.push({key:"Domain",value:"[0.0 1.0]"}),i.push({key:"Size",value:"["+e+"]"}),i.push({key:"BitsPerSample",value:"8"}),i.push({key:"Range",value:"[0.0 1.0 0.0 1.0 0.0 1.0]"}),i.push({key:"Decode",value:"[0.0 1.0 0.0 1.0 0.0 1.0]"}),ie({data:n,additionalKeyValues:i,alreadyAppliedFilters:["/ASCIIHexDecode"],objectId:r}),lt("endobj"),t.objectNumber=Xt(),lt("<< /ShadingType "+t.type),lt("/ColorSpace /DeviceRGB");var a="/Coords ["+O(parseFloat(t.coords[0]))+" "+O(parseFloat(t.coords[1]))+" ";2===t.type?a+=O(parseFloat(t.coords[2]))+" "+O(parseFloat(t.coords[3])):a+=O(parseFloat(t.coords[2]))+" "+O(parseFloat(t.coords[3]))+" "+O(parseFloat(t.coords[4]))+" "+O(parseFloat(t.coords[5])),lt(a+="]"),t.matrix&&lt("/Matrix ["+t.matrix.toString()+"]"),lt("/Function "+r+" 0 R"),lt("/Extend [true true]"),lt(">>"),lt("endobj")},de=function(t,e){var r=Kt(),n=Xt();e.push({resourcesOid:r,objectOid:n}),t.objectNumber=n;var i=[];i.push({key:"Type",value:"/Pattern"}),i.push({key:"PatternType",value:"1"}),i.push({key:"PaintType",value:"1"}),i.push({key:"TilingType",value:"1"}),i.push({key:"BBox",value:"["+t.boundingBox.map(O).join(" ")+"]"}),i.push({key:"XStep",value:O(t.xStep)}),i.push({key:"YStep",value:O(t.yStep)}),i.push({key:"Resources",value:r+" 0 R"}),t.matrix&&i.push({key:"Matrix",value:"["+t.matrix.toString()+"]"}),ie({data:t.stream,additionalKeyValues:i,objectId:t.objectNumber}),lt("endobj")},pe=function(t){var e;for(e in Ot)Ot.hasOwnProperty(e)&&(Ot[e]instanceof B?fe(Ot[e]):Ot[e]instanceof M&&de(Ot[e],t))},ge=function(t){for(var e in t.objectNumber=Xt(),lt("<<"),t)switch(e){case"opacity":lt("/ca "+R(t[e]));break;case"stroke-opacity":lt("/CA "+R(t[e]))}lt(">>"),lt("endobj")},me=function(){var t;for(t in Mt)Mt.hasOwnProperty(t)&&ge(Mt[t])},ve=function(){for(var t in lt("/XObject <<"),zt)zt.hasOwnProperty(t)&&zt[t].objectNumber>=0&&lt("/"+t+" "+zt[t].objectNumber+" 0 R");Tt.publish("putXobjectDict"),lt(">>")},be=function(){Ye.oid=Xt(),lt("<<"),lt("/Filter /Standard"),lt("/V "+Ye.v),lt("/R "+Ye.r),lt("/U <"+Ye.toHexString(Ye.U)+">"),lt("/O <"+Ye.toHexString(Ye.O)+">"),lt("/P "+Ye.P),lt(">>"),lt("endobj")},ye=function(){for(var t in lt("/Font <<"),Ft)Ft.hasOwnProperty(t)&&(!1===v||!0===v&&b.hasOwnProperty(t))&&lt("/"+t+" "+Ft[t].objectNumber+" 0 R");lt(">>")},we=function(){if(Object.keys(Ot).length>0){for(var t in lt("/Shading <<"),Ot)Ot.hasOwnProperty(t)&&Ot[t]instanceof B&&Ot[t].objectNumber>=0&&lt("/"+t+" "+Ot[t].objectNumber+" 0 R");Tt.publish("putShadingPatternDict"),lt(">>")}},Ne=function(t){if(Object.keys(Ot).length>0){for(var e in lt("/Pattern <<"),Ot)Ot.hasOwnProperty(e)&&Ot[e]instanceof y.TilingPattern&&Ot[e].objectNumber>=0&&Ot[e].objectNumber<t&&lt("/"+e+" "+Ot[e].objectNumber+" 0 R");Tt.publish("putTilingPatternDict"),lt(">>")}},Le=function(){if(Object.keys(Mt).length>0){var t;for(t in lt("/ExtGState <<"),Mt)Mt.hasOwnProperty(t)&&Mt[t].objectNumber>=0&&lt("/"+t+" "+Mt[t].objectNumber+" 0 R");Tt.publish("putGStateDict"),lt(">>")}},Ae=function(t){Zt(t.resourcesOid,!0),lt("<<"),lt("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]"),ye(),we(),Ne(t.objectOid),Le(),ve(),lt(">>"),lt("endobj")},xe=function(){var t=[];ce(),me(),he(),pe(t),Tt.publish("putResources"),t.forEach(Ae),Ae({resourcesOid:te,objectOid:Number.MAX_SAFE_INTEGER}),Tt.publish("postPutResources")},Se=function(){Tt.publish("putAdditionalObjects");for(var t=0;t<at.length;t++){var e=at[t];Zt(e.objId,!0),lt(e.content),lt("endobj")}Tt.publish("postPutAdditionalObjects")},_e=function(t){Ct[t.fontName]=Ct[t.fontName]||{},Ct[t.fontName][t.fontStyle]=t.id},Pe=function(t,e,r,n,i){var a={id:"F"+(Object.keys(Ft).length+1).toString(10),postScriptName:t,fontName:e,fontStyle:r,encoding:n,isStandardFont:i||!1,metadata:{}};return Tt.publish("addFont",{font:a,instance:this}),Ft[a.id]=a,_e(a),a.id},ke=function(t){for(var e=0,r=pt.length;e<r;e++){var n=Pe.call(this,t[e][0],t[e][1],t[e][2],pt[e][3],!0);!1===v&&(b[n]=!0);var i=t[e][0].split("-");_e({id:n,fontName:i[0],fontStyle:i[1]||""})}Tt.publish("addFonts",{fonts:Ft,dictionary:Ct})},Ie=function(t){return t.foo=function(){try{return t.apply(this,arguments)}catch(t){var e=t.stack||"";~e.indexOf(" at ")&&(e=e.split(" at ")[1]);var r="Error in function "+e.split("\n")[0].split("<")[0]+": "+t.message;if(!n.console)throw new Error(r);n.console.error(r,t),n.alert&&alert(r)}},t.foo.bar=t,t.foo},Fe=function(t,e){var r,n,i,a,o,s,c,u,h;if(i=(e=e||{}).sourceEncoding||"Unicode",o=e.outputEncoding,(e.autoencode||o)&&Ft[St].metadata&&Ft[St].metadata[i]&&Ft[St].metadata[i].encoding&&(a=Ft[St].metadata[i].encoding,!o&&Ft[St].encoding&&(o=Ft[St].encoding),!o&&a.codePages&&(o=a.codePages[0]),"string"==typeof o&&(o=a[o]),o)){for(c=!1,s=[],r=0,n=t.length;r<n;r++)(u=o[t.charCodeAt(r)])?s.push(String.fromCharCode(u)):s.push(t[r]),s[r].charCodeAt(0)>>8&&(c=!0);t=s.join("")}for(r=t.length;void 0===c&&0!==r;)t.charCodeAt(r-1)>>8&&(c=!0),r--;if(!c)return t;for(s=e.noBOM?[]:[254,255],r=0,n=t.length;r<n;r++){if((h=(u=t.charCodeAt(r))>>8)>>8)throw new Error("Character at position "+r+" of string '"+t+"' exceeds 16bits. Cannot be encoded into UCS-2 BE");s.push(h),s.push(u-(h<<8))}return String.fromCharCode.apply(void 0,s)},Ce=y.__private__.pdfEscape=y.pdfEscape=function(t,e){return Fe(t,e).replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")},je=y.__private__.beginPage=function(t){ot[++Dt]=[],Rt[Dt]={objId:0,contentsObjId:0,userUnit:Number(d),artBox:null,bleedBox:null,cropBox:null,trimBox:null,mediaBox:{bottomLeftX:0,bottomLeftY:0,topRightX:Number(t[0]),topRightY:Number(t[1])}},Me(Dt),ht(ot[$])},Oe=function(t,e){var r,n,o;switch(i=e||i,"string"==typeof t&&(r=A(t.toLowerCase()),Array.isArray(r)&&(n=r[0],o=r[1])),Array.isArray(t)&&(n=t[0]*_t,o=t[1]*_t),isNaN(n)&&(n=s[0],o=s[1]),(n>14400||o>14400)&&(a.warn("A page in a PDF can not be wider or taller than 14400 userUnit. jsPDF limits the width/height to 14400"),n=Math.min(14400,n),o=Math.min(14400,o)),s=[n,o],i.substr(0,1)){case"l":o>n&&(s=[o,n]);break;case"p":n>o&&(s=[o,n])}je(s),pr(fr),lt(Lr),0!==kr&&lt(kr+" J"),0!==Ir&&lt(Ir+" j"),Tt.publish("addPage",{pageNumber:Dt})},Be=function(t){t>0&&t<=Dt&&(ot.splice(t,1),Rt.splice(t,1),Dt--,$>Dt&&($=Dt),this.setPage($))},Me=function(t){t>0&&t<=Dt&&($=t)},Ee=y.__private__.getNumberOfPages=y.getNumberOfPages=function(){return ot.length-1},qe=function(t,e,r){var n,i=void 0;return r=r||{},t=void 0!==t?t:Ft[St].fontName,e=void 0!==e?e:Ft[St].fontStyle,n=t.toLowerCase(),void 0!==Ct[n]&&void 0!==Ct[n][e]?i=Ct[n][e]:void 0!==Ct[t]&&void 0!==Ct[t][e]?i=Ct[t][e]:!1===r.disableWarning&&a.warn("Unable to look up font label for font '"+t+"', '"+e+"'. Refer to getFontList() for available fonts."),i||r.noFallback||null==(i=Ct.times[e])&&(i=Ct.times.normal),i},De=y.__private__.putInfo=function(){var t=Xt(),e=function(t){return t};for(var r in null!==m&&(e=Ye.encryptor(t,0)),lt("<<"),lt("/Producer ("+Ce(e("jsPDF "+E.version))+")"),xt)xt.hasOwnProperty(r)&&xt[r]&&lt("/"+r.substr(0,1).toUpperCase()+r.substr(1)+" ("+Ce(e(xt[r]))+")");lt("/CreationDate ("+Ce(e(W))+")"),lt(">>"),lt("endobj")},Re=y.__private__.putCatalog=function(t){var e=(t=t||{}).rootDictionaryObjId||Qt;switch(Xt(),lt("<<"),lt("/Type /Catalog"),lt("/Pages "+e+" 0 R"),mt||(mt="fullwidth"),mt){case"fullwidth":lt("/OpenAction [3 0 R /FitH null]");break;case"fullheight":lt("/OpenAction [3 0 R /FitV null]");break;case"fullpage":lt("/OpenAction [3 0 R /Fit]");break;case"original":lt("/OpenAction [3 0 R /XYZ null null 1]");break;default:var r=""+mt;"%"===r.substr(r.length-1)&&(mt=parseInt(mt)/100),"number"==typeof mt&&lt("/OpenAction [3 0 R /XYZ null null "+R(mt)+"]")}switch(Nt||(Nt="continuous"),Nt){case"continuous":lt("/PageLayout /OneColumn");break;case"single":lt("/PageLayout /SinglePage");break;case"two":case"twoleft":lt("/PageLayout /TwoColumnLeft");break;case"tworight":lt("/PageLayout /TwoColumnRight")}yt&&lt("/PageMode /"+yt),Tt.publish("putCatalog"),lt(">>"),lt("endobj")},Te=y.__private__.putTrailer=function(){lt("trailer"),lt("<<"),lt("/Size "+(et+1)),lt("/Root "+et+" 0 R"),lt("/Info "+(et-1)+" 0 R"),null!==m&&lt("/Encrypt "+Ye.oid+" 0 R"),lt("/ID [ <"+V+"> <"+V+"> ]"),lt(">>")},Ue=y.__private__.putHeader=function(){lt("%PDF-"+w),lt("%ºß¬à")},ze=y.__private__.putXRef=function(){var t="0000000000";lt("xref"),lt("0 "+(et+1)),lt("0000000000 65535 f ");for(var e=1;e<=et;e++){"function"==typeof rt[e]?lt((t+rt[e]()).slice(-10)+" 00000 n "):void 0!==rt[e]?lt((t+rt[e]).slice(-10)+" 00000 n "):lt("0000000000 00000 n ")}},He=y.__private__.buildDocument=function(){ut(),ht(nt),Tt.publish("buildDocument"),Ue(),oe(),Se(),xe(),null!==m&&be(),De(),Re();var t=it;return ze(),Te(),lt("startxref"),lt(""+t),lt("%%EOF"),ht(ot[$]),nt.join("\n")},We=y.__private__.getBlob=function(t){return new Blob([dt(t)],{type:"application/pdf"})},Ve=y.output=y.__private__.output=Ie((function(t,e){switch("string"==typeof(e=e||{})?e={filename:e}:e.filename=e.filename||"generated.pdf",t){case void 0:return He();case"save":y.save(e.filename);break;case"arraybuffer":return dt(He());case"blob":return We(He());case"bloburi":case"bloburl":if(void 0!==n.URL&&"function"==typeof n.URL.createObjectURL)return n.URL&&n.URL.createObjectURL(We(He()))||void 0;a.warn("bloburl is not supported by your system, because URL.createObjectURL is not supported by your browser.");break;case"datauristring":case"dataurlstring":var r="",i=He();try{r=h(i)}catch(t){r=h(unescape(encodeURIComponent(i)))}return"data:application/pdf;filename="+e.filename+";base64,"+r;case"pdfobjectnewwindow":if("[object Window]"===Object.prototype.toString.call(n)){var o="https://cdnjs.cloudflare.com/ajax/libs/pdfobject/2.1.1/pdfobject.min.js",s=' integrity="sha512-4ze/a9/4jqu+tX9dfOqJYSvyYd5M6qum/3HpCLr+/Jqf0whc37VUbkpNGHR7/8pSnCFw47T1fmIpwBV7UySh3g==" crossorigin="anonymous"';e.pdfObjectUrl&&(o=e.pdfObjectUrl,s="");var c='<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><script src="'+o+'"'+s+'><\/script><script >PDFObject.embed("'+this.output("dataurlstring")+'", '+JSON.stringify(e)+");<\/script></body></html>",u=n.open();return null!==u&&u.document.write(c),u}throw new Error("The option pdfobjectnewwindow just works in a browser-environment.");case"pdfjsnewwindow":if("[object Window]"===Object.prototype.toString.call(n)){var l='<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><iframe id="pdfViewer" src="'+(e.pdfJsUrl||"examples/PDF.js/web/viewer.html")+"?file=&downloadName="+e.filename+'" width="500px" height="400px" /></body></html>',f=n.open();if(null!==f){f.document.write(l);var d=this;f.document.documentElement.querySelector("#pdfViewer").onload=function(){f.document.title=e.filename,f.document.documentElement.querySelector("#pdfViewer").contentWindow.PDFViewerApplication.open(d.output("bloburl"))}}return f}throw new Error("The option pdfjsnewwindow just works in a browser-environment.");case"dataurlnewwindow":if("[object Window]"!==Object.prototype.toString.call(n))throw new Error("The option dataurlnewwindow just works in a browser-environment.");var p='<html><style>html, body { padding: 0; margin: 0; } iframe { width: 100%; height: 100%; border: 0;}  </style><body><iframe src="'+this.output("datauristring",e)+'"></iframe></body></html>',g=n.open();if(null!==g&&(g.document.write(p),g.document.title=e.filename),g||"undefined"==typeof safari)return g;break;case"datauri":case"dataurl":return n.document.location.href=this.output("datauristring",e);default:return null}})),Ge=function(t){return!0===Array.isArray(Ut)&&Ut.indexOf(t)>-1};switch(o){case"pt":_t=1;break;case"mm":_t=72/25.4;break;case"cm":_t=72/2.54;break;case"in":_t=72;break;case"px":_t=1==Ge("px_scaling")?.75:96/72;break;case"pc":case"em":_t=12;break;case"ex":_t=6;break;default:if("number"!=typeof o)throw new Error("Invalid unit: "+o);_t=o}var Ye=null;K(),Y();var Je=function(t){return null!==m?Ye.encryptor(t,0):function(t){return t}},Xe=y.__private__.getPageInfo=y.getPageInfo=function(t){if(isNaN(t)||t%1!=0)throw new Error("Invalid argument passed to jsPDF.getPageInfo");return{objId:Rt[t].objId,pageNumber:t,pageContext:Rt[t]}},Ke=y.__private__.getPageInfoByObjId=function(t){if(isNaN(t)||t%1!=0)throw new Error("Invalid argument passed to jsPDF.getPageInfoByObjId");for(var e in Rt)if(Rt[e].objId===t)break;return Xe(e)},Ze=y.__private__.getCurrentPageInfo=y.getCurrentPageInfo=function(){return{objId:Rt[$].objId,pageNumber:$,pageContext:Rt[$]}};y.addPage=function(){return Oe.apply(this,arguments),this},y.setPage=function(){return Me.apply(this,arguments),ht.call(this,ot[$]),this},y.insertPage=function(t){return this.addPage(),this.movePage($,t),this},y.movePage=function(t,e){var r,n;if(t>e){r=ot[t],n=Rt[t];for(var i=t;i>e;i--)ot[i]=ot[i-1],Rt[i]=Rt[i-1];ot[e]=r,Rt[e]=n,this.setPage(e)}else if(t<e){r=ot[t],n=Rt[t];for(var a=t;a<e;a++)ot[a]=ot[a+1],Rt[a]=Rt[a+1];ot[e]=r,Rt[e]=n,this.setPage(e)}return this},y.deletePage=function(){return Be.apply(this,arguments),this},y.__private__.text=y.text=function(e,r,n,i,a){var o,s,c,u,h,l,f,d,p,g=(i=i||{}).scope||this;if("number"==typeof e&&"number"==typeof r&&("string"==typeof n||Array.isArray(n))){var m=n;n=r,r=e,e=m}if(arguments[3]instanceof Vt==!1?(c=arguments[4],u=arguments[5],"object"===(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(f=arguments[3])&&null!==f||("string"==typeof c&&(u=c,c=null),"string"==typeof f&&(u=f,f=null),"number"==typeof f&&(c=f,f=null),i={flags:f,angle:c,align:u})):(q("The transform parameter of text() with a Matrix value"),p=a),isNaN(r)||isNaN(n)||null==e)throw new Error("Invalid arguments passed to jsPDF.text");if(0===e.length)return g;var v="",y=!1,w="number"==typeof i.lineHeightFactor?i.lineHeightFactor:lr,N=g.internal.scaleFactor;function L(t){return t=t.split("\t").join(Array(i.TabLen||9).join(" ")),Ce(t,f)}function A(t){for(var e,r=t.concat(),n=[],i=r.length;i--;)"string"==typeof(e=r.shift())?n.push(e):Array.isArray(t)&&(1===e.length||void 0===e[1]&&void 0===e[2])?n.push(e[0]):n.push([e[0],e[1],e[2]]);return n}function _(t,e){var r;if("string"==typeof t)r=e(t)[0];else if(Array.isArray(t)){for(var n,i,a=t.concat(),o=[],s=a.length;s--;)"string"==typeof(n=a.shift())?o.push(e(n)[0]):Array.isArray(n)&&"string"==typeof n[0]&&(i=e(n[0],n[1],n[2]),o.push([i[0],i[1],i[2]]));r=o}return r}var P=!1,k=!0;if("string"==typeof e)P=!0;else if(Array.isArray(e)){var I=e.concat();s=[];for(var F,C=I.length;C--;)("string"!=typeof(F=I.shift())||Array.isArray(F)&&"string"!=typeof F[0])&&(k=!1);P=k}if(!1===P)throw new Error('Type of text must be string or Array. "'+e+'" is not recognized.');"string"==typeof e&&(e=e.match(/[\r?\n]/)?e.split(/\r\n|\r|\n/g):[e]);var j=gt/g.internal.scaleFactor,B=j*(w-1);switch(i.baseline){case"bottom":n-=B;break;case"top":n+=j-B;break;case"hanging":n+=j-2*B;break;case"middle":n+=j/2-B}if((l=i.maxWidth||0)>0&&("string"==typeof e?e=g.splitTextToSize(e,l):"[object Array]"===Object.prototype.toString.call(e)&&(e=e.reduce((function(t,e){return t.concat(g.splitTextToSize(e,l))}),[]))),o={text:e,x:r,y:n,options:i,mutex:{pdfEscape:Ce,activeFontKey:St,fonts:Ft,activeFontSize:gt}},Tt.publish("preProcessText",o),e=o.text,c=(i=o.options).angle,p instanceof Vt==!1&&c&&"number"==typeof c){c*=Math.PI/180,0===i.rotationDirection&&(c=-c),S===x.ADVANCED&&(c=-c);var M=Math.cos(c),E=Math.sin(c);p=new Vt(M,E,-E,M,0,0)}else c&&c instanceof Vt&&(p=c);S!==x.ADVANCED||p||(p=Yt),void 0!==(h=i.charSpace||_r)&&(v+=O(U(h))+" Tc\n",this.setCharSpace(this.getCharSpace()||0)),void 0!==(d=i.horizontalScale)&&(v+=O(100*d)+" Tz\n");i.lang;var D=-1,R=void 0!==i.renderingMode?i.renderingMode:i.stroke,T=g.internal.getCurrentPageInfo().pageContext;switch(R){case 0:case!1:case"fill":D=0;break;case 1:case!0:case"stroke":D=1;break;case 2:case"fillThenStroke":D=2;break;case 3:case"invisible":D=3;break;case 4:case"fillAndAddForClipping":D=4;break;case 5:case"strokeAndAddPathForClipping":D=5;break;case 6:case"fillThenStrokeAndAddToPathForClipping":D=6;break;case 7:case"addToPathForClipping":D=7}var z=void 0!==T.usedRenderingMode?T.usedRenderingMode:-1;-1!==D?v+=D+" Tr\n":-1!==z&&(v+="0 Tr\n"),-1!==D&&(T.usedRenderingMode=D),u=i.align||"left";var H,W=gt*w,V=g.internal.pageSize.getWidth(),G=Ft[St];h=i.charSpace||_r,l=i.maxWidth||0,f=Object.assign({autoencode:!0,noBOM:!0},i.flags);var Y=[];if("[object Array]"===Object.prototype.toString.call(e)){var J;s=A(e),"left"!==u&&(H=s.map((function(t){return g.getStringUnitWidth(t,{font:G,charSpace:h,fontSize:gt,doKerning:!1})*gt/N})));var X,K=0;if("right"===u){r-=H[0],e=[],C=s.length;for(var Z=0;Z<C;Z++)0===Z?(X=br(r),J=yr(n)):(X=U(K-H[Z]),J=-W),e.push([s[Z],X,J]),K=H[Z]}else if("center"===u){r-=H[0]/2,e=[],C=s.length;for(var $=0;$<C;$++)0===$?(X=br(r),J=yr(n)):(X=U((K-H[$])/2),J=-W),e.push([s[$],X,J]),K=H[$]}else if("left"===u){e=[],C=s.length;for(var Q=0;Q<C;Q++)e.push(s[Q])}else{if("justify"!==u)throw new Error('Unrecognized alignment option, use "left", "center", "right" or "justify".');e=[],C=s.length,l=0!==l?l:V;for(var tt=0;tt<C;tt++)J=0===tt?yr(n):-W,X=0===tt?br(r):0,tt<C-1?Y.push(O(U((l-H[tt])/(s[tt].split(" ").length-1)))):Y.push(0),e.push([s[tt],X,J])}}var et="boolean"==typeof i.R2L?i.R2L:bt;!0===et&&(e=_(e,(function(t,e,r){return[t.split("").reverse().join(""),e,r]}))),o={text:e,x:r,y:n,options:i,mutex:{pdfEscape:Ce,activeFontKey:St,fonts:Ft,activeFontSize:gt}},Tt.publish("postProcessText",o),e=o.text,y=o.mutex.isHex||!1;var rt=Ft[St].encoding;"WinAnsiEncoding"!==rt&&"StandardEncoding"!==rt||(e=_(e,(function(t,e,r){return[L(t),e,r]}))),s=A(e),e=[];for(var nt,it,at,ot=0,st=1,ct=Array.isArray(s[0])?st:ot,ut="",ht=function(t,e,r){var n="";return r instanceof Vt?(r="number"==typeof i.angle?Gt(r,new Vt(1,0,0,1,t,e)):Gt(new Vt(1,0,0,1,t,e),r),S===x.ADVANCED&&(r=Gt(new Vt(1,0,0,-1,0,0),r)),n=r.join(" ")+" Tm\n"):n=O(t)+" "+O(e)+" Td\n",n},ft=0;ft<s.length;ft++){switch(ut="",ct){case st:at=(y?"<":"(")+s[ft][0]+(y?">":")"),nt=parseFloat(s[ft][1]),it=parseFloat(s[ft][2]);break;case ot:at=(y?"<":"(")+s[ft]+(y?">":")"),nt=br(r),it=yr(n)}void 0!==Y&&void 0!==Y[ft]&&(ut=Y[ft]+" Tw\n"),0===ft?e.push(ut+ht(nt,it,p)+at):ct===ot?e.push(ut+at):ct===st&&e.push(ut+ht(nt,it,p)+at)}e=ct===ot?e.join(" Tj\nT* "):e.join(" Tj\n"),e+=" Tj\n";var dt="BT\n/";return dt+=St+" "+gt+" Tf\n",dt+=O(gt*w)+" TL\n",dt+=xr+"\n",dt+=v,dt+=e,lt(dt+="ET"),b[St]=!0,g};var $e=y.__private__.clip=y.clip=function(t){return lt("evenodd"===t?"W*":"W"),this};y.clipEvenOdd=function(){return $e("evenodd")},y.__private__.discardPath=y.discardPath=function(){return lt("n"),this};var Qe=y.__private__.isValidStyle=function(t){var e=!1;return-1!==[void 0,null,"S","D","F","DF","FD","f","f*","B","B*","n"].indexOf(t)&&(e=!0),e};y.__private__.setDefaultPathOperation=y.setDefaultPathOperation=function(t){return Qe(t)&&(g=t),this};var tr=y.__private__.getStyle=y.getStyle=function(t){var e=g;switch(t){case"D":case"S":e="S";break;case"F":e="f";break;case"FD":case"DF":e="B";break;case"f":case"f*":case"B":case"B*":e=t}return e},er=y.close=function(){return lt("h"),this};y.stroke=function(){return lt("S"),this},y.fill=function(t){return rr("f",t),this},y.fillEvenOdd=function(t){return rr("f*",t),this},y.fillStroke=function(t){return rr("B",t),this},y.fillStrokeEvenOdd=function(t){return rr("B*",t),this};var rr=function(e,r){"object"===(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(r)?ar(r,e):lt(e)},nr=function(t){null===t||S===x.ADVANCED&&void 0===t||(t=tr(t),lt(t))};function ir(t,e,r,n,i){var a=new M(e||this.boundingBox,r||this.xStep,n||this.yStep,this.gState,i||this.matrix);a.stream=this.stream;var o=t+"$$"+this.cloneIndex+++"$$";return Jt(o,a),a}var ar=function(t,e){var r=Bt[t.key],n=Ot[r];if(n instanceof B)lt("q"),lt(or(e)),n.gState&&y.setGState(n.gState),lt(t.matrix.toString()+" cm"),lt("/"+r+" sh"),lt("Q");else if(n instanceof M){var i=new Vt(1,0,0,-1,0,Rr());t.matrix&&(i=i.multiply(t.matrix||Yt),r=ir.call(n,t.key,t.boundingBox,t.xStep,t.yStep,i).id),lt("q"),lt("/Pattern cs"),lt("/"+r+" scn"),n.gState&&y.setGState(n.gState),lt(e),lt("Q")}},or=function(t){switch(t){case"f":case"F":return"W n";case"f*":return"W* n";case"B":return"W S";case"B*":return"W* S";case"S":return"W S";case"n":return"W n"}},sr=y.moveTo=function(t,e){return lt(O(U(t))+" "+O(H(e))+" m"),this},cr=y.lineTo=function(t,e){return lt(O(U(t))+" "+O(H(e))+" l"),this},ur=y.curveTo=function(t,e,r,n,i,a){return lt([O(U(t)),O(H(e)),O(U(r)),O(H(n)),O(U(i)),O(H(a)),"c"].join(" ")),this};y.__private__.line=y.line=function(t,e,r,n,i){if(isNaN(t)||isNaN(e)||isNaN(r)||isNaN(n)||!Qe(i))throw new Error("Invalid arguments passed to jsPDF.line");return S===x.COMPAT?this.lines([[r-t,n-e]],t,e,[1,1],i||"S"):this.lines([[r-t,n-e]],t,e,[1,1]).stroke()},y.__private__.lines=y.lines=function(t,e,r,n,i,a){var o,s,c,u,h,l,f,d,p,g,m,v;if("number"==typeof t&&(v=r,r=e,e=t,t=v),n=n||[1,1],a=a||!1,isNaN(e)||isNaN(r)||!Array.isArray(t)||!Array.isArray(n)||!Qe(i)||"boolean"!=typeof a)throw new Error("Invalid arguments passed to jsPDF.lines");for(sr(e,r),o=n[0],s=n[1],u=t.length,g=e,m=r,c=0;c<u;c++)2===(h=t[c]).length?(g=h[0]*o+g,m=h[1]*s+m,cr(g,m)):(l=h[0]*o+g,f=h[1]*s+m,d=h[2]*o+g,p=h[3]*s+m,g=h[4]*o+g,m=h[5]*s+m,ur(l,f,d,p,g,m));return a&&er(),nr(i),this},y.path=function(t){for(var e=0;e<t.length;e++){var r=t[e],n=r.c;switch(r.op){case"m":sr(n[0],n[1]);break;case"l":cr(n[0],n[1]);break;case"c":ur.apply(this,n);break;case"h":er()}}return this},y.__private__.rect=y.rect=function(t,e,r,n,i){if(isNaN(t)||isNaN(e)||isNaN(r)||isNaN(n)||!Qe(i))throw new Error("Invalid arguments passed to jsPDF.rect");return S===x.COMPAT&&(n=-n),lt([O(U(t)),O(H(e)),O(U(r)),O(U(n)),"re"].join(" ")),nr(i),this},y.__private__.triangle=y.triangle=function(t,e,r,n,i,a,o){if(isNaN(t)||isNaN(e)||isNaN(r)||isNaN(n)||isNaN(i)||isNaN(a)||!Qe(o))throw new Error("Invalid arguments passed to jsPDF.triangle");return this.lines([[r-t,n-e],[i-r,a-n],[t-i,e-a]],t,e,[1,1],o,!0),this},y.__private__.roundedRect=y.roundedRect=function(t,e,r,n,i,a,o){if(isNaN(t)||isNaN(e)||isNaN(r)||isNaN(n)||isNaN(i)||isNaN(a)||!Qe(o))throw new Error("Invalid arguments passed to jsPDF.roundedRect");var s=4/3*(Math.SQRT2-1);return i=Math.min(i,.5*r),a=Math.min(a,.5*n),this.lines([[r-2*i,0],[i*s,0,i,a-a*s,i,a],[0,n-2*a],[0,a*s,-i*s,a,-i,a],[2*i-r,0],[-i*s,0,-i,-a*s,-i,-a],[0,2*a-n],[0,-a*s,i*s,-a,i,-a]],t+i,e,[1,1],o,!0),this},y.__private__.ellipse=y.ellipse=function(t,e,r,n,i){if(isNaN(t)||isNaN(e)||isNaN(r)||isNaN(n)||!Qe(i))throw new Error("Invalid arguments passed to jsPDF.ellipse");var a=4/3*(Math.SQRT2-1)*r,o=4/3*(Math.SQRT2-1)*n;return sr(t+r,e),ur(t+r,e-o,t+a,e-n,t,e-n),ur(t-a,e-n,t-r,e-o,t-r,e),ur(t-r,e+o,t-a,e+n,t,e+n),ur(t+a,e+n,t+r,e+o,t+r,e),nr(i),this},y.__private__.circle=y.circle=function(t,e,r,n){if(isNaN(t)||isNaN(e)||isNaN(r)||!Qe(n))throw new Error("Invalid arguments passed to jsPDF.circle");return this.ellipse(t,e,r,r,n)},y.setFont=function(t,e,r){return r&&(e=k(e,r)),St=qe(t,e,{disableWarning:!1}),this};var hr=y.__private__.getFont=y.getFont=function(){return Ft[qe.apply(y,arguments)]};y.__private__.getFontList=y.getFontList=function(){var t,e,r={};for(t in Ct)if(Ct.hasOwnProperty(t))for(e in r[t]=[],Ct[t])Ct[t].hasOwnProperty(e)&&r[t].push(e);return r},y.addFont=function(t,e,r,n,i){var a=["StandardEncoding","MacRomanEncoding","Identity-H","WinAnsiEncoding"];return arguments[3]&&-1!==a.indexOf(arguments[3])?i=arguments[3]:arguments[3]&&-1==a.indexOf(arguments[3])&&(r=k(r,n)),i=i||"Identity-H",Pe.call(this,t,e,r,i)};var lr,fr=e.lineWidth||.200025,dr=y.__private__.getLineWidth=y.getLineWidth=function(){return fr},pr=y.__private__.setLineWidth=y.setLineWidth=function(t){return fr=t,lt(O(U(t))+" w"),this};y.__private__.setLineDash=E.API.setLineDash=E.API.setLineDashPattern=function(t,e){if(t=t||[],e=e||0,isNaN(e)||!Array.isArray(t))throw new Error("Invalid arguments passed to jsPDF.setLineDash");return t=t.map((function(t){return O(U(t))})).join(" "),e=O(U(e)),lt("["+t+"] "+e+" d"),this};var gr=y.__private__.getLineHeight=y.getLineHeight=function(){return gt*lr};y.__private__.getLineHeight=y.getLineHeight=function(){return gt*lr};var mr=y.__private__.setLineHeightFactor=y.setLineHeightFactor=function(t){return"number"==typeof(t=t||1.15)&&(lr=t),this},vr=y.__private__.getLineHeightFactor=y.getLineHeightFactor=function(){return lr};mr(e.lineHeight);var br=y.__private__.getHorizontalCoordinate=function(t){return U(t)},yr=y.__private__.getVerticalCoordinate=function(t){return S===x.ADVANCED?t:Rt[$].mediaBox.topRightY-Rt[$].mediaBox.bottomLeftY-U(t)},wr=y.__private__.getHorizontalCoordinateString=y.getHorizontalCoordinateString=function(t){return O(br(t))},Nr=y.__private__.getVerticalCoordinateString=y.getVerticalCoordinateString=function(t){return O(yr(t))},Lr=e.strokeColor||"0 G";y.__private__.getStrokeColor=y.getDrawColor=function(){return ee(Lr)},y.__private__.setStrokeColor=y.setDrawColor=function(t,e,r,n){return Lr=re({ch1:t,ch2:e,ch3:r,ch4:n,pdfColorType:"draw",precision:2}),lt(Lr),this};var Ar=e.fillColor||"0 g";y.__private__.getFillColor=y.getFillColor=function(){return ee(Ar)},y.__private__.setFillColor=y.setFillColor=function(t,e,r,n){return Ar=re({ch1:t,ch2:e,ch3:r,ch4:n,pdfColorType:"fill",precision:2}),lt(Ar),this};var xr=e.textColor||"0 g",Sr=y.__private__.getTextColor=y.getTextColor=function(){return ee(xr)};y.__private__.setTextColor=y.setTextColor=function(t,e,r,n){return xr=re({ch1:t,ch2:e,ch3:r,ch4:n,pdfColorType:"text",precision:3}),this};var _r=e.charSpace,Pr=y.__private__.getCharSpace=y.getCharSpace=function(){return parseFloat(_r||0)};y.__private__.setCharSpace=y.setCharSpace=function(t){if(isNaN(t))throw new Error("Invalid argument passed to jsPDF.setCharSpace");return _r=t,this};var kr=0;y.CapJoinStyles={0:0,butt:0,but:0,miter:0,1:1,round:1,rounded:1,circle:1,2:2,projecting:2,project:2,square:2,bevel:2},y.__private__.setLineCap=y.setLineCap=function(t){var e=y.CapJoinStyles[t];if(void 0===e)throw new Error("Line cap style of '"+t+"' is not recognized. See or extend .CapJoinStyles property for valid styles");return kr=e,lt(e+" J"),this};var Ir=0;y.__private__.setLineJoin=y.setLineJoin=function(t){var e=y.CapJoinStyles[t];if(void 0===e)throw new Error("Line join style of '"+t+"' is not recognized. See or extend .CapJoinStyles property for valid styles");return Ir=e,lt(e+" j"),this},y.__private__.setLineMiterLimit=y.__private__.setMiterLimit=y.setLineMiterLimit=y.setMiterLimit=function(t){if(t=t||0,isNaN(t))throw new Error("Invalid argument passed to jsPDF.setLineMiterLimit");return lt(O(U(t))+" M"),this},y.GState=j,y.setGState=function(t){(t="string"==typeof t?Mt[Et[t]]:Fr(null,t)).equals(qt)||(lt("/"+t.id+" gs"),qt=t)};var Fr=function(t,e){if(!t||!Et[t]){var r=!1;for(var n in Mt)if(Mt.hasOwnProperty(n)&&Mt[n].equals(e)){r=!0;break}if(r)e=Mt[n];else{var i="GS"+(Object.keys(Mt).length+1).toString(10);Mt[i]=e,e.id=i}return t&&(Et[t]=e.id),Tt.publish("addGState",e),e}};y.addGState=function(t,e){return Fr(t,e),this},y.saveGraphicsState=function(){return lt("q"),jt.push({key:St,size:gt,color:xr}),this},y.restoreGraphicsState=function(){lt("Q");var t=jt.pop();return St=t.key,gt=t.size,xr=t.color,qt=null,this},y.setCurrentTransformationMatrix=function(t){return lt(t.toString()+" cm"),this},y.comment=function(t){return lt("#"+t),this};var Cr=function(t,e){var r=t||0;Object.defineProperty(this,"x",{enumerable:!0,get:function(){return r},set:function(t){isNaN(t)||(r=parseFloat(t))}});var n=e||0;Object.defineProperty(this,"y",{enumerable:!0,get:function(){return n},set:function(t){isNaN(t)||(n=parseFloat(t))}});var i="pt";return Object.defineProperty(this,"type",{enumerable:!0,get:function(){return i},set:function(t){i=t.toString()}}),this},jr=function(t,e,r,n){Cr.call(this,t,e),this.type="rect";var i=r||0;Object.defineProperty(this,"w",{enumerable:!0,get:function(){return i},set:function(t){isNaN(t)||(i=parseFloat(t))}});var a=n||0;return Object.defineProperty(this,"h",{enumerable:!0,get:function(){return a},set:function(t){isNaN(t)||(a=parseFloat(t))}}),this},Or=function(){this.page=Dt,this.currentPage=$,this.pages=ot.slice(0),this.pagesContext=Rt.slice(0),this.x=Pt,this.y=kt,this.matrix=It,this.width=qr($),this.height=Rr($),this.outputDestination=ct,this.id="",this.objectNumber=-1};Or.prototype.restore=function(){Dt=this.page,$=this.currentPage,Rt=this.pagesContext,ot=this.pages,Pt=this.x,kt=this.y,It=this.matrix,Dr($,this.width),Tr($,this.height),ct=this.outputDestination};var Br=function(t,e,r,n,i){Wt.push(new Or),Dt=$=0,ot=[],Pt=t,kt=e,It=i,je([r,n])},Mr=function(t){if(Ht[t])Wt.pop().restore();else{var e=new Or,r="Xo"+(Object.keys(zt).length+1).toString(10);e.id=r,Ht[t]=r,zt[r]=e,Tt.publish("addFormObject",e),Wt.pop().restore()}};for(var Er in y.beginFormObject=function(t,e,r,n,i){return Br(t,e,r,n,i),this},y.endFormObject=function(t){return Mr(t),this},y.doFormObject=function(t,e){var r=zt[Ht[t]];return lt("q"),lt(e.toString()+" cm"),lt("/"+r.id+" Do"),lt("Q"),this},y.getFormObject=function(t){var e=zt[Ht[t]];return{x:e.x,y:e.y,width:e.width,height:e.height,matrix:e.matrix}},y.save=function(t,e){return t=t||"generated.pdf",(e=e||{}).returnPromise=e.returnPromise||!1,!1===e.returnPromise?(l(We(He()),t),"function"==typeof l.unload&&n.setTimeout&&setTimeout(l.unload,911),this):new Promise((function(e,r){try{var i=l(We(He()),t);"function"==typeof l.unload&&n.setTimeout&&setTimeout(l.unload,911),e(i)}catch(t){r(t.message)}}))},E.API)E.API.hasOwnProperty(Er)&&("events"===Er&&E.API.events.length?function(t,e){var r,n,i;for(i=e.length-1;-1!==i;i--)r=e[i][0],n=e[i][1],t.subscribe.apply(t,[r].concat("function"==typeof n?[n]:n))}(Tt,E.API.events):y[Er]=E.API[Er]);var qr=y.getPageWidth=function(t){return(Rt[t=t||$].mediaBox.topRightX-Rt[t].mediaBox.bottomLeftX)/_t},Dr=y.setPageWidth=function(t,e){Rt[t].mediaBox.topRightX=e*_t+Rt[t].mediaBox.bottomLeftX},Rr=y.getPageHeight=function(t){return(Rt[t=t||$].mediaBox.topRightY-Rt[t].mediaBox.bottomLeftY)/_t},Tr=y.setPageHeight=function(t,e){Rt[t].mediaBox.topRightY=e*_t+Rt[t].mediaBox.bottomLeftY};return y.internal={pdfEscape:Ce,getStyle:tr,getFont:hr,getFontSize:vt,getCharSpace:Pr,getTextColor:Sr,getLineHeight:gr,getLineHeightFactor:vr,getLineWidth:dr,write:ft,getHorizontalCoordinate:br,getVerticalCoordinate:yr,getCoordinateString:wr,getVerticalCoordinateString:Nr,collections:{},newObject:Xt,newAdditionalObject:$t,newObjectDeferred:Kt,newObjectDeferredBegin:Zt,getFilters:ne,putStream:ie,events:Tt,scaleFactor:_t,pageSize:{getWidth:function(){return qr($)},setWidth:function(t){Dr($,t)},getHeight:function(){return Rr($)},setHeight:function(t){Tr($,t)}},encryptionOptions:m,encryption:Ye,getEncryptor:Je,output:Ve,getNumberOfPages:Ee,pages:ot,out:lt,f2:R,f3:T,getPageInfo:Xe,getPageInfoByObjId:Ke,getCurrentPageInfo:Ze,getPDFVersion:N,Point:Cr,Rectangle:jr,Matrix:Vt,hasHotfix:Ge},Object.defineProperty(y.internal.pageSize,"width",{get:function(){return qr($)},set:function(t){Dr($,t)},enumerable:!0,configurable:!0}),Object.defineProperty(y.internal.pageSize,"height",{get:function(){return Rr($)},set:function(t){Tr($,t)},enumerable:!0,configurable:!0}),ke.call(y,pt),St="F1",Oe(s,i),Tt.publish("initialized"),y}I.prototype.lsbFirstWord=function(t){return String.fromCharCode(t>>0&255,t>>8&255,t>>16&255,t>>24&255)},I.prototype.toHexString=function(t){return t.split("").map((function(t){return("0"+(255&t.charCodeAt(0)).toString(16)).slice(-2)})).join("")},I.prototype.hexToBytes=function(t){for(var e=[],r=0;r<t.length;r+=2)e.push(String.fromCharCode(parseInt(t.substr(r,2),16)));return e.join("")},I.prototype.processOwnerPassword=function(t,e){return P(x(e).substr(0,5),t)},I.prototype.encryptor=function(t,e){var r=x(this.encryptionKey+String.fromCharCode(255&t,t>>8&255,t>>16&255,255&e,e>>8&255)).substr(0,10);return function(t){return P(r,t)}},j.prototype.equals=function(e){var r,n="id,objectNumber,equals";if(!e||(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(e)!==(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(this))return!1;var i=0;for(r in this)if(!(n.indexOf(r)>=0)){if(this.hasOwnProperty(r)&&!e.hasOwnProperty(r))return!1;if(this[r]!==e[r])return!1;i++}for(r in e)e.hasOwnProperty(r)&&n.indexOf(r)<0&&i--;return 0===i},E.API={events:[]},E.version="2.5.1";var q=E.API,D=1,R=function(t){return t.replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")},T=function(t){return t.replace(/\\\\/g,"\\").replace(/\\\(/g,"(").replace(/\\\)/g,")")},U=function(t){return t.toFixed(2)},z=function(t){return t.toFixed(5)};q.__acroform__={};var H=function(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t},W=function(t){return t*D},V=function(t){var e=new ut,r=At.internal.getHeight(t)||0,n=At.internal.getWidth(t)||0;return e.BBox=[0,0,Number(U(n)),Number(U(r))],e},G=q.__acroform__.setBit=function(t,e){if(t=t||0,e=e||0,isNaN(t)||isNaN(e))throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.setBit");return t|=1<<e},Y=q.__acroform__.clearBit=function(t,e){if(t=t||0,e=e||0,isNaN(t)||isNaN(e))throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.clearBit");return t&=~(1<<e)},J=q.__acroform__.getBit=function(t,e){if(isNaN(t)||isNaN(e))throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.getBit");return 0==(t&1<<e)?0:1},X=q.__acroform__.getBitForPdf=function(t,e){if(isNaN(t)||isNaN(e))throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.getBitForPdf");return J(t,e-1)},K=q.__acroform__.setBitForPdf=function(t,e){if(isNaN(t)||isNaN(e))throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.setBitForPdf");return G(t,e-1)},Z=q.__acroform__.clearBitForPdf=function(t,e){if(isNaN(t)||isNaN(e))throw new Error("Invalid arguments passed to jsPDF.API.__acroform__.clearBitForPdf");return Y(t,e-1)},$=q.__acroform__.calculateCoordinates=function(t,e){var r=e.internal.getHorizontalCoordinate,n=e.internal.getVerticalCoordinate,i=t[0],a=t[1],o=t[2],s=t[3],c={};return c.lowerLeft_X=r(i)||0,c.lowerLeft_Y=n(a+s)||0,c.upperRight_X=r(i+o)||0,c.upperRight_Y=n(a)||0,[Number(U(c.lowerLeft_X)),Number(U(c.lowerLeft_Y)),Number(U(c.upperRight_X)),Number(U(c.upperRight_Y))]},Q=function(t){if(t.appearanceStreamContent)return t.appearanceStreamContent;if(t.V||t.DV){var e=[],r=t._V||t.DV,n=tt(t,r),i=t.scope.internal.getFont(t.fontName,t.fontStyle).id;e.push("/Tx BMC"),e.push("q"),e.push("BT"),e.push(t.scope.__private__.encodeColorString(t.color)),e.push("/"+i+" "+U(n.fontSize)+" Tf"),e.push("1 0 0 1 0 0 Tm"),e.push(n.text),e.push("ET"),e.push("Q"),e.push("EMC");var a=V(t);return a.scope=t.scope,a.stream=e.join("\n"),a}},tt=function(t,e){var r=0===t.fontSize?t.maxFontSize:t.fontSize,n={text:"",fontSize:""},i=(e=")"==(e="("==e.substr(0,1)?e.substr(1):e).substr(e.length-1)?e.substr(0,e.length-1):e).split(" ");i=t.multiline?i.map((function(t){return t.split("\n")})):i.map((function(t){return[t]}));var a=r,o=At.internal.getHeight(t)||0;o=o<0?-o:o;var s=At.internal.getWidth(t)||0;s=s<0?-s:s;var c=function(e,r,n){if(e+1<i.length){var a=r+" "+i[e+1][0];return et(a,t,n).width<=s-4}return!1};a++;t:for(;a>0;){e="",a--;var u,h,l=et("3",t,a).height,f=t.multiline?o-a:(o-l)/2,d=f+=2,p=0,g=0,m=0;if(a<=0){e="(...) Tj\n",e+="% Width of Text: "+et(e,t,a=12).width+", FieldWidth:"+s+"\n";break}for(var v="",b=0,y=0;y<i.length;y++)if(i.hasOwnProperty(y)){var w=!1;if(1!==i[y].length&&m!==i[y].length-1){if((l+2)*(b+2)+2>o)continue t;v+=i[y][m],w=!0,g=y,y--}else{v=" "==(v+=i[y][m]+" ").substr(v.length-1)?v.substr(0,v.length-1):v;var N=parseInt(y),L=c(N,v,a),A=y>=i.length-1;if(L&&!A){v+=" ",m=0;continue}if(L||A){if(A)g=N;else if(t.multiline&&(l+2)*(b+2)+2>o)continue t}else{if(!t.multiline)continue t;if((l+2)*(b+2)+2>o)continue t;g=N}}for(var x="",S=p;S<=g;S++){var _=i[S];if(t.multiline){if(S===g){x+=_[m]+" ",m=(m+1)%_.length;continue}if(S===p){x+=_[_.length-1]+" ";continue}}x+=_[0]+" "}switch(x=" "==x.substr(x.length-1)?x.substr(0,x.length-1):x,h=et(x,t,a).width,t.textAlign){case"right":u=s-h-2;break;case"center":u=(s-h)/2;break;case"left":default:u=2}e+=U(u)+" "+U(d)+" Td\n",e+="("+R(x)+") Tj\n",e+=-U(u)+" 0 Td\n",d=-(a+2),h=0,p=w?g:g+1,b++,v=""}else;break}return n.text=e,n.fontSize=a,n},et=function(t,e,r){var n=e.scope.internal.getFont(e.fontName,e.fontStyle),i=e.scope.getStringUnitWidth(t,{font:n,fontSize:parseFloat(r),charSpace:0})*parseFloat(r);return{height:e.scope.getStringUnitWidth("3",{font:n,fontSize:parseFloat(r),charSpace:0})*parseFloat(r)*1.5,width:i}},rt={fields:[],xForms:[],acroFormDictionaryRoot:null,printedOut:!1,internal:null,isInitialized:!1},nt=function(t,e){var r={type:"reference",object:t};void 0===e.internal.getPageInfo(t.page).pageContext.annotations.find((function(t){return t.type===r.type&&t.object===r.object}))&&e.internal.getPageInfo(t.page).pageContext.annotations.push(r)},it=function(e,r){for(var n in e)if(e.hasOwnProperty(n)){var i=n,a=e[n];r.internal.newObjectDeferredBegin(a.objId,!0),"object"===(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(a)&&"function"==typeof a.putStream&&a.putStream(),delete e[i]}},at=function(e,r){if(r.scope=e,void 0!==e.internal&&(void 0===e.internal.acroformPlugin||!1===e.internal.acroformPlugin.isInitialized)){if(lt.FieldNum=0,e.internal.acroformPlugin=JSON.parse(JSON.stringify(rt)),e.internal.acroformPlugin.acroFormDictionaryRoot)throw new Error("Exception while creating AcroformDictionary");D=e.internal.scaleFactor,e.internal.acroformPlugin.acroFormDictionaryRoot=new ht,e.internal.acroformPlugin.acroFormDictionaryRoot.scope=e,e.internal.acroformPlugin.acroFormDictionaryRoot._eventID=e.internal.events.subscribe("postPutResources",(function(){!function(t){t.internal.events.unsubscribe(t.internal.acroformPlugin.acroFormDictionaryRoot._eventID),delete t.internal.acroformPlugin.acroFormDictionaryRoot._eventID,t.internal.acroformPlugin.printedOut=!0}(e)})),e.internal.events.subscribe("buildDocument",(function(){!function(t){t.internal.acroformPlugin.acroFormDictionaryRoot.objId=void 0;var e=t.internal.acroformPlugin.acroFormDictionaryRoot.Fields;for(var r in e)if(e.hasOwnProperty(r)){var n=e[r];n.objId=void 0,n.hasAnnotation&&nt(n,t)}}(e)})),e.internal.events.subscribe("putCatalog",(function(){!function(t){if(void 0===t.internal.acroformPlugin.acroFormDictionaryRoot)throw new Error("putCatalogCallback: Root missing.");t.internal.write("/AcroForm "+t.internal.acroformPlugin.acroFormDictionaryRoot.objId+" 0 R")}(e)})),e.internal.events.subscribe("postPutPages",(function(r){!function(e,r){var n=!e;for(var i in e||(r.internal.newObjectDeferredBegin(r.internal.acroformPlugin.acroFormDictionaryRoot.objId,!0),r.internal.acroformPlugin.acroFormDictionaryRoot.putStream()),e=e||r.internal.acroformPlugin.acroFormDictionaryRoot.Kids)if(e.hasOwnProperty(i)){var a=e[i],o=[],s=a.Rect;if(a.Rect&&(a.Rect=$(a.Rect,r)),r.internal.newObjectDeferredBegin(a.objId,!0),a.DA=At.createDefaultAppearanceStream(a),"object"===(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(a)&&"function"==typeof a.getKeyValueListForStream&&(o=a.getKeyValueListForStream()),a.Rect=s,a.hasAppearanceStream&&!a.appearanceStreamContent){var c=Q(a);o.push({key:"AP",value:"<</N "+c+">>"}),r.internal.acroformPlugin.xForms.push(c)}if(a.appearanceStreamContent){var u="";for(var h in a.appearanceStreamContent)if(a.appearanceStreamContent.hasOwnProperty(h)){var l=a.appearanceStreamContent[h];if(u+="/"+h+" ",u+="<<",Object.keys(l).length>=1||Array.isArray(l)){for(var i in l)if(l.hasOwnProperty(i)){var f=l[i];"function"==typeof f&&(f=f.call(r,a)),u+="/"+i+" "+f+" ",r.internal.acroformPlugin.xForms.indexOf(f)>=0||r.internal.acroformPlugin.xForms.push(f)}}else"function"==typeof(f=l)&&(f=f.call(r,a)),u+="/"+i+" "+f,r.internal.acroformPlugin.xForms.indexOf(f)>=0||r.internal.acroformPlugin.xForms.push(f);u+=">>"}o.push({key:"AP",value:"<<\n"+u+">>"})}r.internal.putStream({additionalKeyValues:o,objectId:a.objId}),r.internal.out("endobj")}n&&it(r.internal.acroformPlugin.xForms,r)}(r,e)})),e.internal.acroformPlugin.isInitialized=!0}},ot=q.__acroform__.arrayToPdfArray=function(e,r,n){var i=function(t){return t};if(Array.isArray(e)){for(var a="[",o=0;o<e.length;o++)switch(0!==o&&(a+=" "),(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(e[o])){case"boolean":case"number":case"object":a+=e[o].toString();break;case"string":"/"!==e[o].substr(0,1)?(void 0!==r&&n&&(i=n.internal.getEncryptor(r)),a+="("+R(i(e[o].toString()))+")"):a+=e[o].toString()}return a+="]"}throw new Error("Invalid argument passed to jsPDF.__acroform__.arrayToPdfArray")};var st=function(t,e,r){var n=function(t){return t};return void 0!==e&&r&&(n=r.internal.getEncryptor(e)),(t=t||"").toString(),t="("+R(n(t))+")"},ct=function(){this._objId=void 0,this._scope=void 0,Object.defineProperty(this,"objId",{get:function(){if(void 0===this._objId){if(void 0===this.scope)return;this._objId=this.scope.internal.newObjectDeferred()}return this._objId},set:function(t){this._objId=t}}),Object.defineProperty(this,"scope",{value:this._scope,writable:!0})};ct.prototype.toString=function(){return this.objId+" 0 R"},ct.prototype.putStream=function(){var t=this.getKeyValueListForStream();this.scope.internal.putStream({data:this.stream,additionalKeyValues:t,objectId:this.objId}),this.scope.internal.out("endobj")},ct.prototype.getKeyValueListForStream=function(){var t=[],e=Object.getOwnPropertyNames(this).filter((function(t){return"content"!=t&&"appearanceStreamContent"!=t&&"scope"!=t&&"objId"!=t&&"_"!=t.substring(0,1)}));for(var r in e)if(!1===Object.getOwnPropertyDescriptor(this,e[r]).configurable){var n=e[r],i=this[n];i&&(Array.isArray(i)?t.push({key:n,value:ot(i,this.objId,this.scope)}):i instanceof ct?(i.scope=this.scope,t.push({key:n,value:i.objId+" 0 R"})):"function"!=typeof i&&t.push({key:n,value:i}))}return t};var ut=function(){ct.call(this),Object.defineProperty(this,"Type",{value:"/XObject",configurable:!1,writable:!0}),Object.defineProperty(this,"Subtype",{value:"/Form",configurable:!1,writable:!0}),Object.defineProperty(this,"FormType",{value:1,configurable:!1,writable:!0});var t,e=[];Object.defineProperty(this,"BBox",{configurable:!1,get:function(){return e},set:function(t){e=t}}),Object.defineProperty(this,"Resources",{value:"2 0 R",configurable:!1,writable:!0}),Object.defineProperty(this,"stream",{enumerable:!1,configurable:!0,set:function(e){t=e.trim()},get:function(){return t||null}})};H(ut,ct);var ht=function(){ct.call(this);var t,e=[];Object.defineProperty(this,"Kids",{enumerable:!1,configurable:!0,get:function(){return e.length>0?e:void 0}}),Object.defineProperty(this,"Fields",{enumerable:!1,configurable:!1,get:function(){return e}}),Object.defineProperty(this,"DA",{enumerable:!1,configurable:!1,get:function(){if(t){var e=function(t){return t};return this.scope&&(e=this.scope.internal.getEncryptor(this.objId)),"("+R(e(t))+")"}},set:function(e){t=e}})};H(ht,ct);var lt=function t(){ct.call(this);var e=4;Object.defineProperty(this,"F",{enumerable:!1,configurable:!1,get:function(){return e},set:function(t){if(isNaN(t))throw new Error('Invalid value "'+t+'" for attribute F supplied.');e=t}}),Object.defineProperty(this,"showWhenPrinted",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(e,3))},set:function(t){!0===Boolean(t)?this.F=K(e,3):this.F=Z(e,3)}});var r=0;Object.defineProperty(this,"Ff",{enumerable:!1,configurable:!1,get:function(){return r},set:function(t){if(isNaN(t))throw new Error('Invalid value "'+t+'" for attribute Ff supplied.');r=t}});var n=[];Object.defineProperty(this,"Rect",{enumerable:!1,configurable:!1,get:function(){if(0!==n.length)return n},set:function(t){n=void 0!==t?t:[]}}),Object.defineProperty(this,"x",{enumerable:!0,configurable:!0,get:function(){return!n||isNaN(n[0])?0:n[0]},set:function(t){n[0]=t}}),Object.defineProperty(this,"y",{enumerable:!0,configurable:!0,get:function(){return!n||isNaN(n[1])?0:n[1]},set:function(t){n[1]=t}}),Object.defineProperty(this,"width",{enumerable:!0,configurable:!0,get:function(){return!n||isNaN(n[2])?0:n[2]},set:function(t){n[2]=t}}),Object.defineProperty(this,"height",{enumerable:!0,configurable:!0,get:function(){return!n||isNaN(n[3])?0:n[3]},set:function(t){n[3]=t}});var i="";Object.defineProperty(this,"FT",{enumerable:!0,configurable:!1,get:function(){return i},set:function(t){switch(t){case"/Btn":case"/Tx":case"/Ch":case"/Sig":i=t;break;default:throw new Error('Invalid value "'+t+'" for attribute FT supplied.')}}});var a=null;Object.defineProperty(this,"T",{enumerable:!0,configurable:!1,get:function(){if(!a||a.length<1){if(this instanceof yt)return;a="FieldObject"+t.FieldNum++}var e=function(t){return t};return this.scope&&(e=this.scope.internal.getEncryptor(this.objId)),"("+R(e(a))+")"},set:function(t){a=t.toString()}}),Object.defineProperty(this,"fieldName",{configurable:!0,enumerable:!0,get:function(){return a},set:function(t){a=t}});var o="helvetica";Object.defineProperty(this,"fontName",{enumerable:!0,configurable:!0,get:function(){return o},set:function(t){o=t}});var s="normal";Object.defineProperty(this,"fontStyle",{enumerable:!0,configurable:!0,get:function(){return s},set:function(t){s=t}});var c=0;Object.defineProperty(this,"fontSize",{enumerable:!0,configurable:!0,get:function(){return c},set:function(t){c=t}});var u=void 0;Object.defineProperty(this,"maxFontSize",{enumerable:!0,configurable:!0,get:function(){return void 0===u?50/D:u},set:function(t){u=t}});var h="black";Object.defineProperty(this,"color",{enumerable:!0,configurable:!0,get:function(){return h},set:function(t){h=t}});var l="/F1 0 Tf 0 g";Object.defineProperty(this,"DA",{enumerable:!0,configurable:!1,get:function(){if(!(!l||this instanceof yt||this instanceof Nt))return st(l,this.objId,this.scope)},set:function(t){t=t.toString(),l=t}});var f=null;Object.defineProperty(this,"DV",{enumerable:!1,configurable:!1,get:function(){if(f)return this instanceof mt==!1?st(f,this.objId,this.scope):f},set:function(t){t=t.toString(),f=this instanceof mt==!1?"("===t.substr(0,1)?T(t.substr(1,t.length-2)):T(t):t}}),Object.defineProperty(this,"defaultValue",{enumerable:!0,configurable:!0,get:function(){return this instanceof mt==!0?T(f.substr(1,f.length-1)):f},set:function(t){t=t.toString(),f=this instanceof mt==!0?"/"+t:t}});var d=null;Object.defineProperty(this,"_V",{enumerable:!1,configurable:!1,get:function(){if(d)return d},set:function(t){this.V=t}}),Object.defineProperty(this,"V",{enumerable:!1,configurable:!1,get:function(){if(d)return this instanceof mt==!1?st(d,this.objId,this.scope):d},set:function(t){t=t.toString(),d=this instanceof mt==!1?"("===t.substr(0,1)?T(t.substr(1,t.length-2)):T(t):t}}),Object.defineProperty(this,"value",{enumerable:!0,configurable:!0,get:function(){return this instanceof mt==!0?T(d.substr(1,d.length-1)):d},set:function(t){t=t.toString(),d=this instanceof mt==!0?"/"+t:t}}),Object.defineProperty(this,"hasAnnotation",{enumerable:!0,configurable:!0,get:function(){return this.Rect}}),Object.defineProperty(this,"Type",{enumerable:!0,configurable:!1,get:function(){return this.hasAnnotation?"/Annot":null}}),Object.defineProperty(this,"Subtype",{enumerable:!0,configurable:!1,get:function(){return this.hasAnnotation?"/Widget":null}});var p,g=!1;Object.defineProperty(this,"hasAppearanceStream",{enumerable:!0,configurable:!0,get:function(){return g},set:function(t){t=Boolean(t),g=t}}),Object.defineProperty(this,"page",{enumerable:!0,configurable:!0,get:function(){if(p)return p},set:function(t){p=t}}),Object.defineProperty(this,"readOnly",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,1))},set:function(t){!0===Boolean(t)?this.Ff=K(this.Ff,1):this.Ff=Z(this.Ff,1)}}),Object.defineProperty(this,"required",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,2))},set:function(t){!0===Boolean(t)?this.Ff=K(this.Ff,2):this.Ff=Z(this.Ff,2)}}),Object.defineProperty(this,"noExport",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,3))},set:function(t){!0===Boolean(t)?this.Ff=K(this.Ff,3):this.Ff=Z(this.Ff,3)}});var m=null;Object.defineProperty(this,"Q",{enumerable:!0,configurable:!1,get:function(){if(null!==m)return m},set:function(t){if(-1===[0,1,2].indexOf(t))throw new Error('Invalid value "'+t+'" for attribute Q supplied.');m=t}}),Object.defineProperty(this,"textAlign",{get:function(){var t;switch(m){case 0:default:t="left";break;case 1:t="center";break;case 2:t="right"}return t},configurable:!0,enumerable:!0,set:function(t){switch(t){case"right":case 2:m=2;break;case"center":case 1:m=1;break;case"left":case 0:default:m=0}}})};H(lt,ct);var ft=function(){lt.call(this),this.FT="/Ch",this.V="()",this.fontName="zapfdingbats";var t=0;Object.defineProperty(this,"TI",{enumerable:!0,configurable:!1,get:function(){return t},set:function(e){t=e}}),Object.defineProperty(this,"topIndex",{enumerable:!0,configurable:!0,get:function(){return t},set:function(e){t=e}});var e=[];Object.defineProperty(this,"Opt",{enumerable:!0,configurable:!1,get:function(){return ot(e,this.objId,this.scope)},set:function(t){var r,n;n=[],"string"==typeof(r=t)&&(n=function(t,e,r){r||(r=1);for(var n,i=[];n=e.exec(t);)i.push(n[r]);return i}(r,/\((.*?)\)/g)),e=n}}),this.getOptions=function(){return e},this.setOptions=function(t){e=t,this.sort&&e.sort()},this.addOption=function(t){t=(t=t||"").toString(),e.push(t),this.sort&&e.sort()},this.removeOption=function(t,r){for(r=r||!1,t=(t=t||"").toString();-1!==e.indexOf(t)&&(e.splice(e.indexOf(t),1),!1!==r););},Object.defineProperty(this,"combo",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,18))},set:function(t){!0===Boolean(t)?this.Ff=K(this.Ff,18):this.Ff=Z(this.Ff,18)}}),Object.defineProperty(this,"edit",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,19))},set:function(t){!0===this.combo&&(!0===Boolean(t)?this.Ff=K(this.Ff,19):this.Ff=Z(this.Ff,19))}}),Object.defineProperty(this,"sort",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,20))},set:function(t){!0===Boolean(t)?(this.Ff=K(this.Ff,20),e.sort()):this.Ff=Z(this.Ff,20)}}),Object.defineProperty(this,"multiSelect",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,22))},set:function(t){!0===Boolean(t)?this.Ff=K(this.Ff,22):this.Ff=Z(this.Ff,22)}}),Object.defineProperty(this,"doNotSpellCheck",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,23))},set:function(t){!0===Boolean(t)?this.Ff=K(this.Ff,23):this.Ff=Z(this.Ff,23)}}),Object.defineProperty(this,"commitOnSelChange",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,27))},set:function(t){!0===Boolean(t)?this.Ff=K(this.Ff,27):this.Ff=Z(this.Ff,27)}}),this.hasAppearanceStream=!1};H(ft,lt);var dt=function(){ft.call(this),this.fontName="helvetica",this.combo=!1};H(dt,ft);var pt=function(){dt.call(this),this.combo=!0};H(pt,dt);var gt=function(){pt.call(this),this.edit=!0};H(gt,pt);var mt=function(){lt.call(this),this.FT="/Btn",Object.defineProperty(this,"noToggleToOff",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,15))},set:function(t){!0===Boolean(t)?this.Ff=K(this.Ff,15):this.Ff=Z(this.Ff,15)}}),Object.defineProperty(this,"radio",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,16))},set:function(t){!0===Boolean(t)?this.Ff=K(this.Ff,16):this.Ff=Z(this.Ff,16)}}),Object.defineProperty(this,"pushButton",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,17))},set:function(t){!0===Boolean(t)?this.Ff=K(this.Ff,17):this.Ff=Z(this.Ff,17)}}),Object.defineProperty(this,"radioIsUnison",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,26))},set:function(t){!0===Boolean(t)?this.Ff=K(this.Ff,26):this.Ff=Z(this.Ff,26)}});var e,r={};Object.defineProperty(this,"MK",{enumerable:!1,configurable:!1,get:function(){var t=function(t){return t};if(this.scope&&(t=this.scope.internal.getEncryptor(this.objId)),0!==Object.keys(r).length){var e,n=[];for(e in n.push("<<"),r)n.push("/"+e+" ("+R(t(r[e]))+")");return n.push(">>"),n.join("\n")}},set:function(e){"object"===(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(e)&&(r=e)}}),Object.defineProperty(this,"caption",{enumerable:!0,configurable:!0,get:function(){return r.CA||""},set:function(t){"string"==typeof t&&(r.CA=t)}}),Object.defineProperty(this,"AS",{enumerable:!1,configurable:!1,get:function(){return e},set:function(t){e=t}}),Object.defineProperty(this,"appearanceState",{enumerable:!0,configurable:!0,get:function(){return e.substr(1,e.length-1)},set:function(t){e="/"+t}})};H(mt,lt);var vt=function(){mt.call(this),this.pushButton=!0};H(vt,mt);var bt=function(){mt.call(this),this.radio=!0,this.pushButton=!1;var t=[];Object.defineProperty(this,"Kids",{enumerable:!0,configurable:!1,get:function(){return t},set:function(e){t=void 0!==e?e:[]}})};H(bt,mt);var yt=function(){var e,r;lt.call(this),Object.defineProperty(this,"Parent",{enumerable:!1,configurable:!1,get:function(){return e},set:function(t){e=t}}),Object.defineProperty(this,"optionName",{enumerable:!1,configurable:!0,get:function(){return r},set:function(t){r=t}});var n,i={};Object.defineProperty(this,"MK",{enumerable:!1,configurable:!1,get:function(){var t=function(t){return t};this.scope&&(t=this.scope.internal.getEncryptor(this.objId));var e,r=[];for(e in r.push("<<"),i)r.push("/"+e+" ("+R(t(i[e]))+")");return r.push(">>"),r.join("\n")},set:function(e){"object"===(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(e)&&(i=e)}}),Object.defineProperty(this,"caption",{enumerable:!0,configurable:!0,get:function(){return i.CA||""},set:function(t){"string"==typeof t&&(i.CA=t)}}),Object.defineProperty(this,"AS",{enumerable:!1,configurable:!1,get:function(){return n},set:function(t){n=t}}),Object.defineProperty(this,"appearanceState",{enumerable:!0,configurable:!0,get:function(){return n.substr(1,n.length-1)},set:function(t){n="/"+t}}),this.caption="l",this.appearanceState="Off",this._AppearanceType=At.RadioButton.Circle,this.appearanceStreamContent=this._AppearanceType.createAppearanceStream(this.optionName)};H(yt,lt),bt.prototype.setAppearance=function(t){if(!("createAppearanceStream"in t)||!("getCA"in t))throw new Error("Couldn't assign Appearance to RadioButton. Appearance was Invalid!");for(var e in this.Kids)if(this.Kids.hasOwnProperty(e)){var r=this.Kids[e];r.appearanceStreamContent=t.createAppearanceStream(r.optionName),r.caption=t.getCA()}},bt.prototype.createOption=function(t){var e=new yt;return e.Parent=this,e.optionName=t,this.Kids.push(e),xt.call(this.scope,e),e};var wt=function(){mt.call(this),this.fontName="zapfdingbats",this.caption="3",this.appearanceState="On",this.value="On",this.textAlign="center",this.appearanceStreamContent=At.CheckBox.createAppearanceStream()};H(wt,mt);var Nt=function(){lt.call(this),this.FT="/Tx",Object.defineProperty(this,"multiline",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,13))},set:function(t){!0===Boolean(t)?this.Ff=K(this.Ff,13):this.Ff=Z(this.Ff,13)}}),Object.defineProperty(this,"fileSelect",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,21))},set:function(t){!0===Boolean(t)?this.Ff=K(this.Ff,21):this.Ff=Z(this.Ff,21)}}),Object.defineProperty(this,"doNotSpellCheck",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,23))},set:function(t){!0===Boolean(t)?this.Ff=K(this.Ff,23):this.Ff=Z(this.Ff,23)}}),Object.defineProperty(this,"doNotScroll",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,24))},set:function(t){!0===Boolean(t)?this.Ff=K(this.Ff,24):this.Ff=Z(this.Ff,24)}}),Object.defineProperty(this,"comb",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,25))},set:function(t){!0===Boolean(t)?this.Ff=K(this.Ff,25):this.Ff=Z(this.Ff,25)}}),Object.defineProperty(this,"richText",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,26))},set:function(t){!0===Boolean(t)?this.Ff=K(this.Ff,26):this.Ff=Z(this.Ff,26)}});var t=null;Object.defineProperty(this,"MaxLen",{enumerable:!0,configurable:!1,get:function(){return t},set:function(e){t=e}}),Object.defineProperty(this,"maxLength",{enumerable:!0,configurable:!0,get:function(){return t},set:function(e){Number.isInteger(e)&&(t=e)}}),Object.defineProperty(this,"hasAppearanceStream",{enumerable:!0,configurable:!0,get:function(){return this.V||this.DV}})};H(Nt,lt);var Lt=function(){Nt.call(this),Object.defineProperty(this,"password",{enumerable:!0,configurable:!0,get:function(){return Boolean(X(this.Ff,14))},set:function(t){!0===Boolean(t)?this.Ff=K(this.Ff,14):this.Ff=Z(this.Ff,14)}}),this.password=!0};H(Lt,Nt);var At={CheckBox:{createAppearanceStream:function(){return{N:{On:At.CheckBox.YesNormal},D:{On:At.CheckBox.YesPushDown,Off:At.CheckBox.OffPushDown}}},YesPushDown:function(t){var e=V(t);e.scope=t.scope;var r=[],n=t.scope.internal.getFont(t.fontName,t.fontStyle).id,i=t.scope.__private__.encodeColorString(t.color),a=tt(t,t.caption);return r.push("0.749023 g"),r.push("0 0 "+U(At.internal.getWidth(t))+" "+U(At.internal.getHeight(t))+" re"),r.push("f"),r.push("BMC"),r.push("q"),r.push("0 0 1 rg"),r.push("/"+n+" "+U(a.fontSize)+" Tf "+i),r.push("BT"),r.push(a.text),r.push("ET"),r.push("Q"),r.push("EMC"),e.stream=r.join("\n"),e},YesNormal:function(t){var e=V(t);e.scope=t.scope;var r=t.scope.internal.getFont(t.fontName,t.fontStyle).id,n=t.scope.__private__.encodeColorString(t.color),i=[],a=At.internal.getHeight(t),o=At.internal.getWidth(t),s=tt(t,t.caption);return i.push("1 g"),i.push("0 0 "+U(o)+" "+U(a)+" re"),i.push("f"),i.push("q"),i.push("0 0 1 rg"),i.push("0 0 "+U(o-1)+" "+U(a-1)+" re"),i.push("W"),i.push("n"),i.push("0 g"),i.push("BT"),i.push("/"+r+" "+U(s.fontSize)+" Tf "+n),i.push(s.text),i.push("ET"),i.push("Q"),e.stream=i.join("\n"),e},OffPushDown:function(t){var e=V(t);e.scope=t.scope;var r=[];return r.push("0.749023 g"),r.push("0 0 "+U(At.internal.getWidth(t))+" "+U(At.internal.getHeight(t))+" re"),r.push("f"),e.stream=r.join("\n"),e}},RadioButton:{Circle:{createAppearanceStream:function(t){var e={D:{Off:At.RadioButton.Circle.OffPushDown},N:{}};return e.N[t]=At.RadioButton.Circle.YesNormal,e.D[t]=At.RadioButton.Circle.YesPushDown,e},getCA:function(){return"l"},YesNormal:function(t){var e=V(t);e.scope=t.scope;var r=[],n=At.internal.getWidth(t)<=At.internal.getHeight(t)?At.internal.getWidth(t)/4:At.internal.getHeight(t)/4;n=Number((.9*n).toFixed(5));var i=At.internal.Bezier_C,a=Number((n*i).toFixed(5));return r.push("q"),r.push("1 0 0 1 "+z(At.internal.getWidth(t)/2)+" "+z(At.internal.getHeight(t)/2)+" cm"),r.push(n+" 0 m"),r.push(n+" "+a+" "+a+" "+n+" 0 "+n+" c"),r.push("-"+a+" "+n+" -"+n+" "+a+" -"+n+" 0 c"),r.push("-"+n+" -"+a+" -"+a+" -"+n+" 0 -"+n+" c"),r.push(a+" -"+n+" "+n+" -"+a+" "+n+" 0 c"),r.push("f"),r.push("Q"),e.stream=r.join("\n"),e},YesPushDown:function(t){var e=V(t);e.scope=t.scope;var r=[],n=At.internal.getWidth(t)<=At.internal.getHeight(t)?At.internal.getWidth(t)/4:At.internal.getHeight(t)/4;n=Number((.9*n).toFixed(5));var i=Number((2*n).toFixed(5)),a=Number((i*At.internal.Bezier_C).toFixed(5)),o=Number((n*At.internal.Bezier_C).toFixed(5));return r.push("0.749023 g"),r.push("q"),r.push("1 0 0 1 "+z(At.internal.getWidth(t)/2)+" "+z(At.internal.getHeight(t)/2)+" cm"),r.push(i+" 0 m"),r.push(i+" "+a+" "+a+" "+i+" 0 "+i+" c"),r.push("-"+a+" "+i+" -"+i+" "+a+" -"+i+" 0 c"),r.push("-"+i+" -"+a+" -"+a+" -"+i+" 0 -"+i+" c"),r.push(a+" -"+i+" "+i+" -"+a+" "+i+" 0 c"),r.push("f"),r.push("Q"),r.push("0 g"),r.push("q"),r.push("1 0 0 1 "+z(At.internal.getWidth(t)/2)+" "+z(At.internal.getHeight(t)/2)+" cm"),r.push(n+" 0 m"),r.push(n+" "+o+" "+o+" "+n+" 0 "+n+" c"),r.push("-"+o+" "+n+" -"+n+" "+o+" -"+n+" 0 c"),r.push("-"+n+" -"+o+" -"+o+" -"+n+" 0 -"+n+" c"),r.push(o+" -"+n+" "+n+" -"+o+" "+n+" 0 c"),r.push("f"),r.push("Q"),e.stream=r.join("\n"),e},OffPushDown:function(t){var e=V(t);e.scope=t.scope;var r=[],n=At.internal.getWidth(t)<=At.internal.getHeight(t)?At.internal.getWidth(t)/4:At.internal.getHeight(t)/4;n=Number((.9*n).toFixed(5));var i=Number((2*n).toFixed(5)),a=Number((i*At.internal.Bezier_C).toFixed(5));return r.push("0.749023 g"),r.push("q"),r.push("1 0 0 1 "+z(At.internal.getWidth(t)/2)+" "+z(At.internal.getHeight(t)/2)+" cm"),r.push(i+" 0 m"),r.push(i+" "+a+" "+a+" "+i+" 0 "+i+" c"),r.push("-"+a+" "+i+" -"+i+" "+a+" -"+i+" 0 c"),r.push("-"+i+" -"+a+" -"+a+" -"+i+" 0 -"+i+" c"),r.push(a+" -"+i+" "+i+" -"+a+" "+i+" 0 c"),r.push("f"),r.push("Q"),e.stream=r.join("\n"),e}},Cross:{createAppearanceStream:function(t){var e={D:{Off:At.RadioButton.Cross.OffPushDown},N:{}};return e.N[t]=At.RadioButton.Cross.YesNormal,e.D[t]=At.RadioButton.Cross.YesPushDown,e},getCA:function(){return"8"},YesNormal:function(t){var e=V(t);e.scope=t.scope;var r=[],n=At.internal.calculateCross(t);return r.push("q"),r.push("1 1 "+U(At.internal.getWidth(t)-2)+" "+U(At.internal.getHeight(t)-2)+" re"),r.push("W"),r.push("n"),r.push(U(n.x1.x)+" "+U(n.x1.y)+" m"),r.push(U(n.x2.x)+" "+U(n.x2.y)+" l"),r.push(U(n.x4.x)+" "+U(n.x4.y)+" m"),r.push(U(n.x3.x)+" "+U(n.x3.y)+" l"),r.push("s"),r.push("Q"),e.stream=r.join("\n"),e},YesPushDown:function(t){var e=V(t);e.scope=t.scope;var r=At.internal.calculateCross(t),n=[];return n.push("0.749023 g"),n.push("0 0 "+U(At.internal.getWidth(t))+" "+U(At.internal.getHeight(t))+" re"),n.push("f"),n.push("q"),n.push("1 1 "+U(At.internal.getWidth(t)-2)+" "+U(At.internal.getHeight(t)-2)+" re"),n.push("W"),n.push("n"),n.push(U(r.x1.x)+" "+U(r.x1.y)+" m"),n.push(U(r.x2.x)+" "+U(r.x2.y)+" l"),n.push(U(r.x4.x)+" "+U(r.x4.y)+" m"),n.push(U(r.x3.x)+" "+U(r.x3.y)+" l"),n.push("s"),n.push("Q"),e.stream=n.join("\n"),e},OffPushDown:function(t){var e=V(t);e.scope=t.scope;var r=[];return r.push("0.749023 g"),r.push("0 0 "+U(At.internal.getWidth(t))+" "+U(At.internal.getHeight(t))+" re"),r.push("f"),e.stream=r.join("\n"),e}}},createDefaultAppearanceStream:function(t){var e=t.scope.internal.getFont(t.fontName,t.fontStyle).id,r=t.scope.__private__.encodeColorString(t.color);return"/"+e+" "+t.fontSize+" Tf "+r}};At.internal={Bezier_C:.551915024494,calculateCross:function(t){var e=At.internal.getWidth(t),r=At.internal.getHeight(t),n=Math.min(e,r);return{x1:{x:(e-n)/2,y:(r-n)/2+n},x2:{x:(e-n)/2+n,y:(r-n)/2},x3:{x:(e-n)/2,y:(r-n)/2},x4:{x:(e-n)/2+n,y:(r-n)/2+n}}}},At.internal.getWidth=function(e){var r=0;return"object"===(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(e)&&(r=W(e.Rect[2])),r},At.internal.getHeight=function(e){var r=0;return"object"===(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(e)&&(r=W(e.Rect[3])),r};var xt=q.addField=function(t){if(at(this,t),!(t instanceof lt))throw new Error("Invalid argument passed to jsPDF.addField.");var e;return(e=t).scope.internal.acroformPlugin.printedOut&&(e.scope.internal.acroformPlugin.printedOut=!1,e.scope.internal.acroformPlugin.acroFormDictionaryRoot=null),e.scope.internal.acroformPlugin.acroFormDictionaryRoot.Fields.push(e),t.page=t.scope.internal.getCurrentPageInfo().pageNumber,this};q.AcroFormChoiceField=ft,q.AcroFormListBox=dt,q.AcroFormComboBox=pt,q.AcroFormEditBox=gt,q.AcroFormButton=mt,q.AcroFormPushButton=vt,q.AcroFormRadioButton=bt,q.AcroFormCheckBox=wt,q.AcroFormTextField=Nt,q.AcroFormPasswordField=Lt,q.AcroFormAppearance=At,q.AcroForm={ChoiceField:ft,ListBox:dt,ComboBox:pt,EditBox:gt,Button:mt,PushButton:vt,RadioButton:bt,CheckBox:wt,TextField:Nt,PasswordField:Lt,Appearance:At},E.AcroForm={ChoiceField:ft,ListBox:dt,ComboBox:pt,EditBox:gt,Button:mt,PushButton:vt,RadioButton:bt,CheckBox:wt,TextField:Nt,PasswordField:Lt,Appearance:At};var St=E.AcroForm;function _t(t){return t.reduce((function(t,e,r){return t[e]=r,t}),{})}!function(e){e.__addimage__={};var r="UNKNOWN",n={PNG:[[137,80,78,71]],TIFF:[[77,77,0,42],[73,73,42,0]],JPEG:[[255,216,255,224,void 0,void 0,74,70,73,70,0],[255,216,255,225,void 0,void 0,69,120,105,102,0,0],[255,216,255,219],[255,216,255,238]],JPEG2000:[[0,0,0,12,106,80,32,32]],GIF87a:[[71,73,70,56,55,97]],GIF89a:[[71,73,70,56,57,97]],WEBP:[[82,73,70,70,void 0,void 0,void 0,void 0,87,69,66,80]],BMP:[[66,77],[66,65],[67,73],[67,80],[73,67],[80,84]]},i=e.__addimage__.getImageFileTypeByImageData=function(t,e){var i,a,o,s,c,u=r;if("RGBA"===(e=e||r)||void 0!==t.data&&t.data instanceof Uint8ClampedArray&&"height"in t&&"width"in t)return"RGBA";if(x(t))for(c in n)for(o=n[c],i=0;i<o.length;i+=1){for(s=!0,a=0;a<o[i].length;a+=1)if(void 0!==o[i][a]&&o[i][a]!==t[a]){s=!1;break}if(!0===s){u=c;break}}else for(c in n)for(o=n[c],i=0;i<o.length;i+=1){for(s=!0,a=0;a<o[i].length;a+=1)if(void 0!==o[i][a]&&o[i][a]!==t.charCodeAt(a)){s=!1;break}if(!0===s){u=c;break}}return u===r&&e!==r&&(u=e),u},a=function t(e){for(var r=this.internal.write,n=this.internal.putStream,i=(0,this.internal.getFilters)();-1!==i.indexOf("FlateEncode");)i.splice(i.indexOf("FlateEncode"),1);e.objectId=this.internal.newObject();var a=[];if(a.push({key:"Type",value:"/XObject"}),a.push({key:"Subtype",value:"/Image"}),a.push({key:"Width",value:e.width}),a.push({key:"Height",value:e.height}),e.colorSpace===b.INDEXED?a.push({key:"ColorSpace",value:"[/Indexed /DeviceRGB "+(e.palette.length/3-1)+" "+("sMask"in e&&void 0!==e.sMask?e.objectId+2:e.objectId+1)+" 0 R]"}):(a.push({key:"ColorSpace",value:"/"+e.colorSpace}),e.colorSpace===b.DEVICE_CMYK&&a.push({key:"Decode",value:"[1 0 1 0 1 0 1 0]"})),a.push({key:"BitsPerComponent",value:e.bitsPerComponent}),"decodeParameters"in e&&void 0!==e.decodeParameters&&a.push({key:"DecodeParms",value:"<<"+e.decodeParameters+">>"}),"transparency"in e&&Array.isArray(e.transparency)){for(var o="",s=0,c=e.transparency.length;s<c;s++)o+=e.transparency[s]+" "+e.transparency[s]+" ";a.push({key:"Mask",value:"["+o+"]"})}void 0!==e.sMask&&a.push({key:"SMask",value:e.objectId+1+" 0 R"});var u=void 0!==e.filter?["/"+e.filter]:void 0;if(n({data:e.data,additionalKeyValues:a,alreadyAppliedFilters:u,objectId:e.objectId}),r("endobj"),"sMask"in e&&void 0!==e.sMask){var h="/Predictor "+e.predictor+" /Colors 1 /BitsPerComponent "+e.bitsPerComponent+" /Columns "+e.width,l={width:e.width,height:e.height,colorSpace:"DeviceGray",bitsPerComponent:e.bitsPerComponent,decodeParameters:h,data:e.sMask};"filter"in e&&(l.filter=e.filter),t.call(this,l)}if(e.colorSpace===b.INDEXED){var f=this.internal.newObject();n({data:_(new Uint8Array(e.palette)),objectId:f}),r("endobj")}},o=function(){var t=this.internal.collections.addImage_images;for(var e in t)a.call(this,t[e])},s=function(){var t,e=this.internal.collections.addImage_images,r=this.internal.write;for(var n in e)r("/I"+(t=e[n]).index,t.objectId,"0","R")},c=function(){this.internal.collections.addImage_images||(this.internal.collections.addImage_images={},this.internal.events.subscribe("putResources",o),this.internal.events.subscribe("putXobjectDict",s))},h=function(){var t=this.internal.collections.addImage_images;return c.call(this),t},l=function(){return Object.keys(this.internal.collections.addImage_images).length},f=function(t){return"function"==typeof e["process"+t.toUpperCase()]},d=function(e){return"object"===(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(e)&&1===e.nodeType},p=function(t,r){if("IMG"===t.nodeName&&t.hasAttribute("src")){var n=""+t.getAttribute("src");if(0===n.indexOf("data:image/"))return u(unescape(n).split("base64,").pop());var i=e.loadFile(n,!0);if(void 0!==i)return i}if("CANVAS"===t.nodeName){if(0===t.width||0===t.height)throw new Error("Given canvas must have data. Canvas width: "+t.width+", height: "+t.height);var a;switch(r){case"PNG":a="image/png";break;case"WEBP":a="image/webp";break;case"JPEG":case"JPG":default:a="image/jpeg"}return u(t.toDataURL(a,1).split("base64,").pop())}},g=function(t){var e=this.internal.collections.addImage_images;if(e)for(var r in e)if(t===e[r].alias)return e[r]},m=function(t,e,r){return t||e||(t=-96,e=-96),t<0&&(t=-1*r.width*72/t/this.internal.scaleFactor),e<0&&(e=-1*r.height*72/e/this.internal.scaleFactor),0===t&&(t=e*r.width/r.height),0===e&&(e=t*r.height/r.width),[t,e]},v=function(t,e,r,n,i,a){var o=m.call(this,r,n,i),s=this.internal.getCoordinateString,c=this.internal.getVerticalCoordinateString,u=h.call(this);if(r=o[0],n=o[1],u[i.index]=i,a){a*=Math.PI/180;var l=Math.cos(a),f=Math.sin(a),d=function(t){return t.toFixed(4)},p=[d(l),d(f),d(-1*f),d(l),0,0,"cm"]}this.internal.write("q"),a?(this.internal.write([1,"0","0",1,s(t),c(e+n),"cm"].join(" ")),this.internal.write(p.join(" ")),this.internal.write([s(r),"0","0",s(n),"0","0","cm"].join(" "))):this.internal.write([s(r),"0","0",s(n),s(t),c(e+n),"cm"].join(" ")),this.isAdvancedAPI()&&this.internal.write([1,0,0,-1,0,0,"cm"].join(" ")),this.internal.write("/I"+i.index+" Do"),this.internal.write("Q")},b=e.color_spaces={DEVICE_RGB:"DeviceRGB",DEVICE_GRAY:"DeviceGray",DEVICE_CMYK:"DeviceCMYK",CAL_GREY:"CalGray",CAL_RGB:"CalRGB",LAB:"Lab",ICC_BASED:"ICCBased",INDEXED:"Indexed",PATTERN:"Pattern",SEPARATION:"Separation",DEVICE_N:"DeviceN"};e.decode={DCT_DECODE:"DCTDecode",FLATE_DECODE:"FlateDecode",LZW_DECODE:"LZWDecode",JPX_DECODE:"JPXDecode",JBIG2_DECODE:"JBIG2Decode",ASCII85_DECODE:"ASCII85Decode",ASCII_HEX_DECODE:"ASCIIHexDecode",RUN_LENGTH_DECODE:"RunLengthDecode",CCITT_FAX_DECODE:"CCITTFaxDecode"};var y=e.image_compression={NONE:"NONE",FAST:"FAST",MEDIUM:"MEDIUM",SLOW:"SLOW"},w=e.__addimage__.sHashCode=function(t){var e,r,n=0;if("string"==typeof t)for(r=t.length,e=0;e<r;e++)n=(n<<5)-n+t.charCodeAt(e),n|=0;else if(x(t))for(r=t.byteLength/2,e=0;e<r;e++)n=(n<<5)-n+t[e],n|=0;return n},N=e.__addimage__.validateStringAsBase64=function(t){(t=t||"").toString().trim();var e=!0;return 0===t.length&&(e=!1),t.length%4!=0&&(e=!1),!1===/^[A-Za-z0-9+/]+$/.test(t.substr(0,t.length-2))&&(e=!1),!1===/^[A-Za-z0-9/][A-Za-z0-9+/]|[A-Za-z0-9+/]=|==$/.test(t.substr(-2))&&(e=!1),e},L=e.__addimage__.extractImageFromDataUrl=function(t){var e=(t=t||"").split("base64,"),r=null;if(2===e.length){var n=/^data:(\w*\/\w*);*(charset=(?!charset=)[\w=-]*)*;*$/.exec(e[0]);Array.isArray(n)&&(r={mimeType:n[1],charset:n[2],data:e[1]})}return r},A=e.__addimage__.supportsArrayBuffer=function(){return"undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array};e.__addimage__.isArrayBuffer=function(t){return A()&&t instanceof ArrayBuffer};var x=e.__addimage__.isArrayBufferView=function(t){return A()&&"undefined"!=typeof Uint32Array&&(t instanceof Int8Array||t instanceof Uint8Array||"undefined"!=typeof Uint8ClampedArray&&t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array)},S=e.__addimage__.binaryStringToUint8Array=function(t){for(var e=t.length,r=new Uint8Array(e),n=0;n<e;n++)r[n]=t.charCodeAt(n);return r},_=e.__addimage__.arrayBufferToBinaryString=function(t){for(var e="",r=x(t)?t:new Uint8Array(t),n=0;n<r.length;n+=8192)e+=String.fromCharCode.apply(null,r.subarray(n,n+8192));return e};e.addImage=function(){var e,n,i,a,o,s,u,h,l;if("number"==typeof arguments[1]?(n=r,i=arguments[1],a=arguments[2],o=arguments[3],s=arguments[4],u=arguments[5],h=arguments[6],l=arguments[7]):(n=arguments[1],i=arguments[2],a=arguments[3],o=arguments[4],s=arguments[5],u=arguments[6],h=arguments[7],l=arguments[8]),"object"===(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(e=arguments[0])&&!d(e)&&"imageData"in e){var f=e;e=f.imageData,n=f.format||n||r,i=f.x||i||0,a=f.y||a||0,o=f.w||f.width||o,s=f.h||f.height||s,u=f.alias||u,h=f.compression||h,l=f.rotation||f.angle||l}var p=this.internal.getFilters();if(void 0===h&&-1!==p.indexOf("FlateEncode")&&(h="SLOW"),isNaN(i)||isNaN(a))throw new Error("Invalid coordinates passed to jsPDF.addImage");c.call(this);var g=P.call(this,e,n,u,h);return v.call(this,i,a,o,s,g,l),this};var P=function(t,n,a,o){var s,c,u;if("string"==typeof t&&i(t)===r){t=unescape(t);var h=k(t,!1);(""!==h||void 0!==(h=e.loadFile(t,!0)))&&(t=h)}if(d(t)&&(t=p(t,n)),n=i(t,n),!f(n))throw new Error("addImage does not support files of type '"+n+"', please ensure that a plugin for '"+n+"' support is added.");if((null==(u=a)||0===u.length)&&(a=function(t){return"string"==typeof t||x(t)?w(t):x(t.data)?w(t.data):null}(t)),(s=g.call(this,a))||(A()&&(t instanceof Uint8Array||"RGBA"===n||(c=t,t=S(t))),s=this["process"+n.toUpperCase()](t,l.call(this),a,function(t){return t&&"string"==typeof t&&(t=t.toUpperCase()),t in e.image_compression?t:y.NONE}(o),c)),!s)throw new Error("An unknown error occurred whilst processing the image.");return s},k=e.__addimage__.convertBase64ToBinaryString=function(t,e){var r;e="boolean"!=typeof e||e;var n,i="";if("string"==typeof t){n=null!==(r=L(t))?r.data:t;try{i=u(n)}catch(t){if(e)throw N(n)?new Error("atob-Error in jsPDF.convertBase64ToBinaryString "+t.message):new Error("Supplied Data is not a valid base64-String jsPDF.convertBase64ToBinaryString ")}}return i};e.getImageProperties=function(t){var n,a,o="";if(d(t)&&(t=p(t)),"string"==typeof t&&i(t)===r&&(""===(o=k(t,!1))&&(o=e.loadFile(t)||""),t=o),a=i(t),!f(a))throw new Error("addImage does not support files of type '"+a+"', please ensure that a plugin for '"+a+"' support is added.");if(!A()||t instanceof Uint8Array||(t=S(t)),!(n=this["process"+a.toUpperCase()](t)))throw new Error("An unknown error occurred whilst processing the image");return n.fileType=a,n}}(E.API),
/**
 * @license
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t){var e=function(t){if(void 0!==t&&""!=t)return!0};E.API.events.push(["addPage",function(t){this.internal.getPageInfo(t.pageNumber).pageContext.annotations=[]}]),t.events.push(["putPage",function(t){for(var r,n,i,a=this.internal.getCoordinateString,o=this.internal.getVerticalCoordinateString,s=this.internal.getPageInfoByObjId(t.objId),c=t.pageContext.annotations,u=!1,h=0;h<c.length&&!u;h++)switch((r=c[h]).type){case"link":(e(r.options.url)||e(r.options.pageNumber))&&(u=!0);break;case"reference":case"text":case"freetext":u=!0}if(0!=u){this.internal.write("/Annots [");for(var l=0;l<c.length;l++){r=c[l];var f=this.internal.pdfEscape,d=this.internal.getEncryptor(t.objId);switch(r.type){case"reference":this.internal.write(" "+r.object.objId+" 0 R ");break;case"text":var p=this.internal.newAdditionalObject(),g=this.internal.newAdditionalObject(),m=this.internal.getEncryptor(p.objId),v=r.title||"Note";i="<</Type /Annot /Subtype /Text "+(n="/Rect ["+a(r.bounds.x)+" "+o(r.bounds.y+r.bounds.h)+" "+a(r.bounds.x+r.bounds.w)+" "+o(r.bounds.y)+"] ")+"/Contents ("+f(m(r.contents))+")",i+=" /Popup "+g.objId+" 0 R",i+=" /P "+s.objId+" 0 R",i+=" /T ("+f(m(v))+") >>",p.content=i;var b=p.objId+" 0 R";i="<</Type /Annot /Subtype /Popup "+(n="/Rect ["+a(r.bounds.x+30)+" "+o(r.bounds.y+r.bounds.h)+" "+a(r.bounds.x+r.bounds.w+30)+" "+o(r.bounds.y)+"] ")+" /Parent "+b,r.open&&(i+=" /Open true"),i+=" >>",g.content=i,this.internal.write(p.objId,"0 R",g.objId,"0 R");break;case"freetext":n="/Rect ["+a(r.bounds.x)+" "+o(r.bounds.y)+" "+a(r.bounds.x+r.bounds.w)+" "+o(r.bounds.y+r.bounds.h)+"] ";var y=r.color||"#000000";i="<</Type /Annot /Subtype /FreeText "+n+"/Contents ("+f(d(r.contents))+")",i+=" /DS(font: Helvetica,sans-serif 12.0pt; text-align:left; color:#"+y+")",i+=" /Border [0 0 0]",i+=" >>",this.internal.write(i);break;case"link":if(r.options.name){var w=this.annotations._nameMap[r.options.name];r.options.pageNumber=w.page,r.options.top=w.y}else r.options.top||(r.options.top=0);if(n="/Rect ["+r.finalBounds.x+" "+r.finalBounds.y+" "+r.finalBounds.w+" "+r.finalBounds.h+"] ",i="",r.options.url)i="<</Type /Annot /Subtype /Link "+n+"/Border [0 0 0] /A <</S /URI /URI ("+f(d(r.options.url))+") >>";else if(r.options.pageNumber){switch(i="<</Type /Annot /Subtype /Link "+n+"/Border [0 0 0] /Dest ["+this.internal.getPageInfo(r.options.pageNumber).objId+" 0 R",r.options.magFactor=r.options.magFactor||"XYZ",r.options.magFactor){case"Fit":i+=" /Fit]";break;case"FitH":i+=" /FitH "+r.options.top+"]";break;case"FitV":r.options.left=r.options.left||0,i+=" /FitV "+r.options.left+"]";break;case"XYZ":default:var N=o(r.options.top);r.options.left=r.options.left||0,void 0===r.options.zoom&&(r.options.zoom=0),i+=" /XYZ "+r.options.left+" "+N+" "+r.options.zoom+"]"}}""!=i&&(i+=" >>",this.internal.write(i))}}this.internal.write("]")}}]),t.createAnnotation=function(t){var e=this.internal.getCurrentPageInfo();switch(t.type){case"link":this.link(t.bounds.x,t.bounds.y,t.bounds.w,t.bounds.h,t);break;case"text":case"freetext":e.pageContext.annotations.push(t)}},t.link=function(t,e,r,n,i){var a=this.internal.getCurrentPageInfo(),o=this.internal.getCoordinateString,s=this.internal.getVerticalCoordinateString;a.pageContext.annotations.push({finalBounds:{x:o(t),y:s(e),w:o(t+r),h:s(e+n)},options:i,type:"link"})},t.textWithLink=function(t,e,r,n){var i,a,o=this.getTextWidth(t),s=this.internal.getLineHeight()/this.internal.scaleFactor;if(void 0!==n.maxWidth){a=n.maxWidth;var c=this.splitTextToSize(t,a).length;i=Math.ceil(s*c)}else a=o,i=s;return this.text(t,e,r,n),r+=.2*s,"center"===n.align&&(e-=o/2),"right"===n.align&&(e-=o),this.link(e,r-s,a,i,n),o},t.getTextWidth=function(t){var e=this.internal.getFontSize();return this.getStringUnitWidth(t)*e/this.internal.scaleFactor}}(E.API),
/**
 * @license
 * Copyright (c) 2017 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t){var e={1569:[65152],1570:[65153,65154],1571:[65155,65156],1572:[65157,65158],1573:[65159,65160],1574:[65161,65162,65163,65164],1575:[65165,65166],1576:[65167,65168,65169,65170],1577:[65171,65172],1578:[65173,65174,65175,65176],1579:[65177,65178,65179,65180],1580:[65181,65182,65183,65184],1581:[65185,65186,65187,65188],1582:[65189,65190,65191,65192],1583:[65193,65194],1584:[65195,65196],1585:[65197,65198],1586:[65199,65200],1587:[65201,65202,65203,65204],1588:[65205,65206,65207,65208],1589:[65209,65210,65211,65212],1590:[65213,65214,65215,65216],1591:[65217,65218,65219,65220],1592:[65221,65222,65223,65224],1593:[65225,65226,65227,65228],1594:[65229,65230,65231,65232],1601:[65233,65234,65235,65236],1602:[65237,65238,65239,65240],1603:[65241,65242,65243,65244],1604:[65245,65246,65247,65248],1605:[65249,65250,65251,65252],1606:[65253,65254,65255,65256],1607:[65257,65258,65259,65260],1608:[65261,65262],1609:[65263,65264,64488,64489],1610:[65265,65266,65267,65268],1649:[64336,64337],1655:[64477],1657:[64358,64359,64360,64361],1658:[64350,64351,64352,64353],1659:[64338,64339,64340,64341],1662:[64342,64343,64344,64345],1663:[64354,64355,64356,64357],1664:[64346,64347,64348,64349],1667:[64374,64375,64376,64377],1668:[64370,64371,64372,64373],1670:[64378,64379,64380,64381],1671:[64382,64383,64384,64385],1672:[64392,64393],1676:[64388,64389],1677:[64386,64387],1678:[64390,64391],1681:[64396,64397],1688:[64394,64395],1700:[64362,64363,64364,64365],1702:[64366,64367,64368,64369],1705:[64398,64399,64400,64401],1709:[64467,64468,64469,64470],1711:[64402,64403,64404,64405],1713:[64410,64411,64412,64413],1715:[64406,64407,64408,64409],1722:[64414,64415],1723:[64416,64417,64418,64419],1726:[64426,64427,64428,64429],1728:[64420,64421],1729:[64422,64423,64424,64425],1733:[64480,64481],1734:[64473,64474],1735:[64471,64472],1736:[64475,64476],1737:[64482,64483],1739:[64478,64479],1740:[64508,64509,64510,64511],1744:[64484,64485,64486,64487],1746:[64430,64431],1747:[64432,64433]},r={65247:{65154:65269,65156:65271,65160:65273,65166:65275},65248:{65154:65270,65156:65272,65160:65274,65166:65276},65165:{65247:{65248:{65258:65010}}},1617:{1612:64606,1613:64607,1614:64608,1615:64609,1616:64610}},n={1612:64606,1613:64607,1614:64608,1615:64609,1616:64610},i=[1570,1571,1573,1575];t.__arabicParser__={};var a=t.__arabicParser__.isInArabicSubstitutionA=function(t){return void 0!==e[t.charCodeAt(0)]},o=t.__arabicParser__.isArabicLetter=function(t){return"string"==typeof t&&/^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+$/.test(t)},s=t.__arabicParser__.isArabicEndLetter=function(t){return o(t)&&a(t)&&e[t.charCodeAt(0)].length<=2},c=t.__arabicParser__.isArabicAlfLetter=function(t){return o(t)&&i.indexOf(t.charCodeAt(0))>=0};t.__arabicParser__.arabicLetterHasIsolatedForm=function(t){return o(t)&&a(t)&&e[t.charCodeAt(0)].length>=1};var u=t.__arabicParser__.arabicLetterHasFinalForm=function(t){return o(t)&&a(t)&&e[t.charCodeAt(0)].length>=2};t.__arabicParser__.arabicLetterHasInitialForm=function(t){return o(t)&&a(t)&&e[t.charCodeAt(0)].length>=3};var h=t.__arabicParser__.arabicLetterHasMedialForm=function(t){return o(t)&&a(t)&&4==e[t.charCodeAt(0)].length},l=t.__arabicParser__.resolveLigatures=function(t){var e=0,n=r,i="",a=0;for(e=0;e<t.length;e+=1)void 0!==n[t.charCodeAt(e)]?(a++,"number"==typeof(n=n[t.charCodeAt(e)])&&(i+=String.fromCharCode(n),n=r,a=0),e===t.length-1&&(n=r,i+=t.charAt(e-(a-1)),e-=a-1,a=0)):(n=r,i+=t.charAt(e-a),e-=a,a=0);return i};t.__arabicParser__.isArabicDiacritic=function(t){return void 0!==t&&void 0!==n[t.charCodeAt(0)]};var f=t.__arabicParser__.getCorrectForm=function(t,e,r){return o(t)?!1===a(t)?-1:!u(t)||!o(e)&&!o(r)||!o(r)&&s(e)||s(t)&&!o(e)||s(t)&&c(e)||s(t)&&s(e)?0:h(t)&&o(e)&&!s(e)&&o(r)&&u(r)?3:s(t)||!o(r)?1:2:-1},d=function(t){var r=0,n=0,i=0,a="",s="",c="",u=(t=t||"").split("\\s+"),h=[];for(r=0;r<u.length;r+=1){for(h.push(""),n=0;n<u[r].length;n+=1)a=u[r][n],s=u[r][n-1],c=u[r][n+1],o(a)?(i=f(a,s,c),h[r]+=-1!==i?String.fromCharCode(e[a.charCodeAt(0)][i]):a):h[r]+=a;h[r]=l(h[r])}return h.join(" ")},p=t.__arabicParser__.processArabic=t.processArabic=function(){var t,e="string"==typeof arguments[0]?arguments[0]:arguments[0].text,r=[];if(Array.isArray(e)){var n=0;for(r=[],n=0;n<e.length;n+=1)Array.isArray(e[n])?r.push([d(e[n][0]),e[n][1],e[n][2]]):r.push([d(e[n])]);t=r}else t=d(e);return"string"==typeof arguments[0]?t:(arguments[0].text=t,arguments[0])};t.events.push(["preProcessText",p])}(E.API),E.API.autoPrint=function(t){var e;switch((t=t||{}).variant=t.variant||"non-conform",t.variant){case"javascript":this.addJS("print({});");break;case"non-conform":default:this.internal.events.subscribe("postPutResources",(function(){e=this.internal.newObject(),this.internal.out("<<"),this.internal.out("/S /Named"),this.internal.out("/Type /Action"),this.internal.out("/N /Print"),this.internal.out(">>"),this.internal.out("endobj")})),this.internal.events.subscribe("putCatalog",(function(){this.internal.out("/OpenAction "+e+" 0 R")}))}return this},
/**
 * @license
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t){var e=function(){var t=void 0;Object.defineProperty(this,"pdf",{get:function(){return t},set:function(e){t=e}});var e=150;Object.defineProperty(this,"width",{get:function(){return e},set:function(t){e=isNaN(t)||!1===Number.isInteger(t)||t<0?150:t,this.getContext("2d").pageWrapXEnabled&&(this.getContext("2d").pageWrapX=e+1)}});var r=300;Object.defineProperty(this,"height",{get:function(){return r},set:function(t){r=isNaN(t)||!1===Number.isInteger(t)||t<0?300:t,this.getContext("2d").pageWrapYEnabled&&(this.getContext("2d").pageWrapY=r+1)}});var n=[];Object.defineProperty(this,"childNodes",{get:function(){return n},set:function(t){n=t}});var i={};Object.defineProperty(this,"style",{get:function(){return i},set:function(t){i=t}}),Object.defineProperty(this,"parentNode",{})};e.prototype.getContext=function(t,e){var r;if("2d"!==(t=t||"2d"))return null;for(r in e)this.pdf.context2d.hasOwnProperty(r)&&(this.pdf.context2d[r]=e[r]);return this.pdf.context2d._canvas=this,this.pdf.context2d},e.prototype.toDataURL=function(){throw new Error("toDataURL is not implemented.")},t.events.push(["initialized",function(){this.canvas=new e,this.canvas.pdf=this}])}(E.API),function(e){var r={left:0,top:0,bottom:0,right:0},n=!1,i=function(){void 0===this.internal.__cell__&&(this.internal.__cell__={},this.internal.__cell__.padding=3,this.internal.__cell__.headerFunction=void 0,this.internal.__cell__.margins=Object.assign({},r),this.internal.__cell__.margins.width=this.getPageWidth(),a.call(this))},a=function(){this.internal.__cell__.lastCell=new o,this.internal.__cell__.pages=1},o=function(){var t=arguments[0];Object.defineProperty(this,"x",{enumerable:!0,get:function(){return t},set:function(e){t=e}});var e=arguments[1];Object.defineProperty(this,"y",{enumerable:!0,get:function(){return e},set:function(t){e=t}});var r=arguments[2];Object.defineProperty(this,"width",{enumerable:!0,get:function(){return r},set:function(t){r=t}});var n=arguments[3];Object.defineProperty(this,"height",{enumerable:!0,get:function(){return n},set:function(t){n=t}});var i=arguments[4];Object.defineProperty(this,"text",{enumerable:!0,get:function(){return i},set:function(t){i=t}});var a=arguments[5];Object.defineProperty(this,"lineNumber",{enumerable:!0,get:function(){return a},set:function(t){a=t}});var o=arguments[6];return Object.defineProperty(this,"align",{enumerable:!0,get:function(){return o},set:function(t){o=t}}),this};o.prototype.clone=function(){return new o(this.x,this.y,this.width,this.height,this.text,this.lineNumber,this.align)},o.prototype.toArray=function(){return[this.x,this.y,this.width,this.height,this.text,this.lineNumber,this.align]},e.setHeaderFunction=function(t){return i.call(this),this.internal.__cell__.headerFunction="function"==typeof t?t:void 0,this},e.getTextDimensions=function(t,e){i.call(this);var r=(e=e||{}).fontSize||this.getFontSize(),n=e.font||this.getFont(),a=e.scaleFactor||this.internal.scaleFactor,o=0,s=0,c=0,u=this;if(!Array.isArray(t)&&"string"!=typeof t){if("number"!=typeof t)throw new Error("getTextDimensions expects text-parameter to be of type String or type Number or an Array of Strings.");t=String(t)}var h=e.maxWidth;h>0?"string"==typeof t?t=this.splitTextToSize(t,h):"[object Array]"===Object.prototype.toString.call(t)&&(t=t.reduce((function(t,e){return t.concat(u.splitTextToSize(e,h))}),[])):t=Array.isArray(t)?t:[t];for(var l=0;l<t.length;l++)o<(c=this.getStringUnitWidth(t[l],{font:n})*r)&&(o=c);return 0!==o&&(s=t.length),{w:o/=a,h:Math.max((s*r*this.getLineHeightFactor()-r*(this.getLineHeightFactor()-1))/a,0)}},e.cellAddPage=function(){i.call(this),this.addPage();var t=this.internal.__cell__.margins||r;return this.internal.__cell__.lastCell=new o(t.left,t.top,void 0,void 0),this.internal.__cell__.pages+=1,this};var s=e.cell=function(){var t;t=arguments[0]instanceof o?arguments[0]:new o(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]),i.call(this);var e=this.internal.__cell__.lastCell,a=this.internal.__cell__.padding,s=this.internal.__cell__.margins||r,c=this.internal.__cell__.tableHeaderRow,u=this.internal.__cell__.printHeaders;return void 0!==e.lineNumber&&(e.lineNumber===t.lineNumber?(t.x=(e.x||0)+(e.width||0),t.y=e.y||0):e.y+e.height+t.height+s.bottom>this.getPageHeight()?(this.cellAddPage(),t.y=s.top,u&&c&&(this.printHeaderRow(t.lineNumber,!0),t.y+=c[0].height)):t.y=e.y+e.height||t.y),void 0!==t.text[0]&&(this.rect(t.x,t.y,t.width,t.height,!0===n?"FD":void 0),"right"===t.align?this.text(t.text,t.x+t.width-a,t.y+a,{align:"right",baseline:"top"}):"center"===t.align?this.text(t.text,t.x+t.width/2,t.y+a,{align:"center",baseline:"top",maxWidth:t.width-a-a}):this.text(t.text,t.x+a,t.y+a,{align:"left",baseline:"top",maxWidth:t.width-a-a})),this.internal.__cell__.lastCell=t,this};e.table=function(e,n,u,h,l){if(i.call(this),!u)throw new Error("No data for PDF table.");var f,d,p,g,m=[],v=[],b=[],y={},w={},N=[],L=[],A=(l=l||{}).autoSize||!1,x=!1!==l.printHeaders,S=l.css&&void 0!==l.css["font-size"]?16*l.css["font-size"]:l.fontSize||12,_=l.margins||Object.assign({width:this.getPageWidth()},r),P="number"==typeof l.padding?l.padding:3,k=l.headerBackgroundColor||"#c8c8c8",I=l.headerTextColor||"#000";if(a.call(this),this.internal.__cell__.printHeaders=x,this.internal.__cell__.margins=_,this.internal.__cell__.table_font_size=S,this.internal.__cell__.padding=P,this.internal.__cell__.headerBackgroundColor=k,this.internal.__cell__.headerTextColor=I,this.setFontSize(S),null==h)v=m=Object.keys(u[0]),b=m.map((function(){return"left"}));else if(Array.isArray(h)&&"object"===(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(h[0]))for(m=h.map((function(t){return t.name})),v=h.map((function(t){return t.prompt||t.name||""})),b=h.map((function(t){return t.align||"left"})),f=0;f<h.length;f+=1)w[h[f].name]=h[f].width*(19.049976/25.4);else Array.isArray(h)&&"string"==typeof h[0]&&(v=m=h,b=m.map((function(){return"left"})));if(A||Array.isArray(h)&&"string"==typeof h[0])for(f=0;f<m.length;f+=1){for(y[g=m[f]]=u.map((function(t){return t[g]})),this.setFont(void 0,"bold"),N.push(this.getTextDimensions(v[f],{fontSize:this.internal.__cell__.table_font_size,scaleFactor:this.internal.scaleFactor}).w),d=y[g],this.setFont(void 0,"normal"),p=0;p<d.length;p+=1)N.push(this.getTextDimensions(d[p],{fontSize:this.internal.__cell__.table_font_size,scaleFactor:this.internal.scaleFactor}).w);w[g]=Math.max.apply(null,N)+P+P,N=[]}if(x){var F={};for(f=0;f<m.length;f+=1)F[m[f]]={},F[m[f]].text=v[f],F[m[f]].align=b[f];var C=c.call(this,F,w);L=m.map((function(t){return new o(e,n,w[t],C,F[t].text,void 0,F[t].align)})),this.setTableHeaderRow(L),this.printHeaderRow(1,!1)}var j=h.reduce((function(t,e){return t[e.name]=e.align,t}),{});for(f=0;f<u.length;f+=1){"rowStart"in l&&l.rowStart instanceof Function&&l.rowStart({row:f,data:u[f]},this);var O=c.call(this,u[f],w);for(p=0;p<m.length;p+=1){var B=u[f][m[p]];"cellStart"in l&&l.cellStart instanceof Function&&l.cellStart({row:f,col:p,data:B},this),s.call(this,new o(e,n,w[m[p]],O,B,f+2,j[m[p]]))}}return this.internal.__cell__.table_x=e,this.internal.__cell__.table_y=n,this};var c=function(t,e){var r=this.internal.__cell__.padding,n=this.internal.__cell__.table_font_size,i=this.internal.scaleFactor;return Object.keys(t).map((function(n){var i=t[n];return this.splitTextToSize(i.hasOwnProperty("text")?i.text:i,e[n]-r-r)}),this).map((function(t){return this.getLineHeightFactor()*t.length*n/i+r+r}),this).reduce((function(t,e){return Math.max(t,e)}),0)};e.setTableHeaderRow=function(t){i.call(this),this.internal.__cell__.tableHeaderRow=t},e.printHeaderRow=function(t,e){if(i.call(this),!this.internal.__cell__.tableHeaderRow)throw new Error("Property tableHeaderRow does not exist.");var r;if(n=!0,"function"==typeof this.internal.__cell__.headerFunction){var a=this.internal.__cell__.headerFunction(this,this.internal.__cell__.pages);this.internal.__cell__.lastCell=new o(a[0],a[1],a[2],a[3],void 0,-1)}this.setFont(void 0,"bold");for(var c=[],u=0;u<this.internal.__cell__.tableHeaderRow.length;u+=1){r=this.internal.__cell__.tableHeaderRow[u].clone(),e&&(r.y=this.internal.__cell__.margins.top||0,c.push(r)),r.lineNumber=t;var h=this.getTextColor();this.setTextColor(this.internal.__cell__.headerTextColor),this.setFillColor(this.internal.__cell__.headerBackgroundColor),s.call(this,r),this.setTextColor(h)}c.length>0&&this.setTableHeaderRow(c),this.setFont(void 0,"normal"),n=!1}}(E.API);var Pt={italic:["italic","oblique","normal"],oblique:["oblique","italic","normal"],normal:["normal","oblique","italic"]},kt=["ultra-condensed","extra-condensed","condensed","semi-condensed","normal","semi-expanded","expanded","extra-expanded","ultra-expanded"],It=_t(kt),Ft=[100,200,300,400,500,600,700,800,900],Ct=_t(Ft);function jt(t){var e=t.family.replace(/"|'/g,"").toLowerCase(),r=function(t){return Pt[t=t||"normal"]?t:"normal"}(t.style),n=function(t){if(!t)return 400;if("number"==typeof t)return t>=100&&t<=900&&t%100==0?t:400;if(/^\d00$/.test(t))return parseInt(t);switch(t){case"bold":return 700;case"normal":default:return 400}}(t.weight),i=function(t){return"number"==typeof It[t=t||"normal"]?t:"normal"}(t.stretch);return{family:e,style:r,weight:n,stretch:i,src:t.src||[],ref:t.ref||{name:e,style:[i,r,n].join(" ")}}}function Ot(t,e,r,n){var i;for(i=r;i>=0&&i<e.length;i+=n)if(t[e[i]])return t[e[i]];for(i=r;i>=0&&i<e.length;i-=n)if(t[e[i]])return t[e[i]]}var Bt={"sans-serif":"helvetica",fixed:"courier",monospace:"courier",terminal:"courier",cursive:"times",fantasy:"times",serif:"times"},Mt={caption:"times",icon:"times",menu:"times","message-box":"times","small-caption":"times","status-bar":"times"};function Et(t){return[t.stretch,t.style,t.weight,t.family].join(" ")}function qt(t,e,r){for(var n=(r=r||{}).defaultFontFamily||"times",i=Object.assign({},Bt,r.genericFontFamilies||{}),a=null,o=null,s=0;s<e.length;++s)if(i[(a=jt(e[s])).family]&&(a.family=i[a.family]),t.hasOwnProperty(a.family)){o=t[a.family];break}if(!(o=o||t[n]))throw new Error("Could not find a font-family for the rule '"+Et(a)+"' and default family '"+n+"'.");if(o=function(t,e){if(e[t])return e[t];var r=It[t],n=r<=It.normal?-1:1,i=Ot(e,kt,r,n);if(!i)throw new Error("Could not find a matching font-stretch value for "+t);return i}(a.stretch,o),o=function(t,e){if(e[t])return e[t];for(var r=Pt[t],n=0;n<r.length;++n)if(e[r[n]])return e[r[n]];throw new Error("Could not find a matching font-style for "+t)}(a.style,o),!(o=function(t,e){if(e[t])return e[t];if(400===t&&e[500])return e[500];if(500===t&&e[400])return e[400];var r=Ct[t],n=Ot(e,Ft,r,t<400?-1:1);if(!n)throw new Error("Could not find a matching font-weight for value "+t);return n}(a.weight,o)))throw new Error("Failed to resolve a font for the rule '"+Et(a)+"'.");return o}function Dt(t){return t.trimLeft()}function Rt(t,e){for(var r=0;r<t.length;){if(t.charAt(r)===e)return[t.substring(0,r),t.substring(r+1)];r+=1}return null}function Tt(t){var e=t.match(/^(-[a-z_]|[a-z_])[a-z0-9_-]*/i);return null===e?null:[e[0],t.substring(e[0].length)]}var Ut,zt,Ht,Wt=["times"];!function(e){var r,n,i,o,s,c,u,h,l,d=function(t){return t=t||{},this.isStrokeTransparent=t.isStrokeTransparent||!1,this.strokeOpacity=t.strokeOpacity||1,this.strokeStyle=t.strokeStyle||"#000000",this.fillStyle=t.fillStyle||"#000000",this.isFillTransparent=t.isFillTransparent||!1,this.fillOpacity=t.fillOpacity||1,this.font=t.font||"10px sans-serif",this.textBaseline=t.textBaseline||"alphabetic",this.textAlign=t.textAlign||"left",this.lineWidth=t.lineWidth||1,this.lineJoin=t.lineJoin||"miter",this.lineCap=t.lineCap||"butt",this.path=t.path||[],this.transform=void 0!==t.transform?t.transform.clone():new h,this.globalCompositeOperation=t.globalCompositeOperation||"normal",this.globalAlpha=t.globalAlpha||1,this.clip_path=t.clip_path||[],this.currentPoint=t.currentPoint||new c,this.miterLimit=t.miterLimit||10,this.lastPoint=t.lastPoint||new c,this.lineDashOffset=t.lineDashOffset||0,this.lineDash=t.lineDash||[],this.margin=t.margin||[0,0,0,0],this.prevPageLastElemOffset=t.prevPageLastElemOffset||0,this.ignoreClearRect="boolean"!=typeof t.ignoreClearRect||t.ignoreClearRect,this};e.events.push(["initialized",function(){this.context2d=new p(this),r=this.internal.f2,n=this.internal.getCoordinateString,i=this.internal.getVerticalCoordinateString,o=this.internal.getHorizontalCoordinate,s=this.internal.getVerticalCoordinate,c=this.internal.Point,u=this.internal.Rectangle,h=this.internal.Matrix,l=new d}]);var p=function(t){Object.defineProperty(this,"canvas",{get:function(){return{parentNode:!1,style:!1}}});var e=t;Object.defineProperty(this,"pdf",{get:function(){return e}});var r=!1;Object.defineProperty(this,"pageWrapXEnabled",{get:function(){return r},set:function(t){r=Boolean(t)}});var n=!1;Object.defineProperty(this,"pageWrapYEnabled",{get:function(){return n},set:function(t){n=Boolean(t)}});var i=0;Object.defineProperty(this,"posX",{get:function(){return i},set:function(t){isNaN(t)||(i=t)}});var a=0;Object.defineProperty(this,"posY",{get:function(){return a},set:function(t){isNaN(t)||(a=t)}}),Object.defineProperty(this,"margin",{get:function(){return l.margin},set:function(t){var e;"number"==typeof t?e=[t,t,t,t]:((e=new Array(4))[0]=t[0],e[1]=t.length>=2?t[1]:e[0],e[2]=t.length>=3?t[2]:e[0],e[3]=t.length>=4?t[3]:e[1]),l.margin=e}});var o=!1;Object.defineProperty(this,"autoPaging",{get:function(){return o},set:function(t){o=t}});var s=0;Object.defineProperty(this,"lastBreak",{get:function(){return s},set:function(t){s=t}});var c=[];Object.defineProperty(this,"pageBreaks",{get:function(){return c},set:function(t){c=t}}),Object.defineProperty(this,"ctx",{get:function(){return l},set:function(t){t instanceof d&&(l=t)}}),Object.defineProperty(this,"path",{get:function(){return l.path},set:function(t){l.path=t}});var u=[];Object.defineProperty(this,"ctxStack",{get:function(){return u},set:function(t){u=t}}),Object.defineProperty(this,"fillStyle",{get:function(){return this.ctx.fillStyle},set:function(t){var e;e=g(t),this.ctx.fillStyle=e.style,this.ctx.isFillTransparent=0===e.a,this.ctx.fillOpacity=e.a,this.pdf.setFillColor(e.r,e.g,e.b,{a:e.a}),this.pdf.setTextColor(e.r,e.g,e.b,{a:e.a})}}),Object.defineProperty(this,"strokeStyle",{get:function(){return this.ctx.strokeStyle},set:function(t){var e=g(t);this.ctx.strokeStyle=e.style,this.ctx.isStrokeTransparent=0===e.a,this.ctx.strokeOpacity=e.a,0===e.a?this.pdf.setDrawColor(255,255,255):(e.a,this.pdf.setDrawColor(e.r,e.g,e.b))}}),Object.defineProperty(this,"lineCap",{get:function(){return this.ctx.lineCap},set:function(t){-1!==["butt","round","square"].indexOf(t)&&(this.ctx.lineCap=t,this.pdf.setLineCap(t))}}),Object.defineProperty(this,"lineWidth",{get:function(){return this.ctx.lineWidth},set:function(t){isNaN(t)||(this.ctx.lineWidth=t,this.pdf.setLineWidth(t))}}),Object.defineProperty(this,"lineJoin",{get:function(){return this.ctx.lineJoin},set:function(t){-1!==["bevel","round","miter"].indexOf(t)&&(this.ctx.lineJoin=t,this.pdf.setLineJoin(t))}}),Object.defineProperty(this,"miterLimit",{get:function(){return this.ctx.miterLimit},set:function(t){isNaN(t)||(this.ctx.miterLimit=t,this.pdf.setMiterLimit(t))}}),Object.defineProperty(this,"textBaseline",{get:function(){return this.ctx.textBaseline},set:function(t){this.ctx.textBaseline=t}}),Object.defineProperty(this,"textAlign",{get:function(){return this.ctx.textAlign},set:function(t){-1!==["right","end","center","left","start"].indexOf(t)&&(this.ctx.textAlign=t)}});var h=null;function f(t,e){if(null===h){var r=function(t){var e=[];return Object.keys(t).forEach((function(r){t[r].forEach((function(t){var n=null;switch(t){case"bold":n={family:r,weight:"bold"};break;case"italic":n={family:r,style:"italic"};break;case"bolditalic":n={family:r,weight:"bold",style:"italic"};break;case"":case"normal":n={family:r}}null!==n&&(n.ref={name:r,style:t},e.push(n))}))})),e}(t.getFontList());h=function(t){for(var e={},r=0;r<t.length;++r){var n=jt(t[r]),i=n.family,a=n.stretch,o=n.style,s=n.weight;e[i]=e[i]||{},e[i][a]=e[i][a]||{},e[i][a][o]=e[i][a][o]||{},e[i][a][o][s]=n}return e}(r.concat(e))}return h}var p=null;Object.defineProperty(this,"fontFaces",{get:function(){return p},set:function(t){h=null,p=t}}),Object.defineProperty(this,"font",{get:function(){return this.ctx.font},set:function(t){var e;if(this.ctx.font=t,null!==(e=/^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-_,\"\'\sa-z]+?)\s*$/i.exec(t))){var r=e[1],n=(e[2],e[3]),i=e[4],a=(e[5],e[6]),o=/^([.\d]+)((?:%|in|[cem]m|ex|p[ctx]))$/i.exec(i)[2];i="px"===o?Math.floor(parseFloat(i)*this.pdf.internal.scaleFactor):"em"===o?Math.floor(parseFloat(i)*this.pdf.getFontSize()):Math.floor(parseFloat(i)*this.pdf.internal.scaleFactor),this.pdf.setFontSize(i);var s=function(t){var e,r,n=[],i=t.trim();if(""===i)return Wt;if(i in Mt)return[Mt[i]];for(;""!==i;){switch(r=null,e=(i=Dt(i)).charAt(0)){case'"':case"'":r=Rt(i.substring(1),e);break;default:r=Tt(i)}if(null===r)return Wt;if(n.push(r[0]),""!==(i=Dt(r[1]))&&","!==i.charAt(0))return Wt;i=i.replace(/^,/,"")}return n}(a);if(this.fontFaces){var c=qt(f(this.pdf,this.fontFaces),s.map((function(t){return{family:t,stretch:"normal",weight:n,style:r}})));this.pdf.setFont(c.ref.name,c.ref.style)}else{var u="";("bold"===n||parseInt(n,10)>=700||"bold"===r)&&(u="bold"),"italic"===r&&(u+="italic"),0===u.length&&(u="normal");for(var h="",l={arial:"Helvetica",Arial:"Helvetica",verdana:"Helvetica",Verdana:"Helvetica",helvetica:"Helvetica",Helvetica:"Helvetica","sans-serif":"Helvetica",fixed:"Courier",monospace:"Courier",terminal:"Courier",cursive:"Times",fantasy:"Times",serif:"Times"},d=0;d<s.length;d++){if(void 0!==this.pdf.internal.getFont(s[d],u,{noFallback:!0,disableWarning:!0})){h=s[d];break}if("bolditalic"===u&&void 0!==this.pdf.internal.getFont(s[d],"bold",{noFallback:!0,disableWarning:!0}))h=s[d],u="bold";else if(void 0!==this.pdf.internal.getFont(s[d],"normal",{noFallback:!0,disableWarning:!0})){h=s[d],u="normal";break}}if(""===h)for(var p=0;p<s.length;p++)if(l[s[p]]){h=l[s[p]];break}h=""===h?"Times":h,this.pdf.setFont(h,u)}}}}),Object.defineProperty(this,"globalCompositeOperation",{get:function(){return this.ctx.globalCompositeOperation},set:function(t){this.ctx.globalCompositeOperation=t}}),Object.defineProperty(this,"globalAlpha",{get:function(){return this.ctx.globalAlpha},set:function(t){this.ctx.globalAlpha=t}}),Object.defineProperty(this,"lineDashOffset",{get:function(){return this.ctx.lineDashOffset},set:function(t){this.ctx.lineDashOffset=t,T.call(this)}}),Object.defineProperty(this,"lineDash",{get:function(){return this.ctx.lineDash},set:function(t){this.ctx.lineDash=t,T.call(this)}}),Object.defineProperty(this,"ignoreClearRect",{get:function(){return this.ctx.ignoreClearRect},set:function(t){this.ctx.ignoreClearRect=Boolean(t)}})};p.prototype.setLineDash=function(t){this.lineDash=t},p.prototype.getLineDash=function(){return this.lineDash.length%2?this.lineDash.concat(this.lineDash):this.lineDash.slice()},p.prototype.fill=function(){A.call(this,"fill",!1)},p.prototype.stroke=function(){A.call(this,"stroke",!1)},p.prototype.beginPath=function(){this.path=[{type:"begin"}]},p.prototype.moveTo=function(t,e){if(isNaN(t)||isNaN(e))throw a.error("jsPDF.context2d.moveTo: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.moveTo");var r=this.ctx.transform.applyToPoint(new c(t,e));this.path.push({type:"mt",x:r.x,y:r.y}),this.ctx.lastPoint=new c(t,e)},p.prototype.closePath=function(){var e=new c(0,0),r=0;for(r=this.path.length-1;-1!==r;r--)if("begin"===this.path[r].type&&"object"===(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(this.path[r+1])&&"number"==typeof this.path[r+1].x){e=new c(this.path[r+1].x,this.path[r+1].y);break}this.path.push({type:"close"}),this.ctx.lastPoint=new c(e.x,e.y)},p.prototype.lineTo=function(t,e){if(isNaN(t)||isNaN(e))throw a.error("jsPDF.context2d.lineTo: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.lineTo");var r=this.ctx.transform.applyToPoint(new c(t,e));this.path.push({type:"lt",x:r.x,y:r.y}),this.ctx.lastPoint=new c(r.x,r.y)},p.prototype.clip=function(){this.ctx.clip_path=JSON.parse(JSON.stringify(this.path)),A.call(this,null,!0)},p.prototype.quadraticCurveTo=function(t,e,r,n){if(isNaN(r)||isNaN(n)||isNaN(t)||isNaN(e))throw a.error("jsPDF.context2d.quadraticCurveTo: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.quadraticCurveTo");var i=this.ctx.transform.applyToPoint(new c(r,n)),o=this.ctx.transform.applyToPoint(new c(t,e));this.path.push({type:"qct",x1:o.x,y1:o.y,x:i.x,y:i.y}),this.ctx.lastPoint=new c(i.x,i.y)},p.prototype.bezierCurveTo=function(t,e,r,n,i,o){if(isNaN(i)||isNaN(o)||isNaN(t)||isNaN(e)||isNaN(r)||isNaN(n))throw a.error("jsPDF.context2d.bezierCurveTo: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.bezierCurveTo");var s=this.ctx.transform.applyToPoint(new c(i,o)),u=this.ctx.transform.applyToPoint(new c(t,e)),h=this.ctx.transform.applyToPoint(new c(r,n));this.path.push({type:"bct",x1:u.x,y1:u.y,x2:h.x,y2:h.y,x:s.x,y:s.y}),this.ctx.lastPoint=new c(s.x,s.y)},p.prototype.arc=function(t,e,r,n,i,o){if(isNaN(t)||isNaN(e)||isNaN(r)||isNaN(n)||isNaN(i))throw a.error("jsPDF.context2d.arc: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.arc");if(o=Boolean(o),!this.ctx.transform.isIdentity){var s=this.ctx.transform.applyToPoint(new c(t,e));t=s.x,e=s.y;var u=this.ctx.transform.applyToPoint(new c(0,r)),h=this.ctx.transform.applyToPoint(new c(0,0));r=Math.sqrt(Math.pow(u.x-h.x,2)+Math.pow(u.y-h.y,2))}Math.abs(i-n)>=2*Math.PI&&(n=0,i=2*Math.PI),this.path.push({type:"arc",x:t,y:e,radius:r,startAngle:n,endAngle:i,counterclockwise:o})},p.prototype.arcTo=function(t,e,r,n,i){throw new Error("arcTo not implemented.")},p.prototype.rect=function(t,e,r,n){if(isNaN(t)||isNaN(e)||isNaN(r)||isNaN(n))throw a.error("jsPDF.context2d.rect: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.rect");this.moveTo(t,e),this.lineTo(t+r,e),this.lineTo(t+r,e+n),this.lineTo(t,e+n),this.lineTo(t,e),this.lineTo(t+r,e),this.lineTo(t,e)},p.prototype.fillRect=function(t,e,r,n){if(isNaN(t)||isNaN(e)||isNaN(r)||isNaN(n))throw a.error("jsPDF.context2d.fillRect: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.fillRect");if(!m.call(this)){var i={};"butt"!==this.lineCap&&(i.lineCap=this.lineCap,this.lineCap="butt"),"miter"!==this.lineJoin&&(i.lineJoin=this.lineJoin,this.lineJoin="miter"),this.beginPath(),this.rect(t,e,r,n),this.fill(),i.hasOwnProperty("lineCap")&&(this.lineCap=i.lineCap),i.hasOwnProperty("lineJoin")&&(this.lineJoin=i.lineJoin)}},p.prototype.strokeRect=function(t,e,r,n){if(isNaN(t)||isNaN(e)||isNaN(r)||isNaN(n))throw a.error("jsPDF.context2d.strokeRect: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.strokeRect");v.call(this)||(this.beginPath(),this.rect(t,e,r,n),this.stroke())},p.prototype.clearRect=function(t,e,r,n){if(isNaN(t)||isNaN(e)||isNaN(r)||isNaN(n))throw a.error("jsPDF.context2d.clearRect: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.clearRect");this.ignoreClearRect||(this.fillStyle="#ffffff",this.fillRect(t,e,r,n))},p.prototype.save=function(t){t="boolean"!=typeof t||t;for(var e=this.pdf.internal.getCurrentPageInfo().pageNumber,r=0;r<this.pdf.internal.getNumberOfPages();r++)this.pdf.setPage(r+1),this.pdf.internal.out("q");if(this.pdf.setPage(e),t){this.ctx.fontSize=this.pdf.internal.getFontSize();var n=new d(this.ctx);this.ctxStack.push(this.ctx),this.ctx=n}},p.prototype.restore=function(t){t="boolean"!=typeof t||t;for(var e=this.pdf.internal.getCurrentPageInfo().pageNumber,r=0;r<this.pdf.internal.getNumberOfPages();r++)this.pdf.setPage(r+1),this.pdf.internal.out("Q");this.pdf.setPage(e),t&&0!==this.ctxStack.length&&(this.ctx=this.ctxStack.pop(),this.fillStyle=this.ctx.fillStyle,this.strokeStyle=this.ctx.strokeStyle,this.font=this.ctx.font,this.lineCap=this.ctx.lineCap,this.lineWidth=this.ctx.lineWidth,this.lineJoin=this.ctx.lineJoin,this.lineDash=this.ctx.lineDash,this.lineDashOffset=this.ctx.lineDashOffset)},p.prototype.toDataURL=function(){throw new Error("toDataUrl not implemented.")};var g=function(t){var e,r,n,i;if(!0===t.isCanvasGradient&&(t=t.getColor()),!t)return{r:0,g:0,b:0,a:0,style:t};if(/transparent|rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*0+\s*\)/.test(t))e=0,r=0,n=0,i=0;else{var a=/rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/.exec(t);if(null!==a)e=parseInt(a[1]),r=parseInt(a[2]),n=parseInt(a[3]),i=1;else if(null!==(a=/rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/.exec(t)))e=parseInt(a[1]),r=parseInt(a[2]),n=parseInt(a[3]),i=parseFloat(a[4]);else{if(i=1,"string"==typeof t&&"#"!==t.charAt(0)){var o=new f(t);t=o.ok?o.toHex():"#000000"}4===t.length?(e=t.substring(1,2),e+=e,r=t.substring(2,3),r+=r,n=t.substring(3,4),n+=n):(e=t.substring(1,3),r=t.substring(3,5),n=t.substring(5,7)),e=parseInt(e,16),r=parseInt(r,16),n=parseInt(n,16)}}return{r:e,g:r,b:n,a:i,style:t}},m=function(){return this.ctx.isFillTransparent||0==this.globalAlpha},v=function(){return Boolean(this.ctx.isStrokeTransparent||0==this.globalAlpha)};p.prototype.fillText=function(t,e,r,n){if(isNaN(e)||isNaN(r)||"string"!=typeof t)throw a.error("jsPDF.context2d.fillText: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.fillText");if(n=isNaN(n)?void 0:n,!m.call(this)){var i=q(this.ctx.transform.rotation),o=this.ctx.transform.scaleX;C.call(this,{text:t,x:e,y:r,scale:o,angle:i,align:this.textAlign,maxWidth:n})}},p.prototype.strokeText=function(t,e,r,n){if(isNaN(e)||isNaN(r)||"string"!=typeof t)throw a.error("jsPDF.context2d.strokeText: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.strokeText");if(!v.call(this)){n=isNaN(n)?void 0:n;var i=q(this.ctx.transform.rotation),o=this.ctx.transform.scaleX;C.call(this,{text:t,x:e,y:r,scale:o,renderingMode:"stroke",angle:i,align:this.textAlign,maxWidth:n})}},p.prototype.measureText=function(t){if("string"!=typeof t)throw a.error("jsPDF.context2d.measureText: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.measureText");var e=this.pdf,r=this.pdf.internal.scaleFactor,n=e.internal.getFontSize(),i=e.getStringUnitWidth(t)*n/e.internal.scaleFactor,o=function(t){var e=(t=t||{}).width||0;return Object.defineProperty(this,"width",{get:function(){return e}}),this};return new o({width:i*=Math.round(96*r/72*1e4)/1e4})},p.prototype.scale=function(t,e){if(isNaN(t)||isNaN(e))throw a.error("jsPDF.context2d.scale: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.scale");var r=new h(t,0,0,e,0,0);this.ctx.transform=this.ctx.transform.multiply(r)},p.prototype.rotate=function(t){if(isNaN(t))throw a.error("jsPDF.context2d.rotate: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.rotate");var e=new h(Math.cos(t),Math.sin(t),-Math.sin(t),Math.cos(t),0,0);this.ctx.transform=this.ctx.transform.multiply(e)},p.prototype.translate=function(t,e){if(isNaN(t)||isNaN(e))throw a.error("jsPDF.context2d.translate: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.translate");var r=new h(1,0,0,1,t,e);this.ctx.transform=this.ctx.transform.multiply(r)},p.prototype.transform=function(t,e,r,n,i,o){if(isNaN(t)||isNaN(e)||isNaN(r)||isNaN(n)||isNaN(i)||isNaN(o))throw a.error("jsPDF.context2d.transform: Invalid arguments",arguments),new Error("Invalid arguments passed to jsPDF.context2d.transform");var s=new h(t,e,r,n,i,o);this.ctx.transform=this.ctx.transform.multiply(s)},p.prototype.setTransform=function(t,e,r,n,i,a){t=isNaN(t)?1:t,e=isNaN(e)?0:e,r=isNaN(r)?0:r,n=isNaN(n)?1:n,i=isNaN(i)?0:i,a=isNaN(a)?0:a,this.ctx.transform=new h(t,e,r,n,i,a)};var b=function(){return this.margin[0]>0||this.margin[1]>0||this.margin[2]>0||this.margin[3]>0};p.prototype.drawImage=function(t,e,r,n,i,a,o,s,c){var l=this.pdf.getImageProperties(t),f=1,d=1,p=1,g=1;void 0!==n&&void 0!==s&&(p=s/n,g=c/i,f=l.width/n*s/n,d=l.height/i*c/i),void 0===a&&(a=e,o=r,e=0,r=0),void 0!==n&&void 0===s&&(s=n,c=i),void 0===n&&void 0===s&&(s=l.width,c=l.height);for(var m,v=this.ctx.transform.decompose(),w=q(v.rotate.shx),A=new h,S=(A=(A=(A=A.multiply(v.translate)).multiply(v.skew)).multiply(v.scale)).applyToRectangle(new u(a-e*p,o-r*g,n*f,i*d)),_=y.call(this,S),P=[],k=0;k<_.length;k+=1)-1===P.indexOf(_[k])&&P.push(_[k]);if(L(P),this.autoPaging)for(var I=P[0],F=P[P.length-1],C=I;C<F+1;C++){this.pdf.setPage(C);var j=this.pdf.internal.pageSize.width-this.margin[3]-this.margin[1],O=1===C?this.posY+this.margin[0]:this.margin[0],B=this.pdf.internal.pageSize.height-this.posY-this.margin[0]-this.margin[2],M=this.pdf.internal.pageSize.height-this.margin[0]-this.margin[2],E=1===C?0:B+(C-2)*M;if(0!==this.ctx.clip_path.length){var D=this.path;m=JSON.parse(JSON.stringify(this.ctx.clip_path)),this.path=N(m,this.posX+this.margin[3],-E+O+this.ctx.prevPageLastElemOffset),x.call(this,"fill",!0),this.path=D}var R=JSON.parse(JSON.stringify(S));R=N([R],this.posX+this.margin[3],-E+O+this.ctx.prevPageLastElemOffset)[0];var T=(C>I||C<F)&&b.call(this);T&&(this.pdf.saveGraphicsState(),this.pdf.rect(this.margin[3],this.margin[0],j,M,null).clip().discardPath()),this.pdf.addImage(t,"JPEG",R.x,R.y,R.w,R.h,null,null,w),T&&this.pdf.restoreGraphicsState()}else this.pdf.addImage(t,"JPEG",S.x,S.y,S.w,S.h,null,null,w)};var y=function(t,e,r){var n=[];e=e||this.pdf.internal.pageSize.width,r=r||this.pdf.internal.pageSize.height-this.margin[0]-this.margin[2];var i=this.posY+this.ctx.prevPageLastElemOffset;switch(t.type){default:case"mt":case"lt":n.push(Math.floor((t.y+i)/r)+1);break;case"arc":n.push(Math.floor((t.y+i-t.radius)/r)+1),n.push(Math.floor((t.y+i+t.radius)/r)+1);break;case"qct":var a=D(this.ctx.lastPoint.x,this.ctx.lastPoint.y,t.x1,t.y1,t.x,t.y);n.push(Math.floor((a.y+i)/r)+1),n.push(Math.floor((a.y+a.h+i)/r)+1);break;case"bct":var o=R(this.ctx.lastPoint.x,this.ctx.lastPoint.y,t.x1,t.y1,t.x2,t.y2,t.x,t.y);n.push(Math.floor((o.y+i)/r)+1),n.push(Math.floor((o.y+o.h+i)/r)+1);break;case"rect":n.push(Math.floor((t.y+i)/r)+1),n.push(Math.floor((t.y+t.h+i)/r)+1)}for(var s=0;s<n.length;s+=1)for(;this.pdf.internal.getNumberOfPages()<n[s];)w.call(this);return n},w=function(){var t=this.fillStyle,e=this.strokeStyle,r=this.font,n=this.lineCap,i=this.lineWidth,a=this.lineJoin;this.pdf.addPage(),this.fillStyle=t,this.strokeStyle=e,this.font=r,this.lineCap=n,this.lineWidth=i,this.lineJoin=a},N=function(t,e,r){for(var n=0;n<t.length;n++)switch(t[n].type){case"bct":t[n].x2+=e,t[n].y2+=r;case"qct":t[n].x1+=e,t[n].y1+=r;case"mt":case"lt":case"arc":default:t[n].x+=e,t[n].y+=r}return t},L=function(t){return t.sort((function(t,e){return t-e}))},A=function(t,e){for(var r,n,i=this.fillStyle,a=this.strokeStyle,o=this.lineCap,s=this.lineWidth,c=Math.abs(s*this.ctx.transform.scaleX),u=this.lineJoin,h=JSON.parse(JSON.stringify(this.path)),l=JSON.parse(JSON.stringify(this.path)),f=[],d=0;d<l.length;d++)if(void 0!==l[d].x)for(var p=y.call(this,l[d]),g=0;g<p.length;g+=1)-1===f.indexOf(p[g])&&f.push(p[g]);for(var m=0;m<f.length;m++)for(;this.pdf.internal.getNumberOfPages()<f[m];)w.call(this);if(L(f),this.autoPaging)for(var v=f[0],A=f[f.length-1],S=v;S<A+1;S++){this.pdf.setPage(S),this.fillStyle=i,this.strokeStyle=a,this.lineCap=o,this.lineWidth=c,this.lineJoin=u;var _=this.pdf.internal.pageSize.width-this.margin[3]-this.margin[1],P=1===S?this.posY+this.margin[0]:this.margin[0],k=this.pdf.internal.pageSize.height-this.posY-this.margin[0]-this.margin[2],I=this.pdf.internal.pageSize.height-this.margin[0]-this.margin[2],F=1===S?0:k+(S-2)*I;if(0!==this.ctx.clip_path.length){var C=this.path;r=JSON.parse(JSON.stringify(this.ctx.clip_path)),this.path=N(r,this.posX+this.margin[3],-F+P+this.ctx.prevPageLastElemOffset),x.call(this,t,!0),this.path=C}if(n=JSON.parse(JSON.stringify(h)),this.path=N(n,this.posX+this.margin[3],-F+P+this.ctx.prevPageLastElemOffset),!1===e||0===S){var j=(S>v||S<A)&&b.call(this);j&&(this.pdf.saveGraphicsState(),this.pdf.rect(this.margin[3],this.margin[0],_,I,null).clip().discardPath()),x.call(this,t,e),j&&this.pdf.restoreGraphicsState()}this.lineWidth=s}else this.lineWidth=c,x.call(this,t,e),this.lineWidth=s;this.path=h},x=function(t,e){if(("stroke"!==t||e||!v.call(this))&&("stroke"===t||e||!m.call(this))){for(var r,n,i=[],a=this.path,o=0;o<a.length;o++){var s=a[o];switch(s.type){case"begin":i.push({begin:!0});break;case"close":i.push({close:!0});break;case"mt":i.push({start:s,deltas:[],abs:[]});break;case"lt":var c=i.length;if(a[o-1]&&!isNaN(a[o-1].x)&&(r=[s.x-a[o-1].x,s.y-a[o-1].y],c>0))for(;c>=0;c--)if(!0!==i[c-1].close&&!0!==i[c-1].begin){i[c-1].deltas.push(r),i[c-1].abs.push(s);break}break;case"bct":r=[s.x1-a[o-1].x,s.y1-a[o-1].y,s.x2-a[o-1].x,s.y2-a[o-1].y,s.x-a[o-1].x,s.y-a[o-1].y],i[i.length-1].deltas.push(r);break;case"qct":var u=a[o-1].x+2/3*(s.x1-a[o-1].x),h=a[o-1].y+2/3*(s.y1-a[o-1].y),l=s.x+2/3*(s.x1-s.x),f=s.y+2/3*(s.y1-s.y),d=s.x,p=s.y;r=[u-a[o-1].x,h-a[o-1].y,l-a[o-1].x,f-a[o-1].y,d-a[o-1].x,p-a[o-1].y],i[i.length-1].deltas.push(r);break;case"arc":i.push({deltas:[],abs:[],arc:!0}),Array.isArray(i[i.length-1].abs)&&i[i.length-1].abs.push(s)}}n=e?null:"stroke"===t?"stroke":"fill";for(var g=!1,b=0;b<i.length;b++)if(i[b].arc)for(var y=i[b].abs,w=0;w<y.length;w++){var N=y[w];"arc"===N.type?P.call(this,N.x,N.y,N.radius,N.startAngle,N.endAngle,N.counterclockwise,void 0,e,!g):j.call(this,N.x,N.y),g=!0}else if(!0===i[b].close)this.pdf.internal.out("h"),g=!1;else if(!0!==i[b].begin){var L=i[b].start.x,A=i[b].start.y;O.call(this,i[b].deltas,L,A),g=!0}n&&k.call(this,n),e&&I.call(this)}},S=function(t){var e=this.pdf.internal.getFontSize()/this.pdf.internal.scaleFactor,r=e*(this.pdf.internal.getLineHeightFactor()-1);switch(this.ctx.textBaseline){case"bottom":return t-r;case"top":return t+e-r;case"hanging":return t+e-2*r;case"middle":return t+e/2-r;case"ideographic":return t;case"alphabetic":default:return t}},_=function(t){return t+this.pdf.internal.getFontSize()/this.pdf.internal.scaleFactor*(this.pdf.internal.getLineHeightFactor()-1)};p.prototype.createLinearGradient=function(){var t=function(){};return t.colorStops=[],t.addColorStop=function(t,e){this.colorStops.push([t,e])},t.getColor=function(){return 0===this.colorStops.length?"#000000":this.colorStops[0][1]},t.isCanvasGradient=!0,t},p.prototype.createPattern=function(){return this.createLinearGradient()},p.prototype.createRadialGradient=function(){return this.createLinearGradient()};var P=function(t,e,r,n,i,a,o,s,c){for(var u=M.call(this,r,n,i,a),h=0;h<u.length;h++){var l=u[h];0===h&&(c?F.call(this,l.x1+t,l.y1+e):j.call(this,l.x1+t,l.y1+e)),B.call(this,t,e,l.x2,l.y2,l.x3,l.y3,l.x4,l.y4)}s?I.call(this):k.call(this,o)},k=function(t){switch(t){case"stroke":this.pdf.internal.out("S");break;case"fill":this.pdf.internal.out("f")}},I=function(){this.pdf.clip(),this.pdf.discardPath()},F=function(t,e){this.pdf.internal.out(n(t)+" "+i(e)+" m")},C=function(t){var e;switch(t.align){case"right":case"end":e="right";break;case"center":e="center";break;case"left":case"start":default:e="left"}var r=this.pdf.getTextDimensions(t.text),n=S.call(this,t.y),i=_.call(this,n)-r.h,a=this.ctx.transform.applyToPoint(new c(t.x,n)),o=this.ctx.transform.decompose(),s=new h;s=(s=(s=s.multiply(o.translate)).multiply(o.skew)).multiply(o.scale);for(var l,f,d,p=this.ctx.transform.applyToRectangle(new u(t.x,n,r.w,r.h)),g=s.applyToRectangle(new u(t.x,i,r.w,r.h)),m=y.call(this,g),v=[],w=0;w<m.length;w+=1)-1===v.indexOf(m[w])&&v.push(m[w]);if(L(v),this.autoPaging)for(var A=v[0],P=v[v.length-1],k=A;k<P+1;k++){this.pdf.setPage(k);var I=1===k?this.posY+this.margin[0]:this.margin[0],F=this.pdf.internal.pageSize.height-this.posY-this.margin[0]-this.margin[2],C=this.pdf.internal.pageSize.height-this.margin[2],j=C-this.margin[0],O=this.pdf.internal.pageSize.width-this.margin[1],B=O-this.margin[3],M=1===k?0:F+(k-2)*j;if(0!==this.ctx.clip_path.length){var E=this.path;l=JSON.parse(JSON.stringify(this.ctx.clip_path)),this.path=N(l,this.posX+this.margin[3],-1*M+I),x.call(this,"fill",!0),this.path=E}var q=N([JSON.parse(JSON.stringify(g))],this.posX+this.margin[3],-M+I+this.ctx.prevPageLastElemOffset)[0];t.scale>=.01&&(f=this.pdf.internal.getFontSize(),this.pdf.setFontSize(f*t.scale),d=this.lineWidth,this.lineWidth=d*t.scale);var D="text"!==this.autoPaging;if(D||q.y+q.h<=C){if(D||q.y>=I&&q.x<=O){var R=D?t.text:this.pdf.splitTextToSize(t.text,t.maxWidth||O-q.x)[0],T=N([JSON.parse(JSON.stringify(p))],this.posX+this.margin[3],-M+I+this.ctx.prevPageLastElemOffset)[0],U=D&&(k>A||k<P)&&b.call(this);U&&(this.pdf.saveGraphicsState(),this.pdf.rect(this.margin[3],this.margin[0],B,j,null).clip().discardPath()),this.pdf.text(R,T.x,T.y,{angle:t.angle,align:e,renderingMode:t.renderingMode}),U&&this.pdf.restoreGraphicsState()}}else q.y<C&&(this.ctx.prevPageLastElemOffset+=C-q.y);t.scale>=.01&&(this.pdf.setFontSize(f),this.lineWidth=d)}else t.scale>=.01&&(f=this.pdf.internal.getFontSize(),this.pdf.setFontSize(f*t.scale),d=this.lineWidth,this.lineWidth=d*t.scale),this.pdf.text(t.text,a.x+this.posX,a.y+this.posY,{angle:t.angle,align:e,renderingMode:t.renderingMode,maxWidth:t.maxWidth}),t.scale>=.01&&(this.pdf.setFontSize(f),this.lineWidth=d)},j=function(t,e,r,a){r=r||0,a=a||0,this.pdf.internal.out(n(t+r)+" "+i(e+a)+" l")},O=function(t,e,r){return this.pdf.lines(t,e,r,null,null)},B=function(t,e,n,i,a,c,u,h){this.pdf.internal.out([r(o(n+t)),r(s(i+e)),r(o(a+t)),r(s(c+e)),r(o(u+t)),r(s(h+e)),"c"].join(" "))},M=function(t,e,r,n){for(var i=2*Math.PI,a=Math.PI/2;e>r;)e-=i;var o=Math.abs(r-e);o<i&&n&&(o=i-o);for(var s=[],c=n?-1:1,u=e;o>1e-5;){var h=u+c*Math.min(o,a);s.push(E.call(this,t,u,h)),o-=Math.abs(h-u),u=h}return s},E=function(t,e,r){var n=(r-e)/2,i=t*Math.cos(n),a=t*Math.sin(n),o=i,s=-a,c=o*o+s*s,u=c+o*i+s*a,h=4/3*(Math.sqrt(2*c*u)-u)/(o*a-s*i),l=o-h*s,f=s+h*o,d=l,p=-f,g=n+e,m=Math.cos(g),v=Math.sin(g);return{x1:t*Math.cos(e),y1:t*Math.sin(e),x2:l*m-f*v,y2:l*v+f*m,x3:d*m-p*v,y3:d*v+p*m,x4:t*Math.cos(r),y4:t*Math.sin(r)}},q=function(t){return 180*t/Math.PI},D=function(t,e,r,n,i,a){var o=t+.5*(r-t),s=e+.5*(n-e),c=i+.5*(r-i),h=a+.5*(n-a),l=Math.min(t,i,o,c),f=Math.max(t,i,o,c),d=Math.min(e,a,s,h),p=Math.max(e,a,s,h);return new u(l,d,f-l,p-d)},R=function(t,e,r,n,i,a,o,s){var c,h,l,f,d,p,g,m,v,b,y,w,N,L,A=r-t,x=n-e,S=i-r,_=a-n,P=o-i,k=s-a;for(h=0;h<41;h++)v=(g=(l=t+(c=h/40)*A)+c*((d=r+c*S)-l))+c*(d+c*(i+c*P-d)-g),b=(m=(f=e+c*x)+c*((p=n+c*_)-f))+c*(p+c*(a+c*k-p)-m),0==h?(y=v,w=b,N=v,L=b):(y=Math.min(y,v),w=Math.min(w,b),N=Math.max(N,v),L=Math.max(L,b));return new u(Math.round(y),Math.round(w),Math.round(N-y),Math.round(L-w))},T=function(){if(this.prevLineDash||this.ctx.lineDash.length||this.ctx.lineDashOffset){var t,e,r=(t=this.ctx.lineDash,e=this.ctx.lineDashOffset,JSON.stringify({lineDash:t,lineDashOffset:e}));this.prevLineDash!==r&&(this.pdf.setLineDash(this.ctx.lineDash,this.ctx.lineDashOffset),this.prevLineDash=r)}}}(E.API),
/**
 * @license
 * jsPDF filters PlugIn
 * Copyright (c) 2014 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t){var r=function(t){var e,r,n,i,a,o,s,c,u,h;for(/[^\x00-\xFF]/.test(t),r=[],n=0,i=(t+=e="\0\0\0\0".slice(t.length%4||4)).length;i>n;n+=4)0!==(a=(t.charCodeAt(n)<<24)+(t.charCodeAt(n+1)<<16)+(t.charCodeAt(n+2)<<8)+t.charCodeAt(n+3))?(o=(a=((a=((a=((a=(a-(h=a%85))/85)-(u=a%85))/85)-(c=a%85))/85)-(s=a%85))/85)%85,r.push(o+33,s+33,c+33,u+33,h+33)):r.push(122);return function(t,e){for(var r=e;r>0;r--)t.pop()}(r,e.length),String.fromCharCode.apply(String,r)+"~>"},n=function(t){var e,r,n,i,a,o=String,s="length",c=255,u="charCodeAt",h="slice",l="replace";for(t[h](-2),t=t[h](0,-2)[l](/\s/g,"")[l]("z","!!!!!"),n=[],i=0,a=(t+=e="uuuuu"[h](t[s]%5||5))[s];a>i;i+=5)r=52200625*(t[u](i)-33)+614125*(t[u](i+1)-33)+7225*(t[u](i+2)-33)+85*(t[u](i+3)-33)+(t[u](i+4)-33),n.push(c&r>>24,c&r>>16,c&r>>8,c&r);return function(t,e){for(var r=e;r>0;r--)t.pop()}(n,e[s]),o.fromCharCode.apply(o,n)},i=function(t){var e=new RegExp(/^([0-9A-Fa-f]{2})+$/);if(-1!==(t=t.replace(/\s/g,"")).indexOf(">")&&(t=t.substr(0,t.indexOf(">"))),t.length%2&&(t+="0"),!1===e.test(t))return"";for(var r="",n=0;n<t.length;n+=2)r+=String.fromCharCode("0x"+(t[n]+t[n+1]));return r},a=function(t){for(var r=new Uint8Array(t.length),n=t.length;n--;)r[n]=t.charCodeAt(n);return t=(r=(0,fflate__WEBPACK_IMPORTED_MODULE_1__.zlibSync)(r)).reduce((function(t,e){return t+String.fromCharCode(e)}),"")};t.processDataByFilters=function(t,e){var o=0,s=t||"",c=[];for("string"==typeof(e=e||[])&&(e=[e]),o=0;o<e.length;o+=1)switch(e[o]){case"ASCII85Decode":case"/ASCII85Decode":s=n(s),c.push("/ASCII85Encode");break;case"ASCII85Encode":case"/ASCII85Encode":s=r(s),c.push("/ASCII85Decode");break;case"ASCIIHexDecode":case"/ASCIIHexDecode":s=i(s),c.push("/ASCIIHexEncode");break;case"ASCIIHexEncode":case"/ASCIIHexEncode":s=s.split("").map((function(t){return("0"+t.charCodeAt().toString(16)).slice(-2)})).join("")+">",c.push("/ASCIIHexDecode");break;case"FlateEncode":case"/FlateEncode":s=a(s),c.push("/FlateDecode");break;default:throw new Error('The filter: "'+e[o]+'" is not implemented')}return{data:s,reverseChain:c.reverse().join(" ")}}}(E.API),
/**
 * @license
 * jsPDF fileloading PlugIn
 * Copyright (c) 2018 Aras Abbasi (aras.abbasi@gmail.com)
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t){t.loadFile=function(t,e,r){return function(t,e,r){e=!1!==e,r="function"==typeof r?r:function(){};var n=void 0;try{n=function(t,e,r){var n=new XMLHttpRequest,i=0,a=function(t){var e=t.length,r=[],n=String.fromCharCode;for(i=0;i<e;i+=1)r.push(n(255&t.charCodeAt(i)));return r.join("")};if(n.open("GET",t,!e),n.overrideMimeType("text/plain; charset=x-user-defined"),!1===e&&(n.onload=function(){200===n.status?r(a(this.responseText)):r(void 0)}),n.send(null),e&&200===n.status)return a(n.responseText)}(t,e,r)}catch(t){}return n}(t,e,r)},t.loadImageFile=t.loadFile}(E.API),function(e){function r(){return(n.html2canvas?Promise.resolve(n.html2canvas):Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 75, 23))).catch((function(t){return Promise.reject(new Error("Could not load html2canvas: "+t))})).then((function(t){return t.default?t.default:t}))}function i(){return(n.DOMPurify?Promise.resolve(n.DOMPurify):Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 76, 23))).catch((function(t){return Promise.reject(new Error("Could not load dompurify: "+t))})).then((function(t){return t.default?t.default:t}))}var a=function(e){var r=(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(e);return"undefined"===r?"undefined":"string"===r||e instanceof String?"string":"number"===r||e instanceof Number?"number":"function"===r||e instanceof Function?"function":e&&e.constructor===Array?"array":e&&1===e.nodeType?"element":"object"===r?"object":"unknown"},o=function(t,e){var r=document.createElement(t);for(var n in e.className&&(r.className=e.className),e.innerHTML&&e.dompurify&&(r.innerHTML=e.dompurify.sanitize(e.innerHTML)),e.style)r.style[n]=e.style[n];return r},s=function t(e){var r=Object.assign(t.convert(Promise.resolve()),JSON.parse(JSON.stringify(t.template))),n=t.convert(Promise.resolve(),r);return n=(n=n.setProgress(1,t,1,[t])).set(e)};(s.prototype=Object.create(Promise.prototype)).constructor=s,s.convert=function(t,e){return t.__proto__=e||s.prototype,t},s.template={prop:{src:null,container:null,overlay:null,canvas:null,img:null,pdf:null,pageSize:null,callback:function(){}},progress:{val:0,state:null,n:0,stack:[]},opt:{filename:"file.pdf",margin:[0,0,0,0],enableLinks:!0,x:0,y:0,html2canvas:{},jsPDF:{},backgroundColor:"transparent"}},s.prototype.from=function(t,e){return this.then((function(){switch(e=e||function(t){switch(a(t)){case"string":return"string";case"element":return"canvas"===t.nodeName.toLowerCase()?"canvas":"element";default:return"unknown"}}(t)){case"string":return this.then(i).then((function(e){return this.set({src:o("div",{innerHTML:t,dompurify:e})})}));case"element":return this.set({src:t});case"canvas":return this.set({canvas:t});case"img":return this.set({img:t});default:return this.error("Unknown source type.")}}))},s.prototype.to=function(t){switch(t){case"container":return this.toContainer();case"canvas":return this.toCanvas();case"img":return this.toImg();case"pdf":return this.toPdf();default:return this.error("Invalid target.")}},s.prototype.toContainer=function(){return this.thenList([function(){return this.prop.src||this.error("Cannot duplicate - no source HTML.")},function(){return this.prop.pageSize||this.setPageSize()}]).then((function(){var t={position:"relative",display:"inline-block",width:("number"!=typeof this.opt.width||isNaN(this.opt.width)||"number"!=typeof this.opt.windowWidth||isNaN(this.opt.windowWidth)?Math.max(this.prop.src.clientWidth,this.prop.src.scrollWidth,this.prop.src.offsetWidth):this.opt.windowWidth)+"px",left:0,right:0,top:0,margin:"auto",backgroundColor:this.opt.backgroundColor},e=function t(e,r){for(var n=3===e.nodeType?document.createTextNode(e.nodeValue):e.cloneNode(!1),i=e.firstChild;i;i=i.nextSibling)!0!==r&&1===i.nodeType&&"SCRIPT"===i.nodeName||n.appendChild(t(i,r));return 1===e.nodeType&&("CANVAS"===e.nodeName?(n.width=e.width,n.height=e.height,n.getContext("2d").drawImage(e,0,0)):"TEXTAREA"!==e.nodeName&&"SELECT"!==e.nodeName||(n.value=e.value),n.addEventListener("load",(function(){n.scrollTop=e.scrollTop,n.scrollLeft=e.scrollLeft}),!0)),n}(this.prop.src,this.opt.html2canvas.javascriptEnabled);"BODY"===e.tagName&&(t.height=Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight)+"px"),this.prop.overlay=o("div",{className:"html2pdf__overlay",style:{position:"fixed",overflow:"hidden",zIndex:1e3,left:"-100000px",right:0,bottom:0,top:0}}),this.prop.container=o("div",{className:"html2pdf__container",style:t}),this.prop.container.appendChild(e),this.prop.container.firstChild.appendChild(o("div",{style:{clear:"both",border:"0 none transparent",margin:0,padding:0,height:0}})),this.prop.container.style.float="none",this.prop.overlay.appendChild(this.prop.container),document.body.appendChild(this.prop.overlay),this.prop.container.firstChild.style.position="relative",this.prop.container.height=Math.max(this.prop.container.firstChild.clientHeight,this.prop.container.firstChild.scrollHeight,this.prop.container.firstChild.offsetHeight)+"px"}))},s.prototype.toCanvas=function(){var t=[function(){return document.body.contains(this.prop.container)||this.toContainer()}];return this.thenList(t).then(r).then((function(t){var e=Object.assign({},this.opt.html2canvas);return delete e.onrendered,t(this.prop.container,e)})).then((function(t){(this.opt.html2canvas.onrendered||function(){})(t),this.prop.canvas=t,document.body.removeChild(this.prop.overlay)}))},s.prototype.toContext2d=function(){var t=[function(){return document.body.contains(this.prop.container)||this.toContainer()}];return this.thenList(t).then(r).then((function(t){var e=this.opt.jsPDF,r=this.opt.fontFaces,n="number"!=typeof this.opt.width||isNaN(this.opt.width)||"number"!=typeof this.opt.windowWidth||isNaN(this.opt.windowWidth)?1:this.opt.width/this.opt.windowWidth,i=Object.assign({async:!0,allowTaint:!0,scale:n,scrollX:this.opt.scrollX||0,scrollY:this.opt.scrollY||0,backgroundColor:"#ffffff",imageTimeout:15e3,logging:!0,proxy:null,removeContainer:!0,foreignObjectRendering:!1,useCORS:!1},this.opt.html2canvas);if(delete i.onrendered,e.context2d.autoPaging=void 0===this.opt.autoPaging||this.opt.autoPaging,e.context2d.posX=this.opt.x,e.context2d.posY=this.opt.y,e.context2d.margin=this.opt.margin,e.context2d.fontFaces=r,r)for(var a=0;a<r.length;++a){var o=r[a],s=o.src.find((function(t){return"truetype"===t.format}));s&&e.addFont(s.url,o.ref.name,o.ref.style)}return i.windowHeight=i.windowHeight||0,i.windowHeight=0==i.windowHeight?Math.max(this.prop.container.clientHeight,this.prop.container.scrollHeight,this.prop.container.offsetHeight):i.windowHeight,e.context2d.save(!0),t(this.prop.container,i)})).then((function(t){this.opt.jsPDF.context2d.restore(!0),(this.opt.html2canvas.onrendered||function(){})(t),this.prop.canvas=t,document.body.removeChild(this.prop.overlay)}))},s.prototype.toImg=function(){return this.thenList([function(){return this.prop.canvas||this.toCanvas()}]).then((function(){var t=this.prop.canvas.toDataURL("image/"+this.opt.image.type,this.opt.image.quality);this.prop.img=document.createElement("img"),this.prop.img.src=t}))},s.prototype.toPdf=function(){return this.thenList([function(){return this.toContext2d()}]).then((function(){this.prop.pdf=this.prop.pdf||this.opt.jsPDF}))},s.prototype.output=function(t,e,r){return"img"===(r=r||"pdf").toLowerCase()||"image"===r.toLowerCase()?this.outputImg(t,e):this.outputPdf(t,e)},s.prototype.outputPdf=function(t,e){return this.thenList([function(){return this.prop.pdf||this.toPdf()}]).then((function(){return this.prop.pdf.output(t,e)}))},s.prototype.outputImg=function(t){return this.thenList([function(){return this.prop.img||this.toImg()}]).then((function(){switch(t){case void 0:case"img":return this.prop.img;case"datauristring":case"dataurlstring":return this.prop.img.src;case"datauri":case"dataurl":return document.location.href=this.prop.img.src;default:throw'Image output type "'+t+'" is not supported.'}}))},s.prototype.save=function(t){return this.thenList([function(){return this.prop.pdf||this.toPdf()}]).set(t?{filename:t}:null).then((function(){this.prop.pdf.save(this.opt.filename)}))},s.prototype.doCallback=function(){return this.thenList([function(){return this.prop.pdf||this.toPdf()}]).then((function(){this.prop.callback(this.prop.pdf)}))},s.prototype.set=function(t){if("object"!==a(t))return this;var e=Object.keys(t||{}).map((function(e){if(e in s.template.prop)return function(){this.prop[e]=t[e]};switch(e){case"margin":return this.setMargin.bind(this,t.margin);case"jsPDF":return function(){return this.opt.jsPDF=t.jsPDF,this.setPageSize()};case"pageSize":return this.setPageSize.bind(this,t.pageSize);default:return function(){this.opt[e]=t[e]}}}),this);return this.then((function(){return this.thenList(e)}))},s.prototype.get=function(t,e){return this.then((function(){var r=t in s.template.prop?this.prop[t]:this.opt[t];return e?e(r):r}))},s.prototype.setMargin=function(t){return this.then((function(){switch(a(t)){case"number":t=[t,t,t,t];case"array":if(2===t.length&&(t=[t[0],t[1],t[0],t[1]]),4===t.length)break;default:return this.error("Invalid margin array.")}this.opt.margin=t})).then(this.setPageSize)},s.prototype.setPageSize=function(t){function e(t,e){return Math.floor(t*e/72*96)}return this.then((function(){(t=t||E.getPageSize(this.opt.jsPDF)).hasOwnProperty("inner")||(t.inner={width:t.width-this.opt.margin[1]-this.opt.margin[3],height:t.height-this.opt.margin[0]-this.opt.margin[2]},t.inner.px={width:e(t.inner.width,t.k),height:e(t.inner.height,t.k)},t.inner.ratio=t.inner.height/t.inner.width),this.prop.pageSize=t}))},s.prototype.setProgress=function(t,e,r,n){return null!=t&&(this.progress.val=t),null!=e&&(this.progress.state=e),null!=r&&(this.progress.n=r),null!=n&&(this.progress.stack=n),this.progress.ratio=this.progress.val/this.progress.state,this},s.prototype.updateProgress=function(t,e,r,n){return this.setProgress(t?this.progress.val+t:null,e||null,r?this.progress.n+r:null,n?this.progress.stack.concat(n):null)},s.prototype.then=function(t,e){var r=this;return this.thenCore(t,e,(function(t,e){return r.updateProgress(null,null,1,[t]),Promise.prototype.then.call(this,(function(e){return r.updateProgress(null,t),e})).then(t,e).then((function(t){return r.updateProgress(1),t}))}))},s.prototype.thenCore=function(t,e,r){r=r||Promise.prototype.then;t&&(t=t.bind(this)),e&&(e=e.bind(this));var n=-1!==Promise.toString().indexOf("[native code]")&&"Promise"===Promise.name?this:s.convert(Object.assign({},this),Promise.prototype),i=r.call(n,t,e);return s.convert(i,this.__proto__)},s.prototype.thenExternal=function(t,e){return Promise.prototype.then.call(this,t,e)},s.prototype.thenList=function(t){var e=this;return t.forEach((function(t){e=e.thenCore(t)})),e},s.prototype.catch=function(t){t&&(t=t.bind(this));var e=Promise.prototype.catch.call(this,t);return s.convert(e,this)},s.prototype.catchExternal=function(t){return Promise.prototype.catch.call(this,t)},s.prototype.error=function(t){return this.then((function(){throw new Error(t)}))},s.prototype.using=s.prototype.set,s.prototype.saveAs=s.prototype.save,s.prototype.export=s.prototype.output,s.prototype.run=s.prototype.then,E.getPageSize=function(e,r,n){if("object"===(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(e)){var i=e;e=i.orientation,r=i.unit||r,n=i.format||n}r=r||"mm",n=n||"a4",e=(""+(e||"P")).toLowerCase();var a,o=(""+n).toLowerCase(),s={a0:[2383.94,3370.39],a1:[1683.78,2383.94],a2:[1190.55,1683.78],a3:[841.89,1190.55],a4:[595.28,841.89],a5:[419.53,595.28],a6:[297.64,419.53],a7:[209.76,297.64],a8:[147.4,209.76],a9:[104.88,147.4],a10:[73.7,104.88],b0:[2834.65,4008.19],b1:[2004.09,2834.65],b2:[1417.32,2004.09],b3:[1000.63,1417.32],b4:[708.66,1000.63],b5:[498.9,708.66],b6:[354.33,498.9],b7:[249.45,354.33],b8:[175.75,249.45],b9:[124.72,175.75],b10:[87.87,124.72],c0:[2599.37,3676.54],c1:[1836.85,2599.37],c2:[1298.27,1836.85],c3:[918.43,1298.27],c4:[649.13,918.43],c5:[459.21,649.13],c6:[323.15,459.21],c7:[229.61,323.15],c8:[161.57,229.61],c9:[113.39,161.57],c10:[79.37,113.39],dl:[311.81,623.62],letter:[612,792],"government-letter":[576,756],legal:[612,1008],"junior-legal":[576,360],ledger:[1224,792],tabloid:[792,1224],"credit-card":[153,243]};switch(r){case"pt":a=1;break;case"mm":a=72/25.4;break;case"cm":a=72/2.54;break;case"in":a=72;break;case"px":a=.75;break;case"pc":case"em":a=12;break;case"ex":a=6;break;default:throw"Invalid unit: "+r}var c,u=0,h=0;if(s.hasOwnProperty(o))u=s[o][1]/a,h=s[o][0]/a;else try{u=n[1],h=n[0]}catch(t){throw new Error("Invalid format: "+n)}if("p"===e||"portrait"===e)e="p",h>u&&(c=h,h=u,u=c);else{if("l"!==e&&"landscape"!==e)throw"Invalid orientation: "+e;e="l",u>h&&(c=h,h=u,u=c)}return{width:h,height:u,unit:r,k:a,orientation:e}},e.html=function(t,e){(e=e||{}).callback=e.callback||function(){},e.html2canvas=e.html2canvas||{},e.html2canvas.canvas=e.html2canvas.canvas||this.canvas,e.jsPDF=e.jsPDF||this,e.fontFaces=e.fontFaces?e.fontFaces.map(jt):null;var r=new s(e);return e.worker?r:r.from(t).doCallback()}}(E.API),E.API.addJS=function(t){return Ht=t,this.internal.events.subscribe("postPutResources",(function(){Ut=this.internal.newObject(),this.internal.out("<<"),this.internal.out("/Names [(EmbeddedJS) "+(Ut+1)+" 0 R]"),this.internal.out(">>"),this.internal.out("endobj"),zt=this.internal.newObject(),this.internal.out("<<"),this.internal.out("/S /JavaScript"),this.internal.out("/JS ("+Ht+")"),this.internal.out(">>"),this.internal.out("endobj")})),this.internal.events.subscribe("putCatalog",(function(){void 0!==Ut&&void 0!==zt&&this.internal.out("/Names <</JavaScript "+Ut+" 0 R>>")})),this},
/**
 * @license
 * Copyright (c) 2014 Steven Spungin (TwelveTone LLC)  steven@twelvetone.tv
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t){var e;t.events.push(["postPutResources",function(){var t=this,r=/^(\d+) 0 obj$/;if(this.outline.root.children.length>0)for(var n=t.outline.render().split(/\r\n/),i=0;i<n.length;i++){var a=n[i],o=r.exec(a);if(null!=o){var s=o[1];t.internal.newObjectDeferredBegin(s,!1)}t.internal.write(a)}if(this.outline.createNamedDestinations){var c=this.internal.pages.length,u=[];for(i=0;i<c;i++){var h=t.internal.newObject();u.push(h);var l=t.internal.getPageInfo(i+1);t.internal.write("<< /D["+l.objId+" 0 R /XYZ null null null]>> endobj")}var f=t.internal.newObject();t.internal.write("<< /Names [ ");for(i=0;i<u.length;i++)t.internal.write("(page_"+(i+1)+")"+u[i]+" 0 R");t.internal.write(" ] >>","endobj"),e=t.internal.newObject(),t.internal.write("<< /Dests "+f+" 0 R"),t.internal.write(">>","endobj")}}]),t.events.push(["putCatalog",function(){this.outline.root.children.length>0&&(this.internal.write("/Outlines",this.outline.makeRef(this.outline.root)),this.outline.createNamedDestinations&&this.internal.write("/Names "+e+" 0 R"))}]),t.events.push(["initialized",function(){var t=this;t.outline={createNamedDestinations:!1,root:{children:[]}},t.outline.add=function(t,e,r){var n={title:e,options:r,children:[]};return null==t&&(t=this.root),t.children.push(n),n},t.outline.render=function(){return this.ctx={},this.ctx.val="",this.ctx.pdf=t,this.genIds_r(this.root),this.renderRoot(this.root),this.renderItems(this.root),this.ctx.val},t.outline.genIds_r=function(e){e.id=t.internal.newObjectDeferred();for(var r=0;r<e.children.length;r++)this.genIds_r(e.children[r])},t.outline.renderRoot=function(t){this.objStart(t),this.line("/Type /Outlines"),t.children.length>0&&(this.line("/First "+this.makeRef(t.children[0])),this.line("/Last "+this.makeRef(t.children[t.children.length-1]))),this.line("/Count "+this.count_r({count:0},t)),this.objEnd()},t.outline.renderItems=function(e){for(var r=this.ctx.pdf.internal.getVerticalCoordinateString,n=0;n<e.children.length;n++){var i=e.children[n];this.objStart(i),this.line("/Title "+this.makeString(i.title)),this.line("/Parent "+this.makeRef(e)),n>0&&this.line("/Prev "+this.makeRef(e.children[n-1])),n<e.children.length-1&&this.line("/Next "+this.makeRef(e.children[n+1])),i.children.length>0&&(this.line("/First "+this.makeRef(i.children[0])),this.line("/Last "+this.makeRef(i.children[i.children.length-1])));var a=this.count=this.count_r({count:0},i);if(a>0&&this.line("/Count "+a),i.options&&i.options.pageNumber){var o=t.internal.getPageInfo(i.options.pageNumber);this.line("/Dest ["+o.objId+" 0 R /XYZ 0 "+r(0)+" 0]")}this.objEnd()}for(var s=0;s<e.children.length;s++)this.renderItems(e.children[s])},t.outline.line=function(t){this.ctx.val+=t+"\r\n"},t.outline.makeRef=function(t){return t.id+" 0 R"},t.outline.makeString=function(e){return"("+t.internal.pdfEscape(e)+")"},t.outline.objStart=function(t){this.ctx.val+="\r\n"+t.id+" 0 obj\r\n<<\r\n"},t.outline.objEnd=function(){this.ctx.val+=">> \r\nendobj\r\n"},t.outline.count_r=function(t,e){for(var r=0;r<e.children.length;r++)t.count++,this.count_r(t,e.children[r]);return t.count}}])}(E.API),
/**
 * @license
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t){var e=[192,193,194,195,196,197,198,199];t.processJPEG=function(t,r,n,i,a,o){var s,c=this.decode.DCT_DECODE,u=null;if("string"==typeof t||this.__addimage__.isArrayBuffer(t)||this.__addimage__.isArrayBufferView(t)){switch(t=a||t,t=this.__addimage__.isArrayBuffer(t)?new Uint8Array(t):t,(s=function(t){for(var r,n=256*t.charCodeAt(4)+t.charCodeAt(5),i=t.length,a={width:0,height:0,numcomponents:1},o=4;o<i;o+=2){if(o+=n,-1!==e.indexOf(t.charCodeAt(o+1))){r=256*t.charCodeAt(o+5)+t.charCodeAt(o+6),a={width:256*t.charCodeAt(o+7)+t.charCodeAt(o+8),height:r,numcomponents:t.charCodeAt(o+9)};break}n=256*t.charCodeAt(o+2)+t.charCodeAt(o+3)}return a}(t=this.__addimage__.isArrayBufferView(t)?this.__addimage__.arrayBufferToBinaryString(t):t)).numcomponents){case 1:o=this.color_spaces.DEVICE_GRAY;break;case 4:o=this.color_spaces.DEVICE_CMYK;break;case 3:o=this.color_spaces.DEVICE_RGB}u={data:t,width:s.width,height:s.height,colorSpace:o,bitsPerComponent:8,filter:c,index:r,alias:n}}return u}}(E.API);var Vt,Gt,Yt,Jt,Xt,Kt=function(){var t,e,i;function a(t){var e,r,n,i,a,o,s,c,u,h,l,f,d,p;for(this.data=t,this.pos=8,this.palette=[],this.imgData=[],this.transparency={},this.animation=null,this.text={},o=null;;){switch(e=this.readUInt32(),u=function(){var t,e;for(e=[],t=0;t<4;++t)e.push(String.fromCharCode(this.data[this.pos++]));return e}.call(this).join("")){case"IHDR":this.width=this.readUInt32(),this.height=this.readUInt32(),this.bits=this.data[this.pos++],this.colorType=this.data[this.pos++],this.compressionMethod=this.data[this.pos++],this.filterMethod=this.data[this.pos++],this.interlaceMethod=this.data[this.pos++];break;case"acTL":this.animation={numFrames:this.readUInt32(),numPlays:this.readUInt32()||1/0,frames:[]};break;case"PLTE":this.palette=this.read(e);break;case"fcTL":o&&this.animation.frames.push(o),this.pos+=4,o={width:this.readUInt32(),height:this.readUInt32(),xOffset:this.readUInt32(),yOffset:this.readUInt32()},a=this.readUInt16(),i=this.readUInt16()||100,o.delay=1e3*a/i,o.disposeOp=this.data[this.pos++],o.blendOp=this.data[this.pos++],o.data=[];break;case"IDAT":case"fdAT":for("fdAT"===u&&(this.pos+=4,e-=4),t=(null!=o?o.data:void 0)||this.imgData,f=0;0<=e?f<e:f>e;0<=e?++f:--f)t.push(this.data[this.pos++]);break;case"tRNS":switch(this.transparency={},this.colorType){case 3:if(n=this.palette.length/3,this.transparency.indexed=this.read(e),this.transparency.indexed.length>n)throw new Error("More transparent colors than palette size");if((h=n-this.transparency.indexed.length)>0)for(d=0;0<=h?d<h:d>h;0<=h?++d:--d)this.transparency.indexed.push(255);break;case 0:this.transparency.grayscale=this.read(e)[0];break;case 2:this.transparency.rgb=this.read(e)}break;case"tEXt":s=(l=this.read(e)).indexOf(0),c=String.fromCharCode.apply(String,l.slice(0,s)),this.text[c]=String.fromCharCode.apply(String,l.slice(s+1));break;case"IEND":return o&&this.animation.frames.push(o),this.colors=function(){switch(this.colorType){case 0:case 3:case 4:return 1;case 2:case 6:return 3}}.call(this),this.hasAlphaChannel=4===(p=this.colorType)||6===p,r=this.colors+(this.hasAlphaChannel?1:0),this.pixelBitlength=this.bits*r,this.colorSpace=function(){switch(this.colors){case 1:return"DeviceGray";case 3:return"DeviceRGB"}}.call(this),void(this.imgData=new Uint8Array(this.imgData));default:this.pos+=e}if(this.pos+=4,this.pos>this.data.length)throw new Error("Incomplete or corrupt PNG file")}}a.prototype.read=function(t){var e,r;for(r=[],e=0;0<=t?e<t:e>t;0<=t?++e:--e)r.push(this.data[this.pos++]);return r},a.prototype.readUInt32=function(){return this.data[this.pos++]<<24|this.data[this.pos++]<<16|this.data[this.pos++]<<8|this.data[this.pos++]},a.prototype.readUInt16=function(){return this.data[this.pos++]<<8|this.data[this.pos++]},a.prototype.decodePixels=function(t){var e=this.pixelBitlength/8,n=new Uint8Array(this.width*this.height*e),i=0,a=this;if(null==t&&(t=this.imgData),0===t.length)return new Uint8Array(0);function o(r,o,s,c){var u,h,l,f,d,p,g,m,v,b,y,w,N,L,A,x,S,_,P,k,I,F=Math.ceil((a.width-r)/s),C=Math.ceil((a.height-o)/c),j=a.width==F&&a.height==C;for(L=e*F,w=j?n:new Uint8Array(L*C),p=t.length,N=0,h=0;N<C&&i<p;){switch(t[i++]){case 0:for(f=S=0;S<L;f=S+=1)w[h++]=t[i++];break;case 1:for(f=_=0;_<L;f=_+=1)u=t[i++],d=f<e?0:w[h-e],w[h++]=(u+d)%256;break;case 2:for(f=P=0;P<L;f=P+=1)u=t[i++],l=(f-f%e)/e,A=N&&w[(N-1)*L+l*e+f%e],w[h++]=(A+u)%256;break;case 3:for(f=k=0;k<L;f=k+=1)u=t[i++],l=(f-f%e)/e,d=f<e?0:w[h-e],A=N&&w[(N-1)*L+l*e+f%e],w[h++]=(u+Math.floor((d+A)/2))%256;break;case 4:for(f=I=0;I<L;f=I+=1)u=t[i++],l=(f-f%e)/e,d=f<e?0:w[h-e],0===N?A=x=0:(A=w[(N-1)*L+l*e+f%e],x=l&&w[(N-1)*L+(l-1)*e+f%e]),g=d+A-x,m=Math.abs(g-d),b=Math.abs(g-A),y=Math.abs(g-x),v=m<=b&&m<=y?d:b<=y?A:x,w[h++]=(u+v)%256;break;default:throw new Error("Invalid filter algorithm: "+t[i-1])}if(!j){var O=((o+N*c)*a.width+r)*e,B=N*L;for(f=0;f<F;f+=1){for(var M=0;M<e;M+=1)n[O++]=w[B++];O+=(s-1)*e}}N++}}return t=(0,fflate__WEBPACK_IMPORTED_MODULE_1__.unzlibSync)(t),1==a.interlaceMethod?(o(0,0,8,8),o(4,0,8,8),o(0,4,4,8),o(2,0,4,4),o(0,2,2,4),o(1,0,2,2),o(0,1,1,2)):o(0,0,1,1),n},a.prototype.decodePalette=function(){var t,e,r,n,i,a,o,s,c;for(r=this.palette,a=this.transparency.indexed||[],i=new Uint8Array((a.length||0)+r.length),n=0,t=0,e=o=0,s=r.length;o<s;e=o+=3)i[n++]=r[e],i[n++]=r[e+1],i[n++]=r[e+2],i[n++]=null!=(c=a[t++])?c:255;return i},a.prototype.copyToImageData=function(t,e){var r,n,i,a,o,s,c,u,h,l,f;if(n=this.colors,h=null,r=this.hasAlphaChannel,this.palette.length&&(h=null!=(f=this._decodedPalette)?f:this._decodedPalette=this.decodePalette(),n=4,r=!0),u=(i=t.data||t).length,o=h||e,a=s=0,1===n)for(;a<u;)c=h?4*e[a/4]:s,l=o[c++],i[a++]=l,i[a++]=l,i[a++]=l,i[a++]=r?o[c++]:255,s=c;else for(;a<u;)c=h?4*e[a/4]:s,i[a++]=o[c++],i[a++]=o[c++],i[a++]=o[c++],i[a++]=r?o[c++]:255,s=c},a.prototype.decode=function(){var t;return t=new Uint8Array(this.width*this.height*4),this.copyToImageData(t,this.decodePixels()),t};var o=function(){if("[object Window]"===Object.prototype.toString.call(n)){try{e=n.document.createElement("canvas"),i=e.getContext("2d")}catch(t){return!1}return!0}return!1};return o(),t=function(t){var r;if(!0===o())return i.width=t.width,i.height=t.height,i.clearRect(0,0,t.width,t.height),i.putImageData(t,0,0),(r=new Image).src=e.toDataURL(),r;throw new Error("This method requires a Browser with Canvas-capability.")},a.prototype.decodeFrames=function(e){var r,n,i,a,o,s,c,u;if(this.animation){for(u=[],n=o=0,s=(c=this.animation.frames).length;o<s;n=++o)r=c[n],i=e.createImageData(r.width,r.height),a=this.decodePixels(new Uint8Array(r.data)),this.copyToImageData(i,a),r.imageData=i,u.push(r.image=t(i));return u}},a.prototype.renderFrame=function(t,e){var r,n,i;return r=(n=this.animation.frames)[e],i=n[e-1],0===e&&t.clearRect(0,0,this.width,this.height),1===(null!=i?i.disposeOp:void 0)?t.clearRect(i.xOffset,i.yOffset,i.width,i.height):2===(null!=i?i.disposeOp:void 0)&&t.putImageData(i.imageData,i.xOffset,i.yOffset),0===r.blendOp&&t.clearRect(r.xOffset,r.yOffset,r.width,r.height),t.drawImage(r.image,r.xOffset,r.yOffset)},a.prototype.animate=function(t){var e,r,n,i,a,o,s=this;return r=0,o=this.animation,i=o.numFrames,n=o.frames,a=o.numPlays,(e=function(){var o,c;if(o=r++%i,c=n[o],s.renderFrame(t,o),i>1&&r/i<a)return s.animation._timeout=setTimeout(e,c.delay)})()},a.prototype.stopAnimation=function(){var t;return clearTimeout(null!=(t=this.animation)?t._timeout:void 0)},a.prototype.render=function(t){var e,r;return t._png&&t._png.stopAnimation(),t._png=this,t.width=this.width,t.height=this.height,e=t.getContext("2d"),this.animation?(this.decodeFrames(e),this.animate(e)):(r=e.createImageData(this.width,this.height),this.copyToImageData(r,this.decodePixels()),e.putImageData(r,0,0))},a}();
/**
 * @license
 *
 * Copyright (c) 2014 James Robb, https://github.com/jamesbrobb
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
/**
 * @license
 * (c) Dean McNamee <dean@gmail.com>, 2013.
 *
 * https://github.com/deanm/omggif
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * omggif is a JavaScript implementation of a GIF 89a encoder and decoder,
 * including animation and compression.  It does not rely on any specific
 * underlying system, so should run in the browser, Node, or Plask.
 */
function Zt(t){var e=0;if(71!==t[e++]||73!==t[e++]||70!==t[e++]||56!==t[e++]||56!=(t[e++]+1&253)||97!==t[e++])throw new Error("Invalid GIF 87a/89a header.");var r=t[e++]|t[e++]<<8,n=t[e++]|t[e++]<<8,i=t[e++],a=i>>7,o=1<<(7&i)+1;t[e++];t[e++];var s=null,c=null;a&&(s=e,c=o,e+=3*o);var u=!0,h=[],l=0,f=null,d=0,p=null;for(this.width=r,this.height=n;u&&e<t.length;)switch(t[e++]){case 33:switch(t[e++]){case 255:if(11!==t[e]||78==t[e+1]&&69==t[e+2]&&84==t[e+3]&&83==t[e+4]&&67==t[e+5]&&65==t[e+6]&&80==t[e+7]&&69==t[e+8]&&50==t[e+9]&&46==t[e+10]&&48==t[e+11]&&3==t[e+12]&&1==t[e+13]&&0==t[e+16])e+=14,p=t[e++]|t[e++]<<8,e++;else for(e+=12;;){if(!((P=t[e++])>=0))throw Error("Invalid block size");if(0===P)break;e+=P}break;case 249:if(4!==t[e++]||0!==t[e+4])throw new Error("Invalid graphics extension block.");var g=t[e++];l=t[e++]|t[e++]<<8,f=t[e++],0==(1&g)&&(f=null),d=g>>2&7,e++;break;case 254:for(;;){if(!((P=t[e++])>=0))throw Error("Invalid block size");if(0===P)break;e+=P}break;default:throw new Error("Unknown graphic control label: 0x"+t[e-1].toString(16))}break;case 44:var m=t[e++]|t[e++]<<8,v=t[e++]|t[e++]<<8,b=t[e++]|t[e++]<<8,y=t[e++]|t[e++]<<8,w=t[e++],N=w>>6&1,L=1<<(7&w)+1,A=s,x=c,S=!1;if(w>>7){S=!0;A=e,x=L,e+=3*L}var _=e;for(e++;;){var P;if(!((P=t[e++])>=0))throw Error("Invalid block size");if(0===P)break;e+=P}h.push({x:m,y:v,width:b,height:y,has_local_palette:S,palette_offset:A,palette_size:x,data_offset:_,data_length:e-_,transparent_index:f,interlaced:!!N,delay:l,disposal:d});break;case 59:u=!1;break;default:throw new Error("Unknown gif block: 0x"+t[e-1].toString(16))}this.numFrames=function(){return h.length},this.loopCount=function(){return p},this.frameInfo=function(t){if(t<0||t>=h.length)throw new Error("Frame index out of range.");return h[t]},this.decodeAndBlitFrameBGRA=function(e,n){var i=this.frameInfo(e),a=i.width*i.height,o=new Uint8Array(a);$t(t,i.data_offset,o,a);var s=i.palette_offset,c=i.transparent_index;null===c&&(c=256);var u=i.width,h=r-u,l=u,f=4*(i.y*r+i.x),d=4*((i.y+i.height)*r+i.x),p=f,g=4*h;!0===i.interlaced&&(g+=4*r*7);for(var m=8,v=0,b=o.length;v<b;++v){var y=o[v];if(0===l&&(l=u,(p+=g)>=d&&(g=4*h+4*r*(m-1),p=f+(u+h)*(m<<1),m>>=1)),y===c)p+=4;else{var w=t[s+3*y],N=t[s+3*y+1],L=t[s+3*y+2];n[p++]=L,n[p++]=N,n[p++]=w,n[p++]=255}--l}},this.decodeAndBlitFrameRGBA=function(e,n){var i=this.frameInfo(e),a=i.width*i.height,o=new Uint8Array(a);$t(t,i.data_offset,o,a);var s=i.palette_offset,c=i.transparent_index;null===c&&(c=256);var u=i.width,h=r-u,l=u,f=4*(i.y*r+i.x),d=4*((i.y+i.height)*r+i.x),p=f,g=4*h;!0===i.interlaced&&(g+=4*r*7);for(var m=8,v=0,b=o.length;v<b;++v){var y=o[v];if(0===l&&(l=u,(p+=g)>=d&&(g=4*h+4*r*(m-1),p=f+(u+h)*(m<<1),m>>=1)),y===c)p+=4;else{var w=t[s+3*y],N=t[s+3*y+1],L=t[s+3*y+2];n[p++]=w,n[p++]=N,n[p++]=L,n[p++]=255}--l}}}function $t(t,e,r,n){for(var i=t[e++],o=1<<i,s=o+1,c=s+1,u=i+1,h=(1<<u)-1,l=0,f=0,d=0,p=t[e++],g=new Int32Array(4096),m=null;;){for(;l<16&&0!==p;)f|=t[e++]<<l,l+=8,1===p?p=t[e++]:--p;if(l<u)break;var v=f&h;if(f>>=u,l-=u,v!==o){if(v===s)break;for(var b=v<c?v:m,y=0,w=b;w>o;)w=g[w]>>8,++y;var N=w;if(d+y+(b!==v?1:0)>n)return void a.log("Warning, gif stream longer than expected.");r[d++]=N;var L=d+=y;for(b!==v&&(r[d++]=N),w=b;y--;)w=g[w],r[--L]=255&w,w>>=8;null!==m&&c<4096&&(g[c++]=m<<8|N,c>=h+1&&u<12&&(++u,h=h<<1|1)),m=v}else c=s+1,h=(1<<(u=i+1))-1,m=null}return d!==n&&a.log("Warning, gif stream shorter than expected."),r}
/**
 * @license
  Copyright (c) 2008, Adobe Systems Incorporated
  All rights reserved.

  Redistribution and use in source and binary forms, with or without 
  modification, are permitted provided that the following conditions are
  met:

  * Redistributions of source code must retain the above copyright notice, 
    this list of conditions and the following disclaimer.
  
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the 
    documentation and/or other materials provided with the distribution.
  
  * Neither the name of Adobe Systems Incorporated nor the names of its 
    contributors may be used to endorse or promote products derived from 
    this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
  IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
  THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
  PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/function Qt(t){var e,r,n,i,a,o=Math.floor,s=new Array(64),c=new Array(64),u=new Array(64),h=new Array(64),l=new Array(65535),f=new Array(65535),d=new Array(64),p=new Array(64),g=[],m=0,v=7,b=new Array(64),y=new Array(64),w=new Array(64),N=new Array(256),L=new Array(2048),A=[0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63],x=[0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0],S=[0,1,2,3,4,5,6,7,8,9,10,11],_=[0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125],P=[1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,129,145,161,8,35,66,177,193,21,82,209,240,36,51,98,114,130,9,10,22,23,24,25,26,37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,225,226,227,228,229,230,231,232,233,234,241,242,243,244,245,246,247,248,249,250],k=[0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0],I=[0,1,2,3,4,5,6,7,8,9,10,11],F=[0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119],C=[0,1,2,3,17,4,5,33,49,6,18,65,81,7,97,113,19,34,50,129,8,20,66,145,161,177,193,9,35,51,82,240,21,98,114,209,10,22,36,52,225,37,241,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,130,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,226,227,228,229,230,231,232,233,234,242,243,244,245,246,247,248,249,250];function j(t,e){for(var r=0,n=0,i=new Array,a=1;a<=16;a++){for(var o=1;o<=t[a];o++)i[e[n]]=[],i[e[n]][0]=r,i[e[n]][1]=a,n++,r++;r*=2}return i}function O(t){for(var e=t[0],r=t[1]-1;r>=0;)e&1<<r&&(m|=1<<v),r--,--v<0&&(255==m?(B(255),B(0)):B(m),v=7,m=0)}function B(t){g.push(t)}function M(t){B(t>>8&255),B(255&t)}function E(t,e,r,n,i){for(var a,o=i[0],s=i[240],c=function(t,e){var r,n,i,a,o,s,c,u,h,l,f=0;for(h=0;h<8;++h){r=t[f],n=t[f+1],i=t[f+2],a=t[f+3],o=t[f+4],s=t[f+5],c=t[f+6];var p=r+(u=t[f+7]),g=r-u,m=n+c,v=n-c,b=i+s,y=i-s,w=a+o,N=a-o,L=p+w,A=p-w,x=m+b,S=m-b;t[f]=L+x,t[f+4]=L-x;var _=.707106781*(S+A);t[f+2]=A+_,t[f+6]=A-_;var P=.382683433*((L=N+y)-(S=v+g)),k=.5411961*L+P,I=1.306562965*S+P,F=.707106781*(x=y+v),C=g+F,j=g-F;t[f+5]=j+k,t[f+3]=j-k,t[f+1]=C+I,t[f+7]=C-I,f+=8}for(f=0,h=0;h<8;++h){r=t[f],n=t[f+8],i=t[f+16],a=t[f+24],o=t[f+32],s=t[f+40],c=t[f+48];var O=r+(u=t[f+56]),B=r-u,M=n+c,E=n-c,q=i+s,D=i-s,R=a+o,T=a-o,U=O+R,z=O-R,H=M+q,W=M-q;t[f]=U+H,t[f+32]=U-H;var V=.707106781*(W+z);t[f+16]=z+V,t[f+48]=z-V;var G=.382683433*((U=T+D)-(W=E+B)),Y=.5411961*U+G,J=1.306562965*W+G,X=.707106781*(H=D+E),K=B+X,Z=B-X;t[f+40]=Z+Y,t[f+24]=Z-Y,t[f+8]=K+J,t[f+56]=K-J,f++}for(h=0;h<64;++h)l=t[h]*e[h],d[h]=l>0?l+.5|0:l-.5|0;return d}(t,e),u=0;u<64;++u)p[A[u]]=c[u];var h=p[0]-r;r=p[0],0==h?O(n[0]):(O(n[f[a=32767+h]]),O(l[a]));for(var g=63;g>0&&0==p[g];)g--;if(0==g)return O(o),r;for(var m,v=1;v<=g;){for(var b=v;0==p[v]&&v<=g;)++v;var y=v-b;if(y>=16){m=y>>4;for(var w=1;w<=m;++w)O(s);y&=15}a=32767+p[v],O(i[(y<<4)+f[a]]),O(l[a]),v++}return 63!=g&&O(o),r}function q(t){(t=Math.min(Math.max(t,1),100),a!=t)&&(!function(t){for(var e=[16,11,10,16,24,40,51,61,12,12,14,19,26,58,60,55,14,13,16,24,40,57,69,56,14,17,22,29,51,87,80,62,18,22,37,56,68,109,103,77,24,35,55,64,81,104,113,92,49,64,78,87,103,121,120,101,72,92,95,98,112,100,103,99],r=0;r<64;r++){var n=o((e[r]*t+50)/100);n=Math.min(Math.max(n,1),255),s[A[r]]=n}for(var i=[17,18,24,47,99,99,99,99,18,21,26,66,99,99,99,99,24,26,56,99,99,99,99,99,47,66,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99],a=0;a<64;a++){var l=o((i[a]*t+50)/100);l=Math.min(Math.max(l,1),255),c[A[a]]=l}for(var f=[1,1.387039845,1.306562965,1.175875602,1,.785694958,.5411961,.275899379],d=0,p=0;p<8;p++)for(var g=0;g<8;g++)u[d]=1/(s[A[d]]*f[p]*f[g]*8),h[d]=1/(c[A[d]]*f[p]*f[g]*8),d++}(t<50?Math.floor(5e3/t):Math.floor(200-2*t)),a=t)}this.encode=function(t,a){a&&q(a),g=new Array,m=0,v=7,M(65496),M(65504),M(16),B(74),B(70),B(73),B(70),B(0),B(1),B(1),B(0),M(1),M(1),B(0),B(0),function(){M(65499),M(132),B(0);for(var t=0;t<64;t++)B(s[t]);B(1);for(var e=0;e<64;e++)B(c[e])}(),function(t,e){M(65472),M(17),B(8),M(e),M(t),B(3),B(1),B(17),B(0),B(2),B(17),B(1),B(3),B(17),B(1)}(t.width,t.height),function(){M(65476),M(418),B(0);for(var t=0;t<16;t++)B(x[t+1]);for(var e=0;e<=11;e++)B(S[e]);B(16);for(var r=0;r<16;r++)B(_[r+1]);for(var n=0;n<=161;n++)B(P[n]);B(1);for(var i=0;i<16;i++)B(k[i+1]);for(var a=0;a<=11;a++)B(I[a]);B(17);for(var o=0;o<16;o++)B(F[o+1]);for(var s=0;s<=161;s++)B(C[s])}(),M(65498),M(12),B(3),B(1),B(0),B(2),B(17),B(3),B(17),B(0),B(63),B(0);var o=0,l=0,f=0;m=0,v=7,this.encode.displayName="_encode_";for(var d,p,N,A,j,D,R,T,U,z=t.data,H=t.width,W=t.height,V=4*H,G=0;G<W;){for(d=0;d<V;){for(j=V*G+d,R=-1,T=0,U=0;U<64;U++)D=j+(T=U>>3)*V+(R=4*(7&U)),G+T>=W&&(D-=V*(G+1+T-W)),d+R>=V&&(D-=d+R-V+4),p=z[D++],N=z[D++],A=z[D++],b[U]=(L[p]+L[N+256>>0]+L[A+512>>0]>>16)-128,y[U]=(L[p+768>>0]+L[N+1024>>0]+L[A+1280>>0]>>16)-128,w[U]=(L[p+1280>>0]+L[N+1536>>0]+L[A+1792>>0]>>16)-128;o=E(b,u,o,e,n),l=E(y,h,l,r,i),f=E(w,h,f,r,i),d+=32}G+=8}if(v>=0){var Y=[];Y[1]=v+1,Y[0]=(1<<v+1)-1,O(Y)}return M(65497),new Uint8Array(g)},t=t||50,function(){for(var t=String.fromCharCode,e=0;e<256;e++)N[e]=t(e)}(),e=j(x,S),r=j(k,I),n=j(_,P),i=j(F,C),function(){for(var t=1,e=2,r=1;r<=15;r++){for(var n=t;n<e;n++)f[32767+n]=r,l[32767+n]=[],l[32767+n][1]=r,l[32767+n][0]=n;for(var i=-(e-1);i<=-t;i++)f[32767+i]=r,l[32767+i]=[],l[32767+i][1]=r,l[32767+i][0]=e-1+i;t<<=1,e<<=1}}(),function(){for(var t=0;t<256;t++)L[t]=19595*t,L[t+256>>0]=38470*t,L[t+512>>0]=7471*t+32768,L[t+768>>0]=-11059*t,L[t+1024>>0]=-21709*t,L[t+1280>>0]=32768*t+8421375,L[t+1536>>0]=-27439*t,L[t+1792>>0]=-5329*t}(),q(t)}
/**
 * @license
 * Copyright (c) 2017 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */function te(t,e){if(this.pos=0,this.buffer=t,this.datav=new DataView(t.buffer),this.is_with_alpha=!!e,this.bottom_up=!0,this.flag=String.fromCharCode(this.buffer[0])+String.fromCharCode(this.buffer[1]),this.pos+=2,-1===["BM","BA","CI","CP","IC","PT"].indexOf(this.flag))throw new Error("Invalid BMP File");this.parseHeader(),this.parseBGR()}function ee(t){function e(t){if(!t)throw Error("assert :P")}function r(t,e,r){for(var n=0;4>n;n++)if(t[e+n]!=r.charCodeAt(n))return!0;return!1}function n(t,e,r,n,i){for(var a=0;a<i;a++)t[e+a]=r[n+a]}function i(t,e,r,n){for(var i=0;i<n;i++)t[e+i]=r}function a(t){return new Int32Array(t)}function o(t,e){for(var r=[],n=0;n<t;n++)r.push(new e);return r}function s(t,e){var r=[];return function t(r,n,i){for(var a=i[n],o=0;o<a&&(r.push(i.length>n+1?[]:new e),!(i.length<n+1));o++)t(r[o],n+1,i)}(r,0,t),r}var c=function(){var t=this;function c(t,e){for(var r=1<<e-1>>>0;t&r;)r>>>=1;return r?(t&r-1)+r:t}function u(t,r,n,i,a){e(!(i%n));do{t[r+(i-=n)]=a}while(0<i)}function h(t,r,n,i,o){if(e(2328>=o),512>=o)var s=a(512);else if(null==(s=a(o)))return 0;return function(t,r,n,i,o,s){var h,f,d=r,p=1<<n,g=a(16),m=a(16);for(e(0!=o),e(null!=i),e(null!=t),e(0<n),f=0;f<o;++f){if(15<i[f])return 0;++g[i[f]]}if(g[0]==o)return 0;for(m[1]=0,h=1;15>h;++h){if(g[h]>1<<h)return 0;m[h+1]=m[h]+g[h]}for(f=0;f<o;++f)h=i[f],0<i[f]&&(s[m[h]++]=f);if(1==m[15])return(i=new l).g=0,i.value=s[0],u(t,d,1,p,i),p;var v,b=-1,y=p-1,w=0,N=1,L=1,A=1<<n;for(f=0,h=1,o=2;h<=n;++h,o<<=1){if(N+=L<<=1,0>(L-=g[h]))return 0;for(;0<g[h];--g[h])(i=new l).g=h,i.value=s[f++],u(t,d+w,o,A,i),w=c(w,h)}for(h=n+1,o=2;15>=h;++h,o<<=1){if(N+=L<<=1,0>(L-=g[h]))return 0;for(;0<g[h];--g[h]){if(i=new l,(w&y)!=b){for(d+=A,v=1<<(b=h)-n;15>b&&!(0>=(v-=g[b]));)++b,v<<=1;p+=A=1<<(v=b-n),t[r+(b=w&y)].g=v+n,t[r+b].value=d-r-b}i.g=h-n,i.value=s[f++],u(t,d+(w>>n),o,A,i),w=c(w,h)}}return N!=2*m[15]-1?0:p}(t,r,n,i,o,s)}function l(){this.value=this.g=0}function f(){this.value=this.g=0}function d(){this.G=o(5,l),this.H=a(5),this.jc=this.Qb=this.qb=this.nd=0,this.pd=o(Dr,f)}function p(t,r,n,i){e(null!=t),e(null!=r),e(2147483648>i),t.Ca=254,t.I=0,t.b=-8,t.Ka=0,t.oa=r,t.pa=n,t.Jd=r,t.Yc=n+i,t.Zc=4<=i?n+i-4+1:n,_(t)}function g(t,e){for(var r=0;0<e--;)r|=k(t,128)<<e;return r}function m(t,e){var r=g(t,e);return P(t)?-r:r}function v(t,r,n,i){var a,o=0;for(e(null!=t),e(null!=r),e(4294967288>i),t.Sb=i,t.Ra=0,t.u=0,t.h=0,4<i&&(i=4),a=0;a<i;++a)o+=r[n+a]<<8*a;t.Ra=o,t.bb=i,t.oa=r,t.pa=n}function b(t){for(;8<=t.u&&t.bb<t.Sb;)t.Ra>>>=8,t.Ra+=t.oa[t.pa+t.bb]<<Ur-8>>>0,++t.bb,t.u-=8;A(t)&&(t.h=1,t.u=0)}function y(t,r){if(e(0<=r),!t.h&&r<=Tr){var n=L(t)&Rr[r];return t.u+=r,b(t),n}return t.h=1,t.u=0}function w(){this.b=this.Ca=this.I=0,this.oa=[],this.pa=0,this.Jd=[],this.Yc=0,this.Zc=[],this.Ka=0}function N(){this.Ra=0,this.oa=[],this.h=this.u=this.bb=this.Sb=this.pa=0}function L(t){return t.Ra>>>(t.u&Ur-1)>>>0}function A(t){return e(t.bb<=t.Sb),t.h||t.bb==t.Sb&&t.u>Ur}function x(t,e){t.u=e,t.h=A(t)}function S(t){t.u>=zr&&(e(t.u>=zr),b(t))}function _(t){e(null!=t&&null!=t.oa),t.pa<t.Zc?(t.I=(t.oa[t.pa++]|t.I<<8)>>>0,t.b+=8):(e(null!=t&&null!=t.oa),t.pa<t.Yc?(t.b+=8,t.I=t.oa[t.pa++]|t.I<<8):t.Ka?t.b=0:(t.I<<=8,t.b+=8,t.Ka=1))}function P(t){return g(t,1)}function k(t,e){var r=t.Ca;0>t.b&&_(t);var n=t.b,i=r*e>>>8,a=(t.I>>>n>i)+0;for(a?(r-=i,t.I-=i+1<<n>>>0):r=i+1,n=r,i=0;256<=n;)i+=8,n>>=8;return n=7^i+Hr[n],t.b-=n,t.Ca=(r<<n)-1,a}function I(t,e,r){t[e+0]=r>>24&255,t[e+1]=r>>16&255,t[e+2]=r>>8&255,t[e+3]=r>>0&255}function F(t,e){return t[e+0]<<0|t[e+1]<<8}function C(t,e){return F(t,e)|t[e+2]<<16}function j(t,e){return F(t,e)|F(t,e+2)<<16}function O(t,r){var n=1<<r;return e(null!=t),e(0<r),t.X=a(n),null==t.X?0:(t.Mb=32-r,t.Xa=r,1)}function B(t,r){e(null!=t),e(null!=r),e(t.Xa==r.Xa),n(r.X,0,t.X,0,1<<r.Xa)}function M(){this.X=[],this.Xa=this.Mb=0}function E(t,r,n,i){e(null!=n),e(null!=i);var a=n[0],o=i[0];return 0==a&&(a=(t*o+r/2)/r),0==o&&(o=(r*a+t/2)/t),0>=a||0>=o?0:(n[0]=a,i[0]=o,1)}function q(t,e){return t+(1<<e)-1>>>e}function D(t,e){return((4278255360&t)+(4278255360&e)>>>0&4278255360)+((16711935&t)+(16711935&e)>>>0&16711935)>>>0}function R(e,r){t[r]=function(r,n,i,a,o,s,c){var u;for(u=0;u<o;++u){var h=t[e](s[c+u-1],i,a+u);s[c+u]=D(r[n+u],h)}}}function T(){this.ud=this.hd=this.jd=0}function U(t,e){return((4278124286&(t^e))>>>1)+(t&e)>>>0}function z(t){return 0<=t&&256>t?t:0>t?0:255<t?255:void 0}function H(t,e){return z(t+(t-e+.5>>1))}function W(t,e,r){return Math.abs(e-r)-Math.abs(t-r)}function V(t,e,r,n,i,a,o){for(n=a[o-1],r=0;r<i;++r)a[o+r]=n=D(t[e+r],n)}function G(t,e,r,n,i){var a;for(a=0;a<r;++a){var o=t[e+a],s=o>>8&255,c=16711935&(c=(c=16711935&o)+((s<<16)+s));n[i+a]=(4278255360&o)+c>>>0}}function Y(t,e){e.jd=t>>0&255,e.hd=t>>8&255,e.ud=t>>16&255}function J(t,e,r,n,i,a){var o;for(o=0;o<n;++o){var s=e[r+o],c=s>>>8,u=s,h=255&(h=(h=s>>>16)+((t.jd<<24>>24)*(c<<24>>24)>>>5));u=255&(u=(u=u+((t.hd<<24>>24)*(c<<24>>24)>>>5))+((t.ud<<24>>24)*(h<<24>>24)>>>5));i[a+o]=(4278255360&s)+(h<<16)+u}}function X(e,r,n,i,a){t[r]=function(t,e,r,n,o,s,c,u,h){for(n=c;n<u;++n)for(c=0;c<h;++c)o[s++]=a(r[i(t[e++])])},t[e]=function(e,r,o,s,c,u,h){var l=8>>e.b,f=e.Ea,d=e.K[0],p=e.w;if(8>l)for(e=(1<<e.b)-1,p=(1<<l)-1;r<o;++r){var g,m=0;for(g=0;g<f;++g)g&e||(m=i(s[c++])),u[h++]=a(d[m&p]),m>>=l}else t["VP8LMapColor"+n](s,c,d,p,u,h,r,o,f)}}function K(t,e,r,n,i){for(r=e+r;e<r;){var a=t[e++];n[i++]=a>>16&255,n[i++]=a>>8&255,n[i++]=a>>0&255}}function Z(t,e,r,n,i){for(r=e+r;e<r;){var a=t[e++];n[i++]=a>>16&255,n[i++]=a>>8&255,n[i++]=a>>0&255,n[i++]=a>>24&255}}function $(t,e,r,n,i){for(r=e+r;e<r;){var a=(o=t[e++])>>16&240|o>>12&15,o=o>>0&240|o>>28&15;n[i++]=a,n[i++]=o}}function Q(t,e,r,n,i){for(r=e+r;e<r;){var a=(o=t[e++])>>16&248|o>>13&7,o=o>>5&224|o>>3&31;n[i++]=a,n[i++]=o}}function tt(t,e,r,n,i){for(r=e+r;e<r;){var a=t[e++];n[i++]=a>>0&255,n[i++]=a>>8&255,n[i++]=a>>16&255}}function et(t,e,r,i,a,o){if(0==o)for(r=e+r;e<r;)I(i,((o=t[e++])[0]>>24|o[1]>>8&65280|o[2]<<8&16711680|o[3]<<24)>>>0),a+=32;else n(i,a,t,e,r)}function rt(e,r){t[r][0]=t[e+"0"],t[r][1]=t[e+"1"],t[r][2]=t[e+"2"],t[r][3]=t[e+"3"],t[r][4]=t[e+"4"],t[r][5]=t[e+"5"],t[r][6]=t[e+"6"],t[r][7]=t[e+"7"],t[r][8]=t[e+"8"],t[r][9]=t[e+"9"],t[r][10]=t[e+"10"],t[r][11]=t[e+"11"],t[r][12]=t[e+"12"],t[r][13]=t[e+"13"],t[r][14]=t[e+"0"],t[r][15]=t[e+"0"]}function nt(t){return t==Hn||t==Wn||t==Vn||t==Gn}function it(){this.eb=[],this.size=this.A=this.fb=0}function at(){this.y=[],this.f=[],this.ea=[],this.F=[],this.Tc=this.Ed=this.Cd=this.Fd=this.lb=this.Db=this.Ab=this.fa=this.J=this.W=this.N=this.O=0}function ot(){this.Rd=this.height=this.width=this.S=0,this.f={},this.f.RGBA=new it,this.f.kb=new at,this.sd=null}function st(){this.width=[0],this.height=[0],this.Pd=[0],this.Qd=[0],this.format=[0]}function ct(){this.Id=this.fd=this.Md=this.hb=this.ib=this.da=this.bd=this.cd=this.j=this.v=this.Da=this.Sd=this.ob=0}function ut(t){return alert("todo:WebPSamplerProcessPlane"),t.T}function ht(t,e){var r=t.T,i=e.ba.f.RGBA,a=i.eb,o=i.fb+t.ka*i.A,s=vi[e.ba.S],c=t.y,u=t.O,h=t.f,l=t.N,f=t.ea,d=t.W,p=e.cc,g=e.dc,m=e.Mc,v=e.Nc,b=t.ka,y=t.ka+t.T,w=t.U,N=w+1>>1;for(0==b?s(c,u,null,null,h,l,f,d,h,l,f,d,a,o,null,null,w):(s(e.ec,e.fc,c,u,p,g,m,v,h,l,f,d,a,o-i.A,a,o,w),++r);b+2<y;b+=2)p=h,g=l,m=f,v=d,l+=t.Rc,d+=t.Rc,o+=2*i.A,s(c,(u+=2*t.fa)-t.fa,c,u,p,g,m,v,h,l,f,d,a,o-i.A,a,o,w);return u+=t.fa,t.j+y<t.o?(n(e.ec,e.fc,c,u,w),n(e.cc,e.dc,h,l,N),n(e.Mc,e.Nc,f,d,N),r--):1&y||s(c,u,null,null,h,l,f,d,h,l,f,d,a,o+i.A,null,null,w),r}function lt(t,r,n){var i=t.F,a=[t.J];if(null!=i){var o=t.U,s=r.ba.S,c=s==Tn||s==Vn;r=r.ba.f.RGBA;var u=[0],h=t.ka;u[0]=t.T,t.Kb&&(0==h?--u[0]:(--h,a[0]-=t.width),t.j+t.ka+t.T==t.o&&(u[0]=t.o-t.j-h));var l=r.eb;h=r.fb+h*r.A;t=Sn(i,a[0],t.width,o,u,l,h+(c?0:3),r.A),e(n==u),t&&nt(s)&&An(l,h,c,o,u,r.A)}return 0}function ft(t){var e=t.ma,r=e.ba.S,n=11>r,i=r==qn||r==Rn||r==Tn||r==Un||12==r||nt(r);if(e.memory=null,e.Ib=null,e.Jb=null,e.Nd=null,!Mr(e.Oa,t,i?11:12))return 0;if(i&&nt(r)&&br(),t.da)alert("todo:use_scaling");else{if(n){if(e.Ib=ut,t.Kb){if(r=t.U+1>>1,e.memory=a(t.U+2*r),null==e.memory)return 0;e.ec=e.memory,e.fc=0,e.cc=e.ec,e.dc=e.fc+t.U,e.Mc=e.cc,e.Nc=e.dc+r,e.Ib=ht,br()}}else alert("todo:EmitYUV");i&&(e.Jb=lt,n&&mr())}if(n&&!Ci){for(t=0;256>t;++t)ji[t]=89858*(t-128)+_i>>Si,Mi[t]=-22014*(t-128)+_i,Bi[t]=-45773*(t-128),Oi[t]=113618*(t-128)+_i>>Si;for(t=Pi;t<ki;++t)e=76283*(t-16)+_i>>Si,Ei[t-Pi]=Vt(e,255),qi[t-Pi]=Vt(e+8>>4,15);Ci=1}return 1}function dt(t){var r=t.ma,n=t.U,i=t.T;return e(!(1&t.ka)),0>=n||0>=i?0:(n=r.Ib(t,r),null!=r.Jb&&r.Jb(t,r,n),r.Dc+=n,1)}function pt(t){t.ma.memory=null}function gt(t,e,r,n){return 47!=y(t,8)?0:(e[0]=y(t,14)+1,r[0]=y(t,14)+1,n[0]=y(t,1),0!=y(t,3)?0:!t.h)}function mt(t,e){if(4>t)return t+1;var r=t-2>>1;return(2+(1&t)<<r)+y(e,r)+1}function vt(t,e){return 120<e?e-120:1<=(r=((r=$n[e-1])>>4)*t+(8-(15&r)))?r:1;var r}function bt(t,e,r){var n=L(r),i=t[e+=255&n].g-8;return 0<i&&(x(r,r.u+8),n=L(r),e+=t[e].value,e+=n&(1<<i)-1),x(r,r.u+t[e].g),t[e].value}function yt(t,r,n){return n.g+=t.g,n.value+=t.value<<r>>>0,e(8>=n.g),t.g}function wt(t,r,n){var i=t.xc;return e((r=0==i?0:t.vc[t.md*(n>>i)+(r>>i)])<t.Wb),t.Ya[r]}function Nt(t,r,i,a){var o=t.ab,s=t.c*r,c=t.C;r=c+r;var u=i,h=a;for(a=t.Ta,i=t.Ua;0<o--;){var l=t.gc[o],f=c,d=r,p=u,g=h,m=(h=a,u=i,l.Ea);switch(e(f<d),e(d<=l.nc),l.hc){case 2:Gr(p,g,(d-f)*m,h,u);break;case 0:var v=f,b=d,y=h,w=u,N=(_=l).Ea;0==v&&(Wr(p,g,null,null,1,y,w),V(p,g+1,0,0,N-1,y,w+1),g+=N,w+=N,++v);for(var L=1<<_.b,A=L-1,x=q(N,_.b),S=_.K,_=_.w+(v>>_.b)*x;v<b;){var P=S,k=_,I=1;for(Vr(p,g,y,w-N,1,y,w);I<N;){var F=(I&~A)+L;F>N&&(F=N),(0,Zr[P[k++]>>8&15])(p,g+ +I,y,w+I-N,F-I,y,w+I),I=F}g+=N,w+=N,++v&A||(_+=x)}d!=l.nc&&n(h,u-m,h,u+(d-f-1)*m,m);break;case 1:for(m=p,b=g,N=(p=l.Ea)-(w=p&~(y=(g=1<<l.b)-1)),v=q(p,l.b),L=l.K,l=l.w+(f>>l.b)*v;f<d;){for(A=L,x=l,S=new T,_=b+w,P=b+p;b<_;)Y(A[x++],S),$r(S,m,b,g,h,u),b+=g,u+=g;b<P&&(Y(A[x++],S),$r(S,m,b,N,h,u),b+=N,u+=N),++f&y||(l+=v)}break;case 3:if(p==h&&g==u&&0<l.b){for(b=h,p=m=u+(d-f)*m-(w=(d-f)*q(l.Ea,l.b)),g=h,y=u,v=[],w=(N=w)-1;0<=w;--w)v[w]=g[y+w];for(w=N-1;0<=w;--w)b[p+w]=v[w];Yr(l,f,d,h,m,h,u)}else Yr(l,f,d,p,g,h,u)}u=a,h=i}h!=i&&n(a,i,u,h,s)}function Lt(t,r){var n=t.V,i=t.Ba+t.c*t.C,a=r-t.C;if(e(r<=t.l.o),e(16>=a),0<a){var o=t.l,s=t.Ta,c=t.Ua,u=o.width;if(Nt(t,a,n,i),a=c=[c],e((n=t.C)<(i=r)),e(o.v<o.va),i>o.o&&(i=o.o),n<o.j){var h=o.j-n;n=o.j;a[0]+=h*u}if(n>=i?n=0:(a[0]+=4*o.v,o.ka=n-o.j,o.U=o.va-o.v,o.T=i-n,n=1),n){if(c=c[0],11>(n=t.ca).S){var l=n.f.RGBA,f=(i=n.S,a=o.U,o=o.T,h=l.eb,l.A),d=o;for(l=l.fb+t.Ma*l.A;0<d--;){var p=s,g=c,m=a,v=h,b=l;switch(i){case En:Qr(p,g,m,v,b);break;case qn:tn(p,g,m,v,b);break;case Hn:tn(p,g,m,v,b),An(v,b,0,m,1,0);break;case Dn:nn(p,g,m,v,b);break;case Rn:et(p,g,m,v,b,1);break;case Wn:et(p,g,m,v,b,1),An(v,b,0,m,1,0);break;case Tn:et(p,g,m,v,b,0);break;case Vn:et(p,g,m,v,b,0),An(v,b,1,m,1,0);break;case Un:en(p,g,m,v,b);break;case Gn:en(p,g,m,v,b),xn(v,b,m,1,0);break;case zn:rn(p,g,m,v,b);break;default:e(0)}c+=u,l+=f}t.Ma+=o}else alert("todo:EmitRescaledRowsYUVA");e(t.Ma<=n.height)}}t.C=r,e(t.C<=t.i)}function At(t){var e;if(0<t.ua)return 0;for(e=0;e<t.Wb;++e){var r=t.Ya[e].G,n=t.Ya[e].H;if(0<r[1][n[1]+0].g||0<r[2][n[2]+0].g||0<r[3][n[3]+0].g)return 0}return 1}function xt(t,r,n,i,a,o){if(0!=t.Z){var s=t.qd,c=t.rd;for(e(null!=mi[t.Z]);r<n;++r)mi[t.Z](s,c,i,a,i,a,o),s=i,c=a,a+=o;t.qd=s,t.rd=c}}function St(t,r){var n=t.l.ma,i=0==n.Z||1==n.Z?t.l.j:t.C;i=t.C<i?i:t.C;if(e(r<=t.l.o),r>i){var a=t.l.width,o=n.ca,s=n.tb+a*i,c=t.V,u=t.Ba+t.c*i,h=t.gc;e(1==t.ab),e(3==h[0].hc),Xr(h[0],i,r,c,u,o,s),xt(n,i,r,o,s,a)}t.C=t.Ma=r}function _t(t,r,n,i,a,o,s){var c=t.$/i,u=t.$%i,h=t.m,l=t.s,f=n+t.$,d=f;a=n+i*a;var p=n+i*o,g=280+l.ua,m=t.Pb?c:16777216,v=0<l.ua?l.Wa:null,b=l.wc,y=f<p?wt(l,u,c):null;e(t.C<o),e(p<=a);var w=!1;t:for(;;){for(;w||f<p;){var N=0;if(c>=m){var _=f-n;e((m=t).Pb),m.wd=m.m,m.xd=_,0<m.s.ua&&B(m.s.Wa,m.s.vb),m=c+ti}if(u&b||(y=wt(l,u,c)),e(null!=y),y.Qb&&(r[f]=y.qb,w=!0),!w)if(S(h),y.jc){N=h,_=r;var P=f,k=y.pd[L(N)&Dr-1];e(y.jc),256>k.g?(x(N,N.u+k.g),_[P]=k.value,N=0):(x(N,N.u+k.g-256),e(256<=k.value),N=k.value),0==N&&(w=!0)}else N=bt(y.G[0],y.H[0],h);if(h.h)break;if(w||256>N){if(!w)if(y.nd)r[f]=(y.qb|N<<8)>>>0;else{if(S(h),w=bt(y.G[1],y.H[1],h),S(h),_=bt(y.G[2],y.H[2],h),P=bt(y.G[3],y.H[3],h),h.h)break;r[f]=(P<<24|w<<16|N<<8|_)>>>0}if(w=!1,++f,++u>=i&&(u=0,++c,null!=s&&c<=o&&!(c%16)&&s(t,c),null!=v))for(;d<f;)N=r[d++],v.X[(506832829*N&4294967295)>>>v.Mb]=N}else if(280>N){if(N=mt(N-256,h),_=bt(y.G[4],y.H[4],h),S(h),_=vt(i,_=mt(_,h)),h.h)break;if(f-n<_||a-f<N)break t;for(P=0;P<N;++P)r[f+P]=r[f+P-_];for(f+=N,u+=N;u>=i;)u-=i,++c,null!=s&&c<=o&&!(c%16)&&s(t,c);if(e(f<=a),u&b&&(y=wt(l,u,c)),null!=v)for(;d<f;)N=r[d++],v.X[(506832829*N&4294967295)>>>v.Mb]=N}else{if(!(N<g))break t;for(w=N-280,e(null!=v);d<f;)N=r[d++],v.X[(506832829*N&4294967295)>>>v.Mb]=N;N=f,e(!(w>>>(_=v).Xa)),r[N]=_.X[w],w=!0}w||e(h.h==A(h))}if(t.Pb&&h.h&&f<a)e(t.m.h),t.a=5,t.m=t.wd,t.$=t.xd,0<t.s.ua&&B(t.s.vb,t.s.Wa);else{if(h.h)break t;null!=s&&s(t,c>o?o:c),t.a=0,t.$=f-n}return 1}return t.a=3,0}function Pt(t){e(null!=t),t.vc=null,t.yc=null,t.Ya=null;var r=t.Wa;null!=r&&(r.X=null),t.vb=null,e(null!=t)}function kt(){var e=new or;return null==e?null:(e.a=0,e.xb=gi,rt("Predictor","VP8LPredictors"),rt("Predictor","VP8LPredictors_C"),rt("PredictorAdd","VP8LPredictorsAdd"),rt("PredictorAdd","VP8LPredictorsAdd_C"),Gr=G,$r=J,Qr=K,tn=Z,en=$,rn=Q,nn=tt,t.VP8LMapColor32b=Jr,t.VP8LMapColor8b=Kr,e)}function It(t,r,n,s,c){var u=1,f=[t],p=[r],g=s.m,m=s.s,v=null,b=0;t:for(;;){if(n)for(;u&&y(g,1);){var w=f,N=p,A=s,_=1,P=A.m,k=A.gc[A.ab],I=y(P,2);if(A.Oc&1<<I)u=0;else{switch(A.Oc|=1<<I,k.hc=I,k.Ea=w[0],k.nc=N[0],k.K=[null],++A.ab,e(4>=A.ab),I){case 0:case 1:k.b=y(P,3)+2,_=It(q(k.Ea,k.b),q(k.nc,k.b),0,A,k.K),k.K=k.K[0];break;case 3:var F,C=y(P,8)+1,j=16<C?0:4<C?1:2<C?2:3;if(w[0]=q(k.Ea,j),k.b=j,F=_=It(C,1,0,A,k.K)){var B,M=C,E=k,R=1<<(8>>E.b),T=a(R);if(null==T)F=0;else{var U=E.K[0],z=E.w;for(T[0]=E.K[0][0],B=1;B<1*M;++B)T[B]=D(U[z+B],T[B-1]);for(;B<4*R;++B)T[B]=0;E.K[0]=null,E.K[0]=T,F=1}}_=F;break;case 2:break;default:e(0)}u=_}}if(f=f[0],p=p[0],u&&y(g,1)&&!(u=1<=(b=y(g,4))&&11>=b)){s.a=3;break t}var H;if(H=u)e:{var W,V,G,Y=s,J=f,X=p,K=b,Z=n,$=Y.m,Q=Y.s,tt=[null],et=1,rt=0,nt=Qn[K];r:for(;;){if(Z&&y($,1)){var it=y($,3)+2,at=q(J,it),ot=q(X,it),st=at*ot;if(!It(at,ot,0,Y,tt))break r;for(tt=tt[0],Q.xc=it,W=0;W<st;++W){var ct=tt[W]>>8&65535;tt[W]=ct,ct>=et&&(et=ct+1)}}if($.h)break r;for(V=0;5>V;++V){var ut=Xn[V];!V&&0<K&&(ut+=1<<K),rt<ut&&(rt=ut)}var ht=o(et*nt,l),lt=et,ft=o(lt,d);if(null==ft)var dt=null;else e(65536>=lt),dt=ft;var pt=a(rt);if(null==dt||null==pt||null==ht){Y.a=1;break r}var gt=ht;for(W=G=0;W<et;++W){var mt=dt[W],vt=mt.G,bt=mt.H,wt=0,Nt=1,Lt=0;for(V=0;5>V;++V){ut=Xn[V],vt[V]=gt,bt[V]=G,!V&&0<K&&(ut+=1<<K);n:{var At,xt=ut,St=Y,kt=pt,Ft=gt,Ct=G,jt=0,Ot=St.m,Bt=y(Ot,1);if(i(kt,0,0,xt),Bt){var Mt=y(Ot,1)+1,Et=y(Ot,1),qt=y(Ot,0==Et?1:8);kt[qt]=1,2==Mt&&(kt[qt=y(Ot,8)]=1);var Dt=1}else{var Rt=a(19),Tt=y(Ot,4)+4;if(19<Tt){St.a=3;var Ut=0;break n}for(At=0;At<Tt;++At)Rt[Zn[At]]=y(Ot,3);var zt=void 0,Ht=void 0,Wt=St,Vt=Rt,Gt=xt,Yt=kt,Jt=0,Xt=Wt.m,Kt=8,Zt=o(128,l);i:for(;h(Zt,0,7,Vt,19);){if(y(Xt,1)){var $t=2+2*y(Xt,3);if((zt=2+y(Xt,$t))>Gt)break i}else zt=Gt;for(Ht=0;Ht<Gt&&zt--;){S(Xt);var Qt=Zt[0+(127&L(Xt))];x(Xt,Xt.u+Qt.g);var te=Qt.value;if(16>te)Yt[Ht++]=te,0!=te&&(Kt=te);else{var ee=16==te,re=te-16,ne=Jn[re],ie=y(Xt,Yn[re])+ne;if(Ht+ie>Gt)break i;for(var ae=ee?Kt:0;0<ie--;)Yt[Ht++]=ae}}Jt=1;break i}Jt||(Wt.a=3),Dt=Jt}(Dt=Dt&&!Ot.h)&&(jt=h(Ft,Ct,8,kt,xt)),Dt&&0!=jt?Ut=jt:(St.a=3,Ut=0)}if(0==Ut)break r;if(Nt&&1==Kn[V]&&(Nt=0==gt[G].g),wt+=gt[G].g,G+=Ut,3>=V){var oe,se=pt[0];for(oe=1;oe<ut;++oe)pt[oe]>se&&(se=pt[oe]);Lt+=se}}if(mt.nd=Nt,mt.Qb=0,Nt&&(mt.qb=(vt[3][bt[3]+0].value<<24|vt[1][bt[1]+0].value<<16|vt[2][bt[2]+0].value)>>>0,0==wt&&256>vt[0][bt[0]+0].value&&(mt.Qb=1,mt.qb+=vt[0][bt[0]+0].value<<8)),mt.jc=!mt.Qb&&6>Lt,mt.jc){var ce,ue=mt;for(ce=0;ce<Dr;++ce){var he=ce,le=ue.pd[he],fe=ue.G[0][ue.H[0]+he];256<=fe.value?(le.g=fe.g+256,le.value=fe.value):(le.g=0,le.value=0,he>>=yt(fe,8,le),he>>=yt(ue.G[1][ue.H[1]+he],16,le),he>>=yt(ue.G[2][ue.H[2]+he],0,le),yt(ue.G[3][ue.H[3]+he],24,le))}}}Q.vc=tt,Q.Wb=et,Q.Ya=dt,Q.yc=ht,H=1;break e}H=0}if(!(u=H)){s.a=3;break t}if(0<b){if(m.ua=1<<b,!O(m.Wa,b)){s.a=1,u=0;break t}}else m.ua=0;var de=s,pe=f,ge=p,me=de.s,ve=me.xc;if(de.c=pe,de.i=ge,me.md=q(pe,ve),me.wc=0==ve?-1:(1<<ve)-1,n){s.xb=pi;break t}if(null==(v=a(f*p))){s.a=1,u=0;break t}u=(u=_t(s,v,0,f,p,p,null))&&!g.h;break t}return u?(null!=c?c[0]=v:(e(null==v),e(n)),s.$=0,n||Pt(m)):Pt(m),u}function Ft(t,r){var n=t.c*t.i,i=n+r+16*r;return e(t.c<=r),t.V=a(i),null==t.V?(t.Ta=null,t.Ua=0,t.a=1,0):(t.Ta=t.V,t.Ua=t.Ba+n+r,1)}function Ct(t,r){var n=t.C,i=r-n,a=t.V,o=t.Ba+t.c*n;for(e(r<=t.l.o);0<i;){var s=16<i?16:i,c=t.l.ma,u=t.l.width,h=u*s,l=c.ca,f=c.tb+u*n,d=t.Ta,p=t.Ua;Nt(t,s,a,o),_n(d,p,l,f,h),xt(c,n,n+s,l,f,u),i-=s,a+=s*t.c,n+=s}e(n==r),t.C=t.Ma=r}function jt(){this.ub=this.yd=this.td=this.Rb=0}function Ot(){this.Kd=this.Ld=this.Ud=this.Td=this.i=this.c=0}function Bt(){this.Fb=this.Bb=this.Cb=0,this.Zb=a(4),this.Lb=a(4)}function Mt(){this.Yb=function(){var t=[];return function t(e,r,n){for(var i=n[r],a=0;a<i&&(e.push(n.length>r+1?[]:0),!(n.length<r+1));a++)t(e[a],r+1,n)}(t,0,[3,11]),t}()}function Et(){this.jb=a(3),this.Wc=s([4,8],Mt),this.Xc=s([4,17],Mt)}function qt(){this.Pc=this.wb=this.Tb=this.zd=0,this.vd=new a(4),this.od=new a(4)}function Dt(){this.ld=this.La=this.dd=this.tc=0}function Rt(){this.Na=this.la=0}function Tt(){this.Sc=[0,0],this.Eb=[0,0],this.Qc=[0,0],this.ia=this.lc=0}function Ut(){this.ad=a(384),this.Za=0,this.Ob=a(16),this.$b=this.Ad=this.ia=this.Gc=this.Hc=this.Dd=0}function zt(){this.uc=this.M=this.Nb=0,this.wa=Array(new Dt),this.Y=0,this.ya=Array(new Ut),this.aa=0,this.l=new Gt}function Ht(){this.y=a(16),this.f=a(8),this.ea=a(8)}function Wt(){this.cb=this.a=0,this.sc="",this.m=new w,this.Od=new jt,this.Kc=new Ot,this.ed=new qt,this.Qa=new Bt,this.Ic=this.$c=this.Aa=0,this.D=new zt,this.Xb=this.Va=this.Hb=this.zb=this.yb=this.Ub=this.za=0,this.Jc=o(8,w),this.ia=0,this.pb=o(4,Tt),this.Pa=new Et,this.Bd=this.kc=0,this.Ac=[],this.Bc=0,this.zc=[0,0,0,0],this.Gd=Array(new Ht),this.Hd=0,this.rb=Array(new Rt),this.sb=0,this.wa=Array(new Dt),this.Y=0,this.oc=[],this.pc=0,this.sa=[],this.ta=0,this.qa=[],this.ra=0,this.Ha=[],this.B=this.R=this.Ia=0,this.Ec=[],this.M=this.ja=this.Vb=this.Fc=0,this.ya=Array(new Ut),this.L=this.aa=0,this.gd=s([4,2],Dt),this.ga=null,this.Fa=[],this.Cc=this.qc=this.P=0,this.Gb=[],this.Uc=0,this.mb=[],this.nb=0,this.rc=[],this.Ga=this.Vc=0}function Vt(t,e){return 0>t?0:t>e?e:t}function Gt(){this.T=this.U=this.ka=this.height=this.width=0,this.y=[],this.f=[],this.ea=[],this.Rc=this.fa=this.W=this.N=this.O=0,this.ma="void",this.put="VP8IoPutHook",this.ac="VP8IoSetupHook",this.bc="VP8IoTeardownHook",this.ha=this.Kb=0,this.data=[],this.hb=this.ib=this.da=this.o=this.j=this.va=this.v=this.Da=this.ob=this.w=0,this.F=[],this.J=0}function Yt(){var t=new Wt;return null!=t&&(t.a=0,t.sc="OK",t.cb=0,t.Xb=0,ni||(ni=Zt)),t}function Jt(t,e,r){return 0==t.a&&(t.a=e,t.sc=r,t.cb=0),0}function Xt(t,e,r){return 3<=r&&157==t[e+0]&&1==t[e+1]&&42==t[e+2]}function Kt(t,r){if(null==t)return 0;if(t.a=0,t.sc="OK",null==r)return Jt(t,2,"null VP8Io passed to VP8GetHeaders()");var n=r.data,a=r.w,o=r.ha;if(4>o)return Jt(t,7,"Truncated header.");var s=n[a+0]|n[a+1]<<8|n[a+2]<<16,c=t.Od;if(c.Rb=!(1&s),c.td=s>>1&7,c.yd=s>>4&1,c.ub=s>>5,3<c.td)return Jt(t,3,"Incorrect keyframe parameters.");if(!c.yd)return Jt(t,4,"Frame not displayable.");a+=3,o-=3;var u=t.Kc;if(c.Rb){if(7>o)return Jt(t,7,"cannot parse picture header");if(!Xt(n,a,o))return Jt(t,3,"Bad code word");u.c=16383&(n[a+4]<<8|n[a+3]),u.Td=n[a+4]>>6,u.i=16383&(n[a+6]<<8|n[a+5]),u.Ud=n[a+6]>>6,a+=7,o-=7,t.za=u.c+15>>4,t.Ub=u.i+15>>4,r.width=u.c,r.height=u.i,r.Da=0,r.j=0,r.v=0,r.va=r.width,r.o=r.height,r.da=0,r.ib=r.width,r.hb=r.height,r.U=r.width,r.T=r.height,i((s=t.Pa).jb,0,255,s.jb.length),e(null!=(s=t.Qa)),s.Cb=0,s.Bb=0,s.Fb=1,i(s.Zb,0,0,s.Zb.length),i(s.Lb,0,0,s.Lb)}if(c.ub>o)return Jt(t,7,"bad partition length");p(s=t.m,n,a,c.ub),a+=c.ub,o-=c.ub,c.Rb&&(u.Ld=P(s),u.Kd=P(s)),u=t.Qa;var h,l=t.Pa;if(e(null!=s),e(null!=u),u.Cb=P(s),u.Cb){if(u.Bb=P(s),P(s)){for(u.Fb=P(s),h=0;4>h;++h)u.Zb[h]=P(s)?m(s,7):0;for(h=0;4>h;++h)u.Lb[h]=P(s)?m(s,6):0}if(u.Bb)for(h=0;3>h;++h)l.jb[h]=P(s)?g(s,8):255}else u.Bb=0;if(s.Ka)return Jt(t,3,"cannot parse segment header");if((u=t.ed).zd=P(s),u.Tb=g(s,6),u.wb=g(s,3),u.Pc=P(s),u.Pc&&P(s)){for(l=0;4>l;++l)P(s)&&(u.vd[l]=m(s,6));for(l=0;4>l;++l)P(s)&&(u.od[l]=m(s,6))}if(t.L=0==u.Tb?0:u.zd?1:2,s.Ka)return Jt(t,3,"cannot parse filter header");var f=o;if(o=h=a,a=h+f,u=f,t.Xb=(1<<g(t.m,2))-1,f<3*(l=t.Xb))n=7;else{for(h+=3*l,u-=3*l,f=0;f<l;++f){var d=n[o+0]|n[o+1]<<8|n[o+2]<<16;d>u&&(d=u),p(t.Jc[+f],n,h,d),h+=d,u-=d,o+=3}p(t.Jc[+l],n,h,u),n=h<a?0:5}if(0!=n)return Jt(t,n,"cannot parse partitions");for(n=g(h=t.m,7),o=P(h)?m(h,4):0,a=P(h)?m(h,4):0,u=P(h)?m(h,4):0,l=P(h)?m(h,4):0,h=P(h)?m(h,4):0,f=t.Qa,d=0;4>d;++d){if(f.Cb){var v=f.Zb[d];f.Fb||(v+=n)}else{if(0<d){t.pb[d]=t.pb[0];continue}v=n}var b=t.pb[d];b.Sc[0]=ei[Vt(v+o,127)],b.Sc[1]=ri[Vt(v+0,127)],b.Eb[0]=2*ei[Vt(v+a,127)],b.Eb[1]=101581*ri[Vt(v+u,127)]>>16,8>b.Eb[1]&&(b.Eb[1]=8),b.Qc[0]=ei[Vt(v+l,117)],b.Qc[1]=ri[Vt(v+h,127)],b.lc=v+h}if(!c.Rb)return Jt(t,4,"Not a key frame.");for(P(s),c=t.Pa,n=0;4>n;++n){for(o=0;8>o;++o)for(a=0;3>a;++a)for(u=0;11>u;++u)l=k(s,ui[n][o][a][u])?g(s,8):si[n][o][a][u],c.Wc[n][o].Yb[a][u]=l;for(o=0;17>o;++o)c.Xc[n][o]=c.Wc[n][hi[o]]}return t.kc=P(s),t.kc&&(t.Bd=g(s,8)),t.cb=1}function Zt(t,e,r,n,i,a,o){var s=e[i].Yb[r];for(r=0;16>i;++i){if(!k(t,s[r+0]))return i;for(;!k(t,s[r+1]);)if(s=e[++i].Yb[0],r=0,16==i)return 16;var c=e[i+1].Yb;if(k(t,s[r+2])){var u=t,h=0;if(k(u,(f=s)[(l=r)+3]))if(k(u,f[l+6])){for(s=0,l=2*(h=k(u,f[l+8]))+(f=k(u,f[l+9+h])),h=0,f=ii[l];f[s];++s)h+=h+k(u,f[s]);h+=3+(8<<l)}else k(u,f[l+7])?(h=7+2*k(u,165),h+=k(u,145)):h=5+k(u,159);else h=k(u,f[l+4])?3+k(u,f[l+5]):2;s=c[2]}else h=1,s=c[1];c=o+ai[i],0>(u=t).b&&_(u);var l,f=u.b,d=(l=u.Ca>>1)-(u.I>>f)>>31;--u.b,u.Ca+=d,u.Ca|=1,u.I-=(l+1&d)<<f,a[c]=((h^d)-d)*n[(0<i)+0]}return 16}function $t(t){var e=t.rb[t.sb-1];e.la=0,e.Na=0,i(t.zc,0,0,t.zc.length),t.ja=0}function Qt(t,r){if(null==t)return 0;if(null==r)return Jt(t,2,"NULL VP8Io parameter in VP8Decode().");if(!t.cb&&!Kt(t,r))return 0;if(e(t.cb),null==r.ac||r.ac(r)){r.ob&&(t.L=0);var s=Ri[t.L];if(2==t.L?(t.yb=0,t.zb=0):(t.yb=r.v-s>>4,t.zb=r.j-s>>4,0>t.yb&&(t.yb=0),0>t.zb&&(t.zb=0)),t.Va=r.o+15+s>>4,t.Hb=r.va+15+s>>4,t.Hb>t.za&&(t.Hb=t.za),t.Va>t.Ub&&(t.Va=t.Ub),0<t.L){var c=t.ed;for(s=0;4>s;++s){var u;if(t.Qa.Cb){var h=t.Qa.Lb[s];t.Qa.Fb||(h+=c.Tb)}else h=c.Tb;for(u=0;1>=u;++u){var l=t.gd[s][u],f=h;if(c.Pc&&(f+=c.vd[0],u&&(f+=c.od[0])),0<(f=0>f?0:63<f?63:f)){var d=f;0<c.wb&&((d=4<c.wb?d>>2:d>>1)>9-c.wb&&(d=9-c.wb)),1>d&&(d=1),l.dd=d,l.tc=2*f+d,l.ld=40<=f?2:15<=f?1:0}else l.tc=0;l.La=u}}}s=0}else Jt(t,6,"Frame setup failed"),s=t.a;if(s=0==s){if(s){t.$c=0,0<t.Aa||(t.Ic=Ui);t:{s=t.Ic;c=4*(d=t.za);var p=32*d,g=d+1,m=0<t.L?d*(0<t.Aa?2:1):0,v=(2==t.Aa?2:1)*d;if((l=c+832+(u=3*(16*s+Ri[t.L])/2*p)+(h=null!=t.Fa&&0<t.Fa.length?t.Kc.c*t.Kc.i:0))!=l)s=0;else{if(l>t.Vb){if(t.Vb=0,t.Ec=a(l),t.Fc=0,null==t.Ec){s=Jt(t,1,"no memory during frame initialization.");break t}t.Vb=l}l=t.Ec,f=t.Fc,t.Ac=l,t.Bc=f,f+=c,t.Gd=o(p,Ht),t.Hd=0,t.rb=o(g+1,Rt),t.sb=1,t.wa=m?o(m,Dt):null,t.Y=0,t.D.Nb=0,t.D.wa=t.wa,t.D.Y=t.Y,0<t.Aa&&(t.D.Y+=d),e(!0),t.oc=l,t.pc=f,f+=832,t.ya=o(v,Ut),t.aa=0,t.D.ya=t.ya,t.D.aa=t.aa,2==t.Aa&&(t.D.aa+=d),t.R=16*d,t.B=8*d,d=(p=Ri[t.L])*t.R,p=p/2*t.B,t.sa=l,t.ta=f+d,t.qa=t.sa,t.ra=t.ta+16*s*t.R+p,t.Ha=t.qa,t.Ia=t.ra+8*s*t.B+p,t.$c=0,f+=u,t.mb=h?l:null,t.nb=h?f:null,e(f+h<=t.Fc+t.Vb),$t(t),i(t.Ac,t.Bc,0,c),s=1}}if(s){if(r.ka=0,r.y=t.sa,r.O=t.ta,r.f=t.qa,r.N=t.ra,r.ea=t.Ha,r.Vd=t.Ia,r.fa=t.R,r.Rc=t.B,r.F=null,r.J=0,!Cn){for(s=-255;255>=s;++s)Pn[255+s]=0>s?-s:s;for(s=-1020;1020>=s;++s)kn[1020+s]=-128>s?-128:127<s?127:s;for(s=-112;112>=s;++s)In[112+s]=-16>s?-16:15<s?15:s;for(s=-255;510>=s;++s)Fn[255+s]=0>s?0:255<s?255:s;Cn=1}an=ue,on=ae,cn=oe,un=se,hn=ce,sn=ie,ln=Je,fn=Xe,dn=$e,pn=Qe,gn=Ke,mn=Ze,vn=tr,bn=er,yn=ze,wn=He,Nn=We,Ln=Ve,fi[0]=xe,fi[1]=le,fi[2]=Le,fi[3]=Ae,fi[4]=Se,fi[5]=Pe,fi[6]=_e,fi[7]=ke,fi[8]=Fe,fi[9]=Ie,li[0]=ve,li[1]=de,li[2]=pe,li[3]=ge,li[4]=be,li[5]=ye,li[6]=we,di[0]=Be,di[1]=fe,di[2]=Ce,di[3]=je,di[4]=Ee,di[5]=Me,di[6]=qe,s=1}else s=0}s&&(s=function(t,r){for(t.M=0;t.M<t.Va;++t.M){var o,s=t.Jc[t.M&t.Xb],c=t.m,u=t;for(o=0;o<u.za;++o){var h=c,l=u,f=l.Ac,d=l.Bc+4*o,p=l.zc,g=l.ya[l.aa+o];if(l.Qa.Bb?g.$b=k(h,l.Pa.jb[0])?2+k(h,l.Pa.jb[2]):k(h,l.Pa.jb[1]):g.$b=0,l.kc&&(g.Ad=k(h,l.Bd)),g.Za=!k(h,145)+0,g.Za){var m=g.Ob,v=0;for(l=0;4>l;++l){var b,y=p[0+l];for(b=0;4>b;++b){y=ci[f[d+b]][y];for(var w=oi[k(h,y[0])];0<w;)w=oi[2*w+k(h,y[w])];y=-w,f[d+b]=y}n(m,v,f,d,4),v+=4,p[0+l]=y}}else y=k(h,156)?k(h,128)?1:3:k(h,163)?2:0,g.Ob[0]=y,i(f,d,y,4),i(p,0,y,4);g.Dd=k(h,142)?k(h,114)?k(h,183)?1:3:2:0}if(u.m.Ka)return Jt(t,7,"Premature end-of-partition0 encountered.");for(;t.ja<t.za;++t.ja){if(u=s,h=(c=t).rb[c.sb-1],f=c.rb[c.sb+c.ja],o=c.ya[c.aa+c.ja],d=c.kc?o.Ad:0)h.la=f.la=0,o.Za||(h.Na=f.Na=0),o.Hc=0,o.Gc=0,o.ia=0;else{var N,L;h=f,f=u,d=c.Pa.Xc,p=c.ya[c.aa+c.ja],g=c.pb[p.$b];if(l=p.ad,m=0,v=c.rb[c.sb-1],y=b=0,i(l,m,0,384),p.Za)var A=0,x=d[3];else{w=a(16);var S=h.Na+v.Na;if(S=ni(f,d[1],S,g.Eb,0,w,0),h.Na=v.Na=(0<S)+0,1<S)an(w,0,l,m);else{var _=w[0]+3>>3;for(w=0;256>w;w+=16)l[m+w]=_}A=1,x=d[0]}var P=15&h.la,I=15&v.la;for(w=0;4>w;++w){var F=1&I;for(_=L=0;4>_;++_)P=P>>1|(F=(S=ni(f,x,S=F+(1&P),g.Sc,A,l,m))>A)<<7,L=L<<2|(3<S?3:1<S?2:0!=l[m+0]),m+=16;P>>=4,I=I>>1|F<<7,b=(b<<8|L)>>>0}for(x=P,A=I>>4,N=0;4>N;N+=2){for(L=0,P=h.la>>4+N,I=v.la>>4+N,w=0;2>w;++w){for(F=1&I,_=0;2>_;++_)S=F+(1&P),P=P>>1|(F=0<(S=ni(f,d[2],S,g.Qc,0,l,m)))<<3,L=L<<2|(3<S?3:1<S?2:0!=l[m+0]),m+=16;P>>=2,I=I>>1|F<<5}y|=L<<4*N,x|=P<<4<<N,A|=(240&I)<<N}h.la=x,v.la=A,p.Hc=b,p.Gc=y,p.ia=43690&y?0:g.ia,d=!(b|y)}if(0<c.L&&(c.wa[c.Y+c.ja]=c.gd[o.$b][o.Za],c.wa[c.Y+c.ja].La|=!d),u.Ka)return Jt(t,7,"Premature end-of-file encountered.")}if($t(t),c=r,u=1,o=(s=t).D,h=0<s.L&&s.M>=s.zb&&s.M<=s.Va,0==s.Aa)t:{if(o.M=s.M,o.uc=h,Or(s,o),u=1,o=(L=s.D).Nb,h=(y=Ri[s.L])*s.R,f=y/2*s.B,w=16*o*s.R,_=8*o*s.B,d=s.sa,p=s.ta-h+w,g=s.qa,l=s.ra-f+_,m=s.Ha,v=s.Ia-f+_,I=0==(P=L.M),b=P>=s.Va-1,2==s.Aa&&Or(s,L),L.uc)for(F=(S=s).D.M,e(S.D.uc),L=S.yb;L<S.Hb;++L){A=L,x=F;var C=(j=(U=S).D).Nb;N=U.R;var j=j.wa[j.Y+A],O=U.sa,B=U.ta+16*C*N+16*A,M=j.dd,E=j.tc;if(0!=E)if(e(3<=E),1==U.L)0<A&&wn(O,B,N,E+4),j.La&&Ln(O,B,N,E),0<x&&yn(O,B,N,E+4),j.La&&Nn(O,B,N,E);else{var q=U.B,D=U.qa,R=U.ra+8*C*q+8*A,T=U.Ha,U=U.Ia+8*C*q+8*A;C=j.ld;0<A&&(fn(O,B,N,E+4,M,C),pn(D,R,T,U,q,E+4,M,C)),j.La&&(mn(O,B,N,E,M,C),bn(D,R,T,U,q,E,M,C)),0<x&&(ln(O,B,N,E+4,M,C),dn(D,R,T,U,q,E+4,M,C)),j.La&&(gn(O,B,N,E,M,C),vn(D,R,T,U,q,E,M,C))}}if(s.ia&&alert("todo:DitherRow"),null!=c.put){if(L=16*P,P=16*(P+1),I?(c.y=s.sa,c.O=s.ta+w,c.f=s.qa,c.N=s.ra+_,c.ea=s.Ha,c.W=s.Ia+_):(L-=y,c.y=d,c.O=p,c.f=g,c.N=l,c.ea=m,c.W=v),b||(P-=y),P>c.o&&(P=c.o),c.F=null,c.J=null,null!=s.Fa&&0<s.Fa.length&&L<P&&(c.J=lr(s,c,L,P-L),c.F=s.mb,null==c.F&&0==c.F.length)){u=Jt(s,3,"Could not decode alpha data.");break t}L<c.j&&(y=c.j-L,L=c.j,e(!(1&y)),c.O+=s.R*y,c.N+=s.B*(y>>1),c.W+=s.B*(y>>1),null!=c.F&&(c.J+=c.width*y)),L<P&&(c.O+=c.v,c.N+=c.v>>1,c.W+=c.v>>1,null!=c.F&&(c.J+=c.v),c.ka=L-c.j,c.U=c.va-c.v,c.T=P-L,u=c.put(c))}o+1!=s.Ic||b||(n(s.sa,s.ta-h,d,p+16*s.R,h),n(s.qa,s.ra-f,g,l+8*s.B,f),n(s.Ha,s.Ia-f,m,v+8*s.B,f))}if(!u)return Jt(t,6,"Output aborted.")}return 1}(t,r)),null!=r.bc&&r.bc(r),s&=1}return s?(t.cb=0,s):0}function te(t,e,r,n,i){i=t[e+r+32*n]+(i>>3),t[e+r+32*n]=-256&i?0>i?0:255:i}function ee(t,e,r,n,i,a){te(t,e,0,r,n+i),te(t,e,1,r,n+a),te(t,e,2,r,n-a),te(t,e,3,r,n-i)}function re(t){return(20091*t>>16)+t}function ne(t,e,r,n){var i,o=0,s=a(16);for(i=0;4>i;++i){var c=t[e+0]+t[e+8],u=t[e+0]-t[e+8],h=(35468*t[e+4]>>16)-re(t[e+12]),l=re(t[e+4])+(35468*t[e+12]>>16);s[o+0]=c+l,s[o+1]=u+h,s[o+2]=u-h,s[o+3]=c-l,o+=4,e++}for(i=o=0;4>i;++i)c=(t=s[o+0]+4)+s[o+8],u=t-s[o+8],h=(35468*s[o+4]>>16)-re(s[o+12]),te(r,n,0,0,c+(l=re(s[o+4])+(35468*s[o+12]>>16))),te(r,n,1,0,u+h),te(r,n,2,0,u-h),te(r,n,3,0,c-l),o++,n+=32}function ie(t,e,r,n){var i=t[e+0]+4,a=35468*t[e+4]>>16,o=re(t[e+4]),s=35468*t[e+1]>>16;ee(r,n,0,i+o,t=re(t[e+1]),s),ee(r,n,1,i+a,t,s),ee(r,n,2,i-a,t,s),ee(r,n,3,i-o,t,s)}function ae(t,e,r,n,i){ne(t,e,r,n),i&&ne(t,e+16,r,n+4)}function oe(t,e,r,n){on(t,e+0,r,n,1),on(t,e+32,r,n+128,1)}function se(t,e,r,n){var i;for(t=t[e+0]+4,i=0;4>i;++i)for(e=0;4>e;++e)te(r,n,e,i,t)}function ce(t,e,r,n){t[e+0]&&un(t,e+0,r,n),t[e+16]&&un(t,e+16,r,n+4),t[e+32]&&un(t,e+32,r,n+128),t[e+48]&&un(t,e+48,r,n+128+4)}function ue(t,e,r,n){var i,o=a(16);for(i=0;4>i;++i){var s=t[e+0+i]+t[e+12+i],c=t[e+4+i]+t[e+8+i],u=t[e+4+i]-t[e+8+i],h=t[e+0+i]-t[e+12+i];o[0+i]=s+c,o[8+i]=s-c,o[4+i]=h+u,o[12+i]=h-u}for(i=0;4>i;++i)s=(t=o[0+4*i]+3)+o[3+4*i],c=o[1+4*i]+o[2+4*i],u=o[1+4*i]-o[2+4*i],h=t-o[3+4*i],r[n+0]=s+c>>3,r[n+16]=h+u>>3,r[n+32]=s-c>>3,r[n+48]=h-u>>3,n+=64}function he(t,e,r){var n,i=e-32,a=Bn,o=255-t[i-1];for(n=0;n<r;++n){var s,c=a,u=o+t[e-1];for(s=0;s<r;++s)t[e+s]=c[u+t[i+s]];e+=32}}function le(t,e){he(t,e,4)}function fe(t,e){he(t,e,8)}function de(t,e){he(t,e,16)}function pe(t,e){var r;for(r=0;16>r;++r)n(t,e+32*r,t,e-32,16)}function ge(t,e){var r;for(r=16;0<r;--r)i(t,e,t[e-1],16),e+=32}function me(t,e,r){var n;for(n=0;16>n;++n)i(e,r+32*n,t,16)}function ve(t,e){var r,n=16;for(r=0;16>r;++r)n+=t[e-1+32*r]+t[e+r-32];me(n>>5,t,e)}function be(t,e){var r,n=8;for(r=0;16>r;++r)n+=t[e-1+32*r];me(n>>4,t,e)}function ye(t,e){var r,n=8;for(r=0;16>r;++r)n+=t[e+r-32];me(n>>4,t,e)}function we(t,e){me(128,t,e)}function Ne(t,e,r){return t+2*e+r+2>>2}function Le(t,e){var r,i=e-32;i=new Uint8Array([Ne(t[i-1],t[i+0],t[i+1]),Ne(t[i+0],t[i+1],t[i+2]),Ne(t[i+1],t[i+2],t[i+3]),Ne(t[i+2],t[i+3],t[i+4])]);for(r=0;4>r;++r)n(t,e+32*r,i,0,i.length)}function Ae(t,e){var r=t[e-1],n=t[e-1+32],i=t[e-1+64],a=t[e-1+96];I(t,e+0,16843009*Ne(t[e-1-32],r,n)),I(t,e+32,16843009*Ne(r,n,i)),I(t,e+64,16843009*Ne(n,i,a)),I(t,e+96,16843009*Ne(i,a,a))}function xe(t,e){var r,n=4;for(r=0;4>r;++r)n+=t[e+r-32]+t[e-1+32*r];for(n>>=3,r=0;4>r;++r)i(t,e+32*r,n,4)}function Se(t,e){var r=t[e-1+0],n=t[e-1+32],i=t[e-1+64],a=t[e-1-32],o=t[e+0-32],s=t[e+1-32],c=t[e+2-32],u=t[e+3-32];t[e+0+96]=Ne(n,i,t[e-1+96]),t[e+1+96]=t[e+0+64]=Ne(r,n,i),t[e+2+96]=t[e+1+64]=t[e+0+32]=Ne(a,r,n),t[e+3+96]=t[e+2+64]=t[e+1+32]=t[e+0+0]=Ne(o,a,r),t[e+3+64]=t[e+2+32]=t[e+1+0]=Ne(s,o,a),t[e+3+32]=t[e+2+0]=Ne(c,s,o),t[e+3+0]=Ne(u,c,s)}function _e(t,e){var r=t[e+1-32],n=t[e+2-32],i=t[e+3-32],a=t[e+4-32],o=t[e+5-32],s=t[e+6-32],c=t[e+7-32];t[e+0+0]=Ne(t[e+0-32],r,n),t[e+1+0]=t[e+0+32]=Ne(r,n,i),t[e+2+0]=t[e+1+32]=t[e+0+64]=Ne(n,i,a),t[e+3+0]=t[e+2+32]=t[e+1+64]=t[e+0+96]=Ne(i,a,o),t[e+3+32]=t[e+2+64]=t[e+1+96]=Ne(a,o,s),t[e+3+64]=t[e+2+96]=Ne(o,s,c),t[e+3+96]=Ne(s,c,c)}function Pe(t,e){var r=t[e-1+0],n=t[e-1+32],i=t[e-1+64],a=t[e-1-32],o=t[e+0-32],s=t[e+1-32],c=t[e+2-32],u=t[e+3-32];t[e+0+0]=t[e+1+64]=a+o+1>>1,t[e+1+0]=t[e+2+64]=o+s+1>>1,t[e+2+0]=t[e+3+64]=s+c+1>>1,t[e+3+0]=c+u+1>>1,t[e+0+96]=Ne(i,n,r),t[e+0+64]=Ne(n,r,a),t[e+0+32]=t[e+1+96]=Ne(r,a,o),t[e+1+32]=t[e+2+96]=Ne(a,o,s),t[e+2+32]=t[e+3+96]=Ne(o,s,c),t[e+3+32]=Ne(s,c,u)}function ke(t,e){var r=t[e+0-32],n=t[e+1-32],i=t[e+2-32],a=t[e+3-32],o=t[e+4-32],s=t[e+5-32],c=t[e+6-32],u=t[e+7-32];t[e+0+0]=r+n+1>>1,t[e+1+0]=t[e+0+64]=n+i+1>>1,t[e+2+0]=t[e+1+64]=i+a+1>>1,t[e+3+0]=t[e+2+64]=a+o+1>>1,t[e+0+32]=Ne(r,n,i),t[e+1+32]=t[e+0+96]=Ne(n,i,a),t[e+2+32]=t[e+1+96]=Ne(i,a,o),t[e+3+32]=t[e+2+96]=Ne(a,o,s),t[e+3+64]=Ne(o,s,c),t[e+3+96]=Ne(s,c,u)}function Ie(t,e){var r=t[e-1+0],n=t[e-1+32],i=t[e-1+64],a=t[e-1+96];t[e+0+0]=r+n+1>>1,t[e+2+0]=t[e+0+32]=n+i+1>>1,t[e+2+32]=t[e+0+64]=i+a+1>>1,t[e+1+0]=Ne(r,n,i),t[e+3+0]=t[e+1+32]=Ne(n,i,a),t[e+3+32]=t[e+1+64]=Ne(i,a,a),t[e+3+64]=t[e+2+64]=t[e+0+96]=t[e+1+96]=t[e+2+96]=t[e+3+96]=a}function Fe(t,e){var r=t[e-1+0],n=t[e-1+32],i=t[e-1+64],a=t[e-1+96],o=t[e-1-32],s=t[e+0-32],c=t[e+1-32],u=t[e+2-32];t[e+0+0]=t[e+2+32]=r+o+1>>1,t[e+0+32]=t[e+2+64]=n+r+1>>1,t[e+0+64]=t[e+2+96]=i+n+1>>1,t[e+0+96]=a+i+1>>1,t[e+3+0]=Ne(s,c,u),t[e+2+0]=Ne(o,s,c),t[e+1+0]=t[e+3+32]=Ne(r,o,s),t[e+1+32]=t[e+3+64]=Ne(n,r,o),t[e+1+64]=t[e+3+96]=Ne(i,n,r),t[e+1+96]=Ne(a,i,n)}function Ce(t,e){var r;for(r=0;8>r;++r)n(t,e+32*r,t,e-32,8)}function je(t,e){var r;for(r=0;8>r;++r)i(t,e,t[e-1],8),e+=32}function Oe(t,e,r){var n;for(n=0;8>n;++n)i(e,r+32*n,t,8)}function Be(t,e){var r,n=8;for(r=0;8>r;++r)n+=t[e+r-32]+t[e-1+32*r];Oe(n>>4,t,e)}function Me(t,e){var r,n=4;for(r=0;8>r;++r)n+=t[e+r-32];Oe(n>>3,t,e)}function Ee(t,e){var r,n=4;for(r=0;8>r;++r)n+=t[e-1+32*r];Oe(n>>3,t,e)}function qe(t,e){Oe(128,t,e)}function De(t,e,r){var n=t[e-r],i=t[e+0],a=3*(i-n)+jn[1020+t[e-2*r]-t[e+r]],o=On[112+(a+4>>3)];t[e-r]=Bn[255+n+On[112+(a+3>>3)]],t[e+0]=Bn[255+i-o]}function Re(t,e,r,n){var i=t[e+0],a=t[e+r];return Mn[255+t[e-2*r]-t[e-r]]>n||Mn[255+a-i]>n}function Te(t,e,r,n){return 4*Mn[255+t[e-r]-t[e+0]]+Mn[255+t[e-2*r]-t[e+r]]<=n}function Ue(t,e,r,n,i){var a=t[e-3*r],o=t[e-2*r],s=t[e-r],c=t[e+0],u=t[e+r],h=t[e+2*r],l=t[e+3*r];return 4*Mn[255+s-c]+Mn[255+o-u]>n?0:Mn[255+t[e-4*r]-a]<=i&&Mn[255+a-o]<=i&&Mn[255+o-s]<=i&&Mn[255+l-h]<=i&&Mn[255+h-u]<=i&&Mn[255+u-c]<=i}function ze(t,e,r,n){var i=2*n+1;for(n=0;16>n;++n)Te(t,e+n,r,i)&&De(t,e+n,r)}function He(t,e,r,n){var i=2*n+1;for(n=0;16>n;++n)Te(t,e+n*r,1,i)&&De(t,e+n*r,1)}function We(t,e,r,n){var i;for(i=3;0<i;--i)ze(t,e+=4*r,r,n)}function Ve(t,e,r,n){var i;for(i=3;0<i;--i)He(t,e+=4,r,n)}function Ge(t,e,r,n,i,a,o,s){for(a=2*a+1;0<i--;){if(Ue(t,e,r,a,o))if(Re(t,e,r,s))De(t,e,r);else{var c=t,u=e,h=r,l=c[u-2*h],f=c[u-h],d=c[u+0],p=c[u+h],g=c[u+2*h],m=27*(b=jn[1020+3*(d-f)+jn[1020+l-p]])+63>>7,v=18*b+63>>7,b=9*b+63>>7;c[u-3*h]=Bn[255+c[u-3*h]+b],c[u-2*h]=Bn[255+l+v],c[u-h]=Bn[255+f+m],c[u+0]=Bn[255+d-m],c[u+h]=Bn[255+p-v],c[u+2*h]=Bn[255+g-b]}e+=n}}function Ye(t,e,r,n,i,a,o,s){for(a=2*a+1;0<i--;){if(Ue(t,e,r,a,o))if(Re(t,e,r,s))De(t,e,r);else{var c=t,u=e,h=r,l=c[u-h],f=c[u+0],d=c[u+h],p=On[112+((g=3*(f-l))+4>>3)],g=On[112+(g+3>>3)],m=p+1>>1;c[u-2*h]=Bn[255+c[u-2*h]+m],c[u-h]=Bn[255+l+g],c[u+0]=Bn[255+f-p],c[u+h]=Bn[255+d-m]}e+=n}}function Je(t,e,r,n,i,a){Ge(t,e,r,1,16,n,i,a)}function Xe(t,e,r,n,i,a){Ge(t,e,1,r,16,n,i,a)}function Ke(t,e,r,n,i,a){var o;for(o=3;0<o;--o)Ye(t,e+=4*r,r,1,16,n,i,a)}function Ze(t,e,r,n,i,a){var o;for(o=3;0<o;--o)Ye(t,e+=4,1,r,16,n,i,a)}function $e(t,e,r,n,i,a,o,s){Ge(t,e,i,1,8,a,o,s),Ge(r,n,i,1,8,a,o,s)}function Qe(t,e,r,n,i,a,o,s){Ge(t,e,1,i,8,a,o,s),Ge(r,n,1,i,8,a,o,s)}function tr(t,e,r,n,i,a,o,s){Ye(t,e+4*i,i,1,8,a,o,s),Ye(r,n+4*i,i,1,8,a,o,s)}function er(t,e,r,n,i,a,o,s){Ye(t,e+4,1,i,8,a,o,s),Ye(r,n+4,1,i,8,a,o,s)}function rr(){this.ba=new ot,this.ec=[],this.cc=[],this.Mc=[],this.Dc=this.Nc=this.dc=this.fc=0,this.Oa=new ct,this.memory=0,this.Ib="OutputFunc",this.Jb="OutputAlphaFunc",this.Nd="OutputRowFunc"}function nr(){this.data=[],this.offset=this.kd=this.ha=this.w=0,this.na=[],this.xa=this.gb=this.Ja=this.Sa=this.P=0}function ir(){this.nc=this.Ea=this.b=this.hc=0,this.K=[],this.w=0}function ar(){this.ua=0,this.Wa=new M,this.vb=new M,this.md=this.xc=this.wc=0,this.vc=[],this.Wb=0,this.Ya=new d,this.yc=new l}function or(){this.xb=this.a=0,this.l=new Gt,this.ca=new ot,this.V=[],this.Ba=0,this.Ta=[],this.Ua=0,this.m=new N,this.Pb=0,this.wd=new N,this.Ma=this.$=this.C=this.i=this.c=this.xd=0,this.s=new ar,this.ab=0,this.gc=o(4,ir),this.Oc=0}function sr(){this.Lc=this.Z=this.$a=this.i=this.c=0,this.l=new Gt,this.ic=0,this.ca=[],this.tb=0,this.qd=null,this.rd=0}function cr(t,e,r,n,i,a,o){for(t=null==t?0:t[e+0],e=0;e<o;++e)i[a+e]=t+r[n+e]&255,t=i[a+e]}function ur(t,e,r,n,i,a,o){var s;if(null==t)cr(null,null,r,n,i,a,o);else for(s=0;s<o;++s)i[a+s]=t[e+s]+r[n+s]&255}function hr(t,e,r,n,i,a,o){if(null==t)cr(null,null,r,n,i,a,o);else{var s,c=t[e+0],u=c,h=c;for(s=0;s<o;++s)u=h+(c=t[e+s])-u,h=r[n+s]+(-256&u?0>u?0:255:u)&255,u=c,i[a+s]=h}}function lr(t,r,i,o){var s=r.width,c=r.o;if(e(null!=t&&null!=r),0>i||0>=o||i+o>c)return null;if(!t.Cc){if(null==t.ga){var u;if(t.ga=new sr,(u=null==t.ga)||(u=r.width*r.o,e(0==t.Gb.length),t.Gb=a(u),t.Uc=0,null==t.Gb?u=0:(t.mb=t.Gb,t.nb=t.Uc,t.rc=null,u=1),u=!u),!u){u=t.ga;var h=t.Fa,l=t.P,f=t.qc,d=t.mb,p=t.nb,g=l+1,m=f-1,b=u.l;if(e(null!=h&&null!=d&&null!=r),mi[0]=null,mi[1]=cr,mi[2]=ur,mi[3]=hr,u.ca=d,u.tb=p,u.c=r.width,u.i=r.height,e(0<u.c&&0<u.i),1>=f)r=0;else if(u.$a=h[l+0]>>0&3,u.Z=h[l+0]>>2&3,u.Lc=h[l+0]>>4&3,l=h[l+0]>>6&3,0>u.$a||1<u.$a||4<=u.Z||1<u.Lc||l)r=0;else if(b.put=dt,b.ac=ft,b.bc=pt,b.ma=u,b.width=r.width,b.height=r.height,b.Da=r.Da,b.v=r.v,b.va=r.va,b.j=r.j,b.o=r.o,u.$a)t:{e(1==u.$a),r=kt();e:for(;;){if(null==r){r=0;break t}if(e(null!=u),u.mc=r,r.c=u.c,r.i=u.i,r.l=u.l,r.l.ma=u,r.l.width=u.c,r.l.height=u.i,r.a=0,v(r.m,h,g,m),!It(u.c,u.i,1,r,null))break e;if(1==r.ab&&3==r.gc[0].hc&&At(r.s)?(u.ic=1,h=r.c*r.i,r.Ta=null,r.Ua=0,r.V=a(h),r.Ba=0,null==r.V?(r.a=1,r=0):r=1):(u.ic=0,r=Ft(r,u.c)),!r)break e;r=1;break t}u.mc=null,r=0}else r=m>=u.c*u.i;u=!r}if(u)return null;1!=t.ga.Lc?t.Ga=0:o=c-i}e(null!=t.ga),e(i+o<=c);t:{if(r=(h=t.ga).c,c=h.l.o,0==h.$a){if(g=t.rc,m=t.Vc,b=t.Fa,l=t.P+1+i*r,f=t.mb,d=t.nb+i*r,e(l<=t.P+t.qc),0!=h.Z)for(e(null!=mi[h.Z]),u=0;u<o;++u)mi[h.Z](g,m,b,l,f,d,r),g=f,m=d,d+=r,l+=r;else for(u=0;u<o;++u)n(f,d,b,l,r),g=f,m=d,d+=r,l+=r;t.rc=g,t.Vc=m}else{if(e(null!=h.mc),r=i+o,e(null!=(u=h.mc)),e(r<=u.i),u.C>=r)r=1;else if(h.ic||mr(),h.ic){h=u.V,g=u.Ba,m=u.c;var y=u.i,w=(b=1,l=u.$/m,f=u.$%m,d=u.m,p=u.s,u.$),N=m*y,L=m*r,x=p.wc,_=w<L?wt(p,f,l):null;e(w<=N),e(r<=y),e(At(p));e:for(;;){for(;!d.h&&w<L;){if(f&x||(_=wt(p,f,l)),e(null!=_),S(d),256>(y=bt(_.G[0],_.H[0],d)))h[g+w]=y,++w,++f>=m&&(f=0,++l<=r&&!(l%16)&&St(u,l));else{if(!(280>y)){b=0;break e}y=mt(y-256,d);var P,k=bt(_.G[4],_.H[4],d);if(S(d),!(w>=(k=vt(m,k=mt(k,d)))&&N-w>=y)){b=0;break e}for(P=0;P<y;++P)h[g+w+P]=h[g+w+P-k];for(w+=y,f+=y;f>=m;)f-=m,++l<=r&&!(l%16)&&St(u,l);w<L&&f&x&&(_=wt(p,f,l))}e(d.h==A(d))}St(u,l>r?r:l);break e}!b||d.h&&w<N?(b=0,u.a=d.h?5:3):u.$=w,r=b}else r=_t(u,u.V,u.Ba,u.c,u.i,r,Ct);if(!r){o=0;break t}}i+o>=c&&(t.Cc=1),o=1}if(!o)return null;if(t.Cc&&(null!=(o=t.ga)&&(o.mc=null),t.ga=null,0<t.Ga))return alert("todo:WebPDequantizeLevels"),null}return t.nb+i*s}function fr(t,e,r,n,i,a){for(;0<i--;){var o,s=t,c=e+(r?1:0),u=t,h=e+(r?0:3);for(o=0;o<n;++o){var l=u[h+4*o];255!=l&&(l*=32897,s[c+4*o+0]=s[c+4*o+0]*l>>23,s[c+4*o+1]=s[c+4*o+1]*l>>23,s[c+4*o+2]=s[c+4*o+2]*l>>23)}e+=a}}function dr(t,e,r,n,i){for(;0<n--;){var a;for(a=0;a<r;++a){var o=t[e+2*a+0],s=15&(u=t[e+2*a+1]),c=4369*s,u=(240&u|u>>4)*c>>16;t[e+2*a+0]=(240&o|o>>4)*c>>16&240|(15&o|o<<4)*c>>16>>4&15,t[e+2*a+1]=240&u|s}e+=i}}function pr(t,e,r,n,i,a,o,s){var c,u,h=255;for(u=0;u<i;++u){for(c=0;c<n;++c){var l=t[e+c];a[o+4*c]=l,h&=l}e+=r,o+=s}return 255!=h}function gr(t,e,r,n,i){var a;for(a=0;a<i;++a)r[n+a]=t[e+a]>>8}function mr(){An=fr,xn=dr,Sn=pr,_n=gr}function vr(r,n,i){t[r]=function(t,r,a,o,s,c,u,h,l,f,d,p,g,m,v,b,y){var w,N=y-1>>1,L=s[c+0]|u[h+0]<<16,A=l[f+0]|d[p+0]<<16;e(null!=t);var x=3*L+A+131074>>2;for(n(t[r+0],255&x,x>>16,g,m),null!=a&&(x=3*A+L+131074>>2,n(a[o+0],255&x,x>>16,v,b)),w=1;w<=N;++w){var S=s[c+w]|u[h+w]<<16,_=l[f+w]|d[p+w]<<16,P=L+S+A+_+524296,k=P+2*(S+A)>>3;x=k+L>>1,L=(P=P+2*(L+_)>>3)+S>>1,n(t[r+2*w-1],255&x,x>>16,g,m+(2*w-1)*i),n(t[r+2*w-0],255&L,L>>16,g,m+(2*w-0)*i),null!=a&&(x=P+A>>1,L=k+_>>1,n(a[o+2*w-1],255&x,x>>16,v,b+(2*w-1)*i),n(a[o+2*w+0],255&L,L>>16,v,b+(2*w+0)*i)),L=S,A=_}1&y||(x=3*L+A+131074>>2,n(t[r+y-1],255&x,x>>16,g,m+(y-1)*i),null!=a&&(x=3*A+L+131074>>2,n(a[o+y-1],255&x,x>>16,v,b+(y-1)*i)))}}function br(){vi[En]=bi,vi[qn]=wi,vi[Dn]=yi,vi[Rn]=Ni,vi[Tn]=Li,vi[Un]=Ai,vi[zn]=xi,vi[Hn]=wi,vi[Wn]=Ni,vi[Vn]=Li,vi[Gn]=Ai}function yr(t){return t&~Fi?0>t?0:255:t>>Ii}function wr(t,e){return yr((19077*t>>8)+(26149*e>>8)-14234)}function Nr(t,e,r){return yr((19077*t>>8)-(6419*e>>8)-(13320*r>>8)+8708)}function Lr(t,e){return yr((19077*t>>8)+(33050*e>>8)-17685)}function Ar(t,e,r,n,i){n[i+0]=wr(t,r),n[i+1]=Nr(t,e,r),n[i+2]=Lr(t,e)}function xr(t,e,r,n,i){n[i+0]=Lr(t,e),n[i+1]=Nr(t,e,r),n[i+2]=wr(t,r)}function Sr(t,e,r,n,i){var a=Nr(t,e,r);e=a<<3&224|Lr(t,e)>>3,n[i+0]=248&wr(t,r)|a>>5,n[i+1]=e}function _r(t,e,r,n,i){var a=240&Lr(t,e)|15;n[i+0]=240&wr(t,r)|Nr(t,e,r)>>4,n[i+1]=a}function Pr(t,e,r,n,i){n[i+0]=255,Ar(t,e,r,n,i+1)}function kr(t,e,r,n,i){xr(t,e,r,n,i),n[i+3]=255}function Ir(t,e,r,n,i){Ar(t,e,r,n,i),n[i+3]=255}function Vt(t,e){return 0>t?0:t>e?e:t}function Fr(e,r,n){t[e]=function(t,e,i,a,o,s,c,u,h){for(var l=u+(-2&h)*n;u!=l;)r(t[e+0],i[a+0],o[s+0],c,u),r(t[e+1],i[a+0],o[s+0],c,u+n),e+=2,++a,++s,u+=2*n;1&h&&r(t[e+0],i[a+0],o[s+0],c,u)}}function Cr(t,e,r){return 0==r?0==t?0==e?6:5:0==e?4:0:r}function jr(t,e,r,n,i){switch(t>>>30){case 3:on(e,r,n,i,0);break;case 2:sn(e,r,n,i);break;case 1:un(e,r,n,i)}}function Or(t,e){var r,a,o=e.M,s=e.Nb,c=t.oc,u=t.pc+40,h=t.oc,l=t.pc+584,f=t.oc,d=t.pc+600;for(r=0;16>r;++r)c[u+32*r-1]=129;for(r=0;8>r;++r)h[l+32*r-1]=129,f[d+32*r-1]=129;for(0<o?c[u-1-32]=h[l-1-32]=f[d-1-32]=129:(i(c,u-32-1,127,21),i(h,l-32-1,127,9),i(f,d-32-1,127,9)),a=0;a<t.za;++a){var p=e.ya[e.aa+a];if(0<a){for(r=-1;16>r;++r)n(c,u+32*r-4,c,u+32*r+12,4);for(r=-1;8>r;++r)n(h,l+32*r-4,h,l+32*r+4,4),n(f,d+32*r-4,f,d+32*r+4,4)}var g=t.Gd,m=t.Hd+a,v=p.ad,b=p.Hc;if(0<o&&(n(c,u-32,g[m].y,0,16),n(h,l-32,g[m].f,0,8),n(f,d-32,g[m].ea,0,8)),p.Za){var y=c,w=u-32+16;for(0<o&&(a>=t.za-1?i(y,w,g[m].y[15],4):n(y,w,g[m+1].y,0,4)),r=0;4>r;r++)y[w+128+r]=y[w+256+r]=y[w+384+r]=y[w+0+r];for(r=0;16>r;++r,b<<=2)y=c,w=u+Di[r],fi[p.Ob[r]](y,w),jr(b,v,16*+r,y,w)}else if(y=Cr(a,o,p.Ob[0]),li[y](c,u),0!=b)for(r=0;16>r;++r,b<<=2)jr(b,v,16*+r,c,u+Di[r]);for(r=p.Gc,y=Cr(a,o,p.Dd),di[y](h,l),di[y](f,d),b=v,y=h,w=l,255&(p=r>>0)&&(170&p?cn(b,256,y,w):hn(b,256,y,w)),p=f,b=d,255&(r>>=8)&&(170&r?cn(v,320,p,b):hn(v,320,p,b)),o<t.Ub-1&&(n(g[m].y,0,c,u+480,16),n(g[m].f,0,h,l+224,8),n(g[m].ea,0,f,d+224,8)),r=8*s*t.B,g=t.sa,m=t.ta+16*a+16*s*t.R,v=t.qa,p=t.ra+8*a+r,b=t.Ha,y=t.Ia+8*a+r,r=0;16>r;++r)n(g,m+r*t.R,c,u+32*r,16);for(r=0;8>r;++r)n(v,p+r*t.B,h,l+32*r,8),n(b,y+r*t.B,f,d+32*r,8)}}function Br(t,n,i,a,o,s,c,u,h){var l=[0],f=[0],d=0,p=null!=h?h.kd:0,g=null!=h?h:new nr;if(null==t||12>i)return 7;g.data=t,g.w=n,g.ha=i,n=[n],i=[i],g.gb=[g.gb];t:{var m=n,b=i,y=g.gb;if(e(null!=t),e(null!=b),e(null!=y),y[0]=0,12<=b[0]&&!r(t,m[0],"RIFF")){if(r(t,m[0]+8,"WEBP")){y=3;break t}var w=j(t,m[0]+4);if(12>w||4294967286<w){y=3;break t}if(p&&w>b[0]-8){y=7;break t}y[0]=w,m[0]+=12,b[0]-=12}y=0}if(0!=y)return y;for(w=0<g.gb[0],i=i[0];;){t:{var L=t;b=n,y=i;var A=l,x=f,S=m=[0];if((k=d=[d])[0]=0,8>y[0])y=7;else{if(!r(L,b[0],"VP8X")){if(10!=j(L,b[0]+4)){y=3;break t}if(18>y[0]){y=7;break t}var _=j(L,b[0]+8),P=1+C(L,b[0]+12);if(2147483648<=P*(L=1+C(L,b[0]+15))){y=3;break t}null!=S&&(S[0]=_),null!=A&&(A[0]=P),null!=x&&(x[0]=L),b[0]+=18,y[0]-=18,k[0]=1}y=0}}if(d=d[0],m=m[0],0!=y)return y;if(b=!!(2&m),!w&&d)return 3;if(null!=s&&(s[0]=!!(16&m)),null!=c&&(c[0]=b),null!=u&&(u[0]=0),c=l[0],m=f[0],d&&b&&null==h){y=0;break}if(4>i){y=7;break}if(w&&d||!w&&!d&&!r(t,n[0],"ALPH")){i=[i],g.na=[g.na],g.P=[g.P],g.Sa=[g.Sa];t:{_=t,y=n,w=i;var k=g.gb;A=g.na,x=g.P,S=g.Sa;P=22,e(null!=_),e(null!=w),L=y[0];var I=w[0];for(e(null!=A),e(null!=S),A[0]=null,x[0]=null,S[0]=0;;){if(y[0]=L,w[0]=I,8>I){y=7;break t}var F=j(_,L+4);if(4294967286<F){y=3;break t}var O=8+F+1&-2;if(P+=O,0<k&&P>k){y=3;break t}if(!r(_,L,"VP8 ")||!r(_,L,"VP8L")){y=0;break t}if(I[0]<O){y=7;break t}r(_,L,"ALPH")||(A[0]=_,x[0]=L+8,S[0]=F),L+=O,I-=O}}if(i=i[0],g.na=g.na[0],g.P=g.P[0],g.Sa=g.Sa[0],0!=y)break}i=[i],g.Ja=[g.Ja],g.xa=[g.xa];t:if(k=t,y=n,w=i,A=g.gb[0],x=g.Ja,S=g.xa,_=y[0],L=!r(k,_,"VP8 "),P=!r(k,_,"VP8L"),e(null!=k),e(null!=w),e(null!=x),e(null!=S),8>w[0])y=7;else{if(L||P){if(k=j(k,_+4),12<=A&&k>A-12){y=3;break t}if(p&&k>w[0]-8){y=7;break t}x[0]=k,y[0]+=8,w[0]-=8,S[0]=P}else S[0]=5<=w[0]&&47==k[_+0]&&!(k[_+4]>>5),x[0]=w[0];y=0}if(i=i[0],g.Ja=g.Ja[0],g.xa=g.xa[0],n=n[0],0!=y)break;if(4294967286<g.Ja)return 3;if(null==u||b||(u[0]=g.xa?2:1),c=[c],m=[m],g.xa){if(5>i){y=7;break}u=c,p=m,b=s,null==t||5>i?t=0:5<=i&&47==t[n+0]&&!(t[n+4]>>5)?(w=[0],k=[0],A=[0],v(x=new N,t,n,i),gt(x,w,k,A)?(null!=u&&(u[0]=w[0]),null!=p&&(p[0]=k[0]),null!=b&&(b[0]=A[0]),t=1):t=0):t=0}else{if(10>i){y=7;break}u=m,null==t||10>i||!Xt(t,n+3,i-3)?t=0:(p=t[n+0]|t[n+1]<<8|t[n+2]<<16,b=16383&(t[n+7]<<8|t[n+6]),t=16383&(t[n+9]<<8|t[n+8]),1&p||3<(p>>1&7)||!(p>>4&1)||p>>5>=g.Ja||!b||!t?t=0:(c&&(c[0]=b),u&&(u[0]=t),t=1))}if(!t)return 3;if(c=c[0],m=m[0],d&&(l[0]!=c||f[0]!=m))return 3;null!=h&&(h[0]=g,h.offset=n-h.w,e(4294967286>n-h.w),e(h.offset==h.ha-i));break}return 0==y||7==y&&d&&null==h?(null!=s&&(s[0]|=null!=g.na&&0<g.na.length),null!=a&&(a[0]=c),null!=o&&(o[0]=m),0):y}function Mr(t,e,r){var n=e.width,i=e.height,a=0,o=0,s=n,c=i;if(e.Da=null!=t&&0<t.Da,e.Da&&(s=t.cd,c=t.bd,a=t.v,o=t.j,11>r||(a&=-2,o&=-2),0>a||0>o||0>=s||0>=c||a+s>n||o+c>i))return 0;if(e.v=a,e.j=o,e.va=a+s,e.o=o+c,e.U=s,e.T=c,e.da=null!=t&&0<t.da,e.da){if(!E(s,c,r=[t.ib],a=[t.hb]))return 0;e.ib=r[0],e.hb=a[0]}return e.ob=null!=t&&t.ob,e.Kb=null==t||!t.Sd,e.da&&(e.ob=e.ib<3*n/4&&e.hb<3*i/4,e.Kb=0),1}function Er(t){if(null==t)return 2;if(11>t.S){var e=t.f.RGBA;e.fb+=(t.height-1)*e.A,e.A=-e.A}else e=t.f.kb,t=t.height,e.O+=(t-1)*e.fa,e.fa=-e.fa,e.N+=(t-1>>1)*e.Ab,e.Ab=-e.Ab,e.W+=(t-1>>1)*e.Db,e.Db=-e.Db,null!=e.F&&(e.J+=(t-1)*e.lb,e.lb=-e.lb);return 0}function qr(t,e,r,n){if(null==n||0>=t||0>=e)return 2;if(null!=r){if(r.Da){var i=r.cd,o=r.bd,s=-2&r.v,c=-2&r.j;if(0>s||0>c||0>=i||0>=o||s+i>t||c+o>e)return 2;t=i,e=o}if(r.da){if(!E(t,e,i=[r.ib],o=[r.hb]))return 2;t=i[0],e=o[0]}}n.width=t,n.height=e;t:{var u=n.width,h=n.height;if(t=n.S,0>=u||0>=h||!(t>=En&&13>t))t=2;else{if(0>=n.Rd&&null==n.sd){s=o=i=e=0;var l=(c=u*zi[t])*h;if(11>t||(o=(h+1)/2*(e=(u+1)/2),12==t&&(s=(i=u)*h)),null==(h=a(l+2*o+s))){t=1;break t}n.sd=h,11>t?((u=n.f.RGBA).eb=h,u.fb=0,u.A=c,u.size=l):((u=n.f.kb).y=h,u.O=0,u.fa=c,u.Fd=l,u.f=h,u.N=0+l,u.Ab=e,u.Cd=o,u.ea=h,u.W=0+l+o,u.Db=e,u.Ed=o,12==t&&(u.F=h,u.J=0+l+2*o),u.Tc=s,u.lb=i)}if(e=1,i=n.S,o=n.width,s=n.height,i>=En&&13>i)if(11>i)t=n.f.RGBA,e&=(c=Math.abs(t.A))*(s-1)+o<=t.size,e&=c>=o*zi[i],e&=null!=t.eb;else{t=n.f.kb,c=(o+1)/2,l=(s+1)/2,u=Math.abs(t.fa);h=Math.abs(t.Ab);var f=Math.abs(t.Db),d=Math.abs(t.lb),p=d*(s-1)+o;e&=u*(s-1)+o<=t.Fd,e&=h*(l-1)+c<=t.Cd,e=(e&=f*(l-1)+c<=t.Ed)&u>=o&h>=c&f>=c,e&=null!=t.y,e&=null!=t.f,e&=null!=t.ea,12==i&&(e&=d>=o,e&=p<=t.Tc,e&=null!=t.F)}else e=0;t=e?0:2}}return 0!=t||null!=r&&r.fd&&(t=Er(n)),t}var Dr=64,Rr=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535,131071,262143,524287,1048575,2097151,4194303,8388607,16777215],Tr=24,Ur=32,zr=8,Hr=[0,0,1,1,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7];R("Predictor0","PredictorAdd0"),t.Predictor0=function(){return 4278190080},t.Predictor1=function(t){return t},t.Predictor2=function(t,e,r){return e[r+0]},t.Predictor3=function(t,e,r){return e[r+1]},t.Predictor4=function(t,e,r){return e[r-1]},t.Predictor5=function(t,e,r){return U(U(t,e[r+1]),e[r+0])},t.Predictor6=function(t,e,r){return U(t,e[r-1])},t.Predictor7=function(t,e,r){return U(t,e[r+0])},t.Predictor8=function(t,e,r){return U(e[r-1],e[r+0])},t.Predictor9=function(t,e,r){return U(e[r+0],e[r+1])},t.Predictor10=function(t,e,r){return U(U(t,e[r-1]),U(e[r+0],e[r+1]))},t.Predictor11=function(t,e,r){var n=e[r+0];return 0>=W(n>>24&255,t>>24&255,(e=e[r-1])>>24&255)+W(n>>16&255,t>>16&255,e>>16&255)+W(n>>8&255,t>>8&255,e>>8&255)+W(255&n,255&t,255&e)?n:t},t.Predictor12=function(t,e,r){var n=e[r+0];return(z((t>>24&255)+(n>>24&255)-((e=e[r-1])>>24&255))<<24|z((t>>16&255)+(n>>16&255)-(e>>16&255))<<16|z((t>>8&255)+(n>>8&255)-(e>>8&255))<<8|z((255&t)+(255&n)-(255&e)))>>>0},t.Predictor13=function(t,e,r){var n=e[r-1];return(H((t=U(t,e[r+0]))>>24&255,n>>24&255)<<24|H(t>>16&255,n>>16&255)<<16|H(t>>8&255,n>>8&255)<<8|H(t>>0&255,n>>0&255))>>>0};var Wr=t.PredictorAdd0;t.PredictorAdd1=V,R("Predictor2","PredictorAdd2"),R("Predictor3","PredictorAdd3"),R("Predictor4","PredictorAdd4"),R("Predictor5","PredictorAdd5"),R("Predictor6","PredictorAdd6"),R("Predictor7","PredictorAdd7"),R("Predictor8","PredictorAdd8"),R("Predictor9","PredictorAdd9"),R("Predictor10","PredictorAdd10"),R("Predictor11","PredictorAdd11"),R("Predictor12","PredictorAdd12"),R("Predictor13","PredictorAdd13");var Vr=t.PredictorAdd2;X("ColorIndexInverseTransform","MapARGB","32b",(function(t){return t>>8&255}),(function(t){return t})),X("VP8LColorIndexInverseTransformAlpha","MapAlpha","8b",(function(t){return t}),(function(t){return t>>8&255}));var Gr,Yr=t.ColorIndexInverseTransform,Jr=t.MapARGB,Xr=t.VP8LColorIndexInverseTransformAlpha,Kr=t.MapAlpha,Zr=t.VP8LPredictorsAdd=[];Zr.length=16,(t.VP8LPredictors=[]).length=16,(t.VP8LPredictorsAdd_C=[]).length=16,(t.VP8LPredictors_C=[]).length=16;var $r,Qr,tn,en,rn,nn,an,on,sn,cn,un,hn,ln,fn,dn,pn,gn,mn,vn,bn,yn,wn,Nn,Ln,An,xn,Sn,_n,Pn=a(511),kn=a(2041),In=a(225),Fn=a(767),Cn=0,jn=kn,On=In,Bn=Fn,Mn=Pn,En=0,qn=1,Dn=2,Rn=3,Tn=4,Un=5,zn=6,Hn=7,Wn=8,Vn=9,Gn=10,Yn=[2,3,7],Jn=[3,3,11],Xn=[280,256,256,256,40],Kn=[0,1,1,1,0],Zn=[17,18,0,1,2,3,4,5,16,6,7,8,9,10,11,12,13,14,15],$n=[24,7,23,25,40,6,39,41,22,26,38,42,56,5,55,57,21,27,54,58,37,43,72,4,71,73,20,28,53,59,70,74,36,44,88,69,75,52,60,3,87,89,19,29,86,90,35,45,68,76,85,91,51,61,104,2,103,105,18,30,102,106,34,46,84,92,67,77,101,107,50,62,120,1,119,121,83,93,17,31,100,108,66,78,118,122,33,47,117,123,49,63,99,109,82,94,0,116,124,65,79,16,32,98,110,48,115,125,81,95,64,114,126,97,111,80,113,127,96,112],Qn=[2954,2956,2958,2962,2970,2986,3018,3082,3212,3468,3980,5004],ti=8,ei=[4,5,6,7,8,9,10,10,11,12,13,14,15,16,17,17,18,19,20,20,21,21,22,22,23,23,24,25,25,26,27,28,29,30,31,32,33,34,35,36,37,37,38,39,40,41,42,43,44,45,46,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,76,77,78,79,80,81,82,83,84,85,86,87,88,89,91,93,95,96,98,100,101,102,104,106,108,110,112,114,116,118,122,124,126,128,130,132,134,136,138,140,143,145,148,151,154,157],ri=[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,119,122,125,128,131,134,137,140,143,146,149,152,155,158,161,164,167,170,173,177,181,185,189,193,197,201,205,209,213,217,221,225,229,234,239,245,249,254,259,264,269,274,279,284],ni=null,ii=[[173,148,140,0],[176,155,140,135,0],[180,157,141,134,130,0],[254,254,243,230,196,177,153,140,133,130,129,0]],ai=[0,1,4,8,5,2,3,6,9,12,13,10,7,11,14,15],oi=[-0,1,-1,2,-2,3,4,6,-3,5,-4,-5,-6,7,-7,8,-8,-9],si=[[[[128,128,128,128,128,128,128,128,128,128,128],[128,128,128,128,128,128,128,128,128,128,128],[128,128,128,128,128,128,128,128,128,128,128]],[[253,136,254,255,228,219,128,128,128,128,128],[189,129,242,255,227,213,255,219,128,128,128],[106,126,227,252,214,209,255,255,128,128,128]],[[1,98,248,255,236,226,255,255,128,128,128],[181,133,238,254,221,234,255,154,128,128,128],[78,134,202,247,198,180,255,219,128,128,128]],[[1,185,249,255,243,255,128,128,128,128,128],[184,150,247,255,236,224,128,128,128,128,128],[77,110,216,255,236,230,128,128,128,128,128]],[[1,101,251,255,241,255,128,128,128,128,128],[170,139,241,252,236,209,255,255,128,128,128],[37,116,196,243,228,255,255,255,128,128,128]],[[1,204,254,255,245,255,128,128,128,128,128],[207,160,250,255,238,128,128,128,128,128,128],[102,103,231,255,211,171,128,128,128,128,128]],[[1,152,252,255,240,255,128,128,128,128,128],[177,135,243,255,234,225,128,128,128,128,128],[80,129,211,255,194,224,128,128,128,128,128]],[[1,1,255,128,128,128,128,128,128,128,128],[246,1,255,128,128,128,128,128,128,128,128],[255,128,128,128,128,128,128,128,128,128,128]]],[[[198,35,237,223,193,187,162,160,145,155,62],[131,45,198,221,172,176,220,157,252,221,1],[68,47,146,208,149,167,221,162,255,223,128]],[[1,149,241,255,221,224,255,255,128,128,128],[184,141,234,253,222,220,255,199,128,128,128],[81,99,181,242,176,190,249,202,255,255,128]],[[1,129,232,253,214,197,242,196,255,255,128],[99,121,210,250,201,198,255,202,128,128,128],[23,91,163,242,170,187,247,210,255,255,128]],[[1,200,246,255,234,255,128,128,128,128,128],[109,178,241,255,231,245,255,255,128,128,128],[44,130,201,253,205,192,255,255,128,128,128]],[[1,132,239,251,219,209,255,165,128,128,128],[94,136,225,251,218,190,255,255,128,128,128],[22,100,174,245,186,161,255,199,128,128,128]],[[1,182,249,255,232,235,128,128,128,128,128],[124,143,241,255,227,234,128,128,128,128,128],[35,77,181,251,193,211,255,205,128,128,128]],[[1,157,247,255,236,231,255,255,128,128,128],[121,141,235,255,225,227,255,255,128,128,128],[45,99,188,251,195,217,255,224,128,128,128]],[[1,1,251,255,213,255,128,128,128,128,128],[203,1,248,255,255,128,128,128,128,128,128],[137,1,177,255,224,255,128,128,128,128,128]]],[[[253,9,248,251,207,208,255,192,128,128,128],[175,13,224,243,193,185,249,198,255,255,128],[73,17,171,221,161,179,236,167,255,234,128]],[[1,95,247,253,212,183,255,255,128,128,128],[239,90,244,250,211,209,255,255,128,128,128],[155,77,195,248,188,195,255,255,128,128,128]],[[1,24,239,251,218,219,255,205,128,128,128],[201,51,219,255,196,186,128,128,128,128,128],[69,46,190,239,201,218,255,228,128,128,128]],[[1,191,251,255,255,128,128,128,128,128,128],[223,165,249,255,213,255,128,128,128,128,128],[141,124,248,255,255,128,128,128,128,128,128]],[[1,16,248,255,255,128,128,128,128,128,128],[190,36,230,255,236,255,128,128,128,128,128],[149,1,255,128,128,128,128,128,128,128,128]],[[1,226,255,128,128,128,128,128,128,128,128],[247,192,255,128,128,128,128,128,128,128,128],[240,128,255,128,128,128,128,128,128,128,128]],[[1,134,252,255,255,128,128,128,128,128,128],[213,62,250,255,255,128,128,128,128,128,128],[55,93,255,128,128,128,128,128,128,128,128]],[[128,128,128,128,128,128,128,128,128,128,128],[128,128,128,128,128,128,128,128,128,128,128],[128,128,128,128,128,128,128,128,128,128,128]]],[[[202,24,213,235,186,191,220,160,240,175,255],[126,38,182,232,169,184,228,174,255,187,128],[61,46,138,219,151,178,240,170,255,216,128]],[[1,112,230,250,199,191,247,159,255,255,128],[166,109,228,252,211,215,255,174,128,128,128],[39,77,162,232,172,180,245,178,255,255,128]],[[1,52,220,246,198,199,249,220,255,255,128],[124,74,191,243,183,193,250,221,255,255,128],[24,71,130,219,154,170,243,182,255,255,128]],[[1,182,225,249,219,240,255,224,128,128,128],[149,150,226,252,216,205,255,171,128,128,128],[28,108,170,242,183,194,254,223,255,255,128]],[[1,81,230,252,204,203,255,192,128,128,128],[123,102,209,247,188,196,255,233,128,128,128],[20,95,153,243,164,173,255,203,128,128,128]],[[1,222,248,255,216,213,128,128,128,128,128],[168,175,246,252,235,205,255,255,128,128,128],[47,116,215,255,211,212,255,255,128,128,128]],[[1,121,236,253,212,214,255,255,128,128,128],[141,84,213,252,201,202,255,219,128,128,128],[42,80,160,240,162,185,255,205,128,128,128]],[[1,1,255,128,128,128,128,128,128,128,128],[244,1,255,128,128,128,128,128,128,128,128],[238,1,255,128,128,128,128,128,128,128,128]]]],ci=[[[231,120,48,89,115,113,120,152,112],[152,179,64,126,170,118,46,70,95],[175,69,143,80,85,82,72,155,103],[56,58,10,171,218,189,17,13,152],[114,26,17,163,44,195,21,10,173],[121,24,80,195,26,62,44,64,85],[144,71,10,38,171,213,144,34,26],[170,46,55,19,136,160,33,206,71],[63,20,8,114,114,208,12,9,226],[81,40,11,96,182,84,29,16,36]],[[134,183,89,137,98,101,106,165,148],[72,187,100,130,157,111,32,75,80],[66,102,167,99,74,62,40,234,128],[41,53,9,178,241,141,26,8,107],[74,43,26,146,73,166,49,23,157],[65,38,105,160,51,52,31,115,128],[104,79,12,27,217,255,87,17,7],[87,68,71,44,114,51,15,186,23],[47,41,14,110,182,183,21,17,194],[66,45,25,102,197,189,23,18,22]],[[88,88,147,150,42,46,45,196,205],[43,97,183,117,85,38,35,179,61],[39,53,200,87,26,21,43,232,171],[56,34,51,104,114,102,29,93,77],[39,28,85,171,58,165,90,98,64],[34,22,116,206,23,34,43,166,73],[107,54,32,26,51,1,81,43,31],[68,25,106,22,64,171,36,225,114],[34,19,21,102,132,188,16,76,124],[62,18,78,95,85,57,50,48,51]],[[193,101,35,159,215,111,89,46,111],[60,148,31,172,219,228,21,18,111],[112,113,77,85,179,255,38,120,114],[40,42,1,196,245,209,10,25,109],[88,43,29,140,166,213,37,43,154],[61,63,30,155,67,45,68,1,209],[100,80,8,43,154,1,51,26,71],[142,78,78,16,255,128,34,197,171],[41,40,5,102,211,183,4,1,221],[51,50,17,168,209,192,23,25,82]],[[138,31,36,171,27,166,38,44,229],[67,87,58,169,82,115,26,59,179],[63,59,90,180,59,166,93,73,154],[40,40,21,116,143,209,34,39,175],[47,15,16,183,34,223,49,45,183],[46,17,33,183,6,98,15,32,183],[57,46,22,24,128,1,54,17,37],[65,32,73,115,28,128,23,128,205],[40,3,9,115,51,192,18,6,223],[87,37,9,115,59,77,64,21,47]],[[104,55,44,218,9,54,53,130,226],[64,90,70,205,40,41,23,26,57],[54,57,112,184,5,41,38,166,213],[30,34,26,133,152,116,10,32,134],[39,19,53,221,26,114,32,73,255],[31,9,65,234,2,15,1,118,73],[75,32,12,51,192,255,160,43,51],[88,31,35,67,102,85,55,186,85],[56,21,23,111,59,205,45,37,192],[55,38,70,124,73,102,1,34,98]],[[125,98,42,88,104,85,117,175,82],[95,84,53,89,128,100,113,101,45],[75,79,123,47,51,128,81,171,1],[57,17,5,71,102,57,53,41,49],[38,33,13,121,57,73,26,1,85],[41,10,67,138,77,110,90,47,114],[115,21,2,10,102,255,166,23,6],[101,29,16,10,85,128,101,196,26],[57,18,10,102,102,213,34,20,43],[117,20,15,36,163,128,68,1,26]],[[102,61,71,37,34,53,31,243,192],[69,60,71,38,73,119,28,222,37],[68,45,128,34,1,47,11,245,171],[62,17,19,70,146,85,55,62,70],[37,43,37,154,100,163,85,160,1],[63,9,92,136,28,64,32,201,85],[75,15,9,9,64,255,184,119,16],[86,6,28,5,64,255,25,248,1],[56,8,17,132,137,255,55,116,128],[58,15,20,82,135,57,26,121,40]],[[164,50,31,137,154,133,25,35,218],[51,103,44,131,131,123,31,6,158],[86,40,64,135,148,224,45,183,128],[22,26,17,131,240,154,14,1,209],[45,16,21,91,64,222,7,1,197],[56,21,39,155,60,138,23,102,213],[83,12,13,54,192,255,68,47,28],[85,26,85,85,128,128,32,146,171],[18,11,7,63,144,171,4,4,246],[35,27,10,146,174,171,12,26,128]],[[190,80,35,99,180,80,126,54,45],[85,126,47,87,176,51,41,20,32],[101,75,128,139,118,146,116,128,85],[56,41,15,176,236,85,37,9,62],[71,30,17,119,118,255,17,18,138],[101,38,60,138,55,70,43,26,142],[146,36,19,30,171,255,97,27,20],[138,45,61,62,219,1,81,188,64],[32,41,20,117,151,142,20,21,163],[112,19,12,61,195,128,48,4,24]]],ui=[[[[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[176,246,255,255,255,255,255,255,255,255,255],[223,241,252,255,255,255,255,255,255,255,255],[249,253,253,255,255,255,255,255,255,255,255]],[[255,244,252,255,255,255,255,255,255,255,255],[234,254,254,255,255,255,255,255,255,255,255],[253,255,255,255,255,255,255,255,255,255,255]],[[255,246,254,255,255,255,255,255,255,255,255],[239,253,254,255,255,255,255,255,255,255,255],[254,255,254,255,255,255,255,255,255,255,255]],[[255,248,254,255,255,255,255,255,255,255,255],[251,255,254,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,253,254,255,255,255,255,255,255,255,255],[251,254,254,255,255,255,255,255,255,255,255],[254,255,254,255,255,255,255,255,255,255,255]],[[255,254,253,255,254,255,255,255,255,255,255],[250,255,254,255,254,255,255,255,255,255,255],[254,255,255,255,255,255,255,255,255,255,255]],[[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]]],[[[217,255,255,255,255,255,255,255,255,255,255],[225,252,241,253,255,255,254,255,255,255,255],[234,250,241,250,253,255,253,254,255,255,255]],[[255,254,255,255,255,255,255,255,255,255,255],[223,254,254,255,255,255,255,255,255,255,255],[238,253,254,254,255,255,255,255,255,255,255]],[[255,248,254,255,255,255,255,255,255,255,255],[249,254,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,253,255,255,255,255,255,255,255,255,255],[247,254,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,253,254,255,255,255,255,255,255,255,255],[252,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,254,254,255,255,255,255,255,255,255,255],[253,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,254,253,255,255,255,255,255,255,255,255],[250,255,255,255,255,255,255,255,255,255,255],[254,255,255,255,255,255,255,255,255,255,255]],[[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]]],[[[186,251,250,255,255,255,255,255,255,255,255],[234,251,244,254,255,255,255,255,255,255,255],[251,251,243,253,254,255,254,255,255,255,255]],[[255,253,254,255,255,255,255,255,255,255,255],[236,253,254,255,255,255,255,255,255,255,255],[251,253,253,254,254,255,255,255,255,255,255]],[[255,254,254,255,255,255,255,255,255,255,255],[254,254,254,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,254,255,255,255,255,255,255,255,255,255],[254,254,255,255,255,255,255,255,255,255,255],[254,255,255,255,255,255,255,255,255,255,255]],[[255,255,255,255,255,255,255,255,255,255,255],[254,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]]],[[[248,255,255,255,255,255,255,255,255,255,255],[250,254,252,254,255,255,255,255,255,255,255],[248,254,249,253,255,255,255,255,255,255,255]],[[255,253,253,255,255,255,255,255,255,255,255],[246,253,253,255,255,255,255,255,255,255,255],[252,254,251,254,254,255,255,255,255,255,255]],[[255,254,252,255,255,255,255,255,255,255,255],[248,254,253,255,255,255,255,255,255,255,255],[253,255,254,254,255,255,255,255,255,255,255]],[[255,251,254,255,255,255,255,255,255,255,255],[245,251,254,255,255,255,255,255,255,255,255],[253,253,254,255,255,255,255,255,255,255,255]],[[255,251,253,255,255,255,255,255,255,255,255],[252,253,254,255,255,255,255,255,255,255,255],[255,254,255,255,255,255,255,255,255,255,255]],[[255,252,255,255,255,255,255,255,255,255,255],[249,255,254,255,255,255,255,255,255,255,255],[255,255,254,255,255,255,255,255,255,255,255]],[[255,255,253,255,255,255,255,255,255,255,255],[250,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]],[[255,255,255,255,255,255,255,255,255,255,255],[254,255,255,255,255,255,255,255,255,255,255],[255,255,255,255,255,255,255,255,255,255,255]]]],hi=[0,1,2,3,6,4,5,6,6,6,6,6,6,6,6,7,0],li=[],fi=[],di=[],pi=1,gi=2,mi=[],vi=[];vr("UpsampleRgbLinePair",Ar,3),vr("UpsampleBgrLinePair",xr,3),vr("UpsampleRgbaLinePair",Ir,4),vr("UpsampleBgraLinePair",kr,4),vr("UpsampleArgbLinePair",Pr,4),vr("UpsampleRgba4444LinePair",_r,2),vr("UpsampleRgb565LinePair",Sr,2);var bi=t.UpsampleRgbLinePair,yi=t.UpsampleBgrLinePair,wi=t.UpsampleRgbaLinePair,Ni=t.UpsampleBgraLinePair,Li=t.UpsampleArgbLinePair,Ai=t.UpsampleRgba4444LinePair,xi=t.UpsampleRgb565LinePair,Si=16,_i=1<<Si-1,Pi=-227,ki=482,Ii=6,Fi=(256<<Ii)-1,Ci=0,ji=a(256),Oi=a(256),Bi=a(256),Mi=a(256),Ei=a(ki-Pi),qi=a(ki-Pi);Fr("YuvToRgbRow",Ar,3),Fr("YuvToBgrRow",xr,3),Fr("YuvToRgbaRow",Ir,4),Fr("YuvToBgraRow",kr,4),Fr("YuvToArgbRow",Pr,4),Fr("YuvToRgba4444Row",_r,2),Fr("YuvToRgb565Row",Sr,2);var Di=[0,4,8,12,128,132,136,140,256,260,264,268,384,388,392,396],Ri=[0,2,8],Ti=[8,7,6,4,4,2,2,2,1,1,1,1],Ui=1;this.WebPDecodeRGBA=function(t,r,n,i,a){var o=qn,s=new rr,c=new ot;s.ba=c,c.S=o,c.width=[c.width],c.height=[c.height];var u=c.width,h=c.height,l=new st;if(null==l||null==t)var f=2;else e(null!=l),f=Br(t,r,n,l.width,l.height,l.Pd,l.Qd,l.format,null);if(0!=f?u=0:(null!=u&&(u[0]=l.width[0]),null!=h&&(h[0]=l.height[0]),u=1),u){c.width=c.width[0],c.height=c.height[0],null!=i&&(i[0]=c.width),null!=a&&(a[0]=c.height);t:{if(i=new Gt,(a=new nr).data=t,a.w=r,a.ha=n,a.kd=1,r=[0],e(null!=a),(0==(t=Br(a.data,a.w,a.ha,null,null,null,r,null,a))||7==t)&&r[0]&&(t=4),0==(r=t)){if(e(null!=s),i.data=a.data,i.w=a.w+a.offset,i.ha=a.ha-a.offset,i.put=dt,i.ac=ft,i.bc=pt,i.ma=s,a.xa){if(null==(t=kt())){s=1;break t}if(function(t,r){var n=[0],i=[0],a=[0];e:for(;;){if(null==t)return 0;if(null==r)return t.a=2,0;if(t.l=r,t.a=0,v(t.m,r.data,r.w,r.ha),!gt(t.m,n,i,a)){t.a=3;break e}if(t.xb=gi,r.width=n[0],r.height=i[0],!It(n[0],i[0],1,t,null))break e;return 1}return e(0!=t.a),0}(t,i)){if(i=0==(r=qr(i.width,i.height,s.Oa,s.ba))){e:{i=t;r:for(;;){if(null==i){i=0;break e}if(e(null!=i.s.yc),e(null!=i.s.Ya),e(0<i.s.Wb),e(null!=(n=i.l)),e(null!=(a=n.ma)),0!=i.xb){if(i.ca=a.ba,i.tb=a.tb,e(null!=i.ca),!Mr(a.Oa,n,Rn)){i.a=2;break r}if(!Ft(i,n.width))break r;if(n.da)break r;if((n.da||nt(i.ca.S))&&mr(),11>i.ca.S||(alert("todo:WebPInitConvertARGBToYUV"),null!=i.ca.f.kb.F&&mr()),i.Pb&&0<i.s.ua&&null==i.s.vb.X&&!O(i.s.vb,i.s.Wa.Xa)){i.a=1;break r}i.xb=0}if(!_t(i,i.V,i.Ba,i.c,i.i,n.o,Lt))break r;a.Dc=i.Ma,i=1;break e}e(0!=i.a),i=0}i=!i}i&&(r=t.a)}else r=t.a}else{if(null==(t=new Yt)){s=1;break t}if(t.Fa=a.na,t.P=a.P,t.qc=a.Sa,Kt(t,i)){if(0==(r=qr(i.width,i.height,s.Oa,s.ba))){if(t.Aa=0,n=s.Oa,e(null!=(a=t)),null!=n){if(0<(u=0>(u=n.Md)?0:100<u?255:255*u/100)){for(h=l=0;4>h;++h)12>(f=a.pb[h]).lc&&(f.ia=u*Ti[0>f.lc?0:f.lc]>>3),l|=f.ia;l&&(alert("todo:VP8InitRandom"),a.ia=1)}a.Ga=n.Id,100<a.Ga?a.Ga=100:0>a.Ga&&(a.Ga=0)}Qt(t,i)||(r=t.a)}}else r=t.a}0==r&&null!=s.Oa&&s.Oa.fd&&(r=Er(s.ba))}s=r}o=0!=s?null:11>o?c.f.RGBA.eb:c.f.kb.y}else o=null;return o};var zi=[3,4,3,4,4,2,2,4,4,4,2,1,1]};function u(t,e){for(var r="",n=0;n<4;n++)r+=String.fromCharCode(t[e++]);return r}function h(t,e){return(t[e+0]<<0|t[e+1]<<8|t[e+2]<<16)>>>0}function l(t,e){return(t[e+0]<<0|t[e+1]<<8|t[e+2]<<16|t[e+3]<<24)>>>0}new c;var f=[0],d=[0],p=[],g=new c,m=t,v=function(t,e){var r={},n=0,i=!1,a=0,o=0;if(r.frames=[],!
/** @license
   * Copyright (c) 2017 Dominik Homberger
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  https://webpjs.appspot.com
  WebPRiffParser dominikhlbg@gmail.com
  */
function(t,e,r,n){for(var i=0;i<n;i++)if(t[e+i]!=r.charCodeAt(i))return!0;return!1}(t,e,"RIFF",4)){var s,c;l(t,e+=4);for(e+=8;e<t.length;){var f=u(t,e),d=l(t,e+=4);e+=4;var p=d+(1&d);switch(f){case"VP8 ":case"VP8L":void 0===r.frames[n]&&(r.frames[n]={});(v=r.frames[n]).src_off=i?o:e-8,v.src_size=a+d+8,n++,i&&(i=!1,a=0,o=0);break;case"VP8X":(v=r.header={}).feature_flags=t[e];var g=e+4;v.canvas_width=1+h(t,g);g+=3;v.canvas_height=1+h(t,g);g+=3;break;case"ALPH":i=!0,a=p+8,o=e-8;break;case"ANIM":(v=r.header).bgcolor=l(t,e);g=e+4;v.loop_count=(s=t)[(c=g)+0]<<0|s[c+1]<<8;g+=2;break;case"ANMF":var m,v;(v=r.frames[n]={}).offset_x=2*h(t,e),e+=3,v.offset_y=2*h(t,e),e+=3,v.width=1+h(t,e),e+=3,v.height=1+h(t,e),e+=3,v.duration=h(t,e),e+=3,m=t[e++],v.dispose=1&m,v.blend=m>>1&1}"ANMF"!=f&&(e+=p)}return r}}(m,0);v.response=m,v.rgbaoutput=!0,v.dataurl=!1;var b=v.header?v.header:null,y=v.frames?v.frames:null;if(b){b.loop_counter=b.loop_count,f=[b.canvas_height],d=[b.canvas_width];for(var w=0;w<y.length&&0!=y[w].blend;w++);}var N=y[0],L=g.WebPDecodeRGBA(m,N.src_off,N.src_size,d,f);N.rgba=L,N.imgwidth=d[0],N.imgheight=f[0];for(var A=0;A<d[0]*f[0]*4;A++)p[A]=L[A];return this.width=d,this.height=f,this.data=p,this}!function(t){var r=function(){return"function"==typeof fflate__WEBPACK_IMPORTED_MODULE_1__.zlibSync},n=function(r,n,a,h){var l=4,f=s;switch(h){case t.image_compression.FAST:l=1,f=o;break;case t.image_compression.MEDIUM:l=6,f=c;break;case t.image_compression.SLOW:l=9,f=u}r=i(r,n,a,f);var d=(0,fflate__WEBPACK_IMPORTED_MODULE_1__.zlibSync)(r,{level:l});return t.__addimage__.arrayBufferToBinaryString(d)},i=function(t,e,r,n){for(var i,a,o,s=t.length/e,c=new Uint8Array(t.length+s),u=l(),h=0;h<s;h+=1){if(o=h*e,i=t.subarray(o,o+e),n)c.set(n(i,r,a),o+h);else{for(var d,p=u.length,g=[];d<p;d+=1)g[d]=u[d](i,r,a);var m=f(g.concat());c.set(g[m],o+h)}a=i}return c},a=function(t){var e=Array.apply([],t);return e.unshift(0),e},o=function(t,e){var r,n=[],i=t.length;n[0]=1;for(var a=0;a<i;a+=1)r=t[a-e]||0,n[a+1]=t[a]-r+256&255;return n},s=function(t,e,r){var n,i=[],a=t.length;i[0]=2;for(var o=0;o<a;o+=1)n=r&&r[o]||0,i[o+1]=t[o]-n+256&255;return i},c=function(t,e,r){var n,i,a=[],o=t.length;a[0]=3;for(var s=0;s<o;s+=1)n=t[s-e]||0,i=r&&r[s]||0,a[s+1]=t[s]+256-(n+i>>>1)&255;return a},u=function(t,e,r){var n,i,a,o,s=[],c=t.length;s[0]=4;for(var u=0;u<c;u+=1)n=t[u-e]||0,i=r&&r[u]||0,a=r&&r[u-e]||0,o=h(n,i,a),s[u+1]=t[u]-o+256&255;return s},h=function(t,e,r){if(t===e&&e===r)return t;var n=Math.abs(e-r),i=Math.abs(t-r),a=Math.abs(t+e-r-r);return n<=i&&n<=a?t:i<=a?e:r},l=function(){return[a,o,s,c,u]},f=function(t){var e=t.map((function(t){return t.reduce((function(t,e){return t+Math.abs(e)}),0)}));return e.indexOf(Math.min.apply(null,e))};t.processPNG=function(e,i,a,o){var s,c,u,h,l,f,d,p,g,m,v,b,y,w,N,L=this.decode.FLATE_DECODE,A="";if(this.__addimage__.isArrayBuffer(e)&&(e=new Uint8Array(e)),this.__addimage__.isArrayBufferView(e)){if(e=(u=new Kt(e)).imgData,c=u.bits,s=u.colorSpace,l=u.colors,-1!==[4,6].indexOf(u.colorType)){if(8===u.bits){g=(p=32==u.pixelBitlength?new Uint32Array(u.decodePixels().buffer):16==u.pixelBitlength?new Uint16Array(u.decodePixels().buffer):new Uint8Array(u.decodePixels().buffer)).length,v=new Uint8Array(g*u.colors),m=new Uint8Array(g);var x,S=u.pixelBitlength-u.bits;for(w=0,N=0;w<g;w++){for(y=p[w],x=0;x<S;)v[N++]=y>>>x&255,x+=u.bits;m[w]=y>>>x&255}}if(16===u.bits){g=(p=new Uint32Array(u.decodePixels().buffer)).length,v=new Uint8Array(g*(32/u.pixelBitlength)*u.colors),m=new Uint8Array(g*(32/u.pixelBitlength)),b=u.colors>1,w=0,N=0;for(var _=0;w<g;)y=p[w++],v[N++]=y>>>0&255,b&&(v[N++]=y>>>16&255,y=p[w++],v[N++]=y>>>0&255),m[_++]=y>>>16&255;c=8}o!==t.image_compression.NONE&&r()?(e=n(v,u.width*u.colors,u.colors,o),d=n(m,u.width,1,o)):(e=v,d=m,L=void 0)}if(3===u.colorType&&(s=this.color_spaces.INDEXED,f=u.palette,u.transparency.indexed)){var P=u.transparency.indexed,k=0;for(w=0,g=P.length;w<g;++w)k+=P[w];if((k/=255)===g-1&&-1!==P.indexOf(0))h=[P.indexOf(0)];else if(k!==g){for(p=u.decodePixels(),m=new Uint8Array(p.length),w=0,g=p.length;w<g;w++)m[w]=P[p[w]];d=n(m,u.width,1)}}var I=function(e){var r;switch(e){case t.image_compression.FAST:r=11;break;case t.image_compression.MEDIUM:r=13;break;case t.image_compression.SLOW:r=14;break;default:r=12}return r}(o);return L===this.decode.FLATE_DECODE&&(A="/Predictor "+I+" "),A+="/Colors "+l+" /BitsPerComponent "+c+" /Columns "+u.width,(this.__addimage__.isArrayBuffer(e)||this.__addimage__.isArrayBufferView(e))&&(e=this.__addimage__.arrayBufferToBinaryString(e)),(d&&this.__addimage__.isArrayBuffer(d)||this.__addimage__.isArrayBufferView(d))&&(d=this.__addimage__.arrayBufferToBinaryString(d)),{alias:a,data:e,index:i,filter:L,decodeParameters:A,transparency:h,palette:f,sMask:d,predictor:I,width:u.width,height:u.height,bitsPerComponent:c,colorSpace:s}}}}(E.API),function(t){t.processGIF89A=function(e,r,n,i){var a=new Zt(e),o=a.width,s=a.height,c=[];a.decodeAndBlitFrameRGBA(0,c);var u={data:c,width:o,height:s},h=new Qt(100).encode(u,100);return t.processJPEG.call(this,h,r,n,i)},t.processGIF87A=t.processGIF89A}(E.API),te.prototype.parseHeader=function(){if(this.fileSize=this.datav.getUint32(this.pos,!0),this.pos+=4,this.reserved=this.datav.getUint32(this.pos,!0),this.pos+=4,this.offset=this.datav.getUint32(this.pos,!0),this.pos+=4,this.headerSize=this.datav.getUint32(this.pos,!0),this.pos+=4,this.width=this.datav.getUint32(this.pos,!0),this.pos+=4,this.height=this.datav.getInt32(this.pos,!0),this.pos+=4,this.planes=this.datav.getUint16(this.pos,!0),this.pos+=2,this.bitPP=this.datav.getUint16(this.pos,!0),this.pos+=2,this.compress=this.datav.getUint32(this.pos,!0),this.pos+=4,this.rawSize=this.datav.getUint32(this.pos,!0),this.pos+=4,this.hr=this.datav.getUint32(this.pos,!0),this.pos+=4,this.vr=this.datav.getUint32(this.pos,!0),this.pos+=4,this.colors=this.datav.getUint32(this.pos,!0),this.pos+=4,this.importantColors=this.datav.getUint32(this.pos,!0),this.pos+=4,16===this.bitPP&&this.is_with_alpha&&(this.bitPP=15),this.bitPP<15){var t=0===this.colors?1<<this.bitPP:this.colors;this.palette=new Array(t);for(var e=0;e<t;e++){var r=this.datav.getUint8(this.pos++,!0),n=this.datav.getUint8(this.pos++,!0),i=this.datav.getUint8(this.pos++,!0),a=this.datav.getUint8(this.pos++,!0);this.palette[e]={red:i,green:n,blue:r,quad:a}}}this.height<0&&(this.height*=-1,this.bottom_up=!1)},te.prototype.parseBGR=function(){this.pos=this.offset;try{var t="bit"+this.bitPP,e=this.width*this.height*4;this.data=new Uint8Array(e),this[t]()}catch(t){a.log("bit decode error:"+t)}},te.prototype.bit1=function(){var t,e=Math.ceil(this.width/8),r=e%4;for(t=this.height-1;t>=0;t--){for(var n=this.bottom_up?t:this.height-1-t,i=0;i<e;i++)for(var a=this.datav.getUint8(this.pos++,!0),o=n*this.width*4+8*i*4,s=0;s<8&&8*i+s<this.width;s++){var c=this.palette[a>>7-s&1];this.data[o+4*s]=c.blue,this.data[o+4*s+1]=c.green,this.data[o+4*s+2]=c.red,this.data[o+4*s+3]=255}0!==r&&(this.pos+=4-r)}},te.prototype.bit4=function(){for(var t=Math.ceil(this.width/2),e=t%4,r=this.height-1;r>=0;r--){for(var n=this.bottom_up?r:this.height-1-r,i=0;i<t;i++){var a=this.datav.getUint8(this.pos++,!0),o=n*this.width*4+2*i*4,s=a>>4,c=15&a,u=this.palette[s];if(this.data[o]=u.blue,this.data[o+1]=u.green,this.data[o+2]=u.red,this.data[o+3]=255,2*i+1>=this.width)break;u=this.palette[c],this.data[o+4]=u.blue,this.data[o+4+1]=u.green,this.data[o+4+2]=u.red,this.data[o+4+3]=255}0!==e&&(this.pos+=4-e)}},te.prototype.bit8=function(){for(var t=this.width%4,e=this.height-1;e>=0;e--){for(var r=this.bottom_up?e:this.height-1-e,n=0;n<this.width;n++){var i=this.datav.getUint8(this.pos++,!0),a=r*this.width*4+4*n;if(i<this.palette.length){var o=this.palette[i];this.data[a]=o.red,this.data[a+1]=o.green,this.data[a+2]=o.blue,this.data[a+3]=255}else this.data[a]=255,this.data[a+1]=255,this.data[a+2]=255,this.data[a+3]=255}0!==t&&(this.pos+=4-t)}},te.prototype.bit15=function(){for(var t=this.width%3,e=parseInt("11111",2),r=this.height-1;r>=0;r--){for(var n=this.bottom_up?r:this.height-1-r,i=0;i<this.width;i++){var a=this.datav.getUint16(this.pos,!0);this.pos+=2;var o=(a&e)/e*255|0,s=(a>>5&e)/e*255|0,c=(a>>10&e)/e*255|0,u=a>>15?255:0,h=n*this.width*4+4*i;this.data[h]=c,this.data[h+1]=s,this.data[h+2]=o,this.data[h+3]=u}this.pos+=t}},te.prototype.bit16=function(){for(var t=this.width%3,e=parseInt("11111",2),r=parseInt("111111",2),n=this.height-1;n>=0;n--){for(var i=this.bottom_up?n:this.height-1-n,a=0;a<this.width;a++){var o=this.datav.getUint16(this.pos,!0);this.pos+=2;var s=(o&e)/e*255|0,c=(o>>5&r)/r*255|0,u=(o>>11)/e*255|0,h=i*this.width*4+4*a;this.data[h]=u,this.data[h+1]=c,this.data[h+2]=s,this.data[h+3]=255}this.pos+=t}},te.prototype.bit24=function(){for(var t=this.height-1;t>=0;t--){for(var e=this.bottom_up?t:this.height-1-t,r=0;r<this.width;r++){var n=this.datav.getUint8(this.pos++,!0),i=this.datav.getUint8(this.pos++,!0),a=this.datav.getUint8(this.pos++,!0),o=e*this.width*4+4*r;this.data[o]=a,this.data[o+1]=i,this.data[o+2]=n,this.data[o+3]=255}this.pos+=this.width%4}},te.prototype.bit32=function(){for(var t=this.height-1;t>=0;t--)for(var e=this.bottom_up?t:this.height-1-t,r=0;r<this.width;r++){var n=this.datav.getUint8(this.pos++,!0),i=this.datav.getUint8(this.pos++,!0),a=this.datav.getUint8(this.pos++,!0),o=this.datav.getUint8(this.pos++,!0),s=e*this.width*4+4*r;this.data[s]=a,this.data[s+1]=i,this.data[s+2]=n,this.data[s+3]=o}},te.prototype.getData=function(){return this.data},
/**
 * @license
 * Copyright (c) 2018 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t){t.processBMP=function(e,r,n,i){var a=new te(e,!1),o=a.width,s=a.height,c={data:a.getData(),width:o,height:s},u=new Qt(100).encode(c,100);return t.processJPEG.call(this,u,r,n,i)}}(E.API),ee.prototype.getData=function(){return this.data},
/**
 * @license
 * Copyright (c) 2019 Aras Abbasi
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t){t.processWEBP=function(e,r,n,i){var a=new ee(e,!1),o=a.width,s=a.height,c={data:a.getData(),width:o,height:s},u=new Qt(100).encode(c,100);return t.processJPEG.call(this,u,r,n,i)}}(E.API),E.API.processRGBA=function(t,e,r){for(var n=t.data,i=n.length,a=new Uint8Array(i/4*3),o=new Uint8Array(i/4),s=0,c=0,u=0;u<i;u+=4){var h=n[u],l=n[u+1],f=n[u+2],d=n[u+3];a[s++]=h,a[s++]=l,a[s++]=f,o[c++]=d}var p=this.__addimage__.arrayBufferToBinaryString(a);return{alpha:this.__addimage__.arrayBufferToBinaryString(o),data:p,index:e,alias:r,colorSpace:"DeviceRGB",bitsPerComponent:8,width:t.width,height:t.height}},E.API.setLanguage=function(t){return void 0===this.internal.languageSettings&&(this.internal.languageSettings={},this.internal.languageSettings.isSubscribed=!1),void 0!=={af:"Afrikaans",sq:"Albanian",ar:"Arabic (Standard)","ar-DZ":"Arabic (Algeria)","ar-BH":"Arabic (Bahrain)","ar-EG":"Arabic (Egypt)","ar-IQ":"Arabic (Iraq)","ar-JO":"Arabic (Jordan)","ar-KW":"Arabic (Kuwait)","ar-LB":"Arabic (Lebanon)","ar-LY":"Arabic (Libya)","ar-MA":"Arabic (Morocco)","ar-OM":"Arabic (Oman)","ar-QA":"Arabic (Qatar)","ar-SA":"Arabic (Saudi Arabia)","ar-SY":"Arabic (Syria)","ar-TN":"Arabic (Tunisia)","ar-AE":"Arabic (U.A.E.)","ar-YE":"Arabic (Yemen)",an:"Aragonese",hy:"Armenian",as:"Assamese",ast:"Asturian",az:"Azerbaijani",eu:"Basque",be:"Belarusian",bn:"Bengali",bs:"Bosnian",br:"Breton",bg:"Bulgarian",my:"Burmese",ca:"Catalan",ch:"Chamorro",ce:"Chechen",zh:"Chinese","zh-HK":"Chinese (Hong Kong)","zh-CN":"Chinese (PRC)","zh-SG":"Chinese (Singapore)","zh-TW":"Chinese (Taiwan)",cv:"Chuvash",co:"Corsican",cr:"Cree",hr:"Croatian",cs:"Czech",da:"Danish",nl:"Dutch (Standard)","nl-BE":"Dutch (Belgian)",en:"English","en-AU":"English (Australia)","en-BZ":"English (Belize)","en-CA":"English (Canada)","en-IE":"English (Ireland)","en-JM":"English (Jamaica)","en-NZ":"English (New Zealand)","en-PH":"English (Philippines)","en-ZA":"English (South Africa)","en-TT":"English (Trinidad & Tobago)","en-GB":"English (United Kingdom)","en-US":"English (United States)","en-ZW":"English (Zimbabwe)",eo:"Esperanto",et:"Estonian",fo:"Faeroese",fj:"Fijian",fi:"Finnish",fr:"French (Standard)","fr-BE":"French (Belgium)","fr-CA":"French (Canada)","fr-FR":"French (France)","fr-LU":"French (Luxembourg)","fr-MC":"French (Monaco)","fr-CH":"French (Switzerland)",fy:"Frisian",fur:"Friulian",gd:"Gaelic (Scots)","gd-IE":"Gaelic (Irish)",gl:"Galacian",ka:"Georgian",de:"German (Standard)","de-AT":"German (Austria)","de-DE":"German (Germany)","de-LI":"German (Liechtenstein)","de-LU":"German (Luxembourg)","de-CH":"German (Switzerland)",el:"Greek",gu:"Gujurati",ht:"Haitian",he:"Hebrew",hi:"Hindi",hu:"Hungarian",is:"Icelandic",id:"Indonesian",iu:"Inuktitut",ga:"Irish",it:"Italian (Standard)","it-CH":"Italian (Switzerland)",ja:"Japanese",kn:"Kannada",ks:"Kashmiri",kk:"Kazakh",km:"Khmer",ky:"Kirghiz",tlh:"Klingon",ko:"Korean","ko-KP":"Korean (North Korea)","ko-KR":"Korean (South Korea)",la:"Latin",lv:"Latvian",lt:"Lithuanian",lb:"Luxembourgish",mk:"North Macedonia",ms:"Malay",ml:"Malayalam",mt:"Maltese",mi:"Maori",mr:"Marathi",mo:"Moldavian",nv:"Navajo",ng:"Ndonga",ne:"Nepali",no:"Norwegian",nb:"Norwegian (Bokmal)",nn:"Norwegian (Nynorsk)",oc:"Occitan",or:"Oriya",om:"Oromo",fa:"Persian","fa-IR":"Persian/Iran",pl:"Polish",pt:"Portuguese","pt-BR":"Portuguese (Brazil)",pa:"Punjabi","pa-IN":"Punjabi (India)","pa-PK":"Punjabi (Pakistan)",qu:"Quechua",rm:"Rhaeto-Romanic",ro:"Romanian","ro-MO":"Romanian (Moldavia)",ru:"Russian","ru-MO":"Russian (Moldavia)",sz:"Sami (Lappish)",sg:"Sango",sa:"Sanskrit",sc:"Sardinian",sd:"Sindhi",si:"Singhalese",sr:"Serbian",sk:"Slovak",sl:"Slovenian",so:"Somani",sb:"Sorbian",es:"Spanish","es-AR":"Spanish (Argentina)","es-BO":"Spanish (Bolivia)","es-CL":"Spanish (Chile)","es-CO":"Spanish (Colombia)","es-CR":"Spanish (Costa Rica)","es-DO":"Spanish (Dominican Republic)","es-EC":"Spanish (Ecuador)","es-SV":"Spanish (El Salvador)","es-GT":"Spanish (Guatemala)","es-HN":"Spanish (Honduras)","es-MX":"Spanish (Mexico)","es-NI":"Spanish (Nicaragua)","es-PA":"Spanish (Panama)","es-PY":"Spanish (Paraguay)","es-PE":"Spanish (Peru)","es-PR":"Spanish (Puerto Rico)","es-ES":"Spanish (Spain)","es-UY":"Spanish (Uruguay)","es-VE":"Spanish (Venezuela)",sx:"Sutu",sw:"Swahili",sv:"Swedish","sv-FI":"Swedish (Finland)","sv-SV":"Swedish (Sweden)",ta:"Tamil",tt:"Tatar",te:"Teluga",th:"Thai",tig:"Tigre",ts:"Tsonga",tn:"Tswana",tr:"Turkish",tk:"Turkmen",uk:"Ukrainian",hsb:"Upper Sorbian",ur:"Urdu",ve:"Venda",vi:"Vietnamese",vo:"Volapuk",wa:"Walloon",cy:"Welsh",xh:"Xhosa",ji:"Yiddish",zu:"Zulu"}[t]&&(this.internal.languageSettings.languageCode=t,!1===this.internal.languageSettings.isSubscribed&&(this.internal.events.subscribe("putCatalog",(function(){this.internal.write("/Lang ("+this.internal.languageSettings.languageCode+")")})),this.internal.languageSettings.isSubscribed=!0)),this},Vt=E.API,Gt=Vt.getCharWidthsArray=function(e,r){var n,i,a=(r=r||{}).font||this.internal.getFont(),o=r.fontSize||this.internal.getFontSize(),s=r.charSpace||this.internal.getCharSpace(),c=r.widths?r.widths:a.metadata.Unicode.widths,u=c.fof?c.fof:1,h=r.kerning?r.kerning:a.metadata.Unicode.kerning,l=h.fof?h.fof:1,f=!1!==r.doKerning,d=0,p=e.length,g=0,m=c[0]||u,v=[];for(n=0;n<p;n++)i=e.charCodeAt(n),"function"==typeof a.metadata.widthOfString?v.push((a.metadata.widthOfGlyph(a.metadata.characterToGlyph(i))+s*(1e3/o)||0)/1e3):(d=f&&"object"===(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(h[i])&&!isNaN(parseInt(h[i][g],10))?h[i][g]/l:0,v.push((c[i]||m)/u+d)),g=i;return v},Yt=Vt.getStringUnitWidth=function(t,e){var r=(e=e||{}).fontSize||this.internal.getFontSize(),n=e.font||this.internal.getFont(),i=e.charSpace||this.internal.getCharSpace();return Vt.processArabic&&(t=Vt.processArabic(t)),"function"==typeof n.metadata.widthOfString?n.metadata.widthOfString(t,r,i)/r:Gt.apply(this,arguments).reduce((function(t,e){return t+e}),0)},Jt=function(t,e,r,n){for(var i=[],a=0,o=t.length,s=0;a!==o&&s+e[a]<r;)s+=e[a],a++;i.push(t.slice(0,a));var c=a;for(s=0;a!==o;)s+e[a]>n&&(i.push(t.slice(c,a)),s=0,c=a),s+=e[a],a++;return c!==a&&i.push(t.slice(c,a)),i},Xt=function(t,e,r){r||(r={});var n,i,a,o,s,c,u,h=[],l=[h],f=r.textIndent||0,d=0,p=0,g=t.split(" "),m=Gt.apply(this,[" ",r])[0];if(c=-1===r.lineIndent?g[0].length+2:r.lineIndent||0){var v=Array(c).join(" "),b=[];g.map((function(t){(t=t.split(/\s*\n/)).length>1?b=b.concat(t.map((function(t,e){return(e&&t.length?"\n":"")+t}))):b.push(t[0])})),g=b,c=Yt.apply(this,[v,r])}for(a=0,o=g.length;a<o;a++){var y=0;if(n=g[a],c&&"\n"==n[0]&&(n=n.substr(1),y=1),f+d+(p=(i=Gt.apply(this,[n,r])).reduce((function(t,e){return t+e}),0))>e||y){if(p>e){for(s=Jt.apply(this,[n,i,e-(f+d),e]),h.push(s.shift()),h=[s.pop()];s.length;)l.push([s.shift()]);p=i.slice(n.length-(h[0]?h[0].length:0)).reduce((function(t,e){return t+e}),0)}else h=[n];l.push(h),f=p+c,d=m}else h.push(n),f+=d+p,d=m}return u=c?function(t,e){return(e?v:"")+t.join(" ")}:function(t){return t.join(" ")},l.map(u)},Vt.splitTextToSize=function(t,e,r){var n,i=(r=r||{}).fontSize||this.internal.getFontSize(),a=function(t){if(t.widths&&t.kerning)return{widths:t.widths,kerning:t.kerning};var e=this.internal.getFont(t.fontName,t.fontStyle);return e.metadata.Unicode?{widths:e.metadata.Unicode.widths||{0:1},kerning:e.metadata.Unicode.kerning||{}}:{font:e.metadata,fontSize:this.internal.getFontSize(),charSpace:this.internal.getCharSpace()}}.call(this,r);n=Array.isArray(t)?t:String(t).split(/\r?\n/);var o=1*this.internal.scaleFactor*e/i;a.textIndent=r.textIndent?1*r.textIndent*this.internal.scaleFactor/i:0,a.lineIndent=r.lineIndent;var s,c,u=[];for(s=0,c=n.length;s<c;s++)u=u.concat(Xt.apply(this,[n[s],o,a]));return u},function(e){e.__fontmetrics__=e.__fontmetrics__||{};for(var r="klmnopqrstuvwxyz",n={},i={},a=0;a<r.length;a++)n[r[a]]="0123456789abcdef"[a],i["0123456789abcdef"[a]]=r[a];var o=function(t){return"0x"+parseInt(t,10).toString(16)},s=e.__fontmetrics__.compress=function(e){var r,n,a,c,u=["{"];for(var h in e){if(r=e[h],isNaN(parseInt(h,10))?n="'"+h+"'":(h=parseInt(h,10),n=(n=o(h).slice(2)).slice(0,-1)+i[n.slice(-1)]),"number"==typeof r)r<0?(a=o(r).slice(3),c="-"):(a=o(r).slice(2),c=""),a=c+a.slice(0,-1)+i[a.slice(-1)];else{if("object"!==(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(r))throw new Error("Don't know what to do with value type "+(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(r)+".");a=s(r)}u.push(n+a)}return u.push("}"),u.join("")},c=e.__fontmetrics__.uncompress=function(t){if("string"!=typeof t)throw new Error("Invalid argument passed to uncompress.");for(var e,r,i,a,o={},s=1,c=o,u=[],h="",l="",f=t.length-1,d=1;d<f;d+=1)"'"==(a=t[d])?e?(i=e.join(""),e=void 0):e=[]:e?e.push(a):"{"==a?(u.push([c,i]),c={},i=void 0):"}"==a?((r=u.pop())[0][r[1]]=c,i=void 0,c=r[0]):"-"==a?s=-1:void 0===i?n.hasOwnProperty(a)?(h+=n[a],i=parseInt(h,16)*s,s=1,h=""):h+=a:n.hasOwnProperty(a)?(l+=n[a],c[i]=parseInt(l,16)*s,s=1,i=void 0,l=""):l+=a;return o},u={codePages:["WinAnsiEncoding"],WinAnsiEncoding:c("{19m8n201n9q201o9r201s9l201t9m201u8m201w9n201x9o201y8o202k8q202l8r202m9p202q8p20aw8k203k8t203t8v203u9v2cq8s212m9t15m8w15n9w2dw9s16k8u16l9u17s9z17x8y17y9y}")},h={Unicode:{Courier:u,"Courier-Bold":u,"Courier-BoldOblique":u,"Courier-Oblique":u,Helvetica:u,"Helvetica-Bold":u,"Helvetica-BoldOblique":u,"Helvetica-Oblique":u,"Times-Roman":u,"Times-Bold":u,"Times-BoldItalic":u,"Times-Italic":u}},l={Unicode:{"Courier-Oblique":c("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-BoldItalic":c("{'widths'{k3o2q4ycx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2r202m2n2n3m2o3m2p5n202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5n4l4m4m4m4n4m4o4s4p4m4q4m4r4s4s4y4t2r4u3m4v4m4w3x4x5t4y4s4z4s5k3x5l4s5m4m5n3r5o3x5p4s5q4m5r5t5s4m5t3x5u3x5v2l5w1w5x2l5y3t5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q2l6r3m6s3r6t1w6u1w6v3m6w1w6x4y6y3r6z3m7k3m7l3m7m2r7n2r7o1w7p3r7q2w7r4m7s3m7t2w7u2r7v2n7w1q7x2n7y3t202l3mcl4mal2ram3man3mao3map3mar3mas2lat4uau1uav3maw3way4uaz2lbk2sbl3t'fof'6obo2lbp3tbq3mbr1tbs2lbu1ybv3mbz3mck4m202k3mcm4mcn4mco4mcp4mcq5ycr4mcs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz2w203k6o212m6o2dw2l2cq2l3t3m3u2l17s3x19m3m}'kerning'{cl{4qu5kt5qt5rs17ss5ts}201s{201ss}201t{cks4lscmscnscoscpscls2wu2yu201ts}201x{2wu2yu}2k{201ts}2w{4qx5kx5ou5qx5rs17su5tu}2x{17su5tu5ou}2y{4qx5kx5ou5qx5rs17ss5ts}'fof'-6ofn{17sw5tw5ou5qw5rs}7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qs}3v{17su5tu5os5qs}7p{17su5tu}ck{4qu5kt5qt5rs17ss5ts}4l{4qu5kt5qt5rs17ss5ts}cm{4qu5kt5qt5rs17ss5ts}cn{4qu5kt5qt5rs17ss5ts}co{4qu5kt5qt5rs17ss5ts}cp{4qu5kt5qt5rs17ss5ts}6l{4qu5ou5qw5rt17su5tu}5q{ckuclucmucnucoucpu4lu}5r{ckuclucmucnucoucpu4lu}7q{cksclscmscnscoscps4ls}6p{4qu5ou5qw5rt17sw5tw}ek{4qu5ou5qw5rt17su5tu}el{4qu5ou5qw5rt17su5tu}em{4qu5ou5qw5rt17su5tu}en{4qu5ou5qw5rt17su5tu}eo{4qu5ou5qw5rt17su5tu}ep{4qu5ou5qw5rt17su5tu}es{17ss5ts5qs4qu}et{4qu5ou5qw5rt17sw5tw}eu{4qu5ou5qw5rt17ss5ts}ev{17ss5ts5qs4qu}6z{17sw5tw5ou5qw5rs}fm{17sw5tw5ou5qw5rs}7n{201ts}fo{17sw5tw5ou5qw5rs}fp{17sw5tw5ou5qw5rs}fq{17sw5tw5ou5qw5rs}7r{cksclscmscnscoscps4ls}fs{17sw5tw5ou5qw5rs}ft{17su5tu}fu{17su5tu}fv{17su5tu}fw{17su5tu}fz{cksclscmscnscoscps4ls}}}"),"Helvetica-Bold":c("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),Courier:c("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Courier-BoldOblique":c("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Bold":c("{'widths'{k3q2q5ncx2r201n3m201o6o201s2l201t2l201u2l201w3m201x3m201y3m2k1t2l2l202m2n2n3m2o3m2p6o202q6o2r1w2s2l2t2l2u3m2v3t2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w3t3x3t3y3t3z3m4k5x4l4s4m4m4n4s4o4s4p4m4q3x4r4y4s4y4t2r4u3m4v4y4w4m4x5y4y4s4z4y5k3x5l4y5m4s5n3r5o4m5p4s5q4s5r6o5s4s5t4s5u4m5v2l5w1w5x2l5y3u5z3m6k2l6l3m6m3r6n2w6o3r6p2w6q2l6r3m6s3r6t1w6u2l6v3r6w1w6x5n6y3r6z3m7k3r7l3r7m2w7n2r7o2l7p3r7q3m7r4s7s3m7t3m7u2w7v2r7w1q7x2r7y3o202l3mcl4sal2lam3man3mao3map3mar3mas2lat4uau1yav3maw3tay4uaz2lbk2sbl3t'fof'6obo2lbp3rbr1tbs2lbu2lbv3mbz3mck4s202k3mcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw2r2m3rcy2rcz2rdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3rek3mel3mem3men3meo3mep3meq4ser2wes2wet2weu2wev2wew1wex1wey1wez1wfl3rfm3mfn3mfo3mfp3mfq3mfr3tfs3mft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3m3u2l17s4s19m3m}'kerning'{cl{4qt5ks5ot5qy5rw17sv5tv}201t{cks4lscmscnscoscpscls4wv}2k{201ts}2w{4qu5ku7mu5os5qx5ru17su5tu}2x{17su5tu5ou5qs}2y{4qv5kv7mu5ot5qz5ru17su5tu}'fof'-6o7t{cksclscmscnscoscps4ls}3u{17su5tu5os5qu}3v{17su5tu5os5qu}fu{17su5tu5ou5qu}7p{17su5tu5ou5qu}ck{4qt5ks5ot5qy5rw17sv5tv}4l{4qt5ks5ot5qy5rw17sv5tv}cm{4qt5ks5ot5qy5rw17sv5tv}cn{4qt5ks5ot5qy5rw17sv5tv}co{4qt5ks5ot5qy5rw17sv5tv}cp{4qt5ks5ot5qy5rw17sv5tv}6l{17st5tt5ou5qu}17s{ckuclucmucnucoucpu4lu4wu}5o{ckuclucmucnucoucpu4lu4wu}5q{ckzclzcmzcnzcozcpz4lz4wu}5r{ckxclxcmxcnxcoxcpx4lx4wu}5t{ckuclucmucnucoucpu4lu4wu}7q{ckuclucmucnucoucpu4lu}6p{17sw5tw5ou5qu}ek{17st5tt5qu}el{17st5tt5ou5qu}em{17st5tt5qu}en{17st5tt5qu}eo{17st5tt5qu}ep{17st5tt5ou5qu}es{17ss5ts5qu}et{17sw5tw5ou5qu}eu{17sw5tw5ou5qu}ev{17ss5ts5qu}6z{17sw5tw5ou5qu5rs}fm{17sw5tw5ou5qu5rs}fn{17sw5tw5ou5qu5rs}fo{17sw5tw5ou5qu5rs}fp{17sw5tw5ou5qu5rs}fq{17sw5tw5ou5qu5rs}7r{cktcltcmtcntcotcpt4lt5os}fs{17sw5tw5ou5qu5rs}ft{17su5tu5ou5qu}7m{5os}fv{17su5tu5ou5qu}fw{17su5tu5ou5qu}fz{cksclscmscnscoscps4ls}}}"),Symbol:c("{'widths'{k3uaw4r19m3m2k1t2l2l202m2y2n3m2p5n202q6o3k3m2s2l2t2l2v3r2w1t3m3m2y1t2z1wbk2sbl3r'fof'6o3n3m3o3m3p3m3q3m3r3m3s3m3t3m3u1w3v1w3w3r3x3r3y3r3z2wbp3t3l3m5v2l5x2l5z3m2q4yfr3r7v3k7w1o7x3k}'kerning'{'fof'-6o}}"),Helvetica:c("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}"),"Helvetica-BoldOblique":c("{'widths'{k3s2q4scx1w201n3r201o6o201s1w201t1w201u1w201w3m201x3m201y3m2k1w2l2l202m2n2n3r2o3r2p5t202q6o2r1s2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v2l3w3u3x3u3y3u3z3x4k6l4l4s4m4s4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3r4v4s4w3x4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v2l5w1w5x2l5y3u5z3r6k2l6l3r6m3x6n3r6o3x6p3r6q2l6r3x6s3x6t1w6u1w6v3r6w1w6x5t6y3x6z3x7k3x7l3x7m2r7n3r7o2l7p3x7q3r7r4y7s3r7t3r7u3m7v2r7w1w7x2r7y3u202l3rcl4sal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3xbq3rbr1wbs2lbu2obv3rbz3xck4s202k3rcm4scn4sco4scp4scq6ocr4scs4mct4mcu4mcv4mcw1w2m2zcy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3res3ret3reu3rev3rew1wex1wey1wez1wfl3xfm3xfn3xfo3xfp3xfq3xfr3ufs3xft3xfu3xfv3xfw3xfz3r203k6o212m6o2dw2l2cq2l3t3r3u2l17s4m19m3r}'kerning'{cl{4qs5ku5ot5qs17sv5tv}201t{2ww4wy2yw}201w{2ks}201x{2ww4wy2yw}2k{201ts201xs}2w{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}2x{5ow5qs}2y{7qs4qu5kw5os5qw5rs17su5tu7tsfzs}'fof'-6o7p{17su5tu5ot}ck{4qs5ku5ot5qs17sv5tv}4l{4qs5ku5ot5qs17sv5tv}cm{4qs5ku5ot5qs17sv5tv}cn{4qs5ku5ot5qs17sv5tv}co{4qs5ku5ot5qs17sv5tv}cp{4qs5ku5ot5qs17sv5tv}6l{17st5tt5os}17s{2kwclvcmvcnvcovcpv4lv4wwckv}5o{2kucltcmtcntcotcpt4lt4wtckt}5q{2ksclscmscnscoscps4ls4wvcks}5r{2ks4ws}5t{2kwclvcmvcnvcovcpv4lv4wwckv}eo{17st5tt5os}fu{17su5tu5ot}6p{17ss5ts}ek{17st5tt5os}el{17st5tt5os}em{17st5tt5os}en{17st5tt5os}6o{201ts}ep{17st5tt5os}es{17ss5ts}et{17ss5ts}eu{17ss5ts}ev{17ss5ts}6z{17su5tu5os5qt}fm{17su5tu5os5qt}fn{17su5tu5os5qt}fo{17su5tu5os5qt}fp{17su5tu5os5qt}fq{17su5tu5os5qt}fs{17su5tu5os5qt}ft{17su5tu5ot}7m{5os}fv{17su5tu5ot}fw{17su5tu5ot}}}"),ZapfDingbats:c("{'widths'{k4u2k1w'fof'6o}'kerning'{'fof'-6o}}"),"Courier-Bold":c("{'widths'{k3w'fof'6o}'kerning'{'fof'-6o}}"),"Times-Italic":c("{'widths'{k3n2q4ycx2l201n3m201o5t201s2l201t2l201u2l201w3r201x3r201y3r2k1t2l2l202m2n2n3m2o3m2p5n202q5t2r1p2s2l2t2l2u3m2v4n2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v2l3w4n3x4n3y4n3z3m4k5w4l3x4m3x4n4m4o4s4p3x4q3x4r4s4s4s4t2l4u2w4v4m4w3r4x5n4y4m4z4s5k3x5l4s5m3x5n3m5o3r5p4s5q3x5r5n5s3x5t3r5u3r5v2r5w1w5x2r5y2u5z3m6k2l6l3m6m3m6n2w6o3m6p2w6q1w6r3m6s3m6t1w6u1w6v2w6w1w6x4s6y3m6z3m7k3m7l3m7m2r7n2r7o1w7p3m7q2w7r4m7s2w7t2w7u2r7v2s7w1v7x2s7y3q202l3mcl3xal2ram3man3mao3map3mar3mas2lat4wau1vav3maw4nay4waz2lbk2sbl4n'fof'6obo2lbp3mbq3obr1tbs2lbu1zbv3mbz3mck3x202k3mcm3xcn3xco3xcp3xcq5tcr4mcs3xct3xcu3xcv3xcw2l2m2ucy2lcz2ldl4mdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek3mel3mem3men3meo3mep3meq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr4nfs3mft3mfu3mfv3mfw3mfz2w203k6o212m6m2dw2l2cq2l3t3m3u2l17s3r19m3m}'kerning'{cl{5kt4qw}201s{201sw}201t{201tw2wy2yy6q-t}201x{2wy2yy}2k{201tw}2w{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}2x{17ss5ts5os}2y{7qs4qy7rs5ky7mw5os5qx5ru17su5tu}'fof'-6o6t{17ss5ts5qs}7t{5os}3v{5qs}7p{17su5tu5qs}ck{5kt4qw}4l{5kt4qw}cm{5kt4qw}cn{5kt4qw}co{5kt4qw}cp{5kt4qw}6l{4qs5ks5ou5qw5ru17su5tu}17s{2ks}5q{ckvclvcmvcnvcovcpv4lv}5r{ckuclucmucnucoucpu4lu}5t{2ks}6p{4qs5ks5ou5qw5ru17su5tu}ek{4qs5ks5ou5qw5ru17su5tu}el{4qs5ks5ou5qw5ru17su5tu}em{4qs5ks5ou5qw5ru17su5tu}en{4qs5ks5ou5qw5ru17su5tu}eo{4qs5ks5ou5qw5ru17su5tu}ep{4qs5ks5ou5qw5ru17su5tu}es{5ks5qs4qs}et{4qs5ks5ou5qw5ru17su5tu}eu{4qs5ks5qw5ru17su5tu}ev{5ks5qs4qs}ex{17ss5ts5qs}6z{4qv5ks5ou5qw5ru17su5tu}fm{4qv5ks5ou5qw5ru17su5tu}fn{4qv5ks5ou5qw5ru17su5tu}fo{4qv5ks5ou5qw5ru17su5tu}fp{4qv5ks5ou5qw5ru17su5tu}fq{4qv5ks5ou5qw5ru17su5tu}7r{5os}fs{4qv5ks5ou5qw5ru17su5tu}ft{17su5tu5qs}fu{17su5tu5qs}fv{17su5tu5qs}fw{17su5tu5qs}}}"),"Times-Roman":c("{'widths'{k3n2q4ycx2l201n3m201o6o201s2l201t2l201u2l201w2w201x2w201y2w2k1t2l2l202m2n2n3m2o3m2p5n202q6o2r1m2s2l2t2l2u3m2v3s2w1t2x2l2y1t2z1w3k3m3l3m3m3m3n3m3o3m3p3m3q3m3r3m3s3m203t2l203u2l3v1w3w3s3x3s3y3s3z2w4k5w4l4s4m4m4n4m4o4s4p3x4q3r4r4s4s4s4t2l4u2r4v4s4w3x4x5t4y4s4z4s5k3r5l4s5m4m5n3r5o3x5p4s5q4s5r5y5s4s5t4s5u3x5v2l5w1w5x2l5y2z5z3m6k2l6l2w6m3m6n2w6o3m6p2w6q2l6r3m6s3m6t1w6u1w6v3m6w1w6x4y6y3m6z3m7k3m7l3m7m2l7n2r7o1w7p3m7q3m7r4s7s3m7t3m7u2w7v3k7w1o7x3k7y3q202l3mcl4sal2lam3man3mao3map3mar3mas2lat4wau1vav3maw3say4waz2lbk2sbl3s'fof'6obo2lbp3mbq2xbr1tbs2lbu1zbv3mbz2wck4s202k3mcm4scn4sco4scp4scq5tcr4mcs3xct3xcu3xcv3xcw2l2m2tcy2lcz2ldl4sdm4sdn4sdo4sdp4sdq4sds4sdt4sdu4sdv4sdw4sdz3mek2wel2wem2wen2weo2wep2weq4mer2wes2wet2weu2wev2wew1wex1wey1wez1wfl3mfm3mfn3mfo3mfp3mfq3mfr3sfs3mft3mfu3mfv3mfw3mfz3m203k6o212m6m2dw2l2cq2l3t3m3u1w17s4s19m3m}'kerning'{cl{4qs5ku17sw5ou5qy5rw201ss5tw201ws}201s{201ss}201t{ckw4lwcmwcnwcowcpwclw4wu201ts}2k{201ts}2w{4qs5kw5os5qx5ru17sx5tx}2x{17sw5tw5ou5qu}2y{4qs5kw5os5qx5ru17sx5tx}'fof'-6o7t{ckuclucmucnucoucpu4lu5os5rs}3u{17su5tu5qs}3v{17su5tu5qs}7p{17sw5tw5qs}ck{4qs5ku17sw5ou5qy5rw201ss5tw201ws}4l{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cm{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cn{4qs5ku17sw5ou5qy5rw201ss5tw201ws}co{4qs5ku17sw5ou5qy5rw201ss5tw201ws}cp{4qs5ku17sw5ou5qy5rw201ss5tw201ws}6l{17su5tu5os5qw5rs}17s{2ktclvcmvcnvcovcpv4lv4wuckv}5o{ckwclwcmwcnwcowcpw4lw4wu}5q{ckyclycmycnycoycpy4ly4wu5ms}5r{cktcltcmtcntcotcpt4lt4ws}5t{2ktclvcmvcnvcovcpv4lv4wuckv}7q{cksclscmscnscoscps4ls}6p{17su5tu5qw5rs}ek{5qs5rs}el{17su5tu5os5qw5rs}em{17su5tu5os5qs5rs}en{17su5qs5rs}eo{5qs5rs}ep{17su5tu5os5qw5rs}es{5qs}et{17su5tu5qw5rs}eu{17su5tu5qs5rs}ev{5qs}6z{17sv5tv5os5qx5rs}fm{5os5qt5rs}fn{17sv5tv5os5qx5rs}fo{17sv5tv5os5qx5rs}fp{5os5qt5rs}fq{5os5qt5rs}7r{ckuclucmucnucoucpu4lu5os}fs{17sv5tv5os5qx5rs}ft{17ss5ts5qs}fu{17sw5tw5qs}fv{17sw5tw5qs}fw{17ss5ts5qs}fz{ckuclucmucnucoucpu4lu5os5rs}}}"),"Helvetica-Oblique":c("{'widths'{k3p2q4mcx1w201n3r201o6o201s1q201t1q201u1q201w2l201x2l201y2l2k1w2l1w202m2n2n3r2o3r2p5t202q6o2r1n2s2l2t2l2u2r2v3u2w1w2x2l2y1w2z1w3k3r3l3r3m3r3n3r3o3r3p3r3q3r3r3r3s3r203t2l203u2l3v1w3w3u3x3u3y3u3z3r4k6p4l4m4m4m4n4s4o4s4p4m4q3x4r4y4s4s4t1w4u3m4v4m4w3r4x5n4y4s4z4y5k4m5l4y5m4s5n4m5o3x5p4s5q4m5r5y5s4m5t4m5u3x5v1w5w1w5x1w5y2z5z3r6k2l6l3r6m3r6n3m6o3r6p3r6q1w6r3r6s3r6t1q6u1q6v3m6w1q6x5n6y3r6z3r7k3r7l3r7m2l7n3m7o1w7p3r7q3m7r4s7s3m7t3m7u3m7v2l7w1u7x2l7y3u202l3rcl4mal2lam3ran3rao3rap3rar3ras2lat4tau2pav3raw3uay4taz2lbk2sbl3u'fof'6obo2lbp3rbr1wbs2lbu2obv3rbz3xck4m202k3rcm4mcn4mco4mcp4mcq6ocr4scs4mct4mcu4mcv4mcw1w2m2ncy1wcz1wdl4sdm4ydn4ydo4ydp4ydq4yds4ydt4sdu4sdv4sdw4sdz3xek3rel3rem3ren3reo3rep3req5ter3mes3ret3reu3rev3rew1wex1wey1wez1wfl3rfm3rfn3rfo3rfp3rfq3rfr3ufs3xft3rfu3rfv3rfw3rfz3m203k6o212m6o2dw2l2cq2l3t3r3u1w17s4m19m3r}'kerning'{5q{4wv}cl{4qs5kw5ow5qs17sv5tv}201t{2wu4w1k2yu}201x{2wu4wy2yu}17s{2ktclucmucnu4otcpu4lu4wycoucku}2w{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}2x{17sy5ty5oy5qs}2y{7qs4qz5k1m17sy5ow5qx5rsfsu5ty7tufzu}'fof'-6o7p{17sv5tv5ow}ck{4qs5kw5ow5qs17sv5tv}4l{4qs5kw5ow5qs17sv5tv}cm{4qs5kw5ow5qs17sv5tv}cn{4qs5kw5ow5qs17sv5tv}co{4qs5kw5ow5qs17sv5tv}cp{4qs5kw5ow5qs17sv5tv}6l{17sy5ty5ow}do{17st5tt}4z{17st5tt}7s{fst}dm{17st5tt}dn{17st5tt}5o{ckwclwcmwcnwcowcpw4lw4wv}dp{17st5tt}dq{17st5tt}7t{5ow}ds{17st5tt}5t{2ktclucmucnu4otcpu4lu4wycoucku}fu{17sv5tv5ow}6p{17sy5ty5ow5qs}ek{17sy5ty5ow}el{17sy5ty5ow}em{17sy5ty5ow}en{5ty}eo{17sy5ty5ow}ep{17sy5ty5ow}es{17sy5ty5qs}et{17sy5ty5ow5qs}eu{17sy5ty5ow5qs}ev{17sy5ty5ow5qs}6z{17sy5ty5ow5qs}fm{17sy5ty5ow5qs}fn{17sy5ty5ow5qs}fo{17sy5ty5ow5qs}fp{17sy5ty5qs}fq{17sy5ty5ow5qs}7r{5ow}fs{17sy5ty5ow5qs}ft{17sv5tv5ow}7m{5ow}fv{17sv5tv5ow}fw{17sv5tv5ow}}}")}};e.events.push(["addFont",function(t){var e=t.font,r=l.Unicode[e.postScriptName];r&&(e.metadata.Unicode={},e.metadata.Unicode.widths=r.widths,e.metadata.Unicode.kerning=r.kerning);var n=h.Unicode[e.postScriptName];n&&(e.metadata.Unicode.encoding=n,e.encoding=n.codePages[0])}])}(E.API),
/**
 * @license
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t){var e=function(t){for(var e=t.length,r=new Uint8Array(e),n=0;n<e;n++)r[n]=t.charCodeAt(n);return r};t.API.events.push(["addFont",function(r){var n=void 0,i=r.font,a=r.instance;if(!i.isStandardFont){if(void 0===a)throw new Error("Font does not exist in vFS, import fonts or remove declaration doc.addFont('"+i.postScriptName+"').");if("string"!=typeof(n=!1===a.existsFileInVFS(i.postScriptName)?a.loadFile(i.postScriptName):a.getFileFromVFS(i.postScriptName)))throw new Error("Font is not stored as string-data in vFS, import fonts or remove declaration doc.addFont('"+i.postScriptName+"').");!function(r,n){n=/^\x00\x01\x00\x00/.test(n)?e(n):e(u(n)),r.metadata=t.API.TTFFont.open(n),r.metadata.Unicode=r.metadata.Unicode||{encoding:{},kerning:{},widths:[]},r.metadata.glyIdsUsed=[0]}(i,n)}}])}(E),
/** @license
 * Copyright (c) 2012 Willow Systems Corporation, https://github.com/willowsystems
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
function(t){function e(){return(n.canvg?Promise.resolve(n.canvg):Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 77, 23))).catch((function(t){return Promise.reject(new Error("Could not load canvg: "+t))})).then((function(t){return t.default?t.default:t}))}E.API.addSvgAsImage=function(t,r,n,i,o,s,c,u){if(isNaN(r)||isNaN(n))throw a.error("jsPDF.addSvgAsImage: Invalid coordinates",arguments),new Error("Invalid coordinates passed to jsPDF.addSvgAsImage");if(isNaN(i)||isNaN(o))throw a.error("jsPDF.addSvgAsImage: Invalid measurements",arguments),new Error("Invalid measurements (width and/or height) passed to jsPDF.addSvgAsImage");var h=document.createElement("canvas");h.width=i,h.height=o;var l=h.getContext("2d");l.fillStyle="#fff",l.fillRect(0,0,h.width,h.height);var f={ignoreMouse:!0,ignoreAnimation:!0,ignoreDimensions:!0},d=this;return e().then((function(e){return e.fromString(l,t,f)}),(function(){return Promise.reject(new Error("Could not load canvg."))})).then((function(t){return t.render(f)})).then((function(){d.addImage(h.toDataURL("image/jpeg",1),r,n,i,o,c,u)}))}}(),E.API.putTotalPages=function(t){var e,r=0;parseInt(this.internal.getFont().id.substr(1),10)<15?(e=new RegExp(t,"g"),r=this.internal.getNumberOfPages()):(e=new RegExp(this.pdfEscape16(t,this.internal.getFont()),"g"),r=this.pdfEscape16(this.internal.getNumberOfPages()+"",this.internal.getFont()));for(var n=1;n<=this.internal.getNumberOfPages();n++)for(var i=0;i<this.internal.pages[n].length;i++)this.internal.pages[n][i]=this.internal.pages[n][i].replace(e,r);return this},E.API.viewerPreferences=function(e,r){var n;e=e||{},r=r||!1;var i,a,o,s={HideToolbar:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.3},HideMenubar:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.3},HideWindowUI:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.3},FitWindow:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.3},CenterWindow:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.3},DisplayDocTitle:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.4},NonFullScreenPageMode:{defaultValue:"UseNone",value:"UseNone",type:"name",explicitSet:!1,valueSet:["UseNone","UseOutlines","UseThumbs","UseOC"],pdfVersion:1.3},Direction:{defaultValue:"L2R",value:"L2R",type:"name",explicitSet:!1,valueSet:["L2R","R2L"],pdfVersion:1.3},ViewArea:{defaultValue:"CropBox",value:"CropBox",type:"name",explicitSet:!1,valueSet:["MediaBox","CropBox","TrimBox","BleedBox","ArtBox"],pdfVersion:1.4},ViewClip:{defaultValue:"CropBox",value:"CropBox",type:"name",explicitSet:!1,valueSet:["MediaBox","CropBox","TrimBox","BleedBox","ArtBox"],pdfVersion:1.4},PrintArea:{defaultValue:"CropBox",value:"CropBox",type:"name",explicitSet:!1,valueSet:["MediaBox","CropBox","TrimBox","BleedBox","ArtBox"],pdfVersion:1.4},PrintClip:{defaultValue:"CropBox",value:"CropBox",type:"name",explicitSet:!1,valueSet:["MediaBox","CropBox","TrimBox","BleedBox","ArtBox"],pdfVersion:1.4},PrintScaling:{defaultValue:"AppDefault",value:"AppDefault",type:"name",explicitSet:!1,valueSet:["AppDefault","None"],pdfVersion:1.6},Duplex:{defaultValue:"",value:"none",type:"name",explicitSet:!1,valueSet:["Simplex","DuplexFlipShortEdge","DuplexFlipLongEdge","none"],pdfVersion:1.7},PickTrayByPDFSize:{defaultValue:!1,value:!1,type:"boolean",explicitSet:!1,valueSet:[!0,!1],pdfVersion:1.7},PrintPageRange:{defaultValue:"",value:"",type:"array",explicitSet:!1,valueSet:null,pdfVersion:1.7},NumCopies:{defaultValue:1,value:1,type:"integer",explicitSet:!1,valueSet:null,pdfVersion:1.7}},c=Object.keys(s),u=[],h=0,l=0,f=0;function d(t,e){var r,n=!1;for(r=0;r<t.length;r+=1)t[r]===e&&(n=!0);return n}if(void 0===this.internal.viewerpreferences&&(this.internal.viewerpreferences={},this.internal.viewerpreferences.configuration=JSON.parse(JSON.stringify(s)),this.internal.viewerpreferences.isSubscribed=!1),n=this.internal.viewerpreferences.configuration,"reset"===e||!0===r){var p=c.length;for(f=0;f<p;f+=1)n[c[f]].value=n[c[f]].defaultValue,n[c[f]].explicitSet=!1}if("object"===(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(e))for(a in e)if(o=e[a],d(c,a)&&void 0!==o){if("boolean"===n[a].type&&"boolean"==typeof o)n[a].value=o;else if("name"===n[a].type&&d(n[a].valueSet,o))n[a].value=o;else if("integer"===n[a].type&&Number.isInteger(o))n[a].value=o;else if("array"===n[a].type){for(h=0;h<o.length;h+=1)if(i=!0,1===o[h].length&&"number"==typeof o[h][0])u.push(String(o[h]-1));else if(o[h].length>1){for(l=0;l<o[h].length;l+=1)"number"!=typeof o[h][l]&&(i=!1);!0===i&&u.push([o[h][0]-1,o[h][1]-1].join(" "))}n[a].value="["+u.join(" ")+"]"}else n[a].value=n[a].defaultValue;n[a].explicitSet=!0}return!1===this.internal.viewerpreferences.isSubscribed&&(this.internal.events.subscribe("putCatalog",(function(){var t,e=[];for(t in n)!0===n[t].explicitSet&&("name"===n[t].type?e.push("/"+t+" /"+n[t].value):e.push("/"+t+" "+n[t].value));0!==e.length&&this.internal.write("/ViewerPreferences\n<<\n"+e.join("\n")+"\n>>")})),this.internal.viewerpreferences.isSubscribed=!0),this.internal.viewerpreferences.configuration=n,this},
/** ====================================================================
 * @license
 * jsPDF XMP metadata plugin
 * Copyright (c) 2016 Jussi Utunen, u-jussi@suomi24.fi
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ====================================================================
 */
function(t){var e=function(){var t='<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:jspdf="'+this.internal.__metadata__.namespaceuri+'"><jspdf:metadata>',e=unescape(encodeURIComponent('<x:xmpmeta xmlns:x="adobe:ns:meta/">')),r=unescape(encodeURIComponent(t)),n=unescape(encodeURIComponent(this.internal.__metadata__.metadata)),i=unescape(encodeURIComponent("</jspdf:metadata></rdf:Description></rdf:RDF>")),a=unescape(encodeURIComponent("</x:xmpmeta>")),o=r.length+n.length+i.length+e.length+a.length;this.internal.__metadata__.metadata_object_number=this.internal.newObject(),this.internal.write("<< /Type /Metadata /Subtype /XML /Length "+o+" >>"),this.internal.write("stream"),this.internal.write(e+r+n+i+a),this.internal.write("endstream"),this.internal.write("endobj")},r=function(){this.internal.__metadata__.metadata_object_number&&this.internal.write("/Metadata "+this.internal.__metadata__.metadata_object_number+" 0 R")};t.addMetadata=function(t,n){return void 0===this.internal.__metadata__&&(this.internal.__metadata__={metadata:t,namespaceuri:n||"http://jspdf.default.namespaceuri/"},this.internal.events.subscribe("putCatalog",r),this.internal.events.subscribe("postPutResources",e)),this}}(E.API),function(t){var e=t.API,r=e.pdfEscape16=function(t,e){for(var r,n=e.metadata.Unicode.widths,i=["","0","00","000","0000"],a=[""],o=0,s=t.length;o<s;++o){if(r=e.metadata.characterToGlyph(t.charCodeAt(o)),e.metadata.glyIdsUsed.push(r),e.metadata.toUnicode[r]=t.charCodeAt(o),-1==n.indexOf(r)&&(n.push(r),n.push([parseInt(e.metadata.widthOfGlyph(r),10)])),"0"==r)return a.join("");r=r.toString(16),a.push(i[4-r.length],r)}return a.join("")},n=function(t){var e,r,n,i,a,o,s;for(a="/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo <<\n  /Registry (Adobe)\n  /Ordering (UCS)\n  /Supplement 0\n>> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<0000><ffff>\nendcodespacerange",n=[],o=0,s=(r=Object.keys(t).sort((function(t,e){return t-e}))).length;o<s;o++)e=r[o],n.length>=100&&(a+="\n"+n.length+" beginbfchar\n"+n.join("\n")+"\nendbfchar",n=[]),void 0!==t[e]&&null!==t[e]&&"function"==typeof t[e].toString&&(i=("0000"+t[e].toString(16)).slice(-4),e=("0000"+(+e).toString(16)).slice(-4),n.push("<"+e+"><"+i+">"));return n.length&&(a+="\n"+n.length+" beginbfchar\n"+n.join("\n")+"\nendbfchar\n"),a+="endcmap\nCMapName currentdict /CMap defineresource pop\nend\nend"};e.events.push(["putFont",function(e){!function(e){var r=e.font,i=e.out,a=e.newObject,o=e.putStream;if(r.metadata instanceof t.API.TTFFont&&"Identity-H"===r.encoding){for(var s=r.metadata.Unicode.widths,c=r.metadata.subset.encode(r.metadata.glyIdsUsed,1),u="",h=0;h<c.length;h++)u+=String.fromCharCode(c[h]);var l=a();o({data:u,addLength1:!0,objectId:l}),i("endobj");var f=a();o({data:n(r.metadata.toUnicode),addLength1:!0,objectId:f}),i("endobj");var d=a();i("<<"),i("/Type /FontDescriptor"),i("/FontName /"+F(r.fontName)),i("/FontFile2 "+l+" 0 R"),i("/FontBBox "+t.API.PDFObject.convert(r.metadata.bbox)),i("/Flags "+r.metadata.flags),i("/StemV "+r.metadata.stemV),i("/ItalicAngle "+r.metadata.italicAngle),i("/Ascent "+r.metadata.ascender),i("/Descent "+r.metadata.decender),i("/CapHeight "+r.metadata.capHeight),i(">>"),i("endobj");var p=a();i("<<"),i("/Type /Font"),i("/BaseFont /"+F(r.fontName)),i("/FontDescriptor "+d+" 0 R"),i("/W "+t.API.PDFObject.convert(s)),i("/CIDToGIDMap /Identity"),i("/DW 1000"),i("/Subtype /CIDFontType2"),i("/CIDSystemInfo"),i("<<"),i("/Supplement 0"),i("/Registry (Adobe)"),i("/Ordering ("+r.encoding+")"),i(">>"),i(">>"),i("endobj"),r.objectNumber=a(),i("<<"),i("/Type /Font"),i("/Subtype /Type0"),i("/ToUnicode "+f+" 0 R"),i("/BaseFont /"+F(r.fontName)),i("/Encoding /"+r.encoding),i("/DescendantFonts ["+p+" 0 R]"),i(">>"),i("endobj"),r.isAlreadyPutted=!0}}(e)}]);e.events.push(["putFont",function(e){!function(e){var r=e.font,i=e.out,a=e.newObject,o=e.putStream;if(r.metadata instanceof t.API.TTFFont&&"WinAnsiEncoding"===r.encoding){for(var s=r.metadata.rawData,c="",u=0;u<s.length;u++)c+=String.fromCharCode(s[u]);var h=a();o({data:c,addLength1:!0,objectId:h}),i("endobj");var l=a();o({data:n(r.metadata.toUnicode),addLength1:!0,objectId:l}),i("endobj");var f=a();i("<<"),i("/Descent "+r.metadata.decender),i("/CapHeight "+r.metadata.capHeight),i("/StemV "+r.metadata.stemV),i("/Type /FontDescriptor"),i("/FontFile2 "+h+" 0 R"),i("/Flags 96"),i("/FontBBox "+t.API.PDFObject.convert(r.metadata.bbox)),i("/FontName /"+F(r.fontName)),i("/ItalicAngle "+r.metadata.italicAngle),i("/Ascent "+r.metadata.ascender),i(">>"),i("endobj"),r.objectNumber=a();for(var d=0;d<r.metadata.hmtx.widths.length;d++)r.metadata.hmtx.widths[d]=parseInt(r.metadata.hmtx.widths[d]*(1e3/r.metadata.head.unitsPerEm));i("<</Subtype/TrueType/Type/Font/ToUnicode "+l+" 0 R/BaseFont/"+F(r.fontName)+"/FontDescriptor "+f+" 0 R/Encoding/"+r.encoding+" /FirstChar 29 /LastChar 255 /Widths "+t.API.PDFObject.convert(r.metadata.hmtx.widths)+">>"),i("endobj"),r.isAlreadyPutted=!0}}(e)}]);var i=function(t){var e,n=t.text||"",i=t.x,a=t.y,o=t.options||{},s=t.mutex||{},c=s.pdfEscape,u=s.activeFontKey,h=s.fonts,l=u,f="",d=0,p="",g=h[l].encoding;if("Identity-H"!==h[l].encoding)return{text:n,x:i,y:a,options:o,mutex:s};for(p=n,l=u,Array.isArray(n)&&(p=n[0]),d=0;d<p.length;d+=1)h[l].metadata.hasOwnProperty("cmap")&&(e=h[l].metadata.cmap.unicode.codeMap[p[d].charCodeAt(0)]),e||p[d].charCodeAt(0)<256&&h[l].metadata.hasOwnProperty("Unicode")?f+=p[d]:f+="";var m="";return parseInt(l.slice(1))<14||"WinAnsiEncoding"===g?m=c(f,l).split("").map((function(t){return t.charCodeAt(0).toString(16)})).join(""):"Identity-H"===g&&(m=r(f,h[l])),s.isHex=!0,{text:m,x:i,y:a,options:o,mutex:s}};e.events.push(["postProcessText",function(t){var e=t.text||"",r=[],n={text:e,x:t.x,y:t.y,options:t.options,mutex:t.mutex};if(Array.isArray(e)){var a=0;for(a=0;a<e.length;a+=1)Array.isArray(e[a])&&3===e[a].length?r.push([i(Object.assign({},n,{text:e[a][0]})).text,e[a][1],e[a][2]]):r.push(i(Object.assign({},n,{text:e[a]})).text);t.text=r}else t.text=i(Object.assign({},n,{text:e})).text}])}(E),
/**
 * @license
 * jsPDF virtual FileSystem functionality
 *
 * Licensed under the MIT License.
 * http://opensource.org/licenses/mit-license
 */
function(t){var e=function(){return void 0===this.internal.vFS&&(this.internal.vFS={}),!0};t.existsFileInVFS=function(t){return e.call(this),void 0!==this.internal.vFS[t]},t.addFileToVFS=function(t,r){return e.call(this),this.internal.vFS[t]=r,this},t.getFileFromVFS=function(t){return e.call(this),void 0!==this.internal.vFS[t]?this.internal.vFS[t]:null}}(E.API),
/**
 * @license
 * Unicode Bidi Engine based on the work of Alex Shensis (@asthensis)
 * MIT License
 */
function(t){t.__bidiEngine__=t.prototype.__bidiEngine__=function(t){var r,n,i,a,o,s,c,u=e,h=[[0,3,0,1,0,0,0],[0,3,0,1,2,2,0],[0,3,0,17,2,0,1],[0,3,5,5,4,1,0],[0,3,21,21,4,0,1],[0,3,5,5,4,2,0]],l=[[2,0,1,1,0,1,0],[2,0,1,1,0,2,0],[2,0,2,1,3,2,0],[2,0,2,33,3,1,1]],f={L:0,R:1,EN:2,AN:3,N:4,B:5,S:6},d={0:0,5:1,6:2,7:3,32:4,251:5,254:6,255:7},p=["(",")","(","<",">","<","[","]","[","{","}","{","«","»","«","‹","›","‹","⁅","⁆","⁅","⁽","⁾","⁽","₍","₎","₍","≤","≥","≤","〈","〉","〈","﹙","﹚","﹙","﹛","﹜","﹛","﹝","﹞","﹝","﹤","﹥","﹤"],g=new RegExp(/^([1-4|9]|1[0-9]|2[0-9]|3[0168]|4[04589]|5[012]|7[78]|159|16[0-9]|17[0-2]|21[569]|22[03489]|250)$/),m=!1,v=0;this.__bidiEngine__={};var b=function(t){var e=t.charCodeAt(),r=e>>8,n=d[r];return void 0!==n?u[256*n+(255&e)]:252===r||253===r?"AL":g.test(r)?"L":8===r?"R":"N"},y=function(t){for(var e,r=0;r<t.length;r++){if("L"===(e=b(t.charAt(r))))return!1;if("R"===e)return!0}return!1},w=function(t,e,o,s){var c,u,h,l,f=e[s];switch(f){case"L":case"R":m=!1;break;case"N":case"AN":break;case"EN":m&&(f="AN");break;case"AL":m=!0,f="R";break;case"WS":f="N";break;case"CS":s<1||s+1>=e.length||"EN"!==(c=o[s-1])&&"AN"!==c||"EN"!==(u=e[s+1])&&"AN"!==u?f="N":m&&(u="AN"),f=u===c?u:"N";break;case"ES":f="EN"===(c=s>0?o[s-1]:"B")&&s+1<e.length&&"EN"===e[s+1]?"EN":"N";break;case"ET":if(s>0&&"EN"===o[s-1]){f="EN";break}if(m){f="N";break}for(h=s+1,l=e.length;h<l&&"ET"===e[h];)h++;f=h<l&&"EN"===e[h]?"EN":"N";break;case"NSM":if(i&&!a){for(l=e.length,h=s+1;h<l&&"NSM"===e[h];)h++;if(h<l){var d=t[s],p=d>=1425&&d<=2303||64286===d;if(c=e[h],p&&("R"===c||"AL"===c)){f="R";break}}}f=s<1||"B"===(c=e[s-1])?"N":o[s-1];break;case"B":m=!1,r=!0,f=v;break;case"S":n=!0,f="N";break;case"LRE":case"RLE":case"LRO":case"RLO":case"PDF":m=!1;break;case"BN":f="N"}return f},N=function(t,e,r){var n=t.split("");return r&&L(n,r,{hiLevel:v}),n.reverse(),e&&e.reverse(),n.join("")},L=function(t,e,i){var a,o,s,c,u,d=-1,p=t.length,g=0,y=[],N=v?l:h,L=[];for(m=!1,r=!1,n=!1,o=0;o<p;o++)L[o]=b(t[o]);for(s=0;s<p;s++){if(u=g,y[s]=w(t,L,y,s),a=240&(g=N[u][f[y[s]]]),g&=15,e[s]=c=N[g][5],a>0)if(16===a){for(o=d;o<s;o++)e[o]=1;d=-1}else d=-1;if(N[g][6])-1===d&&(d=s);else if(d>-1){for(o=d;o<s;o++)e[o]=c;d=-1}"B"===L[s]&&(e[s]=0),i.hiLevel|=c}n&&function(t,e,r){for(var n=0;n<r;n++)if("S"===t[n]){e[n]=v;for(var i=n-1;i>=0&&"WS"===t[i];i--)e[i]=v}}(L,e,p)},A=function(t,e,n,i,a){if(!(a.hiLevel<t)){if(1===t&&1===v&&!r)return e.reverse(),void(n&&n.reverse());for(var o,s,c,u,h=e.length,l=0;l<h;){if(i[l]>=t){for(c=l+1;c<h&&i[c]>=t;)c++;for(u=l,s=c-1;u<s;u++,s--)o=e[u],e[u]=e[s],e[s]=o,n&&(o=n[u],n[u]=n[s],n[s]=o);l=c}l++}}},x=function(t,e,r){var n=t.split(""),i={hiLevel:v};return r||(r=[]),L(n,r,i),function(t,e,r){if(0!==r.hiLevel&&c)for(var n,i=0;i<t.length;i++)1===e[i]&&(n=p.indexOf(t[i]))>=0&&(t[i]=p[n+1])}(n,r,i),A(2,n,e,r,i),A(1,n,e,r,i),n.join("")};return this.__bidiEngine__.doBidiReorder=function(t,e,r){if(function(t,e){if(e)for(var r=0;r<t.length;r++)e[r]=r;void 0===a&&(a=y(t)),void 0===s&&(s=y(t))}(t,e),i||!o||s)if(i&&o&&a^s)v=a?1:0,t=N(t,e,r);else if(!i&&o&&s)v=a?1:0,t=x(t,e,r),t=N(t,e);else if(!i||a||o||s){if(i&&!o&&a^s)t=N(t,e),a?(v=0,t=x(t,e,r)):(v=1,t=x(t,e,r),t=N(t,e));else if(i&&a&&!o&&s)v=1,t=x(t,e,r),t=N(t,e);else if(!i&&!o&&a^s){var n=c;a?(v=1,t=x(t,e,r),v=0,c=!1,t=x(t,e,r),c=n):(v=0,t=x(t,e,r),t=N(t,e),v=1,c=!1,t=x(t,e,r),c=n,t=N(t,e))}}else v=0,t=x(t,e,r);else v=a?1:0,t=x(t,e,r);return t},this.__bidiEngine__.setOptions=function(t){t&&(i=t.isInputVisual,o=t.isOutputVisual,a=t.isInputRtl,s=t.isOutputRtl,c=t.isSymmetricSwapping)},this.__bidiEngine__.setOptions(t),this.__bidiEngine__};var e=["BN","BN","BN","BN","BN","BN","BN","BN","BN","S","B","S","WS","B","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","B","B","B","S","WS","N","N","ET","ET","ET","N","N","N","N","N","ES","CS","ES","CS","CS","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","CS","N","N","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","N","N","BN","BN","BN","BN","BN","BN","B","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","CS","N","ET","ET","ET","ET","N","N","N","N","L","N","N","BN","N","N","ET","ET","EN","EN","N","L","N","N","N","EN","L","N","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","L","L","L","L","L","L","L","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","L","N","N","N","N","N","ET","N","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","R","NSM","R","NSM","NSM","R","NSM","NSM","R","NSM","N","N","N","N","N","N","N","N","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","N","N","N","N","N","R","R","R","R","R","N","N","N","N","N","N","N","N","N","N","N","AN","AN","AN","AN","AN","AN","N","N","AL","ET","ET","AL","CS","AL","N","N","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AL","AL","N","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AN","AN","AN","AN","AN","AN","AN","AN","AN","AN","ET","AN","AN","AL","AL","AL","NSM","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AN","N","NSM","NSM","NSM","NSM","NSM","NSM","AL","AL","NSM","NSM","N","NSM","NSM","NSM","NSM","AL","AL","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","N","AL","AL","NSM","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","N","N","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AL","N","N","N","N","N","N","N","N","N","N","N","N","N","N","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","R","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","R","R","N","N","N","N","R","N","N","N","N","N","WS","WS","WS","WS","WS","WS","WS","WS","WS","WS","WS","BN","BN","BN","L","R","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","WS","B","LRE","RLE","PDF","LRO","RLO","CS","ET","ET","ET","ET","ET","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","CS","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","WS","BN","BN","BN","BN","BN","N","LRI","RLI","FSI","PDI","BN","BN","BN","BN","BN","BN","EN","L","N","N","EN","EN","EN","EN","EN","EN","ES","ES","N","N","N","L","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","ES","ES","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","N","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","ET","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","L","L","L","L","L","L","L","N","N","N","N","N","N","N","N","N","N","N","N","L","L","L","L","L","N","N","N","N","N","R","NSM","R","R","R","R","R","R","R","R","R","R","ES","R","R","R","R","R","R","R","R","R","R","R","R","R","N","R","R","R","R","R","N","R","N","R","R","N","R","R","N","R","R","R","R","R","R","R","R","R","R","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","CS","N","CS","N","N","CS","N","N","N","N","N","N","N","N","N","ET","N","N","ES","ES","N","N","N","N","N","ET","ET","N","N","N","N","N","AL","AL","AL","AL","AL","N","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","N","N","BN","N","N","N","ET","ET","ET","N","N","N","N","N","ES","CS","ES","CS","CS","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","CS","N","N","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","N","N","N","N","N","N","N","N","N","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","N","N","N","L","L","L","L","L","L","N","N","L","L","L","L","L","L","N","N","L","L","L","L","L","L","N","N","L","L","L","N","N","N","ET","ET","N","N","N","ET","ET","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N","N"],r=new t.__bidiEngine__({isInputVisual:!0});t.API.events.push(["postProcessText",function(t){var e=t.text,n=(t.x,t.y,t.options||{}),i=(t.mutex,n.lang,[]);if(n.isInputVisual="boolean"!=typeof n.isInputVisual||n.isInputVisual,r.setOptions(n),"[object Array]"===Object.prototype.toString.call(e)){var a=0;for(i=[],a=0;a<e.length;a+=1)"[object Array]"===Object.prototype.toString.call(e[a])?i.push([r.doBidiReorder(e[a][0]),e[a][1],e[a][2]]):i.push([r.doBidiReorder(e[a])]);t.text=i}else t.text=r.doBidiReorder(e);r.setOptions({isInputVisual:!0})}])}(E),E.API.TTFFont=function(){function t(t){var e;if(this.rawData=t,e=this.contents=new ne(t),this.contents.pos=4,"ttcf"===e.readString(4))throw new Error("TTCF not supported.");e.pos=0,this.parse(),this.subset=new Le(this),this.registerTTF()}return t.open=function(e){return new t(e)},t.prototype.parse=function(){return this.directory=new ie(this.contents),this.head=new se(this),this.name=new pe(this),this.cmap=new ue(this),this.toUnicode={},this.hhea=new he(this),this.maxp=new ge(this),this.hmtx=new me(this),this.post=new fe(this),this.os2=new le(this),this.loca=new Ne(this),this.glyf=new be(this),this.ascender=this.os2.exists&&this.os2.ascender||this.hhea.ascender,this.decender=this.os2.exists&&this.os2.decender||this.hhea.decender,this.lineGap=this.os2.exists&&this.os2.lineGap||this.hhea.lineGap,this.bbox=[this.head.xMin,this.head.yMin,this.head.xMax,this.head.yMax]},t.prototype.registerTTF=function(){var t,e,r,n,i;if(this.scaleFactor=1e3/this.head.unitsPerEm,this.bbox=function(){var e,r,n,i;for(i=[],e=0,r=(n=this.bbox).length;e<r;e++)t=n[e],i.push(Math.round(t*this.scaleFactor));return i}.call(this),this.stemV=0,this.post.exists?(r=255&(n=this.post.italic_angle),0!=(32768&(e=n>>16))&&(e=-(1+(65535^e))),this.italicAngle=+(e+"."+r)):this.italicAngle=0,this.ascender=Math.round(this.ascender*this.scaleFactor),this.decender=Math.round(this.decender*this.scaleFactor),this.lineGap=Math.round(this.lineGap*this.scaleFactor),this.capHeight=this.os2.exists&&this.os2.capHeight||this.ascender,this.xHeight=this.os2.exists&&this.os2.xHeight||0,this.familyClass=(this.os2.exists&&this.os2.familyClass||0)>>8,this.isSerif=1===(i=this.familyClass)||2===i||3===i||4===i||5===i||7===i,this.isScript=10===this.familyClass,this.flags=0,this.post.isFixedPitch&&(this.flags|=1),this.isSerif&&(this.flags|=2),this.isScript&&(this.flags|=8),0!==this.italicAngle&&(this.flags|=64),this.flags|=32,!this.cmap.unicode)throw new Error("No unicode cmap for font")},t.prototype.characterToGlyph=function(t){var e;return(null!=(e=this.cmap.unicode)?e.codeMap[t]:void 0)||0},t.prototype.widthOfGlyph=function(t){var e;return e=1e3/this.head.unitsPerEm,this.hmtx.forGlyph(t).advance*e},t.prototype.widthOfString=function(t,e,r){var n,i,a,o;for(a=0,i=0,o=(t=""+t).length;0<=o?i<o:i>o;i=0<=o?++i:--i)n=t.charCodeAt(i),a+=this.widthOfGlyph(this.characterToGlyph(n))+r*(1e3/e)||0;return a*(e/1e3)},t.prototype.lineHeight=function(t,e){var r;return null==e&&(e=!1),r=e?this.lineGap:0,(this.ascender+r-this.decender)/1e3*t},t}();var re,ne=function(){function t(t){this.data=null!=t?t:[],this.pos=0,this.length=this.data.length}return t.prototype.readByte=function(){return this.data[this.pos++]},t.prototype.writeByte=function(t){return this.data[this.pos++]=t},t.prototype.readUInt32=function(){return 16777216*this.readByte()+(this.readByte()<<16)+(this.readByte()<<8)+this.readByte()},t.prototype.writeUInt32=function(t){return this.writeByte(t>>>24&255),this.writeByte(t>>16&255),this.writeByte(t>>8&255),this.writeByte(255&t)},t.prototype.readInt32=function(){var t;return(t=this.readUInt32())>=2147483648?t-4294967296:t},t.prototype.writeInt32=function(t){return t<0&&(t+=4294967296),this.writeUInt32(t)},t.prototype.readUInt16=function(){return this.readByte()<<8|this.readByte()},t.prototype.writeUInt16=function(t){return this.writeByte(t>>8&255),this.writeByte(255&t)},t.prototype.readInt16=function(){var t;return(t=this.readUInt16())>=32768?t-65536:t},t.prototype.writeInt16=function(t){return t<0&&(t+=65536),this.writeUInt16(t)},t.prototype.readString=function(t){var e,r;for(r=[],e=0;0<=t?e<t:e>t;e=0<=t?++e:--e)r[e]=String.fromCharCode(this.readByte());return r.join("")},t.prototype.writeString=function(t){var e,r,n;for(n=[],e=0,r=t.length;0<=r?e<r:e>r;e=0<=r?++e:--e)n.push(this.writeByte(t.charCodeAt(e)));return n},t.prototype.readShort=function(){return this.readInt16()},t.prototype.writeShort=function(t){return this.writeInt16(t)},t.prototype.readLongLong=function(){var t,e,r,n,i,a,o,s;return t=this.readByte(),e=this.readByte(),r=this.readByte(),n=this.readByte(),i=this.readByte(),a=this.readByte(),o=this.readByte(),s=this.readByte(),128&t?-1*(72057594037927940*(255^t)+281474976710656*(255^e)+1099511627776*(255^r)+4294967296*(255^n)+16777216*(255^i)+65536*(255^a)+256*(255^o)+(255^s)+1):72057594037927940*t+281474976710656*e+1099511627776*r+4294967296*n+16777216*i+65536*a+256*o+s},t.prototype.writeLongLong=function(t){var e,r;return e=Math.floor(t/4294967296),r=4294967295&t,this.writeByte(e>>24&255),this.writeByte(e>>16&255),this.writeByte(e>>8&255),this.writeByte(255&e),this.writeByte(r>>24&255),this.writeByte(r>>16&255),this.writeByte(r>>8&255),this.writeByte(255&r)},t.prototype.readInt=function(){return this.readInt32()},t.prototype.writeInt=function(t){return this.writeInt32(t)},t.prototype.read=function(t){var e,r;for(e=[],r=0;0<=t?r<t:r>t;r=0<=t?++r:--r)e.push(this.readByte());return e},t.prototype.write=function(t){var e,r,n,i;for(i=[],r=0,n=t.length;r<n;r++)e=t[r],i.push(this.writeByte(e));return i},t}(),ie=function(){var t;function e(t){var e,r,n;for(this.scalarType=t.readInt(),this.tableCount=t.readShort(),this.searchRange=t.readShort(),this.entrySelector=t.readShort(),this.rangeShift=t.readShort(),this.tables={},r=0,n=this.tableCount;0<=n?r<n:r>n;r=0<=n?++r:--r)e={tag:t.readString(4),checksum:t.readInt(),offset:t.readInt(),length:t.readInt()},this.tables[e.tag]=e}return e.prototype.encode=function(e){var r,n,i,a,o,s,c,u,h,l,f,d,p;for(p in f=Object.keys(e).length,s=Math.log(2),h=16*Math.floor(Math.log(f)/s),a=Math.floor(h/s),u=16*f-h,(n=new ne).writeInt(this.scalarType),n.writeShort(f),n.writeShort(h),n.writeShort(a),n.writeShort(u),i=16*f,c=n.pos+i,o=null,d=[],e)for(l=e[p],n.writeString(p),n.writeInt(t(l)),n.writeInt(c),n.writeInt(l.length),d=d.concat(l),"head"===p&&(o=c),c+=l.length;c%4;)d.push(0),c++;return n.write(d),r=2981146554-t(n.data),n.pos=o+8,n.writeUInt32(r),n.data},t=function(t){var e,r,n,i;for(t=ve.call(t);t.length%4;)t.push(0);for(n=new ne(t),r=0,e=0,i=t.length;e<i;e=e+=4)r+=n.readUInt32();return 4294967295&r},e}(),ae={}.hasOwnProperty,oe=function(t,e){for(var r in e)ae.call(e,r)&&(t[r]=e[r]);function n(){this.constructor=t}return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t};re=function(){function t(t){var e;this.file=t,e=this.file.directory.tables[this.tag],this.exists=!!e,e&&(this.offset=e.offset,this.length=e.length,this.parse(this.file.contents))}return t.prototype.parse=function(){},t.prototype.encode=function(){},t.prototype.raw=function(){return this.exists?(this.file.contents.pos=this.offset,this.file.contents.read(this.length)):null},t}();var se=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return oe(e,re),e.prototype.tag="head",e.prototype.parse=function(t){return t.pos=this.offset,this.version=t.readInt(),this.revision=t.readInt(),this.checkSumAdjustment=t.readInt(),this.magicNumber=t.readInt(),this.flags=t.readShort(),this.unitsPerEm=t.readShort(),this.created=t.readLongLong(),this.modified=t.readLongLong(),this.xMin=t.readShort(),this.yMin=t.readShort(),this.xMax=t.readShort(),this.yMax=t.readShort(),this.macStyle=t.readShort(),this.lowestRecPPEM=t.readShort(),this.fontDirectionHint=t.readShort(),this.indexToLocFormat=t.readShort(),this.glyphDataFormat=t.readShort()},e.prototype.encode=function(t){var e;return(e=new ne).writeInt(this.version),e.writeInt(this.revision),e.writeInt(this.checkSumAdjustment),e.writeInt(this.magicNumber),e.writeShort(this.flags),e.writeShort(this.unitsPerEm),e.writeLongLong(this.created),e.writeLongLong(this.modified),e.writeShort(this.xMin),e.writeShort(this.yMin),e.writeShort(this.xMax),e.writeShort(this.yMax),e.writeShort(this.macStyle),e.writeShort(this.lowestRecPPEM),e.writeShort(this.fontDirectionHint),e.writeShort(t),e.writeShort(this.glyphDataFormat),e.data},e}(),ce=function(){function t(t,e){var r,n,i,a,o,s,c,u,h,l,f,d,p,g,m,v,b;switch(this.platformID=t.readUInt16(),this.encodingID=t.readShort(),this.offset=e+t.readInt(),h=t.pos,t.pos=this.offset,this.format=t.readUInt16(),this.length=t.readUInt16(),this.language=t.readUInt16(),this.isUnicode=3===this.platformID&&1===this.encodingID&&4===this.format||0===this.platformID&&4===this.format,this.codeMap={},this.format){case 0:for(s=0;s<256;++s)this.codeMap[s]=t.readByte();break;case 4:for(f=t.readUInt16(),l=f/2,t.pos+=6,i=function(){var e,r;for(r=[],s=e=0;0<=l?e<l:e>l;s=0<=l?++e:--e)r.push(t.readUInt16());return r}(),t.pos+=2,p=function(){var e,r;for(r=[],s=e=0;0<=l?e<l:e>l;s=0<=l?++e:--e)r.push(t.readUInt16());return r}(),c=function(){var e,r;for(r=[],s=e=0;0<=l?e<l:e>l;s=0<=l?++e:--e)r.push(t.readUInt16());return r}(),u=function(){var e,r;for(r=[],s=e=0;0<=l?e<l:e>l;s=0<=l?++e:--e)r.push(t.readUInt16());return r}(),n=(this.length-t.pos+this.offset)/2,o=function(){var e,r;for(r=[],s=e=0;0<=n?e<n:e>n;s=0<=n?++e:--e)r.push(t.readUInt16());return r}(),s=m=0,b=i.length;m<b;s=++m)for(g=i[s],r=v=d=p[s];d<=g?v<=g:v>=g;r=d<=g?++v:--v)0===u[s]?a=r+c[s]:0!==(a=o[u[s]/2+(r-d)-(l-s)]||0)&&(a+=c[s]),this.codeMap[r]=65535&a}t.pos=h}return t.encode=function(t,e){var r,n,i,a,o,s,c,u,h,l,f,d,p,g,m,v,b,y,w,N,L,A,x,S,_,P,k,I,F,C,j,O,B,M,E,q,D,R,T,U,z,H,W,V,G,Y;switch(I=new ne,a=Object.keys(t).sort((function(t,e){return t-e})),e){case"macroman":for(p=0,g=function(){var t=[];for(d=0;d<256;++d)t.push(0);return t}(),v={0:0},i={},F=0,B=a.length;F<B;F++)null==v[W=t[n=a[F]]]&&(v[W]=++p),i[n]={old:t[n],new:v[t[n]]},g[n]=v[t[n]];return I.writeUInt16(1),I.writeUInt16(0),I.writeUInt32(12),I.writeUInt16(0),I.writeUInt16(262),I.writeUInt16(0),I.write(g),{charMap:i,subtable:I.data,maxGlyphID:p+1};case"unicode":for(P=[],h=[],b=0,v={},r={},m=c=null,C=0,M=a.length;C<M;C++)null==v[w=t[n=a[C]]]&&(v[w]=++b),r[n]={old:w,new:v[w]},o=v[w]-n,null!=m&&o===c||(m&&h.push(m),P.push(n),c=o),m=n;for(m&&h.push(m),h.push(65535),P.push(65535),S=2*(x=P.length),A=2*Math.pow(Math.log(x)/Math.LN2,2),l=Math.log(A/2)/Math.LN2,L=2*x-A,s=[],N=[],f=[],d=j=0,E=P.length;j<E;d=++j){if(_=P[d],u=h[d],65535===_){s.push(0),N.push(0);break}if(_-(k=r[_].new)>=32768)for(s.push(0),N.push(2*(f.length+x-d)),n=O=_;_<=u?O<=u:O>=u;n=_<=u?++O:--O)f.push(r[n].new);else s.push(k-_),N.push(0)}for(I.writeUInt16(3),I.writeUInt16(1),I.writeUInt32(12),I.writeUInt16(4),I.writeUInt16(16+8*x+2*f.length),I.writeUInt16(0),I.writeUInt16(S),I.writeUInt16(A),I.writeUInt16(l),I.writeUInt16(L),z=0,q=h.length;z<q;z++)n=h[z],I.writeUInt16(n);for(I.writeUInt16(0),H=0,D=P.length;H<D;H++)n=P[H],I.writeUInt16(n);for(V=0,R=s.length;V<R;V++)o=s[V],I.writeUInt16(o);for(G=0,T=N.length;G<T;G++)y=N[G],I.writeUInt16(y);for(Y=0,U=f.length;Y<U;Y++)p=f[Y],I.writeUInt16(p);return{charMap:r,subtable:I.data,maxGlyphID:b+1}}},t}(),ue=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return oe(e,re),e.prototype.tag="cmap",e.prototype.parse=function(t){var e,r,n;for(t.pos=this.offset,this.version=t.readUInt16(),n=t.readUInt16(),this.tables=[],this.unicode=null,r=0;0<=n?r<n:r>n;r=0<=n?++r:--r)e=new ce(t,this.offset),this.tables.push(e),e.isUnicode&&null==this.unicode&&(this.unicode=e);return!0},e.encode=function(t,e){var r,n;return null==e&&(e="macroman"),r=ce.encode(t,e),(n=new ne).writeUInt16(0),n.writeUInt16(1),r.table=n.data.concat(r.subtable),r},e}(),he=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return oe(e,re),e.prototype.tag="hhea",e.prototype.parse=function(t){return t.pos=this.offset,this.version=t.readInt(),this.ascender=t.readShort(),this.decender=t.readShort(),this.lineGap=t.readShort(),this.advanceWidthMax=t.readShort(),this.minLeftSideBearing=t.readShort(),this.minRightSideBearing=t.readShort(),this.xMaxExtent=t.readShort(),this.caretSlopeRise=t.readShort(),this.caretSlopeRun=t.readShort(),this.caretOffset=t.readShort(),t.pos+=8,this.metricDataFormat=t.readShort(),this.numberOfMetrics=t.readUInt16()},e}(),le=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return oe(e,re),e.prototype.tag="OS/2",e.prototype.parse=function(t){if(t.pos=this.offset,this.version=t.readUInt16(),this.averageCharWidth=t.readShort(),this.weightClass=t.readUInt16(),this.widthClass=t.readUInt16(),this.type=t.readShort(),this.ySubscriptXSize=t.readShort(),this.ySubscriptYSize=t.readShort(),this.ySubscriptXOffset=t.readShort(),this.ySubscriptYOffset=t.readShort(),this.ySuperscriptXSize=t.readShort(),this.ySuperscriptYSize=t.readShort(),this.ySuperscriptXOffset=t.readShort(),this.ySuperscriptYOffset=t.readShort(),this.yStrikeoutSize=t.readShort(),this.yStrikeoutPosition=t.readShort(),this.familyClass=t.readShort(),this.panose=function(){var e,r;for(r=[],e=0;e<10;++e)r.push(t.readByte());return r}(),this.charRange=function(){var e,r;for(r=[],e=0;e<4;++e)r.push(t.readInt());return r}(),this.vendorID=t.readString(4),this.selection=t.readShort(),this.firstCharIndex=t.readShort(),this.lastCharIndex=t.readShort(),this.version>0&&(this.ascent=t.readShort(),this.descent=t.readShort(),this.lineGap=t.readShort(),this.winAscent=t.readShort(),this.winDescent=t.readShort(),this.codePageRange=function(){var e,r;for(r=[],e=0;e<2;e=++e)r.push(t.readInt());return r}(),this.version>1))return this.xHeight=t.readShort(),this.capHeight=t.readShort(),this.defaultChar=t.readShort(),this.breakChar=t.readShort(),this.maxContext=t.readShort()},e}(),fe=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return oe(e,re),e.prototype.tag="post",e.prototype.parse=function(t){var e,r,n;switch(t.pos=this.offset,this.format=t.readInt(),this.italicAngle=t.readInt(),this.underlinePosition=t.readShort(),this.underlineThickness=t.readShort(),this.isFixedPitch=t.readInt(),this.minMemType42=t.readInt(),this.maxMemType42=t.readInt(),this.minMemType1=t.readInt(),this.maxMemType1=t.readInt(),this.format){case 65536:break;case 131072:var i;for(r=t.readUInt16(),this.glyphNameIndex=[],i=0;0<=r?i<r:i>r;i=0<=r?++i:--i)this.glyphNameIndex.push(t.readUInt16());for(this.names=[],n=[];t.pos<this.offset+this.length;)e=t.readByte(),n.push(this.names.push(t.readString(e)));return n;case 151552:return r=t.readUInt16(),this.offsets=t.read(r);case 196608:break;case 262144:return this.map=function(){var e,r,n;for(n=[],i=e=0,r=this.file.maxp.numGlyphs;0<=r?e<r:e>r;i=0<=r?++e:--e)n.push(t.readUInt32());return n}.call(this)}},e}(),de=function(t,e){this.raw=t,this.length=t.length,this.platformID=e.platformID,this.encodingID=e.encodingID,this.languageID=e.languageID},pe=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return oe(e,re),e.prototype.tag="name",e.prototype.parse=function(t){var e,r,n,i,a,o,s,c,u,h,l;for(t.pos=this.offset,t.readShort(),e=t.readShort(),o=t.readShort(),r=[],i=0;0<=e?i<e:i>e;i=0<=e?++i:--i)r.push({platformID:t.readShort(),encodingID:t.readShort(),languageID:t.readShort(),nameID:t.readShort(),length:t.readShort(),offset:this.offset+o+t.readShort()});for(s={},i=u=0,h=r.length;u<h;i=++u)n=r[i],t.pos=n.offset,c=t.readString(n.length),a=new de(c,n),null==s[l=n.nameID]&&(s[l]=[]),s[n.nameID].push(a);this.strings=s,this.copyright=s[0],this.fontFamily=s[1],this.fontSubfamily=s[2],this.uniqueSubfamily=s[3],this.fontName=s[4],this.version=s[5];try{this.postscriptName=s[6][0].raw.replace(/[\x00-\x19\x80-\xff]/g,"")}catch(t){this.postscriptName=s[4][0].raw.replace(/[\x00-\x19\x80-\xff]/g,"")}return this.trademark=s[7],this.manufacturer=s[8],this.designer=s[9],this.description=s[10],this.vendorUrl=s[11],this.designerUrl=s[12],this.license=s[13],this.licenseUrl=s[14],this.preferredFamily=s[15],this.preferredSubfamily=s[17],this.compatibleFull=s[18],this.sampleText=s[19]},e}(),ge=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return oe(e,re),e.prototype.tag="maxp",e.prototype.parse=function(t){return t.pos=this.offset,this.version=t.readInt(),this.numGlyphs=t.readUInt16(),this.maxPoints=t.readUInt16(),this.maxContours=t.readUInt16(),this.maxCompositePoints=t.readUInt16(),this.maxComponentContours=t.readUInt16(),this.maxZones=t.readUInt16(),this.maxTwilightPoints=t.readUInt16(),this.maxStorage=t.readUInt16(),this.maxFunctionDefs=t.readUInt16(),this.maxInstructionDefs=t.readUInt16(),this.maxStackElements=t.readUInt16(),this.maxSizeOfInstructions=t.readUInt16(),this.maxComponentElements=t.readUInt16(),this.maxComponentDepth=t.readUInt16()},e}(),me=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return oe(e,re),e.prototype.tag="hmtx",e.prototype.parse=function(t){var e,r,n,i,a,o,s;for(t.pos=this.offset,this.metrics=[],e=0,o=this.file.hhea.numberOfMetrics;0<=o?e<o:e>o;e=0<=o?++e:--e)this.metrics.push({advance:t.readUInt16(),lsb:t.readInt16()});for(n=this.file.maxp.numGlyphs-this.file.hhea.numberOfMetrics,this.leftSideBearings=function(){var r,i;for(i=[],e=r=0;0<=n?r<n:r>n;e=0<=n?++r:--r)i.push(t.readInt16());return i}(),this.widths=function(){var t,e,r,n;for(n=[],t=0,e=(r=this.metrics).length;t<e;t++)i=r[t],n.push(i.advance);return n}.call(this),r=this.widths[this.widths.length-1],s=[],e=a=0;0<=n?a<n:a>n;e=0<=n?++a:--a)s.push(this.widths.push(r));return s},e.prototype.forGlyph=function(t){return t in this.metrics?this.metrics[t]:{advance:this.metrics[this.metrics.length-1].advance,lsb:this.leftSideBearings[t-this.metrics.length]}},e}(),ve=[].slice,be=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return oe(e,re),e.prototype.tag="glyf",e.prototype.parse=function(){return this.cache={}},e.prototype.glyphFor=function(t){var e,r,n,i,a,o,s,c,u,h;return t in this.cache?this.cache[t]:(i=this.file.loca,e=this.file.contents,r=i.indexOf(t),0===(n=i.lengthOf(t))?this.cache[t]=null:(e.pos=this.offset+r,a=(o=new ne(e.read(n))).readShort(),c=o.readShort(),h=o.readShort(),s=o.readShort(),u=o.readShort(),this.cache[t]=-1===a?new we(o,c,h,s,u):new ye(o,a,c,h,s,u),this.cache[t]))},e.prototype.encode=function(t,e,r){var n,i,a,o,s;for(a=[],i=[],o=0,s=e.length;o<s;o++)n=t[e[o]],i.push(a.length),n&&(a=a.concat(n.encode(r)));return i.push(a.length),{table:a,offsets:i}},e}(),ye=function(){function t(t,e,r,n,i,a){this.raw=t,this.numberOfContours=e,this.xMin=r,this.yMin=n,this.xMax=i,this.yMax=a,this.compound=!1}return t.prototype.encode=function(){return this.raw.data},t}(),we=function(){function t(t,e,r,n,i){var a,o;for(this.raw=t,this.xMin=e,this.yMin=r,this.xMax=n,this.yMax=i,this.compound=!0,this.glyphIDs=[],this.glyphOffsets=[],a=this.raw;o=a.readShort(),this.glyphOffsets.push(a.pos),this.glyphIDs.push(a.readUInt16()),32&o;)a.pos+=1&o?4:2,128&o?a.pos+=8:64&o?a.pos+=4:8&o&&(a.pos+=2)}return 1,8,32,64,128,t.prototype.encode=function(){var t,e,r;for(e=new ne(ve.call(this.raw.data)),t=0,r=this.glyphIDs.length;t<r;++t)e.pos=this.glyphOffsets[t];return e.data},t}(),Ne=function(t){function e(){return e.__super__.constructor.apply(this,arguments)}return oe(e,re),e.prototype.tag="loca",e.prototype.parse=function(t){var e,r;return t.pos=this.offset,e=this.file.head.indexToLocFormat,this.offsets=0===e?function(){var e,n;for(n=[],r=0,e=this.length;r<e;r+=2)n.push(2*t.readUInt16());return n}.call(this):function(){var e,n;for(n=[],r=0,e=this.length;r<e;r+=4)n.push(t.readUInt32());return n}.call(this)},e.prototype.indexOf=function(t){return this.offsets[t]},e.prototype.lengthOf=function(t){return this.offsets[t+1]-this.offsets[t]},e.prototype.encode=function(t,e){for(var r=new Uint32Array(this.offsets.length),n=0,i=0,a=0;a<r.length;++a)if(r[a]=n,i<e.length&&e[i]==a){++i,r[a]=n;var o=this.offsets[a],s=this.offsets[a+1]-o;s>0&&(n+=s)}for(var c=new Array(4*r.length),u=0;u<r.length;++u)c[4*u+3]=255&r[u],c[4*u+2]=(65280&r[u])>>8,c[4*u+1]=(16711680&r[u])>>16,c[4*u]=(4278190080&r[u])>>24;return c},e}(),Le=function(){function t(t){this.font=t,this.subset={},this.unicodes={},this.next=33}return t.prototype.generateCmap=function(){var t,e,r,n,i;for(e in n=this.font.cmap.tables[0].codeMap,t={},i=this.subset)r=i[e],t[e]=n[r];return t},t.prototype.glyphsFor=function(t){var e,r,n,i,a,o,s;for(n={},a=0,o=t.length;a<o;a++)n[i=t[a]]=this.font.glyf.glyphFor(i);for(i in e=[],n)(null!=(r=n[i])?r.compound:void 0)&&e.push.apply(e,r.glyphIDs);if(e.length>0)for(i in s=this.glyphsFor(e))r=s[i],n[i]=r;return n},t.prototype.encode=function(t,e){var r,n,i,a,o,s,c,u,h,l,f,d,p,g,m;for(n in r=ue.encode(this.generateCmap(),"unicode"),a=this.glyphsFor(t),f={0:0},m=r.charMap)f[(s=m[n]).old]=s.new;for(d in l=r.maxGlyphID,a)d in f||(f[d]=l++);return u=function(t){var e,r;for(e in r={},t)r[t[e]]=e;return r}(f),h=Object.keys(u).sort((function(t,e){return t-e})),p=function(){var t,e,r;for(r=[],t=0,e=h.length;t<e;t++)o=h[t],r.push(u[o]);return r}(),i=this.font.glyf.encode(a,p,f),c=this.font.loca.encode(i.offsets,p),g={cmap:this.font.cmap.raw(),glyf:i.table,loca:c,hmtx:this.font.hmtx.raw(),hhea:this.font.hhea.raw(),maxp:this.font.maxp.raw(),post:this.font.post.raw(),name:this.font.name.raw(),head:this.font.head.encode(e)},this.font.os2.exists&&(g["OS/2"]=this.font.os2.raw()),this.font.directory.encode(g)},t}();E.API.PDFObject=function(){var t;function e(){}return t=function(t,e){return(Array(e+1).join("0")+t).slice(-e)},e.convert=function(r){var n,i,a,o;if(Array.isArray(r))return"["+function(){var t,i,a;for(a=[],t=0,i=r.length;t<i;t++)n=r[t],a.push(e.convert(n));return a}().join(" ")+"]";if("string"==typeof r)return"/"+r;if(null!=r?r.isString:void 0)return"("+r+")";if(r instanceof Date)return"(D:"+t(r.getUTCFullYear(),4)+t(r.getUTCMonth(),2)+t(r.getUTCDate(),2)+t(r.getUTCHours(),2)+t(r.getUTCMinutes(),2)+t(r.getUTCSeconds(),2)+"Z)";if("[object Object]"==={}.toString.call(r)){for(i in a=["<<"],r)o=r[i],a.push("/"+i+" "+e.convert(o));return a.push(">>"),a.join("\n")}return""+r},e}();/* harmony default export */ __webpack_exports__["default"] = (E);


/***/ }),
/* 60 */
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _typeof; }
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AsyncCompress: function() { return /* binding */ AsyncGzip; },
/* harmony export */   AsyncDecompress: function() { return /* binding */ AsyncDecompress; },
/* harmony export */   AsyncDeflate: function() { return /* binding */ AsyncDeflate; },
/* harmony export */   AsyncGunzip: function() { return /* binding */ AsyncGunzip; },
/* harmony export */   AsyncGzip: function() { return /* binding */ AsyncGzip; },
/* harmony export */   AsyncInflate: function() { return /* binding */ AsyncInflate; },
/* harmony export */   AsyncUnzlib: function() { return /* binding */ AsyncUnzlib; },
/* harmony export */   AsyncZlib: function() { return /* binding */ AsyncZlib; },
/* harmony export */   Compress: function() { return /* binding */ Gzip; },
/* harmony export */   Decompress: function() { return /* binding */ Decompress; },
/* harmony export */   Deflate: function() { return /* binding */ Deflate; },
/* harmony export */   Gunzip: function() { return /* binding */ Gunzip; },
/* harmony export */   Gzip: function() { return /* binding */ Gzip; },
/* harmony export */   Inflate: function() { return /* binding */ Inflate; },
/* harmony export */   Unzlib: function() { return /* binding */ Unzlib; },
/* harmony export */   Zlib: function() { return /* binding */ Zlib; },
/* harmony export */   compress: function() { return /* binding */ gzip; },
/* harmony export */   compressSync: function() { return /* binding */ gzipSync; },
/* harmony export */   decompress: function() { return /* binding */ decompress; },
/* harmony export */   decompressSync: function() { return /* binding */ decompressSync; },
/* harmony export */   deflate: function() { return /* binding */ deflate; },
/* harmony export */   deflateSync: function() { return /* binding */ deflateSync; },
/* harmony export */   gunzip: function() { return /* binding */ gunzip; },
/* harmony export */   gunzipSync: function() { return /* binding */ gunzipSync; },
/* harmony export */   gzip: function() { return /* binding */ gzip; },
/* harmony export */   gzipSync: function() { return /* binding */ gzipSync; },
/* harmony export */   inflate: function() { return /* binding */ inflate; },
/* harmony export */   inflateSync: function() { return /* binding */ inflateSync; },
/* harmony export */   strFromU8: function() { return /* binding */ strFromU8; },
/* harmony export */   strToU8: function() { return /* binding */ strToU8; },
/* harmony export */   unzip: function() { return /* binding */ unzip; },
/* harmony export */   unzipSync: function() { return /* binding */ unzipSync; },
/* harmony export */   unzlib: function() { return /* binding */ unzlib; },
/* harmony export */   unzlibSync: function() { return /* binding */ unzlibSync; },
/* harmony export */   zip: function() { return /* binding */ zip; },
/* harmony export */   zipSync: function() { return /* binding */ zipSync; },
/* harmony export */   zlib: function() { return /* binding */ zlib; },
/* harmony export */   zlibSync: function() { return /* binding */ zlibSync; }
/* harmony export */ });
// DEFLATE is a complex format; to read this code, you should probably check the RFC first:
// https://tools.ietf.org/html/rfc1951
// You may also wish to take a look at the guide I made about this program:
// https://gist.github.com/101arrowz/253f31eb5abc3d9275ab943003ffecad
// Much of the following code is similar to that of UZIP.js:
// https://github.com/photopea/UZIP.js
// Many optimizations have been made, so the bundle size is ultimately smaller but performance is similar.
// Sometimes 0 will appear where -1 would be more appropriate. This is because using a uint
// is better for memory in most engines (I *think*).
var ch2 = {};
var wk = (function (c, id, msg, transfer, cb) {
    var u = ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([c], { type: 'text/javascript' })));
    var w = new Worker(u);
    w.onerror = function (e) { return cb(e.error, null); };
    w.onmessage = function (e) { return cb(null, e.data); };
    w.postMessage(msg, transfer);
    return w;
});

// aliases for shorter compressed code (most minifers don't do this)
var u8 = Uint8Array, u16 = Uint16Array, u32 = Uint32Array;
// fixed length extra bits
var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, /* unused */ 0, 0, /* impossible */ 0]);
// fixed distance extra bits
// see fleb note
var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, /* unused */ 0, 0]);
// code length index map
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
// get base, reverse index map from extra bits
var freb = function (eb, start) {
    var b = new u16(31);
    for (var i = 0; i < 31; ++i) {
        b[i] = start += 1 << eb[i - 1];
    }
    // numbers here are at max 18 bits
    var r = new u32(b[30]);
    for (var i = 1; i < 30; ++i) {
        for (var j = b[i]; j < b[i + 1]; ++j) {
            r[j] = ((j - b[i]) << 5) | i;
        }
    }
    return [b, r];
};
var _a = freb(fleb, 2), fl = _a[0], revfl = _a[1];
// we can ignore the fact that the other numbers are wrong; they never happen anyway
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0), fd = _b[0], revfd = _b[1];
// map of value to reverse (assuming 16 bits)
var rev = new u16(32768);
for (var i = 0; i < 32768; ++i) {
    // reverse table algorithm from SO
    var x = ((i & 0xAAAA) >>> 1) | ((i & 0x5555) << 1);
    x = ((x & 0xCCCC) >>> 2) | ((x & 0x3333) << 2);
    x = ((x & 0xF0F0) >>> 4) | ((x & 0x0F0F) << 4);
    rev[i] = (((x & 0xFF00) >>> 8) | ((x & 0x00FF) << 8)) >>> 1;
}
// create huffman tree from u8 "map": index -> code length for code index
// mb (max bits) must be at most 15
// TODO: optimize/split up?
var hMap = (function (cd, mb, r) {
    var s = cd.length;
    // index
    var i = 0;
    // u16 "map": index -> # of codes with bit length = index
    var l = new u16(mb);
    // length of cd must be 288 (total # of codes)
    for (; i < s; ++i)
        ++l[cd[i] - 1];
    // u16 "map": index -> minimum code for bit length = index
    var le = new u16(mb);
    for (i = 0; i < mb; ++i) {
        le[i] = (le[i - 1] + l[i - 1]) << 1;
    }
    var co;
    if (r) {
        // u16 "map": index -> number of actual bits, symbol for code
        co = new u16(1 << mb);
        // bits to remove for reverser
        var rvb = 15 - mb;
        for (i = 0; i < s; ++i) {
            // ignore 0 lengths
            if (cd[i]) {
                // num encoding both symbol and bits read
                var sv = (i << 4) | cd[i];
                // free bits
                var r_1 = mb - cd[i];
                // start value
                var v = le[cd[i] - 1]++ << r_1;
                // m is end value
                for (var m = v | ((1 << r_1) - 1); v <= m; ++v) {
                    // every 16 bit value starting with the code yields the same result
                    co[rev[v] >>> rvb] = sv;
                }
            }
        }
    }
    else {
        co = new u16(s);
        for (i = 0; i < s; ++i)
            co[i] = rev[le[cd[i] - 1]++] >>> (15 - cd[i]);
    }
    return co;
});
// fixed length tree
var flt = new u8(288);
for (var i = 0; i < 144; ++i)
    flt[i] = 8;
for (var i = 144; i < 256; ++i)
    flt[i] = 9;
for (var i = 256; i < 280; ++i)
    flt[i] = 7;
for (var i = 280; i < 288; ++i)
    flt[i] = 8;
// fixed distance tree
var fdt = new u8(32);
for (var i = 0; i < 32; ++i)
    fdt[i] = 5;
// fixed length map
var flm = /*#__PURE__*/ hMap(flt, 9, 0), flrm = /*#__PURE__*/ hMap(flt, 9, 1);
// fixed distance map
var fdm = /*#__PURE__*/ hMap(fdt, 5, 0), fdrm = /*#__PURE__*/ hMap(fdt, 5, 1);
// find max of array
var max = function (a) {
    var m = a[0];
    for (var i = 1; i < a.length; ++i) {
        if (a[i] > m)
            m = a[i];
    }
    return m;
};
// read d, starting at bit p and mask with m
var bits = function (d, p, m) {
    var o = (p / 8) >> 0;
    return ((d[o] | (d[o + 1] << 8)) >>> (p & 7)) & m;
};
// read d, starting at bit p continuing for at least 16 bits
var bits16 = function (d, p) {
    var o = (p / 8) >> 0;
    return ((d[o] | (d[o + 1] << 8) | (d[o + 2] << 16)) >>> (p & 7));
};
// get end of byte
var shft = function (p) { return ((p / 8) >> 0) + (p & 7 && 1); };
// typed array slice - allows garbage collector to free original reference,
// while being more compatible than .slice
var slc = function (v, s, e) {
    if (s == null || s < 0)
        s = 0;
    if (e == null || e > v.length)
        e = v.length;
    // can't use .constructor in case user-supplied
    var n = new (v instanceof u16 ? u16 : v instanceof u32 ? u32 : u8)(e - s);
    n.set(v.subarray(s, e));
    return n;
};
// expands raw DEFLATE data
var inflt = function (dat, buf, st) {
    // source length
    var sl = dat.length;
    // have to estimate size
    var noBuf = !buf || st;
    // no state
    var noSt = !st || st.i;
    if (!st)
        st = {};
    // Assumes roughly 33% compression ratio average
    if (!buf)
        buf = new u8(sl * 3);
    // ensure buffer can fit at least l elements
    var cbuf = function (l) {
        var bl = buf.length;
        // need to increase size to fit
        if (l > bl) {
            // Double or set to necessary, whichever is greater
            var nbuf = new u8(Math.max(bl * 2, l));
            nbuf.set(buf);
            buf = nbuf;
        }
    };
    //  last chunk         bitpos           bytes
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    // total bits
    var tbts = sl * 8;
    do {
        if (!lm) {
            // BFINAL - this is only 1 when last chunk is next
            st.f = final = bits(dat, pos, 1);
            // type: 0 = no compression, 1 = fixed huffman, 2 = dynamic huffman
            var type = bits(dat, pos + 1, 3);
            pos += 3;
            if (!type) {
                // go to end of byte boundary
                var s = shft(pos) + 4, l = dat[s - 4] | (dat[s - 3] << 8), t = s + l;
                if (t > sl) {
                    if (noSt)
                        throw 'unexpected EOF';
                    break;
                }
                // ensure size
                if (noBuf)
                    cbuf(bt + l);
                // Copy over uncompressed data
                buf.set(dat.subarray(s, t), bt);
                // Get new bitpos, update byte count
                st.b = bt += l, st.p = pos = t * 8;
                continue;
            }
            else if (type == 1)
                lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
            else if (type == 2) {
                //  literal                            lengths
                var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
                var tl = hLit + bits(dat, pos + 5, 31) + 1;
                pos += 14;
                // length+distance tree
                var ldt = new u8(tl);
                // code length tree
                var clt = new u8(19);
                for (var i = 0; i < hcLen; ++i) {
                    // use index map to get real code
                    clt[clim[i]] = bits(dat, pos + i * 3, 7);
                }
                pos += hcLen * 3;
                // code lengths bits
                var clb = max(clt), clbmsk = (1 << clb) - 1;
                if (!noSt && pos + tl * (clb + 7) > tbts)
                    break;
                // code lengths map
                var clm = hMap(clt, clb, 1);
                for (var i = 0; i < tl;) {
                    var r = clm[bits(dat, pos, clbmsk)];
                    // bits read
                    pos += r & 15;
                    // symbol
                    var s = r >>> 4;
                    // code length to copy
                    if (s < 16) {
                        ldt[i++] = s;
                    }
                    else {
                        //  copy   count
                        var c = 0, n = 0;
                        if (s == 16)
                            n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
                        else if (s == 17)
                            n = 3 + bits(dat, pos, 7), pos += 3;
                        else if (s == 18)
                            n = 11 + bits(dat, pos, 127), pos += 7;
                        while (n--)
                            ldt[i++] = c;
                    }
                }
                //    length tree                 distance tree
                var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
                // max length bits
                lbt = max(lt);
                // max dist bits
                dbt = max(dt);
                lm = hMap(lt, lbt, 1);
                dm = hMap(dt, dbt, 1);
            }
            else
                throw 'invalid block type';
            if (pos > tbts)
                throw 'unexpected EOF';
        }
        // Make sure the buffer can hold this + the largest possible addition
        // Maximum chunk size (practically, theoretically infinite) is 2^17;
        if (noBuf)
            cbuf(bt + 131072);
        var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
        var mxa = lbt + dbt + 18;
        while (noSt || pos + mxa < tbts) {
            // bits read, code
            var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
            pos += c & 15;
            if (pos > tbts)
                throw 'unexpected EOF';
            if (!c)
                throw 'invalid length/literal';
            if (sym < 256)
                buf[bt++] = sym;
            else if (sym == 256) {
                lm = null;
                break;
            }
            else {
                var add = sym - 254;
                // no extra bits needed if less
                if (sym > 264) {
                    // index
                    var i = sym - 257, b = fleb[i];
                    add = bits(dat, pos, (1 << b) - 1) + fl[i];
                    pos += b;
                }
                // dist
                var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
                if (!d)
                    throw 'invalid distance';
                pos += d & 15;
                var dt = fd[dsym];
                if (dsym > 3) {
                    var b = fdeb[dsym];
                    dt += bits16(dat, pos) & ((1 << b) - 1), pos += b;
                }
                if (pos > tbts)
                    throw 'unexpected EOF';
                if (noBuf)
                    cbuf(bt + 131072);
                var end = bt + add;
                for (; bt < end; bt += 4) {
                    buf[bt] = buf[bt - dt];
                    buf[bt + 1] = buf[bt + 1 - dt];
                    buf[bt + 2] = buf[bt + 2 - dt];
                    buf[bt + 3] = buf[bt + 3 - dt];
                }
                bt = end;
            }
        }
        st.l = lm, st.p = pos, st.b = bt;
        if (lm)
            final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    } while (!final);
    return bt == buf.length ? buf : slc(buf, 0, bt);
};
// starting at p, write the minimum number of bits that can hold v to d
var wbits = function (d, p, v) {
    v <<= p & 7;
    var o = (p / 8) >> 0;
    d[o] |= v;
    d[o + 1] |= v >>> 8;
};
// starting at p, write the minimum number of bits (>8) that can hold v to d
var wbits16 = function (d, p, v) {
    v <<= p & 7;
    var o = (p / 8) >> 0;
    d[o] |= v;
    d[o + 1] |= v >>> 8;
    d[o + 2] |= v >>> 16;
};
// creates code lengths from a frequency table
var hTree = function (d, mb) {
    // Need extra info to make a tree
    var t = [];
    for (var i = 0; i < d.length; ++i) {
        if (d[i])
            t.push({ s: i, f: d[i] });
    }
    var s = t.length;
    var t2 = t.slice();
    if (!s)
        return [new u8(0), 0];
    if (s == 1) {
        var v = new u8(t[0].s + 1);
        v[t[0].s] = 1;
        return [v, 1];
    }
    t.sort(function (a, b) { return a.f - b.f; });
    // after i2 reaches last ind, will be stopped
    // freq must be greater than largest possible number of symbols
    t.push({ s: -1, f: 25001 });
    var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
    t[0] = { s: -1, f: l.f + r.f, l: l, r: r };
    // efficient algorithm from UZIP.js
    // i0 is lookbehind, i2 is lookahead - after processing two low-freq
    // symbols that combined have high freq, will start processing i2 (high-freq,
    // non-composite) symbols instead
    // see https://reddit.com/r/photopea/comments/ikekht/uzipjs_questions/
    while (i1 != s - 1) {
        l = t[t[i0].f < t[i2].f ? i0++ : i2++];
        r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
        t[i1++] = { s: -1, f: l.f + r.f, l: l, r: r };
    }
    var maxSym = t2[0].s;
    for (var i = 1; i < s; ++i) {
        if (t2[i].s > maxSym)
            maxSym = t2[i].s;
    }
    // code lengths
    var tr = new u16(maxSym + 1);
    // max bits in tree
    var mbt = ln(t[i1 - 1], tr, 0);
    if (mbt > mb) {
        // more algorithms from UZIP.js
        // TODO: find out how this code works (debt)
        //  ind    debt
        var i = 0, dt = 0;
        //    left            cost
        var lft = mbt - mb, cst = 1 << lft;
        t2.sort(function (a, b) { return tr[b.s] - tr[a.s] || a.f - b.f; });
        for (; i < s; ++i) {
            var i2_1 = t2[i].s;
            if (tr[i2_1] > mb) {
                dt += cst - (1 << (mbt - tr[i2_1]));
                tr[i2_1] = mb;
            }
            else
                break;
        }
        dt >>>= lft;
        while (dt > 0) {
            var i2_2 = t2[i].s;
            if (tr[i2_2] < mb)
                dt -= 1 << (mb - tr[i2_2]++ - 1);
            else
                ++i;
        }
        for (; i >= 0 && dt; --i) {
            var i2_3 = t2[i].s;
            if (tr[i2_3] == mb) {
                --tr[i2_3];
                ++dt;
            }
        }
        mbt = mb;
    }
    return [new u8(tr), mbt];
};
// get the max length and assign length codes
var ln = function (n, l, d) {
    return n.s == -1
        ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1))
        : (l[n.s] = d);
};
// length codes generation
var lc = function (c) {
    var s = c.length;
    // Note that the semicolon was intentional
    while (s && !c[--s])
        ;
    var cl = new u16(++s);
    //  ind      num         streak
    var cli = 0, cln = c[0], cls = 1;
    var w = function (v) { cl[cli++] = v; };
    for (var i = 1; i <= s; ++i) {
        if (c[i] == cln && i != s)
            ++cls;
        else {
            if (!cln && cls > 2) {
                for (; cls > 138; cls -= 138)
                    w(32754);
                if (cls > 2) {
                    w(cls > 10 ? ((cls - 11) << 5) | 28690 : ((cls - 3) << 5) | 12305);
                    cls = 0;
                }
            }
            else if (cls > 3) {
                w(cln), --cls;
                for (; cls > 6; cls -= 6)
                    w(8304);
                if (cls > 2)
                    w(((cls - 3) << 5) | 8208), cls = 0;
            }
            while (cls--)
                w(cln);
            cls = 1;
            cln = c[i];
        }
    }
    return [cl.subarray(0, cli), s];
};
// calculate the length of output from tree, code lengths
var clen = function (cf, cl) {
    var l = 0;
    for (var i = 0; i < cl.length; ++i)
        l += cf[i] * cl[i];
    return l;
};
// writes a fixed block
// returns the new bit pos
var wfblk = function (out, pos, dat) {
    // no need to write 00 as type: TypedArray defaults to 0
    var s = dat.length;
    var o = shft(pos + 2);
    out[o] = s & 255;
    out[o + 1] = s >>> 8;
    out[o + 2] = out[o] ^ 255;
    out[o + 3] = out[o + 1] ^ 255;
    for (var i = 0; i < s; ++i)
        out[o + i + 4] = dat[i];
    return (o + 4 + s) * 8;
};
// writes a block
var wblk = function (dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
    wbits(out, p++, final);
    ++lf[256];
    var _a = hTree(lf, 15), dlt = _a[0], mlb = _a[1];
    var _b = hTree(df, 15), ddt = _b[0], mdb = _b[1];
    var _c = lc(dlt), lclt = _c[0], nlc = _c[1];
    var _d = lc(ddt), lcdt = _d[0], ndc = _d[1];
    var lcfreq = new u16(19);
    for (var i = 0; i < lclt.length; ++i)
        lcfreq[lclt[i] & 31]++;
    for (var i = 0; i < lcdt.length; ++i)
        lcfreq[lcdt[i] & 31]++;
    var _e = hTree(lcfreq, 7), lct = _e[0], mlcb = _e[1];
    var nlcc = 19;
    for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
        ;
    var flen = (bl + 5) << 3;
    var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
    var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
    if (flen <= ftlen && flen <= dtlen)
        return wfblk(out, p, dat.subarray(bs, bs + bl));
    var lm, ll, dm, dl;
    wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
    if (dtlen < ftlen) {
        lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
        var llm = hMap(lct, mlcb, 0);
        wbits(out, p, nlc - 257);
        wbits(out, p + 5, ndc - 1);
        wbits(out, p + 10, nlcc - 4);
        p += 14;
        for (var i = 0; i < nlcc; ++i)
            wbits(out, p + 3 * i, lct[clim[i]]);
        p += 3 * nlcc;
        var lcts = [lclt, lcdt];
        for (var it = 0; it < 2; ++it) {
            var clct = lcts[it];
            for (var i = 0; i < clct.length; ++i) {
                var len = clct[i] & 31;
                wbits(out, p, llm[len]), p += lct[len];
                if (len > 15)
                    wbits(out, p, (clct[i] >>> 5) & 127), p += clct[i] >>> 12;
            }
        }
    }
    else {
        lm = flm, ll = flt, dm = fdm, dl = fdt;
    }
    for (var i = 0; i < li; ++i) {
        if (syms[i] > 255) {
            var len = (syms[i] >>> 18) & 31;
            wbits16(out, p, lm[len + 257]), p += ll[len + 257];
            if (len > 7)
                wbits(out, p, (syms[i] >>> 23) & 31), p += fleb[len];
            var dst = syms[i] & 31;
            wbits16(out, p, dm[dst]), p += dl[dst];
            if (dst > 3)
                wbits16(out, p, (syms[i] >>> 5) & 8191), p += fdeb[dst];
        }
        else {
            wbits16(out, p, lm[syms[i]]), p += ll[syms[i]];
        }
    }
    wbits16(out, p, lm[256]);
    return p + ll[256];
};
// deflate options (nice << 13) | chain
var deo = /*#__PURE__*/ new u32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
// empty
var et = /*#__PURE__*/ new u8(0);
// compresses data into a raw DEFLATE buffer
var dflt = function (dat, lvl, plvl, pre, post, lst) {
    var s = dat.length;
    var o = new u8(pre + s + 5 * (1 + Math.floor(s / 7000)) + post);
    // writing to this writes to the output buffer
    var w = o.subarray(pre, o.length - post);
    var pos = 0;
    if (!lvl || s < 8) {
        for (var i = 0; i <= s; i += 65535) {
            // end
            var e = i + 65535;
            if (e < s) {
                // write full block
                pos = wfblk(w, pos, dat.subarray(i, e));
            }
            else {
                // write final block
                w[i] = lst;
                pos = wfblk(w, pos, dat.subarray(i, s));
            }
        }
    }
    else {
        var opt = deo[lvl - 1];
        var n = opt >>> 13, c = opt & 8191;
        var msk_1 = (1 << plvl) - 1;
        //    prev 2-byte val map    curr 2-byte val map
        var prev = new u16(32768), head = new u16(msk_1 + 1);
        var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
        var hsh = function (i) { return (dat[i] ^ (dat[i + 1] << bs1_1) ^ (dat[i + 2] << bs2_1)) & msk_1; };
        // 24576 is an arbitrary number of maximum symbols per block
        // 424 buffer for last block
        var syms = new u32(25000);
        // length/literal freq   distance freq
        var lf = new u16(288), df = new u16(32);
        //  l/lcnt  exbits  index  l/lind  waitdx  bitpos
        var lc_1 = 0, eb = 0, i = 0, li = 0, wi = 0, bs = 0;
        for (; i < s; ++i) {
            // hash value
            var hv = hsh(i);
            // index mod 32768
            var imod = i & 32767;
            // previous index with this value
            var pimod = head[hv];
            prev[imod] = pimod;
            head[hv] = imod;
            // We always should modify head and prev, but only add symbols if
            // this data is not yet processed ("wait" for wait index)
            if (wi <= i) {
                // bytes remaining
                var rem = s - i;
                if ((lc_1 > 7000 || li > 24576) && rem > 423) {
                    pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
                    li = lc_1 = eb = 0, bs = i;
                    for (var j = 0; j < 286; ++j)
                        lf[j] = 0;
                    for (var j = 0; j < 30; ++j)
                        df[j] = 0;
                }
                //  len    dist   chain
                var l = 2, d = 0, ch_1 = c, dif = (imod - pimod) & 32767;
                if (rem > 2 && hv == hsh(i - dif)) {
                    var maxn = Math.min(n, rem) - 1;
                    var maxd = Math.min(32767, i);
                    // max possible length
                    // not capped at dif because decompressors implement "rolling" index population
                    var ml = Math.min(258, rem);
                    while (dif <= maxd && --ch_1 && imod != pimod) {
                        if (dat[i + l] == dat[i + l - dif]) {
                            var nl = 0;
                            for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                                ;
                            if (nl > l) {
                                l = nl, d = dif;
                                // break out early when we reach "nice" (we are satisfied enough)
                                if (nl > maxn)
                                    break;
                                // now, find the rarest 2-byte sequence within this
                                // length of literals and search for that instead.
                                // Much faster than just using the start
                                var mmd = Math.min(dif, nl - 2);
                                var md = 0;
                                for (var j = 0; j < mmd; ++j) {
                                    var ti = (i - dif + j + 32768) & 32767;
                                    var pti = prev[ti];
                                    var cd = (ti - pti + 32768) & 32767;
                                    if (cd > md)
                                        md = cd, pimod = ti;
                                }
                            }
                        }
                        // check the previous match
                        imod = pimod, pimod = prev[imod];
                        dif += (imod - pimod + 32768) & 32767;
                    }
                }
                // d will be nonzero only when a match was found
                if (d) {
                    // store both dist and len data in one Uint32
                    // Make sure this is recognized as a len/dist with 28th bit (2^28)
                    syms[li++] = 268435456 | (revfl[l] << 18) | revfd[d];
                    var lin = revfl[l] & 31, din = revfd[d] & 31;
                    eb += fleb[lin] + fdeb[din];
                    ++lf[257 + lin];
                    ++df[din];
                    wi = i + l;
                    ++lc_1;
                }
                else {
                    syms[li++] = dat[i];
                    ++lf[dat[i]];
                }
            }
        }
        pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
        // this is the easiest way to avoid needing to maintain state
        if (!lst)
            pos = wfblk(w, pos, et);
    }
    return slc(o, 0, pre + shft(pos) + post);
};
// CRC32 table
var crct = /*#__PURE__*/ (function () {
    var t = new u32(256);
    for (var i = 0; i < 256; ++i) {
        var c = i, k = 9;
        while (--k)
            c = ((c & 1) && 0xEDB88320) ^ (c >>> 1);
        t[i] = c;
    }
    return t;
})();
// CRC32
var crc = function () {
    var c = 0xFFFFFFFF;
    return {
        p: function (d) {
            // closures have awful performance
            var cr = c;
            for (var i = 0; i < d.length; ++i)
                cr = crct[(cr & 255) ^ d[i]] ^ (cr >>> 8);
            c = cr;
        },
        d: function () { return c ^ 0xFFFFFFFF; }
    };
};
// Alder32
var adler = function () {
    var a = 1, b = 0;
    return {
        p: function (d) {
            // closures have awful performance
            var n = a, m = b;
            var l = d.length;
            for (var i = 0; i != l;) {
                var e = Math.min(i + 5552, l);
                for (; i < e; ++i)
                    n += d[i], m += n;
                n %= 65521, m %= 65521;
            }
            a = n, b = m;
        },
        d: function () { return ((a >>> 8) << 16 | (b & 255) << 8 | (b >>> 8)) + ((a & 255) << 23) * 2; }
    };
};
;
// deflate with opts
var dopt = function (dat, opt, pre, post, st) {
    return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : (12 + opt.mem), pre, post, !st);
};
// Walmart object spread
var mrg = function (a, b) {
    var o = {};
    for (var k in a)
        o[k] = a[k];
    for (var k in b)
        o[k] = b[k];
    return o;
};
// worker clone
// This is possibly the craziest part of the entire codebase, despite how simple it may seem.
// The only parameter to this function is a closure that returns an array of variables outside of the function scope.
// We're going to try to figure out the variable names used in the closure as strings because that is crucial for workerization.
// We will return an object mapping of true variable name to value (basically, the current scope as a JS object).
// The reason we can't just use the original variable names is minifiers mangling the toplevel scope.
// This took me three weeks to figure out how to do.
var wcln = function (fn, fnStr, td) {
    var dt = fn();
    var st = fn.toString();
    var ks = st.slice(st.indexOf('[') + 1, st.lastIndexOf(']')).replace(/ /g, '').split(',');
    for (var i = 0; i < dt.length; ++i) {
        var v = dt[i], k = ks[i];
        if (typeof v == 'function') {
            fnStr += ';' + k + '=';
            var st_1 = v.toString();
            if (v.prototype) {
                // for global objects
                if (st_1.indexOf('[native code]') != -1) {
                    var spInd = st_1.indexOf(' ', 8) + 1;
                    fnStr += st_1.slice(spInd, st_1.indexOf('(', spInd));
                }
                else {
                    fnStr += st_1;
                    for (var t in v.prototype)
                        fnStr += ';' + k + '.prototype.' + t + '=' + v.prototype[t].toString();
                }
            }
            else
                fnStr += st_1;
        }
        else
            td[k] = v;
    }
    return [fnStr, td];
};
var ch = [];
// clone bufs
var cbfs = function (v) {
    var tl = [];
    for (var k in v) {
        if (v[k] instanceof u8 || v[k] instanceof u16 || v[k] instanceof u32)
            tl.push((v[k] = new v[k].constructor(v[k])).buffer);
    }
    return tl;
};
// use a worker to execute code
var wrkr = function (fns, init, id, cb) {
    var _a;
    if (!ch[id]) {
        var fnStr = '', td_1 = {}, m = fns.length - 1;
        for (var i = 0; i < m; ++i)
            _a = wcln(fns[i], fnStr, td_1), fnStr = _a[0], td_1 = _a[1];
        ch[id] = wcln(fns[m], fnStr, td_1);
    }
    var td = mrg({}, ch[id][1]);
    return wk(ch[id][0] + ';onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=' + init.toString() + '}', id, td, cbfs(td), cb);
};
// base async inflate fn
var bInflt = function () { return [u8, u16, u32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, hMap, max, bits, bits16, shft, slc, inflt, inflateSync, pbf, gu8]; };
var bDflt = function () { return [u8, u16, u32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf]; };
// gzip extra
var gze = function () { return [gzh, gzhl, wbytes, crc, crct]; };
// gunzip extra
var guze = function () { return [gzs, gzl]; };
// zlib extra
var zle = function () { return [zlh, wbytes, adler]; };
// unzlib extra
var zule = function () { return [zlv]; };
// post buf
var pbf = function (msg) { return postMessage(msg, [msg.buffer]); };
// get u8
var gu8 = function (o) { return o && o.size && new u8(o.size); };
// async helper
var cbify = function (dat, opts, fns, init, id, cb) {
    var w = wrkr(fns, init, id, function (err, dat) {
        w.terminate();
        cb(err, dat);
    });
    if (!opts.consume)
        dat = new u8(dat);
    w.postMessage([dat, opts], [dat.buffer]);
    return function () { w.terminate(); };
};
// auto stream
var astrm = function (strm) {
    strm.ondata = function (dat, final) { return postMessage([dat, final], [dat.buffer]); };
    return function (ev) { return strm.push(ev.data[0], ev.data[1]); };
};
// async stream attach
var astrmify = function (fns, strm, opts, init, id) {
    var t;
    var w = wrkr(fns, init, id, function (err, dat) {
        if (err)
            w.terminate(), strm.ondata.call(strm, err);
        else {
            if (dat[1])
                w.terminate();
            strm.ondata.call(strm, err, dat[0], dat[1]);
        }
    });
    w.postMessage(opts);
    strm.push = function (d, f) {
        if (t)
            throw 'stream finished';
        if (!strm.ondata)
            throw 'no stream handler';
        w.postMessage([d, t = f], [d.buffer]);
    };
    strm.terminate = function () { w.terminate(); };
};
// read 2 bytes
var b2 = function (d, b) { return d[b] | (d[b + 1] << 8); };
// read 4 bytes
var b4 = function (d, b) { return (d[b] | (d[b + 1] << 8) | (d[b + 2] << 16)) + (d[b + 3] << 23) * 2; };
// write bytes
var wbytes = function (d, b, v) {
    for (; v; ++b)
        d[b] = v, v >>>= 8;
};
// gzip header
var gzh = function (c, o) {
    var fn = o.filename;
    c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3; // assume Unix
    if (o.mtime != 0)
        wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1000));
    if (fn) {
        c[3] = 8;
        for (var i = 0; i <= fn.length; ++i)
            c[i + 10] = fn.charCodeAt(i);
    }
};
// gzip footer: -8 to -4 = CRC, -4 to -0 is length
// gzip start
var gzs = function (d) {
    if (d[0] != 31 || d[1] != 139 || d[2] != 8)
        throw 'invalid gzip data';
    var flg = d[3];
    var st = 10;
    if (flg & 4)
        st += d[10] | (d[11] << 8) + 2;
    for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
        ;
    return st + (flg & 2);
};
// gzip length
var gzl = function (d) {
    var l = d.length;
    return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16) + (2 * (d[l - 1] << 23));
};
// gzip header length
var gzhl = function (o) { return 10 + ((o.filename && (o.filename.length + 1)) || 0); };
// zlib header
var zlh = function (c, o) {
    var lv = o.level, fl = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
    c[0] = 120, c[1] = (fl << 6) | (fl ? (32 - 2 * fl) : 1);
};
// zlib valid
var zlv = function (d) {
    if ((d[0] & 15) != 8 || (d[0] >>> 4) > 7 || ((d[0] << 8 | d[1]) % 31))
        throw 'invalid zlib data';
    if (d[1] & 32)
        throw 'invalid zlib data: preset dictionaries not supported';
};
function AsyncCmpStrm(opts, cb) {
    if (!cb && typeof opts == 'function')
        cb = opts, opts = {};
    this.ondata = cb;
    return opts;
}
// zlib footer: -4 to -0 is Adler32
/**
 * Streaming DEFLATE compression
 */
var Deflate = /*#__PURE__*/ (function () {
    function Deflate(opts, cb) {
        if (!cb && typeof opts == 'function')
            cb = opts, opts = {};
        this.ondata = cb;
        this.o = opts || {};
    }
    Deflate.prototype.p = function (c, f) {
        this.ondata(dopt(c, this.o, 0, 0, !f), f);
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Deflate.prototype.push = function (chunk, final) {
        if (this.d)
            throw 'stream finished';
        if (!this.ondata)
            throw 'no stream handler';
        this.d = final;
        this.p(chunk, final || false);
    };
    return Deflate;
}());

/**
 * Asynchronous streaming DEFLATE compression
 */
var AsyncDeflate = /*#__PURE__*/ (function () {
    function AsyncDeflate(opts, cb) {
        astrmify([
            bDflt,
            function () { return [astrm, Deflate]; }
        ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
            var strm = new Deflate(ev.data);
            onmessage = astrm(strm);
        }, 6);
    }
    return AsyncDeflate;
}());

function deflate(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        throw 'no callback';
    return cbify(data, opts, [
        bDflt,
    ], function (ev) { return pbf(deflateSync(ev.data[0], ev.data[1])); }, 0, cb);
}
/**
 * Compresses data with DEFLATE without any wrapper
 * @param data The data to compress
 * @param opts The compression options
 * @returns The deflated version of the data
 */
function deflateSync(data, opts) {
    if (opts === void 0) { opts = {}; }
    return dopt(data, opts, 0, 0);
}
/**
 * Streaming DEFLATE decompression
 */
var Inflate = /*#__PURE__*/ (function () {
    /**
     * Creates an inflation stream
     * @param cb The callback to call whenever data is inflated
     */
    function Inflate(cb) {
        this.s = {};
        this.p = new u8(0);
        this.ondata = cb;
    }
    Inflate.prototype.e = function (c) {
        if (this.d)
            throw 'stream finished';
        if (!this.ondata)
            throw 'no stream handler';
        var l = this.p.length;
        var n = new u8(l + c.length);
        n.set(this.p), n.set(c, l), this.p = n;
    };
    Inflate.prototype.c = function (final) {
        this.d = this.s.i = final || false;
        var bts = this.s.b;
        var dt = inflt(this.p, this.o, this.s);
        this.ondata(slc(dt, bts, this.s.b), this.d);
        this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
        this.p = slc(this.p, (this.s.p / 8) >> 0), this.s.p &= 7;
    };
    /**
     * Pushes a chunk to be inflated
     * @param chunk The chunk to push
     * @param final Whether this is the final chunk
     */
    Inflate.prototype.push = function (chunk, final) {
        this.e(chunk), this.c(final);
    };
    return Inflate;
}());

/**
 * Asynchronous streaming DEFLATE decompression
 */
var AsyncInflate = /*#__PURE__*/ (function () {
    /**
     * Creates an asynchronous inflation stream
     * @param cb The callback to call whenever data is deflated
     */
    function AsyncInflate(cb) {
        this.ondata = cb;
        astrmify([
            bInflt,
            function () { return [astrm, Inflate]; }
        ], this, 0, function () {
            var strm = new Inflate();
            onmessage = astrm(strm);
        }, 7);
    }
    return AsyncInflate;
}());

function inflate(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        throw 'no callback';
    return cbify(data, opts, [
        bInflt
    ], function (ev) { return pbf(inflateSync(ev.data[0], gu8(ev.data[1]))); }, 1, cb);
}
/**
 * Expands DEFLATE data with no wrapper
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
function inflateSync(data, out) {
    return inflt(data, out);
}
// before you yell at me for not just using extends, my reason is that TS inheritance is hard to workerize.
/**
 * Streaming GZIP compression
 */
var Gzip = /*#__PURE__*/ (function () {
    function Gzip(opts, cb) {
        this.c = crc();
        this.l = 0;
        this.v = 1;
        Deflate.call(this, opts, cb);
    }
    /**
     * Pushes a chunk to be GZIPped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Gzip.prototype.push = function (chunk, final) {
        Deflate.prototype.push.call(this, chunk, final);
    };
    Gzip.prototype.p = function (c, f) {
        this.c.p(c);
        this.l += c.length;
        var raw = dopt(c, this.o, this.v && gzhl(this.o), f && 8, !f);
        if (this.v)
            gzh(raw, this.o), this.v = 0;
        if (f)
            wbytes(raw, raw.length - 8, this.c.d()), wbytes(raw, raw.length - 4, this.l);
        this.ondata(raw, f);
    };
    return Gzip;
}());

/**
 * Asynchronous streaming GZIP compression
 */
var AsyncGzip = /*#__PURE__*/ (function () {
    function AsyncGzip(opts, cb) {
        astrmify([
            bDflt,
            gze,
            function () { return [astrm, Deflate, Gzip]; }
        ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
            var strm = new Gzip(ev.data);
            onmessage = astrm(strm);
        }, 8);
    }
    return AsyncGzip;
}());

function gzip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        throw 'no callback';
    return cbify(data, opts, [
        bDflt,
        gze,
        function () { return [gzipSync]; }
    ], function (ev) { return pbf(gzipSync(ev.data[0], ev.data[1])); }, 2, cb);
}
/**
 * Compresses data with GZIP
 * @param data The data to compress
 * @param opts The compression options
 * @returns The gzipped version of the data
 */
function gzipSync(data, opts) {
    if (opts === void 0) { opts = {}; }
    var c = crc(), l = data.length;
    c.p(data);
    var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
    return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
}
/**
 * Streaming GZIP decompression
 */
var Gunzip = /*#__PURE__*/ (function () {
    /**
     * Creates a GUNZIP stream
     * @param cb The callback to call whenever data is inflated
     */
    function Gunzip(cb) {
        this.v = 1;
        Inflate.call(this, cb);
    }
    /**
     * Pushes a chunk to be GUNZIPped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Gunzip.prototype.push = function (chunk, final) {
        Inflate.prototype.e.call(this, chunk);
        if (this.v) {
            var s = gzs(this.p);
            if (s >= this.p.length && !final)
                return;
            this.p = this.p.subarray(s), this.v = 0;
        }
        if (final) {
            if (this.p.length < 8)
                throw 'invalid gzip stream';
            this.p = this.p.subarray(0, -8);
        }
        // necessary to prevent TS from using the closure value
        // This allows for workerization to function correctly
        Inflate.prototype.c.call(this, final);
    };
    return Gunzip;
}());

/**
 * Asynchronous streaming GZIP decompression
 */
var AsyncGunzip = /*#__PURE__*/ (function () {
    /**
     * Creates an asynchronous GUNZIP stream
     * @param cb The callback to call whenever data is deflated
     */
    function AsyncGunzip(cb) {
        this.ondata = cb;
        astrmify([
            bInflt,
            guze,
            function () { return [astrm, Inflate, Gunzip]; }
        ], this, 0, function () {
            var strm = new Gunzip();
            onmessage = astrm(strm);
        }, 9);
    }
    return AsyncGunzip;
}());

function gunzip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        throw 'no callback';
    return cbify(data, opts, [
        bInflt,
        guze,
        function () { return [gunzipSync]; }
    ], function (ev) { return pbf(gunzipSync(ev.data[0])); }, 3, cb);
}
/**
 * Expands GZIP data
 * @param data The data to decompress
 * @param out Where to write the data. GZIP already encodes the output size, so providing this doesn't save memory.
 * @returns The decompressed version of the data
 */
function gunzipSync(data, out) {
    return inflt(data.subarray(gzs(data), -8), out || new u8(gzl(data)));
}
/**
 * Streaming Zlib compression
 */
var Zlib = /*#__PURE__*/ (function () {
    function Zlib(opts, cb) {
        this.c = adler();
        this.v = 1;
        Deflate.call(this, opts, cb);
    }
    /**
     * Pushes a chunk to be zlibbed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Zlib.prototype.push = function (chunk, final) {
        Deflate.prototype.push.call(this, chunk, final);
    };
    Zlib.prototype.p = function (c, f) {
        this.c.p(c);
        var raw = dopt(c, this.o, this.v && 2, f && 4, !f);
        if (this.v)
            zlh(raw, this.o), this.v = 0;
        if (f)
            wbytes(raw, raw.length - 4, this.c.d());
        this.ondata(raw, f);
    };
    return Zlib;
}());

/**
 * Asynchronous streaming Zlib compression
 */
var AsyncZlib = /*#__PURE__*/ (function () {
    function AsyncZlib(opts, cb) {
        astrmify([
            bDflt,
            zle,
            function () { return [astrm, Deflate, Zlib]; }
        ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
            var strm = new Zlib(ev.data);
            onmessage = astrm(strm);
        }, 10);
    }
    return AsyncZlib;
}());

function zlib(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        throw 'no callback';
    return cbify(data, opts, [
        bDflt,
        zle,
        function () { return [zlibSync]; }
    ], function (ev) { return pbf(zlibSync(ev.data[0], ev.data[1])); }, 4, cb);
}
/**
 * Compress data with Zlib
 * @param data The data to compress
 * @param opts The compression options
 * @returns The zlib-compressed version of the data
 */
function zlibSync(data, opts) {
    if (opts === void 0) { opts = {}; }
    var a = adler();
    a.p(data);
    var d = dopt(data, opts, 2, 4);
    return zlh(d, opts), wbytes(d, d.length - 4, a.d()), d;
}
/**
 * Streaming Zlib decompression
 */
var Unzlib = /*#__PURE__*/ (function () {
    /**
     * Creates a Zlib decompression stream
     * @param cb The callback to call whenever data is inflated
     */
    function Unzlib(cb) {
        this.v = 1;
        Inflate.call(this, cb);
    }
    /**
     * Pushes a chunk to be unzlibbed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Unzlib.prototype.push = function (chunk, final) {
        Inflate.prototype.e.call(this, chunk);
        if (this.v) {
            if (this.p.length < 2 && !final)
                return;
            this.p = this.p.subarray(2), this.v = 0;
        }
        if (final) {
            if (this.p.length < 4)
                throw 'invalid zlib stream';
            this.p = this.p.subarray(0, -4);
        }
        // necessary to prevent TS from using the closure value
        // This allows for workerization to function correctly
        Inflate.prototype.c.call(this, final);
    };
    return Unzlib;
}());

/**
 * Asynchronous streaming Zlib decompression
 */
var AsyncUnzlib = /*#__PURE__*/ (function () {
    /**
     * Creates an asynchronous Zlib decompression stream
     * @param cb The callback to call whenever data is deflated
     */
    function AsyncUnzlib(cb) {
        this.ondata = cb;
        astrmify([
            bInflt,
            zule,
            function () { return [astrm, Inflate, Unzlib]; }
        ], this, 0, function () {
            var strm = new Unzlib();
            onmessage = astrm(strm);
        }, 11);
    }
    return AsyncUnzlib;
}());

function unzlib(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        throw 'no callback';
    return cbify(data, opts, [
        bInflt,
        zule,
        function () { return [unzlibSync]; }
    ], function (ev) { return pbf(unzlibSync(ev.data[0], gu8(ev.data[1]))); }, 5, cb);
}
/**
 * Expands Zlib data
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
function unzlibSync(data, out) {
    return inflt((zlv(data), data.subarray(2, -4)), out);
}
// Default algorithm for compression (used because having a known output size allows faster decompression)

// Default algorithm for compression (used because having a known output size allows faster decompression)

/**
 * Streaming GZIP, Zlib, or raw DEFLATE decompression
 */
var Decompress = /*#__PURE__*/ (function () {
    /**
     * Creates a decompression stream
     * @param cb The callback to call whenever data is decompressed
     */
    function Decompress(cb) {
        this.G = Gunzip;
        this.I = Inflate;
        this.Z = Unzlib;
        this.ondata = cb;
    }
    /**
     * Pushes a chunk to be decompressed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    Decompress.prototype.push = function (chunk, final) {
        if (!this.ondata)
            throw 'no stream handler';
        if (!this.s) {
            if (this.p && this.p.length) {
                var n = new u8(this.p.length + chunk.length);
                n.set(this.p), n.set(chunk, this.p.length);
            }
            else
                this.p = chunk;
            if (this.p.length > 2) {
                var _this_1 = this;
                var cb = function () { _this_1.ondata.apply(_this_1, arguments); };
                this.s = (this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8)
                    ? new this.G(cb)
                    : ((this.p[0] & 15) != 8 || (this.p[0] >> 4) > 7 || ((this.p[0] << 8 | this.p[1]) % 31))
                        ? new this.I(cb)
                        : new this.Z(cb);
                this.s.push(this.p, final);
                this.p = null;
            }
        }
        else
            this.s.push(chunk, final);
    };
    return Decompress;
}());

/**
 * Asynchronous streaming GZIP, Zlib, or raw DEFLATE decompression
 */
var AsyncDecompress = /*#__PURE__*/ (function () {
    /**
   * Creates an asynchronous decompression stream
   * @param cb The callback to call whenever data is decompressed
   */
    function AsyncDecompress(cb) {
        this.G = AsyncGunzip;
        this.I = AsyncInflate;
        this.Z = AsyncUnzlib;
        this.ondata = cb;
    }
    /**
     * Pushes a chunk to be decompressed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */
    AsyncDecompress.prototype.push = function (chunk, final) {
        Decompress.prototype.push.call(this, chunk, final);
    };
    return AsyncDecompress;
}());

function decompress(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        throw 'no callback';
    return (data[0] == 31 && data[1] == 139 && data[2] == 8)
        ? gunzip(data, opts, cb)
        : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
            ? inflate(data, opts, cb)
            : unzlib(data, opts, cb);
}
/**
 * Expands compressed GZIP, Zlib, or raw DEFLATE data, automatically detecting the format
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */
function decompressSync(data, out) {
    return (data[0] == 31 && data[1] == 139 && data[2] == 8)
        ? gunzipSync(data, out)
        : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
            ? inflateSync(data, out)
            : unzlibSync(data, out);
}
// flatten a directory structure
var fltn = function (d, p, t, o) {
    for (var k in d) {
        var val = d[k], n = p + k;
        if (val instanceof u8)
            t[n] = [val, o];
        else if (Array.isArray(val))
            t[n] = [val[0], mrg(o, val[1])];
        else
            fltn(val, n + '/', t, o);
    }
};
/**
 * Converts a string into a Uint8Array for use with compression/decompression methods
 * @param str The string to encode
 * @param latin1 Whether or not to interpret the data as Latin-1. This should
 *               not need to be true unless decoding a binary string.
 * @returns The string encoded in UTF-8/Latin-1 binary
 */
function strToU8(str, latin1) {
    var l = str.length;
    if (!latin1 && typeof TextEncoder != 'undefined')
        return new TextEncoder().encode(str);
    var ar = new u8(str.length + (str.length >>> 1));
    var ai = 0;
    var w = function (v) { ar[ai++] = v; };
    for (var i = 0; i < l; ++i) {
        if (ai + 5 > ar.length) {
            var n = new u8(ai + 8 + ((l - i) << 1));
            n.set(ar);
            ar = n;
        }
        var c = str.charCodeAt(i);
        if (c < 128 || latin1)
            w(c);
        else if (c < 2048)
            w(192 | (c >>> 6)), w(128 | (c & 63));
        else if (c > 55295 && c < 57344)
            c = 65536 + (c & 1023 << 10) | (str.charCodeAt(++i) & 1023),
                w(240 | (c >>> 18)), w(128 | ((c >>> 12) & 63)), w(128 | ((c >>> 6) & 63)), w(128 | (c & 63));
        else
            w(224 | (c >>> 12)), w(128 | ((c >>> 6) & 63)), w(128 | (c & 63));
    }
    return slc(ar, 0, ai);
}
/**
 * Converts a Uint8Array to a string
 * @param dat The data to decode to string
 * @param latin1 Whether or not to interpret the data as Latin-1. This should
 *               not need to be true unless encoding to binary string.
 * @returns The original UTF-8/Latin-1 string
 */
function strFromU8(dat, latin1) {
    var r = '';
    if (!latin1 && typeof TextDecoder != 'undefined')
        return new TextDecoder().decode(dat);
    for (var i = 0; i < dat.length;) {
        var c = dat[i++];
        if (c < 128 || latin1)
            r += String.fromCharCode(c);
        else if (c < 224)
            r += String.fromCharCode((c & 31) << 6 | (dat[i++] & 63));
        else if (c < 240)
            r += String.fromCharCode((c & 15) << 12 | (dat[i++] & 63) << 6 | (dat[i++] & 63));
        else
            c = ((c & 15) << 18 | (dat[i++] & 63) << 12 | (dat[i++] & 63) << 6 | (dat[i++] & 63)) - 65536,
                r += String.fromCharCode(55296 | (c >> 10), 56320 | (c & 1023));
    }
    return r;
}
;
// skip local zip header
var slzh = function (d, b) { return b + 30 + b2(d, b + 26) + b2(d, b + 28); };
// read zip header
var zh = function (d, b, z) {
    var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl;
    var _a = z ? z64e(d, es) : [b4(d, b + 20), b4(d, b + 24), b4(d, b + 42)], sc = _a[0], su = _a[1], off = _a[2];
    return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
};
// read zip64 extra field
var z64e = function (d, b) {
    for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
        ;
    return [b4(d, b + 12), b4(d, b + 4), b4(d, b + 20)];
};
// write zip header
var wzh = function (d, b, c, cmp, su, fn, u, o, ce, t) {
    var fl = fn.length, l = cmp.length;
    wbytes(d, b, ce != null ? 0x2014B50 : 0x4034B50), b += 4;
    if (ce != null)
        d[b] = 20, b += 2;
    d[b] = 20, b += 2; // spec compliance? what's that?
    d[b++] = (t == 8 && (o.level == 1 ? 6 : o.level < 6 ? 4 : o.level == 9 ? 2 : 0)), d[b++] = u && 8;
    d[b] = t, b += 2;
    var dt = new Date(o.mtime || Date.now()), y = dt.getFullYear() - 1980;
    if (y < 0 || y > 119)
        throw 'date not in range 1980-2099';
    wbytes(d, b, ((y << 24) * 2) | ((dt.getMonth() + 1) << 21) | (dt.getDate() << 16) | (dt.getHours() << 11) | (dt.getMinutes() << 5) | (dt.getSeconds() >>> 1));
    b += 4;
    wbytes(d, b, c);
    wbytes(d, b + 4, l);
    wbytes(d, b + 8, su);
    wbytes(d, b + 12, fl), b += 16; // skip extra field, comment
    if (ce != null)
        wbytes(d, b += 10, ce), b += 4;
    d.set(fn, b);
    b += fl;
    if (ce == null)
        d.set(cmp, b);
};
// write zip footer (end of central directory)
var wzf = function (o, b, c, d, e) {
    wbytes(o, b, 0x6054B50); // skip disk
    wbytes(o, b + 8, c);
    wbytes(o, b + 10, c);
    wbytes(o, b + 12, d);
    wbytes(o, b + 16, e);
};
function zip(data, opts, cb) {
    if (!cb)
        cb = opts, opts = {};
    if (typeof cb != 'function')
        throw 'no callback';
    var r = {};
    fltn(data, '', r, opts);
    var k = Object.keys(r);
    var lft = k.length, o = 0, tot = 0;
    var slft = lft, files = new Array(lft);
    var term = [];
    var tAll = function () {
        for (var i = 0; i < term.length; ++i)
            term[i]();
    };
    var cbf = function () {
        var out = new u8(tot + 22), oe = o, cdl = tot - o;
        tot = 0;
        for (var i = 0; i < slft; ++i) {
            var f = files[i];
            try {
                wzh(out, tot, f.c, f.d, f.m, f.n, f.u, f.p, null, f.t);
                wzh(out, o, f.c, f.d, f.m, f.n, f.u, f.p, tot, f.t), o += 46 + f.n.length, tot += 30 + f.n.length + f.d.length;
            }
            catch (e) {
                return cb(e, null);
            }
        }
        wzf(out, o, files.length, cdl, oe);
        cb(null, out);
    };
    if (!lft)
        cbf();
    var _loop_1 = function (i) {
        var fn = k[i];
        var _a = r[fn], file = _a[0], p = _a[1];
        var c = crc(), m = file.length;
        c.p(file);
        var n = strToU8(fn), s = n.length;
        var t = p.level == 0 ? 0 : 8;
        var cbl = function (e, d) {
            if (e) {
                tAll();
                cb(e, null);
            }
            else {
                var l = d.length;
                files[i] = {
                    t: t,
                    d: d,
                    m: m,
                    c: c.d(),
                    u: fn.length != l,
                    n: n,
                    p: p
                };
                o += 30 + s + l;
                tot += 76 + 2 * s + l;
                if (!--lft)
                    cbf();
            }
        };
        if (n.length > 65535)
            cbl('filename too long', null);
        if (!t)
            cbl(null, file);
        else if (m < 160000) {
            try {
                cbl(null, deflateSync(file, p));
            }
            catch (e) {
                cbl(e, null);
            }
        }
        else
            term.push(deflate(file, p, cbl));
    };
    // Cannot use lft because it can decrease
    for (var i = 0; i < slft; ++i) {
        _loop_1(i);
    }
    return tAll;
}
/**
 * Synchronously creates a ZIP file. Prefer using `zip` for better performance
 * with more than one file.
 * @param data The directory structure for the ZIP archive
 * @param opts The main options, merged with per-file options
 * @returns The generated ZIP archive
 */
function zipSync(data, opts) {
    if (opts === void 0) { opts = {}; }
    var r = {};
    var files = [];
    fltn(data, '', r, opts);
    var o = 0;
    var tot = 0;
    for (var fn in r) {
        var _a = r[fn], file = _a[0], p = _a[1];
        var t = p.level == 0 ? 0 : 8;
        var n = strToU8(fn), s = n.length;
        if (n.length > 65535)
            throw 'filename too long';
        var d = t ? deflateSync(file, p) : file, l = d.length;
        var c = crc();
        c.p(file);
        files.push({
            t: t,
            d: d,
            m: file.length,
            c: c.d(),
            u: fn.length != s,
            n: n,
            o: o,
            p: p
        });
        o += 30 + s + l;
        tot += 76 + 2 * s + l;
    }
    var out = new u8(tot + 22), oe = o, cdl = tot - o;
    for (var i = 0; i < files.length; ++i) {
        var f = files[i];
        wzh(out, f.o, f.c, f.d, f.m, f.n, f.u, f.p, null, f.t);
        wzh(out, o, f.c, f.d, f.m, f.n, f.u, f.p, f.o, f.t), o += 46 + f.n.length;
    }
    wzf(out, o, files.length, cdl, oe);
    return out;
}
/**
 * Asynchronously decompresses a ZIP archive
 * @param data The raw compressed ZIP file
 * @param cb The callback to call with the decompressed files
 * @returns A function that can be used to immediately terminate the unzipping
 */
function unzip(data, cb) {
    if (typeof cb != 'function')
        throw 'no callback';
    var term = [];
    var tAll = function () {
        for (var i = 0; i < term.length; ++i)
            term[i]();
    };
    var files = {};
    var e = data.length - 22;
    for (; b4(data, e) != 0x6054B50; --e) {
        if (!e || data.length - e > 65558) {
            cb('invalid zip file', null);
            return;
        }
    }
    ;
    var lft = b2(data, e + 8);
    if (!lft)
        cb(null, {});
    var c = lft;
    var o = b4(data, e + 16);
    var z = o == 4294967295;
    if (z) {
        e = b4(data, e - 12);
        if (b4(data, e) != 0x6064B50)
            throw 'invalid zip file';
        c = lft = b4(data, e + 32);
        o = b4(data, e + 48);
    }
    var _loop_2 = function (i) {
        var _a = zh(data, o, z), c_1 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
        o = no;
        var cbl = function (e, d) {
            if (e) {
                tAll();
                cb(e, null);
            }
            else {
                files[fn] = d;
                if (!--lft)
                    cb(null, files);
            }
        };
        if (!c_1)
            cbl(null, slc(data, b, b + sc));
        else if (c_1 == 8) {
            var infl = data.subarray(b, b + sc);
            if (sc < 320000) {
                try {
                    cbl(null, inflateSync(infl, new u8(su)));
                }
                catch (e) {
                    cbl(e, null);
                }
            }
            else
                term.push(inflate(infl, { size: su }, cbl));
        }
        else
            cbl('unknown compression type ' + c_1, null);
    };
    for (var i = 0; i < c; ++i) {
        _loop_2(i);
    }
    return tAll;
}
/**
 * Synchronously decompresses a ZIP archive. Prefer using `unzip` for better
 * performance with more than one file.
 * @param data The raw compressed ZIP file
 * @returns The decompressed files
 */
function unzipSync(data) {
    var files = {};
    var e = data.length - 22;
    for (; b4(data, e) != 0x6054B50; --e) {
        if (!e || data.length - e > 65558)
            throw 'invalid zip file';
    }
    ;
    var c = b2(data, e + 8);
    if (!c)
        return {};
    var o = b4(data, e + 16);
    var z = o == 4294967295;
    if (z) {
        e = b4(data, e - 12);
        if (b4(data, e) != 0x6064B50)
            throw 'invalid zip file';
        c = b4(data, e + 32);
        o = b4(data, e + 48);
    }
    for (var i = 0; i < c; ++i) {
        var _a = zh(data, o, z), c_2 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
        o = no;
        if (!c_2)
            files[fn] = slc(data, b, b + sc);
        else if (c_2 == 8)
            files[fn] = inflateSync(data.subarray(b, b + sc), new u8(su));
        else
            throw 'unknown compression type ' + c_2;
    }
    return files;
}


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFontEmbedCSS: function() { return /* binding */ getFontEmbedCSS; },
/* harmony export */   toBlob: function() { return /* binding */ toBlob; },
/* harmony export */   toCanvas: function() { return /* binding */ toCanvas; },
/* harmony export */   toJpeg: function() { return /* binding */ toJpeg; },
/* harmony export */   toPixelData: function() { return /* binding */ toPixelData; },
/* harmony export */   toPng: function() { return /* binding */ toPng; },
/* harmony export */   toSvg: function() { return /* binding */ toSvg; }
/* harmony export */ });
/* harmony import */ var _clone_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(63);
/* harmony import */ var _embed_images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68);
/* harmony import */ var _apply_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(70);
/* harmony import */ var _embed_webfonts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(71);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(65);





async function toSvg(node, options = {}) {
    const { width, height } = (0,_util__WEBPACK_IMPORTED_MODULE_4__.getImageSize)(node, options);
    const clonedNode = (await (0,_clone_node__WEBPACK_IMPORTED_MODULE_0__.cloneNode)(node, options, true));
    await (0,_embed_webfonts__WEBPACK_IMPORTED_MODULE_3__.embedWebFonts)(clonedNode, options);
    await (0,_embed_images__WEBPACK_IMPORTED_MODULE_1__.embedImages)(clonedNode, options);
    (0,_apply_style__WEBPACK_IMPORTED_MODULE_2__.applyStyle)(clonedNode, options);
    const datauri = await (0,_util__WEBPACK_IMPORTED_MODULE_4__.nodeToDataURL)(clonedNode, width, height);
    return datauri;
}
async function toCanvas(node, options = {}) {
    const { width, height } = (0,_util__WEBPACK_IMPORTED_MODULE_4__.getImageSize)(node, options);
    const svg = await toSvg(node, options);
    const img = await (0,_util__WEBPACK_IMPORTED_MODULE_4__.createImage)(svg);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const ratio = options.pixelRatio || (0,_util__WEBPACK_IMPORTED_MODULE_4__.getPixelRatio)();
    const canvasWidth = options.canvasWidth || width;
    const canvasHeight = options.canvasHeight || height;
    canvas.width = canvasWidth * ratio;
    canvas.height = canvasHeight * ratio;
    if (!options.skipAutoScale) {
        (0,_util__WEBPACK_IMPORTED_MODULE_4__.checkCanvasDimensions)(canvas);
    }
    canvas.style.width = `${canvasWidth}`;
    canvas.style.height = `${canvasHeight}`;
    if (options.backgroundColor) {
        context.fillStyle = options.backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas;
}
async function toPixelData(node, options = {}) {
    const { width, height } = (0,_util__WEBPACK_IMPORTED_MODULE_4__.getImageSize)(node, options);
    const canvas = await toCanvas(node, options);
    const ctx = canvas.getContext('2d');
    return ctx.getImageData(0, 0, width, height).data;
}
async function toPng(node, options = {}) {
    const canvas = await toCanvas(node, options);
    return canvas.toDataURL();
}
async function toJpeg(node, options = {}) {
    const canvas = await toCanvas(node, options);
    return canvas.toDataURL('image/jpeg', options.quality || 1);
}
async function toBlob(node, options = {}) {
    const canvas = await toCanvas(node, options);
    const blob = await (0,_util__WEBPACK_IMPORTED_MODULE_4__.canvasToBlob)(canvas);
    return blob;
}
async function getFontEmbedCSS(node, options = {}) {
    return (0,_embed_webfonts__WEBPACK_IMPORTED_MODULE_3__.getWebFontCSS)(node, options);
}

/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cloneNode: function() { return /* binding */ cloneNode; }
/* harmony export */ });
/* harmony import */ var _clone_pseudos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(64);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65);
/* harmony import */ var _mimes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(66);
/* harmony import */ var _dataurl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(67);




async function cloneCanvasElement(canvas) {
    const dataURL = canvas.toDataURL();
    if (dataURL === 'data:,') {
        return canvas.cloneNode(false);
    }
    return (0,_util__WEBPACK_IMPORTED_MODULE_1__.createImage)(dataURL);
}
async function cloneVideoElement(video, options) {
    if (video.currentSrc) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = video.clientWidth;
        canvas.height = video.clientHeight;
        ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL();
        return (0,_util__WEBPACK_IMPORTED_MODULE_1__.createImage)(dataURL);
    }
    const poster = video.poster;
    const contentType = (0,_mimes__WEBPACK_IMPORTED_MODULE_2__.getMimeType)(poster);
    const dataURL = await (0,_dataurl__WEBPACK_IMPORTED_MODULE_3__.resourceToDataURL)(poster, contentType, options);
    return (0,_util__WEBPACK_IMPORTED_MODULE_1__.createImage)(dataURL);
}
async function cloneIFrameElement(iframe) {
    var _a;
    try {
        if ((_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.body) {
            return (await cloneNode(iframe.contentDocument.body, {}, true));
        }
    }
    catch (_b) {
        // Failed to clone iframe
    }
    return iframe.cloneNode(false);
}
async function cloneSingleNode(node, options) {
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(node, HTMLCanvasElement)) {
        return cloneCanvasElement(node);
    }
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(node, HTMLVideoElement)) {
        return cloneVideoElement(node, options);
    }
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(node, HTMLIFrameElement)) {
        return cloneIFrameElement(node);
    }
    return node.cloneNode(false);
}
const isSlotElement = (node) => node.tagName != null && node.tagName.toUpperCase() === 'SLOT';
async function cloneChildren(nativeNode, clonedNode, options) {
    var _a, _b;
    let children = [];
    if (isSlotElement(nativeNode) && nativeNode.assignedNodes) {
        children = (0,_util__WEBPACK_IMPORTED_MODULE_1__.toArray)(nativeNode.assignedNodes());
    }
    else if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(nativeNode, HTMLIFrameElement) &&
        ((_a = nativeNode.contentDocument) === null || _a === void 0 ? void 0 : _a.body)) {
        children = (0,_util__WEBPACK_IMPORTED_MODULE_1__.toArray)(nativeNode.contentDocument.body.childNodes);
    }
    else {
        children = (0,_util__WEBPACK_IMPORTED_MODULE_1__.toArray)(((_b = nativeNode.shadowRoot) !== null && _b !== void 0 ? _b : nativeNode).childNodes);
    }
    if (children.length === 0 ||
        (0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(nativeNode, HTMLVideoElement)) {
        return clonedNode;
    }
    await children.reduce((deferred, child) => deferred
        .then(() => cloneNode(child, options))
        .then((clonedChild) => {
        if (clonedChild) {
            clonedNode.appendChild(clonedChild);
        }
    }), Promise.resolve());
    return clonedNode;
}
function cloneCSSStyle(nativeNode, clonedNode) {
    const targetStyle = clonedNode.style;
    if (!targetStyle) {
        return;
    }
    const sourceStyle = window.getComputedStyle(nativeNode);
    if (sourceStyle.cssText) {
        targetStyle.cssText = sourceStyle.cssText;
        targetStyle.transformOrigin = sourceStyle.transformOrigin;
    }
    else {
        (0,_util__WEBPACK_IMPORTED_MODULE_1__.toArray)(sourceStyle).forEach((name) => {
            let value = sourceStyle.getPropertyValue(name);
            if (name === 'font-size' && value.endsWith('px')) {
                const reducedFont = Math.floor(parseFloat(value.substring(0, value.length - 2))) - 0.1;
                value = `${reducedFont}px`;
            }
            if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(nativeNode, HTMLIFrameElement) &&
                name === 'display' &&
                value === 'inline') {
                value = 'block';
            }
            if (name === 'd' && clonedNode.getAttribute('d')) {
                value = `path(${clonedNode.getAttribute('d')})`;
            }
            targetStyle.setProperty(name, value, sourceStyle.getPropertyPriority(name));
        });
    }
}
function cloneInputValue(nativeNode, clonedNode) {
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(nativeNode, HTMLTextAreaElement)) {
        clonedNode.innerHTML = nativeNode.value;
    }
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(nativeNode, HTMLInputElement)) {
        clonedNode.setAttribute('value', nativeNode.value);
    }
}
function cloneSelectValue(nativeNode, clonedNode) {
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(nativeNode, HTMLSelectElement)) {
        const clonedSelect = clonedNode;
        const selectedOption = Array.from(clonedSelect.children).find((child) => nativeNode.value === child.getAttribute('value'));
        if (selectedOption) {
            selectedOption.setAttribute('selected', '');
        }
    }
}
function decorate(nativeNode, clonedNode) {
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(clonedNode, Element)) {
        cloneCSSStyle(nativeNode, clonedNode);
        (0,_clone_pseudos__WEBPACK_IMPORTED_MODULE_0__.clonePseudoElements)(nativeNode, clonedNode);
        cloneInputValue(nativeNode, clonedNode);
        cloneSelectValue(nativeNode, clonedNode);
    }
    return clonedNode;
}
async function ensureSVGSymbols(clone, options) {
    const uses = clone.querySelectorAll ? clone.querySelectorAll('use') : [];
    if (uses.length === 0) {
        return clone;
    }
    const processedDefs = {};
    for (let i = 0; i < uses.length; i++) {
        const use = uses[i];
        const id = use.getAttribute('xlink:href');
        if (id) {
            const exist = clone.querySelector(id);
            const definition = document.querySelector(id);
            if (!exist && definition && !processedDefs[id]) {
                // eslint-disable-next-line no-await-in-loop
                processedDefs[id] = (await cloneNode(definition, options, true));
            }
        }
    }
    const nodes = Object.values(processedDefs);
    if (nodes.length) {
        const ns = 'http://www.w3.org/1999/xhtml';
        const svg = document.createElementNS(ns, 'svg');
        svg.setAttribute('xmlns', ns);
        svg.style.position = 'absolute';
        svg.style.width = '0';
        svg.style.height = '0';
        svg.style.overflow = 'hidden';
        svg.style.display = 'none';
        const defs = document.createElementNS(ns, 'defs');
        svg.appendChild(defs);
        for (let i = 0; i < nodes.length; i++) {
            defs.appendChild(nodes[i]);
        }
        clone.appendChild(svg);
    }
    return clone;
}
async function cloneNode(node, options, isRoot) {
    if (!isRoot && options.filter && !options.filter(node)) {
        return null;
    }
    return Promise.resolve(node)
        .then((clonedNode) => cloneSingleNode(clonedNode, options))
        .then((clonedNode) => cloneChildren(node, clonedNode, options))
        .then((clonedNode) => decorate(node, clonedNode))
        .then((clonedNode) => ensureSVGSymbols(clonedNode, options));
}

/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clonePseudoElements: function() { return /* binding */ clonePseudoElements; }
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65);

function formatCSSText(style) {
    const content = style.getPropertyValue('content');
    return `${style.cssText} content: '${content.replace(/'|"/g, '')}';`;
}
function formatCSSProperties(style) {
    return (0,_util__WEBPACK_IMPORTED_MODULE_0__.toArray)(style)
        .map((name) => {
        const value = style.getPropertyValue(name);
        const priority = style.getPropertyPriority(name);
        return `${name}: ${value}${priority ? ' !important' : ''};`;
    })
        .join(' ');
}
function getPseudoElementStyle(className, pseudo, style) {
    const selector = `.${className}:${pseudo}`;
    const cssText = style.cssText
        ? formatCSSText(style)
        : formatCSSProperties(style);
    return document.createTextNode(`${selector}{${cssText}}`);
}
function clonePseudoElement(nativeNode, clonedNode, pseudo) {
    const style = window.getComputedStyle(nativeNode, pseudo);
    const content = style.getPropertyValue('content');
    if (content === '' || content === 'none') {
        return;
    }
    const className = (0,_util__WEBPACK_IMPORTED_MODULE_0__.uuid)();
    try {
        clonedNode.className = `${clonedNode.className} ${className}`;
    }
    catch (err) {
        return;
    }
    const styleElement = document.createElement('style');
    styleElement.appendChild(getPseudoElementStyle(className, pseudo, style));
    clonedNode.appendChild(styleElement);
}
function clonePseudoElements(nativeNode, clonedNode) {
    clonePseudoElement(nativeNode, clonedNode, ':before');
    clonePseudoElement(nativeNode, clonedNode, ':after');
}

/***/ }),
/* 65 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canvasToBlob: function() { return /* binding */ canvasToBlob; },
/* harmony export */   checkCanvasDimensions: function() { return /* binding */ checkCanvasDimensions; },
/* harmony export */   createImage: function() { return /* binding */ createImage; },
/* harmony export */   delay: function() { return /* binding */ delay; },
/* harmony export */   getImageSize: function() { return /* binding */ getImageSize; },
/* harmony export */   getPixelRatio: function() { return /* binding */ getPixelRatio; },
/* harmony export */   isInstanceOfElement: function() { return /* binding */ isInstanceOfElement; },
/* harmony export */   nodeToDataURL: function() { return /* binding */ nodeToDataURL; },
/* harmony export */   resolveUrl: function() { return /* binding */ resolveUrl; },
/* harmony export */   svgToDataURL: function() { return /* binding */ svgToDataURL; },
/* harmony export */   toArray: function() { return /* binding */ toArray; },
/* harmony export */   uuid: function() { return /* binding */ uuid; }
/* harmony export */ });
function resolveUrl(url, baseUrl) {
    // url is absolute already
    if (url.match(/^[a-z]+:\/\//i)) {
        return url;
    }
    // url is absolute already, without protocol
    if (url.match(/^\/\//)) {
        return window.location.protocol + url;
    }
    // dataURI, mailto:, tel:, etc.
    if (url.match(/^[a-z]+:/i)) {
        return url;
    }
    const doc = document.implementation.createHTMLDocument();
    const base = doc.createElement('base');
    const a = doc.createElement('a');
    doc.head.appendChild(base);
    doc.body.appendChild(a);
    if (baseUrl) {
        base.href = baseUrl;
    }
    a.href = url;
    return a.href;
}
const uuid = (() => {
    // generate uuid for className of pseudo elements.
    // We should not use GUIDs, otherwise pseudo elements sometimes cannot be captured.
    let counter = 0;
    // ref: http://stackoverflow.com/a/6248722/2519373
    const random = () => 
    // eslint-disable-next-line no-bitwise
    `0000${((Math.random() * 36 ** 4) << 0).toString(36)}`.slice(-4);
    return () => {
        counter += 1;
        return `u${random()}${counter}`;
    };
})();
function delay(ms) {
    return (args) => new Promise((resolve) => {
        setTimeout(() => resolve(args), ms);
    });
}
function toArray(arrayLike) {
    const arr = [];
    for (let i = 0, l = arrayLike.length; i < l; i++) {
        arr.push(arrayLike[i]);
    }
    return arr;
}
function px(node, styleProperty) {
    const win = node.ownerDocument.defaultView || window;
    const val = win.getComputedStyle(node).getPropertyValue(styleProperty);
    return val ? parseFloat(val.replace('px', '')) : 0;
}
function getNodeWidth(node) {
    const leftBorder = px(node, 'border-left-width');
    const rightBorder = px(node, 'border-right-width');
    return node.clientWidth + leftBorder + rightBorder;
}
function getNodeHeight(node) {
    const topBorder = px(node, 'border-top-width');
    const bottomBorder = px(node, 'border-bottom-width');
    return node.clientHeight + topBorder + bottomBorder;
}
function getImageSize(targetNode, options = {}) {
    const width = options.width || getNodeWidth(targetNode);
    const height = options.height || getNodeHeight(targetNode);
    return { width, height };
}
function getPixelRatio() {
    let ratio;
    let FINAL_PROCESS;
    try {
        FINAL_PROCESS = process;
    }
    catch (e) {
        // pass
    }
    const val = FINAL_PROCESS && FINAL_PROCESS.env
        ? FINAL_PROCESS.env.devicePixelRatio
        : null;
    if (val) {
        ratio = parseInt(val, 10);
        if (Number.isNaN(ratio)) {
            ratio = 1;
        }
    }
    return ratio || window.devicePixelRatio || 1;
}
// @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas#maximum_canvas_size
const canvasDimensionLimit = 16384;
function checkCanvasDimensions(canvas) {
    if (canvas.width > canvasDimensionLimit ||
        canvas.height > canvasDimensionLimit) {
        if (canvas.width > canvasDimensionLimit &&
            canvas.height > canvasDimensionLimit) {
            if (canvas.width > canvas.height) {
                canvas.height *= canvasDimensionLimit / canvas.width;
                canvas.width = canvasDimensionLimit;
            }
            else {
                canvas.width *= canvasDimensionLimit / canvas.height;
                canvas.height = canvasDimensionLimit;
            }
        }
        else if (canvas.width > canvasDimensionLimit) {
            canvas.height *= canvasDimensionLimit / canvas.width;
            canvas.width = canvasDimensionLimit;
        }
        else {
            canvas.width *= canvasDimensionLimit / canvas.height;
            canvas.height = canvasDimensionLimit;
        }
    }
}
function canvasToBlob(canvas, options = {}) {
    if (canvas.toBlob) {
        return new Promise((resolve) => {
            canvas.toBlob(resolve, options.type ? options.type : 'image/png', options.quality ? options.quality : 1);
        });
    }
    return new Promise((resolve) => {
        const binaryString = window.atob(canvas
            .toDataURL(options.type ? options.type : undefined, options.quality ? options.quality : undefined)
            .split(',')[1]);
        const len = binaryString.length;
        const binaryArray = new Uint8Array(len);
        for (let i = 0; i < len; i += 1) {
            binaryArray[i] = binaryString.charCodeAt(i);
        }
        resolve(new Blob([binaryArray], {
            type: options.type ? options.type : 'image/png',
        }));
    });
}
function createImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.decode = () => resolve(img);
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.crossOrigin = 'anonymous';
        img.decoding = 'async';
        img.src = url;
    });
}
async function svgToDataURL(svg) {
    return Promise.resolve()
        .then(() => new XMLSerializer().serializeToString(svg))
        .then(encodeURIComponent)
        .then((html) => `data:image/svg+xml;charset=utf-8,${html}`);
}
async function nodeToDataURL(node, width, height) {
    const xmlns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(xmlns, 'svg');
    const foreignObject = document.createElementNS(xmlns, 'foreignObject');
    svg.setAttribute('width', `${width}`);
    svg.setAttribute('height', `${height}`);
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    foreignObject.setAttribute('width', '100%');
    foreignObject.setAttribute('height', '100%');
    foreignObject.setAttribute('x', '0');
    foreignObject.setAttribute('y', '0');
    foreignObject.setAttribute('externalResourcesRequired', 'true');
    svg.appendChild(foreignObject);
    foreignObject.appendChild(node);
    return svgToDataURL(svg);
}
const isInstanceOfElement = (node, instance) => {
    if (node instanceof instance)
        return true;
    const nodePrototype = Object.getPrototypeOf(node);
    if (nodePrototype === null)
        return false;
    return (nodePrototype.constructor.name === instance.name ||
        isInstanceOfElement(nodePrototype, instance));
};

/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getMimeType: function() { return /* binding */ getMimeType; }
/* harmony export */ });
const WOFF = 'application/font-woff';
const JPEG = 'image/jpeg';
const mimes = {
    woff: WOFF,
    woff2: WOFF,
    ttf: 'application/font-truetype',
    eot: 'application/vnd.ms-fontobject',
    png: 'image/png',
    jpg: JPEG,
    jpeg: JPEG,
    gif: 'image/gif',
    tiff: 'image/tiff',
    svg: 'image/svg+xml',
    webp: 'image/webp',
};
function getExtension(url) {
    const match = /\.([^./]*?)$/g.exec(url);
    return match ? match[1] : '';
}
function getMimeType(url) {
    const extension = getExtension(url).toLowerCase();
    return mimes[extension] || '';
}

/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchAsDataURL: function() { return /* binding */ fetchAsDataURL; },
/* harmony export */   isDataUrl: function() { return /* binding */ isDataUrl; },
/* harmony export */   makeDataUrl: function() { return /* binding */ makeDataUrl; },
/* harmony export */   resourceToDataURL: function() { return /* binding */ resourceToDataURL; }
/* harmony export */ });
function getContentFromDataUrl(dataURL) {
    return dataURL.split(/,/)[1];
}
function isDataUrl(url) {
    return url.search(/^(data:)/) !== -1;
}
function makeDataUrl(content, mimeType) {
    return `data:${mimeType};base64,${content}`;
}
async function fetchAsDataURL(url, init, process) {
    const res = await fetch(url, init);
    if (res.status === 404) {
        throw new Error(`Resource "${res.url}" not found`);
    }
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = () => {
            try {
                resolve(process({ res, result: reader.result }));
            }
            catch (error) {
                reject(error);
            }
        };
        reader.readAsDataURL(blob);
    });
}
const cache = {};
function getCacheKey(url, contentType, includeQueryParams) {
    let key = url.replace(/\?.*/, '');
    if (includeQueryParams) {
        key = url;
    }
    // font resource
    if (/ttf|otf|eot|woff2?/i.test(key)) {
        key = key.replace(/.*\//, '');
    }
    return contentType ? `[${contentType}]${key}` : key;
}
async function resourceToDataURL(resourceUrl, contentType, options) {
    const cacheKey = getCacheKey(resourceUrl, contentType, options.includeQueryParams);
    if (cache[cacheKey] != null) {
        return cache[cacheKey];
    }
    // ref: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
    if (options.cacheBust) {
        // eslint-disable-next-line no-param-reassign
        resourceUrl += (/\?/.test(resourceUrl) ? '&' : '?') + new Date().getTime();
    }
    let dataURL;
    try {
        const content = await fetchAsDataURL(resourceUrl, options.fetchRequestInit, ({ res, result }) => {
            if (!contentType) {
                // eslint-disable-next-line no-param-reassign
                contentType = res.headers.get('Content-Type') || '';
            }
            return getContentFromDataUrl(result);
        });
        dataURL = makeDataUrl(content, contentType);
    }
    catch (error) {
        dataURL = options.imagePlaceholder || '';
        let msg = `Failed to fetch resource: ${resourceUrl}`;
        if (error) {
            msg = typeof error === 'string' ? error : error.message;
        }
        if (msg) {
            console.warn(msg);
        }
    }
    cache[cacheKey] = dataURL;
    return dataURL;
}

/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   embedImages: function() { return /* binding */ embedImages; }
/* harmony export */ });
/* harmony import */ var _embed_resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(69);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65);
/* harmony import */ var _dataurl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(67);
/* harmony import */ var _mimes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(66);




async function embedProp(propName, node, options) {
    var _a;
    const propValue = (_a = node.style) === null || _a === void 0 ? void 0 : _a.getPropertyValue(propName);
    if (propValue) {
        const cssString = await (0,_embed_resources__WEBPACK_IMPORTED_MODULE_0__.embedResources)(propValue, null, options);
        node.style.setProperty(propName, cssString, node.style.getPropertyPriority(propName));
        return true;
    }
    return false;
}
async function embedBackground(clonedNode, options) {
    if (!(await embedProp('background', clonedNode, options))) {
        await embedProp('background-image', clonedNode, options);
    }
    if (!(await embedProp('mask', clonedNode, options))) {
        await embedProp('mask-image', clonedNode, options);
    }
}
async function embedImageNode(clonedNode, options) {
    const isImageElement = (0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(clonedNode, HTMLImageElement);
    if (!(isImageElement && !(0,_dataurl__WEBPACK_IMPORTED_MODULE_2__.isDataUrl)(clonedNode.src)) &&
        !((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(clonedNode, SVGImageElement) &&
            !(0,_dataurl__WEBPACK_IMPORTED_MODULE_2__.isDataUrl)(clonedNode.href.baseVal))) {
        return;
    }
    const url = isImageElement ? clonedNode.src : clonedNode.href.baseVal;
    const dataURL = await (0,_dataurl__WEBPACK_IMPORTED_MODULE_2__.resourceToDataURL)(url, (0,_mimes__WEBPACK_IMPORTED_MODULE_3__.getMimeType)(url), options);
    await new Promise((resolve, reject) => {
        clonedNode.onload = resolve;
        clonedNode.onerror = reject;
        const image = clonedNode;
        if (image.decode) {
            image.decode = resolve;
        }
        if (image.loading === 'lazy') {
            image.loading = 'eager';
        }
        if (isImageElement) {
            clonedNode.srcset = '';
            clonedNode.src = dataURL;
        }
        else {
            clonedNode.href.baseVal = dataURL;
        }
    });
}
async function embedChildren(clonedNode, options) {
    const children = (0,_util__WEBPACK_IMPORTED_MODULE_1__.toArray)(clonedNode.childNodes);
    const deferreds = children.map((child) => embedImages(child, options));
    await Promise.all(deferreds).then(() => clonedNode);
}
async function embedImages(clonedNode, options) {
    if ((0,_util__WEBPACK_IMPORTED_MODULE_1__.isInstanceOfElement)(clonedNode, Element)) {
        await embedBackground(clonedNode, options);
        await embedImageNode(clonedNode, options);
        await embedChildren(clonedNode, options);
    }
}

/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   embed: function() { return /* binding */ embed; },
/* harmony export */   embedResources: function() { return /* binding */ embedResources; },
/* harmony export */   parseURLs: function() { return /* binding */ parseURLs; },
/* harmony export */   shouldEmbed: function() { return /* binding */ shouldEmbed; }
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65);
/* harmony import */ var _mimes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66);
/* harmony import */ var _dataurl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(67);



const URL_REGEX = /url\((['"]?)([^'"]+?)\1\)/g;
const URL_WITH_FORMAT_REGEX = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g;
const FONT_SRC_REGEX = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function toRegex(url) {
    // eslint-disable-next-line no-useless-escape
    const escaped = url.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
    return new RegExp(`(url\\(['"]?)(${escaped})(['"]?\\))`, 'g');
}
function parseURLs(cssText) {
    const urls = [];
    cssText.replace(URL_REGEX, (raw, quotation, url) => {
        urls.push(url);
        return raw;
    });
    return urls.filter((url) => !(0,_dataurl__WEBPACK_IMPORTED_MODULE_2__.isDataUrl)(url));
}
async function embed(cssText, resourceURL, baseURL, options, getContentFromUrl) {
    try {
        const resolvedURL = baseURL ? (0,_util__WEBPACK_IMPORTED_MODULE_0__.resolveUrl)(resourceURL, baseURL) : resourceURL;
        const contentType = (0,_mimes__WEBPACK_IMPORTED_MODULE_1__.getMimeType)(resourceURL);
        let dataURL;
        if (getContentFromUrl) {
            const content = await getContentFromUrl(resolvedURL);
            dataURL = (0,_dataurl__WEBPACK_IMPORTED_MODULE_2__.makeDataUrl)(content, contentType);
        }
        else {
            dataURL = await (0,_dataurl__WEBPACK_IMPORTED_MODULE_2__.resourceToDataURL)(resolvedURL, contentType, options);
        }
        return cssText.replace(toRegex(resourceURL), `$1${dataURL}$3`);
    }
    catch (error) {
        // pass
    }
    return cssText;
}
function filterPreferredFontFormat(str, { preferredFontFormat }) {
    return !preferredFontFormat
        ? str
        : str.replace(FONT_SRC_REGEX, (match) => {
            // eslint-disable-next-line no-constant-condition
            while (true) {
                const [src, , format] = URL_WITH_FORMAT_REGEX.exec(match) || [];
                if (!format) {
                    return '';
                }
                if (format === preferredFontFormat) {
                    return `src: ${src};`;
                }
            }
        });
}
function shouldEmbed(url) {
    return url.search(URL_REGEX) !== -1;
}
async function embedResources(cssText, baseUrl, options) {
    if (!shouldEmbed(cssText)) {
        return cssText;
    }
    const filteredCSSText = filterPreferredFontFormat(cssText, options);
    const urls = parseURLs(filteredCSSText);
    return urls.reduce((deferred, url) => deferred.then((css) => embed(css, url, baseUrl, options)), Promise.resolve(filteredCSSText));
}

/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyStyle: function() { return /* binding */ applyStyle; }
/* harmony export */ });
function applyStyle(node, options) {
    const { style } = node;
    if (options.backgroundColor) {
        style.backgroundColor = options.backgroundColor;
    }
    if (options.width) {
        style.width = `${options.width}px`;
    }
    if (options.height) {
        style.height = `${options.height}px`;
    }
    const manual = options.style;
    if (manual != null) {
        Object.keys(manual).forEach((key) => {
            style[key] = manual[key];
        });
    }
    return node;
}

/***/ }),
/* 71 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   embedWebFonts: function() { return /* binding */ embedWebFonts; },
/* harmony export */   getWebFontCSS: function() { return /* binding */ getWebFontCSS; }
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65);
/* harmony import */ var _dataurl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67);
/* harmony import */ var _embed_resources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(69);



const cssFetchCache = {};
async function fetchCSS(url) {
    let cache = cssFetchCache[url];
    if (cache != null) {
        return cache;
    }
    const res = await fetch(url);
    const cssText = await res.text();
    cache = { url, cssText };
    cssFetchCache[url] = cache;
    return cache;
}
async function embedFonts(data, options) {
    let cssText = data.cssText;
    const regexUrl = /url\(["']?([^"')]+)["']?\)/g;
    const fontLocs = cssText.match(/url\([^)]+\)/g) || [];
    const loadFonts = fontLocs.map(async (loc) => {
        let url = loc.replace(regexUrl, '$1');
        if (!url.startsWith('https://')) {
            url = new URL(url, data.url).href;
        }
        return (0,_dataurl__WEBPACK_IMPORTED_MODULE_1__.fetchAsDataURL)(url, options.fetchRequestInit, ({ result }) => {
            cssText = cssText.replace(loc, `url(${result})`);
            return [loc, result];
        });
    });
    return Promise.all(loadFonts).then(() => cssText);
}
function parseCSS(source) {
    if (source == null) {
        return [];
    }
    const result = [];
    const commentsRegex = /(\/\*[\s\S]*?\*\/)/gi;
    // strip out comments
    let cssText = source.replace(commentsRegex, '');
    // eslint-disable-next-line prefer-regex-literals
    const keyframesRegex = new RegExp('((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})', 'gi');
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const matches = keyframesRegex.exec(cssText);
        if (matches === null) {
            break;
        }
        result.push(matches[0]);
    }
    cssText = cssText.replace(keyframesRegex, '');
    const importRegex = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;
    // to match css & media queries together
    const combinedCSSRegex = '((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]' +
        '*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})';
    // unified regex
    const unifiedRegex = new RegExp(combinedCSSRegex, 'gi');
    // eslint-disable-next-line no-constant-condition
    while (true) {
        let matches = importRegex.exec(cssText);
        if (matches === null) {
            matches = unifiedRegex.exec(cssText);
            if (matches === null) {
                break;
            }
            else {
                importRegex.lastIndex = unifiedRegex.lastIndex;
            }
        }
        else {
            unifiedRegex.lastIndex = importRegex.lastIndex;
        }
        result.push(matches[0]);
    }
    return result;
}
async function getCSSRules(styleSheets, options) {
    const ret = [];
    const deferreds = [];
    // First loop inlines imports
    styleSheets.forEach((sheet) => {
        if ('cssRules' in sheet) {
            try {
                (0,_util__WEBPACK_IMPORTED_MODULE_0__.toArray)(sheet.cssRules || []).forEach((item, index) => {
                    if (item.type === CSSRule.IMPORT_RULE) {
                        let importIndex = index + 1;
                        const url = item.href;
                        const deferred = fetchCSS(url)
                            .then((metadata) => embedFonts(metadata, options))
                            .then((cssText) => parseCSS(cssText).forEach((rule) => {
                            try {
                                sheet.insertRule(rule, rule.startsWith('@import')
                                    ? (importIndex += 1)
                                    : sheet.cssRules.length);
                            }
                            catch (error) {
                                console.error('Error inserting rule from remote css', {
                                    rule,
                                    error,
                                });
                            }
                        }))
                            .catch((e) => {
                            console.error('Error loading remote css', e.toString());
                        });
                        deferreds.push(deferred);
                    }
                });
            }
            catch (e) {
                const inline = styleSheets.find((a) => a.href == null) || document.styleSheets[0];
                if (sheet.href != null) {
                    deferreds.push(fetchCSS(sheet.href)
                        .then((metadata) => embedFonts(metadata, options))
                        .then((cssText) => parseCSS(cssText).forEach((rule) => {
                        inline.insertRule(rule, sheet.cssRules.length);
                    }))
                        .catch((err) => {
                        console.error('Error loading remote stylesheet', err);
                    }));
                }
                console.error('Error inlining remote css file', e);
            }
        }
    });
    return Promise.all(deferreds).then(() => {
        // Second loop parses rules
        styleSheets.forEach((sheet) => {
            if ('cssRules' in sheet) {
                try {
                    (0,_util__WEBPACK_IMPORTED_MODULE_0__.toArray)(sheet.cssRules || []).forEach((item) => {
                        ret.push(item);
                    });
                }
                catch (e) {
                    console.error(`Error while reading CSS rules from ${sheet.href}`, e);
                }
            }
        });
        return ret;
    });
}
function getWebFontRules(cssRules) {
    return cssRules
        .filter((rule) => rule.type === CSSRule.FONT_FACE_RULE)
        .filter((rule) => (0,_embed_resources__WEBPACK_IMPORTED_MODULE_2__.shouldEmbed)(rule.style.getPropertyValue('src')));
}
async function parseWebFontRules(node, options) {
    if (node.ownerDocument == null) {
        throw new Error('Provided element is not within a Document');
    }
    const styleSheets = (0,_util__WEBPACK_IMPORTED_MODULE_0__.toArray)(node.ownerDocument.styleSheets);
    const cssRules = await getCSSRules(styleSheets, options);
    return getWebFontRules(cssRules);
}
async function getWebFontCSS(node, options) {
    const rules = await parseWebFontRules(node, options);
    const cssTexts = await Promise.all(rules.map((rule) => {
        const baseUrl = rule.parentStyleSheet ? rule.parentStyleSheet.href : null;
        return (0,_embed_resources__WEBPACK_IMPORTED_MODULE_2__.embedResources)(rule.cssText, baseUrl, options);
    }));
    return cssTexts.join('\n');
}
async function embedWebFonts(clonedNode, options) {
    const cssText = options.fontEmbedCSS != null
        ? options.fontEmbedCSS
        : options.skipFonts
            ? null
            : await getWebFontCSS(clonedNode, options);
    if (cssText) {
        const styleNode = document.createElement('style');
        const sytleContent = document.createTextNode(cssText);
        styleNode.appendChild(sytleContent);
        if (clonedNode.firstChild) {
            clonedNode.insertBefore(styleNode, clonedNode.firstChild);
        }
        else {
            clonedNode.appendChild(styleNode);
        }
    }
}

/***/ }),
/* 72 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   namer: function() { return /* binding */ namer; },
/* harmony export */   outline: function() { return /* binding */ outline; },
/* harmony export */   pixelToInch: function() { return /* binding */ pixelToInch; },
/* harmony export */   pixelToMm: function() { return /* binding */ pixelToMm; },
/* harmony export */   qrToggle: function() { return /* binding */ qrToggle; },
/* harmony export */   qrVisibility: function() { return /* binding */ qrVisibility; },
/* harmony export */   sidebarAccordion: function() { return /* binding */ sidebarAccordion; },
/* harmony export */   sizeVisibility: function() { return /* binding */ sizeVisibility; },
/* harmony export */   skuBox: function() { return /* binding */ skuBox; }
/* harmony export */ });
/* harmony import */ var _domElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _brandDefaults_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(56);



const qrToggle = () => {
  const qrToggle = document.querySelector('.qr__toggle');
  const qrPath = document.querySelector('#qr_path');

  // Load the initial state from localStorage
  const initialState = (localStorage.getItem('qrPathDisabled') ?? 'true') === 'true';
  qrPath.disabled = initialState;
  qrToggle.classList.toggle('qr__toggle--active', !initialState);

  qrToggle.addEventListener('click', () => {
    qrPath.disabled = !qrPath.disabled;
    qrToggle.classList.toggle('qr__toggle--active', !qrPath.disabled);

    // Save the current state to localStorage
    localStorage.setItem('qrPathDisabled', qrPath.disabled.toString());

    if (!qrPath.disabled) { qrPath.focus() }
  });
}

const qrVisibility = () => {
  const qrVisibilityToggle = document.querySelector('.qr__visibility');
  const qrDivToHide = document.querySelector('.label__install');

  // Load the initial state from localStorage or default to true if not found
  const initialState = (localStorage.getItem('qrVisibilityShown') ?? 'true') === 'true';
  qrDivToHide.classList.toggle('label__install--active', initialState);
  qrVisibilityToggle.classList.toggle('qr__visibility--active', initialState);

  qrVisibilityToggle.addEventListener('click', () => {
    qrDivToHide.classList.toggle('label__install--active');
    qrVisibilityToggle.classList.toggle('qr__visibility--active', qrDivToHide.classList.contains('label__install--active'));

    // Save the current state to localStorage
    localStorage.setItem('qrVisibilityShown', qrDivToHide.classList.contains('label__install--active').toString());
  });
}

const sizeVisibility = () => {
  const qrVisibilityToggle = document.querySelector('.size__visibility');
  const sizeDivToHide = document.querySelectorAll('.shipping-mark__dims');

  // Load the initial state from localStorage or default to true if not found
  const initialState = (localStorage.getItem('sizeVisibilityShown') ?? 'true') === 'true';
  sizeDivToHide.forEach(div => div.classList.toggle('shipping-mark__dims--active', initialState));

  qrVisibilityToggle.classList.toggle('size__visibility--active', initialState);

  qrVisibilityToggle.addEventListener('click', () => {
    sizeDivToHide.forEach(div => div.classList.toggle('shipping-mark__dims--active'));
    qrVisibilityToggle.classList.toggle('size__visibility--active', sizeDivToHide[0].classList.contains('shipping-mark__dims--active'));

    // Save the current state to localStorage
    localStorage.setItem('sizeVisibilityShown', sizeDivToHide[0].classList.contains('shipping-mark__dims--active').toString());
  });
}

const skuBox = () => {
  const skuBoxToggle = document.querySelector('.box__toggle');
  const preview = document.querySelector('.preview__content');

  // Load the initial state from localStorage or default to true if not found
  const initialState = (localStorage.getItem('boxSkuShown') ?? 'true') === 'true';
  skuBoxToggle.classList.toggle('box__toggle--active', initialState);
  preview.classList.toggle('preview--has-box', initialState);

  skuBoxToggle.addEventListener('click', () => {
    preview.classList.toggle('preview--has-box');
    skuBoxToggle.classList.toggle('box__toggle--active', preview.classList.contains('preview--has-box'));

    // Save the current state to localStorage
    localStorage.setItem('boxSkuShown', preview.classList.contains('preview--has-box').toString());
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

const namer = (type, filetype) => {
  const defaults = (0,_brandDefaults_js__WEBPACK_IMPORTED_MODULE_1__.brandDefaults)();

  let brand = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].brand.value;
  const sku = _domElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].sku.value.toUpperCase() || defaults.sku;
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

const pixelToInch = (pixels) => {
  const dpi = 96; // Assuming a standard DPI of 96
  return parseFloat((pixels / dpi).toFixed(2));
}

const pixelToMm = (pixels) => {
  const dpi = 96; // Assuming a standard DPI of 96
  const mmPerInch = 25.4; // Millimeters per inch
  return parseFloat(((pixels / dpi) * mmPerInch).toFixed(2));
}

/***/ }),
/* 73 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   colorInit: function() { return /* binding */ colorInit; }
/* harmony export */ });
/* harmony import */ var _jaames_iro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74);
/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);


let colorPicker;

const colorInit = () => {
  colorPicker = new _jaames_iro__WEBPACK_IMPORTED_MODULE_0__["default"].ColorPicker('.color-picker', {
    width: 160,
    color: "#ffffff",
    layoutDirection: 'horizontal',
    sliderSize: 8
  });

  const currentIndicator = document.querySelector('.color-current');

  document.querySelector('#color').addEventListener('change', function() {
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

    (0,_select__WEBPACK_IMPORTED_MODULE_1__.selectChoose)('#color', '#ffffff');
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
/* 74 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/*!
 * iro.js v5.5.2
 * 2016-2021 James Daniel
 * Licensed under MPL 2.0
 * github.com/jaames/iro.js
 */

var n,u,t,i,r,o,f={},e=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function s(n,l){for(var u in l){ n[u]=l[u]; }return n}function a(n){var l=n.parentNode;l&&l.removeChild(n);}function h(n,l,u){var t,i,r,o,f=arguments;if(l=s({},l),arguments.length>3){ for(u=[u],t=3;t<arguments.length;t++){ u.push(f[t]); } }if(null!=u&&(l.children=u),null!=n&&null!=n.defaultProps){ for(i in n.defaultProps){ void 0===l[i]&&(l[i]=n.defaultProps[i]); } }return o=l.key,null!=(r=l.ref)&&delete l.ref,null!=o&&delete l.key,v(n,l,o,r)}function v(l,u,t,i){var r={type:l,props:u,key:t,ref:i,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return n.vnode&&n.vnode(r),r}function d(n){return n.children}function y(n){if(null==n||"boolean"==typeof n){ return null; }if("string"==typeof n||"number"==typeof n){ return v(null,n,null,null); }if(null!=n.__e||null!=n.__c){var l=v(n.type,n.props,n.key,null);return l.__e=n.__e,l}return n}function m(n,l){this.props=n,this.context=l;}function w(n,l){if(null==l){ return n.__p?w(n.__p,n.__p.__k.indexOf(n)+1):null; }for(var u;l<n.__k.length;l++){ if(null!=(u=n.__k[l])&&null!=u.__e){ return u.__e; } }return "function"==typeof n.type?w(n):null}function g(n){var l,u;if(null!=(n=n.__p)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++){ if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break} }return g(n)}}function k(l){(!l.__d&&(l.__d=!0)&&1===u.push(l)||i!==n.debounceRendering)&&(i=n.debounceRendering,(n.debounceRendering||t)(_));}function _(){var n,l,t,i,r,o,f,e;for(u.sort(function(n,l){return l.__v.__b-n.__v.__b});n=u.pop();){ n.__d&&(t=void 0,i=void 0,o=(r=(l=n).__v).__e,f=l.__P,e=l.u,l.u=!1,f&&(t=[],i=$(f,r,s({},r),l.__n,void 0!==f.ownerSVGElement,null,t,e,null==o?w(r):o),j(t,r),i!=o&&g(r))); }}function b(n,l,u,t,i,r,o,c,s){var h,v,p,d,y,m,g,k=u&&u.__k||e,_=k.length;if(c==f&&(c=null!=r?r[0]:_?w(u,0):null),h=0,l.__k=x(l.__k,function(u){if(null!=u){if(u.__p=l,u.__b=l.__b+1,null===(p=k[h])||p&&u.key==p.key&&u.type===p.type){ k[h]=void 0; }else { for(v=0;v<_;v++){if((p=k[v])&&u.key==p.key&&u.type===p.type){k[v]=void 0;break}p=null;} }if(d=$(n,u,p=p||f,t,i,r,o,null,c,s),(v=u.ref)&&p.ref!=v&&(g||(g=[])).push(v,u.__c||d,u),null!=d){if(null==m&&(m=d),null!=u.l){ d=u.l,u.l=null; }else if(r==p||d!=c||null==d.parentNode){n:if(null==c||c.parentNode!==n){ n.appendChild(d); }else{for(y=c,v=0;(y=y.nextSibling)&&v<_;v+=2){ if(y==d){ break n; } }n.insertBefore(d,c);}"option"==l.type&&(n.value="");}c=d.nextSibling,"function"==typeof l.type&&(l.l=d);}}return h++,u}),l.__e=m,null!=r&&"function"!=typeof l.type){ for(h=r.length;h--;){ null!=r[h]&&a(r[h]); } }for(h=_;h--;){ null!=k[h]&&D(k[h],k[h]); }if(g){ for(h=0;h<g.length;h++){ A(g[h],g[++h],g[++h]); } }}function x(n,l,u){if(null==u&&(u=[]),null==n||"boolean"==typeof n){ l&&u.push(l(null)); }else if(Array.isArray(n)){ for(var t=0;t<n.length;t++){ x(n[t],l,u); } }else { u.push(l?l(y(n)):n); }return u}function C(n,l,u,t,i){var r;for(r in u){ r in l||N(n,r,null,u[r],t); }for(r in l){ i&&"function"!=typeof l[r]||"value"===r||"checked"===r||u[r]===l[r]||N(n,r,l[r],u[r],t); }}function P(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]="number"==typeof u&&!1===c.test(l)?u+"px":null==u?"":u;}function N(n,l,u,t,i){var r,o,f,e,c;if("key"===(l=i?"className"===l?"class":l:"class"===l?"className":l)||"children"===l);else if("style"===l){ if(r=n.style,"string"==typeof u){ r.cssText=u; }else{if("string"==typeof t&&(r.cssText="",t=null),t){ for(o in t){ u&&o in u||P(r,o,""); } }if(u){ for(f in u){ t&&u[f]===t[f]||P(r,f,u[f]); } }} }else{ "o"===l[0]&&"n"===l[1]?(e=l!==(l=l.replace(/Capture$/,"")),c=l.toLowerCase(),l=(c in n?c:l).slice(2),u?(t||n.addEventListener(l,T,e),(n.t||(n.t={}))[l]=u):n.removeEventListener(l,T,e)):"list"!==l&&"tagName"!==l&&"form"!==l&&!i&&l in n?n[l]=null==u?"":u:"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/^xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u?n.removeAttribute(l):n.setAttribute(l,u)); }}function T(l){return this.t[l.type](n.event?n.event(l):l)}function $(l,u,t,i,r,o,f,e,c,a){var h,v,p,y,w,g,k,_,C,P,N=u.type;if(void 0!==u.constructor){ return null; }(h=n.__b)&&h(u);try{n:if("function"==typeof N){if(_=u.props,C=(h=N.contextType)&&i[h.__c],P=h?C?C.props.value:h.__p:i,t.__c?k=(v=u.__c=t.__c).__p=v.__E:("prototype"in N&&N.prototype.render?u.__c=v=new N(_,P):(u.__c=v=new m(_,P),v.constructor=N,v.render=H),C&&C.sub(v),v.props=_,v.state||(v.state={}),v.context=P,v.__n=i,p=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=N.getDerivedStateFromProps&&s(v.__s==v.state?v.__s=s({},v.__s):v.__s,N.getDerivedStateFromProps(_,v.__s)),p){ null==N.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&f.push(v); }else{if(null==N.getDerivedStateFromProps&&null==e&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(_,P),!e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(_,v.__s,P)){for(v.props=_,v.state=v.__s,v.__d=!1,v.__v=u,u.__e=null!=c?c!==t.__e?c:t.__e:null,u.__k=t.__k,h=0;h<u.__k.length;h++){ u.__k[h]&&(u.__k[h].__p=u); }break n}null!=v.componentWillUpdate&&v.componentWillUpdate(_,v.__s,P);}for(y=v.props,w=v.state,v.context=P,v.props=_,v.state=v.__s,(h=n.__r)&&h(u),v.__d=!1,v.__v=u,v.__P=l,h=v.render(v.props,v.state,v.context),u.__k=x(null!=h&&h.type==d&&null==h.key?h.props.children:h),null!=v.getChildContext&&(i=s(s({},i),v.getChildContext())),p||null==v.getSnapshotBeforeUpdate||(g=v.getSnapshotBeforeUpdate(y,w)),b(l,u,t,i,r,o,f,c,a),v.base=u.__e;h=v.__h.pop();){ v.__s&&(v.state=v.__s),h.call(v); }p||null==y||null==v.componentDidUpdate||v.componentDidUpdate(y,w,g),k&&(v.__E=v.__p=null);}else { u.__e=z(t.__e,u,t,i,r,o,f,a); }(h=n.diffed)&&h(u);}catch(l){n.__e(l,u,t);}return u.__e}function j(l,u){for(var t;t=l.pop();){ try{t.componentDidMount();}catch(l){n.__e(l,t.__v);} }n.__c&&n.__c(u);}function z(n,l,u,t,i,r,o,c){var s,a,h,v,p=u.props,d=l.props;if(i="svg"===l.type||i,null==n&&null!=r){ for(s=0;s<r.length;s++){ if(null!=(a=r[s])&&(null===l.type?3===a.nodeType:a.localName===l.type)){n=a,r[s]=null;break} } }if(null==n){if(null===l.type){ return document.createTextNode(d); }n=i?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type),r=null;}return null===l.type?p!==d&&(null!=r&&(r[r.indexOf(n)]=null),n.data=d):l!==u&&(null!=r&&(r=e.slice.call(n.childNodes)),h=(p=u.props||f).dangerouslySetInnerHTML,v=d.dangerouslySetInnerHTML,c||(v||h)&&(v&&h&&v.__html==h.__html||(n.innerHTML=v&&v.__html||"")),C(n,d,p,i,c),l.__k=l.props.children,v||b(n,l,u,t,"foreignObject"!==l.type&&i,r,o,f,c),c||("value"in d&&void 0!==d.value&&d.value!==n.value&&(n.value=null==d.value?"":d.value),"checked"in d&&void 0!==d.checked&&d.checked!==n.checked&&(n.checked=d.checked))),n}function A(l,u,t){try{"function"==typeof l?l(u):l.current=u;}catch(l){n.__e(l,t);}}function D(l,u,t){var i,r,o;if(n.unmount&&n.unmount(l),(i=l.ref)&&A(i,null,u),t||"function"==typeof l.type||(t=null!=(r=l.__e)),l.__e=l.l=null,null!=(i=l.__c)){if(i.componentWillUnmount){ try{i.componentWillUnmount();}catch(l){n.__e(l,u);} }i.base=i.__P=null;}if(i=l.__k){ for(o=0;o<i.length;o++){ i[o]&&D(i[o],u,t); } }null!=r&&a(r);}function H(n,l,u){return this.constructor(n,u)}function I(l,u,t){var i,o,c;n.__p&&n.__p(l,u),o=(i=t===r)?null:t&&t.__k||u.__k,l=h(d,null,[l]),c=[],$(u,i?u.__k=l:(t||u).__k=l,o||f,f,void 0!==u.ownerSVGElement,t&&!i?[t]:o?null:e.slice.call(u.childNodes),c,!1,t||f,i),j(c,l);}n={},m.prototype.setState=function(n,l){var u=this.__s!==this.state&&this.__s||(this.__s=s({},this.state));("function"!=typeof n||(n=n(u,this.props)))&&s(u,n),null!=n&&this.__v&&(this.u=!1,l&&this.__h.push(l),k(this));},m.prototype.forceUpdate=function(n){this.__v&&(n&&this.__h.push(n),this.u=!0,k(this));},m.prototype.render=d,u=[],t="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=n.debounceRendering,n.__e=function(n,l,u){for(var t;l=l.__p;){ if((t=l.__c)&&!t.__p){ try{if(t.constructor&&null!=t.constructor.getDerivedStateFromError){ t.setState(t.constructor.getDerivedStateFromError(n)); }else{if(null==t.componentDidCatch){ continue; }t.componentDidCatch(n);}return k(t.__E=t)}catch(l){n=l;} } }throw n},r=f,o=0;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) { descriptor.writable = true; }
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) { _defineProperties(Constructor.prototype, protoProps); }
  if (staticProps) { _defineProperties(Constructor, staticProps); }
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    var arguments$1 = arguments;

    for (var i = 1; i < arguments.length; i++) {
      var source = arguments$1[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

// Some regular expressions for rgb() and hsl() Colors are borrowed from tinyColor
// https://github.com/bgrins/TinyColor
// Kelvin temperature math borrowed from Neil Barlett's implementation
// from https://github.com/neilbartlett/color-temperature
// https://www.w3.org/TR/css3-values/#integers
var CSS_INTEGER = '[-\\+]?\\d+%?'; // http://www.w3.org/TR/css3-values/#number-value

var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?'; // Allow positive/negative integer/number. Don't capture the either/or, just the entire outcome

var CSS_UNIT = '(?:' + CSS_NUMBER + ')|(?:' + CSS_INTEGER + ')'; // Parse function params
// Parens and commas are optional, and this also allows for whitespace between numbers

var PERMISSIVE_MATCH_3 = '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?';
var PERMISSIVE_MATCH_4 = '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?'; // Regex patterns for functional color strings

var REGEX_FUNCTIONAL_RGB = new RegExp('rgb' + PERMISSIVE_MATCH_3);
var REGEX_FUNCTIONAL_RGBA = new RegExp('rgba' + PERMISSIVE_MATCH_4);
var REGEX_FUNCTIONAL_HSL = new RegExp('hsl' + PERMISSIVE_MATCH_3);
var REGEX_FUNCTIONAL_HSLA = new RegExp('hsla' + PERMISSIVE_MATCH_4); // Color string parsing regex

var HEX_START = '^(?:#?|0x?)';
var HEX_INT_SINGLE = '([0-9a-fA-F]{1})';
var HEX_INT_DOUBLE = '([0-9a-fA-F]{2})';
var REGEX_HEX_3 = new RegExp(HEX_START + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + '$');
var REGEX_HEX_4 = new RegExp(HEX_START + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + HEX_INT_SINGLE + '$');
var REGEX_HEX_6 = new RegExp(HEX_START + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + '$');
var REGEX_HEX_8 = new RegExp(HEX_START + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + HEX_INT_DOUBLE + '$'); // Kelvin temperature bounds

var KELVIN_MIN = 2000;
var KELVIN_MAX = 40000; // Math shorthands

var log = Math.log,
    round = Math.round,
    floor = Math.floor;
/**
 * @desc Clamp a number between a min and max value
 * @param num - input value
 * @param min - min allowed value
 * @param max - max allowed value
 */

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
/**
 * @desc Parse a css unit string - either regular int or a percentage number
 * @param str - css unit string
 * @param max - max unit value, used for calculating percentages
 */


function parseUnit(str, max) {
  var isPercentage = str.indexOf('%') > -1;
  var num = parseFloat(str);
  return isPercentage ? max / 100 * num : num;
}
/**
 * @desc Parse hex str to an int
 * @param str - hex string to parse
 */


function parseHexInt(str) {
  return parseInt(str, 16);
}
/**
 * @desc Convert nunber into to 2-digit hex
 * @param int - number to convert
 */


function intToHex(_int) {
  return _int.toString(16).padStart(2, '0');
}

var IroColor =
/*#__PURE__*/
function () {
  /**
    * @constructor Color object
    * @param value - initial color value
  */
  function IroColor(value, onChange) {
    // The default Color value
    this.$ = {
      h: 0,
      s: 0,
      v: 0,
      a: 1
    };
    if (value) { this.set(value); } // The watch callback function for this Color will be stored here

    this.onChange = onChange;
    this.initialValue = _extends({}, this.$); // copy initial value
  }
  /**
    * @desc Set the Color from any valid value
    * @param value - new color value
  */


  var _proto = IroColor.prototype;

  _proto.set = function set(value) {
    if (typeof value === 'string') {
      if (/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(value)) {
        this.hexString = value;
      } else if (/^rgba?/.test(value)) {
        this.rgbString = value;
      } else if (/^hsla?/.test(value)) {
        this.hslString = value;
      }
    } else if (typeof value === 'object') {
      if (value instanceof IroColor) {
        this.hsva = value.hsva;
      } else if ('r' in value && 'g' in value && 'b' in value) {
        this.rgb = value;
      } else if ('h' in value && 's' in value && 'v' in value) {
        this.hsv = value;
      } else if ('h' in value && 's' in value && 'l' in value) {
        this.hsl = value;
      } else if ('kelvin' in value) {
        this.kelvin = value.kelvin;
      }
    } else {
      throw new Error('Invalid color value');
    }
  }
  /**
    * @desc Shortcut to set a specific channel value
    * @param format - hsv | hsl | rgb
    * @param channel - individual channel to set, for example if model = hsl, chanel = h | s | l
    * @param value - new value for the channel
  */
  ;

  _proto.setChannel = function setChannel(format, channel, value) {
    var _extends2;

    this[format] = _extends({}, this[format], (_extends2 = {}, _extends2[channel] = value, _extends2));
  }
  /**
   * @desc Reset color back to its initial value
   */
  ;

  _proto.reset = function reset() {
    this.hsva = this.initialValue;
  }
  /**
    * @desc make new Color instance with the same value as this one
  */
  ;

  _proto.clone = function clone() {
    return new IroColor(this);
  }
  /**
   * @desc remove color onChange
   */
  ;

  _proto.unbind = function unbind() {
    this.onChange = undefined;
  }
  /**
    * @desc Convert hsv object to rgb
    * @param hsv - hsv color object
  */
  ;

  IroColor.hsvToRgb = function hsvToRgb(hsv) {
    var h = hsv.h / 60;
    var s = hsv.s / 100;
    var v = hsv.v / 100;
    var i = floor(h);
    var f = h - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    var mod = i % 6;
    var r = [v, q, p, p, t, v][mod];
    var g = [t, v, v, q, p, p][mod];
    var b = [p, p, t, v, v, q][mod];
    return {
      r: clamp(r * 255, 0, 255),
      g: clamp(g * 255, 0, 255),
      b: clamp(b * 255, 0, 255)
    };
  }
  /**
    * @desc Convert rgb object to hsv
    * @param rgb - rgb object
  */
  ;

  IroColor.rgbToHsv = function rgbToHsv(rgb) {
    var r = rgb.r / 255;
    var g = rgb.g / 255;
    var b = rgb.b / 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var delta = max - min;
    var hue = 0;
    var value = max;
    var saturation = max === 0 ? 0 : delta / max;

    switch (max) {
      case min:
        hue = 0; // achromatic

        break;

      case r:
        hue = (g - b) / delta + (g < b ? 6 : 0);
        break;

      case g:
        hue = (b - r) / delta + 2;
        break;

      case b:
        hue = (r - g) / delta + 4;
        break;
    }

    return {
      h: hue * 60 % 360,
      s: clamp(saturation * 100, 0, 100),
      v: clamp(value * 100, 0, 100)
    };
  }
  /**
    * @desc Convert hsv object to hsl
    * @param hsv - hsv object
  */
  ;

  IroColor.hsvToHsl = function hsvToHsl(hsv) {
    var s = hsv.s / 100;
    var v = hsv.v / 100;
    var l = (2 - s) * v;
    var divisor = l <= 1 ? l : 2 - l; // Avoid division by zero when lightness is close to zero

    var saturation = divisor < 1e-9 ? 0 : s * v / divisor;
    return {
      h: hsv.h,
      s: clamp(saturation * 100, 0, 100),
      l: clamp(l * 50, 0, 100)
    };
  }
  /**
    * @desc Convert hsl object to hsv
    * @param hsl - hsl object
  */
  ;

  IroColor.hslToHsv = function hslToHsv(hsl) {
    var l = hsl.l * 2;
    var s = hsl.s * (l <= 100 ? l : 200 - l) / 100; // Avoid division by zero when l + s is near 0

    var saturation = l + s < 1e-9 ? 0 : 2 * s / (l + s);
    return {
      h: hsl.h,
      s: clamp(saturation * 100, 0, 100),
      v: clamp((l + s) / 2, 0, 100)
    };
  }
  /**
    * @desc Convert a kelvin temperature to an approx, RGB value
    * @param kelvin - kelvin temperature
  */
  ;

  IroColor.kelvinToRgb = function kelvinToRgb(kelvin) {
    var temp = kelvin / 100;
    var r, g, b;

    if (temp < 66) {
      r = 255;
      g = -155.25485562709179 - 0.44596950469579133 * (g = temp - 2) + 104.49216199393888 * log(g);
      b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp - 10) + 115.67994401066147 * log(b);
    } else {
      r = 351.97690566805693 + 0.114206453784165 * (r = temp - 55) - 40.25366309332127 * log(r);
      g = 325.4494125711974 + 0.07943456536662342 * (g = temp - 50) - 28.0852963507957 * log(g);
      b = 255;
    }

    return {
      r: clamp(floor(r), 0, 255),
      g: clamp(floor(g), 0, 255),
      b: clamp(floor(b), 0, 255)
    };
  }
  /**
   * @desc Convert an RGB color to an approximate kelvin temperature
   * @param kelvin - kelvin temperature
  */
  ;

  IroColor.rgbToKelvin = function rgbToKelvin(rgb) {
    var r = rgb.r,
        b = rgb.b;
    var eps = 0.4;
    var minTemp = KELVIN_MIN;
    var maxTemp = KELVIN_MAX;
    var temp;

    while (maxTemp - minTemp > eps) {
      temp = (maxTemp + minTemp) * 0.5;

      var _rgb = IroColor.kelvinToRgb(temp);

      if (_rgb.b / _rgb.r >= b / r) {
        maxTemp = temp;
      } else {
        minTemp = temp;
      }
    }

    return temp;
  };

  _createClass(IroColor, [{
    key: "hsv",
    get: function get() {
      // value is cloned to allow changes to be made to the values before passing them back
      var value = this.$;
      return {
        h: value.h,
        s: value.s,
        v: value.v
      };
    },
    set: function set(newValue) {
      var oldValue = this.$;
      newValue = _extends({}, oldValue, newValue); // If this Color is being watched for changes we need to compare the new and old values to check the difference
      // Otherwise we can just be lazy

      if (this.onChange) {
        // Compute changed values
        var changes = {
          h: false,
          v: false,
          s: false,
          a: false
        };

        for (var key in oldValue) {
          changes[key] = newValue[key] != oldValue[key];
        }

        this.$ = newValue; // If the value has changed, call hook callback

        if (changes.h || changes.s || changes.v || changes.a) { this.onChange(this, changes); }
      } else {
        this.$ = newValue;
      }
    }
  }, {
    key: "hsva",
    get: function get() {
      return _extends({}, this.$);
    },
    set: function set(value) {
      this.hsv = value;
    }
  }, {
    key: "hue",
    get: function get() {
      return this.$.h;
    },
    set: function set(value) {
      this.hsv = {
        h: value
      };
    }
  }, {
    key: "saturation",
    get: function get() {
      return this.$.s;
    },
    set: function set(value) {
      this.hsv = {
        s: value
      };
    }
  }, {
    key: "value",
    get: function get() {
      return this.$.v;
    },
    set: function set(value) {
      this.hsv = {
        v: value
      };
    }
  }, {
    key: "alpha",
    get: function get() {
      return this.$.a;
    },
    set: function set(value) {
      this.hsv = _extends({}, this.hsv, {
        a: value
      });
    }
  }, {
    key: "kelvin",
    get: function get() {
      return IroColor.rgbToKelvin(this.rgb);
    },
    set: function set(value) {
      this.rgb = IroColor.kelvinToRgb(value);
    }
  }, {
    key: "red",
    get: function get() {
      var rgb = this.rgb;
      return rgb.r;
    },
    set: function set(value) {
      this.rgb = _extends({}, this.rgb, {
        r: value
      });
    }
  }, {
    key: "green",
    get: function get() {
      var rgb = this.rgb;
      return rgb.g;
    },
    set: function set(value) {
      this.rgb = _extends({}, this.rgb, {
        g: value
      });
    }
  }, {
    key: "blue",
    get: function get() {
      var rgb = this.rgb;
      return rgb.b;
    },
    set: function set(value) {
      this.rgb = _extends({}, this.rgb, {
        b: value
      });
    }
  }, {
    key: "rgb",
    get: function get() {
      var _IroColor$hsvToRgb = IroColor.hsvToRgb(this.$),
          r = _IroColor$hsvToRgb.r,
          g = _IroColor$hsvToRgb.g,
          b = _IroColor$hsvToRgb.b;

      return {
        r: round(r),
        g: round(g),
        b: round(b)
      };
    },
    set: function set(value) {
      this.hsv = _extends({}, IroColor.rgbToHsv(value), {
        a: value.a === undefined ? 1 : value.a
      });
    }
  }, {
    key: "rgba",
    get: function get() {
      return _extends({}, this.rgb, {
        a: this.alpha
      });
    },
    set: function set(value) {
      this.rgb = value;
    }
  }, {
    key: "hsl",
    get: function get() {
      var _IroColor$hsvToHsl = IroColor.hsvToHsl(this.$),
          h = _IroColor$hsvToHsl.h,
          s = _IroColor$hsvToHsl.s,
          l = _IroColor$hsvToHsl.l;

      return {
        h: round(h),
        s: round(s),
        l: round(l)
      };
    },
    set: function set(value) {
      this.hsv = _extends({}, IroColor.hslToHsv(value), {
        a: value.a === undefined ? 1 : value.a
      });
    }
  }, {
    key: "hsla",
    get: function get() {
      return _extends({}, this.hsl, {
        a: this.alpha
      });
    },
    set: function set(value) {
      this.hsl = value;
    }
  }, {
    key: "rgbString",
    get: function get() {
      var rgb = this.rgb;
      return "rgb(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
    },
    set: function set(value) {
      var match;
      var r,
          g,
          b,
          a = 1;

      if (match = REGEX_FUNCTIONAL_RGB.exec(value)) {
        r = parseUnit(match[1], 255);
        g = parseUnit(match[2], 255);
        b = parseUnit(match[3], 255);
      } else if (match = REGEX_FUNCTIONAL_RGBA.exec(value)) {
        r = parseUnit(match[1], 255);
        g = parseUnit(match[2], 255);
        b = parseUnit(match[3], 255);
        a = parseUnit(match[4], 1);
      }

      if (match) {
        this.rgb = {
          r: r,
          g: g,
          b: b,
          a: a
        };
      } else {
        throw new Error('Invalid rgb string');
      }
    }
  }, {
    key: "rgbaString",
    get: function get() {
      var rgba = this.rgba;
      return "rgba(" + rgba.r + ", " + rgba.g + ", " + rgba.b + ", " + rgba.a + ")";
    },
    set: function set(value) {
      this.rgbString = value;
    }
  }, {
    key: "hexString",
    get: function get() {
      var rgb = this.rgb;
      return "#" + intToHex(rgb.r) + intToHex(rgb.g) + intToHex(rgb.b);
    },
    set: function set(value) {
      var match;
      var r,
          g,
          b,
          a = 255;

      if (match = REGEX_HEX_3.exec(value)) {
        r = parseHexInt(match[1]) * 17;
        g = parseHexInt(match[2]) * 17;
        b = parseHexInt(match[3]) * 17;
      } else if (match = REGEX_HEX_4.exec(value)) {
        r = parseHexInt(match[1]) * 17;
        g = parseHexInt(match[2]) * 17;
        b = parseHexInt(match[3]) * 17;
        a = parseHexInt(match[4]) * 17;
      } else if (match = REGEX_HEX_6.exec(value)) {
        r = parseHexInt(match[1]);
        g = parseHexInt(match[2]);
        b = parseHexInt(match[3]);
      } else if (match = REGEX_HEX_8.exec(value)) {
        r = parseHexInt(match[1]);
        g = parseHexInt(match[2]);
        b = parseHexInt(match[3]);
        a = parseHexInt(match[4]);
      }

      if (match) {
        this.rgb = {
          r: r,
          g: g,
          b: b,
          a: a / 255
        };
      } else {
        throw new Error('Invalid hex string');
      }
    }
  }, {
    key: "hex8String",
    get: function get() {
      var rgba = this.rgba;
      return "#" + intToHex(rgba.r) + intToHex(rgba.g) + intToHex(rgba.b) + intToHex(floor(rgba.a * 255));
    },
    set: function set(value) {
      this.hexString = value;
    }
  }, {
    key: "hslString",
    get: function get() {
      var hsl = this.hsl;
      return "hsl(" + hsl.h + ", " + hsl.s + "%, " + hsl.l + "%)";
    },
    set: function set(value) {
      var match;
      var h,
          s,
          l,
          a = 1;

      if (match = REGEX_FUNCTIONAL_HSL.exec(value)) {
        h = parseUnit(match[1], 360);
        s = parseUnit(match[2], 100);
        l = parseUnit(match[3], 100);
      } else if (match = REGEX_FUNCTIONAL_HSLA.exec(value)) {
        h = parseUnit(match[1], 360);
        s = parseUnit(match[2], 100);
        l = parseUnit(match[3], 100);
        a = parseUnit(match[4], 1);
      }

      if (match) {
        this.hsl = {
          h: h,
          s: s,
          l: l,
          a: a
        };
      } else {
        throw new Error('Invalid hsl string');
      }
    }
  }, {
    key: "hslaString",
    get: function get() {
      var hsla = this.hsla;
      return "hsla(" + hsla.h + ", " + hsla.s + "%, " + hsla.l + "%, " + hsla.a + ")";
    },
    set: function set(value) {
      this.hslString = value;
    }
  }]);

  return IroColor;
}();

var sliderDefaultOptions = {
  sliderShape: 'bar',
  sliderType: 'value',
  minTemperature: 2200,
  maxTemperature: 11000
};
/**
 * @desc Get the bounding dimensions of the slider
 * @param props - slider props
 */

function getSliderDimensions(props) {
  var _sliderSize;

  var width = props.width,
      sliderSize = props.sliderSize,
      borderWidth = props.borderWidth,
      handleRadius = props.handleRadius,
      padding = props.padding,
      sliderShape = props.sliderShape;
  var ishorizontal = props.layoutDirection === 'horizontal'; // automatically calculate sliderSize if its not defined

  sliderSize = (_sliderSize = sliderSize) != null ? _sliderSize : padding * 2 + handleRadius * 2;

  if (sliderShape === 'circle') {
    return {
      handleStart: props.padding + props.handleRadius,
      handleRange: width - padding * 2 - handleRadius * 2,
      width: width,
      height: width,
      cx: width / 2,
      cy: width / 2,
      radius: width / 2 - borderWidth / 2
    };
  } else {
    return {
      handleStart: sliderSize / 2,
      handleRange: width - sliderSize,
      radius: sliderSize / 2,
      x: 0,
      y: 0,
      width: ishorizontal ? sliderSize : width,
      height: ishorizontal ? width : sliderSize
    };
  }
}
/**
 * @desc Get the current slider value for a given color, as a percentage
 * @param props - slider props
 * @param color
 */

function getCurrentSliderValue(props, color) {
  var hsva = color.hsva;
  var rgb = color.rgb;

  switch (props.sliderType) {
    case 'red':
      return rgb.r / 2.55;

    case 'green':
      return rgb.g / 2.55;

    case 'blue':
      return rgb.b / 2.55;

    case 'alpha':
      return hsva.a * 100;

    case 'kelvin':
      var minTemperature = props.minTemperature,
          maxTemperature = props.maxTemperature;
      var temperatureRange = maxTemperature - minTemperature;
      var percent = (color.kelvin - minTemperature) / temperatureRange * 100; // clmap percentage

      return Math.max(0, Math.min(percent, 100));

    case 'hue':
      return hsva.h /= 3.6;

    case 'saturation':
      return hsva.s;

    case 'value':
    default:
      return hsva.v;
  }
}
/**
 * @desc Get the current slider value from user input
 * @param props - slider props
 * @param x - global input x position
 * @param y - global input y position
 */

function getSliderValueFromInput(props, x, y) {
  var _getSliderDimensions = getSliderDimensions(props),
      handleRange = _getSliderDimensions.handleRange,
      handleStart = _getSliderDimensions.handleStart;

  var handlePos;

  if (props.layoutDirection === 'horizontal') {
    handlePos = -1 * y + handleRange + handleStart;
  } else {
    handlePos = x - handleStart;
  } // clamp handle position


  handlePos = Math.max(Math.min(handlePos, handleRange), 0);
  var percent = Math.round(100 / handleRange * handlePos);

  switch (props.sliderType) {
    case 'kelvin':
      var minTemperature = props.minTemperature,
          maxTemperature = props.maxTemperature;
      var temperatureRange = maxTemperature - minTemperature;
      return minTemperature + temperatureRange * (percent / 100);

    case 'alpha':
      return percent / 100;

    case 'hue':
      return percent * 3.6;

    case 'red':
    case 'blue':
    case 'green':
      return percent * 2.55;

    default:
      return percent;
  }
}
/**
 * @desc Get the current handle position for a given color
 * @param props - slider props
 * @param color
 */

function getSliderHandlePosition(props, color) {
  var _getSliderDimensions2 = getSliderDimensions(props),
      width = _getSliderDimensions2.width,
      height = _getSliderDimensions2.height,
      handleRange = _getSliderDimensions2.handleRange,
      handleStart = _getSliderDimensions2.handleStart;

  var ishorizontal = props.layoutDirection === 'horizontal';
  var sliderValue = getCurrentSliderValue(props, color);
  var midPoint = ishorizontal ? width / 2 : height / 2;
  var handlePos = handleStart + sliderValue / 100 * handleRange;

  if (ishorizontal) {
    handlePos = -1 * handlePos + handleRange + handleStart * 2;
  }

  return {
    x: ishorizontal ? midPoint : handlePos,
    y: ishorizontal ? handlePos : midPoint
  };
}
/**
 * @desc Get the gradient stops for a slider
 * @param props - slider props
 * @param color
 */

function getSliderGradient(props, color) {
  var hsv = color.hsv;
  var rgb = color.rgb;

  switch (props.sliderType) {
    case 'red':
      return [[0, "rgb(" + 0 + "," + rgb.g + "," + rgb.b + ")"], [100, "rgb(" + 255 + "," + rgb.g + "," + rgb.b + ")"]];

    case 'green':
      return [[0, "rgb(" + rgb.r + "," + 0 + "," + rgb.b + ")"], [100, "rgb(" + rgb.r + "," + 255 + "," + rgb.b + ")"]];

    case 'blue':
      return [[0, "rgb(" + rgb.r + "," + rgb.g + "," + 0 + ")"], [100, "rgb(" + rgb.r + "," + rgb.g + "," + 255 + ")"]];

    case 'alpha':
      return [[0, "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ",0)"], [100, "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")"]];

    case 'kelvin':
      var stops = [];
      var min = props.minTemperature;
      var max = props.maxTemperature;
      var numStops = 8;
      var range = max - min;

      for (var kelvin = min, stop = 0; kelvin < max; kelvin += range / numStops, stop += 1) {
        var _IroColor$kelvinToRgb = IroColor.kelvinToRgb(kelvin),
            r = _IroColor$kelvinToRgb.r,
            g = _IroColor$kelvinToRgb.g,
            b = _IroColor$kelvinToRgb.b;

        stops.push([100 / numStops * stop, "rgb(" + r + "," + g + "," + b + ")"]);
      }

      return stops;

    case 'hue':
      return [[0, '#f00'], [16.666, '#ff0'], [33.333, '#0f0'], [50, '#0ff'], [66.666, '#00f'], [83.333, '#f0f'], [100, '#f00']];

    case 'saturation':
      var noSat = IroColor.hsvToHsl({
        h: hsv.h,
        s: 0,
        v: hsv.v
      });
      var fullSat = IroColor.hsvToHsl({
        h: hsv.h,
        s: 100,
        v: hsv.v
      });
      return [[0, "hsl(" + noSat.h + "," + noSat.s + "%," + noSat.l + "%)"], [100, "hsl(" + fullSat.h + "," + fullSat.s + "%," + fullSat.l + "%)"]];

    case 'value':
    default:
      var hsl = IroColor.hsvToHsl({
        h: hsv.h,
        s: hsv.s,
        v: 100
      });
      return [[0, '#000'], [100, "hsl(" + hsl.h + "," + hsl.s + "%," + hsl.l + "%)"]];
  }
}

var TAU = Math.PI * 2; // javascript's modulo operator doesn't produce positive numbers with negative input
// https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e

var mod = function mod(a, n) {
  return (a % n + n) % n;
}; // distance between points (x, y) and (0, 0)


var dist = function dist(x, y) {
  return Math.sqrt(x * x + y * y);
};
/**
 * @param props - wheel props
 * @internal
 */


function getHandleRange(props) {
  return props.width / 2 - props.padding - props.handleRadius - props.borderWidth;
}
/**
 * Returns true if point (x, y) lands inside the wheel
 * @param props - wheel props
 * @param x
 * @param y
 */


function isInputInsideWheel(props, x, y) {
  var _getWheelDimensions = getWheelDimensions(props),
      cx = _getWheelDimensions.cx,
      cy = _getWheelDimensions.cy;

  var r = props.width / 2;
  return dist(cx - x, cy - y) < r;
}
/**
 * @desc Get the point as the center of the wheel
 * @param props - wheel props
 */

function getWheelDimensions(props) {
  var r = props.width / 2;
  return {
    width: props.width,
    radius: r - props.borderWidth,
    cx: r,
    cy: r
  };
}
/**
 * @desc Translate an angle according to wheelAngle and wheelDirection
 * @param props - wheel props
 * @param angle - input angle
 */

function translateWheelAngle(props, angle, invert) {
  var wheelAngle = props.wheelAngle;
  var wheelDirection = props.wheelDirection; // inverted and clockwisee

  if (invert && wheelDirection === 'clockwise') { angle = wheelAngle + angle; } // clockwise (input handling)
  else if (wheelDirection === 'clockwise') { angle = 360 - wheelAngle + angle; } // inverted and anticlockwise
    else if (invert && wheelDirection === 'anticlockwise') { angle = wheelAngle + 180 - angle; } // anticlockwise (input handling)
      else if (wheelDirection === 'anticlockwise') { angle = wheelAngle - angle; }
  return mod(angle, 360);
}
/**
 * @desc Get the current handle position for a given color
 * @param props - wheel props
 * @param color
 */

function getWheelHandlePosition(props, color) {
  var hsv = color.hsv;

  var _getWheelDimensions2 = getWheelDimensions(props),
      cx = _getWheelDimensions2.cx,
      cy = _getWheelDimensions2.cy;

  var handleRange = getHandleRange(props);
  var handleAngle = (180 + translateWheelAngle(props, hsv.h, true)) * (TAU / 360);
  var handleDist = hsv.s / 100 * handleRange;
  var direction = props.wheelDirection === 'clockwise' ? -1 : 1;
  return {
    x: cx + handleDist * Math.cos(handleAngle) * direction,
    y: cy + handleDist * Math.sin(handleAngle) * direction
  };
}
/**
 * @desc Get the current wheel value from user input
 * @param props - wheel props
 * @param x - global input x position
 * @param y - global input y position
 */

function getWheelValueFromInput(props, x, y) {
  var _getWheelDimensions3 = getWheelDimensions(props),
      cx = _getWheelDimensions3.cx,
      cy = _getWheelDimensions3.cy;

  var handleRange = getHandleRange(props);
  x = cx - x;
  y = cy - y; // Calculate the hue by converting the angle to radians

  var hue = translateWheelAngle(props, Math.atan2(-y, -x) * (360 / TAU)); // Find the point's distance from the center of the wheel
  // This is used to show the saturation level

  var handleDist = Math.min(dist(x, y), handleRange);
  return {
    h: Math.round(hue),
    s: Math.round(100 / handleRange * handleDist)
  };
}
/**
 * @desc Get the bounding dimensions of the box
 * @param props - box props
 */

function getBoxDimensions(props) {
  var width = props.width,
      boxHeight = props.boxHeight,
      padding = props.padding,
      handleRadius = props.handleRadius;
  return {
    width: width,
    height: boxHeight != null ? boxHeight : width,
    radius: padding + handleRadius
  };
}
/**
 * @desc Get the current box value from user input
 * @param props - box props
 * @param x - global input x position
 * @param y - global input y position
 */

function getBoxValueFromInput(props, x, y) {
  var _getBoxDimensions = getBoxDimensions(props),
      width = _getBoxDimensions.width,
      height = _getBoxDimensions.height,
      radius = _getBoxDimensions.radius;

  var handleStart = radius;
  var handleRangeX = width - radius * 2;
  var handleRangeY = height - radius * 2;
  var percentX = (x - handleStart) / handleRangeX * 100;
  var percentY = (y - handleStart) / handleRangeY * 100;
  return {
    s: Math.max(0, Math.min(percentX, 100)),
    v: Math.max(0, Math.min(100 - percentY, 100))
  };
}
/**
 * @desc Get the current box handle position for a given color
 * @param props - box props
 * @param color
 */

function getBoxHandlePosition(props, color) {
  var _getBoxDimensions2 = getBoxDimensions(props),
      width = _getBoxDimensions2.width,
      height = _getBoxDimensions2.height,
      radius = _getBoxDimensions2.radius;

  var hsv = color.hsv;
  var handleStart = radius;
  var handleRangeX = width - radius * 2;
  var handleRangeY = height - radius * 2;
  return {
    x: handleStart + hsv.s / 100 * handleRangeX,
    y: handleStart + (handleRangeY - hsv.v / 100 * handleRangeY)
  };
}
/**
 * @desc Get the gradient stops for a box
 * @param props - box props
 * @param color
 */

function getBoxGradients(props, color) {
  var hue = color.hue;
  return [// saturation gradient
  [[0, '#fff'], [100, "hsl(" + hue + ",100%,50%)"]], // lightness gradient
  [[0, 'rgba(0,0,0,0)'], [100, '#000']]];
}

// Keep track of html <base> elements for resolveSvgUrl
// getElementsByTagName returns a live HTMLCollection, which stays in sync with the DOM tree
// So it only needs to be called once
var BASE_ELEMENTS;
/**
 * @desc Resolve an SVG reference URL
 * This is required to work around how Safari and iOS webviews handle gradient URLS under certain conditions
 * If a page is using a client-side routing library which makes use of the HTML <base> tag,
 * Safari won't be able to render SVG gradients properly (as they are referenced by URLs)
 * More info on the problem:
 * https://stackoverflow.com/questions/19742805/angular-and-svg-filters/19753427#19753427
 * https://github.com/jaames/iro.js/issues/18
 * https://github.com/jaames/iro.js/issues/45
 * https://github.com/jaames/iro.js/pull/89
 * @props url - SVG reference URL
 */

function resolveSvgUrl(url) {
  if (!BASE_ELEMENTS) { BASE_ELEMENTS = document.getElementsByTagName('base'); } // Sniff useragent string to check if the user is running Safari

  var ua = window.navigator.userAgent;
  var isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  var isIos = /iPhone|iPod|iPad/i.test(ua);
  var location = window.location;
  return (isSafari || isIos) && BASE_ELEMENTS.length > 0 ? location.protocol + "//" + location.host + location.pathname + location.search + url : url;
}
/**
 * @desc Given a specifc (x, y) position, test if there's a handle there and return its index, else return null.
 *       This is used for components like the box and wheel which support multiple handles when multicolor is active
 * @props x - point x position
 * @props y - point y position
 * @props handlePositions - array of {x, y} coords for each handle
 */

function getHandleAtPoint(props, x, y, handlePositions) {
  for (var i = 0; i < handlePositions.length; i++) {
    var dX = handlePositions[i].x - x;
    var dY = handlePositions[i].y - y;
    var dist = Math.sqrt(dX * dX + dY * dY);

    if (dist < props.handleRadius) {
      return i;
    }
  }

  return null;
}

function cssBorderStyles(props) {
  return {
    boxSizing: 'border-box',
    border: props.borderWidth + "px solid " + props.borderColor
  };
}
function cssGradient(type, direction, stops) {
  return type + "-gradient(" + direction + ", " + stops.map(function (_ref) {
    var o = _ref[0],
        col = _ref[1];
    return col + " " + o + "%";
  }).join(',') + ")";
}
function cssValue(value) {
  if (typeof value === 'string') { return value; }
  return value + "px";
}

var iroColorPickerOptionDefaults = {
  width: 300,
  height: 300,
  color: '#fff',
  colors: [],
  padding: 6,
  layoutDirection: 'vertical',
  borderColor: '#fff',
  borderWidth: 0,
  handleRadius: 8,
  activeHandleRadius: null,
  handleSvg: null,
  handleProps: {
    x: 0,
    y: 0
  },
  wheelLightness: true,
  wheelAngle: 0,
  wheelDirection: 'anticlockwise',
  sliderSize: null,
  sliderMargin: 12,
  boxHeight: null
};

var SECONDARY_EVENTS = ["mousemove" /* MouseMove */, "touchmove" /* TouchMove */, "mouseup" /* MouseUp */, "touchend" /* TouchEnd */];
// Base component class for iro UI components
// This extends the Preact component class to allow them to react to mouse/touch input events by themselves
var IroComponentWrapper = /*@__PURE__*/(function (Component) {
    function IroComponentWrapper(props) {
        Component.call(this, props);
        // Generate unique ID for the component
        // This can be used to generate unique IDs for gradients, etc
        this.uid = (Math.random() + 1).toString(36).substring(5);
    }

    if ( Component ) IroComponentWrapper.__proto__ = Component;
    IroComponentWrapper.prototype = Object.create( Component && Component.prototype );
    IroComponentWrapper.prototype.constructor = IroComponentWrapper;
    IroComponentWrapper.prototype.render = function render (props) {
        var eventHandler = this.handleEvent.bind(this);
        var rootProps = {
            onMouseDown: eventHandler,
            // https://github.com/jaames/iro.js/issues/126
            // https://github.com/preactjs/preact/issues/2113#issuecomment-553408767
            ontouchstart: eventHandler,
        };
        var isHorizontal = props.layoutDirection === 'horizontal';
        var margin = props.margin === null ? props.sliderMargin : props.margin;
        var rootStyles = {
            overflow: 'visible',
            display: isHorizontal ? 'inline-block' : 'block'
        };
        // first component shouldn't have any margin
        if (props.index > 0) {
            rootStyles[isHorizontal ? 'marginLeft' : 'marginTop'] = margin;
        }
        return (h(d, null, props.children(this.uid, rootProps, rootStyles)));
    };
    // More info on handleEvent:
    // https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
    // TL;DR this lets us have a single point of entry for multiple events, and we can avoid callback/binding hell
    IroComponentWrapper.prototype.handleEvent = function handleEvent (e) {
        var this$1 = this;

        var inputHandler = this.props.onInput;
        // Get the screen position of the component
        var bounds = this.base.getBoundingClientRect();
        // Prefect default browser action
        e.preventDefault();
        // Detect if the event is a touch event by checking if it has the `touches` property
        // If it is a touch event, use the first touch input
        var point = e.touches ? e.changedTouches[0] : e;
        var x = point.clientX - bounds.left;
        var y = point.clientY - bounds.top;
        switch (e.type) {
            case "mousedown" /* MouseDown */:
            case "touchstart" /* TouchStart */:
                var result = inputHandler(x, y, 0 /* Start */);
                if (result !== false) {
                    SECONDARY_EVENTS.forEach(function (event) {
                        document.addEventListener(event, this$1, { passive: false });
                    });
                }
                break;
            case "mousemove" /* MouseMove */:
            case "touchmove" /* TouchMove */:
                inputHandler(x, y, 1 /* Move */);
                break;
            case "mouseup" /* MouseUp */:
            case "touchend" /* TouchEnd */:
                inputHandler(x, y, 2 /* End */);
                SECONDARY_EVENTS.forEach(function (event) {
                    document.removeEventListener(event, this$1, { passive: false });
                });
                break;
        }
    };

    return IroComponentWrapper;
}(m));

function IroHandle(props) {
    var radius = props.r;
    var url = props.url;
    var cx = radius;
    var cy = radius;
    return (h("svg", { className: ("IroHandle IroHandle--" + (props.index) + " " + (props.isActive ? 'IroHandle--isActive' : '')), style: {
            '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0);',
            transform: ("translate(" + (cssValue(props.x)) + ", " + (cssValue(props.y)) + ")"),
            willChange: 'transform',
            top: cssValue(-radius),
            left: cssValue(-radius),
            width: cssValue(radius * 2),
            height: cssValue(radius * 2),
            position: 'absolute',
            overflow: 'visible'
        } },
        url && (h("use", Object.assign({ xlinkHref: resolveSvgUrl(url) }, props.props))),
        !url && (h("circle", { cx: cx, cy: cy, r: radius, fill: "none", "stroke-width": 2, stroke: "#000" })),
        !url && (h("circle", { cx: cx, cy: cy, r: radius - 2, fill: props.fill, "stroke-width": 2, stroke: "#fff" }))));
}
IroHandle.defaultProps = {
    fill: 'none',
    x: 0,
    y: 0,
    r: 8,
    url: null,
    props: { x: 0, y: 0 }
};

function IroSlider(props) {
    var activeIndex = props.activeIndex;
    var activeColor = (activeIndex !== undefined && activeIndex < props.colors.length) ? props.colors[activeIndex] : props.color;
    var ref = getSliderDimensions(props);
    var width = ref.width;
    var height = ref.height;
    var radius = ref.radius;
    var handlePos = getSliderHandlePosition(props, activeColor);
    var gradient = getSliderGradient(props, activeColor);
    function handleInput(x, y, type) {
        var value = getSliderValueFromInput(props, x, y);
        props.parent.inputActive = true;
        activeColor[props.sliderType] = value;
        props.onInput(type, props.id);
    }
    return (h(IroComponentWrapper, Object.assign({}, props, { onInput: handleInput }), function (uid, rootProps, rootStyles) { return (h("div", Object.assign({}, rootProps, { className: "IroSlider", style: Object.assign({}, {position: 'relative',
            width: cssValue(width),
            height: cssValue(height),
            borderRadius: cssValue(radius),
            // checkered bg to represent alpha
            background: "conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)",
            backgroundSize: '8px 8px'},
            rootStyles) }),
        h("div", { className: "IroSliderGradient", style: Object.assign({}, {position: 'absolute',
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: cssValue(radius),
                background: cssGradient('linear', props.layoutDirection === 'horizontal' ? 'to top' : 'to right', gradient)},
                cssBorderStyles(props)) }),
        h(IroHandle, { isActive: true, index: activeColor.index, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePos.x, y: handlePos.y }))); }));
}
IroSlider.defaultProps = Object.assign({}, sliderDefaultOptions);

function IroBox(props) {
    var ref = getBoxDimensions(props);
    var width = ref.width;
    var height = ref.height;
    var radius = ref.radius;
    var colors = props.colors;
    var colorPicker = props.parent;
    var activeIndex = props.activeIndex;
    var activeColor = (activeIndex !== undefined && activeIndex < props.colors.length) ? props.colors[activeIndex] : props.color;
    var gradients = getBoxGradients(props, activeColor);
    var handlePositions = colors.map(function (color) { return getBoxHandlePosition(props, color); });
    function handleInput(x, y, inputType) {
        if (inputType === 0 /* Start */) {
            // getHandleAtPoint() returns the index for the handle if the point 'hits' it, or null otherwise
            var activeHandle = getHandleAtPoint(props, x, y, handlePositions);
            // If the input hit a handle, set it as the active handle, but don't update the color
            if (activeHandle !== null) {
                colorPicker.setActiveColor(activeHandle);
            }
            // If the input didn't hit a handle, set the currently active handle to that position
            else {
                colorPicker.inputActive = true;
                activeColor.hsv = getBoxValueFromInput(props, x, y);
                props.onInput(inputType, props.id);
            }
        }
        // move is fired when the user has started dragging
        else if (inputType === 1 /* Move */) {
            colorPicker.inputActive = true;
            activeColor.hsv = getBoxValueFromInput(props, x, y);
        }
        // let the color picker fire input:start, input:move or input:end events
        props.onInput(inputType, props.id);
    }
    return (h(IroComponentWrapper, Object.assign({}, props, { onInput: handleInput }), function (uid, rootProps, rootStyles) { return (h("div", Object.assign({}, rootProps, { className: "IroBox", style: Object.assign({}, {width: cssValue(width),
            height: cssValue(height),
            position: 'relative'},
            rootStyles) }),
        h("div", { className: "IroBox", style: Object.assign({}, {width: '100%',
                height: '100%',
                borderRadius: cssValue(radius)},
                cssBorderStyles(props),
                {background: cssGradient('linear', 'to bottom', gradients[1])
                    + ',' +
                    cssGradient('linear', 'to right', gradients[0])}) }),
        colors.filter(function (color) { return color !== activeColor; }).map(function (color) { return (h(IroHandle, { isActive: false, index: color.index, fill: color.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[color.index].x, y: handlePositions[color.index].y })); }),
        h(IroHandle, { isActive: true, index: activeColor.index, fill: activeColor.hslString, r: props.activeHandleRadius || props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[activeColor.index].x, y: handlePositions[activeColor.index].y }))); }));
}

var HUE_GRADIENT_CLOCKWISE = 'conic-gradient(red, yellow, lime, aqua, blue, magenta, red)';
var HUE_GRADIENT_ANTICLOCKWISE = 'conic-gradient(red, magenta, blue, aqua, lime, yellow, red)';
function IroWheel(props) {
    var ref = getWheelDimensions(props);
    var width = ref.width;
    var colors = props.colors;
    var borderWidth = props.borderWidth;
    var colorPicker = props.parent;
    var activeColor = props.color;
    var hsv = activeColor.hsv;
    var handlePositions = colors.map(function (color) { return getWheelHandlePosition(props, color); });
    var circleStyles = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        boxSizing: 'border-box'
    };
    function handleInput(x, y, inputType) {
        if (inputType === 0 /* Start */) {
            // input hitbox is a square, 
            // so we want to ignore any initial clicks outside the circular shape of the wheel
            if (!isInputInsideWheel(props, x, y)) {
                // returning false will cease all event handling for this interaction
                return false;
            }
            // getHandleAtPoint() returns the index for the handle if the point 'hits' it, or null otherwise
            var activeHandle = getHandleAtPoint(props, x, y, handlePositions);
            // If the input hit a handle, set it as the active handle, but don't update the color
            if (activeHandle !== null) {
                colorPicker.setActiveColor(activeHandle);
            }
            // If the input didn't hit a handle, set the currently active handle to that position
            else {
                colorPicker.inputActive = true;
                activeColor.hsv = getWheelValueFromInput(props, x, y);
                props.onInput(inputType, props.id);
            }
        }
        // move is fired when the user has started dragging
        else if (inputType === 1 /* Move */) {
            colorPicker.inputActive = true;
            activeColor.hsv = getWheelValueFromInput(props, x, y);
        }
        // let the color picker fire input:start, input:move or input:end events
        props.onInput(inputType, props.id);
    }
    return (h(IroComponentWrapper, Object.assign({}, props, { onInput: handleInput }), function (uid, rootProps, rootStyles) { return (h("div", Object.assign({}, rootProps, { className: "IroWheel", style: Object.assign({}, {width: cssValue(width),
            height: cssValue(width),
            position: 'relative'},
            rootStyles) }),
        h("div", { className: "IroWheelHue", style: Object.assign({}, circleStyles,
                {transform: ("rotateZ(" + (props.wheelAngle + 90) + "deg)"),
                background: props.wheelDirection === 'clockwise' ? HUE_GRADIENT_CLOCKWISE : HUE_GRADIENT_ANTICLOCKWISE}) }),
        h("div", { className: "IroWheelSaturation", style: Object.assign({}, circleStyles,
                {background: 'radial-gradient(circle closest-side, #fff, transparent)'}) }),
        props.wheelLightness && (h("div", { className: "IroWheelLightness", style: Object.assign({}, circleStyles,
                {background: '#000',
                opacity: 1 - hsv.v / 100}) })),
        h("div", { className: "IroWheelBorder", style: Object.assign({}, circleStyles,
                cssBorderStyles(props)) }),
        colors.filter(function (color) { return color !== activeColor; }).map(function (color) { return (h(IroHandle, { isActive: false, index: color.index, fill: color.hslString, r: props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[color.index].x, y: handlePositions[color.index].y })); }),
        h(IroHandle, { isActive: true, index: activeColor.index, fill: activeColor.hslString, r: props.activeHandleRadius || props.handleRadius, url: props.handleSvg, props: props.handleProps, x: handlePositions[activeColor.index].x, y: handlePositions[activeColor.index].y }))); }));
}

function createWidget(WidgetComponent) {
    var widgetFactory = function (parent, props) {
        var widget; // will become an instance of the widget component class
        var widgetRoot = document.createElement('div');
        // Render widget into a temp DOM node
        I(h(WidgetComponent, Object.assign({}, {ref: function (ref) { return widget = ref; }},
            props)), widgetRoot);
        function mountWidget() {
            var container = parent instanceof Element ? parent : document.querySelector(parent);
            container.appendChild(widget.base);
            widget.onMount(container);
        }
        // Mount it into the DOM when the page document is ready
        if (document.readyState !== 'loading') {
            mountWidget();
        }
        else {
            document.addEventListener('DOMContentLoaded', mountWidget);
        }
        return widget;
    };
    // Allow the widget factory to inherit component prototype + static class methods
    // This makes it easier for plugin authors to extend the base widget component
    widgetFactory.prototype = WidgetComponent.prototype;
    Object.assign(widgetFactory, WidgetComponent);
    // Add reference to base component too
    widgetFactory.__component = WidgetComponent;
    return widgetFactory;
}

var IroColorPicker = /*@__PURE__*/(function (Component) {
    function IroColorPicker(props) {
        var this$1 = this;

        Component.call(this, props);
        this.colors = [];
        this.inputActive = false;
        this.events = {};
        this.activeEvents = {};
        this.deferredEvents = {};
        this.id = props.id;
        var colors = props.colors.length > 0 ? props.colors : [props.color];
        colors.forEach(function (colorValue) { return this$1.addColor(colorValue); });
        this.setActiveColor(0);
        // Pass all the props into the component's state,
        // Except we want to add the color object and make sure that refs aren't passed down to children
        this.state = Object.assign({}, props,
            {color: this.color,
            colors: this.colors,
            layout: props.layout});
    }

    if ( Component ) IroColorPicker.__proto__ = Component;
    IroColorPicker.prototype = Object.create( Component && Component.prototype );
    IroColorPicker.prototype.constructor = IroColorPicker;
    // Plubic multicolor API
    /**
    * @desc Add a color to the color picker
    * @param color new color to add
    * @param index optional color index
    */
    IroColorPicker.prototype.addColor = function addColor (color, index) {
        if ( index === void 0 ) index = this.colors.length;

        // Create a new iro.Color
        // Also bind it to onColorChange, so whenever the color changes it updates the color picker
        var newColor = new IroColor(color, this.onColorChange.bind(this));
        // Insert color @ the given index
        this.colors.splice(index, 0, newColor);
        // Reindex colors
        this.colors.forEach(function (color, index) { return color.index = index; });
        // Update picker state if necessary
        if (this.state) {
            this.setState({ colors: this.colors });
        }
        // Fire color init event
        this.deferredEmit('color:init', newColor);
    };
    /**
     * @desc Remove a color from the color picker
     * @param index color index
     */
    IroColorPicker.prototype.removeColor = function removeColor (index) {
        var color = this.colors.splice(index, 1)[0];
        // Destroy the color object -- this unbinds it from the color picker
        color.unbind();
        // Reindex colors
        this.colors.forEach(function (color, index) { return color.index = index; });
        // Update picker state if necessary
        if (this.state) {
            this.setState({ colors: this.colors });
        }
        // If the active color was removed, default active color to 0
        if (color.index === this.color.index) {
            this.setActiveColor(0);
        }
        // Fire color remove event
        this.emit('color:remove', color);
    };
    /**
     * @desc Set the currently active color
     * @param index color index
     */
    IroColorPicker.prototype.setActiveColor = function setActiveColor (index) {
        this.color = this.colors[index];
        if (this.state) {
            this.setState({ color: this.color });
        }
        // Fire color switch event
        this.emit('color:setActive', this.color);
    };
    /**
     * @desc Replace all of the current colorPicker colors
     * @param newColorValues list of new colors to add
     */
    IroColorPicker.prototype.setColors = function setColors (newColorValues, activeColorIndex) {
        var this$1 = this;
        if ( activeColorIndex === void 0 ) activeColorIndex = 0;

        // Unbind color events
        this.colors.forEach(function (color) { return color.unbind(); });
        // Destroy old colors
        this.colors = [];
        // Add new colors
        newColorValues.forEach(function (colorValue) { return this$1.addColor(colorValue); });
        // Reset active color
        this.setActiveColor(activeColorIndex);
        this.emit('color:setAll', this.colors);
    };
    // Public ColorPicker events API
    /**
     * @desc Set a callback function for an event
     * @param eventList event(s) to listen to
     * @param callback - Function called when the event is fired
     */
    IroColorPicker.prototype.on = function on (eventList, callback) {
        var this$1 = this;

        var events = this.events;
        // eventList can be an eventType string or an array of eventType strings
        (!Array.isArray(eventList) ? [eventList] : eventList).forEach(function (eventType) {
            // Add event callback
            (events[eventType] || (events[eventType] = [])).push(callback);
            // Call deferred events
            // These are events that can be stored until a listener for them is added
            if (this$1.deferredEvents[eventType]) {
                // Deffered events store an array of arguments from when the event was called
                this$1.deferredEvents[eventType].forEach(function (args) {
                    callback.apply(null, args);
                });
                // Clear deferred events
                this$1.deferredEvents[eventType] = [];
            }
        });
    };
    /**
     * @desc Remove a callback function for an event added with on()
     * @param eventList - event(s) to listen to
     * @param callback - original callback function to remove
     */
    IroColorPicker.prototype.off = function off (eventList, callback) {
        var this$1 = this;

        (!Array.isArray(eventList) ? [eventList] : eventList).forEach(function (eventType) {
            var callbackList = this$1.events[eventType];
            // this.emitHook('event:off', eventType, callback);
            if (callbackList)
                { callbackList.splice(callbackList.indexOf(callback), 1); }
        });
    };
    /**
     * @desc Emit an event
     * @param eventType event to emit
     */
    IroColorPicker.prototype.emit = function emit (eventType) {
        var this$1 = this;
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        var activeEvents = this.activeEvents;
        var isEventActive = activeEvents.hasOwnProperty(eventType) ? activeEvents[eventType] : false;
        // Prevent event callbacks from firing if the event is already active
        // This stops infinite loops if something in an event callback causes the same event to be fired again
        // (e.g. setting the color inside a color:change callback)
        if (!isEventActive) {
            activeEvents[eventType] = true;
            var callbackList = this.events[eventType] || [];
            callbackList.forEach(function (fn) { return fn.apply(this$1, args); });
            activeEvents[eventType] = false;
        }
    };
    /**
     * @desc Emit an event now, or save it for when the relevent event listener is added
     * @param eventType - The name of the event to emit
     */
    IroColorPicker.prototype.deferredEmit = function deferredEmit (eventType) {
        var ref;

        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
        var deferredEvents = this.deferredEvents;
        (ref = this).emit.apply(ref, [ eventType ].concat( args ));
        (deferredEvents[eventType] || (deferredEvents[eventType] = [])).push(args);
    };
    // Public utility methods
    IroColorPicker.prototype.setOptions = function setOptions (newOptions) {
        this.setState(newOptions);
    };
    /**
     * @desc Resize the color picker
     * @param width - new width
     */
    IroColorPicker.prototype.resize = function resize (width) {
        this.setOptions({ width: width });
    };
    /**
     * @desc Reset the color picker to the initial color provided in the color picker options
     */
    IroColorPicker.prototype.reset = function reset () {
        this.colors.forEach(function (color) { return color.reset(); });
        this.setState({ colors: this.colors });
    };
    /**
     * @desc Called by the createWidget wrapper when the element is mounted into the page
     * @param container - the container element for this ColorPicker instance
     */
    IroColorPicker.prototype.onMount = function onMount (container) {
        this.el = container;
        this.deferredEmit('mount', this);
    };
    // Internal methods
    /**
     * @desc React to a color update
     * @param color - current color
     * @param changes - shows which h,s,v,a color channels changed
     */
    IroColorPicker.prototype.onColorChange = function onColorChange (color, changes) {
        this.setState({ color: this.color });
        if (this.inputActive) {
            this.inputActive = false;
            this.emit('input:change', color, changes);
        }
        this.emit('color:change', color, changes);
    };
    /**
     * @desc Handle input from a UI control element
     * @param type - event type
     */
    IroColorPicker.prototype.emitInputEvent = function emitInputEvent (type, originId) {
        if (type === 0 /* Start */) {
            this.emit('input:start', this.color, originId);
        }
        else if (type === 1 /* Move */) {
            this.emit('input:move', this.color, originId);
        }
        else if (type === 2 /* End */) {
            this.emit('input:end', this.color, originId);
        }
    };
    IroColorPicker.prototype.render = function render (props, state) {
        var this$1 = this;

        var layout = state.layout;
        // use layout shorthands
        if (!Array.isArray(layout)) {
            switch (layout) {
                // TODO: implement some?
                default:
                    layout = [
                        { component: IroWheel },
                        { component: IroSlider } ];
            }
            // add transparency slider to the layout
            if (state.transparency) {
                layout.push({
                    component: IroSlider,
                    options: {
                        sliderType: 'alpha'
                    }
                });
            }
        }
        return (h("div", { class: "IroColorPicker", id: state.id, style: {
                display: state.display
            } }, layout.map(function (ref, componentIndex) {
                var UiComponent = ref.component;
                var options = ref.options;

                return (h(UiComponent, Object.assign({}, state, options, { ref: undefined, onInput: this$1.emitInputEvent.bind(this$1), parent: this$1, index: componentIndex })));
        })));
    };

    return IroColorPicker;
}(m));
IroColorPicker.defaultProps = Object.assign({}, iroColorPickerOptionDefaults,
    {colors: [],
    display: 'block',
    id: null,
    layout: 'default',
    margin: null});
var IroColorPickerWidget = createWidget(IroColorPicker);

var iro;
(function (iro) {
    iro.version = "5.5.2"; // replaced by @rollup/plugin-replace; see rollup.config.js
    iro.Color = IroColor;
    iro.ColorPicker = IroColorPickerWidget;
    var ui;
    (function (ui) {
        ui.h = h;
        ui.ComponentBase = IroComponentWrapper;
        ui.Handle = IroHandle;
        ui.Slider = IroSlider;
        ui.Wheel = IroWheel;
        ui.Box = IroBox;
    })(ui = iro.ui || (iro.ui = {}));
})(iro || (iro = {}));
var iro$1 = iro;

/* harmony default export */ __webpack_exports__["default"] = (iro$1);


/***/ }),
/* 75 */
/***/ (function(module) {

module.exports = html2canvas;

/***/ }),
/* 76 */
/***/ (function(module) {

module.exports = dompurify;

/***/ }),
/* 77 */
/***/ (function(module) {

module.exports = canvg;

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	!function() {
/******/ 		var getProto = Object.getPrototypeOf ? function(obj) { return Object.getPrototypeOf(obj); } : function(obj) { return obj.__proto__; };
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach(function(key) { def[key] = function() { return value[key]; }; });
/******/ 			}
/******/ 			def['default'] = function() { return value; };
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	}();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/* harmony import */ var _modules_sidebar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_toolBar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(58);
/* harmony import */ var _modules_canvasUpdate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(57);




(0,_modules_sidebar_js__WEBPACK_IMPORTED_MODULE_0__.SideBar)();
(0,_modules_toolBar_js__WEBPACK_IMPORTED_MODULE_1__.controlInit)();
(0,_modules_canvasUpdate_js__WEBPACK_IMPORTED_MODULE_2__.scaler)();
}();
/******/ })()
;
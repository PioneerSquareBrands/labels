import { selectInit } from './select.js';
import { validateNumbers } from './validate.js';
import { validateUPC } from './validate.js';
import { fieldInit } from './fieldHandler.js';
import { colorInit } from './colorHandler.js';
import { qrToggle, qrVisibility, sizeVisibility, skuBox, sidebarAccordion, outline } from './misc.js';


export const SideBar = () => {
  selectInit();
  validateNumbers();
  validateUPC();
  fieldInit();
  colorInit();
  qrToggle();
  qrVisibility();
  sizeVisibility();
  skuBox();
  outline();
  sidebarAccordion();
}
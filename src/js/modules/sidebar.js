import { selectInit } from './select.js';
import { validateNumbers } from './validate.js';
import { validateUPC } from './validate.js';
import { fieldInit } from './fieldHandler.js';
import { colorInit } from './colorHandler.js';
import { qrToggle, qrVisibility, skuBox, sidebarAccordion, outline } from './misc.js';


export const SideBar = () => {
  selectInit();
  validateNumbers();
  validateUPC();
  fieldInit();
  colorInit();
  qrToggle();
  qrVisibility();
  skuBox();
  outline();
  sidebarAccordion();
}
import { selectInit } from './select.js';
import { validateNumbers } from './validate.js';
import { fieldInit } from './fieldHandler.js';
import { colorInit } from './colorHandler.js';
import { qrToggle, sidebarAccordion, outline } from './misc.js';


export const SideBar = () => {
  selectInit();
  validateNumbers();
  fieldInit();
  colorInit();
  qrToggle();
  outline();
  sidebarAccordion();
}
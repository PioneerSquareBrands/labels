import { selectInit } from './modules/select.js';
import { validateNumbers } from './modules/validate.js';
import { labelInit } from './modules/labelHandler.js';
import { scaler } from './modules/scaler.js';
import { qrToggle, sidebarAccordion, outline } from './modules/misc.js';
import { colorInit } from './modules/colorHandler.js';
import { controlInit } from './modules/toolBar.js';

selectInit();
validateNumbers();
labelInit();
controlInit();
scaler();
outline();
colorInit();
qrToggle();
sidebarAccordion();
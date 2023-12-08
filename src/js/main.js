import { selectInit } from './modules/select.js';
import { validateNumbers } from './modules/validate.js';
import { labelInit } from './modules/labelHandler.js';
import { canvasUpdate, scaler } from './modules/canvasUpdate.js';
import { qrToggle, sidebarAccordion, outline } from './modules/misc.js';
import { colorInit } from './modules/colorHandler.js';
import { controlInit } from './modules/toolBar.js';

selectInit();
validateNumbers();
scaler();
labelInit();
controlInit();
outline();
colorInit();
qrToggle();
sidebarAccordion();
import { selectInit } from './modules/select.js';
import { validateNumbers } from './modules/validate.js';
import { labelInit } from './modules/labelHandler.js';
import { scaler } from './modules/canvasUpdate.js';
import { colorInit } from './modules/colorHandler.js';
import { controlInit } from './modules/toolBar.js';
import { qrToggle, sidebarAccordion, outline } from './modules/misc.js';

selectInit();
validateNumbers(); // Always before labelInit
labelInit();
colorInit();
controlInit();
scaler();
qrToggle();
outline();
sidebarAccordion();
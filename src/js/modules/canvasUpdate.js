import { default as el } from './domElements.js';

const SCALER = '.scaler';
const CANVAS_SCALED = 'canvas-scaled';
const CANVAS_FULL = 'canvas-full';

// Keep these in sync with $carton-length, $carton-width and $carton-height in _components.scss
const DEFAULT_LENGTH = 18.3;
const DEFAULT_WIDTH = 11.2;
const DEFAULT_HEIGHT = 13.4;

// Base font sizes in inches. Below MIN_FONT a face is drawn larger and scaled down to the carton.
const MIN_FONT = 0.4;
const MIN_CEILING_FONT = 0.6;
const MAX_FONT = 1.2;
const MAX_SCALE = 64;

// Front faces shorter than this put the UPC label and TIHI side by side
const STACK_MIN_HEIGHT = 7.5;

const readDims = () => ({
  length: parseFloat(el.dimLength.value) || DEFAULT_LENGTH,
  width: parseFloat(el.dimWidth.value) || DEFAULT_WIDTH,
  height: parseFloat(el.dimHeight.value) || DEFAULT_HEIGHT,
});

const fontCeiling = ({ length, width, height }, scale) => {
  const area = Math.min(length * width, height * height) * scale * scale;
  const fontSize = 1.4 * Math.sqrt(area / (DEFAULT_HEIGHT * DEFAULT_LENGTH));
  return Math.max(MIN_CEILING_FONT, Math.min(fontSize, MAX_FONT));
};

const getFaces = () => {
  const dims = readDims();

  return [
    { page: el.preview.querySelector('.page--carton-front'), width: dims.length, front: true },
    { page: el.preview.querySelector('.page--carton-side'), width: dims.width, front: false },
  ].map((face) => ({
    ...face,
    dims,
    height: dims.height,
    scaler: face.page.querySelector(SCALER),
    mark: face.page.querySelector('.shipping-mark'),
  }));
};

const FOOTER_STACKED = 'shipping-mark--footer-stacked';
const BADGES_STACKED = 'shipping-mark--badges-stacked';

// Width of the text inside a node, in screen pixels. Block children are skipped because they stretch to the flex row.
const textWidth = (node) => {
  const range = document.createRange();
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  let left = Infinity;
  let right = -Infinity;

  while (walker.nextNode()) {
    if (!walker.currentNode.textContent.trim()) continue;
    range.selectNodeContents(walker.currentNode);
    const rect = range.getBoundingClientRect();
    left = Math.min(left, rect.left);
    right = Math.max(right, rect.right);
  }

  return right > left ? right - left : 0;
};

// The side footer puts the item line and the badges in one row, the item line above the badges, or every part on its
// own line. The choice is made here instead of with flex-wrap because exports copy measured widths, which can tip a wrap.
const layoutFooter = (mark) => {
  mark.classList.remove(FOOTER_STACKED, BADGES_STACKED);

  const footer = mark.querySelector('.shipping-mark__footer');
  if (!footer) return;

  const screenRatio = footer.offsetWidth / footer.getBoundingClientRect().width;
  const itemWidth = textWidth(footer.querySelector('.shipping-mark__bottom')) * screenRatio;

  const badges = Array.from(footer.querySelectorAll('.shipping-mark__badges > :not([hidden])'));
  const badgeGap = parseFloat(getComputedStyle(footer.querySelector('.shipping-mark__badges')).columnGap) || 0;
  const badgesWidth = badges.reduce((sum, badge) => sum + badge.offsetWidth, 0) + badgeGap * Math.max(0, badges.length - 1);
  const footerGap = parseFloat(getComputedStyle(footer).columnGap) || 0;

  if (itemWidth + footerGap + badgesWidth > footer.clientWidth) mark.classList.add(FOOTER_STACKED);
  if (badgesWidth > footer.clientWidth) mark.classList.add(BADGES_STACKED);
};

const applyLayout = (face, scale, fontSize) => {
  const height = face.height * scale;

  face.scaler.style.width = `${face.width * scale}in`;
  face.scaler.style.height = `${height}in`;
  face.mark.style.setProperty('--f', `${fontSize}in`);
  face.mark.classList.toggle('shipping-mark--row', face.front && height < STACK_MIN_HEIGHT);
  if (!face.front) layoutFooter(face.mark);
};

const overflows = (node) => node.scrollHeight > node.clientHeight + 1 || node.scrollWidth > node.clientWidth + 1;

// Centered and end-aligned boxes overflow toward the top or left, which scrollHeight and scrollWidth miss.
// The rects are in screen pixels, so the 1px tolerance is converted through the preview's current scale.
export const escapes = (node, box, tolerance) => {
  const rect = node.getBoundingClientRect();
  return rect.top < box.top - tolerance || rect.left < box.left - tolerance
    || rect.bottom > box.bottom + tolerance || rect.right > box.right + tolerance;
};

const fits = (face) => {
  const parts = face.mark.querySelectorAll('.shipping-mark__content, .shipping-mark__aside, .shipping-mark__footer');
  const boxes = face.mark.querySelectorAll('.shipping-mark__upc, .shipping-mark__tihi, .shipping-mark__recycling, .shipping-mark__prop65');
  const markBox = face.mark.getBoundingClientRect();
  const tolerance = markBox.width / face.mark.offsetWidth;

  return !overflows(face.mark)
    && !Array.from(parts).some(overflows)
    && !Array.from(boxes).some((node) => escapes(node, markBox, tolerance));
};

const tryLayout = (face, scale, fontSize) => {
  applyLayout(face, scale, fontSize);
  return fits(face);
};

// Finds the smallest scale where the content fits at MIN_FONT, then the largest font that fits at that scale
const fitFace = (face) => {
  let scale = 1;

  if (!tryLayout(face, 1, MIN_FONT)) {
    let low = 1;
    let high = 2;

    while (high < MAX_SCALE && !tryLayout(face, high, MIN_FONT)) {
      low = high;
      high *= 2;
    }

    for (let i = 0; i < 8; i++) {
      const mid = (low + high) / 2;
      if (tryLayout(face, mid, MIN_FONT)) high = mid; else low = mid;
    }

    scale = high;
  }

  let low = MIN_FONT;
  let high = fontCeiling(face.dims, scale);

  if (!tryLayout(face, scale, high)) {
    for (let i = 0; i < 8; i++) {
      const mid = (low + high) / 2;
      if (tryLayout(face, scale, mid)) low = mid; else high = mid;
    }
    high = low;
  }

  return { scale, fontSize: high };
};

export const fitShippingMarks = () => {
  const faces = getFaces();
  if (faces.some((face) => !face.mark.clientHeight)) return;

  const results = faces.map(fitFace);

  // Unscaled faces share one font size so the front and side match
  if (results.every((result) => result.scale === 1)) {
    const fontSize = Math.min(...results.map((result) => result.fontSize));
    results.forEach((result) => result.fontSize = fontSize);
  }

  faces.forEach((face, i) => {
    applyLayout(face, results[i].scale, results[i].fontSize);
    face.page.dataset.scale = results[i].scale;
    rescale(face.page);
  });
};

export const canvasUpdate = () => {
  let previewContent = el.preview.querySelector('.preview__content');
  let cartonFront = el.preview.querySelector('.page--carton-front');
  let cartonSide = el.preview.querySelector('.page--carton-side');

  let condensed = 30;
  let expanded = 50;

  const { length, width, height } = readDims();

  const widthPercentage = previewContent.classList.contains('preview__content--condensed') ? condensed : expanded;
  let computedFrontWidth = widthPercentage * (length/height);
  let computedSideWidth = widthPercentage * (width/height);

  if (computedFrontWidth > 90 || computedSideWidth > 90) {
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

  fitShippingMarks();
}

const transitioning = new WeakSet();

const rescale = (page) => {
  const print = page.querySelector(SCALER);
  if (!print || transitioning.has(page)) return;

  const scale = page.clientWidth / print.offsetWidth;
  print.style.transform = `scale(${scale})`;

  page.classList.toggle(CANVAS_SCALED, scale < 1);
  page.classList.toggle(CANVAS_FULL, scale >= 1);
};

let fitQueued = false;

const queueFit = () => {
  if (fitQueued) return;
  fitQueued = true;
  queueMicrotask(() => {
    fitQueued = false;
    fitShippingMarks();
  });
};

export const scaler = () => {
  const resizeObserver = new ResizeObserver(entries => entries.forEach(entry => rescale(entry.target)));

  document.querySelectorAll('.page').forEach(page => {
    const print = page.querySelector(SCALER);
    if (!print) return;

    print.addEventListener('transitionstart', () => transitioning.add(page));
    print.addEventListener('transitionend', () => {
      transitioning.delete(page);
      rescale(page);
    });

    resizeObserver.observe(page);
  });

  // Refit when the printed text, logo or fonts change. Changes made by the fit itself land on .shipping-mark and are skipped.
  const marks = document.querySelectorAll('.page--carton .shipping-mark');
  const mutationObserver = new MutationObserver(mutations => {
    if (mutations.some(mutation => !mutation.target.classList?.contains('shipping-mark'))) queueFit();
  });

  marks.forEach(mark => {
    mutationObserver.observe(mark, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['src', 'style', 'class'] });
    mark.addEventListener('load', queueFit, true);
  });

  document.fonts?.ready.then(queueFit);
}

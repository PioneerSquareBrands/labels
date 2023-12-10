import { default as el } from './domElements.js';

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

export const canvasUpdate = () => {
  let previewContent = el.preview.querySelector('.preview__content');
  let cartonFront = el.preview.querySelector('.page--carton-front');
  let cartonSide = el.preview.querySelector('.page--carton-side');

  let condensed = 30;
  let expanded = 50;

  const defaultFontSize = 1.4; // in inches
  const defaultArea = 13.4 * 18.3; // Default area in square inches
  
  let length = el.dimLength.value || 18.3;
  let width = el.dimWidth.value || 11.2;
  let height = el.dimHeight.value || 13.4;

  const minFontSize = 0.8; // Minimum font size in inches
  const maxFontSize = 1.2; // Maximum font size in inches
  const area = Math.min(length * width, height * height);
  let fontSize = defaultFontSize * Math.sqrt(area / defaultArea);
  fontSize = Math.max(minFontSize, Math.min(fontSize, maxFontSize));

  const widthPercentage = previewContent.classList.contains('preview__content--condensed') ? condensed : expanded;
  let computedFrontWidth = widthPercentage * (length/height);
  let computedSideWidth = widthPercentage * (width/height);

  if (computedFrontWidth > 90 || computedSideWidth > 90) {
    console.log(computedFrontWidth, computedSideWidth);

    if (computedFrontWidth > computedSideWidth) {
      cartonFront.style.width = `90%`;
      cartonSide.style.width = `${(width/length) * 90}%`;
      cartonFront.style.paddingBottom = `${(90*50)/computedFrontWidth}%`;
      cartonSide.style.paddingBottom = `${(90*50)/computedFrontWidth}%`;
    } else if (computedFrontWidth < computedSideWidth) {
      cartonFront.style.width = `${(length/width) * 90}%`;
      cartonSide.style.width = `90%`;
      cartonFront.style.paddingBottom = `${(90*50)/computedSideWidth}%`;
      cartonSide.style.paddingBottom = `${(90*50)/computedSideWidth}%`;
    } else { // when computedFrontWidth and computedSideWidth are equal
      cartonFront.style.width = `90%`;
      cartonSide.style.width = `90%`;
      cartonFront.style.paddingBottom = `${(90*50)/computedFrontWidth}%`;
      cartonSide.style.paddingBottom = `${(90*50)/computedFrontWidth}%`;
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
}

export const scaler = () => {
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
import { default as el } from './domElements.js';

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
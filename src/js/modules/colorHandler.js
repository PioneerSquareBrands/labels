import iro from '@jaames/iro';
import { selectChoose } from './select';
let colorPicker;

export const colorInit = () => {
  colorPicker = new iro.ColorPicker('.color-picker', {
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

    selectChoose('#color', '#ffffff');
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

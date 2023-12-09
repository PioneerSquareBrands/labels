import domElements from './domElements.js';
const { sidebar } = domElements;

let numberInputs = sidebar.querySelectorAll('input[type="number"]');

export const validateNumbers = () => {
  numberInputs.forEach((input) => {
    input.addEventListener('keydown', (event) => {
      const allowedKeys = ['Delete', 'Backspace', 'Tab', 'Escape', 'Enter', '.', 'Shift', 'Control', 'Alt', 'Meta'];
      const isAllowedKey = allowedKeys.includes(event.key) ||
        (['a', 'c', 'x', 'v', 'r'].includes(event.key.toLowerCase()) && (event.ctrlKey || event.metaKey)) ||
        (['Home', 'End', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key));
      const isNumber = !event.shiftKey && ((event.key >= '0' && event.key <= '9') || (event.key >= 'Numpad0' && event.key <= 'Numpad9'));

      if (!isAllowedKey && !isNumber) {
        event.preventDefault();
        validateInput(input, false, 'Please use numbers only');
      } else {
        validateInput(input, true);
      }
    });

    input.addEventListener('input', (event) => {
      const minValue = parseFloat(input.min);
      const maxValue = parseFloat(input.max);
      let value = input.value;

      if (value.includes('.') && value.split('.')[1].length > 1) {
        // If the input value has a decimal point and more than one digit after it, do not parse it as a float
        return;
      }

      let numericValue = value;

      if (value.length > 1 && numericValue < minValue) {
        numericValue = minValue;
        validateInput(input, false, `Minimum value is ${minValue}`);
      } else if (numericValue > maxValue) {
        numericValue = maxValue;
        validateInput(input, false, `Maximum value is ${maxValue}`);
      }

      if (value !== numericValue.toString()) {
        input.value = numericValue.toString();
      }
    });
  });
}

const validateInput = (input, isValid, message) => {
  input.classList.toggle('input--error', !isValid);
  const field = input.closest('.field');
  field.classList.toggle('field--error', !isValid);
  if (!isValid) {
    field.setAttribute('data-error', message || 'Invalid input');
  } else {
    field.removeAttribute('data-error');
  }
};
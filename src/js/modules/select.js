
export const selectInit = () => {
  document.querySelectorAll('select').forEach((select, index) => {
    const selectinatorDiv = document.createElement('div');
    selectinatorDiv.className = 'selectinator';
    selectinatorDiv.id = `selectinator-${index + 1}`;
    selectinatorDiv.innerHTML = `
      <input class="selectinator-input" type="text" id="selectinator_input_${index + 1}">
      <button class="selectinator-button" aria-hidden="true" tabindex="-1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-up-down"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg></button>
      <div class="selectinator-options"></div>`;
    select.after(selectinatorDiv);

    const selectinatorLabelSibling = select.previousElementSibling;
    if (selectinatorLabelSibling && selectinatorLabelSibling.tagName === 'LABEL') {
      selectinatorLabelSibling.setAttribute('for', `selectinator_input_${index + 1}`);
    }

    const selectinatorInput = selectinatorDiv.querySelector('.selectinator-input');
    const selectinatorButton = selectinatorDiv.querySelector('.selectinator-button');
    const optionsDiv = selectinatorDiv.querySelector('.selectinator-options');

    Array.from(select.options).forEach((option, optionIndex) => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'selectinator-option';
      optionDiv.textContent = option.text;
      optionDiv.dataset.value = option.value;
      optionsDiv.appendChild(optionDiv);

      // Add mousedown event listener to each option
      // Click event happens after blur so mousedown is a work around that works for this scenario
      optionDiv.addEventListener('mousedown', () => {
        selectinatorInput.value = option.text;
        select.value = option.value;
        optionsDiv.querySelectorAll('.selectinator-option').forEach((o) => { o.classList.remove('highlighted') })
        optionDiv.classList.add('highlighted');
        select.dispatchEvent(new Event('change', { bubbles: false }));
        //hideOptions(event);
      });

      if (select.selectedIndex === optionIndex) {
        optionDiv.classList.add('highlighted');
      }
    });

    const selectedOption = select.options[select.selectedIndex];
    selectinatorInput.value = selectedOption.textContent;

    selectinatorButton.addEventListener('mousedown', toggleOptions);
    selectinatorInput.addEventListener('focus', openOptions);
    selectinatorInput.addEventListener('mousedown', toggleOptions);
    selectinatorInput.addEventListener('blur', hideOptions);
    document.addEventListener('mousedown', closeAllOptions);

    selectinatorInput.addEventListener('input', filterOptions);
    selectinatorInput.addEventListener('keydown', keyboardNavigation(select));

    select.style.display = 'none';
    //select.setAttribute('tabindex', '-1');
  });
}

const openOptions = (event) => {
  const parentSelectinator = event.target.closest('.selectinator');
  if (!parentSelectinator.classList.contains('active')) {
    parentSelectinator.classList.add('active');
  }
};

const hideOptions = (event) => {
  const parentSelectinator = event.target.closest('.selectinator');
  if (parentSelectinator) {
    parentSelectinator.classList.remove('active');
  }
};

const toggleOptions = (event) => {
  event.preventDefault();
  const parentSelectinator = event.target.closest('.selectinator');
  const selectinatorInput = parentSelectinator.querySelector('.selectinator-input');

  if (!parentSelectinator.classList.contains('active')) {
    parentSelectinator.classList.add('active');
    setTimeout(() => {
      selectinatorInput.focus();
    }, 0);
  } else {
    parentSelectinator.classList.remove('active');
  }
};

const closeAllOptions = (event) => {
  if (!event.target.closest('.selectinator-option') && !event.target.closest('.selectinator')) {
    document.querySelectorAll('.selectinator').forEach(selectinator => {
      selectinator.classList.remove('active');
    });
  }
};

const filterOptions = (event) => {
  openOptions(event);

  const inputText = event.target.value.toLowerCase();
  const parentSelectinator = event.target.closest('.selectinator');
  const optionsDiv = parentSelectinator.querySelector('.selectinator-options');

  optionsDiv.querySelectorAll('div').forEach(optionDiv => {
    const optionText = optionDiv.textContent.toLowerCase();
    if (optionText.includes(inputText)) {
      optionDiv.style.display = ''; // Show the option
    } else {
      optionDiv.style.display = 'none'; // Hide the option
    }
  });
};

const keyboardNavigation = (select) => (event) => {
  const parentSelectinator = event.target.closest('.selectinator');
  const selectinatorInput = parentSelectinator.querySelector('.selectinator-input');
  const optionsDiv = parentSelectinator.querySelector('.selectinator-options');
  const options = Array.from(optionsDiv.querySelectorAll('div')).filter(option => option.style.display !== 'none'); // Only consider visible options
  const currentIndex = options.findIndex(option => option.classList.contains('highlighted'));

  switch (event.key) {
    case 'ArrowDown':
      if (!parentSelectinator.classList.contains('active')){
        openOptions(event);
      } else {
        if (currentIndex < options.length - 1) {
          const nextIndex = currentIndex + 1;
          options[currentIndex]?.classList.remove('highlighted');
          options[nextIndex]?.classList.add('highlighted');
          selectinatorInput.value = options[nextIndex].textContent;
        }
      }
      break;
    case 'ArrowUp':
      if (!parentSelectinator.classList.contains('active')){
        openOptions(event);
      } else {
        if (currentIndex > 0) {
          const prevIndex = currentIndex - 1;
          options[currentIndex]?.classList.remove('highlighted');
          options[prevIndex]?.classList.add('highlighted');
          selectinatorInput.value = options[prevIndex].textContent;
        }
      }
      break;
    case 'Enter':
      event.preventDefault();
      if (currentIndex !== -1) {
        const selectedOption = options[currentIndex];
        selectinatorInput.value = selectedOption.textContent;
        select.value = selectedOption.dataset.value;
        parentSelectinator.classList.remove('active');
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
      break;
    case 'Escape':
      parentSelectinator.classList.remove('active');
      selectinatorInput.blur();
      
      const selectedOption = select.options[select.selectedIndex];
      selectinatorInput.value = selectedOption ? selectedOption.textContent : '';
      options.forEach((o) => { o.classList.remove('highlighted') });
      optionsDiv.querySelector(`[data-value="${selectedOption.textContent.toLowerCase()}"]`).classList.add('highlighted');
      break;
  }
};

export const selectChoose = (select, value) => {
  let targetSelect = document.querySelector(`${select} + .selectinator .selectinator-options .selectinator-option[data-value="${value}"]`);
    
  let event = new MouseEvent('mousedown', {
    bubbles: true,
    cancelable: true,
    view: window
  });

  targetSelect.dispatchEvent(event);
}
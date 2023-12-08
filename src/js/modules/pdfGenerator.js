
const { jsPDF } = globalThis.jspdf;
let DEBUG = false;

export const pdfInit = () => {
  const downloadButton = document.querySelector('.download__button');
  downloadButton.addEventListener('click', () => {
    if (DEBUG) { console.log('Download button Clicked'); }
    pdfGenerator();
  });

  window.onload = () => pdfName();
  document.querySelector('#brand').addEventListener('change', pdfName);
  document.querySelector('#sku').addEventListener('input', pdfName);
  document.querySelector('.layout__form').addEventListener('change', pdfName);
  document.querySelector('.visibility__form').addEventListener('change', pdfName);
}

const pdfGenerator = async () => {
  const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new jsPDF instance
  const contents = document.querySelectorAll('.page:not(.page--hidden) .page__content'); // Get all .page__content elements

  for (const content of contents) {
    const canvas = await html2canvas(content, {
      allowTaint: true,
      scale: 4
    });

    if (DEBUG) { 
      const existingCanvas = content.nextElementSibling;
      if (existingCanvas && existingCanvas.tagName === 'CANVAS') {
        existingCanvas.remove();
      }
      content.insertAdjacentElement('afterend', canvas);
    } else {
      const originalWidth = content.offsetWidth;
      const originalHeight = content.offsetHeight;
  
      const imgWidth = originalWidth * 0.264583;
      const imgHeight = originalHeight * 0.264583;
  
      const x = (210 - imgWidth) / 2;
      const y = (297 - imgHeight) / 2;
  
      const imgData = canvas.toDataURL('image/png'); // Convert canvas to image data
  
      pdf.addImage(imgData, 'png', x, y, imgWidth, imgHeight); // Add image to PDF
      if (content !== contents[contents.length - 1]) { // Add a new page except for the last element
        pdf.addPage();
      }
    }
  }
  
  if (!DEBUG) { 
    // Save the PDF
    const sku = document.querySelector('#sku').value.toUpperCase() || 'SKU';
    const visiblePages = document.querySelectorAll('.page:not(.page--hidden)');
    let labelTypes = Array.from(visiblePages).map(page => page.getAttribute('data-type')).join('.');

    labelTypes = labelTypes.replace(/polybag/g, 'PB');
    labelTypes = labelTypes.replace(/master/g, 'MC');
    labelTypes = labelTypes.replace(/inner/g, 'IC');

    let name = `${sku} ${labelTypes} Label.pdf`;
    pdf.save(name);
  }
}

const pdfName = () => {
  let pdfName = namer();
  document.querySelector('.download__name').textContent = pdfName;
}

const namer = () => {
  const defaults = brandDefaults();

  let brand = document.querySelector('#brand').value ;
  const sku = document.querySelector('#sku').value.toUpperCase() || defaults.sku;
  const visiblePages = document.querySelectorAll('.page:not(.page--hidden)');
  let labelTypes = Array.from(visiblePages).map(page => page.getAttribute('data-type')).join('.');

  labelTypes = labelTypes.replace(/polybag/g, 'PB');
  labelTypes = labelTypes.replace(/master/g, 'MC');
  labelTypes = labelTypes.replace(/inner/g, 'IC');

  brand = brand.replace(/brenthaven/g, 'BH');
  brand = brand.replace(/gumdrop/g, 'GD');
  brand = brand.replace(/vault/g, 'VT');

  return `${brand} ${sku} ${labelTypes} Label.pdf`;
}
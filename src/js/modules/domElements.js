const domElements = {
  sidebar: document.querySelector('.sidebar__fields'),
  upcForm: document.querySelector('#upc_form'),
  shipForm: document.querySelector('#shipping_form'),
  upcLabel: document.querySelector('#upc_title'),
  shipLabel: document.querySelector('#shipping_title'),
  preview: document.querySelector('.preview'),
  brand: document.querySelector('#brand'),
  itemMaster: document.querySelector('#item_master'),
  sku: document.querySelector('#sku'),
  source: document.querySelector('#source'),
  description: document.querySelector('#description'),
  upc: document.querySelector('#item_upc'),
  qrLink: document.querySelector('#qr_link'),
  qrBase: document.querySelector('.qrlink__base'),
  qrPath: document.querySelector('#qr_path'),
  pbContent: document.querySelector('#pb_content'),
  mcContent: document.querySelector('#mc_content'),
  icContent: document.querySelector('#ic_content'),
  dimLength: document.querySelector('#shipping_length'),
  dimWidth: document.querySelector('#shipping_width'),
  dimHeight: document.querySelector('#shipping_height'),
  boxQty: document.querySelector('#shipping_quantity'),
  gWeight: document.querySelector('#shipping_gross'),
  nWeight: document.querySelector('#shipping_net'),
  purchaseOrder: document.querySelector('#shipping_po'),
  tihi: document.querySelector('#shipping_tihi'),
  tihiLabel: document.querySelector('#shipping_tihi_label'),
  printHeaders: document.querySelectorAll('.print-header'),
  labels: document.querySelectorAll('.label'),
  printLogos: document.querySelectorAll('.print-logo'),
  printItemMasters: document.querySelectorAll('.print-item-master'),
  printBoxSkus: document.querySelectorAll('.print-box-sku'),
  printSkus: document.querySelectorAll('.print-sku'),
  printCountries: document.querySelectorAll('.print-country'),
  printDescriptions: document.querySelectorAll('.print-description'),
  printInstallBases: document.querySelectorAll('.print-install-base'),
  printInstallPaths: document.querySelectorAll('.print-install-path'),
  printPolybagQty: document.querySelectorAll('[data-type="polybag"] .label__quantity'),
  printMasterQty: document.querySelectorAll('[data-type="master"] .label__quantity'),
  printInnerQty: document.querySelectorAll('[data-type="inner"] .label__quantity'),
  printDimLengths: document.querySelectorAll('.print-dim-length'),
  printDimWidths: document.querySelectorAll('.print-dim-width'),
  printDimHeights: document.querySelectorAll('.print-dim-height'),
  printBoxQty: document.querySelectorAll('.print-box-qty'),
  printGrossWgt: document.querySelectorAll('.print-gross-weight'),
  printNetWgt: document.querySelectorAll('.print-net-weight'),
  printPurchaseOrders: document.querySelectorAll('.print-purchase-order'),
  printTihi: document.querySelector('.print-tihi')
};

export default domElements;

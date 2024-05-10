export const brandDefaults = () => {
  const brandField = document.querySelector('#brand').value;
  let logoSrc, headerText, linkText, itemMaster, sku, upc, description;

  switch (brandField) {
    case 'brenthaven':
      logoSrc = 'dist/img/brenthaven_min.png';
      headerText = 'Brenthaven';
      linkText = 'https://brenthaven.com';
      itemMaster = '1050';
      sku = '1050001';
      upc = '730791105003';
      description = 'Edge Smart Connect Keyboard';
      break;
    case 'gumdrop':
      logoSrc = 'dist/img/gumdrop_min.png';
      headerText = 'Gumdrop';
      linkText = 'https://www.gumdropcases.com';
      itemMaster =  '01D015';
      sku = '01D015E01-20';
      upc = '818090026011';
      description = 'DropTech for Dell Latitude 3340 (2-in-1)';
      break;
    default:
      logoSrc = 'dist/img/vault_min.png';
      headerText = 'Vault';
      linkText = 'https://vaultproducts.com';
      itemMaster =  '12A001';
      sku = '12A001E01-20';
      upc = '818090025960';
      description = 'Simplicity Stand for iPad';
  }
  
  return { brandField, logoSrc, headerText, linkText, itemMaster, sku, upc, description };
}
import app from '../app.js';
import { $$ } from '../variables/utils.js';

document.addEventListener('DOMContentLoaded', () => {
  app.start();

  const orderBtns = $$('[data-name="order-btn"]');
  const orderDescs = $$('[data-name="order-desc"]');

  orderBtns.forEach((btn) => {
    btn.onclick = () => {
      const itemList = btn.querySelector('[data-open]');
      const itemDescs = btn.querySelectorAll('[data-name="order-desc"]');
      console.log();

      // Open & close the content
      if (itemList.dataset.open === 'false') itemList.dataset.open = 'true';
      else itemList.dataset.open = 'false';

      // Show & hide desc
      itemDescs.forEach((itemDesc) => {
        if (itemList.dataset.open === 'true') itemDesc.style.display = 'none';
        else itemDesc.style.display = 'block';
      });
    };
  });
});

import { $, $$ } from '../variables/utils.js';
import app from '../app.js';

app.start();

const addToCartBtn = $('[data-name="add-to-cart"]');
addToCartBtn.onclick = () => {
  app.toast({
    title: 'Error',
    message: 'You have errorfully signed in',
    type: 'error',
  });
};

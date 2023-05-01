import { $, $$ } from '../variables/utils.js';
import app from '../app.js';
import toast from '../views/toast.js';

app.start();
toast({
  title: 'Success',
  message: 'You have successfully signed in',
  type: 'success',
});

const addToCartBtn = $('[data-name="add-to-cart"]');
addToCartBtn.onclick = () => {
  toast({
    title: 'Error',
    message: 'You have errorfully signed in',
    type: 'error',
  });
};

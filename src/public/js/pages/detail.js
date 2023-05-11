import {
  $,
  $$,
  convertFlashMessage,
  setCartIconQty,
} from '../variables/utils.js';
import app from '../app.js';

app.start();

const addToCartBtn = $('[data-name="add-to-cart"]');
addToCartBtn.onclick = async () => {
  const quantity = $('[name="product-qty"]')?.value;
  const productId = addToCartBtn.dataset.product;

  const respone = await fetch(`/cart/add`, {
    method: 'POST',
    body: JSON.stringify({
      productId,
      quantity,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!respone.ok) {
    const error = await respone.json();
    throw new Error(error.message);
  }

  const obj = await respone.json();

  if (obj?.error === 'not-authenticated') window.location.href = '/sign-in';
  else {
    setCartIconQty(obj.totalQty);
    const toastObj = convertFlashMessage(obj);
    app.toast(toastObj);
  }
};

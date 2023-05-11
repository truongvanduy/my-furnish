const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const convertFlashMessage = (obj) => {
  const type = Object.keys(obj)[0];
  const title = type;
  const message = obj[type];
  const duration = 3000;
  return { title, message, type, duration };
};

const setCartIconQty = (value) => {
  const navCartQty = $('[data-name="nav-cart-qty"]');
  let qty = null;
  console.log(value);

  switch (typeof value) {
    case 'number':
      qty = value;
      break;
    default:
      qty = value.reduce(
        (totalQty, currentDetail) => totalQty + currentDetail.quantity,
        0
      );
      break;
  }

  navCartQty.textContent = `(${qty})`;
};

export { $, $$, convertFlashMessage, setCartIconQty };

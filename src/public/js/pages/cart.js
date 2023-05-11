import {
  $,
  $$,
  convertFlashMessage,
  setCartIconQty,
} from '../variables/utils.js';
import app from '../app.js';
import toast from '../views/toast.js';

function renderCartDetails(cartDetails) {
  if (cartDetails.length === 0)
    return /* html */ `<p class='text-center text-xl'>You have no item in your cart</p>`;
  return cartDetails
    .map(
      (item) => /* html */ `
            <li data-name="cart-item">
              <div class="cart-item">
                <div class="cart-item__img">
                  <img src="/images/products/${item.product.slug}.png" alt="${
        item.product.name
      }">
                </div>
                <div class="cart-item__info">
                  <h4 class="cart-item__name heading heading-xs color-heading font-weight-normal">
                    ${item.product.name}</h4>
                  <p class="cart-item__desc">
                    ${item.product.category.name}</p>
                  <select name="product-quantity" data-item="${item.id}">
                    ${[1, 2, 3, 4, 5].map((value) =>
                      value === item.quantity
                        ? `<option value="${value}" selected>${value}</option>`
                        : `<option value="${value}">${value}</option>`
                    )}
                  </select>
                  <div class="cart-item__action">
                    <button class="cart-item__trash" data-name="remove-item" data-item="${
                      item.id
                    }">
                      <i class="fa-regular fa-trash-can">
                      </i>
                    </button>
                  </div>
                </div>
                <span class="cart-item__price heading-xs pr-3 font-josefin">
                  $${item.quantity * item.product.price}</span>
              </div>
            </li>`
    )
    .join('');
}
function updateSummary(subtotalValue) {
  const subtotal = $('[data-name="subtotal"]');
  const total = $('[data-name="total"]');
  subtotal.textContent = `$${subtotalValue}`;
  total.textContent = `$${subtotalValue + 10}`;
}
function disableCheckoutButton() {
  const checkoutButton = $('[data-name="checkout"]');
  checkoutButton.disabled = true;
}

document.addEventListener('DOMContentLoaded', () => {
  app.start();

  const cartItemContainer = $('[data-name="cart-list"]');
  const removeAllBtn = $('[data-name="remove-all"]');

  const updateItem = async (detailId, quantity) => {
    try {
      const response = await fetch(`/cart/update?_method=PATCH`, {
        method: 'POST',
        body: JSON.stringify({
          detailId,
          quantity,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { cartDetails, subtotal, toastObj } = await response.json();

      cartItemContainer.innerHTML = renderCartDetails(cartDetails);
      setCartIconQty(cartDetails);
      updateSummary(subtotal);
      toast(toastObj);

      const updateBtns = $$("[name='product-quantity']");
      const removeBtns = $$("[data-name='remove-item']");

      updateBtns.forEach((btn) => {
        btn.onchange = async () => {
          const detailId = btn.dataset.item;
          const quantity = btn.options[btn.selectedIndex].value;
          await updateItem(detailId, quantity);
        };
      });

      removeBtns.forEach((btn) => {
        btn.onclick = async () => {
          await removeItem(btn.dataset.item);
        };
      });
    } catch (e) {
      toast({
        title: 'Error',
        message: e.message,
        type: 'error',
      });
    }
  };
  const removeItem = async (detailId) => {
    try {
      const response = await fetch(`/cart/remove-one?_method=DELETE`, {
        method: 'POST',
        body: JSON.stringify({
          detailId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { cartDetails, subtotal, toastObj } = await response.json();

      toast(toastObj);
      cartItemContainer.innerHTML = renderCartDetails(cartDetails);
      setCartIconQty(cartDetails);
      updateSummary(subtotal);
      if (cartDetails.length === 0) disableCheckoutButton();

      const removeBtns = $$("[data-name='remove-item']");

      removeBtns.forEach((btn) => {
        btn.onclick = async () => {
          await removeItem(btn.dataset.item);
        };
      });
    } catch (e) {
      throw e;
    }
  };

  const removeBtns = $$("[data-name='remove-item']");
  const updateBtns = $$("[name='product-quantity']");

  // Update product quantity
  updateBtns.forEach((btn) => {
    btn.onchange = async () => {
      const detailId = btn.dataset.item;
      const quantity = btn.options[btn.selectedIndex].value;
      await updateItem(detailId, quantity);
    };
  });

  // Remove a product
  removeBtns.forEach((btn) => {
    btn.onclick = async () => {
      await removeItem(btn.dataset.item);
    };
  });

  // Remove all product
  removeAllBtn.onclick = async () => {
    try {
      const response = await fetch(`/cart/remove-all?_method=DELETE`, {
        method: 'POST',
        // body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { cartDetails, subtotal, toastObj } = await response.json();

      toast(toastObj);
      cartItemContainer.innerHTML = renderCartDetails(cartDetails);
      setCartIconQty(cartDetails);
      updateSummary(subtotal);
      disableCheckoutButton();
    } catch (e) {
      throw e;
    }
  };
});

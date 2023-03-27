import { $ } from '../variables/utils.js';

export default function renderInCartProducts() {
  const productContainer = $('.cart-table__body');
  productContainer.innerHTML = '';
  this.inCartProducts.forEach((product) => {
    productContainer.innerHTML += `<tr class="cart-table__row product-row" data-index="${
      product.id
    }">
          <td class="cart-table__cell">
              <div class="cart-table-product">
                <div class="cart-table-product__img"><img src="${
                  product.imgSrc
                }" alt="${product.name}"></div>
                <div class="cart-table-product__name">${product.name}</div>
              </div>
            </td>
            <td class="cart-table__cell">
              <div class="cart-table__price">$${product.price}</div>
            </td>
            <td class="cart-table__cell">
              <input class="cart-table__quantity" type="number" value="${
                product.quantity
              }" min="1" max="10">
            </td>
            <td class="cart-table__cell">
              <div class="cart-table__total">$${
                product.price * product.quantity
              }</div>
            </td>
            <td class="cart-table__cell"><i class="fa fa-times remove-btn"></i>
          </td>
        </tr>
        `;
  });
}

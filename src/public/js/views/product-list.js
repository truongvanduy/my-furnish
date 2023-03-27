import { $ } from '../variables/utils.js';

export default function renderProductList() {
  const productContainer = $('.grid-container__product.container');

  this.products.forEach((product) => {
    productContainer.innerHTML += `
      <figure class="product-latest-item product-item product-item action-vertical" data-index="${product.id}">
      <div class="product-latest-item__top product-item__top"> 
        <div class="product-latest-item__img product-item__img"> <img src="${product.imgSrc}" alt="${product.name}"/></div>
        <div class="product-action product-action--vertical">
          <button class="product-action__item product-action__cart"><i class="fa-solid fa-cart-plus"></i></button>
          <button class="product-action__item"><i class="fa-regular fa-heart"></i></button>
          <button class="product-action__item"><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
      </div>
      <div class="product-latest-item__bottom product-item__bottom"> 
        <figcaption class="product-latest-item__heading text text-lg color-heading font-primary">${product.name}</figcaption>
        <div class="product-latest-item-price"><span class="product-latest-item-price__new text text-md color-heading">$${product.price}</span>
        </div>
      </div>
    </figure>`;
  });
}

import { accessories } from '../variables/variables.js';

export default function renderAccessories() {
  this.products.forEach((product) => {
    if (product.category === 'accessories')
      accessories.innerHTML += `<div class="col col-4 xl-4 lg-6 md-6 sm-12"> 
        <figure class="accessories-item product-item action-horizontal obs-transition fade" data-index="${product.id}"> 
          <div class="accessories-item__top product-item__top"> 
            <div class="accessories-item__img product-item__img"> <img loading="lazy" src="${product.imgSrc}" alt="${product.name}"/></div>
            <div class="product-action product-action--horizontal">
              <button class="product-action__item  product-action__cart"><i class="fa-solid fa-cart-plus"></i></button>
              <button class="product-action__item"><i class="fa-regular fa-heart"></i></button>
              <button class="product-action__item"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
          </div>
          <div class="accessories-item__bottom product-item__bottom"> 
            <figcaption class="accessories-item__heading text text-lg text-center color-heading font-secondary">${product.name}</figcaption>
            <div class="accessories-item-price text text-sm text-center color-heading"> <span class="accessories-item-price__new">$${product.price}</span>
            </div>
          </div>
        </figure>
      </div>`;
  });
}

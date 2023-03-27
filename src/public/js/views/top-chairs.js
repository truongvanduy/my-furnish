import { topChairs } from '../variables/variables.js';

export default function renderTopChairs() {
  let i = 0;
  topChairs.forEach((element) => {
    while (this.products[i].category !== 'top chair') i++;
    element.innerHTML = `
        <figure class="product-top-item product-item action-rounded obs-transition fade side-half-up" data-index="${this.products[i].id}">
          <div class="product-top-item__top product-item__top">
            <div class="product-top-item__img product-item__img"> <img loading="lazy" src="${this.products[i].imgSrc}" alt="Mini LCW Chair"/></div>
            <div class="product-action product-action--rounded">
              <button class="product-action__item  product-action__cart"><i class="fa-solid fa-cart-plus"></i></button>
              <button class="product-action__item"><i class="fa-regular fa-heart"></i></button>
              <button class="product-action__item"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
          </div>
          <div class="product-top-item__bottom product-item__bottom"> 
            <figcaption class="product-top-item__heading heading heading-xs heading-center font-primary">${this.products[i].name}</figcaption><span class="product-top-item__price text text-md text-center color-heading">$${this.products[i].price}</span>
          </div>
        </figure>`;
    i++;
  });
}

import { onTrendingElements } from '../variables/variables.js';

export default function renderTrendingProducts() {
  let i = 0;
  onTrendingElements.forEach((element) => {
    while (this.products[i].category !== 'trending') i++;
    element.innerHTML = `
        <figure class="product-item on-trending-item on-trending-item--${this.products[i].addClassName}" data-index="${this.products[i].id}" >
          <figcaption class="on-trending-item__name font-secondary">${this.products[i].name}</figcaption>
          <div class="on-trending-item__img product-item__img"> <img loading="lazy" src=${this.products[i].imgSrc} alt="a chair"/></div><span class="on-trending-item__price">${this.products[i].price}$</span>
          <div class="product-action product-action--bottom-left">
            <button class="product-action__item  product-action__cart"><i class="fa-solid fa-cart-plus"></i></button>
            <button class="product-action__item"><i class="fa-regular fa-heart"></i></button>
            <button class="product-action__item"><i class="fa-solid fa-magnifying-glass"></i></button>
          </div>
        </figure>`;
    i++;
  });
}

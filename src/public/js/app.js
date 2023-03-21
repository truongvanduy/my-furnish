/*==============================================================================================================================

Nguồn tài nguyên tham khảo:
4. Cách sử dụng Intersection Observer để tạo animation:
	- Introduction to the Intersection Observer JavaScript API - Kevin Powell   https://www.youtube.com/watch?v=T8EYosX4NOo
	- Fade and scroll items into view while scrolling - Kevin Powell            https://www.youtube.com/watch?v=huVJW23JHKQ&t=502s
	- Intersection Observer API - MDN Web Docs                                  
    https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

===============================================================================================================================*/

'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const toggleMenuBtn = $('.js-toggle-menu');
const menu = $('.js-menu');
const header = $('.header');
const onTrendingElements = $$(
  '.col.col-12.xl-12.lg-7.md-12.sm-12, .col.col-6.xl-6.lg-12.md-6.sm-12'
);
const topChairs = $$('.product-top .row > .col');
const accessories = $('.accessories .row');
const navCartQty = $$('.nav-cart__qty');
const invoiceQty = $('.invoice-qty');
const invoiceTotal = $$('.invoice-total');
const PRODUCT_STORAGE_KEY = 'IN_CART_PRODUCT';

const app = {
  products: [
    {
      id: 1,
      name: 'Brantwood Everest Oak Steel',
      imgSrc: '../images/products/brantwood-everest-oak-steel.png',
      category: 'trending',
      price: 1799,
      quantity: 0,
      addClassName: 'lg',
    },
    {
      id: 2,
      name: 'Eboni Lamp Table',
      imgSrc: '../images/products/eboni-lamp-table.png',
      category: 'trending',
      price: 599,
      quantity: 0,
      addClassName: 'md',
    },
    {
      id: 3,
      name: 'Tobi End Table',
      imgSrc: '../images/products/tobi-end-table.png',
      category: 'trending',
      price: 229,
      quantity: 0,
      addClassName: 'md',
    },
    {
      id: 4,
      name: 'Emse Chair',
      imgSrc: '../images/products/esme-chair.png',
      category: 'trending',
      price: 949,
      quantity: 0,
      addClassName: 'md',
    },
    {
      id: 5,
      name: 'Buckland Ladder',
      imgSrc: '../images/products/buckland-ladder.png',
      category: 'trending',
      price: 499,
      quantity: 0,
      addClassName: 'md',
    },
    {
      id: 6,
      name: 'The Sofology Fifth Avenue',
      imgSrc: '../images/products/the-sofology-fifth-avenue.png',
      category: 'trending',
      price: 3549,
      quantity: 0,
      addClassName: 'lg',
    },
    {
      id: 7,
      name: 'Mini LCW Chair',
      imgSrc: '../images/products/mini-lcw-chair.png',
      category: 'top chair',
      price: 299,
      quantity: 0,
      addClassName: '',
    },
    {
      id: 8,
      name: 'Sunningdale Chair',
      imgSrc: '../images/products/sunningdale-chair.png',
      category: 'top chair',
      price: 499,
      quantity: 0,
      addClassName: '',
    },
    {
      id: 9,
      name: 'Paddington Chair',
      imgSrc: '../images/products/paddington-chair.png',
      category: 'top chair',
      price: 749,
      quantity: 0,
      addClassName: '',
    },
    {
      id: 10,
      name: 'Swivel Accent Chair',
      imgSrc: '../images/products/swivel-accent-chair.png',
      category: 'top chair',
      price: 799,
      quantity: 0,
      addClassName: '',
    },
    {
      id: 11,
      name: 'Hemi Floor Lamp',
      imgSrc: '../images/products/hemi-floor-lamp.png',
      category: 'accessories',
      price: 399,
      quantity: 0,
      addClassName: '',
    },
    {
      id: 12,
      name: 'Bowie Scatter Scatter Cushion',
      imgSrc: '../images/products/bowie-scatter-cushion.png',
      category: 'accessories',
      price: 35,
      quantity: 0,
      addClassName: '',
    },
    {
      id: 13,
      name: 'Bangles Mirror',
      imgSrc: '../images/products/bangles-mirror.png',
      category: 'accessories',
      price: 249,
      quantity: 0,
      addClassName: '',
    },
    {
      id: 14,
      name: 'Dover Rugs Rug',
      imgSrc: '../images/products/dover-rugs-rug.png',
      category: 'accessories',
      price: 299,
      quantity: 0,
      addClassName: '',
    },
    {
      id: 15,
      name: 'Marcia Coffee Table',
      imgSrc: '../images/products/marcia-coffee-table.png',
      category: 'accessories',
      price: 849,
      quantity: 0,
      addClassName: '',
    },
    {
      id: 16,
      name: 'Captiva Table Lamp',
      imgSrc: '../images/products/captiva-table-lamp.png',
      category: 'accessories',
      price: 149,
      quantity: 0,
      addClassName: '',
    },
  ],
  inCartProducts: [],
  storageProducts: JSON.parse(localStorage.getItem(PRODUCT_STORAGE_KEY)) || {},
  setStorageProduct: function (key, value) {
    this.storageProducts[key] = value;
    localStorage.setItem(
      PRODUCT_STORAGE_KEY,
      JSON.stringify(this.storageProducts)
    );
  },
  removeStorageProduct: function (key) {
    delete this.storageProducts[key];
    localStorage.setItem(
      PRODUCT_STORAGE_KEY,
      JSON.stringify(this.storageProducts)
    );
  },
  loadStorageProducts: function () {
    for (let id in this.storageProducts) {
      this.products[id - 1].quantity = this.storageProducts[id].quantity;
    }
  },
  getTotalPrice: function () {
    return this.inCartProducts.reduce((prevPrice, currentProduct) => {
      return prevPrice + currentProduct.price * currentProduct.quantity;
    }, 0);
  },
  getProductQuantity: function () {
    return this.inCartProducts.reduce(
      (prevQty, currentProduct) => prevQty + currentProduct.quantity,
      0
    );
  },
  handleEvents: function () {
    const addToCartBtns = $$('.product-action__cart');
    let removeBtns = $$('.remove-btn');

    function getParentElement(element, selector) {
      while (element && !element.matches(selector))
        element = element.parentElement;
      return element;
    }

    // When clicking on the Add to Cart button
    addToCartBtns.forEach((btn) => {
      btn.onclick = () => {
        let productItem = getParentElement(btn, '.product-item');
        if (productItem) {
          let chosenProduct = this.products[productItem.dataset.index - 1];
          chosenProduct.quantity++;
          if (!this.inCartProducts.includes(chosenProduct))
            this.inCartProducts.push(chosenProduct);
          this.setStorageProduct(chosenProduct.id, chosenProduct);
          this.updateCartIcon();
          this.updateInCartProducts();
        }
      };
    });

    // When clicking on the Remove product btn
    removeBtns.forEach((btn, index) => {
      btn.onclick = () => {
        let productRow = getParentElement(btn, '.product-row');
        if (productRow) {
          let chosenProduct = this.products[productRow.dataset.index - 1];
          chosenProduct.quantity = 0;
          this.removeStorageProduct(chosenProduct.id);
          this.loadStorageProducts();
          this.updateCartIcon();
          this.updateInCartProducts();
          productRow.remove();
          this.updateInvoice();
        }
      };
    });

    // When adjusting the product quantity
    let changeQtyBtns = $$('.cart-table__quantity');
    changeQtyBtns.forEach((btn) => {
      btn.onchange = () => {
        let productRow = getParentElement(btn, '.product-row');
        let chosenProduct = this.products[productRow.dataset.index - 1];
        if (btn.value === '') btn.value = '1';
        chosenProduct.quantity = Number(btn.value);
        let productPrice = chosenProduct.quantity * chosenProduct.price;
        this.setStorageProduct(chosenProduct.id, chosenProduct);
        this.loadStorageProducts();
        this.updateCartIcon();
        this.updateInCartProducts();
        productRow.querySelector(
          '.cart-table__total'
        ).innerText = `$${productPrice}`;
        this.updateInvoice();
      };
    });

    // When clicking on the clear cart button
    let clearCartBtn = $('.clear-cart-btn');
    if (clearCartBtn) {
      clearCartBtn.onclick = () => {
        localStorage.removeItem(PRODUCT_STORAGE_KEY);
        this.products.forEach((product) => {
          product.quantity = 0;
        });
        this.updateInCartProducts();
        this.updateCartIcon();
        this.renderCartPage();
      };
    }
  },
  toggleHeader: function () {
    // Hide header when scrolling down
    let currentPosition = 0;
    window.onscroll = (e) => {
      let newPosition = document.documentElement.scrollTop;
      if (
        newPosition > currentPosition &&
        newPosition > header.offsetHeight &&
        !menu.classList.contains('opened')
      ) {
        header.classList.add('hide');
      } else if (newPosition < currentPosition) {
        header.classList.remove('hide');
      }
      currentPosition = newPosition;
    };
  },
  handleMenu: function () {
    // Toggle menu function
    toggleMenuBtn.onclick = () => {
      toggleMenuBtn.classList.toggle('opened');
      menu.classList.toggle('opened');
    };
  },
  updateCartIcon: function () {
    let productQty = this.inCartProducts.length;
    navCartQty.forEach((span) => {
      if (productQty !== 0) span.classList.add('has-product');
      else span.classList.remove('has-product');
      span.innerText = `${this.getProductQuantity()}`;
    });
  },
  updateInvoice: function () {
    invoiceQty.innerText = this.getProductQuantity();
    invoiceTotal.forEach((span) => {
      span.innerText = `$${this.getTotalPrice()}`;
    });
  },
  updateInCartProducts: function () {
    this.inCartProducts = this.products.filter(
      (product) => product.quantity !== 0
    );
  },
  renderTrendingProducts: function () {
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
  },
  renderTopChairs: function () {
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
  },
  renderAccessories: function () {
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
  },
  renderProductList: function () {
    const productContainer = document.querySelector(
      '.grid-container__product.container'
    );

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
  },
  renderInCartProducts: function () {
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
  },
  addHomeAnimation: function () {
    /*=====================
      Sale Banner Container
    ======================*/

    const saleBannerContainer = $('.banner-sale__container');
    const saleBannerContainerOptions = {
      rootMargin: '-45% 0px 0px 0px',
      threshold: 0,
    };
    const saleBannerContainerObserver = new IntersectionObserver(
      (entries, saleBannerContainerObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('appear');
          else entry.target.classList.remove('appear');
        });
      },
      saleBannerContainerOptions
    );

    saleBannerContainerObserver.observe(saleBannerContainer);

    /*====================
      Sale Banner Contents
    =====================*/

    const saleBannerContents = $$(
      '.banner-sale__heading, .banner-sale__desc, .banner-sale__cta'
    );
    const saleBannerContentOptions = {
      rootMargin: '-30% 0px 0px 0px',
      threshold: 0,
    };
    const saleBannerContentObserver = new IntersectionObserver(
      (entries, saleBannerContentsObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('appear');
          else entry.target.classList.remove('appear');
        });
      },
      saleBannerContentOptions
    );

    saleBannerContents.forEach((content) => {
      saleBannerContentObserver.observe(content);
    });

    /*========
      Others
    ========*/

    const items = $$(
      '.col.col-12.xl-12.lg-7.md-12.sm-12,.col.col-6.xl-6.lg-12.md-6.sm-12, .product-top-item, .accessories-item, .home-blog-item'
    );
    const itemOptions = {
      rootMargin: '0px 0px -20% 0px',
      threshold: 0,
    };
    const itemObserver = new IntersectionObserver((entries, itemsObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('appear');
      });
    }, itemOptions);

    items.forEach((product) => {
      itemObserver.observe(product);
    });

    /*=============
      Banners
    ==============*/

    const banners = $$(
      '.banner-stick__content, .banner-stick__img, .banner-side__img, .banner-side__content'
    );
    const bannerOptions = {
      rootMargin: '0px 0px -30% 0px',
      threshold: 0,
    };
    const bannerObserver = new IntersectionObserver(
      (entries, bannersObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('appear');
        });
      },
      bannerOptions
    );

    banners.forEach((banner) => {
      bannerObserver.observe(banner);
    });
  },
  renderHomeProducts: function () {
    this.renderTrendingProducts();
    this.renderTopChairs();
    this.renderAccessories();
  },
  renderCartPage: function () {
    this.renderInCartProducts();
    this.updateInvoice();
  },
  start: function () {
    this.loadStorageProducts();
    this.updateInCartProducts();
    this.updateCartIcon();
    this.toggleHeader();
    this.handleMenu();
    this.handleEvents();
  },
  startCart: function () {
    this.loadStorageProducts();
    this.updateInCartProducts();
    this.updateCartIcon();
    this.toggleHeader();
    this.handleMenu();
    this.renderCartPage();
    this.handleEvents();
  },
};

app.start();

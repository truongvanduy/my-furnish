/*==============================================================================================================================

Nguồn tài nguyên tham khảo:
4. Cách sử dụng Intersection Observer để tạo animation:
	- Introduction to the Intersection Observer JavaScript API - Kevin Powell   https://www.youtube.com/watch?v=T8EYosX4NOo
	- Fade and scroll items into view while scrolling - Kevin Powell            https://www.youtube.com/watch?v=huVJW23JHKQ&t=502s
	- Intersection Observer API - MDN Web Docs                                  
    https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

===============================================================================================================================*/

'use strict';

import { $, $$ } from './variables/utils.js';
import products from './variables/products.js';
import addHomeAnimation from './home-animation.js';
import renderTrendingProducts from './views/trending-products.js';
import renderInCartProducts from './views/in-cart-products.js';
import toast from './views/toast.js';

const toggleMenuBtn = $('.js-toggle-menu');
const menu = $('.js-menu');
const header = $('.header');
const navCartQty = $$('.nav-cart__qty');
const invoiceQty = $('.invoice-qty');
const invoiceTotal = $$('.invoice-total');
const PRODUCT_STORAGE_KEY = 'IN_CART_PRODUCT';

const app = {
  products,
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
  renderTrendingProducts,
  renderInCartProducts,
  addHomeAnimation,
  renderHomeProducts: function () {
    this.renderTrendingProducts();
  },
  renderCartPage: function () {
    this.renderInCartProducts();
    this.updateInvoice();
  },
  toast,
  getToast: function () {
    const toastContainer = document.getElementById('toast');
    if (toastContainer && toastContainer.dataset?.json !== '{}') {
      const message = JSON.parse(toastContainer.dataset.json);
      const [type] = Object.keys(message);
      toast({ title: type, message: message[type], type, duration: 3000 });
    }
  },
  start: function () {
    // this.loadStorageProducts();
    // this.updateInCartProducts();
    this.updateCartIcon();
    this.toggleHeader();
    this.handleMenu();
    this.handleEvents();
    this.getToast();
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

export default app;

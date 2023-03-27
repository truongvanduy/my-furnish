import { $, $$ } from './utils.js';

export const toggleMenuBtn = $('.js-toggle-menu');
export const menu = $('.js-menu');
export const header = $('.header');
export const onTrendingElements = $$(
  '.col.col-12.xl-12.lg-7.md-12.sm-12, .col.col-6.xl-6.lg-12.md-6.sm-12'
);
export const topChairs = $$('.product-top .row > .col');
export const accessories = $('.accessories .row');
export const navCartQty = $$('.nav-cart__qty');
export const invoiceQty = $('.invoice-qty');
export const invoiceTotal = $$('.invoice-total');
export const PRODUCT_STORAGE_KEY = 'IN_CART_PRODUCT';

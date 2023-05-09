const MAX_QUANTITY = require('../../config/constants');
const getProductsInCart = require('../../utils/getProductsInCart');
const getSubtotal = require('../../utils/getSubtotal');
const Cart = require('../models/Cart');
const CartDetail = require('../models/CartDetail');

class CartController {
  // [GET] /cart
  async index(req, res, next) {
    try {
      const cart = await Cart.findOne({
        where: {
          userId: req.user.id,
          status: 'active',
        },
      });
      if (!cart) res.send('You have no item in your cart');

      const items = await getProductsInCart(cart.id);
      console.log(items);
      const subtotal = getSubtotal(items);
      if (!items) res.send('You have no item in your cart');

      res.render('pages/cart', {
        items,
        subtotal,
      });
    } catch (e) {
      throw e;
    }
  }

  // [PATCH] /cart/update
  async update(req, res, next) {
    try {
      const detailId = req.body.detailId;
      const quantity = Number(req.body.quantity);
      const detail = await CartDetail.findOne({
        where: {
          id: detailId,
        },
      });
      detail.quantity = quantity;
      await detail.save();

      const cartDetails = await getProductsInCart(res.locals.cartId);
      const subtotal = getSubtotal(cartDetails);

      res.json({
        cartDetails,
        subtotal,
        toastObj: {
          title: 'Success',
          message: 'Your product has been updated.',
          type: 'success',
          duration: 3000,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  // [DELETE] /cart/remove-one
  async removeOne(req, res, next) {
    try {
      const detailId = req.body.detailId;
      const detail = await CartDetail.findOne({
        where: {
          id: detailId,
        },
      });
      await detail.destroy();

      const cartDetails = await getProductsInCart(res.locals.cartId);
      const subtotal = getSubtotal(cartDetails);

      res.json({
        cartDetails,
        subtotal,
        toastObj: {
          title: 'Success',
          message: 'Your product has been removed.',
          type: 'success',
          duration: 3000,
        },
      });
    } catch (e) {
      throw e;
    }
  }

  // [DELETE] /cart/remove-all
  async removeAll(req, res, next) {
    try {
      await CartDetail.destroy({
        where: {
          cartId: res.locals.cartId,
        },
      });

      res.json({
        cartDetails: [],
        subtotal: 0,
        toastObj: {
          title: 'Success',
          message: 'All product have been removed.',
          type: 'success',
          duration: 3000,
        },
      });
    } catch (e) {
      res.json({
        toastObj: {
          title: 'Error',
          message: e.message,
          type: 'error',
          duration: 3000,
        },
      });
    }
  }

  // [POST] /cart/add
  async addToCart(req, res, next) {
    const productId = req.body.productId;
    const quantity = Number(req.body.quantity);
    let maxQuantityReached = false;

    try {
      let cart = await Cart.findOne({
        where: {
          userId: req.user.id,
          status: 'active',
        },
      });
      // Create new cart if not exists
      if (cart === null) {
        cart = await Cart.create({
          userId: req.user.id,
        });
      }

      // Find for current product in product detail and create one if not exists
      let cartDetail = await CartDetail.findOne({
        where: {
          cartId: cart.id,
          productId: productId,
        },
      });
      if (cartDetail) {
        cartDetail.quantity += quantity;
        if (cartDetail.quantity > MAX_QUANTITY) {
          cartDetail.quantity = MAX_QUANTITY;
          maxQuantityReached = true;
        }
        await cartDetail.save();
      } else {
        await CartDetail.create({
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
        });
      }
      if (maxQuantityReached) {
        res.json({
          error: ['You can only buy at most 5 product'],
        });
      } else {
        res.json({
          success: ['Your product has been added to cart.'],
        });
      }
    } catch (e) {
      throw e;
    }
  }

  // [GET] /checkout
  checkout(req, res, next) {
    res.render('pages/checkout');
  }

  notFound(req, res, next) {
    res.render('pages/404-not-found');
  }
}

module.exports = new CartController();

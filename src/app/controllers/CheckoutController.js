const { SHIPPING_COST } = require('../../config/constants');
const getProductsInCart = require('../../utils/getProductsInCart');
const getSubtotal = require('../../utils/getSubtotal');
const Cart = require('../models/Cart');
const User = require('../models/User');
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');

class CheckoutController {
  // [GET] /checkout
  async index(req, res, next) {
    try {
      const cartDetails = await getProductsInCart(res.locals.cartId);

      res.render('pages/checkout', {
        cartDetails,
      });
    } catch (e) {
      throw e;
    }
  }

  // [POST] /checkout
  async checkout(req, res, next) {
    try {
      const fullName = req.body['full-name'];
      const paymentMethod = req.body['payment-method'];
      console.log(paymentMethod);
      const { tel, address } = req.body;

      // Update user profile
      const user = await User.findOne({
        where: {
          id: req.user.id,
        },
      });
      user.set({
        fullName,
        tel,
        address,
      });
      await user.save();

      // Update product quantity
      const cartDetails = await getProductsInCart(res.locals.cartId);
      const productIds = cartDetails.map((detail) => detail.productId);
      const products = await Product.findAll({
        where: {
          id: productIds,
        },
      });
      products.forEach(async (product, index) => {
        product.quantity -= cartDetails[index].quantity;
        await product.save();
      });

      // Create order
      const shippingCost = SHIPPING_COST;
      const subtotal = getSubtotal(cartDetails);
      const order = await Order.create({
        userId: req.user.id,
        paymentMethod,
        subtotal,
        shippingCost,
        totalPrice: subtotal + shippingCost,
      });

      cartDetails.forEach(async (detail) => {
        await OrderDetail.create({
          orderId: order.id,
          productId: detail.productId,
          quantity: detail.quantity,
          price: detail.product.price,
        });
      });

      // change cart status to 'archieved'
      const cart = await Cart.findOne({
        where: {
          id: res.locals.cartId,
        },
      });
      cart.status = 'archieved';
      await cart.save();

      req.flash('success', 'Your order is being processed');
      res.redirect('/user/order');
    } catch (e) {
      req.flash('error', e.message);
      res.redirect('/checkout');
    }
  }
  notFound(req, res, next) {
    res.render('pages/404-not-found');
  }
}

module.exports = new CheckoutController();

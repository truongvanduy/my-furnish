const Cart = require('../models/Cart');
const CartDetail = require('../models/CartDetail');
const Category = require('../models/Category');
const Product = require('../models/Product');

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

      const items = await CartDetail.findAll({
        where: {
          cartId: cart.id,
        },
        include: [
          {
            model: Product,
            include: Category,
          },
        ],
      });
      if (!items) res.send('You have no item in your cart');

      res.render('pages/cart', {
        items,
      });
    } catch (e) {
      throw e;
    }
  }

  // [POST /cart/add
  async addToCart(req, res, next) {
    const productId = req.body.productId;
    const quantity = Number(req.body.quantity);

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
        await cartDetail.save();
      } else {
        await CartDetail.create({
          cartId: cart.id,
          productId: productId,
          quantity: quantity,
        });
      }

      res.json({
        success: ['Your product has been added to cart.'],
      });
    } catch (e) {
      throw e;
    }
  }

  notFound(req, res, next) {
    res.render('pages/404-not-found');
  }

  cart(req, res, next) {
    res.render('pages/cart');
  }
}

module.exports = new CartController();

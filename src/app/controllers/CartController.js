const Cart = require('../models/Cart');
const CartDetail = require('../models/CartDetail');
const Category = require('../models/Category');
const Product = require('../models/Product');

async function getCartProduct(cartId) {
  try {
    return await CartDetail.findAll({
      where: {
        cartId,
      },
      include: [
        {
          model: Product,
          include: Category,
        },
      ],
    });
  } catch (e) {
    throw e;
  }
}

function getSubtotal(cartDetails) {
  return cartDetails.reduce(
    (subtotal, currentDetail) =>
      subtotal + currentDetail.quantity * currentDetail.product.price,
    0
  );
}

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

      const items = await getCartProduct(cart.id);
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

      const cartDetails = await getCartProduct(res.locals.cartId);
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

  // [DELETE] /cart/remove
  async removeOne(req, res, next) {
    try {
      const detailId = req.body.detailId;
      const detail = await CartDetail.findOne({
        where: {
          id: detailId,
        },
      });
      await detail.destroy();

      const cartDetails = await getCartProduct(res.locals.cartId);
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

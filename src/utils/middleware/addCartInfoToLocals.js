const Cart = require('../../app/models/Cart');
const CartDetail = require('../../app/models/CartDetail');

module.exports = async function addCartInfoToLocals(req, res, next) {
  try {
    if (!req.user) {
      return next();
    }

    let cart = await Cart.findOne({
      where: {
        userId: req.user.id,
        status: 'active',
      },
    });

    if (cart === null) {
      cart = await Cart.create({
        userId: req.user.id,
      });
    }

    const details = await CartDetail.findAll({
      where: {
        cartId: cart.id,
      },
    });

    const quantity = details.reduce(
      (totalQty, currentDetail) => totalQty + currentDetail.quantity,
      0
    );

    res.locals.cartId = cart.id;
    res.locals.cartQty = quantity;

    next();
  } catch (e) {
    throw e;
  }
};

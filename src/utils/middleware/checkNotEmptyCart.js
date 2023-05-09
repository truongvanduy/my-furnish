const CartDetail = require('../../app/models/CartDetail');

module.exports = async function checkNotEmptyCart(req, res, next) {
  const cartDetails = await CartDetail.findAll({
    where: {
      cartId: res.locals.cartId,
    },
  });

  if (cartDetails.length) return next();

  req.flash('warning', 'You have no item in your cart');
  res.redirect('/cart');
};

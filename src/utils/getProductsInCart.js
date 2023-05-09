const CartDetail = require('../app/models/CartDetail');
const Category = require('../app/models/Category');
const Product = require('../app/models/Product');

module.exports = async function getProductsInCart(cartId) {
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
};

const getProductsInCart = require('../../utils/getProductsInCart');
const CartDetail = require('../models/CartDetail');
const Product = require('../models/Product');

class SiteController {
  // [GET] /
  index(req, res, next) {
    Promise.all([
      Product.findAll({
        limit: 6,
      }),
      Product.findAll({
        where: {
          categoryId: 2,
        },
        limit: 4,
      }),
      Product.findAll({
        where: {
          categoryId: 3,
        },
        limit: 6,
      }),
    ])
      .then(([trendings, chairs, accessories]) => {
        res.json({
          trendings,
          chairs,
          accessories,
          fullName: req?.user?.fullName,
        });
      })
      // .then(([trendings, chairs, accessories]) => {
      //   res.render('index', {
      //     trendings,
      //     chairs,
      //     accessories,
      //     fullName: req?.user?.fullName,
      //   });
      // })
      .catch(next);
  }

  notFound(req, res, next) {
    res.render('pages/404-not-found');
  }
}

module.exports = new SiteController();

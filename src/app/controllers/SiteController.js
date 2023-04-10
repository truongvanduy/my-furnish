const FurnitureModel = require('../models/Product');

class SiteController {
  // [GET] /
  index(req, res, next) {
    FurnitureModel.getProductsByAtrribute({ category_id: 3 }, (accessories) => {
      res.render('index', {
        accessories,
      });
    });
  }

  notFound(req, res, next) {
    res.render('pages/404-not-found');
  }

  cart(req, res, next) {
    res.render('pages/cart');
  }

  cartBeta(req, res, next) {
    res.render('pages/cart-beta');
  }
}

module.exports = new SiteController();

class SiteController {
  // [GET] /
  index(req, res, next) {
    res.render('index');
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

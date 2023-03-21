class ProductController {
  // [GET] /
  index(req, res, next) {
    res.render('pages/product');
  }
}

module.exports = new ProductController();

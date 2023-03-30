const { mongooseToObjects } = require('../../utils/mongoose');
const Product = require('../models/Product');

class ProductController {
  // [GET] /
  index(req, res, next) {
    Product.getAllProduct((products) => {
      res.render('pages/product', {
        products,
      });
    });
  }

  slug(req, res, next) {
    Product.getProductBySlug(req.params.slug, (product) => {
      res.render('pages/product-detail', {
        product,
      });
    });
  }
}

module.exports = new ProductController();

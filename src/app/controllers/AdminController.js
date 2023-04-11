const CategoryModel = require('../models/Category');
const FurnitureModel = require('../models/Product');
const ProductController = require('./ProductController');

class AdminController {
  // [GET] /
  index(req, res, next) {
    FurnitureModel.getAllProduct((products) => {
      res.render('pages/admin', {
        products,
      });
    });
  }

  manageProduct(req, res, next) {
    FurnitureModel.query(
      `select * from product p join category c 
      on p.category_id = c.category_id
      order by p.product_id asc`,
      [],
      (products) => {
        res.render('pages/manage-product', {
          products,
        });
      }
    );
  }

  loadAddProductPage(req, res, next) {
    CategoryModel.getAllCategory((categories) => {
      res.render('pages/product-create', {
        categories,
      });
    });
  }

  createProduct(req, res, next) {
    const product = req.body;
    FurnitureModel.createProduct(
      [
        product['product-name'],
        product.description,
        product['category-id'],
        product.price,
        product.quantity,
      ],
      () => {
        res.redirect('manage-product');
      }
    );
  }

  loadEditProductPage(req, res, next) {
    let categories = {};
    CategoryModel.getAllCategory((cate) => {
      categories = cate;
    });
    FurnitureModel.getProductById(req.params.slug, (product) => {
      res.render('pages/edit-product', {
        product,
        categories,
      });
    });
  }

  updateProduct(req, res, next) {
    const product = req.body;
    FurnitureModel.updateProductById(
      req.params.id,
      [
        product['product-name'],
        product.description,
        product['category-id'],
        product.price,
        product.quantity,
      ],
      () => {
        res.redirect('../products');
      }
    );
  }

  slug(req, res, next) {
    res.render('pages/404-not-found');
  }
}

module.exports = new AdminController();

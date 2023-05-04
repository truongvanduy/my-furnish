const { default: slugify } = require('slugify');
const Category = require('../models/Category');
const Product = require('../models/Product');
const { Op } = require('sequelize');

class ProductController {
  // [GET] /products
  index(req, res, next) {
    Product.findAll().then((products) => {
      res.render('pages/product/show', {
        products,
      });
    });
  }

  // [GET] /products/:slug
  showDetail(req, res, next) {
    Product.findOne({
      where: {
        slug: req.params.slug,
      },
    })
      .then((product) => {
        res.render('pages/product/detail', {
          product,
          toast: {
            title: 'Hello',
            message: 'You are viewing product ' + product.name,
            type: 'success',
            duration: 30000,
          },
        });
      })
      .catch(next);
  }

  /**============
   * Admin routes
  ============= */

  // [GET] /admin/manage-products
  showManage(req, res, next) {
    // Product.bulkCreate([
    //   {
    //     name: 'Brantwood Everest Oak Steel',
    //     category_id: 1,
    //     quantity: 100,
    //     price: 1799,
    //   },
    //   {
    //     name: 'Eboni Lamp Table',
    //     category_id: 1,
    //     quantity: 100,
    //     price: 599,
    //   },
    //   {
    //     name: 'Tobi End Table',
    //     category_id: 1,
    //     quantity: 100,
    //     price: 229,
    //   },
    //   {
    //     name: 'Emse Chair',
    //     category_id: 1,
    //     quantity: 100,
    //     price: 949,
    //   },
    //   {
    //     name: 'Buckland Ladder',
    //     category_id: 1,
    //     quantity: 100,
    //     price: 499,
    //   },
    //   {
    //     name: 'The Sofology Fifth Avenue',
    //     category_id: 1,
    //     quantity: 100,
    //     price: 3549,
    //   },
    //   {
    //     name: 'Mini LCW Chair',
    //     category_id: 2,
    //     quantity: 100,
    //     price: 299,
    //   },
    //   {
    //     name: 'Sunningdale Chair',
    //     category_id: 2,
    //     quantity: 100,
    //     price: 499,
    //   },
    //   {
    //     name: 'Paddington Chair',
    //     category_id: 2,
    //     quantity: 100,
    //     price: 749,
    //   },
    //   {
    //     name: 'Swivel Accent Chair',
    //     category_id: 2,
    //     quantity: 100,
    //     price: 799,
    //   },
    //   {
    //     name: 'Hemi Floor Lamp',
    //     category_id: 3,
    //     quantity: 100,
    //     price: 399,
    //   },
    //   {
    //     name: 'Bowie Scatter Cushion',
    //     category_id: 3,
    //     quantity: 100,
    //     price: 35,
    //   },
    //   {
    //     name: 'Bangles Mirror',
    //     category_id: 3,
    //     quantity: 100,
    //     price: 249,
    //   },
    //   {
    //     name: 'Dover Rugs Rug',
    //     category_id: 3,
    //     quantity: 100,
    //     price: 299,
    //   },
    //   {
    //     name: 'Marcia Coffee Table',
    //     category_id: 3,
    //     quantity: 100,
    //     price: 849,
    //   },
    //   {
    //     name: 'Captiva Table Lamp',
    //     category_id: 3,
    //     quantity: 100,
    //     price: 149,
    //   },
    // ])
    //   .then(() => {
    //     console.log('created');
    //   })
    //   .catch((err) => {
    //     throw err;
    //   });
    Product.findAll({
      include: Category,
      order: [['id', 'DESC']],
    })
      .then((products) => {
        res.render('pages/product/manage', {
          products,
          toast: req.toast || false,
        });
        req.toast = undefined;
      })
      .catch(next);
  }

  // [GET] /admin/manage-products/create
  showCreate(req, res, next) {
    Category.findAll()
      .then((categories) => {
        res.render('pages/product/create', {
          categories,
        });
      })
      .catch(next);
  }

  // [POST] /admin/manage-products/create
  create(req, res, next) {
    const { name, description, categoryId, quantity, price } = req.body;
    const slug = slugify(name, {
      remove: /[*+~.()'"!:@]/g,
      lower: true,
      strict: true,
    });
    Product.create({ name, description, categoryId, quantity, price, slug })
      .then(() => {
        req.flash('success', 'New product was successfully added');
        res.redirect('../manage-products');
      })
      .catch((e) => {
        throw e;
      });
  }

  // [GET] /admin/manage-products/:id/edit
  showUpdate(req, res, next) {
    Promise.all([Category.findAll(), Product.findByPk(req.params.id)])
      .then(([categories, product]) => {
        res.render('pages/product/edit', {
          categories,
          product,
        });
      })
      .catch(next);
  }

  // [PUT] /admin/manage-products/:id
  update(req, res, next) {
    const { name, description, categoryId, quantity, price } = req.body;
    Product.update(
      { name, description, categoryId, quantity, price },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(() => {
        res.redirect('../manage-products');
      })
      .catch(next);
  }

  // [PATCH] /admin/manage-products/:id
  softDelete(req, res, next) {
    Product.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        res.redirect('../manage-products');
      })
      .catch(next);
  }

  // [GET] /admin/deleted-products
  showDeleted(req, res, next) {
    Product.findAll({
      include: Category,
      order: [['id', 'DESC']],
      paranoid: false,
      where: {
        deletedAt: { [Op.not]: null },
      },
    })
      .then((products) => {
        res.render('pages/product/deleted', {
          products,
        });
      })
      .catch(next);
  }

  // [PATCH] /admin/deleted-products/:id
  restore(req, res, next) {
    Product.restore({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        res.redirect('back');
      })
      .catch(next);
  }

  // [DELETE] /admin/deleted-products/:id
  destroy(req, res, next) {
    Product.destroy({
      where: {
        id: req.params.id,
      },
      force: true,
    })
      .then(() => {
        res.redirect('back');
      })
      .catch(next);
  }
}
module.exports = new ProductController();

const { connection } = require('../../config/database');

const FurnitureModel = {};

FurnitureModel.createProduct = function (productData, callback) {};

FurnitureModel.getProductById = function (productId, callback) {
  connection.query(
    `SELECT * FROM product WHERE id = ${productId}`,
    (error, results) => {
      if (error) throw error;
      callback(results[0]);
    }
  );
};
FurnitureModel.getProductBySlug = function (slug, callback) {
  connection.query(
    `SELECT * FROM product WHERE slug = '${slug}'`,
    (error, results) => {
      if (error) throw error;
      callback(results[0]);
    }
  );
};

FurnitureModel.getAllProduct = function (callback) {
  connection.query('SELECT * FROM product', (error, results) => {
    if (error) throw error;
    callback(results);
  });
};

module.exports = FurnitureModel;

/**=====================
 * Mongoose Object Model
===================== */

// const { default: mongoose } = require('mongoose');
// const { Schema } = mongoose;
// const slug = require('mongoose-slug-generator');
// const MongooseDelete = require('mongoose-delete');

// const Product = new Schema({
//   name: {
//     type: String,
//     default: '',
//     maxLength: 255,
//     required: true,
//     unique: true,
//   },
//   imgSrc: { type: String, default: '' },
//   category: { type: String, default: '', required: true },
//   price: { type: Number, default: 0, required: true },
//   quantity: { type: Number, default: 0, required: true },
//   slug: { type: String, slug: 'name', unique: true },
// });

// mongoose.plugin(slug);
// Product.plugin(MongooseDelete, {
//   deletedAt: true,
//   deletedBy: true,
//   overrideMethods: 'all',
// });

// module.exports = mongoose.model('Product', Product);

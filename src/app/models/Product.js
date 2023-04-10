const { connection } = require('../../config/database');
const { queryCallback } = require('../../utils/mysql');

const FurnitureModel = {
  createProduct: function (newProduct, callback) {
    connection.execute(
      'INSERT INTO product VALUES (null, ?, ?, ?, ?, ?, null)',
      newProduct,
      (err, results) => {
        if (err) throw err;
        callback(results);
      }
    );
  },

  updateProductById: function (id, data, callback) {
    connection.execute(
      `UPDATE product SET product_name= ? ,
                          description= ? ,
                          category_id= ? ,
                          quantity= ?,
                          price= ?
      WHERE product_id = ? `,
      [...data, id],
      queryCallback(callback)
    );
  },

  getProductById: function (productId, callback) {
    connection.execute(
      `SELECT * FROM product WHERE product_id = ?`,
      [productId],
      (error, results) => {
        if (error) throw error;
        callback(results[0]);
      }
    );
  },
  getProductBySlug: function (slug, callback) {
    connection.query(
      `SELECT * FROM product WHERE slug = '${slug}'`,
      (error, results) => {
        if (error) throw error;
        callback(results[0]);
      }
    );
  },

  getProductsByAtrribute: function (attr, callback) {
    const key = Object.keys(attr);
    const value = attr[key];
    connection.query(
      `SELECT * FROM product WHERE ${key} = '${value}'`,
      queryCallback(callback)
    );
  },

  getAllProduct: function (callback) {
    connection.query('SELECT * FROM product', (error, results) => {
      if (error) throw error;
      callback(results);
    });
  },

  query: function (query, params, callback) {
    connection.query(query, params, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  },
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

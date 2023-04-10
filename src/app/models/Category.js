const { connection } = require('../../config/database');

const CategoryModel = {};

CategoryModel.create = (id, name) => {
  return new Promise((resolve, reject) => {
    db.execute(
      'INSERT INTO category VALUES (?, ?)',
      [id, name],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId);
        }
      }
    );
  });
};

CategoryModel.getCategoryById = function (categoryId, callback) {
  connection
    .promise()
    .query('SELECT * FROM `category` WHERE `id` = ?', (error, results) => {
      if (error) throw error;
      callback(results[0]);
    });
};

CategoryModel.getCategorysByAtrribute = function (attr, callback) {
  const key = Object.keys(attr);
  const value = attr[key];
  connection.query(
    `SELECT * FROM category WHERE ${key} = '${value}'`,
    (error, results) => {
      if (error) throw error;
      callback(results);
    }
  );
};

CategoryModel.getAllCategory = function (callback) {
  connection.query('SELECT * FROM category', (error, results) => {
    if (error) throw error;
    callback(results);
  });
};

module.exports = CategoryModel;

/**=====================
 * Mongoose Object Model
===================== */

// const { default: mongoose } = require('mongoose');
// const { Schema } = mongoose;
// const slug = require('mongoose-slug-generator');
// const MongooseDelete = require('mongoose-delete');

// const Category = new Schema({
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
// Category.plugin(MongooseDelete, {
//   deletedAt: true,
//   deletedBy: true,
//   overrideMethods: 'all',
// });

// module.exports = mongoose.model('Category', Category);

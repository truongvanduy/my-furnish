const Category = require('./Category');
const { sequelize, Sequelize } = require('./index');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    tel: {
      type: DataTypes.STRING(15),
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {
    underscored: true,
    paranoid: true,
  }
);

// Category.hasMany(Product, { foreignKey: 'category_id' });
// Product.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = Product;

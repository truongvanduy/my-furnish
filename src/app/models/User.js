const Category = require('./Category');
const { sequelize, Sequelize } = require('./index');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    tel: {
      type: DataTypes.STRING(15),
      unique: true,
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

module.exports = User;

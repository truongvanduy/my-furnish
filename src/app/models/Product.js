const Category = require('./Category');
const { sequelize, Sequelize } = require('./index');
const { DataTypes } = require('sequelize');

const Product = sequelize.define(
  'product',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      defaultValue:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis optio pariatur omnis repellat quibusdam soluta tenetur veritatis nobis reprehenderit quidem aliquam architecto temporibus culpa ab, tempore ullam cupiditate blanditiis vero.',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
  },
  {
    underscored: true,
    paranoid: true,
    initialAutoIncrement: 1,
  }
);

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Product;



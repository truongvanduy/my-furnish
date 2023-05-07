const { sequelize, Sequelize } = require('./index');
const { DataTypes } = require('sequelize');

const Cart = require('./Cart');
const Product = require('./Product');

const CartDetail = sequelize.define(
  'CartDetail',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    // cartId: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    //   references: {
    //     model: 'cart',
    //     key: 'id',
    //   },
    // },
    // productId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'product',
    //     key: 'id',
    //   },
    // },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

// Associations

Cart.hasMany(CartDetail, { foreignKey: 'cartId' });
CartDetail.belongsTo(Cart, { foreignKey: 'cartId' });

Product.hasMany(CartDetail, { foreignKey: 'productId' });
CartDetail.belongsTo(Product, { foreignKey: 'productId' });

module.exports = CartDetail;

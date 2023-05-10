const { sequelize, Sequelize } = require('./index');
const { DataTypes } = require('sequelize');

const Order = require('./Order');
const Product = require('./Product');

const OrderDetail = sequelize.define(
  'OrderDetail',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

// Define the relationships between orders and order_details

Order.hasMany(OrderDetail, { foreignKey: 'orderId' });
OrderDetail.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderDetail, { foreignKey: 'productId' });
OrderDetail.belongsTo(Product, { foreignKey: 'productId' });

module.exports = OrderDetail;

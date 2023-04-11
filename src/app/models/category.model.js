const { sequelize, Sequelize } = require('./index');
const { DataTypes } = require('sequelize');

const Category = sequelize.define(
  'category',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    underscored: true,
  }
);

module.exports = Category;

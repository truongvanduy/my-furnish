const { sequelize, Sequelize } = require('./index');
const { DataTypes } = require('sequelize');
const hashPassword = require('../../config/bcrypt.config');

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
    role: {
      type: DataTypes.ENUM(['admin', 'basic']),
      defaultValue: 'basic',
    },
  },
  {
    underscored: true,
    paranoid: true,
  }
);

User.beforeCreate(async (user) => {
  user.password = await hashPassword(user.password);
});

// User.create({
//   email: 'root@dtv.team',
//   password: 'root',
//   fullName: 'Duy Truong Van',
//   role: 'admin',
// });

// Category.hasMany(Product, { foreignKey: 'category_id' });
// Product.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = User;

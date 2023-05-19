const { sequelize, Sequelize } = require('./index');
const { DataTypes } = require('sequelize');
const User = require('./User');

const Cart = sequelize.define(
  'Cart',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(['active', 'archieved', 'expired']),
      defaultValue: 'active',
      allowNull: false,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  },
  {
    underscored: true,
  }
);

User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// const abc = Cart.create({
//   userId: 'aa4b3d5a-efc5-4d32-a4aa-60beb16e8841',
// }).then((abcd) => console.log(abcd));

// Add a hook to update the cart status when expiration date is reached
let isBeforeFindHookRunning = false;

Cart.beforeFind(async (options) => {
  if (isBeforeFindHookRunning) {
    return;
  }
  isBeforeFindHookRunning = true;

  const carts = await Cart.findAll({ where: { status: 'active' } });
  const expiredCarts = carts.filter(
    (cart) => new Date(cart.expirationDate) <= new Date()
  );
  if (expiredCarts.length > 0) {
    await Cart.update(
      { status: 'expired' },
      { where: { id: expiredCarts.map((cart) => cart.id) } }
    );
  }

  isBeforeFindHookRunning = false;
});

module.exports = Cart;

const bcrypt = require('bcrypt');
const SALT_ROUND = 10;

module.exports = async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);
    return hashedPassword;
  } catch (e) {
    throw e;
  }
};

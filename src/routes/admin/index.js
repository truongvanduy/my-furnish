const express = require('express');
const router = express.Router();
const adminProductRouter = require('./product');
const deletedProductRouter = require('./product-deleted');
const checkAuthenticated = require('../../utils/middleware/checkAuthenticated');
const checkIsAdmin = require('../../utils/middleware/checkIsAdmin');

router.use(
  '/manage-products',
  checkAuthenticated,
  checkIsAdmin,
  adminProductRouter
);
router.use(
  '/deleted-products',
  checkAuthenticated,
  checkIsAdmin,
  adminProductRouter,
  deletedProductRouter
);

module.exports = router;

const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const authController = require('../app/controllers/AuthController');
const checkAuthenticated = require('../utils/middleware/checkAuthenticated');
const addCartInfoToLocals = require('../utils/middleware/addCartInfoToLocals');
const CartController = require('../app/controllers/CartController');
const checkNotEmptyCart = require('../utils/middleware/checkNotEmptyCart');
const SiteController = require('../app/controllers/SiteController');
const CheckoutController = require('../app/controllers/CheckoutController');

router.get('/sign-in', authController.showSignIn);
router.post('/sign-in', authController.signIn, addCartInfoToLocals);
router.get('/sign-up', authController.showSignUp);
router.post('/sign-up', authController.signUp);
router.get(
  '/checkout',
  checkAuthenticated,
  checkNotEmptyCart,
  CheckoutController.index
);
router.post(
  '/checkout',
  checkAuthenticated,
  checkNotEmptyCart,
  CheckoutController.checkout
);
router.post('/sign-out', authController.signOut);
router.get('/', siteController.index);
router.get('/:slug', siteController.notFound);

module.exports = router;

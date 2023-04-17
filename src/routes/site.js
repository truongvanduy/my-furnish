const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/login', siteController.showLogin);
router.get('/sign-up', siteController.showSignUp);
router.get('/cart-beta', siteController.cartBeta);
router.get('/cart', siteController.cart);
router.get('/', siteController.index);
router.get('/:slug', siteController.notFound);

module.exports = router;

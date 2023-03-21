const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/cart', siteController.cart);
router.get('/', siteController.index);
router.get('/:slug', siteController.notFound);

module.exports = router;

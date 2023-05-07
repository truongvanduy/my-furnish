const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');
const checkAuthenticated = require('../utils/middleware/checkAuthenticated');

router.post('/add', cartController.addToCart);
router.patch('/update', cartController.update);
router.delete('/remove', cartController.remove);
router.get('/', checkAuthenticated, cartController.index);
router.get('/:slug', cartController.notFound);

module.exports = router;

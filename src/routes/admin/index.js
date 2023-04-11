const express = require('express');
const router = express.Router();
const adminProductRouter = require('./product');

const adminController = require('../../app/controllers/AdminController');

router.use('/manage-products', adminProductRouter);
router.get('/add-product', adminController.loadAddProductPage);
router.post('/add-product', adminController.createProduct);
router.use('/manage-product', adminController.manageProduct);
router.get('/', adminController.index);
router.get('/:slug', adminController.slug);

module.exports = router;

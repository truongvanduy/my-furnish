const express = require('express');
const router = express.Router();
const adminProductRouter = require('./product');
const deletedProductRouter = require('./product-deleted');

const adminController = require('../../app/controllers/AdminController');
const ProductController = require('../../app/controllers/ProductController');

router.use('/manage-products', adminProductRouter);
router.use('/deleted-products', deletedProductRouter);
router.get('/', adminController.index);
router.get('/:slug', adminController.slug);

module.exports = router;

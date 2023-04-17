const express = require('express');
const router = express.Router();
const adminProductRouter = require('./product');
const deletedProductRouter = require('./product-deleted');

router.use('/manage-products', adminProductRouter);
router.use('/deleted-products', deletedProductRouter);

module.exports = router;

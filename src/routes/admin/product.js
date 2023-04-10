const express = require('express');
const router = express.Router();

const adminController = require('../../app/controllers/AdminController');

router.put('/:id', adminController.updateProduct);
router.get('/', adminController.manageProduct);
router.get('/:slug/edit', adminController.loadEditProductPage);

module.exports = router;

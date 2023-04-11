const express = require('express');
const router = express.Router();

const ProductController = require('../../app/controllers/ProductController');

router.patch('/:id', ProductController.restore);
router.delete('/:id', ProductController.destroy);
router.get('/', ProductController.showDeleted);

module.exports = router;

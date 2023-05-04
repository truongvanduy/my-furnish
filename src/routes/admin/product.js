const express = require('express');
const router = express.Router();

const ProductController = require('../../app/controllers/ProductController');

router.get('/create', ProductController.showCreate);
router.post('/create', ProductController.create, ProductController.showManage);
router.get('/:id/edit', ProductController.showUpdate);
router.put('/:id', ProductController.update);
router.patch('/:id', ProductController.softDelete);
router.get('/', ProductController.showManage);

module.exports = router;

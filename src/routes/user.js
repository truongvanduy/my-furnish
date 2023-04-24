const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

router.get('/profile', userController.showProfile);
router.get('/order', userController.showOrder);
router.get('/', userController.index);
router.get('/:slug', userController.notFound);

module.exports = router;

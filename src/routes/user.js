const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');
const checkAuthenticated = require('../utils/middleware/checkAuthenticated');

router.get('/profile', checkAuthenticated, userController.showProfile);
router.post('/profile', checkAuthenticated, userController.updateProfile);
router.get('/order', checkAuthenticated, userController.showOrder);
router.get('/', checkAuthenticated, userController.index);
router.get('/:slug', userController.notFound);

module.exports = router;

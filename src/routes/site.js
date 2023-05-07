const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const authController = require('../app/controllers/AuthController');
const addCartInfoToLocal = require('../utils/middleware/addCartInfoToLocals');

router.get('/sign-in', authController.showSignIn);
router.post('/sign-in', authController.signIn, addCartInfoToLocal);
router.get('/sign-up', authController.showSignUp);
router.post('/sign-up', authController.signUp);
router.get('/', siteController.index);
router.get('/:slug', siteController.notFound);

module.exports = router;

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const passport = require('passport');

class AuthController {
  // [GET] /
  index(req, res, next) {
    Promise.all([
      Product.findAll({
        limit: 6,
      }),
      Product.findAll({
        where: {
          categoryId: 2,
        },
        limit: 4,
      }),
      Product.findAll({
        where: {
          categoryId: 3,
        },
        limit: 6,
      }),
    ])
      .then(([trendings, chairs, accessories]) => {
        res.render('index', {
          trendings,
          chairs,
          accessories,
        });
      })
      .catch(next);
  }

  // [GET] /sign-in
  showSignIn(req, res, next) {
    res.render('pages/sign-in');
  }

  // [POST] /sign-in
  signIn(req, res, next) {
    // Check if user signs in from a different page from home page
    const redirectUrl = req.query.redirect || '/';
    passport.authenticate('local', {
      successRedirect: redirectUrl,
      failureRedirect: '/sign-in',
      failureFlash: true,
    })(req, res, next);
  }

  // [GET] /sign-up
  showSignUp(req, res, next) {
    res.render('pages/sign-up');
  }

  // [POST] /sign-up
  async signUp(req, res, next) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await User.create({
        fullName: req.body['full-name'],
        email: req.body.email,
        password: hashedPassword,
      });
      res.redirect('/sign-in');
    } catch (err) {
      res.send(err);
      res.redirect('back');
    }
  }

  notFound(req, res, next) {
    res.render('pages/404-not-found');
  }
}

module.exports = new AuthController();
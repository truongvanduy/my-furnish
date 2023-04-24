const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const passport = require('passport');
const addUserInfoToLocals = require('../../utils/middleware/addUserInfoToLocals');

class UserController {
  // [GET] /user
  index(req, res, next) {
    res.redirect('profile');
  }

  // [GET] /user/profile
  showProfile(req, res, next) {
    res.render('pages/user/profile');
  }

  // [POST] /user/profile
  updateProfile(req, res, next) {
    User.findOne({
      where: {
        id: req.user.id,
      },
    })
      .then((user) => {
        user.set({
          fullName: req.body['full-name'],
          tel: req.body.tel,
          address: req.body.address,
        });
        return user.save();
      })
      .then((user) => {
        console.log(user);
        res.render('pages/user/profile', {
          user,
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  // [POST] /sign-in
  signIn(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/sign-in',
      failureFlash: true,
    })(req, res, next);
  }

  // [GET] /sign-up
  showOrder(req, res, next) {
    res.render('pages/user/order');
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

module.exports = new UserController();

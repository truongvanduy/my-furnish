const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const passport = require('passport');
const addUserInfoToLocals = require('../../utils/middleware/addUserInfoToLocals');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Category = require('../models/Category');
const OrderDetail = require('../models/OrderDetail');

class UserController {
  // [GET] /user
  index(req, res, next) {
    res.redirect('profile');
  }

  // [GET] /user/profile
  showProfile(req, res, next) {
    User.findOne({
      where: {
        id: req.user.id,
      },
    }).then((user) => {
      res.render('pages/user/profile', {
        user,
      });
    });
  }

  // [PUT] /user/profile
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
      .then(() => {
        req.flash('success', 'Your info has been updated');
        res.redirect('back');
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
  async showOrder(req, res, next) {
    try {
      const orders = await Order.findAll({
        where: {
          userId: req.user.id,
        },
      });
      // For each order, get the 1st product detail and number of products
      const orderInfos = await Promise.all(
        orders.map(async (order) => {
          const orderDetails = await OrderDetail.findAll({
            where: {
              orderId: order.id,
            },
            include: [
              {
                model: Product,
                include: Category,
              },
            ],
          });
          return {
            ...order,
            orderDetail: orderDetails[0],
            length: orderDetails.length,
          };
        })
      );
      console.log(orderInfos[0].dataValues.totalPrice);
      res.render('pages/user/order', {
        orderInfos,
      });
    } catch (e) {
      req.flash('error', e.message);
      res.redirect('back');
    }
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

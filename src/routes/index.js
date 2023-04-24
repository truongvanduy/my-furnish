const siteRouter = require('./site');
const productRouter = require('./product');
const adminRouter = require('./admin');
const userRouter = require('./user');

function route(app) {
  app.use('/products', productRouter);
  app.use('/admin', adminRouter);
  app.use('/user', userRouter);
  app.use('/', siteRouter);
}

module.exports = route;

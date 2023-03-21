const siteRouter = require('./site');
const productRouter = require('./product');

function route(app) {
  app.use('/products', productRouter);
  app.use('/', siteRouter);
}

module.exports = route;

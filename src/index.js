const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const port = 3000;

const route = require('./routes');

// Connect to database
const db = require('./app/models/index');
db.sequelize.sync();

// Config static files
app.use(express.static(path.join(__dirname, 'public')));

// Apply middleware to req.body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// HTTP logger
app.use(morgan('dev'));

// Template engine PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Override method
app.use(methodOverride('_method'));

// Routing
route(app);

app.listen(port, () => {
  console.log(`MyFurnish listening on port ${port}`);
});

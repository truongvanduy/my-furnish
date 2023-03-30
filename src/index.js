const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const port = 3000;

const route = require('./routes');
const { connection } = require('./config/database');

// Connect to database
connection.connect();

// Config static files
app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('dev'));

// Template engine PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routing

route(app);

app.listen(port, () => {
  console.log(`MyFurnish listening on port ${port}`);
});

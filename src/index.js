if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const moment = require('moment');
const cors = require('cors');

const port = 3000;
const route = require('./routes');
const db = require('./app/models/index');
const User = require('./app/models/User');
const initializePassport = require('./config/passport.config');
const addUserInfoToLocals = require('./utils/middleware/addUserInfoToLocals');
const addCartInfoToLocals = require('./utils/middleware/addCartInfoToLocals');

// Initialize passport
initializePassport(
  passport,
  async (email) => {
    const user = await User.findOne({ where: { email: email } });
    return user;
  },
  () => {}
);

app.use(cors());
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Connect to database
db.sequelize.sync();

// Config static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
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
app.use(addUserInfoToLocals);
app.use(addCartInfoToLocals);
route(app);

app.listen(port, () => {
  console.log(`MyFurnish listening on port ${port}`);
});

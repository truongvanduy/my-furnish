module.exports = function checkAuthenticated(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  req.flash('error', 'You do not have permission to access this page');
  res.redirect('/');
};

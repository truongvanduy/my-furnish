module.exports = function addUserInfoToLocals(req, res, next) {
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
};

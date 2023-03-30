module.exports = {
  mongooseToObjects: (arr) => arr.map((constructor) => constructor.toObject()),
  mongooseToObject: (constructor) => constructor && constructor.toObject(),
};

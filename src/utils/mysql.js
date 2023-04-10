module.exports = {
  queryCallback(callback) {
    return (err, results) => {
      if (err) throw err;
      callback(results);
    };
  },
};

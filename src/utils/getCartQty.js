module.exports = function getCartQty(cartDetails) {
  return cartDetails.reduce(
    (totalQty, currentDetail) => totalQty + currentDetail.quantity,
    0
  );
};

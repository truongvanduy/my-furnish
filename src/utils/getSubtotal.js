module.exports = function getSubtotal(cartDetails) {
  return cartDetails.reduce(
    (subtotal, currentDetail) =>
      subtotal + currentDetail.quantity * currentDetail.product.price,
    0
  );
};

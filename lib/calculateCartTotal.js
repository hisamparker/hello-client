const calculateCartTotal = (cart) =>
  cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally; // incase cart item was deleted while in someone's cart
    return tally + cartItem.product.price;
  }, 0);
export default calculateCartTotal;

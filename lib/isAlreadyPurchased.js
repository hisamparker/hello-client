export const isAlreadyPurchased = (user, data, productId) => {
  if (user && data.authenticatedItem) {
    return data.authenticatedItem.tutorials.some(
      (tutorial) => tutorial.product.id === productId
    );
  }
  return false;
};

const getTotal = (cart) => {
  // console.log(cart);
  let totalAmount = 0;
  let totalCost = 0;

  for (let { amount, price } of cart.values()) {
    totalAmount += amount;
    totalCost += amount * price;
  }

  totalCost = totalCost.toFixed(2);

  return { totalAmount, totalCost };
};

export default getTotal;

// for (let item of cart.values()) {
//   console.log(item);
// }

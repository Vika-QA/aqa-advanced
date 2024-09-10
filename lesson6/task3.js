function checkOrder(available, ordered) {
  if (typeof available !== "number" || typeof ordered !== "number") {
    return "Not correct data";
  }
  if (available < 0 || ordered < 0) {
    return "Qty must be bigger than 0";
  }
  if (available < ordered) {
    return "Your order is too large, we don't have enough goods";
  }
  if (!ordered) {
    return "Your order is empty";
  }
  return "Your order is accepted";
}

console.log(checkOrder("string", 4));
console.log(checkOrder(-5, 4));
console.log(checkOrder(100, 120));
console.log(checkOrder(100, 0));
console.log(checkOrder(100, 4));

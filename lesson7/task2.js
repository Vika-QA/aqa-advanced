function decreaseCounter(num) {
  console.log(num);
  if (num <= 0) {
    console.log("The countdown has reached 0");
    return;
  }

  decreaseCounter(num - 1);
}
decreaseCounter(5);

function handleNum(number, callbackEven, callbackOdd) {
  if (typeof number !== "number") {
    console.log("Argument must be a number");
    return;
  }

  if (number % 2 == 0) {
    callbackEven();
  } else {
    callbackOdd();
  }
}

function handleEven() {
  console.log("This is an even number");
}

function handleOdd() {
  console.log("This is an odd number");
}

handleNum(4, handleEven, handleOdd);
handleNum(1, handleEven, handleOdd);
handleNum("5", handleEven, handleOdd);
handleNum("test", handleEven, handleOdd);

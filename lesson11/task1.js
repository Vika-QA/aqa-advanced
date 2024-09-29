function setTimeoutText(text, delayTime) {
  setTimeout(() => {
    console.log(text);
  }, delayTime);
}

setTimeoutText(
  "EBASH, if you want to know JS well, study a lot and hard",
  3000
);

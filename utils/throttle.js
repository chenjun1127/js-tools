function throttle(func, delay) {
  let lastTime = 0;
  return function (...args) {
    const currentTime = Date.now();
    if (currentTime - lastTime >= delay) {
      func.apply(this, args);
      lastTime = currentTime;
    }
  };
}

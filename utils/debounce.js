function debounce(fnc, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fnc.apply(this, args);
    }, delay);
  };
}

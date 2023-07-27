// ...args是一个使用扩展语法（Spread Syntax）的语法，它表示一个参数数组。
function debounce(func, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
/*
 * 使用
function handleResize() {
  console.log('Window resized');
}

const debouncedResize = debounce(handleResize, 200);

window.addEventListener('resize', debouncedResize);
*/

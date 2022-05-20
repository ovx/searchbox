export function debounce(fn: (...args: unknown[]) => void, delay: number) {
  let timeout: any;
  return (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

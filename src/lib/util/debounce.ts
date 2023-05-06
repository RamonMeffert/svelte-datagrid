/**
 * Type-safe debounce function.
 * 
 * Based on the discussion in
 * {@link https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940 this gist}
 * @param func The function to debounce
 * @param delay Time (in ms) of no calls before `func` is executed.
 */
export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  delay: number,
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

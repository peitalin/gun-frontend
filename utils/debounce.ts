import * as React from "react"

// https://redd.one/blog/debounce-vs-throttle
export function debounce(func, duration) {
  let timeout
  return function (...args) {
    const effect = () => {
      timeout = null
      return func.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(effect, duration)
  }
}


// Hook
export function useDebounce(
  func,
  dependencies,
  delay: number
) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = React.useState(dependencies);
  React.useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(dependencies);
        func()
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [...dependencies, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}
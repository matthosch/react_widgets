import { useEffect, useState } from "react";

export default function useDebounce(param, delay) {
  const [debouncedValue, setDebouncedValue] = useState(param);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(param);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [param, delay]);

  return debouncedValue;
}

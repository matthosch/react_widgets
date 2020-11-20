import { useEffect, useState } from "react";

const useDebounce = (param, delay) => {
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
};

export default useDebounce;
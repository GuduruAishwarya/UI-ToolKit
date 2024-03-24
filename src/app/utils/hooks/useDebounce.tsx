import {useRef} from 'react';

export default function useDebounce<Params extends any[]>(callback: (...args: Params) => any, timeout: number = 300) {
  const timer = useRef<NodeJS.Timeout | undefined>(undefined);
  const debouncedCallback = (...args: Params) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => callback(...args), timeout);
  };
  return debouncedCallback;
}

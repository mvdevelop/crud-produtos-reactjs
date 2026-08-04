// TypeScript version of useDebounce.js

/**
 * Custom hook for debouncing values and function calls
 *
 * Provides debouncing functionality to optimize performance by
 * delaying updates until after a specified wait time has elapsed
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for debouncing a value
 *
 * @param {T} value - The value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {T} Debounced value
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook for debouncing a function call
 *
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @param {Array} deps - Dependencies array
 * @returns {Function} Debounced function
 */
export const useDebounceCallback = <T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  deps: any[] = []
): ((...args: Parameters<T>) => void) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        func(...args);
      }, delay);

      setTimeoutId(newTimeoutId);
    },
    [func, delay, ...deps]
  );

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return debouncedCallback;
};
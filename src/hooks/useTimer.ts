import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { getPrimes } from "../lib/math";

export const useTimer = (
  limit: number
): {
  timeLeft: number;
  isPrime: boolean;
  reset: () => void;
} => {
  const [timeLeft, setTimeLeft] = useState(limit);
  const timerId = useRef<NodeJS.Timer>();

  const primes = useMemo(() => getPrimes(limit), [limit]);
  const tick = () => setTimeLeft((prev) => prev - 1);
  const clearTimer = () => {
    if (timerId.current !== undefined) {
      clearInterval(timerId.current);
    }
  };
  const reset = useCallback(() => {
    clearTimer();
    timerId.current = setInterval(tick, 1000);
    setTimeLeft(limit);
  }, [limit]);

  useEffect(() => {
    reset();
    return clearTimer;
  }, [reset]);

  useEffect(() => {
    if (timeLeft === 0) {
      reset();
    }
  }, [timeLeft, reset]);

  return { timeLeft, isPrime: primes.includes(timeLeft), reset };
};

import { renderHook, act } from "@testing-library/react";
import { useTimer } from "./useTimer";

jest.useFakeTimers();

let result: { current: ReturnType<typeof useTimer> };

beforeEach(() => {
  result = renderHook(() => useTimer(60)).result;
});

describe('useTimer', () => {
  it('should initialize the timer when calling', () => {
    expect(result.current.timeLeft).toBe(60);
  });

  it('should have 55 seconds as the time left in 5 seconds', () => {
    expect(result.current.timeLeft).toBe(60);

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(result.current.timeLeft).toBe(55);
  });

  it('should initialize the timer if the reset function is called', () => {
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.timeLeft).toBe(59);

    act(() => {
      result.current.reset();
    });
    expect(result.current.timeLeft).toBe(60);
  });

  it('should initialize the timer in 60 seconds', () => {
    act(() => {
      jest.advanceTimersByTime(59000);
    });
    expect(result.current.timeLeft).toBe(1);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.timeLeft).toBe(60);
  });

  it('should return whether time left is a prime number or not when the isPrime function is called', () => {
    // 60 is not a prime number.
    expect(result.current.isPrime).toBe(false);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    // 59 is a prime number.
    expect(result.current.isPrime).toBe(true);
  });
});
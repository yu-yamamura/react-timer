import { renderHook, act } from "@testing-library/react";
import { useTimer } from "./useTimer";

jest.useFakeTimers();

describe("useTimer", () => {
  it("should initialize the timer when being called", () => {
    const result = renderHook(() => useTimer(60)).result;

    expect(result.current.timeLeft).toBe(60);
  });

  it("should have 55 seconds in 5 seconds", () => {
    const result = renderHook(() => useTimer(60)).result;

    expect(result.current.timeLeft).toBe(60);

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(result.current.timeLeft).toBe(55);
  });

  it("should initialize the timer if reset function is called", () => {
    const result = renderHook(() => useTimer(60)).result;

    expect(result.current.timeLeft).toBe(60);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.timeLeft).toBe(59);

    act(() => {
      result.current.reset();
    });
    expect(result.current.timeLeft).toBe(60);
  });

  it("should initialize the timer in 60 seconds", () => {
    const result = renderHook(() => useTimer(60)).result;

    expect(result.current.timeLeft).toBe(60);

    act(() => {
      jest.advanceTimersByTime(59000);
    });
    expect(result.current.timeLeft).toBe(1);

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.timeLeft).toBe(60);
  });

  it("should return `isPrime` that specifies whether time left is a prime number or not", () => {
    const result = renderHook(() => useTimer(60)).result;

    expect(result.current.timeLeft).toBe(60);
    // 60 is not a prime number.
    expect(result.current.isPrime).toBeFalsy();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.timeLeft).toBe(59);
    // 59 is a prime number.
    expect(result.current.isPrime).toBeTruthy();
  });
});

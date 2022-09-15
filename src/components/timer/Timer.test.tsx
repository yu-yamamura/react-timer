import React from "react";
import { act, render, screen } from "@testing-library/react";
import Timer from "./Timer";

jest.useFakeTimers();

let timeLeft: HTMLDivElement;

beforeEach(() => {
  render(<Timer limit={60} />);
  timeLeft = screen.getByTestId("time-left");
});

describe("Timer", () => {
  it("should render the time left", () => {
    expect(timeLeft).toHaveTextContent("60");

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(timeLeft).toHaveTextContent("59");

    act(() => {
      jest.advanceTimersByTime(9000);
    });
    expect(timeLeft).toHaveTextContent("50");
  });

  it("should change text color depending on if the time left is a prime number or not", () => {
    // 60 is not a prime number.
    expect(timeLeft).not.toHaveClass("prime-number");

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    // 59 is a prime number.
    expect(timeLeft).toHaveClass("prime-number");

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    // 58 is not a prime number.
    expect(timeLeft).not.toHaveClass("prime-number");
  });
});

import React from "react";
import { act, render, screen } from "@testing-library/react";
import Timer from "./Timer";
import userEvent from "@testing-library/user-event";

jest.useFakeTimers();

describe("Timer", () => {
  it("should render the time left", () => {
    render(<Timer limit={60} />);
    const timeLeft: HTMLDivElement = screen.getByTestId("time-left");

    expect(timeLeft.innerHTML).toBe("60");

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(timeLeft.innerHTML).toBe("59");

    act(() => {
      jest.advanceTimersByTime(9000);
    });
    expect(timeLeft.innerHTML).toBe("50");
  });

  it("should reset the time left when the reset button is clicked", () => {
    render(<Timer limit={60} />);
    const timeLeft: HTMLDivElement = screen.getByTestId("time-left");

    expect(timeLeft.innerHTML).toBe("60");

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(timeLeft.innerHTML).toBe("59");

    userEvent.click(screen.getByTestId("reset"));
    expect(timeLeft.innerHTML).toBe("60");
  });

  it("should change the text color depending on the time left", () => {
    render(<Timer limit={60} />);
    const timeLeft: HTMLDivElement = screen.getByTestId("time-left");

    expect(timeLeft.innerHTML).toBe("60");
    // 60 is not a prime number.
    expect(timeLeft).not.toHaveClass("prime-number");

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(timeLeft.innerHTML).toBe("59");
    // 59 is a prime number.
    expect(timeLeft).toHaveClass("prime-number");

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(timeLeft.innerHTML).toBe("58");
    // 58 is not a prime number.
    expect(timeLeft).not.toHaveClass("prime-number");
  });
});

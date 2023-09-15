import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SpeedCounter from "../SpeedCounter";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("SpeedCounter", () => {
  it("should render with the correct initial speed", () => {
    const initialSpeed = 5;

    render(
      <BrowserRouter>
        <SpeedCounter speed={initialSpeed} />
      </BrowserRouter>
    );

    const speedCounter = screen.getByTestId("speed-counter");
    const totalCount = screen.getByText("05");

    expect(speedCounter).toBeInTheDocument();
    expect(totalCount).toBeInTheDocument();
  });

  it("should format the speed correctly", () => {
    const formattedSpeed = "07";

    render(<SpeedCounter speed={7} />);

    const totalCount = screen.getByText(formattedSpeed);

    expect(totalCount).toBeInTheDocument();
  });

  it("should call onSpeedIncrement when the increment button is clicked", () => {
    const mockIncrement = jest.fn();

    render(<SpeedCounter speed={5} onSpeedIncrement={mockIncrement} />);

    const incrementButton = screen.getByTestId("increment-count");
    fireEvent.click(incrementButton);

    expect(mockIncrement).toHaveBeenCalled();
  });

  it("should call onSpeedDecrement when the decrement button is clicked", () => {
    const mockDecrement = jest.fn();

    render(<SpeedCounter speed={5} onSpeedDecrement={mockDecrement} />);

    const decrementButton = screen.getByTestId("decrement-count");
    fireEvent.click(decrementButton);

    expect(mockDecrement).toHaveBeenCalled();
  });
});

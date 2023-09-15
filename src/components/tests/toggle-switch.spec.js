import { fireEvent, render, screen } from "@testing-library/react";
import ToggleSwitch from "../ToggleSwitch";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const mockToggleSwitchClick = jest.fn();

describe("Toggle Switch", () => {
  it("should renders correctly", () => {
    render(
      <BrowserRouter>
        <ToggleSwitch />
      </BrowserRouter>
    );

    expect(screen.getByTestId("toggle-switch")).toBeInTheDocument();
  });

  it("should change the toggle-switch class on click", () => {
    render(
      <BrowserRouter>
        <ToggleSwitch
          onToggleSwitchClick={mockToggleSwitchClick}
          isAlgWeighted={true}
        />
      </BrowserRouter>
    );

    const toggleSwitch = screen.getByTestId("toggle-switch");

    expect(toggleSwitch).toHaveClass("toggle-switch wall");
    expect(toggleSwitch).not.toHaveClass("disabled");
    expect(toggleSwitch).not.toHaveClass("weight");

    fireEvent.click(toggleSwitch);
    expect(mockToggleSwitchClick).toHaveBeenCalled();

    expect(toggleSwitch).toHaveClass("toggle-switch weight");
    expect(toggleSwitch).not.toHaveClass("disabled");
    expect(toggleSwitch).not.toHaveClass("wall");
  });

  it("should be disabled if the algorithm isn't weighted", () => {
    render(
      <BrowserRouter>
        <ToggleSwitch
          onToggleSwitchClick={mockToggleSwitchClick}
          isAlgWeighted={false}
        />
      </BrowserRouter>
    );

    const toggleSwitch = screen.getByTestId("toggle-switch");

    expect(toggleSwitch).toHaveClass("disabled");

    fireEvent.click(toggleSwitch);
    expect(mockToggleSwitchClick).toHaveBeenCalledTimes(0);
  });
});

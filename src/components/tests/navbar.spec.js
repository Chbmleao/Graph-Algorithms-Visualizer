import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "../Navbar";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const visualizeMockFunction = jest.fn();
const mazeMockFunction = jest.fn();
const resetMockFunction = jest.fn();
const clearPathMockFunction = jest.fn();

const renderComponent = () => {
  render(
    <BrowserRouter>
      <Navbar
        onVisualizeClick={visualizeMockFunction}
        onMazeClick={mazeMockFunction}
        onResetClick={resetMockFunction}
        onClearPathClick={clearPathMockFunction}
      />
    </BrowserRouter>
  );
};

describe("Navbar", () => {
  it("should render correctly", () => {
    renderComponent();

    expect(screen.getByAltText("Graph logo")).toBeInTheDocument();
    expect(screen.getByTestId("select-box")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-switch")).toBeInTheDocument();
    expect(screen.getByText("Visualize")).toBeInTheDocument();
    expect(screen.getByText("Maze")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Clear Path")).toBeInTheDocument();
    expect(screen.getByTestId("speed-counter")).toBeInTheDocument();
  });

  it("should navigate to the home page when the logo is clicked", () => {
    renderComponent();

    const logoLink = screen.getByAltText("Graph logo");

    fireEvent.click(logoLink);

    expect(window.location.pathname).toBe("/");
  });

  it("should call onVisualizeClick when the 'Visualize' button is clicked", () => {
    renderComponent();

    const visualizeButton = screen.getByText("Visualize");
    fireEvent.click(visualizeButton);

    expect(visualizeMockFunction).toHaveBeenCalledTimes(1);
  });

  it("should call onMazeClick when the 'Maze' button is clicked", () => {
    renderComponent();

    const mazeButton = screen.getByText("Maze");
    fireEvent.click(mazeButton);

    expect(mazeMockFunction).toHaveBeenCalledTimes(1);
  });

  it("should call onResetClick when the 'Reset' button is clicked", () => {
    renderComponent();

    const resetButton = screen.getByText("Reset");
    fireEvent.click(resetButton);

    expect(resetMockFunction).toHaveBeenCalledTimes(1);
  });

  it("should call onClearPathClick when the 'ClearPath' button is clicked", () => {
    renderComponent();

    const clearPathButton = screen.getByText("Clear Path");
    fireEvent.click(clearPathButton);

    expect(clearPathMockFunction).toHaveBeenCalledTimes(1);
  });
});

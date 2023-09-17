import { render, screen } from "@testing-library/react";
import TableLegend from "../TableLegend";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const renderComponent = () => {
  render(
    <BrowserRouter>
      <TableLegend />
    </BrowserRouter>
  );
};

describe("Table Legend", () => {
  it("should render all components correctly", () => {
    renderComponent();

    const startNode = screen.getByText("Start Node");
    const endNode = screen.getByText("End Node");
    const weightNode = screen.getByText("Weight Node");
    const visitedNode = screen.getByText("Visited Node");
    const wallNode = screen.getByText("Wall Node");

    expect(startNode).toBeInTheDocument();
    expect(endNode).toBeInTheDocument();
    expect(weightNode).toBeInTheDocument();
    expect(visitedNode).toBeInTheDocument();
    expect(wallNode).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import AlgorithmDescription from "../AlgorithmDescription";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const renderComponent = (
  isWeighted = true,
  hasShortPath = true,
  algAcronym = "dfs"
) => {
  render(
    <BrowserRouter>
      <AlgorithmDescription
        algAcronym={algAcronym}
        isWeighted={isWeighted}
        hasShortPath={hasShortPath}
      />
    </BrowserRouter>
  );
};

describe("Algorithm Description", () => {
  it("should renders correctly when the algorithm is weighted", () => {
    renderComponent(true);

    const weightedText = screen.getByText("is weighted");

    expect(weightedText).toBeInTheDocument();
  });

  it("should renders correctly when the algorithm isn't weighted", () => {
    renderComponent(false);

    const weightedText = screen.getByText("isn't weighted");

    expect(weightedText).toBeInTheDocument();
  });

  it("should renders correctly when the algorithm has shortest path", () => {
    renderComponent(undefined, true);

    const shortPathText = screen.getByText("guarantees the shortest path");

    expect(shortPathText).toBeInTheDocument();
  });

  it("should renders correctly when the algorithm does not have shortest path", () => {
    renderComponent(undefined, false);

    const shortPathText = screen.getByText(
      "does not guarantee the shortest path"
    );

    expect(shortPathText).toBeInTheDocument();
  });

  it("should renders correctly when the algorithm acronym has length <= 3", () => {
    renderComponent(undefined, undefined, "dfs");

    const algNameText = screen.getByText("DFS algorithm");

    expect(algNameText).toBeInTheDocument();
  });

  it("should renders correctly when the algorithm acronym has length > 3", () => {
    renderComponent(undefined, undefined, "dijkstra");

    const algNameText = screen.getByText("Dijkstra algorithm");

    expect(algNameText).toBeInTheDocument();
  });
});

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SelectBox from "../SelectBox";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const mockOnAlgorithmSelect = jest.fn();

const renderComponent = () => {
  render(
    <BrowserRouter>
      <SelectBox onAlgorithmSelect={mockOnAlgorithmSelect} />
    </BrowserRouter>
  );
};

describe("SelectBox", () => {
  it("should render with three options", () => {
    renderComponent();

    const selectBox = screen.getByTestId("select-box");
    const selectOptions = screen.getAllByRole("option");

    expect(selectBox).toBeInTheDocument();
    expect(selectOptions).toHaveLength(3);
  });

  it("should call onAlgorithmSelect with the selected algorithm", async () => {
    renderComponent();

    const selectElement = await screen.findByTestId("algorithms");

    fireEvent.change(selectElement, { target: { value: "bfs" } });
    expect(mockOnAlgorithmSelect).toHaveBeenCalledWith("bfs");
  });
});

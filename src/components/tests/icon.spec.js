import { render, screen } from "@testing-library/react";
import Icon from "../Icon";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Icon", () => {
  it("should render start icon correctly", () => {
    render(
      <BrowserRouter>
        <Icon isStart={true} />
      </BrowserRouter>
    );

    const startIcon = screen.getByTestId("start-icon");

    expect(startIcon).toBeInTheDocument();
  });

  it("should render end icon correctly", () => {
    render(
      <BrowserRouter>
        <Icon isStart={false} />
      </BrowserRouter>
    );

    const startIcon = screen.getByTestId("end-icon");

    expect(startIcon).toBeInTheDocument();
  });
});

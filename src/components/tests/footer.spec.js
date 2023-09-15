import { render, screen } from "@testing-library/react";
import Footer from "../Footer";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

const renderComponent = () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
};

describe("Footer", () => {
  test("renders email link correctly", () => {
    renderComponent();
    const emailLink = screen.getByText("carlosbmaltaleao@gmail.com");
    expect(emailLink).toBeInTheDocument();
  });

  test("renders location link correctly", () => {
    renderComponent();
    const locationLink = screen.getByText(
      "Belo Horizonte, Minas Gerais, Brasil"
    );
    expect(locationLink).toBeInTheDocument();
  });

  test("renders phone number link correctly", () => {
    renderComponent();
    const phoneNumberLink = screen.getByText("+55 (31) 99553-7606");
    expect(phoneNumberLink).toBeInTheDocument();
  });
});

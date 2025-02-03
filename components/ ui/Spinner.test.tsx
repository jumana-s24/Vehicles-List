import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner";

describe("Spinner Component", () => {
  it("renders the component correctly", () => {
    render(<Spinner />);
    const spinnerContainer = screen.getByTestId("spinner");
    expect(spinnerContainer).toBeInTheDocument();
  });
});

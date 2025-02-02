import { render, screen } from "@testing-library/react";
import Skeleton from "./Skeleton";

describe("Skeleton Component", () => {
  it("renders the component correctly", () => {
    render(<Skeleton />);
    const skeleton = screen.getByTestId("skeleton");
    expect(skeleton).toBeInTheDocument();
  });
});

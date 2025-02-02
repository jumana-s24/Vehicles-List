import { render, fireEvent, screen } from "@testing-library/react";
import Accordion from "./Accordion";

describe("Accordion Component", () => {
  const title = "Test Accordion";
  const content = "This is the accordion content.";

  it("renders accordion with title", () => {
    render(<Accordion title={title}>{content}</Accordion>);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("toggles content visibility on click", () => {
    render(<Accordion title={title}>{content}</Accordion>);

    const button = screen.getByRole("button", { name: title });

    fireEvent.click(button);
    expect(screen.getByText(content)).toBeInTheDocument();
  });
});

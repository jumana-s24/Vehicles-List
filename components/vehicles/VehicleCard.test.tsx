import { render, screen } from "@testing-library/react";
import VehicleCard from "./VehicleCard";
import { mockTeslaVehicle } from "@/mocks/vehiclesMockData";

describe("VehicleCard Component", () => {
  it("renders vehicle details correctly", () => {
    render(<VehicleCard vehicle={mockTeslaVehicle} />);

    expect(screen.getByText("Tesla Model S")).toBeInTheDocument();
    expect(screen.getByText("2023")).toBeInTheDocument();
    expect(screen.getByText("$79,999")).toBeInTheDocument();
  });

  it("renders vehicle image correctly", () => {
    render(<VehicleCard vehicle={mockTeslaVehicle} />);
    const image = screen.getByAltText("Image of Tesla Model S");

    expect(image).toBeInTheDocument();
  });

  it("navigates to the correct vehicle details page when clicked", async () => {
    render(<VehicleCard vehicle={mockTeslaVehicle} />);
    const link = screen.getByRole("link");

    expect(link).toHaveAttribute("href", "/vehicle/model-s");
  });
});

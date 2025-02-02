import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { usePaginatedVehicles } from "@/hooks/usePaginatedVehicles";
import VehiclesList from "./VehiclesList";
import { mockVehiclesData } from "@/mocks/vehiclesMockData";

jest.mock("../../hooks/usePaginatedVehicles");

const mockUsePaginatedVehicles = (overrides = {}) => {
  (usePaginatedVehicles as jest.Mock).mockReturnValue({
    data: { data: mockVehiclesData, totalPages: 3, currentPage: 1 },
    isLoading: false,
    error: null,
    currentPage: 1,
    setCurrentPage: jest.fn(),
    ...overrides,
  });
};

describe("VehiclesList Component", () => {
  beforeEach(() => {
    mockUsePaginatedVehicles();
  });

  it("renders vehicle listings correctly", () => {
    render(
      <VehiclesList
        initialData={{ data: mockVehiclesData, totalPages: 3, currentPage: 1 }}
      />
    );

    expect(screen.getByText("Electric Vehicles List")).toBeInTheDocument();
    expect(screen.getByText("Tesla Model S")).toBeInTheDocument();
    expect(screen.getByText("Nissan Leaf")).toBeInTheDocument();
  });

  it("shows loading state when fetching data", () => {
    mockUsePaginatedVehicles({ data: null, isLoading: true });

    render(
      <VehiclesList initialData={{ data: [], totalPages: 0, currentPage: 1 }} />
    );
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("updates the search input value and triggers a new search", async () => {
    render(
      <VehiclesList
        initialData={{ data: mockVehiclesData, totalPages: 3, currentPage: 1 }}
      />
    );
    const searchInput = await screen.findByPlaceholderText(
      "Search by brand..."
    );
    fireEvent.change(searchInput, { target: { value: "Tesla" } });

    await waitFor(() => expect(searchInput).toHaveValue("Tesla"));
  });

  it("filters vehicles by condition", async () => {
    const { rerender } = render(
      <VehiclesList
        initialData={{ data: mockVehiclesData, totalPages: 3, currentPage: 1 }}
      />
    );

    const filterDropdown = screen.getByTestId("filter");
    fireEvent.change(filterDropdown, { target: { value: "New" } });

    mockUsePaginatedVehicles({
      data: {
        data: mockVehiclesData.filter((v) => v.condition === "New"),
        totalPages: 1,
      },
    });

    rerender(
      <VehiclesList initialData={{ data: [], totalPages: 3, currentPage: 1 }} />
    );

    await waitFor(() => {
      expect(screen.getByText("Tesla Model S")).toBeInTheDocument();
      expect(screen.queryByText("Nissan Leaf")).not.toBeInTheDocument();
    });
  });

  it("sorts vehicles by price (ascending)", async () => {
    mockUsePaginatedVehicles({ setCurrentPage: jest.fn() });

    const { rerender } = render(
      <VehiclesList
        initialData={{ data: mockVehiclesData, totalPages: 3, currentPage: 1 }}
      />
    );

    const sortDropdown = screen.getByTestId("sort");

    fireEvent.change(sortDropdown, { target: { value: "price-asc" } });

    mockUsePaginatedVehicles({
      data: {
        data: [...mockVehiclesData].sort((a, b) => a.price - b.price),
        totalPages: 3,
      },
    });

    rerender(
      <VehiclesList
        initialData={{ data: mockVehiclesData, totalPages: 3, currentPage: 1 }}
      />
    );

    await waitFor(() => {
      const vehicleCards = screen.getAllByText(/\$/);
      expect(vehicleCards[0]).toHaveTextContent("$25,000");
      expect(vehicleCards[1]).toHaveTextContent("$79,999");
    });
  });

  it("navigates to the next page when clicking 'Next'", async () => {
    const setCurrentPageMock = jest.fn();

    mockUsePaginatedVehicles({ setCurrentPage: setCurrentPageMock });

    render(
      <VehiclesList
        initialData={{ data: mockVehiclesData, totalPages: 3, currentPage: 1 }}
      />
    );
    fireEvent.click(screen.getByText("Next"));

    await waitFor(() => {
      expect(setCurrentPageMock).toHaveBeenCalled();
    });
  });

  it("does not allow clicking 'Prev' on the first page, disabled button", () => {
    render(
      <VehiclesList
        initialData={{ data: mockVehiclesData, totalPages: 3, currentPage: 1 }}
      />
    );
    const prevButton = screen.getByText("Prev");

    expect(prevButton).toBeDisabled();
  });
});

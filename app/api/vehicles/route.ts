import { NextResponse } from "next/server";
import vehiclesData from "@/data/vehicles.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";
  const filterCondition = searchParams.get("filter")?.toLowerCase() || "";
  const sortOption = searchParams.get("sort") || "";

  let filteredVehicles = vehiclesData.data;

  // Apply search filter
  if (searchQuery) {
    filteredVehicles = filteredVehicles.filter((vehicle) =>
      `${vehicle.brand} ${vehicle.model}`.toLowerCase().includes(searchQuery)
    );
  }

  // Apply filter by condition (New, Used)
  if (filterCondition) {
    filteredVehicles = filteredVehicles.filter(
      (vehicle) => vehicle.condition.toLowerCase() === filterCondition
    );
  }

  // Apply sorting
  if (sortOption) {
    filteredVehicles.sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "year-asc") return a.year - b.year;
      if (sortOption === "year-desc") return b.year - a.year;
      return 0;
    });
  }

  const startIndex = (page - 1) * limit;
  const paginatedVehicles = filteredVehicles.slice(
    startIndex,
    startIndex + limit
  );

  return NextResponse.json({
    data: paginatedVehicles,
    currentPage: page,
    totalPages: Math.ceil(filteredVehicles.length / limit),
  });
}

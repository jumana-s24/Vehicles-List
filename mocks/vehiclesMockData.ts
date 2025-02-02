import { Vehicle } from "@/types/vehicle";

export const baseMockVehicle: Vehicle = {
  brand: "Generic Brand",
  model: "Generic Model",
  year: 2023,
  color: "Gray",
  price: 0,
  condition: "New",
  images: ["/placeholder.jpg"],
  range_km: 0,
  battery_capacity_kWh: 0,
  charging_speed_kW: 0,
  seats: 0,
  drivetrain: "",
  location: "",
  autopilot: false,
  kilometer_count: 0,
  accidents: false,
};

export const mockTeslaVehicle: Vehicle = {
  ...baseMockVehicle,
  brand: "Tesla",
  model: "Model S",
  color: "Red",
  price: 79999,
  images: ["/tesla-model-s.jpg"],
};

export const mockNissanVehicle: Vehicle = {
  ...baseMockVehicle,
  brand: "Nissan",
  model: "Leaf",
  year: 2020,
  color: "Blue",
  price: 25000,
  condition: "Used",
  images: ["/nissan-leaf.jpg"],
};

export const mockVehiclesData: Vehicle[] = [
  mockTeslaVehicle,
  mockNissanVehicle,
];

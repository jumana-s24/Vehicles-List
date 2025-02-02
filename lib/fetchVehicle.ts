import { Vehicle } from "@/types/vehicle";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function fetchVehicle(id: string): Promise<Vehicle | null> {
  const res = await fetch(`${BASE_URL}/api/vehicles/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

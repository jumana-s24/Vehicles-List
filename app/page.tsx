import VehiclesList from "@/components/vehicles/VehiclesList";
import { fetchVehicles } from "@/lib/fetchVehicles";

export default async function Home() {
  const initialData = await fetchVehicles(1);

  return <VehiclesList initialData={initialData} />;
}
